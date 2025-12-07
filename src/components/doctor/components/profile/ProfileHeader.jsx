import React from 'react';
import { COLORS } from '../../styles/theme';

export default function ProfileHeader({ isDark }) {
  return (
    <div>
      <h1 className="text-2xl font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
        Profile & Settings
      </h1>
      <p className="text-sm mt-1 opacity-70" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
        Manage your personal information and account settings
      </p>
    </div>
  );
}
