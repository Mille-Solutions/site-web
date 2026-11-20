/** Défi ALTCHA demandé par le formulaire de contact (voir src/lib/altcha.ts). */
import type { APIRoute } from 'astro';
import { createAltchaChallenge } from '../../lib/altcha';

export const prerender = false;

export const GET: APIRoute = async () =>
  new Response(JSON.stringify(await createAltchaChallenge()), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
