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
    services: 'accompagnements',
    approach: 'approche',
    examples: 'exemples',
    about: 'parcours',
    contact: 'contact',
  },
  en: {
    services: 'services',
    approach: 'approach',
    examples: 'examples',
    about: 'background',
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
    mainNav: 'Navigation principale',
    langSwitch: 'Read this page in English',
    newTab: '(s’ouvre dans un nouvel onglet)',
    logoHome: 'Mille Solutions — retour à l’accueil',
    footerNav: 'Plan du site',
    legal: 'Mentions légales',
    privacy: 'Confidentialité et cookies',
    location: 'Monaco et sa région',
    updated: 'Dernière mise à jour',
    notFoundTitle: 'Page introuvable',
    notFoundText: 'Cette page n’existe pas ou a été déplacée.',
    backHome: 'Revenir à l’accueil',
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
    mainNav: 'Main navigation',
    langSwitch: 'Lire cette page en français',
    newTab: '(opens in a new tab)',
    logoHome: 'Mille Solutions — back to home page',
    footerNav: 'Site map',
    legal: 'Legal notice',
    privacy: 'Privacy and cookies',
    location: 'Monaco and the surrounding region',
    updated: 'Last updated',
    notFoundTitle: 'Page not found',
    notFoundText: 'This page does not exist or has been moved.',
    backHome: 'Back to home page',
  },
} as const;

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
