// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Les pages anglaises ne sont listées dans le plan du site qu'une fois validées (settings.yaml).
const englishEnabled = /^\s*englishEnabled:\s*true\b/m.test(readFileSync('./src/content/settings.yaml', 'utf8'));

export default defineConfig({
  site: 'https://millesolutions.mc',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR', en: 'en-GB' } },
      filter: (page) => !page.includes('/404') && (englishEnabled || !page.includes('/en/')),
    }),
  ],
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
