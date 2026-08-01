'use client';

import { useEffect } from 'react';

export function FontAwesomeLoader() {
  useEffect(() => {
    // Configure Font Awesome
    if (typeof window !== 'undefined') {
      (window as { FontAwesomeConfig?: { autoReplaceSvg: string } }).FontAwesomeConfig = { autoReplaceSvg: 'nest' };
      
      // Load Font Awesome script
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
      script.crossOrigin = 'anonymous';
      script.referrerPolicy = 'no-referrer';
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return null;
}
