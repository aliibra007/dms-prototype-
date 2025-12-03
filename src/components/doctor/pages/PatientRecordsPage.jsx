import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
    Search, Plus, FileText, User, Calendar, Activity,
    ChevronRight, Paperclip, X, Stethoscope, Pill, AlertCircle,
    Edit2, Trash2, Eye, Download, Clock, AlertTriangle, File, Lightbulb
} from 'lucide-react';
import { COLORS } from '../styles/theme';
import { MOCK_PATIENTS } from '../data/MockData';
import MedicalBackground from '../components/shared/MedicalBackground';


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

    const HighlightedText = ({ text, highlight }) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = text.split(regex);
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span
                            key={i}
                            className="rounded px-0.5 transition-colors"
                            style={{ background: `${theme.warning}40`, color: theme.text }}
                        >
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

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
                {/* Sidebar - Patient List */}
                <div
                    className="w-1/3 flex flex-col rounded-xl shadow-lg border-2 overflow-hidden select-none"
                    style={{ background: theme.cardBg, borderColor: theme.primary }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setSelectedPatientId(null);
                        }
                    }}
                >
                    <div className="p-4 border-b" style={{ borderColor: theme.border }}>
                        <h2 className="text-lg font-bold mb-4" style={{ color: theme.text }}>Patients</h2>
                        <div className="relative">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.muted }} />
                            <input
                                type="text"
                                placeholder="Search patients..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border outline-none focus:ring-2 transition-all"
                                style={{
                                    background: isDark ? theme.secondary : '#F3F4F6',
                                    borderColor: theme.border,
                                    color: theme.text,
                                    '--tw-ring-color': theme.primary
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {filteredPatients.map((patient, idx) => {
                            const cardColors = [theme.success, theme.warning, theme.danger, theme.primary];
                            const borderColor = cardColors[idx % cardColors.length];

                            return (
                                <div
                                    key={patient.id}
                                    onClick={() => setSelectedPatientId(patient.id)}
                                    className="p-4 border-b cursor-pointer transition-colors hover:bg-opacity-50 flex items-center gap-3"
                                    style={{
                                        borderColor: theme.border,
                                        background: selectedPatientId === patient.id ? `${theme.primary}20` : 'transparent'
                                    }}
                                >
                                    <div className="relative">
                                        <img
                                            src={patient.image}
                                            alt={patient.name}
                                            className="w-12 h-12 rounded-full border-2"
                                            style={{ borderColor: borderColor }}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-base" style={{ color: theme.text }}>
                                            <HighlightedText text={patient.name} highlight={searchTerm} />
                                        </p>
                                        <p className="text-sm font-bold opacity-80" style={{ color: theme.text }}>ID: #{patient.id} • {patient.age} yrs</p>
                                    </div>
                                    <ChevronRight size={16} className="ml-auto" style={{ color: theme.muted }} />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content - Patient Details & History */}
                <div
                    //TODO: remove animated-border-card
                    className="flex-1 rounded-xl shadow-lg border-2 overflow-hidden flex flex-col relative"
                    style={{ background: theme.cardBg, borderColor: theme.primary }}
                >
                    <MedicalBackground theme={theme} />

                    {selectedPatient ? (
                        <>
                            {/* Patient Header */}
                            <div className="p-8 pb-0 flex justify-between items-end border-b pb-6 relative z-10" style={{ borderColor: theme.border }}>
                                <div className="flex items-center gap-6">
                                    <img src={selectedPatient.image} alt={selectedPatient.name} className="w-32 h-32 rounded-2xl shadow-lg -mb-4 border-4 z-10" style={{ borderColor: largePfpBorderColor }} />
                                    <div className="mb-2">
                                        <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.text }}>{selectedPatient.name}</h1>
                                        <div className="flex flex-wrap gap-3 mt-3 font-medium text-sm">
                                            <span className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${theme.primary}40`, color: theme.text }}>
                                                <User size={14} className="text-blue-500" /> {selectedPatient.gender}, {selectedPatient.age} yrs
                                            </span>
                                            <span className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${theme.danger}25`, color: theme.text }}>
                                                <Activity size={14} className="text-red-500" /> Blood: {selectedPatient.bloodType}
                                            </span>
                                            <span className="flex items-center gap-1 px-3 py-1 rounded-full" style={{ background: `${theme.success}25`, color: theme.text }}>
                                                <Stethoscope size={14} className="text-green-500" /> {selectedPatient.history.length} Visits
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setEditingRecord(null); setIsModalOpen(true); }}
                                    className="mb-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                                    style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` }}
                                >
                                    <Plus size={20} /> New Entry
                                </button>
                            </div>

                            {/* Medical History */}
                            <div
                                className="flex-1 overflow-y-auto p-8 pt-8 relative z-10"
                                style={{ background: 'transparent' }}
                            >
                                <h3 className="text-xl font-bold mb-8 flex items-center gap-2" style={{ color: theme.text }}>
                                    <Clock size={24} className="text-blue-500" /> Medical Timeline
                                </h3>

                                <div className="relative border-l-4 space-y-8 ml-4" style={{ borderColor: theme.border }}>
                                    {selectedPatient.history.length > 0 ? (
                                        selectedPatient.history.map((record, idx) => {
                                            const cardColors = [theme.success, theme.warning, theme.danger, theme.primary];
                                            const currentColor = cardColors[idx % cardColors.length];

                                            return (
                                                <div key={record.id} id={`record-${record.id}`} className="relative pl-8 group">
                                                    {/* Timeline Dot */}
                                                    <div
                                                        className="absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 transition-transform group-hover:scale-125 cursor-pointer"
                                                        style={{ background: theme.cardBg, borderColor: currentColor }}
                                                        onClick={() => scrollToRecord(record.id)}
                                                    ></div>

                                                    <div className="rounded-xl border-2 shadow-sm p-5 relative transition-all hover:shadow-md"
                                                        style={{ borderColor: currentColor, background: theme.cardBg }}>
                                                        <div className="flex justify-between items-start mb-4 border-b pb-3" style={{ borderColor: theme.border }}>
                                                            <div>
                                                                <h4 className="font-bold text-xl" style={{ color: theme.primary }}>{record.diagnosis}</h4>
                                                                <div className="flex flex-col gap-1 mt-1">
                                                                    <p className="text-sm font-bold opacity-80" style={{ color: theme.text }}>{record.date} • {record.doctor}</p>
                                                                    {record.secretary && (
                                                                        <p className="text-xs font-bold opacity-60" style={{ color: theme.text }}>Secretary: {record.secretary}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    onClick={() => { setEditingRecord(record); setIsModalOpen(true); }}
                                                                    className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
                                                                    style={{ color: theme.accent, background: `${theme.accent}10` }}
                                                                    title="Edit Record"
                                                                >
                                                                    <Edit2 size={18} />
                                                                </button>
                                                                <button
                                                                    onClick={() => confirmDeleteRecord(record)}
                                                                    className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
                                                                    style={{ color: theme.danger, background: `${theme.danger}10` }}
                                                                    title="Delete Record"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div>
                                                                <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70" style={{ color: theme.text }}>Symptoms</p>
                                                                <p className="text-base leading-relaxed" style={{ color: theme.text }}>{record.symptoms}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-bold uppercase tracking-wider mb-2 opacity-70" style={{ color: theme.text }}>Treatment</p>
                                                                <p className="text-base leading-relaxed" style={{ color: theme.text }}>{record.treatment}</p>
                                                            </div>
                                                        </div>

                                                        {record.attachments.length > 0 && (
                                                            <div className="mt-5 pt-4 border-t" style={{ borderColor: theme.border }}>
                                                                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: theme.muted }}>Attachments</p>
                                                                <div className="flex flex-wrap gap-3">
                                                                    {record.attachments.map((file, idx) => (
                                                                        <div
                                                                            key={idx}
                                                                            onClick={() => setViewingAttachment({ name: file, type: file.split('.').pop() })}
                                                                            className="flex items-center gap-3 px-3 py-2 rounded-lg border group cursor-pointer hover:border-blue-500 transition-colors"
                                                                            style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F3F4F6' }}
                                                                        >
                                                                            <Paperclip size={16} style={{ color: theme.muted }} />
                                                                            <span className="text-sm font-medium" style={{ color: theme.text }}>{file}</span>
                                                                            <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                                <button className="p-1 hover:text-blue-500" title="View"><Eye size={14} /></button>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="text-center py-12 rounded-xl border-2 border-dashed" style={{ borderColor: theme.border }}>
                                            <FileText size={48} className="mx-auto mb-3 opacity-30" style={{ color: theme.text }} />
                                            <p className="font-medium opacity-70" style={{ color: theme.text }}>No medical records found for this patient.</p>
                                            <button
                                                onClick={() => setIsModalOpen(true)}
                                                className="mt-4 text-sm font-bold hover:underline"
                                                style={{ color: theme.primary }}
                                            >
                                                Create First Record
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-10 relative z-10" style={{ color: theme.muted }}>
                            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: isDark ? theme.secondary : '#F3F4F6' }}>
                                <User size={48} className="opacity-50" />
                            </div>
                            <h2 className="text-2xl font-bold mb-2" style={{ color: theme.text }}>Select a Patient</h2>
                            <p className="max-w-md mx-auto opacity-80" style={{ color: theme.text }}>Choose a patient from the sidebar list to view their full medical history, diagnosis, and treatment records.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Record Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <div className="rounded-2xl w-full max-w-2xl shadow-2xl transform transition-all scale-100 border relative"
                            style={{ background: theme.cardBg, borderColor: theme.border }}>
                        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
                            <h3 className="text-xl font-bold" style={{ color: theme.text }}>
                                {editingRecord ? 'Edit Medical Record' : 'Add Medical Record'}
                                <span className="block text-sm font-normal mt-1 opacity-70" style={{ color: theme.text }}>for {selectedPatient?.name}</span>
                            </h3>
                            <button onClick={() => { setIsModalOpen(false); setEditingRecord(null); }}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                style={{ color: theme.muted }}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveRecord} className="p-6 space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-bold" style={{ color: theme.text }}>Diagnosis</label>
                                <div className="relative">
                                    <AlertCircle size={18} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.muted }} />
                                    <input required name="diagnosis" defaultValue={editingRecord?.diagnosis} placeholder="e.g. Acute Bronchitis"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all"
                                        style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold" style={{ color: theme.text }}>Symptoms</label>
                                    <textarea required name="symptoms" defaultValue={editingRecord?.symptoms} rows={4} placeholder="Describe patient symptoms..."
                                        className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all resize-none"
                                        style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }} />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold" style={{ color: theme.text }}>Treatment Plan</label>
                                    <textarea required name="treatment" defaultValue={editingRecord?.treatment} rows={4} placeholder="Medication, therapy, or lifestyle changes..."
                                        className="w-full p-3 rounded-lg border bg-transparent outline-none focus:ring-2 transition-all resize-none"
                                        style={{ borderColor: theme.border, color: theme.text, '--tw-ring-color': theme.primary }} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold" style={{ color: theme.text }}>Attachments</label>
                                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-opacity-50 transition-colors group"
                                    style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
                                    <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{ background: `${theme.primary}10` }}>
                                        <Paperclip size={24} style={{ color: theme.primary }} />
                                    </div>
                                    <p className="text-sm font-medium" style={{ color: theme.text }}>Click to upload reports or images</p>
                                    <p className="text-xs mt-1 opacity-60" style={{ color: theme.text }}>PDF, JPG, PNG up to 10MB</p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-8 pt-4 border-t" style={{ borderColor: theme.border }}>
                                <button type="button" onClick={() => { setIsModalOpen(false); setEditingRecord(null); }}
                                    className="px-5 py-2.5 rounded-lg font-bold transition-colors"
                                    style={{ color: theme.text, background: isDark ? theme.secondary : '#F3F4F6' }}>
                                    Cancel
                                </button>
                                <button type="submit"
                                    className="px-8 py-2.5 rounded-lg font-bold text-white transition-transform hover:scale-105 shadow-lg"
                                    style={{ background: `linear-gradient(135deg, ${COLORS.light.primary}, ${COLORS.light.accent})` }}>
                                    {editingRecord ? 'Update Record' : 'Save Record'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            )}

            {/* Custom Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="rounded-2xl w-full max-w-md shadow-2xl transform transition-all scale-100 border p-6"
                        style={{ background: theme.cardBg, borderColor: theme.border }}>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.danger}20` }}>
                                <AlertTriangle size={32} style={{ color: theme.danger }} />
                            </div>
                            <h3 className="text-xl font-bold mb-2" style={{ color: theme.text }}>Delete Record?</h3>
                            <p className="text-sm mb-6 opacity-80" style={{ color: theme.text }}>
                                Are you sure you want to delete this medical record? This action cannot be undone.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="flex-1 py-3 rounded-xl font-bold transition-colors"
                                    style={{ color: theme.text, background: isDark ? theme.secondary : '#F3F4F6' }}>
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDeleteRecord}
                                    className="flex-1 py-3 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform"
                                    style={{ background: theme.danger }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Attachment View Modal */}
            {viewingAttachment && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="rounded-2xl w-full max-w-lg shadow-2xl transform transition-all scale-100 border p-6"
                        style={{ background: theme.cardBg, borderColor: theme.border }}>
                        <div className="flex items-center justify-between mb-6 border-b pb-4" style={{ borderColor: theme.border }}>
                            <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
                                <FileText size={24} className="text-blue-500" />
                                View Attachment
                            </h3>
                            <button onClick={() => setViewingAttachment(null)}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                style={{ color: theme.muted }}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed mb-6"
                            style={{ borderColor: theme.border, background: isDark ? theme.secondary : '#F9FAFB' }}>
                            <File size={64} className="mb-4 opacity-50" style={{ color: theme.primary }} />
                            <p className="text-lg font-bold" style={{ color: theme.text }}>{viewingAttachment.name}</p>
                            <p className="text-sm uppercase tracking-wider font-bold mt-1" style={{ color: theme.muted }}>{viewingAttachment.type} File</p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setViewingAttachment(null)}
                                className="px-6 py-2.5 rounded-xl font-bold transition-colors"
                                style={{ color: theme.text, background: isDark ? theme.secondary : '#F3F4F6' }}>
                                Close
                            </button>
                            <button
                                className="px-6 py-2.5 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                                style={{ background: theme.primary }}>
                                <Download size={18} /> Download
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
