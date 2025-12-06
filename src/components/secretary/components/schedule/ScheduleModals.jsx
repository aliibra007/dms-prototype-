import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, AlertTriangle } from 'lucide-react';
import { COLORS } from '../../styles/theme';

// Base Modal Component
const Modal = ({ isOpen, onClose, title, children, isDark }) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md rounded-xl shadow-2xl border-2 animate-fade-in"
        style={{ 
          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
          borderColor: theme.primary 
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: theme.muted }}>
          <h3 className="text-lg font-bold" style={{ color: theme.text }}>{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-opacity-10 transition-all"
            style={{ color: theme.text }}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ label, type = 'text', value, onChange, options, isDark, placeholder, required }) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  
  const inputStyles = {
    background: isDark ? `${COLORS.dark.secondary}80` : COLORS.light.secondary,
    borderColor: theme.muted,
    color: theme.text,
  };

  return (
    <div className="mb-4">
      <label className="text-sm font-semibold mb-1 block" style={{ color: theme.text }}>
        {label} {required && <span style={{ color: theme.danger }}>*</span>}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 rounded-lg border text-sm transition-all focus:ring-2"
          style={inputStyles}
          required={required}
        >
          <option value="">Select {label}</option>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value}
            onChange={onChange}
            className="w-4 h-4 rounded"
            style={{ accentColor: theme.primary }}
          />
          <span className="text-sm" style={{ color: theme.text }}>{placeholder}</span>
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border text-sm transition-all focus:ring-2"
          style={inputStyles}
          required={required}
        />
      )}
    </div>
  );
};

// Form Buttons
const FormButtons = ({ onCancel, onSubmit, submitLabel, isDark, isDestructive }) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  
  return (
    <div className="flex gap-3 mt-6">
      <button
        onClick={onCancel}
        className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all border"
        style={{ borderColor: theme.muted, color: theme.text }}
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
        style={{ 
          background: isDestructive ? theme.danger : theme.primary, 
          color: '#FFFFFF' 
        }}
      >
        {submitLabel}
      </button>
    </div>
  );
};

// Add/Edit Availability Modal
export const AvailabilityModal = ({ 
  isOpen, 
  onClose, 
  isDark, 
  mode = 'add', // 'add' | 'edit'
  slot,
  doctors,
  onSave 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [formData, setFormData] = useState({
    doctorId: '',
    date: '',
    time: '',
    status: 'open',
  });

  useEffect(() => {
    if (slot && mode === 'edit') {
      setFormData({
        doctorId: slot.doctorId?.toString() || '',
        date: slot.date || '',
        time: slot.time || '',
        status: slot.status || 'open',
      });
    } else {
      setFormData({ doctorId: '', date: '', time: '', status: 'open' });
    }
  }, [slot, mode, isOpen]);

  const handleSubmit = () => {
    onSave({ ...formData, id: slot?.id });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'add' ? 'Add Availability' : 'Edit Availability'} isDark={isDark}>
      <FormInput
        label="Doctor"
        type="select"
        value={formData.doctorId}
        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
        options={doctors.map(d => ({ value: d.id.toString(), label: d.name }))}
        isDark={isDark}
        required
      />
      <FormInput
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        isDark={isDark}
        required
      />
      <FormInput
        label="Time"
        type="time"
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        isDark={isDark}
        required
      />
      <FormInput
        label="Status"
        type="select"
        value={formData.status}
        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        options={[
          { value: 'open', label: 'Open' },
          { value: 'booked', label: 'Booked' },
          { value: 'cancelled', label: 'Cancelled' },
        ]}
        isDark={isDark}
      />
      <FormButtons 
        onCancel={onClose} 
        onSubmit={handleSubmit} 
        submitLabel={mode === 'add' ? 'Add Slot' : 'Save Changes'} 
        isDark={isDark} 
      />
    </Modal>
  );
};

// Delete Confirmation Modal
export const DeleteModal = ({ 
  isOpen, 
  onClose, 
  isDark, 
  itemType = 'slot',
  onConfirm 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${itemType}?`} isDark={isDark}>
      <div className="flex items-center gap-3 p-4 rounded-lg mb-4" style={{ background: `${theme.danger}20` }}>
        <AlertTriangle size={24} style={{ color: theme.danger }} />
        <p className="text-sm" style={{ color: theme.text }}>
          Are you sure you want to delete this {itemType}? This action cannot be undone.
        </p>
      </div>
      <FormButtons 
        onCancel={onClose} 
        onSubmit={() => { onConfirm(); onClose(); }} 
        submitLabel="Delete" 
        isDark={isDark}
        isDestructive
      />
    </Modal>
  );
};

// Appointment Modal (Create/Edit/Reschedule)
export const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  isDark, 
  mode = 'create', // 'create' | 'edit' | 'reschedule'
  appointment,
  doctors,
  patients,
  appointmentTypes,
  timeSlots,
  onSave 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    type: '',
    isWalkIn: false,
  });

  useEffect(() => {
    if (appointment && (mode === 'edit' || mode === 'reschedule')) {
      setFormData({
        patientId: appointment.patientId?.toString() || '',
        doctorId: appointment.doctorId?.toString() || '',
        date: appointment.date || '',
        time: appointment.time || '',
        type: appointment.type || '',
        isWalkIn: appointment.isWalkIn || false,
      });
    } else {
      setFormData({ patientId: '', doctorId: '', date: '', time: '', type: '', isWalkIn: false });
    }
  }, [appointment, mode, isOpen]);

  const handleSubmit = () => {
    const patient = patients.find(p => p.id.toString() === formData.patientId);
    const doctor = doctors.find(d => d.id.toString() === formData.doctorId);
    onSave({ 
      ...formData, 
      id: appointment?.id,
      patientName: patient?.name || '',
      doctorName: doctor?.name || '',
    });
    onClose();
  };

  const getTitle = () => {
    switch (mode) {
      case 'create': return 'New Appointment';
      case 'edit': return 'Edit Appointment';
      case 'reschedule': return 'Reschedule Appointment';
      default: return 'Appointment';
    }
  };

  // Get available times for selected doctor and date
  const availableTimes = timeSlots
    .filter(s => s.status === 'open' && s.doctorId?.toString() === formData.doctorId)
    .map(s => ({ value: s.time, label: s.time }));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} isDark={isDark}>
      {mode !== 'reschedule' && (
        <>
          <FormInput
            label="Patient"
            type="select"
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            options={patients.map(p => ({ value: p.id.toString(), label: p.name }))}
            isDark={isDark}
            required
          />
          <FormInput
            label="Walk-in"
            type="checkbox"
            value={formData.isWalkIn}
            onChange={(e) => setFormData({ ...formData, isWalkIn: e.target.checked })}
            placeholder="This is a walk-in appointment"
            isDark={isDark}
          />
        </>
      )}
      <FormInput
        label="Doctor"
        type="select"
        value={formData.doctorId}
        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value, time: '' })}
        options={doctors.map(d => ({ value: d.id.toString(), label: d.name }))}
        isDark={isDark}
        required
      />
      <FormInput
        label="Date"
        type="date"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        isDark={isDark}
        required
      />
      <FormInput
        label="Time Slot"
        type="select"
        value={formData.time}
        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
        options={availableTimes.length > 0 ? availableTimes : [{ value: formData.time, label: formData.time || 'No available slots' }]}
        isDark={isDark}
        required
      />
      {mode !== 'reschedule' && (
        <FormInput
          label="Appointment Type"
          type="select"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          options={appointmentTypes.map(t => ({ value: t, label: t }))}
          isDark={isDark}
          required
        />
      )}
      <FormButtons 
        onCancel={onClose} 
        onSubmit={handleSubmit} 
        submitLabel={mode === 'create' ? 'Create Appointment' : mode === 'edit' ? 'Save Changes' : 'Reschedule'} 
        isDark={isDark} 
      />
    </Modal>
  );
};

// Cancel Appointment Modal
export const CancelAppointmentModal = ({ 
  isOpen, 
  onClose, 
  isDark, 
  appointment,
  onConfirm 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Appointment?" isDark={isDark}>
      <div className="flex items-center gap-3 p-4 rounded-lg mb-4" style={{ background: `${theme.warning}20` }}>
        <AlertTriangle size={24} style={{ color: theme.warning }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: theme.text }}>
            {appointment?.patientName}
          </p>
          <p className="text-sm" style={{ color: theme.text }}>
            {appointment?.time} with {appointment?.doctorName}
          </p>
        </div>
      </div>
      <p className="text-sm mb-4" style={{ color: theme.text }}>
        Are you sure you want to cancel this appointment? The patient will be notified.
      </p>
      <FormButtons 
        onCancel={onClose} 
        onSubmit={() => { onConfirm(appointment); onClose(); }} 
        submitLabel="Cancel Appointment" 
        isDark={isDark}
        isDestructive
      />
    </Modal>
  );
};

export default {
  AvailabilityModal,
  DeleteModal,
  AppointmentModal,
  CancelAppointmentModal,
};
