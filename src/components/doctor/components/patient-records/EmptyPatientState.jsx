import React from 'react';
import { User } from 'lucide-react';

export default function EmptyPatientState({ theme, isDark }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-10 relative z-10" style={{ color: theme.muted }}>
      <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: isDark ? theme.secondary : '#F3F4F6' }}>
        <User size={48} className="opacity-50" />
      </div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>Select a Patient</h2>
      <p className="max-w-md mx-auto opacity-80" style={{ color: theme.text }}>Choose a patient from the sidebar list to view their full medical history, diagnosis, and treatment records.</p>
    </div>
  );
}
