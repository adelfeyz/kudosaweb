# GTM Tag Troubleshooting Guide
## Fixing "Tag stopped sending data" Error

### Issue
GTM shows: **"Tag stopped sending data - This tag has not been detected in the last 48 hours"**

---

## Step 1: Verify GTM Installation

### Check 1: Environment Variable
Verify your GTM ID is set in environment variables:

**Local Development** (`.env.local`):
```env
NEXT_PUBLIC_GTM_ID=GTM-PWKLGPNR
```

**Production** (Cloudflare Pages):
- Go to Cloudflare Pages → Your Site → Settings → Environment Variables
- Verify `NEXT_PUBLIC_GTM_ID` is set to `GTM-PWKLGPNR`

### Check 2: Verify GTM Code in Browser
1. Open your website in a browser
2. Open **Developer Tools** (F12)
3. Go to **Console** tab
4. Type: `window.dataLayer`
5. **Expected**: Should see an array with GTM data
6. **If empty/undefined**: GTM is not loading

### Check 3: Check Network Tab
1. Open **Developer Tools** → **Network** tab
2. Refresh the page
3. Filter by: `gtm.js`
4. **Expected**: Should see a request to `https://www.googletagmanager.com/gtm.js?id=GTM-PWKLGPNR`
5. **If missing**: GTM script is not loading

### Check 4: View Page Source
1. Right-click on page → **View Page Source**
2. Search for: `googletagmanager.com/gtm.js`
3. **Expected**: Should find the GTM script in `<head>` section
4. **If missing**: GTM code is not being rendered

---

## Step 2: Use Google Tag Assistant

### Install Tag Assistant
1. Install [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Or use [Tag Assistant](https://tagassistant.google.com/) (web version)

### Test Your Site
1. Open your website
2. Click Tag Assistant extension icon
3. Click **"Enable"**
4. Refresh the page
5. **Check for errors**:
   - ❌ Red = Critical error
   - 🟡 Yellow = Warning
   - ✅ Green = Working

### Common Tag Assistant Errors

**Error: "No tags detected"**
- GTM container ID is missing or incorrect
- GTM script is not loading
- Check environment variable

**Error: "Tag not firing"**
- Tag is not configured in GTM
- Trigger is not set up correctly
- Check GTM container is published

---

## Step 3: Verify GTM Container is Published

### Check GTM Dashboard
1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Select your container: **GTM-PWKLGPNR**
3. Look at top right corner
4. **Check version number** (e.g., "Version 5")
5. **If it says "Unpublished"**: You need to publish

### Publish Container
1. Click **"Submit"** button (top right)
2. Add version name: `Initial publish` or `Fix tag detection`
3. Add description: `Publishing to fix tag detection issue`
4. Click **"Publish"**

---

## Step 4: Test with GTM Preview Mode

### Enable Preview Mode
1. In GTM dashboard, click **"Preview"** button
2. Enter your website URL: `https://pointer.ir`
3. Click **"Connect"**
4. A new tab opens with your site in preview mode

### Check Tags Firing
1. In the preview window, you'll see GTM debug panel
2. Navigate your website
3. **Check "Tags" section**:
   - ✅ Green = Tag fired successfully
   - ❌ Red = Tag failed to fire
   - ⚠️ Yellow = Tag not fired (conditions not met)

### Common Preview Mode Issues

**No tags showing in preview:**
- GTM container not published
- Website URL doesn't match
- GTM code not installed on site

**Tags showing but not firing:**
- Trigger conditions not met
- Tag configuration incorrect
- Check tag settings

---

## Step 5: Verify Code Implementation

### Check layout.tsx
The GTM code should be in `src/app/layout.tsx`:

```tsx
{/* Google Tag Manager */}
{gtmId && (
  <Script id="gtm-script" strategy="afterInteractive">
    {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `}
  </Script>
)}
```

**Verify:**
- ✅ GTM script is in `<head>` section
- ✅ GTM noscript is in `<body>` section
- ✅ `gtmId` variable is defined
- ✅ Script uses correct GTM ID

### Check config.ts
Verify `src/lib/config.ts`:

```typescript
gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
```

**If empty string**: Environment variable is not set

---

## Step 6: Common Fixes

### Fix 1: Restart Development Server
After adding/changing environment variables:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Fix 2: Clear Browser Cache
1. Open browser DevTools (F12)
2. Right-click refresh button
3. Select **"Empty Cache and Hard Reload"**

### Fix 3: Check for JavaScript Errors
1. Open browser Console (F12)
2. Look for red error messages
3. **Common errors**:
   - `gtmId is not defined` → Environment variable missing
   - `Cannot read property 'push'` → dataLayer not initialized
   - `Failed to load resource` → Network/CORS issue

### Fix 4: Verify Domain in GTM
1. Go to GTM → **Admin** → **Container Settings**
2. Check **"Monitored domains"**
3. Add your domain: `pointer.ir`
4. Save and republish

---

## Step 7: Test in Production

### Verify Production Environment
1. Check Cloudflare Pages environment variables
2. Verify `NEXT_PUBLIC_GTM_ID` is set
3. Redeploy if needed

### Test Production Site
1. Visit `https://pointer.ir`
2. Use Tag Assistant to verify
3. Check GA4 Real-Time reports
4. Verify tags are firing

---

## Quick Diagnostic Checklist

Run through this checklist:

- [ ] Environment variable `NEXT_PUBLIC_GTM_ID` is set
- [ ] Development server restarted after adding env var
- [ ] GTM container is published (not draft)
- [ ] `window.dataLayer` exists in browser console
- [ ] Network tab shows `gtm.js` request
- [ ] Page source contains GTM script
- [ ] Tag Assistant shows tags detected
- [ ] GTM Preview mode works
- [ ] No JavaScript errors in console
- [ ] Domain is added to GTM monitored domains

---

## Still Not Working?

### Get More Help
1. **Check GTM Debug Console**:
   - Open browser console
   - Type: `window.google_tag_manager`
   - Should see GTM object

2. **Check dataLayer**:
   - Open browser console
   - Type: `window.dataLayer`
   - Should see array with events

3. **Check GTM Container**:
   - Verify container ID is correct: `GTM-PWKLGPNR`
   - Check container is not in draft mode
   - Verify tags are configured

4. **Check Network Issues**:
   - Verify no ad blockers are active
   - Check firewall/proxy settings
   - Test in incognito mode

---

## Expected Behavior When Working

✅ **GTM is working when:**
- Tag Assistant shows green tags
- `window.dataLayer` exists in console
- Network tab shows `gtm.js` loaded
- GTM Preview mode shows tags firing
- GA4 Real-Time reports show events
- No errors in browser console

---

**Last Updated**: GTM Troubleshooting Guide
**Related Docs**:
- [GTM Quick Setup](./GTM-QUICK-SETUP.md)
- [GTM Tag Configuration Guide](./GTM-TAG-CONFIGURATION-GUIDE.md)

