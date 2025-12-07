import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Banknote, Building, ShieldCheck, CheckCircle } from 'lucide-react';
import { COLORS } from '../styles/theme';

export default function PaymentModal({
    isOpen,
    onClose,
    onConfirm,
    amount,
    isDark
}) {
    const theme = isDark ? COLORS.dark : COLORS.light;
    const [selectedMethod, setSelectedMethod] = useState('Credit Card');
    const [isProcessing, setIsProcessing] = useState(false);

    const methods = [
        { id: 'Credit Card', icon: CreditCard, color: '#6366F1' },
        { id: 'Cash', icon: Banknote, color: '#10B981' },
        { id: 'Bank Transfer', icon: Building, color: '#EF4444' },
        { id: 'Insurance', icon: ShieldCheck, color: '#F59E0B' },
    ];

    const handleConfirm = async () => {
        setIsProcessing(true);
        await onConfirm(selectedMethod);
        setIsProcessing(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
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
                            className="rounded-2xl w-full max-w-md shadow-2xl border relative overflow-hidden"
                            style={{ background: theme.cardBg, borderColor: theme.border }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold" style={{ color: theme.text }}>Record Payment</h3>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                                        style={{ color: theme.text }}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="mb-6 text-center p-4 rounded-xl" style={{ background: `${theme.primary}10` }}>
                                    <p className="text-sm opacity-70 mb-1" style={{ color: theme.text }}>Amount to Pay</p>
                                    <p className="text-3xl font-bold" style={{ color: theme.primary }}>${parseFloat(amount).toFixed(2)}</p>
                                </div>

                                <p className="text-sm font-bold mb-3" style={{ color: theme.text }}>Select Payment Method</p>
                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    {methods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setSelectedMethod(method.id)}
                                            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedMethod === method.id ? 'ring-2 ring-offset-2' : 'hover:bg-opacity-50'}`}
                                            style={{
                                                borderColor: selectedMethod === method.id ? method.color : theme.border,
                                                background: isDark ? theme.secondary : '#F9FAFB',
                                                '--tw-ring-color': method.color,
                                                '--tw-ring-offset-color': theme.cardBg
                                            }}
                                        >
                                            <method.icon size={24} style={{ color: method.color }} />
                                            <span className="text-sm font-medium" style={{ color: theme.text }}>{method.id}</span>
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleConfirm}
                                    disabled={isProcessing}
                                    className="w-full py-3 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                                    style={{ background: `linear-gradient(135deg, ${COLORS.light.primary}, ${COLORS.light.accent})` }}
                                >
                                    {isProcessing ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            <CheckCircle size={20} />
                                            Confirm Payment
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
