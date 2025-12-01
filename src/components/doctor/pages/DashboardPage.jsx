import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { Users, Calendar as CalendarIcon, Activity, DollarSign, Clock } from 'lucide-react';

const COLORS = {
  light: {
    primary: 'hsl(262, 52%, 47%)',
    secondary: 'hsl(220, 25%, 95%)',
    accent: 'hsl(199, 89%, 48%)',
    muted: 'hsl(240, 10%, 85%)',
    text: '#1F2937',
    cardBg: '#FFFFFF',
  },
  dark: {
    primary: 'hsl(262, 45%, 65%)',
    secondary: 'hsl(220, 20%, 12%)',
    accent: 'hsl(199, 80%, 55%)',
    muted: 'hsl(240, 8%, 35%)',
    text: '#F1F5F9',
    cardBg: '#1E293B',
  },
};

const StatCard = ({ icon: Icon, title, value, change, color, isDark }) => (
  <div className="rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 animated-border-card" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: color }}>
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
        <Icon size={24} style={{ color }} />
      </div>
      <span className="text-sm font-semibold px-2 py-1 rounded" style={{ background: change >= 0 ? '#10B98120' : '#EF444420', color: change >= 0 ? '#10B981' : '#EF4444' }}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
    </div>
    <h3 className="text-sm mb-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{title}</h3>
    <p className="text-2xl font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{value}</p>
  </div>
);

export default function DashboardPage() {
  const { isDark } = useOutletContext();
  const dashboardData = {
    stats: [
      { icon: Users, title: 'Total Patients', value: '1,234', change: 12, color: isDark ? COLORS.dark.primary : COLORS.light.primary },
      { icon: CalendarIcon, title: 'Appointments Today', value: '48', change: 8, color: isDark ? COLORS.dark.accent : COLORS.light.accent },
      { icon: Activity, title: 'Active Cases', value: '89', change: -3, color: '#10B981' },
      { icon: DollarSign, title: 'Revenue (Month)', value: '$45,230', change: 15, color: '#F59E0B' },
    ],
    chartData: [
      { name: 'Mon', patients: 40, revenue: 2400 },
      { name: 'Tue', patients: 30, revenue: 1398 },
      { name: 'Wed', patients: 50, revenue: 9800 },
      { name: 'Thu', patients: 45, revenue: 3908 },
      { name: 'Fri', patients: 60, revenue: 4800 },
      { name: 'Sat', patients: 35, revenue: 3800 },
      { name: 'Sun', patients: 25, revenue: 4300 },
    ],
    revenueData: [
      { month: 'Jan', total: 32000 },
      { month: 'Feb', total: 28000 },
      { month: 'Mar', total: 36000 },
      { month: 'Apr', total: 42000 },
      { month: 'May', total: 45000 },
      { month: 'Jun', total: 47000 },
    ],
    upcomingAppointments: [
      { id: 1, patient: 'Emily Carter', time: '09:30 AM', type: 'Follow-up', doctor: 'Dr. Sarah' },
      { id: 2, patient: 'Michael Brown', time: '10:15 AM', type: 'New patient', doctor: 'Dr. James' },
      { id: 3, patient: 'Sophia Lee', time: '11:00 AM', type: 'Consultation', doctor: 'Dr. Sarah' },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.stats.map((stat, idx) => (
          <StatCard key={stat.title + idx} {...stat} isDark={isDark} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 shadow-lg border-2 animated-border-card" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Patient Flow</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dashboardData.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? COLORS.dark.muted : COLORS.light.muted} />
              <XAxis dataKey="name" stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <YAxis stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <Tooltip contentStyle={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
              <Line type="monotone" dataKey="patients" stroke={COLORS.light.accent} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl p-6 shadow-lg border-2 animated-border-card" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: '#F59E0B' }}>
          <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dashboardData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? COLORS.dark.muted : COLORS.light.muted} />
              <XAxis dataKey="month" stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <YAxis stroke={isDark ? COLORS.dark.text : COLORS.light.text} />
              <Tooltip contentStyle={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
              <Bar dataKey="total" fill="#F59E0B" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-6 shadow-lg border-2 animated-border-card" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Recent Activity</h3>
            <button className="text-sm font-semibold" style={{ color: isDark ? COLORS.dark.accent : COLORS.light.accent }}>View All</button>
          </div>
          <div className="space-y-4">
            {[{id:1,action:'New patient registered',patient:'John Doe',time:'10 minutes ago'}, {id:2,action:'Appointment completed',patient:'Jane Smith',time:'25 minutes ago'}, {id:3,action:'Prescription issued',patient:'Mike Johnson',time:'1 hour ago'}, {id:4,action:'Payment received',patient:'Sarah Williams',time:'2 hours ago'}].map(a => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-lg border" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, background: isDark ? `${COLORS.dark.secondary}80` : `${COLORS.light.secondary}` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: isDark ? `${COLORS.dark.accent}20` : `${COLORS.light.accent}20`, color: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
                  <Activity size={20} />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{a.action}</p>
                  <p className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{a.patient}</p>
                  <p className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl p-6 shadow-lg border-2 animated-border-card" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Upcoming Appointments</h3>
            <button className="text-sm font-semibold" style={{ color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>Add Slot</button>
          </div>
          <div className="space-y-4">
            {[{ id: 1, patient: 'Emily Carter', time: '09:30 AM', type: 'Follow-up', doctor: 'Dr. Sarah' }, { id: 2, patient: 'Michael Brown', time: '10:15 AM', type: 'New patient', doctor: 'Dr. James' }, { id: 3, patient: 'Sophia Lee', time: '11:00 AM', type: 'Consultation', doctor: 'Dr. Sarah' }].map(appt => (
              <div key={appt.id} className="flex items-center justify-between p-4 rounded-xl border" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, background: isDark ? `${COLORS.dark.secondary}90` : `${COLORS.light.secondary}` }}>
                <div>
                  <p className="font-semibold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{appt.patient}</p>
                  <p className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{appt.type} • {appt.doctor}</p>
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
