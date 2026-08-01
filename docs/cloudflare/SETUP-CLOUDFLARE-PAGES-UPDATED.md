# Setup Cloudflare Pages - Updated Guide (2024/2025)

Based on the current Cloudflare dashboard, Pages may be in a different location than "Workers & Pages". Here are the updated steps:

## Step 1: Navigate to Workers & Pages

1. Go to your **New Cloudflare account** dashboard:
   - URL: `https://dash.cloudflare.com/8f5835aa72758a54d648b4ca76b1ad2c/...`
   - Make sure you're in the **New account** (check URL has: `8f5835aa72758a54d648b4ca76b1ad2c`)

2. In the left sidebar, click **"Workers & Pages"**

## Step 2: Create Application and Select Pages Tab

1. Click **"Create application"** button (not "Create a project")

2. **IMPORTANT**: You'll see a modal with **two tabs**:
   - **"Workers"** tab (default)
   - **"Pages"** tab ← **Click on this tab!**

3. After clicking the **"Pages"** tab, you'll see options to:
   - **"Connect to Git"** (GitHub, GitLab, Bitbucket) ← Recommended
   - **"Upload assets"** (direct upload)

## Step 3: Connect GitHub Repository

1. Click **"Connect to Git"**
2. Select **"GitHub"** (or your Git provider)
3. Authorize Cloudflare to access your repositories (if first time)
4. Select your repository:
   - Repository: `pointer-website` (or your repo name)
   - Branch: `main` (or `master`)
5. Click **"Begin setup"** or **"Continue"**

## Step 4: Configure Build Settings

Fill in the build configuration:

### Project Name
- **Project name**: `pointer-website`

### Build Settings
- **Framework preset**: `Next.js` (or `None` if not listed)
- **Build command**: `npx @opennextjs/cloudflare build`
- **Build output directory**: `.open-next`
- **Root directory**: `/` (leave as default)
- **Node version**: `22` (or `20` - latest LTS)

### Environment Variables
Click **"Add environment variable"** and add:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://unified-api.alexfeyz82.workers.dev` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://pointer.ir` | Production, Preview |
| `NODE_ENV` | `production` | Production, Preview |

**Additional variables** (if you have them):
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION`
- Any other `NEXT_PUBLIC_*` variables

## Step 5: Add D1 Database Binding

**Note**: D1 bindings might be added during setup or after deployment in Settings.

### During Setup:
1. Look for **"D1 Database bindings"** section
2. Click **"Add binding"**
3. Fill in:
   - **Variable name**: `DB`
   - **D1 Database**: Select `pointer-database`
   - **Environment**: Production (and Preview if needed)
4. Click **"Save"**

### After Setup (if not available during setup):
1. Go to your Pages project
2. Click **"Settings"** tab
3. Go to **"Functions"** → **"D1 Database bindings"**
4. Click **"Add binding"**
5. Fill in the same information as above

## Step 6: Deploy

1. Review all settings
2. Click **"Save and Deploy"** or **"Deploy"**
3. Wait for the build to complete (this may take 5-10 minutes)
4. Note the deployment URL:
   - Example: `https://pointer-website-xxxxx.pages.dev`
   - Or: `https://pointer-website.pages.dev`

## Step 7: Update CORS Origins in Worker

After Pages is deployed, update the Worker CORS origins:

1. Get your Pages URL from Step 6

2. Update `api-worker/index.ts`:

```typescript
const allowedOrigins = [
  'https://aidra.care',
  'https://pointer.ir',
  'https://menloparksmiles.com',    
  'https://2bac37c9.aidra-website.pages.dev',
  'https://3f5af779.aidra-website.pages.dev',
  'https://pointer-website.pages.dev',  // Your actual Pages URL
  'http://localhost:3000'
];
```

3. Redeploy the Worker:
```powershell
cd F:\code\pointerwebsite\api-worker
$env:CLOUDFLARE_API_TOKEN="_CeRca_gNyE-CkZ7SLOh4b_4bSeLF9pcWP2Y6lH4"
npx wrangler deploy
```

## Step 8: Configure Custom Domain (Optional)

1. In your Pages project, go to **"Custom domains"** tab
2. Click **"Set up a custom domain"**
3. Enter: `pointer.ir`
4. Follow the DNS configuration instructions:
   - Add a CNAME record: `pointer.ir` → `pointer-website.pages.dev`
   - Or use Cloudflare nameservers if domain is managed by Cloudflare
5. Wait for DNS propagation (can take a few minutes to hours)

## Troubleshooting

### Can't find "Create application" or "Pages" tab
- **Make sure you're in "Workers & Pages"**: Not just "Workers"
- **Look for "Create application"**: Not "Create a project" or "Create worker"
- **Check the tabs**: After clicking "Create application", look for "Workers" and "Pages" tabs at the top of the modal
- **Check URL**: Make sure you're in the correct account (`8f5835aa72758a54d648b4ca76b1ad2c`)

### Only see "Workers" tab
- **Click "Create application"**: Not "Create worker"
- **Look for tabs**: The modal should have both "Workers" and "Pages" tabs
- **If only Workers tab appears**: Your account might need Pages enabled, or try refreshing the page

### Build fails
- Check build logs in Pages dashboard
- Verify `package.json` has all dependencies
- Check Node version matches (try `20` or `22`)
- Verify build command: `npx @opennextjs/cloudflare build`
- Ensure `@opennextjs/cloudflare` is in dependencies

### "Database not found" error
- Verify D1 binding is added in Pages settings
- Check database name: `pointer-database`
- Ensure database is in New account
- D1 bindings might need to be added in Settings → Functions after initial deployment

### CORS errors
- Update Worker CORS origins with Pages URL
- Redeploy Worker after updating CORS
- Check browser console for exact error

## Alternative: Use Wrangler CLI

If the dashboard is confusing, you can also create Pages projects via CLI:

```bash
npx wrangler pages project create pointer-website
```

Then configure via dashboard or `wrangler.toml`.

---

*Last Updated: November 2024*
*Version: 2.0 - Updated for current dashboard*

