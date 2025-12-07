import React, { useState } from "react";
import { Plus, AlertTriangle, X, Lightbulb } from "lucide-react";
import { useFinanceData } from "../hooks/useFinanceData";
import OverviewTab from "./tabs/OverviewTab";
import InvoicesTab from "./tabs/InvoicesTab";
import PaymentsTab from "./tabs/PaymentsTab";
import CreateInvoiceModal from "./CreateInvoiceModal";
import { COLORS } from "../styles/theme";
import DemoModeBanner from "../components/shared/DemoModeBanner";
const Finance = ({ isDark }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showMockWarning, setShowMockWarning] = useState(true);
  const [showTip, setShowTip] = useState(true);

  const theme = isDark ? COLORS.dark : COLORS.light;

  const {
    invoices,
    payments,
    financialStats,
    revenueData,
    paymentMethodsData,
    loading,
    error,
    usingMockData,
    totalRevenue,
    totalPending,
    totalOverdue,
    markInvoiceAsPaid,
    createInvoice,
    refreshData,
    dateRange,
    setDateRange,
  } = useFinanceData();

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "invoices", label: "Invoices" },
    { id: "payments", label: "Payments" },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>
          Loading financial data...
        </div>
      </div>
    );
  }

  if (error && !usingMockData) {
    return (
      <div className="flex flex-col justify-center items-center h-64 space-y-4">
        <div className="text-red-500 text-lg font-semibold">Error: {error}</div>
        <button
          onClick={refreshData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
        {usingMockData && (
          <div className="text-yellow-600 text-sm mt-2">Using mock data for development</div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {usingMockData && showMockWarning && (
        <DemoModeBanner
          theme={theme}
          onClose={() => setShowMockWarning(false)}
        />
      )}

      {showTip && (
        <div
          className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in"
          style={{
            background: `${theme.accent}25`,
            borderColor: `${theme.accent}40`
          }}
        >
          <Lightbulb size={20} style={{ color: theme.accent }} />
          <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
            <span className="font-bold">Pro Tip:</span> {financialStats?.tip}
          </p>
          <button
            onClick={() => setShowTip(false)}
            className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ color: theme.muted }}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              activeTab={activeTab}
              setActiveTab={(tabId) => {
                setActiveTab(tabId);
                setSearchTerm("");
                setFilterStatus("all");
              }}
              isDark={isDark}
              colors={COLORS}
            />
          ))}
        </div>

        <CreateInvoiceButton isDark={isDark} colors={COLORS} onClick={() => setIsCreateModalOpen(true)} />
      </div>

      {activeTab === "overview" && (
        <OverviewTab
          isDark={isDark}
          invoices={invoices}
          totalRevenue={totalRevenue}
          totalPending={totalPending}
          totalOverdue={totalOverdue}
          financialStats={financialStats}
          revenueData={revenueData}
          paymentMethodsData={paymentMethodsData}
          dateRange={dateRange}
          setDateRange={setDateRange}
        />
      )}

      {activeTab === "invoices" && (
        <InvoicesTab
          isDark={isDark}
          invoices={invoices}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          onMarkAsPaid={markInvoiceAsPaid}
        />
      )}

      {activeTab === "payments" && (
        <PaymentsTab
          isDark={isDark}
          payments={payments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
      )}

      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={createInvoice}
        isDark={isDark}
      />
    </div>
  );
};

const TabButton = ({ tab, activeTab, setActiveTab, isDark, colors }) => (
  <button
    onClick={() => setActiveTab(tab.id)}
    className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === tab.id
      ? "text-white"
      : isDark
        ? "text-gray-400 hover:text-white"
        : "text-gray-600 hover:text-gray-900"
      }`}
    style={{
      background:
        activeTab === tab.id
          ? `linear-gradient(135deg, ${isDark ? colors.dark.primary : colors.light.primary
          }, ${isDark ? colors.dark.accent : colors.light.accent})`
          : "transparent",
    }}
  >
    {tab.label}
  </button>
);

const CreateInvoiceButton = ({ isDark, colors, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105"
    style={{
      background: `linear-gradient(135deg, ${isDark ? colors.dark.primary : colors.light.primary
        }, ${isDark ? colors.dark.accent : colors.light.accent})`,
    }}
  >
    <Plus size={20} />
    <span className="hidden sm:inline">Create Invoice</span>
  </button>
);

export default Finance;
