import React from 'react';
import { COLORS } from '../../styles/theme';

const ROLE_COLORS = {
  Doctor: { light: '#7C3AED', dark: '#A78BFA' }, // Primary
  Patient: { light: '#0EA5E9', dark: '#38BDF8' }, // Accent
  Secretary: { light: '#10B981', dark: '#34D399' }, // Success
};

export default function RoleBadge({ role, isDark, size = 'md' }) {
  const color = ROLE_COLORS[role] ? (isDark ? ROLE_COLORS[role].dark : ROLE_COLORS[role].light) : (isDark ? COLORS.dark.muted : COLORS.light.muted);
  
  const styles = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
  };

  return (
    <span
      className={`rounded-full font-medium inline-flex items-center justify-center ${styles[size]}`}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        border: `1px solid ${color}40`,
      }}
    >
      {role}
    </span>
  );
}
