import React from "react";
import { Search } from "lucide-react";

const SearchFilter = ({
  isDark,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  searchPlaceholder,
  statusOptions,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: isDark ? "#94A3B8" : "#6B7280" }} />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-all"
          style={{ background: isDark ? "#1E293B" : "#FFFFFF", borderColor: isDark ? "#334155" : "#D1D5DB", color: isDark ? "#F1F5F9" : "#1F2937" }}
        />
      </div>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-4 py-2 rounded-lg border outline-none transition-all"
        style={{ background: isDark ? "#1E293B" : "#FFFFFF", borderColor: isDark ? "#334155" : "#D1D5DB", color: isDark ? "#F1F5F9" : "#1F2937" }}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SearchFilter;
