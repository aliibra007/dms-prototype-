import React, { useState, useRef } from 'react';
import { X, Upload, File, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../../styles/theme';

export default function FileUploadModal({ isOpen, onClose, onUpload, theme, isDark }) {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const inputRef = useRef(null);

    if (!isOpen) return null;

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile);
            setSelectedFile(null);
            onClose();
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                    style={{ background: theme.cardBg, border: `1px solid ${theme.border}` }}
                >
                    <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: theme.border }}>
                        <h3 className="font-bold text-lg" style={{ color: theme.text }}>Upload File</h3>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <X size={20} style={{ color: theme.muted }} />
                        </button>
                    </div>

                    <div className="p-6">
                        <div
                            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all ${dragActive ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' : ''}`}
                            style={{ borderColor: dragActive ? theme.primary : theme.border }}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                ref={inputRef}
                                type="file"
                                className="hidden"
                                onChange={handleChange}
                            />

                            {selectedFile ? (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: `${theme.success}20` }}>
                                        <File size={32} style={{ color: theme.success }} />
                                    </div>
                                    <div>
                                        <p className="font-medium" style={{ color: theme.text }}>{selectedFile.name}</p>
                                        <p className="text-sm opacity-60" style={{ color: theme.text }}>
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedFile(null)}
                                        className="text-sm underline mt-2"
                                        style={{ color: theme.danger }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: `${theme.primary}15` }}>
                                        <Upload size={32} style={{ color: theme.primary }} />
                                    </div>
                                    <p className="font-medium mb-1" style={{ color: theme.text }}>Drag & Drop your file here</p>
                                    <p className="text-sm opacity-60 mb-4" style={{ color: theme.text }}>or</p>
                                    <button
                                        onClick={() => inputRef.current?.click()}
                                        className="px-4 py-2 rounded-lg font-medium transition-transform hover:scale-105"
                                        style={{ background: theme.primary, color: '#fff' }}
                                    >
                                        Browse Files
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-4 border-t flex justify-end gap-3" style={{ borderColor: theme.border }}>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg font-medium transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                            style={{ color: theme.text }}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile}
                            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                            style={{ background: theme.primary, color: '#fff' }}
                        >
                            Upload
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
