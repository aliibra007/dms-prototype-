import React from 'react';
import { Clock, Edit2, Trash2, Paperclip, Eye, FileText } from 'lucide-react';

export default function MedicalHistoryTimeline({
  selectedPatient,
  theme,
  isDark,
  onEditRecord,
  onDeleteRecord,
  onViewAttachment,
  scrollToRecord,
  onNewEntry
}) {
  return (
    <div
      className="flex-1 overflow-y-auto p-8 pt-8 relative z-10"
      style={{ background: 'transparent' }}
    >
      <h3 className="text-xl font-bold mb-8 flex items-center gap-2" style={{ color: theme.text }}>
        <Clock size={24} className="text-blue-500" /> Medical Timeline
      </h3>

      <div className="relative border-l-4 space-y-8 ml-4" style={{ borderColor: theme.border }}>
        {selectedPatient.history.length > 0 ? (
          selectedPatient.history.map((record, idx) => {
            const cardColors = [theme.success, theme.warning, theme.danger, theme.primary];
            const currentColor = cardColors[idx % cardColors.length];

            return (
              <div key={record.id} id={`record-${record.id}`} className="relative pl-8 group">
                {/* Timeline Dot */}
                <div
                  className="absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 transition-transform group-hover:scale-125 cursor-pointer"
                  style={{ background: theme.cardBg, borderColor: currentColor }}
                  onClick={() => scrollToRecord(record.id)}
                ></div>

                <div className="rounded-xl border-2 shadow-sm p-5 relative transition-all hover:shadow-md"
                  style={{ borderColor: currentColor, background: theme.cardBg }}>
                  <div className="flex justify-between items-start mb-4 border-b pb-3" style={{ borderColor: theme.border }}>
                    <div>
                      <h4 className="font-bold text-xl" style={{ color: theme.primary }}>{record.diagnosis}</h4>
                      <div className="flex flex-col gap-1 mt-1">
                        <p className="text-sm font-bold opacity-80" style={{ color: theme.text }}>{record.date} • {record.doctor}</p>
                        {record.secretary && (
                          <p className="text-xs font-bold opacity-60" style={{ color: theme.text }}>Secretary: {record.secretary}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEditRecord(record)}
                        className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
                        style={{ color: theme.accent, background: `${theme.accent}10` }}
                        title="Edit Record"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record)}
                        className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
                        style={{ color: theme.danger, background: `${theme.danger}10` }}
                        title="Delete Record"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70" style={{ color: theme.text }}>Symptoms</p>
                      <p className="text-base leading-relaxed" style={{ color: theme.text }}>{record.symptoms}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70" style={{ color: theme.text }}>Treatment</p>
                      <p className="text-base leading-relaxed" style={{ color: theme.text }}>{record.treatment}</p>
                    </div>
                  </div>

                  {record.attachments.length > 0 && (
                    <div className="mt-5 pt-4 border-t" style={{ borderColor: theme.border }}>
                      <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: theme.muted }}>Attachments</p>
                      <div className="flex flex-wrap gap-3">
                        {record.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            onClick={() => onViewAttachment({ name: file, type: file.split('.').pop() })}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg border group cursor-pointer hover:border-blue-500 transition-colors"
                            style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F3F4F6' }}
                          >
                            <Paperclip size={16} style={{ color: theme.muted }} />
                            <span className="text-sm font-medium" style={{ color: theme.text }}>{file}</span>
                            <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-1 hover:text-blue-500" title="View"><Eye size={14} /></button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 rounded-xl border-2 border-dashed" style={{ borderColor: theme.border }}>
            <FileText size={48} className="mx-auto mb-3 opacity-30" style={{ color: theme.text }} />
            <p className="font-medium opacity-70" style={{ color: theme.text }}>No medical records found for this patient.</p>
            <button
              onClick={onNewEntry}
              className="mt-4 text-sm font-bold hover:underline"
              style={{ color: theme.primary }}
            >
              Create First Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
