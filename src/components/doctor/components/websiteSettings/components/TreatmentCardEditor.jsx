import React, { useMemo, useState } from 'react'

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

export default function TreatmentCardEditor({ value, icons = [], onSave, onDelete, isDark }) {
  const [title, setTitle] = useState(value.title || '')
  const [description, setDescription] = useState(value.description || '')
  const [icon, setIcon] = useState(value.icon || icons[0] || 'tooth')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave({ title: title.slice(0, 40), description: description.slice(0, 150), icon })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className="border-2 rounded-xl p-5 shadow-lg transition-all hover:shadow-xl"
      style={{
        background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
        borderColor: isDark ? COLORS.dark.accent : COLORS.light.accent,
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 40))}
            className="w-full border rounded-lg px-3 py-2 outline-none transition-all focus:ring-2"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="Treatment title"
          />
          <div className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            {title.length}/40
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, 150))}
            className="w-full border rounded-lg px-3 py-2 h-24 outline-none transition-all focus:ring-2 resize-none"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="Treatment description"
          />
          <div className="text-xs mt-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            {description.length}/150
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Icon
          </label>
          <select
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 outline-none transition-all"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
          >
            {icons.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between gap-2 pt-3 border-t" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{
              background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})`,
            }}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-lg border-2 font-semibold transition-all hover:scale-105"
            style={{
              borderColor: '#EF4444',
              color: '#EF4444',
              background: 'transparent',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
