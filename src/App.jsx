import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import ExportModal from './components/ExportModal';
import { sampleResumeData, emptyResumeData } from './data/initialData';
import { useReactToPrint } from 'react-to-print';

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

  // Industry-standard printing with react-to-print
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: `${resumeData.personal?.fullName ? resumeData.personal.fullName.trim().replace(/\s+/g, '_') : 'Resume'}_Resume`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0;
      }
      *, *::before, *::after {
        box-sizing: border-box;
      }
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        color: #000000 !important;
        width: 210mm !important;
        min-height: 297mm !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .resume-paper {
        width: 210mm !important;
        min-height: 297mm !important;
        margin: 0 auto !important;
        padding: 10mm 12mm !important;
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        transform: none !important;
        background: #ffffff !important;
      }
      .avoid-break {
        break-inside: avoid !important;
        page-break-inside: avoid !important;
      }
    `,
  });

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
