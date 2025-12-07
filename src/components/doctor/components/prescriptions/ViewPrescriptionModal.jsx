import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Pill, FileText } from 'lucide-react';
import DownloadButton from './DownloadButton';
import SendPrescriptionButton from './SendPrescriptionButton';

export default function ViewPrescriptionModal({
  prescription,
  theme,
  isDark,
  onClose,
  onDownload,
  onSend
}) {
  // We don't return null here anymore, we let AnimatePresence handle the exit
  // But we need to check if prescription exists for the content rendering
  // Actually, if we pass isOpen from parent, we can control it better.
  // But the current pattern is passing `prescription` which is null when closed.
  // So we check !!prescription as the "isOpen" state.

  return (
    <AnimatePresence>
      {prescription && (
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
              className="rounded-2xl w-full max-w-3xl shadow-2xl border relative"
              style={{ background: theme.cardBg, borderColor: theme.border }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
                <h3 className="text-xl font-bold" style={{ color: theme.text }}>
                  Prescription Details
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  style={{ color: theme.text }}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Patient Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <User size={20} style={{ color: theme.primary }} />
                    <div>
                      <p className="text-sm opacity-70" style={{ color: theme.text }}>Patient</p>
                      <p className="font-semibold" style={{ color: theme.text }}>{prescription.patientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={20} style={{ color: theme.primary }} />
                    <div>
                      <p className="text-sm opacity-70" style={{ color: theme.text }}>Date</p>
                      <p className="font-semibold" style={{ color: theme.text }}>
                        {new Date(prescription.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="p-4 rounded-lg border" style={{ background: `${theme.primary}10`, borderColor: theme.border }}>
                  <p className="text-sm opacity-70 mb-1" style={{ color: theme.text }}>Diagnosis</p>
                  <p className="font-semibold text-lg" style={{ color: theme.text }}>{prescription.diagnosis}</p>
                </div>

                {/* Medicines */}
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: theme.text }}>
                    <Pill size={20} style={{ color: theme.primary }} />
                    Prescribed Medicines ({prescription.medicines.length})
                  </h4>
                  <div className="space-y-3">
                    {prescription.medicines.map((medicine, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border"
                        style={{ background: isDark ? theme.secondary : '#F9FAFB', borderColor: theme.border }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ background: `${theme.primary}20` }}
                            >
                              <Pill size={20} style={{ color: theme.primary }} />
                            </div>
                            <div>
                              <p className="font-semibold" style={{ color: theme.text }}>{medicine.name}</p>
                              <p className="text-sm opacity-70" style={{ color: theme.text }}>
                                {medicine.dosage} • {medicine.frequency} • {medicine.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                        {medicine.instructions && (
                          <div className="mt-2 pl-12">
                            <p className="text-sm" style={{ color: theme.text }}>
                              <span className="font-semibold">Instructions: </span>
                              {medicine.instructions}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {prescription.notes && (
                  <div className="p-4 rounded-lg border" style={{ background: `${theme.accent}10`, borderColor: theme.border }}>
                    <div className="flex items-start gap-2">
                      <FileText size={18} className="mt-0.5" style={{ color: theme.accent }} />
                      <div>
                        <p className="text-sm font-semibold mb-1" style={{ color: theme.text }}>Additional Notes</p>
                        <p className="text-sm" style={{ color: theme.text }}>{prescription.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Doctor Info */}
                <div className="pt-4 border-t" style={{ borderColor: theme.border }}>
                  <p className="text-sm opacity-70 mb-1" style={{ color: theme.text }}>Prescribed By</p>
                  <p className="font-semibold" style={{ color: theme.text }}>{prescription.doctor}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: theme.border }}>
                  <DownloadButton
                    prescription={prescription}
                    theme={theme}
                    isDark={isDark}
                    onClick={onDownload}
                  />
                  <SendPrescriptionButton
                    prescription={prescription}
                    theme={theme}
                    isDark={isDark}
                    onSend={onSend}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

