'use client';

import { useState } from 'react';
import { useNewsletter } from '@/hooks/useNewsletter';

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'inline' | 'sidebar';
  showTitle?: boolean;
  title?: string;
  description?: string;
  className?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  submitLabel?: string;
  loadingLabel?: string;
  privacyText?: string;
  successTitle?: string;
  subscribeAnotherLabel?: string;
  emailRequiredError?: string;
  emailInvalidError?: string;
}

export default function NewsletterForm({ 
  variant = 'default',
  showTitle = true,
  title = 'می‌خواهید از جدیدترین مطالب و بینش‌های ما باخبر شوید؟',
  description = 'در خبرنامه روشمند عضو شوید و جدیدترین مقالات، نکات کاربردی و محتوای اختصاصی را هفتگی دریافت کنید.',
  className = '',
  emailLabel = 'آدرس ایمیل',
  emailPlaceholder = 'ایمیل خود را وارد کنید',
  submitLabel = 'عضویت در خبرنامه',
  loadingLabel = 'در حال ثبت...',
  privacyText = 'بدون اسپم — هر زمان می‌توانید لغو کنید. حریم خصوصی شما محفوظ است.',
  successTitle = 'ثبت شد!',
  subscribeAnotherLabel = 'ثبت ایمیل دیگر',
  emailRequiredError = 'ایمیل الزامی است',
  emailInvalidError = 'لطفاً یک آدرس ایمیل معتبر وارد کنید',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const { subscribe, isLoading, message, isSuccess, isError, reset } = useNewsletter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError(emailRequiredError);
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(emailInvalidError);
      return;
    }

    const success = await subscribe(email);
    if (success) {
      setEmail('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError('');
    if (isError || isSuccess) {
      reset();
    }
  };

  if (isSuccess) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-6 text-center ${className}`}>
        <div className="flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">{successTitle}</h3>
        <p className="text-green-700 text-sm">{message}</p>
        <button
          onClick={reset}
          className="mt-3 text-green-600 hover:text-green-800 text-sm font-medium"
        >
          {subscribeAnotherLabel}
        </button>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      {showTitle && (
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            {emailLabel}
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder={emailPlaceholder}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${
              emailError ? 'border-red-300' : 'border-gray-300'
            }`}
            disabled={isLoading}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-600">{emailError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !email.trim()}
          className="w-full bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ms-1 me-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {loadingLabel}
            </span>
          ) : (
            submitLabel
          )}
        </button>

        {isError && (
          <p className="text-sm text-red-600 text-center">{message}</p>
        )}
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        {privacyText}
      </p>
    </div>
  );
}
