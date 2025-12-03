import React from 'react';
import { User, Activity, Stethoscope, Plus } from 'lucide-react';

export default function PatientDetailsHeader({ selectedPatient, theme, onNewEntry, largePfpBorderColor }) {
  return (
    <div className="p-8 pb-0 flex justify-between items-end border-b pb-6 relative z-10" style={{ borderColor: theme.border }}>
      <div className="flex items-center gap-6">
        <img src={selectedPatient.image} alt={selectedPatient.name} className="w-32 h-32 rounded-2xl shadow-lg -mb-4 border-4 z-10" style={{ borderColor: largePfpBorderColor }} />
        <div className="mb-2">
          <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.text }}>{selectedPatient.name}</h1>
          <div className="flex flex-wrap gap-3 mt-3 font-medium text-sm">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${theme.primary}40`, color: theme.text }}>
              <User size={14} className="text-blue-500" /> {selectedPatient.gender}, {selectedPatient.age} yrs
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${theme.danger}25`, color: theme.text }}>
              <Activity size={14} className="text-red-500" /> Blood: {selectedPatient.bloodType}
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${theme.success}25`, color: theme.text }}>
              <Stethoscope size={14} className="text-green-500" /> {selectedPatient.history.length} Visits
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onNewEntry}
        className="mb-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
      >
        <Plus size={20} /> New Entry
      </button>
    </div>
  );
}
