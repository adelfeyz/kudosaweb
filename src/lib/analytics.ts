/**
 * Google Analytics 4 (GA4) Configuration and Utilities
 * 
 * This module provides GA4 tracking functionality with GDPR compliance support.
 */

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
  }
}

// GA4 Measurement ID from environment variable
export const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID || '';

/**
 * Check if GA4 is enabled and configured
 */
export const isGA4Enabled = (): boolean => {
  return typeof window !== 'undefined' && !!GA4_MEASUREMENT_ID && !!window.gtag;
};

/**
 * Initialize GA4 data layer
 */
export const initGA4 = (): void => {
  if (typeof window === 'undefined' || !GA4_MEASUREMENT_ID) {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function() {
    window.dataLayer!.push(arguments);
  };

  // Set initial timestamp
  window.gtag('js', new Date());
  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

/**
 * Track page view
 */
export const trackPageView = (url: string): void => {
  if (!isGA4Enabled() || !window.gtag) {
    return;
  }

  window.gtag('config', GA4_MEASUREMENT_ID, {
    page_path: url,
  });
};

/**
 * Track custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
): void => {
  if (!isGA4Enabled() || !window.gtag) {
    return;
  }

  window.gtag('event', eventName, eventParams);
};

/**
 * Predefined event tracking functions
 */

// Blog post view
export const trackBlogPostView = (postSlug: string, postTitle: string, category?: string): void => {
  trackEvent('blog_post_view', {
    post_slug: postSlug,
    post_title: postTitle,
    ...(category && { post_category: category }),
  });
};

// Appointment request
export const trackAppointmentRequest = (serviceType?: string): void => {
  trackEvent('appointment_request', {
    ...(serviceType && { service_type: serviceType }),
  });
};

// Newsletter signup
export const trackNewsletterSignup = (source?: string): void => {
  trackEvent('newsletter_signup', {
    ...(source && { source }),
  });
};

// Contact form submission
export const trackContactFormSubmit = (): void => {
  trackEvent('contact_form_submit');
};

// Service page view
export const trackServicePageView = (serviceName: string): void => {
  trackEvent('service_page_view', {
    service_name: serviceName,
  });
};

// Button/link click
export const trackClick = (elementName: string, elementLocation?: string): void => {
  trackEvent('click', {
    element_name: elementName,
    ...(elementLocation && { element_location: elementLocation }),
  });
};

// Search query
export const trackSearch = (searchQuery: string, resultCount?: number): void => {
  trackEvent('search', {
    search_query: searchQuery,
    ...(resultCount !== undefined && { result_count: resultCount }),
  });
};

// File download
export const trackDownload = (fileName: string, fileType?: string): void => {
  trackEvent('file_download', {
    file_name: fileName,
    ...(fileType && { file_type: fileType }),
  });
};

// Video play
export const trackVideoPlay = (videoName: string, videoLocation?: string): void => {
  trackEvent('video_play', {
    video_name: videoName,
    ...(videoLocation && { video_location: videoLocation }),
  });
};

