export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;

/** Pages et leur équivalent dans l'autre langue (sélecteur FR / EN, hreflang). */
export const routes = {
  home: { fr: '/', en: '/en/' },
  legal: { fr: '/mentions-legales/', en: '/en/legal-notice/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
} as const;
export type RouteKey = keyof typeof routes;

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
      approach: 'Approche et parcours',
      examples: 'Exemples de projets',
      contact: 'Contact',
    },
    book: 'Réserver un échange',
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
    footerContactLines: ['Charlotte Charles Mille', 'Monaco et sa région', 'millesolutions.mc'],
    legalNav: 'Informations légales',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
    rights: 'Tous droits réservés.',
    signature: 'Structurer. Prioriser. Concrétiser.',
    updated: 'Dernière mise à jour',
    legalEyebrow: 'Informations légales',
    toc: 'Sommaire',
    draftWarning:
      'Brouillon non publiable : les informations signalées sont à compléter et le texte doit être vérifié avant la mise en ligne.',
    notFoundTitle: 'Page introuvable',
    notFoundText: 'Cette page n’existe pas ou a été déplacée.',
    backHome: 'Revenir à l’accueil',
    required: 'obligatoire',
    fieldRequired: 'Ce champ est obligatoire.',
    fieldEmail: 'Saisissez une adresse e-mail valide, par exemple nom@domaine.com.',
  },
  en: {
    skip: 'Skip to content',
    home: 'Home',
    nav: {
      services: 'Services',
      approach: 'Approach and background',
      examples: 'Project examples',
      contact: 'Contact',
    },
    book: 'Book a call',
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
    footerContactLines: ['Charlotte Charles Mille', 'Monaco and the surrounding region', 'millesolutions.mc'],
    legalNav: 'Legal information',
    legal: 'Legal notice',
    privacy: 'Privacy',
    rights: 'All rights reserved.',
    signature: 'Structure. Prioritize. Deliver.',
    updated: 'Last updated',
    legalEyebrow: 'Legal information',
    toc: 'Contents',
    draftWarning: 'Draft — not for publication: the highlighted information must be completed and checked before going live.',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page does not exist or has been moved.',
    backHome: 'Back to home page',
    required: 'required',
    fieldRequired: 'This field is required.',
    fieldEmail: 'Enter a valid email address, for example name@domain.com.',
  },
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
