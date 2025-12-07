import React, { useState } from 'react';
import { X, Calendar, Clock, User } from 'lucide-react';
import useScrollLock from '../../hooks/useScrollLock';

export default function AddSlotModal({
  isOpen,
  onClose,
  onSave,
  theme,
  isDark
}) {
  const [formData, setFormData] = useState({
    patient: '',
    date: '',
    time: '',
    type: 'Consultation',
    doctor: 'Dr. Sarah Johnson',
    notes: ''
  });

  useScrollLock(isOpen);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now(),
      ...formData,
      status: 'confirmed'
    });
    setFormData({
      patient: '',
      date: '',
      time: '',
      type: 'Consultation',
      doctor: 'Dr. Sarah Johnson',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
      <style>
        {isDark && `
input[type = "date"]:: -webkit - calendar - picker - indicator,
  input[type = "time"]:: -webkit - calendar - picker - indicator {
  filter: invert(1);
  cursor: pointer;
}
input[type = "date"]:: -webkit - inner - spin - button,
  input[type = "time"]:: -webkit - inner - spin - button {
  filter: invert(1);
}
`}
      </style>
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all scale-100 border relative"
          style={{ background: theme.cardBg, borderColor: theme.border }}
        >
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
            <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
              <Calendar size={24} style={{ color: theme.primary }} />
              Add New Appointment Slot
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
              style={{ color: theme.text }}
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2" style={{ color: theme.text }}>
                  <User size={16} />
                  Patient Name *
                </label>
                <input
                  required
                  value={formData.patient}
                  onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                  placeholder="Enter patient name"
                  className="w-full px-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all"
                  style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2" style={{ color: theme.text }}>
                  <Calendar size={16} />
                  Date *
                </label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                    '--tw-ring-color': theme.primary,
                    colorScheme: isDark ? 'dark' : 'light'
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold flex items-center gap-2" style={{ color: theme.text }}>
                  <Clock size={16} />
                  Time *
                </label>
                <input
                  required
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                    '--tw-ring-color': theme.primary,
                    colorScheme: isDark ? 'dark' : 'light'
                  }}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: theme.text }}>Appointment Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full pl-4 pr-10 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all appearance-none"
                  style={{
                    borderColor: theme.border,
                    color: theme.text,
                    '--tw-ring-color': theme.primary,
                    backgroundImage: isDark
                      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F1F5F9' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`
                      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231F2937' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '12px'
                  }}
                >
                  <option value="Consultation">Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="New patient">New patient</option>
                  <option value="Check-up">Check-up</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold" style={{ color: theme.text }}>Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                placeholder="Any additional notes or instructions..."
                className="w-full px-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all resize-none"
                style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: theme.border }}>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg font-bold transition-colors border"
                style={{
                  color: theme.text,
                  background: isDark ? theme.secondary : 'transparent',
                  borderColor: theme.border
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-2.5 rounded-lg font-bold text-white transition-transform hover:scale-105 shadow-lg"
                style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
              >
                Add Appointment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

