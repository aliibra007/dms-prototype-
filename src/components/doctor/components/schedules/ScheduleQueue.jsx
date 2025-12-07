import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Calendar as CalendarIcon,
  List,
  X
} from 'lucide-react';
import CalendarView from './components/CalendarView';
import AppointmentQueue from './components/AppointmentQueue';
import ScheduleManager from './components/ScheduleManager';

import { COLORS } from '../../styles/theme';
import DemoModeBanner from '../shared/DemoModeBanner';

const ScheduleQueue = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState('queue');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddSlot, setShowAddSlot] = useState(false);

  // Mock Data
  const [appointments, setAppointments] = useState([
    { id: 1, doctor_id: 1, patient_id: 101, start_datetime: '2025-11-29T09:00:00Z', end_datetime: '2025-11-29T09:30:00Z', status: 'confirmed', notes: 'Follow-up appointment', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-15T10:00:00Z', updated_at: '2025-11-20T14:30:00Z', patient_name: 'John Doe', patient_phone: '+1 234-567-8900', patient_email: 'john.doe@email.com', patient_user_id: 101 },
    { id: 2, doctor_id: 1, patient_id: 102, start_datetime: '2025-11-29T09:30:00Z', end_datetime: '2025-11-29T10:15:00Z', status: 'pending', notes: 'First visit', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-20T10:00:00Z', updated_at: '2025-11-20T10:00:00Z', patient_name: 'Jane Smith', patient_phone: '+1 234-567-8901', patient_email: 'jane.smith@email.com', patient_user_id: 102 },
    { id: 3, doctor_id: 1, patient_id: 103, start_datetime: '2025-12-01T14:00:00Z', end_datetime: '2025-12-01T14:30:00Z', status: 'confirmed', notes: 'Routine Checkup', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-25T10:00:00Z', updated_at: '2025-11-25T10:00:00Z', patient_name: 'Michael Brown', patient_phone: '+1 234-567-8902', patient_email: 'michael.brown@email.com', patient_user_id: 103 },
    { id: 4, doctor_id: 1, patient_id: 104, start_datetime: '2025-12-03T10:00:00Z', end_datetime: '2025-12-03T11:00:00Z', status: 'pending', notes: 'Consultation', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-28T09:00:00Z', updated_at: '2025-11-28T09:00:00Z', patient_name: 'Emily Davis', patient_phone: '+1 234-567-8903', patient_email: 'emily.davis@email.com', patient_user_id: 104 },
    { id: 5, doctor_id: 1, patient_id: 105, start_datetime: '2025-12-05T16:00:00Z', end_datetime: '2025-12-05T16:45:00Z', status: 'cancelled', notes: 'Emergency', cancellation_reason: 'Patient Request', created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-30T11:00:00Z', updated_at: '2025-12-01T09:00:00Z', patient_name: 'David Wilson', patient_phone: '+1 234-567-8904', patient_email: 'david.wilson@email.com', patient_user_id: 105 },
  ]);

  const [offDays] = useState([
    { date: '2025-12-25', reason: 'Christmas Holiday', type: 'vacation' }
  ]);

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments((prev) => prev.map((apt) => (apt.id === appointmentId ? { ...apt, status: newStatus } : apt)));
  };

  const [showDemoBanner, setShowDemoBanner] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showAddSlot) {
        setShowAddSlot(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAddSlot]);

  return (
    <div className="space-y-6">
      {/* Add Time Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/50 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl shadow-2xl transform transition-all scale-100 relative" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg }}>
              <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                <h3 className="text-xl font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Add Time Slot</h3>
                <button onClick={() => setShowAddSlot(false)} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <X size={20} style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Date</label>
                  <input type="date" className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Start Time</label>
                    <input type="time" className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>End Time</label>
                    <input type="time" className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Type</label>
                  <select className="w-full px-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                    <option value="appointment">Appointment</option>
                    <option value="blocked">Blocked Slot</option>
                    <option value="emergency">Emergency Slot</option>
                  </select>
                </div>
                <div className="pt-4 flex gap-3">
                  <button onClick={() => setShowAddSlot(false)} className="flex-1 px-4 py-2 rounded-lg font-semibold border transition-colors hover:bg-gray-50 dark:hover:bg-gray-800" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, color: isDark ? COLORS.dark.text : COLORS.light.text }}>Cancel</button>
                  <button onClick={() => setShowAddSlot(false)} className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-transform hover:scale-105" style={{ background: COLORS.light.primary }}>Add Slot</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Mode Banner */}
      {showDemoBanner && (
        <DemoModeBanner onClose={() => setShowDemoBanner(false)} theme={isDark ? COLORS.dark : COLORS.light} />
      )}

      {/* Header / Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2 p-1 rounded-lg border" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all ${activeTab === 'queue' ? 'text-white shadow-md' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            style={{ background: activeTab === 'queue' ? `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` : 'transparent' }}
          >
            <List size={18} />
            Queue
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all ${activeTab === 'calendar' ? 'text-white shadow-md' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            style={{ background: activeTab === 'calendar' ? `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` : 'transparent' }}
          >
            <CalendarIcon size={18} />
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all ${activeTab === 'schedule' ? 'text-white shadow-md' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            style={{ background: activeTab === 'schedule' ? `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` : 'transparent' }}
          >
            <CalendarIcon size={18} />
            Schedule
          </button>
        </div>

        <button
          onClick={() => setShowAddSlot(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105 shadow-lg"
          style={{ background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` }}
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Time Slot</span>
        </button>
      </div>

      {/* Content */}
      <div className="transition-all duration-300">
        {activeTab === 'queue' && (
          <AppointmentQueue
            isDark={isDark}
            theme={isDark ? COLORS.dark : COLORS.light}
            appointments={appointments}
            onStatusChange={handleStatusChange}
          />
        )}

        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CalendarView
                isDark={isDark}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                appointments={appointments}
                offDays={offDays}
              />
            </div>
            <div className="space-y-6">
              {/* Sidebar for daily details or quick stats can go here */}
              <div className="rounded-xl p-6 border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                <h3 className="font-bold mb-2">Selected Date</h3>
                <p>{selectedDate.toDateString()}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <ScheduleManager isDark={isDark} />
        )}
      </div>
    </div>
  );
};

export default ScheduleQueue;
