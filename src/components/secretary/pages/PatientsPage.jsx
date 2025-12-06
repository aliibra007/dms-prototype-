import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Users, UserPlus, UserCheck, Calendar } from 'lucide-react';
import { COLORS } from '../styles/theme';
import StatCard from '../components/shared/StatCard';
import MockDataBanner from '../components/schedule/MockDataBanner';

// Patient Components
import PatientFilters from '../components/patient/PatientFilters';
import PatientTable from '../components/patient/PatientTable';
import { PatientFormModal, DeletePatientModal } from '../components/patient/PatientModals';
import PatientDetailDrawer from '../components/patient/PatientDetailDrawer';
import PatientHistoryPanel from '../components/patient/PatientHistoryPanel';

// Mock Data
import { MOCK_PATIENTS } from '../data/patients';
import { MOCK_PATIENT_HISTORY, MOCK_PATIENT_DOCUMENTS } from '../data/patientHistory';

export default function PatientsPage() {
  const { isDark } = useOutletContext();
  const theme = isDark ? COLORS.dark : COLORS.light;

  // Banner State
  const [showBanner, setShowBanner] = useState(true);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [genderFilter, setGenderFilter] = useState('all');

  // Data State
  const [patients, setPatients] = useState(MOCK_PATIENTS);
  const [patientDocuments, setPatientDocuments] = useState(MOCK_PATIENT_DOCUMENTS);

  // Modal State
  const [formModal, setFormModal] = useState({ 
    isOpen: false, 
    mode: 'register', 
    patient: null 
  });
  const [deleteModal, setDeleteModal] = useState({ 
    isOpen: false, 
    patient: null 
  });
  const [detailDrawer, setDetailDrawer] = useState({ 
    isOpen: false, 
    patient: null 
  });
  const [historyDrawer, setHistoryDrawer] = useState({ 
    isOpen: false, 
    patient: null 
  });

  // Filtered and Sorted Patients
  const filteredPatients = useMemo(() => {
    let result = [...patients];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.fullName.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query) ||
        p.phone.includes(query)
      );
    }

    // Gender filter
    if (genderFilter !== 'all') {
      result = result.filter(p => p.gender === genderFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.fullName.localeCompare(b.fullName);
      } else if (sortBy === 'lastVisit') {
        comparison = new Date(b.lastVisit) - new Date(a.lastVisit);
      } else if (sortBy === 'registeredDate') {
        comparison = new Date(b.registeredDate) - new Date(a.registeredDate);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [patients, searchQuery, sortBy, sortOrder, genderFilter]);

  // Stats
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);
    
    return {
      total: patients.length,
      newThisMonth: patients.filter(p => p.registeredDate?.startsWith(thisMonth)).length,
      active: patients.filter(p => {
        const lastVisit = new Date(p.lastVisit);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return lastVisit >= thirtyDaysAgo;
      }).length,
      visitedToday: patients.filter(p => p.lastVisit === today).length,
    };
  }, [patients]);

  const statsCards = [
    { title: 'Total Patients', value: stats.total.toString(), icon: Users, color: theme.primary },
    { title: 'New This Month', value: stats.newThisMonth.toString(), icon: UserPlus, color: theme.accent },
    { title: 'Active (30 days)', value: stats.active.toString(), icon: UserCheck, color: theme.success },
    { title: 'Visited Today', value: stats.visitedToday.toString(), icon: Calendar, color: theme.info },
  ];

  // ====================
  // PATIENT HANDLERS
  // ====================
  const handleRegisterNew = () => {
    setFormModal({ isOpen: true, mode: 'register', patient: null });
  };

  const handleViewDetails = (patient) => {
    setDetailDrawer({ isOpen: true, patient });
  };

  const handleEdit = (patient) => {
    setFormModal({ isOpen: true, mode: 'edit', patient });
    // Close detail drawer if open
    if (detailDrawer.isOpen) {
      setDetailDrawer({ isOpen: false, patient: null });
    }
  };

  const handleViewHistory = (patient) => {
    setHistoryDrawer({ isOpen: true, patient });
    // Close detail drawer if open
    if (detailDrawer.isOpen) {
      setDetailDrawer({ isOpen: false, patient: null });
    }
  };

  const handleDelete = (patient) => {
    setDeleteModal({ isOpen: true, patient });
  };

  const handleSavePatient = (data) => {
    if (data.id) {
      // Edit existing patient
      setPatients(prev => prev.map(p => 
        p.id === data.id ? { 
          ...p, 
          ...data,
        } : p
      ));
    } else {
      // Register new patient
      const newPatient = {
        id: Math.max(...patients.map(p => p.id)) + 1,
        ...data,
        lastVisit: null,
        registeredDate: new Date().toISOString().split('T')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.fullName.replace(' ', '')}`,
      };
      setPatients(prev => [newPatient, ...prev]);
      
      // Initialize empty documents for new patient
      setPatientDocuments(prev => ({
        ...prev,
        [newPatient.id]: [],
      }));
    }
  };

  const handleConfirmDelete = (patient) => {
    setPatients(prev => prev.filter(p => p.id !== patient.id));
    // Also remove documents
    setPatientDocuments(prev => {
      const updated = { ...prev };
      delete updated[patient.id];
      return updated;
    });
  };

  // ====================
  // DOCUMENT HANDLERS
  // ====================
  const handleUploadDocument = () => {
    // Mock upload - in real app, this would open file picker
    if (detailDrawer.patient) {
      const newDoc = {
        id: Date.now(),
        name: `New Document - ${new Date().toLocaleDateString()}.pdf`,
        type: 'PDF',
        uploadDate: new Date().toISOString().split('T')[0],
        size: '1.0 MB',
      };
      setPatientDocuments(prev => ({
        ...prev,
        [detailDrawer.patient.id]: [
          newDoc,
          ...(prev[detailDrawer.patient.id] || []),
        ],
      }));
    }
  };

  const handleDeleteDocument = (doc) => {
    if (detailDrawer.patient) {
      setPatientDocuments(prev => ({
        ...prev,
        [detailDrawer.patient.id]: (prev[detailDrawer.patient.id] || []).filter(d => d.id !== doc.id),
      }));
    }
  };

  // Custom banner message for patients page
  const BannerMessage = () => (
    <div
      className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in mb-6"
      style={{
        background: `${theme.warning}25`,
        borderColor: `${theme.warning}40`
      }}
    >
      <Users size={20} style={{ color: theme.warning }} />
      <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
        <span className="font-bold">MOCK DATA ACTIVE</span> — This page is displaying placeholder patient records.
      </p>
      <button
        onClick={() => setShowBanner(false)}
        className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        style={{ color: theme.text }}
      >
        ×
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Mock Data Banner */}
      {showBanner && <BannerMessage />}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, idx) => (
          <StatCard key={stat.title + idx} {...stat} isDark={isDark} />
        ))}
      </div>

      {/* Filter Bar */}
      <PatientFilters
        isDark={isDark}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
        sortOrder={sortOrder}
        onSortOrderToggle={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
        genderFilter={genderFilter}
        onGenderFilterChange={setGenderFilter}
      />

      {/* Patient Table */}
      <PatientTable
        isDark={isDark}
        patients={filteredPatients}
        onViewDetails={handleViewDetails}
        onEdit={handleEdit}
        onViewHistory={handleViewHistory}
        onDelete={handleDelete}
        onRegisterNew={handleRegisterNew}
      />

      {/* Modals */}
      <PatientFormModal
        isOpen={formModal.isOpen}
        onClose={() => setFormModal({ isOpen: false, mode: 'register', patient: null })}
        isDark={isDark}
        mode={formModal.mode}
        patient={formModal.patient}
        onSave={handleSavePatient}
      />

      <DeletePatientModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, patient: null })}
        isDark={isDark}
        patient={deleteModal.patient}
        onConfirm={handleConfirmDelete}
      />

      {/* Drawers */}
      <PatientDetailDrawer
        isOpen={detailDrawer.isOpen}
        onClose={() => setDetailDrawer({ isOpen: false, patient: null })}
        isDark={isDark}
        patient={detailDrawer.patient}
        documents={detailDrawer.patient ? patientDocuments[detailDrawer.patient.id] || [] : []}
        onEdit={handleEdit}
        onViewHistory={handleViewHistory}
        onUploadDocument={handleUploadDocument}
        onDeleteDocument={handleDeleteDocument}
      />

      <PatientHistoryPanel
        isOpen={historyDrawer.isOpen}
        onClose={() => setHistoryDrawer({ isOpen: false, patient: null })}
        isDark={isDark}
        patient={historyDrawer.patient}
        history={historyDrawer.patient ? MOCK_PATIENT_HISTORY[historyDrawer.patient.id] || { appointments: [], prescriptions: [] } : null}
      />
    </div>
  );
}
