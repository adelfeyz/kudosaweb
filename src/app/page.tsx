import { Metadata } from 'next';
import Link from 'next/link';
import { getThumbnailUrl } from '@adelfeyz/sdk';
import { blogAPI, blogUtils } from '@/lib/blog';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import DemoRequestForm from '@/components/demo/DemoRequestForm';
import ContactTabs from '@/components/ContactTabs';
import SiteFooter from '@/components/SiteFooter';
import { Building, Building2, Check, Server } from 'lucide-react';
import FAQSection from '@/components/seo/FAQSection';
import {
  POINTER_LOGIN_URL,
  POINTER_VIDEO_URL,
  customerLogos,
  faqItems,
  features,
  hero,
  pricingPlans,
  processHighlights,
  processSteps,
  type PricingPlan,
} from '@/content/pointer-home';

const pricingIcons = {
  building2: Building2,
  building: Building,
  server: Server,
} as const;

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'نرم افزار مدیریت استراتژیک پوینتر - جاری سازی استراتژی مدیریت اهداف',
  description:
    'نرم‌افزار مدیریت استراتژیک و ارزیابی عملکرد پوینتر — ابزار برنامه‌ریزی چابک به روش OKR برای تنظیم، پیگیری، مدیریت و جاری‌سازی استراتژی، اهداف و عملکرد سازمان.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'نرم افزار مدیریت استراتژیک پوینتر - جاری سازی استراتژی مدیریت اهداف',
    description:
      'بهترین، ساده‌ترین و کامل‌ترین ابزار جاری‌سازی استراتژی، اهداف، پروژه و اقدامات با روش OKR.',
    type: 'website',
  },
};

function PricingCard({ plan }: { plan: PricingPlan }) {
  const Icon = pricingIcons[plan.icon];

  return (
    <article
      className={`relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
        plan.highlighted ? 'ring-2 ring-primary scale-105 md:scale-110 z-10' : ''
      }`}
    >
      {plan.highlighted && (
        <div className="absolute top-0 end-0 bg-primary text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
          محبوب‌ترین
        </div>
      )}

      <div className="p-8 flex flex-col flex-grow">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-4">{plan.title}</h3>

        <div className="mb-6">
          {plan.contactPrice ? (
            <p className="text-2xl font-bold text-primary">{plan.contactPrice}</p>
          ) : (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-primary">{plan.priceAmount}</span>
                <span className="text-lg text-gray-600">{plan.priceUnit}</span>
              </div>
              {plan.priceNote && (
                <p className="text-sm text-gray-500 mt-2">{plan.priceNote}</p>
              )}
            </div>
          )}
        </div>

        <div className="bg-gray-200 h-px w-full mb-6" />

        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">{plan.description}</p>
        {plan.subtitle && (
          <p className="text-sm text-gray-500 leading-relaxed mb-6 italic">{plan.subtitle}</p>
        )}

        <ul className="space-y-3 mb-8">
          {plan.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span className="text-sm text-gray-700">{bullet}</span>
            </li>
          ))}
        </ul>

        <Link
          href={plan.ctaHref}
          className={`mt-auto w-full text-center font-semibold py-4 px-6 rounded-full transition-all duration-300 ${
            plan.ctaPrimary
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
              : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
          }`}
        >
          {plan.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

export default async function HomePage() {
  let latestPosts: Awaited<ReturnType<typeof blogAPI.getPosts>>['posts'] = [];
  try {
    const { posts } = await blogAPI.getPosts({
      status: 'published',
      limit: 3,
      sort_by: 'published_at',
      sort_order: 'desc',
    });
    latestPosts = posts;
  } catch {
    // Fall back to empty list if API is unavailable
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950" />
          <div className="absolute top-0 end-0 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center pb-24">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
                <span className="text-sm text-indigo-300">{hero.badge}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-[1.4] mb-4">
                {hero.title}
              </h1>

              <p className="text-xl text-indigo-300 font-medium mb-4">{hero.subtitle}</p>

              <p className="text-lg text-white/75 leading-relaxed mb-8 max-w-xl">
                {hero.description}
              </p>

              <div className="flex gap-4 flex-wrap">
                <a
                  href={POINTER_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/30"
                >
                  {hero.loginLabel}
                </a>
                <a
                  href="#demo"
                  className="bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/15 transition-all border border-white/20"
                >
                  {hero.demoLabel}
                </a>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm">
                <img
                  src={hero.mobileImage}
                  alt="نرم‌افزار پوینتر"
                  className="w-full h-auto drop-shadow-2xl"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <a
                    href={POINTER_VIDEO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-indigo-700 shadow-xl hover:scale-105 transition-transform"
                    aria-label="پخش ویدیو معرفی"
                  >
                    <svg className="h-7 w-7 ms-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Features ── */}
      <section id="features" className="relative bg-gradient-to-b from-white via-slate-50/80 to-white py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-14 text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 leading-tight">
              ویژگی‌های نرم‌افزار مدیریت استراتژیک پوینتر
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ title, description, image }) => (
              <article
                key={title}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                <div className="aspect-[2/1] overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 leading-snug">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="relative bg-gray-50 py-24 md:py-32 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
              پلن‌های قیمت‌گذاری
            </h2>
            <div className="bg-primary h-0.5 w-24 mx-auto mb-6" />
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              انتخاب پلن مناسب برای نیازهای سازمان شما
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.title} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqItems} title="سوالات متداول" className="bg-gray-50" />

      {/* ── Customers ── */}
      <section id="customers" className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">مشتریان ما</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6 items-center">
            {customerLogos.map(({ name, image }) => (
              <div
                key={name}
                className="flex items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50 hover:border-indigo-200 hover:shadow-sm transition-all"
              >
                <img
                  src={image}
                  alt={name}
                  title={name}
                  className="max-h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10 text-center mx-auto">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
              نرم‌افزار مدیریت استراتژیک پوینتر
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              کار با نرم‌افزار مدیریت استراتژیک پوینتر بسیار ساده است؛ سازمان شما تنها با طی یک فرایند ۵ مرحله‌ای،
              به شیوه‌ای خروجی‌محور عمل خواهد کرد و اجرای استراتژی در سازمان به نتایج شگفت‌انگیز منجر خواهد شد.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {processHighlights.map((item) => (
              <span
                key={item}
                className="px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {processSteps.map(({ step, title, description }) => (
              <article
                key={step}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold mb-4">
                  {step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>

          <div className="text-center">
            <a
              href="#demo"
              className="inline-flex bg-indigo-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-400 transition-colors"
            >
              درخواست دمو
            </a>
          </div>
        </div>
      </section>

      {/* ── Demo Request ── */}
      <section id="demo" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block text-xs font-semibold text-indigo-600 mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
                دموی ۱۴ روزه
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">آن را در عمل ببینید</h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                می‌خواهید ببینید پوینتر چگونه جاری‌سازی استراتژی و مدیریت OKR را در سازمان شما متحول می‌کند؟
                در یک دمو زنده متناسب با نیاز سازمان خود راهنمایی‌تان می‌کنیم.
              </p>
              <ul className="space-y-2 text-sm text-slate-500">
                {[
                  'دموی رایگان ۱۴ روزه نرم‌افزار',
                  'متناسب با ساختار و اندازه سازمان شما',
                  'گفتگوی مستقیم با تیم پشتیبانی',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-indigo-500 font-bold mt-0.5 flex-shrink-0">←</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <DemoRequestForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Insights (Blog Gallery) ── */}
      {latestPosts.length > 0 && (
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-2">مرکز دانش پوینتر</h2>
                <p className="text-slate-500">هر آنچه باید درباره اهداف و نتایج کلیدی بدانید</p>
              </div>
              <Link href="/blog" className="text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium">
                مشاهده همه مطالب ←
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="h-44 overflow-hidden bg-slate-100 flex items-center justify-center text-slate-300">
                    {post.featured_image_url ? (
                      <img
                        src={getThumbnailUrl(post.featured_image_url)}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-slate-400 mb-2">
                      {post.published_at ? blogUtils.formatDate(post.published_at) : ''}
                      {post.reading_time ? ` · ${post.reading_time} دقیقه مطالعه` : ''}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter ── */}
      <section id="newsletter" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block text-xs font-semibold text-indigo-600 mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
            خبرنامه
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 mb-3">عضویت در خبرنامه</h2>
          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            در خبرنامه ما عضو شوید تا در آخرین اخبار دنیای استراتژی به‌روز باشید. بهترین نرم‌افزار مدیریت استراتژیک را از ما بخواهید.
          </p>
          <NewsletterForm
            showTitle={false}
            className="max-w-md mx-auto"
            emailLabel="آدرس ایمیل"
            emailPlaceholder="ایمیل خود را وارد کنید"
            submitLabel="عضویت در خبرنامه"
            loadingLabel="در حال ثبت..."
            privacyText="بدون اسپم — هر زمان می‌توانید لغو کنید. حریم خصوصی شما محفوظ است."
            successTitle="ثبت شد!"
            subscribeAnotherLabel="ثبت ایمیل دیگر"
            emailRequiredError="ایمیل الزامی است"
            emailInvalidError="لطفاً یک آدرس ایمیل معتبر وارد کنید"
          />
        </div>
      </section>

      {/* ── Contact & Appointment ── */}
      <section id="appointment" className="bg-slate-900 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block text-xs font-semibold text-indigo-400 mb-6 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 rounded-full">
            گفتگو را آغاز کنیم
          </div>
          <h2 className="text-4xl font-semibold text-white mb-3">
            آماده جاری‌سازی استراتژی هستید؟
          </h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
            یک جلسه مشاوره رایگان رزرو کنید یا پیام بفرستید — تیم ما در کنار شماست.
          </p>
          <ContactTabs />
        </div>
      </section>

      <SiteFooter />

    </div>
  );
}
