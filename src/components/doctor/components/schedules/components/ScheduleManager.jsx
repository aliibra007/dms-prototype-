import React, { useState } from 'react';
import {
  Save,
  Copy,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';

import { COLORS } from '../../../styles/theme';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const ScheduleManager = ({ isDark }) => {
  const [activeSection, setActiveSection] = useState('weekly');

  // Weekly Schedule State
  const [weeklySchedule, setWeeklySchedule] = useState(
    DAYS.map(day => ({
      day,
      enabled: ['Saturday', 'Sunday'].includes(day) ? false : true,
      startTime: '09:00',
      endTime: '17:00',
      interval: 30
    }))
  );

  // Off-Days State
  const [offDays, setOffDays] = useState([
    { id: 1, date: '2025-12-25', reason: 'Christmas Holiday' }
  ]);
  const [newOffDay, setNewOffDay] = useState({ date: '', reason: '' });

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...weeklySchedule];
    newSchedule[index] = { ...newSchedule[index], [field]: value };
    setWeeklySchedule(newSchedule);
  };

  const copyToAllDays = (sourceIndex) => {
    const source = weeklySchedule[sourceIndex];
    const newSchedule = weeklySchedule.map(day => ({
      ...day,
      startTime: source.startTime,
      endTime: source.endTime,
      interval: source.interval,
      enabled: day.day === source.day ? day.enabled : true // Optional: enable all days or keep status
    }));
    setWeeklySchedule(newSchedule);
  };

  const addOffDay = () => {
    if (newOffDay.date && newOffDay.reason) {
      setOffDays([...offDays, { id: Date.now(), ...newOffDay }]);
      setNewOffDay({ date: '', reason: '' });
    }
  };

  const removeOffDay = (id) => {
    setOffDays(offDays.filter(day => day.id !== id));
  };

  const [publishStatus, setPublishStatus] = useState({ status: 'draft', lastPublished: null });

  const handlePublish = () => {
    setPublishStatus({ status: 'published', lastPublished: new Date() });
  };

  return (
    <div className="space-y-6">
      {/* Global Header: Publish Status */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 rounded-xl border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.primary : COLORS.light.primary }}>
        <div className="flex items-center gap-4">
          {/* //FIXME: hard coded colors?! */}
          <div className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${publishStatus.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {publishStatus.status}
          </div>
          {publishStatus.lastPublished && (
            <span className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
              Last published: {publishStatus.lastPublished.toLocaleString()}
            </span>
          )}
        </div>
        <button
          onClick={handlePublish}
          className="flex items-center gap-2 px-6 py-2 rounded-lg text-white font-bold transition-all hover:scale-105 shadow-lg"
          style={{ background: publishStatus.status === 'published' ? COLORS.light.success : COLORS.light.primary, cursor: publishStatus.status === 'published' ? 'default' : 'pointer' }}
          disabled={publishStatus.status === 'published'}
        >
          {publishStatus.status === 'published' ? <CheckCircle size={20} /> : <Save size={20} />}
          {publishStatus.status === 'published' ? 'Published' : 'Publish Availability'}
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b pb-2" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
        <button
          onClick={() => setActiveSection('weekly')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeSection === 'weekly' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          style={{ background: activeSection === 'weekly' ? COLORS.light.primary : 'transparent' }}
        >
          Weekly Schedule
        </button>
        <button
          onClick={() => setActiveSection('offdays')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeSection === 'offdays' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          style={{ background: activeSection === 'offdays' ? COLORS.light.primary : 'transparent' }}
        >
          Off-Days & Exceptions
        </button>
        <button
          onClick={() => setActiveSection('blocked')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeSection === 'blocked' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          style={{ background: activeSection === 'blocked' ? COLORS.light.primary : 'transparent' }}
        >
          Blocked Hours
        </button>
        <button
          onClick={() => setActiveSection('emergency')}
          className={`px-4 py-2 rounded-lg font-semibold transition-all ${activeSection === 'emergency' ? 'text-white' : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
          style={{ background: activeSection === 'emergency' ? COLORS.light.primary : 'transparent' }}
        >
          Emergency Settings
        </button>
      </div>

      {/* Weekly Schedule Section */}
      {activeSection === 'weekly' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
              Configure Standard Weekly Hours
            </h3>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105" style={{ background: '#10B981' }}>
              <Save size={18} />
              Save Schedule
            </button>
          </div>

          <div className="rounded-xl border-2 overflow-hidden" style={{ borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary }}>
                    <th className="p-4 font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Day</th>
                    <th className="p-4 font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Status</th>
                    <th className="p-4 font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Working Hours</th>
                    <th className="p-4 font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Interval</th>
                    <th className="p-4 font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((day, index) => (
                    <tr
                      key={day.day}
                      className="border-t transition-colors hover:bg-opacity-50"
                      style={{
                        borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted,
                        background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg
                      }}
                    >
                      <td className="p-4 font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                        {day.day}
                      </td>
                      <td className="p-4">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={day.enabled}
                            onChange={(e) => handleScheduleChange(index, 'enabled', e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                          <span className="ms-3 text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>
                            {day.enabled ? 'Active' : 'Off'}
                          </span>
                        </label>
                      </td>
                      <td className="p-4">
                        {day.enabled ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={day.startTime}
                              onChange={(e) => handleScheduleChange(index, 'startTime', e.target.value)}
                              className="px-2 py-1 rounded border outline-none focus:ring-2"
                              style={{
                                background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                                color: isDark ? COLORS.dark.text : COLORS.light.text,
                                borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
                              }}
                            />
                            <span style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>to</span>
                            <input
                              type="time"
                              value={day.endTime}
                              onChange={(e) => handleScheduleChange(index, 'endTime', e.target.value)}
                              className="px-2 py-1 rounded border outline-none focus:ring-2"
                              style={{
                                background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                                color: isDark ? COLORS.dark.text : COLORS.light.text,
                                borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
                              }}
                            />
                          </div>
                        ) : (
                          <span className="text-sm italic" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Day Off</span>
                        )}
                      </td>
                      <td className="p-4">
                        {day.enabled && (
                          <select
                            value={day.interval}
                            onChange={(e) => handleScheduleChange(index, 'interval', parseInt(e.target.value))}
                            className="px-2 py-1 rounded border outline-none focus:ring-2"
                            style={{
                              background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                              color: isDark ? COLORS.dark.text : COLORS.light.text,
                              borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted
                            }}
                          >
                            <option value={15}>15 min</option>
                            <option value={30}>30 min</option>
                            <option value={45}>45 min</option>
                            <option value={60}>60 min</option>
                          </select>
                        )}
                      </td>
                      <td className="p-4">
                        {day.enabled && (
                          <button
                            onClick={() => copyToAllDays(index)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-opacity-80"
                            style={{
                              background: `${isDark ? COLORS.dark.primary : COLORS.light.primary}20`,
                              color: isDark ? COLORS.dark.primary : COLORS.light.primary
                            }}
                            title="Copy this schedule to all other days"
                          >
                            <Copy size={14} />
                            Copy All
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Off-Days Section */}
      {activeSection === 'offdays' && (
        <div className="space-y-6">
          <div className="rounded-xl p-6 border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Add Exceptional Off-Day</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Date</label>
                <input
                  type="date"
                  value={newOffDay.date}
                  onChange={(e) => setNewOffDay({ ...newOffDay, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border outline-none"
                  style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                />
              </div>
              <div className="flex-[2] space-y-2">
                <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Reason</label>
                <input
                  type="text"
                  placeholder="e.g., Vacation, Conference, Personal"
                  value={newOffDay.reason}
                  onChange={(e) => setNewOffDay({ ...newOffDay, reason: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border outline-none"
                  style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                />
              </div>
              <button
                onClick={addOffDay}
                className="px-6 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105"
                style={{ background: COLORS.light.primary }}
              >
                Add Off-Day
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Scheduled Off-Days</h3>
            {offDays.length === 0 ? (
              <p style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>No off-days scheduled.</p>
            ) : (
              offDays.map((day) => (
                <div key={day.id} className="flex items-center justify-between p-4 rounded-xl border-l-4"
                  style={{
                    background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                    borderLeftColor: COLORS.light.danger
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Calendar size={20} style={{ color: COLORS.light.danger }} />
                    <div>
                      <p className="font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      <p className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{day.reason}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeOffDay(day.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                    style={{ color: COLORS.light.danger }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Blocked Hours Section */}
      {activeSection === 'blocked' && (
        <div className="space-y-6">
          <div className="rounded-xl p-6 border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Block Specific Hours</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 rounded-lg border outline-none"
                  style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Start Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2 rounded-lg border outline-none"
                  style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>End Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2 rounded-lg border outline-none"
                  style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Reason</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border outline-none"
                  style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                >
                  <option value="lunch">Lunch Break</option>
                  <option value="meeting">Meeting</option>
                  <option value="admin">Administrative</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button
              className="mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-all hover:scale-105"
              style={{ background: COLORS.light.primary }}
            >
              Block Time
            </button>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Blocked Time Slots</h3>
            {/* Mock Data for Blocked Hours */}
            <div className="flex items-center justify-between p-4 rounded-xl border-l-4"
              style={{
                background: isDark ? COLORS.dark.secondary : COLORS.light.secondary,
                borderLeftColor: COLORS.light.danger
              }}
            >
              <div className="flex items-center gap-4">
                <Clock size={20} style={{ color: COLORS.light.danger }} />
                <div>
                  <p className="font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Dec 15, 2025 • 13:00 - 14:00</p>
                  <p className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Lunch Break</p>
                </div>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                style={{ color: COLORS.light.danger }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Settings Section */}
      {activeSection === 'emergency' && (
        <div className="space-y-6">
          <div className="rounded-xl p-6 border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: isDark ? COLORS.dark.muted : COLORS.light.muted }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle size={24} className="text-orange-500" />
              <h3 className="text-lg font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Emergency Slots Configuration</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg" style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary }}>
                <div>
                  <p className="font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Enable Emergency Slots</p>
                  <p className="text-sm" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Reserve specific slots for urgent appointments</p>
                </div>
                <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer bg-green-500">
                  <span className="absolute left-0 inline-block w-6 h-6 bg-white border-2 border-green-500 rounded-full shadow transform translate-x-6 transition-transform"></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Slots per Day</label>
                  <input
                    type="number"
                    defaultValue={2}
                    className="w-full px-4 py-2 rounded-lg border outline-none"
                    style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>Release Unused Slots (Hours Before)</label>
                  <input
                    type="number"
                    defaultValue={24}
                    className="w-full px-4 py-2 rounded-lg border outline-none"
                    style={{ background: isDark ? COLORS.dark.secondary : COLORS.light.secondary, color: isDark ? COLORS.dark.text : COLORS.light.text }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div >
  );
};

export default ScheduleManager;
