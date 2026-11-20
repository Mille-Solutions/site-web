/**
 * Réception du formulaire de contact et envoi par e-mail (SMTP authentifié de la messagerie du domaine).
 * Seule route exécutée côté serveur ; tout le reste du site est statique.
 *
 * Réglages par variables d'environnement (voir .env.example et docs/GUIDE.md § 6.1) :
 * SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO, TRUST_PROXY,
 * ALTCHA_HMAC_KEY (captcha, voir src/lib/altcha.ts).
 */
import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';
import nodemailer, { type Transporter } from 'nodemailer';
import { createRateLimiter, validateContact } from '../../lib/contact';
import { verifyAltcha } from '../../lib/altcha';

export const prerender = false;

const env = process.env;
const MAX_BODY = 64 * 1024;
// 5 envois par adresse IP et par quart d'heure.
const allow = createRateLimiter(Number(env.CONTACT_RATE_LIMIT ?? 5), 15 * 60 * 1000);

let transporter: Transporter | undefined;
function getTransporter(): Transporter | undefined {
  if (transporter) return transporter;
  if (env.SMTP_HOST) {
    const port = Number(env.SMTP_PORT ?? 587);
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port,
      secure: env.SMTP_SECURE ? env.SMTP_SECURE === 'true' : port === 465,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS ?? '' } : undefined,
    });
  } else if (import.meta.env.DEV) {
    // Développement sans SMTP : le message est affiché dans le terminal au lieu d'être envoyé.
    transporter = nodemailer.createTransport({ streamTransport: true, newline: 'unix', buffer: true });
  }
  return transporter;
}

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function clientIp(request: Request, fallback: string): string {
  if (env.TRUST_PROXY === 'true') {
    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwarded) return forwarded;
  }
  return fallback;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const length = Number(request.headers.get('content-length') ?? 0);
  if (length > MAX_BODY) return json(413, { ok: false, error: 'too-large' });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { ok: false, error: 'bad-request' });
  }

  // Case piège cochée : robot. On répond « succès » sans rien envoyer.
  if (form.get('botcheck')) return json(200, { ok: true });

  if (!allow(clientIp(request, clientAddress))) return json(429, { ok: false, error: 'rate-limited' });

  // Captcha ALTCHA : solution valide, signée par ce serveur, non expirée et jamais utilisée.
  if (!(await verifyAltcha(form.get('altcha')))) return json(403, { ok: false, error: 'captcha' });

  const [fr, en] = await Promise.all([getEntry('contactPage', 'fr'), getEntry('contactPage', 'en')]);
  const labels = fr!.data.form;
  const methodsOf = (f: typeof labels) => f.contactMethods;
  const all = [methodsOf(labels), methodsOf(en!.data.form)];
  const result = validateContact(form, {
    all: all.flatMap((m) => [m.whatsapp, m.phone, m.email]),
    needPhone: all.flatMap((m) => [m.whatsapp, m.phone]),
  });
  if (!result.ok) return json(400, { ok: false, error: 'invalid', fields: result.errors });

  const mailer = getTransporter();
  const to = env.MAIL_TO;
  const from = env.MAIL_FROM ?? env.SMTP_USER;
  if (!mailer || (!import.meta.env.DEV && (!to || !from))) {
    console.error('[contact] SMTP non configuré : renseigner SMTP_HOST, SMTP_USER, SMTP_PASS et MAIL_TO.');
    return json(503, { ok: false, error: 'unavailable' });
  }

  const d = result.data;
  const rows: [string, string][] = [
    [labels.name, d.name],
    [labels.organisation, d.organisation],
    [labels.position, d.position],
    [labels.phone, d.phone],
    [labels.email, d.email],
    [labels.contactMethod, d.contactMethod],
    [labels.site, d.site],
    ['Langue du site', d.lang === 'en' ? 'anglais' : 'français'],
  ];
  const text = [
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`),
    '',
    `${labels.message} :`,
    d.message,
    '',
    '—',
    'Message envoyé depuis le formulaire de contact du site millesolutions.mc.',
    'Répondre à cet e-mail écrit directement à l’expéditeur.',
  ].join('\n');

  try {
    const info = await mailer.sendMail({
      from: { name: 'Site Mille Solutions', address: from ?? 'formulaire@localhost' },
      to: to ?? 'charlotte@localhost',
      replyTo: { name: d.name, address: d.email },
      subject: `Demande de contact — ${d.name}${d.organisation ? ` (${d.organisation})` : ''}`,
      text,
    });
    if (import.meta.env.DEV && 'message' in info && Buffer.isBuffer(info.message)) {
      console.log(`[contact] Message (non envoyé, mode développement) :\n${info.message.toString()}`);
    }
    return json(200, { ok: true });
  } catch (error) {
    // Jamais le contenu du message dans les journaux : seulement la cause technique.
    console.error('[contact] Échec de l’envoi SMTP :', error instanceof Error ? error.message : error);
    return json(502, { ok: false, error: 'send-failed' });
  }
};

// Toute autre méthode : refusée.
export const ALL: APIRoute = () => json(405, { ok: false, error: 'method-not-allowed' });
