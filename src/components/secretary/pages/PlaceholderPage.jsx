import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { COLORS } from '../styles/theme';

export default function PlaceholderPage({ title, description }) {
  const { isDark } = useOutletContext();
  const theme = isDark ? COLORS.dark : COLORS.light;

  return (
    <div className="rounded-xl p-8 shadow-lg border-2" style={{ 
      background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, 
      borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary,
      color: theme.text 
    }}>
      <h1 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>{title || 'Page Under Construction'}</h1>
      <p style={{ color: theme.text }}>{description || 'This page is currently being developed.'}</p>
    </div>
  );
}

