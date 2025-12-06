import React, { useState } from 'react';
import { MoreVertical, Edit2, Calendar, XCircle, Trash2, UserCheck } from 'lucide-react';
import { COLORS } from '../../styles/theme';

const AppointmentTable = ({ 
  isDark, 
  appointments,
  onEdit,
  onReschedule,
  onCancel,
  onDelete,
  onCreateNew
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [openDropdown, setOpenDropdown] = useState(null);

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: { bg: `${theme.success}20`, color: theme.success },
      pending: { bg: `${theme.warning}20`, color: theme.warning },
      cancelled: { bg: `${theme.danger}20`, color: theme.danger },
      completed: { bg: `${theme.info}20`, color: theme.info },
    };
    return styles[status] || styles.pending;
  };

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
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
          Appointments
        </h3>
        <button
          onClick={onCreateNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: theme.accent,
            color: '#FFFFFF',
          }}
        >
          <Calendar size={16} />
          New Appointment
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b" style={{ borderColor: theme.muted }}>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Patient</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Doctor</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Time</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Walk-in</th>
              <th className="text-right py-3 px-4 text-sm font-semibold" style={{ color: theme.text }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => {
              const badge = getStatusBadge(appt.status);
              return (
                <tr 
                  key={appt.id} 
                  className="border-b hover:bg-opacity-50 transition-colors"
                  style={{ 
                    borderColor: theme.muted,
                    background: isDark ? 'transparent' : 'transparent',
                  }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ 
                          background: `${theme.primary}20`, 
                          color: theme.primary 
                        }}
                      >
                        {appt.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-medium" style={{ color: theme.text }}>
                        {appt.patientName}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: theme.text }}>
                    {appt.doctorName}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium" style={{ color: theme.text }}>
                    {appt.time}
                  </td>
                  <td className="py-3 px-4 text-sm" style={{ color: theme.text }}>
                    {appt.type}
                  </td>
                  <td className="py-3 px-4">
                    <span 
                      className="px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {appt.isWalkIn && (
                      <span 
                        className="px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit"
                        style={{ background: `${theme.info}20`, color: theme.info }}
                      >
                        <UserCheck size={12} />
                        Yes
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right relative">
                    <button
                      onClick={() => toggleDropdown(appt.id)}
                      className="p-2 rounded-lg hover:bg-opacity-10 transition-all"
                      style={{ 
                        color: theme.text,
                        background: openDropdown === appt.id ? `${theme.muted}40` : 'transparent'
                      }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    
                    {openDropdown === appt.id && (
                      <div 
                        className="absolute right-0 top-full mt-1 w-40 rounded-lg shadow-xl border overflow-hidden z-10"
                        style={{ 
                          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
                          borderColor: theme.muted 
                        }}
                      >
                        <button
                          onClick={() => { onEdit(appt); setOpenDropdown(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all"
                          style={{ color: theme.text }}
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => { onReschedule(appt); setOpenDropdown(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all"
                          style={{ color: theme.text }}
                        >
                          <Calendar size={14} />
                          Reschedule
                        </button>
                        <button
                          onClick={() => { onCancel(appt); setOpenDropdown(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all"
                          style={{ color: theme.warning }}
                        >
                          <XCircle size={14} />
                          Cancel
                        </button>
                        <button
                          onClick={() => { onDelete(appt); setOpenDropdown(null); }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-opacity-50 transition-all border-t"
                          style={{ color: theme.danger, borderColor: theme.muted }}
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-8" style={{ color: theme.text }}>
          <p className="text-sm">No appointments found</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
