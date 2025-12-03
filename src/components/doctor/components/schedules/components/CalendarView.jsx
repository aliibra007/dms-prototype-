import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isBefore, 
  startOfDay,
  isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const COLORS = {
  light: {
    primary: 'hsl(262, 52%, 47%)',
    secondary: 'hsl(220, 25%, 95%)',
    accent: 'hsl(199, 89%, 48%)',
    muted: 'hsl(240, 10%, 85%)',
    background: '#FFFFFF',
    text: '#1F2937',
    cardBg: '#FFFFFF',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    disabled: '#9CA3AF',
  },
  dark: {
    primary: 'hsl(262, 45%, 65%)',
    secondary: 'hsl(220, 20%, 12%)',
    accent: 'hsl(199, 80%, 55%)',
    muted: 'hsl(240, 8%, 35%)',
    background: '#0F172A',
    text: '#F1F5F9',
    cardBg: '#1E293B',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    disabled: '#4B5563',
  },
};

const CalendarView = ({ isDark, selectedDate, onDateSelect, appointments = [], offDays = [] }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const isOffDay = (date) => {
    return offDays.some(offDay => isSameDay(new Date(offDay.date), date));
  };

  const hasAppointments = (date) => {
    return appointments.some(apt => isSameDay(new Date(apt.start_datetime), date));
  };

  const isPastDate = (date) => {
    return isBefore(date, startOfDay(new Date()));
  };

  const getDayStyle = (day) => {
    const isSelected = isSameDay(day, selectedDate);
    const isCurrentMonth = isSameMonth(day, monthStart);
    const isPast = isPastDate(day);
    const isOff = isOffDay(day);
    const hasApts = hasAppointments(day);
    const isTodayDate = isToday(day);

    let bg = 'transparent';
    let text = isDark ? COLORS.dark.text : COLORS.light.text;
    let cursor = 'cursor-pointer';
    let border = 'border-transparent';

    if (!isCurrentMonth) {
      text = isDark ? COLORS.dark.muted : COLORS.light.muted;
    }

    if (isPast) {
      text = isDark ? COLORS.dark.disabled : COLORS.light.disabled;
      cursor = 'cursor-not-allowed';
      if (isSelected) {
         bg = isDark ? COLORS.dark.muted : COLORS.light.muted;
         text = '#FFFFFF';
      }
    } else if (isOff) {
      text = COLORS.light.danger;
      if (isSelected) {
        bg = COLORS.light.danger;
        text = '#FFFFFF';
      }
    } else if (isSelected) {
      bg = '#3B82F6'; // Blue highlight
      text = '#FFFFFF';
    } else if (hasApts) {
      text = COLORS.light.success;
      border = `border-${COLORS.light.success}`;
    }

    if (isTodayDate && !isSelected) {
        border = `border-2 border-${isDark ? 'white' : 'black'}`;
    }

    return { bg, text, cursor, border, isPast, isOff, hasApts };
  };

  return (
    <div className="rounded-xl p-6 border-2" style={{ 
      background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, 
      borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary 
    }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={prevMonth} 
          className="p-2 rounded-lg transition-all hover:scale-110" 
          style={{ background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}20`, color: isDark ? COLORS.dark.primary : COLORS.light.primary }}
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <button 
          onClick={nextMonth} 
          className="p-2 rounded-lg transition-all hover:scale-110" 
          style={{ background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}20`, color: isDark ? COLORS.dark.primary : COLORS.light.primary }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-semibold py-2" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, dayIdx) => {
          const { bg, text, cursor, border, isPast, isOff, hasApts } = getDayStyle(day);
          
          return (
            <div 
              key={day.toString()}
              onClick={() => !isPast && onDateSelect(day)}
              className={`
                aspect-square flex flex-col items-center justify-center rounded-lg transition-all relative
                ${cursor}
                ${!isPast && !isOff && !isSameDay(day, selectedDate) ? 'hover:bg-purple-600 hover:text-white' : ''}
                ${hasApts && !isSameDay(day, selectedDate) && !isOff ? 'border-2 border-green-500' : ''}
              `}
              style={{ 
                backgroundColor: bg, 
                color: text,
              }}
            >
              <span className="text-sm font-medium">{format(day, 'd')}</span>
              {isOff && <span className="text-[10px] font-bold mt-1">OFF</span>}
              {hasApts && !isOff && !isPast && (
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1"></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-xs justify-center" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Appointment</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>Off-Day</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-gray-400"></div>
          <span>Past</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
