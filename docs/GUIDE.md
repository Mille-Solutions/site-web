# Guide de mise en ligne et de modification — Site Mille Solutions

Ce document explique comment publier le site sur **millesolutions.mc**, puis comment le faire évoluer :
modifier un texte, changer un lien, remplacer une image, ajouter du contenu ou adapter la charte.

> **En bref.** Le site est **statique** : la commande `npm run build` produit un dossier `dist/`
> qui contient uniquement des fichiers HTML, CSS, JavaScript, images et polices. Ce dossier se dépose
> tel quel chez n'importe quel hébergeur. Il n'y a ni base de données ni PHP, et aucune mise à jour
> de sécurité côté serveur n'est à prévoir.

---

## 1. Prérequis

| Outil | Rôle | Installation (macOS) |
|---|---|---|
| Node.js 22.12 ou plus récent | Construire le site | `brew install node` |
| Git | Historique des modifications | Inclus avec les outils Xcode (`xcode-select --install`) |
| Client SFTP (optionnel) | Envoyer les fichiers chez l'hébergeur | Cyberduck, FileZilla, ou `rsync` en ligne de commande |

Pour la première installation, depuis le dossier du projet :

```bash
npm install
```

---

## 2. Travailler en local

```bash
npm run dev       # aperçu en direct sur http://localhost:4321 (rechargement automatique)
npm run build     # construit le site final dans dist/
npm run preview   # sert dist/ en local pour vérifier le résultat exact avant envoi
npm run check     # vérifie les erreurs de types et de contenu
```

Si un fichier de contenu est mal rempli (champ manquant, faute de syntaxe YAML), `npm run build`
s'arrête avec un message qui indique le fichier et le champ concernés. Rien de cassé n'est publié.

---

## 3. Mise en ligne

### 3.1 Construire le site

```bash
npm run build
```

Contenu de `dist/` :

```
dist/
├── index.html                 → /                      (accueil FR)
├── en/index.html              → /en/                   (accueil EN)
├── mentions-legales/          → /mentions-legales/
├── confidentialite/           → /confidentialite/
├── en/legal-notice/ …         → pages légales EN
├── 404.html                   → page d'erreur
├── _astro/                    → CSS, JS et polices (noms uniques, mis en cache longtemps)
├── sitemap-index.xml          → plan du site pour les moteurs de recherche
├── robots.txt, favicon.svg
```

### 3.2 Option A — Hébergement SMASH / NUMERICA (Monaco Cloud)

C'est l'hébergeur cité dans les mentions légales. Ses modalités exactes restent à confirmer :
accès SFTP ou FTP, dossier racine du site, gestion du HTTPS.

1. Récupérer auprès de l'hébergeur : hôte, identifiant, mot de passe ou clé SSH, et **dossier racine web**
   (souvent `www/`, `public_html/` ou `htdocs/`).
2. Envoyer **le contenu** de `dist/` (et non le dossier `dist` lui-même) dans ce dossier racine.

   Avec un client graphique (Cyberduck, FileZilla) : glisser le contenu de `dist/` dans le dossier distant.

   En ligne de commande, si l'accès SSH est disponible :

   ```bash
   rsync -avz --delete dist/ utilisateur@serveur:/chemin/vers/www/
   ```

   `--delete` supprime en ligne les fichiers qui n'existent plus en local. Vérifier le chemin
   distant avant de lancer la commande.
3. Configurer la page d'erreur : indiquer `404.html` comme page 404 dans l'interface de l'hébergeur.
   Sur un serveur Apache, on peut aussi ajouter le fichier `public/.htaccess` décrit plus bas.
4. Activer le **HTTPS** (certificat Let's Encrypt en général proposé dans l'interface) et la redirection
   `http://` → `https://`.

Exemple de `public/.htaccess` (à créer seulement si le serveur est Apache) :

```apache
ErrorDocument 404 /404.html

# Forcer HTTPS et le domaine sans www
RewriteEngine On
RewriteCond %{HTTPS} off [OR]
RewriteCond %{HTTP_HOST} ^www\. [NC]
RewriteRule ^ https://millesolutions.mc%{REQUEST_URI} [L,R=301]

# Cache long pour les fichiers versionnés
<IfModule mod_headers.c>
  <FilesMatch "^_astro/">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
</IfModule>
```

Tout fichier placé dans `public/` est copié tel quel à la racine de `dist/`.

### 3.3 Option B — Hébergement statique géré (Netlify, Cloudflare Pages…)

C'est une alternative si l'hébergement SMASH ne convient pas. Ces services offrent un palier gratuit
suffisant pour un site vitrine, ainsi que le HTTPS automatique, les prévisualisations et la
publication automatique à chaque modification poussée sur Git.

| Réglage | Valeur |
|---|---|
| Commande de build | `npm run build` |
| Dossier publié | `dist` |
| Version de Node | 22.12 ou plus |

Avant de choisir cette option :

- les mentions légales et la politique de confidentialité devront citer ce prestataire, son adresse
  et le lieu des serveurs (voir le document « Textes légaux ») ;
- Charlotte doit rester propriétaire du compte, comme le prévoit le cahier des charges (section 13).

### 3.4 Nom de domaine millesolutions.mc

Chez le registraire du `.mc`, faire pointer le domaine vers l'hébergeur retenu :

- **SMASH** : enregistrements DNS fournis par l'hébergeur (en général un enregistrement `A` vers l'adresse IP du serveur) ;
- **Netlify / Cloudflare** : enregistrements indiqués dans leur interface lors de l'ajout du domaine.

La propagation DNS peut prendre quelques heures. L'adresse du site est déclarée dans
`astro.config.mjs` (`site: 'https://millesolutions.mc'`) : elle sert aux liens canoniques, au plan du
site et aux balises de partage. Si le domaine change, c'est là qu'il faut la modifier.

### 3.5 Prévisualisation protégée (avant le lancement)

Le cahier des charges demande une prévisualisation **protégée et non indexée**. Ce n'est pas encore
en place. Deux solutions possibles :

- un sous-domaine (ex. `preview.millesolutions.mc`) protégé par mot de passe dans l'interface de
  l'hébergeur (protection par `.htaccess`/`.htpasswd` sur Apache) ;
- les prévisualisations protégées de Netlify ou Cloudflare Pages.

Dans les deux cas, ajouter un en-tête `X-Robots-Tag: noindex` ou un `robots.txt` qui interdit
l'indexation **sur la prévisualisation uniquement**.

### 3.6 Liste de contrôle avant publication

- [ ] `npm run build` se termine sans erreur
- [ ] Lien **Bookings** définitif dans `src/content/settings.yaml`, puis parcours testé depuis un navigateur privé
      sans compte Microsoft (réservation, confirmation, modification, annulation)
- [ ] Lien **LinkedIn** définitif
- [ ] Portrait et photos en place, avec les droits vérifiés
- [ ] Traduction anglaise relue et validée par Charlotte
- [ ] Informations entre crochets `[…]` complétées dans les pages légales, puis `draft: true` retiré
- [ ] Image de partage `public/og-image.png` (1200 × 630 px) ajoutée
- [ ] Test sur iPhone et Android, puis Chrome, Safari, Firefox et Edge
- [ ] Navigation au clavier : touche Tab sur toute la page, focus visible, menu mobile fermé par Échap
- [ ] HTTPS actif, `http://` et `www.` redirigés
- [ ] Page 404 testée (ex. `https://millesolutions.mc/test-404/`)
- [ ] Plan du site soumis à Google Search Console (`https://millesolutions.mc/sitemap-index.xml`)

### 3.7 Mettre à jour le site après une modification

1. Modifier le fichier concerné (voir section 4).
2. Vérifier en local : `npm run dev`.
3. `npm run build`.
4. Renvoyer le contenu de `dist/` (option A), ou pousser sur Git (option B : publication automatique).

### 3.8 Sauvegarde et restauration

- Le **code source et tous les contenus** sont dans ce dépôt Git. C'est la sauvegarde de référence.
  Il faut le pousser régulièrement vers un dépôt distant appartenant à Charlotte (GitHub, GitLab…).
- Le site en ligne se reconstruit entièrement à partir du dépôt (`npm install && npm run build`).
  Pour restaurer, il suffit de redéployer.
- Pour revenir à une version précédente : `git log` pour trouver la version, `git checkout <version>`,
  puis reconstruire et redéployer.

---

## 4. Modifier le contenu (sans toucher au code)

> Version pas à pas, page par page et depuis GitHub : [MODIFIER-LES-CONTENUS.md](MODIFIER-LES-CONTENUS.md).

Les textes sont dans des fichiers **YAML** (accueil, liens) et **Markdown** (pages légales), un
fichier par langue. Ils s'ouvrent avec n'importe quel éditeur de texte (TextEdit en mode texte brut,
VS Code…).

### 4.1 Où se trouve quoi

| Je veux modifier… | Fichier |
|---|---|
| Le lien **Microsoft Bookings** ou **LinkedIn** | `src/content/settings.yaml` |
| L'adresse d'envoi du **formulaire**, l'activation de l'**anglais** ou de la **phase 2** | `src/content/settings.yaml` (`contactFormEndpoint`, `englishEnabled`, `phase2Enabled`) |
| Les textes des **pages de phase 2** | `src/content/accompagnements/`, `approche/`, `exemples/`, `contact/` |
| Un texte de la **page d'accueil** | `src/content/home/fr.yaml` · `src/content/home/en.yaml` |
| Le **titre et la description** affichés dans Google et sur LinkedIn | `meta:` en haut de `fr.yaml` / `en.yaml` |
| Les **mentions légales** ou la **confidentialité** | `src/content/legal/fr/*.md` · `src/content/legal/en/*.md` |
| Les **libellés du menu**, du pied de page, des pages légales, de la page 404, les erreurs de champ du formulaire | `src/i18n/ui.ts` |
| Les **adresses (URL) des pages** et des ancres de sections | `src/i18n/ui.ts` (`routes` et `sections`) |

### 4.2 Règles d'écriture YAML

```yaml
about:
  title: "Le texte se met entre guillemets droits."
  paragraphs:
    - "Une liste commence par un tiret,"
    - "avec la même indentation pour chaque élément."
```

- L'**indentation** (les espaces en début de ligne) compte : utiliser des espaces, jamais de tabulations.
- Mettre le texte **entre guillemets droits** `"…"`. Les apostrophes typographiques `’` peuvent s'utiliser librement à l'intérieur.
- Les lignes qui commencent par `#` sont des commentaires et ne s'affichent pas.
- Une fois le fichier enregistré, l'aperçu `npm run dev` se met à jour tout seul. En cas d'erreur, le message indique la ligne.

### 4.3 Exemples courants

**Changer le lien de réservation**, utilisé partout sur le site (en-tête, accueil, contact, pied de page) :

```yaml
# src/content/settings.yaml
links:
  bookingsUrl: "https://outlook.office.com/bookwithme/user/…"
```

**Activer la version anglaise**, une fois relue et validée par Charlotte :

```yaml
# src/content/settings.yaml
links:
  englishEnabled: true
```

Tant que la valeur est `false`, « EN » reste visible mais inactif dans l'en-tête, les pages `/en/` ne
sont pas indexées et n'apparaissent ni dans le plan du site ni dans les balises `hreflang`.

**Ajouter un exemple de projet sur l'accueil** : copier un bloc existant sous `examples: items:`
dans `fr.yaml` **et** `en.yaml`.

```yaml
    - title: "Nouveau projet"
      text: "Résumé en une ou deux phrases."
```

Avec quatre exemples, la grille passe sur deux lignes. Pour un affichage équilibré, garder trois ou six exemples, ou adapter la grille (section 5.3).

**Modifier une page légale** : ce sont des fichiers Markdown.

```markdown
## Titre de section

Paragraphe de texte. Un [lien](/confidentialite/).

- élément de liste ;
- autre élément.
```

En haut du fichier, `updated:` correspond à la date affichée et `draft: true` affiche l'avertissement
« Brouillon non publiable » et empêche l'indexation. Retirer cette ligne quand le texte est validé.

Les informations encore à compléter sont balisées ainsi, ce qui les met en évidence sur la page :

```markdown
Prestataire d'hébergement : <span class="missing">[dénomination confirmée]</span>
```

Le paragraphe qui contient une telle balise s'affiche dans un encadré « Champ à compléter » (fond
Azure très clair, comme dans la maquette Figma) et l'information manquante est soulignée en
pointillé. Pour que l'encadré reste lisible, placer chaque information à compléter dans un
paragraphe court, séparé par une ligne vide. Une fois l'information connue, remplacer toute la
balise par le texte définitif : l'encadré disparaît de lui-même.

Le sommaire (colonne de 240 px sur ordinateur, au-dessus du texte sur mobile) est construit
automatiquement à partir des titres `##`. Chaque titre `##` ouvre une rubrique séparée par un filet.
Les tableaux défilent horizontalement dans leur cadre sur mobile, sans élargir la page.

### 4.4 Ce qu'il ne faut pas modifier sans vérifier

- Les champs `id:` des accompagnements servent d'ancres (liens directs vers une carte) : éviter de les changer une fois le site publié.
- Le champ `icon:` n'accepte que `coordination`, `structuration`, `priorisation`, `solutions`, `collaboration` ou `resultats` (sur l'accueil, les exemples utilisent automatiquement `solutions`).
- Le français et l'anglais doivent garder la **même structure** (même nombre d'éléments dans les listes), sinon les deux versions ne se correspondent plus.

---

## 5. Adapter le site (modifications de code)

### 5.1 Organisation du code

```
src/
├── content/               ← CONTENUS (voir section 4)
├── content.config.ts      ← structure attendue des contenus (champs obligatoires)
├── i18n/ui.ts             ← langues, URL des pages, libellés d'interface
├── styles/global.css      ← charte : couleurs, polices, boutons, styles communs
├── layouts/Base.astro     ← squelette commun : <head>, SEO, hreflang, en-tête, pied de page
├── components/
│   ├── Header.astro, Footer.astro, LangSwitch.astro (sélecteur FR / EN)
│   ├── Logo.astro         ← logotype « Mille Solutions » (taille réglable, filet Azure optionnel)
│   ├── Icon.astro         ← icônes de la charte 2026 (grille 24 px, trait 1,75 px)
│   ├── CornerAccent.astro ← angle ouvert : deux traits Azure qui ne se touchent pas
│   ├── PhotoPlaceholder.astro ← emplacements photo provisoires
│   ├── SectionHeading.astro   ← repère de section et titre H2
│   ├── ExternalLink.astro     ← lien externe (nouvel onglet annoncé, attribut de suivi)
│   ├── HomePage.astro         ← assemble les sections de l'accueil
│   ├── LegalPage.astro        ← gabarit des pages légales
│   └── home/              ← Hero, CardSection (situations, accompagnements, méthode, exemples),
│                            About, Contact, ContactForm
└── pages/                 ← une page = un fichier = une URL
```

### 5.2 Charte graphique

Le design system complet (couleurs, typographie, composants, accessibilité, écarts assumés par
rapport à la maquette) est décrit dans [`DESIGN-SYSTEM.md`](DESIGN-SYSTEM.md).

Référence : charte Figma « Mille Solutions — Brand Guidelines 2026 » et maquette « Mille Solutions -
Site Internet REAL ». Les couleurs et les polices sont définies **une seule fois** dans
`src/styles/global.css`, bloc `@theme` :

```css
--color-navy: #0f172a;      /* Navy — logo, titres, texte principal */
--color-ivory: #fafaf8;     /* Ivory — fond principal */
--color-white: #ffffff;     /* White — fond alternatif, cartes */
--color-stone: #6b7280;     /* Stone Grey — informations secondaires */
--color-azur: #4ea8c8;      /* Mediterranean Azure — filets, angle, boutons d'action */
--color-azur-mist: #e6f4f8; /* pastilles d'icônes (maquette du site) */
```

Modifier une valeur la change sur tout le site. Dans le code, ces couleurs s'emploient sous la forme
`text-navy`, `bg-ivory`, `border-azur`…

Rappels de la charte à respecter :

- l'**Azure** reste un accent (10 à 15 % maximum) et ne sert **jamais au texte courant** : contraste insuffisant sur fond clair. Sur les boutons, le texte est en Navy ;
- **Playfair Display** est réservé au mot « Mille » du logo, **Inter** sert à tout le reste. « Mille » et « Solutions » restent sur une ligne ;
- pas de fond de page sombre, pas de dégradé, pas d'or, pas d'ombre marquée ;
- l'angle ouvert reste dans une marge, à au moins 24 px du contenu, et ses deux traits ne se touchent jamais.

### 5.3 Modifier une section de l'accueil

Les sections sont dans `src/components/home/` : `Hero`, `CardSection` (utilisé pour les situations,
les accompagnements, la méthode et les exemples), `About`, `Contact` et `ContactForm`. La mise en page
se règle avec des classes Tailwind directement dans ces fichiers. Exemples :

- fond d'une section à cartes : attribut `tone="white"` ou `tone="ivory"` dans `HomePage.astro` ;
- grille sur 2 colonnes au lieu de 3 : dans `CardSection.astro`, remplacer `md:grid-cols-3` par `md:grid-cols-2` ;
- changer l'ordre des sections : déplacer les lignes correspondantes dans `HomePage.astro`.

**Version mobile** (maquette « Accueil mobile — FR », 390 px) : les classes **sans préfixe** règlent
le mobile, les classes `sm:` rétablissent les valeurs de la tablette et de l'ordinateur, et les
classes `lg:` / `xl:` règlent l'ordinateur. Pour retoucher le mobile sans toucher à l'ordinateur,
modifier une classe sans préfixe et, si besoin, ajouter son équivalent `sm:`. Points propres au
mobile :

- titres H1 et « Parlons de votre situation » en 32 px, textes courants en 16 px, titres de cartes
  en 20 px Medium, 20 px entre titre et texte des cartes ;
- boutons pleine largeur de 56 px de haut (`.btn` dans `global.css`) ;
- sous le bouton de réservation du premier écran, mention « Microsoft Bookings — ouverture dans un
  nouvel onglet. », reprise de `contact.booking.text` (masquée à partir de 640 px) ;
- en-tête : logo, FR / EN et Menu répartis sur toute la largeur ; « EN » inactif en Stone (il
  n'est atténué qu'à partir de 1280 px) ;
- menu ouvert (maquette « Menu mobile ouvert — FR », dans `Header.astro`) : rubriques en 32 px
  SemiBold, 80 px de haut, séparées par un filet `border-rule` ; bouton « Réserver un échange »
  Navy pleine largeur (`btn-dark`) ; signature en 14 px Regular Stone ;
- pied de page : liens de 44 px de haut (cible tactile), liens légaux en 14 px Navy.

Ces réglages s'appliquent aussi aux autres pages qui utilisent les mêmes composants (en-tête, pied
de page, section contact de la page Contact).

Pour **ajouter une section** :

1. créer `src/components/home/NouvelleSection.astro` (s'inspirer d'une section existante) ;
2. déclarer ses champs dans `src/content.config.ts` (collection `home`) ;
3. ajouter les textes dans `fr.yaml` **et** `en.yaml` ;
4. l'insérer dans `HomePage.astro` ;
5. si elle doit apparaître dans le menu, ajouter son ancre dans `sections` (`src/i18n/ui.ts`) et l'entrée dans `Header.astro` / `Footer.astro`.

### 5.4 Remplacer les emplacements photo par de vraies images

Quatre photos proviennent de la maquette Figma : `src/assets/hero-monaco.png` (accueil, origine non
indiquée), `src/assets/accompagnements-monaco.jpg`, `src/assets/approche-monaco.jpg` et
`src/assets/exemples-monaco.jpg` (pages de phase 2, photos prises à l'iPhone, métadonnées retirées).
Leurs droits sont à confirmer avant publication. Le portrait de Charlotte est encore un emplacement
réservé. Pour ajouter une photo au premier
écran d'une page de phase 2, passer `image={…}` et `imageAlt` à `PageHero` (voir
`src/pages/accompagnements.astro`).

1. Placer les images dans `src/assets/` (par ex. `src/assets/portrait.jpg`), en grande taille. Astro les redimensionne et les compresse lui-même, en WebP et en plusieurs tailles.
2. Dans la section concernée (`Hero.astro`, `About.astro`), remplacer `<PhotoPlaceholder … />` par :

   ```astro
   ---
   import { Image } from 'astro:assets';
   import portrait from '../../assets/portrait.jpg';
   ---
   <Image
     src={portrait}
     alt="Charlotte Charles Mille, fondatrice de Mille Solutions"
     widths={[400, 800]}
     sizes="(min-width: 768px) 40vw, 100vw"
     class="aspect-[4/5] w-full rounded-(--radius-card) object-cover"
   />
   ```

3. Le texte `alt` décrit l'image pour les lecteurs d'écran. Il doit exister en français et en anglais : le plus simple est de l'ajouter comme champ dans `fr.yaml` / `en.yaml`.
4. Les images sous le premier écran sont chargées en différé automatiquement. Pour l'image du premier écran, ajouter `loading="eager"`.

La charte fixe le sujet des photos : Monaco et la Méditerranée sans cliché (lumière, architecture,
matière, travail). Pas de luxe, de plage ni de poignées de main artificielles.

### 5.5 Image de partage (LinkedIn, messageries)

Créer `public/og-image.png` en **1200 × 630 px**, par exemple logo et signature sur fond ivory.
Elle est déjà référencée par toutes les pages.

### 5.6 Phase 2 : pages Accompagnements, Approche et parcours, Exemples, Contact

Les quatre pages sont **construites en français** d'après les maquettes Figma « Accompagnements — FR »,
« Approche et parcours — FR », « Exemples de projets — FR » et « Contact — FR » :

| Page | Adresse | Contenus |
|---|---|---|
| Accompagnements | `/accompagnements/` | `src/content/accompagnements/fr.yaml` |
| Approche et parcours | `/approche-et-parcours/` | `src/content/approche/fr.yaml` |
| Exemples de projets | `/exemples-de-projets/` | `src/content/exemples/fr.yaml` |
| Contact | `/contact/` | `src/content/contact/fr.yaml` (+ titre, texte et formulaire de `home/fr.yaml`) |

Elles restent **non publiées** tant que `phase2Enabled: false` dans `settings.yaml` : elles sont
consultables pour la prévisualisation, mais ni liées, ni indexées, ni listées dans le plan du site.
Pour les publier :

```yaml
# src/content/settings.yaml
links:
  phase2Enabled: true
```

Le menu et le pied de page pointent alors vers ces pages au lieu des sections de l'accueil, et les
pages entrent dans le plan du site. L'accueil reste autonome.

Les fichiers des pages sont dans `src/pages/` (`accompagnements.astro`…) et leurs composants dans
`src/components/page/` : `PageHero`, `Statement` (bandeau de déclaration), `CtaSection` (appel final),
`Chips` (étiquettes besoins / livrables), `AzureDivider`.

**Page Contact** : elle réutilise la section contact de l'accueil (`Contact.astro` avec
`tone="dark"` et `headingLevel="h1"`) : fond Navy, cartes blanches sans filet, comme la maquette.
Seuls les libellés de la carte de réservation diffèrent (`src/content/contact/fr.yaml` → `booking`).
Écarts volontaires avec la maquette : texte d'introduction en Ivory à 75 % au lieu de Stone (contraste
AA sur Navy) ; mention de confidentialité commune avec l'accueil (« Consultez la page Confidentialité »,
sans le mot « uniquement » des calques, choix validé) et
complétée par la phrase sur les astérisques ; titre aligné à gauche comme sur l'accueil.

**Ajouter une fiche d'exemple** : copier un bloc sous `projects: items:` dans
`src/content/exemples/fr.yaml`, puis renseigner `title`, `duration`, `situation`, `role`, `actions`
(liste) et `results`. Garder les organisations anonymes et des résultats qualitatifs.

**Version anglaise des pages de phase 2** : à créer (`src/content/<page>/en.yaml` et
`src/pages/en/…`), puis à déclarer dans `src/i18n/ui.ts` → `routes` (remplacer `en: null` par
l'adresse anglaise). Tant que `en: null`, le sélecteur de langue n'affiche pas de lien anglais pour ces
pages.

### 5.7 Ajouter une langue

1. Ajouter la langue dans `astro.config.mjs` (`i18n.locales` et `sitemap.i18n.locales`).
2. L'ajouter dans `src/i18n/ui.ts` : `languages`, chaque entrée de `routes`, `sections` et `ui`.
3. Créer `src/content/home/<langue>.yaml` et les pages dans `src/pages/<langue>/`.
4. Le sélecteur actuel bascule entre deux langues. Avec trois langues ou plus, le transformer en liste.

---

## 6. Fonctionnalités prévues mais pas encore terminées

### 6.1 Formulaire de contact

La partie visible est **en place** (`src/components/home/ContactForm.astro`) : champs de la maquette,
validation dans le navigateur avec messages près des champs, messages exacts de succès, d'échec, d'adresse e-mail invalide et de champ obligatoire (cadre « États du
formulaire » de la maquette « Contact — FR » ; textes dans `home/<langue>.yaml` → `form` et
`src/i18n/ui.ts` → `fieldRequired`, `fieldEmail`),
saisie conservée en cas d'échec, annonce du résultat aux lecteurs d'écran, champ piège anti-robots
(`website`).

Il manque **l'envoi** : un site statique ne peut pas envoyer d'e-mail lui-même. Tant que
`contactFormEndpoint` est vide dans `settings.yaml`, le formulaire est affiché mais désactivé, avec
un message invitant à réserver un échange. Une fois le service choisi, renseigner son adresse :

```yaml
links:
  contactFormEndpoint: "https://millesolutions.mc/contact.php"
```

Le formulaire envoie alors une requête `POST` (champs `name`, `email`, `organisation`, `message`,
`website`, `lang`) et attend une réponse HTTP 2xx en cas de succès. Le service doit, côté serveur :
valider les champs, formats et longueurs ; rejeter les envois dont `website` est rempli ; limiter les
envois ; garder l'adresse destinataire secrète ; envoyer depuis une adresse autorisée avec le visiteur
en Reply-To.

| Solution | Avantages | Points d'attention |
|---|---|---|
| **Script PHP chez SMASH** (si l'hébergement accepte PHP) | Gratuit, données à Monaco, contrôle total | Petit développement à faire et à maintenir |
| **Fonction serverless** (Netlify Functions, Cloudflare Workers) + service d'envoi d'e-mails | Robuste, adapté à l'option B | Prestataires supplémentaires à déclarer |
| **Service de formulaire** (Formspree, Basin…) | Mise en place très rapide | Abonnement possible, données hors de Monaco |
| **Microsoft Forms intégré** (prévu dans les mentions légales) | Déjà dans l'environnement Microsoft de Charlotte | Ne respecte ni la charte, ni la confirmation personnalisée, ni le bilinguisme demandés |

Quel que soit le choix, il faudra mettre à jour la section 2 de la politique de confidentialité et le
tableau des prestataires.

### 6.2 Statistiques de visite

Exigences du cahier des charges : outil sobre, sans publicité ni suivi entre sites, avec export CSV,
comparaison de périodes et comptage des clics vers Bookings.

| Outil | Coût | Hébergement |
|---|---|---|
| **Matomo** auto-hébergé | Gratuit (nécessite PHP + MySQL) | Chez SMASH, à Monaco |
| **Plausible** Cloud | Environ 9 €/mois | Union européenne |
| **Umami** auto-hébergé ou cloud | Gratuit / palier gratuit | Selon le choix |

Le suivi des clics est **déjà préparé** : chaque bouton Bookings porte un attribut `data-track`
indiquant son emplacement (`header`, `menu-mobile`, `hero`, `contact`, et sur les pages de phase 2 `services-hero`, `services-cta`, `approach-hero`, `approach-cta`, `examples-cta`). Un envoi réussi du formulaire
déclenche l'événement `contact:sent`, sans aucun contenu du message. Il suffira de relier ces
attributs et cet événement à l'outil retenu. Ne jamais envoyer de nom, d'e-mail ni de
contenu de message à l'outil de statistiques. La politique de confidentialité (sections 5 et 8)
doit décrire l'outil réellement installé.

### 6.3 Édition des contenus depuis un navigateur (optionnel)

Si Charlotte préfère modifier les textes sans éditeur de texte ni Git, on peut ajouter une interface
d'administration légère, sans base de données, qui écrit directement dans les fichiers YAML et
Markdown du dépôt. Exemples : **Sveltia CMS** ou **Decap CMS**, accessibles sur `/admin/`. Cela
suppose un dépôt Git hébergé (GitHub ou GitLab) et, de préférence, une publication automatique
(option B).

---

## 7. Coûts récurrents à prévoir

| Poste | Estimation | Remarque |
|---|---|---|
| Domaine `millesolutions.mc` | Selon le registraire | Déjà acquis, renouvellement annuel |
| Hébergement | 0 € (Netlify / Cloudflare, palier gratuit) à l'offre SMASH | À confirmer |
| Formulaire | 0 € (PHP chez SMASH) à quelques €/mois | Selon la solution (section 6.1) |
| Statistiques | 0 € (Matomo, Umami) à environ 9 €/mois (Plausible) | À valider par Charlotte |

Le code n'utilise aucune bibliothèque payante et aucun service externe n'est appelé au chargement
des pages.
