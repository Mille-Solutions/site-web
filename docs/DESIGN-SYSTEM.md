# Design system — Site Mille Solutions

Référence de conception du site millesolutions.mc. À relire **avant toute création ou modification
d'interface** et à tenir à jour quand une règle change.

Sources, par ordre de priorité :

1. charte Figma « Mille Solutions — Brand Guidelines 2026 » ;
2. maquettes Figma « Mille Solutions - Site Internet REAL » (fichier `ClFagLZsXO415Jegs8ym16`) :
   Accueil, Accueil mobile, Menu mobile ouvert, Accompagnements, Approche et parcours,
   Exemples de projets, Contact, États du formulaire, Mentions légales ;
3. accessibilité WCAG 2.2 AA, qui l'emporte sur la maquette en cas de conflit (voir § 9).

Implémentation : Astro + Tailwind CSS 4. Les jetons sont définis **une seule fois** dans
`src/styles/global.css` (bloc `@theme`) ; les classes de composants communes y sont aussi.

---

## 1. Principes

- **Sobre, clair, institutionnel** : beaucoup d'espace, peu d'effets, un seul accent de couleur.
- **Azure = accent, jamais texte** : 10 à 15 % de la surface au maximum (filets, angle ouvert,
  bordures de cartes, pastilles, boutons d'action).
- **Interdits** : dégradés, ombres marquées, or, fond de page sombre généralisé, coins arrondis sur
  les boutons, Playfair Display hors du logo.
- Fonds Navy autorisés seulement pour des **bandeaux** ponctuels : section Contact.
- Pas d'appel commercial (réservation, « Réserver un échange ») : la prise de contact passe par le
  formulaire de la section Contact.
- Mobile d'abord : les classes sans préfixe règlent le mobile (maquette 390 px), `sm:` rétablit
  tablette/ordinateur, `lg:` / `xl:` règlent l'ordinateur (maquette 1440 px).

## 2. Couleurs

| Jeton Tailwind   | Valeur    | Usage                                                              |
| ---------------- | --------- | ------------------------------------------------------------------ |
| `navy`           | `#0f172a` | Texte principal, titres, logo, bouton principal du premier écran   |
| `ivory`          | `#fafaf8` | Fond de page par défaut ; texte sur fond Navy                      |
| `white`          | `#ffffff` | Fond alternatif de section, fond des cartes et des champs          |
| `stone`          | `#6b7280` | Texte secondaire, repères (eyebrow), légendes                      |
| `azur`           | `#4ea8c8` | Filets, bordures de cartes et champs, bouton `btn-primary`, focus  |
| `azur-mist`      | `#e6f4f8` | Pastilles d'icônes, encadrés d'information, en-têtes de tableau    |
| `line`           | `#e5e7eb` | Bordure des cartes `card-soft` (Approche et parcours)              |
| `rule`           | `#cfdde2` | Filets entre rubriques (pages légales, menu mobile)                |
| `mist`           | `#e3e8eb` | Emplacements photo provisoires                                     |

Valeurs ponctuelles (pas de jeton) : survol `btn-primary` `#62b4d1`, survol `btn-dark` `#1e293b`,
erreur de formulaire `#b42318`.

Sur fond Navy : texte secondaire en `text-ivory/75` (et non Stone, contraste insuffisant), notes
en `text-ivory/70`, halo décoratif `bg-azur/10 blur-[50px]`.

## 3. Typographie

- **Inter** (300, 400, 500, 600) pour tout le texte. Graisses utilisées : 400 courant, 500 Medium,
  600 SemiBold. 300 Light uniquement pour « Solutions » dans le logo.
- **Playfair Display 600** (`font-wordmark`) **uniquement** pour le mot « Mille » du logo.
- Titres en `text-balance`. Pas de majuscules forcées sauf la ligne de copyright.

Échelle (mobile → ordinateur ; taille / interligne) :

| Rôle                                  | Mobile        | `sm`          | `lg`               | Graisse  |
| ------------------------------------- | ------------- | ------------- | ------------------ | -------- |
| H1 accueil                            | 32 / 1.25     | 48 / 1.1      | 64 / 1.05          | 600, tracking −0,015em (sm+) |
| H1 pages (hero « stacked »)           | 40 / 1.2      | —             | 48                 | 600      |
| H1 pages (hero « split »)             | 40 / 1.1      | —             | 72 / 1.05          | 600      |
| H1 pages légales                      | 40 / 1.2      | —             | 48 / 58 px         | 600      |
| Grand titre Contact / appel final     | 32–40         | 40            | 80                 | 600      |
| Déclaration (`Statement`)             | 36 / 1.15     | —             | 64                 | 600      |
| H2 `.h2` (accueil)                    | 32 / 1.25     | —             | 48 / 1.2           | 600      |
| H2 pages de phase 2 (`size="md"`)     | 28 / 1.25     | —             | 32                 | 600      |
| H3 `.h3` (cartes accueil)             | 20 / 1.3      | —             | 28 / 1.2           | 500 mobile, 600 sm+ |
| Rubrique pages légales / cartes carrées | 20 / 1.3    | —             | 20                 | 500      |
| Phrase d'accroche (signature, About)  | 20 / 1.3      | 24 / 1.2      | 32 / 1.2           | 500 → 600 |
| Chapeau (lead)                        | 16 / 24       | 18 / 1.6      | 20 (hero accueil)  | 400, Stone |
| Texte courant                         | 16 / 24       | 18 / 1.6 en section | —            | 400, Stone |
| Repère `.eyebrow`                     | 14            | —             | —                  | 600, Stone (12 en `size="md"`) |
| Petits textes, notes, labels          | 14            | —             | —                  | 400–600  |
| Rubriques du menu mobile              | 32            | —             | —                  | 600      |

## 4. Mise en page et espacements

- Conteneur : `.container-site` → largeur max 1440 px (`90rem`), marges latérales 24 px mobile,
  80 px à partir de `lg`.
- Section standard : `.section` → 64 px mobile, 120 px `lg` (haut et bas). Sections de phase 2 à
  cartes : 80 px → 160 px.
- Rythme vertical interne : 32 px entre titre de section et contenu (64 px en `lg`), 24–32 px entre
  blocs de texte, 16 px (`gap-4`) mobile / 32 px (`lg:gap-8`) entre cartes.
- Largeur de lecture : `max-w-[53rem]` pour les blocs titre + texte, `max-w-[60rem]` pour le texte
  juridique.
- Grilles : cartes en 1 colonne puis 3 colonnes à partir de `md` ; deux colonnes asymétriques en
  `lg` (ex. à propos `22.5rem / 1fr`, légal `15rem / 1fr`). Formulaire de contact seul, largeur max.
  `45.8125rem` (733 px).
- Points de rupture : Tailwind par défaut (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). La navigation
  complète apparaît en `xl` ; en dessous, bouton « Menu ». Liens du menu sur une seule ligne
  (`whitespace-nowrap`), espacés de 24 px jusqu'à 1440 px puis de 32 px (maquette).
- Menu en phase 1 (sections de l'accueil) : Accueil, Vos besoins, Approche, Exemples de projets,
  À propos, Contact. Pas de bouton dans l'en-tête ni dans le menu mobile. En phase 2 (pages) :
  « Vos besoins » pointe toujours vers la section de l'accueil, « Approche et parcours » remplace
  « Approche » et « À propos » disparaît, le parcours étant présenté sur cette page.
- En-tête collant de 88 px (`h-[5.5rem]`), filet Azure en bas ; `scroll-padding-top: 6.5rem`.
- Rayon unique : `--radius-card` = 16 px (cartes arrondies, images, emplacements photo). Champs de
  formulaire : 8 px. Boutons, cartes carrées et chips de bord : angles droits (les chips sont en
  pilule).

## 5. Composants (classes et fichiers)

### Boutons — `.btn` + variante
- `.btn` : hauteur min. 56 px mobile / 53 px `sm+`, texte 14 SemiBold, angles droits, pleine
  largeur sur mobile (`w-full sm:w-auto` ou empilés en colonne).
- `.btn-dark` : fond Navy, texte Ivory → action principale sur fond clair (aucun bouton dans le
  premier écran de l'accueil ni dans les premiers écrans des pages).
- `.btn-primary` : fond Azure, texte **Navy** (jamais blanc) → LinkedIn (section À propos), envoi du
  formulaire.
- `.btn-secondary` : contour Navy 1 px, texte Navy → action secondaire (ancre interne).
- Tout lien vers un site externe passe par `ExternalLink.astro`
  (nouvel onglet annoncé aux lecteurs d'écran, attribut `data-track`).

### Cartes
- `.card` : blanc, bordure Azure 1 px, rayon 16, padding 24 → 32 (accueil, contact). Sur fond
  Navy, ajouter `border-0`.
- `.card-square` : fond Ivory, bordure Azure, angles droits, padding 24 → 40 (Accompagnements).
- `.card-soft` : blanc, bordure `line`, rayon 16 (Approche et parcours).
- Composant : `home/CardSection.astro`, `variant="rounded" | "square" | "soft"`, `tone="ivory" | "white"`.
- Contenu d'une carte : titre, puis `text` (un paragraphe) ou `paragraphs` (plusieurs, espacés de
  12 px) ; cartes d'exemples (variante `rounded`) : `category` au-dessus du texte (14 SemiBold
  Stone) et `context` en dessous (14 italique Stone). Note de section facultative (`note`, 14 Stone).

### Pastilles d'icônes
- `.icon-badge` : 48 px, `azur-mist`, icône Navy (accueil).
- `.icon-badge-azur` : 56 px, Azure plein, icône Navy (Accompagnements).
- `.icon-badge-soft` : 56 px, `azur-mist`, icône Azure (Approche et parcours).

### Autres éléments
- `.eyebrow` : repère de section au-dessus d'un titre (Stone, jamais Azure).
- `.chip` (`page/Chips.astro`) : pilule Ivory, bordure Azure, 14 px.
- `.link-underline` : soulignement Azure 1 px, 2 px au survol.
- `SectionHeading.astro` : repère + H2 + sous-titre, `size="lg" | "md"`.
- `PageHero.astro` : premier écran des pages, `layout="stacked" | "split"`, `imageRatio`.
- `Statement.astro` : phrase centrée entre deux filets Azure à 60 %.
- `AzureDivider.astro` : filet Azure court (64 × 1 px).
- `home/Contact.astro` : `tone="dark"` (fond Navy, utilisé sur l'accueil et la page Contact) ;
  repère facultatif (`eyebrow`, `text-ivory/75` sur Navy), titre, texte, puis formulaire.
- `home/ContactForm.astro` : champs blancs, bordure Azure, rayon 8, padding 16 ; libellés 14
  SemiBold ; astérisque pour les champs obligatoires ; message d'erreur sous le champ en `#b42318`
  (`aria-invalid`, `aria-describedby`) ; encadré d'information `border-l-2 border-azur bg-azur-mist` ;
  phrase d'introduction facultative sous le repère (`intro`, 16 Stone).
- Encadrés d'avertissement : `border-l-3 border-azur bg-azur-mist p-6`.
- Pages légales : `.prose-legal` (rubriques `##` ouvertes par un filet `rule`, informations à
  compléter en `<span class="missing">[…]</span>`, voir GUIDE § 4.3).

## 6. Éléments de signature

- **Logo** (`Logo.astro`) : « Mille » Playfair 600 + « Solutions » Inter 300 à 61 % de la taille,
  sur une seule ligne, Navy. Taille 24 dans l'en-tête et le pied de page. Filet Azure optionnel
  (`accent`), à 12 px minimum sous le logo.
- **Angle ouvert** (`CornerAccent.astro`) : deux traits Azure de 1,5 px qui **ne se touchent
  jamais** (cadre 64 × 64 : horizontal 46 px en haut à gauche, vertical 46 px à droite à 18 px du
  haut). Toujours dans une marge, à 24 px minimum du contenu, masqué sur mobile.
- **Filets Azure** : bas de l'en-tête, haut du pied de page, encadrement du `Statement`.

## 7. Iconographie

- `Icon.astro` : grille 24 × 24, trait 1,75 px (1,5 px pour les icônes d'interface), extrémités
  et jointures arrondies, aucun remplissage, couleur `currentColor`.
- Icônes métier (tracés repris de Figma « 07b — Iconographie ») : `coordination`,
  `structuration`, `priorisation`, `solutions`, `collaboration`, `resultats`.
- Icônes d'interface : `arrow`, `external`, `menu`, `close`.
- Toujours décoratives (`aria-hidden`) : le sens est porté par le texte voisin.
- Nouvelle icône : même grille et même trait, tracé fourni par Figma de préférence.

## 8. Images

- Photographies de Monaco, lumineuses, sans filtre ; jamais de texte incrusté.
- Via `<Image>` d'`astro:assets` (formats modernes, `widths` / `sizes`), largeur de sortie max.
  1920 px ; sources redimensionnées à 2560 px max., métadonnées EXIF supprimées.
- Formats : hero accueil 342/240 mobile → 1280/520 ; hero pages 1280/520 ou 1280/480 ; hero
  « split » 342/320 → 720/688 ; portrait 342/380 → 360/480.
- Rayon 16 px sur les images de l'accueil ; texte alternatif dans les fichiers de contenu, dans
  chaque langue (jamais en dur dans un composant ; portrait : `about.portraitAlt`).
- En attendant les vraies photos : `PhotoPlaceholder.astro` (fond `mist`, légende Stone).

## 9. Accessibilité (WCAG 2.2 AA)

- Contraste ≥ 4,5:1 pour le texte : **pas d'Azure pour du texte** sur fond clair ; Stone autorisé
  sur Ivory et blanc ; sur Navy, `text-ivory/75` au minimum.
- Focus visible partout : contour Azure 3 px, décalage 4 px (`:focus-visible` global).
- Cibles tactiles ≥ 44 px (`min-h-11`) ; boutons 56 px sur mobile.
- Liens externes : nouvel onglet annoncé (`ExternalLink`) ; lien d'évitement en début de page ;
  `aria-current="page"` sur la rubrique active ; menu mobile fermable avec Échap.
- Animations (`.reveal`) désactivées si `prefers-reduced-motion`.
- L'information ne repose jamais sur la couleur seule (crochets + pointillés pour les champs à
  compléter, texte + bordure pour les erreurs).
- Une seule balise `h1` par page ; hiérarchie de titres continue.

## 10. Écarts assumés par rapport à la maquette

| Maquette                                     | Site                                   | Raison                          |
| -------------------------------------------- | -------------------------------------- | ------------------------------- |
| Texte Stone sur fond Navy                    | `text-ivory/75`                        | Contraste AA                    |
| Repère (eyebrow) en Azure                    | Stone                                  | Azure jamais en texte           |
| « ALL RIGHTS RESERVED »                      | « Tous droits réservés. » en français  | Cohérence de langue             |
| Pieds de page différents selon les pages     | Un pied de page unique                 | Cohérence, maintenance          |
| « EN » cliquable                             | Inactif tant que `englishEnabled: false` | Traduction non validée          |

## 11. Rédaction et contenus

- Textes dans `src/content/` (YAML / Markdown), jamais en dur dans les composants ; libellés
  d'interface dans `src/i18n/ui.ts`, en français **et** en anglais.
- Typographie française : guillemets « … » avec espaces insécables, espace insécable avant
  `: ; ? !`, heures au format « 19 h », apostrophe typographique ’.
- Ton : vouvoiement, phrases courtes, concret, sans superlatifs.

## 12. Liste de contrôle pour toute nouvelle interface

1. Réutiliser d'abord une classe ou un composant existant (§ 5) ; sinon, l'ajouter à
   `global.css` ou `src/components/` et **compléter ce document**.
2. Uniquement les jetons de couleur du § 2 ; Azure ≤ 15 %, jamais en texte.
3. Échelle typographique du § 3, mobile d'abord.
4. Vérifier à 390 px et 1440 px (capture), focus clavier, contraste, cibles de 44 px.
5. `npx astro check` et `npm run build` sans erreur.
