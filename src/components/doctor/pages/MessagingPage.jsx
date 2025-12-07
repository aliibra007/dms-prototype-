import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { COLORS } from '../styles/theme';
import useScrollLock from '../hooks/useScrollLock';
import ContactList from '../components/messaging/ContactList';
import ChatWindow from '../components/messaging/ChatWindow';

// Mock Data
const MOCK_CONTACTS = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    role: 'Doctor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    lastMessage: 'Shared a patient profile',
    lastMessageTime: '10:30 AM',
    online: true,
    phone: '+1234567890',
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    role: 'Secretary',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'Schedule updated for tomorrow',
    lastMessageTime: 'Yesterday',
    online: true,
    phone: '+1234567891',
  },
  {
    id: 3,
    name: 'James Rodriguez',
    role: 'Patient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    lastMessage: 'Thank you for the prescription',
    lastMessageTime: '2 days ago',
    online: false,
    phone: '+1234567892',
  },
  {
    id: 4,
    name: 'Dr. Michael Chang',
    role: 'Doctor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    lastMessage: 'Conference details attached',
    lastMessageTime: '1 week ago',
    online: false,
    phone: '+1234567893',
  },
];

const MOCK_MESSAGES = {
  1: [
    { id: 1, type: 'text', content: 'Hi Dr. Chen, could you take a look at the lab results for John Doe?', senderName: 'Me', senderRole: 'Doctor', isOwn: true, timestamp: '10:00 AM' },
    { id: 2, type: 'text', content: 'Sure, send them over.', senderName: 'Dr. Emily Chen', senderRole: 'Doctor', isOwn: false, timestamp: '10:05 AM' },
    { id: 3, type: 'file', content: { name: 'Lab_Results_JD.pdf', size: 2500000, type: 'application/pdf' }, senderName: 'Me', senderRole: 'Doctor', isOwn: true, timestamp: '10:06 AM' },
    { id: 4, type: 'text', content: 'Thanks! I also think he might need a follow-up for his hypertension.', senderName: 'Dr. Emily Chen', senderRole: 'Doctor', isOwn: false, timestamp: '10:25 AM' },
    { id: 5, type: 'patient', content: { id: 101, name: "John Doe", age: 45, condition: "Hypertension", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" }, senderName: 'Dr. Emily Chen', senderRole: 'Doctor', isOwn: false, timestamp: '10:30 AM' },
  ],
  2: [
    { id: 1, type: 'text', content: 'Hi Sarah, did we reschedule Mrs. Smith?', senderName: 'Me', senderRole: 'Doctor', isOwn: true, timestamp: 'Yesterday' },
    { id: 2, type: 'text', content: 'Yes, she is moved to next Tuesday at 2 PM.', senderName: 'Sarah Wilson', senderRole: 'Secretary', isOwn: false, timestamp: 'Yesterday' },
    { id: 3, type: 'text', content: 'Schedule updated for tomorrow as well.', senderName: 'Sarah Wilson', senderRole: 'Secretary', isOwn: false, timestamp: 'Yesterday' },
  ],
  3: [
    { id: 1, type: 'text', content: 'Good morning Dr., I am feeling much better.', senderName: 'James Rodriguez', senderRole: 'Patient', isOwn: false, timestamp: '2 days ago' },
    { id: 2, type: 'text', content: 'Glad to hear that James. Keep taking the meds.', senderName: 'Me', senderRole: 'Doctor', isOwn: true, timestamp: '2 days ago' },
    { id: 3, type: 'text', content: 'Thank you for the prescription', senderName: 'James Rodriguez', senderRole: 'Patient', isOwn: false, timestamp: '2 days ago' },
  ],
  4: [
    { id: 1, type: 'text', content: 'Here are the details for the upcoming cardiology conference.', senderName: 'Dr. Michael Chang', senderRole: 'Doctor', isOwn: false, timestamp: '1 week ago' },
    { id: 2, type: 'file', content: { name: 'Conference_Schedule.pdf', size: 1200000, type: 'application/pdf' }, senderName: 'Dr. Michael Chang', senderRole: 'Doctor', isOwn: false, timestamp: '1 week ago' },
  ],
};

export default function MessagingPage() {
  const { isDark } = useOutletContext();
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [contacts, setContacts] = useState(MOCK_CONTACTS);
  const [wallpaperColor, setWallpaperColor] = useState('transparent');

  // Assuming ChatWindow might have internal modals or overlays, but if not, 
  // we might not need this here unless there's a specific modal state lifted up.
  // However, the user requested "messaging when uploading a file", which implies
  // a file upload modal. If that modal is inside ChatWindow, we might need to pass
  // the hook down or lift the state up. 
  // For now, I'll check if there's a file upload state here or if it's in ChatWindow.
  // Looking at previous code, FileUploadModal is likely used in ChatWindow.
  // I will check ChatWindow.jsx next to be sure.

  // Placeholder for now, will verify ChatWindow.

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedContact(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = (messageData) => {
    if (!selectedContact) return;

    const newMessage = {
      id: Date.now(),
      type: messageData.type,
      content: messageData.content,
      senderName: 'Me',
      senderRole: 'Doctor',
      isOwn: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));
  };

  const handleClearChat = () => {
    if (!selectedContact) return;
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: []
    }));
  };

  const handleBlockUser = () => {
    if (!selectedContact) return;
    alert(`Blocked ${selectedContact.name}`);
    setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
    setSelectedContact(null);
  };

  const handleDeleteContact = () => {
    if (!selectedContact) return;
    if (window.confirm(`Delete chat with ${selectedContact.name}?`)) {
      setContacts(prev => prev.filter(c => c.id !== selectedContact.id));
      setSelectedContact(null);
    }
  };

  // NOTE: check this one 
  return (
    <>
      {/* TRANSPARENCY: Change opacity values to adjust main container (00=fully transparent, ff=fully opaque) */}
      <div
        className="h-[calc(100vh-8rem)] rounded-xl shadow-lg border-2 overflow-hidden flex backdrop-blur-sm"
        onContextMenu={(e) => {
          e.preventDefault();
          setSelectedContact(null);
        }}
        style={{
          background: isDark ? `${COLORS.dark.cardBg}66` : `${COLORS.light.cardBg}33`,
          borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary,
        }}
      >
        {/* Sidebar - Hidden on mobile when chat is open */}
        <div className={`w-full md:w-80 flex-shrink-0 ${selectedContact ? 'hidden md:block' : 'block'}`}>
          <ContactList
            contacts={contacts}
            selectedContactId={selectedContact?.id}
            onSelectContact={setSelectedContact}
            isDark={isDark}
          />
        </div>

        {/* Chat Window - Hidden on mobile when no chat selected */}
        <div className={`flex-1 flex flex-col ${!selectedContact ? 'hidden md:flex' : 'flex'}`}>
          {selectedContact && (
            <div className="md:hidden p-2 border-b flex items-center" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-sm font-medium px-3 py-1 rounded-lg"
                style={{ color: isDark ? COLORS.dark.primary : COLORS.light.primary }}
              >
                ← Back
              </button>
            </div>
          )}
          <ChatWindow
            contact={selectedContact}
            messages={selectedContact ? (messages[selectedContact.id] || []) : []}
            onSendMessage={handleSendMessage}
            isDark={isDark}
            wallpaperColor={wallpaperColor}
            onChangeWallpaper={setWallpaperColor}
            onClearChat={handleClearChat}
            onBlockUser={handleBlockUser}
            onDeleteContact={handleDeleteContact}
          />
        </div>
      </div>
    </>
  );
}
