/**
 * Contrôle côté serveur du formulaire de contact (src/pages/api/contact.ts).
 * Reprend les règles du navigateur (ContactForm.astro) : le serveur ne fait jamais confiance au client.
 */

export interface ContactRequest {
  name: string;
  organisation: string;
  position: string;
  phone: string;
  email: string;
  contactMethod: string;
  site: string;
  message: string;
  lang: 'fr' | 'en';
}

const limits = { name: 120, organisation: 160, position: 120, phone: 30, email: 254, contactMethod: 40, site: 300, message: 5000 };

// Mêmes motifs que les attributs pattern du formulaire (sans le drapeau v).
const phonePattern = /^\+?[0-9][0-9 ().-]{5,24}$/;
const sitePattern = /^(https?:\/\/)?[^\s/]+\.\S{2,}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Supprime les caractères de contrôle (sauf retours à la ligne du message) et les espaces superflus. */
const clean = (value: FormDataEntryValue | null, multiline = false): string => {
  if (typeof value !== 'string') return '';
  const stripped = multiline ? value.replace(/\r\n?/g, '\n').replace(/[^\P{Cc}\n\t]/gu, '') : value.replace(/\p{Cc}/gu, ' ');
  return stripped.trim();
};

export type Validation = { ok: true; data: ContactRequest } | { ok: false; errors: string[] };

/**
 * @param methods libellés acceptés pour le mode de contact (toutes langues), et ceux qui exigent un téléphone.
 */
export function validateContact(form: FormData, methods: { all: string[]; needPhone: string[] }): Validation {
  const data: ContactRequest = {
    name: clean(form.get('name')),
    organisation: clean(form.get('organisation')),
    position: clean(form.get('position')),
    phone: clean(form.get('phone')),
    email: clean(form.get('email')),
    contactMethod: clean(form.get('contactMethod')),
    site: clean(form.get('site')),
    message: clean(form.get('message'), true),
    lang: form.get('lang') === 'en' ? 'en' : 'fr',
  };
  const errors: string[] = [];

  for (const [key, max] of Object.entries(limits) as [keyof typeof limits, number][]) {
    if (data[key].length > max) errors.push(`${key}: too long`);
  }
  if (!data.name) errors.push('name: required');
  if (!emailPattern.test(data.email)) errors.push('email: invalid');
  if (data.message.length < 10) errors.push('message: required');
  if (data.contactMethod && !methods.all.includes(data.contactMethod)) errors.push('contactMethod: invalid');
  if (methods.needPhone.includes(data.contactMethod) && !data.phone) errors.push('phone: required');
  if (data.phone && !phonePattern.test(data.phone)) errors.push('phone: invalid');
  if (data.site && !sitePattern.test(data.site)) errors.push('site: invalid');

  return errors.length ? { ok: false, errors } : { ok: true, data };
}

/**
 * Limitation simple en mémoire : `max` envois par adresse IP sur `windowMs`.
 * Suffisant pour un seul conteneur ; remis à zéro à chaque redémarrage.
 */
export function createRateLimiter(max: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (key: string, now = Date.now()): boolean => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      hits.set(key, recent);
      return false;
    }
    recent.push(now);
    hits.set(key, recent);
    // Nettoyage occasionnel pour ne pas garder d'adresses indéfiniment.
    if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    return true;
  };
}
