import React from 'react';
import { Plus, Activity, Pill, Stethoscope, FileText } from 'lucide-react';

const MedicalBackground = ({ theme }) => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
            <style>
                {`
                    @keyframes float {
                        0% { transform: translateY(0px) rotate(0deg); }
                        50% { transform: translateY(-20px) rotate(var(--rotation)); }
                        100% { transform: translateY(0px) rotate(0deg); }
                    }
                `}
            </style>
            {[...Array(25)].map((_, i) => {
                const Icon = [Plus, Activity, Pill, Stethoscope, FileText][i % 5];
                const size = Math.random() * 40 + 20;
                const left = Math.random() * 100;
                const top = Math.random() * 100;
                const delay = Math.random() * 5;
                const duration = Math.random() * 5 + 5;
                const rotation = (Math.random() * 20 + 10) * (Math.random() > 0.5 ? 1 : -1);

                return (
                    <div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            color: theme.primary,
                            '--rotation': `${rotation}deg`,
                            animation: `float ${duration}s ease-in-out ${delay}s infinite`
                        }}
                    >
                        <Icon size={size} />
                    </div>
                );
            })}
        </div>
    );
};

export default MedicalBackground;

