"use client";

import { usePathname } from 'next/navigation';
import Header from './header';

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Don't show the header on CRM pages (they use AdminLayout)
  if (pathname.startsWith('/crm')) {
    return null;
  }
  
  return <Header />;
}
