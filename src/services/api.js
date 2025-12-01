const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-backend-url.com/api';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  schedule: {
    appointments: `${API_BASE_URL}/schedule/appointments`,
  },
  finance: {
    invoices: `${API_BASE_URL}/finance/invoices`,
    payments: `${API_BASE_URL}/finance/payments`,
    statistics: `${API_BASE_URL}/finance/statistics`,
    revenue: `${API_BASE_URL}/finance/revenue`,
    markPaid: (id) => `${API_BASE_URL}/finance/invoices/${id}/mark-paid`,
  },
};

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const apiRequest = async (url, options = {}) => {
  const token = getAuthToken();
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

export const scheduleAPI = {
  getAppointments: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_ENDPOINTS.schedule.appointments}?${queryString}`);
  },
  updateAppointmentStatus: (id, status) => {
    return apiRequest(`${API_ENDPOINTS.schedule.appointments}/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },
};

export const financeAPI = {
  getInvoices: (params) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`${API_ENDPOINTS.finance.invoices}?${queryString}`);
  },
  getPayments: () => {
    return apiRequest(API_ENDPOINTS.finance.payments);
  },
  getStatistics: (range) => {
    return apiRequest(`${API_ENDPOINTS.finance.statistics}?range=${range}`);
  },
  getRevenue: (range) => {
    // TODO: connect to backend revenue endpoint
    return apiRequest(`${API_ENDPOINTS.finance.revenue}?range=${range}`);
  },
  markInvoicePaid: (invoiceId, paymentMethod) => {
    // TODO: backend should accept payment method in body
    return apiRequest(API_ENDPOINTS.finance.markPaid(invoiceId), {
      method: 'POST',
      body: JSON.stringify({ payment_method: paymentMethod }),
    });
  },
  createInvoice: (invoice) => {
    // TODO: backend should validate invoice payload
    return apiRequest(API_ENDPOINTS.finance.invoices, {
      method: 'POST',
      body: JSON.stringify(invoice),
    });
  },
};
