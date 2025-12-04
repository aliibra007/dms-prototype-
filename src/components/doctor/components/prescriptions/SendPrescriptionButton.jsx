import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function SendPrescriptionButton({
  prescription,
  theme,
  isDark,
  onSend
}) {
  const [isSent, setIsSent] = useState(prescription.status === 'sent');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (isSent) return;

    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSent(true);
    setIsSending(false);

    if (onSend) {
      onSend(prescription);
    }
  };

  if (isSent) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all cursor-not-allowed opacity-75"
        style={{
          background: `${theme.success}25`,
          color: theme.success
        }}
      >
        <CheckCircle size={18} />
        Sent to Patient
      </button>
    );
  }

  return (
    <button
      onClick={handleSend}
      disabled={isSending}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        background: `linear-gradient(135deg, ${theme.accent}, ${theme.primary})`,
        color: '#FFFFFF'
      }}
    >
      <Send size={18} />
      {isSending ? 'Sending...' : 'Send to Patient'}
    </button>
  );
}


