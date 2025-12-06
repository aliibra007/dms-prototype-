import React, { useEffect } from 'react';
import { X, Calendar, User, Stethoscope, FileText, Pill, Clock } from 'lucide-react';
import { COLORS } from '../../styles/theme';

// Drawer Component
const Drawer = ({ isOpen, onClose, title, children, isDark }) => {
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
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div 
        className="relative w-full max-w-xl h-full shadow-2xl border-l-2 animate-slide-in overflow-y-auto"
        style={{ 
          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
          borderColor: theme.primary 
        }}
      >
        <div className="flex items-center justify-between p-4 border-b sticky top-0 z-10" style={{ 
          borderColor: theme.muted,
          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg 
        }}>
          <h3 className="text-lg font-bold" style={{ color: theme.text }}>{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-10 transition-all"
            style={{ color: theme.text }}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes slide-in {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
};

const PatientHistoryPanel = ({ 
  isOpen, 
  onClose, 
  isDark, 
  patient,
  history
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  if (!patient || !history) return null;

  const appointments = history.appointments || [];
  const prescriptions = history.prescriptions || [];

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Medical History" isDark={isDark}>
      {/* Patient Header */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl border" style={{ borderColor: theme.muted, background: `${theme.accent}10` }}>
        <img 
          src={patient.avatar} 
          alt={patient.fullName}
          className="w-12 h-12 rounded-full border-2"
          style={{ borderColor: theme.accent }}
        />
        <div>
          <h2 className="text-lg font-bold" style={{ color: theme.text }}>{patient.fullName}</h2>
          <p className="text-sm" style={{ color: theme.muted }}>
            {patient.email} • {patient.phone}
          </p>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} style={{ color: theme.primary }} />
          <h3 className="text-md font-bold" style={{ color: theme.text }}>Past Appointments</h3>
          <span 
            className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: `${theme.primary}20`, color: theme.primary }}
          >
            {appointments.length}
          </span>
        </div>

        <div className="space-y-3">
          {appointments.map(appt => (
            <div
              key={appt.id}
              className="p-4 rounded-xl border transition-all hover:shadow-md"
              style={{ borderColor: theme.muted, background: isDark ? `${COLORS.dark.secondary}50` : COLORS.light.secondary }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: theme.primary }} />
                  <span className="text-sm font-semibold" style={{ color: theme.text }}>
                    {formatDate(appt.date)}
                  </span>
                </div>
                <span 
                  className="px-2 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${theme.accent}20`, color: theme.accent }}
                >
                  {appt.type}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <User size={14} style={{ color: theme.muted }} />
                <span className="text-sm" style={{ color: theme.text }}>{appt.doctor}</span>
              </div>
              <div className="flex items-start gap-2 mb-2">
                <Stethoscope size={14} style={{ color: theme.muted }} className="mt-0.5" />
                <span className="text-sm" style={{ color: theme.text }}>{appt.diagnosis}</span>
              </div>
              {appt.notes && (
                <div className="flex items-start gap-2 pt-2 border-t" style={{ borderColor: theme.muted }}>
                  <FileText size={14} style={{ color: theme.muted }} className="mt-0.5" />
                  <span className="text-xs" style={{ color: theme.muted }}>{appt.notes}</span>
                </div>
              )}
            </div>
          ))}

          {appointments.length === 0 && (
            <div className="text-center py-6" style={{ color: theme.muted }}>
              <Calendar size={32} className="mx-auto mb-2" />
              <p className="text-sm">No past appointments</p>
            </div>
          )}
        </div>
      </div>

      {/* Prescriptions Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Pill size={18} style={{ color: theme.warning }} />
          <h3 className="text-md font-bold" style={{ color: theme.text }}>Prescriptions</h3>
          <span 
            className="px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: `${theme.warning}20`, color: theme.warning }}
          >
            {prescriptions.length}
          </span>
        </div>

        <div className="space-y-3">
          {prescriptions.map(rx => (
            <div
              key={rx.id}
              className="p-4 rounded-xl border transition-all hover:shadow-md"
              style={{ borderColor: theme.warning, background: `${theme.warning}10` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold" style={{ color: theme.text }}>
                  {rx.medication}
                </span>
                <span className="text-xs" style={{ color: theme.muted }}>
                  {formatDate(rx.date)}
                </span>
              </div>
              <p className="text-sm mb-1" style={{ color: theme.text }}>
                <span className="font-medium">Dosage:</span> {rx.dosage}
              </p>
              <p className="text-sm mb-1" style={{ color: theme.text }}>
                <span className="font-medium">Duration:</span> {rx.duration}
              </p>
              <p className="text-xs" style={{ color: theme.muted }}>
                Prescribed by {rx.doctor}
              </p>
            </div>
          ))}

          {prescriptions.length === 0 && (
            <div className="text-center py-6" style={{ color: theme.muted }}>
              <Pill size={32} className="mx-auto mb-2" />
              <p className="text-sm">No prescriptions on record</p>
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default PatientHistoryPanel;
