/**
 * Google Tag Manager (GTM) Data Layer Helper Functions
 * 
 * This module provides centralized data layer management for consistent event tracking.
 * All tracking events are pushed to the dataLayer for GTM to process.
 */

declare global {
  interface Window {
    dataLayer?: any[];
  }
}

/**
 * Push events to dataLayer for GTM
 */
export const pushToDataLayer = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

/**
 * Track CTA click events
 */
export const trackCTAClick = (ctaName: string, ctaLocation: string, ctaType: string) => {
  pushToDataLayer('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_type: ctaType,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    page_title: typeof document !== 'undefined' ? document.title : '',
  });
};

/**
 * Track appointment modal open events
 */
export const trackAppointmentModalOpen = (triggerLocation: string) => {
  pushToDataLayer('appointment_modal_open', {
    trigger_location: triggerLocation,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track appointment modal close events
 */
export const trackAppointmentModalClose = () => {
  pushToDataLayer('appointment_modal_close', {
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track appointment form submission events
 */
export const trackAppointmentFormSubmit = (formData: {
  serviceType?: string;
  hasPreferredDate: boolean;
  hasPreferredTime: boolean;
}) => {
  pushToDataLayer('appointment_form_submit', {
    service_type: formData.serviceType || 'not_specified',
    has_preferred_date: formData.hasPreferredDate,
    has_preferred_time: formData.hasPreferredTime,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track appointment form success events (PRIMARY CONVERSION)
 */
export const trackAppointmentFormSuccess = () => {
  pushToDataLayer('appointment_form_success', {
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

/**
 * Track appointment form error events
 */
export const trackAppointmentFormError = (errorType: string) => {
  pushToDataLayer('appointment_form_error', {
    error_type: errorType,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
};

