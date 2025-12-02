import React, { useEffect, useState } from 'react'

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

export default function ImageUploader({ value, onChange, fallback, isDark }) {
  const [preview, setPreview] = useState('')

  useEffect(() => {
    setPreview(value || fallback)
  }, [value, fallback])

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    // In real app you'd upload and set remote URL; here we return data URL/path
    onChange(url)
  }

  return (
    <div className="space-y-3">
      <div
        className="w-full aspect-video rounded-lg overflow-hidden flex items-center justify-center border-2 transition-all"
        style={{
          background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
          borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
        }}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            No image
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="text-sm"
        style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}
      />
    </div>
  )
}
