import { mkdir, copyFile, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
await mkdir('dist', { recursive: true });
const assets = ['styles.css', 'script.js', 'translations.js', 'i18n.js'];
let html = await readFile('index.html', 'utf8');
for (const file of assets) {
  const content = await readFile(file);
  const version = createHash('sha256').update(content).digest('hex').slice(0, 12);
  html = html.replaceAll(`"${file}"`, `"${file}?v=${version}"`);
  await copyFile(file, `dist/${file}`);
}
await writeFile('dist/index.html', html);
await cp('assets', 'dist/assets', { recursive: true });
console.log('Prezentare construită în dist/ — fișiere versionate, fără dependențe externe.');
