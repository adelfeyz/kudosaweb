'use client';

import { useState } from 'react';
import { getApiUrl } from '@/lib/config';

export default function DemoRequestForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', use_case: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'نام الزامی است';
    if (!form.email.trim()) errs.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'آدرس ایمیل نامعتبر است';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setIsLoading(true);
    setServerError('');
    try {
      const res = await fetch(getApiUrl('/demo'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setServerError(data.error || 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.');
      }
    } catch {
      setServerError('خطای شبکه. اتصال خود را بررسی کنید و دوباره تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center">
        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-emerald-900 mb-2">درخواست دمو دریافت شد!</h3>
        <p className="text-emerald-700 text-sm">حداکثر تا یک روز کاری با شما تماس می‌گیریم تا جلسه را هماهنگ کنیم.</p>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm text-slate-900 ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-name" className="block text-sm font-medium text-slate-700 mb-1">نام <span className="text-red-500">*</span></label>
          <input
            id="demo-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="نام و نام خانوادگی"
            className={inputClass('name')}
            disabled={isLoading}
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="demo-email" className="block text-sm font-medium text-slate-700 mb-1">ایمیل <span className="text-red-500">*</span></label>
          <input
            id="demo-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={inputClass('email')}
            disabled={isLoading}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="demo-company" className="block text-sm font-medium text-slate-700 mb-1">شرکت</label>
          <input
            id="demo-company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="نام شرکت"
            className={inputClass('company')}
            disabled={isLoading}
          />
        </div>

        <div>
          <label htmlFor="demo-phone" className="block text-sm font-medium text-slate-700 mb-1">تلفن</label>
          <input
            id="demo-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹"
            className={inputClass('phone')}
            disabled={isLoading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="demo-use-case" className="block text-sm font-medium text-slate-700 mb-1">چه مسئله‌ای را می‌خواهید حل کنید؟</label>
        <textarea
          id="demo-use-case"
          name="use_case"
          rows={4}
          value={form.use_case}
          onChange={handleChange}
          placeholder="به‌اختصار مورد استفاده یا مسئله‌ای که می‌خواهید با هوش مصنوعی حل کنید را توضیح دهید..."
          className={inputClass('use_case')}
          disabled={isLoading}
        />
      </div>

      {serverError && <p className="text-sm text-red-600">{serverError}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isLoading ? 'در حال ارسال...' : '← درخواست دمو'}
      </button>
    </form>
  );
}
