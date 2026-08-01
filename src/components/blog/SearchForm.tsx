'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchFormProps {
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  defaultValue?: string;
}

export default function SearchForm({ 
  placeholder = 'جستجوی مطالب...',
  className = "",
  size = "md",
  defaultValue = ""
}: SearchFormProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-4 text-lg",
    lg: "px-8 py-5 text-xl"
  };

  const buttonSizeClasses = {
    sm: "p-2",
    md: "p-3", 
    lg: "p-4"
  };

  const iconSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl"
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={`w-full pe-16 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm ${sizeClasses[size]}`}
        autoComplete="off"
      />
      <button 
        type="submit"
        disabled={!query.trim()}
        className={`absolute end-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed ${buttonSizeClasses[size]}`}
      >
        <i className={`fa-solid fa-search ${iconSizeClasses[size]}`}></i>
      </button>
    </form>
  );
}
