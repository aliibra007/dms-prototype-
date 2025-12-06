import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { COLORS } from '../styles/theme';
import ContactList from '../components/messaging/ContactList';
import ChatWindow from '../components/messaging/ChatWindow';

// Mock Data - Secretary's contacts (Doctors, Patients, etc.)
const MOCK_CONTACTS = [
  {
    id: 1,
    name: 'Dr. Emily Chen',
    role: 'Doctor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    lastMessage: 'Can you schedule a follow-up appointment?',
    lastMessageTime: '10:30 AM',
    online: true,
    phone: '+1234567890',
  },
  {
    id: 2,
    name: 'James Rodriguez',
    role: 'Patient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    lastMessage: 'Thank you for the appointment confirmation!',
    lastMessageTime: 'Yesterday',
    online: true,
    phone: '+1234567891',
  },
  {
    id: 3,
    name: 'Maria Garcia',
    role: 'Patient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    lastMessage: 'I need to reschedule my appointment',
    lastMessageTime: '2 days ago',
    online: false,
    phone: '+1234567892',
  },
  {
    id: 4,
    name: 'Dr. Michael Chang',
    role: 'Doctor',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    lastMessage: 'See you at the clinic',
    lastMessageTime: '1 week ago',
    online: false,
    phone: '+1234567893',
  },
  {
    id: 5,
    name: 'Sarah Thompson',
    role: 'Patient',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    lastMessage: 'When is my next appointment?',
    lastMessageTime: '3 days ago',
    online: false,
    phone: '+1234567894',
  },
];

const MOCK_MESSAGES = {
  1: [
    { id: 1, content: 'Hi Dr. Chen, I have a scheduling question', senderName: 'Me', senderRole: 'Secretary', isOwn: true, timestamp: '10:00 AM' },
    { id: 2, content: 'Can you schedule a follow-up appointment?', senderName: 'Dr. Emily Chen', senderRole: 'Doctor', isOwn: false, timestamp: '10:30 AM' },
  ],
  2: [
    { id: 1, content: 'Hi James, your appointment is confirmed for tomorrow at 2 PM', senderName: 'Me', senderRole: 'Secretary', isOwn: true, timestamp: 'Yesterday' },
    { id: 2, content: 'Thank you for the appointment confirmation!', senderName: 'James Rodriguez', senderRole: 'Patient', isOwn: false, timestamp: 'Yesterday' },
  ],
  3: [
    { id: 1, content: 'I need to reschedule my appointment', senderName: 'Maria Garcia', senderRole: 'Patient', isOwn: false, timestamp: '2 days ago' },
  ],
  4: [
    { id: 1, content: 'See you at the clinic', senderName: 'Dr. Michael Chang', senderRole: 'Doctor', isOwn: false, timestamp: '1 week ago' },
  ],
  5: [
    { id: 1, content: 'When is my next appointment?', senderName: 'Sarah Thompson', senderRole: 'Patient', isOwn: false, timestamp: '3 days ago' },
  ],
};

export default function MessagingPage() {
  const { isDark } = useOutletContext();
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState(MOCK_MESSAGES);

  const handleSendMessage = (content) => {
    if (!selectedContact) return;

    const newMessage = {
      id: Date.now(),
      content,
      senderName: 'Me',
      senderRole: 'Secretary',
      isOwn: true,
      timestamp: 'Just now',
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage],
    }));
  };

  return (
    <>
      {/* TRANSPARENCY: Change opacity values to adjust main container (00=fully transparent, ff=fully opaque) */}
      <div className="h-[calc(100vh-8rem)] rounded-xl shadow-lg border overflow-hidden flex backdrop-blur-sm"
        style={{
          background: isDark ? `${COLORS.dark.cardBg}66` : `${COLORS.light.cardBg}33`,
          borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
        }}
      >
      {/* Sidebar - Hidden on mobile when chat is open */}
      <div className={`w-full md:w-80 flex-shrink-0 ${selectedContact ? 'hidden md:block' : 'block'}`}>
        <ContactList
          contacts={MOCK_CONTACTS}
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
              className="text-sm font-medium px-3 py-1 rounded-lg transition-colors hover:bg-opacity-10"
              style={{ 
                color: isDark ? COLORS.dark.primary : COLORS.light.primary,
                backgroundColor: `${isDark ? COLORS.dark.primary : COLORS.light.primary}10`
              }}
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
        />
      </div>
    </div>
    </>
  );
}
