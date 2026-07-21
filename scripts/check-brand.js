#!/usr/bin/env node
/**
 * Fails if legacy CognifyTech or Hadafsanj branding appears in tracked source.
 * Excludes node_modules, build caches, and generated output.
 */
const { execSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');

const checks = [
  {
    label: 'CognifyTech',
    pattern: 'cognifytech|cognify tech|COGNIFYTECH',
  },
  {
    label: 'Hadafsanj',
    pattern: 'hadafsanj|هدف‌سنج|hadafsanj\\.ir|Hadafsanj',
  },
];

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
  '!public/hadafsanj/**',
  '!docs/**',
  '!next.config.ts',
];

let failed = false;

for (const { label, pattern } of checks) {
  try {
    const globArgs = globs.flatMap((g) => ['--glob', g]);
    execSync(`rg -i "${pattern}" ${globArgs.join(' ')} .`, {
      cwd: root,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    console.error(`check:brand failed — ${label} references found (see above).`);
    failed = true;
  } catch (err) {
    if (err.status === 1) {
      console.log(`check:brand passed — no ${label} references in source.`);
    } else {
      throw err;
    }
  }
}

process.exit(failed ? 1 : 0);
