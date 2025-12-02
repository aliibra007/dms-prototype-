import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import HeaderSettings from '../components/websiteSettings/HeaderSettings'
import TreatmentsSettings from '../components/websiteSettings/TreatmentsSettings'
import FooterSettings from '../components/websiteSettings/FooterSettings'
import { getLandingPageSettings } from '../services/landingPageApi'
import { COLORS } from '../styles/theme'

const TabButton = ({ label, active, onClick, isDark }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg font-semibold transition-all ${active ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
      }`}
    style={{
      background: active
        ? `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})`
        : 'transparent',
    }}
  >
    {label}
  </button>
)

export default function WebsiteSettings() {
  const { isDark } = useOutletContext()
  const [active, setActive] = useState('header')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  useEffect(() => {
    let mounted = true
      ; (async () => {
        try {
          setLoading(true)
          const res = await getLandingPageSettings()
          if (mounted) setData(res || {})
        } catch (e) {
          setError('Failed to load settings')
        } finally {
          setLoading(false)
        }
      })()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
            Website Settings
          </h1>
          <p className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            Customize your public landing page
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <TabButton label="Header Settings" active={active === 'header'} onClick={() => setActive('header')} isDark={isDark} />
        <TabButton label="Treatments" active={active === 'treatments'} onClick={() => setActive('treatments')} isDark={isDark} />
        <TabButton label="Footer Settings" active={active === 'footer'} onClick={() => setActive('footer')} isDark={isDark} />
      </div>

      {loading && (
        <div className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
          Loading...
        </div>
      )}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {!loading && !error && (
        <div
          className="rounded-xl shadow-lg border-2 p-6 space-y-6"
          style={{
            background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
            borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary,
          }}
        >
          {active === 'header' && <HeaderSettings initialData={data?.header} isDark={isDark} />}
          {active === 'treatments' && <TreatmentsSettings initialData={data?.treatments || []} isDark={isDark} />}
          {active === 'footer' && <FooterSettings initialData={data?.footer} isDark={isDark} />}
        </div>
      )}
    </div>
  )
}
