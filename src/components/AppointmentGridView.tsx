'use client';

import { useState, useEffect } from 'react';
import { getApiUrl } from '@/lib/config';
import StatusPopup from './StatusPopup';
import ViewAppointmentPopup from './ViewAppointmentPopup';
import DeleteConfirmationModal from './DeleteConfirmationModal';

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface Filters {
  search: string;
  status: string;
  serviceType: string;
  dateFrom: string;
  dateTo: string;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'pending', label: 'Pending' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'no_show', label: 'No Show' },
  { value: 'canceled', label: 'Canceled' }
];

const serviceTypeOptions = [
  { value: '', label: 'All Services' },
  { value: 'AI Strategy Consultation', label: 'AI Strategy Consultation' },
  { value: 'Custom AI Development', label: 'Custom AI Development' },
  { value: 'Process Automation', label: 'Process Automation' },
  { value: 'Data & Analytics', label: 'Data & Analytics' },
  { value: 'CRM & Integrations', label: 'CRM & Integrations' },
  { value: 'Other', label: 'Other' }
];

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
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${config.color}`}>
        {config.text}
      </span>
    );
  };

export default function AppointmentGridView() {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0
  });
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: '',
    serviceType: '',
    dateFrom: '',
    dateTo: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusPopup, setStatusPopup] = useState<{
    isOpen: boolean;
    appointment: AppointmentRequest | null;
  }>({ isOpen: false, appointment: null });
  const [viewPopup, setViewPopup] = useState<{
    isOpen: boolean;
    appointment: AppointmentRequest | null;
  }>({ isOpen: false, appointment: null });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    appointment: AppointmentRequest | null;
  }>({ isOpen: false, appointment: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('admin_token');
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.status && { status: filters.status }),
        ...(filters.serviceType && { serviceType: filters.serviceType }),
        ...(filters.dateFrom && { dateFrom: filters.dateFrom }),
        ...(filters.dateTo && { dateTo: filters.dateTo })
      });

      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3021';
      const url = `${apiUrl}/admin/appointments?${params}`;
      console.log('Fetching appointments from:', url);
      console.log('Filters:', filters);
      console.log('Date From:', filters.dateFrom);
      console.log('Date To:', filters.dateTo);

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setAppointments(data.appointments);
        setPagination(data.pagination);
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        setError(errorData.error || 'Failed to fetch appointments');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch appointments');
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (newStatus: string, scheduledDate?: string) => {
    if (!statusPopup.appointment) return;
    
    try {
      console.log('Updating status for appointment:', statusPopup.appointment.id, 'to:', newStatus);
      const token = localStorage.getItem('admin_token');
      
      const requestBody: any = { status: newStatus };
      if (scheduledDate) {
        requestBody.scheduled_date = scheduledDate;
      }
      
      console.log('Request body:', requestBody);
      
      const response = await fetch(getApiUrl(`/admin/appointments?id=${statusPopup.appointment.id}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      
      if (response.ok) {
        console.log('Status updated successfully, refreshing data...');
        // Refresh the data
        await fetchAppointments();
      } else {
        const errorData = await response.json();
        console.error('Failed to update status:', errorData);
        setError(errorData.error || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status');
    }
  };

  const deleteAppointment = async (id: number) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('admin_token');
      
      const response = await fetch(getApiUrl(`/admin/appointments?id=${id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        // Refresh the data
        await fetchAppointments();
        setDeleteModal({ isOpen: false, appointment: null });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to delete appointment');
      }
    } catch (err) {
      setError('Failed to delete appointment');
    } finally {
      setIsDeleting(false);
    }
  };

  const openStatusPopup = (appointment: AppointmentRequest) => {
    setStatusPopup({ isOpen: true, appointment });
  };

  const closeStatusPopup = () => {
    setStatusPopup({ isOpen: false, appointment: null });
  };

  const openViewPopup = (appointment: AppointmentRequest) => {
    setViewPopup({ isOpen: true, appointment });
  };

  const closeViewPopup = () => {
    setViewPopup({ isOpen: false, appointment: null });
  };

  const openDeleteModal = (appointment: AppointmentRequest) => {
    setDeleteModal({ isOpen: true, appointment });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, appointment: null });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.appointment) {
      deleteAppointment(deleteModal.appointment.id);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [pagination.page, filters.search, filters.status, filters.serviceType, filters.dateFrom, filters.dateTo]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    // For search, only trigger if empty or has at least 3 characters
    if (key === 'search' && value.length > 0 && value.length < 3) {
      setFilters(prev => ({ ...prev, [key]: value }));
      return; // Don't trigger API call yet
    }
    
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page when filtering
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      status: '',
      serviceType: '',
      dateFrom: '',
      dateTo: ''
    });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <div className="space-y-6">
      {/* Filter Toggle and Controls */}
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <i className={`fa-solid fa-filter me-2 ${showFilters ? 'text-primary-600' : ''}`}></i>
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
          <button
            onClick={clearFilters}
            className="flex items-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            <i className="fa-solid fa-times me-2"></i>
            Clear Filters
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {pagination.total} total appointments
        </div>
      </div>

      {/* Collapsible Filters */}
      {showFilters && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search by name or email..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Statuses</option>
                {statusOptions.slice(1).map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                value={filters.serviceType}
                onChange={(e) => handleFilterChange('serviceType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Services</option>
                {serviceTypeOptions.slice(1).map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-700">{error}</div>
        </div>
      )}

      {/* Grid Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="sticky start-0 bg-gray-50 px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider z-10">
                  Name
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Preferred Date
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service Type
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    </div>
                  </td>
                </tr>
              ) : appointments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No appointments found
                  </td>
                </tr>
              ) : (
                appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="sticky start-0 bg-white px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 z-10">
                      {appointment.first_name} {appointment.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{appointment.email}</div>
                      <div>{appointment.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.preferred_date ? formatDate(appointment.preferred_date) : 'Not specified'}
                      {appointment.preferred_time && (
                        <div className="text-xs text-gray-400">{appointment.preferred_time}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.service_type || 'Not specified'}
                    </td>
                    <td 
                      className="px-6 py-4 whitespace-nowrap cursor-pointer hover:bg-gray-50"
                      onClick={() => openStatusPopup(appointment)}
                    >
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(appointment.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm bg-white">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openViewPopup(appointment)}
                          className="p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 hover:text-blue-900 rounded-lg transition-colors border border-blue-200"
                          title="View Details"
                          style={{ minWidth: '36px', minHeight: '36px', fontSize: '14px' }}
                        >
                          <i className="fa-solid fa-eye" style={{ color: '#1d4ed8' }}></i>
                        </button>
                        <button
                          onClick={() => openStatusPopup(appointment)}
                          className="p-2 bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-900 rounded-lg transition-colors border border-green-200"
                          title="Edit Status"
                          style={{ minWidth: '36px', minHeight: '36px', fontSize: '14px' }}
                        >
                          <i className="fa-solid fa-edit" style={{ color: '#15803d' }}></i>
                        </button>
                        <button
                          onClick={() => openDeleteModal(appointment)}
                          className="p-2 bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-900 rounded-lg transition-colors border border-red-200"
                          title="Delete"
                          style={{ minWidth: '36px', minHeight: '36px', fontSize: '14px' }}
                        >
                          <i className="fa-solid fa-trash" style={{ color: '#dc2626' }}></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="ms-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>
                  {' '}to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{pagination.total}</span>
                  {' '}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px rtl:space-x-reverse">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-s-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, pagination.page - 2) + i;
                    if (pageNum > pagination.totalPages) return null;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          pageNum === pagination.page
                            ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-e-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Popup */}
      <StatusPopup
        isOpen={statusPopup.isOpen}
        onClose={closeStatusPopup}
        currentStatus={statusPopup.appointment?.status || ''}
        onStatusChange={updateStatus}
        appointmentId={statusPopup.appointment?.id || 0}
        patientName={statusPopup.appointment ? `${statusPopup.appointment.first_name} ${statusPopup.appointment.last_name}` : ''}
      />

      {/* View Appointment Popup */}
      <ViewAppointmentPopup
        isOpen={viewPopup.isOpen}
        onClose={closeViewPopup}
        appointment={viewPopup.appointment}
        onDelete={deleteAppointment}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        patientName={deleteModal.appointment ? `${deleteModal.appointment.first_name} ${deleteModal.appointment.last_name}` : ''}
        appointmentId={deleteModal.appointment?.id || 0}
        isDeleting={isDeleting}
      />
    </div>
  );
}
