import React from 'react';
import { Clock, UserCheck, Home, CheckCircle, List, ChevronRight } from 'lucide-react';
import { COLORS } from '../../styles/theme';
import StatCard from '../shared/StatCard';

const QueuePanel = ({ 
  isDark, 
  queueStats,
  appointments,
  onCheckIn,
  onMarkArrived,
  onMarkInRoom,
  onMarkCompleted,
  onMoveToWaitingList
}) => {
  const theme = isDark ? COLORS.dark : COLORS.light;

  const stats = [
    { title: 'Waiting', value: queueStats.waiting.toString(), icon: Clock, color: theme.warning },
    { title: 'Arrived', value: queueStats.arrived.toString(), icon: UserCheck, color: theme.info },
    { title: 'In-Room', value: queueStats.inRoom.toString(), icon: Home, color: theme.primary },
    { title: 'Completed', value: queueStats.completed.toString(), icon: CheckCircle, color: theme.success },
  ];

  const getQueueStatusColor = (status) => {
    switch (status) {
      case 'waiting': return theme.warning;
      case 'arrived': return theme.info;
      case 'in-room': return theme.primary;
      case 'completed': return theme.success;
      default: return theme.muted;
    }
  };

  const getNextAction = (queueStatus) => {
    switch (queueStatus) {
      case 'waiting': return { label: 'Check-in', action: onCheckIn, next: 'arrived' };
      case 'arrived': return { label: 'Mark In-Room', action: onMarkInRoom, next: 'in-room' };
      case 'in-room': return { label: 'Complete', action: onMarkCompleted, next: 'completed' };
      default: return null;
    }
  };

  // Filter only confirmed appointments that are not cancelled
  const activeAppointments = appointments.filter(a => a.status !== 'cancelled');

  return (
    <div className="space-y-6">
      {/* Queue Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <StatCard key={stat.title + idx} {...stat} isDark={isDark} />
        ))}
      </div>

      {/* Queue List */}
      <div 
        className="rounded-xl p-6 shadow-lg border-2"
        style={{ 
          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, 
          borderColor: isDark ? COLORS.dark.accent : COLORS.light.accent 
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: theme.text }}>
            <List size={20} />
            Queue Management
          </h3>
        </div>

        <div className="space-y-3">
          {activeAppointments.map(appt => {
            const statusColor = getQueueStatusColor(appt.queueStatus);
            const nextAction = getNextAction(appt.queueStatus);

            return (
              <div
                key={appt.id}
                className="flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md"
                style={{
                  borderColor: statusColor,
                  background: `${statusColor}10`,
                }}
              >
                <div className="flex items-center gap-4">
                  {/* Patient Avatar */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: `${theme.primary}20`, color: theme.primary }}
                  >
                    {appt.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  {/* Patient Info */}
                  <div>
                    <p className="font-semibold" style={{ color: theme.text }}>
                      {appt.patientName}
                    </p>
                    <p className="text-sm" style={{ color: theme.text }}>
                      {appt.time} • {appt.doctorName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Current Status Badge */}
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ background: statusColor, color: '#FFFFFF' }}
                  >
                    {appt.queueStatus.charAt(0).toUpperCase() + appt.queueStatus.slice(1).replace('-', ' ')}
                  </span>

                  {/* Next Action Button */}
                  {nextAction && (
                    <button
                      onClick={() => nextAction.action(appt)}
                      className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                      style={{
                        background: theme.primary,
                        color: '#FFFFFF',
                      }}
                    >
                      {nextAction.label}
                      <ChevronRight size={14} />
                    </button>
                  )}

                  {/* Move to Waiting List (for arrived/in-room) */}
                  {(appt.queueStatus === 'arrived' || appt.queueStatus === 'in-room') && (
                    <button
                      onClick={() => onMoveToWaitingList(appt)}
                      className="px-3 py-1 rounded-lg text-xs font-semibold transition-all hover:scale-105 border"
                      style={{
                        borderColor: theme.warning,
                        color: theme.warning,
                        background: 'transparent',
                      }}
                    >
                      Back to Waiting
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {activeAppointments.length === 0 && (
            <div className="text-center py-8" style={{ color: theme.text }}>
              <p className="text-sm">No patients in queue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueuePanel;
