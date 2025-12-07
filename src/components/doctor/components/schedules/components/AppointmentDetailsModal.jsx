import React from 'react';
import { X, Calendar, Clock, User, Phone, Mail, FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import useScrollLock from '../../../hooks/useScrollLock';

export default function AppointmentDetailsModal({
    isOpen,
    onClose,
    appointment,
    theme,
    isDark
}) {
    useScrollLock(isOpen);

    if (!isOpen || !appointment) return null;

    const getStatusColor = (status) => ({ pending: '#F59E0B', confirmed: '#10B981', completed: '#6366F1', cancelled: '#EF4444' }[status] || '#F59E0B');
    const getStatusIcon = (status) => (status === 'cancelled' ? <XCircle size={16} /> : <CheckCircle size={16} />);

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="flex min-h-full items-center justify-center p-4">
                <div
                    className="rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 border relative"
                    style={{ background: theme.cardBg, borderColor: theme.border }}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
                        <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
                            <FileText size={24} style={{ color: theme.primary }} />
                            Appointment Details
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
                            style={{ color: theme.text }}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Patient Info */}
                        <div className="flex items-start gap-4 p-4 rounded-xl" style={{ background: theme.secondary }}>
                            <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold" style={{ background: `${theme.primary}20`, color: theme.primary }}>
                                {appointment.patient_name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg" style={{ color: theme.text }}>{appointment.patient_name}</h4>
                                <p className="text-sm" style={{ color: theme.mutedText }}>ID: {appointment.patient_id}</p>
                            </div>
                            <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold" style={{ background: `${getStatusColor(appointment.status)}20`, color: getStatusColor(appointment.status) }}>
                                {getStatusIcon(appointment.status)}
                                <span className="capitalize">{appointment.status}</span>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.mutedText }}>Phone</label>
                                <div className="flex items-center gap-2" style={{ color: theme.text }}>
                                    <Phone size={16} />
                                    {appointment.patient_phone || 'N/A'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.mutedText }}>Email</label>
                                <div className="flex items-center gap-2" style={{ color: theme.text }}>
                                    <Mail size={16} />
                                    {appointment.patient_email || 'N/A'}
                                </div>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: theme.border }}>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.mutedText }}>Date</label>
                                <div className="flex items-center gap-2" style={{ color: theme.text }}>
                                    <Calendar size={16} />
                                    {appointment.start_datetime ? new Date(appointment.start_datetime).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: theme.mutedText }}>Time</label>
                                <div className="flex items-center gap-2" style={{ color: theme.text }}>
                                    <Clock size={16} />
                                    {appointment.start_datetime ? new Date(appointment.start_datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {appointment.notes && (
                            <div className="space-y-2 pt-4 border-t" style={{ borderColor: theme.border }}>
                                <label className="text-sm font-bold flex items-center gap-2" style={{ color: theme.text }}>
                                    <FileText size={16} />
                                    Notes
                                </label>
                                <p className="text-sm p-3 rounded-lg" style={{ background: theme.secondary, color: theme.text }}>
                                    {appointment.notes}
                                </p>
                            </div>
                        )}

                        {/* Cancellation Reason */}
                        {appointment.cancellation_reason && (
                            <div className="space-y-2 pt-4 border-t" style={{ borderColor: theme.border }}>
                                <label className="text-sm font-bold flex items-center gap-2 text-red-500">
                                    <AlertCircle size={16} />
                                    Cancellation Reason
                                </label>
                                <p className="text-sm p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
                                    {appointment.cancellation_reason}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t" style={{ borderColor: theme.border }}>
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl font-bold transition-colors hover:bg-opacity-90"
                            style={{ background: theme.primary, color: '#ffffff' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
