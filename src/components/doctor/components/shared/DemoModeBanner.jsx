import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DemoModeBanner = ({ onClose, theme }) => {
    return (
        <div
            className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in"
            style={{
                background: `${theme.warning}25`,
                borderColor: `${theme.warning}40`
            }}
        >
            <AlertTriangle size={20} style={{ color: theme.warning }} />
            <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
                <span className="font-bold">Demo Mode:</span> You are viewing mock patient data. Changes will not be saved to a database.
            </p>
            <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                style={{ color: theme.muted }}
            >
                <X size={16} style={{ color: theme.text }} />
            </button>
        </div>
    );
};

export default DemoModeBanner;
