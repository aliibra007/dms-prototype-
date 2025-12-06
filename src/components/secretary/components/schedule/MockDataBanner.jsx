import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { COLORS } from '../../styles/theme';

const MockDataBanner = ({ isDark, onDismiss }) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  return (
    <div
      className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in"
      style={{
        background: `${theme.warning}25`,
        borderColor: `${theme.warning}40`
      }}
    >
      <AlertTriangle size={20} style={{ color: theme.warning }} />
      <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
        <span className="font-bold">MOCK DATA ACTIVE</span> — This page is displaying placeholder data.
      </p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          style={{ color: theme.text }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default MockDataBanner;
