import React, { useState } from 'react'
import ImageUploader from './components/ImageUploader'
import { updateHeaderSettings } from '../../services/landingPageApi'
import defaultHeaderLogo from '../../../../images/Headerlogo.png'
import defaultHeroImage from '../../../../images/Heroimage.png'

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

export default function HeaderSettings({ initialData = {}, isDark }) {
  const [logo, setLogo] = useState(initialData.logo || '')
  const [heroImage, setHeroImage] = useState(initialData.heroImage || '')
  const [title, setTitle] = useState(initialData.heroTitle || '')
  const [subtitle, setSubtitle] = useState(initialData.heroSubtitle || '')
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSave = async () => {
    try {
      setSaving(true)
      setMsg('')
      await updateHeaderSettings({ logo, heroImage, heroTitle: title.slice(0, 80), heroSubtitle: subtitle.slice(0, 300) })
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
            Header Logo
          </h3>
          <ImageUploader value={logo} onChange={setLogo} fallback={defaultHeaderLogo} isDark={isDark} />
        </div>
        <div>
          <h3 className="font-semibold mb-3" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Hero Image
          </h3>
          <ImageUploader value={heroImage} onChange={setHeroImage} fallback={defaultHeroImage} isDark={isDark} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
              Hero Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value.slice(0, 80))}
              className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
              style={{
                background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                color: isDark ? COLORS.dark.text : COLORS.light.text,
              }}
              placeholder="Welcome to Our Clinic"
            />
            <div className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
              {title.length}/80
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
              Hero Subtitle
            </label>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value.slice(0, 300))}
              className="w-full border rounded-lg px-4 py-2.5 h-32 outline-none transition-all focus:ring-2 resize-none"
              style={{
                background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                color: isDark ? COLORS.dark.text : COLORS.light.text,
              }}
              placeholder="Short subtitle describing your clinic"
            />
            <div className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
              {subtitle.length}/300
            </div>
          </div>
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
