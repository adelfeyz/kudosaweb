/**
 * PM2 ecosystem for Kudosa production (ports 3050 / 3051).
 * Usage: pm2 start scripts/ecosystem.config.cjs
 * See docs/sites/README.md and docs/deployment/CRM-PACKAGE-DEPLOY.md
 */
const path = require('path');

const root = path.resolve(__dirname, '..');
const dbPath = process.env.KUDOSA_DB_PATH || path.join(root, 'data', 'database.db');

module.exports = {
  apps: [
    {
      name: 'kudosa-api',
      cwd: root,
      script: path.join(root, 'node_modules', '@adelfeyz', 'api', 'dist', 'cli.js'),
      args: `start --port 3051 --db ${dbPath}`,
      env: {
        NODE_ENV: 'production',
        PORT: '3051',
        DB_PATH: dbPath,
      },
    },
    {
      name: 'kudosa-web',
      cwd: root,
      script: path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next'),
      args: 'start -p 3050',
      env: {
        NODE_ENV: 'production',
        PORT: '3050',
      },
    },
  ],
};
