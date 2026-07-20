# GA4 Reports Quick Reference

## 📊 All 10 Reports at a Glance

### 1. CTA Performance Report
- **Type**: Free Form (Table)
- **Key Dimensions**: cta_name, cta_location, cta_type, page_path
- **Key Metrics**: Event count, Total users, Event count per user
- **Filter**: Event name = `cta_click`
- **Use Case**: Track all CTA button performance

### 2. Appointment Funnel Report
- **Type**: Funnel Exploration
- **Steps**: CTA Click → Modal Open → Form Submit → Form Success
- **Breakdown**: page_path, trigger_location
- **Use Case**: Visualize complete booking funnel

### 3. Conversion Tracking Report
- **Type**: Free Form (Line Chart/Table)
- **Key Dimensions**: Event name, page_path, Date
- **Key Metrics**: Conversions, Conversion rate
- **Filter**: Event name = `appointment_form_success`
- **Use Case**: Monitor conversion events

### 4. Error Analysis Report
- **Type**: Free Form (Bar Chart/Table)
- **Key Dimensions**: error_type, page_path, Date
- **Key Metrics**: Event count, Total users
- **Filter**: Event name = `appointment_form_error`
- **Use Case**: Identify and fix form errors

### 5. CTA Location Performance Report
- **Type**: Free Form (Table)
- **Key Dimensions**: cta_location, cta_name, page_path
- **Key Metrics**: Event count, Total users, Event count per user
- **Filter**: Event name = `cta_click`
- **Use Case**: Compare CTA performance by location

### 6. Service Type Analysis Report
- **Type**: Free Form (Pie/Bar Chart)
- **Key Dimensions**: service_type, page_path, Date
- **Key Metrics**: Event count, Total users, Conversions
- **Filter**: Event name = `appointment_form_submit`
- **Use Case**: Analyze service demand

### 7. Appointment Success Rate Report
- **Type**: Free Form (Line Chart/Table)
- **Key Dimensions**: Date, page_path, service_type
- **Key Metrics**: Success rate %, Event count, Conversions
- **Filter**: Include submit + success events
- **Use Case**: Track booking success rates

### 8. Page Path Performance Report
- **Type**: Free Form (Table)
- **Key Dimensions**: Page path, Event name, Date
- **Key Metrics**: Event count, Total users, Conversions
- **Filter**: All appointment-related events
- **Use Case**: Identify top-performing pages

### 9. CTA Type Comparison Report
- **Type**: Free Form (Bar Chart)
- **Key Dimensions**: cta_type, cta_name, cta_location, Date
- **Key Metrics**: Event count, Total users, Conversions
- **Filter**: Event name = `cta_click`
- **Use Case**: Compare different CTA types

### 10. Appointment Form Completion Rate Report
- **Type**: Funnel Exploration
- **Steps**: Modal Open → Form Submit → Form Success
- **Breakdown**: page_path, service_type, trigger_location
- **Use Case**: Track form completion and drop-offs

---

## 🎯 Event Names Reference

| Event Name | Description | Conversion? |
|------------|-------------|-------------|
| `cta_click` | CTA button clicked | No |
| `appointment_modal_open` | Appointment modal opened | No |
| `appointment_form_submit` | Form submitted | No |
| `appointment_form_success` | Form submission successful | **YES** ⭐ |
| `appointment_form_error` | Form submission error | No |

---

## 📈 Event Parameters Reference

| Parameter | Events | Description |
|-----------|--------|-------------|
| `cta_name` | cta_click | Name of the CTA button |
| `cta_location` | cta_click | Location of CTA on page |
| `cta_type` | cta_click | Type of CTA (button, link, etc.) |
| `trigger_location` | appointment_modal_open | Where modal was triggered |
| `service_type` | appointment_form_submit | Service selected |
| `has_preferred_date` | appointment_form_submit | Has preferred date |
| `has_preferred_time` | appointment_form_submit | Has preferred time |
| `error_type` | appointment_form_error | Type of error |
| `page_path` | All events | Page where event occurred |

---

## 🚀 Quick Setup Checklist

- [ ] Access GA4 Explore section
- [ ] Create all 10 reports (follow detailed guide)
- [ ] Verify reports show data
- [ ] Set up email scheduling for key reports
- [ ] Create custom dashboard collection
- [ ] Set up alerts for important metrics
- [ ] Share reports with team

---

## 📧 Recommended Email Schedule

| Report | Frequency | Reason |
|--------|-----------|--------|
| Conversion Tracking Report | Daily | Monitor daily conversions |
| Error Analysis Report | Daily | Catch errors quickly |
| Appointment Funnel Report | Weekly | Track funnel performance |
| CTA Performance Report | Weekly | Optimize CTAs |
| Service Type Analysis | Monthly | Plan service offerings |
| All Reports | Monthly | Comprehensive overview |

---

## 🔗 Related Documentation

- [GA4 Reports Setup Guide](./GA4-REPORTS-SETUP-GUIDE.md) - Detailed setup instructions
- [GTM Tag Configuration Guide](./GTM-TAG-CONFIGURATION-GUIDE.md) - Tag setup
- [GA4 Setup Guide](./GA4-SETUP-GUIDE.md) - Initial GA4 configuration

---

**Last Updated**: Quick Reference Guide
**Version**: 1.0

