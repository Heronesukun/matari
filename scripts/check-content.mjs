import { readdir, readFile } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const contentRoot = fileURLToPath(new URL('../content/docs/', import.meta.url));
const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const badControl = /[\u0000-\u0009\u000B-\u001F\u007F]/g;
const problems = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(path);
      continue;
    }
    if (!['.md', '.mdx'].includes(extname(entry.name))) continue;

    const text = await readFile(path, 'utf8');
    for (const match of text.matchAll(badControl)) {
      const before = text.slice(0, match.index);
      const line = before.split('\n').length;
      const lastNewline = before.lastIndexOf('\n');
      const column = match.index - lastNewline;
      const code = match[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
      problems.push(`${relative(repoRoot, path)}:${line}:${column} contains U+${code}`);
    }

    const displayMathDelimiters = text.match(/\$\$/g)?.length ?? 0;
    if (displayMathDelimiters % 2 !== 0) {
      problems.push(`${relative(repoRoot, path)} has an unmatched $$ display-math delimiter`);
    }

    if (text.includes('\uFFFD')) {
      problems.push(`${relative(repoRoot, path)} contains U+FFFD replacement characters`);
    }
  }
}

await walk(contentRoot);

if (problems.length > 0) {
  console.error('Content validation failed:\n');
  for (const problem of problems) console.error(`- ${problem}`);
  console.error('\nThis usually means a LaTeX backslash was converted into a control character before reaching MDX.');
  process.exit(1);
}

console.log('Content validation passed.');
