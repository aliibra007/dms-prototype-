import React from 'react';
import { Clock, User, Plus, Edit2, Trash2 } from 'lucide-react';
import { COLORS } from '../../styles/theme';

const AvailabilityGrid = ({ 
  isDark, 
  timeSlots, 
  doctors,
  onSlotClick, 
  onAddSlot,
  onEditSlot,
  onDeleteSlot 
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return theme.success;
      case 'booked':
        return theme.primary;
      case 'cancelled':
        return theme.danger;
      default:
        return theme.muted;
    }
  };

  const getStatusBg = (status) => {
    const color = getStatusColor(status);
    return `${color}20`;
  };

  const getDoctorColor = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor?.color || theme.primary;
  };

  return (
    <div 
      className="rounded-xl p-6 shadow-lg border-2 mb-6"
      style={{ 
        background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, 
        borderColor: isDark ? COLORS.dark.accent : COLORS.light.accent 
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold" style={{ color: theme.text }}>
          Availability Grid
        </h3>
        <button
          onClick={onAddSlot}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: theme.primary,
            color: '#FFFFFF',
          }}
        >
          <Plus size={16} />
          Add Slot
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {timeSlots.map(slot => {
          const statusColor = getStatusColor(slot.status);
          const doctorColor = getDoctorColor(slot.doctorId);
          const doctor = doctors.find(d => d.id === slot.doctorId);
          
          return (
            <div
              key={slot.id}
              onClick={() => onSlotClick(slot)}
              className="relative rounded-xl p-4 border-2 cursor-pointer transition-all hover:scale-105 hover:shadow-lg group"
              style={{
                background: getStatusBg(slot.status),
                borderColor: statusColor,
              }}
            >
              {/* Time */}
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} style={{ color: statusColor }} />
                <span className="text-sm font-bold" style={{ color: theme.text }}>
                  {slot.time}
                </span>
              </div>

              {/* Status Badge */}
              <div
                className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold mb-2"
                style={{
                  background: statusColor,
                  color: '#FFFFFF',
                }}
              >
                {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
              </div>

              {/* Patient Name (if booked) */}
              {slot.patientName && (
                <div className="flex items-center gap-1 mt-1">
                  <User size={12} style={{ color: theme.text }} />
                  <span className="text-xs truncate" style={{ color: theme.text }}>
                    {slot.patientName}
                  </span>
                </div>
              )}

              {/* Doctor Indicator */}
              <div 
                className="absolute top-2 right-2 w-3 h-3 rounded-full"
                style={{ background: doctorColor }}
                title={doctor?.name}
              />

              {/* Hover Actions */}
              <div className="absolute top-1 right-6 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <button
                  onClick={(e) => { e.stopPropagation(); onEditSlot(slot); }}
                  className="p-1 rounded hover:bg-white/20"
                  style={{ color: theme.text }}
                >
                  <Edit2 size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDeleteSlot(slot); }}
                  className="p-1 rounded hover:bg-white/20"
                  style={{ color: theme.danger }}
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t" style={{ borderColor: theme.muted }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: theme.success }} />
          <span className="text-xs" style={{ color: theme.text }}>Open</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: theme.primary }} />
          <span className="text-xs" style={{ color: theme.text }}>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: theme.danger }} />
          <span className="text-xs" style={{ color: theme.text }}>Cancelled</span>
        </div>
        <div className="border-l pl-4 flex flex-wrap gap-3" style={{ borderColor: theme.muted }}>
          {doctors.map(doc => (
            <div key={doc.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: doc.color }} />
              <span className="text-xs" style={{ color: theme.text }}>{doc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityGrid;
