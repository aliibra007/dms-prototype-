import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { COLORS } from '../styles/theme';
import StatCard from '../components/shared/StatCard';

// Schedule Components
import MockDataBanner from '../components/schedule/MockDataBanner';
import ScheduleFilters from '../components/schedule/ScheduleFilters';
import AvailabilityGrid from '../components/schedule/AvailabilityGrid';
import AppointmentTable from '../components/schedule/AppointmentTable';
import QueuePanel from '../components/schedule/QueuePanel';
import { 
  AvailabilityModal, 
  DeleteModal, 
  AppointmentModal, 
  CancelAppointmentModal 
} from '../components/schedule/ScheduleModals';

// Mock Data
import { 
  MOCK_DOCTORS, 
  MOCK_TIME_SLOTS, 
  MOCK_APPOINTMENTS, 
  MOCK_QUEUE_STATS,
  MOCK_AVAILABILITY_STATS,
  MOCK_PATIENTS_LIST,
  APPOINTMENT_TYPES 
} from '../data/ScheduleMockData';

export default function SchedulePage() {
  const { isDark } = useOutletContext();
  const theme = isDark ? COLORS.dark : COLORS.light;

  // Banner State
  const [showBanner, setShowBanner] = useState(true);

  // Filter State
  const [selectedDoctor, setSelectedDoctor] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-12-06');
  const [viewMode, setViewMode] = useState('daily');
  const [statusFilter, setStatusFilter] = useState('all');

  // Data State
  const [timeSlots, setTimeSlots] = useState(MOCK_TIME_SLOTS);
  const [appointments, setAppointments] = useState(MOCK_APPOINTMENTS);
  const [queueStats, setQueueStats] = useState(MOCK_QUEUE_STATS);

  // Modal State
  const [availabilityModal, setAvailabilityModal] = useState({ 
    isOpen: false, 
    mode: 'add', 
    slot: null 
  });
  const [deleteModal, setDeleteModal] = useState({ 
    isOpen: false, 
    itemType: 'slot', 
    item: null 
  });
  const [appointmentModal, setAppointmentModal] = useState({ 
    isOpen: false, 
    mode: 'create', 
    appointment: null 
  });
  const [cancelModal, setCancelModal] = useState({ 
    isOpen: false, 
    appointment: null 
  });

  // Filtered Time Slots
  const filteredTimeSlots = useMemo(() => {
    return timeSlots.filter(slot => {
      const doctorMatch = selectedDoctor === 'all' || slot.doctorId.toString() === selectedDoctor;
      const statusMatch = statusFilter === 'all' || slot.status === statusFilter;
      const dateMatch = slot.date === selectedDate;
      return doctorMatch && statusMatch && dateMatch;
    });
  }, [timeSlots, selectedDoctor, statusFilter, selectedDate]);

  // Filtered Appointments
  const filteredAppointments = useMemo(() => {
    return appointments.filter(appt => {
      const doctorMatch = selectedDoctor === 'all' || appt.doctorId.toString() === selectedDoctor;
      const dateMatch = appt.date === selectedDate;
      return doctorMatch && dateMatch;
    });
  }, [appointments, selectedDoctor, selectedDate]);

  // Availability Stats (calculated from filtered slots)
  const availabilityStats = useMemo(() => {
    const slots = selectedDoctor === 'all' ? timeSlots : timeSlots.filter(s => s.doctorId.toString() === selectedDoctor);
    return {
      totalSlots: slots.length,
      openSlots: slots.filter(s => s.status === 'open').length,
      bookedSlots: slots.filter(s => s.status === 'booked').length,
      cancelledSlots: slots.filter(s => s.status === 'cancelled').length,
    };
  }, [timeSlots, selectedDoctor]);

  // Stats Cards Data
  const statsCards = [
    { title: 'Total Slots', value: availabilityStats.totalSlots.toString(), icon: Calendar, color: theme.primary },
    { title: 'Open Slots', value: availabilityStats.openSlots.toString(), icon: Clock, color: theme.success },
    { title: 'Booked Slots', value: availabilityStats.bookedSlots.toString(), icon: CheckCircle, color: theme.info },
    { title: 'Cancelled', value: availabilityStats.cancelledSlots.toString(), icon: XCircle, color: theme.danger },
  ];

  // ====================
  // AVAILABILITY HANDLERS
  // ====================
  const handleSlotClick = (slot) => {
    setAvailabilityModal({ isOpen: true, mode: 'edit', slot });
  };

  const handleAddSlot = () => {
    setAvailabilityModal({ isOpen: true, mode: 'add', slot: null });
  };

  const handleEditSlot = (slot) => {
    setAvailabilityModal({ isOpen: true, mode: 'edit', slot });
  };

  const handleDeleteSlot = (slot) => {
    setDeleteModal({ isOpen: true, itemType: 'slot', item: slot });
  };

  const handleSaveAvailability = (data) => {
    if (data.id) {
      // Edit existing slot
      setTimeSlots(prev => prev.map(s => 
        s.id === data.id ? { ...s, ...data, doctorId: parseInt(data.doctorId) } : s
      ));
    } else {
      // Add new slot
      const newSlot = {
        id: Math.max(...timeSlots.map(s => s.id)) + 1,
        time: data.time,
        doctorId: parseInt(data.doctorId),
        status: data.status,
        date: data.date,
      };
      setTimeSlots(prev => [...prev, newSlot]);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteModal.itemType === 'slot') {
      setTimeSlots(prev => prev.filter(s => s.id !== deleteModal.item.id));
    } else if (deleteModal.itemType === 'appointment') {
      setAppointments(prev => prev.filter(a => a.id !== deleteModal.item.id));
    }
  };

  // ====================
  // APPOINTMENT HANDLERS
  // ====================
  const handleCreateAppointment = () => {
    setAppointmentModal({ isOpen: true, mode: 'create', appointment: null });
  };

  const handleEditAppointment = (appointment) => {
    setAppointmentModal({ isOpen: true, mode: 'edit', appointment });
  };

  const handleRescheduleAppointment = (appointment) => {
    setAppointmentModal({ isOpen: true, mode: 'reschedule', appointment });
  };

  const handleCancelAppointment = (appointment) => {
    setCancelModal({ isOpen: true, appointment });
  };

  const handleDeleteAppointment = (appointment) => {
    setDeleteModal({ isOpen: true, itemType: 'appointment', item: appointment });
  };

  const handleSaveAppointment = (data) => {
    if (data.id) {
      // Edit/Reschedule existing appointment
      setAppointments(prev => prev.map(a => 
        a.id === data.id ? { 
          ...a, 
          ...data, 
          doctorId: parseInt(data.doctorId),
          status: 'confirmed'
        } : a
      ));
    } else {
      // Create new appointment
      const newAppointment = {
        id: Math.max(...appointments.map(a => a.id)) + 1,
        patientName: data.patientName,
        doctorId: parseInt(data.doctorId),
        doctorName: data.doctorName,
        time: data.time,
        date: data.date,
        status: 'confirmed',
        type: data.type,
        isWalkIn: data.isWalkIn,
        queueStatus: 'waiting',
      };
      setAppointments(prev => [...prev, newAppointment]);
      
      // Update queue stats
      setQueueStats(prev => ({ ...prev, waiting: prev.waiting + 1 }));
      
      // Mark slot as booked
      setTimeSlots(prev => prev.map(s => 
        s.doctorId === parseInt(data.doctorId) && s.time === data.time && s.date === data.date
          ? { ...s, status: 'booked', patientName: data.patientName }
          : s
      ));
    }
  };

  const handleConfirmCancelAppointment = (appointment) => {
    setAppointments(prev => prev.map(a => 
      a.id === appointment.id ? { ...a, status: 'cancelled' } : a
    ));
    
    // Free up the slot
    setTimeSlots(prev => prev.map(s => 
      s.doctorId === appointment.doctorId && s.time === appointment.time && s.date === appointment.date
        ? { ...s, status: 'open', patientName: null }
        : s
    ));
  };

  // ====================
  // QUEUE HANDLERS
  // ====================
  const updateQueueStatus = (appointment, newStatus) => {
    const oldStatus = appointment.queueStatus;
    
    setAppointments(prev => prev.map(a => 
      a.id === appointment.id ? { ...a, queueStatus: newStatus } : a
    ));

    // Update queue stats
    setQueueStats(prev => {
      const stats = { ...prev };
      
      // Decrement old status
      if (oldStatus === 'waiting') stats.waiting--;
      else if (oldStatus === 'arrived') stats.arrived--;
      else if (oldStatus === 'in-room') stats.inRoom--;
      
      // Increment new status
      if (newStatus === 'waiting') stats.waiting++;
      else if (newStatus === 'arrived') stats.arrived++;
      else if (newStatus === 'in-room') stats.inRoom++;
      else if (newStatus === 'completed') stats.completed++;
      
      return stats;
    });
  };

  const handleCheckIn = (appointment) => updateQueueStatus(appointment, 'arrived');
  const handleMarkArrived = (appointment) => updateQueueStatus(appointment, 'arrived');
  const handleMarkInRoom = (appointment) => updateQueueStatus(appointment, 'in-room');
  const handleMarkCompleted = (appointment) => updateQueueStatus(appointment, 'completed');
  const handleMoveToWaitingList = (appointment) => updateQueueStatus(appointment, 'waiting');

  return (
    <div className="space-y-6">
      {/* Mock Data Banner */}
      {showBanner && (
        <MockDataBanner isDark={isDark} onDismiss={() => setShowBanner(false)} />
      )}

      {/* Availability Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, idx) => (
          <StatCard key={stat.title + idx} {...stat} isDark={isDark} />
        ))}
      </div>

      {/* Filter Bar */}
      <ScheduleFilters
        isDark={isDark}
        doctors={MOCK_DOCTORS}
        selectedDoctor={selectedDoctor}
        onDoctorChange={setSelectedDoctor}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Availability Grid */}
      <AvailabilityGrid
        isDark={isDark}
        timeSlots={filteredTimeSlots}
        doctors={MOCK_DOCTORS}
        onSlotClick={handleSlotClick}
        onAddSlot={handleAddSlot}
        onEditSlot={handleEditSlot}
        onDeleteSlot={handleDeleteSlot}
      />

      {/* Appointments Table */}
      <AppointmentTable
        isDark={isDark}
        appointments={filteredAppointments}
        onEdit={handleEditAppointment}
        onReschedule={handleRescheduleAppointment}
        onCancel={handleCancelAppointment}
        onDelete={handleDeleteAppointment}
        onCreateNew={handleCreateAppointment}
      />

      {/* Queue Management */}
      <QueuePanel
        isDark={isDark}
        queueStats={queueStats}
        appointments={filteredAppointments}
        onCheckIn={handleCheckIn}
        onMarkArrived={handleMarkArrived}
        onMarkInRoom={handleMarkInRoom}
        onMarkCompleted={handleMarkCompleted}
        onMoveToWaitingList={handleMoveToWaitingList}
      />

      {/* Modals */}
      <AvailabilityModal
        isOpen={availabilityModal.isOpen}
        onClose={() => setAvailabilityModal({ isOpen: false, mode: 'add', slot: null })}
        isDark={isDark}
        mode={availabilityModal.mode}
        slot={availabilityModal.slot}
        doctors={MOCK_DOCTORS}
        onSave={handleSaveAvailability}
      />

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, itemType: 'slot', item: null })}
        isDark={isDark}
        itemType={deleteModal.itemType}
        onConfirm={handleConfirmDelete}
      />

      <AppointmentModal
        isOpen={appointmentModal.isOpen}
        onClose={() => setAppointmentModal({ isOpen: false, mode: 'create', appointment: null })}
        isDark={isDark}
        mode={appointmentModal.mode}
        appointment={appointmentModal.appointment}
        doctors={MOCK_DOCTORS}
        patients={MOCK_PATIENTS_LIST}
        appointmentTypes={APPOINTMENT_TYPES}
        timeSlots={timeSlots}
        onSave={handleSaveAppointment}
      />

      <CancelAppointmentModal
        isOpen={cancelModal.isOpen}
        onClose={() => setCancelModal({ isOpen: false, appointment: null })}
        isDark={isDark}
        appointment={cancelModal.appointment}
        onConfirm={handleConfirmCancelAppointment}
      />
    </div>
  );
}
