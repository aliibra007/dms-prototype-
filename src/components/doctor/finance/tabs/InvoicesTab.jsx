import React, { useState } from "react";
import { Download, Eye, Send, CheckCircle, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "../StatusBadge";
import SearchFilter from "../SearchFilter";
import ViewInvoiceModal from "../ViewInvoiceModal";
import PaymentModal from "../PaymentModal";

const InvoicesTab = ({
  isDark,
  invoices,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  onMarkAsPaid,
}) => {
  const [viewingInvoice, setViewingInvoice] = useState(null);
  const [payingInvoice, setPayingInvoice] = useState(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoice_id?.toString().includes(searchTerm) ||
      inv.patient_id?.toString().includes(searchTerm);
    const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handlePaymentConfirm = async (method) => {
    if (payingInvoice) {
      try {
        await onMarkAsPaid(payingInvoice.invoice_id, method);
        // Toast success would go here
      } catch (error) {
        alert("Failed to mark invoice as paid: " + error.message);
      }
    }
  };

  const handleDownload = (invoice) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoice, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `invoice_${invoice.invoice_id}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="space-y-6">
      <SearchFilter
        isDark={isDark}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        searchPlaceholder="Search invoices by patient, ID, or invoice number..."
        statusOptions={[
          { value: "all", label: "All Status" },
          { value: "paid", label: "Paid" },
          { value: "pending", label: "Pending" },
          { value: "overdue", label: "Overdue" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredInvoices.map((invoice) => (
          <InvoiceCard
            key={invoice.invoice_id}
            invoice={invoice}
            isDark={isDark}
            onView={() => setViewingInvoice(invoice)}
            onPay={() => setPayingInvoice(invoice)}
            onDownload={() => handleDownload(invoice)}
            onRemind={() => alert(`Reminder sent to ${invoice.patient_name}!`)}
          />
        ))}

        {filteredInvoices.length === 0 && (
          <div className="col-span-full text-center py-12 rounded-xl border-2 border-dashed"
            style={{ borderColor: isDark ? "#334155" : "#E5E7EB", color: isDark ? "#94A3B8" : "#6B7280" }}>
            <p className="text-lg font-medium">No invoices found</p>
            <p className="text-sm opacity-70">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      <ViewInvoiceModal
        isOpen={!!viewingInvoice}
        onClose={() => setViewingInvoice(null)}
        invoice={viewingInvoice}
        isDark={isDark}
      />

      <PaymentModal
        isOpen={!!payingInvoice}
        onClose={() => setPayingInvoice(null)}
        onConfirm={handlePaymentConfirm}
        amount={payingInvoice?.amount || 0}
        isDark={isDark}
      />
    </div>
  );
};

const InvoiceCard = ({ invoice, isDark, onView, onPay, onDownload, onRemind }) => {
  const getStatusColor = (status) => {
    const colors = { paid: "#10B981", pending: "#F59E0B", overdue: "#EF4444" };
    return colors[status] || colors.pending;
  };

  return (
    <div className="rounded-2xl p-5 border transition-all hover:shadow-xl hover:-translate-y-1 relative group"
      style={{
        background: isDark ? "#1E293B" : "#FFFFFF",
        borderColor: isDark ? "#334155" : "#E5E7EB"
      }}>
      <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl" style={{ background: getStatusColor(invoice.status) }}></div>

      <div className="pl-3">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>
              #{invoice.invoice_id}
            </p>
            <h3 className="text-lg font-bold truncate" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
              {invoice.patient_name}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {(invoice.status === "pending" || invoice.status === "overdue") && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemind();
                }}
                className="p-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-500"
                title="Send Reminder"
              >
                <Send size={14} />
              </motion.button>
            )}
            <StatusBadge status={invoice.status} />
          </div>
        </div>

        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm opacity-70" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Amount</p>
            <p className="text-2xl font-bold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
              ${parseFloat(invoice.amount).toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-70" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Due Date</p>
            <p className="font-medium" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
              {new Date(invoice.due_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-4 border-t" style={{ borderColor: isDark ? "#334155" : "#F3F4F6" }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onView}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-opacity-10"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: isDark ? "#F1F5F9" : "#1F2937" }}
          >
            <Eye size={16} /> View
          </motion.button>

          {invoice.status === "pending" || invoice.status === "overdue" ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onPay}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-opacity-20"
              style={{ background: "#10B98115", color: "#10B981" }}
            >
              <CheckCircle size={16} /> Pay
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onDownload}
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-opacity-10"
              style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: isDark ? "#F1F5F9" : "#1F2937" }}
            >
              <Download size={16} /> PDF
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesTab;
