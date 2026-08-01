# Multi-site CRM package deployment

Private packages are published to **GitHub Packages** (`@adelfeyz/*`), not public npm.

**Per-site guides:** [Pointer](../sites/POINTER.md) · [Raveshmand](../sites/RAVESHMAND.md) · [Architecture overview](../sites/README.md)

## Integrate CRM into another Next.js site

### 1. Auth for the private registry

Create `.npmrc` in the site root (and set `NODE_AUTH_TOKEN` to a GitHub PAT with `read:packages`):

```ini
@adelfeyz:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### 2. Install

```bash
pnpm add @adelfeyz/ui @adelfeyz/sdk @adelfeyz/api
```

(`@adelfeyz/contract` is pulled in transitively via the SDK.)

### 3. Thin routes only

`src/app/crm/[[...slug]]/page.tsx`:

```tsx
'use client';
import { CrmCatchAll } from '@adelfeyz/ui';
export default function CrmPage() {
  return <CrmCatchAll />;
}
```

`src/app/login/page.tsx`:

```tsx
import { CrmLoginPage } from '@adelfeyz/ui';
export default CrmLoginPage;
```

`next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: ['@adelfeyz/ui', '@adelfeyz/sdk'],
};
export default nextConfig;
```

Put `public/crm-logo.png` in the site (CRM admin header). Include Font Awesome CSS in the root layout (CRM uses FA icons).

### 4. Env

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | CRM API base URL |
| `NEXT_PUBLIC_SITE_URL` | Site origin |
| `JWT_SECRET` | API JWT signing (API process) |
| `ADMIN_PASSWORD` | Local admin password (API process) |

### 5. Run the API (own DB per site)

```bash
pnpm exec crm-api start --port 3021 --db ./data/database.db
```

Or point PM2 at `node_modules/@adelfeyz/api/dist/cli.js`.

## Publish a new CRM version (crm-platform maintainers)

### First publish (required before sites can `pnpm add`)

1. Create a GitHub PAT (classic) with `write:packages` and `read:packages`, or use `GITHUB_TOKEN` in Actions.
2. Set auth locally:

```powershell
$env:NODE_AUTH_TOKEN = "<your-pat>"
# .npmrc already points @adelfeyz to https://npm.pkg.github.com
```

3. Build and publish (or push a version tag and let CI do it):

```powershell
pnpm --filter @adelfeyz/contract generate
pnpm --filter @adelfeyz/api build
pnpm --filter "@adelfeyz/*" publish --access restricted --no-git-checks
```

Or:

```bash
git tag v0.1.0
git push origin v0.1.0
```

GitHub Actions workflow [`.github/workflows/publish.yml`](../../.github/workflows/publish.yml) builds and publishes `@adelfeyz/*` to GitHub Packages.

**Note:** The package scope `@adelfeyz` must match a GitHub user/org that owns the packages (link the repo to that org’s packages if needed).

### Later releases

1. Bump package versions (Changesets under `.changeset/`, or edit `packages/*/package.json`).
2. Push a version tag:

```bash
git tag v0.1.1
git push origin v0.1.1
```

Local dry-run:

```bash
pnpm --filter @adelfeyz/contract generate
pnpm --filter @adelfeyz/api build
pnpm --filter "@adelfeyz/*" publish --dry-run --no-git-checks
```

## Update sites after a release

On each site:

```bash
pnpm update @adelfeyz/ui @adelfeyz/sdk @adelfeyz/api
```

Or on the server, from the **crm-platform** repo:

```bash
./scripts/bump-and-deploy.sh scripts/sites-inventory.json
```

## PM2 template (per site)

```js
{ name: 'site-api', script: 'node_modules/@adelfeyz/api/dist/cli.js', args: 'start --port 3021 --db /path/to/database.db' }
{ name: 'site-web', script: 'node_modules/next/dist/bin/next', args: 'start -p 3020' }
```

## Caddy template

```
site.example.com {
  reverse_proxy /api/* localhost:3021
  reverse_proxy /* localhost:3020
}
```

## Local port map

| Repo | Web | API |
|------|-----|-----|
| raveshmand | 3010 | 3011 |
| pointer | 3020 | 3021 |
| crm-platform | 3040 | 3041 |
| demo-consumer | 3042 | 3041 |
