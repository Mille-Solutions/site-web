/**
 * Éditeur de contenus (Sveltia CMS) servi sur /admin/ par le serveur de développement uniquement :
 * il n'est jamais copié dans dist/ ni publié avec le site. Lancement : `npm run admin`.
 */
import { readFile } from 'node:fs/promises';

const files = {
  '/admin/': ['admin/index.html', 'text/html; charset=utf-8'],
  '/admin/index.html': ['admin/index.html', 'text/html; charset=utf-8'],
  '/admin/config.yml': ['admin/config.yml', 'text/yaml; charset=utf-8'],
  '/admin/sveltia-cms.js': ['node_modules/@sveltia/cms/dist/sveltia-cms.js', 'text/javascript; charset=utf-8'],
};

/** @returns {import('vite').Plugin} */
export function contentEditor() {
  return {
    name: 'mille-solutions:content-editor',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const path = (req.url ?? '').split('?')[0];
        const file = files[path];
        if (!file) return next();
        try {
          res.writeHead(200, { 'Content-Type': file[1], 'Cache-Control': 'no-store' });
          res.end(await readFile(file[0]));
        } catch (error) {
          next(error);
        }
      });
    },
  };
}
