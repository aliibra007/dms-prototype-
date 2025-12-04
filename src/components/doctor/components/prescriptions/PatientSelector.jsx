import React from 'react';
import { Search, ChevronRight } from 'lucide-react';

export default function PatientSelector({
  patients,
  selectedPatientId,
  setSelectedPatientId,
  searchTerm,
  setSearchTerm,
  theme,
  isDark
}) {
  const filteredPatients = patients
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const indexA = a.name.toLowerCase().indexOf(searchTerm.toLowerCase());
      const indexB = b.name.toLowerCase().indexOf(searchTerm.toLowerCase());
      return indexA - indexB;
    });

  const HighlightedText = ({ text, highlight }) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={i}
              className="rounded px-0.5 transition-colors"
              style={{ background: `${theme.warning}40`, color: theme.text }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div
      className="w-1/3 flex flex-col rounded-xl shadow-lg border-2 overflow-hidden select-none"
      style={{ background: theme.cardBg, borderColor: theme.primary }}
    >
      <div className="p-4 border-b" style={{ borderColor: theme.border }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: theme.text }}>Select Patient</h2>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.muted }} />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all"
            style={{
              background: isDark ? theme.secondary : '#F3F4F6',
              borderColor: theme.border,
              color: theme.text,
              '--tw-ring-color': theme.primary
            }}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredPatients.map((patient, idx) => {
          const cardColors = [theme.success, theme.warning, theme.danger, theme.primary];
          const borderColor = cardColors[idx % cardColors.length];

          return (
            <div
              key={patient.id}
              onClick={() => setSelectedPatientId(patient.id)}
              className="p-4 border-b cursor-pointer transition-colors hover:bg-opacity-50 flex items-center gap-3"
              style={{
                borderColor: theme.border,
                background: selectedPatientId === patient.id ? `${theme.primary}20` : 'transparent'
              }}
            >
              <div className="relative">
                <img
                  src={patient.image}
                  alt={patient.name}
                  className="w-12 h-12 rounded-full border-2"
                  style={{ borderColor: borderColor }}
                />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-base" style={{ color: theme.text }}>
                  <HighlightedText text={patient.name} highlight={searchTerm} />
                </p>
                <p className="text-sm font-bold opacity-80" style={{ color: theme.text }}>ID: #{patient.id} • {patient.age} yrs</p>
              </div>
              <ChevronRight size={16} style={{ color: theme.muted }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}


