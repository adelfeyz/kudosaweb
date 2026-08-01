# GA4 Custom Reports Setup Guide
## Step-by-Step Instructions for Creating Analytics Reports

### Prerequisites
- ✅ GA4 Property: `G-JWGCQDFBMQ`
- ✅ GTM Tags configured and firing
- ✅ Events tracking in GA4 (verified in Real-Time)
- ✅ Access to GA4 Admin panel

---

## Understanding Events vs Custom Dimensions

### ⚠️ Important: Events vs Custom Dimensions

**Events** (like `cta_click`, `appointment_form_submit`, `appointment_form_success`) are **NOT created in Step 0**. 

- **Events are configured in Google Tag Manager (GTM)**, not in GA4
- Events are the actions that happen on your website (button clicks, form submissions, etc.)
- If you can't find these events, they need to be set up in GTM first
- See: [GTM Tag Configuration Guide](./GTM-TAG-CONFIGURATION-GUIDE.md) for event setup

**Custom Dimensions** (created in Step 0) are for **event parameters**:
- Event parameters are additional data sent WITH events (like `cta_name`, `cta_location`, etc.)
- These need to be registered as custom dimensions in GA4 to appear in reports
- Example: The `cta_click` event sends parameters like `cta_name`, `cta_location`, `cta_type`

**Standard Dimensions** (like `page_path`) are automatically available:
- `page_path` is a **standard GA4 dimension** - you don't need to create it
- It will appear automatically in reports as **"Page path and screen class"**
- No setup required!

### Event Names Reference

These events should be configured in GTM:
- `cta_click` - When a CTA button is clicked
- `appointment_modal_open` - When appointment modal opens
- `appointment_form_submit` - When form is submitted
- `appointment_form_success` - When form submission succeeds ⭐ (conversion event)
- `appointment_form_error` - When form submission fails

If you don't see these events in GA4:
1. Check GTM to ensure tags are configured and published
2. Verify events are firing in GA4 Real-Time reports
3. See [GTM Tag Configuration Guide](./GTM-TAG-CONFIGURATION-GUIDE.md) for setup instructions

---

## Step 0: Create Custom Dimensions (REQUIRED FIRST)

**IMPORTANT**: Before creating reports, you must register event parameters as custom dimensions. They won't appear in reports until registered.

**Note**: This step creates dimensions for event PARAMETERS, not the events themselves. Events must already be configured in GTM.

### How to Create Custom Dimensions

1. Go to **Admin** (gear icon, bottom left)
2. Under **"Property"**, click **"Custom definitions"**
3. Click **"Custom dimensions"** tab
4. Click **"+ Create custom dimension"**

### Custom Dimension Definitions

Create these 8 custom dimensions (one at a time):

#### 1. cta_name
- **Dimension name**: `CTA Name`
- **Scope**: **Event**
- **Event parameter**: `cta_name`
- **Description**: Name of the CTA button that was clicked
- Click **"Save"**

#### 2. cta_location
- **Dimension name**: `CTA Location`
- **Scope**: **Event**
- **Event parameter**: `cta_location`
- **Description**: Location of the CTA on the page (header, footer, hero, etc.)
- Click **"Save"**

#### 3. cta_type
- **Dimension name**: `CTA Type`
- **Scope**: **Event**
- **Event parameter**: `cta_type`
- **Description**: Type of CTA (button, link, phone, etc.)
- Click **"Save"**

#### 4. trigger_location
- **Dimension name**: `Trigger Location`
- **Scope**: **Event**
- **Event parameter**: `trigger_location`
- **Description**: Location where appointment modal was triggered
- Click **"Save"**

#### 5. service_type
- **Dimension name**: `Service Type`
- **Scope**: **Event**
- **Event parameter**: `service_type`
- **Description**: Type of dental service selected in appointment form
- Click **"Save"**

#### 6. has_preferred_date
- **Dimension name**: `Has Preferred Date`
- **Scope**: **Event**
- **Event parameter**: `has_preferred_date`
- **Description**: Whether user provided a preferred appointment date
- Click **"Save"**

#### 7. has_preferred_time
- **Dimension name**: `Has Preferred Time`
- **Scope**: **Event**
- **Event parameter**: `has_preferred_time`
- **Description**: Whether user provided a preferred appointment time
- Click **"Save"**

#### 8. error_type
- **Dimension name**: `Error Type`
- **Scope**: **Event**
- **Event parameter**: `error_type`
- **Description**: Type of error that occurred during form submission
- Click **"Save"**

### Note on Standard Dimensions

**`page_path`** is a **standard GA4 dimension** - you don't need to create a custom dimension for it:
- It will appear automatically in the dimensions list as **"Page path and screen class"**
- Available immediately - no setup required
- Can be used in any report without configuration

**Other standard dimensions** you can use:
- `Page title`
- `Event name`
- `Date`
- `Hour`
- `Country`
- `Device category`
- And many more - all available automatically!

### After Creating Dimensions
- ⏱️ **Wait 24-48 hours** for data to populate
- Then the dimensions will appear in the **"Dimensions"** dropdown when creating reports
- They will be listed as: `CTA Name`, `CTA Location`, `CTA Type`, etc.

### Troubleshooting: Can't Find Events or Dimensions?

**If you can't find events** (`cta_click`, `appointment_form_submit`, etc.):
- ✅ Events are configured in **GTM**, not GA4
- ✅ Check GTM container is published
- ✅ Verify events appear in GA4 Real-Time reports
- ✅ See [GTM Tag Configuration Guide](./GTM-TAG-CONFIGURATION-GUIDE.md)

**If you can't find `page_path`**:
- ✅ `page_path` is a **standard dimension** - it's automatically available
- ✅ Look for **"Page path and screen class"** in the dimensions list
- ✅ No custom dimension needed!

**If you can't find custom dimensions** (like `CTA Name`, `CTA Location`):
- ✅ Make sure you created them in Step 0
- ✅ Wait 24-48 hours after creating them
- ✅ Check they're set to **Scope: Event** (not User or Session)

---

## Report 1: CTA Performance Report

### Purpose
Track all CTA button clicks, their locations, types, and performance metrics.

### Prerequisites
- ✅ `cta_click` event must be configured in GTM
- ✅ Custom dimensions created in Step 0 (cta_name, cta_location, cta_type)
- ✅ Events appearing in GA4 Real-Time reports

### Setup Steps

1. **Navigate to Explore**
   - Go to [analytics.google.com](https://analytics.google.com)
   - Select your GA4 property
   - Click **"Explore"** in left sidebar
   - Click **"+ Blank"** to create new report

2. **Configure Report**
   - **Report Name**: `CTA Performance Report`
   - **Report Type**: **Free Form**

3. **Add Dimensions**
   - Click **"Dimensions"** → **"+ Add dimension"**
   - Add these dimensions:
     - `Event name` (standard dimension - automatically available)
     - `Event parameter: cta_name` (custom dimension from Step 0)
     - `Event parameter: cta_location` (custom dimension from Step 0)
     - `Event parameter: cta_type` (custom dimension from Step 0)
     - `Page path and screen class` (standard dimension - automatically available)
     - `Page title` (standard dimension - automatically available)

4. **Add Metrics**
   - Click **"Metrics"** → **"+ Add metric"**
   - Add these metrics:
     - `Event count`
     - `Total users`
     - `Active users`
     - `Event count per user`

5. **Configure Visualization**
   - **Visualization Type**: **Table**
   - **Rows**: Drag `Event parameter: cta_name` to Rows
   - **Values**: Drag `Event count` to Values
   - **Filters**: 
     - Add filter: `Event name` = `cta_click`

6. **Add Breakdown**
   - Drag `Event parameter: cta_location` to Breakdown dimension
   - Drag `Event parameter: cta_type` to Breakdown dimension

7. **Save Report**
   - Click **"Save"** (top right)
   - Name: `CTA Performance Report`
   - Click **"Save"**

---

## Report 2: Appointment Funnel Report

### Purpose
Visualize the complete appointment booking funnel from CTA click to conversion.

### Prerequisites
- ✅ Events configured in GTM: `cta_click`, `appointment_modal_open`, `appointment_form_submit`, `appointment_form_success`
- ✅ Events appearing in GA4 Real-Time reports

### Setup Steps

1. **Create Funnel Exploration**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `Appointment Funnel Report`
   - **Report Type**: **Funnel exploration**

2. **Configure Funnel Steps**
   - **Step 1**: 
     - Name: `CTA Click`
     - Event: `cta_click`
   - **Step 2**:
     - Name: `Modal Open`
     - Event: `appointment_modal_open`
   - **Step 3**:
     - Name: `Form Submit`
     - Event: `appointment_form_submit`
   - **Step 4**:
     - Name: `Form Success` ⭐
     - Event: `appointment_form_success`

3. **Add Breakdown Dimensions**
   - Click **"Breakdown"** → **"+ Add dimension"**
   - Add: `Event parameter: page_path`
   - Add: `Event parameter: trigger_location`

4. **Configure Time Period**
   - Set date range (default: Last 30 days)
   - Enable **"Comparison"** if needed

5. **Save Report**
   - Click **"Save"**
   - Name: `Appointment Funnel Report`

---

## Report 3: Conversion Tracking Report

### Purpose
Monitor all conversion events and their performance metrics.

### Setup Steps

1. **Create Free Form Report**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `Conversion Tracking Report`
   - **Report Type**: **Free Form**

2. **Add Dimensions**
   - `Event name`
   - `Event parameter: page_path`
   - `Date`

3. **Add Metrics**
   - `Conversions`
   - `Total users`
   - `Event count`
   - `Conversion rate`

4. **Configure Filters**
   - Add filter: `Event name` contains `appointment_form_success`
   - Or: Show all events marked as conversions

5. **Add Breakdown**
   - Breakdown by: `Event parameter: page_path`
   - Breakdown by: `Date`

6. **Visualization**
   - **Type**: **Line chart** (for trends) or **Table** (for details)
   - X-axis: `Date`
   - Y-axis: `Conversions`

7. **Save Report**
   - Click **"Save"**

---

## Report 4: Error Analysis Report

### Purpose
Track and analyze appointment form errors to identify issues.

### Setup Steps

1. **Create Free Form Report**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `Error Analysis Report`
   - **Report Type**: **Free Form**

2. **Add Dimensions**
   - `Event name`
   - `Event parameter: error_type`
   - `Event parameter: page_path`
   - `Date`

3. **Add Metrics**
   - `Event count`
   - `Total users`
   - `Event count per user`

4. **Configure Filters**
   - Add filter: `Event name` = `appointment_form_error`

5. **Visualization**
   - **Type**: **Bar chart** or **Table**
   - Group by: `Event parameter: error_type`
   - Values: `Event count`

6. **Add Breakdown**
   - Breakdown by: `Event parameter: page_path` (to see which pages have errors)

7. **Save Report**
   - Click **"Save"**

---

## Report 5: CTA Location Performance Report

### Purpose
Compare CTA performance across different page locations.

### Setup Steps

1. **Create Free Form Report**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `CTA Location Performance Report`
   - **Report Type**: **Free Form**

2. **Add Dimensions**
   - `Event parameter: cta_location`
   - `Event parameter: cta_name`
   - `Page path and screen class`

3. **Add Metrics**
   - `Event count`
   - `Total users`
   - `Event count per user`
   - `Conversion rate` (if applicable)

4. **Configure Filters**
   - Add filter: `Event name` = `cta_click`

5. **Visualization**
   - **Type**: **Table**
   - Rows: `Event parameter: cta_location`
   - Values: `Event count`, `Total users`, `Event count per user`

6. **Add Comparison**
   - Compare different time periods
   - Compare different CTA locations

7. **Save Report**
   - Click **"Save"**

---

## Report 6: Service Type Analysis Report

### Purpose
Analyze which service types generate the most appointment requests.

### Setup Steps

1. **Create Free Form Report**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `Service Type Analysis Report`
   - **Report Type**: **Free Form**

2. **Add Dimensions**
   - `Event parameter: service_type`
   - `Event parameter: page_path`
   - `Date`

3. **Add Metrics**
   - `Event count`
   - `Total users`
   - `Conversions` (for successful appointments)

4. **Configure Filters**
   - Add filter: `Event name` = `appointment_form_submit`
   - Or: Include both `appointment_form_submit` and `appointment_form_success`

5. **Visualization**
   - **Type**: **Pie chart** or **Bar chart**
   - Group by: `Event parameter: service_type`
   - Values: `Event count`

6. **Add Breakdown**
   - Breakdown by: `Date` (to see trends over time)

7. **Save Report**
   - Click **"Save"**

---

## Report 7: Appointment Success Rate Report

### Purpose
Calculate conversion rates and success metrics for appointment bookings.

### Setup Steps

1. **Create Free Form Report**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `Appointment Success Rate Report`
   - **Report Type**: **Free Form**

2. **Add Dimensions**
   - `Date`
   - `Event parameter: page_path`
   - `Event parameter: service_type`

3. **Add Metrics**
   - Create calculated metric: `Success Rate`
     - Formula: `appointment_form_success / appointment_form_submit * 100`
   - Or use:
     - `Event count` (for submits)
     - `Conversions` (for successes)
     - `Total users`

4. **Configure Filters**
   - Include events: `appointment_form_submit`, `appointment_form_success`

5. **Visualization**
   - **Type**: **Line chart** (for trends) or **Table** (for details)
   - X-axis: `Date`
   - Y-axis: Success rate percentage

6. **Add Comparison**
   - Compare success rates by `Event parameter: service_type`
   - Compare success rates by `Event parameter: page_path`

7. **Save Report**
   - Click **"Save"**

---

## Report 8: Page Path Performance Report

### Purpose
Identify which pages drive the most engagement and conversions.

### Setup Steps

1. **Create Free Form Report**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `Page Path Performance Report`
   - **Report Type**: **Free Form**

2. **Add Dimensions**
   - `Page path and screen class`
   - `Event name`
   - `Date`

3. **Add Metrics**
   - `Event count`
   - `Total users`
   - `Conversions`
   - `Event count per user`

4. **Configure Filters**
   - Include all relevant events:
     - `cta_click`
     - `appointment_modal_open`
     - `appointment_form_submit`
     - `appointment_form_success`

5. **Visualization**
   - **Type**: **Table**
   - Rows: `Page path and screen class`
   - Values: `Event count`, `Total users`, `Conversions`

6. **Add Breakdown**
   - Breakdown by: `Event name` (to see which events happen on each page)

7. **Save Report**
   - Click **"Save"**

---

## Report 9: CTA Type Comparison Report

### Purpose
Compare performance of different CTA types (button, link, phone, etc.).

### Setup Steps

1. **Create Free Form Report**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `CTA Type Comparison Report`
   - **Report Type**: **Free Form**

2. **Add Dimensions**
   - `Event parameter: cta_type`
   - `Event parameter: cta_name`
   - `Event parameter: cta_location`
   - `Date`

3. **Add Metrics**
   - `Event count`
   - `Total users`
   - `Event count per user`
   - `Conversions` (if tracking conversions from CTAs)

4. **Configure Filters**
   - Add filter: `Event name` = `cta_click`

5. **Visualization**
   - **Type**: **Bar chart** (for comparison)
   - X-axis: `Event parameter: cta_type`
   - Y-axis: `Event count`

6. **Add Comparison**
   - Compare different time periods
   - Compare different CTA types side-by-side

7. **Save Report**
   - Click **"Save"**

---

## Report 10: Appointment Form Completion Rate Report

### Purpose
Track form completion rates and identify drop-off points.

### Setup Steps

1. **Create Funnel Exploration**
   - Go to **"Explore"** → **"+ Blank"**
   - **Report Name**: `Appointment Form Completion Rate Report`
   - **Report Type**: **Funnel exploration**

2. **Configure Funnel Steps**
   - **Step 1**: 
     - Name: `Modal Open`
     - Event: `appointment_modal_open`
   - **Step 2**:
     - Name: `Form Submit`
     - Event: `appointment_form_submit`
   - **Step 3**:
     - Name: `Form Success`
     - Event: `appointment_form_success`

3. **Add Breakdown Dimensions**
   - `Event parameter: page_path`
   - `Event parameter: service_type`
   - `Event parameter: trigger_location`

4. **Configure Metrics**
   - Show: **Conversion rate** between steps
   - Show: **Drop-off rate** at each step
   - Show: **Total users** at each step

5. **Add Filters**
   - Filter by date range
   - Filter by specific pages if needed

6. **Visualization**
   - **Type**: **Funnel chart** (default)
   - Shows conversion percentages between steps

7. **Save Report**
   - Click **"Save"**

---

## Quick Access: Creating a Custom Dashboard

### Option: Combine Multiple Reports in One View

1. **Create Collection**
   - Go to **"Library"** (left sidebar)
   - Click **"Collections"** → **"+ Create collection"**
   - Name: `Appointment Tracking Dashboard`

2. **Add Reports**
   - Click **"+ Add reports"**
   - Select all 10 reports you created
   - Click **"Add"**

3. **Organize Reports**
   - Drag reports to organize them
   - Group related reports together

4. **Save Collection**
   - Click **"Save"**

---

## Quick Reference: All Reports Summary

| Report Name | Type | Key Metrics | Primary Use |
|------------|------|-------------|-------------|
| CTA Performance Report | Free Form | Event count, Users | Track all CTA clicks |
| Appointment Funnel Report | Funnel | Conversion rates | Visualize booking funnel |
| Conversion Tracking Report | Free Form | Conversions, Conversion rate | Monitor conversions |
| Error Analysis Report | Free Form | Error count, Error types | Identify form issues |
| CTA Location Performance | Free Form | Event count by location | Compare CTA locations |
| Service Type Analysis | Free Form | Events by service type | Analyze service demand |
| Appointment Success Rate | Free Form | Success rate % | Track booking success |
| Page Path Performance | Free Form | Events by page | Identify top pages |
| CTA Type Comparison | Free Form | Events by CTA type | Compare CTA types |
| Form Completion Rate | Funnel | Completion % | Track form drop-offs |

---

## Tips for Using Reports

### 1. Schedule Email Reports
- Click **"Share"** on any report
- Select **"Email"**
- Set frequency (daily, weekly, monthly)
- Add recipients

### 2. Export Data
- Click **"Export"** (top right)
- Choose format: PDF, Google Sheets, CSV
- Export current view or full data

### 3. Add Comparisons
- Click **"Comparisons"** in any report
- Compare time periods
- Compare segments
- Compare dimensions

### 4. Create Alerts
- Go to **"Admin"** → **"Custom definitions"** → **"Custom alerts"**
- Set up alerts for:
  - Conversion rate drops
  - Error rate increases
  - Significant changes in CTA clicks

---

## Troubleshooting

### Reports Show No Data
- **Check**: Events are firing in Real-Time reports
- **Check**: Date range is correct
- **Check**: Filters are not too restrictive
- **Wait**: Standard reports have 24-48 hour delay

### Metrics Not Calculating Correctly
- **Check**: Event parameters are being sent correctly
- **Check**: Custom dimensions are configured
- **Check**: Conversion events are marked as conversions

### Funnel Steps Not Showing
- **Check**: All events exist in your data
- **Check**: Event names match exactly (case-sensitive)
- **Check**: Date range includes events

---

## Next Steps

1. ✅ Create all 10 reports
2. ✅ Test reports with real data
3. ✅ Set up email scheduling for key reports
4. ✅ Create custom dashboard collection
5. ✅ Set up alerts for important metrics
6. ✅ Share reports with team members

---

**Last Updated**: GA4 Reports Setup Guide
**Status**: Ready for implementation
**Related Docs**: 
- [GTM Tag Configuration Guide](./GTM-TAG-CONFIGURATION-GUIDE.md)
- [GA4 Setup Guide](./GA4-SETUP-GUIDE.md)

