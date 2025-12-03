import React from 'react';
import { FileText, X, File, Download } from 'lucide-react';

export default function AttachmentViewModal({
  attachment,
  onClose,
  theme,
  isDark
}) {
  if (!attachment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 border p-6"
        style={{ background: theme.cardBg, borderColor: theme.border }}>
        <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: theme.border }}>
          <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
            <FileText size={24} className="text-blue-500" />
            View Attachment
          </h3>
          <button onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            style={{ color: theme.muted }}>
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed mb-6"
          style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
          <File size={64} className="mb-4 opacity-50" style={{ color: theme.primary }} />
          <p className="text-lg font-bold" style={{ color: theme.text }}>{attachment.name}</p>
          <p className="text-sm uppercase tracking-wider font-bold mt-1" style={{ color: theme.muted }}>{attachment.type} File</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold transition-colors"
            style={{ color: theme.text, background: isDark ? theme.secondary : '#F3F4F6' }}>
            Close
          </button>
          <button
            className="px-6 py-2.5 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            style={{ background: theme.primary }}>
            <Download size={18} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}
