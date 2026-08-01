# Environment Variables - Values and Setup Guide

## Your Environment Variable Values

Based on your business information, here are the values:

```env
# Business Information
NEXT_PUBLIC_PHONE_NUMBER=+1-650-321-2012
NEXT_PUBLIC_STREET_ADDRESS=3200 Middlefield Rd, Suite A
NEXT_PUBLIC_POSTAL_CODE=94306

# Geographic Coordinates (see instructions below to get exact values)
NEXT_PUBLIC_LATITUDE=37.4419
NEXT_PUBLIC_LONGITUDE=-122.1430

# Google Search Console (see instructions below to get this)
NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION=your-verification-code-here
```

## How to Get Latitude and Longitude

### Method 1: Google Maps (Easiest)

1. Go to https://www.google.com/maps
2. Search for: `3200 Middlefield Rd, Suite A, Palo Alto, CA 94306`
3. Right-click on the exact location marker
4. Click on the coordinates that appear (they'll be in format: `37.4419, -122.1430`)
5. Copy the numbers:
   - First number = **Latitude** (NEXT_PUBLIC_LATITUDE)
   - Second number = **Longitude** (NEXT_PUBLIC_LONGITUDE)

### Method 2: Direct URL Method

1. Go to Google Maps and search your address
2. Click on the location marker
3. Look at the URL - it will contain coordinates like: `@37.4419,-122.1430`
4. Extract the numbers

**Note**: The values above (37.4419, -122.1430) are approximate. Please verify using Google Maps to get the exact coordinates for Suite A.

## How to Get Google Search Console Verification Code

### Step-by-Step:

1. **Go to Google Search Console**
   - Visit: https://search.google.com/search-console
   - Sign in with your Google account

2. **Add Your Property**
   - Click "Add Property" button
   - Select "URL prefix" option
   - Enter: `https://pointer.ir`
   - Click "Continue"

3. **Choose HTML Tag Method**
   - Select "HTML tag" verification method
   - You'll see a meta tag like this:
     ```html
     <meta name="google-site-verification" content="ABC123XYZ789..." />
     ```
   - Copy ONLY the content value (the part between the quotes after `content="`)

4. **Add to Environment Variable**
   - The content value goes in: `NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION`
   - Example: If the tag shows `content="a1b2c3d4e5f6"`, then:
     ```env
     NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE_VERIFICATION=a1b2c3d4e5f6
     ```

5. **Verify**
   - After adding the variable and deploying your site
   - Go back to Google Search Console
   - Click "Verify" button
   - Google will check for the meta tag on your homepage

## Setting Up in Cloudflare Pages

1. Go to Cloudflare Dashboard > Pages > Your Project
2. Settings > Environment Variables
3. Add each variable:
   - Variable name: `NEXT_PUBLIC_PHONE_NUMBER`
   - Value: `+1-650-321-2012`
   - Environment: Production (and Preview if needed)
   - Click "Save"
4. Repeat for all 6 variables
5. **Redeploy** your site for changes to take effect

## Quick Checklist

- [ ] Get exact coordinates from Google Maps
- [ ] Get Google Search Console verification code
- [ ] Add all 6 environment variables to Cloudflare Pages
- [ ] Redeploy site
- [ ] Verify in Google Search Console
- [ ] Test structured data at: https://search.google.com/test/rich-results

