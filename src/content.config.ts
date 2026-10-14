import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Réglages modifiables sans toucher au code (Bookings, LinkedIn, formulaire, anglais). */
const settings = defineCollection({
  loader: file('src/content/settings.yaml'),
  schema: z.object({
    bookingsUrl: z.string(),
    linkedinUrl: z.string(),
    contactFormEndpoint: z.string().default(''),
    englishEnabled: z.boolean().default(false),
  }),
});

const icon = z.enum(['coordination', 'structuration', 'priorisation', 'solutions']);
const card = z.object({ icon, title: z.string(), text: z.string() });
const section = { eyebrow: z.string(), title: z.string() };

/** Textes de la page d'accueil, un fichier par langue : src/content/home/fr.yaml, en.yaml */
const home = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/home' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      title: z.string(),
      lead: z.string(),
      engagementLabel: z.string(),
      signature: z.string(),
      cta: z.string(),
      secondary: z.string(),
      imageCaption: z.string(),
    }),
    situations: z.object({ ...section, items: z.array(card) }),
    services: z.object({ ...section, items: z.array(card.extend({ id: z.string() })) }),
    method: z.object({ ...section, steps: z.array(card) }),
    examples: z.object({
      ...section,
      items: z.array(z.object({ title: z.string(), text: z.string() })),
      note: z.string(),
    }),
    about: z.object({
      ...section,
      paragraphs: z.array(z.string()).min(1),
      cta: z.string(),
      portraitCaption: z.string(),
    }),
    contact: z.object({
      title: z.string(),
      text: z.string(),
      booking: z.object({ eyebrow: z.string(), text: z.string(), cta: z.string() }),
      form: z.object({
        eyebrow: z.string(),
        name: z.string(),
        namePlaceholder: z.string(),
        email: z.string(),
        emailPlaceholder: z.string(),
        organisation: z.string(),
        organisationPlaceholder: z.string(),
        message: z.string(),
        messagePlaceholder: z.string(),
        submit: z.string(),
        sending: z.string(),
        notice: z.string(),
        noticeLink: z.string(),
        requiredNote: z.string(),
        success: z.string(),
        error: z.string(),
        invalid: z.string(),
        unavailable: z.string(),
      }),
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
