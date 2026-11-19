/**
 * `npm run admin` : démarre le site en local et ouvre l'éditeur de contenus (Sveltia CMS) sur
 * /admin/, dans Google Chrome ou Microsoft Edge (seuls navigateurs qui permettent à l'éditeur
 * d'enregistrer directement dans le dossier du dépôt). Ctrl+C dans le terminal pour arrêter.
 */
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const astro = fileURLToPath(new URL('../node_modules/astro/bin/astro.mjs', import.meta.url));
const server = spawn(process.execPath, [astro, 'dev', '--port', '4321'], { stdio: ['inherit', 'pipe', 'inherit'] });

const stop = () => server.kill('SIGINT');
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
server.on('exit', (code) => process.exit(code ?? 0));

let opened = false;
server.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  // Astro affiche l'adresse locale une fois prêt (le port peut changer si 4321 est occupé).
  const match = !opened && chunk.toString().replace(/\x1b\[[0-9;]*m/g, '').match(/http:\/\/localhost:(\d+)/);
  if (!match) return;
  opened = true;
  const site = `http://localhost:${match[1]}/`;
  const admin = `${site}admin/`;
  openInChromium(admin);
  console.log(`\n  Éditeur de contenus : ${admin}`);
  console.log(`  Aperçu du site      : ${site}`);
  console.log('  Pour arrêter : Ctrl+C dans ce terminal.\n');
});

/** Ouvre l'adresse dans Chrome ou Edge, sinon dans le navigateur par défaut avec un avertissement. */
function openInChromium(url) {
  const run = (cmd, args) => spawn(cmd, args, { stdio: 'ignore', detached: true }).unref();
  if (process.platform === 'darwin') {
    const app = ['Google Chrome', 'Microsoft Edge'].find(
      (name) => existsSync(`/Applications/${name}.app`) || existsSync(`${process.env.HOME}/Applications/${name}.app`),
    );
    if (app) return run('open', ['-a', app, url]);
    warn();
    return run('open', [url]);
  }
  if (process.platform === 'win32') {
    // « start chrome » échoue sans Chrome : Edge est installé d'office sur Windows.
    const chrome = ['PROGRAMFILES', 'PROGRAMFILES(X86)', 'LOCALAPPDATA']
      .map((v) => process.env[v] && `${process.env[v]}\\Google\\Chrome\\Application\\chrome.exe`)
      .find((p) => p && existsSync(p));
    return run('cmd', ['/c', 'start', '""', chrome ? 'chrome' : 'msedge', url]);
  }
  warn();
  run('xdg-open', [url]);
}

function warn() {
  console.warn('\n  Chrome ou Edge introuvable : l’éditeur a besoin de l’un de ces navigateurs pour enregistrer les fichiers.');
}
