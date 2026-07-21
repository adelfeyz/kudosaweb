'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { APP_LOGIN_URL } from '@/content/kudosa-home';
import { SiteLogo } from '@/components/SiteLogo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuSections = [
    {
      title: 'منو',
      links: [
        { href: '/', label: 'خانه' },
        { href: '/#solutions', label: 'راه حل ها' },
        { href: '/about', label: 'درباره ما' },
        { href: '/contact', label: 'تماس با ما' },
        { href: '/blog', label: 'بلاگ' },
        { href: '/privacy-policy', label: 'حریم خصوصی' },
      ],
    },
  ];

  return (
    <header className="fixed top-0 start-0 end-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <SiteLogo
              fallback="/kudosa/logo.png"
              alt="کادوسا — اپلیکیشن بازی‌وارسازی بهبود عملکرد"
              width={632}
              height={105}
              className="h-auto w-[150px]"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <a
              href={APP_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-slate-700 hover:text-primary transition-colors"
            >
              ورود به اپلیکیشن کادوسا
            </a>
            <Link
              href="/#demo"
              className="button-text bg-primary text-primary-foreground px-6 py-2.5 rounded-[50px] hover:bg-primary/90 transition-colors text-sm whitespace-nowrap"
            >
              رزرو دمو آنلاین
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground hover:text-primary transition-colors md:ms-2"
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
                  <h3 className="text-lg font-bold text-primary mb-3">{section.title}</h3>
                  <div className="flex flex-col gap-2 ps-4">
                    {section.links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-semibold text-foreground hover:text-primary transition-colors py-2"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              <a
                href={APP_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="button-text bg-amber-500 text-slate-900 px-8 py-3 rounded-[50px] hover:bg-amber-400 transition-colors text-center whitespace-nowrap"
              >
                ورود به اپلیکیشن کادوسا
              </a>
              <Link
                href="/#demo"
                onClick={() => setIsOpen(false)}
                className="button-text bg-primary text-primary-foreground px-8 py-3 rounded-[50px] hover:bg-primary/90 transition-colors text-center whitespace-nowrap"
              >
                رزرو دمو آنلاین
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
