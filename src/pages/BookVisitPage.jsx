import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Patient/components/Header'
import Footer from '../components/Patient/components/Footer'
import DoctorSelector from '../components/Patient/components/AppointmentBooking/DoctorSelector'
import AppointmentCalendar from '../components/Patient/components/AppointmentBooking/AppointmentCalendar'
import TimeSelector from '../components/Patient/components/AppointmentBooking/TimeSelector'
import AppointmentForm from '../components/Patient/components/AppointmentBooking/AppointmentForm'
import NoteSection from '../components/Patient/components/AppointmentBooking/NoteSection'
import { fetchDoctorsMock, fetchDoctorScheduleMock, fetchAppointmentsMock, bookAppointmentMock } from '../services/appointmentMockService'

const BookVisitPage = () => {
  const [doctors, setDoctors] = useState([])
  const [selectedDoctorId, setSelectedDoctorId] = useState('')
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [schedule, setSchedule] = useState(null)
  const [appointmentsISO, setAppointmentsISO] = useState([])
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false)

  const selectedDoctor = useMemo(() => doctors.find(d => d.id === selectedDoctorId), [doctors, selectedDoctorId])

  useEffect(() => {
    let isMounted = true
    setLoading(true)
    fetchDoctorsMock()
      .then((ds) => { if (isMounted) setDoctors(ds) })
      .catch(() => { if (isMounted) setError('Failed to load doctors') })
      .finally(() => { if (isMounted) setLoading(false) })
    return () => { isMounted = false }
  }, [])

  useEffect(() => {
    if (!selectedDoctorId) { setSchedule(null); setAppointmentsISO([]); return }
    let isMounted = true
    setLoading(true)
    Promise.all([ fetchDoctorScheduleMock(selectedDoctorId), fetchAppointmentsMock(selectedDoctorId) ])
      .then(([sched, appts]) => {
        if (!isMounted) return
        setSchedule(sched)
        setAppointmentsISO(appts)
      })
      .catch(() => { if (isMounted) setError('Failed to load schedule') })
      .finally(() => { if (isMounted) setLoading(false) })
    return () => { isMounted = false }
  }, [selectedDoctorId])

  const bookedSlotsForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    const dayStr = selectedDate.toISOString().slice(0,10)
    return appointmentsISO.filter((iso) => iso.startsWith(dayStr))
  }, [appointmentsISO, selectedDate])

  const handleSubmit = async () => {
    if (!selectedDoctorId || !selectedDate || !selectedTime) return
    setError(''); setLoading(true)
    try {
      await bookAppointmentMock({ doctorId: selectedDoctorId, date: selectedDate.toISOString().slice(0,10), time: selectedTime, note })
      alert('Appointment booked successfully!')
    } catch (e) {
      setError(e?.message || 'Failed to book appointment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300" style={{ minHeight: '100vh' }}>
      <Header onLoginClick={() => {}} />
      <main className="max-w-5xl mx-auto px-4 pb-20" style={{ paddingTop: '80px' }}>
        <h1 className="text-3xl font-bold mb-6">Book Your Visit</h1>
        <div className="space-y-6">
          {/* Step 1: Select Doctor */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Step 1: Select Doctor</h2>
            <DoctorSelector
              doctors={doctors}
              value={selectedDoctorId}
              onChange={(v) => { setSelectedDoctorId(v); setSelectedTime(''); setSelectedDate(null); }}
              loading={loading}
            />
          </section>

          {/* Step 2 & 3: Date then Time (Time opens in modal) */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Step 2: Choose Date & Time</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* Calendar Card */}
              <AppointmentCalendar
                selectedDate={selectedDate}
                onChange={(d) => { setSelectedDate(d); setSelectedTime(''); setIsTimeModalOpen(true); }}
                schedule={schedule}
                appointmentsISO={appointmentsISO}
                disabled={loading || !selectedDoctorId}
              />
              {!selectedDate && (
                <p className="text-sm text-gray-600 dark:text-gray-400">Pick a date to choose available time slots.</p>
              )}
            </div>
          </section>

          {/* Step 4: Note */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Step 4: Add Additional Note</h2>
            <NoteSection value={note} onChange={setNote} />
          </section>

          {/* Step 5: Summary & Book */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Step 5: Summary & Book</h2>
            <AppointmentForm
              doctor={selectedDoctor}
              date={selectedDate}
              time={selectedTime}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          </section>
        </div>
      </main>
      <Footer />

      {/* Time Selection Modal */}
      {isTimeModalOpen && selectedDate && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[60] bg-black/50 dark:bg-black/70 backdrop-blur-md"
            onClick={() => setIsTimeModalOpen(false)}
          />
          {/* Modal Panel */}
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ overflow: 'auto' }}>
            <div
              className="relative w-full max-w-md bg-white dark:bg-secondary-dark rounded-2xl shadow-2xl p-6 sm:p-8 my-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ maxHeight: 'calc(100vh - 2rem)', overflow: 'auto', position: 'relative' }}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsTimeModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-muted-light dark:hover:bg-muted-dark transition-colors focus:outline-none"
                type="button"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="mt-2">
                <h3 className="text-lg font-semibold mb-3">Select Time</h3>
                <TimeSelector
                  schedule={schedule}
                  date={selectedDate}
                  bookedSlotsISO={bookedSlotsForSelectedDate}
                  value={selectedTime}
                  onChange={(t) => { setSelectedTime(t); setIsTimeModalOpen(false) }}
                  disabled={loading || !selectedDoctorId || !selectedDate}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default BookVisitPage
