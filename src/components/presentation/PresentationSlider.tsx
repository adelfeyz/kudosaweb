'use client';

import { useCallback, useEffect, useRef, useState, Fragment } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { PresentationSlide, PresentationTheme } from '@/content/presentation-slide-types';

interface PresentationSliderProps {
  slides: PresentationSlide[];
  theme?: PresentationTheme;
}

function toPersianDigits(value: number): string {
  return value.toLocaleString('fa-IR');
}

function usesWhiteImageBg(slide: PresentationSlide): boolean {
  return slide.imageBg === 'white';
}

function splitImageGridRowsClass(count: number): string {
  if (count >= 3) return 'grid-rows-3';
  if (count === 2) return 'grid-rows-2';
  return 'grid-rows-1';
}

function ImageZoomLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown, true);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown, true);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="بزرگ‌نمایی تصویر"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/85 cursor-zoom-out"
        onClick={onClose}
        aria-label="بستن بزرگ‌نمایی"
      />

      <div className="relative z-10 flex-shrink-0 flex items-center justify-between gap-4 px-4 py-3 bg-slate-900/95 border-b border-white/10">
        <p className="text-white/60 text-sm truncate">{alt || 'بزرگ‌نمایی تصویر'}</p>
        <button
          type="button"
          onClick={onClose}
          className="flex-shrink-0 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition"
        >
          بستن
        </button>
      </div>

      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-slate-950 overscroll-contain">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className="block w-full h-auto max-w-full select-none" draggable={false} />
      </div>
    </div>
  );
}

function ZoomableImage({
  src,
  alt,
  onZoom,
  className,
  imageClassName,
  sizes,
}: {
  src: string;
  alt: string;
  onZoom: (src: string, alt: string) => void;
  className?: string;
  imageClassName?: string;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onZoom(src, alt)}
      className={`group relative block w-full h-full cursor-zoom-in text-start ${className ?? ''}`}
      aria-label={`بزرگ‌نمایی ${alt || 'تصویر'}`}
    >
      <Image src={src} alt={alt} fill className={imageClassName ?? 'object-contain'} sizes={sizes} />
      <span className="pointer-events-none absolute bottom-2 end-2 rounded-md bg-black/60 px-2 py-1 text-[10px] font-medium text-white opacity-0 transition group-hover:opacity-100">
        بزرگ‌نمایی
      </span>
    </button>
  );
}

const themeStyles: Record<
  PresentationTheme,
  {
    contentBg: string;
    headerGradient: string;
    headerBlur: string;
    subtitle: string;
    summaryBorder: string;
    summaryRing: string;
    barStrip: string;
    label: string;
    bulletBg: string;
    bulletText: string;
    bulletBorder: string;
    bulletHover: string;
    imageHeader: string;
    rowArrow: string;
    rowBadge: string;
    rowBorder: string;
    rowBg: string;
    splitBullet: string;
    comparisonBody: string;
    comparisonBorder: string;
    nextBtn: string;
    dotActive: string;
    fallbackBullet: string;
  }
> = {
  emerald: {
    contentBg: 'bg-gradient-to-br from-slate-50 via-white to-emerald-50/40',
    headerGradient: 'bg-gradient-to-l from-emerald-600 to-emerald-700',
    headerBlur: 'bg-emerald-300',
    subtitle: 'text-emerald-300',
    summaryBorder: 'border-emerald-100',
    summaryRing: 'ring-emerald-500/10',
    barStrip: 'bg-gradient-to-b from-emerald-400 to-emerald-600',
    label: 'text-emerald-600',
    bulletBg: 'bg-emerald-50',
    bulletText: 'text-emerald-700',
    bulletBorder: 'border-emerald-100',
    bulletHover: 'hover:border-emerald-200',
    imageHeader: 'bg-emerald-600',
    rowArrow: 'text-emerald-500',
    rowBadge: 'bg-emerald-600',
    rowBorder: 'border-emerald-100',
    rowBg: 'bg-emerald-50/80',
    splitBullet: 'text-emerald-600',
    comparisonBody: 'text-emerald-800 bg-emerald-50 border-emerald-200',
    comparisonBorder: 'border-emerald-200',
    nextBtn: 'bg-emerald-600 hover:bg-emerald-500',
    dotActive: 'bg-emerald-400',
    fallbackBullet: 'text-emerald-600',
  },
  violet: {
    contentBg: 'bg-gradient-to-br from-slate-50 via-white to-violet-50/40',
    headerGradient: 'bg-gradient-to-l from-violet-600 to-violet-700',
    headerBlur: 'bg-violet-300',
    subtitle: 'text-violet-300',
    summaryBorder: 'border-violet-100',
    summaryRing: 'ring-violet-500/10',
    barStrip: 'bg-gradient-to-b from-violet-400 to-violet-600',
    label: 'text-violet-600',
    bulletBg: 'bg-violet-50',
    bulletText: 'text-violet-700',
    bulletBorder: 'border-violet-100',
    bulletHover: 'hover:border-violet-200',
    imageHeader: 'bg-violet-600',
    rowArrow: 'text-violet-500',
    rowBadge: 'bg-violet-600',
    rowBorder: 'border-violet-100',
    rowBg: 'bg-violet-50/80',
    splitBullet: 'text-violet-600',
    comparisonBody: 'text-violet-800 bg-violet-50 border-violet-200',
    comparisonBorder: 'border-violet-200',
    nextBtn: 'bg-violet-600 hover:bg-violet-500',
    dotActive: 'bg-violet-400',
    fallbackBullet: 'text-violet-600',
  },
  blue: {
    contentBg: 'bg-gradient-to-br from-slate-50 via-white to-sky-50/40',
    headerGradient: 'bg-gradient-to-l from-blue-600 to-sky-700',
    headerBlur: 'bg-sky-300',
    subtitle: 'text-sky-300',
    summaryBorder: 'border-sky-100',
    summaryRing: 'ring-sky-500/10',
    barStrip: 'bg-gradient-to-b from-sky-400 to-blue-600',
    label: 'text-blue-600',
    bulletBg: 'bg-sky-50',
    bulletText: 'text-blue-700',
    bulletBorder: 'border-sky-100',
    bulletHover: 'hover:border-sky-200',
    imageHeader: 'bg-blue-600',
    rowArrow: 'text-sky-500',
    rowBadge: 'bg-blue-600',
    rowBorder: 'border-sky-100',
    rowBg: 'bg-sky-50/80',
    splitBullet: 'text-blue-600',
    comparisonBody: 'text-blue-800 bg-sky-50 border-sky-200',
    comparisonBorder: 'border-sky-200',
    nextBtn: 'bg-blue-600 hover:bg-blue-500',
    dotActive: 'bg-sky-400',
    fallbackBullet: 'text-blue-600',
  },
  indigo: {
    contentBg: 'bg-gradient-to-br from-slate-50 via-white to-indigo-50/40',
    headerGradient: 'bg-gradient-to-l from-indigo-600 to-indigo-700',
    headerBlur: 'bg-indigo-300',
    subtitle: 'text-indigo-300',
    summaryBorder: 'border-indigo-100',
    summaryRing: 'ring-indigo-500/10',
    barStrip: 'bg-gradient-to-b from-indigo-400 to-indigo-600',
    label: 'text-indigo-600',
    bulletBg: 'bg-indigo-50',
    bulletText: 'text-indigo-700',
    bulletBorder: 'border-indigo-100',
    bulletHover: 'hover:border-indigo-200',
    imageHeader: 'bg-indigo-600',
    rowArrow: 'text-indigo-500',
    rowBadge: 'bg-indigo-600',
    rowBorder: 'border-indigo-100',
    rowBg: 'bg-indigo-50/80',
    splitBullet: 'text-indigo-600',
    comparisonBody: 'text-indigo-800 bg-indigo-50 border-indigo-200',
    comparisonBorder: 'border-indigo-200',
    nextBtn: 'bg-indigo-600 hover:bg-indigo-500',
    dotActive: 'bg-indigo-400',
    fallbackBullet: 'text-indigo-600',
  },
};

function ContentSlideLayout({
  slide,
  theme,
}: {
  slide: PresentationSlide;
  theme: PresentationTheme;
}) {
  const t = themeStyles[theme];

  return (
    <div className={`h-full flex flex-col overflow-hidden ${t.contentBg}`}>
      <div className={`relative flex-shrink-0 ${t.headerGradient} px-6 md:px-10 py-5 md:py-6 overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-8 -start-8 w-32 h-32 rounded-full bg-white blur-2xl" />
          <div className={`absolute -bottom-4 end-12 w-24 h-24 rounded-full ${t.headerBlur} blur-xl`} />
        </div>
        <h3 className="relative text-xl md:text-2xl font-bold text-white tracking-tight">
          {slide.title}
        </h3>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-5 md:p-8">
        {slide.body && (
          <div
            className={`mb-5 md:mb-6 rounded-2xl border ${t.summaryBorder} bg-white shadow-sm ring-1 ${t.summaryRing} overflow-hidden`}
          >
            <div className="flex gap-0">
              <div className={`w-1 flex-shrink-0 ${t.barStrip}`} aria-hidden />
              <div className="flex-1 p-4 md:p-5">
                <p className={`text-xs font-semibold ${t.label} mb-2 tracking-wide`}>خلاصه</p>
                <p className="text-slate-700 text-sm md:text-base leading-relaxed">{slide.body}</p>
              </div>
            </div>
          </div>
        )}

        {slide.bullets && slide.bullets.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-3">
            {slide.bullets.map((item, index) => (
              <div
                key={item}
                className={`group flex items-start gap-3 rounded-xl border border-slate-200/90 bg-white/90 p-3.5 md:p-4 shadow-sm transition ${t.bulletHover} hover:shadow-md ${
                  slide.bullets!.length % 2 === 1 && index === slide.bullets!.length - 1
                    ? 'sm:col-span-2'
                    : ''
                }`}
              >
                <span
                  className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl ${t.bulletBg} ${t.bulletText} text-sm font-bold border ${t.bulletBorder} group-hover:opacity-90 transition-colors`}
                >
                  {toPersianDigits(index + 1)}
                </span>
                <p className="text-slate-700 text-sm leading-relaxed pt-1.5">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SlideContent({
  slide,
  theme,
  onImageZoom,
}: {
  slide: PresentationSlide;
  theme: PresentationTheme;
  onImageZoom: (src: string, alt: string) => void;
}) {
  const t = themeStyles[theme];

  if (slide.layout === 'title') {
    return (
      <div className="relative h-full flex flex-col items-center justify-center text-center p-8 md:p-12">
        {slide.image && (
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt=""
              fill
              className="object-cover opacity-30"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />
          </div>
        )}
        <div className="relative z-10 max-w-3xl">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h3>
          {slide.subtitle && (
            <p className={`text-xl md:text-2xl ${t.subtitle} mb-6`}>{slide.subtitle}</p>
          )}
          {slide.body && <p className="text-slate-300 text-sm md:text-base">{slide.body}</p>}
        </div>
      </div>
    );
  }

  if (slide.layout === 'content') {
    return <ContentSlideLayout slide={slide} theme={theme} />;
  }

  if (slide.layout === 'image') {
    const whiteImageBg = usesWhiteImageBg(slide);

    return (
      <div className="relative h-full flex flex-col">
        <div className={`${t.imageHeader} px-6 py-3 flex-shrink-0`}>
          <h3 className="text-lg md:text-xl font-semibold text-white">{slide.title}</h3>
        </div>
        {slide.image && (
          <div
            className={`relative flex-1 min-h-0 w-full overflow-hidden ${
              whiteImageBg ? 'bg-white' : 'bg-slate-950'
            }`}
          >
            <ZoomableImage
              src={slide.image}
              alt={slide.title || ''}
              onZoom={onImageZoom}
              imageClassName="w-full h-full object-contain object-top"
              sizes="100vw"
            />
          </div>
        )}
      </div>
    );
  }

  if (slide.layout === 'split') {
    const imgs = slide.images?.length ? slide.images : slide.image ? [slide.image] : [];
    const whiteImageBg = usesWhiteImageBg(slide);

    if (slide.imageLayout === 'row') {
      return (
        <div className="h-full flex flex-col overflow-hidden bg-white">
          <div className="flex-shrink-0 px-5 md:px-8 pt-5 md:pt-6 pb-4 border-b border-slate-100">
            <h3 className="text-lg md:text-xl font-semibold text-slate-900 mb-2">{slide.title}</h3>
            {slide.body && (
              <p className="text-slate-600 text-sm leading-relaxed mb-3">{slide.body}</p>
            )}
            {slide.bullets && (
              <div className="flex items-stretch gap-0 overflow-x-auto pb-1">
                {slide.bullets.map((item, index) => (
                  <Fragment key={item}>
                    {index > 0 && (
                      <span
                        className={`flex-shrink-0 self-center ${t.rowArrow} text-base md:text-lg px-1 md:px-2`}
                        aria-hidden
                      >
                        ←
                      </span>
                    )}
                    <div
                      className={`flex-shrink-0 flex items-start gap-2 max-w-[11rem] md:max-w-[9.5rem] rounded-lg border ${t.rowBorder} ${t.rowBg} px-2.5 py-2`}
                    >
                      <span
                        className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-md ${t.rowBadge} text-white text-[10px] font-bold`}
                      >
                        {toPersianDigits(index + 1)}
                      </span>
                      <span className="text-[11px] md:text-xs text-slate-700 leading-snug">{item}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            )}
          </div>
          <div className="flex-1 min-h-0 flex flex-row gap-3 p-4 md:p-5 bg-white">
            {imgs.map((src) => (
              <div
                key={src}
                className="relative flex-1 min-w-0 min-h-0 rounded-lg border border-slate-200 overflow-hidden bg-white shadow-sm"
              >
                <ZoomableImage
                  src={src}
                  alt={slide.title || ''}
                  onZoom={onImageZoom}
                  imageClassName="object-contain object-top p-1"
                  sizes="50vw"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`h-full flex flex-col md:flex-row overflow-hidden min-h-0 ${
          whiteImageBg ? 'bg-white' : 'bg-slate-100'
        }`}
      >
        <div className="md:w-2/5 p-6 md:p-8 overflow-y-auto bg-white flex-shrink-0">
          <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">{slide.title}</h3>
          {slide.body && (
            <p className="text-slate-600 text-sm leading-relaxed mb-4">{slide.body}</p>
          )}
          {slide.bullets && (
            <ul className="space-y-2 text-sm text-slate-700">
              {slide.bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className={`${t.splitBullet} flex-shrink-0`}>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className={`md:w-3/5 flex-1 min-h-0 grid gap-1 p-1 ${splitImageGridRowsClass(imgs.length)} ${
            whiteImageBg ? 'bg-white' : 'bg-slate-100'
          }`}
        >
          {imgs.map((src) => (
            <div
              key={src}
              className={`relative min-h-0 rounded overflow-hidden border border-slate-200 ${
                whiteImageBg ? 'bg-white' : 'bg-slate-950'
              }`}
            >
              <ZoomableImage
                src={src}
                alt={slide.title || ''}
                onZoom={onImageZoom}
                imageClassName="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (slide.layout === 'comparison' && slide.table) {
    return (
      <div className="h-full flex flex-col overflow-hidden">
        <div className={`${t.imageHeader} px-6 py-3 flex-shrink-0`}>
          <h3 className="text-lg md:text-xl font-semibold text-white">{slide.title}</h3>
        </div>
        <div className="flex-1 overflow-auto p-4 md:p-6 bg-white">
          {slide.body && (
            <p className="text-slate-600 text-sm mb-4 font-medium">{slide.body}</p>
          )}
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                {slide.table.headers.map((h) => (
                  <th key={h} className="border border-slate-300 px-3 py-2 text-start font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slide.table.rows.map((row) => (
                <tr key={row[0]} className="even:bg-slate-50">
                  {row.map((cell, i) => (
                    <td
                      key={`${row[0]}-${i}`}
                      className="border border-slate-200 px-3 py-2 text-slate-700"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {slide.bullets && slide.table && (
            <div className="mt-6 space-y-4 text-sm text-slate-700">
              {slide.bullets.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (slide.layout === 'comparison' && !slide.table) {
    return (
      <div className="h-full flex flex-col overflow-auto bg-white p-6 md:p-8">
        <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-6">{slide.title}</h3>
        <ul className="space-y-4 text-sm text-slate-700 mb-6">
          {slide.bullets?.map((item) => (
            <li key={item} className={`leading-relaxed border-s ${t.comparisonBorder} ps-4`}>
              {item}
            </li>
          ))}
        </ul>
        {slide.body && (
          <p className={`font-medium text-base border rounded-xl p-4 ${t.comparisonBody}`}>
            {slide.body}
          </p>
        )}
      </div>
    );
  }

  if (slide.layout === 'qa') {
    return (
      <div className="h-full flex flex-col overflow-auto bg-white">
        <div className={`${t.imageHeader} px-6 py-3 flex-shrink-0`}>
          <h3 className="text-lg md:text-xl font-semibold text-white">{slide.title}</h3>
        </div>
        <div className="flex-1 p-6 md:p-8 space-y-5">
          {slide.qa?.map(({ question, answer }) => (
            <div key={question} className="border border-slate-200 rounded-xl p-4">
              <p className="font-semibold text-slate-900 mb-2">{question}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto bg-white p-6 md:p-8">
      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-4">{slide.title}</h3>
      {slide.body && <p className="text-slate-600 text-sm mb-4">{slide.body}</p>}
      {slide.bullets && (
        <ul className="space-y-2 text-sm text-slate-700">
          {slide.bullets.map((item) => (
            <li key={item} className="flex gap-2">
              <span className={t.fallbackBullet}>•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function PresentationSlider({ slides, theme = 'emerald' }: PresentationSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = themeStyles[theme];

  const total = slides.length;
  const current = slides[currentIndex];

  const handleImageZoom = useCallback((src: string, alt: string) => {
    setZoomedImage({ src, alt });
  }, []);

  const closeImageZoom = useCallback(() => {
    setZoomedImage(null);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(total - 1, index)));
    },
    [total]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (zoomedImage) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goTo(total - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrev, goTo, total, zoomedImage]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50;
    if (delta > threshold) goPrev();
    else if (delta < -threshold) goNext();
    touchStartX.current = null;
  };

  if (!current) return null;

  const slideViewportBg =
    usesWhiteImageBg(current) && (current.layout === 'image' || current.layout === 'split')
      ? 'bg-white'
      : 'bg-slate-900';

  return (
    <div
      ref={containerRef}
      className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={`aspect-video w-full relative ${slideViewportBg}`}
        aria-roledescription="اسلاید"
        aria-label={`اسلاید ${toPersianDigits(currentIndex + 1)} از ${toPersianDigits(total)}`}
      >
        <SlideContent slide={current} theme={theme} onImageZoom={handleImageZoom} />
      </div>

      {mounted &&
        zoomedImage &&
        createPortal(
          <ImageZoomLightbox src={zoomedImage.src} alt={zoomedImage.alt} onClose={closeImageZoom} />,
          document.body
        )}

      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-3 bg-slate-800 border-t border-slate-700">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-lg bg-slate-700 text-white text-sm font-medium hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="اسلاید قبلی"
          >
            قبلی
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={currentIndex === total - 1}
            className={`px-4 py-2 rounded-lg text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed transition ${t.nextBtn}`}
            aria-label="اسلاید بعدی"
          >
            بعدی
          </button>
        </div>

        <div className="text-slate-300 text-sm tabular-nums">
          {toPersianDigits(currentIndex + 1)} / {toPersianDigits(total)}
        </div>

        <div className="flex flex-wrap gap-1.5 max-w-full justify-center">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === currentIndex ? `${t.dotActive} scale-125` : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`رفتن به اسلاید ${toPersianDigits(i + 1)}`}
              aria-current={i === currentIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
