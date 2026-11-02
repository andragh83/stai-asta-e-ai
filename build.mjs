import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('dist', { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js']) await copyFile(file, `dist/${file}`);
console.log('Prezentare construită în dist/ — fără dependențe externe.');
