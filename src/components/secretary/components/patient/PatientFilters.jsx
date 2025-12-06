import React from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { COLORS } from '../../styles/theme';

const PatientFilters = ({ 
  isDark, 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  sortOrder,
  onSortOrderToggle,
  genderFilter,
  onGenderFilterChange 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  const selectStyles = {
    background: isDark ? `${COLORS.dark.secondary}80` : COLORS.light.cardBg,
    borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
    color: theme.text,
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
        {/* Search Bar */}
        <div className="flex-1 min-w-[250px]">
          <label className="text-xs font-semibold mb-1 block" style={{ color: theme.text }}>
            Search Patients
          </label>
          <div className="relative">
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 -translate-y-1/2" 
              style={{ color: theme.muted }} 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, email, or phone..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border text-sm font-medium transition-all focus:ring-2"
              style={selectStyles}
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="flex-shrink-0 min-w-[160px]">
          <label className="text-xs font-semibold mb-1 block" style={{ color: theme.text }}>
            Sort By
          </label>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-all"
              style={selectStyles}
            >
              <option value="name">Name</option>
              <option value="lastVisit">Last Visit</option>
              <option value="registeredDate">Registration Date</option>
            </select>
            <button
              onClick={onSortOrderToggle}
              className="p-2 rounded-lg border transition-all hover:scale-105"
              style={selectStyles}
              title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {sortOrder === 'asc' ? <SortAsc size={18} /> : <SortDesc size={18} />}
            </button>
          </div>
        </div>

        {/* Gender Filter */}
        <div className="flex-shrink-0 min-w-[140px]">
          <label className="text-xs font-semibold mb-1 block" style={{ color: theme.text }}>
            Gender
          </label>
          <select
            value={genderFilter}
            onChange={(e) => onGenderFilterChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border text-sm font-medium transition-all"
            style={selectStyles}
          >
            <option value="all">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PatientFilters;
