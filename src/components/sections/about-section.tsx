import Link from 'next/link';

const workAreas = [
  {
    title: 'بازی‌وارسازی عملکرد',
    description: 'تبدیل اهداف و شاخص‌های کلیدی به بازی، چالش و رقابت دوستانه',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    ),
  },
  {
    title: 'انگیزه و قدردانی',
    description: 'امتیاز، الماس، سطح و کادوس برای دیده شدن و تشویق اعضای تیم',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
  },
  {
    title: 'پایش داده‌محور',
    description: 'گزارش عملکرد، شفافیت نتایج و اتصال به ابزارهای داده سازمان',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
  {
    title: 'پاداش و فروشگاه',
    description: 'تعریف جوایز و تبدیل الماس‌های کسب‌شده به پاداش‌های واقعی',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      />
    ),
  },
];

const phases = [
  { title: 'تعریف بازی', subtitle: 'قوانین و چالش' },
  { title: 'اجرا', subtitle: 'رقابت و همکاری' },
  { title: 'پاداش', subtitle: 'الماس و کادوس' },
];

export default function AboutSection() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-6">
              درباره ما
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              عملکرد تیمت را با بازی
              <br />
              <span className="bg-gradient-to-l from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                بهبود بده
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl">
              کادوسا؛ اپلیکیشن بازی‌وارسازی برای بهبود عملکرد افراد و تیم‌ها
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed text-right">
              <p>
                کادوسا پلتفرم بازی‌وارسازی است که به سازمان‌ها کمک می‌کند اهداف و فرآیندهای مهم را به بازی،
                چالش و رقابت دوستانه تبدیل کنند تا انگیزه، مشارکت و شفافیت عملکرد افزایش یابد.
              </p>
              <p>
                با قوانین، سطح، الماس، کادوس و فروشگاه پاداش، اعضای تیم می‌دانند برای چه تلاش می‌کنند و
                دستاوردهایشان دیده می‌شود.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              {phases.map(({ title, subtitle }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-6 text-center"
                >
                  <p className="text-lg font-semibold text-slate-900">{title}</p>
                  <p className="text-sm text-emerald-700 mt-1 font-medium">{subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10 text-right">
            <h2 className="text-3xl font-medium text-slate-900 mb-4">زمینه‌های کاری ما</h2>
            <p className="text-slate-600 leading-relaxed">
              تمرکز کادوسا بر بازی‌وارسازی فرآیندها، افزایش انگیزه تیمی، پایش داده‌محور و طراحی سیستم پاداش
              متناسب با عملکرد است.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workAreas.map(({ title, description, icon }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {icon}
                  </svg>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-medium text-slate-900 mb-6">اطلاعات تماس</h2>
              <ul className="space-y-5 text-slate-600">
                <li className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-emerald-600 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a href="mailto:info@kudosa.ir" className="hover:text-emerald-600 transition-colors">
                    info@kudosa.ir
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <a
                    href="https://kudosa.ir"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-600 transition-colors"
                  >
                    kudosa.ir
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-emerald-600 to-blue-600 rounded-2xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 start-0 w-40 h-40 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 end-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-medium text-white mb-4">آماده همکاری هستید؟</h3>
                <p className="text-emerald-100 mb-8 leading-relaxed">
                  برای دریافت دمو یا آشنایی با پلتفرم کادوسا با ما در تماس باشید.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-all"
                >
                  تماس با ما
                  <span aria-hidden="true">←</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
