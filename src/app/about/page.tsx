import { Metadata } from 'next';
import AboutSection from '@/components/sections/about-section';
import SiteFooter from '@/components/SiteFooter';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { config } from '@/lib/config';

const siteUrl = config.siteUrl;

export const metadata: Metadata = {
  title: 'درباره روشمند',
  description:
    'شرکت مدیریت روشمند — بیش از ۲۰ سال تجربه در مشاوره مدیریت استراتژیک، برنامه‌ریزی چابک، تحول دیجیتال و توسعه راهکارهای هوش مصنوعی.',
  keywords: [
    'روشمند',
    'شرکت مدیریت روشمند',
    'مشاوره مدیریت',
    'تحول دیجیتال',
    'برنامه‌ریزی چابک',
    'OKR',
    'هوش مصنوعی',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'درباره روشمند',
    description:
      'شرکت مدیریت روشمند — تخصص در فناوری‌های مدیریتی، مشاوره استراتژیک و تحول دیجیتال با بیش از دو دهه تجربه.',
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
