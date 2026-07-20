'use client';

import { useEffect } from 'react';
import { trackBlogPostView } from '@/lib/analytics';

interface BlogViewTrackerProps {
  postSlug: string;
  postTitle: string;
  category?: string;
}

export default function BlogViewTracker({ postSlug, postTitle, category }: BlogViewTrackerProps) {
  useEffect(() => {
    // Track blog post view
    trackBlogPostView(postSlug, postTitle, category);
  }, [postSlug, postTitle, category]);

  return null;
}

