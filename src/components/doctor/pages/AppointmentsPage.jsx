import React from 'react';
import { useOutletContext } from 'react-router-dom';
import ScheduleQueue from '../components/schedules/ScheduleQueue.jsx';

export default function AppointmentsPage() {
  const { isDark } = useOutletContext();
  return <ScheduleQueue isDark={isDark} />;
}
