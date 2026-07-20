'use client';

import React, { useState, useEffect } from 'react';

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ 
  value, 
  onChange, 
  placeholder = "Select Date",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Initialize current month to first day of current month
  useEffect(() => {
    const now = new Date();
    setCurrentMonth(new Date(now.getFullYear(), now.getMonth(), 1));
  }, []);

  // Update selected date when value changes
  useEffect(() => {
    if (value) {
      const date = new Date(value + 'T00:00:00'); // Force local timezone
      setSelectedDate(date);
    } else {
      setSelectedDate(null);
    }
  }, [value]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    
    return date.getDate() === todayDate && 
           date.getMonth() === todayMonth && 
           date.getFullYear() === todayYear;
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    return checkDate < today;
  };

  const isWeekend = (date: Date) => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  };

  const handleDateSelect = (date: Date) => {
    if (isPastDate(date) || isWeekend(date)) return;
    
    setSelectedDate(date);
    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    setIsOpen(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1);
      } else {
        newMonth.setMonth(prev.getMonth() + 1);
      }
      newMonth.setDate(1); // Always start from 1st of month
      return newMonth;
    });
  };

  const getNextBusinessDay = (date: Date) => {
    let businessDay = new Date(date);
    businessDay.setHours(0, 0, 0, 0);
    
    // If it's a weekend, move to next business day
    while (isWeekend(businessDay)) {
      businessDay.setDate(businessDay.getDate() + 1);
    }
    
    return businessDay;
  };

  const handleTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    // Get next business day (automatically skips weekends)
    const nextBusinessDay = getNextBusinessDay(tomorrow);
    
    setSelectedDate(nextBusinessDay);
    // Format date as YYYY-MM-DD
    const year = nextBusinessDay.getFullYear();
    const month = String(nextBusinessDay.getMonth() + 1).padStart(2, '0');
    const day = String(nextBusinessDay.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    setIsOpen(false);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    nextWeek.setHours(0, 0, 0, 0);
    
    // Get next business day (automatically skips weekends)
    const nextBusinessDay = getNextBusinessDay(nextWeek);
    
    setSelectedDate(nextBusinessDay);
    // Format date as YYYY-MM-DD
    const year = nextBusinessDay.getFullYear();
    const month = String(nextBusinessDay.getMonth() + 1).padStart(2, '0');
    const day = String(nextBusinessDay.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    setIsOpen(false);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="relative">
      {/* Date Input Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-base text-start flex items-center justify-between ${className}`}
      >
        <span className={selectedDate ? 'text-gray-900' : 'text-gray-500'}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
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

      {/* Date Picker Popup */}
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
              <button
                type="button"
                onClick={() => navigateMonth('prev')}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Previous month"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <h3 className="font-normal text-lg text-gray-900 px-4">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <button
                type="button"
                onClick={() => navigateMonth('next')}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px]"
                aria-label="Next month"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Day Names Header */}
            <div className="grid grid-cols-7 gap-1 p-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 p-2 pb-4">
              {days.map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => day && handleDateSelect(day)}
                  disabled={day ? (isPastDate(day) || isWeekend(day)) : true}
                  className={`
                    aspect-square flex items-center justify-center text-sm rounded-lg transition-colors
                    ${!day ? 'invisible' : ''}
                    ${day && (isPastDate(day) || isWeekend(day))
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
                    }
                    ${day && isToday(day) && !isSelected(day)
                      ? 'bg-gray-100 text-gray-600 font-medium' 
                      : ''
                    }
                    ${day && isSelected(day) 
                      ? 'bg-primary text-primary-foreground font-semibold' 
                      : ''
                    }
                  `}
                >
                  {day?.getDate()}
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-200 p-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleTomorrow}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Next Week
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;