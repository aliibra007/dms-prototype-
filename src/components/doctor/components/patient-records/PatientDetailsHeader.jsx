import React from 'react';
import { User, Activity, Stethoscope, Plus } from 'lucide-react';

export default function PatientDetailsHeader({ selectedPatient, theme, onNewEntry, largePfpBorderColor }) {
  return (
    <div className="p-8 pb-0 flex flex-col md:flex-row justify-between items-start md:items-end border-b pb-6 relative z-10 gap-4 md:gap-0" style={{ borderColor: theme.border }}>
      <div className="flex items-center gap-6 w-full md:w-auto">
        <img src={selectedPatient.image} alt={selectedPatient.name} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-lg -mb-4 border-4 z-10" style={{ borderColor: largePfpBorderColor }} />
        <div className="mb-2 flex-1">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight" style={{ color: theme.text }}>{selectedPatient.name}</h1>
          <div className="flex flex-wrap gap-2 md:gap-3 mt-2 md:mt-3 font-medium text-sm">
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm" style={{ background: `${theme.primary}40`, color: theme.text }}>
              <User size={14} className="text-blue-500" /> {selectedPatient.gender}, {selectedPatient.age} yrs
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm" style={{ background: `${theme.danger}25`, color: theme.text }}>
              <Activity size={14} className="text-red-500" /> Blood: {selectedPatient.bloodType}
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs md:text-sm" style={{ background: `${theme.success}25`, color: theme.text }}>
              <Stethoscope size={14} className="text-green-500" /> {selectedPatient.history.length} Visits
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onNewEntry}
        className="w-full md:w-auto mb-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
        style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
      >
        <Plus size={20} /> New Entry
      </button>
    </div>
  );
}
