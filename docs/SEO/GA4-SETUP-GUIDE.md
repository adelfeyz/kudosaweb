# Google Analytics 4 (GA4) Setup Guide

This guide will walk you through setting up Google Analytics 4 for your Pointer website.

## Prerequisites

- A Google account
- Access to your website's deployment environment (for setting environment variables)

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **"Start measuring"** or **"Create Account"**
3. If you already have a Google Analytics account, click **"Admin"** (gear icon) in the bottom left

## Step 2: Create a GA4 Property

### If you're creating a new account:
1. Enter an **Account name** (e.g., "Pointer")
2. Configure account data sharing settings (optional)
3. Click **"Next"**
4. Enter a **Property name** (e.g., "Pointer Website")
5. Select your **Reporting time zone** and **Currency**
6. Click **"Next"**
7. Fill in business information (optional)
8. Click **"Create"**
9. Accept the Terms of Service

### If you already have an account:
1. In the Admin section, select your account from the dropdown
2. Click **"Create Property"** in the Property column
3. Follow steps 4-9 above

## Step 3: Get Your Measurement ID

1. After creating the property, you'll see a **Data Streams** setup screen
2. Click **"Add stream"** → **"Web"**
3. Enter your website details:
   - **Website URL**: e.g., `https://pointer.ir`
   - **Stream name**: e.g., "Pointer Website"
4. Click **"Create stream"**
5. You'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
   - **Copy this ID** - you'll need it in the next step

## Step 4: Set Up Environment Variables

### For Local Development (.env.local)

1. In your project root, create or edit `.env.local`:
   ```bash
   NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID

### For Production Deployment

The method depends on your hosting platform:

#### Vercel:
1. Go to your project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Name**: `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX`
   - **Environment**: Production, Preview, Development
4. Add:
   - **Name**: `NEXT_PUBLIC_SITE_URL`
   - **Value**: `https://pointer.ir` (your actual domain)
   - **Environment**: Production, Preview, Development
5. Click **"Save"**
6. **Redeploy** your application for changes to take effect

#### Cloudflare Pages:
See the detailed guide: **[Setting Environment Variables in Cloudflare Pages](./CLOUDFLARE-ENV-VARIABLES.md)**

Quick steps:
1. Go to your Cloudflare dashboard
2. Navigate to **Pages** → Your project → **Settings** → **Environment Variables**
3. Add the same variables as above
4. **Redeploy** your application

#### Other Platforms:
- Add the environment variables in your platform's settings
- Ensure they're prefixed with `NEXT_PUBLIC_` for Next.js to expose them to the browser
- Redeploy after adding variables

## Step 5: Verify GA4 is Working

### Method 1: Real-Time Reports (Recommended)

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Navigate to **Reports** → **Realtime** (in the left sidebar)
4. Visit your website in a new browser tab
5. You should see your visit appear in the Real-Time report within 10-30 seconds
6. Look for:
   - Active users count
   - Your location/city
   - Page views

### Method 2: Browser Developer Tools

1. Open your website in a browser
2. Open **Developer Tools** (F12 or Right-click → Inspect)
3. Go to the **Network** tab
4. Filter by `gtag` or `collect`
5. Refresh the page
6. You should see requests to:
   - `www.googletagmanager.com/gtag/js`
   - `www.google-analytics.com/g/collect`

### Method 3: Google Tag Assistant

1. Install the [Google Tag Assistant Chrome Extension](https://chrome.google.com/webstore/detail/tag-assistant-legacy-by-g/kejbdjndbnbjgmefkgdddjlbokphdefk)
2. Visit your website
3. Click the extension icon
4. It should show your GA4 tag is firing

## Step 6: Test Event Tracking

The website is already configured to track these events:

### Blog Post Views
- **Event Name**: `blog_post_view`
- **Parameters**: `post_slug`, `post_title`, `post_category`
- **How to test**: Visit any blog post page

### Appointment Requests
- **Event Name**: `appointment_request`
- **Parameters**: `service_type` (optional)
- **How to test**: Submit the appointment form at `/appointment`

### Newsletter Signups
- **Event Name**: `newsletter_signup`
- **How to test**: Subscribe to the newsletter from any page

### Contact Form Submissions
- **Event Name**: `contact_form_submit`
- **How to test**: Submit the contact form at `/contact`

### View Events in GA4

1. Go to **Reports** → **Realtime**
2. Scroll down to **Event count by Event name**
3. Perform the actions above
4. Events should appear within 10-30 seconds

## Step 7: Set Up Custom Reports (Optional)

### Create an Engagement Report

1. Go to **Explore** → **Blank**
2. Add dimensions:
   - Event name
   - Page title
   - Page path
3. Add metrics:
   - Event count
   - Active users
4. Save the report

### Set Up Conversions

1. Go to **Admin** → **Events**
2. Mark important events as conversions:
   - `appointment_request` → Conversion
   - `newsletter_signup` → Conversion
   - `contact_form_submit` → Conversion

## Troubleshooting

### GA4 Not Tracking

**Check:**
1. ✅ Environment variable is set correctly
2. ✅ Variable name is exactly `NEXT_PUBLIC_GA4_MEASUREMENT_ID`
3. ✅ Measurement ID format is correct (`G-XXXXXXXXXX`)
4. ✅ Application has been redeployed after adding variables
5. ✅ No ad blockers are interfering (try incognito mode)
6. ✅ Check browser console for JavaScript errors

### Events Not Showing

**Check:**
1. ✅ Events are being triggered (check browser console)
2. ✅ Wait 10-30 seconds for events to appear in Real-Time
3. ✅ Check **Reports** → **Events** for historical data
4. ✅ Verify event names match exactly (case-sensitive)

### Common Issues

**Issue**: "gtag is not defined"
- **Solution**: Ensure GA4 script loads before event tracking code

**Issue**: Events show in Real-Time but not in standard reports
- **Solution**: Standard reports have a 24-48 hour delay. Real-Time shows immediate data.

**Issue**: No data in GA4
- **Solution**: 
  - Verify Measurement ID is correct
  - Check that environment variables are set
  - Ensure you're not blocking analytics (ad blockers, privacy tools)
  - Wait a few minutes for data to process

## Next Steps

1. **Set up Goals/Conversions**: Mark important events as conversions
2. **Create Custom Audiences**: Based on user behavior
3. **Set up Data Retention**: Configure how long data is stored
4. **Enable Enhanced Measurement**: Track scrolls, outbound clicks, etc.
5. **Link to Google Search Console**: For better SEO insights
6. **Set up Custom Dimensions**: Track additional data points

## Additional Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Tracking Guide](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries#google-analytics)

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review browser console for errors
3. Verify environment variables are set correctly
4. Test in incognito mode to rule out extensions

---

**Last Updated**: After GA4 implementation
**Version**: 1.0

