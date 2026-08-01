'use client';

import { useState } from 'react';
import { getApiUrl } from '@/lib/config';

interface ContactFormProps {
  dark?: boolean;
}

export default function ContactForm({ dark = false }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'نام الزامی است';
    if (!form.email.trim()) errs.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'آدرس ایمیل نامعتبر است';
    if (!form.message.trim()) errs.message = 'پیام الزامی است';
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
      const res = await fetch(getApiUrl('/contact'), {
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
      <div className={`rounded-xl p-8 text-center ${dark ? 'bg-emerald-900/30 border border-emerald-500/30' : 'bg-emerald-50 border border-emerald-200 max-w-lg mx-auto'}`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${dark ? 'bg-emerald-500/20' : 'bg-emerald-100'}`}>
          <svg className={`w-6 h-6 ${dark ? 'text-emerald-400' : 'text-emerald-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-lg font-semibold mb-2 ${dark ? 'text-white' : 'text-emerald-900'}`}>پیام ارسال شد!</h3>
        <p className={`text-sm ${dark ? 'text-slate-400' : 'text-emerald-700'}`}>حداکثر تا یک روز کاری با شما تماس می‌گیریم.</p>
      </div>
    );
  }

  const labelClass = `block text-sm font-medium mb-1 ${dark ? 'text-slate-300' : 'text-slate-700'}`;

  const inputClass = (field: string) => {
    if (dark) {
      return `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm bg-slate-700 text-white placeholder:text-slate-500 ${
        errors[field] ? 'border-red-500' : 'border-slate-600'
      }`;
    }
    return `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm text-slate-900 ${
      errors[field] ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-white'
    }`;
  };

  const errorClass = `mt-1 text-xs ${dark ? 'text-red-400' : 'text-red-600'}`;

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${dark ? '' : 'max-w-lg mx-auto'}`}>
      <div>
        <label htmlFor="contact-name" className={labelClass}>نام</label>
        <input id="contact-name" name="name" type="text" value={form.name} onChange={handleChange}
          placeholder="نام و نام خانوادگی" className={inputClass('name')} disabled={isLoading} />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="contact-email" className={labelClass}>ایمیل</label>
        <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
          placeholder="you@example.com" className={inputClass('email')} disabled={isLoading} />
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>پیام</label>
        <textarea id="contact-message" name="message" rows={4} value={form.message} onChange={handleChange}
          placeholder="در مورد کاری که روی آن کار می‌کنید بنویسید..."
          className={inputClass('message')} disabled={isLoading} />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      {serverError && <p className={`text-sm ${dark ? 'text-red-400' : 'text-red-600'}`}>{serverError}</p>}

      <button type="submit" disabled={isLoading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm">
        {isLoading ? 'در حال ارسال...' : '← ارسال پیام'}
      </button>
    </form>
  );
}
