'use client';

import { useState } from 'react';
import { getApiUrl } from '@/lib/config';
import JalaliDatePicker from '@/components/JalaliDatePicker';

const SERVICE_TYPES = [
  { value: 'AI Strategy Consultation', label: 'مشاوره استراتژی هوش مصنوعی' },
  { value: 'Custom AI Development', label: 'توسعه سفارشی هوش مصنوعی' },
  { value: 'Process Automation', label: 'خودکارسازی فرایندها' },
  { value: 'Data & Analytics', label: 'داده و تحلیل' },
  { value: 'CRM & Integrations', label: 'CRM و یکپارچه‌سازی' },
  { value: 'Other', label: 'سایر' },
];

const TIME_SLOTS = [
  { value: 'morning', label: 'صبح (۸ تا ۱۲)' },
  { value: 'afternoon', label: 'بعدازظهر (۱۲ تا ۱۷)' },
  { value: 'evening', label: 'عصر (۱۷ تا ۲۰)' },
];

export default function AppointmentForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    preferredDate: '', preferredTime: '', serviceType: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = 'نام الزامی است';
    if (!form.lastName.trim()) errs.lastName = 'نام خانوادگی الزامی است';
    if (!form.email.trim()) errs.email = 'ایمیل الزامی است';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'آدرس ایمیل نامعتبر است';
    if (!form.phone.trim()) errs.phone = 'تلفن الزامی است';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
      const res = await fetch(getApiUrl('/appointment'), {
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
      <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-xl p-8 text-center max-w-xl mx-auto">
        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">درخواست دریافت شد!</h3>
        <p className="text-slate-400 text-sm">حداکثر تا یک روز کاری برای تأیید جلسه با شما تماس می‌گیریم.</p>
      </div>
    );
  }

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm bg-slate-800 text-white placeholder:text-slate-500 ${
      errors[field] ? 'border-red-500' : 'border-slate-700'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="appt-firstName" className="block text-sm font-medium text-slate-300 mb-1">نام <span className="text-red-400">*</span></label>
          <input id="appt-firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange}
            placeholder="علی" className={inputClass('firstName')} disabled={isLoading} />
          {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="appt-lastName" className="block text-sm font-medium text-slate-300 mb-1">نام خانوادگی <span className="text-red-400">*</span></label>
          <input id="appt-lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange}
            placeholder="محمدی" className={inputClass('lastName')} disabled={isLoading} />
          {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="appt-email" className="block text-sm font-medium text-slate-300 mb-1">ایمیل <span className="text-red-400">*</span></label>
          <input id="appt-email" name="email" type="email" value={form.email} onChange={handleChange}
            placeholder="you@example.com" className={inputClass('email')} disabled={isLoading} />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="appt-phone" className="block text-sm font-medium text-slate-300 mb-1">تلفن <span className="text-red-400">*</span></label>
          <input id="appt-phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
            placeholder="۰۹۱۲ ۳۴۵ ۶۷۸۹" className={inputClass('phone')} disabled={isLoading} />
          {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="appt-date" className="block text-sm font-medium text-slate-300 mb-1">تاریخ ترجیحی</label>
          <JalaliDatePicker
            id="appt-date"
            value={form.preferredDate}
            onChange={(preferredDate) => {
              setForm(prev => ({ ...prev, preferredDate }));
              setErrors(prev => ({ ...prev, preferredDate: '' }));
              setServerError('');
            }}
            placeholder="انتخاب تاریخ"
            disabled={isLoading}
            className="bg-slate-800 text-white"
            hasError={!!errors.preferredDate}
          />
        </div>
        <div>
          <label htmlFor="appt-time" className="block text-sm font-medium text-slate-300 mb-1">ساعت ترجیحی</label>
          <select id="appt-time" name="preferredTime" value={form.preferredTime} onChange={handleChange}
            className={inputClass('preferredTime')} disabled={isLoading}>
            <option value="">انتخاب بازه زمانی</option>
            {TIME_SLOTS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="appt-service" className="block text-sm font-medium text-slate-300 mb-1">حوزه خدمات</label>
        <select id="appt-service" name="serviceType" value={form.serviceType} onChange={handleChange}
          className={inputClass('serviceType')} disabled={isLoading}>
          <option value="">انتخاب حوزه خدمات</option>
          {SERVICE_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="appt-message" className="block text-sm font-medium text-slate-300 mb-1">چیز دیگری هست که باید بدانیم؟</label>
        <textarea id="appt-message" name="message" rows={3} value={form.message} onChange={handleChange}
          placeholder="به‌اختصار درباره پروژه یا اهداف خود بنویسید..."
          className={inputClass('message')} disabled={isLoading} />
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold py-3.5 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
      >
        {isLoading ? 'در حال ثبت...' : '← رزرو جلسه مشاوره رایگان'}
      </button>
      <p className="text-xs text-slate-600 text-center">بدون نیاز به تعهد · حداکثر تا یک روز کاری پاسخ می‌دهیم</p>
    </form>
  );
}
