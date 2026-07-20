import { useState } from 'react';
import { getApiBaseUrl } from '@/lib/config';

import { trackNewsletterSignup } from '@/lib/analytics';

interface NewsletterResponse {
  success: boolean;
  message: string;
  error?: string;
}

export const useNewsletter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const subscribe = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setMessage('');

    try {
      const apiUrl = getApiBaseUrl();
      const response = await fetch(`${apiUrl}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data: NewsletterResponse = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setMessage(data.message || 'Thank you for subscribing! Please check your email to confirm your subscription.');
        // Track newsletter signup
        trackNewsletterSignup();
        return true;
      } else {
        setIsError(true);
        setMessage(data.error || 'Something went wrong. Please try again.');
        return false;
      }
    } catch (error) {
      setIsError(true);
      setMessage('Network error. Please check your connection and try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(false);
    setMessage('');
  };

  return {
    subscribe,
    isLoading,
    message,
    isSuccess,
    isError,
    reset,
  };
};
