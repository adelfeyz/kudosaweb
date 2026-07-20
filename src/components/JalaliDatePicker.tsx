'use client';

import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker/persian';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import 'react-day-picker/style.css';

interface JalaliDatePickerProps {
  id?: string;
  value: string;
  onChange: (gregorianDate: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  hasError?: boolean;
}

function parseGregorianDate(ymd: string): Date {
  const [year, month, day] = ymd.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatGregorian(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatJalaliDisplay(gregorianYmd: string): string {
  return parseGregorianDate(gregorianYmd).toLocaleDateString('fa-IR-u-ca-persian', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function JalaliDatePicker({
  id,
  value,
  onChange,
  placeholder = 'انتخاب تاریخ',
  disabled = false,
  className,
  hasError = false,
}: JalaliDatePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = useMemo(() => (value ? parseGregorianDate(value) : undefined), [value]);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          id={id}
          type="button"
          disabled={disabled}
          className={cn(
            'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors text-sm text-start flex items-center justify-between gap-3',
            hasError ? 'border-red-500' : 'border-slate-700',
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
            className,
          )}
        >
          <span className={cn('truncate', value ? 'text-white' : 'text-slate-500')}>
            {value ? formatJalaliDisplay(value) : placeholder}
          </span>
          <span className="flex items-center gap-1 text-slate-400 flex-shrink-0">
            <CalendarIcon className="h-4 w-4" aria-hidden="true" />
            <ChevronDownIcon className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="min-w-[21rem] w-[22.5rem] max-w-[calc(100vw-2rem)] p-5 sm:p-6 bg-white border border-slate-200 shadow-xl"
        align="start"
        dir="rtl"
        sideOffset={8}
      >
        <div className="jalali-date-picker">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;
              onChange(formatGregorian(date));
              setOpen(false);
            }}
            disabled={{ before: today }}
            dir="rtl"
            numerals="arabext"
            className="w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
