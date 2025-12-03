import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function DeleteRecordModal({
  isOpen,
  onClose,
  onDelete,
  theme,
  isDark
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100 border p-6"
        style={{ background: theme.cardBg, borderColor: theme.border }}>
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.danger}20` }}>
            <AlertTriangle size={32} style={{ color: theme.danger }} />
          </div>
          <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>Delete Record?</h3>
          <p className="text-sm mb-6 opacity-80" style={{ color: theme.text }}>
            Are you sure you want to delete this medical record? This action cannot be undone.
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl font-bold transition-colors"
              style={{ color: theme.text, background: isDark ? theme.secondary : '#F3F4F6' }}>
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform"
              style={{ background: theme.danger }}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
