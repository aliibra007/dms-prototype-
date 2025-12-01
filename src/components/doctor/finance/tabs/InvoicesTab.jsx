import React, { useState } from "react";
import { Download, Eye, Send, CheckCircle } from "lucide-react";
import StatusBadge from "../StatusBadge";
import SearchFilter from "../SearchFilter";

const InvoicesTab = ({
  isDark,
  invoices,
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  onMarkAsPaid,
}) => {
  const [processingInvoice, setProcessingInvoice] = useState(null);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.invoice_id?.toString().includes(searchTerm) ||
      inv.patient_id?.toString().includes(searchTerm);
    const matchesStatus = filterStatus === "all" || inv.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleMarkAsPaid = async (invoiceId) => {
    try {
      setProcessingInvoice(invoiceId);
      await onMarkAsPaid(invoiceId, "Credit Card");
    } catch (error) {
      alert("Failed to mark invoice as paid: " + error.message);
    } finally {
      setProcessingInvoice(null);
    }
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

      <div className="space-y-4">
        {filteredInvoices.map((invoice) => (
          <InvoiceCard
            key={invoice.invoice_id}
            invoice={invoice}
            isDark={isDark}
            onMarkAsPaid={handleMarkAsPaid}
            isProcessing={processingInvoice === invoice.invoice_id}
          />
        ))}

        {filteredInvoices.length === 0 && (
          <div className="text-center py-8" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>
            No invoices found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

const InvoiceCard = ({ invoice, isDark, onMarkAsPaid, isProcessing }) => {
  const getStatusColor = (status) => {
    const colors = { paid: "#10B981", pending: "#F59E0B", overdue: "#EF4444" };
    return colors[status] || colors.pending;
  };

  return (
    <div className="rounded-xl p-6 border-2 transition-all hover:shadow-lg" style={{ background: isDark ? "#1E293B" : "#FFFFFF", borderColor: getStatusColor(invoice.status) }}>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
                Invoice #{invoice.invoice_id}
              </h3>
              <p className="text-sm" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>
                {invoice.patient_name} • Patient ID: {invoice.patient_id}
              </p>
            </div>
            <StatusBadge status={invoice.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <p className="text-sm mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Amount</p>
              <p className="text-xl font-bold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
                ${parseFloat(invoice.amount).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Due Date</p>
              <p className="text-sm font-semibold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
                {new Date(invoice.due_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 lg:min-w-[200px]">
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105" style={{ background: isDark ? "#6366F1" : "#8B5CF6" }}>
            <Eye size={18} />
            View
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border font-semibold transition-all hover:scale-105" style={{ background: "transparent", borderColor: isDark ? "#334155" : "#D1D5DB", color: isDark ? "#F1F5F9" : "#1F2937" }}>
            <Download size={18} />
            Download
          </button>
          {invoice.status === "pending" && (
            <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105" style={{ background: "#0EA5E920", color: "#0EA5E9" }}>
              <Send size={18} />
              Send Reminder
            </button>
          )}
          {invoice.status === "pending" && (
            <button onClick={() => onMarkAsPaid(invoice.invoice_id)} disabled={isProcessing} className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all hover:scale-105 disabled:opacity-50" style={{ background: "#10B98120", color: "#10B981" }}>
              <CheckCircle size={18} />
              {isProcessing ? "Processing..." : "Mark Paid"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoicesTab;
