import { Metadata } from 'next';
import Link from 'next/link';
import { Award, Gamepad2, type LucideIcon, Zap } from 'lucide-react';
import { getThumbnailUrl } from '@adelfeyz/sdk';
import { blogAPI, blogUtils } from '@/lib/blog';
import NewsletterForm from '@/components/newsletter/NewsletterForm';
import DemoRequestForm from '@/components/demo/DemoRequestForm';
import ContactTabs from '@/components/ContactTabs';
import SiteFooter from '@/components/SiteFooter';
import FAQSection from '@/components/seo/FAQSection';
import KudosaMotivationTabs from '@/components/kudosa/KudosaMotivationTabs';
import KudosaProgressBars from '@/components/kudosa/KudosaProgressBars';
import KudosaSurveyStats from '@/components/kudosa/KudosaSurveyStats';
import {
  APP_LOGIN_URL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  blogTeaser,
  competition,
  contactSection,
  culture,
  demoSection,
  faqItems,
  featureGrid,
  gameFlow,
  gamificationImpact,
  hero,
  motivationTabs,
  newsletterSection,
  performanceFactors,
  startSteps,
  surveyStats,
  valueProps,
} from '@/content/kudosa-home';

const valuePropIcons: Record<(typeof valueProps)[number]['icon'], LucideIcon> = {
  Gamepad2,
  Zap,
  Award,
};

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
  },
};

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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 pt-20">
        <div className="bg-slate-800 text-white text-center text-sm py-2.5">
          <a
            href={APP_LOGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium"
          >
            ورود به اپلیکیشن کادوسا
          </a>
        </div>
        <div
          className="absolute inset-0 top-10 opacity-[0.35] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-20 md:pt-20 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center">
              <img
                src={hero.image}
                alt="اپلیکیشن کادوسا روی موبایل و لپ‌تاپ"
                className="w-full max-w-md h-auto drop-shadow-xl"
              />
            </div>
            <div className="order-1 lg:order-2 text-center lg:text-right">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-2">
                {hero.titleLine1}
              </h1>
              <p className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6">{hero.titleLine2}</p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl ms-auto">
                {hero.subtitle}
              </p>
              <div className="flex gap-4 flex-wrap justify-center lg:justify-start">
                <a
                  href={APP_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
                >
                  {hero.loginLabel}
                </a>
                <a
                  href="#demo"
                  className="bg-slate-900 text-white px-8 py-4 rounded-full font-medium hover:bg-slate-800 transition-all"
                >
                  {hero.demoLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map(({ icon, title, description }) => {
              const Icon = valuePropIcons[icon];
              return (
                <article
                  key={title}
                  className="rounded-2xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 leading-snug">{title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competition */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-6 leading-tight">
            {competition.title}
          </h2>
          <div className="space-y-4 text-slate-600 leading-relaxed text-right">
            {competition.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Game flow */}
      <section id="game-flow" className="py-24 bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {gameFlow.map(({ title, description }, index) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification impact + feature grid */}
      <section id="solutions" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-4 leading-tight">
              {gamificationImpact.title}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">{gamificationImpact.description}</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium mb-6">
              <span className="px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                {gamificationImpact.labels.gamified}
              </span>
              <span className="px-4 py-2 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {gamificationImpact.labels.conventional}
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">{gamificationImpact.note}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureGrid.map(({ title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 hover:border-indigo-200 hover:shadow-md transition-all"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Survey stats — circular progress like kudosa.ir */}
      <KudosaSurveyStats stats={surveyStats} />

      {/* How to start — two-column like kudosa.ir */}
      <section id="how-to-start" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 mb-10 leading-tight">
                {startSteps.title}
              </h2>
              <ol className="space-y-5">
                {startSteps.steps.map((step, index) => (
                  <li key={step.slice(0, 36)} className="flex gap-4 items-start">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed pt-1.5">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={startSteps.image}
                alt="نمای اپلیکیشن کادوسا"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Motivation tabs */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <KudosaMotivationTabs tabs={motivationTabs} />
        </div>
      </section>

      {/* Culture + performance factors — two-column like kudosa.ir */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-6 leading-tight">
                {culture.title}
              </h2>
              <p className="text-slate-600 leading-relaxed text-justify">{culture.description}</p>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-8 leading-tight">
                {performanceFactors.title}
              </h2>
              <KudosaProgressBars items={performanceFactors.items} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16 pt-16 border-t border-slate-100">
            {performanceFactors.detailCards.map(({ title, description }) => (
              <article
                key={title}
                className="rounded-2xl bg-slate-50 border border-slate-200 p-6"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection faqs={faqItems} title="سوالات متداول" className="bg-white" />

      {/* Demo */}
      <section id="demo" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block text-xs font-semibold text-indigo-600 mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
                {demoSection.badge}
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">{demoSection.title}</h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">{demoSection.description}</p>
              <ul className="space-y-2 text-sm text-slate-500">
                {demoSection.bullets.map((item) => (
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

      {latestPosts.length > 0 && (
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-2">{blogTeaser.title}</h2>
                <p className="text-slate-500">{blogTeaser.subtitle}</p>
              </div>
              <Link
                href="/blog"
                className="text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium"
              >
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

      <section id="newsletter" className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block text-xs font-semibold text-indigo-600 mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
            خبرنامه
          </div>
          <h2 className="text-3xl font-semibold text-slate-900 mb-3">{newsletterSection.title}</h2>
          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto leading-relaxed">
            {newsletterSection.description}
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

      <section id="appointment" className="bg-slate-900 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block text-xs font-semibold text-indigo-400 mb-6 border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 rounded-full">
            {contactSection.badge}
          </div>
          <h2 className="text-4xl font-semibold text-white mb-3">{contactSection.title}</h2>
          <p className="text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
            {contactSection.description}
          </p>
          <ContactTabs />
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
