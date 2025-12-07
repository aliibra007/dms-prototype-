import React, { useState } from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import TreatmentCardEditor from './components/TreatmentCardEditor';
import { addTreatment, updateTreatment, deleteTreatment } from '../../services/landingPageApi';
import { COLORS } from '../../styles/theme';

const ICONS = ['tooth', 'heart', 'stethoscope', 'pill', 'smile', 'sparkles'];

export default function TreatmentsSettings({ initialData = [], isDark }) {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [cards, setCards] = useState(Array.isArray(initialData) ? initialData.slice(0, 6) : []);
  const [msg, setMsg] = useState('');

  const canAdd = cards.length < 6;

  const handleAdd = async () => {
    if (!canAdd) return;
    const draft = { title: '', description: '', icon: ICONS[0] };
    try {
      const created = await addTreatment(draft);
      setCards((prev) => [...prev, created]);
      setMsg('Treatment added');
    } catch (e) {
      setMsg('Failed to add treatment');
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      const updated = await updateTreatment(id, data);
      setCards((prev) => prev.map((c) => (c.id === id ? updated : c)));
      setMsg('Treatment updated');
    } catch (e) {
      setMsg('Failed to update treatment');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTreatment(id);
      setCards((prev) => prev.filter((c) => c.id !== id));
      setMsg('Treatment deleted');
    } catch (e) {
      setMsg('Failed to delete treatment');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex items-center gap-3 p-4 rounded-xl border"
        style={{
          borderColor: theme.border,
          background: isDark ? theme.secondary : '#F9FAFB'
        }}>
        <div className="p-2 rounded-lg" style={{ background: `${theme.primary}20`, color: theme.primary }}>
          <AlertCircle size={20} />
        </div>
        <div>
          <h3 className="font-bold" style={{ color: theme.text }}>Treatment Cards</h3>
          <p className="text-sm opacity-70" style={{ color: theme.text }}>
            Manage the services displayed on your landing page (Max 6).
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <TreatmentCardEditor
            key={card.id || card.tempId}
            value={card}
            icons={ICONS}
            onSave={(data) => handleUpdate(card.id, data)}
            onDelete={() => handleDelete(card.id)}
            isDark={isDark}
            theme={theme}
          />
        ))}

        {/* Add New Card (Dashed) */}
        {canAdd && (
          <button
            onClick={handleAdd}
            className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-4 min-h-[300px] transition-all hover:bg-opacity-50 group"
            style={{
              borderColor: theme.border,
              background: isDark ? `${theme.secondary}50` : '#F9FAFB',
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: `${theme.primary}15`, color: theme.primary }}
            >
              <Plus size={32} />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-lg" style={{ color: theme.text }}>Add New Treatment</h4>
              <p className="text-sm opacity-60" style={{ color: theme.text }}>Click to create a new card</p>
            </div>
          </button>
        )}
      </div>

      {/* Message Toast */}
      {msg && (
        <div className="fixed bottom-8 right-8 px-6 py-3 rounded-xl shadow-2xl animate-fade-in z-50 flex items-center gap-3"
          style={{
            background: theme.cardBg,
            border: `1px solid ${msg.includes('Failed') ? theme.danger : theme.success}`
          }}>
          <div className={`w-3 h-3 rounded-full ${msg.includes('Failed') ? 'bg-red-500' : 'bg-green-500'}`} />
          <span className="font-semibold" style={{ color: theme.text }}>{msg}</span>
        </div>
      )}
    </div>
  );
}
