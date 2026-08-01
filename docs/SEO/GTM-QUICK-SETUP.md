# Google Tag Manager Quick Setup Guide

## ✅ GTM Code Already Installed

The Google Tag Manager code has been installed in your website. The implementation matches Google's exact requirements:

- ✅ GTM script in `<head>` section
- ✅ GTM noscript in `<body>` section  
- ✅ DataLayer initialization

## 🔧 Setup Steps

### Step 1: Add GTM ID to Environment Variables

Add this to your `.env.local` file (for local development) and your production environment:

```env
NEXT_PUBLIC_GTM_ID=GTM-PWKLGPNR
```

**Your GTM Container ID**: `GTM-PWKLGPNR`

### Step 2: Restart Your Development Server

After adding the environment variable, restart your Next.js development server:

```bash
npm run dev
# or
yarn dev
```

### Step 3: Verify Installation

1. **Open your website** in a browser
2. **Open Browser DevTools** (F12)
3. **Go to Console tab**
4. **Type**: `window.dataLayer`
5. **You should see**: An array with GTM initialization data

### Step 4: Test with GTM Preview Mode

1. Go to [Google Tag Manager](https://tagmanager.google.com)
2. Select your container (`GTM-PWKLGPNR`)
3. Click **Preview** button
4. Enter your website URL
5. GTM Preview mode will open
6. Navigate your website and verify tags are firing

---

## 📊 Next: Configure Tags in GTM

Now that GTM is installed, you need to configure the tracking tags. See `docs/TAG-IMPLEMENTATION-STATUS.md` for detailed tag configuration instructions.

### Quick Tag Setup Checklist:

1. **GA4 Configuration Tag** - Connect to your GA4 property
2. **CTA Click Event Tag** - Track all CTA clicks
3. **Appointment Modal Open Tag** - Track when modal opens
4. **Appointment Form Submit Tag** - Track form submissions
5. **Appointment Form Success Tag** ⭐ - **PRIMARY CONVERSION**
6. **Appointment Form Error Tag** - Track errors

---

## ✅ Verification Checklist

- [ ] GTM ID added to environment variables
- [ ] Development server restarted
- [ ] `window.dataLayer` exists in browser console
- [ ] GTM Preview mode works
- [ ] Tags configured in GTM dashboard
- [ ] Events firing correctly in GA4 Real-Time

---

## 🐛 Troubleshooting

### GTM not loading?
- Check that `NEXT_PUBLIC_GTM_ID` is set correctly
- Verify the environment variable is loaded (restart server)
- Check browser console for errors

### Tags not firing?
- Use GTM Preview mode to debug
- Check that dataLayer events are being pushed
- Verify tag triggers are configured correctly

### Need help?
- See `docs/TAG-IMPLEMENTATION-STATUS.md` for detailed setup
- See `docs/CTA-REVIEW-AND-TAG-SETUP-PLAN.md` for complete plan

---

**Status**: GTM code installed ✅  
**Next Step**: Add environment variable and configure tags

