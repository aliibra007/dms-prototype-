import React, { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Camera, User, Mail, Phone, Lock, Save, X, Shield, AlertCircle } from 'lucide-react'
import { COLORS } from '../styles/theme'

export default function ProfilePage() {
  const { isDark } = useOutletContext()
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medicare.com',
    phone: '70 123 456', // Only store digits after +961
    password: '',
    confirmPassword: '',
  })
  const [saving, setSaving] = useState(false)
  const [showPasswordField, setShowPasswordField] = useState(false)

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const password = profileData.password
    if (!password) return { score: 0, label: '', color: '' }

    let score = 0
    // Length check
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    // Contains lowercase
    if (/[a-z]/.test(password)) score++
    // Contains uppercase
    if (/[A-Z]/.test(password)) score++
    // Contains number
    if (/[0-9]/.test(password)) score++
    // Contains special character
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { score: 33, label: 'Weak', color: '#EF4444' }
    if (score <= 4) return { score: 66, label: 'Medium', color: '#F59E0B' }
    return { score: 100, label: 'Strong', color: '#10B981' }
  }, [profileData.password])

  // Password match validation
  const passwordsMatch = useMemo(() => {
    if (!profileData.password || !profileData.confirmPassword) return true
    return profileData.password === profileData.confirmPassword
  }, [profileData.password, profileData.confirmPassword])

  const handleChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  // Handle phone number input (only allow digits and spaces after +961)
  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Only allow numbers and spaces
    const cleaned = value.replace(/[^0-9\s]/g, '')
    setProfileData(prev => ({ ...prev, phone: cleaned }))
  }

  const handleSave = async () => {
    // Validate passwords match if changing password
    if (showPasswordField && !passwordsMatch) {
      alert('Passwords do not match!')
      return
    }

    // Validate password strength if changing password
    if (showPasswordField && profileData.password && passwordStrength.score < 66) {
      alert('Password is too weak. Please use a stronger password.')
      return
    }

    setSaving(true)
    // TODO: Implement actual save logic
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaving(false)
    alert('Profile saved successfully!')
  }

  const handleCancel = () => {
    // TODO: Reset to original values
    setProfileData({
      fullName: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@medicare.com',
      phone: '70 123 456',
      password: '',
      confirmPassword: '',
    })
    setShowPasswordField(false)
  }

  const handleChangePhoto = () => {
    // TODO: Implement photo upload logic
    alert('Photo upload functionality coming soon!')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
          Profile & Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
          Manage your personal information and account settings
        </p>
      </div>

      {/* Main Card */}
      <div
        className="rounded-xl shadow-lg border-2 p-6 md:p-8"
        style={{
          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
          borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              {/* Avatar Circle */}
              <div
                className="w-40 h-40 rounded-full overflow-hidden border-4 shadow-lg"
                style={{
                  borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary,
                }}
              >
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor"
                  alt="Doctor Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Hover Overlay */}
              <div
                className="absolute inset-0 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                style={{
                  background: isDark 
                    ? 'rgba(0, 0, 0, 0.7)' 
                    : 'rgba(0, 0, 0, 0.6)',
                }}
                onClick={handleChangePhoto}
              >
                <Camera size={32} className="text-white mb-2" />
                <span className="text-white text-sm font-semibold">Change Photo</span>
              </div>
            </div>

            <div className="text-center">
              <h3 className="font-bold text-lg" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                {profileData.fullName}
              </h3>
              <p className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
                Cardiologist
              </p>
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                <User size={16} />
                Full Name
              </label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
                style={{
                  background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                  borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                  color: isDark ? COLORS.dark.text : COLORS.light.text,
                }}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
                style={{
                  background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                  borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                  color: isDark ? COLORS.dark.text : COLORS.light.text,
                }}
                placeholder="doctor@example.com"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                <Phone size={16} />
                Phone Number
              </label>
              <div className="relative">
                {/* Fixed Prefix */}
                <div
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 font-semibold pointer-events-none select-none"
                  style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}
                >
                  +961
                </div>
                {/* Phone Input */}
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={handlePhoneChange}
                  className="w-full border rounded-lg py-2.5 outline-none transition-all focus:ring-2"
                  style={{
                    paddingLeft: '4.5rem', // Space for +961 prefix
                    paddingRight: '1rem',
                    background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                    borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                    color: isDark ? COLORS.dark.text : COLORS.light.text,
                  }}
                  placeholder="70 123 456"
                />
              </div>
            </div>

            {/* Password Section */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                <Lock size={16} />
                Password
              </label>
              
              {!showPasswordField ? (
                <button
                  onClick={() => setShowPasswordField(true)}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: `${isDark ? COLORS.dark.accent : COLORS.light.accent}20`,
                    color: isDark ? COLORS.dark.accent : COLORS.light.accent,
                  }}
                >
                  Change Password
                </button>
              ) : (
                <div className="space-y-4">
                  {/* New Password */}
                  <div>
                    <input
                      type="password"
                      value={profileData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
                      style={{
                        background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                        borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                        color: isDark ? COLORS.dark.text : COLORS.light.text,
                      }}
                      placeholder="Enter new password"
                    />
                    
                    {/* Password Strength Indicator */}
                    {profileData.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Shield size={14} style={{ color: passwordStrength.color }} />
                            <span className="text-xs font-semibold" style={{ color: passwordStrength.color }}>
                              Password Strength: {passwordStrength.label}
                            </span>
                          </div>
                        </div>
                        {/* Strength Bar */}
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary }}>
                          <div
                            className="h-full transition-all duration-300 rounded-full"
                            style={{
                              width: `${passwordStrength.score}%`,
                              background: passwordStrength.color,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <input
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
                      style={{
                        background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                        borderColor: !passwordsMatch ? '#EF4444' : (isDark ? COLORS.dark.muted : COLORS.light.muted),
                        color: isDark ? COLORS.dark.text : COLORS.light.text,
                      }}
                      placeholder="Confirm new password"
                    />
                    
                    {/* Password Match Indicator */}
                    {profileData.confirmPassword && (
                      <div className="flex items-center gap-2 mt-2">
                        {passwordsMatch ? (
                          <>
                            <div className="w-4 h-4 rounded-full" style={{ background: '#10B981' }}>
                              <span className="text-white text-xs flex items-center justify-center">✓</span>
                            </div>
                            <span className="text-xs font-medium" style={{ color: '#10B981' }}>
                              Passwords match
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertCircle size={16} style={{ color: '#EF4444' }} />
                            <span className="text-xs font-medium" style={{ color: '#EF4444' }}>
                              Passwords do not match
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setShowPasswordField(false)
                      handleChange('password', '')
                      handleChange('confirmPassword', '')
                    }}
                    className="text-sm"
                    style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}
                  >
                    Cancel password change
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-6 mt-6 border-t" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{
              background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})`,
            }}
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button
            onClick={handleCancel}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50"
            style={{
              background: 'transparent',
              border: `2px solid ${isDark ? COLORS.dark.muted : COLORS.light.muted}`,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
          >
            <X size={18} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
