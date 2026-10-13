import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Liens modifiables sans toucher au code (Bookings, LinkedIn…). */
const settings = defineCollection({
  loader: file('src/content/settings.yaml'),
  schema: z.object({
    bookingsUrl: z.string(),
    linkedinUrl: z.string(),
  }),
});

/** Textes de la page d'accueil, un fichier par langue : src/content/home/fr.yaml, en.yaml */
const home = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/home' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      title: z.array(z.string()),
      lead: z.string(),
      signature: z.string(),
      cta: z.string(),
      secondary: z.string(),
      imageCaption: z.string(),
    }),
    situations: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(z.object({ text: z.string(), service: z.string(), linkLabel: z.string() })),
    }),
    services: z.object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(
        z.object({
          id: z.string(),
          icon: z.enum(['project', 'simplify', 'unblock']),
          title: z.string(),
          text: z.string(),
        }),
      ),
    }),
    method: z.object({
      eyebrow: z.string(),
      title: z.string(),
      steps: z.array(z.object({ title: z.string(), text: z.string() })),
      quote: z.string(),
    }),
    examples: z.object({
      eyebrow: z.string(),
      title: z.string(),
      durationLabel: z.string(),
      items: z.array(z.object({ title: z.string(), duration: z.string(), summary: z.string() })),
      note: z.string(),
    }),
    about: z.object({
      eyebrow: z.string(),
      title: z.string(),
      paragraphs: z.array(z.string()),
      linkedin: z.string(),
      portraitCaption: z.string(),
    }),
    contact: z.object({
      eyebrow: z.string(),
      title: z.string(),
      text: z.string(),
      cta: z.string(),
      formPending: z.string(),
    }),
  }),
});

/** Pages légales en Markdown : src/content/legal/<langue>/<page>.md */
const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.string(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { settings, home, legal };
