const FooterSection = () => {
  const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });

  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-white mb-3 block">
              پوین<span className="text-emerald-400">تر</span>
            </span>
            <p className="text-sm text-slate-500 leading-relaxed">
              نخستین نرم‌افزار مبتنی بر OKR در ایران. ابزار برنامه‌ریزی چابک برای تنظیم، پیگیری، مدیریت و جاری‌سازی استراتژی، اهداف و عملکرد سازمان.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">خدمات</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#features" className="hover:text-emerald-400 transition-colors">شکست استراتژی به اهداف</a></li>
              <li><a href="/#features" className="hover:text-emerald-400 transition-colors">مدیریت و پایش آنلاین اهداف</a></li>
              <li><a href="/#features" className="hover:text-emerald-400 transition-colors">مدیریت اقدامات</a></li>
              <li><a href="/#features" className="hover:text-emerald-400 transition-colors">داشبورد مدیریتی</a></li>
              <li><a href="/#features" className="hover:text-emerald-400 transition-colors">گزارشات</a></li>
              <li><a href="/#pricing" className="hover:text-emerald-400 transition-colors">قیمت‌گذاری</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">شرکت</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-emerald-400 transition-colors">درباره پوینتر</a></li>
              <li><a href="/#faq" className="hover:text-emerald-400 transition-colors">سوالات متداول</a></li>
              <li><a href="/#customers" className="hover:text-emerald-400 transition-colors">مشتریان</a></li>
              <li><a href="/contact" className="hover:text-emerald-400 transition-colors">تماس با ما</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">منابع</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog" className="hover:text-emerald-400 transition-colors">مرکز دانش پوینتر</a></li>
              <li><a href="/planning-agent" className="hover:text-emerald-400 transition-colors">دستیار برنامه‌ریزی</a></li>
              <li><a href="/pointer" className="hover:text-emerald-400 transition-colors">پوینتر</a></li>
              <li><a href="/#demo" className="hover:text-emerald-400 transition-colors">درخواست دمو</a></li>
              <li><a href="/#appointment" className="hover:text-emerald-400 transition-colors">درخواست مشاوره</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8">
          <p className="text-xs text-slate-600">© {year} پوینتر. تمام حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
