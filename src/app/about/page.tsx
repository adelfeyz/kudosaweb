import { Metadata } from 'next';
import AboutSection from '@/components/sections/about-section';
import SiteFooter from '@/components/SiteFooter';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { config } from '@/lib/config';

const siteUrl = config.siteUrl;

export const metadata: Metadata = {
  title: 'درباره ما',
  description:
    'کادوسا؛ اپلیکیشن بازی‌وارسازی برای بهبود عملکرد افراد و تیم‌ها در سازمان.',
  keywords: [
    'کادوسا',
    'Kudosa',
    'درباره ما',
    'بازی‌وارسازی',
    'گیمیفیکیشن',
    'بهبود عملکرد',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'درباره ما — کادوسا',
    description:
      'کادوسا؛ اپلیکیشن بازی‌وارسازی برای افزایش انگیزه و بهبود عملکرد تیم.',
    url: `${siteUrl}/about`,
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'خانه', url: '/' },
    { name: 'درباره ما', url: '/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <main>
        <AboutSection />
        <SiteFooter />
      </main>
    </>
  );
}
