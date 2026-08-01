# Cloudflare Pages - Environment Variables Quick Steps

## 🚀 Quick Setup (5 minutes)

### Step 1: Go to Cloudflare Dashboard
1. Visit: https://dash.cloudflare.com/
2. Login to your account

### Step 2: Navigate to Your Project
1. Click **"Workers & Pages"** in left sidebar
2. Click **"Pages"**
3. Click on your **Pointer** project

### Step 3: Add Environment Variables
1. Click **"Settings"** tab
2. Scroll to **"Environment Variables"** section
3. Click **"Add variable"**

### Step 4: Add GA4 Measurement ID
```
Variable name: NEXT_PUBLIC_GA4_MEASUREMENT_ID
Value: G-JWGCQDFBMQ
Environment: Production (✓)
```

### Step 5: Add Site URL
```
Variable name: NEXT_PUBLIC_SITE_URL
Value: https://pointer.ir
Environment: Production (✓)
```

### Step 6: Redeploy
1. Go to **"Deployments"** tab
2. Click **three dots (⋯)** on latest deployment
3. Click **"Retry deployment"** or **"Redeploy"**

### Step 7: Verify
1. Wait for deployment to complete
2. Visit your site: https://pointer.ir
3. Check Google Analytics → Realtime reports

## 📋 Variables Summary

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | `G-JWGCQDFBMQ` | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://pointer.ir` | Production |

## ⚠️ Important

- **Must redeploy** after adding variables
- Variable names are **case-sensitive**
- Variables only apply to **new deployments**

## 📖 Full Guide

For detailed instructions, see: `docs/CLOUDFLARE-ENV-VARIABLES.md`

