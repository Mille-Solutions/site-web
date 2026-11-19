# Site Mille Solutions — millesolutions.mc

Site vitrine statique (FR / EN) construit avec [Astro](https://astro.build) et Tailwind CSS,
d'après la charte Figma « Mille Solutions — Brand Guidelines 2026 », la maquette « Mille Solutions - Site
Internet REAL » et le cahier des charges du 12/10/2026.

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
Pour modifier les textes, liens et photos sans toucher au code : [docs/MODIFIER-LES-CONTENUS.md](docs/MODIFIER-LES-CONTENUS.md).

## Modifier les contenus

| Quoi | Où |
|---|---|
| Liens Bookings et LinkedIn, adresse du formulaire, activation de l'anglais | `src/content/settings.yaml` |
| Textes de l'accueil | `src/content/home/fr.yaml` et `en.yaml` |
| Mentions légales, confidentialité | `src/content/legal/<langue>/*.md` |
| Libellés de navigation, menus, adresses des pages | `src/i18n/ui.ts` |
| Couleurs, typographies (charte) | `src/styles/global.css` (`@theme`) |

## Structure

- `src/components/home/` — sections de l'accueil (réutilisables pour les pages de phase 2)
- `src/components/` — logo, en-tête, pied de page, icônes, éléments graphiques de la charte
- `src/components/page/` — composants des pages de phase 2
- `src/pages/` — routes : `/` (FR), `/en/` (EN), pages légales, pages de phase 2, 404

## Reste à faire

- [ ] Lien Bookings et LinkedIn définitifs (`settings.yaml`)
- [ ] Portrait et photos (emplacements réservés ; photos de l'accueil et des pages de phase 2 reprises de Figma, droits à vérifier)
- [ ] Formulaire de contact : service d'envoi côté serveur (`contactFormEndpoint`)
- [ ] Relecture et validation de la traduction anglaise par Charlotte, puis `englishEnabled: true` ; pages légales en anglais
- [ ] Compléter les informations entre crochets des pages légales, puis retirer `draft: true`
- [ ] Outil de statistiques (suivi des clics Bookings déjà balisé via `data-track`)
- [ ] Image de partage `public/og-image.png` (1200×630)
- [ ] Phase 2 : pages FR construites (non publiées, `phase2Enabled`) ; styles détaillés à confirmer sur Figma ; versions anglaises
