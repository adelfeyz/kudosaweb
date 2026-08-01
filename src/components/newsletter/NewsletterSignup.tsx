'use client';

import NewsletterForm from './NewsletterForm';

interface NewsletterSignupProps {
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

export default function NewsletterSignup({
  variant = 'default',
  showTitle = true,
  title,
  description,
  className = "",
  emailLabel,
  emailPlaceholder,
  submitLabel,
  loadingLabel,
  privacyText,
  successTitle,
  subscribeAnotherLabel,
  emailRequiredError,
  emailInvalidError,
}: NewsletterSignupProps) {
  const getDefaultContent = () => {
    switch (variant) {
      case 'compact':
        return {
          title: 'بینش‌های هفتگی هوش مصنوعی',
          description: 'به جمع خوانندگان ما بپیوندید و جدیدترین مطالب استراتژی و پیاده‌سازی را دریافت کنید.',
        };
      case 'inline':
        return {
          title: 'یک قدم جلوتر باشید',
          description: 'جدیدترین بینش‌های صنعت هوش مصنوعی را در ایمیل خود دریافت کنید.',
        };
      case 'sidebar':
        return {
          title: 'بینش‌های هفتگی',
          description: 'محتوای اختصاصی و راهنمای استراتژی هوش مصنوعی — هفتگی در ایمیل شما.',
        };
      default:
        return {
          title: 'بینش‌های هفتگی هوش مصنوعی و محتوای اختصاصی',
          description: 'به جمع خوانندگان ما بپیوندید و جدیدترین مطالب استراتژی، راهنمای پیاده‌سازی و روندهای صنعت را دریافت کنید.',
        };
    }
  };

  const defaultContent = getDefaultContent();
  const finalTitle = title || defaultContent.title;
  const finalDescription = description || defaultContent.description;

  // Styling based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return "max-w-md mx-auto";
      case 'inline':
        return "max-w-lg mx-auto";
      case 'sidebar':
        return "sticky top-6";
      default:
        return "max-w-2xl mx-auto";
    }
  };

  return (
    <div className={`${getVariantStyles()} ${className}`}>
      <NewsletterForm
        variant={variant}
        showTitle={showTitle}
        title={finalTitle}
        description={finalDescription}
        emailLabel={emailLabel}
        emailPlaceholder={emailPlaceholder}
        submitLabel={submitLabel}
        loadingLabel={loadingLabel}
        privacyText={privacyText}
        successTitle={successTitle}
        subscribeAnotherLabel={subscribeAnotherLabel}
        emailRequiredError={emailRequiredError}
        emailInvalidError={emailInvalidError}
      />
    </div>
  );
}
