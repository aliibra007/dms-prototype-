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