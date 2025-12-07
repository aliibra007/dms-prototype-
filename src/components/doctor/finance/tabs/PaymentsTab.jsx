import React from "react";
import { Download, Eye } from "lucide-react";
import { motion } from "framer-motion";
import StatusBadge from "../StatusBadge";
import SearchFilter from "../SearchFilter";

const PaymentsTab = ({ isDark, payments, searchTerm, setSearchTerm, filterStatus, setFilterStatus, }) => {
  const filteredPayments = payments.filter((pay) => {
    const matchesSearch =
      pay.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pay.invoice_id?.toString().includes(searchTerm);
    const matchesStatus = filterStatus === "all" || pay.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (payment) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payment, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `payment_receipt_${payment.invoice_id}.json`);
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
        searchPlaceholder="Search payments by patient, invoice, or transaction ID..."
        statusOptions={[
          { value: "all", label: "All Status" },
          { value: "completed", label: "Completed" },
          { value: "processing", label: "Processing" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPayments.map((payment) => (
          <PaymentCard
            key={payment.invoice_id}
            payment={payment}
            isDark={isDark}
            onDownload={() => handleDownload(payment)}
          />
        ))}

        {filteredPayments.length === 0 && (
          <div className="col-span-full text-center py-12 rounded-xl border-2 border-dashed"
            style={{ borderColor: isDark ? "#334155" : "#E5E7EB", color: isDark ? "#94A3B8" : "#6B7280" }}>
            <p className="text-lg font-medium">No payments found</p>
            <p className="text-sm opacity-70">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentCard = ({ payment, isDark, onDownload }) => {
  const getStatusColor = (status) => {
    const colors = { completed: "#10B981", processing: "#F59E0B", failed: "#EF4444" };
    return colors[status] || colors.processing;
  };

  return (
    <div className="rounded-2xl p-5 border transition-all hover:shadow-xl hover:-translate-y-1 relative group"
      style={{
        background: isDark ? "#1E293B" : "#FFFFFF",
        borderColor: isDark ? "#334155" : "#E5E7EB"
      }}>
      <div className="absolute top-0 left-0 w-1.5 h-full rounded-l-2xl" style={{ background: getStatusColor(payment.status) }}></div>

      <div className="pl-3">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-60 mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>
              Invoice #{payment.invoice_id}
            </p>
            <h3 className="text-lg font-bold truncate" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
              {payment.patient_name}
            </h3>
          </div>
          <StatusBadge status={payment.status} />
        </div>

        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm opacity-70" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Amount Paid</p>
            <p className="text-2xl font-bold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
              ${payment.amount.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-70" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Paid At</p>
            <p className="font-medium" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
              {new Date(payment.paid_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-4 border-t" style={{ borderColor: isDark ? "#334155" : "#F3F4F6" }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDownload}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-opacity-10"
            style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: isDark ? "#F1F5F9" : "#1F2937" }}
          >
            <Download size={16} /> Download Receipt
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;
