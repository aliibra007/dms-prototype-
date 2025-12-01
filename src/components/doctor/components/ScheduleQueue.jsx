import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const COLORS = {
  light: {
    primary: 'hsl(262, 52%, 47%)',
    secondary: 'hsl(220, 25%, 95%)',
    accent: 'hsl(199, 89%, 48%)',
    muted: 'hsl(240, 10%, 85%)',
    background: '#FFFFFF',
    text: '#1F2937',
    cardBg: '#FFFFFF',
  },
  dark: {
    primary: 'hsl(262, 45%, 65%)',
    secondary: 'hsl(220, 20%, 12%)',
    accent: 'hsl(199, 80%, 55%)',
    muted: 'hsl(240, 8%, 35%)',
    background: '#0F172A',
    text: '#F1F5F9',
    cardBg: '#1E293B',
  },
};

const ScheduleQueue = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState('queue');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddSlot, setShowAddSlot] = useState(false);

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

  const [appointments, setAppointments] = useState([
    { id: 1, doctor_id: 1, patient_id: 101, start_datetime: '2025-11-29T09:00:00Z', end_datetime: '2025-11-29T09:30:00Z', status: 'confirmed', notes: 'Follow-up appointment', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-15T10:00:00Z', updated_at: '2025-11-20T14:30:00Z', patient_name: 'John Doe', patient_phone: '+1 234-567-8900', patient_email: 'john.doe@email.com', patient_user_id: 101 },
    { id: 2, doctor_id: 1, patient_id: 102, start_datetime: '2025-11-29T09:30:00Z', end_datetime: '2025-11-29T10:15:00Z', status: 'pending', notes: 'First visit', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-20T10:00:00Z', updated_at: '2025-11-20T10:00:00Z', patient_name: 'Jane Smith', patient_phone: '+1 234-567-8901', patient_email: 'jane.smith@email.com', patient_user_id: 102 },
  ]);

  const [availability] = useState([
    { id: 1, user_id: 1, day_of_week: 1, start_time: '09:00:00', end_time: '17:00:00', slot_minutes: 30, available: true },
  ]);

  const getDayName = (dayOfWeek) => ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][dayOfWeek];

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

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)));
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const selectedDateString = selectedDate.toISOString().split('T')[0];
  const todayAppointments = filteredAppointments.filter((apt) => apt.start_datetime?.split('T')[0] === selectedDateString);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          <button onClick={() => setActiveTab('queue')} className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'queue' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} style={{ background: activeTab === 'queue' ? `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` : 'transparent' }}>Appointment Queue</button>
          <button onClick={() => setActiveTab('calendar')} className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'calendar' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} style={{ background: activeTab === 'calendar' ? `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` : 'transparent' }}>Calendar View</button>
        </div>
        <button onClick={() => setShowAddSlot(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105" style={{ background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` }}>
          <Plus size={20} />
          <span className="hidden sm:inline">Add Time Slot</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
          <input type="text" placeholder="Search by patient name, ID, or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-all" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, color: isDark ? COLORS.dark.text : COLORS.light.text }} />
        </div>
        <div className="flex gap-2">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-4 py-2 rounded-lg border outline-none transition-all" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {activeTab === 'queue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(appointmentsByStatus).map(([status, apts]) => (
              <div key={status} className="rounded-xl p-4 border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: getStatusColor(status) }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium capitalize" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{status}</span>
                  <div style={{ color: getStatusColor(status) }}>{status === 'cancelled' ? <XCircle size={16} /> : <AlertCircle size={16} />}</div>
                </div>
                <p className="text-2xl font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{apts.length}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {todayAppointments.length === 0 ? (
              <div className="rounded-xl p-8 text-center border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                <p style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>No appointments found for the selected date.</p>
              </div>
            ) : (
              todayAppointments.map((appointment) => (
                <div key={appointment.id} className="rounded-xl p-6 border-2 transition-all hover:shadow-lg" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: getStatusColor(appointment.status) }}>
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold mb-1" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                            {appointment.patient_name || 'Unknown Patient'}
                          </h3>
                          <p className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
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
                          <Clock size={16} style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                          <span className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                            {appointment.start_datetime ? formatDateTime(appointment.start_datetime).time : 'N/A'} - {appointment.end_datetime ? formatDateTime(appointment.end_datetime).time : 'N/A'} ({appointment.start_datetime && appointment.end_datetime ? calculateDuration(appointment.start_datetime, appointment.end_datetime) : 0} min)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={16} style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                          <span className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                            {appointment.patient_phone || 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail size={16} style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                          <span className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                            {appointment.patient_email || 'N/A'}
                          </span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="mt-2 p-3 rounded-lg" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary }}>
                          <p className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}
                      {appointment.cancellation_reason && (
                        <div className="mt-2 p-3 rounded-lg" style={{ background: '#EF444420' }}>
                          <p className="text-sm" style={{ color: '#EF4444' }}>
                            <strong>Cancellation Reason:</strong> {appointment.cancellation_reason}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 lg:min-w-[200px]">
                      {appointment.status === 'pending' && (
                        <>
                          <button onClick={() => handleStatusChange(appointment.id, 'confirmed')} className="px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105" style={{ background: '#10B981' }}>Confirm</button>
                          <button onClick={() => handleStatusChange(appointment.id, 'cancelled')} className="px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: '#EF4444' }}>Cancel</button>
                        </>
                      )}
                      {appointment.status === 'confirmed' && (
                        <button onClick={() => handleStatusChange(appointment.id, 'completed')} className="px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105" style={{ background: '#6366F1' }}>Mark Complete</button>
                      )}
                      <button className="px-4 py-2 rounded-lg border font-semibold transition-all hover:scale-105" style={{ background: 'transparent', borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, color: isDark ? COLORS.dark.text : COLORS.light.text }}>View Details</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="rounded-xl p-6 border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
              <div className="flex items-center justify-between mb-6">
                <button onClick={() => navigateDate(-1)} className="p-2 rounded-lg transition-all hover:scale-110" style={{ background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}20`, color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
                  <ChevronLeft size={20} />
                </button>
                <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                  {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={() => navigateDate(1)} className="p-2 rounded-lg transition-all hover:scale-110" style={{ background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}20`, color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="text-center p-8">
                <Calendar size={64} style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                <p className="mt-4" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>Calendar view coming soon...</p>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-xl p-6 border-2 mb-6" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
              <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                Weekly Availability
              </h3>
              <div className="space-y-3">
                {availability.map((schedule) => {
                  const dayName = getDayName(schedule.day_of_week);
                  const startTime = schedule.start_time.substring(0, 5);
                  const endTime = schedule.end_time.substring(0, 5);
                  return (
                    <div key={schedule.id} className="flex items-center justify-between p-3 rounded-lg" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary }}>
                      <span className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{dayName}</span>
                      {schedule.available ? (
                        <div className="text-right">
                          <span className="text-sm block" style={{ color: '#10B981' }}>{startTime} - {endTime}</span>
                          <span className="text-xs" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{schedule.slot_minutes} min slots</span>
                        </div>
                      ) : (
                        <span className="text-sm" style={{ color: '#EF4444' }}>Unavailable</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <button className="w-full mt-4 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" style={{ background: `${isDark ? COLORS.dark.accent : COLORS.light.accent}20`, color: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
                Edit Availability
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleQueue;
