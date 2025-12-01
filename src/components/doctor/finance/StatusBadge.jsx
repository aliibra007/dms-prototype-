import React from "react";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    const colors = {
      paid: "#10B981",
      pending: "#F59E0B",
      overdue: "#EF4444",
      completed: "#10B981",
      processing: "#6366F1",
      failed: "#EF4444",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
      case "completed":
        return <CheckCircle size={16} />;
      case "pending":
      case "processing":
        return <Clock size={16} />;
      case "overdue":
      case "failed":
        return <XCircle size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold" style={{ background: `${getStatusColor(status)}20`, color: getStatusColor(status) }}>
      {getStatusIcon(status)}
      <span className="capitalize">{status}</span>
    </div>
  );
};

export default StatusBadge;
