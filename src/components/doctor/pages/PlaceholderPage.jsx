import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function PlaceholderPage({ title }) {
  const { isDark } = useOutletContext();
  return (
    <div className="rounded-xl p-8 shadow-lg border-2 animated-border-card" style={{ background: isDark ? '#1E293Bcc' : '#FFFFFFcc', borderColor: isDark ? 'hsl(240, 8%, 35%)' : 'hsl(240, 10%, 85%)', color: isDark ? '#F1F5F9' : '#1F2937' }}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p style={{ color: isDark ? 'hsl(240, 8%, 35%)' : 'hsl(240, 10%, 85%)' }}>
        This section will be connected once the API endpoints are ready.
      </p>
    </div>
  );
}
