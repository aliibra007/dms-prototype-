import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, DollarSign, FileText, Search, Plus } from "lucide-react";
import { COLORS } from "../styles/theme";
import useScrollLock from '../hooks/useScrollLock';

const CreateInvoiceModal = ({ isOpen, onClose, onCreate, isDark }) => {
  const theme = isDark ? COLORS.dark : COLORS.light;
  const [formData, setFormData] = useState({
    patient_id: "",
    amount: "",
    due_date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useScrollLock(isOpen);

  const MOCK_PATIENTS = [
    { id: 101, name: "John Doe" },
    { id: 102, name: "Jane Smith" },
    { id: 103, name: "Mike Johnson" },
    { id: 104, name: "Sarah Williams" },
    { id: 105, name: "Emily Carter" },
  ];

  const filteredPatients = MOCK_PATIENTS.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectPatient = (patient) => {
    setFormData({ ...formData, patient_id: patient.id });
    setSearchTerm(patient.name);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onCreate({
        ...formData,
        amount: parseFloat(formData.amount),
        doctor_id: 1,
        patient_name: MOCK_PATIENTS.find((p) => p.id == formData.patient_id)?.name,
      });
      onClose();
      setFormData({ patient_id: "", amount: "", due_date: "", description: "" });
      setSearchTerm("");
    } catch (error) {
      alert("Failed to create invoice: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg rounded-2xl shadow-2xl m-4 border relative overflow-hidden"
            style={{ background: theme.cardBg, borderColor: theme.border }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
              <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
                <div className="p-2 rounded-lg" style={{ background: `${theme.primary} 20` }}>
                  <Plus size={20} style={{ color: theme.primary }} />
                </div>
                Create New Invoice
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                style={{ color: theme.text }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Patient Search */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: theme.text }}>Patient</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: theme.muted }} />
                  <input
                    type="text"
                    required
                    placeholder="Search patient..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsDropdownOpen(true);
                      setFormData({ ...formData, patient_id: "" });
                    }}
                    onFocus={() => setIsDropdownOpen(true)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:ring-2 transition-all"
                    style={{
                      borderColor: theme.border,
                      color: theme.text,
                      '--tw-ring-color': theme.primary
                    }}
                  />
                  {isDropdownOpen && searchTerm && (
                    <div className="absolute z-10 w-full mt-2 rounded-xl border shadow-xl max-h-48 overflow-y-auto"
                      style={{ background: theme.cardBg, borderColor: theme.border }}>
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => handleSelectPatient(p)}
                            className="px-4 py-3 cursor-pointer transition-colors flex items-center gap-3"
                            style={{
                              borderBottom: `1px solid ${theme.border} `,
                              color: theme.text
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = isDark ? theme.secondary : '#F3F4F6'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{ background: `${theme.primary} 20`, color: theme.primary }}>
                              {p.name.charAt(0)}
                            </div>
                            {p.name}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm opacity-70" style={{ color: theme.text }}>
                          No patients found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                {/* Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-bold" style={{ color: theme.text }}>Amount ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: theme.muted }} />
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:ring-2 transition-all appearance-none"
                      style={{
                        borderColor: theme.border,
                        color: theme.text,
                        '--tw-ring-color': theme.primary
                      }}
                    />
                    <style jsx>{`
input[type = number]:: -webkit - inner - spin - button,
  input[type = number]:: -webkit - outer - spin - button {
  -webkit - appearance: none;
  margin: 0;
}
input[type = number] {
  -moz - appearance: textfield;
}
`}</style>
                  </div>
                </div>

                {/* Due Date */}
                <div className="space-y-2">
                  <label className="text-sm font-bold" style={{ color: theme.text }}>Due Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: theme.muted }} />
                    <input
                      required
                      type="date"
                      value={formData.due_date}
                      onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:ring-2 transition-all"
                      style={{
                        borderColor: theme.border,
                        color: theme.text,
                        '--tw-ring-color': theme.primary
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold" style={{ color: theme.text }}>Description</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3" size={18} style={{ color: theme.muted }} />
                  <textarea
                    required
                    rows="3"
                    placeholder="Consultation details, services rendered..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:ring-2 transition-all resize-none"
                    style={{
                      borderColor: theme.border,
                      color: theme.text,
                      '--tw-ring-color': theme.primary
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t" style={{ borderColor: theme.border }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl font-bold transition-colors hover:bg-black/5 dark:hover:bg-white/5 border"
                  style={{
                    color: theme.text,
                    borderColor: theme.border
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 rounded-xl font-bold text-white transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${COLORS.light.primary}, ${COLORS.light.accent})` }}
                >
                  {loading ? "Creating..." : "Create Invoice"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateInvoiceModal;
