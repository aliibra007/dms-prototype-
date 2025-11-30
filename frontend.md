# Frontend Project Structure (React)

Frontend is organized by **user roles** and **features**, aligned with the database schema and system requirements.

## Root Structure

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── hooks/
│   ├── utils/
│   ├── assets/
│   ├── App.jsx
│   └── main.jsx
└── public/

---

## Components (Role-Based)

### Patient
src/components/Patient/
├── components/
│   ├── AppointmentBooking.jsx
│   ├── MedicalHistory.jsx
│   ├── Prescriptions.jsx
│   ├── Billing.jsx
│   └── Notifications.jsx
└── index.js

### Doctor
src/components/Doctor/
├── components/
│   ├── Schedule.jsx
│   ├── QueueView.jsx
│   ├── MedicalRecords.jsx
│   ├── Prescriptions.jsx
│   └── AiVisitSummary.jsx
└── index.js

### Secretary
src/components/Secretary/
├── components/
│   ├── QueueManager.jsx
│   ├── AppointmentManager.jsx
│   ├── PatientLookup.jsx
│   └── Notifications.jsx
└── index.js

### Admin
src/components/Admin/
├── components/
│   ├── UserManagement.jsx
│   ├── RolePermissions.jsx
│   ├── AuditLogs.jsx
│   ├── SystemSettings.jsx
│   └── Reports.jsx
└── index.js

---

## Pages (Routing Level)

src/pages/
├── Login.jsx
├── PatientDashboard.jsx
├── DoctorDashboard.jsx
├── SecretaryDashboard.jsx
├── AdminDashboard.jsx
└── NotFound.jsx

---

## API Services

src/services/
├── api.js
├── auth.service.js
├── users.service.js
├── appointment.service.js
├── queue.service.js
├── medicalRecord.service.js
├── prescription.service.js
├── billing.service.js
└── notification.service.js

---

## State Management (Redux Toolkit)

src/store/
├── authSlice.js
├── appointmentSlice.js
├── queueSlice.js
├── billingSlice.js
├── notificationSlice.js
└── index.js

---

## Utilities & Hooks

src/hooks/
├── useAuth.js
├── usePermissions.js
└── useWebSocket.js

src/utils/
├── dateUtils.js
├── roleUtils.js
└── validation.js
