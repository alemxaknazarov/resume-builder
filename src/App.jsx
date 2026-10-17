import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Eye, Download, Printer } from 'lucide-react';
import Navbar from './components/Navbar';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import ExportModal from './components/ExportModal';
import ObektivkaFormPanel from './components/obektivka/ObektivkaFormPanel';
import ObektivkaPreviewPanel from './components/obektivka/ObektivkaPreviewPanel';
import { sampleResumeData, emptyResumeData } from './data/initialData';
import { sampleObektivkaData, emptyObektivkaData } from './data/obektivkaData';
import { printVectorPdf, printObektivkaPdf } from './utils/pdfExport';

const STORAGE_KEY_RESUME = 'proresume_builder_data_v1';
const STORAGE_KEY_OBEKTIVKA = 'proresume_obektivka_data_v1';
const STORAGE_KEY_DOCTYPE = 'proresume_active_doctype';

export default function App() {
  // Document mode: 'resume' | 'obektivka'
  const [docType, setDocType] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DOCTYPE);
      if (saved === 'resume' || saved === 'obektivka') {
        return saved;
      }
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
    return 'resume';
  });

  // Resume data state
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RESUME);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
    return sampleResumeData;
  });

  // Obektivka data state
  const [obektivkaData, setObektivkaData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OBEKTIVKA);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
    return sampleObektivkaData;
  });

  const [mobileView, setMobileView] = useState('edit'); // 'edit' | 'preview'
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const resumeRef = useRef(null);
  const obektivkaRef = useRef(null);

  // Persist docType
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DOCTYPE, docType);
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [docType]);

  // Persist resumeData
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESUME, JSON.stringify(resumeData));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [resumeData]);

  // Persist obektivkaData
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_OBEKTIVKA, JSON.stringify(obektivkaData));
    } catch (e) {
      console.error('LocalStorage save error:', e);
    }
  }, [obektivkaData]);

  // Resume handlers
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

  const handleClearResume = () => {
    if (window.confirm("Barcha ma'lumotlarni tozalab, bo'sh rezyumedan boshlamoqchimisiz?")) {
      setResumeData(emptyResumeData);
    }
  };

  const handlePrintResume = () => {
    if (resumeRef.current) {
      printVectorPdf(resumeRef.current, resumeData.personal?.fullName);
    }
  };

  // Obektivka handlers
  const handleResetObektivka = () => {
    if (window.confirm("Ma'lumotnoma namunasini qayta tiklamoqchimisiz?")) {
      setObektivkaData(sampleObektivkaData);
    }
  };

  const handleClearObektivka = () => {
    if (window.confirm("Ma'lumotnoma maydonlarini tozalab, bo'sh shakldan boshlamoqchimisiz?")) {
      setObektivkaData(emptyObektivkaData);
    }
  };

  const handlePrintObektivka = () => {
    if (obektivkaRef.current) {
      printObektivkaPdf(obektivkaRef.current, obektivkaData.personal?.fullName);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* NAVBAR */}
      <Navbar 
        docType={docType}
        setDocType={setDocType}
        onSelectPreset={handleSelectPreset}
        onClear={handleClearResume}
        onExport={() => setIsExportModalOpen(true)}
        onResetObektivka={handleResetObektivka}
        onClearObektivka={handleClearObektivka}
        onPrintObektivka={handlePrintObektivka}
      />

      {/* MAIN WORKSPACE: SPLIT-SCREEN */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-2.5 sm:p-5 lg:p-6 pb-24 lg:pb-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 overflow-hidden">
        {/* LEFT COLUMN: FORM INPUTS */}
        <section 
          className={`lg:col-span-5 xl:col-span-5 h-full overflow-y-auto pr-0 lg:pr-2 ${
            mobileView === 'edit' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="mb-2.5 sm:mb-3 px-1">
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase text-slate-400">
              {docType === 'resume' ? "Ma'lumotlarni Kiritish" : "Маълумотнома (Объективка) анкетаси"}
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-400">
              {docType === 'resume' 
                ? "Quyidagi bo'limlarni to'ldiring, o'ng tomonda rezyume real vaqtda yangilanadi."
                : "Ўзбекистон Республикаси давлат органлари ва ташкилотлари учун 2 саҳифали расмий шакл."}
            </p>
          </div>

          {docType === 'resume' ? (
            <FormPanel 
              data={resumeData} 
              onChange={handleDataChange} 
            />
          ) : (
            <ObektivkaFormPanel 
              data={obektivkaData}
              onChange={setObektivkaData}
            />
          )}
        </section>

        {/* RIGHT COLUMN: LIVE A4 PREVIEW */}
        <section 
          className={`lg:col-span-7 xl:col-span-7 h-full flex flex-col min-h-[500px] sm:min-h-[600px] ${
            mobileView === 'preview' ? 'block' : 'hidden lg:block'
          }`}
        >
          {docType === 'resume' ? (
            <PreviewPanel 
              data={resumeData} 
              onCustomizationChange={handleCustomizationChange} 
              resumeRef={resumeRef}
            />
          ) : (
            <ObektivkaPreviewPanel 
              data={obektivkaData}
              obektivkaRef={obektivkaRef}
              onExport={() => setIsExportModalOpen(true)}
            />
          )}
        </section>
      </main>

      {/* MOBILE BOTTOM NAVIGATION DOCK (lg:hidden) */}
      <nav className="no-print lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shadow-[0_-8px_25px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-1 bg-slate-950/90 p-1 rounded-xl border border-slate-800 flex-1">
          <button
            type="button"
            onClick={() => setMobileView('edit')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              mobileView === 'edit'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>Tahrirlash</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
              mobileView === 'preview'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Ko'rish</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 shrink-0"
          title="PDF Yuklab Olish"
        >
          <Download className="w-4 h-4" />
          <span>PDF</span>
        </button>
      </nav>

      {/* PDF EXPORT MODAL (UNIFIED FOR RESUME & OBEKTIVKA) */}
      <ExportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        docType={docType}
        fullName={docType === 'resume' ? resumeData.personal?.fullName : obektivkaData.personal?.fullName}
        resumeRef={resumeRef}
        obektivkaRef={obektivkaRef}
      />
    </div>
  );
}
