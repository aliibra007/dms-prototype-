import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, Pill, AlertCircle, FileText } from 'lucide-react';
import MedicineSuggestionList from './MedicineSuggestionList';
import { MOCK_MEDICINES } from '../../data/MockData';

export default function PrescriptionForm({
  selectedPatient,
  theme,
  isDark,
  onSave,
  onClose,
  editingPrescription
}) {
  const [diagnosis, setDiagnosis] = useState(editingPrescription?.diagnosis || '');
  const [notes, setNotes] = useState(editingPrescription?.notes || '');
  const [medicines, setMedicines] = useState(editingPrescription?.medicines || []);
  const [medicineSearch, setMedicineSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSuggestions]);

  const handleAddMedicine = (medicine) => {
    const newMedicine = {
      ...medicine,
      instructions: ''
    };
    setMedicines([...medicines, newMedicine]);
    setMedicineSearch('');
    setShowSuggestions(false);
  };

  const handleRemoveMedicine = (index) => {
    setMedicines(medicines.filter((_, i) => i !== index));
  };

  const handleUpdateMedicine = (index, field, value) => {
    const updated = medicines.map((med, i) =>
      i === index ? { ...med, [field]: value } : med
    );
    setMedicines(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (medicines.length === 0) {
      alert('Please add at least one medicine');
      return;
    }

    const prescription = {
      id: editingPrescription?.id || Date.now(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      date: editingPrescription?.date || new Date().toISOString().split('T')[0],
      diagnosis,
      notes,
      medicines,
      doctor: 'Dr. Sarah Johnson',
      status: 'draft'
    };

    onSave(prescription);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold" style={{ color: theme.text }}>
          {editingPrescription ? 'Edit Prescription' : 'Create New Prescription'}
          <span className="block text-sm font-normal mt-1 opacity-70" style={{ color: theme.text }}>
            for {selectedPatient?.name}
          </span>
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
          style={{ color: theme.muted }}
        >
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-bold" style={{ color: theme.text }}>Diagnosis *</label>
          <div className="relative">
            <AlertCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.muted }} />
            <input
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute Bronchitis"
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all"
              style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold" style={{ color: theme.text }}>Add Medicine *</label>
          <div className="relative" ref={suggestionRef}>
            <Pill size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.muted }} />
            <input
              value={medicineSearch}
              onChange={(e) => {
                setMedicineSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search medicine..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all"
              style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }}
            />
            {showSuggestions && medicineSearch && (
              <MedicineSuggestionList
                medicines={MOCK_MEDICINES}
                searchTerm={medicineSearch}
                onSelectMedicine={handleAddMedicine}
                theme={theme}
                isDark={isDark}
              />
            )}
          </div>
        </div>

        {medicines.length > 0 && (
          <div className="space-y-3">
            <label className="text-sm font-bold" style={{ color: theme.text }}>Prescribed Medicines</label>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border"
                  style={{ background: isDark ? theme.secondary : '#F9FAFB', borderColor: theme.border }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: `${theme.primary}20` }}
                      >
                        <Pill size={20} style={{ color: theme.primary }} />
                      </div>
                      <div>
                        <p className="font-semibold" style={{ color: theme.text }}>{medicine.name}</p>
                        <p className="text-sm opacity-70" style={{ color: theme.text }}>
                          {medicine.dosage} • {medicine.frequency} • {medicine.duration}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedicine(index)}
                      className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
                      style={{ color: theme.danger }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      value={medicine.instructions || ''}
                      onChange={(e) => handleUpdateMedicine(index, 'instructions', e.target.value)}
                      placeholder="Additional instructions (optional)"
                      className="w-full px-3 py-2 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all text-sm"
                      style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-bold" style={{ color: theme.text }}>Additional Notes</label>
          <div className="relative">
            <FileText size={18} className="absolute left-3 top-3" style={{ color: theme.muted }} />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Additional instructions or notes for the patient..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all resize-none"
              style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: theme.border }}>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg font-bold transition-colors"
            style={{ color: theme.text, background: isDark ? theme.secondary : '#F3F4F6' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-lg font-bold text-white transition-transform hover:scale-105 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
          >
            {editingPrescription ? 'Update Prescription' : 'Save Prescription'}
          </button>
        </div>
      </form>
    </div>
  );
}

