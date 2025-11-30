import React from 'react'

function timeStringToMinutes(t){
  const [h,m]=t.split(':').map(Number);return h*60+m
}
function minutesToTimeString(m){
  const h = Math.floor(m/60).toString().padStart(2,'0')
  const mm = (m%60).toString().padStart(2,'0')
  return `${h}:${mm}`
}

const TimeSelector = ({ schedule, date, bookedSlotsISO = [], value, onChange, disabled }) => {
  if (!schedule || !date) return null
  const { workingHours } = schedule
  const start = timeStringToMinutes(workingHours.start)
  const end = timeStringToMinutes(workingHours.end)
  const step = workingHours.intervalMinutes || 30
  const slots = []
  for (let t = start; t < end; t += step) slots.push(minutesToTimeString(t))

  const dayStr = date.toISOString().slice(0,10)
  const bookedSet = new Set(bookedSlotsISO)

  return (
    <div>
      <h3 className="font-semibold mb-2">Select Time</h3>
      <div className="rounded-lg border border-gray-200 dark:border-muted-dark overflow-hidden">
        <ul className="divide-y divide-gray-200 dark:divide-muted-dark max-h-80 overflow-auto">
          {slots.map((t) => {
            const iso = `${dayStr}T${t}`
            const isBooked = bookedSet.has(iso)
            const isSelected = value === t
            return (
              <li key={t} className="bg-white dark:bg-secondary-dark">
                <button
                  type="button"
                  disabled={disabled || isBooked}
                  onClick={() => onChange(t)}
                  className={`w-full text-left px-4 py-3 transition flex items-center justify-between ${
                    isBooked
                      ? 'opacity-60 cursor-not-allowed text-gray-400'
                      : 'hover:bg-slate-50 dark:hover:bg-gray-800'
                  } ${
                    isSelected
                      ? 'bg-primary-light/10 dark:bg-primary-dark/20 text-primary-light dark:text-primary-dark'
                      : 'text-gray-900 dark:text-white'
                  }`}
                >
                  <span className="font-medium">{t}</span>
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 border ${
                      isBooked
                        ? 'border-red-300 text-red-600 bg-red-50 dark:bg-red-900/20'
                        : isSelected
                        ? 'border-primary-light text-primary-light dark:border-primary-dark dark:text-primary-dark bg-transparent'
                        : 'border-gray-300 text-gray-500'
                    }`}
                  >
                    {isBooked ? 'Booked' : isSelected ? 'Selected' : 'Available'}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default TimeSelector
