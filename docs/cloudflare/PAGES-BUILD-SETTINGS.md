# Cloudflare Pages Build Settings - Correct Configuration

## ⚠️ IMPORTANT: Update Your Current Settings

Your Pages project currently has **incorrect** build settings. Update them now!

## ✅ Correct Build Settings for Pointer Website

When setting up your Cloudflare Pages project, use these settings:

### Project Name
- **Project name**: `pointerwebsite` ✅

### Production Branch
- **Production branch**: `main` ✅

### Build Settings

#### Framework Preset
- **Framework preset**: `Next.js` ✅

#### Build Command
- **Build command**: `npx @opennextjs/cloudflare build` ✅
  - **NOT**: `npx @cloudflare/next-on-pages@1` ❌ (This is what you currently have!)
  - **NOT**: `npm run build` ❌

#### Build Output Directory
- **Build output directory**: `.open-next` ✅
  - **NOT**: `.vercel/output/static` ❌ (This is what you currently have!)
  - **NOT**: `.next` ❌
  - **NOT**: `/` ❌

#### Root Directory
- **Root directory**: `/` ✅ (leave as default)

## Why These Settings?

1. **`@opennextjs/cloudflare`**: This is the package installed in your `package.json` for Cloudflare compatibility
2. **`.open-next`**: This is the output directory that OpenNext generates
3. **`main` branch**: Your production branch

## Verification

Check your `package.json`:
```json
{
  "dependencies": {
    "@opennextjs/cloudflare": "^1.9.1"
  }
}
```

Check your `open-next.config.ts` exists (it should be in the root).

## How to Update Settings in Dashboard

1. Go to: https://dash.cloudflare.com/8f5835aa72758a54d648b4ca76b1ad2c/pages/pointerwebsite
2. Click **"Settings"** tab
3. Scroll to **"Build configuration"**
4. Update:
   - **Build command**: `npx @opennextjs/cloudflare build`
   - **Build output directory**: `.open-next`
5. Click **"Save"**
6. Trigger a new deployment (or wait for next git push)

## After Setting Build Settings

1. Add environment variables (see below)
2. Add D1 database binding
3. Save and deploy

## Environment Variables to Add

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://unified-api.alexfeyz82.workers.dev` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://pointer.ir` | Production, Preview |
| `NODE_ENV` | `production` | Production, Preview |

## D1 Database Binding

- **Variable name**: `DB`
- **D1 Database**: `pointer-database`
- **Environment**: Production (and Preview)

---

*Last Updated: November 2024*

