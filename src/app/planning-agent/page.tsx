import { Metadata } from 'next';
import Link from 'next/link';
import ContactTabs from '@/components/ContactTabs';
import SiteFooter from '@/components/SiteFooter';
import { PresentationSlider } from '@/components/presentation/PresentationSlider';
import { planningAgentPresentationSlides } from '@/content/planning-agent-presentation-slides';

export const metadata: Metadata = {
  title: 'دستیار هوشمند برنامه‌ریزی و مدیریت تیم — Pointer | پوینتر',
  description:
    'Pointer دستیار هوشمند برنامه‌ریزی و مدیریت تیم است؛ از حافظه استراتژیک و پیشنهاد OKR تا هم‌سویی اهداف، چک‌این هفتگی، Reflection و یادگیری سازمانی — با human-in-the-loop و توضیح‌پذیری کامل.',
  alternates: { canonical: '/planning-agent' },
  openGraph: {
    title: 'دستیار هوشمند برنامه‌ریزی و مدیریت تیم — Pointer | پوینتر',
    description:
      'پوشش کامل چرخه مدیریت عملکرد: حافظه استراتژیک، پیشنهاد هدف و KR، هم‌سویی، چک‌این و Reflection — کوچینگ هوشمند برای مدیران و تیم‌ها.',
    type: 'website',
  },
  keywords: [
    'دستیار برنامه‌ریزی هوشمند',
    'مدیریت OKR با هوش مصنوعی',
    'Pointer پوینتر',
    'هم‌سویی اهداف سازمانی',
    'چک‌این هفتگی تیم',
    'حافظه استراتژیک',
    'Reflection و یادگیری سازمانی',
  ],
};

const howItWorks = [
  {
    step: '01',
    title: 'بخش ۰ — حافظه استراتژیک',
    body: 'ثبت چشم‌انداز، مأموریت، راهبردها، اولویت‌ها و تصمیمات مهم از گفت‌وگو با مدیران، جلسات و اسناد — با ردیابی منبع، مالک و وضعیت تأیید برای زمینه‌سازی پیشنهادهای آینده.',
  },
  {
    step: '02',
    title: 'بخش ۱ — پیشنهاد هدف و OKR',
    body: 'گفت‌وگوی هدایت‌شده برای تبدیل اولویت‌ها و مسائل به اهداف و نتایج کلیدی ساختاریافته — با Baseline، Target، مالک، سطح اطمینان و رتبه‌بندی بر اساس هم‌سویی و امکان‌پذیری.',
  },
  {
    step: '03',
    title: 'بخش ۲ — هم‌سویی اهداف',
    body: 'بررسی هم‌سویی عمودی با استراتژی و اهداف بالادستی و هم‌سویی افقی با واحدهای همکار — شناسایی تعارض، هم‌پوشانی، وابستگی و پیشنهاد ادغام یا اصلاح.',
  },
  {
    step: '04',
    title: 'بخش ۳ — چک‌این و اقدامات',
    body: 'چک‌این هفتگی، مقایسه پیشرفت واقعی با زمان سپری‌شده، برنامه اقدامات دو‌هفته‌ای، تحلیل عملکرد و پیش‌نویس Feedback یا Kudos — با تأیید مدیر قبل از ارسال.',
  },
  {
    step: '05',
    title: 'بخش ۴ — Reflection و یادگیری',
    body: 'بازنگری پایان دوره، ثبت آموخته‌ها در حافظه سازمانی، بررسی ارتباط با اهداف بلندمدت و پیشنهاد اهداف دوره بعد بر اساس داده‌های واقعی — حلقه یادگیری مستمر.',
  },
];

const platformModules = [
  {
    icon: '◎',
    title: 'بخش ۰ — حافظه استراتژیک',
    audience: 'زمینه سازمانی',
    body: 'ایجاد حافظه سازمانی قابل‌اعتماد برای چشم‌انداز، مأموریت، تم‌های استراتژیک، اولویت‌ها و تصمیمات — با جداسازی کامل Tenant و ردیابی منبع و تأیید هر اطلاعات.',
  },
  {
    icon: '◈',
    title: 'بخش ۱ — پیشنهاد هدف و KR',
    audience: 'هدف‌گذاری هوشمند',
    body: 'تبدیل اولویت‌ها و تغییرات مورد انتظار به اهداف و نتایج کلیدی قابل‌اندازه‌گیری — از طریق گفت‌وگوی هدایت‌شده، رتبه‌بندی پیشنهادها و پذیرش یا ویرایش توسط کاربر.',
  },
  {
    icon: '≡',
    title: 'بخش ۲ — کنترل هم‌سویی',
    audience: 'هم‌راستایی اهداف',
    body: 'امتیازدهی هم‌سویی استراتژیک، عمودی و افقی — هشدار تعارض و وابستگی بین واحدها، نمای درختی ارتباطات و پیشنهاد ادغام یا اصلاح اهداف.',
  },
  {
    icon: '↗',
    title: 'بخش ۳ — چک‌این و تحلیل',
    audience: 'اجرا و پیگیری',
    body: 'چک‌این هفتگی، ثبت مقادیر KR، مقایسه با زمان، اقدامات دو‌هفته‌ای، تحلیل انحراف، واکنش به عملکرد ضعیف یا ویژه و داشبوردهای پیش‌بینی تحقق.',
  },
  {
    icon: '⬡',
    title: 'بخش ۴ — Reflection',
    audience: 'یادگیری سازمانی',
    body: 'جلسه بازنگری هدایت‌شده پایان دوره، ثبت آموخته‌های تأییدشده در حافظه، بررسی ارتباط با استراتژی بلندمدت و پیشنهاد برنامه دوره بعد.',
  },
];

const capabilities = [
  {
    icon: '◎',
    title: 'حافظه استراتژیک سازمان',
    body: 'ثبت و بازیابی چشم‌انداز، مأموریت، راهبردها، اولویت‌ها و تصمیمات — با منبع، مالک، تاریخ و وضعیت تأیید برای هر داده.',
  },
  {
    icon: '◈',
    title: 'پیشنهاد هوشمند هدف و KR',
    body: 'گفت‌وگوی هدایت‌شده برای تولید اهداف و نتایج کلیدی با Baseline، Target، مالک، سطح اطمینان و دلیل پیشنهاد — بدون تأیید کاربر، هدف رسمی نمی‌شود.',
  },
  {
    icon: '≡',
    title: 'هم‌سویی عمودی و افقی',
    body: 'بررسی ارتباط با استراتژی و اهداف بالادستی، شناسایی تعارض و هم‌پوشانی بین واحدها، امتیاز هم‌سویی با توضیح و پیشنهاد اصلاح.',
  },
  {
    icon: '↗',
    title: 'چک‌این و اقدامات دو‌هفته‌ای',
    body: 'پیگیری هفتگی KRها، مقایسه پیشرفت با زمان، بررسی To-Doهای قبلی و پیشنهاد برنامه عملیاتی کوتاه‌مدت متصل به اهداف.',
  },
  {
    icon: '♡',
    title: 'Reflection و یادگیری',
    body: 'بازنگری پایان دوره، ثبت دلایل موفقیت و شکست، ذخیره آموخته‌ها در حافظه و پیشنهاد اهداف دوره بعد بر اساس تجربه واقعی.',
  },
  {
    icon: '⚡',
    title: 'توضیح‌پذیری AI',
    body: 'نمایش منبع داده، فرضیات، دلیل پیشنهاد، اطلاعات ناقص و سطح اطمینان برای هر خروجی مهم هوش مصنوعی.',
  },
  {
    icon: '⬡',
    title: 'Human-in-the-loop',
    body: 'تصمیم نهایی درباره تأیید استراتژی، ایجاد هدف رسمی، Target، مالک، ارسال Feedback و ثبت آموخته همیشه با کاربر یا مدیر است.',
  },
  {
    icon: '🔒',
    title: 'چندمستاجری، حسابرسی و چندزبانگی',
    body: 'جداسازی Tenant، کنترل دسترسی بر اساس نقش، ثبت تاریخچه تمام پیشنهادها و تصمیم‌ها — با پشتیبانی فارسی و انگلیسی و RTL/LTR.',
  },
];

const differentiators = [
  {
    title: 'چرخه کامل، نه ابزار OKR ایستا',
    body: 'Pointer از حافظه استراتژیک تا Reflection پایان دوره را پوشش می‌دهد — نه فقط ثبت اهداف. همراهی مداوم در برنامه‌ریزی، اجرا، بازنگری و یادگیری.',
  },
  {
    title: 'کوچینگ هوشمند، نه فرم خالی',
    body: 'دستیار با سؤال‌های هدایت‌شده اولویت‌ها را استخراج می‌کند، اهداف پیشنهاد می‌دهد و دلیل هر پیشنهاد را توضیح می‌دهد — نه صفحه‌ای برای پر کردن دستی.',
  },
  {
    title: 'هم‌سویی فعال بین واحدها',
    body: 'تعارض، هم‌پوشانی و وابستگی بین تیم‌ها و واحدها شناسایی می‌شود — با امتیاز هم‌سویی قابل‌تفسیر و پیشنهاد ادغام یا اصلاح.',
  },
  {
    title: 'چک‌این به اقدام اجرایی',
    body: 'تحلیل پیشرفت نسبت به زمان به برنامه اقدامات دو‌هفته‌ای، واکنش به عملکرد ضعیف یا ویژه و Feedback هوشمند تبدیل می‌شود — نه گزارش‌گیری سطحی.',
  },
  {
    title: 'یادگیری سازمانی ماندگار',
    body: 'آموخته‌های تأییدشده در حافظه استراتژیک ذخیره می‌شوند و به پیشنهادهای دوره بعد متصل می‌گردند — Reflection واقعی، نه جلسه تشریفاتی.',
  },
  {
    title: 'حاکمیت و شفافیت AI',
    body: 'Human-in-the-loop، توضیح‌پذیری، چندمستاجری، حسابرسی کامل و پشتیبانی دوزبانه — طراحی‌شده برای محیط‌های سازمانی حساس.',
  },
];

const benefitsData = [
  {
    audience: 'مدیران و رهبران تیم',
    icon: '◎',
    items: [
      'پیشنهاد هدف و KR بر اساس استراتژی و اولویت‌های واقعی تیم',
      'کنترل هم‌سویی عمودی و افقی با هشدار تعارض و وابستگی',
      'چک‌این هفتگی با تحلیل پیشرفت و پیشنهاد اقدامات جبرانی',
      'Feedback و Kudos هوشمند با امکان ویرایش قبل از ارسال',
      'Reflection ساختاریافته برای تصمیم‌گیری بهتر دوره بعد',
    ],
  },
  {
    audience: 'تیم‌ها و اعضای عملیاتی',
    icon: '◈',
    items: [
      'گفت‌وگوی هدایت‌شده برای تعریف اهداف قابل‌اجرا و واقع‌بینانه',
      'شفافیت در ارتباط اهداف با استراتژی و واحدهای همکار',
      'برنامه اقدامات دو‌هفته‌ای مشخص با مجری و موعد',
      'ثبت موانع، ریسک‌ها و نیازهای حمایتی در هر چک‌این',
      'بازخورد و تقدیر مبتنی بر عملکرد واقعی',
    ],
  },
  {
    audience: 'منابع انسانی و عملکرد',
    icon: '≡',
    items: [
      'چرخه یکپارچه مدیریت عملکرد از هدف‌گذاری تا Reflection',
      'ثبت تاریخچه و حسابرسی تمام پیشنهادها و تصمیم‌ها',
      'کنترل دسترسی بر اساس نقش، Tenant و سطح محرمانگی',
      'پشتیبانی فارسی و انگلیسی برای سازمان‌های چندزبانه',
      'آموخته‌های سازمانی قابل بازیابی برای بهبود مستمر فرآیندها',
    ],
  },
  {
    audience: 'مدیریت ارشد',
    icon: '⬡',
    items: [
      'نمای یکپارچه استراتژی و حافظه تصمیمات کلیدی',
      'اطمینان از هم‌راستایی اهداف واحدها با راهبرد کلان',
      'داشبوردهای پیشرفت، ریسک و پیش‌بینی تحقق',
      'بررسی ارتباط عملکرد دوره با اهداف بلندمدت',
      'حاکمیت AI با human-in-the-loop و توضیح‌پذیری کامل',
    ],
  },
];

const outcomes = [
  {
    metric: 'هم‌راستاتر',
    label: 'اهداف و استراتژی',
    body: 'هر هدف به راهبرد و اهداف بالادستی متصل می‌شود — تعارض و هم‌پوشانی بین واحدها قبل از اجرا شناسایی می‌گردد.',
  },
  {
    metric: 'سریع‌تر',
    label: 'چرخه هدف‌گذاری',
    body: 'گفت‌وگوی هدایت‌شده و پیشنهاد هوشمند OKR زمان تعریف اهداف را کاهش می‌دهد — با کیفیت و ساختار بالاتر.',
  },
  {
    metric: 'عملی‌تر',
    label: 'پیگیری و اجرا',
    body: 'چک‌این هفتگی و اقدامات دو‌هفته‌ای تحلیل را به کار اجرایی تبدیل می‌کنند — نه گزارش‌های بی‌اثر.',
  },
  {
    metric: 'باهوش‌تر',
    label: 'یادگیری سازمانی',
    body: 'Reflection و ثبت آموخته‌ها در حافظه استراتژیک — هر دوره بر تجربه واقعی دوره قبل بنا می‌شود.',
  },
];

const trustGovernance = [
  {
    title: 'Human-in-the-loop',
    body: 'تأیید استراتژی، ایجاد هدف رسمی، Target، تغییر مالک، ارسال Feedback یا Kudos و ثبت آموخته — همه با تصمیم کاربر یا مدیر.',
  },
  {
    title: 'توضیح‌پذیری AI',
    body: 'برای هر پیشنهاد مهم: منبع اطلاعات، فرضیات، دلیل پیشنهاد، داده‌های ناقص و سطح اطمینان — شفاف و قابل‌بررسی.',
  },
  {
    title: 'چندمستاجری (Tenant)',
    body: 'جداسازی کامل اطلاعات بین Tenantها — دستیار از داده یک سازمان برای پیشنهاد به سازمان دیگر استفاده نمی‌کند.',
  },
  {
    title: 'ثبت تاریخچه و حسابرسی',
    body: 'زمان، کاربر، نسخه، منبع، وضعیت، تغییرات، درخواست AI، پاسخ پردازش‌شده و تصمیم نهایی — برای همه پیشنهادها و تصمیم‌ها.',
  },
  {
    title: 'پشتیبانی دوزبانه',
    body: 'فارسی و انگلیسی با RTL و LTR — گفت‌وگو به زبان کاربر، ترجمه صحیح اصطلاحات OKR و هماهنگی با زبان سازمان.',
  },
];

export default function PlanningAgentPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950/40" />
          <div className="absolute top-0 end-0 w-[700px] h-[700px] bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-[500px] h-[500px] bg-sky-400/8 rounded-full blur-3xl" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-sky-400/4 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between py-6 border-b border-white/10 mb-20">
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
              پوین<span className="text-sky-400">تر</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/#services" className="text-white/60 hover:text-white transition-colors text-sm hidden md:block">خدمات</Link>
              <Link href="/#products" className="text-white/60 hover:text-white transition-colors text-sm hidden md:block">محصولات</Link>
              <Link href="#contact" className="bg-sky-400 text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-sky-300 transition-colors">
                درخواست دمو ←
              </Link>
            </div>
          </nav>

          <div className="mb-6 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">خانه</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-white/70 transition-colors">محصولات</Link>
            <span>/</span>
            <span className="text-white/70">دستیار برنامه‌ریزی</span>
          </div>

          <div className="pb-24 max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="inline-block text-xs font-semibold text-sky-400 tracking-widest uppercase border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full">
                OKR
              </div>
              <div className="inline-block text-xs font-semibold text-blue-400 tracking-widest uppercase border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 rounded-full">
                تیم
              </div>
              <div className="inline-block text-xs font-semibold text-sky-300 tracking-widest uppercase border border-sky-300/30 bg-sky-300/10 px-3 py-1.5 rounded-full">
                هوش مصنوعی
              </div>
              <div className="inline-block text-xs font-semibold text-slate-400 tracking-widest uppercase border border-slate-500/30 bg-slate-500/10 px-3 py-1.5 rounded-full">
                Pointer
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl font-semibold text-white leading-[1.1] mb-6">
              دستیار هوشمند<br />
              <span className="text-sky-400">برنامه‌ریزی و مدیریت تیم</span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed mb-3 max-w-2xl">
              Pointer تمام چرخه مدیریت عملکرد را از شناخت جهت‌گیری‌های کلان سازمان تا برنامه‌ریزی، اجرا، بازنگری و یادگیری پوشش می‌دهد — با کوچینگ هوشمند برای مدیران و تیم‌ها.
            </p>
            <p className="text-white/50 leading-relaxed mb-10 max-w-2xl">
              پنج بخش اصلی: حافظه استراتژیک، پیشنهاد هدف و OKR، هم‌سویی، چک‌این و Reflection — با human-in-the-loop، توضیح‌پذیری و پشتیبانی فارسی و انگلیسی. توسعه‌یافته توسط روشمند.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="#contact"
                className="bg-sky-400 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-sky-300 transition-colors"
              >
                درخواست دمو ←
              </Link>
              <Link
                href="#solution"
                className="bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/15 transition-colors border border-white/20"
              >
                کاوش در پلتفرم
              </Link>
            </div>

            <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-3 gap-6 max-w-xl">
              {[
                { value: '۵ بخش', label: 'چرخه کامل عملکرد' },
                { value: 'OKR', label: 'هدف‌گذاری هوشمند' },
                { value: 'HITL', label: 'تصمیم با انسان' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-xl font-bold text-sky-400 mb-1">{value}</div>
                  <div className="text-xs text-white/50 leading-snug">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Platform Overview ── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4 border border-blue-200 bg-sky-50 px-3 py-1.5 rounded-full">
                Pointer چیست
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4 leading-tight">
                همراه هوشمند مدیریت عملکرد — از استراتژی تا یادگیری
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                دستیار Pointer یک عامل هوش مصنوعی سازمانی است که چرخه کامل مدیریت عملکرد را پوشش می‌دهد: حافظه استراتژیک، پیشنهاد هدف و نتیجه کلیدی، کنترل هم‌سویی، چک‌این هفتگی و Reflection پایان دوره.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm mb-4">
                برخلاف ابزارهای OKR ایستا، Pointer همراهی مداوم ارائه می‌دهد — با گفت‌وگوی هدایت‌شده، پیشنهادهای قابل‌تأیید و توضیح‌پذیر، و حلقه یادگیری که تجربیات هر دوره را به دانش سازمانی تبدیل می‌کند.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                برای سازمان‌هایی که می‌خواهند استراتژی را به اهداف قابل اجرا تبدیل کنند، تیم‌ها را هم‌راستا نگه دارند و از هر دوره عملکرد درس بگیرند — با حاکمیت AI و کنترل انسانی در هر تصمیم مهم.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'دسته محصول', value: 'دستیار هوشمند برنامه‌ریزی و مدیریت تیم' },
                { label: 'نام محصول', value: 'Pointer — پوشش کامل چرخه مدیریت عملکرد' },
                { label: 'ساختار اصلی', value: '۵ بخش: حافظه · پیشنهاد · هم‌سویی · چک‌این · Reflection' },
                { label: 'مخاطب', value: 'مدیران · تیم‌ها · HR · مدیریت ارشد' },
                { label: 'مدل استقرار', value: 'چندمستاجری · SaaS سازمانی · فارسی و انگلیسی' },
                { label: 'فلسفه طراحی', value: 'Human-in-the-loop · توضیح‌پذیری · حاکمیت داده' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs text-blue-600 font-semibold tracking-wide uppercase w-40 flex-shrink-0 pt-0.5">{label}</div>
                  <div className="text-sm text-slate-700 font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Presentation ── */}
      <section id="presentation" className="bg-slate-900 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-white">معرفی پلتفرم Pointer</h2>
            <p className="text-slate-400 mt-2 text-sm">
              برای مشاهده اسلایدها از دکمه‌ها یا کلیدهای جهت‌دار استفاده کنید
            </p>
          </div>
          <PresentationSlider slides={planningAgentPresentationSlides} theme="blue" />

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="inline-block text-xs font-semibold text-sky-400 tracking-widest uppercase mb-4 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full">
                گام بعدی
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                همین دستیار را برای تیم یا سازمان خود می‌خواهید؟
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                یک جلسه معرفی رایگان رزرو کنید تا ببینید Pointer چگونه می‌تواند چرخه مدیریت عملکرد شما را از هدف‌گذاری تا Reflection متحول کند.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#contact"
                  className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-500 transition-colors"
                >
                  درخواست دمو ←
                </Link>
                <Link
                  href="#solution"
                  className="bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/15 transition-colors border border-white/20"
                >
                  مشاهده جزئیات راهکار
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 border border-slate-300 bg-white px-3 py-1.5 rounded-full">
              مشکل
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              برنامه‌ریزی پراکنده و اهداف ناهم‌راستا — چالش‌های رایج سازمان‌ها
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl">
              بسیاری از سازمان‌ها در تبدیل استراتژی به اهداف قابل اجرا، هم‌سویی بین واحدها و پیگیری مستمر عملکرد با مشکل روبه‌رو هستند — ابزارهای فعلی اغلب ایستا و بدون کوچینگ هوشمند.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                problem: 'پراکندگی اطلاعات استراتژیک',
                detail: 'چشم‌انداز، راهبردها و تصمیمات مهم در اسناد، جلسات و ذهن مدیران پراکنده‌اند — دانش سازمانی برای پیشنهاد اهداف آینده در دسترس نیست.',
              },
              {
                problem: 'اهداف بدون ارتباط با استراتژی',
                detail: 'تیم‌ها اهداف را بدون ارتباط روشن با راهبرد کلان تعریف می‌کنند — یا اهداف بالادستی را بدون بومی‌سازی به تیم منتقل می‌کنند.',
              },
              {
                problem: 'تعارض و هم‌پوشانی بین واحدها',
                detail: 'واحدهای مختلف برای خروجی مشابه هدف تعریف می‌کنند، بر منابع مشترک رقابت می‌کنند یا بدون همکاری واحد دیگر قابل تحقق نیستند.',
              },
              {
                problem: 'چک‌این‌های سطحی',
                detail: 'جلسات پیگیری به به‌روزرسانی عدد محدود می‌شوند — بدون تحلیل انحراف، اقدامات اجرایی یا واکنش به عملکرد ضعیف یا ویژه.',
              },
              {
                problem: 'Reflection ضعیف',
                detail: 'پایان دوره بدون ثبت آموخته‌های ساختاریافته — اشتباهات دوره قبل تکرار می‌شوند و برنامه‌ریزی دوره بعد از تجربه واقعی استفاده نمی‌کند.',
              },
              {
                problem: 'ابزارهای OKR ایستا',
                detail: 'سامانه‌های فعلی فرم ثبت هدف هستند، نه همراه هوشمند — بدون پیشنهاد، هم‌سویی، کوچینگ یا یادگیری سازمانی.',
              },
            ].map(({ problem, detail }) => (
              <div key={problem} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-5 h-5 rounded-full bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  </div>
                  <p className="text-slate-900 font-semibold text-sm leading-snug">{problem}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed ps-8">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section id="solution" className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4 border border-blue-200 bg-sky-50 px-3 py-1.5 rounded-full">
                راهکار Pointer
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4 leading-tight">
                چرخه کامل مدیریت عملکرد — از استراتژی تا یادگیری
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                دستیار Pointer تمام چرخه را پوشش می‌دهد: شناخت جهت‌گیری‌های کلان، پیشنهاد هدف و KR، کنترل هم‌سویی، چک‌این و تحلیل عملکرد، و Reflection با برنامه‌ریزی دوره بعد.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                هر پیشنهاد هوش مصنوعی توضیح‌پذیر است و بدون تأیید کاربر به هدف رسمی تبدیل نمی‌شود. حافظه استراتژیک آموخته‌های هر دوره را برای پیشنهادهای آینده حفظ می‌کند.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                حلقه‌ای مداوم: حافظه استراتژیک → پیشنهاد هدف → هم‌سویی → چک‌این → Reflection → یادگیری → دوره بعد.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  title: 'حافظه استراتژیک سازمان',
                  body: 'ثبت چشم‌انداز، مأموریت، راهبردها و تصمیمات — با منبع، مالک و وضعیت تأیید برای زمینه‌سازی پیشنهادها.',
                },
                {
                  title: 'پیشنهاد هوشمند OKR',
                  body: 'گفت‌وگوی هدایت‌شده برای تولید اهداف و KR با Baseline، Target، مالک و سطح اطمینان — قابل پذیرش، ویرایش یا رد.',
                },
                {
                  title: 'کنترل هم‌سویی',
                  body: 'امتیاز هم‌سویی استراتژیک، عمودی و افقی — هشدار تعارض، وابستگی و پیشنهاد ادغام یا اصلاح.',
                },
                {
                  title: 'چک‌این و اقدامات دو‌هفته‌ای',
                  body: 'پیگیری هفتگی، مقایسه پیشرفت با زمان، برنامه عملیاتی کوتاه‌مدت و Feedback هوشمند با تأیید مدیر.',
                },
                {
                  title: 'Reflection و یادگیری',
                  body: 'بازنگری پایان دوره، ثبت آموخته‌ها در حافظه و پیشنهاد اهداف دوره بعد بر اساس داده واقعی.',
                },
                {
                  title: 'حاکمیت AI',
                  body: 'Human-in-the-loop، توضیح‌پذیری، چندمستاجری، حسابرسی و پشتیبانی فارسی و انگلیسی.',
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 mb-0.5">{title}</p>
                    <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 border border-slate-300 bg-white px-3 py-1.5 rounded-full">
              نحوه کار
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              پنج بخش — یک چرخه یکپارچه
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              از حافظه استراتژیک تا Reflection — هر بخش لایه‌ای از چرخه مدیریت عملکرد را پوشش می‌دهد.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {howItWorks.map(({ step, title, body }, i) => (
              <div key={step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 start-full w-full h-px bg-slate-200 z-0" style={{ width: 'calc(100% - 2rem)', insetInlineStart: 'calc(100% - 1rem)' }} />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 text-sky-400 flex items-center justify-center text-lg font-bold mb-5">
                    {step}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform Modules ── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4 border border-blue-200 bg-sky-50 px-3 py-1.5 rounded-full">
              ماژول‌های پلتفرم
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              پنج بخش. یک چرخه مدیریت عملکرد.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              هر بخش مرحله‌ای مشخص از چرخه را پوشش می‌دهد — همه در یک مدل داده مشترک و با حاکمیت یکسان هم‌راستا می‌مانند.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformModules.map(({ icon, title, audience, body }) => (
              <div
                key={title}
                className="border border-slate-200 rounded-xl p-6 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-2xl text-blue-600 leading-none">{icon}</div>
                  <div className="text-xs font-semibold text-slate-400 tracking-wide uppercase bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">{audience}</div>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Capabilities ── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4 border border-blue-200 bg-sky-50 px-3 py-1.5 rounded-full">
              قابلیت‌های اصلی
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              هشت قابلیت برای برنامه‌ریزی، اجرا و یادگیری
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              از حافظه استراتژیک و پیشنهاد OKR تا Reflection، توضیح‌پذیری AI و حاکمیت سازمانی — همه در یک پلتفرم.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-sky-300 hover:shadow-sm transition-all"
              >
                <div className="text-2xl text-blue-600 mb-4 leading-none">{icon}</div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Different ── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 border border-slate-300 bg-slate-50 px-3 py-1.5 rounded-full">
              چرا Pointer متفاوت است
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              همراه هوشمند عملکرد — نه فرم OKR ایستا
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl">
              Pointer ترکیبی از حافظه استراتژیک، کوچینگ هدف‌گذاری، هم‌سویی فعال، چک‌این عملیاتی و Reflection ساختاریافته است — با human-in-the-loop در هر تصمیم مهم.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map(({ title, body }) => (
              <div key={title} className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-sky-300 hover:bg-white hover:shadow-sm transition-all">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-blue-600 font-bold flex-shrink-0 text-lg mt-0.5">←</div>
                  <p className="text-slate-900 font-semibold text-sm leading-snug">{title}</p>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed ps-7">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits by Audience ── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-blue-600 tracking-widest uppercase mb-4 border border-blue-200 bg-sky-50 px-3 py-1.5 rounded-full">
              ارزش بر اساس مخاطب
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              مخاطبان مختلف. نیازهای مختلف. یک دستیار.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              Pointer به مدیران، تیم‌ها، منابع انسانی و مدیریت ارشد خدمت می‌دهد — هر کدام با ارزش متفاوت در چرخه عملکرد.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefitsData.map(({ audience, icon, items }) => (
              <div key={audience} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-sky-300 hover:shadow-sm transition-all">
                <div className="bg-slate-900 px-6 py-5 flex items-center gap-3">
                  <div className="text-xl text-sky-400">{icon}</div>
                  <h3 className="text-lg font-bold text-white">برای {audience}</h3>
                </div>
                <div className="p-6 space-y-3">
                  {items.map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <div className="w-4 h-4 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Outcomes ── */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-sky-400 tracking-widest uppercase mb-4 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full">
              نتایج طراحی‌شده
            </div>
            <h2 className="text-3xl font-semibold text-white mb-3">
              Pointer برای چه دستاوردی ساخته شده
            </h2>
            <p className="text-lg text-white/60 max-w-2xl">
              نتایجی که پلتفرم عمداً برای پشتیبانی از آن‌ها طراحی شده — بازتاب بخش‌ها و فلسفه محصول.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map(({ metric, label, body }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all">
                <div className="text-2xl font-bold text-sky-400 mb-1">{metric}</div>
                <div className="text-sm font-semibold text-white mb-3">{label}</div>
                <p className="text-sm text-white/50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust & Governance ── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="inline-block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 border border-slate-300 bg-slate-50 px-3 py-1.5 rounded-full">
                اعتماد و حاکمیت
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4 leading-tight">
                AI سازمانی — با کنترل انسانی و شفافیت کامل
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                Pointer برای محیط‌های سازمانی حساس طراحی شده — جایی که تصمیمات عملکردی و استراتژیک نیاز به حاکمیت، حسابرسی و کنترل انسانی دارند.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                تمام بخش‌ها بر پایه اصول توضیح‌پذیری، human-in-the-loop، چندمستاجری، ثبت تاریخچه و پشتیبانی دوزبانه ساخته شده‌اند.
              </p>
            </div>
            <div className="space-y-4">
              {trustGovernance.map(({ title, body }) => (
                <div key={title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-5 h-5 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{title}</p>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed ps-8">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <div className="inline-block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 border border-slate-300 bg-white px-3 py-1.5 rounded-full">
              سوالات متداول
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              پرسش‌هایی درباره Pointer
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'آیا Pointer جایگزین ابزار OKR فعلی ما می‌شود؟',
                a: 'Pointer یک دستیار هوشمند است که چرخه کامل عملکرد را پوشش می‌دهد — از حافظه استراتژیک تا Reflection. می‌تواند مکمل یا جایگزین ابزارهای ایستا باشد، بسته به نیاز سازمان.',
              },
              {
                q: 'آیا پیشنهادهای AI بدون تأیید من اعمال می‌شوند؟',
                a: 'خیر. هیچ پیشنهاد هوش مصنوعی بدون تأیید کاربر به هدف رسمی، Target یا Feedback ارسالی تبدیل نمی‌شود. Human-in-the-loop در هسته طراحی است.',
              },
              {
                q: 'چگونه هم‌سویی بین واحدهای مختلف کنترل می‌شود؟',
                a: 'بخش ۲ اهداف را با استراتژی، اهداف بالادستی و واحدهای همکار مقایسه می‌کند — تعارض، هم‌پوشانی و وابستگی را با امتیاز و توضیح نمایش می‌دهد و پیشنهاد اصلاح ارائه می‌کند.',
              },
              {
                q: 'آیا از فارسی و انگلیسی پشتیبانی می‌شود؟',
                a: 'بله. Pointer از فارسی و انگلیسی با RTL و LTR پشتیبانی می‌کند — گفت‌وگو به زبان کاربر و ترجمه صحیح اصطلاحات OKR.',
              },
              {
                q: 'اطلاعات سازمان ما با سایر مشتریان جدا است؟',
                a: 'بله. معماری چندمستاجری (Tenant) با جداسازی کامل داده — دستیار از اطلاعات یک Tenant برای پیشنهاد به Tenant دیگر استفاده نمی‌کند.',
              },
              {
                q: 'چگونه می‌توانم Pointer را امتحان کنم؟',
                a: 'برای درخواست دمو، جلسه معرفی یا بررسی فرصت استقرار — مستقیماً با روشمند تماس بگیرید.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block text-xs font-semibold text-sky-400 tracking-widest uppercase mb-6 border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 rounded-full">
              مشارکت
            </div>
            <h2 className="text-4xl font-semibold text-white mb-4">
              چرخه مدیریت عملکرد خود را متحول کنید
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              چه مدیر تیم باشید، رهبر HR یا مدیریت ارشد — گفت‌وگویی ارزشمند وجود دارد. Pointer فعالانه به دنبال سازمان‌هایی است که می‌خواهند برنامه‌ریزی هوشمند را تجربه کنند.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: 'برای مدیران و تیم‌ها',
                body: 'اگر می‌خواهید هدف‌گذاری، چک‌این و Reflection تیم خود را با کوچینگ هوشمند تقویت کنید — با ما در تماس باشید.',
                cta: 'درخواست دمو',
              },
              {
                title: 'برای منابع انسانی',
                body: 'Pointer را به‌عنوان چرخه یکپارچه مدیریت عملکرد بررسی کنید — با حاکمیت AI، حسابرسی و پشتیبانی دوزبانه.',
                cta: 'درخواست جلسه معرفی',
              },
              {
                title: 'برای مدیریت ارشد',
                body: 'Pointer سرمایه‌گذاری فعال روشمند در عامل هوشمند سازمانی است — از گفت‌وگوهای استراتژیک درباره استقرار استقبال می‌کنیم.',
                cta: 'کاوش در فرصت',
              },
            ].map(({ title, body, cta }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all">
                <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{body}</p>
                <Link
                  href="#contact-form"
                  className="text-sky-400 text-sm font-semibold hover:text-sky-300 transition-colors"
                >
                  {cta} ←
                </Link>
              </div>
            ))}
          </div>

          <div id="contact-form">
            <ContactTabs />
          </div>
        </div>
      </section>

      <SiteFooter activePage="planning-agent" />

    </div>
  );
}
