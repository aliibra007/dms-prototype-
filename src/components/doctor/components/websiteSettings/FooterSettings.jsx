import React, { useState } from 'react'
import ImageUploader from './components/ImageUploader'
import { updateFooterSettings } from '../../services/landingPageApi'
import defaultFooterLogo from '../../../../images/Footerlogo.png'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/

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
}

export default function FooterSettings({ initialData = {}, isDark }) {
  const [logo, setLogo] = useState(initialData.logo || '')
  const [description, setDescription] = useState(initialData.description || '')
  const [phone, setPhone] = useState(initialData.phone || '')
  const [email, setEmail] = useState(initialData.email || '')
  const [address, setAddress] = useState(initialData.address || '')
  const [copyright, setCopyright] = useState(initialData.copyright || '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSave = async () => {
    if (email && !emailRegex.test(email)) {
      setMsg('Invalid email')
      return
    }
    if (phone && !phoneRegex.test(phone)) {
      setMsg('Invalid phone number')
      return
    }
    try {
      setSaving(true)
      setMsg('')
      await updateFooterSettings({ logo, description: description.slice(0, 200), phone, email, address, copyright })
      setMsg('Changes saved successfully')
    } catch (e) {
      setMsg('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Footer Logo
          </h3>
          <ImageUploader value={logo} onChange={setLogo} fallback={defaultFooterLogo} isDark={isDark} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Footer Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 200))}
            className="w-full border rounded-lg px-4 py-2.5 h-32 outline-none transition-all focus:ring-2 resize-none"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="Short footer description"
          />
          <div className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            {description.length}/200
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="+1 555 123 4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="hello@example.com"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Address
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 h-24 outline-none transition-all focus:ring-2 resize-none"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="Clinic address"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Copyright
          </label>
          <input
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="© 2025 Clinic Name. All rights reserved."
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-lg text-white font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          style={{
            background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})`,
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {msg && (
          <span className="text-sm" style={{ color: msg.includes('success') ? '#10B981' : '#EF4444' }}>
            {msg}
          </span>
        )}
      </div>
    </div>
  )
}
