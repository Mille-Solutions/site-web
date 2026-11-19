export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;

/** Préfixe des adresses : vide sur le domaine final, « /site-web » sur GitHub Pages (astro.config.mjs → base). */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Adresse interne précédée du préfixe du site (pages, favicon, plan du site…). */
export const url = (path: string): string => `${base}${path}`;

/**
 * Pages et leur équivalent dans l'autre langue (sélecteur FR / EN, hreflang).
 * `en: null` : pas encore de version anglaise (pages de phase 2).
 */
export const routes = {
  home: { fr: url('/'), en: url('/en/') },
  legal: { fr: url('/mentions-legales/'), en: url('/en/legal-notice/') },
  privacy: { fr: url('/confidentialite/'), en: url('/en/privacy/') },
  services: { fr: url('/accompagnements/'), en: null },
  approach: { fr: url('/approche-et-parcours/'), en: null },
  examples: { fr: url('/exemples-de-projets/'), en: null },
  contact: { fr: url('/contact/'), en: null },
} as const satisfies Record<string, { fr: string; en: string | null }>;
export type RouteKey = keyof typeof routes;

/** Pages de phase 2, publiées seulement quand settings.yaml → phase2Enabled: true. */
export const phase2Routes: RouteKey[] = ['services', 'approach', 'examples', 'contact'];

/** Adresse d'une page dans une langue, avec repli sur la version française. */
export const pathFor = (route: RouteKey, lang: Lang): string => routes[route][lang] ?? routes[route].fr;

/**
 * Ancres des sections de l'accueil (phase 1 : navigation par sections).
 * En phase 2, les entrées du menu pointeront vers les pages dédiées.
 */
export const sections = {
  fr: {
    situations: 'situations',
    services: 'accompagnements',
    approach: 'approche',
    examples: 'exemples',
    about: 'a-propos',
    contact: 'contact',
  },
  en: {
    situations: 'situations',
    services: 'services',
    approach: 'approach',
    examples: 'examples',
    about: 'about',
    contact: 'contact',
  },
} as const;

export const ui = {
  fr: {
    skip: 'Aller au contenu',
    home: 'Accueil',
    nav: {
      services: 'Accompagnements',
      // Page « Approche et parcours » (phase 2) ; la section de l'accueil ne traite que de l'approche.
      approach: 'Approche et parcours',
      approachSection: 'Approche',
      needs: 'Vos besoins',
      examples: 'Exemples de projets',
      about: 'À propos',
      contact: 'Contact',
    },
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    menuLabel: 'Menu',
    closeLabel: 'Fermer',
    mainNav: 'Navigation principale',
    langSwitch: 'Read this page in English',
    langPending: 'Version anglaise en préparation',
    newTab: '(s’ouvre dans un nouvel onglet)',
    logoHome: 'Mille Solutions — retour à l’accueil',
    footerNav: 'Navigation',
    footerContact: 'Contact',
    footerContactLines: ['Charlotte Charles Mille', 'Monaco et international', 'millesolutions.mc'],
    legalNav: 'Informations légales',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    rights: 'Tous droits réservés.',
    signature: 'Structurer. Prioriser. Concrétiser.',
    updated: 'Dernière mise à jour',
    legalEyebrow: 'Informations légales',
    toc: 'Sommaire',
    draftStatus: 'Non publiable',
    draftWarning:
      'Brouillon non publiable : les informations signalées sont à compléter et le texte doit être vérifié avant la mise en ligne.',
    notFoundTitle: 'Page introuvable',
    notFoundText: 'Cette page n’existe pas ou a été déplacée.',
    backHome: 'Revenir à l’accueil',
    required: 'obligatoire',
    fieldRequired: 'Ce champ est obligatoire.',
    // Maquette « États du formulaire » : état « Adresse e-mail invalide »
    fieldEmail: 'Vérifiez votre adresse e-mail avant de réessayer. Le format saisi ne semble pas correct. Corrigez-le pour continuer.',
  },
  en: {
    skip: 'Skip to content',
    home: 'Home',
    nav: {
      services: 'Services',
      approach: 'My approach',
      approachSection: 'My approach',
      needs: 'Your needs',
      examples: 'Selected projects',
      about: 'About',
      contact: 'Contact',
    },
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    menuLabel: 'Menu',
    closeLabel: 'Close',
    mainNav: 'Main navigation',
    langSwitch: 'Lire cette page en français',
    langPending: 'Version française',
    newTab: '(opens in a new tab)',
    logoHome: 'Mille Solutions — back to home page',
    footerNav: 'Navigation',
    footerContact: 'Contact',
    footerContactLines: ['Charlotte Charles Mille', 'Monaco & International', 'millesolutions.mc'],
    legalNav: 'Legal information',
    legal: 'Legal notice',
    privacy: 'Privacy',
    rights: 'All rights reserved.',
    signature: 'Structure. Prioritize. Deliver.',
    updated: 'Last updated',
    legalEyebrow: 'Legal information',
    toc: 'Contents',
    draftStatus: 'Not for publication',
    draftWarning: 'Draft — not for publication: the highlighted information must be completed and checked before going live.',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page does not exist or has been moved.',
    backHome: 'Back to home page',
    required: 'required',
    fieldRequired: 'This field is required.',
    fieldEmail: 'Check your email address before trying again. The format does not look right. Please correct it to continue.',
  },
} as const;

/**
 * Entrées du menu : sections de l'accueil en phase 1, pages dédiées en phase 2.
 * Phase 1 : « Approche » (la section ne présente que la méthode) et « À propos » (portrait et
 * parcours). Phase 2 : la page « Approche et parcours » réunit les deux, sans entrée « À propos ».
 */
export function navItems(lang: Lang, phase2: boolean) {
  const t = ui[lang];
  const s = sections[lang];
  const home = routes.home[lang];
  const target = (route: RouteKey, anchor: string) =>
    phase2 && (lang === 'fr' || routes[route][lang]) ? pathFor(route, lang) : `${home}#${anchor}`;
  return [
    { key: 'home' as RouteKey, label: t.home, href: home },
    { key: 'situations' as const, label: t.nav.needs, href: `${home}#${s.situations}` },
    { key: 'approach' as RouteKey, label: phase2 ? t.nav.approach : t.nav.approachSection, href: target('approach', s.approach) },
    { key: 'examples' as RouteKey, label: t.nav.examples, href: target('examples', s.examples) },
    ...(phase2 ? [] : [{ key: 'about' as const, label: t.nav.about, href: `${home}#${s.about}` }]),
    { key: 'contact' as RouteKey, label: t.nav.contact, href: target('contact', s.contact) },
  ];
}

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
