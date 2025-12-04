import React, { useState } from 'react';
import { Pill, Plus, X } from 'lucide-react';

export default function MedicineSuggestionList({
  medicines,
  searchTerm,
  onSelectMedicine,
  theme,
  isDark
}) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (medicine) => {
    onSelectMedicine(medicine);
    setSelectedIndex(-1);
  };

  if (!searchTerm.trim() || filteredMedicines.length === 0) {
    return null;
  }

  return (
    <div
      className="absolute z-50 w-full mt-1 rounded-lg shadow-2xl border max-h-64 overflow-y-auto"
      style={{
        background: theme.cardBg,
        borderColor: theme.border
      }}
    >
      {filteredMedicines.slice(0, 5).map((medicine, idx) => (
        <div
          key={medicine.id}
          onClick={() => handleSelect(medicine)}
          onMouseEnter={() => setSelectedIndex(idx)}
          className="p-3 cursor-pointer transition-colors border-b flex items-center gap-3"
          style={{
            borderColor: theme.border,
            background: selectedIndex === idx ? `${theme.primary}15` : 'transparent'
          }}
        >
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: `${theme.primary}20` }}
          >
            <Pill size={20} style={{ color: theme.primary }} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm" style={{ color: theme.text }}>{medicine.name}</p>
            <p className="text-xs opacity-70" style={{ color: theme.text }}>
              {medicine.dosage} • {medicine.type}
            </p>
          </div>
          <Plus size={16} style={{ color: theme.primary }} />
        </div>
      ))}
    </div>
  );
}


