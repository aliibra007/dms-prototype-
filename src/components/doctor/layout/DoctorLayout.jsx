import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  Menu,
  Bell,
  Search as SearchIcon,
  ChevronDown,
  User,
  Lock,
  LogOut,
  Pill,
  Heart,
  Globe,
} from 'lucide-react';
import '../styles/index.css';
import '../styles/App.css';
import '../styles/doctor.css';

const COLORS = {
  light: {
    primary: 'hsl(262, 52%, 47%)',
    secondary: 'hsl(220, 25%, 95%)',
    accent: 'hsl(199, 89%, 48%)',
    muted: 'hsl(240, 10%, 85%)',
    background: '#FFFFFF',
    text: '#1F2937',
    cardBg: '#FFFFFF',
  },
  dark: {
    primary: 'hsl(262, 45%, 65%)',
    secondary: 'hsl(220, 20%, 12%)',
    accent: 'hsl(199, 80%, 55%)',
    muted: 'hsl(240, 8%, 35%)',
    background: '#0F172A',
    text: '#F1F5F9',
    cardBg: '#1E293B',
  },
};

function AnimatedBackground({ isDark }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 5}s`,
        duration: `${5 + Math.random() * 10}s`,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 opacity-10">
        <div
          className="grid-animation"
          style={{
            backgroundImage: `
              linear-gradient(${isDark ? COLORS.dark.muted : COLORS.light.muted}50 1px, transparent 1px),
              linear-gradient(90deg, ${isDark ? COLORS.dark.muted : COLORS.light.muted}50 1px, transparent 1px)
            `,
          }}
        />
      </div>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            background: isDark ? COLORS.dark.accent : COLORS.light.accent,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      <div className="wave-container">
        <div
          className="wave wave1"
          style={{
            background: `linear-gradient(90deg, transparent, ${isDark ? COLORS.dark.primary : COLORS.light.primary}20, transparent)`,
          }}
        />
        <div
          className="wave wave2"
          style={{
            background: `linear-gradient(90deg, transparent, ${isDark ? COLORS.dark.primary : COLORS.light.primary}20, transparent)`,
          }}
        />
        <div
          className="wave wave3"
          style={{
            background: `linear-gradient(90deg, transparent, ${isDark ? COLORS.dark.primary : COLORS.light.primary}20, transparent)`,
          }}
        />
      </div>

      <div className="orb orb1" style={{ background: isDark ? COLORS.dark.primary : COLORS.light.primary }} />
      <div className="orb orb2" style={{ background: isDark ? COLORS.dark.accent : COLORS.light.accent }} />
      <div className="orb orb3" style={{ background: isDark ? COLORS.dark.primary : COLORS.light.primary }} />

      <div className="geometric-shape circle" style={{ border: `3px solid ${isDark ? COLORS.dark.accent : COLORS.light.accent}` }} />
      <div className="geometric-shape square" style={{ border: `3px solid ${isDark ? COLORS.dark.primary : COLORS.light.primary}` }} />
      <div className="geometric-shape triangle" style={{ borderBottom: `86px solid ${isDark ? COLORS.dark.accent : COLORS.light.accent}` }} />

      <div className="radial-pulse" style={{ background: `radial-gradient(circle, ${isDark ? COLORS.dark.primary : COLORS.light.primary}20, transparent)` }} />
    </div>
  );
}

function Navbar({ toggleSidebar, isDark, toggleTheme }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'New appointment scheduled', time: '5 min ago', unread: true },
    { id: 2, text: 'Patient record updated', time: '1 hour ago', unread: true },
    { id: 3, text: 'Payment received', time: '2 hours ago', unread: false },
  ]);
  const [userProfile] = useState({
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  });

  useEffect(() => {}, []);
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 shadow-lg backdrop-blur-sm z-40 border-b"
      style={{
        background: isDark ? `${COLORS.dark.cardBg}cc` : `${COLORS.light.cardBg}cc`,
        borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
      }}
    >
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-opacity-10 transition-all" style={{ color: isDark ? COLORS.dark.primary : COLORS.light.primary, backgroundColor: `${isDark ? COLORS.dark.primary : COLORS.light.primary}10` }}>
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
              <Heart className="text-white" size={24} />
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>MediCare</h1>
              <p className="text-xs" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>Clinic Management</p>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" size={20} style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
            <input type="text" placeholder="Search patients, appointments..." className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none transition-all" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, color: isDark ? COLORS.dark.text : COLORS.light.text }} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-lg transition-all hover:scale-110" style={{ background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}20`, color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>{isDark ? '☀️' : '🌙'}</button>
          <div className="relative">
            <button onClick={() => setShowNotifications((p) => !p)} className="p-2 rounded-lg relative transition-all hover:scale-110" style={{ background: `${isDark ? COLORS.dark.accent : COLORS.light.accent}20`, color: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />}
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-lg shadow-2xl border overflow-hidden animate-fade-in" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                <div className="px-4 py-3 border-b font-semibold" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, color: isDark ? COLORS.dark.text : COLORS.light.text }}>Notifications</div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 border-b hover:bg-opacity-50 cursor-pointer transition-all" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, background: n.unread ? `${isDark ? COLORS.dark.accent : COLORS.light.accent}10` : 'transparent', color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                      <p className="text-sm">{n.text}</p>
                      <p className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{n.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setShowProfile((p) => !p)} className="flex items-center gap-2 p-2 rounded-lg transition-all hover:scale-105" style={{ background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}10` }}>
              <img src={userProfile.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{userProfile.name}</p>
                <p className="text-xs" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{userProfile.role}</p>
              </div>
              <ChevronDown size={16} style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-2xl border overflow-hidden animate-fade-in" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                <Link to="/doctor/profile" className="flex items-center gap-3 px-4 py-3 transition-all" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                  <User size={18} />
                  <span>Edit Profile</span>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 transition-all" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                  <Lock size={18} />
                  <span>Change Password</span>
                </button>
                <button onClick={() => {}} className="w-full flex items-center gap-3 px-4 py-3 border-t transition-all" style={{ color: '#EF4444', borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Sidebar({ isOpen, isDark }) {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor' },
    { icon: Calendar, label: 'Schedule & Availability', path: '/doctor/schedule' },
    { icon: Users, label: 'Patient Records', path: '/doctor/patients' },
    { icon: Pill, label: 'Prescription', path: '/doctor/prescription' },
    { icon: DollarSign, label: 'Invoices & Finance', path: '/doctor/invoices' },
    { icon: MessageSquare, label: 'Messaging', path: '/doctor/messaging' },
    { icon: Globe, label: 'Website Settings', path: '/doctor/website-settings' },
    { icon: Settings, label: 'Profile & Settings', path: '/doctor/profile' },
  ];
  return (
    <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300 z-30 border-r shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ width: '260px', background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}
    >
      <div className="h-full overflow-y-auto p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                style={{
                  background: isActive ? `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})` : 'transparent',
                  color: isActive ? '#FFFFFF' : (isDark ? COLORS.dark.text : COLORS.light.text),
                }}
              >
                <Icon size={20} className={isActive ? '' : 'group-hover:scale-110 transition-transform'} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

export default function DoctorLayout() {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.style.background = isDark ? COLORS.dark.background : COLORS.light.secondary;
  }, [isDark]);

  return (
    <div className="min-h-screen" style={{ background: isDark ? COLORS.dark.background : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}>
      <AnimatedBackground isDark={isDark} />
      <Navbar toggleSidebar={() => setIsSidebarOpen((p) => !p)} isDark={isDark} toggleTheme={() => setIsDark((p) => !p)} />
      <Sidebar isOpen={isSidebarOpen} isDark={isDark} />
      <main className="pt-20 px-4 lg:px-8 pb-10 relative z-10 transition-all duration-300" style={{ paddingLeft: isSidebarOpen ? 'calc(260px + 2rem)' : '1rem' }}>
        <Outlet context={{ isDark }} />
      </main>
    </div>
  );
}
