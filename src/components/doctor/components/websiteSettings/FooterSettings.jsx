import React, { useState } from 'react';
import { Save, Globe, Phone, Mail, MapPin, Shield } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import { updateFooterSettings } from '../../services/landingPageApi';
import defaultFooterLogo from '../../../../images/Footerlogo.png';
import { COLORS } from '../../styles/theme';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;

export default function FooterSettings({ initialData = {}, isDark }) {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [logo, setLogo] = useState(initialData.logo || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [phone, setPhone] = useState(initialData.phone || '');
  const [email, setEmail] = useState(initialData.email || '');
  const [address, setAddress] = useState(initialData.address || '');
  const [copyright, setCopyright] = useState(initialData.copyright || '');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSave = async () => {
    if (email && !emailRegex.test(email)) {
      setMsg('Invalid email format');
      return;
    }
    if (phone && !phoneRegex.test(phone)) {
      setMsg('Invalid phone number format');
      return;
    }
    try {
      setSaving(true);
      setMsg('');
      await updateFooterSettings({ logo, description: description.slice(0, 200), phone, email, address, copyright });
      setMsg('Changes saved successfully');
    } catch (e) {
      setMsg('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Branding Section */}
        <div className="rounded-xl border p-6 space-y-6" style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg" style={{ background: `${theme.primary}20`, color: theme.primary }}>
              <Globe size={20} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: theme.text }}>Branding & Info</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: theme.text }}>Footer Logo</label>
              <ImageUploader value={logo} onChange={setLogo} fallback={defaultFooterLogo} isDark={isDark} />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: theme.text }}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value.slice(0, 200))}
                className="w-full border rounded-xl px-4 py-3 h-32 outline-none transition-all focus:ring-2 resize-none"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.text,
                  '--tw-ring-color': theme.primary
                }}
                placeholder="Short footer description..."
              />
              <div className="text-xs mt-1 text-right opacity-60" style={{ color: theme.text }}>
                {description.length}/200
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-xl border p-6 space-y-6" style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg" style={{ background: `${theme.accent}20`, color: theme.accent }}>
              <Phone size={20} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: theme.text }}>Contact Details</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: theme.text }}>
                <Phone size={14} /> Phone
              </label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none transition-all focus:ring-2"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.text,
                  '--tw-ring-color': theme.primary
                }}
                placeholder="+1 555 123 4567"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: theme.text }}>
                <Mail size={14} /> Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 outline-none transition-all focus:ring-2"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.text,
                  '--tw-ring-color': theme.primary
                }}
                placeholder="hello@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 flex items-center gap-2" style={{ color: theme.text }}>
                <MapPin size={14} /> Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 h-24 outline-none transition-all focus:ring-2 resize-none"
                style={{
                  background: theme.cardBg,
                  borderColor: theme.border,
                  color: theme.text,
                  '--tw-ring-color': theme.primary
                }}
                placeholder="Clinic address..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="rounded-xl border p-6" style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg" style={{ background: `${theme.success}20`, color: theme.success }}>
            <Shield size={20} />
          </div>
          <h3 className="text-lg font-bold" style={{ color: theme.text }}>Legal</h3>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2" style={{ color: theme.text }}>Copyright Text</label>
          <input
            value={copyright}
            onChange={(e) => setCopyright(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none transition-all focus:ring-2"
            style={{
              background: theme.cardBg,
              borderColor: theme.border,
              color: theme.text,
              '--tw-ring-color': theme.primary
            }}
            placeholder="© 2025 Clinic Name. All rights reserved."
          />
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
