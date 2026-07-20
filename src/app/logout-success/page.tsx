'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear any remaining auth data
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('cf_user_info');
    }

    // Redirect to login page after a short delay
    const timer = setTimeout(() => {
      router.push('/login/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-6">
            <i className="fa-solid fa-check text-green-600 text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Successfully Logged Out
          </h2>
          <p className="text-gray-600">
            You have been logged out successfully. Redirecting to login page...
          </p>
        </div>
        
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-200">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-sm text-gray-500">
              Please wait while we redirect you...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
