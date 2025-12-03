import React, { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Save, X } from 'lucide-react'
import { COLORS } from '../styles/theme'
import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileAvatarSection from '../components/profile/ProfileAvatarSection'
import ProfileForm from '../components/profile/ProfileForm'
import ProfilePasswordSection from '../components/profile/ProfilePasswordSection'

export default function ProfilePage() {
  const { isDark } = useOutletContext()
  const [profileData, setProfileData] = useState({
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@medicare.com',
    phone: '+961 70 123 456',
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

  // Handle phone number input (allow digits, spaces, and +)
  const handlePhoneChange = (e) => {
    const value = e.target.value
    // Only allow numbers, spaces, and +
    const cleaned = value.replace(/[^0-9\s+]/g, '')
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
      phone: '+961 70 123 456',
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
      <ProfileHeader isDark={isDark} />

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
          <ProfileAvatarSection
            isDark={isDark}
            fullName={profileData.fullName}
            onChangePhoto={handleChangePhoto}
          />

          {/* Form Fields Section */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileForm
              isDark={isDark}
              profileData={profileData}
              onChange={handleChange}
              onPhoneChange={handlePhoneChange}
            />

            <ProfilePasswordSection
              isDark={isDark}
              profileData={profileData}
              showPasswordField={showPasswordField}
              setShowPasswordField={setShowPasswordField}
              onChange={handleChange}
              passwordStrength={passwordStrength}
              passwordsMatch={passwordsMatch}
            />
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
