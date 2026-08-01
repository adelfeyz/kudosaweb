# Setting Environment Variables in Cloudflare Pages

This guide will walk you through setting environment variables for your Pointer website on Cloudflare Pages.

## Prerequisites

- Access to your Cloudflare account
- Your Cloudflare Pages project already deployed
- Your GA4 Measurement ID: `G-JWGCQDFBMQ`
- Your site URL: `https://pointer.ir`

## Step-by-Step Instructions

### Step 1: Access Cloudflare Dashboard

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Log in to your account
3. Select your account/organization

### Step 2: Navigate to Pages

1. In the left sidebar, click on **"Workers & Pages"**
2. Click on **"Pages"** (or it might be under "Workers & Pages" → "Pages")
3. You'll see a list of your Pages projects
4. Click on your **Pointer** project (or the project name you used)

### Step 3: Access Environment Variables

1. Once in your project, click on the **"Settings"** tab at the top
2. Scroll down to find **"Environment Variables"** section
3. Click on **"Environment Variables"** or the **"Add variable"** button

### Step 4: Add GA4 Measurement ID

1. Click **"Add variable"** or the **"+"** button
2. Fill in the form:
   - **Variable name**: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - **Value**: `G-JWGCQDFBMQ`
   - **Environment**: Select **"Production"** (and optionally "Preview" and "Development" if you want it for all environments)
3. Click **"Save"**

### Step 5: Add Site URL

1. Click **"Add variable"** again
2. Fill in the form:
   - **Variable name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://pointer.ir`
   - **Environment**: Select **"Production"** (and optionally "Preview" and "Development")
3. Click **"Save"**

### Step 5.5: Add Google Tag Manager ID

1. Click **"Add variable"** again
2. Fill in the form:
   - **Variable name**: `NEXT_PUBLIC_GTM_ID`
   - **Value**: `GTM-PWKLGPNR`
   - **Environment**: Select **"Production"** (and optionally "Preview" and "Development")
3. Click **"Save"**

### Step 6: Verify Variables

You should now see all variables listed:
- `NEXT_PUBLIC_GA4_MEASUREMENT_ID` = `G-JWGCQDFBMQ`
- `NEXT_PUBLIC_SITE_URL` = `https://pointer.ir`
- `NEXT_PUBLIC_GTM_ID` = `GTM-PWKLGPNR`

### Step 7: Redeploy Your Application

**Important**: Environment variables are only applied to new deployments. You must redeploy for changes to take effect.

#### Option A: Trigger a New Deployment (Recommended)

1. Go to your project's **"Deployments"** tab
2. Find your latest deployment
3. Click the **three dots (⋯)** menu next to it
4. Select **"Retry deployment"** or **"Redeploy"**

#### Option B: Push a New Commit

1. Make a small change to your repository (or just add a comment)
2. Commit and push to your main branch
3. Cloudflare will automatically trigger a new deployment

#### Option C: Manual Trigger via Git

1. Go to your GitHub repository
2. Make a small change (e.g., update README)
3. Commit and push
4. Cloudflare will automatically detect and deploy

### Step 8: Verify Deployment

1. Go to the **"Deployments"** tab
2. Wait for the new deployment to complete (status will show "Success")
3. Click on the deployment to see build logs
4. Verify the build completed successfully

### Step 9: Test GA4 Tracking

1. Visit your production site: `https://pointer.ir`
2. Open browser DevTools (F12)
3. Go to **Network** tab
4. Filter by `gtag` or `googletagmanager`
5. Refresh the page
6. You should see requests to:
   - `www.googletagmanager.com/gtag/js?id=G-JWGCQDFBMQ`
   - `www.google-analytics.com/g/collect`

### Step 10: Verify in Google Analytics

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Navigate to **Reports** → **Realtime**
4. Visit your production site
5. You should see your visit appear within 10-30 seconds

## Environment-Specific Variables

Cloudflare Pages allows you to set different values for different environments:

- **Production**: Live site (pointer.ir)
- **Preview**: Preview deployments (for pull requests)
- **Development**: Local development (if using Cloudflare's dev environment)

### Recommended Setup

For this project, set both variables for all environments:

```
Production:
  NEXT_PUBLIC_GA4_MEASUREMENT_ID = G-JWGCQDFBMQ
  NEXT_PUBLIC_SITE_URL = https://pointer.ir

Preview:
  NEXT_PUBLIC_GA4_MEASUREMENT_ID = G-JWGCQDFBMQ
  NEXT_PUBLIC_SITE_URL = https://pointer.ir

Development:
  NEXT_PUBLIC_GA4_MEASUREMENT_ID = G-JWGCQDFBMQ
  NEXT_PUBLIC_SITE_URL = http://localhost:3000
```

## Troubleshooting

### Variables Not Working After Deployment

**Check:**
1. ✅ Variable names are exactly correct (case-sensitive)
2. ✅ Variables are set for the correct environment (Production)
3. ✅ You've redeployed after adding variables
4. ✅ No typos in variable names or values

### How to Verify Variables Are Set

1. Go to **Settings** → **Environment Variables**
2. Verify both variables are listed
3. Check they're enabled for "Production" environment

### Variables Not Showing in Build Logs

- Environment variables are hidden in build logs for security
- This is normal behavior
- You can verify they're working by checking the deployed site

### Build Fails After Adding Variables

1. Check for typos in variable names
2. Ensure variable names start with `NEXT_PUBLIC_` for Next.js
3. Check build logs for specific error messages
4. Verify no special characters in values

## Security Best Practices

1. ✅ **Never commit** `.env.local` to Git
2. ✅ Use Cloudflare's environment variables for production secrets
3. ✅ Use different GA4 IDs for staging/production if needed
4. ✅ Regularly rotate API keys and secrets
5. ✅ Limit access to Cloudflare dashboard

## Additional Cloudflare Pages Settings

While you're in the Settings tab, you might want to configure:

### Build Settings
- **Build command**: `npm run build`
- **Build output directory**: `.next` (or `out` if using static export)
- **Root directory**: `/` (or your project root)

### Custom Domains
- Ensure `pointer.ir` is properly configured
- SSL/TLS should be set to "Full" or "Full (strict)"

## Quick Reference

**Required Environment Variables:**
```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-JWGCQDFBMQ
NEXT_PUBLIC_SITE_URL=https://pointer.ir
```

**Where to Set:**
- Cloudflare Dashboard → Workers & Pages → Your Project → Settings → Environment Variables

**After Setting:**
- Must redeploy for changes to take effect

## Support

If you encounter issues:
1. Check Cloudflare's [Pages documentation](https://developers.cloudflare.com/pages/)
2. Review build logs in the Deployments tab
3. Verify variable names match exactly (case-sensitive)
4. Ensure variables are set for the correct environment

---

**Last Updated**: After GA4 implementation
**Version**: 1.0

