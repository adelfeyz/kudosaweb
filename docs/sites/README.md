# Site consumer guides (Pointer & Raveshmand)

CRM lives only in **crm-platform** and ships as private GitHub Packages under `@adelfeyz/*`. Website repos are thin consumers: marketing + brand + one SQLite DB + thin `/crm` and `/login` routes.

| Site | Local web | Local API | Status |
|------|-----------|-----------|--------|
| [Pointer](./POINTER.md) | `3020` | `3021` | Consumer on `feat/use-crm-packages` |
| [Raveshmand](./RAVESHMAND.md) | `3010` | `3011` | Migrate from inlined `api-worker` / `src/app/crm` |

Shared install/update/PM2 details: [../deployment/CRM-PACKAGE-DEPLOY.md](../deployment/CRM-PACKAGE-DEPLOY.md).

## Architecture (both sites)

```text
┌─────────────────────────────┐     ┌──────────────────────────────┐
│  Website repo               │     │  crm-platform                │
│  (pointer / raveshmand)     │     │  publish @adelfeyz/*         │
│                             │     │                              │
│  public pages + brand       │     │  ui / sdk / api / contract   │
│  thin /crm + /login         │◄────│  tag vX.Y.Z → GitHub Packages│
│  own data/database.db       │     └──────────────────────────────┘
│  PM2: site-web + site-api   │
└─────────────────────────────┘
```

**Do**

- Depend on `@adelfeyz/ui`, `@adelfeyz/sdk`, `@adelfeyz/api` from the registry
- Keep CRM UI behind thin re-exports only
- Run one API process per site with that site’s DB file
- Bump packages after each CRM release (`pnpm update …` or `bump-and-deploy.sh`)

**Do not**

- Copy `packages/*` or `api-worker` into the site
- Keep a second CRM source tree (`imp/adminpanel`, local `src/app/crm/*` pages)
- Share one SQLite file across sites
- Develop CRM features in the website repo (open a PR on crm-platform instead)

## Packages

| Package | Role on the site |
|---------|------------------|
| `@adelfeyz/ui` | Admin UI (`CrmCatchAll`, `CrmLoginPage`) |
| `@adelfeyz/sdk` | Client helpers (auth, blog, config, AI); re-export from `src/lib/*` if needed |
| `@adelfeyz/api` | Hono + SQLite process (`crm-api` / `dist/cli.js`) |
| `@adelfeyz/contract` | Transitive via SDK — do not pin unless you need OpenAPI types directly |

## Auth for installs

Classic GitHub PAT with `read:packages`, exposed as `NODE_AUTH_TOKEN`:

```ini
# .npmrc (site root)
@adelfeyz:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```powershell
$env:NODE_AUTH_TOKEN = "<PAT>"
pnpm install   # or npm install
```
