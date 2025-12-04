import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AlertTriangle, Lightbulb, X, Plus } from 'lucide-react';
import { COLORS } from '../styles/theme';
import { MOCK_PATIENTS, MOCK_PRESCRIPTIONS } from '../data/MockData';
import MedicalBackground from '../components/shared/MedicalBackground';

import PatientSelector from '../components/prescriptions/PatientSelector';
import PrescriptionForm from '../components/prescriptions/PrescriptionForm';
import PrescriptionHistoryList from '../components/prescriptions/PrescriptionHistoryList';
import ViewPrescriptionModal from '../components/prescriptions/ViewPrescriptionModal';

export default function PrescriptionsPage() {
  const { isDark } = useOutletContext();
  const theme = isDark ? COLORS.dark : COLORS.light;

  const [patients] = useState(MOCK_PATIENTS);
  const [prescriptions, setPrescriptions] = useState(MOCK_PRESCRIPTIONS);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [viewingPrescription, setViewingPrescription] = useState(null);
  const [showMockWarning, setShowMockWarning] = useState(true);
  const [showTip, setShowTip] = useState(true);

  const selectedPatient = patients.find(p => p.id === selectedPatientId);
  const patientPrescriptions = selectedPatientId
    ? prescriptions.filter(p => p.patientId === selectedPatientId)
    : [];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFormModalOpen) {
          setIsFormModalOpen(false);
          setEditingPrescription(null);
        } else if (isViewModalOpen) {
          setIsViewModalOpen(false);
          setViewingPrescription(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormModalOpen, isViewModalOpen]);

  const handleSavePrescription = (prescription) => {
    if (editingPrescription) {
      setPrescriptions(prescriptions.map(p => p.id === prescription.id ? prescription : p));
    } else {
      setPrescriptions([prescription, ...prescriptions]);
    }
    setIsFormModalOpen(false);
    setEditingPrescription(null);
  };

  const handleViewPrescription = (prescription) => {
    setViewingPrescription(prescription);
    setIsViewModalOpen(true);
  };

  const handleSendPrescription = (prescription) => {
    setPrescriptions(prescriptions.map(p =>
      p.id === prescription.id ? { ...p, status: 'sent' } : p
    ));
  };

  const handleNewPrescription = () => {
    if (!selectedPatient) {
      alert('Please select a patient first');
      return;
    }
    setEditingPrescription(null);
    setIsFormModalOpen(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] gap-4">
      {/* Mock Data Warning Banner */}
      {showMockWarning && (
        <div
          className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in"
          style={{
            background: `${theme.warning}25`,
            borderColor: `${theme.warning}40`
          }}
        >
          <AlertTriangle size={20} style={{ color: theme.warning }} />
          <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
            <span className="font-bold">Demo Mode:</span> You are viewing mock prescription data. Changes will not be saved to a database.
          </p>
          <button
            onClick={() => setShowMockWarning(false)}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ color: theme.muted }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Pro Tip Banner */}
      {showTip && (
        <div
          className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in"
          style={{
            background: `${theme.accent}25`,
            borderColor: `${theme.accent}40`
          }}
        >
          <Lightbulb size={20} style={{ color: theme.accent }} />
          <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
            <span className="font-bold">Pro Tip:</span> Select a patient to view their prescription history or create a new prescription. Use the medicine search to quickly add medications.
          </p>
          <button
            onClick={() => setShowTip(false)}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ color: theme.muted }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-1 gap-6 overflow-hidden">
        <PatientSelector
          patients={patients}
          selectedPatientId={selectedPatientId}
          setSelectedPatientId={setSelectedPatientId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          theme={theme}
          isDark={isDark}
        />

        {/* Main Content */}
        <div
          className="flex-1 rounded-xl shadow-lg border-2 overflow-hidden flex flex-col relative"
          style={{ background: theme.cardBg, borderColor: theme.primary }}
        >
          <MedicalBackground theme={theme} />

          {selectedPatient ? (
            <>
              {/* Header */}
              <div className="p-6 pb-0 flex justify-between items-end border-b pb-6 relative z-10" style={{ borderColor: theme.border }}>
                <div className="flex items-center gap-6">
                  <img
                    src={selectedPatient.image}
                    alt={selectedPatient.name}
                    className="w-24 h-24 rounded-2xl shadow-lg border-4 z-10"
                    style={{ borderColor: theme.primary }}
                  />
                  <div className="mb-2">
                    <h1 className="text-3xl font-black tracking-tight" style={{ color: theme.text }}>
                      {selectedPatient.name}
                    </h1>
                    <div className="flex flex-wrap gap-3 mt-3 font-medium text-sm">
                      <span
                        className="flex items-center gap-1 px-3 py-1 rounded-full"
                        style={{ background: `${theme.primary}40`, color: theme.text }}
                      >
                        ID: #{selectedPatient.id} • {selectedPatient.age} yrs
                      </span>
                      <span
                        className="flex items-center gap-1 px-3 py-1 rounded-full"
                        style={{ background: `${theme.success}25`, color: theme.text }}
                      >
                        {patientPrescriptions.length} Prescription(s)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleNewPrescription}
                  className="mb-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                  style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
                >
                  <Plus size={20} /> New Prescription
                </button>
              </div>

              {/* Prescription History */}
              <div className="flex-1 overflow-y-auto p-6 pt-6 relative z-10">
                <PrescriptionHistoryList
                  prescriptions={patientPrescriptions}
                  theme={theme}
                  isDark={isDark}
                  onViewPrescription={handleViewPrescription}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="text-center">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${theme.muted}20` }}
                >
                  <Plus size={48} style={{ color: theme.muted }} />
                </div>
                <p className="text-xl font-semibold mb-2" style={{ color: theme.text }}>Select a Patient</p>
                <p className="text-sm opacity-70" style={{ color: theme.text }}>
                  Choose a patient from the list to view their prescriptions or create a new one.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Prescription Modal */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all scale-100 border relative"
              style={{ background: theme.cardBg, borderColor: theme.border }}
            >
              <div className="p-6">
                <PrescriptionForm
                  selectedPatient={selectedPatient}
                  theme={theme}
                  isDark={isDark}
                  onSave={handleSavePrescription}
                  onClose={() => {
                    setIsFormModalOpen(false);
                    setEditingPrescription(null);
                  }}
                  editingPrescription={editingPrescription}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Prescription Modal */}
      {isViewModalOpen && (
        <ViewPrescriptionModal
          prescription={viewingPrescription}
          theme={theme}
          isDark={isDark}
          onClose={() => {
            setIsViewModalOpen(false);
            setViewingPrescription(null);
          }}
          onDownload={() => {
            console.log('Prescription downloaded');
          }}
          onSend={handleSendPrescription}
        />
      )}
    </div>
  );
}

