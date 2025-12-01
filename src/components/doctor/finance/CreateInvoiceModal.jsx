import React, { useState } from "react";
import { X, Calendar, User, DollarSign, FileText } from "lucide-react";

const CreateInvoiceModal = ({ isOpen, onClose, onCreate, isDark }) => {
  const [formData, setFormData] = useState({
    patient_id: "",
    amount: "",
    due_date: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const MOCK_PATIENTS = [
    { id: 101, name: "John Doe" },
    { id: 102, name: "Jane Smith" },
    { id: 103, name: "Mike Johnson" },
    { id: 104, name: "Sarah Williams" },
    { id: 105, name: "Emily Carter" },
  ];

  if (!isOpen) return null;

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
    } catch (error) {
      alert("Failed to create invoice: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    background: isDark ? "#1E293B" : "#F9FAFB",
    borderColor: isDark ? "#334155" : "#D1D5DB",
    color: isDark ? "#F1F5F9" : "#1F2937",
  };

  const labelStyle = { color: isDark ? "#94A3B8" : "#4B5563" };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl shadow-2xl p-6 m-4" style={{ background: isDark ? "#0F172A" : "#FFFFFF", border: `1px solid ${isDark ? "#334155" : "#E5E7EB"}` }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
            Create New Invoice
          </h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" style={labelStyle}>Patient</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: isDark ? "#94A3B8" : "#9CA3AF" }} />
              <select required value={formData.patient_id} onChange={(e) => setFormData({ ...formData, patient_id: e.target.value })} className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none" style={inputStyle}>
                <option value="">Select a patient</option>
                {MOCK_PATIENTS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={labelStyle}>Amount ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: isDark ? "#94A3B8" : "#9CA3AF" }} />
              <input required type="number" min="0" step="0.01" placeholder="0.00" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all" style={inputStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={labelStyle}>Due Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2" size={18} style={{ color: isDark ? "#94A3B8" : "#9CA3AF" }} />
              <input required type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all" style={inputStyle} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1" style={labelStyle}>Description / Notes</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3" size={18} style={{ color: isDark ? "#94A3B8" : "#9CA3AF" }} />
              <textarea required rows="3" placeholder="Consultation details..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" style={inputStyle} />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2 rounded-lg font-semibold border transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" style={{ borderColor: isDark ? "#334155" : "#D1D5DB", color: isDark ? "#F1F5F9" : "#1F2937" }}>Cancel</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100" style={{ background: "linear-gradient(135deg, #6366F1, #0EA5E9)" }}>
              {loading ? "Creating..." : "Create Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoiceModal;
