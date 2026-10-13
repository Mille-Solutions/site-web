# Site Mille Solutions — millesolutions.mc

Site vitrine statique (FR / EN) construit avec [Astro](https://astro.build) et Tailwind CSS,
d'après la charte graphique Figma « Mille Solutions Charte Graphique » et le cahier des charges du 12/10/2026.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère le site statique dans dist/
npm run preview  # sert dist/ en local
```

Le dossier `dist/` contient uniquement des fichiers HTML/CSS/JS : il se dépose tel quel sur
n'importe quel hébergement statique (FTP/SFTP, Netlify, etc.).

Le guide complet de mise en ligne et de modification se trouve dans [docs/GUIDE.md](docs/GUIDE.md).

## Modifier les contenus

| Quoi | Où |
|---|---|
| Lien Microsoft Bookings, LinkedIn | `src/content/settings.yaml` |
| Textes de l'accueil | `src/content/home/fr.yaml` et `en.yaml` |
| Mentions légales, confidentialité | `src/content/legal/<langue>/*.md` |
| Libellés de navigation, menus, adresses des pages | `src/i18n/ui.ts` |
| Couleurs, typographies (charte) | `src/styles/global.css` (`@theme`) |

## Structure

- `src/components/home/` — une section de l'accueil par fichier (réutilisables pour les pages de phase 2)
- `src/components/` — logo, en-tête, pied de page, icônes, éléments graphiques de la charte
- `src/pages/` — routes : `/` (FR), `/en/` (EN), pages légales, 404

## Reste à faire

- [ ] Lien Bookings et LinkedIn définitifs (`settings.yaml`)
- [ ] Portrait et photos (actuellement des emplacements réservés)
- [ ] Formulaire de contact
- [ ] Relecture et validation de la traduction anglaise par Charlotte ; pages légales en anglais
- [ ] Compléter les informations entre crochets des pages légales, puis retirer `draft: true`
- [ ] Outil de statistiques (suivi des clics Bookings déjà balisé via `data-track`)
- [ ] Image de partage `public/og-image.png` (1200×630)
- [ ] Phase 2 : pages Accompagnements, Approche et parcours, Exemples de projets, Contact
