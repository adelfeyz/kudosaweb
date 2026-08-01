import fs from 'fs';
import path from 'path';

const SRC = path.resolve('src');

const REPLACEMENTS = [
  // text alignment
  [/\btext-left\b/g, 'text-start'],
  [/\btext-right\b/g, 'text-end'],
  // margins
  [/\bml-/g, 'ms-'],
  [/\bmr-/g, 'me-'],
  // padding
  [/\bpl-/g, 'ps-'],
  [/\bpr-/g, 'pe-'],
  // borders
  [/\bborder-l-/g, 'border-s-'],
  [/\bborder-r-/g, 'border-e-'],
  [/\bborder-l\b/g, 'border-s'],
  [/\bborder-r\b/g, 'border-e'],
  // rounded
  [/\brounded-l-/g, 'rounded-s-'],
  [/\brounded-r-/g, 'rounded-e-'],
  [/\brounded-bl-/g, 'rounded-be-'],
  [/\brounded-br-/g, 'rounded-bs-'],
  [/\brounded-tl-/g, 'rounded-te-'],
  [/\brounded-tr-/g, 'rounded-ts-'],
  // inset positioning (order matters - do after ml/mr to avoid partial matches)
  [/\bleft-/g, 'start-'],
  [/\bright-/g, 'end-'],
  [/\bleft\b/g, 'start'],
  [/\bright\b/g, 'end'],
  // scroll margin/padding
  [/\bscroll-ml-/g, 'scroll-ms-'],
  [/\bscroll-mr-/g, 'scroll-me-'],
  [/\bscroll-pl-/g, 'scroll-ps-'],
  [/\bscroll-pr-/g, 'scroll-pe-'],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|css|jsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let totalChanges = 0;
for (const file of walk(SRC)) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [pattern, replacement] of REPLACEMENTS) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    totalChanges++;
    console.log('Updated:', path.relative(process.cwd(), file));
  }
}
console.log(`\nDone. ${totalChanges} files updated.`);
