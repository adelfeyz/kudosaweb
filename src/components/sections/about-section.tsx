import Link from 'next/link';

const values = [
  {
    title: 'هدف‌گرا، تحول‌گرا',
    description: 'تمرکز بر نتایج ملموس و تحول پایدار در سازمان‌ها',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
    accent: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'همگام با دانش روز دنیا',
    description: 'به‌کارگیری آخرین فناوری‌ها و روش‌های مدیریتی روز',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    ),
    accent: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'چابک و سریع',
    description: 'رویکرد برنامه‌ریزی چابک و اجرای سریع راهکارها',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    ),
    accent: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-50 text-violet-600',
  },
  {
    title: 'بومی‌سازی الگوهای موفق',
    description: 'تطبیق بهترین روش‌ها و الگوهای جهانی با نیازهای داخلی',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
    accent: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-50 text-amber-600',
  },
];

const services = [
  { label: 'استراتژی و نقشه راه هوش مصنوعی', href: '/#services' },
  { label: 'معماری سازمانی مبتنی بر هوش مصنوعی', href: '/#services' },
  { label: 'طراحی و استقرار راهکارهای هوش مصنوعی', href: '/#services' },
  { label: 'توانمندسازی تیم‌های تحول', href: '/#services' },
  { label: 'تحول دیجیتال', href: '/#services' },
  { label: 'استراتژی', href: '/#services' },
  { label: 'راه‌حل‌های مدیریت عملکرد و OKR', href: '/#services' },
];

const stats = [
  { value: '20+', label: 'سال تجربه موفق' },
  { value: '+30', label: 'همکاران متخصص' },
  { value: '120+', label: 'مشتری' },
  { value: '232', label: 'پروژه موفق' },
];

export default function AboutSection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
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
            <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-6">
              شرکت مدیریت{' '}
              <span className="bg-gradient-to-l from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                روشمند
              </span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-10 max-w-3xl">
              شرکتی تخصصی در حوزه توسعه فناوری‌های مدیریتی، مشاوره مدیریت استراتژیک و تحول دیجیتال — با بیش از دو دهه تجربه در بومی‌سازی بهترین روش‌ها و پلتفرم‌های مدیریتی.
            </p>
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-6">
              <span className="text-5xl font-bold text-emerald-400">20+</span>
              <div>
                <p className="text-white font-medium text-lg">سال تجربه موفق</p>
                <p className="text-white/60 text-sm">در مشاوره، برنامه‌ریزی و تحول سازمانی</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-medium mb-8 text-slate-900">درباره روشمند</h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                شرکت مدیریت روشمند شرکتی تخصصی است که در حوزه توسعه فناوری‌های مدیریتی و خدمات مشاوره مدیریت استراتژیک و تحول دیجیتال فعالیت می‌نماید. متخصصین روشمند ترکیبی از تخصص و خلاقیت در زمینه فناوری اطلاعات، کسب‌وکار و مدیریت عملکرد می‌باشند که در کنار هم روی روش توسعه متدها و پلتفرم‌های مدیریت استراتژیک و برنامه‌ریزی در کشور متناسب با نیاز داخلی فعالیت می‌نمایند.
              </p>
              <p>
                به‌کارگیری آخرین تکنولوژی‌های روز دنیا اولویتی است که متخصصین روشمند همواره سرلوحه کار خود قرار داده‌اند. شناسایی و تمرکز بر نیاز سازمان‌ها روشمند را به شرکتی موفق در عرصه ارائه راهکارها و پلتفرم‌های مدیریتی در سطح کشور تبدیل نموده است.
              </p>
              <p>
                امروز، با تکیه بر این تجربه، روشمند بر طراحی و اجرای راهکارهای هوش مصنوعی برای بازآفرینی کسب‌وکارها تمرکز دارد — از استراتژی و نقشه راه تا استقرار سامانه‌های هوشمند و عامل‌های سازمانی.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-4">
              ارزش‌های ما
            </div>
            <h2 className="text-3xl font-medium text-slate-900">آنچه روشمند را متمایز می‌کند</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, description, icon, iconBg }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {icon}
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Goal */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-medium text-slate-900 mb-6">هدف ما</h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              ارائه بهترین راه‌حل‌های سفارشی، خدمات بدیع و محصولات خلاقانه مبتنی بر تکنولوژی و دانش روز.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">شعار ما</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                ما معتقدیم که می‌توانیم در راستای رضایت مشتریانی که خواستار نوآوری و همگام شدن با دانش روز دنیا هستند و با شناسایی نیازها و توانایی‌های سازمان، بهترین راه‌حل‌ها را ارائه نماییم. شعار ما <strong className="text-emerald-700">تغییر برای ترقی</strong> است.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm mt-4">
                ما مفتخریم که به عنوان اولین شرکت ایرانی، پلتفرم ابری جاری‌سازی استراتژی به روش برنامه‌ریزی چابک با استفاده از روش OKR را پایه‌ریزی کرده‌ایم. نقطه قوت ما تجربه‌های موفقی است که در بومی‌سازی بهترین راهکارها، روش‌ها و الگوهای موفق دنیا برای حل مسائل اجرایی داشته‌ایم.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">سیاست ما</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                سیاست شرکت ما، همراهی سازمان‌ها در مسیر بازآفرینی کسب‌وکار با هوش مصنوعی، تحول دیجیتال و توسعه ظرفیت استراتژیک است. ما از مسائل واقعی سازمان شروع می‌کنیم، مسیر اجرایی واقع‌بینانه طراحی می‌کنیم و تا مرحله استقرار و بهره‌برداری همراه می‌مانیم — نه فقط مشاوره، بلکه ساخت و اجرای راهکار.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm mt-4">
                برای این منظور، روشمند ترکیبی از استراتژی و نقشه راه هوش مصنوعی، طراحی معماری سازمانی، استقرار راهکارهای عملیاتی، راه‌حل‌های مدیریت عملکرد و OKR، و توانمندسازی تیم‌های تحول را در یک مسیر یکپارچه ارائه می‌دهد. این رویکرد با تکیه بر بیش از دو دهه تجربه در برنامه‌ریزی استراتژیک، توسعه سامانه‌های سازمانی و فرهنگ دانش‌محوری تیم متخصص ما محقق می‌شود.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-medium text-white text-center mb-10">دستاوردها</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center bg-white/5 border border-white/10 rounded-2xl px-6 py-8">
                <p className="text-4xl font-bold text-emerald-400 mb-2">{value}</p>
                <p className="text-white/70 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <h2 className="text-3xl font-medium text-slate-900 mb-4">خدمات</h2>
            <p className="text-slate-600 leading-relaxed">
              حوزه‌های اصلی فعالیت روشمند در مشاوره مدیریت و تحول سازمانی
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            {services.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="px-6 py-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full text-sm font-medium hover:bg-emerald-100 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-medium text-slate-900 mb-6">اطلاعات تماس</h2>
              <ul className="space-y-5 text-slate-600">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="leading-relaxed">
                    میدان ونک، خیابان حقانی، پلاک ۴۰، ساختمان مرکز رشد علامه طباطبایی، طبقه دوم واحد ۲۳
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@raveshmand.com" className="hover:text-emerald-600 transition-colors">
                    info@raveshmand.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:02188616100" className="hover:text-emerald-600 transition-colors" dir="ltr">
                    021-88616100
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
                  برای دریافت مشاوره اولیه یا آشنایی بیشتر با راهکارهای روشمند، با ما در تماس باشید.
                </p>
                <Link
                  href="/#appointment"
                  className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-all"
                >
                  شروع گفتگو
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
