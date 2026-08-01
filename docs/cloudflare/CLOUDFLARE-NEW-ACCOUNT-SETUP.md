# Cloudflare New Account Setup Guide - Pointer

This guide will walk you through setting up Cloudflare Pages and Workers in a new Cloudflare account for the Pointer project.

## Prerequisites

- Access to your new Cloudflare account
- GitHub repository access
- Domain `pointer.ir` (or temporary Cloudflare Pages domain)
- API keys and secrets ready (Brevo, OpenAI, etc.)

---

## Part 1: Cloudflare Account Setup

### Step 1: Log in to New Cloudflare Account

1. Go to [https://dash.cloudflare.com/](https://dash.cloudflare.com/)
2. Log in with your new account credentials
3. Select your account/organization

### Step 2: Get Your Account ID

1. In the Cloudflare dashboard, look at the right sidebar
2. Find **"Account ID"** - copy this value (you'll need it later)
3. Example format: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

---

## Part 2: Create D1 Database

### Step 3: Create D1 Database

1. In the left sidebar, click **"Workers & Pages"**
2. Click **"D1"** in the submenu
3. Click **"Create database"** button
4. Fill in the form:
   - **Database name**: `pointer-database`
   - **Location**: Choose closest to your users (e.g., `WEUR` for Western Europe)
5. Click **"Create"**
6. **IMPORTANT**: Copy the **Database ID** (UUID format) - you'll need this for `wrangler.toml`

### Step 4: Initialize Database Schema

1. In your local terminal, navigate to the project root
2. Make sure you have Wrangler CLI installed:
   ```bash
   npm install -g wrangler
   ```
3. Login to Cloudflare:
   ```bash
   wrangler login
   ```
4. Navigate to the database folder:
   ```bash
   cd database
   ```
5. Run the schema migration:
   ```bash
   wrangler d1 execute pointer-database --remote --file=schema.sql
   ```
   (Replace `pointer-database` with your actual database name if different)

---

## Part 3: Create KV Namespace (for API Keys)

### Step 5: Create KV Namespace

1. In Cloudflare dashboard, go to **"Workers & Pages"** → **"KV"**
2. Click **"Create a namespace"**
3. Fill in:
   - **Namespace name**: `pointer-blog-api-keys`
4. Click **"Add"**
5. **IMPORTANT**: Copy the **Namespace ID** - you'll need this for `wrangler.toml`

---

## Part 4: Create Cloudflare Worker (API)

### Step 6: Create Worker via Dashboard (Optional - We'll use CLI)

You can create the worker via CLI or dashboard. We'll use CLI for better control.

### Step 7: Configure Worker in Code

1. Navigate to `api-worker/` directory
2. Open `wrangler.toml`
3. Update the following values:

```toml
name = "pointer-api"  # Change to your preferred worker name
compatibility_date = "2024-01-01"
main = "index.ts"

# D1 Database binding (New account)
[[d1_databases]]
binding = "DB"
database_name = "pointer-database"  # Your database name from Step 3
database_id = "YOUR_NEW_DATABASE_ID_HERE"  # Database ID from Step 3 (New account)

# KV Namespace for API keys (New account)
[[kv_namespaces]]
binding = "BLOG_API_KEYS"
id = "YOUR_NEW_KV_NAMESPACE_ID_HERE"  # KV Namespace ID from Step 5 (New account)

# Environment variables
[vars]
NODE_ENV = "production"
BREVO_API_KEY = "your-brevo-api-key"
JWT_SECRET = "your-jwt-secret-key-change-this"
TURNSTILE_SECRET_KEY = "your-turnstile-secret"

# IMPORTANT: Cloudflare Images uses Image account credentials
# Keep these from the Image account to continue using paid Images service
CLOUDFLARE_ACCOUNT_ID = "b2815b2dfc0adf324286f68823ba9a7c"  # Image account - for Images
CLOUDFLARE_ACCOUNT_HASH = "OY-5RcGvVT9d-duEBIEczg"  # Image account - for Images
CLOUDFLARE_IMAGES_TOKEN = "KiS1U70EEzfd-qlcnd1PBktufRM0fkTO-ztCqDJL"  # Image account - for Images

OPENAI_API_KEY = "your-openai-key"

# Cloudflare Access Configuration (if using)
CLOUDFLARE_ACCESS_AUD = "your-access-aud"
CLOUDFLARE_ACCESS_TEAM_DOMAIN = "your-team-domain.cloudflareaccess.com"
```

**Important Note**: The Cloudflare Images credentials above are from the Image account. Keep these to continue using your paid Images service. Only D1, KV, and Worker/Pages will use the New account.

### Step 8: Get Account Hash (Optional - Only if needed for other services)

**Note**: For Cloudflare Images, we're using the Image account's Account Hash (already provided above).

If you need the New account's Account Hash for other services:
1. Go to **"Workers & Pages"** → **"Overview"** in New account
2. Look for **"Account Hash"** or check in **"R2"** → **"Manage R2 API Tokens"**
3. Copy the Account Hash value (only if needed for other services, not for Images)

### Step 9: Deploy Worker

1. In terminal, navigate to `api-worker/` directory:
   ```bash
   cd api-worker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Deploy the worker:
   ```bash
   wrangler deploy
   ```
4. **IMPORTANT**: Copy the worker URL (e.g., `https://pointer-api.your-subdomain.workers.dev`)

---

## Part 5: Create Cloudflare Pages Project

### Step 10: Connect GitHub Repository

1. In Cloudflare dashboard, go to **"Workers & Pages"** → **"Pages"**
2. Click **"Create a project"**
3. Click **"Connect to Git"**
4. Select **GitHub** (or your Git provider)
5. Authorize Cloudflare to access your repositories
6. Select your repository: `pointerwebsite` (or your repo name)
7. Click **"Begin setup"**

### Step 11: Configure Build Settings

Fill in the build configuration:

- **Project name**: `pointer-website`
- **Production branch**: `main`
- **Framework preset**: `Next.js` (or `None` if not detected)
- **Build command**: `npx @opennextjs/cloudflare build`
- **Build output directory**: `.open-next`
- **Root directory**: `/` (leave empty if root)
- **Environment variables**: We'll add these in the next step

### Step 12: Add Environment Variables to Pages

1. After creating the project, go to **"Settings"** tab
2. Scroll to **"Environment Variables"**
3. Click **"Add variable"** for each:

**Production Environment Variables:**

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://pointer-api.your-subdomain.workers.dev` | Your worker URL from Step 9 |
| `NEXT_PUBLIC_SITE_URL` | `https://pointer.ir` | Your domain |
| `NODE_ENV` | `production` | |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Your GA4 ID (if you have one) |
| `NEXT_PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Your GTM ID (if you have one) |

### Step 13: Configure Build Settings

1. In **"Settings"** → **"Builds & deployments"**
2. Set:
   - **Build command**: `npx @opennextjs/cloudflare build`
   - **Build output directory**: `.open-next`
   - **Root directory**: `/`
   - **Node version**: `22` (or latest LTS)
   - **Compatibility date**: `2024-01-01`
   - **Compatibility flags**: `nodejs_compat`

### Step 14: Add D1 Database Binding to Pages

1. In **"Settings"** → **"Functions"** → **"D1 Database bindings"**
2. Click **"Add binding"**
3. Fill in:
   - **Variable name**: `DB`
   - **D1 Database**: Select `pointer-database`
   - **Environment**: Production (and Preview if needed)
4. Click **"Save"**

### Step 15: Deploy Pages Project

1. Click **"Save and Deploy"** (or it will auto-deploy)
2. Wait for the build to complete
3. Note the deployment URL (e.g., `https://pointer-website.pages.dev`)

---

## Part 6: Configure Custom Domain

### Step 16: Add Custom Domain to Pages

1. In your Pages project, go to **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Enter: `pointer.ir`
4. Follow the DNS configuration instructions

### Step 17: Configure DNS

1. Go to your domain registrar (where you manage `pointer.ir`)
2. Add/update DNS records as instructed by Cloudflare:
   - **CNAME**: `pointer.ir` → `pointer-website.pages.dev`
   - Or use Cloudflare nameservers if domain is managed by Cloudflare

---

## Part 7: Update Codebase with New Configuration

### Step 18: Update API Worker Configuration

Update `api-worker/wrangler.toml` with all the new IDs you collected:

- Database ID
- KV Namespace ID
- Account ID
- Account Hash
- Worker name

### Step 19: Update Frontend Configuration

Update `src/lib/config.ts`:

```typescript
export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://pointer-api.your-subdomain.workers.dev',
  // ... rest of config
}
```

### Step 20: Update CORS Origins in Worker

In `api-worker/index.ts`, update the `getAllowedOrigin` function:

```typescript
function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get('Origin');
  const allowedOrigins = [
    'https://pointer.ir',
    'https://pointer-website.pages.dev',  // Your Pages URL
    'http://localhost:3000'
  ];
  
  return allowedOrigins.includes(origin || '') 
    ? (origin || 'https://pointer.ir') 
    : 'https://pointer.ir';
}
```

---

## Part 8: Final Deployment

### Step 21: Deploy Worker Again

```bash
cd api-worker
wrangler deploy
```

### Step 22: Trigger Pages Deployment

1. Push a commit to your `main` branch, OR
2. Go to Pages dashboard → **"Deployments"** → Click **"Retry deployment"** on latest

### Step 23: Verify Deployment

1. Check worker is accessible: `https://pointer-api.your-subdomain.workers.dev`
2. Check Pages site: `https://pointer.ir` (or Pages URL)
3. Test API endpoints
4. Check database connection

---

## Part 9: Migration Checklist

- [ ] New Cloudflare account logged in
- [ ] New account ID copied
- [ ] D1 Database created and schema migrated (New account)
- [ ] KV Namespace created (New account)
- [ ] Worker deployed and URL noted (New account)
- [ ] Pages project created and connected to GitHub (New account)
- [ ] Environment variables added to Pages
- [ ] D1 binding added to Pages
- [ ] Custom domain configured
- [ ] DNS records updated
- [ ] Codebase updated with new IDs
- [ ] Image account credentials kept in wrangler.toml
- [ ] Worker CORS updated
- [ ] Both worker and pages deployed
- [ ] Site accessible and functional

---

## Troubleshooting

### Worker Not Deploying
- Check `wrangler.toml` syntax
- Verify all IDs are correct
- Check Wrangler is logged in: `wrangler whoami`

### Pages Build Failing
- Check build logs in Pages dashboard
- Verify environment variables are set
- Check Node version compatibility

### Database Connection Issues
- Verify D1 binding is added to Pages
- Check database ID is correct
- Ensure schema is migrated

### CORS Errors
- Update allowed origins in worker
- Check API base URL in frontend config
- Verify worker URL is correct

---

## Quick Reference

**Important IDs to Collect:**
- Account ID: From dashboard sidebar
- Database ID: From D1 → Your database
- KV Namespace ID: From KV → Your namespace
- Worker URL: After deployment
- Pages URL: After deployment

**Key Files to Update:**
- `api-worker/wrangler.toml`
- `src/lib/config.ts`
- `api-worker/index.ts` (CORS origins)

---

*Last Updated: After Pointer migration*
*Version: 1.0*

