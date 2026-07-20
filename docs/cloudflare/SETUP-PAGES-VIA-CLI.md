# Setup Cloudflare Pages via CLI

Yes! You can create and manage Cloudflare Pages projects using Wrangler CLI. This is often easier than using the dashboard.

## Prerequisites

✅ API token set: `$env:CLOUDFLARE_API_TOKEN="_CeRca_gNyE-CkZ7SLOh4b_4bSeLF9pcWP2Y6lH4"`  
✅ Account ID: `8f5835aa72758a54d648b4ca76b1ad2c`  
✅ GitHub repository ready

## Step 1: Check Available Commands

```powershell
cd F:\code\pointerwebsite
$env:CLOUDFLARE_API_TOKEN="_CeRca_gNyE-CkZ7SLOh4b_4bSeLF9pcWP2Y6lH4"
npx wrangler pages project --help
```

## Step 2: List Existing Projects

```powershell
npx wrangler pages project list
```

## Step 3: Create Pages Project via CLI

**Yes!** Wrangler CLI supports creating Pages projects:

```powershell
# Make sure CLOUDFLARE_ACCOUNT_ID is not set (it might point to Image account)
$env:CLOUDFLARE_ACCOUNT_ID=""

# Create the project
npx wrangler pages project create pointer-website --production-branch=main
```

**Note**: If you get authentication errors, the API token might need additional permissions:
- Go to: https://dash.cloudflare.com/profile/api-tokens
- Edit your token
- Ensure it has **"Cloudflare Pages:Edit"** permission

### Alternative: Create via Dashboard

If CLI doesn't work due to permissions, create the project in dashboard first, then configure via CLI.

## Step 4: Configure Project Settings

After the project is created, you can configure it:

### Add Environment Variables

```powershell
npx wrangler pages secret put NEXT_PUBLIC_API_BASE_URL
# Enter value: https://unified-api.alexfeyz82.workers.dev

npx wrangler pages secret put NEXT_PUBLIC_SITE_URL
# Enter value: https://pointer.ir
```

**Note**: `wrangler pages secret` is for secrets. For public env vars, you may need to use the dashboard or check if there's a different command.

### Add D1 Database Binding

D1 bindings for Pages might need to be configured via dashboard, or check:

```powershell
npx wrangler pages project --help
```

## Step 5: Connect GitHub Repository

**Important**: GitHub integration typically needs to be done via the dashboard:

1. Go to your Pages project in dashboard
2. Go to **Settings** → **Builds & deployments**
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npx @opennextjs/cloudflare build`
   - Build output directory: `.open-next`
   - Root directory: `/`

## Alternative: Use Cloudflare C3 (Create Cloudflare)

Cloudflare provides a CLI tool specifically for creating projects:

```powershell
npm create cloudflare@latest pointer-website -- --platform=pages --framework=nextjs
```

However, this creates a new project. For an existing project, you might need to:

1. Create the project in dashboard first
2. Then configure via CLI or dashboard

## Recommended Approach

Since you already have a codebase:

1. **Create project in dashboard** (minimal setup):
   - Go to Pages section
   - Create project
   - Connect GitHub repo
   - Set basic build settings

2. **Configure via dashboard**:
   - Add environment variables
   - Add D1 binding
   - Configure build settings

3. **Deploy via CLI** (optional):
   ```powershell
   npx wrangler pages deploy .open-next --project-name=pointer-website
   ```

## Useful CLI Commands

```powershell
# List all Pages projects
npx wrangler pages project list

# View project details
npx wrangler pages project get pointer-website

# Deploy a directory
npx wrangler pages deploy .open-next --project-name=pointer-website

# View deployments
npx wrangler pages deployment list --project-name=pointer-website

# Add secrets (for sensitive env vars)
npx wrangler pages secret put VARIABLE_NAME

# List secrets
npx wrangler pages secret list --project-name=pointer-website
```

## Troubleshooting

### "Project not found"
- Create the project in dashboard first
- Or check project name spelling

### "Cannot create project via CLI"
- Pages projects typically need to be created via dashboard
- CLI is mainly for deployment and configuration

### Environment variables not working
- Public vars (`NEXT_PUBLIC_*`) need to be set in dashboard
- Secrets can be set via CLI: `wrangler pages secret put`

---

*Last Updated: November 2024*

