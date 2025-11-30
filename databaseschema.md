# Backend Integration Guide

This document explains how to connect the React frontend to your .NET backend.

## 📁 Project Structure

```
dashboard-share/
├── src/
│   ├── components/
│   │   ├── ScheduleQueue.js    # Doctor schedule and appointment queue
│   │   └── Finance.js           # Invoices, payments, and financial reports
│   ├── services/
│   │   └── api.js              # API endpoints and data models
│   ├── App.js                  # Main application component
│   └── index.js                # Entry point
└── public/                     # Static files
```

## 🔌 API Configuration

### Step 1: Set API Base URL

1. Create a `.env` file in the `dashboard-share` folder:
```env
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
```

2. Or update `src/services/api.js` directly:
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

### Step 2: Review API Endpoints

All API endpoints are defined in `src/services/api.js`. Share this file with your backend team to ensure consistency.

## 📊 Data Models

### Appointment Model

**Endpoint:** `GET /api/schedule/appointments`

**Expected Response:**
```json
[
  {
    "id": 1,
    "patientId": "P001",
    "patientName": "John Doe",
    "phone": "+1 234-567-8900",
    "email": "john.doe@email.com",
    "date": "2025-11-29",
    "time": "09:00 AM",
    "duration": 30,
    "status": "confirmed",
    "type": "Consultation",
    "notes": "Follow-up appointment",
    "createdAt": "2025-11-15T10:00:00Z",
    "updatedAt": "2025-11-20T14:30:00Z"
  }
]
```

**Status Values:** `pending`, `confirmed`, `completed`, `cancelled`

**Update Status:** `PATCH /api/schedule/appointments/{id}/status`
```json
{
  "status": "confirmed"
}
```

### Invoice Model

**Endpoint:** `GET /api/finance/invoices`

**Expected Response:**
```json
[
  {
    "id": "INV-001",
    "patientId": "P001",
    "patientName": "John Doe",
    "amount": 250.00,
    "date": "2025-11-15",
    "dueDate": "2025-11-29",
    "status": "paid",
    "paymentMethod": "Credit Card",
    "description": "Consultation & Follow-up",
    "items": [
      {
        "description": "Consultation",
        "quantity": 1,
        "unitPrice": 200.00,
        "total": 200.00
      },
      {
        "description": "Follow-up",
        "quantity": 1,
        "unitPrice": 50.00,
        "total": 50.00
      }
    ],
    "createdAt": "2025-11-15T10:00:00Z",
    "updatedAt": "2025-11-15T10:00:00Z"
  }
]
```

**Status Values:** `paid`, `pending`, `overdue`

### Payment Model

**Endpoint:** `GET /api/finance/payments`

**Expected Response:**
```json
[
  {
    "id": "PAY-001",
    "invoiceId": "INV-001",
    "patientId": "P001",
    "patientName": "John Doe",
    "amount": 250.00,
    "date": "2025-11-15",
    "method": "Credit Card",
    "status": "completed",
    "transactionId": "TXN-123456",
    "createdAt": "2025-11-15T10:00:00Z"
  }
]
```

**Status Values:** `completed`, `processing`, `failed`

### Financial Statistics

**Endpoint:** `GET /api/finance/statistics?range=month`

**Expected Response:**
```json
{
  "totalRevenue": 45230.00,
  "monthlyGrowth": 15.2,
  "pendingPayments": 8230.00,
  "paidInvoices": 124,
  "overdueAmount": 3450.00,
  "revenueData": [
    {
      "month": "Jan",
      "revenue": 32000,
      "expenses": 12000,
      "profit": 20000
    }
  ],
  "paymentMethodsData": [
    {
      "name": "Credit Card",
      "value": 45
    },
    {
      "name": "Cash",
      "value": 25
    }
  ]
}
```

## 🔄 How to Connect Components to Backend

### Schedule Queue Component

Currently using mock data. To connect to backend:

1. **Import the API service:**
```javascript
import { scheduleAPI } from '../services/api';
```

2. **Replace mock data with API calls:**
```javascript
useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const data = await scheduleAPI.getAppointments({
        date: selectedDateString,
        status: filterStatus === 'all' ? undefined : filterStatus,
      });
      setAppointments(data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    }
  };
  fetchAppointments();
}, [selectedDate, filterStatus]);
```

3. **Update status handler:**
```javascript
const handleStatusChange = async (appointmentId, newStatus) => {
  try {
    await scheduleAPI.updateAppointmentStatus(appointmentId, newStatus);
    // Refresh appointments
    const updated = await scheduleAPI.getAppointments();
    setAppointments(updated);
  } catch (error) {
    console.error('Failed to update status:', error);
    // Show error message to user
  }
};
```

### Finance Component

To connect to backend:

1. **Import the API service:**
```javascript
import { financeAPI } from '../services/api';
```

2. **Fetch invoices:**
```javascript
useEffect(() => {
  const fetchInvoices = async () => {
    try {
      const data = await financeAPI.getInvoices({
        status: filterStatus === 'all' ? undefined : filterStatus,
      });
      setInvoices(data);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    }
  };
  fetchInvoices();
}, [filterStatus]);
```

3. **Fetch financial statistics:**
```javascript
useEffect(() => {
  const fetchStats = async () => {
    try {
      const stats = await financeAPI.getStatistics(dateRange);
      setFinancialStats(stats);
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
    }
  };
  fetchStats();
}, [dateRange]);
```

## 🔐 Authentication

If your backend requires authentication:

1. **Add token to API requests:**
```javascript
// In src/services/api.js
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
  // ... rest of the function
};
```

2. **Handle login:**
```javascript
import { API_ENDPOINTS } from '../services/api';

const login = async (email, password) => {
  const response = await fetch(API_ENDPOINTS.auth.login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  localStorage.setItem('authToken', data.token);
  return data;
};
```

## 🐛 Error Handling

Add error handling to all API calls:

```javascript
try {
  const data = await scheduleAPI.getAppointments();
  setAppointments(data);
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly error message
  // You can use a toast notification library like react-toastify
}
```

## 📝 Next Steps

1. **Share `src/services/api.js`** with your backend team
2. **Update API_BASE_URL** once backend is ready
3. **Replace mock data** in components with API calls
4. **Test each endpoint** and handle errors appropriately
5. **Add loading states** while fetching data
6. **Add authentication** if required

## 🆘 Need Help?

- Check `src/services/api.js` for all endpoint definitions
- Review component files for data structure expectations
- Test API endpoints using Postman or similar tools before integrating
