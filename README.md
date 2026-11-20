# Site Mille Solutions — millesolutions.mc

Site vitrine statique (FR / EN) construit avec [Astro](https://astro.build) et Tailwind CSS,
d'après la charte Figma « Mille Solutions — Brand Guidelines 2026 », la maquette « Mille Solutions - Site
Internet REAL » et le cahier des charges du 12/10/2026.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # pages dans dist/client/, serveur Node dans dist/server/
node dist/server/entry.mjs   # sert le site construit (pages + /api/contact/)
```

Pages statiques, plus une route serveur `/api/contact/` qui envoie le formulaire de contact par
SMTP (messagerie du domaine). Livraison en image Docker : voir `Dockerfile`, `.env.example` et
[docs/GUIDE.md § 3.0](docs/GUIDE.md).

Le guide complet de mise en ligne et de modification se trouve dans [docs/GUIDE.md](docs/GUIDE.md).
Pour modifier les textes, liens et photos sans toucher au code : [docs/MODIFIER-LES-CONTENUS.md](docs/MODIFIER-LES-CONTENUS.md).

## Modifier les contenus

| Quoi | Où |
|---|---|
| Lien LinkedIn, adresse du formulaire, activation de l'anglais et de la phase 2 | `src/content/settings.yaml` |
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

- [ ] Droits des photos à vérifier (portrait ; photos de l'accueil et des pages de phase 2 reprises de Figma)
- [ ] Formulaire de contact (page `/contact/`, captcha ALTCHA en place) : boîte d'envoi SMASH, identifiants SMTP et `ALTCHA_HMAC_KEY` dans `.env` du conteneur ; politique de confidentialité (remplacer Microsoft Forms)
- [ ] Relecture et validation de la traduction anglaise par Charlotte, puis `englishEnabled: true` ; pages légales en anglais
- [ ] Compléter les informations entre crochets des pages légales, puis retirer `draft: true`
- [ ] Outil de statistiques (envoi du formulaire déjà signalé par l'événement `contact:sent`)
- [ ] Image de partage `public/og-image.png` (1200×630)
- [ ] Phase 2 : pages FR construites (non publiées, `phase2Enabled`) ; styles détaillés à confirmer sur Figma ; versions anglaises
