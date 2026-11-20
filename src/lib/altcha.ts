/**
 * Captcha ALTCHA (preuve de travail, auto-hébergé, sans cookie ni service tiers).
 * - createAltchaChallenge() : défi signé envoyé au navigateur (/api/altcha/).
 * - verifyAltcha() : contrôle de la solution jointe au formulaire (/api/contact/).
 *
 * Clé de signature : ALTCHA_HMAC_KEY (variable d'environnement). Si elle est absente, une clé
 * aléatoire est tirée au démarrage du serveur : ça fonctionne, mais les défis en cours deviennent
 * invalides à chaque redémarrage du conteneur.
 */
import { randomBytes } from 'node:crypto';
import { CappedMap, createChallenge, randomInt } from 'altcha-lib';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';
import { deriveHmacKeySecret, verify } from 'altcha-lib/frameworks/shared';

/** Durée de validité d'un défi : laisse le temps de rédiger la demande. */
const CHALLENGE_TTL_S = 60 * 60;
/** Coût d'un essai (itérations PBKDF2). Réglé pour environ une seconde sur un ordinateur récent. */
const COST = 1_000;

const hmacSecret = process.env.ALTCHA_HMAC_KEY || randomBytes(32).toString('hex');
const hmacKeySecret = deriveHmacKeySecret(hmacSecret);
/** Solutions déjà utilisées (anti-rejeu). Les plus anciennes sont oubliées, mais elles ont expiré. */
const used = new CappedMap<string, boolean>({ maxSize: 10_000 });

export async function createAltchaChallenge() {
  return createChallenge({
    algorithm: 'PBKDF2/SHA-256',
    cost: COST,
    // Nombre d'essais nécessaires (tiré au hasard) : la durée du calcul est proportionnelle à COST × counter.
    counter: randomInt(4_000, 2_000),
    deriveKey,
    expiresAt: Math.floor(Date.now() / 1000) + CHALLENGE_TTL_S,
    hmacSignatureSecret: hmacSecret,
    hmacKeySignatureSecret: await hmacKeySecret,
  });
}

/** true si la solution est valide, signée par ce serveur, non expirée et jamais utilisée. */
export async function verifyAltcha(payload: FormDataEntryValue | null): Promise<boolean> {
  if (typeof payload !== 'string' || !payload || payload.length > 10_000) return false;
  const result = await verify(payload, deriveKey, hmacSecret, await hmacKeySecret, used);
  return result.error === null;
}
