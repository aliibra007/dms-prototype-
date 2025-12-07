import React from 'react';
import { FileText, Download, User } from 'lucide-react';
import { COLORS } from '../../styles/theme';
import RoleBadge from './RoleBadge';

export default function MessageBubble({ message, isOwn, isDark }) {
  const renderContent = () => {
    switch (message.type) {
      case 'file':
        return (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-black/5 dark:bg-white/10">
            <div className="p-2 rounded-lg bg-white/20">
              <FileText size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{message.content.name}</p>
              <p className="text-xs opacity-70">{(message.content.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            <button className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              <Download size={16} />
            </button>
          </div>
        );
      case 'patient':
        return (
          <div className="flex items-center gap-3 p-2 rounded-lg bg-black/5 dark:bg-white/10 min-w-[200px]">
            <img
              src={message.content.avatar}
              alt={message.content.name}
              className="w-10 h-10 rounded-full bg-gray-200"
            />
            <div>
              <p className="font-bold text-sm">{message.content.name}</p>
              <p className="text-xs opacity-80">{message.content.age} yrs • {message.content.condition}</p>
            </div>
          </div>
        );
      default:
        return <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>;
    }
  };

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

        {renderContent()}

        <div className={`text-[10px] mt-1 text-right ${isOwn ? 'opacity-70' : 'opacity-50'}`}>
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
