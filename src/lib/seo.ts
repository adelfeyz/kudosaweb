/**
 * SEO Utilities
 * 
 * Helper functions for SEO-related tasks including canonical URLs,
 * structured data generation, and breadcrumb creation.
 */

import { config } from './config';

const siteUrl = config.siteUrl;

/**
 * Generate canonical URL for a given path
 */
export const getCanonicalUrl = (path: string): string => {
  // Remove trailing slash for consistency
  const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
  return `${siteUrl}${cleanPath}`;
};

/**
 * Generate breadcrumb list for structured data
 */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : getCanonicalUrl(item.url),
    })),
  };
};

/**
 * Generate Organization schema
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'روشمند',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'روشمند builds intelligent AI-powered products and platforms that transform how businesses operate.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [],
  };
};

/**
 * Generate LocalBusiness schema (Dental Practice)
 */
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'روشمند',
    image: `${siteUrl}/logo.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: process.env.NEXT_PUBLIC_PHONE_NUMBER || '+1-650-321-2012',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: process.env.NEXT_PUBLIC_STREET_ADDRESS || '3200 Middlefield Rd, Suite A',
      addressLocality: 'Palo Alto',
      addressRegion: 'CA',
      postalCode: process.env.NEXT_PUBLIC_POSTAL_CODE || '94306',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(process.env.NEXT_PUBLIC_LATITUDE || '37.4419'),
      longitude: parseFloat(process.env.NEXT_PUBLIC_LONGITUDE || '-122.1430'),
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      // Add Saturday if applicable
      // {
      //   '@type': 'OpeningHoursSpecification',
      //   dayOfWeek: 'Saturday',
      //   opens: '09:00',
      //   closes: '13:00',
      // },
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Palo Alto',
      },
      {
        '@type': 'City',
        name: 'Menlo Park',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Dental Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'General Dentistry',
            description: 'Comprehensive dental care and preventive services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cosmetic Dentistry',
            description: 'Teeth whitening, veneers, and smile makeovers',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Dental Implants',
            description: 'Permanent tooth replacement solutions',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Invisalign',
            description: 'Clear aligner orthodontic treatment',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Gum Grafts',
            description: 'Periodontal treatment and gum restoration',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'All-on-4',
            description: 'Full arch dental implant restoration',
          },
        },
      ],
    },
  };
};

/**
 * Generate Service schema for individual service pages
 */
export const generateServiceSchema = (serviceName: string, description: string, serviceUrl: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'روشمند',
      url: siteUrl,
    },
    url: getCanonicalUrl(serviceUrl),
  };
};

/**
 * Generate MedicalBusiness schema for service pages
 */
export const generateMedicalBusinessSchema = (serviceName: string, description: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}#${serviceName.toLowerCase().replace(/\s+/g, '-')}`,
    name: serviceName,
    description: description,
    url: siteUrl,
  };
};

/**
 * Generate Blog schema for blog listing page
 */
export const generateBlogSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'وبلاگ روشمند',
    description: 'AI insights, technology trends, and transformation stories from روشمند',
    url: getCanonicalUrl('/blog'),
    publisher: {
      '@type': 'Organization',
      name: 'روشمند',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };
};

/**
 * Generate CollectionPage schema for category pages
 */
export const generateCollectionPageSchema = (categoryName: string, categoryUrl: string, itemCount?: number) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} - Pointer Blog`,
    url: getCanonicalUrl(categoryUrl),
    ...(itemCount !== undefined && {
      numberOfItems: itemCount,
    }),
    mainEntity: {
      '@type': 'ItemList',
      name: categoryName,
    },
  };
};

/**
 * Generate FAQPage schema
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export const generateFAQPageSchema = (faqs: FAQItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Generate Review schema
 */
export interface ReviewItem {
  author: string;
  reviewBody: string;
  rating?: {
    ratingValue: number;
    bestRating?: number;
    worstRating?: number;
  };
  datePublished?: string;
}

export const generateReviewSchema = (reviews: ReviewItem[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pointer',
    aggregateRating: reviews.length > 0 && reviews.some(r => r.rating) ? {
      '@type': 'AggregateRating',
      ratingValue: reviews
        .filter(r => r.rating)
        .reduce((sum, r) => sum + (r.rating?.ratingValue || 0), 0) / reviews.filter(r => r.rating).length,
      reviewCount: reviews.filter(r => r.rating).length,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewBody: review.reviewBody,
      ...(review.rating && {
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating.ratingValue,
          bestRating: review.rating.bestRating || 5,
          worstRating: review.rating.worstRating || 1,
        },
      }),
      ...(review.datePublished && { datePublished: review.datePublished }),
    })),
  };
};

/**
 * Generate AggregateRating schema (standalone)
 */
export const generateAggregateRatingSchema = (ratingValue: number, reviewCount: number, bestRating: number = 5, worstRating: number = 1) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue,
    reviewCount,
    bestRating,
    worstRating,
  };
};

