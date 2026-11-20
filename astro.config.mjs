// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

// Les pages anglaises ne sont listées dans le plan du site qu'une fois validées (settings.yaml).
const settings = readFileSync('./src/content/settings.yaml', 'utf8');
const englishEnabled = /^\s*englishEnabled:\s*true\b/m.test(settings);
// Idem pour les pages de phase 2 (phase2Enabled).
const phase2Enabled = /^\s*phase2Enabled:\s*true\b/m.test(settings);
const phase2Paths = ['/accompagnements/', '/approche-et-parcours/', '/exemples-de-projets/'];

export default defineConfig({
  // Adresse du site et préfixe des pages. Par défaut : domaine final, à la racine.
  // Le déploiement GitHub Pages (.github/workflows/deploy.yml) fournit SITE_URL et SITE_BASE.
  site: process.env.SITE_URL || 'https://millesolutions.mc',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
  // Pages statiques ; seul /api/contact/ tourne côté serveur (envoi du formulaire par SMTP).
  // Construction : pages dans dist/client, serveur Node dans dist/server (voir Dockerfile).
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-GB' } },
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/api/') &&
        (englishEnabled || !page.includes('/en/')) &&
        (phase2Enabled || !phase2Paths.some((p) => page.endsWith(p))),
    }),
  ],
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
