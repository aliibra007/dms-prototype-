export const MOCK_SECRETARY_DASHBOARD_DATA = {
  stats: [
    { title: 'Total Patients', value: '1,234', change: 12, icon: 'Users', colorKey: 'primary' },
    { title: "Today's Appointments", value: '24', change: 5, icon: 'CalendarIcon', colorKey: 'accent' },
    { title: 'Pending Prescriptions', value: '8', change: -2, icon: 'Pill', colorKey: 'warning' },
    { title: 'Revenue', value: '$45,230', change: 18, icon: 'DollarSign', colorKey: 'success' },
  ],
  chartData: [
    { name: 'Mon', patients: 45 },
    { name: 'Tue', patients: 52 },
    { name: 'Wed', patients: 48 },
    { name: 'Thu', patients: 61 },
    { name: 'Fri', patients: 55 },
    { name: 'Sat', patients: 38 },
    { name: 'Sun', patients: 25 },
  ],
  appointmentsData: [
    { month: 'Jan', appointments: 320 },
    { month: 'Feb', appointments: 298 },
    { month: 'Mar', appointments: 345 },
    { month: 'Apr', appointments: 312 },
    { month: 'May', appointments: 367 },
    { month: 'Jun', appointments: 389 },
  ],
  recentActivity: [
    { id: 1, action: 'New appointment scheduled', patient: 'Emily Carter', time: '5 min ago' },
    { id: 2, action: 'Prescription sent', patient: 'Michael Brown', time: '15 min ago' },
    { id: 3, action: 'Payment received', patient: 'Sophia Lee', time: '1 hour ago' },
    { id: 4, action: 'Patient registered', patient: 'James Rodriguez', time: '2 hours ago' },
    { id: 5, action: 'Appointment rescheduled', patient: 'Olivia Martinez', time: '3 hours ago' },
  ],
  upcomingAppointments: [
    { id: 1, patient: 'Emily Carter', type: 'Consultation', doctor: 'Dr. Sarah Johnson', time: '9:00 AM' },
    { id: 2, patient: 'Michael Brown', type: 'Follow-up', doctor: 'Dr. James Wilson', time: '10:30 AM' },
    { id: 3, patient: 'Sophia Lee', type: 'Check-up', doctor: 'Dr. Sarah Johnson', time: '11:15 AM' },
    { id: 4, patient: 'James Rodriguez', type: 'Consultation', doctor: 'Dr. James Wilson', time: '2:00 PM' },
    { id: 5, patient: 'Olivia Martinez', type: 'Follow-up', doctor: 'Dr. Sarah Johnson', time: '3:30 PM' },
  ],
};

