/**
 * `npm run check:admin` : vérifie que la configuration de l'éditeur (admin/config.yml) décrit
 * toutes les clés présentes dans les fichiers de contenu. L'éditeur réécrit chaque fichier à partir
 * de cette configuration : une clé oubliée serait supprimée au premier enregistrement.
 * À lancer après toute modification de src/content.config.ts ou des fichiers de contenu.
 */
import { readFileSync, readdirSync } from 'node:fs';
import YAML from 'yaml';

const config = YAML.parse(readFileSync('admin/config.yml', 'utf8'), { maxAliasCount: -1 });
const problems = [];

function walk(data, fields, path) {
  if (Array.isArray(data)) return data.forEach((item, i) => walk(item, fields, `${path}[${i}]`));
  if (data === null || typeof data !== 'object') return;
  const byName = new Map(fields.map((f) => [f.name, f]));
  for (const key of Object.keys(data)) {
    const field = byName.get(key);
    if (!field) problems.push(`${path}.${key} : aucun champ dans admin/config.yml`);
    else if (field.fields) walk(data[key], field.fields, `${path}.${key}`);
  }
}

const frontMatter = (text) => YAML.parse(text.match(/^---\n([\s\S]*?)\n---/)[1]);
const parse = (file) => {
  const text = readFileSync(file, 'utf8');
  return file.endsWith('.json') ? JSON.parse(text) : file.endsWith('.md') ? frontMatter(text) : YAML.parse(text);
};

for (const collection of config.collections) {
  const entries = collection.files
    ? collection.files.map((f) => [f.file, f.fields])
    : readdirSync(collection.folder).map((name) => [`${collection.folder}/${name}`, collection.fields]);
  for (const [file, fields] of entries) walk(parse(file), fields, file);
}

if (problems.length) {
  console.error(`Éditeur de contenus : ${problems.length} clé(s) non décrite(s) :\n  ${problems.join('\n  ')}`);
  process.exit(1);
}
console.log('Éditeur de contenus : toutes les clés des fichiers de contenu sont décrites.');
