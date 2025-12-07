import React, { useEffect, useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { COLORS } from '../../../styles/theme';

export default function ImageUploader({ value, onChange, fallback, isDark, circleMask = false }) {
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null);
  const theme = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    setPreview(value || fallback);
  }, [value, fallback]);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onChange(url);
  };

  return (
    <div className="space-y-3">
      <div
        className={`w-full aspect-video overflow-hidden flex items-center justify-center border-2 transition-all relative group ${circleMask ? 'rounded-full aspect-square w-32 mx-auto' : 'rounded-xl'}`}
        style={{
          background: theme.secondary,
          borderColor: theme.border,
        }}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <div className="text-sm opacity-60" style={{ color: theme.text }}>
            No image
          </div>
        )}

        {/* Overlay for quick upload */}
        <div
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="text-white" size={24} />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          style={{
            background: `${theme.primary}15`,
            color: theme.primary,
            border: `1px solid ${theme.primary}30`
          }}
        >
          <Upload size={16} />
          Browse Image
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
        />
      </div>
    </div>
  );
}
