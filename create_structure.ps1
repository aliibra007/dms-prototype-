$files = @(
    "src/services/auth.service.js",
    "src/services/users.service.js",
    "src/services/appointment.service.js",
    "src/services/queue.service.js",
    "src/services/medicalRecord.service.js",
    "src/services/prescription.service.js",
    "src/services/billing.service.js",
    "src/services/notification.service.js",
    "src/pages/Login.jsx",
    "src/pages/PatientDashboard.jsx",
    "src/pages/DoctorDashboard.jsx",
    "src/pages/SecretaryDashboard.jsx",
    "src/pages/AdminDashboard.jsx",
    "src/pages/NotFound.jsx",
    "src/store/authSlice.js",
    "src/store/appointmentSlice.js",
    "src/store/queueSlice.js",
    "src/store/billingSlice.js",
    "src/store/notificationSlice.js",
    "src/store/index.js",
    "src/hooks/useAuth.js",
    "src/hooks/usePermissions.js",
    "src/hooks/useWebSocket.js",
    "src/utils/dateUtils.js",
    "src/utils/roleUtils.js",
    "src/utils/validation.js"
)

foreach ($file in $files) {
    if (-not (Test-Path $file)) {
        New-Item -Path $file -ItemType File -Force | Out-Null
        Set-Content -Path $file -Value "// Placeholder for $file"
        Write-Host "Created $file"
    }
}
