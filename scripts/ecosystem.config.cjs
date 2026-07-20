/**
 * PM2 ecosystem for Pointer production (ports 3020 / 3021).
 * Usage: pm2 start scripts/ecosystem.config.cjs
 * See docs/sites/POINTER.md and docs/deployment/CRM-PACKAGE-DEPLOY.md
 */
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = process.env.POINTER_DB_PATH || path.join(root, 'data', 'database.db');

module.exports = {
  apps: [
    {
      name: 'pointer-api',
      cwd: root,
      script: path.join(root, 'node_modules', '@adelfeyz', 'api', 'dist', 'cli.js'),
      args: `start --port 3021 --db ${dbPath}`,
      env: {
        NODE_ENV: 'production',
        PORT: '3021',
        DB_PATH: dbPath,
      },
    },
    {
      name: 'pointer-web',
      cwd: root,
      script: path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next'),
      args: 'start -p 3020',
      env: {
        NODE_ENV: 'production',
        PORT: '3020',
      },
    },
  ],
};
