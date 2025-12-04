import React from 'react';
import { Clock, FileText } from 'lucide-react';
import PrescriptionCard from './PrescriptionCard';

export default function PrescriptionHistoryList({
  prescriptions,
  theme,
  isDark,
  onViewPrescription
}) {
  if (prescriptions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ background: `${theme.muted}20` }}
        >
          <FileText size={32} style={{ color: theme.muted }} />
        </div>
        <p className="text-lg font-semibold mb-2" style={{ color: theme.text }}>No Prescriptions Found</p>
        <p className="text-sm opacity-70" style={{ color: theme.text }}>This patient has no prescription history yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-6">
        <Clock size={24} style={{ color: theme.primary }} />
        <h3 className="text-xl font-bold" style={{ color: theme.text }}>Prescription History</h3>
        <span
          className="px-3 py-1 rounded-full text-sm font-semibold"
          style={{
            background: `${theme.primary}20`,
            color: theme.primary
          }}
        >
          {prescriptions.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((prescription) => (
          <PrescriptionCard
            key={prescription.id}
            prescription={prescription}
            theme={theme}
            isDark={isDark}
            onView={() => onViewPrescription(prescription)}
          />
        ))}
      </div>
    </div>
  );
}


