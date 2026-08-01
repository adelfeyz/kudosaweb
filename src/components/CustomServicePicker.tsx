'use client';

import React, { useState } from 'react';

interface CustomServicePickerProps {
  value: string;
  onChange: (service: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomServicePicker: React.FC<CustomServicePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = "Select Service",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Available service types
  const serviceTypes = [
    'AI Strategy Consultation',
    'Custom AI Development',
    'Process Automation',
    'Data & Analytics',
    'CRM & Integrations',
    'Other'
  ];

  const handleServiceSelect = (service: string) => {
    onChange(service);
    setIsOpen(false);
  };

  const formatService = (service: string) => {
    return service || placeholder;
  };

  return (
    <div className="relative">
      {/* Service Input Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base text-start flex items-center justify-between ${className}`}
      >
        <span className={value ? 'text-gray-900' : 'text-gray-500'}>
          {formatService(value)}
        </span>
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Service Picker Popup */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white border border-gray-300 rounded-lg shadow-xl max-w-sm w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-normal text-lg text-gray-900">
                Select Service
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close service picker"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Service Types List */}
            <div className="p-4">
              <div className="space-y-2">
                {serviceTypes.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceSelect(service)}
                    className={`
                      w-full px-4 py-3 text-start text-sm rounded-lg transition-colors
                      ${value === service
                        ? 'bg-primary text-primary-foreground font-semibold' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomServicePicker;
