# Site Mille Solutions

Site vitrine statique (Astro + Tailwind CSS 4) de millesolutions.mc.

- **Design system** : lire `docs/DESIGN-SYSTEM.md` avant toute création ou modification
  d'interface, s'y conformer, et le mettre à jour quand une règle change.
- Guide de mise en ligne et d'édition : `docs/GUIDE.md`.
- Éditeur de contenus (`npm run admin`, Sveltia CMS en local) : toute modification de
  `src/content.config.ts` ou de la structure d'un contenu doit être reportée dans `admin/config.yml`.
- Vérifications : `npx astro check`, `npm run check:admin` puis `npm run build`.
- Ne jamais commiter ni pousser sans l'accord explicite de l'utilisateur.
