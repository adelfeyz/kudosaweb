'use client';

import { useState } from 'react';
import CustomDatePicker from './CustomDatePicker';

interface StatusPopupProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onStatusChange: (newStatus: string, scheduledDate?: string) => void;
  appointmentId: number;
  patientName: string;
}

const statusOptions = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'scheduled', label: 'Scheduled', color: 'bg-green-100 text-green-800' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'no_show', label: 'No Show', color: 'bg-red-100 text-red-800' },
  { value: 'canceled', label: 'Canceled', color: 'bg-gray-100 text-gray-800' }
];

export default function StatusPopup({ 
  isOpen, 
  onClose, 
  currentStatus, 
  onStatusChange, 
  appointmentId, 
  patientName 
}: StatusPopupProps) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [scheduledDate, setScheduledDate] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  if (!isOpen) return null;

  const handleStatusChange = async () => {
    // If scheduling, require a date
    if (selectedStatus === 'scheduled' && !scheduledDate) {
      alert('Please select a scheduled date');
      return;
    }

    setIsUpdating(true);
    setUpdateSuccess(false);
    try {
      await onStatusChange(selectedStatus, selectedStatus === 'scheduled' ? scheduledDate : undefined);
      setUpdateSuccess(true);
      // Close after a short delay to show success
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getCurrentStatusInfo = () => {
    return statusOptions.find(option => option.value === currentStatus) || statusOptions[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Popup */}
      <div className="relative bg-white rounded-lg shadow-xl w-full mx-2 sm:max-w-md sm:mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Update Status
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>

          {/* Patient Info */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Patient:</p>
            <p className="font-medium text-gray-900">{patientName}</p>
            <p className="text-xs text-gray-500">Appointment ID: #{appointmentId}</p>
          </div>

          {/* Current Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Status
            </label>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusOptions.find(opt => opt.value === selectedStatus)?.color || getCurrentStatusInfo().color
              }`}>
                {statusOptions.find(opt => opt.value === selectedStatus)?.label || getCurrentStatusInfo().label}
              </span>
            </div>
          </div>


          {/* New Status Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Change Status To
            </label>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    selectedStatus === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => {
                    console.log('Label clicked for:', option.value);
                    setSelectedStatus(option.value);
                  }}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={selectedStatus === option.value}
                    onChange={(e) => {
                      console.log('Status changed to:', e.target.value);
                      setSelectedStatus(e.target.value);
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${option.color}`}>
                      {option.label}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Scheduled Date Picker - Only show when "scheduled" is selected */}
          {selectedStatus === 'scheduled' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Date
              </label>
              <CustomDatePicker
                value={scheduledDate}
                onChange={(date) => setScheduledDate(date)}
                placeholder="Select appointment date"
              />
              {!scheduledDate && (
                <p className="text-sm text-red-600 mt-1">
                  Please select a date to schedule this appointment
                </p>
              )}
            </div>
          )}

          {/* Success Message */}
          {updateSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center">
                <i className="fa-solid fa-check-circle text-green-600 me-2"></i>
                <span className="text-green-800 font-medium">Status updated successfully!</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('OK button clicked, selectedStatus:', selectedStatus);
                handleStatusChange();
              }}
              disabled={isUpdating || (selectedStatus === 'scheduled' && !scheduledDate)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isUpdating ? (
                <span className="flex items-center justify-center">
                  <i className="fa-solid fa-spinner fa-spin me-2"></i>
                  Updating...
                </span>
              ) : (
                'OK'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
