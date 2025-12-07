import { motion, AnimatePresence } from 'framer-motion';

export default function AddRecordModal({
  isOpen,
  onClose,
  editingRecord,
  selectedPatient,
  onSave,
  theme,
  isDark
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl w-full max-w-2xl shadow-2xl border relative"
              style={{ background: theme.cardBg, borderColor: theme.border }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
                <h3 className="text-xl font-bold" style={{ color: theme.text }}>
                  {editingRecord ? 'Edit Medical Record' : 'Add Medical Record'}
                  <span className="block text-sm font-normal mt-1 opacity-70" style={{ color: theme.text }}>for {selectedPatient?.name}</span>
                </h3>
                <button onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  style={{ color: theme.text }}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={onSave} className="p-6 space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-bold" style={{ color: theme.text }}>Diagnosis</label>
                  <div className="relative">
                    <AlertCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.text }} />
                    <input required name="diagnosis" defaultValue={editingRecord?.diagnosis} placeholder="e.g. Acute Bronchitis"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all"
                      style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: theme.text }}>Symptoms</label>
                    <textarea required name="symptoms" defaultValue={editingRecord?.symptoms} rows={4} placeholder="Describe patient symptoms..."
                      className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all resize-none"
                      style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold" style={{ color: theme.text }}>Treatment Plan</label>
                    <textarea required name="treatment" defaultValue={editingRecord?.treatment} rows={4} placeholder="Medication, therapy, or lifestyle changes..."
                      className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all resize-none"
                      style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold" style={{ color: theme.text }}>Attachments</label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-opacity-50 transition-colors group"
                    style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${theme.primary}10` }}>
                      <Paperclip size={24} style={{ color: theme.primary }} />
                    </div>
                    <p className="text-sm font-medium" style={{ color: theme.text }}>Click to upload reports or images</p>
                    <p className="text-xs mt-1 opacity-60" style={{ color: theme.text }}>PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t" style={{ borderColor: theme.border }}>
                  <button type="button" onClick={onClose}
                    className="px-5 py-2.5 rounded-lg font-bold transition-colors"
                    style={{ color: theme.text, background: isDark ? theme.secondary : '#F3F4F6' }}>
                    Cancel
                  </button>
                  <button type="submit"
                    className="px-8 py-2.5 rounded-lg font-bold text-white transition-transform hover:scale-105 shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${COLORS.light.primary}, ${COLORS.light.accent})` }}>
                    {editingRecord ? 'Update Record' : 'Save Record'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
