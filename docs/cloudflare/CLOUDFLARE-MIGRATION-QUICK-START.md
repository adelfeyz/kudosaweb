# Cloudflare Migration Quick Start - Pointer

Quick reference guide for migrating to a new Cloudflare account.

## 🚀 Quick Steps (30 minutes)

### 1. New Account Setup (5 min)
Note: "New account" = your new Cloudflare account. "Image account" = old account with paid Images service.
```
1. Login to new Cloudflare account
2. Copy Account ID from dashboard sidebar
3. Note: You'll need this for wrangler.toml
```

### 2. Create D1 Database (5 min)
```
1. Workers & Pages → D1 → Create database
2. Name: pointer-database
3. Copy Database ID (UUID)
4. Run: wrangler d1 execute pointer-database --remote --file=../database/schema.sql
```

### 3. Create KV Namespace (2 min)
```
1. Workers & Pages → KV → Create namespace
2. Name: pointer-blog-api-keys
3. Copy Namespace ID
```

### 4. Deploy Worker (5 min)
```bash
cd api-worker
# Update wrangler.toml with new IDs
wrangler login
wrangler deploy
# Copy worker URL
```

### 5. Create Pages Project (10 min)
```
1. Workers & Pages → Pages → Create project
2. Connect GitHub repo
3. Build command: npx @opennextjs/cloudflare build
4. Build output: .open-next
5. Add environment variables:
   - NEXT_PUBLIC_API_BASE_URL = [your-worker-url]
   - NEXT_PUBLIC_SITE_URL = https://pointer.ir
6. Add D1 binding: DB → pointer-database
```

### 6. Update Code (3 min)
```
1. Update api-worker/wrangler.toml with new IDs
2. Update api-worker/index.ts CORS origins
3. Update src/lib/config.ts API URL
```

## 📋 IDs You Need

### New Account (for D1, KV, Worker, Pages)
| Item | Where to Find | Example |
|------|---------------|---------|
| Account ID | Dashboard sidebar | `a1b2c3d4...` |
| Database ID | D1 → Your DB | `uuid-format` |
| KV Namespace ID | KV → Your namespace | `8f8e08ab...` |
| Worker URL | After deploy | `https://pointer-api.xxx.workers.dev` |
| Pages URL | After deploy | `https://pointer-website.pages.dev` |

### Image Account (for Cloudflare Images - Keep These!)
| Item | Value (Already Extracted) | Notes |
|------|---------------------------|-------|
| Account ID | `b2815b2dfc0adf324286f68823ba9a7c` | For Images API |
| Account Hash | `OY-5RcGvVT9d-duEBIEczg` | For image URLs |
| Images Token | `KiS1U70EEzfd-qlcnd1PBktufRM0fkTO-ztCqDJL` | For Images API auth |

## ⚙️ Files to Update

1. **api-worker/wrangler.toml**
   - `database_id` → New account database ID
   - `id` (KV namespace) → New account KV namespace ID
   - `CLOUDFLARE_ACCOUNT_ID` → **KEEP Image account** (for Images)
   - `CLOUDFLARE_ACCOUNT_HASH` → **KEEP Image account** (for Images)
   - `CLOUDFLARE_IMAGES_TOKEN` → **KEEP Image account** (for Images)

2. **api-worker/index.ts**
   - `getAllowedOrigin()` function

3. **src/lib/config.ts**
   - `apiBaseUrl` default value

## ✅ Verification

```bash
# Test worker
curl https://your-worker-url.workers.dev/health

# Test pages
# Visit: https://pointer.ir or your Pages URL

# Check database
wrangler d1 execute pointer-database --remote --command="SELECT COUNT(*) FROM blog_posts"
```

## 🔗 Full Guide

See `docs/CLOUDFLARE-NEW-ACCOUNT-SETUP.md` for detailed instructions.

