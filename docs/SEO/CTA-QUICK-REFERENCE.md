# CTA Quick Reference Guide

## All CTAs Found on pointer.ir

### Critical Conversion CTAs (Track These First)
1. **Appointment Form Submit** - `AppointmentModal.tsx` - Form submission button
2. **Appointment Form Success** - `AppointmentModal.tsx` - Success event (PRIMARY CONVERSION)

### High Priority CTAs
3. **Schedule Appointment** - Hero Section - Opens appointment modal
4. **Schedule Appointment** - Connect Section - Opens appointment modal  
5. **Schedule Appointment** - All Service Pages - Opens appointment modal
6. **Schedule Consultation** - All-on-4 CTA Section - Opens appointment modal
7. **Menlo Park Smiles** - Connect Section - Links to `/contact`
8. **Pointer - Palo Alto** - Connect Section - Links to `/contact`

### Medium Priority CTAs
9. **Service Links** - Services Grid - Links to service pages
10. **Schedule Appointment** - Smile Gallery - Opens appointment modal
11. **Schedule Appointment** - Reviews Page - Opens appointment modal

### Low Priority CTAs (Supporting)
12. **Phone Number** - Footer - `tel:+1(650)324-9272`
13. **Address/Map** - Footer - Google Maps link
14. **Social Media Links** - Footer - Facebook, Instagram
15. **Privacy Policy** - Footer - `/privacy-policy`

---

## Quick Implementation Checklist

### Phase 1: Setup (Week 1)
- [ ] Create Google Tag Manager account
- [ ] Get GTM container ID
- [ ] Add GTM snippet to `src/app/layout.tsx`
- [ ] Create `src/lib/gtm.ts` helper file
- [ ] Add GTM ID to environment variables

### Phase 2: Core Tracking (Week 2)
- [ ] Add tracking to `AppointmentModal.tsx`
- [ ] Add tracking to all "Schedule Appointment" buttons
- [ ] Add tracking to all contact links
- [ ] Add tracking to service navigation links

### Phase 3: GTM Configuration (Week 3)
- [ ] Set up GA4 Configuration tag
- [ ] Create CTA click event tag
- [ ] Create appointment modal open event tag
- [ ] Create appointment form submit event tag
- [ ] Create appointment form success event tag (CONVERSION)
- [ ] Create appointment form error event tag

### Phase 4: Testing (Week 4)
- [ ] Test all CTAs in GTM Preview mode
- [ ] Verify events in GA4 Real-Time
- [ ] Test in production
- [ ] Set up conversion goals in GA4

---

## Key Tracking Events

| Event Name | When It Fires | Conversion Value |
|------------|---------------|------------------|
| `cta_click` | Any CTA button/link clicked | No |
| `appointment_modal_open` | Appointment modal opens | No |
| `appointment_form_submit` | Form submitted | Secondary |
| `appointment_form_success` | Form successfully submitted | **PRIMARY** |
| `appointment_form_error` | Form submission error | No |

---

## Files That Need Updates

### Must Update (Core Tracking)
1. `src/app/layout.tsx` - Add GTM snippet
2. `src/lib/gtm.ts` - Create new file with tracking functions
3. `src/components/AppointmentModal.tsx` - Add form tracking
4. `src/components/sections/hero-section.tsx` - Add CTA tracking
5. `src/components/sections/connect-section.tsx` - Add CTA tracking
6. `src/components/sections/connect-wifth-us.tsx` - Add CTA tracking

### Should Update (All CTAs)
7. `src/app/all-on-4/sections/cta-section.tsx`
8. `src/app/all-on-4/sections/hero-section.tsx`
9. All service page components with CTAs
10. `src/components/sections/services-section.tsx`
11. `src/components/sections/footer-section.tsx`

---

## Environment Variables Needed

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX  # Already exists
```

---

## See Full Plan
For complete implementation details, see: `docs/CTA-REVIEW-AND-TAG-SETUP-PLAN.md`

