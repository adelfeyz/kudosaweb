# Environment Variables Setup Guide

## Required Environment Variables for SEO

Based on your business information:
- **Business Name**: Pointer
- **Address**: 3200 Middlefield Rd, Suite A, Palo Alto, CA 94306
- **Phone**: 650-321-2012

## Environment Variable Values

Add these to your `.env.local` file (for local development) and your production environment (Cloudflare Pages):

```env
# Google Search Console Verification
NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION=your-verification-code-here

# Business Information
NEXT_PUBLIC_PHONE_NUMBER=+1-650-321-2012
NEXT_PUBLIC_STREET_ADDRESS=3200 Middlefield Rd, Suite A
NEXT_PUBLIC_POSTAL_CODE=94306

# Geographic Coordinates
NEXT_PUBLIC_LATITUDE=37.4419
NEXT_PUBLIC_LONGITUDE=-122.1430
```

## How to Get Latitude and Longitude

### Method 1: Google Maps (Easiest)

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for: `3200 Middlefield Rd, Suite A, Palo Alto, CA 94306`
3. Right-click on the exact location marker
4. Click on the coordinates that appear at the top of the menu
5. The coordinates will be copied to your clipboard (format: `37.4419, -122.1430`)
   - First number is **latitude** (N/S)
   - Second number is **longitude** (E/W)

### Method 2: Google Maps Coordinates Tool

1. Go to [Google Maps](https://www.google.com/maps)
2. Search for your address
3. Click on the location marker
4. Look at the bottom of the info panel - coordinates are shown there
5. Or use the URL - coordinates appear in the format: `@37.4419,-122.1430`

### Method 3: Online Geocoding Tools

- [LatLong.net](https://www.latlong.net/)
- [GPS Coordinates](https://www.gps-coordinates.net/)
- Just enter your address and get coordinates

### Method 4: Google Geocoding API (Programmatic)

If you need to get coordinates programmatically:
```
https://maps.googleapis.com/maps/api/geocode/json?address=3200+Middlefield+Rd+Suite+A+Palo+Alto+CA+94306&key=YOUR_API_KEY
```

**Note**: The coordinates provided above (37.4419, -122.1430) are approximate. Please verify using one of the methods above to get the exact coordinates for Suite A.

## How to Get Google Search Console Verification Code

### Step-by-Step Instructions:

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Sign in with your Google account

2. **Add Property**
   - Click "Add Property" button
   - Select "URL prefix" option
   - Enter your website URL: `https://pointer.care`
   - Click "Continue"

3. **Choose Verification Method**
   - Select "HTML tag" method
   - You'll see a meta tag like:
     ```html
     <meta name="google-site-verification" content="ABC123XYZ789..." />
     ```
   - Copy the **content value** (the part after `content="` and before `"`)

4. **Add to Environment Variables**
   - The content value is what goes in `NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION`
   - Example: If the tag is `<meta name="google-site-verification" content="ABC123XYZ789" />`
   - Then: `NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION=ABC123XYZ789`

5. **Verify**
   - After adding the environment variable and deploying
   - Go back to Google Search Console
   - Click "Verify" button
   - Google will check for the meta tag on your homepage

### Alternative Verification Methods:

If HTML tag doesn't work, you can also use:
- **HTML file upload**: Download the HTML file and upload it to your site's root
- **DNS record**: Add a TXT record to your domain's DNS
- **Google Analytics**: If you already have GA4 connected
- **Google Tag Manager**: If you're using GTM

## Setting Environment Variables

### For Local Development (.env.local)

1. Create a file named `.env.local` in the root directory
2. Add all the variables:
```env
NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION=your-code-here
NEXT_PUBLIC_PHONE_NUMBER=+1-650-321-2012
NEXT_PUBLIC_STREET_ADDRESS=3200 Middlefield Rd, Suite A
NEXT_PUBLIC_POSTAL_CODE=94306
NEXT_PUBLIC_LATITUDE=37.4419
NEXT_PUBLIC_LONGITUDE=-122.1430
```

### For Cloudflare Pages (Production)

1. Go to your Cloudflare Pages dashboard
2. Select your project: `pointer-website`
3. Go to **Settings** > **Environment Variables**
4. Add each variable:
   - Click "Add variable"
   - Enter the variable name (e.g., `NEXT_PUBLIC_PHONE_NUMBER`)
   - Enter the value (e.g., `+1-650-321-2012`)
   - Make sure it's available for "Production"
   - Click "Save"
5. Repeat for all variables
6. **Redeploy** your site for changes to take effect

## Verification Checklist

After setting up all variables:

- [ ] Google Search Console verification code added
- [ ] Phone number: +1-650-321-2012
- [ ] Street address: 3200 Middlefield Rd, Suite A
- [ ] Postal code: 94306
- [ ] Latitude and longitude verified (get exact coordinates)
- [ ] All variables added to Cloudflare Pages
- [ ] Site redeployed
- [ ] Google Search Console verification successful
- [ ] Test structured data using [Rich Results Test](https://search.google.com/test/rich-results)

## Quick Reference

**Business Info:**
- Name: Pointer
- Address: 3200 Middlefield Rd, Suite A, Palo Alto, CA 94306
- Phone: 650-321-2012
- Website: https://pointer.care

**Coordinates** (verify these are exact):
- Latitude: ~37.4419 (verify with Google Maps)
- Longitude: ~-122.1430 (verify with Google Maps)

