import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Layout, Activity, Phone } from 'lucide-react';
import HeaderSettings from '../components/websiteSettings/HeaderSettings';
import TreatmentsSettings from '../components/websiteSettings/TreatmentsSettings';
import FooterSettings from '../components/websiteSettings/FooterSettings';
import { getLandingPageSettings } from '../services/landingPageApi';
import { COLORS } from '../styles/theme';


export default function WebsiteSettings() {
  const { isDark } = useOutletContext();
  const [activeTab, setActiveTab] = useState('header');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState(null);
  const theme = isDark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await getLandingPageSettings();
        if (mounted) setData(res || {});
      } catch (e) {
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const tabs = [
    { id: 'header', label: 'Header & Hero', icon: Layout },
    { id: 'treatments', label: 'Treatments', icon: Activity },
    { id: 'footer', label: 'Footer', icon: Phone },
  ];

  return (
    <div className="flex flex-col h-auto min-h-[calc(100vh-8rem)] gap-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-black tracking-tight mb-2" style={{ color: theme.text }}>
          Website Settings
        </h1>
        <p className="text-sm opacity-70" style={{ color: theme.text }}>
          Customize your public landing page appearance and content.
        </p>
      </div>

      {/* Horizontal Tabs (Pills) */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 rounded-full font-bold transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})`
                  : (isDark ? theme.secondary : '#FFFFFF'),
                color: isActive ? '#FFFFFF' : theme.text,
                border: isActive ? 'none' : `1px solid ${theme.border}`,
                opacity: isActive ? 1 : 0.7
              }}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div
        className="flex-1 rounded-2xl shadow-xl border-2 overflow-hidden flex flex-col relative"
        style={{ background: 'transparent', borderColor: theme.primary }}
      >


        <div className="flex-1 p-6 md:p-8 relative z-10">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: theme.primary }} />
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64 text-red-500 font-bold">
              {error}
            </div>
          ) : (
            <div className="animate-fade-in max-w-5xl mx-auto">
              {activeTab === 'header' && <HeaderSettings initialData={data?.header} isDark={isDark} theme={theme} />}
              {activeTab === 'treatments' && <TreatmentsSettings initialData={data?.treatments || []} isDark={isDark} theme={theme} />}
              {activeTab === 'footer' && <FooterSettings initialData={data?.footer} isDark={isDark} theme={theme} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
