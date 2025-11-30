// Mock Appointment API Service
// Resets on reload; mirrors expected backend shapes

const SPECIALTIES = ['General Dentistry', 'Orthodontics', 'Endodontics', 'Periodontics'];

const doctors = [
  { id: 'D001', name: 'Dr. Alice Moore', specialty: 'General Dentistry' },
  { id: 'D002', name: 'Dr. Ben Carter', specialty: 'Orthodontics' },
  { id: 'D003', name: 'Dr. Clara Nguyen', specialty: 'Endodontics' },
];

const schedules = {
  D001: { workingHours: { start: '09:00', end: '17:00', intervalMinutes: 30 }, blocked: ['2025-12-01T12:00', '2025-12-01T12:30'] },
  D002: { workingHours: { start: '10:00', end: '18:00', intervalMinutes: 30 }, blocked: [] },
  D003: { workingHours: { start: '08:30', end: '15:30', intervalMinutes: 30 }, blocked: [] },
};

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export async function fetchDoctorsMock() {
  await delay(300);
  return doctors;
}

// Returns schedule (working hours) for a doctor. Optional date not used in mock.
export async function fetchDoctorScheduleMock(doctorId, _date) {
  await delay(200);
  const sched = schedules[doctorId] || schedules.D001;
  return sched;
}

// Previous name kept for backward compatibility (date param is required here)
export async function fetchBookedAppointmentsMock(doctorId, date) {
  await delay(200);
  const sched = schedules[doctorId] || schedules.D001;
  const dayStr = date.toISOString().slice(0, 10);
  return (sched.blocked || []).filter((t) => t.startsWith(dayStr));
}

// New required function: return all booked appointments for a doctor (array of ISO strings)
export async function fetchAppointmentsMock(doctorId) {
  await delay(200);
  const sched = schedules[doctorId] || schedules.D001;
  return [...(sched.blocked || [])];
}

// Book an appointment
export async function bookAppointmentMock({ doctorId, date, time, note, dateISO }) {
  await delay(300);
  const iso = dateISO || `${date.slice(0, 10)}T${time}`;
  schedules[doctorId] = schedules[doctorId] || { workingHours: { start: '09:00', end: '17:00', intervalMinutes: 30 }, blocked: [] };
  if (schedules[doctorId].blocked.includes(iso)) {
    const err = new Error('Slot already booked');
    err.code = 'CONFLICT';
    throw err;
  }
  schedules[doctorId].blocked.push(iso);
  return { id: Math.random().toString(36).slice(2), doctorId, datetime: iso, status: 'confirmed', note: note || '' };
}
