import React from 'react';
import { COLORS } from '../../styles/theme';
import RoleBadge from './RoleBadge';

export default function MessageBubble({ message, isOwn, isDark }) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-2xl p-4 relative group ${isOwn ? 'rounded-tr-none' : 'rounded-tl-none'}`}
        style={{
          background: isOwn
            ? (isDark ? COLORS.dark.primary : COLORS.light.primary)
            : (isDark ? COLORS.dark.cardBg : COLORS.light.cardBg),
          color: isOwn ? '#FFFFFF' : (isDark ? COLORS.dark.text : COLORS.light.text),
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          border: isOwn ? 'none' : `1px solid ${isDark ? COLORS.dark.muted : COLORS.light.muted}`,
        }}
      >
        {!isOwn && (
          <div className="mb-1 flex items-center gap-2">
            <span className="text-xs font-bold opacity-70">{message.senderName}</span>
            <RoleBadge role={message.senderRole} isDark={isDark} size="sm" />
          </div>
        )}
        
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        <div className={`text-[10px] mt-1 text-right ${isOwn ? 'opacity-70' : 'opacity-50'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
