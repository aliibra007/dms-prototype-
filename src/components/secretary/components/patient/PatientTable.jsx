import React, { useState } from 'react';
import { MoreVertical, Eye, Edit2, History, Trash2, UserPlus } from 'lucide-react';
import { COLORS } from '../../styles/theme';

const PatientTable = ({ 
  isDark, 
  patients,
  onViewDetails,
  onEdit,
  onViewHistory,
  onDelete,
  onRegisterNew
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div 
      className="rounded-xl p-6 shadow-lg border-2 mb-6"
      style={{ 
        background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, 
        borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary 
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold" style={{ color: theme.text }}>
          Patient Records ({patients.length})
        </h3>
        <button
          onClick={onRegisterNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: theme.primary,
            color: '#FFFFFF',
          }}
        >
          <UserPlus size={16} />
          Register New Patient
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: theme.muted }}>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Patient</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Email</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Phone</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Gender</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Last Visit</th>
              <th className="text-right py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr 
                key={patient.id} 
                className="border-b hover:bg-opacity-50 transition-colors"
                style={{ borderColor: theme.muted }}
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={patient.avatar} 
                      alt={patient.fullName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold" style={{ color: theme.text }}>
                        {patient.fullName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm" style={{ color: theme.text }}>
                  {patient.email}
                </td>
                <td className="py-3 px-4 text-sm" style={{ color: theme.text }}>
                  {patient.phone}
                </td>
                <td className="py-3 px-4">
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      background: patient.gender === 'Female' ? `${theme.accent}20` : `${theme.primary}20`, 
                      color: patient.gender === 'Female' ? theme.accent : theme.primary 
                    }}
                  >
                    {patient.gender}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm" style={{ color: theme.text }}>
                  {formatDate(patient.lastVisit)}
                </td>
                <td className="py-3 px-4 text-right relative">
                  <button
                    onClick={() => toggleDropdown(patient.id)}
                    className="p-2 rounded-lg hover:bg-opacity-10 transition-all"
                    style={{ 
                      color: theme.text,
                      background: openDropdown === patient.id ? `${theme.muted}40` : 'transparent'
                    }}
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {openDropdown === patient.id && (
                    <div 
                      className="absolute right-0 top-full mt-1 w-44 rounded-lg shadow-xl border overflow-hidden z-10"
                      style={{ 
                        background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
                        borderColor: theme.muted 
                      }}
                    >
                      <button
                        onClick={() => { onViewDetails(patient); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all"
                        style={{ color: theme.text }}
                      >
                        <Eye size={14} />
                        View Details
                      </button>
                      <button
                        onClick={() => { onEdit(patient); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all"
                        style={{ color: theme.text }}
                      >
                        <Edit2 size={14} />
                        Edit Patient
                      </button>
                      <button
                        onClick={() => { onViewHistory(patient); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all"
                        style={{ color: theme.text }}
                      >
                        <History size={14} />
                        View History
                      </button>
                      <button
                        onClick={() => { onDelete(patient); setOpenDropdown(null); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all border-t"
                        style={{ color: theme.danger, borderColor: theme.muted }}
                      >
                        <Trash2 size={14} />
                        Delete Patient
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {patients.length === 0 && (
        <div className="text-center py-8" style={{ color: theme.text }}>
          <p className="text-sm">No patients found</p>
        </div>
      )}
    </div>
  );
};

export default PatientTable;
