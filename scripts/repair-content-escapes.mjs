import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const contentRoot = fileURLToPath(new URL('../content/docs/', import.meta.url));
const replacements = new Map([
  ['\u0008', '\\b'],
  ['\u0009', '\\t'],
  ['\u000C', '\\f'],
  ['\u000D', '\\r'],
]);
let changedFiles = 0;
let repairedChars = 0;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!['.md', '.mdx'].includes(extname(entry.name))) continue;

    const original = await readFile(path, 'utf8');
    let fixed = original;
    for (const [bad, restored] of replacements) {
      const count = fixed.split(bad).length - 1;
      if (count > 0) {
        repairedChars += count;
        fixed = fixed.split(bad).join(restored);
      }
    }

    if (fixed !== original) {
      await writeFile(path, fixed, 'utf8');
      changedFiles += 1;
      console.log(`repaired ${path}`);
    }
  }
}

await walk(contentRoot);
console.log(`Repaired ${repairedChars} escaped LaTeX character(s) across ${changedFiles} file(s).`);
