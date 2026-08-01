# Pointer — CRM consumer guide

Pointer is the first production consumer of `@adelfeyz/*`. Target layout: marketing site only + thin CRM shell + dedicated API/DB on ports **3020 / 3021**.

## Target shape

```text
pointer/
├── .npmrc                          # @adelfeyz → GitHub Packages
├── package.json                    # @adelfeyz/ui, sdk, api ^x.y.z
├── next.config.ts                  # transpilePackages: ui, sdk
├── public/crm-logo.png
├── data/database.db                # Pointer-only SQLite
├── scripts/
│   ├── dev-api.mjs                 # starts @adelfeyz/api on 3021
│   └── start-local.ps1             # web 3020 + api 3021
└── src/app/
    ├── crm/[[...slug]]/page.tsx    # → CrmCatchAll
    └── login/page.tsx              # → CrmLoginPage
```

**Removed / must stay gone:** `api-worker/`, `imp/adminpanel/`, inlined `src/app/crm/**` page trees (except the catch-all).

## Dependencies

```json
{
  "dependencies": {
    "@adelfeyz/api": "^0.1.0",
    "@adelfeyz/sdk": "^0.1.0",
    "@adelfeyz/ui": "^0.1.0"
  }
}
```

```ts
// next.config.ts
transpilePackages: ['@adelfeyz/ui', '@adelfeyz/sdk']
```

## Thin routes

```tsx
// src/app/crm/[[...slug]]/page.tsx
'use client';
import { CrmCatchAll } from '@adelfeyz/ui';
export default function CrmPage() {
  return <CrmCatchAll />;
}
```

```tsx
// src/app/login/page.tsx
import { CrmLoginPage } from '@adelfeyz/ui';
export default CrmLoginPage;
```

Optional SDK re-exports (keeps existing `@/lib/*` imports stable for public blog pages):

```ts
// src/lib/blog.ts
export * from '@adelfeyz/sdk/blog';
// same pattern for auth, config, ai, blog-import-*
```

## Env (Pointer)

| Variable | Local example |
|----------|----------------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3020` |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3021` |
| `PORT` (API) | `3021` |
| `DB_PATH` | `./data/database.db` |
| `JWT_SECRET` / `ADMIN_PASSWORD` | site-specific secrets |

Do not reuse crm-platform ports (`3040` / `3041`).

## Local run

```powershell
$env:NODE_AUTH_TOKEN = "<PAT with read:packages>"
cd F:\code\pointer
pnpm install   # or npm install
pnpm run seed:local   # if needed
pnpm run start:local  # or: npm run dev:api  +  npm run dev
```

Smoke:

- http://localhost:3020/login
- http://localhost:3020/crm
- http://localhost:3021/health

## Production (PM2)

From [sites-inventory.json](../../scripts/sites-inventory.json):

| Process | Port | Notes |
|---------|------|--------|
| `pointer-web` | 3020 | `next start` |
| `pointer-api` | 3021 | `node_modules/@adelfeyz/api/dist/cli.js start --db …/pointer/data/database.db` |

Caddy: `/api/*` → 3021, everything else → 3020.

## After a CRM release

```powershell
$env:NODE_AUTH_TOKEN = "<PAT>"
cd F:\code\pointer
pnpm update @adelfeyz/ui @adelfeyz/sdk @adelfeyz/api
# restart PM2 pointer-api + pointer-web
```

Or from crm-platform:

```bash
./scripts/bump-and-deploy.sh scripts/sites-inventory.json
```

## Rules of engagement

| Change | Where |
|--------|--------|
| Blog CMS, admin UI, CRM API, auth client | **crm-platform** → new tag |
| Pointer marketing, SEO, brand, public pages | **pointer** |
| Pointer DB seed / content | **pointer** `data/` only |

If a fix is needed in CRM while developing Pointer, open a PR on crm-platform, publish, then `pnpm update` — do not patch `node_modules/@adelfeyz/*`.
