import React from 'react';
import { X, Activity, Clock } from 'lucide-react';

export default function RecentActivityModal({
  isOpen,
  onClose,
  activities,
  theme,
  isDark
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="rounded-2xl w-full max-w-3xl shadow-2xl transform transition-all scale-100 border relative"
          style={{ background: theme.cardBg, borderColor: theme.border }}
        >
          <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
            <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
              <Activity size={24} style={{ color: theme.accent }} />
              Recent Activity
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
              style={{ color: theme.text }}
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {activities && activities.length > 0 ? (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 rounded-lg border transition-all hover:shadow-md"
                    style={{
                      borderColor: theme.border,
                      background: isDark ? theme.secondary : theme.secondary
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${theme.accent}20`,
                        color: theme.accent
                      }}
                    >
                      <Activity size={24} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-base mb-1" style={{ color: theme.text }}>
                        {activity.action}
                      </p>
                      <p className="text-sm mb-2" style={{ color: theme.text }}>
                        {activity.patient}
                      </p>
                      <div className="flex items-center gap-2 text-xs" style={{ color: theme.text }}>
                        <Clock size={14} style={{ color: theme.text }} />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg font-semibold" style={{ color: theme.text }}>No recent activity</p>
                  <p className="text-sm mt-2" style={{ color: theme.muted }}>Activity will appear here as it happens</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

