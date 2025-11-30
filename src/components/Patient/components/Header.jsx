import React, { useState, useEffect } from 'react'
import { Menu, Stethoscope, Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../../contexts/ThemeContext'
import Sidebar from './Sidebar'
import UserProfileMenu from './UserProfileMenu'

const Header = ({ onLoginClick }) => {
  const { theme, toggleTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const [notificationCount, setNotificationCount] = useState(2)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check if user is logged in (from localStorage/sessionStorage)
  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if (token) {
      setIsLoggedIn(true)
      // In a real app, fetch user profile data here
      setUserProfile({
        initials: 'DD',
        name: 'Dr. Doe',
        email: 'dr.doe@example.com',
        avatar: null,
      })
      // In a real app, fetch notification count from API
      setNotificationCount(2)
    }
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Treatments', href: '#treatments' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToHome = () => {
    const element = document.querySelector('#home')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setUserProfile(null)
    setNotificationCount(0)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-primary-light dark:bg-primary-dark transition-all duration-300"
        style={{
          height: '56px',
        }}
      >
        <nav className="max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Side: Hamburger Menu + App Icon */}
            <div className="flex items-center space-x-3">
              {/* Navigation Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Open navigation menu"
                style={{ minWidth: '40px', minHeight: '40px' }}
              >
                <Menu size={24} className="text-white" />
              </button>

              {/* App Icon Button */}
              <button
                onClick={scrollToHome}
                className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Go to dashboard"
              >
                <Stethoscope size={20} className="text-white" />
              </button>
            </div>

            {/* Right Side: Theme Toggle + Notifications + User Avatar */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon size={20} className="text-white" />
                ) : (
                  <Sun size={20} className="text-white" />
                )}
              </button>

              {/* Notifications */}
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className="p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 relative"
                    aria-label="Notifications"
                  >
                    <Bell size={24} className="text-white" />
                    {notificationCount > 0 && (
                      <span
                        className="absolute top-0 right-0 flex items-center justify-center min-w-[18px] h-[18px] bg-[#FF3B30] text-white text-[10px] font-bold rounded-full px-1"
                        style={{ fontSize: '10px' }}
                      >
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {/* User Avatar (Profile Button) */}
              {isLoggedIn ? (
                <UserProfileMenu userProfile={userProfile} onLogout={handleLogout} />
              ) : (
                <button
                  onClick={onLoginClick}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Login"
                >
                  <span className="text-sm">U</span>
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={navItems}
        onNavClick={onLoginClick}
      />
    </>
  )
}

export default Header
