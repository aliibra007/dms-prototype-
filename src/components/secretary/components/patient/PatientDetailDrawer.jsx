import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, Heart, FileText, Edit2, History, Clock, AlertTriangle, Upload, Download, Eye, Trash2 } from 'lucide-react';
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

// Info Row Component
const InfoRow = ({ icon: Icon, label, value, isDark }) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  return (
    <div className="flex items-start gap-3 py-2">
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${theme.primary}20` }}
      >
        <Icon size={16} style={{ color: theme.primary }} />
      </div>
      <div>
        <p className="text-xs" style={{ color: theme.muted }}>{label}</p>
        <p className="text-sm font-medium" style={{ color: theme.text }}>{value || 'N/A'}</p>
      </div>
    </div>
  );
};

// Patient Detail Drawer
const PatientDetailDrawer = ({ 
  isOpen, 
  onClose, 
  isDark, 
  patient,
  documents,
  onEdit,
  onViewHistory,
  onUploadDocument,
  onDeleteDocument
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [activeTab, setActiveTab] = useState('info');

  if (!patient) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const calculateAge = (birthdate) => {
    if (!birthdate) return 'N/A';
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return `${age} years`;
  };

  const tabs = [
    { id: 'info', label: 'Information' },
    { id: 'documents', label: 'Documents' },
  ];

  const patientDocuments = documents || [];

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Patient Details" isDark={isDark}>
      {/* Patient Header */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl border" style={{ borderColor: theme.muted, background: `${theme.primary}10` }}>
        <img 
          src={patient.avatar} 
          alt={patient.fullName}
          className="w-16 h-16 rounded-full border-2"
          style={{ borderColor: theme.primary }}
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold" style={{ color: theme.text }}>{patient.fullName}</h2>
          <p className="text-sm" style={{ color: theme.muted }}>
            {patient.gender} • {calculateAge(patient.birthdate)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => onEdit(patient)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 border"
          style={{ borderColor: theme.primary, color: theme.primary }}
        >
          <Edit2 size={16} />
          Edit
        </button>
        <button
          onClick={() => onViewHistory(patient)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{ background: theme.primary, color: '#FFFFFF' }}
        >
          <History size={16} />
          History
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b" style={{ borderColor: theme.muted }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-2 text-sm font-semibold transition-all relative"
            style={{ 
              color: activeTab === tab.id ? theme.primary : theme.text,
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div 
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: theme.primary }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <div className="space-y-1">
          <InfoRow icon={Mail} label="Email" value={patient.email} isDark={isDark} />
          <InfoRow icon={Phone} label="Phone" value={patient.phone} isDark={isDark} />
          <InfoRow icon={Calendar} label="Birthdate" value={formatDate(patient.birthdate)} isDark={isDark} />
          <InfoRow icon={MapPin} label="Address" value={patient.address} isDark={isDark} />
          <InfoRow icon={Heart} label="Emergency Contact" value={patient.emergencyContact} isDark={isDark} />

          <InfoRow icon={Clock} label="Last Visit" value={formatDate(patient.lastVisit)} isDark={isDark} />
          <InfoRow icon={Calendar} label="Registered" value={formatDate(patient.registeredDate)} isDark={isDark} />
          
          {patient.notes && (
            <div className="mt-4 p-3 rounded-lg border" style={{ borderColor: theme.warning, background: `${theme.warning}10` }}>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} style={{ color: theme.warning }} />
                <span className="text-sm font-semibold" style={{ color: theme.warning }}>Notes</span>
              </div>
              <p className="text-sm" style={{ color: theme.text }}>{patient.notes}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'documents' && (
        <div>
          {/* Mock Data Notice */}
          <div 
            className="flex items-center gap-2 p-3 rounded-lg mb-4"
            style={{ background: `${theme.info}20`, borderColor: theme.info }}
          >
            <FileText size={16} style={{ color: theme.info }} />
            <p className="text-xs" style={{ color: theme.text }}>
              Documents shown here are mock files.
            </p>
          </div>

          {/* Upload Button */}
          <button
            onClick={onUploadDocument}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02] border-2 border-dashed mb-4"
            style={{ borderColor: theme.muted, color: theme.text }}
          >
            <Upload size={18} />
            Upload Document
          </button>

          {/* Documents List */}
          <div className="space-y-2">
            {patientDocuments.map(doc => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg border transition-all hover:shadow-md"
                style={{ borderColor: theme.muted, background: isDark ? `${COLORS.dark.secondary}50` : COLORS.light.secondary }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${theme.accent}20` }}
                  >
                    <FileText size={18} style={{ color: theme.accent }} />
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: theme.text }}>{doc.name}</p>
                    <p className="text-xs" style={{ color: theme.muted }}>
                      {doc.type} • {doc.size} • {doc.uploadDate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    className="p-2 rounded-lg hover:bg-opacity-20 transition-all"
                    style={{ color: theme.primary }}
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-opacity-20 transition-all"
                    style={{ color: theme.accent }}
                    title="Download"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteDocument(doc)}
                    className="p-2 rounded-lg hover:bg-opacity-20 transition-all"
                    style={{ color: theme.danger }}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            {patientDocuments.length === 0 && (
              <div className="text-center py-8" style={{ color: theme.muted }}>
                <FileText size={32} className="mx-auto mb-2" />
                <p className="text-sm">No documents uploaded</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default PatientDetailDrawer;
