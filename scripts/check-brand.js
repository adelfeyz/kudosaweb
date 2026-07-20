#!/usr/bin/env node
/**
 * Fails if legacy CognifyTech branding appears in tracked source.
 * Excludes node_modules, build caches, and generated output.
 */
const { execSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pattern = 'cognifytech|cognify tech|COGNIFYTECH';
const globs = [
  '!node_modules/**',
  '!**/.next/**',
  '!api-worker/.wrangler/**',
  '!api-worker/dist/**',
  '!api-worker/node_modules/**',
  '!imp/**',
  '!scripts/check-brand.js',
  '!*.log',
  '!**/*.log',
];

try {
  const globArgs = globs.flatMap((g) => ['--glob', g]);
  execSync(`rg -i "${pattern}" ${globArgs.join(' ')} .`, {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  console.error('check:brand failed — CognifyTech references found (see above).');
  process.exit(1);
} catch (err) {
  if (err.status === 1) {
    console.log('check:brand passed — no CognifyTech references in source.');
    process.exit(0);
  }
  throw err;
}
