import React from "react";
import { Download } from "lucide-react";
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

      <div className="space-y-4">
        {filteredPayments.map((payment) => (
          <PaymentCard key={payment.invoice_id} payment={payment} isDark={isDark} />
        ))}

        {filteredPayments.length === 0 && (
          <div className="text-center py-8" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>
            No payments found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

const PaymentCard = ({ payment, isDark }) => {
  return (
    <div className="rounded-xl p-6 border-2 transition-all hover:shadow-lg" style={{ background: isDark ? "#1E293B" : "#FFFFFF", borderColor: "#10B981" }}>
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold mb-1" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
                Payment for Invoice #{payment.invoice_id}
              </h3>
              <p className="text-sm" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>
                {payment.patient_name} • Patient ID: {payment.patient_id}
              </p>
            </div>
            <StatusBadge status={payment.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <p className="text-sm mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Amount</p>
              <p className="text-xl font-bold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
                ${payment.amount.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Payment Method</p>
              <p className="text-sm font-semibold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
                {payment.payment_method}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>Paid At</p>
              <p className="text-sm font-semibold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
                {new Date(payment.paid_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center lg:flex-col justify-end gap-2">
          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border font-semibold transition-all hover:scale-105" style={{ background: "transparent", borderColor: isDark ? "#334155" : "#D1D5DB", color: isDark ? "#F1F5F9" : "#1F2937" }}>
            <Download size={18} />
            Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTab;
