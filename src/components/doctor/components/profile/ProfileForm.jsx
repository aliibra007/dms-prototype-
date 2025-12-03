import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { COLORS } from '../../styles/theme';

export default function ProfileForm({ isDark, profileData, onChange, onPhoneChange }) {
  return (
    <>
      {/* Full Name */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
          <User size={16} />
          Full Name
        </label>
        <input
          type="text"
          value={profileData.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
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
          onChange={(e) => onChange('email', e.target.value)}
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
          {/* Phone Input */}
          <input
            type="tel"
            value={profileData.phone}
            onChange={onPhoneChange}
            className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
            style={{
              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
            }}
            placeholder="+961 70 123 456"
          />
        </div>
      </div>
    </>
  );
}
