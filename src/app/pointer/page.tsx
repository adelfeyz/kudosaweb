import { Metadata } from 'next';
import Link from 'next/link';
import ContactTabs from '@/components/ContactTabs';
import SiteFooter from '@/components/SiteFooter';
import { PresentationSlider } from '@/components/presentation/PresentationSlider';
import { pointerPresentationSlides } from '@/content/pointer-presentation-slides';

export const metadata: Metadata = {
  title: 'پوینتر — پلتفرم مدیریت استراتژی و عملکرد | روشمند',
  description:
    'پوینتر پلتفرم جامع OKR و اجرای استراتژی است؛ از تعریف ساختار سازمان و اهداف تا Check-in، Kanban اقدامات، Analytics و Cascade اهداف — توسعه‌یافته توسط روشمند.',
  alternates: { canonical: '/pointer' },
  openGraph: {
    title: 'پوینتر — پلتفرم مدیریت استراتژی و عملکرد | روشمند',
    description:
      'تبدیل استراتژی به اهداف قابل اندازه‌گیری، هم‌راستایی تیم‌ها، پیگیری KR و داشبورد مدیریتی — یکپارچه و جایگزین اکسل.',
    type: 'website',
  },
  keywords: [
    'پلتفرم OKR',
    'مدیریت استراتژی',
    'پوینتر روشمند',
    'اجرای OKR',
    'Cascade اهداف',
    'داشبورد عملکرد',
    'Check-in هفتگی',
  ],
};

const howItWorks = [
  {
    step: '01',
    title: 'تعریف ساختار سازمان',
    body: 'ثبت سازمان‌ها، تیم‌ها و نقش‌ها — Boss، Approver، Monitor — تا سیستم بداند هر هدف به کدام بخش تعلق دارد و Cascade از سطح کلان به واحدها ممکن شود.',
  },
  {
    step: '02',
    title: 'تعریف Objective و KR',
    body: 'ایجاد اهداف استراتژیک با Key Result عددی، مالک، دوره زمانی و ماتریس مسئولیت — از فرم ساختاریافته تا نمای درختی و Gantt.',
  },
  {
    step: '03',
    title: 'هم‌راستایی و تأیید',
    body: 'اتصال اهداف تیم به اهداف سازمان، گردش کار تأیید در کارتابل و شفاف‌سازی مسئولیت‌ها قبل از ورود به فاز اجرا.',
  },
  {
    step: '04',
    title: 'اقدامات و Check-in',
    body: 'تبدیل KR به Action در Kanban، ثبت پیشرفت دوره‌ای و نمایش وضعیت On Track / At Risk — قبل از پایان فصل اصلاح مسیر.',
  },
  {
    step: '05',
    title: 'Analytics و بازنگری',
    body: 'داشبورد تحلیل، گزارش PDF، عملکرد تیم‌ها و مرور دوره‌ای — تصویر یکپارچه برای مدیران و HR.',
  },
];

const platformModules = [
  {
    icon: '◎',
    title: 'داشبورد',
    audience: 'نمای کلی',
    body: 'خلاصه OKRها، پیشرفت اهداف، اقدامات باز و فعالیت اخیر — با دسترسی سریع به ایجاد هدف، تحلیل‌ها و مدیریت تیم‌ها.',
  },
  {
    icon: '◈',
    title: 'اهداف (Objectives)',
    audience: 'هدف‌گذاری',
    body: 'فهرست، Gantt، درخت و Grid — فیلتر بر وضعیت، مالک، سازمان و دوره. فرم جامع با KR، نقش‌ها و Roll-up.',
  },
  {
    icon: '≡',
    title: 'تحلیل‌ها (Analytics)',
    audience: 'گزارش‌گیری',
    body: 'فیلتر چندبعدی، تب‌های Dashboard/Trends/Performance، جدول عملکرد تیم و خروجی PDF — بینش عملی برای تصمیم.',
  },
  {
    icon: '⬡',
    title: 'سازمان‌ها',
    audience: 'ساختار و Cascade',
    body: 'Organization، Team و Chart با سلسله‌مراتب — شکست اهداف کلان به واحدها و پایش پیشرفت هر بخش.',
  },
  {
    icon: '♡',
    title: 'کاربران',
    audience: 'دسترسی و نقش',
    body: 'مدیریت کاربران Tenant، نقش Admin/Member، دعوت و کنترل مجوزها — پایه حاکمیت برنامه‌ریزی.',
  },
  {
    icon: '↗',
    title: 'اقدامات (Kanban)',
    audience: 'اجرا',
    body: 'تخته Kanban با اولویت و مهلت، متصل به KR — کشیدن کارت بین ستون‌ها برای به‌روزرسانی وضعیت.',
  },
  {
    icon: '⚡',
    title: 'کارتابل',
    audience: 'گردش کار',
    body: 'تأیید اهداف در وضعیت Review، وظایف در انتظار و پیگیری موارد نیازمند توجه مدیر.',
  },
  {
    icon: '🔔',
    title: 'اعلان‌ها',
    audience: 'به‌روزرسانی',
    body: 'Check-in، درخواست تأیید، اختصاص و نظرات — فیلتر Unread/Read و Mark All as Read.',
  },
];

const capabilities = [
  {
    icon: '◎',
    title: 'مدیریت OKR ساختاریافته',
    body: 'Objective کیفی + Key Result عددی با مالک، دوره، سازمان و وضعیت — از پیش‌نویس تا اجرا.',
  },
  {
    icon: '◈',
    title: 'چند نمای اهداف',
    body: 'List، Gantt، Tree و Data Grid — دیدگاه مناسب برای مدیر، تیم و HR.',
  },
  {
    icon: '≡',
    title: 'Analytics جامع',
    body: 'پیشرفت اهداف و KR، عملکرد تیم، انحراف زمانی و خروجی گزارش — با فیلتر دوره و سازمان.',
  },
  {
    icon: '⬡',
    title: 'مدل سازمانی چندلایه',
    body: 'سازمان، واحد، تیم و Chart — Cascade اهداف و نقش‌های Boss، Approver و Monitor.',
  },
  {
    icon: '↗',
    title: 'Kanban اقدامات',
    body: 'اقدامات با اولویت، مهلت و لینک به KR — اجرای عملی اهداف در سطح روزمره.',
  },
  {
    icon: '♡',
    title: 'Check-in و وضعیت',
    body: 'ثبت پیشرفت دوره‌ای با نشانگر On Track / At Risk — اصلاح مسیر قبل از پایان فصل.',
  },
  {
    icon: '⚡',
    title: 'کارتابل تأیید',
    body: 'گردش کار Objective Approvals و وظایف در انتظار — حاکمیت قبل از نهایی شدن اهداف.',
  },
  {
    icon: '🔒',
    title: 'چندمستاجری (Tenant)',
    body: 'فضای کاری مستقل برای هر سازمان — داده، کاربران و پیکربندی جدا با ورود امن.',
  },
];

const differentiators = [
  {
    title: 'یکپارچه، نه پراکنده',
    body: 'اهداف، KR، اقدامات، سازمان و تحلیل در یک پلتفرم — نه فایل اکسل، Notion و ایمیل جدا از هم.',
  },
  {
    title: 'Alignment واقعی',
    body: 'اتصال عمودی اهداف سازمانی به تیم‌ها — Cascade قابل پیگیری، نه اسلاید استراتژی روی قفسه.',
  },
  {
    title: 'Check-in منظم',
    body: 'پیشرفت عددی دوره‌ای با وضعیت ریسک — مدیر زودتر متوجه انحراف می‌شود، نه آخر فصل.',
  },
  {
    title: 'ساختار سازمانی زنده',
    body: 'سازمان، تیم و نقش قبل از هدف — مسئولیت پایدار حتی با جابه‌جایی افراد.',
  },
  {
    title: 'گزارش مدیریتی',
    body: 'Analytics و PDF — تصویر واحد برای جلسات مدیریت و HR، بدون جمع‌آوری دستی.',
  },
  {
    title: 'آماده لایه هوشمند',
    body: 'پلتفرم پایه برای دستیار برنامه‌ریزی هوشمند — پیشنهاد OKR، هم‌سویی و Reflection روی همان داده.',
  },
];

const benefitsData = [
  {
    audience: 'مدیرعامل و مدیریت ارشد',
    icon: '◎',
    items: [
      'تصویر یکپارچه از پیشرفت استراتژی در Dashboard و Analytics',
      'Cascade اهداف کلان به واحدها با شفافیت مسئولیت',
      'گزارش PDF و داده برای جلسات هیئت‌مدیره',
      'اطمینان از هم‌راستایی تیم‌ها با اولویت‌های کلان',
    ],
  },
  {
    audience: 'مدیران میانی',
    icon: '◈',
    items: [
      'تعریف و پیگیری OKR تیم با فیلتر و نمای Gantt',
      'Kanban اقدامات متصل به KR — اجرای روزمره',
      'کارتابل تأیید و اعلان برای موارد در انتظار',
      'Check-in هفتگی با وضعیت ریسک',
    ],
  },
  {
    audience: 'تیم‌ها و کارشناسان',
    icon: '≡',
    items: [
      'شفافیت اهداف، KR و اقدامات اختصاص‌یافته',
      'اولویت و مهلت روشن — بدون ابهام «چه کار مهم‌تر است»',
      'ثبت پیشرفت ساده در Check-in',
      'دسترسی به ساختار سازمان و نقش‌های مرتبط',
    ],
  },
  {
    audience: 'منابع انسانی',
    icon: '⬡',
    items: [
      'چارچوب OKR یکسان در کل سازمان',
      'مدیریت کاربران، نقش‌ها و Tenant',
      'داده عملکرد برای ارزیابی دوره‌ای',
      'حاکمیت تأیید اهداف قبل از اجرا',
    ],
  },
];

const outcomes = [
  {
    metric: 'هم‌راستاتر',
    label: 'استراتژی و اجرا',
    body: 'اهداف تیم به اهداف سازمان متصل می‌شوند — Cascade قابل مشاهده در درخت و Analytics.',
  },
  {
    metric: 'شفاف‌تر',
    label: 'مسئولیت و پیشرفت',
    body: 'مالک، Approver و Monitor مشخص — پیشرفت KR با عدد و وضعیت، نه احساس کلی.',
  },
  {
    metric: 'سریع‌تر',
    label: 'گزارش و تصمیم',
    body: 'Dashboard و PDF — بدون جمع‌آوری دستی از چند فایل و ایمیل.',
  },
  {
    metric: 'پایدارتر',
    label: 'برنامه‌ریزی',
    body: 'Check-in منظم و اصلاح مسیر — برنامه از «آرزو» به «مدیریت واقعی» تبدیل می‌شود.',
  },
];

const trustGovernance = [
  {
    title: 'مدل سازمانی',
    body: 'Organization، Team و Chart با سلسله‌مراتب — پایه Cascade اهداف از کلان به واحدها و افراد.',
  },
  {
    title: 'نقش‌ها و حاکمیت',
    body: 'Boss، Representative، Approver، Actual Register و Monitor — مسئولیت تأیید، ثبت و پایش مشخص.',
  },
  {
    title: 'چندمستاجری',
    body: 'هر Tenant فضای کاری مستقل — داده، کاربران و OKRها جدا؛ مناسب هلدینگ و چند شرکت.',
  },
  {
    title: 'گردش کار تأیید',
    body: 'کارتابل Objective Approvals — اهداف قبل از اجرا بررسی و تأیید می‌شوند.',
  },
  {
    title: 'کنترل دسترسی',
    body: 'نقش Admin/Member، مدیریت کاربران و مجوزها — دسترسی بر اساس Tenant و ساختار سازمان.',
  },
];

export default function PointerPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/40" />
          <div className="absolute top-0 end-0 w-[700px] h-[700px] bg-indigo-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 start-0 w-[500px] h-[500px] bg-indigo-400/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <nav className="flex items-center justify-between py-6 border-b border-white/10 mb-20">
            <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
              روش<span className="text-indigo-400">مند</span>
            </Link>
            <div className="flex items-center gap-8">
              <Link href="/#services" className="text-white/60 hover:text-white transition-colors text-sm hidden md:block">خدمات</Link>
              <Link href="/#products" className="text-white/60 hover:text-white transition-colors text-sm hidden md:block">محصولات</Link>
              <Link href="#contact" className="bg-indigo-400 text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-300 transition-colors">
                درخواست دمو ←
              </Link>
            </div>
          </nav>

          <div className="mb-6 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white/70 transition-colors">خانه</Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-white/70 transition-colors">محصولات</Link>
            <span>/</span>
            <span className="text-white/70">پوینتر</span>
          </div>

          <div className="pb-24 max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-6">
              {['OKR', 'استراتژی', 'عملکرد'].map((tag) => (
                <div
                  key={tag}
                  className="inline-block text-xs font-semibold text-indigo-400 tracking-widest uppercase border border-indigo-400/30 bg-indigo-400/10 px-3 py-1.5 rounded-full"
                >
                  {tag}
                </div>
              ))}
            </div>

            <h1 className="text-5xl sm:text-6xl font-semibold text-white leading-[1.1] mb-6">
              پوینتر<br />
              <span className="text-indigo-400">پلتفرم استراتژی و عملکرد</span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed mb-3 max-w-2xl">
              پلتفرم جامع برای تبدیل استراتژی به اهداف قابل اندازه‌گیری، هم‌راستایی تیم‌ها، Check-in دوره‌ای و داشبورد مدیریتی — از OKR تا Kanban اقدامات.
            </p>
            <p className="text-white/50 leading-relaxed mb-10 max-w-2xl">
              Objectives، Key Results، ساختار سازمانی، Analytics و گردش کار تأیید — در یک محیط یکپارچه که جایگزین اکسل و ابزارهای پراکنده می‌شود. توسعه‌یافته توسط روشمند.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="#contact"
                className="bg-indigo-400 text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-indigo-300 transition-colors"
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
                { value: 'OKR', label: 'هدف و نتیجه کلیدی' },
                { value: '۸+', label: 'ماژول اصلی' },
                { value: 'Tenant', label: 'چندمستاجری' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="text-xl font-bold text-indigo-400 mb-1">{value}</div>
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
              <div className="inline-block text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
                پوینتر چیست
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4 leading-tight">
                از استراتژی تا اجرا — در یک پلتفرم OKR
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                پوینتر پلتفرم اجرای استراتژیک است: ثبت Objective و Key Result، ساختار سازمانی، Check-in، Kanban اقدامات، Analytics و Cascade اهداف — همه در یک مدل داده واحد.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm mb-4">
                برخلاف صفحه‌گسترده یا ابزارهای جدا، پوینتر پنج رکن برنامه‌ریزی را یکجا پوشش می‌دهد: هدف شفاف، عدد قابل اندازه‌گیری، مسئول مشخص، بازه زمانی و پیگیری منظم.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm">
                برای سازمان‌هایی که می‌خواهند استراتژی را به عمل تبدیل کنند، تیم‌ها را هم‌راستا نگه دارند و پیشرفت را با عدد ببینند — نه فقط در جلسه برنامه‌ریزی.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: 'دسته محصول', value: 'پلتفرم مدیریت استراتژی و عملکرد' },
                { label: 'نام محصول', value: 'پوینتر (Pointer)' },
                { label: 'ماژول‌های اصلی', value: 'Dashboard · Objectives · Analytics · Organizations · Actions · Cartable' },
                { label: 'مخاطب', value: 'مدیرعامل · مدیران · تیم‌ها · HR' },
                { label: 'مدل استقرار', value: 'SaaS · چندمستاجری (Tenant)' },
                { label: 'متمایز', value: 'OKR + Cascade + Check-in + Analytics یکپارچه' },
              ].map(({ label, value }) => (
                <div key={label} className="flex gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
                  <div className="text-xs text-indigo-600 font-semibold tracking-wide uppercase w-40 flex-shrink-0 pt-0.5">{label}</div>
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
            <h2 className="text-2xl font-semibold text-white">معرفی پلتفرم پوینتر</h2>
            <p className="text-slate-400 mt-2 text-sm">
              برای مشاهده اسلایدها از دکمه‌ها یا کلیدهای جهت‌دار استفاده کنید
            </p>
          </div>
          <PresentationSlider slides={pointerPresentationSlides} theme="indigo" />

          <div className="mt-12 max-w-3xl mx-auto text-center">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 md:p-10">
              <div className="inline-block text-xs font-semibold text-indigo-400 tracking-widest uppercase mb-4 border border-indigo-400/30 bg-indigo-400/10 px-3 py-1.5 rounded-full">
                گام بعدی
              </div>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                همین پلتفرم را برای سازمان خود می‌خواهید؟
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                یک جلسه معرفی رایگان رزرو کنید تا ببینید پوینتر چگونه OKR و اجرای استراتژی شما را متحول می‌کند.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="#contact"
                  className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-500 transition-colors"
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
              اهداف پراکنده، Cascade ضعیف و پیگیری نامنظم
            </h2>
            <p className="text-lg text-slate-500 max-w-3xl">
              بسیاری از سازمان‌ها «برنامه» دارند — اما بین نوشتن هدف و اجرای قابل اندازه‌گیری فاصله است. اکسل، جلسات و ابزارهای جدا این شکاف را پر نمی‌کنند.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                problem: 'عدم هم‌راستایی (Misalignment)',
                detail: 'تیم‌ها مسیر خود را می‌روند؛ اهداف فردی به اهداف سازمانی متصل نیستند و انرژی صرف فعالیت می‌شود، نه نتیجه.',
              },
              {
                problem: 'شفاف نبودن اولویت‌ها',
                detail: 'همه مشغول‌اند اما معلوم نیست کدام کار مهم‌تر است — KR و Action مشخص نیست.',
              },
              {
                problem: 'نبود پیگیری منظم',
                detail: 'هدف تعیین می‌شود اما Check-in انجام نمی‌شود — مدیر آخر فصل با غافلگیری روبه‌رو می‌شود.',
              },
              {
                problem: 'Cascade ناممکن در اکسل',
                detail: 'شکست هدف کلان به واحدها در فایل پراکنده عملی نیست — نسخه‌های مختلف و گزارش‌گیری سخت.',
              },
              {
                problem: 'مسئولیت مبهم',
                detail: 'مالک، Approver و ثبت‌کننده عملکرد مشخص نیست — پیگیری و پاسخگویی ضعیف.',
              },
              {
                problem: 'بدون تصویر یکپارچه',
                detail: 'داده در جلسات، ایمیل و صفحه‌گسترده — Dashboard و Analytics زنده وجود ندارد.',
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
              <div className="inline-block text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
                راهکار پوینتر
              </div>
              <h2 className="text-3xl font-semibold text-slate-900 mb-4 leading-tight">
                پلتفرم یکپارچه — از OKR تا Analytics
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                پوینتر اهداف را در ساختار واحد ثبت می‌کند، Alignment بین سطوح سازمان برقرار می‌کند، Check-in دوره‌ای را ممکن می‌سازد و از Dashboard تصویر شفاف ارائه می‌دهد.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                ساختار سازمان و نقش‌ها قبل از هدف تعریف می‌شوند — Cascade دقیق‌تر و مسئولیت پایدارتر.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                حلقه: سازمان → Objective/KR → Action → Check-in → Analytics → بازنگری دوره.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Dashboard یکپارچه', body: 'خلاصه OKR، پیشرفت، اقدامات و فعالیت — نقطه شروع روزانه مدیر.' },
                { title: 'Objectives و KR', body: 'فرم ساختاریافته، چند نمای لیست/Gantt/Tree و Roll-up.' },
                { title: 'Analytics', body: 'عملکرد تیم، فیلتر چندبعدی و خروجی PDF.' },
                { title: 'سازمان و کاربران', body: 'Cascade، نقش Boss/Approver و مدیریت Tenant.' },
                { title: 'Kanban و کارتابل', body: 'اجرای Action و گردش تأیید اهداف.' },
                { title: 'اعلان‌ها', body: 'به‌روزرسانی Check-in، تأیید و اختصاص — بدون از دست رفتن مورد.' },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4">
                  <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              پنج گام — از ساختار سازمان تا Analytics
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              چرخه‌ای که پوینتر برای اجرای OKR و استراتژی پشتیبانی می‌کند.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {howItWorks.map(({ step, title, body }, i) => (
              <div key={step} className="relative">
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 start-full w-full h-px bg-slate-200 z-0" style={{ width: 'calc(100% - 2rem)', insetInlineStart: 'calc(100% - 1rem)' }} />
                )}
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 text-indigo-400 flex items-center justify-center text-lg font-bold mb-5">
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
            <div className="inline-block text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
              ماژول‌های پلتفرم
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              هشت ماژول. یک پلتفرم OKR.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl">
              هر بخش مرحله‌ای از چرخه استراتژی تا اجرا را پوشش می‌دهد — در یک رابط واحد.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformModules.map(({ icon, title, audience, body }) => (
              <div
                key={title}
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
              >
                <div className="text-2xl mb-3">{icon}</div>
                <div className="text-xs text-indigo-600 font-semibold mb-1">{audience}</div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Capabilities ── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 border border-slate-300 bg-white px-3 py-1.5 rounded-full">
              قابلیت‌های کلیدی
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              آنچه پوینتر در عمل ارائه می‌دهد
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map(({ icon, title, body }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-6">
                <div className="text-xl mb-3">{icon}</div>
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
            <div className="inline-block text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-4 border border-indigo-200 bg-indigo-50 px-3 py-1.5 rounded-full">
              تمایز
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              چرا پوینتر، نه اکسل یا ابزارهای جدا
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map(({ title, body }) => (
              <div key={title} className="border border-slate-200 rounded-xl p-6 hover:border-indigo-200 transition-colors">
                <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits by Audience ── */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <div className="inline-block text-xs font-semibold text-slate-500 tracking-widest uppercase mb-4 border border-slate-300 bg-white px-3 py-1.5 rounded-full">
              مزایا بر اساس مخاطب
            </div>
            <h2 className="text-3xl font-semibold text-slate-900 mb-3">
              ارزش پوینتر برای هر نقش
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {benefitsData.map(({ audience, icon, items }) => (
              <div key={audience} className="bg-white border border-slate-200 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{icon}</span>
                  <h3 className="text-lg font-semibold text-slate-900">{audience}</h3>
                </div>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item} className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0 mt-2" />
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
            <div className="inline-block text-xs font-semibold text-indigo-400 tracking-widest uppercase mb-4 border border-indigo-400/30 bg-indigo-400/10 px-3 py-1.5 rounded-full">
              نتایج طراحی‌شده
            </div>
            <h2 className="text-3xl font-semibold text-white mb-3">
              پوینتر برای چه دستاوردی ساخته شده
            </h2>
            <p className="text-lg text-white/60 max-w-2xl">
              نتایجی که پلتفرم عمداً برای پشتیبانی از آن‌ها طراحی شده.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outcomes.map(({ metric, label, body }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all">
                <div className="text-2xl font-bold text-indigo-400 mb-1">{metric}</div>
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
                ساختار سازمان — پایه Cascade و مسئولیت
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-4">
                قبل از تعریف اهداف، پوینتر ساختار سازمان و نقش‌ها را مدل می‌کند — تا Cascade دقیق، تأیید شفاف و ثبت عملکرد قابل اتکا باشد.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Organization، Team، Boss، Approver و Monitor — مفاهیم حاکمیت برنامه‌ریزی در یک Tenant مستقل.
              </p>
            </div>
            <div className="space-y-4">
              {trustGovernance.map(({ title, body }) => (
                <div key={title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
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

      {/* ── Planning Agent Link ── */}
      <section className="bg-indigo-50 py-16 border-t border-indigo-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block text-xs font-semibold text-indigo-600 tracking-widest uppercase mb-4 border border-indigo-200 bg-white px-3 py-1.5 rounded-full">
            لایه هوشمند
          </div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            دستیار هوشمند برنامه‌ریزی
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            پوینتر پلتفرم OKR و اجرا است؛{' '}
            <Link href="/planning-agent" className="text-indigo-600 font-semibold hover:text-indigo-500">
              دستیار هوشمند
            </Link>{' '}
            لایه AI روی همان داده — پیشنهاد OKR، هم‌سویی، Check-in کوچینگ و Reflection. دو محصول مکمل، یک اکوسیستم.
          </p>
          <Link
            href="/planning-agent"
            className="inline-flex bg-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-indigo-500 transition-colors"
          >
            معرفی دستیار هوشمند ←
          </Link>
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
              پرسش‌هایی درباره پوینتر
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'تفاوت پوینتر با دستیار هوشمند برنامه‌ریزی چیست؟',
                a: 'پوینتر پلتفرم OKR، ساختار سازمان، Dashboard و Analytics است. دستیار هوشمند لایه AI برای پیشنهاد هدف، هم‌سویی و Reflection روی همان پلتفرم — مکمل یکدیگر.',
              },
              {
                q: 'آیا می‌تواند جایگزین اکسل OKR شود؟',
                a: 'بله. پوینتر یکپارچگی، Cascade، Check-in و گزارش را در یک محیط فراهم می‌کند — بدون نسخه پراکنده و جمع‌آوری دستی.',
              },
              {
                q: 'چندمستاجری (Tenant) چگونه کار می‌کند؟',
                a: 'هر Tenant فضای کاری مستقل است — داده، کاربران و اهداف جدا. مناسب هلدینگ یا چند شرکت در یک استقرار.',
              },
              {
                q: 'Cascade اهداف چگونه پشتیبانی می‌شود؟',
                a: 'با ساختار Organization/Team و اهداف Roll-up — اهداف کلان به واحدها شکسته می‌شوند و در Analytics قابل پایش هستند.',
              },
              {
                q: 'Check-in و وضعیت ریسک چگونه است؟',
                a: 'پیشرفت KR دوره‌ای ثبت می‌شود و وضعیت On Track / At Risk نمایش داده می‌شود — برای اصلاح مسیر قبل از پایان فصل.',
              },
              {
                q: 'چگونه دمو بگیرم؟',
                a: 'از فرم تماس پایین صفحه یا مستقیم با روشمند — جلسه معرفی و بررسی نیاز سازمان.',
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
            <div className="inline-block text-xs font-semibold text-indigo-400 tracking-widest uppercase mb-6 border border-indigo-400/30 bg-indigo-400/10 px-3 py-1.5 rounded-full">
              مشارکت
            </div>
            <h2 className="text-4xl font-semibold text-white mb-4">
              OKR و اجرای استراتژی خود را متحول کنید
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              چه مدیرعامل باشید، رهبر HR یا مدیر واحد — گفت‌وگویی ارزشمند وجود دارد. پوینتر برای سازمان‌هایی است که می‌خواهند برنامه را به عدد و عمل تبدیل کنند.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: 'برای مدیریت ارشد',
                body: 'Dashboard و Analytics برای تصویر یکپارچه استراتژی — Cascade و گزارش PDF.',
                cta: 'درخواست دمو',
              },
              {
                title: 'برای HR و برنامه‌ریزی',
                body: 'چارچوب OKR یکسان، Tenant و حاکمیت تأیید — داده برای ارزیابی دوره‌ای.',
                cta: 'درخواست جلسه معرفی',
              },
              {
                title: 'برای مدیران واحد',
                body: 'Objectives، Kanban و Check-in برای تیم — اجرای روزمره متصل به KR.',
                cta: 'کاوش در پلتفرم',
              },
            ].map(({ title, body, cta }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all">
                <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{body}</p>
                <Link
                  href="#contact-form"
                  className="text-indigo-400 text-sm font-semibold hover:text-indigo-300 transition-colors"
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

      <SiteFooter activePage="pointer" />

    </div>
  );
}
