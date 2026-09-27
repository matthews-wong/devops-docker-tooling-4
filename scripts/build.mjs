import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

const pkg = JSON.parse(await readFile(path.join(rootDir, 'package.json'), 'utf8'));

const buildInfo = {
  version: pkg.version,
  commit: process.env.BUILD_COMMIT || 'unknown',
  date: process.env.BUILD_DATE || new Date().toISOString(),
};

function render(template, vars) {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
    if (!(key in vars)) {
      throw new Error(`template placeholder "${key}" has no value`);
    }
    return vars[key];
  });
}

const template = await readFile(path.join(srcDir, 'template.html'), 'utf8');
const html = render(template, buildInfo);

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, 'index.html'), html);
await copyFile(path.join(srcDir, 'style.css'), path.join(distDir, 'style.css'));

console.log(`built dist/index.html (version ${buildInfo.version}, commit ${buildInfo.commit})`);
