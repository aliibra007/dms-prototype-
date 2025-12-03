import React from 'react';
import { Camera } from 'lucide-react';
import { COLORS } from '../../styles/theme';

export default function ProfileAvatarSection({ isDark, fullName, onChangePhoto }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        {/* Avatar Circle */}
        <div
          className="w-40 h-40 rounded-full overflow-hidden border-4 shadow-lg"
          style={{
            borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary,
          }}
        >
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Doctor"
            alt="Doctor Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
          style={{
            background: isDark
              ? 'rgba(0, 0, 0, 0.7)'
              : 'rgba(0, 0, 0, 0.6)',
          }}
          onClick={onChangePhoto}
        >
          <Camera size={32} className="text-white mb-2" />
          <span className="text-white text-sm font-semibold">Change Photo</span>
        </div>
      </div>

      <div className="text-center">
        <h3 className="font-bold text-lg" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
          {fullName}
        </h3>
        <p className="text-sm" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
          Cardiologist
        </p>
      </div>
    </div>
  );
}
