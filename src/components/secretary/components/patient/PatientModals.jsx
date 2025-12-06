import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, User, Mail, Phone, Calendar, MapPin, Heart, FileText } from 'lucide-react';
import { COLORS } from '../../styles/theme';
import { GENDERS } from '../../data/patients';

// Base Modal Component
const Modal = ({ isOpen, onClose, title, children, isDark, size = 'md' }) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

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
    <>
      {/* CSS to hide scrollbar but keep functionality */}
      <style>{`
        .modal-scroll-hidden {
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .modal-scroll-hidden::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        <div 
          className={`w-full ${sizeClasses[size]} rounded-xl shadow-2xl border-2 animate-fade-in max-h-[90vh] modal-scroll-hidden`}
          style={{ 
            background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
            borderColor: theme.primary 
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10" style={{ 
            borderColor: theme.muted,
            background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg 
          }}>
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
    </>
  );
};

// Form Input Component
const FormInput = ({ label, type = 'text', value, onChange, options, isDark, placeholder, required, icon: Icon }) => {
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
            <option key={opt.value || opt} value={opt.value || opt}>{opt.label || opt}</option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border text-sm transition-all focus:ring-2 resize-none"
          style={inputStyles}
          required={required}
        />
      ) : (
        <div className="relative">
          {Icon && (
            <Icon 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2" 
              style={{ color: theme.muted }} 
            />
          )}
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full ${Icon ? 'pl-10' : 'px-3'} pr-3 py-2 rounded-lg border text-sm transition-all focus:ring-2`}
            style={inputStyles}
            required={required}
          />
        </div>
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

// Register/Edit Patient Modal
export const PatientFormModal = ({ 
  isOpen, 
  onClose, 
  isDark, 
  mode = 'register', // 'register' | 'edit'
  patient,
  onSave 
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    birthdate: '',
    gender: '',
    address: '',
    emergencyContact: '',
    notes: '',
  });

  useEffect(() => {
    if (patient && mode === 'edit') {
      setFormData({
        fullName: patient.fullName || '',
        email: patient.email || '',
        phone: patient.phone || '',
        birthdate: patient.birthdate || '',
        gender: patient.gender || '',
        address: patient.address || '',
        emergencyContact: patient.emergencyContact || '',
        notes: patient.notes || '',
      });
    } else {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        birthdate: '',
        gender: '',
        address: '',
        emergencyContact: '',
        notes: '',
      });
    }
  }, [patient, mode, isOpen]);

  const handleSubmit = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in required fields');
      return;
    }
    onSave({ ...formData, id: patient?.id });
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={mode === 'register' ? 'Register New Patient' : 'Edit Patient'} 
      isDark={isDark}
      size="lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Enter full name"
          icon={User}
          isDark={isDark}
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="email@example.com"
          icon={Mail}
          isDark={isDark}
          required
        />
        <FormInput
          label="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+961 XX XXX XXX"
          icon={Phone}
          isDark={isDark}
          required
        />
        <FormInput
          label="Birthdate"
          type="date"
          value={formData.birthdate}
          onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
          icon={Calendar}
          isDark={isDark}
        />
        <FormInput
          label="Gender"
          type="select"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          options={GENDERS}
          isDark={isDark}
        />

      </div>
      <FormInput
        label="Address"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        placeholder="Enter full address"
        icon={MapPin}
        isDark={isDark}
      />
      <FormInput
        label="Emergency Contact"
        value={formData.emergencyContact}
        onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
        placeholder="Name - Phone Number"
        icon={Heart}
        isDark={isDark}
      />
      <FormInput
        label="Notes"
        type="textarea"
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        placeholder="Any additional notes (allergies, conditions, etc.)"
        isDark={isDark}
      />
      <FormButtons 
        onCancel={onClose} 
        onSubmit={handleSubmit} 
        submitLabel={mode === 'register' ? 'Register Patient' : 'Save Changes'} 
        isDark={isDark} 
      />
    </Modal>
  );
};

// Delete Confirmation Modal
export const DeletePatientModal = ({ 
  isOpen, 
  onClose, 
  isDark, 
  patient,
  onConfirm 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Patient?" isDark={isDark}>
      <div className="flex items-center gap-3 p-4 rounded-lg mb-4" style={{ background: `${theme.danger}20` }}>
        <AlertTriangle size={24} style={{ color: theme.danger }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: theme.text }}>
            {patient?.fullName}
          </p>
          <p className="text-sm" style={{ color: theme.text }}>
            {patient?.email}
          </p>
        </div>
      </div>
      <p className="text-sm mb-4" style={{ color: theme.text }}>
        Are you sure you want to delete this patient record? This action cannot be undone and all associated history will be lost.
      </p>
      <FormButtons 
        onCancel={onClose} 
        onSubmit={() => { onConfirm(patient); onClose(); }} 
        submitLabel="Delete Patient" 
        isDark={isDark}
        isDestructive
      />
    </Modal>
  );
};

export default {
  PatientFormModal,
  DeletePatientModal,
};
