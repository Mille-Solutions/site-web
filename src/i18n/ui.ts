import fr from '../content/ui/fr.json';
import en from '../content/ui/en.json';

export const languages = { fr: 'Français', en: 'English' } as const;
export type Lang = keyof typeof languages;

/**
 * Pages et leur équivalent dans l'autre langue (sélecteur FR / EN, hreflang).
 * `en: null` : pas encore de version anglaise (pages de phase 2).
 */
export const routes = {
  home: { fr: '/', en: '/en/' },
  legal: { fr: '/mentions-legales/', en: '/en/legal-notice/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
  services: { fr: '/accompagnements/', en: null },
  approach: { fr: '/approche-et-parcours/', en: null },
  examples: { fr: '/exemples-de-projets/', en: null },
  contact: { fr: '/contact/', en: null },
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

/**
 * Libellés d'interface (menu, pied de page, pages légales, formulaire…), modifiables dans l'éditeur
 * de contenus (npm run admin) : src/content/ui/fr.json et en.json, de structure identique.
 */
export const ui = { fr, en } satisfies Record<Lang, typeof fr>;

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
    { key: 'services' as RouteKey, label: t.nav.services, href: target('services', s.services) },
    { key: 'approach' as RouteKey, label: phase2 ? t.nav.approach : t.nav.approachSection, href: target('approach', s.approach) },
    { key: 'examples' as RouteKey, label: t.nav.examples, href: target('examples', s.examples) },
    ...(phase2 ? [] : [{ key: 'about' as const, label: t.nav.about, href: `${home}#${s.about}` }]),
    { key: 'contact' as RouteKey, label: t.nav.contact, href: target('contact', s.contact) },
  ];
}

export const otherLang = (lang: Lang): Lang => (lang === 'fr' ? 'en' : 'fr');
