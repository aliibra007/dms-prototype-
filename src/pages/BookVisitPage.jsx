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

          {/* Step 2 & 3: Date and Time side by side */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Step 2: Choose Date & Time</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar Card */}
              <AppointmentCalendar
                selectedDate={selectedDate}
                onChange={(d) => { setSelectedDate(d); setSelectedTime(''); }}
                schedule={schedule}
                appointmentsISO={appointmentsISO}
                disabled={loading || !selectedDoctorId}
              />

              {/* Time Card */}
              <div className="rounded-xl border border-gray-200 dark:border-muted-dark bg-white dark:bg-secondary-dark shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-muted-dark">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Select Time</h3>
                </div>
                <div className="p-4">
                  {selectedDate ? (
                    <TimeSelector
                      schedule={schedule}
                      date={selectedDate}
                      bookedSlotsISO={bookedSlotsForSelectedDate}
                      value={selectedTime}
                      onChange={setSelectedTime}
                      disabled={loading || !selectedDoctorId || !selectedDate}
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pick a date to see available time slots.</p>
                  )}
                </div>
              </div>
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
    </div>
  )
}

export default BookVisitPage
