import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Phone, Video, Trash2, Ban, Image as ImageIcon, XCircle } from 'lucide-react';
import { COLORS } from '../../styles/theme';
import MessageBubble from './MessageBubble';
import RoleBadge from './RoleBadge';

export default function ChatWindow({ contact, messages, onSendMessage, isDark }) {
  const [newMessage, setNewMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const optionsRef = useRef(null);

  // Close options when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage);
    setNewMessage('');
  };

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-4 opacity-50">
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        <p>Select a contact to start messaging</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between shadow-sm z-20"
        style={{
          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
          borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
        }}
      >
        {/* ... (existing contact info) */}
        <div className="flex items-center gap-3">
          <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="font-semibold text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
              {contact.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs opacity-70" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Online</span>
              <RoleBadge role={contact.role} isDark={isDark} size="sm" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 relative">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
            <Video size={20} />
          </button>
          
          <div ref={optionsRef} className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
              style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}
            >
              <MoreVertical size={20} />
            </button>

            {showOptions && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-xl shadow-2xl border overflow-hidden animate-fade-in z-50"
                style={{
                  background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
                  borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
                }}
              >
                <div className="py-1">
                  <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors"
                    style={{ color: isDark ? COLORS.dark.text : COLORS.light.text, hover: { backgroundColor: isDark ? COLORS.dark.muted : COLORS.light.muted } }}
                  >
                    <ImageIcon size={18} />
                    <span className="text-sm">Change Wallpaper</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors"
                    style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}
                  >
                    <XCircle size={18} />
                    <span className="text-sm">Clear Chat</span>
                  </button>
                  <div className="h-px my-1" style={{ background: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                  <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors text-red-500"
                  >
                    <Ban size={18} />
                    <span className="text-sm">Block User</span>
                  </button>
                  <button className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors text-red-500"
                  >
                    <Trash2 size={18} />
                    <span className="text-sm">Delete Contact</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ background: isDark ? COLORS.dark.background : COLORS.light.secondary }}
      >
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isOwn={msg.isOwn}
            isDark={isDark}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t"
        style={{
          background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
          borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
        }}
      >
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}
          >
            <Paperclip size={20} />
          </button>
          
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 rounded-full text-sm outline-none border transition-all focus:ring-2"
            style={{
              background: isDark ? COLORS.dark.background : COLORS.light.secondary,
              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
              color: isDark ? COLORS.dark.text : COLORS.light.text,
              '--tw-ring-color': isDark ? COLORS.dark.primary : COLORS.light.primary,
            }}
          />
          
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 rounded-full text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            style={{
              background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})`,
            }}
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
