const FooterSection = () => {
  const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });

  return (
    <footer className="bg-slate-950 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-1">
            <span className="text-xl font-bold text-white mb-3 block">کادوسا</span>
            <p className="text-sm text-slate-500 leading-relaxed">
              اپلیکیشن بازی‌وارسازی برای بهبود عملکرد افراد و تیم‌ها در سازمان.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">راه حل ها</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/#solutions" className="hover:text-emerald-400 transition-colors">
                  ویژگی‌های کادوسا
                </a>
              </li>
              <li>
                <a href="/#game-flow" className="hover:text-emerald-400 transition-colors">
                  جریان بازی
                </a>
              </li>
              <li>
                <a href="/#how-to-start" className="hover:text-emerald-400 transition-colors">
                  چگونه شروع کنیم
                </a>
              </li>
              <li>
                <a href="/#faq" className="hover:text-emerald-400 transition-colors">
                  سوالات متداول
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">شرکت</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="hover:text-emerald-400 transition-colors">
                  درباره کادوسا
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-emerald-400 transition-colors">
                  تماس با ما
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                  حریم خصوصی
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">منابع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/blog" className="hover:text-emerald-400 transition-colors">
                  بلاگ
                </a>
              </li>
              <li>
                <a href="/#demo" className="hover:text-emerald-400 transition-colors">
                  رزرو دمو آنلاین
                </a>
              </li>
              <li>
                <a href="/#appointment" className="hover:text-emerald-400 transition-colors">
                  درخواست مشاوره
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8">
          <p className="text-xs text-slate-600">© {year} ارائه شده در کادوسا</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
