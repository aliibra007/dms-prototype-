import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AlertTriangle, Lightbulb, X } from 'lucide-react';
import { COLORS } from '../styles/theme';
import { MOCK_PATIENTS } from '../data/MockData';
import MedicalBackground from '../components/shared/MedicalBackground';

import PatientListSidebar from '../components/patient-records/PatientListSidebar';
import PatientDetailsHeader from '../components/patient-records/PatientDetailsHeader';
import MedicalHistoryTimeline from '../components/patient-records/MedicalHistoryTimeline';
import AddRecordModal from '../components/patient-records/AddRecordModal';
import DeleteRecordModal from '../components/patient-records/DeleteRecordModal';
import AttachmentViewModal from '../components/patient-records/AttachmentViewModal';
import EmptyPatientState from '../components/patient-records/EmptyPatientState';

export default function PatientRecordsPage() {
    const { isDark } = useOutletContext();
    const theme = isDark ? COLORS.dark : COLORS.light;

    const [patients, setPatients] = useState(MOCK_PATIENTS);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [viewingAttachment, setViewingAttachment] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [showMockWarning, setShowMockWarning] = useState(true);
    const [showTip, setShowTip] = useState(true);

    const selectedPatient = patients.find(p => p.id === selectedPatientId);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (isModalOpen) {
                    setIsModalOpen(false);
                    setEditingRecord(null);
                } else if (isDeleteModalOpen) {
                    setIsDeleteModalOpen(false);
                } else if (viewingAttachment) {
                    setViewingAttachment(null);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, isDeleteModalOpen, viewingAttachment]);

    const filteredPatients = patients
        .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            const indexA = a.name.toLowerCase().indexOf(searchTerm.toLowerCase());
            const indexB = b.name.toLowerCase().indexOf(searchTerm.toLowerCase());
            return indexA - indexB;
        });
    
    const selectedPatientIndex = filteredPatients.findIndex(p => p.id === selectedPatientId);
    const largePfpBorderColor = selectedPatientIndex >= 0
        ? [theme.success, theme.warning, theme.danger, theme.primary][selectedPatientIndex % 4]
        : theme.primary;

    const handleSaveRecord = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newRecord = {
            id: editingRecord ? editingRecord.id : Date.now(),
            date: editingRecord ? editingRecord.date : new Date().toISOString().split('T')[0],
            diagnosis: formData.get('diagnosis'),
            symptoms: formData.get('symptoms'),
            treatment: formData.get('treatment'),
            attachments: editingRecord ? editingRecord.attachments : [],
            doctor: editingRecord ? editingRecord.doctor : 'Dr. Sarah Johnson',
            secretary: editingRecord ? editingRecord.secretary : 'Jessica Pearson'
        };

        const updatedPatients = patients.map(p => {
            if (p.id === selectedPatientId) {
                let newHistory;
                if (editingRecord) {
                    newHistory = p.history.map(r => r.id === editingRecord.id ? newRecord : r);
                } else {
                    newHistory = [newRecord, ...p.history];
                }
                return { ...p, history: newHistory };
            }
            return p;
        });

        setPatients(updatedPatients);
        setIsModalOpen(false);
        setEditingRecord(null);
    };

    const confirmDeleteRecord = (record) => {
        setRecordToDelete(record);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteRecord = () => {
        if (recordToDelete) {
            const updatedPatients = patients.map(p => {
                if (p.id === selectedPatientId) {
                    return { ...p, history: p.history.filter(r => r.id !== recordToDelete.id) };
                }
                return p;
            });
            setPatients(updatedPatients);
            setIsDeleteModalOpen(false);
            setRecordToDelete(null);
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        setSelectedPatientId(null);
    };

    const scrollToRecord = (recordId) => {
        const element = document.getElementById(`record-${recordId}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div
            className="flex flex-col h-[calc(100vh-8rem)] gap-4"
            onContextMenu={handleRightClick}
        >
            {/* Mock Data Warning Banner */}
            {showMockWarning && (
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
                        onClick={() => setShowMockWarning(false)}
                        className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        style={{ color: theme.muted }}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            {/* Pro Tip Banner */}
            {showTip && (
                <div
                    className="rounded-lg p-3 flex items-center gap-3 shrink-0 border relative animate-fade-in"
                    style={{
                        background: `${theme.accent}25`,
                        borderColor: `${theme.accent}40`
                    }}
                >
                    <Lightbulb size={20} style={{ color: theme.accent }} />
                    <p className="text-sm font-medium flex-1" style={{ color: theme.text }}>
                        <span className="font-bold">Pro Tip:</span> Right-click anywhere on the page to quickly deselect the current patient.
                    </p>
                    <button
                        onClick={() => setShowTip(false)}
                        className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        style={{ color: theme.muted }}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="flex flex-1 gap-6 overflow-hidden">
                <PatientListSidebar
                    patients={patients}
                    selectedPatientId={selectedPatientId}
                    setSelectedPatientId={setSelectedPatientId}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    theme={theme}
                    isDark={isDark}
                />

                {/* Main Content - Patient Details & History */}
                <div
                    className="flex-1 rounded-xl shadow-lg border-2 overflow-hidden flex flex-col relative"
                    style={{ background: theme.cardBg, borderColor: theme.primary }}
                >
                    <MedicalBackground theme={theme} />

                    {selectedPatient ? (
                        <>
                            <PatientDetailsHeader
                                selectedPatient={selectedPatient}
                                theme={theme}
                                onNewEntry={() => { setEditingRecord(null); setIsModalOpen(true); }}
                                largePfpBorderColor={largePfpBorderColor}
                            />

                            <MedicalHistoryTimeline
                                selectedPatient={selectedPatient}
                                theme={theme}
                                isDark={isDark}
                                onEditRecord={(record) => { setEditingRecord(record); setIsModalOpen(true); }}
                                onDeleteRecord={confirmDeleteRecord}
                                onViewAttachment={setViewingAttachment}
                                scrollToRecord={scrollToRecord}
                                onNewEntry={() => { setEditingRecord(null); setIsModalOpen(true); }}
                            />
                        </>
                    ) : (
                        <EmptyPatientState theme={theme} isDark={isDark} />
                    )}
                </div>
            </div>

            <AddRecordModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); setEditingRecord(null); }}
                editingRecord={editingRecord}
                selectedPatient={selectedPatient}
                onSave={handleSaveRecord}
                theme={theme}
                isDark={isDark}
            />

            <DeleteRecordModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onDelete={handleDeleteRecord}
                theme={theme}
                isDark={isDark}
            />

            <AttachmentViewModal
                attachment={viewingAttachment}
                onClose={() => setViewingAttachment(null)}
                theme={theme}
                isDark={isDark}
            />
        </div>
    );
}
