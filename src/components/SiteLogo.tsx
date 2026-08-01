'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { getApiBaseUrl, resolveMediaUrl } from '@/lib/config';

type SiteLogoProps = {
  fallback: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
};

const CACHE_KEY = 'adelfeyz:site-logo-src';

function readLogoCache(): string | null {
  try {
    return localStorage.getItem(CACHE_KEY);
  } catch {
    return null;
  }
}

function writeLogoCache(resolvedSrc: string | null, fallback: string) {
  try {
    // Empty string means "confirmed no custom logo — use fallback"
    localStorage.setItem(CACHE_KEY, resolvedSrc && resolvedSrc !== fallback ? resolvedSrc : '');
  } catch {
    // ignore quota / private mode
  }
}

/**
 * Loads the site logo from CRM settings (`GET /settings/public`).
 * Avoids flashing the static fallback: waits for settings (or cache) before showing an image.
 */
export function SiteLogo({
  fallback,
  alt,
  width = 150,
  height = 40,
  className = 'h-auto w-[150px]',
  priority = false,
}: SiteLogoProps) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const cached = readLogoCache();
    if (cached === null) return;
    setSrc(cached === '' ? fallback : cached);
    setReady(true);
  }, [fallback]);

  useEffect(() => {
    let cancelled = false;

    const apply = (next: string) => {
      if (cancelled) return;
      setSrc(next);
      setReady(true);
      writeLogoCache(next === fallback ? null : next, fallback);
    };

    const load = async () => {
      try {
        const base = getApiBaseUrl().replace(/\/$/, '');
        const res = await fetch(`${base}/settings/public`);
        if (!res.ok) {
          apply(fallback);
          return;
        }
        const data = (await res.json()) as { logo_url?: string | null };
        if (cancelled) return;
        if (data.logo_url) {
          const resolved = resolveMediaUrl(data.logo_url);
          apply(resolved || fallback);
        } else {
          apply(fallback);
        }
      } catch {
        apply(fallback);
      }
    };

    load();

    const onUpdated = (event: Event) => {
      const detail = (event as CustomEvent<string | null>).detail;
      if (!detail) {
        apply(fallback);
        return;
      }
      apply(resolveMediaUrl(detail) || fallback);
    };
    window.addEventListener('site-logo-updated', onUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener('site-logo-updated', onUpdated);
    };
  }, [fallback]);

  if (!ready || !src) {
    return (
      <span
        className={className}
        style={{ display: 'inline-block', width, minHeight: Math.min(height, 40), visibility: 'hidden' }}
        aria-hidden
      />
    );
  }

  const unoptimized =
    src.startsWith('/uploads/') || src.startsWith('http://') || src.startsWith('https://');

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={unoptimized}
    />
  );
}
