import React from 'react';
import { Calendar, Pill, User, FileText } from 'lucide-react';

export default function PrescriptionCard({
  prescription,
  theme,
  isDark,
  onView
}) {
  return (
    <div
      className="rounded-xl p-5 border-2 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
      style={{
        background: theme.cardBg,
        borderColor: theme.border
      }}
      onClick={onView}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ background: `${theme.primary}20` }}
          >
            <Pill size={24} style={{ color: theme.primary }} />
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: theme.text }}>{prescription.patientName}</h3>
            <p className="text-sm opacity-70" style={{ color: theme.text }}>{prescription.diagnosis}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm mb-1" style={{ color: theme.text }}>
            <Calendar size={14} />
            <span>{new Date(prescription.date).toLocaleDateString()}</span>
          </div>
          <span
            className="px-2 py-1 rounded-full text-xs font-semibold"
            style={{
              background: `${theme.success}25`,
              color: theme.success
            }}
          >
            {prescription.status === 'sent' ? 'Sent' : 'Draft'}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm" style={{ color: theme.text }}>
          <Pill size={14} style={{ color: theme.primary }} />
          <span className="font-semibold">{prescription.medicines.length} Medicine(s)</span>
        </div>
        <div className="flex items-center gap-2 text-sm" style={{ color: theme.text }}>
          <User size={14} />
          <span>{prescription.doctor}</span>
        </div>
      </div>

      {prescription.notes && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: theme.border }}>
          <div className="flex items-start gap-2">
            <FileText size={14} className="mt-0.5" style={{ color: theme.text }} />
            <p className="text-sm line-clamp-2" style={{ color: theme.text }}>{prescription.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}


