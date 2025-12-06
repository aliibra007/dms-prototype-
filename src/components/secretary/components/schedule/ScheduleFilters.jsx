import React from 'react';
import { Search, Calendar, Filter } from 'lucide-react';
import { COLORS } from '../../styles/theme';

const ScheduleFilters = ({ 
  isDark, 
  doctors, 
  selectedDoctor, 
  onDoctorChange, 
  selectedDate, 
  onDateChange, 
  viewMode, 
  onViewModeChange,
  statusFilter,
  onStatusFilterChange 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  const selectStyles = {
    background: isDark ? `${COLORS.dark.secondary}80` : COLORS.light.cardBg,
    borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
    color: theme.text,
  };

  const inputStyles = {
    ...selectStyles,
    outline: 'none',
  };

  return (
    <div 
      className="rounded-xl p-4 shadow-lg border-2 mb-6"
      style={{ 
        background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, 
        borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary 
      }}
    >
      <div className="flex flex-wrap gap-4 items-center">
        {/* Doctor Dropdown */}
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs font-semibold mb-1 block" style={{ color: theme.text }}>
            Doctor
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => onDoctorChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm font-medium transition-all focus:ring-2"
            style={{
              ...selectStyles,
              focusRing: theme.primary,
            }}
          >
            <option value="all">All Doctors</option>
            {doctors.map(doc => (
              <option key={doc.id} value={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>

        {/* Date Picker */}
        <div className="flex-1 min-w-[180px]">
          <label className="text-xs font-semibold mb-1 block" style={{ color: theme.text }}>
            Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border text-sm font-medium transition-all focus:ring-2"
              style={inputStyles}
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex-shrink-0">
          <label className="text-xs font-semibold mb-1 block" style={{ color: theme.text }}>
            View
          </label>
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: theme.muted }}>
            <button
              onClick={() => onViewModeChange('daily')}
              className="px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: viewMode === 'daily' ? theme.primary : (isDark ? COLORS.dark.secondary : COLORS.light.secondary),
                color: viewMode === 'daily' ? '#FFFFFF' : theme.text,
              }}
            >
              Daily
            </button>
            <button
              onClick={() => onViewModeChange('weekly')}
              className="px-4 py-2 text-sm font-semibold transition-all"
              style={{
                background: viewMode === 'weekly' ? theme.primary : (isDark ? COLORS.dark.secondary : COLORS.light.secondary),
                color: viewMode === 'weekly' ? '#FFFFFF' : theme.text,
              }}
            >
              Weekly
            </button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex-1 min-w-[150px]">
          <label className="text-xs font-semibold mb-1 block" style={{ color: theme.text }}>
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm font-medium transition-all focus:ring-2"
            style={selectStyles}
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ScheduleFilters;
