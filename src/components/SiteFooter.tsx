import Link from 'next/link';
import { SiteLogo } from '@/components/SiteLogo';

export default function SiteFooter() {
  const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="inline-flex mb-4 rounded-lg bg-white px-3 py-2 hover:opacity-90 transition-opacity"
            >
              <SiteLogo
                fallback="/kudosa/logo.png"
                alt="کادوسا — اپلیکیشن بازی‌وارسازی بهبود عملکرد"
                width={632}
                height={105}
                className="h-auto w-[150px]"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              پلتفرم کادوسا، ابزار بازی‌وارسازی برای ارتقای افراد و تیم‌ها و بهبود عملکرد سازمانی.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium text-sm">راه حل ها</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#solutions" className="hover:text-emerald-400 transition-colors">
                  ویژگی‌های کادوسا
                </Link>
              </li>
              <li>
                <Link href="/#game-flow" className="hover:text-emerald-400 transition-colors">
                  جریان بازی
                </Link>
              </li>
              <li>
                <Link href="/#how-to-start" className="hover:text-emerald-400 transition-colors">
                  چگونه شروع کنیم
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-400 transition-colors">
                  سوالات متداول
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium text-sm">شرکت</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  درباره کادوسا
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  تماس با ما
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium text-sm">منابع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="hover:text-emerald-400 transition-colors">
                  بلاگ
                </Link>
              </li>
              <li>
                <Link href="/#demo" className="hover:text-emerald-400 transition-colors">
                  رزرو دمو آنلاین
                </Link>
              </li>
              <li>
                <Link href="/#appointment" className="hover:text-emerald-400 transition-colors">
                  درخواست مشاوره
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© {year} ارائه شده در کادوسا</p>
          <div className="flex gap-4">
            <a
              href="https://kudosa.ir"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="سایت کادوسا"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
