'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { TabPanel } from '@/content/kudosa-home';

export default function KudosaMotivationTabs({ tabs }: { tabs: TabPanel[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  if (!active) return null;

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                selected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        className="rounded-[20px] min-h-0 lg:min-h-[510px] flex items-center"
        style={{ background: active.gradient }}
        role="tabpanel"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full px-6 py-10 sm:px-10 lg:px-14">
          <div className="text-right">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-4 leading-tight">
              {active.title}
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              {active.paragraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
            {active.bullets && active.bullets.length > 0 && (
              <ul className="mt-6 space-y-3 text-slate-600">
                {active.bullets.map((b) => (
                  <li key={b.slice(0, 40)} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5 flex-shrink-0">←</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {active.image && (
            <div className="relative w-full aspect-[4/3] max-w-md mx-auto lg:max-w-none">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
