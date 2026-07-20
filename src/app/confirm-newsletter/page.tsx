'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getApiBaseUrl } from '@/lib/config';

function ConfirmInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No confirmation token found. Please check the link in your email.');
      return;
    }

    const apiBase = getApiBaseUrl();
    fetch(`${apiBase}/newsletter?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus('success');
          setMessage('Your subscription has been confirmed. Welcome to the روشمند newsletter!');
        } else {
          setStatus('error');
          setMessage(data.error || 'This confirmation link is invalid or has expired.');
        }
      })
      .catch(() => {
        setStatus('error');
        setMessage('Could not reach the server. Please try again later.');
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-gray-600">Confirming your subscription…</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
              <i className="fa-solid fa-circle-check text-green-600 text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">You're subscribed!</h1>
            <p className="text-gray-600">{message}</p>
            <Link
              href="/"
              className="inline-block mt-4 py-2 px-6 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Back to home
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-red-100">
              <i className="fa-solid fa-circle-xmark text-red-500 text-3xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Confirmation failed</h1>
            <p className="text-gray-600">{message}</p>
            <Link
              href="/"
              className="inline-block mt-4 py-2 px-6 rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function ConfirmNewsletterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    }>
      <ConfirmInner />
    </Suspense>
  );
}
