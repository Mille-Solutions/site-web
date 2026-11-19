# Modifier les contenus du site Mille Solutions

Ce document explique comment changer un texte, un lien ou une photo du site sans toucher au code :
d'abord avec l'**éditeur de contenus** (méthode recommandée), puis directement dans les fichiers.
Tous les chemins partent de la racine du dépôt `github.com/Mille-Solutions/site-web`.

> **Important** : enregistrer une modification, dans l'éditeur ou sur GitHub, **ne met pas le site
> en ligne à jour**. Le site doit ensuite être reconstruit et republié (voir
> [GUIDE.md](GUIDE.md), § 3.7). Prévenir la personne qui gère la mise en ligne après chaque
> modification.

---

## 1. Méthode recommandée : l'éditeur de contenus

L'éditeur (Sveltia CMS) présente chaque page sous forme de formulaires : un champ par texte, avec
une aide sous les champs sensibles. Il fonctionne **sur l'ordinateur**, dans le dossier du site, et
enregistre directement dans les fichiers de contenu. Il n'est jamais publié avec le site.

### 1.1 Installation (une seule fois)

1. Installer **Node.js** version 22.12 ou plus récente (nodejs.org, version « LTS »).
2. Installer **Google Chrome** ou **Microsoft Edge** : l'éditeur a besoin de l'un de ces deux
   navigateurs pour enregistrer dans le dossier (Safari et Firefox ne le permettent pas).
3. Récupérer le dossier du site (dépôt Git `Mille-Solutions/site-web`), par exemple avec
   **GitHub Desktop** (« Clone repository »), qui servira aussi à envoyer les modifications.
4. Dans un terminal ouvert dans ce dossier, lancer une fois :

   ```bash
   npm install
   ```

### 1.2 Utilisation

1. Dans un terminal ouvert dans le dossier du site, lancer :

   ```bash
   npm run admin
   ```

   L'éditeur s'ouvre dans Chrome (ou Edge) sur `http://localhost:4321/admin/`. L'aperçu du site
   est sur `http://localhost:4321/` et se met à jour à chaque enregistrement.
2. Cliquer sur **Travailler avec un dépôt local**, puis choisir le **dossier du site**
   (`site-web`, celui qui contient `package.json`) et autoriser l'accès en modification. Le
   navigateur s'en souvient ; il peut redemander l'autorisation à l'ouverture suivante.
3. Choisir une rubrique à gauche (Accueil, Pages détaillées, Pages légales, Menu et libellés,
   Réglages), puis la page à modifier. Les sections se déplient d'un clic.
4. Modifier les textes, puis cliquer sur **Enregistrer** en haut à droite.
5. Vérifier le résultat dans l'onglet de l'aperçu.
6. Pour arrêter : fermer l'onglet, puis **Ctrl+C** dans le terminal.

### 1.3 Après les modifications

Les fichiers modifiés sont enregistrés dans le dossier, mais pas encore sur GitHub. Dans
**GitHub Desktop** : écrire un court résumé (ex. « Accueil : nouveau texte d'introduction »),
cliquer sur **Commit to main**, puis sur **Push origin**. Prévenir ensuite la personne qui gère la
mise en ligne.

### 1.4 Bon à savoir

- Les **photos** ne se changent pas dans l'éditeur (voir § 4, « Photos »).
- Les entrées marquées **« anglais (à valider) »** ne sont visibles sur le site qu'une fois la
  version anglaise activée dans les réglages ; garder la même structure qu'en français (même
  nombre d'éléments dans chaque liste).
- Les **pages légales** s'écrivent en Markdown dans le champ « Texte » (voir § 3, « Fichiers
  Markdown ») ; l'aide sous le champ rappelle l'essentiel.
- Les **pages détaillées (phase 2)** se préparent dans l'éditeur, mais ne sont publiées qu'une fois
  l'option « Publier les pages détaillées » activée dans les réglages.
- L'éditeur réécrit les fichiers dans un format homogène : les notes internes (lignes commençant
  par `#`) des fichiers YAML disparaissent au premier enregistrement. C'est normal.

---

## 2. Autre méthode : modifier un fichier sur GitHub

1. Ouvrir le dépôt sur github.com et naviguer jusqu'au fichier (ex. `src/content/home/fr.yaml`).
2. Cliquer sur l'icône **crayon** (« Edit this file ») en haut à droite du fichier.
3. Modifier le texte **entre les guillemets**, sans toucher au reste de la ligne.
4. Cliquer sur **Commit changes…**, écrire une courte description (ex. « Accueil : nouveau texte
   d'introduction ») et valider.

Pour retrouver un texte rapidement : touche **T** dans le dépôt pour chercher un fichier, ou la
barre de recherche GitHub pour chercher une phrase dans tout le dépôt.

## 3. Règles à respecter

### Fichiers YAML (`.yaml`) — la plupart des textes

```yaml
about:
  title: "Qui suis-je ?"
  paragraphs:
    - "Premier paragraphe."
    - "Deuxième paragraphe."
```

- Ne modifier que le texte **entre guillemets droits** `"…"`. Le nom avant les deux-points
  (`title:`, `paragraphs:`) ne doit **jamais** être changé ni traduit.
- Garder **exactement les mêmes espaces** en début de ligne (pas de tabulation).
- Un élément de liste commence par `- ` ; pour en ajouter un, copier une ligne existante.
- À l'intérieur des guillemets, utiliser l'apostrophe typographique `’` (ou `'`), jamais le
  guillemet droit `"`. Pour citer, utiliser les guillemets français « … ».
- Les lignes qui commencent par `#` sont des notes internes : elles ne s'affichent pas.

### Fichiers Markdown (`.md`) — pages légales

- `## Titre` crée une rubrique (et une entrée du sommaire).
- Une ligne vide sépare deux paragraphes ; `- ` crée une liste ; `**texte**` met en gras ;
  `[texte du lien](/confidentialite/)` crée un lien.
- Le bloc entre les deux lignes `---` en haut du fichier contient le titre, la description et la
  date de mise à jour.

### Français et anglais

Chaque texte existe en français (`fr.yaml`, dossier `fr/`) et en anglais (`en.yaml`, dossier
`en/`). Après une modification en français, penser à la version anglaise. Les deux fichiers
doivent garder **la même structure** (même nombre d'éléments dans chaque liste).

---

## 4. Où se trouve chaque contenu

Dans l'éditeur, les rubriques reprennent ce découpage ; sur GitHub, voici les fichiers à ouvrir.

### Réglages généraux — `src/content/settings.yaml`

| Je veux changer…                                   | Champ                 |
| -------------------------------------------------- | --------------------- |
| Le lien de réservation Microsoft Bookings (tous les boutons « Réserver ») | `bookingsUrl` |
| Le lien vers le profil LinkedIn                    | `linkedinUrl`         |
| L'adresse d'envoi du formulaire de contact         | `contactFormEndpoint` |
| Activer la version anglaise (après validation)     | `englishEnabled: true` |
| Publier les pages détaillées (phase 2)             | `phase2Enabled: true` |

### Page d'accueil — `src/content/home/fr.yaml` (anglais : `en.yaml`)

Les sections apparaissent dans cet ordre sur la page :

| Section affichée                          | Bloc du fichier | Contenu                                                   |
| ----------------------------------------- | --------------- | --------------------------------------------------------- |
| Titre et description dans Google / LinkedIn | `meta:`       | `title`, `description`                                    |
| Premier écran                             | `hero:`         | grand titre (`title`, une ligne par tiret), texte (`lead`), « Mon engagement » (`engagementLabel`, `signature`), boutons (`cta`, `secondary`), description de la photo (`imageAlt`) |
| « Vous vous reconnaissez »                | `situations:`   | repère (`eyebrow`), titre, 3 cartes (`items` : `title`, `text`) |
| « Trois accompagnements »                 | `services:`     | idem                                                      |
| « Approche »                              | `method:`       | repère, titre, 3 étapes (`steps`)                         |
| « Exemples de projets »                   | `examples:`     | repère, titre, 3 exemples (`items`), mention en bas (`note`) |
| « À propos » / « Qui suis-je ? »          | `about:`        | repère, titre, paragraphes (`paragraphs`, le premier est affiché en grand), bouton (`cta`) |
| « Parlons de votre situation »            | `contact:`      | titre, texte, encadré de réservation (`booking`), formulaire (`form` : libellés, textes d'aide, messages de confirmation et d'erreur) |

### Pages détaillées (phase 2)

Ces pages ne sont publiées qu'une fois `phase2Enabled: true` dans les réglages.

| Page                                    | Fichier                              | Blocs principaux                                       |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------ |
| Accompagnements `/accompagnements/`     | `src/content/accompagnements/fr.yaml` | `hero`, `statement` (phrase centrale), `list` (les 3 accompagnements : `needs` besoins, `intervention`, `deliverables` livrables), `approach`, `cta` (bandeau final) |
| Approche et parcours `/approche-et-parcours/` | `src/content/approche/fr.yaml` | `hero`, `statement`, `intro` (« Ma méthode »), `method` (3 étapes), `principles` (6 principes), `background` (« Mon parcours »), `cta` |
| Exemples de projets `/exemples-de-projets/` | `src/content/exemples/fr.yaml`   | `hero`, `projects` (3 fiches : `situation`, `role`, `actions`, `results`, `duration`), `cta` |
| Contact `/contact/`                     | `src/content/contact/fr.yaml`        | `booking` (encadré de réservation) — le titre, le texte et le formulaire sont ceux de l'accueil (`contact:` dans `home/fr.yaml`) |

### Pages légales — `src/content/legal/`

| Page                      | Fichier                                 |
| ------------------------- | --------------------------------------- |
| Mentions légales          | `legal/fr/mentions-legales.md` (anglais : `legal/en/legal-notice.md`) |
| Confidentialité et cookies | `legal/fr/confidentialite.md` (anglais : `legal/en/privacy.md`) |

- `updated:` en haut du fichier : date « Dernière mise à jour » affichée.
- `draft: true` : affiche l'avertissement « Brouillon non publiable » et empêche l'indexation par
  Google. **Supprimer cette ligne** une fois le texte validé.
- Les informations à compléter sont écrites ainsi :
  `<span class="missing">[adresse complète]</span>`. Remplacer **toute la balise** (y compris
  `<span …>` et `</span>`) par le texte définitif ; l'encadré bleu disparaît de lui-même.

### Menu, pied de page et petits libellés — `src/content/ui/fr.json` (anglais : `en.json`)

Fichiers JSON : ne modifier que le texte **entre guillemets** `"…"`, en gardant les virgules en
fin de ligne. Pour écrire une apostrophe dans un texte, utiliser `’`.

| Je veux changer…                                           | Champ                           |
| ---------------------------------------------------------- | ------------------------------- |
| Les rubriques du menu et du pied de page                   | `home`, `nav: { … }`            |
| Le bouton « Réserver un échange » de l'en-tête et du menu  | `book`                          |
| La signature « Structurer. Prioriser. Concrétiser. »       | `signature`                     |
| Les lignes « Contact » du pied de page                     | `footerContactLines`            |
| Le texte de copyright                                      | `rights`                        |
| Les messages d'erreur des champs du formulaire             | `fieldRequired`, `fieldEmail`   |
| La page « Page introuvable »                               | `notFoundTitle`, `notFoundText`, `backHome` |

### Photos — `src/assets/`

| Photo                                  | Fichier                          |
| -------------------------------------- | -------------------------------- |
| Premier écran de l'accueil             | `hero-monaco.png`                |
| Page Accompagnements                   | `accompagnements-monaco.jpg`     |
| Page Approche et parcours              | `approche-monaco.jpg`            |
| Page Exemples de projets               | `exemples-monaco.jpg`            |

Pour remplacer une photo sans toucher au code : téléverser la nouvelle image **sous exactement le
même nom et le même format** (« Add file » → « Upload files » dans le dossier `src/assets/`),
en format paysage, 2 560 px de large au maximum. Mettre à jour la description de la photo
(`imageAlt`) dans le fichier de contenu de la page. Le portrait de Charlotte et les nouvelles
photos demandent une petite modification de code (voir [GUIDE.md](GUIDE.md), § 5.4).

---

## 5. À ne pas modifier sans précaution

- Les noms de champs (avant les deux-points) et les noms de fichiers.
- Les champs `id:` des accompagnements : ils servent de liens directs vers une carte.
- Les champs `icon:` : seules les valeurs `coordination`, `structuration`, `priorisation`,
  `solutions`, `collaboration` et `resultats` sont acceptées.
- Les adresses des pages (`routes`) et les ancres (`sections`) dans `src/i18n/ui.ts`.
- Tout ce qui se trouve dans `src/components/`, `src/pages/`, `src/layouts/` et `src/styles/` :
  c'est le code et la mise en forme du site.

## 6. En cas d'erreur

- **Dans l'éditeur** : les champs obligatoires laissés vides sont signalés en rouge et bloquent
  l'enregistrement. Pour annuler des modifications pas encore envoyées sur GitHub : dans GitHub
  Desktop, clic droit sur le fichier → **Discard changes**.
- **Sur GitHub** : une faute de syntaxe (guillemet manquant, espace en trop en début de ligne)
  empêche la reconstruction du site, qui indique alors le fichier et la ligne en cause.
- Dans tous les cas, l'historique de chaque fichier sur GitHub (« History ») permet de revoir et
  d'annuler une modification.
- L'aperçu `http://localhost:4321/` ne répond plus ou l'éditeur reste blanc : arrêter avec
  **Ctrl+C** dans le terminal et relancer `npm run admin`.
