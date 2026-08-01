import fs from 'fs';
import path from 'path';

const UI_DIR = path.resolve('src/components/ui');

const REPLACEMENTS = [
  [/data-\[side=start\]/g, 'data-[side=left]'],
  [/data-\[side=end\]/g, 'data-[side=right]'],
  [/in-data-\[side=start\]/g, 'in-data-[side=left]'],
  [/in-data-\[side=end\]/g, 'in-data-[side=right]'],
  [/group-data-\[side=start\]/g, 'group-data-[side=left]'],
  [/group-data-\[side=end\]/g, 'group-data-[side=right]'],
  [/\[\[data-side=start\]/g, '[[data-side=left]'],
  [/\[\[data-side=end\]/g, '[[data-side=right]'],
  [/data-\[motion=from-end\]/g, 'data-[motion=from-right]'],
  [/data-\[motion=from-start\]/g, 'data-[motion=from-left]'],
  [/data-\[motion=to-end\]/g, 'data-[motion=to-right]'],
  [/data-\[motion=to-start\]/g, 'data-[motion=to-left]'],
  [/slide-in-from-end/g, 'slide-in-from-right'],
  [/slide-in-from-start/g, 'slide-in-from-left'],
  [/slide-out-to-end/g, 'slide-out-to-right'],
  [/slide-out-to-start/g, 'slide-out-to-left'],
  [/side\?: "start" \| "end"/g, 'side?: "left" | "right"'],
  [/side === "start"/g, 'side === "left"'],
  [/side === "end"/g, 'side === "right"'],
  [/side="end"/g, 'side="right"'],
  [/side="start"/g, 'side="left"'],
  [/defaultSide = "start"/g, 'defaultSide = "left"'],
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
for (const file of walk(UI_DIR)) {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  for (const [pattern, replacement] of REPLACEMENTS) {
    content = content.replace(pattern, replacement);
  }
  if (content !== original) {
    fs.writeFileSync(file, content);
    total++;
    console.log('Fixed:', path.relative(process.cwd(), file));
  }
}
console.log(`Fixed ${total} UI files.`);
