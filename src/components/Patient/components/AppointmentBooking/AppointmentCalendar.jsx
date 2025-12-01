import React from 'react'
import { Calendar as UiCalendar } from '../../../ui/calendar'

// Props:
// - selectedDate: Date | null
// - onChange: (Date) => void
// - schedule: { workingHours: { start, end, intervalMinutes } } | null
// - appointmentsISO: string[] (ISO datetimes for booked slots)
// - disabled: boolean
const AppointmentCalendar = ({ selectedDate, onChange, schedule, appointmentsISO = [], disabled }) => {
  const todayStr = new Date().toISOString().slice(0,10)

  const isPastDay = (date) => date.toISOString().slice(0,10) < todayStr

  const isUnavailableDay = (date) => {
    if (!schedule) return false
    const day = date.toISOString().slice(0,10)
    const startHM = schedule.workingHours.start.split(':').map(Number)
    const endHM = schedule.workingHours.end.split(':').map(Number)
    const startMin = startHM[0]*60 + startHM[1]
    const endMin = endHM[0]*60 + endHM[1]
    const totalSlots = Math.max(0, Math.floor((endMin - startMin) / (schedule.workingHours.intervalMinutes || 30)))
    const bookedCount = appointmentsISO.filter((iso) => iso.startsWith(day)).length
    return !isPastDay(date) && totalSlots > 0 && bookedCount >= totalSlots
  }

  const isAvailableDay = (date) => {
    if (!schedule) return false
    const day = date.toISOString().slice(0,10)
    const startHM = schedule.workingHours.start.split(':').map(Number)
    const endHM = schedule.workingHours.end.split(':').map(Number)
    const startMin = startHM[0]*60 + startHM[1]
    const endMin = endHM[0]*60 + endHM[1]
    const totalSlots = Math.max(0, Math.floor((endMin - startMin) / (schedule.workingHours.intervalMinutes || 30)))
    const bookedCount = appointmentsISO.filter((iso) => iso.startsWith(day)).length
    return !isPastDay(date) && (totalSlots === 0 ? false : bookedCount < totalSlots)
  }

  const handleSelect = (date) => {
    if (!date) return
    const dayStr = date.toISOString().slice(0,10)
    if (dayStr < todayStr || disabled) return
    onChange(date)
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-muted-dark bg-white dark:bg-secondary-dark shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 dark:border-muted-dark flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">Select Date</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">Choose an available day to view time slots</p>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="p-3 sm:p-4">
        <div className="rounded-lg shadow-sm bg-white dark:bg-secondary-dark p-2 sm:p-3 flex justify-center">
          <UiCalendar
            mode="single"
            selected={selectedDate || undefined}
            onSelect={handleSelect}
            className="rounded-lg border shadow-sm mx-auto"
            captionLayout="buttons"
            disabled={(date) => isPastDay(date) || !!disabled}
            modifiers={{ unavailable: isUnavailableDay, available: isAvailableDay }}
            modifiersClassNames={{
              unavailable: 'bg-red-200 text-red-900',
              available: 'bg-green-200 text-green-900',
            }}
          />
        </div>

        {/* Legend */}
        <div className="mt-3 text-xs text-gray-600 dark:text-gray-400 flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-green-200"></span> Available</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-red-200"></span> Unavailable</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-primary-light"></span> Selected</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm bg-gray-300"></span> Past (disabled)</span>
        </div>
      </div>
    </div>
  )
}

export default AppointmentCalendar
