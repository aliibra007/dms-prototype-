import React from 'react';
import { COLORS } from '../../styles/theme';

const StatCard = ({ icon: Icon, title, value, change, color, isDark }) => (
    <div className="rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2" style={{ background: isDark ? COLORS.dark.cardBg : COLORS.light.cardBg, borderColor: color }}>
        <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={24} style={{ color }} />
            </div>
            <span className="text-sm font-semibold px-2 py-1 rounded" style={{ background: change >= 0 ? '#10B98120' : '#EF444420', color: change >= 0 ? '#10B981' : '#EF4444' }}>
                {change >= 0 ? '+' : ''}{change}%
            </span>
        </div>
        <h3 className="text-sm mb-1" style={{ color: isDark ? COLORS.dark.muted : COLORS.light.muted }}>{title}</h3>
        <p className="text-2xl font-bold" style={{ color: isDark ? COLORS.dark.text : COLORS.light.text }}>{value}</p>
    </div>
);

export default StatCard;
