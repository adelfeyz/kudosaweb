# Wrangler Multi-Account Setup Guide

This guide shows how to configure this project to use the **New account** while keeping other projects using the **Image account** (old account).

## Understanding Wrangler Authentication

Wrangler can authenticate in two ways:
1. **Global OAuth login** (`wrangler login`) - affects all projects
2. **API Token** (per project) - project-specific

## Solution: Use API Token for This Project

The best approach is to use an **API Token** for this project, which won't affect other projects.

### Step 1: Create API Token in New Account

1. Go to your **New Cloudflare account** dashboard:
   - URL: `https://dash.cloudflare.com/8f5835aa72758a54d648b4ca76b1ad2c/...`

2. Navigate to **"My Profile"** → **"API Tokens"** (or go directly to: `https://dash.cloudflare.com/profile/api-tokens`)

3. Click **"Create Token"**

4. Use **"Edit Cloudflare Workers"** template, OR create custom token with:
   - **Permissions**:
     - Account: `Cloudflare Workers:Edit`
     - Account: `Account:Read`
     - Account: `D1:Edit`
     - Account: `KV Storage:Edit`
     - Account: `Pages:Edit`
   - **Account Resources**: Select your **New account** (`8f5835aa72758a54d648b4ca76b1ad2c`)
   - **Zone Resources**: Leave as "Include All zones" (or specific if needed)

5. Click **"Continue to summary"** → **"Create Token"**

6. **IMPORTANT**: Copy the token immediately (you won't see it again!)

### Step 2: Add Account ID to wrangler.toml

Add the account ID to your `wrangler.toml` so Wrangler knows which account to use:

```toml
name = "pointer-api"
compatibility_date = "2024-01-01"
main = "index.ts"

# Account ID (New account)
account_id = "8f5835aa72758a54d648b4ca76b1ad2c"

# ... rest of config
```

### Step 3: Use API Token for This Project

You have two options:

#### Option A: Environment Variable (Recommended)

Create a `.dev.vars` file in the `api-worker/` directory (this file is gitignored):

```bash
# api-worker/.dev.vars
CLOUDFLARE_API_TOKEN=your-new-account-api-token-here
```

Then Wrangler will automatically use this token when working in this project.

#### Option B: Set in Shell Session

In your terminal, set the token only for this session:

**PowerShell:**
```powershell
$env:CLOUDFLARE_API_TOKEN="your-new-account-api-token-here"
```

**Bash/Zsh:**
```bash
export CLOUDFLARE_API_TOKEN="your-new-account-api-token-here"
```

### Step 4: Verify Connection

Test that you're connected to the New account:

```bash
cd api-worker
wrangler whoami
```

Should show:
- Your New account email
- Account ID: `8f5835aa72758a54d648b4ca76b1ad2c`

Test database access:
```bash
wrangler d1 list
```

Should show `pointer-database` with ID: `cbabf96f-7269-4ba6-b997-3e5795484ea2`

## Alternative: Use .wrangler Directory (Project-Specific)

Wrangler stores authentication in `~/.wrangler/` by default. You can also:

1. Keep global login for old account projects
2. Use API token only for this project (via `.dev.vars` or environment variable)

## Important Notes

### Image Account (Old Account)

The Image account credentials in `wrangler.toml` are **separate** from Wrangler authentication:
- `CLOUDFLARE_ACCOUNT_ID = "b2815b2dfc0adf324286f68823ba9a7c"` (Image account)
- `CLOUDFLARE_ACCOUNT_HASH = "OY-5RcGvVT9d-duEBIEczg"` (Image account)
- `CLOUDFLARE_IMAGES_TOKEN = "KiS1U70EEzfd-qlcnd1PBktufRM0fkTO-ztCqDJL"` (Image account)

These are used directly in API calls and **don't require Wrangler authentication**.

### Other Projects

Other projects will continue using:
- Global OAuth login (if set)
- Their own API tokens (if configured)
- This project's configuration won't affect them

## Quick Setup Summary

1. ✅ Create API token in New account
2. ✅ Add `account_id` to `wrangler.toml`
3. ✅ Add token to `.dev.vars` (or set as env var)
4. ✅ Verify with `wrangler whoami`
5. ✅ Test with `wrangler d1 list`

## Troubleshooting

### Wrong Account Detected

If `wrangler whoami` shows wrong account:
1. Check `account_id` in `wrangler.toml` matches New account
2. Verify API token is for New account
3. Make sure `.dev.vars` or env var is set correctly

### Can't Access Resources

If you get "unauthorized" or "not found":
1. Verify API token has correct permissions
2. Check token is for New account (not Image account)
3. Verify `account_id` in `wrangler.toml`

### Other Projects Affected

If other projects start using wrong account:
- They might be reading the same `.dev.vars` file
- Solution: Use project-specific `.dev.vars` files
- Or use environment variables only in this project's directory

---

*Last Updated: After multi-account setup*
*Version: 1.0*

