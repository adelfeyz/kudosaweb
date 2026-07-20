"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { POINTER_LOGIN_URL } from '@/content/pointer-home';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuSections = [
    {
      title: 'شرکت',
      links: [
        { href: '/', label: 'خانه' },
        { href: '/about', label: 'درباره ما' },
        { href: '/#features', label: 'خدمات' },
        { href: '/blog', label: 'وبلاگ' },
        { href: '/contact', label: 'تماس با ما' },
        { href: '/privacy-policy', label: 'حریم خصوصی' },
      ],
    },
    {
      title: 'راهکارها',
      links: [
        { href: '/planning-agent', label: 'دستیار برنامه‌ریزی' },
        { href: '/pointer', label: 'پوینتر' },
      ],
    },
    {
      title: 'خدمات',
      links: [
        { href: '/#features', label: 'شکست استراتژی به اهداف' },
        { href: '/#features', label: 'مدیریت و پایش اهداف' },
        { href: '/#features', label: 'مدیریت اقدامات' },
        { href: '/#features', label: 'داشبورد مدیریتی' },
        { href: '/#features', label: 'گزارشات' },
      ],
    },
  ];

  return (
    <header className="fixed top-0 start-0 end-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src="/pointer/logo-black.png"
              alt="نرم افزار مدیریت استراتژیک پوینتر"
              width={632}
              height={105}
              className="h-auto w-[150px]"
              priority
            />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label="باز و بسته کردن منو"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <nav className="py-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
              {menuSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-lg font-bold text-primary mb-3">
                    {section.title}
                  </h3>
                  <div className="flex flex-col gap-2 ps-4">
                    {section.links.map((link) => {
                      const isExternal = link.href.startsWith('http');
                      return (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                          {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <a
                href={POINTER_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-text bg-amber-500 text-slate-900 px-8 py-3 rounded-[50px] hover:bg-amber-400 transition-colors text-center whitespace-nowrap"
              >
                ورود به سیستم
              </a>
              <Link
                href="/#appointment"
                onClick={() => setIsOpen(false)}
                className="button-text bg-primary text-primary-foreground px-8 py-3 rounded-[50px] hover:bg-primary/90 transition-colors text-center whitespace-nowrap"
              >
                تماس با ما
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
