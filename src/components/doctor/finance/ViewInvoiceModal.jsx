import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, FileText, User, Calendar, DollarSign, CreditCard } from 'lucide-react';
import { COLORS } from '../styles/theme';
import StatusBadge from './StatusBadge';

export default function ViewInvoiceModal({
    invoice,
    isOpen,
    onClose,
    isDark
}) {
    const theme = isDark ? COLORS.dark : COLORS.light;

    return (
        <AnimatePresence>
            {isOpen && invoice && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <div className="flex min-h-full items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="rounded-2xl w-full max-w-3xl shadow-2xl border relative overflow-hidden"
                            style={{ background: theme.cardBg, borderColor: theme.border }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
                                <div>
                                    <h3 className="text-xl font-bold flex items-center gap-3" style={{ color: theme.text }}>
                                        Invoice #{invoice.invoice_id}
                                        <StatusBadge status={invoice.status} />
                                    </h3>
                                    <p className="text-sm mt-1 opacity-70" style={{ color: theme.text }}>
                                        Created on {new Date(invoice.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                    style={{ color: theme.text }}
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-8">
                                {/* Patient & Doctor Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 rounded-xl border" style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${theme.primary}20` }}>
                                                <User size={20} style={{ color: theme.primary }} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.text }}>Billed To</p>
                                                <p className="font-bold text-lg" style={{ color: theme.text }}>{invoice.patient_name}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 pl-13">
                                            <p className="text-sm opacity-70" style={{ color: theme.text }}>ID: {invoice.patient_id}</p>
                                            {invoice.patient_email && <p className="text-sm opacity-70" style={{ color: theme.text }}>{invoice.patient_email}</p>}
                                            {invoice.patient_phone && <p className="text-sm opacity-70" style={{ color: theme.text }}>{invoice.patient_phone}</p>}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl border" style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: `${theme.accent}20` }}>
                                                <FileText size={20} style={{ color: theme.accent }} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider opacity-60" style={{ color: theme.text }}>Invoice Details</p>
                                                <p className="font-bold text-lg" style={{ color: theme.text }}>Due: {new Date(invoice.due_date).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-1 pl-13">
                                            {invoice.paid_at && (
                                                <p className="text-sm font-medium text-green-500">
                                                    Paid on {new Date(invoice.paid_at).toLocaleDateString()}
                                                </p>
                                            )}
                                            {invoice.payment_method && (
                                                <p className="text-sm opacity-70 flex items-center gap-2" style={{ color: theme.text }}>
                                                    <CreditCard size={14} /> {invoice.payment_method}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Items / Description */}
                                <div>
                                    <h4 className="text-sm font-bold uppercase tracking-wider opacity-60 mb-3" style={{ color: theme.text }}>Description</h4>
                                    <div className="p-4 rounded-xl border" style={{ borderColor: theme.border, background: 'transparent' }}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium text-lg" style={{ color: theme.text }}>
                                                    {invoice.appointment_notes || "Medical Services"}
                                                </p>
                                                <p className="text-sm opacity-70 mt-1" style={{ color: theme.text }}>
                                                    Appointment Date: {new Date(invoice.appointment_date || invoice.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <p className="font-bold text-xl" style={{ color: theme.text }}>
                                                ${parseFloat(invoice.amount).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-end">
                                    <div className="w-full max-w-xs p-6 rounded-xl" style={{ background: `${theme.primary}10` }}>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="opacity-70" style={{ color: theme.text }}>Subtotal</p>
                                            <p className="font-medium" style={{ color: theme.text }}>${parseFloat(invoice.amount).toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="opacity-70" style={{ color: theme.text }}>Tax (0%)</p>
                                            <p className="font-medium" style={{ color: theme.text }}>$0.00</p>
                                        </div>
                                        <div className="h-px w-full mb-4" style={{ background: theme.border }}></div>
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-lg" style={{ color: theme.text }}>Total</p>
                                            <p className="font-bold text-2xl" style={{ color: theme.primary }}>${parseFloat(invoice.amount).toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-3 pt-6 border-t" style={{ borderColor: theme.border }}>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors hover:bg-opacity-80"
                                        style={{ background: isDark ? theme.secondary : '#F3F4F6', color: theme.text }}
                                        onClick={() => alert('Printing invoice...')}
                                    >
                                        <Printer size={18} />
                                        Print
                                    </button>
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-transform hover:scale-105 shadow-lg"
                                        style={{ background: `linear-gradient(135deg, ${COLORS.light.primary}, ${COLORS.light.accent})` }}
                                        onClick={() => alert('Downloading invoice PDF...')}
                                    >
                                        <Download size={18} />
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
