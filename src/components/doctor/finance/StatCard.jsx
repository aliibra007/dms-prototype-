import React from "react";

const StatCard = ({ title, value, subtitle, icon: Icon, trend, borderColor, isDark, }) => (
  <div className="rounded-xl p-6 border-2" style={{ background: isDark ? "#1E293B" : "#FFFFFF", borderColor }}>
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${borderColor}20` }}>
        <Icon size={24} style={{ color: borderColor }} />
      </div>
      {trend && (<div style={{ color: borderColor }}>{trend > 0 ? "↗" : "↘"}</div>)}
    </div>
    <h3 className="text-sm mb-1" style={{ color: isDark ? "#94A3B8" : "#6B7280" }}>{title}</h3>
    <p className="text-2xl font-bold" style={{ color: isDark ? "#F1F5F9" : "#1F2937" }}>{value}</p>
    <p className="text-sm mt-1" style={{ color: borderColor }}>{subtitle}</p>
  </div>
);

export default StatCard;
