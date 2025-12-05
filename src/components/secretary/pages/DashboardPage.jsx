import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { Users, Calendar as CalendarIcon, Pill, DollarSign, Clock, Lightbulb, X, UserPlus, FileText, Plus } from 'lucide-react';
import { COLORS } from '../styles/theme';
import StatCard from '../components/shared/StatCard';
import { MOCK_SECRETARY_DASHBOARD_DATA } from '../data/MockData';

export default function DashboardPage() {
  const { isDark } = useOutletContext();
  const [showTip, setShowTip] = useState(true);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isAddAppointmentModalOpen, setIsAddAppointmentModalOpen] = useState(false);
  const [recentActivity, setRecentActivity] = useState(MOCK_SECRETARY_DASHBOARD_DATA.recentActivity || []);
  const [upcomingAppointments, setUpcomingAppointments] = useState(MOCK_SECRETARY_DASHBOARD_DATA.upcomingAppointments || []);
  const theme = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isActivityModalOpen) setIsActivityModalOpen(false);
        if (isAddAppointmentModalOpen) setIsAddAppointmentModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActivityModalOpen, isAddAppointmentModalOpen]);

  const handleAddAppointment = (appointment) => {
    setUpcomingAppointments([appointment, ...upcomingAppointments]);
  };

  const dashboardData = {
    ...MOCK_SECRETARY_DASHBOARD_DATA,
    stats: MOCK_SECRETARY_DASHBOARD_DATA.stats.map(stat => ({
      ...stat,
      icon: stat.icon === 'Users' ? Users : stat.icon === 'CalendarIcon' ? CalendarIcon : stat.icon === 'Pill' ? Pill : DollarSign,
      color: stat.colorKey ? (isDark ? COLORS.dark[stat.colorKey] : COLORS.light[stat.colorKey]) : stat.color
    }))
  };

  const quickActions = [
    { icon: UserPlus, label: 'Register New Patient', color: theme.primary, path: '/secretary/patients' },
    { icon: CalendarIcon, label: 'Add Appointment', color: theme.accent, path: '/secretary/schedule' },
    { icon: FileText, label: 'Create Invoice', color: theme.success, path: '/secretary/invoices' },
    { icon: Pill, label: 'Add Prescription', color: theme.warning, path: '/secretary/patients' },
  ];

  return (
    <div className="space-y-6">
      {showTip && (
        <div
          className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in"
          style={{
            background: `${theme.accent}25`,
            borderColor: `${theme.accent}40`
          }}
        >
          <Lightbulb size={20} style={{ color: theme.accent }} />
          <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
            <span className="font-bold">Pro Tip:</span> Use the Quick Actions panel for fast access to common tasks. Check the appointments chart to plan your day efficiently.
          </p>
          <button
            onClick={() => setShowTip(false)}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ color: theme.text }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, idx) => (
          <StatCard key={stat.title + idx} {...stat} isDark={isDark} />
        ))}
      </div>

      {/* Quick Actions Panel */}
      <div className="rounded-xl p-6 shadow-lg border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <button
                key={idx}
                className="flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all hover:scale-105 hover:shadow-lg"
                style={{
                  background: isDark ? `${COLORS.dark.secondary}80` : `${COLORS.light.secondary}`,
                  borderColor: action.color,
                  color: isDark ? COLORS.dark.text : COLORS.light.text
                }}
                onClick={() => window.location.href = action.path}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${action.color}20` }}>
                  <Icon size={24} style={{ color: action.color }} />
                </div>
                <span className="text-sm font-semibold text-center">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 shadow-lg border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Patient Flow</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dashboardData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? COLORS.dark.muted : COLORS.light.muted} />
              <XAxis dataKey="name" stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <YAxis stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <Tooltip contentStyle={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
              <Line type="monotone" dataKey="patients" stroke={isDark ? COLORS.dark.accent : COLORS.light.accent} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl p-6 shadow-lg border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Appointments Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dashboardData.appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? COLORS.dark.muted : COLORS.light.muted} />
              <XAxis dataKey="month" stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <YAxis stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <Tooltip contentStyle={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
              <Bar dataKey="appointments" fill={isDark ? COLORS.dark.accent : COLORS.light.accent} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 shadow-lg border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Recent Activity</h3>
            <button
              onClick={() => setIsActivityModalOpen(true)}
              className="text-sm font-semibold transition-all hover:scale-105"
              style={{ color: isDark ? COLORS.dark.accent : COLORS.light.accent }}
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity?.slice(0, 5).map(a => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg border" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, background: isDark ? `${COLORS.dark.secondary}80` : `${COLORS.light.secondary}` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: isDark ? `${COLORS.dark.accent}20` : `${COLORS.light.accent}20`, color: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
                  <Clock size={20} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{a.action}</p>
                  <p className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{a.patient}</p>
                  <p className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-6 shadow-lg border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Upcoming Appointments</h3>
            <button
              onClick={() => setIsAddAppointmentModalOpen(true)}
              className="text-sm font-semibold transition-all hover:scale-105 flex items-center gap-1"
              style={{ color: isDark ? COLORS.dark.primary : COLORS.light.primary }}
            >
              <Plus size={16} />
              Add Appointment
            </button>
          </div>
          <div className="space-y-4">
            {upcomingAppointments?.map(appt => (
              <div key={appt.id} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, background: isDark ? `${COLORS.dark.secondary}90` : `${COLORS.light.secondary}` }}>
                <div>
                  <p className="font-semibold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{appt.patient}</p>
                  <p className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{appt.type} • {appt.doctor}</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold" style={{ background: isDark ? `${COLORS.dark.primary}20` : `${COLORS.light.primary}20`, color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
                  <Clock size={16} />
                  {appt.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

