'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Building, Server, Check } from 'lucide-react';

const pricingPlans = [
  {
    id: 1,
    name: 'شرکت‌های کوچک و متوسط',
    description: 'نرم افزار مدیریت استراتژیک کادوسا بهترین انتخاب برای شرکت های با سایز متوسط و کوچک است که برنامه ریزی چابک و مدیریت پروژه اهمیت ویژه ای برای آنها داشته و در جاری سازی استراتژی خود از متدهای agile بهره می گیرند.',
    additionalInfo: 'ما علاوه بر همراهی در برنامه ریزی، در جاری سازی استراتژی نیز کنارتان خواهیم بود.',
    price: 'شروع قیمت از 290 هزار تومان',
    priceValue: '290,000',
    currency: 'تومان',
    icon: Building2,
    features: [
      'برنامه ریزی چابک',
      'مدیریت پروژه',
      'جاری سازی استراتژی',
      'متدهای Agile',
      'همراهی در برنامه ریزی',
    ],
    cta: 'شروع کنید',
    href: '/contact',
    popular: false,
  },
  {
    id: 2,
    name: 'سازمان‌های بزرگ',
    description: 'نرم افزار جاری سازی استراتژی کادوسا برای خدمت به سازمان های بزرگی که نیازمند ابزاری جهت ایجاد همراستایی بدنه سازمان در راستای اهداف استراتژیک و چشم انداز ها و ارزیابی علکرد هستند.',
    additionalInfo: 'هر کجای دنیا که هستید با یک کلیک از عملکرد سازمان خود مطلع شوید. جاری سازی استراتژی، دیگر سخت و ناممکن نخواهد بود.',
    price: 'شروع قیمت از 348 هزار تومان',
    priceValue: '348,000',
    currency: 'تومان',
    icon: Building,
    features: [
      'همراستایی سازمان',
      'اهداف استراتژیک',
      'ارزیابی عملکرد',
      'دسترسی آنلاین',
      'گزارشات جامع',
    ],
    cta: 'شروع کنید',
    href: '/contact',
    popular: true,
  },
  {
    id: 3,
    name: 'سرور اختصاصی یا نصب',
    description: 'نرم افزار مدیریت استراتژیک کادوسا، مناسب برای سازمان هایی که دارای محرمانگی اطلاعات می باشند و تمایل دارند که مدیریت استراتژیک و مدیریت پروژه های خود را با اطمینان کامل بر روی پلتفرم خود و بر روی سرورهای داخلی خود سازمان انجام دهند',
    additionalInfo: 'این سرویس بر روی سرورهای سازمان قابل نصب می باشد. سرور اختصاصی هم قابل تخصیص است.',
    price: 'تماس بگیرید',
    priceValue: null,
    currency: null,
    icon: Server,
    features: [
      'نصب روی سرور داخلی',
      'محرمانگی اطلاعات',
      'سرور اختصاصی',
      'کنترل کامل',
      'پشتیبانی اختصاصی',
    ],
    cta: 'تماس بگیرید',
    href: '/contact',
    popular: false,
  },
];

export default function TestimonialSection() {
  return (
    <section className="relative bg-gray-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-iran-sans text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal-black mb-4">
              پلن‌های قیمت‌گذاری
            </h2>
            <div className="bg-primary h-[2px] w-24 mx-auto mb-6"></div>
            <p className="font-iran-sans text-lg text-gray-600 max-w-2xl mx-auto">
              انتخاب پلن مناسب برای نیازهای سازمان شما
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col ${
                    plan.popular ? 'ring-2 ring-primary scale-105 md:scale-110' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-0 end-0 bg-primary text-white px-4 py-1 text-sm font-iran-sans font-semibold rounded-be-lg">
                      محبوب‌ترین
                    </div>
                  )}

                  <div className="p-8 flex flex-col flex-grow">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>

                    {/* Plan Name */}
                    <h3 className="font-iran-sans text-2xl font-bold text-charcoal-black mb-4">
                      {plan.name}
                    </h3>

                    {/* Price */}
                    <div className="mb-6">
                      {plan.priceValue ? (
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-iran-sans text-4xl font-bold text-primary">
                              {plan.priceValue}
                            </span>
                            <span className="font-iran-sans text-lg text-gray-600">
                              {plan.currency}
                            </span>
                          </div>
                          <p className="font-iran-sans text-sm text-gray-500 mt-2">
                            {plan.price}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-iran-sans text-2xl font-bold text-primary">
                            {plan.price}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Separator */}
                    <div className="bg-gray-200 h-[1px] w-full mb-6"></div>

                    {/* Description */}
                    <p className="font-iran-sans text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                      {plan.description}
                    </p>

                    {/* Additional Info */}
                    {plan.additionalInfo && (
                      <p className="font-iran-sans text-sm text-gray-500 leading-relaxed mb-6 italic">
                        {plan.additionalInfo}
                      </p>
                    )}

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="font-iran-sans text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href={plan.href}
                      className={`mt-auto w-full text-center font-iran-sans font-semibold py-4 px-6 rounded-full transition-all duration-300 ${
                        plan.popular
                          ? 'bg-primary text-white hover:bg-primary/90 shadow-md'
                          : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
                      }`}
                    >
                      {plan.cta}
                    </Link>
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
