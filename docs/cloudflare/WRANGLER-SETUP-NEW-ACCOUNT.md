# Wrangler CLI Setup for New Cloudflare Account

This guide will help you connect Wrangler CLI to your **New account** while keeping the **Image account** credentials for Cloudflare Images.

## Step 1: Install/Update Wrangler CLI

If you don't have Wrangler installed or need to update it:

```bash
npm install -g wrangler
```

Or update if already installed:
```bash
npm update -g wrangler
```

Verify installation:
```bash
wrangler --version
```

## Step 2: Logout from Old Account (If Already Logged In)

If you're already logged into Wrangler with the old account, logout first:

```bash
wrangler logout
```

This will clear any existing authentication.

## Step 3: Login to New Account

1. Run the login command:
   ```bash
   wrangler login
   ```

2. This will:
   - Open your browser
   - Ask you to authorize Wrangler
   - **IMPORTANT**: Make sure you're logged into your **New Cloudflare account** in the browser
   - Click "Allow" to authorize

3. After authorization, you'll see a success message in the terminal.

## Step 4: Verify You're Connected to the New Account

### Method 1: Check Current Account

```bash
wrangler whoami
```

This will show:
- Your email address
- Account ID
- **Verify the Account ID matches your New account**: `8f5835aa72758a54d648b4ca76b1ad2c`

### Method 2: List D1 Databases

```bash
wrangler d1 list
```

This should show:
- Your **New account's** databases
- Should include `pointer-database` with ID: `cbabf96f-7269-4ba6-b997-3e5795484ea2`
- Should **NOT** show old account databases

### Method 3: Check Account ID in Dashboard

1. Go to your Cloudflare dashboard: `https://dash.cloudflare.com/8f5835aa72758a54d648b4ca76b1ad2c/...`
2. The account ID in the URL should match what `wrangler whoami` shows

## Step 5: Test Database Connection

Test that you can access your New account's database:

```bash
wrangler d1 execute pointer-database --remote --command="SELECT COUNT(*) as count FROM sqlite_master WHERE type='table';"
```

This should:
- Connect to your **New account's** database
- Return a count of tables
- **NOT** error with "database not found" or "unauthorized"

## Important Notes

### Image Account Credentials (Separate)

**Remember**: The Image account credentials are stored in `wrangler.toml` as environment variables:
- `CLOUDFLARE_ACCOUNT_ID = "b2815b2dfc0adf324286f68823ba9a7c"` (Image account)
- `CLOUDFLARE_ACCOUNT_HASH = "OY-5RcGvVT9d-duEBIEczg"` (Image account)
- `CLOUDFLARE_IMAGES_TOKEN = "KiS1U70EEzfd-qlcnd1PBktufRM0fkTO-ztCqDJL"` (Image account)

These are **NOT** affected by Wrangler login. They're used directly in API calls to Cloudflare Images, which is separate from Wrangler's account connection.

### What Wrangler Uses

Wrangler uses the logged-in account for:
- ✅ D1 database operations
- ✅ KV namespace operations
- ✅ Worker deployments
- ✅ Pages deployments
- ✅ Resource management

Wrangler does **NOT** use the logged-in account for:
- ❌ Cloudflare Images API calls (uses Image account credentials from env vars)

## Troubleshooting

### Wrong Account Connected

If `wrangler whoami` shows the wrong account:

1. Logout:
   ```bash
   wrangler logout
   ```

2. Make sure you're logged into the **New account** in your browser

3. Login again:
   ```bash
   wrangler login
   ```

4. Verify:
   ```bash
   wrangler whoami
   ```

### Can't Access Database

If you get "database not found" or "unauthorized":

1. Verify you're on the correct account:
   ```bash
   wrangler whoami
   ```

2. Check the database ID in `wrangler.toml` matches your New account's database:
   ```bash
   wrangler d1 list
   ```

3. Verify database name:
   ```bash
   wrangler d1 info pointer-database
   ```

### Multiple Accounts

If you have multiple Cloudflare accounts:

1. Always check which account you're logged into:
   ```bash
   wrangler whoami
   ```

2. The account ID should be: `8f5835aa72758a54d648b4ca76b1ad2c` (New account)

3. If you need to switch accounts, logout and login again

## Quick Verification Checklist

After setup, verify:

- [ ] `wrangler whoami` shows your New account email
- [ ] `wrangler whoami` shows Account ID: `8f5835aa72758a54d648b4ca76b1ad2c`
- [ ] `wrangler d1 list` shows `pointer-database` with ID: `cbabf96f-7269-4ba6-b997-3e5795484ea2`
- [ ] Can execute queries on `pointer-database`
- [ ] Image account credentials still in `wrangler.toml` (not changed)

## Next Steps

Once verified, you can:
1. Deploy your worker: `wrangler deploy` (from `api-worker/` directory)
2. Migrate database schema: `wrangler d1 execute pointer-database --remote --file=../database/schema.sql`
3. Manage KV namespaces
4. Deploy Pages (via dashboard or CLI)

---

*Last Updated: After New account setup*
*Version: 1.0*

