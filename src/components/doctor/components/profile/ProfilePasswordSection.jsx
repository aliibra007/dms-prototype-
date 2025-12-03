import React from 'react';
import { Lock, Shield, AlertCircle } from 'lucide-react';
import { COLORS } from '../../styles/theme';

export default function ProfilePasswordSection({
  isDark,
  profileData,
  showPasswordField,
  setShowPasswordField,
  onChange,
  passwordStrength,
  passwordsMatch
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
        <Lock size={16} />
        Password
      </label>

      {!showPasswordField ? (
        <button
          onClick={() => setShowPasswordField(true)}
          className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: `${isDark ? COLORS.dark.accent : COLORS.light.accent}20`,
            color: isDark ? COLORS.dark.accent : COLORS.light.accent,
          }}
        >
          Change Password
        </button>
      ) : (
        <div className="space-y-4">
          {/* New Password */}
          <div>
            <input
              type="password"
              value={profileData.password}
              onChange={(e) => onChange('password', e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
              style={{
                background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                color: isDark ? COLORS.dark.text : COLORS.light.text,
              }}
              placeholder="Enter new password"
            />

            {/* Password Strength Indicator */}
            {profileData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield size={14} style={{ color: passwordStrength.color }} />
                    <span className="text-xs font-semibold" style={{ color: passwordStrength.color }}>
                      Password Strength: {passwordStrength.label}
                    </span>
                  </div>
                </div>
                {/* Strength Bar */}
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary }}>
                  <div
                    className="h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${passwordStrength.score}%`,
                      background: passwordStrength.color,
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              value={profileData.confirmPassword}
              onChange={(e) => onChange('confirmPassword', e.target.value)}
              className="w-full border rounded-lg px-4 py-2.5 outline-none transition-all focus:ring-2"
              style={{
                background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                borderColor: !passwordsMatch ? '#EF4444' : (isDark ? COLORS.dark.muted : COLORS.light.muted),
                color: isDark ? COLORS.dark.text : COLORS.light.text,
              }}
              placeholder="Confirm new password"
            />

            {/* Password Match Indicator */}
            {profileData.confirmPassword && (
              <div className="flex items-center gap-2 mt-2">
                {passwordsMatch ? (
                  <>
                    <div className="w-4 h-4 rounded-full" style={{ background: '#10B981' }}>
                      <span className="text-white text-xs flex items-center justify-center">✓</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: '#10B981' }}>
                      Passwords match
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} style={{ color: '#EF4444' }} />
                    <span className="text-xs font-medium" style={{ color: '#EF4444' }}>
                      Passwords do not match
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setShowPasswordField(false)
              onChange('password', '')
              onChange('confirmPassword', '')
            }}
            className="text-sm"
            style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}
          >
            Cancel password change
          </button>
        </div>
      )}
    </div>
  );
}
