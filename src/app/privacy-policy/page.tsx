import { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { generateBreadcrumbSchema } from '@/lib/seo';
import { config } from '@/lib/config';

const siteUrl = config.siteUrl;

const lastUpdated = new Date().toLocaleDateString('fa-IR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

export const metadata: Metadata = {
  title: 'سیاست حریم خصوصی',
  description:
    'سیاست حریم خصوصی کادوسا — نحوه جمع‌آوری، استفاده، نگهداری و حفاظت از اطلاعات شخصی شما در وب‌سایت و خدمات ما.',
  keywords: ['حریم خصوصی', 'کادوسا', 'حفاظت از داده', 'privacy policy'],
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'سیاست حریم خصوصی | کادوسا',
    description:
      'بیاموزید کادوسا چگونه اطلاعات شخصی شما را در وب‌سایت، فرم‌های تماس، خبرنامه و خدمات مشاوره هوش مصنوعی جمع‌آوری و محافظت می‌کند.',
    url: `${siteUrl}/privacy-policy`,
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'خانه', url: '/' },
    { name: 'سیاست حریم خصوصی', url: '/privacy-policy' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <main className="min-h-screen bg-slate-50 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-sm text-emerald-600 font-medium mb-2">کادوسا</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              سیاست حریم خصوصی
            </h1>
            <p className="text-slate-500 text-sm">
              آخرین به‌روزرسانی: {lastUpdated}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10 space-y-10 text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۱. مقدمه</h2>
              <p>
                شرکت <strong>کادوسا</strong> («ما») متعهد است حریم خصوصی بازدیدکنندگان وب‌سایت و
                استفاده‌کنندگان از خدمات مشاوره، محصولات و پلتفرم‌های ما را حفظ کند. این سیاست
                توضیح می‌دهد چه اطلاعاتی جمع‌آوری می‌کنیم، چرا از آن استفاده می‌کنیم، با چه کسانی
                به اشتراک می‌گذاریم و چه حقوقی در ارتباط با داده‌های شخصی خود دارید.
              </p>
              <p className="mt-3">
                با استفاده از وب‌سایت{' '}
                <Link href="/" className="text-emerald-600 hover:underline">
                  kudosa.ir
                </Link>{' '}
                یا ارسال اطلاعات از طریق فرم‌های تماس، درخواست دمو، خبرنامه و سایر بخش‌ها، شما با
                مفاد این سیاست موافقت می‌کنید.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۲. دامنه این سیاست</h2>
              <p>این سیاست شامل موارد زیر است:</p>
              <ul className="list-disc ps-6 space-y-2 mt-3">
                <li>وب‌سایت رسمی کادوسا و صفحات مرتبط (وبلاگ، مطالعات موردی، صفحات محصول)</li>
                <li>فرم‌های تماس، درخواست مشاوره، درخواست دمو و عضویت در خبرنامه</li>
                <li>پنل مدیریت داخلی (CRM) برای کاربران مجاز سازمان</li>
                <li>خدمات مشاوره، طراحی و استقرار راهکارهای هوش مصنوعی که توسط کادوسا ارائه می‌شود</li>
              </ul>
              <p className="mt-3 text-sm text-slate-500">
                وب‌سایت‌ها یا محصولات مستقل مشتریان (مانند پلتفرم‌هایی که کادوسا در توسعه آن‌ها
                نقش داشته) ممکن است سیاست حریم خصوصی جداگانه داشته باشند.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۳. اطلاعاتی که جمع‌آوری می‌کنیم</h2>
              <p className="mb-3">بسته به نحوه تعامل شما با ما، ممکن است این اطلاعات را دریافت کنیم:</p>

              <h3 className="font-semibold text-slate-800 mb-2">۳.۱ اطلاعاتی که مستقیماً ارائه می‌دهید</h3>
              <ul className="list-disc ps-6 space-y-2">
                <li>نام، آدرس ایمیل، شماره تلفن و نام سازمان</li>
                <li>متن پیام، شرح نیاز، use case یا درخواست مشاوره</li>
                <li>ایمیل عضویت در خبرنامه</li>
                <li>اطلاعات ورود به پنل CRM (برای کاربران مجاز)</li>
              </ul>

              <h3 className="font-semibold text-slate-800 mt-5 mb-2">۳.۲ اطلاعات فنی و خودکار</h3>
              <ul className="list-disc ps-6 space-y-2">
                <li>آدرس IP، نوع مرورگر، سیستم‌عامل و دستگاه</li>
                <li>صفحات بازدید‌شده، زمان بازدید و منبع ارجاع (referrer)</li>
                <li>داده‌های تحلیلی از طریق ابزارهایی مانند Google Analytics (در صورت فعال بودن)</li>
                <li>کوکی‌ها و فناوری‌های ردیابی مشابه</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۴. نحوه استفاده از اطلاعات</h2>
              <p className="mb-3">ما از اطلاعات شما برای اهداف زیر استفاده می‌کنیم:</p>
              <ul className="list-disc ps-6 space-y-2">
                <li>پاسخ به درخواست تماس، دمو و مشاوره</li>
                <li>ارسال ایمیل تأیید خبرنامه و به‌روزرسانی‌های درخواست‌شده</li>
                <li>ارائه، بهبود و پشتیبانی از خدمات و محصولات کادوسا</li>
                <li>مدیریت امنیت وب‌سایت، جلوگیری از سوءاستفاده و محدودسازی نرخ درخواست (rate limiting)</li>
                <li>تحلیل عملکرد وب‌سایت و بهبود تجربه کاربری</li>
                <li>رعایت الزامات قانونی و حفاظت از حقوق کادوسا و کاربران</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۵. پایه قانونی پردازش</h2>
              <p>
                پردازش داده‌های شخصی شما بر اساس یک یا چند مورد زیر انجام می‌شود: رضایت شما (مثلاً
                عضویت در خبرنامه)، اجرای درخواست یا قرارداد (مثلاً پاسخ به فرم تماس)، منافع
                مشروع کادوسا (مانند امنیت و بهبود خدمات) یا رعایت تعهدات قانونی.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۶. اشتراک‌گذاری با اشخاص ثالث</h2>
              <p className="mb-3">
                ما اطلاعات شخصی شما را <strong>نمی‌فروشیم</strong>. ممکن است داده‌ها را فقط در
                موارد زیر با اشخاص ثالث به اشتراک بگذاریم:
              </p>
              <ul className="list-disc ps-6 space-y-2">
                <li>
                  <strong>ارائه‌دهندگان خدمات:</strong> مانند سرویس ایمیل (Brevo)، میزبانی
                  (Cloudflare/Docker)، و ابزارهای تحلیل — فقط در حد لازم برای ارائه خدمات
                </li>
                <li>
                  <strong>الزامات قانونی:</strong> در صورت درخواست مراجع قضایی یا مقامات ذی‌صلاح
                </li>
                <li>
                  <strong>حفاظت از حقوق:</strong> برای جلوگیری از کلاهبرداری، سوءاستفاده یا آسیب
                  به کادوسا، کاربران یا عموم
                </li>
                <li>
                  <strong>انتقال تجاری:</strong> در صورت ادغام، خرید یا واگذاری دارایی‌ها — با
                  رعایت تعهدات حریم خصوصی
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۷. داده‌های پروژه‌های مشتری</h2>
              <p>
                در پروژه‌های مشاوره و توسعه هوش مصنوعی، ممکن است به داده‌های سازمانی مشتری دسترسی
                داشته باشیم. پردازش چنین داده‌هایی تابع قرارداد جداگانه، توافق‌نامه محرمانگی (NDA)
                و الزامات امنیتی توافق‌شده با هر مشتری است و تحت این سیاست عمومی وب‌سایت قرار
                نمی‌گیرد مگر آنکه صریحاً ذکر شده باشد.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۸. امنیت داده‌ها</h2>
              <p>
                ما اقدامات فنی و سازمانی معقول برای حفاظت از اطلاعات شخصی اتخاذ
                می‌کنیم، از جمله رمزنگاری در transit (HTTPS)، کنترل دسترسی، احراز هویت پنل
                مدیریت و محدودسازی درخواست‌ها. با این حال، هیچ روش انتقال یا ذخیره‌سازی
                الکترونیکی صددرصد امن نیست و نمی‌توانیم امنیت مطلق را تضمین کنیم.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۹. مدت نگهداری</h2>
              <p>
                اطلاعات شخصی را فقط به مدت لازم برای اهداف опис‌شده در این سیاست یا طبق
                الزامات قانونی نگهداری می‌کنیم. پس از آن، داده‌ها حذف، ناشناس‌سازی یا
                بایگانی امن می‌شوند.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۱۰. حقوق شما</h2>
              <p className="mb-3">بسته به قوانین حاکم، ممکن است این حقوق را داشته باشید:</p>
              <ul className="list-disc ps-6 space-y-2">
                <li>دسترسی به نسخه‌ای از اطلاعات شخصی خود</li>
                <li>درخواست اصلاح اطلاعات نادرست یا ناقص</li>
                <li>درخواست حذف اطلاعات (در چارچوب استثناهای قانونی)</li>
                <li>اعتراض به یا محدود کردن برخی پردازش‌ها</li>
                <li>لغو رضایت (مثلاً لغو اشتراک خبرنامه)</li>
                <li>درخواست انتقال داده در قالب ساختاریافته (در صورت کاربرد)</li>
              </ul>
              <p className="mt-3">
                برای اعمال این حقوق با ما تماس بگیرید. لغو خبرنامه از طریق لینک موجود در
                ایمیل‌های خبرنامه نیز امکان‌پذیر است.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۱۱. کوکی‌ها و فناوری‌های ردیابی</h2>
              <p>
                وب‌سایت ما ممکن است از کوکی‌ها برای عملکرد پایه، تحلیل ترافیک و بهبود تجربه
                کاربری استفاده کند. می‌توانید کوکی‌ها را از طریق تنظیمات مرورگر خود مدیریت یا
                مسدود کنید؛ برخی بخش‌های وب‌سایت ممکن است در این صورت به‌درستی کار نکنند.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۱۲. حریم خصوصی کودکان</h2>
              <p>
                خدمات ما به‌طور عمده به سازمان‌ها، متخصصان و کسب‌وکارها ارائه می‌شود و عمداً
                اطلاعات شخصی کودکان زیر ۱۳ سال را جمع‌آوری نمی‌کنیم. اگر متوجه شویم چنین
                اطلاعاتی بدون رضایت والدین جمع‌آوری شده، آن را حذف خواهیم کرد.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۱۳. تغییرات این سیاست</h2>
              <p>
                ممکن است این سیاست را گاه‌به‌گاه به‌روزرسانی کنیم. نسخه جدید با تاریخ
                «آخرین به‌روزرسانی» در همین صفحه منتشر می‌شود. ادامه استفاده از وب‌سایت پس از
                تغییرات، به منزله پذیرش سیاست به‌روزشده است.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-slate-900 mb-3">۱۴. تماس با ما</h2>
              <p className="mb-4">
                برای پرسش درباره این سیاست یا درخواست مربوط به داده‌های شخصی:
              </p>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 space-y-2 text-sm">
                <p>
                  <strong className="text-slate-900">کادوسا</strong>
                </p>
                <p>
                  ایمیل:{' '}
                  <a href="mailto:info@kudosa.ir" className="text-emerald-600 hover:underline">
                    info@kudosa.ir
                  </a>
                </p>
                <p>
                  وب‌سایت:{' '}
                  <Link href="/#appointment" className="text-emerald-600 hover:underline">
                    فرم تماس
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
        <div className="mt-8">
          <SiteFooter />
        </div>
      </main>
    </>
  );
}
