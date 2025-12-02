import React, { useMemo, useState } from 'react'
import TreatmentCardEditor from './components/TreatmentCardEditor'
import { addTreatment, updateTreatment, deleteTreatment } from '../../services/landingPageApi'

const ICONS = ['tooth', 'heart', 'stethoscope', 'pill', 'smile', 'sparkles']

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

export default function TreatmentsSettings({ initialData = [], isDark }) {
  const [cards, setCards] = useState(Array.isArray(initialData) ? initialData.slice(0, 6) : [])
  const [msg, setMsg] = useState('')

  const canAdd = cards.length < 6

  const handleAdd = async () => {
    if (!canAdd) return
    const draft = { title: '', description: '', icon: ICONS[0] }
    try {
      const created = await addTreatment(draft)
      setCards((prev) => [...prev, created])
      setMsg('Treatment added')
    } catch (e) {
      setMsg('Failed to add treatment')
    }
  }

  const handleUpdate = async (id, data) => {
    try {
      const updated = await updateTreatment(id, data)
      setCards((prev) => prev.map((c) => (c.id === id ? updated : c)))
      setMsg('Treatment updated')
    } catch (e) {
      setMsg('Failed to update treatment')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTreatment(id)
      setCards((prev) => prev.filter((c) => c.id !== id))
      setMsg('Treatment deleted')
    } catch (e) {
      setMsg('Failed to delete treatment')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
        <div className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
          Maximum 6 treatment cards
        </div>
        <button
          onClick={handleAdd}
          disabled={!canAdd}
          className="px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          style={{
            background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})`,
          }}
        >
          Add Treatment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <TreatmentCardEditor
            key={card.id || card.tempId}
            value={card}
            icons={ICONS}
            onSave={(data) => handleUpdate(card.id, data)}
            onDelete={() => handleDelete(card.id)}
            isDark={isDark}
          />
        ))}
      </div>

      {msg && (
        <div className="text-sm" style={{ color: msg.includes('added') || msg.includes('updated') || msg.includes('deleted') ? '#10B981' : '#EF4444' }}>
          {msg}
        </div>
      )}
    </div>
  )
}
