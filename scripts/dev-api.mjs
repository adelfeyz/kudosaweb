/**
 * Start @adelfeyz/api for local Kudosa dev (port 3031).
 * Prefers the installed package; falls back to sibling crm-platform for local monorepo work.
 */
import { spawn } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(resolve(root, '.env.local'));
process.env.PORT = process.env.PORT || '3031';
process.env.DB_PATH = resolve(process.env.DB_PATH || resolve(root, 'data', 'database.db'));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function resolveApiEntry() {
  // Prefer sibling crm-platform during local monorepo work so API fixes apply without republishing.
  const siblingApi = resolve(root, '../crm-platform/packages/api');
  const siblingServer = resolve(siblingApi, 'server.ts');
  if (existsSync(siblingServer)) {
    const tsxCli = resolve(siblingApi, 'node_modules/tsx/dist/cli.mjs');
    const rootTsx = (() => {
      try {
        return require.resolve('tsx/dist/cli.mjs');
      } catch {
        return null;
      }
    })();
    const tsxPath = existsSync(tsxCli) ? tsxCli : rootTsx;
    if (tsxPath) {
      return {
        command: process.execPath,
        args: [tsxPath, 'watch', 'server.ts'],
        cwd: siblingApi,
      };
    }
    return {
      command: 'npx',
      args: ['tsx', 'watch', 'server.ts'],
      cwd: siblingApi,
    };
  }

  try {
    const pkgJson = require.resolve('@adelfeyz/api/package.json');
    const pkgDir = dirname(pkgJson);
    const distCli = resolve(pkgDir, 'dist', 'cli.js');
    if (existsSync(distCli)) {
      return { command: process.execPath, args: [distCli, 'start'], cwd: root };
    }
    const serverTs = resolve(pkgDir, 'server.ts');
    if (existsSync(serverTs)) {
      return {
        command: process.execPath,
        args: [require.resolve('tsx/dist/cli.mjs'), 'watch', 'server.ts'],
        cwd: pkgDir,
      };
    }
  } catch {
    // fall through
  }

  throw new Error(
    'Could not find @adelfeyz/api. Install from GitHub Packages (see .npmrc) or keep ../crm-platform checked out.'
  );
}

const { command, args, cwd } = resolveApiEntry();
const child = spawn(command, args, {
  cwd,
  env: process.env,
  stdio: 'inherit',
  shell: false,
});

child.on('exit', (code) => process.exit(code ?? 0));
