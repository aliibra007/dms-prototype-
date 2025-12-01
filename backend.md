# Backend Project Structure (ASP.NET Core)

Backend follows **clean architecture** and maps directly to the database schema.

## Root Structure

backend/
├── Controllers/
├── Models/
├── DTOs/
├── Services/
├── Repositories/
├── Security/
├── Infrastructure/
├── Migrations/
├── Program.cs
└── appsettings.json

---

## Controllers (API Endpoints)

Controllers/
├── AuthController.cs
├── UsersController.cs
├── DoctorsController.cs
├── PatientsController.cs
├── SecretariesController.cs
├── AdminsController.cs
├── AppointmentsController.cs
├── QueueController.cs
├── MedicalRecordsController.cs
├── PrescriptionsController.cs
├── BillingController.cs
├── NotificationsController.cs
├── ReportsController.cs
└── SystemSettingsController.cs

---

## Models (Database Tables)

Models/
├── User.cs
├── Doctor.cs
├── Patient.cs
├── Secretary.cs
├── Admin.cs
├── Permission.cs
├── RolePermission.cs
├── DoctorSchedule.cs
├── DoctorBlockedTime.cs
├── Appointment.cs
├── AppointmentHistory.cs
├── QueueManagement.cs
├── MedicalRecord.cs
├── Prescription.cs
├── PrescriptionItem.cs
├── Invoice.cs
├── BillingSummary.cs
├── Notification.cs
├── NotificationTemplate.cs
├── AuditLog.cs
└── SystemSetting.cs

---

## DTOs (Data Transfer Objects)

DTOs/
├── Auth/
│   ├── LoginRequestDto.cs
│   ├── RegisterRequestDto.cs
│   └── AuthResponseDto.cs
├── Users/
├── Appointments/
├── MedicalRecords/
├── Prescriptions/
├── Billing/
└── Notifications/

---

## Services (Business Logic)

Services/
├── AuthService.cs
├── UserService.cs
├── DoctorService.cs
├── PatientService.cs
├── AppointmentService.cs
├── QueueService.cs
├── MedicalRecordService.cs
├── PrescriptionService.cs
├── BillingService.cs
├── NotificationService.cs
├── ReportService.cs
└── AiSummaryService.cs

---

## Repositories (Data Access Layer)

Repositories/
├── Interfaces/
│   ├── IUserRepository.cs
│   ├── IAppointmentRepository.cs
│   ├── IMedicalRecordRepository.cs
│   └── IBillingRepository.cs
└── Implementations/
    ├── UserRepository.cs
    ├── AppointmentRepository.cs
    ├── MedicalRecordRepository.cs
    └── BillingRepository.cs

---

## Security

Security/
├── JwtTokenService.cs
├── JwtMiddleware.cs
├── PermissionHandler.cs
├── RoleAuthorizationAttribute.cs
└── PasswordHasher.cs

---

## Infrastructure & External Integrations

Infrastructure/
├── DatabaseContext.cs
├── RedisCacheService.cs
├── EmailService.cs
├── SmsService.cs
├── PaymentGatewayService.cs
└── FileStorageService.cs

---

## Doctor Dashboard Integration

Frontend doctor UI has been integrated into the patient app with an isolated module to avoid breaking existing behavior and styling.

Location:

src/
├── doctor/
│   ├── pages/
│   │   └── DoctorDashboard.jsx
│   ├── components/
│   │   ├── ScheduleQueue.js
│   │   └── finance/
│   │       ├── Finance.jsx
│   │       ├── CreateInvoiceModal.jsx
│   │       ├── SearchFilter.jsx
│   │       ├── StatCard.jsx
│   │       ├── StatusBadge.jsx
│   │       └── tabs/
│   │           ├── OverviewTab.jsx
│   │           ├── InvoicesTab.jsx
│   │           └── PaymentsTab.jsx
│   ├── hooks/
│   │   └── useFinanceData.js
│   └── styles/
│       └── doctor.css

Routing:
- New route path: `/doctor` renders `DoctorDashboard`.
- All existing patient routes remain unchanged.
- Landing page includes a temporary button "Go to Doctor Dashboard (TEMP)" linking to `/doctor` until proper auth is added.

APIs:
- Unified API module: `src/services/api.js`
- Added endpoints (stubs) under `API_ENDPOINTS.finance`:
  - `GET /finance/statistics?range=...`
  - `GET /finance/revenue?range=...`
  - `GET /finance/invoices?include_patient=true&include_appointment=true`
  - `POST /finance/invoices` (create invoice)
  - `POST /finance/invoices/{id}/mark-paid` (mark invoice paid)

Notes:
- Endpoints above are placeholders/TODOs pending backend availability. Update `VITE_API_BASE_URL` and implement controllers/actions accordingly.
- Eventually, backend authentication should differentiate Patient vs Doctor access (roles/claims). The temporary landing button should be removed once auth and role-based routing are in place.