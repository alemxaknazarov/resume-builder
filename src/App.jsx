import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import ExportModal from './components/ExportModal';
import { sampleResumeData, emptyResumeData } from './data/initialData';
import { printVectorPdf } from './utils/pdfExport';

const STORAGE_KEY = 'proresume_builder_data_v1';

export default function App() {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
    return sampleResumeData;
  });

  const [mobileView, setMobileView] = useState('edit'); // 'edit' | 'preview'
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const resumeRef = useRef(null);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [resumeData]);

  const handleDataChange = (newData) => {
    setResumeData(newData);
  };

  const handleCustomizationChange = (newCustomization) => {
    setResumeData(prev => ({
      ...prev,
      customization: newCustomization
    }));
  };

  const handleSelectPreset = (presetData) => {
    setResumeData(presetData);
  };

  const handleClear = () => {
    if (window.confirm("Barcha ma'lumotlarni tozalab, bo'sh rezyumedan boshlamoqchimisiz?")) {
      setResumeData(emptyResumeData);
    }
  };

  // High-precision isolated vector printing
  const handlePrint = () => {
    if (resumeRef.current) {
      printVectorPdf(resumeRef.current, resumeData.personal?.fullName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* NAVBAR */}
      <Navbar 
        onSelectPreset={handleSelectPreset}
        onClear={handleClear}
        onExport={() => setIsExportModalOpen(true)}
        mobileView={mobileView}
        setMobileView={setMobileView}
      />

      {/* MAIN WORKSPACE: SPLIT-SCREEN */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-3 sm:p-5 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 overflow-hidden">
        {/* LEFT COLUMN: FORM INPUTS */}
        <section 
          className={`lg:col-span-5 xl:col-span-5 h-full overflow-y-auto pr-0 lg:pr-2 ${
            mobileView === 'edit' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="mb-3 px-1">
            <h2 className="text-sm font-bold text-white tracking-wide uppercase text-slate-400">
              Ma'lumotlarni Kiritish
            </h2>
            <p className="text-xs text-slate-400">
              Quyidagi bo'limlarni to'ldiring, o'ng tomonda rezyume real vaqtda yangilanadi.
            </p>
          </div>
          <FormPanel 
            data={resumeData} 
            onChange={handleDataChange} 
          />
        </section>

        {/* RIGHT COLUMN: LIVE A4 PREVIEW */}
        <section 
          className={`lg:col-span-7 xl:col-span-7 h-full flex flex-col min-h-[600px] ${
            mobileView === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          <PreviewPanel 
            data={resumeData} 
            onCustomizationChange={handleCustomizationChange} 
            resumeRef={resumeRef}
          />
        </section>
      </main>

      {/* PDF EXPORT MODAL */}
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        fullName={resumeData.personal?.fullName}
        onPrint={handlePrint}
        resumeRef={resumeRef}
      />
    </div>
  );
}
