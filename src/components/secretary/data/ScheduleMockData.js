// Mock data for Schedule & Availability page

export const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Dentistry', color: '#0EA5E9' },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Orthodontics', color: '#10B981' },
  { id: 3, name: 'Dr. Emily Chen', specialty: 'Pediatric Dentistry', color: '#F59E0B' },
  { id: 4, name: 'Dr. Michael Brown', specialty: 'Oral Surgery', color: '#8B5CF6' },
];

export const MOCK_TIME_SLOTS = [
  { id: 1, time: '08:00 AM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 2, time: '08:30 AM', doctorId: 1, status: 'booked', patientName: 'Emily Carter', date: '2025-12-06' },
  { id: 3, time: '09:00 AM', doctorId: 1, status: 'booked', patientName: 'Michael Brown', date: '2025-12-06' },
  { id: 4, time: '09:30 AM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 5, time: '10:00 AM', doctorId: 1, status: 'cancelled', date: '2025-12-06' },
  { id: 6, time: '10:30 AM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 7, time: '11:00 AM', doctorId: 1, status: 'booked', patientName: 'Sophia Lee', date: '2025-12-06' },
  { id: 8, time: '11:30 AM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 9, time: '12:00 PM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 10, time: '01:00 PM', doctorId: 1, status: 'booked', patientName: 'James Rodriguez', date: '2025-12-06' },
  { id: 11, time: '01:30 PM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 12, time: '02:00 PM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 13, time: '02:30 PM', doctorId: 1, status: 'booked', patientName: 'Olivia Martinez', date: '2025-12-06' },
  { id: 14, time: '03:00 PM', doctorId: 1, status: 'cancelled', date: '2025-12-06' },
  { id: 15, time: '03:30 PM', doctorId: 1, status: 'open', date: '2025-12-06' },
  { id: 16, time: '04:00 PM', doctorId: 1, status: 'open', date: '2025-12-06' },
  // Dr. James Wilson slots
  { id: 17, time: '08:00 AM', doctorId: 2, status: 'booked', patientName: 'David Kim', date: '2025-12-06' },
  { id: 18, time: '08:30 AM', doctorId: 2, status: 'open', date: '2025-12-06' },
  { id: 19, time: '09:00 AM', doctorId: 2, status: 'open', date: '2025-12-06' },
  { id: 20, time: '09:30 AM', doctorId: 2, status: 'booked', patientName: 'Lisa Wang', date: '2025-12-06' },
  { id: 21, time: '10:00 AM', doctorId: 2, status: 'open', date: '2025-12-06' },
  { id: 22, time: '10:30 AM', doctorId: 2, status: 'booked', patientName: 'Robert Garcia', date: '2025-12-06' },
  { id: 23, time: '11:00 AM', doctorId: 2, status: 'cancelled', date: '2025-12-06' },
  { id: 24, time: '11:30 AM', doctorId: 2, status: 'open', date: '2025-12-06' },
];

export const MOCK_APPOINTMENTS = [
  { id: 1, patientName: 'Emily Carter', doctorId: 1, doctorName: 'Dr. Sarah Johnson', time: '08:30 AM', date: '2025-12-06', status: 'confirmed', type: 'Consultation', isWalkIn: false, queueStatus: 'waiting' },
  { id: 2, patientName: 'Michael Brown', doctorId: 1, doctorName: 'Dr. Sarah Johnson', time: '09:00 AM', date: '2025-12-06', status: 'confirmed', type: 'Follow-up', isWalkIn: false, queueStatus: 'arrived' },
  { id: 3, patientName: 'Sophia Lee', doctorId: 1, doctorName: 'Dr. Sarah Johnson', time: '11:00 AM', date: '2025-12-06', status: 'pending', type: 'Check-up', isWalkIn: false, queueStatus: 'waiting' },
  { id: 4, patientName: 'James Rodriguez', doctorId: 1, doctorName: 'Dr. Sarah Johnson', time: '01:00 PM', date: '2025-12-06', status: 'confirmed', type: 'Consultation', isWalkIn: true, queueStatus: 'in-room' },
  { id: 5, patientName: 'Olivia Martinez', doctorId: 1, doctorName: 'Dr. Sarah Johnson', time: '02:30 PM', date: '2025-12-06', status: 'confirmed', type: 'Follow-up', isWalkIn: false, queueStatus: 'waiting' },
  { id: 6, patientName: 'David Kim', doctorId: 2, doctorName: 'Dr. James Wilson', time: '08:00 AM', date: '2025-12-06', status: 'confirmed', type: 'Orthodontic Adjustment', isWalkIn: false, queueStatus: 'completed' },
  { id: 7, patientName: 'Lisa Wang', doctorId: 2, doctorName: 'Dr. James Wilson', time: '09:30 AM', date: '2025-12-06', status: 'cancelled', type: 'Consultation', isWalkIn: false, queueStatus: 'waiting' },
  { id: 8, patientName: 'Robert Garcia', doctorId: 2, doctorName: 'Dr. James Wilson', time: '10:30 AM', date: '2025-12-06', status: 'confirmed', type: 'Braces Check', isWalkIn: false, queueStatus: 'waiting' },
];

export const MOCK_QUEUE_STATS = {
  waiting: 4,
  arrived: 1,
  inRoom: 1,
  completed: 1,
};

export const MOCK_AVAILABILITY_STATS = {
  totalSlots: 24,
  openSlots: 14,
  bookedSlots: 8,
  cancelledSlots: 2,
};

export const MOCK_PATIENTS_LIST = [
  { id: 1, name: 'Emily Carter', phone: '+961 71 123 456' },
  { id: 2, name: 'Michael Brown', phone: '+961 71 234 567' },
  { id: 3, name: 'Sophia Lee', phone: '+961 71 345 678' },
  { id: 4, name: 'James Rodriguez', phone: '+961 71 456 789' },
  { id: 5, name: 'Olivia Martinez', phone: '+961 71 567 890' },
  { id: 6, name: 'David Kim', phone: '+961 71 678 901' },
  { id: 7, name: 'Lisa Wang', phone: '+961 71 789 012' },
  { id: 8, name: 'Robert Garcia', phone: '+961 71 890 123' },
  { id: 9, name: 'Jennifer Adams', phone: '+961 71 901 234' },
  { id: 10, name: 'William Turner', phone: '+961 71 012 345' },
];

export const APPOINTMENT_TYPES = [
  'Consultation',
  'Follow-up',
  'Check-up',
  'Cleaning',
  'Extraction',
  'Root Canal',
  'Filling',
  'Orthodontic Adjustment',
  'Braces Check',
  'Emergency',
];
