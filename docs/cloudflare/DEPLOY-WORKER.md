# Deploy Cloudflare Worker - Step by Step

This guide shows how to deploy the unified API Worker to your **New account**.

## Prerequisites

✅ Database created and schema migrated  
✅ KV namespace created  
✅ `wrangler.toml` updated with all IDs  
✅ API token set up for New account

## Step 1: Navigate to Worker Directory

```powershell
cd F:\code\pointerwebsite\api-worker
```

## Step 2: Set Up Environment

Make sure your API token is set:

```powershell
$env:CLOUDFLARE_API_TOKEN="_CeRca_gNyE-CkZ7SLOh4b_4bSeLF9pcWP2Y6lH4"
```

Or use the setup script if you have one:
```powershell
.\setup-wrangler.ps1
```

## Step 3: Verify Configuration

Check that `wrangler.toml` has all the correct IDs:

- ✅ Account ID: `8f5835aa72758a54d648b4ca76b1ad2c`
- ✅ Database ID: `cbabf96f-7269-4ba6-b997-3e5795484ea2`
- ✅ KV Namespace ID: `1ee2ee342709472aaf03bb2aeb4e112f`
- ✅ Image account credentials (for Cloudflare Images)

## Step 4: Install Dependencies (if needed)

```bash
npm install
```

## Step 5: Verify Wrangler Authentication

```bash
npx wrangler whoami
```

Should show:
- Your email: `alexfeyz82@gmail.com`
- Account ID: `8f5835aa72758a54d648b4ca76b1ad2c`

## Step 6: Deploy the Worker

```bash
npx wrangler deploy
```

This will:
1. Build your Worker
2. Upload it to Cloudflare
3. Deploy it to your New account
4. Show you the Worker URL

**Expected output:**
```
🌀  Compiling your worker to JavaScript...
✨  Compiled Worker successfully
🌀  Uploading Worker...
✨  Successfully published your Worker to the following routes:
  - https://unified-api.your-subdomain.workers.dev
```

## Step 7: Copy Worker URL

After deployment, you'll see a URL like:
- `https://unified-api.xxxxx.workers.dev`

**IMPORTANT**: Copy this URL - you'll need it for:
- Frontend configuration (`src/lib/config.ts`)
- CORS origins in the Worker
- Cloudflare Pages environment variables

## Step 8: Test the Worker

Test the health endpoint:

```bash
curl https://unified-api.xxxxx.workers.dev/health
```

Or visit in browser:
```
https://unified-api.xxxxx.workers.dev/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "..."
}
```

## Step 9: Update Frontend Configuration

After getting the Worker URL, update `src/lib/config.ts`:

```typescript
export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://unified-api.xxxxx.workers.dev',
  // ... rest
}
```

## Step 10: Update CORS Origins (if needed)

If your Worker URL changed, update `api-worker/index.ts`:

```typescript
function getAllowedOrigin(request: Request): string {
  const origin = request.headers.get('Origin');
  const allowedOrigins = [
    'https://pointer.ir',
    'https://pointer-website.pages.dev',  // Your Pages URL (after Pages setup)
    'http://localhost:3000'
  ];
  
  return allowedOrigins.includes(origin || '') 
    ? (origin || 'https://pointer.ir') 
    : 'https://pointer.ir';
}
```

## Troubleshooting

### "Authentication error"
- Verify API token is set: `$env:CLOUDFLARE_API_TOKEN`
- Check token has correct permissions
- Try: `npx wrangler whoami` to verify authentication

### "Database not found"
- Verify database ID in `wrangler.toml` is correct
- Check database exists: `npx wrangler d1 list`
- Ensure database is in the New account

### "KV namespace not found"
- Verify KV namespace ID in `wrangler.toml` is correct
- Check namespace exists: `npx wrangler kv namespace list`
- Ensure namespace is in the New account

### "Account ID mismatch"
- Verify `account_id` in `wrangler.toml` matches New account
- Should be: `8f5835aa72758a54d648b4ca76b1ad2c`

### Build errors
- Check `package.json` has all dependencies
- Run `npm install` in `api-worker/` directory
- Check TypeScript errors: `npm run build` (if available)

## Next Steps

After successful deployment:

1. ✅ **Update frontend config** with Worker URL
2. ✅ **Set up Cloudflare Pages** (next step)
3. ✅ **Add environment variables** to Pages
4. ✅ **Test the full integration**

---

*Last Updated: After Worker deployment*
*Version: 1.0*

