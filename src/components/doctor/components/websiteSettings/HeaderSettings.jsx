import React, { useState } from 'react';
import { Save, Layout, Image as ImageIcon } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import { updateHeaderSettings } from '../../services/landingPageApi';
import defaultHeaderLogo from '../../../../images/Headerlogo.png';
import defaultHeroImage from '../../../../images/Heroimage.png';
import { COLORS } from '../../styles/theme';

export default function HeaderSettings({ initialData = {}, isDark }) {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [logo, setLogo] = useState(initialData.logo || '');
  const [heroImage, setHeroImage] = useState(initialData.heroImage || '');
  const [title, setTitle] = useState(initialData.heroTitle || '');
  const [subtitle, setSubtitle] = useState(initialData.heroSubtitle || '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSave = async () => {
    try {
      setSaving(true);
      setMsg('');
      await updateHeaderSettings({
        logo,
        heroImage,
        heroTitle: title.slice(0, 80),
        heroSubtitle: subtitle.slice(0, 300),
        logoShape: 'circle' // Force circle
      });
      setMsg('Changes saved successfully');
    } catch (e) {
      setMsg('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Configuration Section */}
      <div className="rounded-xl border p-6 space-y-6" style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ background: `${theme.primary}20`, color: theme.primary }}>
            <Layout size={20} />
          </div>
          <h3 className="text-lg font-bold" style={{ color: theme.text }}>Header Configuration</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider opacity-70" style={{ color: theme.text }}>Logo Image</h4>
            <p className="text-sm opacity-60 mb-2" style={{ color: theme.text }}>
              Your logo will be automatically cropped to a circle.
            </p>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <div className="w-48">
              <ImageUploader value={logo} onChange={setLogo} fallback={defaultHeaderLogo} isDark={isDark} circleMask={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Configuration */}
      <div className="rounded-xl border p-6 space-y-6" style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ background: `${theme.accent}20`, color: theme.accent }}>
            <ImageIcon size={20} />
          </div>
          <h3 className="text-lg font-bold" style={{ color: theme.text }}>Hero Section</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h4 className="font-semibold text-sm uppercase tracking-wider opacity-70" style={{ color: theme.text }}>Hero Image</h4>
            <ImageUploader value={heroImage} onChange={setHeroImage} fallback={defaultHeroImage} isDark={isDark} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: theme.text }}>
                Hero Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, 80))}
                className="w-full border rounded-xl px-4 py-3 outline-none transition-all focus:ring-2"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.text,
                  '--tw-ring-color': theme.primary
                }}
                placeholder="Welcome to Our Clinic"
              />
              <div className="text-xs mt-1 text-right opacity-60" style={{ color: theme.text }}>
                {title.length}/80
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: theme.text }}>
                Hero Subtitle
              </label>
              <textarea
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value.slice(0, 300))}
                className="w-full border rounded-xl px-4 py-3 h-32 outline-none transition-all focus:ring-2 resize-none"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.text,
                  '--tw-ring-color': theme.primary
                }}
                placeholder="Short subtitle describing your clinic..."
              />
              <div className="text-xs mt-1 text-right opacity-60" style={{ color: theme.text }}>
                {subtitle.length}/300
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Action */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t" style={{ borderColor: theme.border }}>
        {msg && (
          <span className="text-sm font-medium animate-fade-in" style={{ color: msg.includes('success') ? theme.success : theme.danger }}>
            {msg}
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`,
          }}
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
