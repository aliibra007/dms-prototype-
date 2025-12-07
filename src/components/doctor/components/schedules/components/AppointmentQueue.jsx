import React, { useState } from 'react';
import {
  Search,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

import HighlightedText from '../../shared/HighlightedText';

const AppointmentQueue = ({ isDark, theme, appointments, onStatusChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const formatDateTime = (datetimeString) => {
    const date = new Date(datetimeString);
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return { time: timeStr };
  };

  const calculateDuration = (startDatetime, endDatetime) => {
    const start = new Date(startDatetime);
    const end = new Date(endDatetime);
    return Math.round((end - start) / (1000 * 60));
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patient_id?.toString().includes(searchTerm) ||
      apt.patient_phone?.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || apt.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const appointmentsByStatus = {
    pending: filteredAppointments.filter((apt) => apt.status === 'pending'),
    confirmed: filteredAppointments.filter((apt) => apt.status === 'confirmed'),
    completed: filteredAppointments.filter((apt) => apt.status === 'completed'),
    cancelled: filteredAppointments.filter((apt) => apt.status === 'cancelled'),
  };

  const getStatusColor = (status) => ({ pending: '#F59E0B', confirmed: '#10B981', completed: '#6366F1', cancelled: '#EF4444' }[status] || '#F59E0B');
  const getStatusIcon = (status) => (status === 'cancelled' ? <XCircle size={16} /> : <CheckCircle size={16} />);

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: theme.muted }} />
          <input
            type="text"
            placeholder="Search by patient name, ID, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-all"
            style={{
              background: theme.secondary,
              borderColor: theme.muted,
              color: theme.text
            }}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} style={{ color: theme.muted }} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-10 pr-8 py-2 rounded-lg border outline-none transition-all appearance-none cursor-pointer"
              style={{
                background: theme.secondary,
                borderColor: theme.muted,
                color: theme.text
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(appointmentsByStatus).map(([status, apts]) => (
          <div key={status} className="rounded-xl p-4 border-2" style={{ background: theme.cardBg, borderColor: getStatusColor(status) }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium capitalize" style={{ color: theme.text }}>{status}</span>
              <div style={{ color: getStatusColor(status) }}>{status === 'cancelled' ? <XCircle size={16} /> : <AlertCircle size={16} />}</div>
            </div>
            <p className="text-2xl font-bold" style={{ color: theme.text }}>{apts.length}</p>
          </div>
        ))}
      </div>

      {/* Appointment List */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredAppointments.length === 0 ? (
          <div className="col-span-full rounded-xl p-8 text-center border-2" style={{ background: theme.cardBg, borderColor: theme.text }}>
            <p style={{ color: theme.text }}>No appointments found matching your criteria.</p>
          </div>
        ) : (
          filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="rounded-xl p-6 border-2 transition-all hover:shadow-lg" style={{ background: theme.cardBg, borderColor: getStatusColor(appointment.status) }}>
              <div className="flex flex-col gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold mb-1" style={{ color: theme.text }}>
                        <HighlightedText text={appointment.patient_name || 'Unknown Patient'} highlight={searchTerm} theme={theme} />
                      </h3>
                      <p className="text-sm" style={{ color: theme.text }}>
                        Patient ID: {appointment.patient_id} • Appointment ID: {appointment.id}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold" style={{ background: `${getStatusColor(appointment.status)}20`, color: getStatusColor(appointment.status) }}>
                      {getStatusIcon(appointment.status)}
                      <span className="capitalize">{appointment.status}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} style={{ color: theme.text }} />
                      <span className="text-sm" style={{ color: theme.text }}>
                        {appointment.start_datetime ? new Date(appointment.start_datetime).toLocaleDateString() : 'N/A'} • {appointment.start_datetime ? formatDateTime(appointment.start_datetime).time : 'N/A'} - {appointment.end_datetime ? formatDateTime(appointment.end_datetime).time : 'N/A'} ({appointment.start_datetime && appointment.end_datetime ? calculateDuration(appointment.start_datetime, appointment.end_datetime) : 0} min)
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} style={{ color: theme.text }} />
                      <span className="text-sm" style={{ color: theme.text }}>
                        {appointment.patient_phone || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} style={{ color: theme.text }} />
                      <span className="text-sm" style={{ color: theme.text }}>
                        {appointment.patient_email || 'N/A'}
                      </span>
                    </div>
                  </div>

                  {appointment.notes && (
                    <div className="mt-2 p-3 rounded-lg" style={{ background: theme.secondary }}>
                      <p className="text-sm" style={{ color: theme.text }}>
                        <strong>Notes:</strong> {appointment.notes}
                      </p>
                    </div>
                  )}
                  {appointment.cancellation_reason && (
                    <div className="mt-2 p-3 rounded-lg" style={{ background: theme.error }}>
                      <p className="text-sm" style={{ color: theme.text }}>
                        <strong>Cancellation Reason:</strong> {appointment.cancellation_reason}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {appointment.status === 'pending' && (
                    <>
                      <button onClick={() => onStatusChange(appointment.id, 'confirmed')} className="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105" style={{ background: '#10B981' }}>Confirm</button>
                      <button onClick={() => onStatusChange(appointment.id, 'cancelled')} className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" style={{ background: theme.secondary, color: '#EF4444' }}>Cancel</button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button onClick={() => onStatusChange(appointment.id, 'completed')} className="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105" style={{ background: '#6366F1' }}>Mark Complete</button>
                  )}
                  <button className="flex-1 px-4 py-2 rounded-lg border font-semibold transition-all hover:scale-105" style={{ background: 'transparent', borderColor: theme.muted, color: theme.text }}>View Details</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentQueue;
