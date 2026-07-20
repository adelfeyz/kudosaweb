import Link from 'next/link';
import Image from 'next/image';

type ActivePage = 'planning-agent' | 'pointer';

const projectLinks: { label: string; href: string; id: ActivePage }[] = [
  { label: 'دستیار برنامه‌ریزی', href: '/planning-agent', id: 'planning-agent' },
  { label: 'پوینتر', href: '/pointer', id: 'pointer' },
];

export default function SiteFooter({ activePage }: { activePage?: ActivePage }) {
  const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });

  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex mb-4 rounded-lg bg-white px-3 py-2 hover:opacity-90 transition-opacity">
              <Image
                src="/pointer/logo-black.png"
                alt="نرم افزار مدیریت استراتژیک پوینتر"
                width={632}
                height={105}
                className="h-auto w-[150px]"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              نخستین نرم‌افزار مبتنی بر OKR در ایران. ابزار برنامه‌ریزی چابک برای تنظیم، پیگیری، مدیریت و جاری‌سازی استراتژی، اهداف و عملکرد سازمان.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium text-sm">خدمات</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="hover:text-emerald-400 transition-colors">شکست استراتژی به اهداف</Link></li>
              <li><Link href="/#features" className="hover:text-emerald-400 transition-colors">مدیریت و پایش آنلاین اهداف</Link></li>
              <li><Link href="/#features" className="hover:text-emerald-400 transition-colors">مدیریت اقدامات</Link></li>
              <li><Link href="/#features" className="hover:text-emerald-400 transition-colors">داشبورد مدیریتی</Link></li>
              <li><Link href="/#features" className="hover:text-emerald-400 transition-colors">گزارشات</Link></li>
              <li><Link href="/#pricing" className="hover:text-emerald-400 transition-colors">قیمت‌گذاری</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium text-sm">شرکت</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">درباره پوینتر</Link></li>
              <li><Link href="/#faq" className="hover:text-emerald-400 transition-colors">سوالات متداول</Link></li>
              <li><Link href="/#customers" className="hover:text-emerald-400 transition-colors">مشتریان</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">تماس با ما</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4 font-medium text-sm">منابع</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">مرکز دانش پوینتر</Link></li>
              {projectLinks.map(({ label, href, id }) => (
                <li key={id}>
                  <Link
                    href={href}
                    className={
                      activePage === id
                        ? 'text-emerald-400'
                        : 'hover:text-emerald-400 transition-colors'
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li><Link href="/#demo" className="hover:text-emerald-400 transition-colors">درخواست دمو</Link></li>
              <li><Link href="/#appointment" className="hover:text-emerald-400 transition-colors">درخواست مشاوره</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© {year} پوینتر. تمام حقوق محفوظ است.</p>
          <div className="flex gap-4">
            <a
              href="https://telegram.me/raveshmand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تلگرام"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/okrsoftware/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="لینکدین"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.aparat.com/raveshmand"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="آپارات"
              className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
