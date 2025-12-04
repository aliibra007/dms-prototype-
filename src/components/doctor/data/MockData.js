export const MOCK_PATIENTS = [
    {
        id: 1,
        name: 'Emily Carter',
        age: 28,
        gender: 'Female',
        bloodType: 'A+',
        contact: '+1 234-567-8901',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        history: [
            {
                id: 101,
                date: '2023-10-25',
                diagnosis: 'Acute Bronchitis',
                symptoms: 'Persistent cough, low-grade fever, fatigue',
                treatment: 'Prescribed Amoxicillin 500mg, advised rest and hydration.',
                attachments: ['lab_results.pdf'],
                doctor: 'Dr. Sarah Johnson',
                secretary: 'Jessica Pearson'
            },
            {
                id: 102,
                date: '2023-05-12',
                diagnosis: 'Seasonal Allergies',
                symptoms: 'Sneezing, itchy eyes',
                treatment: 'Cetirizine 10mg daily',
                attachments: [],
                doctor: 'Dr. James Wilson',
                secretary: 'Donna Paulsen'
            }
        ]
    },
    {
        id: 2,
        name: 'Michael Brown',
        age: 45,
        gender: 'Male',
        bloodType: 'O-',
        contact: '+1 234-567-8902',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
        history: [
            {
                id: 201,
                date: '2023-10-20',
                diagnosis: 'Hypertension',
                symptoms: 'Occasional headaches, dizziness',
                treatment: 'Lisinopril 10mg, lifestyle modification diet',
                attachments: ['cardio_scan.jpg'],
                doctor: 'Dr. Sarah Johnson',
                secretary: 'Jessica Pearson'
            }
        ]
    },
    {
        id: 3,
        name: 'Sophia Lee',
        age: 32,
        gender: 'Female',
        bloodType: 'B+',
        contact: '+1 234-567-8903',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia',
        history: []
    },
    {
        id: 4,
        name: 'James Rodriguez',
        age: 55,
        gender: 'Male',
        bloodType: 'AB+',
        contact: '+1 234-567-8904',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        history: Array.from({ length: 25 }, (_, i) => ({
            id: 400 + i,
            date: new Date(2023, 0, 1 + i * 14).toISOString().split('T')[0],
            diagnosis: i % 3 === 0 ? 'Regular Checkup' : (i % 3 === 1 ? 'Back Pain' : 'Migraine'),
            symptoms: i % 3 === 0 ? 'Routine monitoring' : (i % 3 === 1 ? 'Lower back stiffness' : 'Severe headache, sensitivity to light'),
            treatment: i % 3 === 0 ? 'Vitals normal, continue current meds' : (i % 3 === 1 ? 'Physical therapy referral' : 'Sumatriptan 50mg'),
            attachments: i % 5 === 0 ? [`report_${i}.pdf`] : [],
            doctor: i % 2 === 0 ? 'Dr. Sarah Johnson' : 'Dr. James Wilson',
            secretary: i % 2 === 0 ? 'Jessica Pearson' : 'Donna Paulsen'
        })).reverse()
    },
    {
        id: 5,
        name: 'Olivia Martinez',
        age: 22,
        gender: 'Female',
        bloodType: 'O+',
        contact: '+1 234-567-8905',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
        history: [
            {
                id: 501,
                date: '2023-11-01',
                diagnosis: 'Influenza A',
                symptoms: 'High fever, body aches, chills',
                treatment: 'Oseltamivir 75mg, bed rest',
                attachments: [],
                doctor: 'Dr. Sarah Johnson',
                secretary: 'Jessica Pearson'
            }
        ]
    },
    {
        id: 6,
        name: 'William Taylor',
        age: 60,
        gender: 'Male',
        bloodType: 'A-',
        contact: '+1 234-567-8906',
        image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=William',
        history: []
    },
    // Additional patients from Invoice Modal / Finance Data
    { id: 101, name: "John Doe", age: 35, gender: 'Male', bloodType: 'O+', contact: '+1 234-567-8900', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', history: [] },
    { id: 102, name: "Jane Smith", age: 29, gender: 'Female', bloodType: 'A-', contact: '+1 234-567-8901', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', history: [] },
    { id: 103, name: "Mike Johnson", age: 42, gender: 'Male', bloodType: 'B+', contact: '+1 234-567-8902', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', history: [] },
    { id: 104, name: "Sarah Williams", age: 31, gender: 'Female', bloodType: 'AB-', contact: '+1 234-567-8903', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', history: [] },
    { id: 105, name: "Emily Carter", age: 28, gender: 'Female', bloodType: 'A+', contact: '+1 234-567-8904', image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', history: [] }, // Duplicate name but different ID in finance data, keeping for consistency with finance mock data
];

export const MOCK_MEDICINES = [
    { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', type: 'Antibiotic' },
    { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '3 days', type: 'Painkiller' },
    { id: 3, name: 'Ibuprofen', dosage: '400mg', frequency: 'Three times daily', duration: '5 days', type: 'Anti-inflammatory' },
    { id: 4, name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '7 days', type: 'Antihistamine' },
    { id: 5, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', type: 'Blood Pressure' },
    { id: 6, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', duration: '30 days', type: 'Diabetes' },
    { id: 7, name: 'Omeprazole', dosage: '20mg', frequency: 'Once daily', duration: '14 days', type: 'Antacid' },
    { id: 8, name: 'Azithromycin', dosage: '250mg', frequency: 'Once daily', duration: '5 days', type: 'Antibiotic' },
    { id: 9, name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', duration: '30 days', type: 'Cholesterol' },
    { id: 10, name: 'Levothyroxine', dosage: '50mcg', frequency: 'Once daily', duration: '30 days', type: 'Thyroid' },
    { id: 11, name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days', type: 'Blood Pressure' },
    { id: 12, name: 'Metronidazole', dosage: '400mg', frequency: 'Three times daily', duration: '7 days', type: 'Antibiotic' },
    { id: 13, name: 'Doxycycline', dosage: '100mg', frequency: 'Twice daily', duration: '10 days', type: 'Antibiotic' },
    { id: 14, name: 'Ciprofloxacin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', type: 'Antibiotic' },
    { id: 15, name: 'Prednisolone', dosage: '5mg', frequency: 'Once daily', duration: '5 days', type: 'Steroid' },
];

export const MOCK_PRESCRIPTIONS = [
    {
        id: 1,
        patientId: 1,
        patientName: 'Emily Carter',
        date: '2023-10-25',
        medicines: [
            { id: 1, name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily', duration: '7 days', instructions: 'Take with food' },
            { id: 4, name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '7 days', instructions: 'Take at bedtime' }
        ],
        diagnosis: 'Acute Bronchitis',
        notes: 'Complete the full course of antibiotics. Rest and stay hydrated.',
        doctor: 'Dr. Sarah Johnson',
        status: 'sent'
    },
    {
        id: 2,
        patientId: 2,
        patientName: 'Michael Brown',
        date: '2023-10-20',
        medicines: [
            { id: 5, name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', duration: '30 days', instructions: 'Monitor blood pressure regularly' }
        ],
        diagnosis: 'Hypertension',
        notes: 'Follow up in 2 weeks. Maintain low-sodium diet.',
        doctor: 'Dr. Sarah Johnson',
        status: 'sent'
    },
    {
        id: 3,
        patientId: 1,
        patientName: 'Emily Carter',
        date: '2023-05-12',
        medicines: [
            { id: 4, name: 'Cetirizine', dosage: '10mg', frequency: 'Once daily', duration: '7 days', instructions: 'Take as needed for allergies' }
        ],
        diagnosis: 'Seasonal Allergies',
        notes: 'Avoid allergens when possible.',
        doctor: 'Dr. James Wilson',
        status: 'sent'
    },
    {
        id: 4,
        patientId: 5,
        patientName: 'Olivia Martinez',
        date: '2023-11-01',
        medicines: [
            { id: 8, name: 'Azithromycin', dosage: '250mg', frequency: 'Once daily', duration: '5 days', instructions: 'Take on empty stomach' },
            { id: 2, name: 'Paracetamol', dosage: '500mg', frequency: 'Every 6 hours', duration: '3 days', instructions: 'For fever and body aches' }
        ],
        diagnosis: 'Influenza A',
        notes: 'Rest and stay hydrated. Return if symptoms worsen.',
        doctor: 'Dr. Sarah Johnson',
        status: 'sent'
    },
];

export const MOCK_INVOICES = [
    { invoice_id: 1, appointment_id: 1, patient_id: 101, doctor_id: 1, amount: 250.0, due_date: '2025-11-29', status: 'paid', paid_at: '2025-11-15T10:00:00Z', payment_method: 'Credit Card', created_at: '2025-11-15T10:00:00Z', patient_name: 'John Doe', patient_phone: '+1 234-567-8900', patient_email: 'john.doe@email.com', appointment_date: '2025-11-15T09:00:00Z', appointment_notes: 'Consultation & Follow-up' },
    { invoice_id: 2, appointment_id: 2, patient_id: 102, doctor_id: 1, amount: 450.0, due_date: '2025-12-04', status: 'pending', paid_at: null, payment_method: 'Insurance', created_at: '2025-11-20T10:00:00Z', patient_name: 'Jane Smith', patient_phone: '+1 234-567-8901', patient_email: 'jane.smith@email.com', appointment_date: '2025-11-20T09:30:00Z', appointment_notes: 'Lab Tests & Consultation' },
    { invoice_id: 3, appointment_id: 3, patient_id: 103, doctor_id: 1, amount: 180.0, due_date: '2025-12-06', status: 'overdue', paid_at: null, payment_method: null, created_at: '2025-11-22T10:00:00Z', patient_name: 'Mike Johnson', patient_phone: '+1 234-567-8902', patient_email: 'mike.j@email.com', appointment_date: '2025-11-22T10:15:00Z', appointment_notes: 'Regular Check-up' },
    { invoice_id: 4, appointment_id: 4, patient_id: 104, doctor_id: 1, amount: 320.0, due_date: '2025-12-09', status: 'paid', paid_at: '2025-11-25T10:00:00Z', payment_method: 'Bank Transfer', created_at: '2025-11-25T10:00:00Z', patient_name: 'Sarah Williams', patient_phone: '+1 234-567-8903', patient_email: 'sarah.w@email.com', appointment_date: '2025-11-25T11:00:00Z', appointment_notes: 'Prescription & Consultation' },
    { invoice_id: 5, appointment_id: 5, patient_id: 105, doctor_id: 1, amount: 550.0, due_date: '2025-12-11', status: 'pending', paid_at: null, payment_method: 'Credit Card', created_at: '2025-11-27T10:00:00Z', patient_name: 'Emily Carter', patient_phone: '+1 234-567-8904', patient_email: 'emily.c@email.com', appointment_date: '2025-11-27T11:30:00Z', appointment_notes: 'Comprehensive Exam' },
];

export const MOCK_FINANCIAL_STATS = { totalRevenue: 45230, monthlyGrowth: 15.2, pendingPayments: 8230, paidInvoices: 124, overdueAmount: 3450 };

export const MOCK_REVENUE_DATA = [
    { month: 'Jan', revenue: 32000, expenses: 12000, profit: 20000 },
    { month: 'Feb', revenue: 28000, expenses: 11000, profit: 17000 },
    { month: 'Mar', revenue: 36000, expenses: 13000, profit: 23000 },
    { month: 'Apr', revenue: 42000, expenses: 14000, profit: 28000 },
    { month: 'May', revenue: 45000, expenses: 15000, profit: 30000 },
    { month: 'Jun', revenue: 47000, expenses: 16000, profit: 31000 },
];

export const MOCK_PAYMENT_METHODS = [
    { name: 'Credit Card', value: 45, color: '#6366F1' },
    { name: 'Cash', value: 25, color: '#10B981' },
    { name: 'Insurance', value: 20, color: '#F59E0B' },
    { name: 'Bank Transfer', value: 10, color: '#EF4444' },
];

export const MOCK_APPOINTMENTS = [
    { id: 1, doctor_id: 1, patient_id: 101, start_datetime: '2025-11-29T09:00:00Z', end_datetime: '2025-11-29T09:30:00Z', status: 'confirmed', notes: 'Follow-up appointment', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-15T10:00:00Z', updated_at: '2025-11-20T14:30:00Z', patient_name: 'John Doe', patient_phone: '+1 234-567-8900', patient_email: 'john.doe@email.com', patient_user_id: 101 },
    { id: 2, doctor_id: 1, patient_id: 102, start_datetime: '2025-11-29T09:30:00Z', end_datetime: '2025-11-29T10:15:00Z', status: 'pending', notes: 'First visit', cancellation_reason: null, created_by_id: 1, cancelled_by_id: null, created_at: '2025-11-20T10:00:00Z', updated_at: '2025-11-20T10:00:00Z', patient_name: 'Jane Smith', patient_phone: '+1 234-567-8901', patient_email: 'jane.smith@email.com', patient_user_id: 102 },
];

export const MOCK_AVAILABILITY = [
    { id: 1, user_id: 1, day_of_week: 1, start_time: '09:00:00', end_time: '17:00:00', slot_minutes: 30, available: true },
];

export const MOCK_DASHBOARD_DATA = {
    stats: [
        { icon: 'Users', title: 'Total Patients', value: '1,234', change: 12, colorKey: 'primary' },
        { icon: 'CalendarIcon', title: 'Appointments Today', value: '48', change: 8, colorKey: 'accent' },
        { icon: 'Activity', title: 'Active Cases', value: '89', change: -3, color: '#10B981' },
        { icon: 'DollarSign', title: 'Revenue (Month)', value: '$45,230', change: 15, color: '#F59E0B' },
    ],
    chartData: [
        { name: 'Mon', patients: 40, revenue: 2400 },
        { name: 'Tue', patients: 30, revenue: 1398 },
        { name: 'Wed', patients: 50, revenue: 9800 },
        { name: 'Thu', patients: 45, revenue: 3908 },
        { name: 'Fri', patients: 60, revenue: 4800 },
        { name: 'Sat', patients: 35, revenue: 3800 },
        { name: 'Sun', patients: 25, revenue: 4300 },
    ],
    revenueData: [
        { month: 'Jan', total: 32000 },
        { month: 'Feb', total: 28000 },
        { month: 'Mar', total: 36000 },
        { month: 'Apr', total: 42000 },
        { month: 'May', total: 45000 },
        { month: 'Jun', total: 47000 },
    ],
    upcomingAppointments: [
        { id: 1, patient: 'Emily Carter', time: '09:30 AM', type: 'Follow-up', doctor: 'Dr. Sarah' },
        { id: 2, patient: 'Michael Brown', time: '10:15 AM', type: 'New patient', doctor: 'Dr. James' },
        { id: 3, patient: 'Sophia Lee', time: '11:00 AM', type: 'Consultation', doctor: 'Dr. Sarah' },
    ],
    recentActivity: [
        { id: 1, action: 'New patient registered', patient: 'John Doe', time: '10 minutes ago' },
        { id: 2, action: 'Appointment completed', patient: 'Jane Smith', time: '25 minutes ago' },
        { id: 3, action: 'Prescription issued', patient: 'Mike Johnson', time: '1 hour ago' },
        { id: 4, action: 'Payment received', patient: 'Sarah Williams', time: '2 hours ago' }
    ]
};
