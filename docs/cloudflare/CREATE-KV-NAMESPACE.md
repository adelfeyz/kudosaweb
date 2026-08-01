# Create KV Namespace - Step by Step

This guide shows how to create a KV namespace in your **New account** for the Pointer project.

## Method 1: Via Cloudflare Dashboard (Recommended)

### Step 1: Navigate to KV

1. Go to your **New Cloudflare account** dashboard:
   - URL: `https://dash.cloudflare.com/8f5835aa72758a54d648b4ca76b1ad2c/...`
   - Make sure you're in the **New account** (check URL has: `8f5835aa72758a54d648b4ca76b1ad2c`)

2. In the left sidebar, look for **"Storage & databases"** section

3. Click **"Storage & databases"** to expand it

4. Click **"KV"** (or it might be listed as "Workers KV")

**Alternative locations to check:**
- Under **"Workers & Pages"** → Look for a **"KV"** tab or link
- Under **"Storage & databases"** → **"KV"**
- In the main dashboard, search for "KV" in the search bar

### Step 2: Create Namespace

1. Click **"Create a namespace"** button (or **"Add"** button)

2. Fill in the form:
   - **Namespace name**: `pointer-blog-api-keys`
   - (Optional) **Add a preview namespace**: Leave unchecked for now

3. Click **"Add"** or **"Create"**

### Step 3: Copy Namespace ID

1. After creation, you'll see your namespace in the list
2. **IMPORTANT**: Click on the namespace name or the **"..."** menu
3. Copy the **Namespace ID** (format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
4. You'll need this for `wrangler.toml`

## Method 2: Via Wrangler CLI (Easier)

### Step 1: Set Up Environment

Make sure you're in the `api-worker/` directory with API token set:

**PowerShell:**
```powershell
cd F:\code\pointerwebsite\api-worker
$env:CLOUDFLARE_API_TOKEN="_CeRca_gNyE-CkZ7SLOh4b_4bSeLF9pcWP2Y6lH4"
```

Or use the setup script:
```powershell
.\setup-wrangler.ps1
```

### Step 2: Create Namespace

```bash
npx wrangler kv namespace create BLOG_API_KEYS
```

**Note:** No quotes needed around the namespace name.

This will output something like:
```
🌀  Creating namespace with title "BLOG_API_KEYS"
✨  Success!
Add the following to your configuration file in your kv_namespaces array:
{ binding = "BLOG_API_KEYS", id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
```

### Step 3: Update wrangler.toml

Copy the `id` from the output and update `api-worker/wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "BLOG_API_KEYS"
id = "your-new-namespace-id-here"  # Replace with the ID from CLI output
```

## Verify Namespace

### Via Dashboard

1. Go to **Storage & databases** → **KV** (or search for "KV")
2. You should see `BLOG_API_KEYS` in the list

### Via CLI

```bash
npx wrangler kv namespace list
```

Should show your namespace with the ID.

## Update wrangler.toml

After getting the namespace ID, update `api-worker/wrangler.toml`:

```toml
# KV Namespace for API keys (New account)
[[kv_namespaces]]
binding = "BLOG_API_KEYS"
id = "YOUR_NEW_NAMESPACE_ID_HERE"  # Replace with actual ID from CLI or dashboard
```

**Current value** (from old account - needs to be replaced):
- `id = "8f8e08ab43684aa6bb27d93d988c0775"` ❌ (Old account)

**New value** (from New account):
- `id = "your-new-namespace-id"` ✅ (New account)

## Quick CLI Method (Recommended)

Since KV might not be easily visible in the dashboard, use CLI:

```powershell
cd F:\code\pointerwebsite\api-worker
.\setup-wrangler.ps1
npx wrangler kv namespace create BLOG_API_KEYS
```

Then copy the ID from the output and update `wrangler.toml`.

## Important Notes

- **Namespace name** can be anything (e.g., `pointer-blog-api-keys` or `BLOG_API_KEYS`)
- **Binding name** in `wrangler.toml` must match what your code expects: `BLOG_API_KEYS`
- **Namespace ID** is unique and required for the binding
- This namespace is for **New account** only
- Old account's KV namespace won't be accessible from New account

## Troubleshooting

### "Namespace not found" error
- Verify namespace ID is correct
- Check you're using New account API token
- Ensure namespace exists in New account dashboard

### Can't create namespace
- Verify API token has `KV Storage:Edit` permission
- Check you're in the correct account
- Try creating via CLI instead (easier)

### KV not visible in dashboard
- Use CLI method instead: `npx wrangler kv namespace create BLOG_API_KEYS`
- Or search for "KV" in the dashboard search bar
- Check under "Storage & databases" section

---

*Last Updated: After New account setup*
*Version: 1.0*
