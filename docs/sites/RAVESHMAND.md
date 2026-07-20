# Raveshmand — CRM consumer migration guide

Bring Raveshmand in line with the same architecture as Pointer: install `@adelfeyz/*` from GitHub Packages, thin `/crm` + `/login`, dedicated API/DB on ports **3010 / 3011**.

Today Raveshmand still has inlined CRM (`api-worker/`, `src/app/crm/**`, often `imp/adminpanel/`). Those go away after the cutover.

## Target shape

```text
Raveshmand/
├── .npmrc                          # @adelfeyz → GitHub Packages
├── package.json                    # @adelfeyz/ui, sdk, api ^x.y.z
├── next.config.ts                  # transpilePackages: ui, sdk
├── public/crm-logo.png             # Raveshmand brand mark for admin header
├── data/database.db                # Raveshmand-only SQLite (keep existing file)
├── scripts/
│   ├── dev-api.mjs                 # copy/adapt from pointer (port 3011)
│   └── start-local.ps1             # web 3010 + api 3011
└── src/app/
    ├── crm/[[...slug]]/page.tsx    # → CrmCatchAll  (replace old tree)
    └── login/page.tsx              # → CrmLoginPage
```

**Delete after cutover:** `api-worker/`, inlined `src/app/crm/**` (except catch-all), `imp/adminpanel/` if present.

## Migration checklist

### 1. Registry auth

Create `.npmrc` in the Raveshmand repo root:

```ini
@adelfeyz:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

```powershell
$env:NODE_AUTH_TOKEN = "<PAT with read:packages>"
```

### 2. Install packages

```powershell
cd F:\code\Raveshmand
pnpm add @adelfeyz/ui @adelfeyz/sdk @adelfeyz/api
# or: npm install @adelfeyz/ui @adelfeyz/sdk @adelfeyz/api
```

Update `next.config.ts`:

```ts
transpilePackages: ['@adelfeyz/ui', '@adelfeyz/sdk']
```

### 3. Replace CRM routes

Remove the old page tree under `src/app/crm/` (dashboard, blog editors, etc.). Keep a single catch-all:

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

Ensure Font Awesome (or whatever the CRM UI expects) is loaded in the root layout, and place `public/crm-logo.png`.

### 4. Point SDK imports

Where public blog/marketing code imported `@/lib/blog`, `@/lib/auth`, etc., either:

- Re-export from thin wrappers:

```ts
// src/lib/blog.ts
export * from '@adelfeyz/sdk/blog';
```

- Or import `@adelfeyz/sdk/...` directly.

### 5. API process (replace `api-worker`)

Stop using `cd api-worker && npm run start:node`.

**package.json scripts (suggested):**

```json
{
  "scripts": {
    "dev": "next dev --turbopack -p 3010",
    "dev:api": "node scripts/dev-api.mjs",
    "dev:all": "concurrently \"npm run dev:api\" \"npm run dev\""
  }
}
```

Adapt Pointer’s `scripts/dev-api.mjs`: set default `PORT=3011` and `DB_PATH` to Raveshmand’s `data/database.db`. Prefer resolving `@adelfeyz/api` from `node_modules`.

**Env:**

| Variable | Local example |
|----------|----------------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3010` |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3011` |
| `PORT` | `3011` |
| `DB_PATH` | `./data/database.db` |

Keep the existing Raveshmand SQLite file; do not copy Pointer’s DB.

### 6. Smoke test

```powershell
pnpm run dev:all
```

- http://localhost:3010/login
- http://localhost:3010/crm
- http://localhost:3011/health

Verify login, dashboard, and one blog edit against the existing DB.

### 7. Remove legacy CRM trees

```text
api-worker/          → delete
imp/adminpanel/      → delete (if present)
src/app/crm/*        → only [[...slug]] remains
```

Commit on a branch (e.g. `feat/use-crm-packages`) mirroring Pointer.

### 8. Production

From [sites-inventory.json](../../scripts/sites-inventory.json):

| Process | Port | DB |
|---------|------|-----|
| `raveshmand-web` | 3010 | — |
| `raveshmand-api` | 3011 | `/home/sites/raveshmand/data/database.db` |

```js
{
  name: 'raveshmand-api',
  script: 'node_modules/@adelfeyz/api/dist/cli.js',
  args: 'start --port 3011 --db /home/sites/raveshmand/data/database.db'
}
{
  name: 'raveshmand-web',
  script: 'node_modules/next/dist/bin/next',
  args: 'start -p 3010'
}
```

## Updates after CRM releases

Same as Pointer:

```powershell
$env:NODE_AUTH_TOKEN = "<PAT>"
cd F:\code\Raveshmand
pnpm update @adelfeyz/ui @adelfeyz/sdk @adelfeyz/api
# restart raveshmand-api + raveshmand-web
```

## Port map (avoid collisions)

| Repo | Web | API |
|------|-----|-----|
| raveshmand | 3010 | 3011 |
| pointer | 3020 | 3021 |
| crm-platform | 3040 | 3041 |

## Rules of engagement

| Change | Where |
|--------|--------|
| CRM features / bugs | **crm-platform** → tag → `pnpm update` on Raveshmand |
| Raveshmand marketing, brand, public pages | **Raveshmand** |
| Raveshmand content DB | **Raveshmand** `data/` only |

Reference implementation: [POINTER.md](./POINTER.md) and the Pointer branch `feat/use-crm-packages`.
