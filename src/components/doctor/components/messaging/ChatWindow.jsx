import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, MoreVertical, Trash2, Ban, XCircle, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { COLORS } from '../../styles/theme';
import MessageBubble from './MessageBubble';
import RoleBadge from './RoleBadge';
import FileUploadModal from '../shared/FileUploadModal';

export default function ChatWindow({
  contact,
  messages,
  onSendMessage,
  isDark,
  wallpaperColor,
  onChangeWallpaper,
  onClearChat,
  onBlockUser,
  onDeleteContact
}) {
  const [newMessage, setNewMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const optionsRef = useRef(null);
  const theme = isDark ? COLORS.dark : COLORS.light;

  // Close options when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setShowOptions(false);
        setShowWallpaperPicker(false);
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
    onSendMessage({ type: 'text', content: newMessage });
    setNewMessage('');
  };

  const handleWhatsAppClick = () => {
    if (!contact?.phone) return;
    // Remove any non-digit characters except +
    const phoneNumber = contact.phone.replace(/[^\d+]/g, '');
    // Open WhatsApp with the phone number
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleFileUpload = (file) => {
    onSendMessage({
      type: 'file',
      content: { name: file.name, size: file.size, type: file.type }
    });
  };

  const handleSharePatient = () => {
    // Mock sharing a patient
    const mockPatient = {
      id: 101,
      name: "John Doe",
      age: 45,
      condition: "Hypertension",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
    };
    onSendMessage({ type: 'patient', content: mockPatient });
    setShowOptions(false);
  };

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center flex-col gap-4 opacity-50" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
        <div className="w-20 h-20 rounded-full animate-pulse" style={{ background: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
        <p>Select a contact to start messaging</p>
      </div>
    );
  }

  const wallpaperPresets = [
    { name: 'Default', value: 'transparent' },
    { name: 'Primary', value: isDark ? COLORS.dark.primary : COLORS.light.primary },
    { name: 'Accent', value: isDark ? COLORS.dark.accent : COLORS.light.accent },
    { name: 'Success', value: isDark ? COLORS.dark.success : COLORS.light.success },
    { name: 'Warning', value: isDark ? COLORS.dark.warning : COLORS.light.warning },
  ];

  return (
    <div className="h-full flex flex-col relative">
      {/* Header */}
      {/* TRANSPARENCY: Change opacity values to adjust header (00=fully transparent, ff=fully opaque) */}
      <div className="p-4 border-b flex items-center justify-between shadow-sm z-20 backdrop-blur-sm"
        style={{
          background: isDark ? `${COLORS.dark.cardBg}55` : `${COLORS.light.cardBg}33`,
          borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
        }}
      >
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
          <button 
            onClick={handleWhatsAppClick}
            className="p-2 rounded-full transition-colors hover:bg-opacity-10 flex items-center justify-center" 
            style={{ 
              color: '#25D366', 
              backgroundColor: `${isDark ? '#25D366' : '#25D366'}15` 
            }}
            title="Open WhatsApp chat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
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
              <div className="absolute right-0 top-full mt-2 w-64 rounded-xl shadow-2xl border overflow-hidden animate-fade-in z-50"
                style={{
                  background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg,
                  borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
                }}
              >
                <div className="py-1">
                  {showWallpaperPicker ? (
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Select Wallpaper</span>
                        <button
                          onClick={() => setShowWallpaperPicker(false)}
                          className="text-xs hover:underline"
                          style={{ color: isDark ? COLORS.dark.primary : COLORS.light.primary }}
                        >
                          Back
                        </button>
                      </div>
                      <div className="grid grid-cols-5 gap-2">
                        {wallpaperPresets.map((preset) => (
                          <button
                            key={preset.name}
                            onClick={() => onChangeWallpaper(preset.value)}
                            className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                            style={{
                              background: preset.value === 'transparent' ? (isDark ? COLORS.dark.background : COLORS.light.secondary) : preset.value,
                              borderColor: wallpaperColor === preset.value ? (isDark ? COLORS.dark.text : COLORS.light.text) : 'transparent'
                            }}
                            title={preset.name}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setShowWallpaperPicker(true)}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors"
                        style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}
                      >
                        <ImageIcon size={18} />
                        <span className="text-sm">Change Wallpaper</span>
                      </button>
                      <button
                        onClick={handleSharePatient}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors"
                        style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}
                      >
                        <UserPlus size={18} />
                        <span className="text-sm">Share Patient Profile</span>
                      </button>
                      <button
                        onClick={() => { onClearChat(); setShowOptions(false); }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors"
                        style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}
                      >
                        <XCircle size={18} />
                        <span className="text-sm">Clear Chat</span>
                      </button>
                      <div className="h-px my-1" style={{ background: isDark ? COLORS.dark.muted : COLORS.light.muted }} />
                      <button
                        onClick={() => { onBlockUser(); setShowOptions(false); }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors text-red-500"
                      >
                        <Ban size={18} />
                        <span className="text-sm">Block User</span>
                      </button>
                      <button
                        onClick={() => { onDeleteContact(); setShowOptions(false); }}
                        className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-opacity-10 transition-colors text-red-500"
                      >
                        <Trash2 size={18} />
                        <span className="text-sm">Delete Contact</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-300"
        style={{
          background: wallpaperColor === 'transparent' ? (isDark ? COLORS.dark.background : COLORS.light.secondary) : wallpaperColor
        }}
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
      {/* TRANSPARENCY: Change opacity values to adjust input area (00=fully transparent, ff=fully opaque) */}
      <div className="p-4 border-t backdrop-blur-sm"
        style={{
          background: isDark ? `${COLORS.dark.cardBg}55` : `${COLORS.light.cardBg}33`,
          borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
        }}
      >
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsUploadModalOpen(true)}
            className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
            style={{ color: isDark ? COLORS.dark.text : COLORS.light.text, backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' }}
          >
            <Paperclip size={20} />
          </motion.button>

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

          <motion.button
            type="submit"
            disabled={!newMessage.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-full text-white shadow-lg transition-all disabled:opacity-50 disabled:hover:scale-100"
            style={{
              background: `linear-gradient(135deg, ${isDark ? COLORS.dark.primary : COLORS.light.primary}, ${isDark ? COLORS.dark.accent : COLORS.light.accent})`,
            }}
          >
            <Send size={18} />
          </motion.button>
        </form>
      </div>

      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
        theme={theme}
        isDark={isDark}
      />
    </div>
  );
}
