import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Réglages modifiables sans toucher au code (LinkedIn, formulaire, anglais). */
const settings = defineCollection({
  loader: file('src/content/settings.yaml'),
  schema: z.object({
    linkedinUrl: z.string(),
    contactFormsUrl: z.string().default(''),
    contactFormEndpoint: z.string().default(''),
    englishEnabled: z.boolean().default(false),
    phase2Enabled: z.boolean().default(false),
  }),
});

const icon = z.enum(['coordination', 'structuration', 'priorisation', 'solutions', 'collaboration', 'resultats']);
const card = z.object({ icon, title: z.string(), text: z.string(), paragraphs: z.array(z.string()).optional() });
const section = { eyebrow: z.string(), title: z.string() };

/** Textes de la page d'accueil, un fichier par langue : src/content/home/fr.yaml, en.yaml */
const home = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/home' }),
  schema: z.object({
    meta: z.object({ title: z.string(), description: z.string() }),
    hero: z.object({
      /** Une entrée par ligne du titre. */
      title: z.array(z.string()).min(1),
      lead: z.string(),
      leadSecondary: z.string().optional(),
      engagementLabel: z.string().optional(),
      signature: z.string(),
      imageAlt: z.string(),
    }),
    situations: z.object({ ...section, items: z.array(card) }),
    services: z.object({ ...section, items: z.array(card.extend({ id: z.string() })) }).optional(),
    method: z.object({ ...section, steps: z.array(card), note: z.string().optional() }),
    examples: z.object({
      ...section,
      items: z.array(z.object({ title: z.string(), text: z.string(), category: z.string().optional(), context: z.string().optional() })),
      note: z.string(),
    }),
    about: z.object({
      ...section,
      introTitle: z.string().optional(),
      paragraphs: z.array(z.string()).min(1),
      cta: z.string(),
      /** Texte alternatif du portrait. */
      portraitAlt: z.string(),
    }),
    contact: z.object({
      eyebrow: z.string().optional(),
      title: z.string(),
      text: z.string(),
      form: z.object({
        eyebrow: z.string(),
        intro: z.string().optional(),
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

/* ---------- Phase 2 : pages complémentaires (src/content/<page>/<langue>.yaml) ---------- */

const meta = z.object({ title: z.string(), description: z.string() });
const hero = z.object({
  eyebrow: z.string().optional(),
  title: z.string(),
  /** Titre découpé en lignes, si la maquette impose les retours à la ligne. */
  titleLines: z.array(z.string()).optional(),
  lead: z.string(),
  imageCaption: z.string(),
  imageAlt: z.string().optional(),
});

const services = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/accompagnements' }),
  schema: z.object({
    meta,
    hero,
    statement: z.string(),
    list: z.object({
      ...section,
      needsLabel: z.string(),
      interventionLabel: z.string(),
      deliverablesLabel: z.string(),
      items: z.array(
        z.object({
          id: z.string(),
          icon,
          title: z.string(),
          text: z.string(),
          needs: z.array(z.string()),
          intervention: z.string(),
          deliverables: z.array(z.string()),
        }),
      ),
    }),
    approach: z.object({ ...section, items: z.array(card) }),
  }),
});

const approach = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/approche' }),
  schema: z.object({
    meta,
    hero,
    statement: z.object({ title: z.string(), text: z.string() }),
    intro: z.object({ name: z.string(), eyebrow: z.string(), paragraphs: z.array(z.string()).min(2) }),
    method: z.object({ title: z.string(), subtitle: z.string(), steps: z.array(card) }),
    principles: z.object({ title: z.string(), subtitle: z.string(), items: z.array(card) }),
    background: z.object({ title: z.string(), subtitle: z.string(), paragraphs: z.array(z.string()) }),
  }),
});

const examples = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/exemples' }),
  schema: z.object({
    meta,
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      signature: z.string(),
      signatureText: z.string(),
      imageCaption: z.string(),
      imageAlt: z.string().optional(),
    }),
    projects: z.object({
      ...section,
      subtitle: z.string(),
      roleLabel: z.string(),
      actionsLabel: z.string(),
      resultsLabel: z.string(),
      note: z.string(),
      items: z.array(
        z.object({
          icon,
          title: z.string(),
          duration: z.string(),
          situation: z.string(),
          role: z.string(),
          actions: z.array(z.string()),
          results: z.string(),
        }),
      ),
    }),
  }),
});

const contactPage = defineCollection({
  loader: glob({ pattern: '*.yaml', base: 'src/content/contact' }),
  schema: z.object({
    meta,
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

export const collections = { settings, home, legal, services, approach, examples, contactPage };
