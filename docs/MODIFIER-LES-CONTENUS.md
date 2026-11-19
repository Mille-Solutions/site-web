# Modifier les contenus du site Mille Solutions

Ce document indique **quel fichier modifier** pour changer un texte, un lien ou une photo du site,
sans toucher au code. Tous les chemins partent de la racine du dépôt
`github.com/Mille-Solutions/site-web`.

> **Important** : pour l'instant, enregistrer une modification sur GitHub **ne met pas le site en
> ligne à jour**. Le site doit ensuite être reconstruit et republié (voir
> [GUIDE.md](GUIDE.md), § 3.7). Prévenir la personne qui gère la mise en ligne après chaque
> modification.

---

## 1. Modifier un fichier sur GitHub

1. Ouvrir le dépôt sur github.com et naviguer jusqu'au fichier (ex. `src/content/home/fr.yaml`).
2. Cliquer sur l'icône **crayon** (« Edit this file ») en haut à droite du fichier.
3. Modifier le texte **entre les guillemets**, sans toucher au reste de la ligne.
4. Cliquer sur **Commit changes…**, écrire une courte description (ex. « Accueil : nouveau texte
   d'introduction ») et valider.

Pour retrouver un texte rapidement : touche **T** dans le dépôt pour chercher un fichier, ou la
barre de recherche GitHub pour chercher une phrase dans tout le dépôt.

## 2. Règles à respecter

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

## 3. Où se trouve chaque contenu

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

### Menu, pied de page et petits libellés — `src/i18n/ui.ts`

Ce fichier contient du code : ne modifier que le texte **entre apostrophes** `'…'`, en gardant
les virgules en fin de ligne. Pour écrire une apostrophe dans un texte, utiliser `’`.

| Je veux changer…                                           | Champ                           |
| ---------------------------------------------------------- | ------------------------------- |
| Les rubriques du menu et du pied de page                   | `home`, `nav: { … }`            |
| Le bouton « Réserver un échange » de l'en-tête et du menu  | `book`                          |
| La signature « Structurer. Prioriser. Concrétiser. »       | `signature`                     |
| Les lignes « Contact » du pied de page                     | `footerContactLines`            |
| Le texte de copyright                                      | `rights`                        |
| Les messages d'erreur des champs du formulaire             | `fieldRequired`, `fieldEmail`   |
| La page « Page introuvable »                               | `notFoundTitle`, `notFoundText`, `backHome` |

Le bloc `fr: { … }` contient le français, le bloc `en: { … }` l'anglais.

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

## 4. À ne pas modifier sans précaution

- Les noms de champs (avant les deux-points) et les noms de fichiers.
- Les champs `id:` des accompagnements : ils servent de liens directs vers une carte.
- Les champs `icon:` : seules les valeurs `coordination`, `structuration`, `priorisation`,
  `solutions`, `collaboration` et `resultats` sont acceptées.
- Les adresses des pages (`routes`) et les ancres (`sections`) dans `src/i18n/ui.ts`.
- Tout ce qui se trouve dans `src/components/`, `src/pages/`, `src/layouts/` et `src/styles/` :
  c'est le code et la mise en forme du site.

## 5. En cas d'erreur

Une faute de syntaxe (guillemet manquant, espace en trop en début de ligne) empêche la
reconstruction du site, qui indique alors le fichier et la ligne en cause. L'historique de
chaque fichier sur GitHub (« History ») permet de revoir et d'annuler une modification.
