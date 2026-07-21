'use client';

import { useEffect, useRef, useState } from 'react';

type SurveyStat = {
  value: number;
  label: string;
};

type CircleProgressProps = {
  value: number;
  label: string;
  size?: number;
  stroke?: number;
};

function CircleProgress({ value, label, size = 140, stroke = 12 }: CircleProgressProps) {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

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

  const offset = circumference - (progress / 100) * circumference;

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-4 px-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e6e6e6"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="text-primary transition-[stroke-dashoffset] duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-slate-900 tabular-nums" dir="ltr">
            {Math.round(progress)}
            <span className="text-lg font-semibold text-slate-500">%</span>
          </span>
        </div>
      </div>
      <h3 className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed max-w-[11rem]">
        {label}
      </h3>
    </div>
  );
}

export default function KudosaSurveyStats({ stats }: { stats: SurveyStat[] }) {
  return (
    <section className="py-20 md:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-4 items-start justify-items-center">
          {stats.map((stat) => (
            <CircleProgress key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
