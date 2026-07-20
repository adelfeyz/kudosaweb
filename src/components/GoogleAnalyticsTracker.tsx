'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export default function GoogleAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith('/crm') || pathname.startsWith('/login') || pathname.startsWith('/logout')) {
      return;
    }
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
