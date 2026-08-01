'use client';

import { useEffect, useRef, useState } from 'react';

type ProgressItem = {
  title: string;
  value: number;
};

function ProgressBar({ title, value }: ProgressItem) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setProgress(value);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-slate-800">{title}</span>
        <span className="tabular-nums font-semibold text-slate-600" dir="ltr">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function KudosaProgressBars({ items }: { items: ProgressItem[] }) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <ProgressBar key={item.title} title={item.title} value={item.value} />
      ))}
    </div>
  );
}
