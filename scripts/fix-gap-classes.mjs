import fs from 'fs';
import path from 'path';

const fixes = [
  [/gap- sm:gap-/g, 'gap-2 sm:gap-4'],
  [/gap- mt/g, 'gap-2 mt'],
  [/gap- mb/g, 'gap-4 mb'],
  [/gap- pt/g, 'gap-3 pt'],
  [/gap- p-3/g, 'gap-2 p-3'],
  [/gap- overflow/g, 'gap-4 overflow'],
  [/gap- text-sm/g, 'gap-2 text-sm'],
  [/gap- px-/g, 'gap-2 px-'],
  [/gap-"/g, 'gap-2"'],
  [/gap-`/g, 'gap-2`'],
  [/gap- /g, 'gap-2 '],
  [/sm:gap- /g, 'sm:gap-4 '],
  [/sm:gap-"/g, 'sm:gap-4"'],
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let total = 0;
for (const file of walk('src')) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [pattern, replacement] of fixes) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    total++;
    console.log('Fixed:', file);
  }
}
console.log(`\nFixed ${total} files.`);
