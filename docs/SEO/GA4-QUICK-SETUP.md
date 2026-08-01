# GA4 Quick Setup Checklist - Quick Reference

## ✅ Step-by-Step Checklist

### 1. Create GA4 Property (5 minutes)
- [ ] Go to https://analytics.google.com/
- [ ] Create account or select existing account
- [ ] Create new property → "Web" stream
- [ ] Enter website URL
- [ ] **Copy Measurement ID** (format: `G-XXXXXXXXXX`)

### 2. Set Environment Variables (2 minutes)

**For Local Development:**
- [ ] Create `.env.local` in project root
- [ ] Add: `NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`
- [ ] Add: `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- [ ] Restart dev server: `npm run dev`

**For Production:**
- [ ] Go to your hosting platform (Vercel/Cloudflare/etc.)
- [ ] Navigate to Environment Variables settings
- [ ] Add `NEXT_PUBLIC_GA4_MEASUREMENT_ID` = `G-XXXXXXXXXX`
- [ ] Add `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
- [ ] **Redeploy** your application

### 3. Verify Setup (2 minutes)
- [ ] Visit your website
- [ ] Open Google Analytics → Reports → Realtime
- [ ] You should see your visit within 10-30 seconds
- [ ] Check browser console (F12) → Network tab → filter "gtag"
- [ ] Should see requests to `googletagmanager.com`

### 4. Test Events (5 minutes)
- [ ] Visit a blog post → Check for `blog_post_view` event
- [ ] Submit appointment form → Check for `appointment_request` event
- [ ] Subscribe to newsletter → Check for `newsletter_signup` event
- [ ] Submit contact form → Check for `contact_form_submit` event

## 🎯 Your Measurement ID Format

```
G-XXXXXXXXXX
```

Example: `G-ABC123XYZ9`

## 📝 Environment Variables Template

```bash
# .env.local (for local development)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Production (set in your hosting platform)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://pointer.ir
```

## 🔍 Quick Verification Commands

**Check if variables are set (local):**
```bash
# Windows PowerShell
echo $env:NEXT_PUBLIC_GA4_MEASUREMENT_ID

# Windows CMD
echo %NEXT_PUBLIC_GA4_MEASUREMENT_ID%

# Mac/Linux
echo $NEXT_PUBLIC_GA4_MEASUREMENT_ID
```

**Test in browser console:**
```javascript
// Open browser console (F12) and run:
console.log('GA4 ID:', process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID);
// Should show your Measurement ID
```

## ⚠️ Common Mistakes to Avoid

1. ❌ Missing `NEXT_PUBLIC_` prefix
2. ❌ Wrong variable name (typos)
3. ❌ Forgetting to redeploy after adding variables
4. ❌ Using old Universal Analytics ID (UA-XXXXX) instead of GA4 (G-XXXXX)
5. ❌ Ad blockers preventing tracking (test in incognito)

## 🆘 Still Not Working?

1. **Check the detailed guide**: `docs/GA4-SETUP-GUIDE.md`
2. **Verify in browser**: Open DevTools → Network → Look for "gtag" requests
3. **Check console errors**: F12 → Console tab
4. **Test in incognito**: Rule out browser extensions
5. **Wait 30 seconds**: Real-Time reports have a slight delay

---

**Need help?** See the full guide: `docs/GA4-SETUP-GUIDE.md`

