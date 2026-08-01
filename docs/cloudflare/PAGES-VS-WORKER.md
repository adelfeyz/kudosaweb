# Pages vs Worker - How to Tell the Difference

## ❌ What You're Seeing (Worker Setup)

If you see this, you're setting up a **Worker**, not Pages:

```
Set up your application
Configure your Worker project and deploy it to Cloudflare.

Project name
Build command (Optional)
Deploy command: npx wrangler deploy  ← This is for Workers!
Non-production branch deploy command (Optional)
Path: /
API token
```

**This is WRONG for Pages!** Go back and find the Pages option.

## ✅ What You Should See (Pages Setup)

For **Pages**, you should see:

```
Connect to Git
or
Upload assets

Then:
Project name: pointer-website
Framework preset: Next.js
Build command: npx @opennextjs/cloudflare build  ← This is for Pages!
Build output directory: .open-next
Root directory: /
Environment variables
```

## How to Get to Pages

### Method 1: Use the Link
1. Go back to the "Create a Worker" modal
2. Scroll to the bottom
3. Click **"Looking to deploy Pages? Get started"**

### Method 2: Direct Navigation
1. In the left sidebar, look for **"Pages"** as a separate option
2. Or search for "Pages" in the dashboard search bar
3. Or go directly to: `https://dash.cloudflare.com/[account-id]/pages`

### Method 3: From Workers & Pages
1. In "Workers & Pages", look for a **"Pages"** tab or section
2. There might be separate sections for "Workers" and "Pages"

## Key Differences

| Feature | Worker | Pages |
|---------|--------|-------|
| Deploy command | `npx wrangler deploy` | `npx @opennextjs/cloudflare build` |
| Output directory | Not needed | `.open-next` |
| Framework | Any | Next.js, React, etc. |
| Use case | API endpoints, serverless functions | Static sites, Next.js apps |
| Setup screen | "Set up your application" | "Connect to Git" or "Upload assets" |

## What to Do Now

1. **Cancel/Go back** from the current Worker setup screen
2. Look for the **"Looking to deploy Pages? Get started"** link
3. Or navigate directly to Pages section
4. You should see options to **"Connect to Git"** or **"Upload assets"**
5. That's the correct Pages setup flow!

---

*Last Updated: November 2024*

