'use client';

import { useState } from 'react';
import AppointmentForm from '@/components/AppointmentForm';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactTabs() {
  const [activeTab, setActiveTab] = useState<'appointment' | 'contact'>('appointment');

  return (
    <div className="max-w-2xl mx-auto">
      {/* Tab switcher */}
      <div className="flex bg-slate-800 rounded-xl p-1 mb-8 gap-1">
        <button
          onClick={() => setActiveTab('appointment')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'appointment'
              ? 'bg-emerald-500 text-slate-900'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          رزرو جلسه مشاوره
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'contact'
              ? 'bg-emerald-500 text-slate-900'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ارسال پیام
        </button>
      </div>

      {/* Forms */}
      <div>
        {activeTab === 'appointment' ? (
          <AppointmentForm />
        ) : (
          <div className="bg-slate-800 rounded-xl p-6">
            <ContactForm dark />
          </div>
        )}
      </div>
    </div>
  );
}
