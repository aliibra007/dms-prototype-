import React from "react";
import {
  DollarSign,
  XCircle,
  FileText,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import StatCard from "../StatCard";

const OverviewTab = ({
  isDark,
  invoices,
  totalRevenue,
  totalPending,
  totalOverdue,
  financialStats,
  revenueData,
  paymentMethodsData,
  dateRange,
  setDateRange,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          subtitle={`+${financialStats.monthlyGrowth}% from last month`}
          icon={DollarSign}
          trend="up"
          borderColor="#10B981"
          isDark={isDark}
        />
        <StatCard
          title="Pending Payments"
          value={`$${totalPending.toLocaleString()}`}
          subtitle={`${invoices.filter((inv) => inv.status === "pending").length} invoices`}
          icon={XCircle}
          trend="down"
          borderColor="#F59E0B"
          isDark={isDark}
        />
        <StatCard
          title="Overdue Amount"
          value={`$${totalOverdue.toLocaleString()}`}
          subtitle={`${invoices.filter((inv) => inv.status === "overdue").length} overdue invoices`}
          icon={XCircle}
          borderColor="#EF4444"
          isDark={isDark}
        />
        <StatCard
          title="Paid Invoices"
          value={invoices.filter((inv) => inv.status === "paid").length}
          subtitle="This month"
          icon={FileText}
          borderColor={isDark ? "#6366F1" : "#8B5CF6"}
          isDark={isDark}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="rounded-xl p-6 border-2"
          style={{
            background: isDark ? "#1E293B" : "#FFFFFF",
            borderColor: isDark ? "#6366F1" : "#8B5CF6",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
              Revenue Overview
            </h3>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1 rounded-lg border text-sm outline-none"
              style={{
                background: isDark ? "#1E293B" : "#FFFFFF",
                borderColor: isDark ? "#334155" : "#D1D5DB",
                color: isDark ? "#F1F5F9" : "#1F2937",
              }}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#E5E7EB"} />
              <XAxis dataKey="month" stroke={isDark ? "#94A3B8" : "#6B7280"} />
              <YAxis stroke={isDark ? "#94A3B8" : "#6B7280"} />
              <Tooltip contentStyle={{ background: isDark ? "#1E293B" : "#FFFFFF", borderColor: isDark ? "#334155" : "#D1D5DB", color: isDark ? "#F1F5F9" : "#1F2937" }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Revenue" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Expenses" />
              <Line type="monotone" dataKey="profit" stroke="#6366F1" strokeWidth={3} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className="rounded-xl p-6 border-2"
          style={{
            background: isDark ? "#1E293B" : "#FFFFFF",
            borderColor: isDark ? "#0EA5E9" : "#0369A1",
          }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
            Payment Methods
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={paymentMethodsData} cx="50%" cy="50%" labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                {paymentMethodsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: isDark ? "#1E293B" : "#FFFFFF", borderColor: isDark ? "#334155" : "#D1D5DB", color: isDark ? "#F1F5F9" : "#1F2937" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
