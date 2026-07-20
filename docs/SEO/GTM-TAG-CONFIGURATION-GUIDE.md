# Google Tag Manager Tag Configuration Guide
## Step-by-Step Instructions

### Prerequisites
- ✅ GTM Container ID: `GTM-PWKLGPNR`
- ✅ GTM code installed on website
- ✅ Events firing in dataLayer (verified)
- ✅ GA4 Measurement ID: `G-JWGCQDFBMQ` (if you have it)

---

## Step 1: Access Google Tag Manager

1. Go to [https://tagmanager.google.com](https://tagmanager.google.com)
2. Sign in with your Google account
3. Select your container: **GTM-PWKLGPNR**
4. You should see the GTM dashboard

---

## Step 2: Create GA4 Configuration Tag

### 2.1 Create the Tag
1. Click **"Tags"** in left sidebar
2. Click **"+ New"** button
3. Click on **"Tag Configuration"** area
4. Select **"Google Analytics: GA4 Configuration"**

### 2.2 Configure the Tag
1. **Measurement ID**: Enter `G-JWGCQDFBMQ` (your GA4 ID)
2. Click **"Triggering"** section
3. Click **"+ Add"** to add a trigger
4. Select **"All Pages"** trigger
5. Click **"Save"**

### 2.3 Name the Tag
- Tag Name: `GA4 - Configuration`
- Click **"Save"**

---

## Step 3: Create CTA Click Event Tag

### 3.1 Create the Tag
1. Click **"Tags"** → **"+ New"**
2. Click **"Tag Configuration"**
3. Select **"Google Analytics: GA4 Event"**

### 3.2 Configure the Tag
1. **Configuration Tag**: Select `GA4 - Configuration` (from dropdown)
2. **Event Name**: `cta_click`
3. Click **"Event Parameters"** → **"+ Add Row"**
4. Add these parameters:
   - Parameter Name: `cta_name` → Value: `{{cta_name}}`
   - Parameter Name: `cta_location` → Value: `{{cta_location}}`
   - Parameter Name: `cta_type` → Value: `{{cta_type}}`
   - Parameter Name: `page_path` → Value: `{{page_path}}`

### 3.3 Create Data Layer Variables
Before saving, we need to create variables for the parameters:

1. Go to **"Variables"** in left sidebar
2. Under **"User-Defined Variables"**, click **"+ New"**
3. Create these 4 variables (one at a time):

   **Variable 1: cta_name**
   - Variable Name: `cta_name`
   - Variable Type: **"Data Layer Variable"**
   - Data Layer Variable Name: `cta_name`
   - Data Layer Version: **Version 2**
   - Click **"Save"**

   **Variable 2: cta_location**
   - Variable Name: `cta_location`
   - Variable Type: **"Data Layer Variable"**
   - Data Layer Variable Name: `cta_location`
   - Data Layer Version: **Version 2**
   - Click **"Save"**

   **Variable 3: cta_type**
   - Variable Name: `cta_type`
   - Variable Type: **"Data Layer Variable"**
   - Data Layer Variable Name: `cta_type`
   - Data Layer Version: **Version 2**
   - Click **"Save"**

   **Variable 4: page_path**
   - Variable Name: `page_path`
   - Variable Type: **"Data Layer Variable"**
   - Data Layer Variable Name: `page_path`
   - Data Layer Version: **Version 2**
   - Click **"Save"**

### 3.4 Add Trigger
1. Go back to your CTA Click tag
2. Click **"Triggering"** section
3. Click **"+ Add"**
4. Click **"+ New"** to create a new trigger
5. **Trigger Name**: `cta_click - Event`
6. **Trigger Type**: **"Custom Event"**
7. **Event name**: `cta_click`
8. Click **"Save"**
9. Select the trigger you just created

### 3.5 Save the Tag
- Tag Name: `GA4 - CTA Click`
- Click **"Save"**

---

## Step 4: Create Appointment Modal Open Event Tag

### 4.1 Create the Tag
1. Click **"Tags"** → **"+ New"**
2. Click **"Tag Configuration"**
3. Select **"Google Analytics: GA4 Event"**

### 4.2 Configure the Tag
1. **Configuration Tag**: Select `GA4 - Configuration`
2. **Event Name**: `appointment_modal_open`
3. Add Event Parameters:
   - `trigger_location` → Value: `{{trigger_location}}`
   - `page_path` → Value: `{{page_path}}`

### 4.3 Create Variable for trigger_location
1. Go to **"Variables"** → **"+ New"**
2. Variable Name: `trigger_location`
3. Variable Type: **"Data Layer Variable"**
4. Data Layer Variable Name: `trigger_location`
5. Data Layer Version: **Version 2**
6. Click **"Save"**

### 4.4 Add Trigger
1. Back to tag → **"Triggering"** → **"+ Add"**
2. Click **"+ New"**
3. **Trigger Name**: `appointment_modal_open - Event`
4. **Trigger Type**: **"Custom Event"**
5. **Event name**: `appointment_modal_open`
6. Click **"Save"** and select it

### 4.5 Save the Tag
- Tag Name: `GA4 - Appointment Modal Open`
- Click **"Save"**

---

## Step 5: Create Appointment Form Submit Event Tag

### 5.1 Create the Tag
1. Click **"Tags"** → **"+ New"**
2. Click **"Tag Configuration"**
3. Select **"Google Analytics: GA4 Event"**

### 5.2 Configure the Tag
1. **Configuration Tag**: Select `GA4 - Configuration`
2. **Event Name**: `appointment_form_submit`
3. Add Event Parameters:
   - `service_type` → Value: `{{service_type}}`
   - `has_preferred_date` → Value: `{{has_preferred_date}}`
   - `has_preferred_time` → Value: `{{has_preferred_time}}`
   - `page_path` → Value: `{{page_path}}`

### 5.3 Create Variables
Create these 3 variables in **"Variables"**:
- `service_type` (Data Layer Variable)
- `has_preferred_date` (Data Layer Variable)
- `has_preferred_time` (Data Layer Variable)

### 5.4 Add Trigger
1. **Triggering** → **"+ Add"** → **"+ New"**
2. **Trigger Name**: `appointment_form_submit - Event`
3. **Trigger Type**: **"Custom Event"**
4. **Event name**: `appointment_form_submit`
5. Click **"Save"**

### 5.5 Save the Tag
- Tag Name: `GA4 - Appointment Form Submit`
- Click **"Save"**

---

## Step 6: Create Appointment Form Success Event Tag ⭐ PRIMARY CONVERSION

### 6.1 Create the Tag
1. Click **"Tags"** → **"+ New"**
2. Click **"Tag Configuration"**
3. Select **"Google Analytics: GA4 Event"**

### 6.2 Configure the Tag
1. **Configuration Tag**: Select `GA4 - Configuration`
2. **Event Name**: `appointment_form_success`
3. Add Event Parameter:
   - `page_path` → Value: `{{page_path}}`

### 6.3 Add Trigger
1. **Triggering** → **"+ Add"** → **"+ New"**
2. **Trigger Name**: `appointment_form_success - Event`
3. **Trigger Type**: **"Custom Event"**
4. **Event name**: `appointment_form_success`
5. Click **"Save"**

### 6.4 Save the Tag
- Tag Name: `GA4 - Appointment Form Success` ⭐
- Click **"Save"**

**IMPORTANT**: This is your PRIMARY CONVERSION event. You'll mark it as a conversion in GA4 later.

---

## Step 7: Create Appointment Form Error Event Tag

### 7.1 Create the Tag
1. Click **"Tags"** → **"+ New"**
2. Click **"Tag Configuration"**
3. Select **"Google Analytics: GA4 Event"**

### 7.2 Configure the Tag
1. **Configuration Tag**: Select `GA4 - Configuration`
2. **Event Name**: `appointment_form_error`
3. Add Event Parameters:
   - `error_type` → Value: `{{error_type}}`
   - `page_path` → Value: `{{page_path}}`

### 7.3 Create Variable
- Create `error_type` variable (Data Layer Variable)

### 7.4 Add Trigger
1. **Triggering** → **"+ Add"** → **"+ New"**
2. **Trigger Name**: `appointment_form_error - Event`
3. **Trigger Type**: **"Custom Event"**
4. **Event name**: `appointment_form_error`
5. Click **"Save"`

### 7.5 Save the Tag
- Tag Name: `GA4 - Appointment Form Error`
- Click **"Save"**

---

## Step 8: Test Your Tags

### 8.1 Use GTM Preview Mode
1. In GTM dashboard, click **"Preview"** button (top right)
2. Enter your website URL: `https://pointer.ir` (or localhost if testing locally)
3. GTM Preview window opens
4. Click **"Connect"**

### 8.2 Test Events
1. On your website, click **"Schedule Appointment"** button
2. In GTM Preview, you should see:
   - `cta_click` event fired
   - `appointment_modal_open` event fired
   - Tags firing (green checkmarks)

3. Fill out and submit the appointment form
4. Check for:
   - `appointment_form_submit` event
   - `appointment_form_success` event (on success)

### 8.3 Verify Tag Firing
- In GTM Preview, click on each event
- Check that tags are firing (green status)
- Verify parameters are being passed correctly

---

## Step 9: Publish Your Container

### 9.1 Submit for Publishing
1. Click **"Submit"** button (top right of GTM dashboard)
2. **Version Name**: `Initial GTM Setup - CTA Tracking`
3. **Version Description**: 
   ```
   Initial GTM setup with GA4 configuration and CTA tracking events:
   - CTA click tracking
   - Appointment modal tracking
   - Form submission tracking
   - Conversion tracking
   ```
4. Click **"Publish"**

### 9.2 Confirm
- Click **"Publish"** again to confirm
- Your tags are now live!

---

## Step 10: Mark Conversion in GA4

### 10.1 Access Google Analytics
1. Go to [https://analytics.google.com](https://analytics.google.com)
2. Select your GA4 property

### 10.2 Mark Event as Conversion
1. Go to **"Admin"** (gear icon, bottom left)
2. Under **"Property"**, click **"Events"**
3. Find **"appointment_form_success"** in the list
4. Toggle the switch to mark it as a **"Conversion"**
5. It will now appear in your Conversions reports

---

## Step 11: Verify in GA4 Real-Time

### 11.1 Check Real-Time Reports
1. In GA4, go to **"Reports"** → **"Real-time"**
2. Perform actions on your website:
   - Click a CTA button
   - Open appointment modal
   - Submit form
3. Events should appear in Real-time report within seconds

---

## Summary Checklist

- [ ] GA4 Configuration Tag created
- [ ] CTA Click Event Tag created
- [ ] Appointment Modal Open Tag created
- [ ] Appointment Form Submit Tag created
- [ ] Appointment Form Success Tag created (CONVERSION)
- [ ] Appointment Form Error Tag created
- [ ] All Data Layer Variables created
- [ ] All Triggers created
- [ ] Tested in GTM Preview mode
- [ ] Container published
- [ ] Conversion marked in GA4
- [ ] Verified in GA4 Real-Time reports

---

## Quick Reference: All Events

| Event Name | Trigger | Conversion |
|------------|---------|------------|
| `cta_click` | Custom Event | No |
| `appointment_modal_open` | Custom Event | No |
| `appointment_form_submit` | Custom Event | No |
| `appointment_form_success` | Custom Event | **YES** ⭐ |
| `appointment_form_error` | Custom Event | No |

---

## Troubleshooting

### Tags not firing?
- Check GTM Preview mode for errors
- Verify dataLayer events are being pushed (browser console)
- Check trigger event names match exactly

### Events not showing in GA4?
- Wait 24-48 hours for standard reports
- Check Real-Time reports immediately
- Verify GA4 Measurement ID is correct

### Need help?
- Use GTM Preview mode for debugging
- Check browser console for dataLayer
- Verify all variables are created correctly

---

**Last Updated**: Tag Configuration Guide
**Status**: Ready for implementation

