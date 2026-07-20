import { Metadata } from 'next';
import FooterSection from '@/components/sections/footer-section';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { config } from '@/lib/config';
import ContactForm from '@/components/contact/ContactForm';

const siteUrl = config.siteUrl;

export const metadata: Metadata = {
  title: 'تماس با ما | پوینتر',
  description:
    'با تیم پوینتر در ارتباط باشید. سوالات، درخواست دمو یا مشاوره خود را با ما در میان بگذارید.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'تماس با ما | پوینتر',
    description:
      'با تیم پوینتر در ارتباط باشید. ما آماده پاسخگویی به سوالات و درخواست‌های شما هستیم.',
    url: `${siteUrl}/contact`,
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'خانه', url: '/' },
    { name: 'تماس با ما', url: '/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <main className="min-h-screen pt-20">
        <section className="container mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">تماس با ما</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
            با تیم پوینتر در ارتباط باشید. سوالات، پیشنهادها یا درخواست دمو و مشاوره خود را برای ما بنویسید — حداکثر تا یک روز کاری پاسخ می‌دهیم.
          </p>
          <ContactForm />
        </section>
        <FooterSection />
      </main>
    </>
  );
}
