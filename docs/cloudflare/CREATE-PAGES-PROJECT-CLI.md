# Create Cloudflare Pages Project via CLI

Yes, you can create a Pages project using Wrangler CLI!

## Prerequisites

✅ API token with Pages permissions  
✅ Account ID: `8f5835aa72758a54d648b4ca76b1ad2c`

## Step 1: Check API Token Permissions

Your API token needs **"Cloudflare Pages:Edit"** permission:

1. Go to: https://dash.cloudflare.com/profile/api-tokens
2. Find your token (or create a new one)
3. Ensure it has:
   - **Account** → **Cloudflare Pages** → **Edit**
   - **Account** → **Account Settings** → **Read**

## Step 2: Clear Conflicting Environment Variables

The `CLOUDFLARE_ACCOUNT_ID` in `api-worker/wrangler.toml` points to the Image account. We need to avoid that:

```powershell
cd F:\code\pointerwebsite

# Clear the Image account ID (temporarily)
$env:CLOUDFLARE_ACCOUNT_ID=""

# Set API token
$env:CLOUDFLARE_API_TOKEN="_CeRca_gNyE-CkZ7SLOh4b_4bSeLF9pcWP2Y6lH4"
```

## Step 3: Create Pages Project

```powershell
npx wrangler pages project create pointer-website --production-branch=main
```

**Expected output:**
```
✨ Successfully created Pages project 'pointer-website'
```

## Step 4: Verify Project Created

```powershell
npx wrangler pages project list
```

Should show `pointer-website` in the list.

## Step 5: Connect GitHub Repository

**Note**: GitHub integration typically needs to be done via dashboard:

1. Go to: https://dash.cloudflare.com/8f5835aa72758a54d648b4ca76b1ad2c/pages
2. Click on `pointer-website` project
3. Go to **Settings** → **Builds & deployments**
4. Click **"Connect to Git"**
5. Select your repository and branch

## Step 6: Configure Build Settings

In the dashboard:

1. **Build command**: `npx @opennextjs/cloudflare build`
2. **Build output directory**: `.open-next`
3. **Root directory**: `/`
4. **Node version**: `22` (or `20`)

## Step 7: Add Environment Variables

In dashboard → Settings → Environment variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://unified-api.alexfeyz82.workers.dev` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://pointer.ir` | Production, Preview |
| `NODE_ENV` | `production` | Production, Preview |

## Step 8: Add D1 Database Binding

In dashboard → Settings → Functions → D1 Database bindings:

1. Click **"Add binding"**
2. **Variable name**: `DB`
3. **D1 Database**: `pointer-database`
4. **Environment**: Production (and Preview)

## Troubleshooting

### "Authentication error [code: 10000]"
- **Check API token permissions**: Needs "Cloudflare Pages:Edit"
- **Verify account**: Make sure token is for New account
- **Try creating in dashboard first**: Then configure via CLI

### "Must specify a production branch"
- Add `--production-branch=main` flag

### Wrong account ID being used
- Clear `CLOUDFLARE_ACCOUNT_ID` env var: `$env:CLOUDFLARE_ACCOUNT_ID=""`
- Or create project from a different directory (not api-worker/)

### "Project already exists"
- List projects: `npx wrangler pages project list`
- Delete if needed: `npx wrangler pages project delete pointer-website`

## Alternative: Create via Dashboard

If CLI doesn't work:

1. Go to dashboard → Pages
2. Click "Create a project" (or use the "Looking to deploy Pages? Get started" link)
3. Connect GitHub
4. Configure settings

Then you can manage deployments via CLI.

---

*Last Updated: November 2024*

