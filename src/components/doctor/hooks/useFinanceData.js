import { useState, useEffect } from "react";
import { financeAPI } from "../../../services/api.js";

// Mock data for development when backend is not available
const MOCK_INVOICES = [
  { invoice_id: 1, appointment_id: 1, patient_id: 101, doctor_id: 1, amount: 250.0, due_date: '2025-11-29', status: 'paid', paid_at: '2025-11-15T10:00:00Z', payment_method: 'Credit Card', created_at: '2025-11-15T10:00:00Z', patient_name: 'John Doe', patient_phone: '+1 234-567-8900', patient_email: 'john.doe@email.com', appointment_date: '2025-11-15T09:00:00Z', appointment_notes: 'Consultation & Follow-up' },
  { invoice_id: 2, appointment_id: 2, patient_id: 102, doctor_id: 1, amount: 450.0, due_date: '2025-12-04', status: 'pending', paid_at: null, payment_method: 'Insurance', created_at: '2025-11-20T10:00:00Z', patient_name: 'Jane Smith', patient_phone: '+1 234-567-8901', patient_email: 'jane.smith@email.com', appointment_date: '2025-11-20T09:30:00Z', appointment_notes: 'Lab Tests & Consultation' },
  { invoice_id: 3, appointment_id: 3, patient_id: 103, doctor_id: 1, amount: 180.0, due_date: '2025-12-06', status: 'overdue', paid_at: null, payment_method: null, created_at: '2025-11-22T10:00:00Z', patient_name: 'Mike Johnson', patient_phone: '+1 234-567-8902', patient_email: 'mike.j@email.com', appointment_date: '2025-11-22T10:15:00Z', appointment_notes: 'Regular Check-up' },
  { invoice_id: 4, appointment_id: 4, patient_id: 104, doctor_id: 1, amount: 320.0, due_date: '2025-12-09', status: 'paid', paid_at: '2025-11-25T10:00:00Z', payment_method: 'Bank Transfer', created_at: '2025-11-25T10:00:00Z', patient_name: 'Sarah Williams', patient_phone: '+1 234-567-8903', patient_email: 'sarah.w@email.com', appointment_date: '2025-11-25T11:00:00Z', appointment_notes: 'Prescription & Consultation' },
  { invoice_id: 5, appointment_id: 5, patient_id: 105, doctor_id: 1, amount: 550.0, due_date: '2025-12-11', status: 'pending', paid_at: null, payment_method: 'Credit Card', created_at: '2025-11-27T10:00:00Z', patient_name: 'Emily Carter', patient_phone: '+1 234-567-8904', patient_email: 'emily.c@email.com', appointment_date: '2025-11-27T11:30:00Z', appointment_notes: 'Comprehensive Exam' },
];

const MOCK_STATS = { totalRevenue: 45230, monthlyGrowth: 15.2, pendingPayments: 8230, paidInvoices: 124, overdueAmount: 3450 };
const MOCK_REVENUE_DATA = [
  { month: 'Jan', revenue: 32000, expenses: 12000, profit: 20000 },
  { month: 'Feb', revenue: 28000, expenses: 11000, profit: 17000 },
  { month: 'Mar', revenue: 36000, expenses: 13000, profit: 23000 },
  { month: 'Apr', revenue: 42000, expenses: 14000, profit: 28000 },
  { month: 'May', revenue: 45000, expenses: 15000, profit: 30000 },
  { month: 'Jun', revenue: 47000, expenses: 16000, profit: 31000 },
];
const MOCK_PAYMENT_METHODS = [
  { name: 'Credit Card', value: 45, color: '#6366F1' },
  { name: 'Cash', value: 25, color: '#10B981' },
  { name: 'Insurance', value: 20, color: '#F59E0B' },
  { name: 'Bank Transfer', value: 10, color: '#EF4444' },
];

export const useFinanceData = () => {
  const [invoices, setInvoices] = useState([]);
  const [financialStats, setFinancialStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [paymentMethodsData, setPaymentMethodsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const [dateRange, setDateRange] = useState("month");

  const fetchFinanceData = async () => {
    try {
      setLoading(true);
      setError(null);

      const useMock = import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL;
      if (useMock) {
        setUsingMockData(true);
        await new Promise(r => setTimeout(r, 300));
        setInvoices(MOCK_INVOICES);
        setFinancialStats(MOCK_STATS);
        setRevenueData(MOCK_REVENUE_DATA);
        setPaymentMethodsData(MOCK_PAYMENT_METHODS);
        setLoading(false);
        return;
      }

      const [invoicesResponse, statsResponse, revenueResponse] = await Promise.all([
        financeAPI.getInvoices({ include_patient: "true", include_appointment: "true" }),
        financeAPI.getStatistics(dateRange),
        financeAPI.getRevenue(dateRange),
      ]);

      setUsingMockData(false);
      setInvoices(invoicesResponse?.data || invoicesResponse || []);
      setFinancialStats(statsResponse?.data || statsResponse);
      setRevenueData(revenueResponse?.revenueData || []);
      setPaymentMethodsData(revenueResponse?.paymentMethodsData || []);
    } catch (err) {
      if (import.meta.env.DEV) {
        setUsingMockData(true);
        setInvoices(MOCK_INVOICES);
        setFinancialStats(MOCK_STATS);
        setRevenueData(MOCK_REVENUE_DATA);
        setPaymentMethodsData(MOCK_PAYMENT_METHODS);
        setError(null);
      } else {
        setError(err.message || "Failed to load financial data");
        setInvoices([]);
        setFinancialStats({ totalRevenue: 0, monthlyGrowth: 0, pendingPayments: 0, paidInvoices: 0, overdueAmount: 0 });
        setRevenueData([]);
        setPaymentMethodsData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinanceData();
  }, [dateRange]);

  const markInvoiceAsPaid = async (invoiceId, paymentMethod = "Credit Card") => {
    try {
      const updated = invoices.map(inv => inv.invoice_id === invoiceId ? { ...inv, status: 'paid', paid_at: new Date().toISOString(), payment_method } : inv);
      setInvoices(updated);
      await financeAPI.markInvoicePaid(invoiceId, paymentMethod);
    } catch (err) {
      await fetchFinanceData();
      throw err;
    }
  };

  const createInvoice = async (invoiceData) => {
    try {
      if (usingMockData) {
        await new Promise(r => setTimeout(r, 300));
        const newInvoice = { invoice_id: Math.floor(Math.random() * 1000) + 100, ...invoiceData, status: 'pending', created_at: new Date().toISOString(), patient_name: invoiceData.patient_name || 'Mock Patient', patient_email: 'mock@example.com' };
        setInvoices(prev => [newInvoice, ...prev]);
        setFinancialStats(prev => ({ ...prev, pendingPayments: (prev?.pendingPayments || 0) + parseFloat(invoiceData.amount) }));
        return newInvoice;
      }
      const response = await financeAPI.createInvoice(invoiceData);
      await fetchFinanceData();
      return response;
    } catch (err) {
      throw err;
    }
  };

  const totalRevenue = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
  const totalPending = invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);
  const totalOverdue = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + parseFloat(inv.amount || 0), 0);

  const payments = invoices.filter(inv => inv.paid_at).map(inv => ({ invoice_id: inv.invoice_id, patient_id: inv.patient_id, patient_name: inv.patient_name, amount: parseFloat(inv.amount || 0), paid_at: inv.paid_at, payment_method: inv.payment_method, status: 'completed' }));

  return { invoices, payments, financialStats: financialStats || { totalRevenue: 0, monthlyGrowth: 0, pendingPayments: 0, paidInvoices: 0, overdueAmount: 0 }, revenueData, paymentMethodsData, loading, error, usingMockData, totalRevenue, totalPending, totalOverdue, markInvoiceAsPaid, createInvoice, refreshData: fetchFinanceData, setDateRange, dateRange };
};
