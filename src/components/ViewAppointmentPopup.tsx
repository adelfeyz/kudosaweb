'use client';

import { useState } from 'react';

interface AppointmentRequest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  preferred_date?: string;
  preferred_time?: string;
  service_type?: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ViewAppointmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: AppointmentRequest | null;
  onDelete: (id: number) => void;
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    new: { color: 'bg-blue-100 text-blue-800', text: 'New' },
    pending: { color: 'bg-yellow-100 text-yellow-800', text: 'Pending' },
    scheduled: { color: 'bg-green-100 text-green-800', text: 'Scheduled' },
    completed: { color: 'bg-green-100 text-green-800', text: 'Completed' },
    no_show: { color: 'bg-red-100 text-red-800', text: 'No Show' },
    canceled: { color: 'bg-gray-100 text-gray-800', text: 'Canceled' }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
      {config.text}
    </span>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function ViewAppointmentPopup({ 
  isOpen, 
  onClose, 
  appointment, 
  onDelete 
}: ViewAppointmentPopupProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isOpen || !appointment) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(appointment.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>
      
      {/* Popup */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Appointment Details
              </h3>
              <p className="text-sm text-gray-500">
                ID: #{appointment.id}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>

          {/* Patient Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <p className="text-lg font-semibold text-gray-900">
                  {appointment.first_name} {appointment.last_name}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">
                  <a 
                    href={`mailto:${appointment.email}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {appointment.email}
                  </a>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <p className="text-gray-900">
                  <a 
                    href={`tel:${appointment.phone}`}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {appointment.phone}
                  </a>
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div>
                  {getStatusBadge(appointment.status)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <p className="text-gray-900">
                  {appointment.preferred_date 
                    ? formatDate(appointment.preferred_date)
                    : 'Not specified'
                  }
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <p className="text-gray-900">
                  {appointment.preferred_time || 'Not specified'}
                </p>
              </div>


            </div>
          </div>

          {/* Service Information */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <p className="text-gray-900">
              {appointment.service_type || 'Not specified'}
            </p>
          </div>

          {/* Message */}
          {appointment.message && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-900 whitespace-pre-wrap">
                  {appointment.message}
                </p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Created
              </label>
              <p className="text-gray-900">
                {formatDateTime(appointment.created_at)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Updated
              </label>
              <p className="text-gray-900">
                {formatDateTime(appointment.updated_at)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <i className="fa-solid fa-trash me-2"></i>
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-exclamation-triangle text-red-600 text-xl"></i>
                </div>
                <div className="ms-3">
                  <h3 className="text-lg font-medium text-gray-900">
                    Delete Appointment
                  </h3>
                </div>
              </div>
              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this appointment request? This action cannot be undone.
                </p>
                <p className="text-sm font-medium text-gray-900 mt-2">
                  Patient: {appointment.first_name} {appointment.last_name}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isDeleting ? (
                    <span className="flex items-center justify-center">
                      <i className="fa-solid fa-spinner fa-spin me-2"></i>
                      Deleting...
                    </span>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
