import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../styles/theme';
import RoleBadge from './RoleBadge';
import HighlightedText from '../shared/HighlightedText';

export default function ContactList({ contacts, selectedContactId, onSelectContact, isDark }) {
  const [searchTerm, setSearchTerm] = useState('');
  const theme = isDark ? COLORS.dark : COLORS.light;

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col border-r select-none" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
      <div className="p-4 border-b" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }} />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition-all focus:ring-2"
            style={{
              background: isDark ? COLORS.dark.background : COLORS.light.secondary,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              '--tw-ring-color': isDark ? COLORS.dark.primary : COLORS.light.primary,
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filteredContacts.map(contact => (
            <motion.div
              key={contact.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ x: 4, backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
              onClick={() => onSelectContact(contact)}
              className="p-4 flex items-center gap-3 cursor-pointer transition-colors"
              style={{
                background: selectedContactId === contact.id
                  ? (isDark ? `${COLORS.dark.primary}15` : `${COLORS.light.primary}10`)
                  : 'transparent',
                borderLeft: selectedContactId === contact.id
                  ? `3px solid ${isDark ? COLORS.dark.primary : COLORS.light.primary}`
                  : '3px solid transparent',
              }}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                    style={{
                      background: '#10B981',
                      borderColor: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg
                    }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm truncate" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                    <HighlightedText text={contact.name} highlight={searchTerm} theme={theme} />
                  </h4>
                  <span className="text-[10px] opacity-60" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                    {contact.lastMessageTime}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs truncate opacity-70 max-w-[120px]" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                    {contact.lastMessage}
                  </p>
                  <RoleBadge role={contact.role} isDark={isDark} size="sm" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
