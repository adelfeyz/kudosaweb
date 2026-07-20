'use client';

import { useState, useRef, useEffect } from 'react';

interface ActionDropdownProps {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionDropdown({ onView, onEdit, onDelete }: ActionDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAction = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          console.log('Dropdown button clicked, current state:', isOpen);
          setIsOpen(!isOpen);
        }}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        title="Actions"
      >
        <i className="fa-solid fa-ellipsis-vertical text-sm"></i>
      </button>

      {isOpen && (
        <div className="absolute end-0 top-full mt-1 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-300 z-[9999]" style={{backgroundColor: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'}}>
          <div className="py-1">
            <div className="px-2 py-1 text-xs text-gray-500 bg-gray-100">Dropdown is open</div>
            <button
              onClick={() => {
                console.log('View clicked');
                handleAction(onView);
              }}
              className="w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <i className="fa-solid fa-eye me-3 text-blue-600"></i>
              View Details
            </button>
            <button
              onClick={() => {
                console.log('Edit clicked');
                handleAction(onEdit);
              }}
              className="w-full px-4 py-2 text-start text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <i className="fa-solid fa-edit me-3 text-green-600"></i>
              Edit Status
            </button>
            <button
              onClick={() => {
                console.log('Delete clicked');
                handleAction(onDelete);
              }}
              className="w-full px-4 py-2 text-start text-sm text-red-700 hover:bg-red-50 flex items-center"
            >
              <i className="fa-solid fa-trash me-3 text-red-600"></i>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
