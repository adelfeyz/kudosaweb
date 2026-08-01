# Next Steps After Pages Deployment

Your Cloudflare Pages deployment succeeded! Here's what to do next to complete the setup.

## ✅ Completed

- ✅ Database created and schema migrated
- ✅ KV namespace created
- ✅ Worker deployed: `https://unified-api.alexfeyz82.workers.dev`
- ✅ Pages deployed: `https://pointerwebsite.pages.dev`

## 📋 Next Steps

### Step 1: Add Environment Variables to Pages

1. Go to your Pages project: https://dash.cloudflare.com/8f5835aa72758a54d648b4ca76b1ad2c/pages/pointerwebsite
2. Click **"Settings"** tab
3. Scroll to **"Environment variables"**
4. Click **"Add variable"** for each:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://unified-api.alexfeyz82.workers.dev` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://pointer.ir` | Production, Preview |
| `NODE_ENV` | `production` | Production, Preview |

**Optional** (if you have them):
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION`

5. Click **"Save"** after adding each variable

### Step 2: Add D1 Database Binding

1. In Pages project → **Settings** → **Functions**
2. Scroll to **"D1 Database bindings"**
3. Click **"Add binding"**
4. Fill in:
   - **Variable name**: `DB`
   - **D1 Database**: Select `pointer-database`
   - **Environment**: Production (and Preview if needed)
5. Click **"Save"**

### Step 3: Add Node.js Compatibility Flag

1. In Pages project → **Settings** → **Functions**
2. Scroll to **"Compatibility flags"**
3. Add: `nodejs_compat`
4. Click **"Save"**

This fixes the warnings about Node.js built-in modules.

### Step 4: Update Worker CORS Origins

Add your Pages URL to the Worker's allowed origins:

1. Update `api-worker/index.ts`:

```typescript
const allowedOrigins = [
  'https://aidra.care',
  'https://pointer.ir',
  'https://menloparksmiles.com',    
  'https://2bac37c9.aidra-website.pages.dev',
  'https://3f5af779.aidra-website.pages.dev',
  'https://pointerwebsite.pages.dev',  // Add this!
  'http://localhost:3000'
];
```

2. Redeploy the Worker:
```powershell
cd F:\code\pointerwebsite\api-worker
$env:CLOUDFLARE_API_TOKEN="_CeRca_gNyE-CkZ7SLOh4b_4bSeLF9pcWP2Y6lH4"
npx wrangler deploy
```

### Step 5: Trigger Pages Redeployment

After adding environment variables and bindings:

1. Go to **Deployments** tab
2. Click **"Retry deployment"** on the latest deployment
3. Or push a new commit to trigger automatic deployment

### Step 6: Test the Integration

1. Visit: `https://pointerwebsite.pages.dev`
2. Test:
   - Homepage loads correctly
   - API calls work (check browser console)
   - Contact form submission
   - Blog pages load
   - No CORS errors

### Step 7: Configure Custom Domain (Optional)

1. In Pages project → **Custom domains** tab
2. Click **"Set up a custom domain"**
3. Enter: `pointer.ir`
4. Follow DNS configuration instructions
5. Wait for DNS propagation

## 🎯 Priority Order

1. **Environment variables** (Step 1) - Required for API calls
2. **D1 binding** (Step 2) - Required for database access
3. **Node.js compatibility** (Step 3) - Fixes warnings
4. **Worker CORS** (Step 4) - Allows API calls from Pages
5. **Test** (Step 6) - Verify everything works
6. **Custom domain** (Step 7) - Optional, can do later

## 🔍 Verification Checklist

After completing steps 1-4:

- [ ] Environment variables added to Pages
- [ ] D1 database binding added
- [ ] Node.js compatibility flag added
- [ ] Worker CORS updated and redeployed
- [ ] Pages redeployed with new settings
- [ ] Site loads at `https://pointerwebsite.pages.dev`
- [ ] API calls work (no CORS errors)
- [ ] Database connections work
- [ ] Forms submit successfully

## 🐛 Troubleshooting

### Site loads but API calls fail
- Check environment variables are set correctly
- Verify Worker CORS includes Pages URL
- Check browser console for errors

### Database errors
- Verify D1 binding is added
- Check database name: `pointer-database`
- Ensure binding variable name is `DB`

### Build warnings about Node.js
- Add `nodejs_compat` compatibility flag
- Redeploy after adding flag

---

*Last Updated: November 2024*

