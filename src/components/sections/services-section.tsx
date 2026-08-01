'use client';

import React from 'react';
import Image from 'next/image';
import { Target, TrendingUp, BarChart3, CheckSquare, LayoutDashboard, FileText } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'شکست استراتژی به اهداف',
    description: 'استراتژی شرکت با هر متدی تدوین شده باشد شما می توانید مطابق سند مدون تا لایه اقدامات، استراتژی خود را در نرم افزار ثبت و جهت اجرا آماده نمایید. سند استراتژیک سازمان به تفکیک و با دسته بندی های شخصی سازی شده قابل پیاده سازی است',
    image: '/benefits/strategic-planning.png',
    icon: Target,
  },
  {
    id: 2,
    title: 'مدیریت و پایش آنلاین اهداف',
    description: 'شفافیت در نقش ها و مسولیت ها به سازمان این امکان را می دهد که علاوه بر شکست استراتژی به اهداف میان مدت و کوتاه مدت و تخصیص آن به دپارتمان ها و افراد مختلف، میزان تحقق اهداف را رصد و ریسک های ممکن را مدیریت نماید.',
    image: '/benefits/goals.png',
    icon: TrendingUp,
  },
  {
    id: 3,
    title: 'ایجاد تارگت میانی برای اهداف',
    description: 'اهداف بلند مدت معمولا میزان پیشرفت یکسانی در دوره های مختلف ندارند و لازم است که تارگت های میانی برای دوره های پایش هدف با واقع بینی انتخاب وعملکرد دوره بر اساس اعداد درست نمایش داده شود. گزارش عملکرد بازه ها بر اساس آخرین تارگت میانی خواهد بود',
    image: '/benefits/target.png',
    icon: BarChart3,
  },
  {
    id: 4,
    title: 'مدیریت اقدامات',
    description: 'ماژول اقدامات به کاربران و مدیران امکان می دهد تا علاوه بر تعریف اقدامات متصل به اهداف، لیست هایی از اقداماتی مجزا برای افراد تعریف و پایش نمایند. تنظیم تاریخ سررسید اقدام و زیر اقدام، گزارش دقیق تری از فعالیت افراد ارائه خواهد نمود.',
    image: '/benefits/actions.png',
    icon: CheckSquare,
  },
  {
    id: 5,
    title: 'داشبورد مدیریتی',
    description: 'داشبورد مدیریتی ابزاریست در دست مدیران سازمان تا در لحظه و به صورت آنلاین از وضعیت تحقق اهداف سازمان خود اطلاع داشته و گزارشات مورد نیاز خود را با فیلتر دلخواه اخذ نمایند. گزارشات قابلیت ارائه به صورت PDF و اکسل را دارند',
    image: '/benefits/dashboard.png',
    icon: LayoutDashboard,
  },
  {
    id: 6,
    title: 'گزارشات',
    description: 'علاوه بر گزارشات ارائه شده بر روی نرم افزار که به صورت برخط امکان کنترل مداوم اولویت ها را فراهم می کند، کاربر قادر است گزارشاتی را بر اساس سلیقه و نیاز خود طراحی نماید. گزارشات این بخش قابلیت تبدیل به پاورپوینت را دارند.',
    image: '/benefits/reports.png',
    icon: FileText,
  },
];

export default function ServicesSection() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group"
                >
                  {/* Icon */}
                  <div className="p-6 pb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-iran-sans text-xl font-semibold text-charcoal-black mb-3">
                      {feature.title}
                    </h3>
                    
                    {/* Separator */}
                    <div className="bg-primary h-[2px] w-16 mb-4"></div>
                    
                    {/* Description */}
                    <p className="font-iran-sans text-sm text-gray-600 leading-relaxed mb-4">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Image */}
                  <div className="mt-auto">
                    <div className="relative w-full h-32 bg-gray-50">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
