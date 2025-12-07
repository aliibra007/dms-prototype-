import React, { useEffect, useMemo, useState, useRef } from 'react';
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
  ChevronDown,
  User,
  LogOut,
  Pill,
  Heart,
  Globe,
  Sun,
  Moon,
} from 'lucide-react';
import '../styles/index.css';
import '../styles/App.css';
import '../styles/doctor.css';
import { COLORS } from '../styles/theme';

// Helper function to convert HEX to RGBA with opacity
function hexToRgba(hex, opacity = 1) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function AnimatedBackground({ isDark }) {
  const particleColor = isDark ? COLORS.dark.primary : COLORS.light.primary;

  const particles = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 3, // 3-7px (increased for better visibility)
      opacity: Math.random() * 0.3 + 0.6, // 0.6-0.9 (increased for better visibility)
      duration: Math.random() * 20 + 15, // 15-35s
      delay: Math.random() * 5, // 0-5s
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{
        zIndex: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      <style>{`
        @keyframes float-dot {
          0%, 100% {
            transform: translate(0, 0);
            opacity: var(--opacity);
          }
          25% {
            transform: translate(20px, -30px);
            opacity: calc(var(--opacity) * 0.8);
          }
          50% {
            transform: translate(-15px, -50px);
            opacity: calc(var(--opacity) * 0.6);
          }
          75% {
            transform: translate(30px, -20px);
            opacity: calc(var(--opacity) * 0.9);
          }
        }
      `}</style>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particleColor,
            opacity: particle.opacity,
            '--opacity': particle.opacity,
            animation: `float-dot ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
          }}
        />
      ))}

      <div className="wave-container" style={{
        opacity: 0.06,
        height: '120px',
        maskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to top, black 0%, black 60%, transparent 100%)'
      }}>
        <div
          className="wave wave1"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(isDark ? COLORS.dark.primary : COLORS.light.primary, 0.2)} 50%, transparent 100%)`,
          }}
        />
        <div
          className="wave wave2"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(isDark ? COLORS.dark.primary : COLORS.light.primary, 0.15)} 50%, transparent 100%)`,
          }}
        />
        <div
          className="wave wave3"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${hexToRgba(isDark ? COLORS.dark.primary : COLORS.light.primary, 0.1)} 50%, transparent 100%)`,
          }}
        />
      </div>

      <div className="orb orb1" style={{ background: isDark ? COLORS.dark.primary : COLORS.light.primary }} />
      <div className="orb orb2" style={{ background: isDark ? COLORS.dark.accent : COLORS.light.accent }} />
      <div className="orb orb3" style={{ background: isDark ? COLORS.dark.primary : COLORS.light.primary }} />

      <div className="geometric-shape circle" style={{ border: `3px solid ${isDark ? COLORS.dark.accent : COLORS.light.accent}` }} />
      <div className="geometric-shape square" style={{ border: `3px solid ${isDark ? COLORS.dark.primary : COLORS.light.primary}` }} />
      <div className="geometric-shape triangle" style={{ borderBottom: `86px solid ${isDark ? COLORS.dark.accent : COLORS.light.accent}` }} />

      <div className="radial-pulse" style={{ background: `radial-gradient(circle, ${hexToRgba(isDark ? COLORS.dark.primary : COLORS.light.primary, 0.2)}, transparent)` }} />
    </div>
  );
}

function Navbar({ toggleSidebar, isDark, toggleTheme }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New appointment scheduled', time: '5 min ago', unread: true },
    { id: 2, text: 'Patient record updated', time: '1 hour ago', unread: true },
    { id: 3, text: 'Payment received', time: '2 hours ago', unread: false },
  ]);
  const [userProfile] = useState({
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleToggleTheme = () => {
    toggleTheme();
    // Mark all notifications as read when toggling theme
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

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
              <p className="text-xs" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Clinic Management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleToggleTheme} className="p-2 rounded-lg transition-all hover:scale-110" style={{ background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}20`, color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Notifications Dropdown */}
          <div className="relative h-full flex items-center" ref={notificationRef}>
            <button onClick={() => setShowNotifications((p) => !p)} className="p-2 rounded-lg relative transition-all hover:scale-110" style={{ background: `${isDark ? COLORS.dark.accent : COLORS.light.accent}20`, color: isDark ? COLORS.dark.accent : COLORS.light.accent }}>
              <Bell size={20} />
              {unreadCount > 0 && !showNotifications && <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#EF4444' }} />}
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-full pt-2 w-80 animate-fade-in z-50">
                <div className="rounded-lg shadow-2xl border overflow-hidden" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                  <div className="px-4 py-3 border-b font-semibold" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, color: isDark ? COLORS.dark.text : COLORS.light.text }}>Notifications</div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 border-b hover:bg-opacity-50 cursor-pointer transition-all" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted, background: n.unread ? `${isDark ? COLORS.dark.accent : COLORS.light.accent}10` : 'transparent', color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                        <p className="text-sm">{n.text}</p>
                        <p className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{n.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative h-full flex items-center" ref={profileRef}>
            <button onClick={() => setShowProfile((p) => !p)} className="flex items-center gap-2 p-2 rounded-lg transition-all hover:scale-105" style={{ background: isDark ? `${COLORS.dark.primary}20` : `${COLORS.light.primary}15` }}>
              <img src={userProfile.avatar} alt="Profile" className="w-8 h-8 rounded-full" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{userProfile.name}</p>
                <p className="text-xs" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{userProfile.role}</p>
              </div>
            </button>
            {showProfile && (
              <div className="absolute right-0 top-full pt-2 w-full min-w-[200px] animate-fade-in z-50">
                <div className="rounded-lg shadow-2xl border overflow-hidden" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                  <Link to="/doctor/profile" className="flex items-center gap-3 px-4 py-3 transition-all" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                    <User size={18} />
                    <span>Edit Profile</span>
                  </Link>
                  <button onClick={() => { }} className="w-full flex items-center gap-3 px-4 py-3 border-t transition-all" style={{ color: '#EF4444', borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function Sidebar({ isOpen, isDark, onClose }) {
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
    <>
      {/* Backdrop overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden transition-opacity duration-300"
          onClick={onClose}
          style={{ top: '4rem' }}
        />
      )}
      <aside className={`fixed top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-300 z-30 border-r shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ width: '260px', background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}
      >
        <div className="h-full overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group"
                  onClick={() => {
                    // Close sidebar on mobile when a link is clicked
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
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
    </>
  );
}

export default function DoctorLayout() {
  const [isDark, setIsDark] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const prevMobileRef = useRef(window.innerWidth < 768);

  useEffect(() => {
    document.documentElement.style.background = isDark ? COLORS.dark.background : COLORS.light.secondary;
  }, [isDark]);

  // Track mobile state and handle sidebar on resize
  useEffect(() => {
    const checkMobile = () => {
      const nowMobile = window.innerWidth < 768;
      const wasMobile = prevMobileRef.current;

      // Only auto-open sidebar when transitioning from mobile to desktop
      if (wasMobile && !nowMobile) {
        setIsSidebarOpen(true);
      }

      prevMobileRef.current = nowMobile;
      setIsMobile(nowMobile);
    };

    // Set initial mobile state
    const initialMobile = window.innerWidth < 768;
    prevMobileRef.current = initialMobile;
    setIsMobile(initialMobile);

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((p) => !p);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen" style={{ background: isDark ? COLORS.dark.background : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}>
      <AnimatedBackground isDark={isDark} />
      <Navbar toggleSidebar={toggleSidebar} isDark={isDark} toggleTheme={() => setIsDark((p) => !p)} />
      <Sidebar isOpen={isSidebarOpen} isDark={isDark} onClose={closeSidebar} />
      <main className="pt-20 px-4 lg:px-8 pb-10 relative z-10 transition-all duration-300" style={{
        // Only apply padding on desktop (md and above), not on mobile
        paddingLeft: isMobile ? '1rem' : (isSidebarOpen ? 'calc(260px + 2rem)' : '1rem'),
      }}>
        <Outlet context={{ isDark }} />
      </main>
    </div>
  );
}
