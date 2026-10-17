import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Download, Sparkles, Trash2, ChevronDown, FileCheck, RotateCcw, Printer 
} from 'lucide-react';
import { RESUME_PRESETS } from '../data/initialData';

export default function Navbar({ 
  docType,
  setDocType,
  onSelectPreset, 
  onClear, 
  onExport,
  onResetObektivka,
  onClearObektivka,
  onPrintObektivka,
}) {
  const [isPresetsOpen, setIsPresetsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPresetsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="no-print bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-3 sm:px-4 lg:px-8 py-2.5">
      <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
        {/* LOGO & MODE TOGGLE */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white">ProResume</span>
                <span className="text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                  2-in-1
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden xl:block">
                Rezyume & Rasmiy Ma'lumotnoma (Obektivka)
              </p>
            </div>
          </div>

          {/* MAIN MODE SWITCHER (DESKTOP & MOBILE HEADER) */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setDocType('resume')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                docType === 'resume'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span>Rezyume (CV)</span>
            </button>
            <button
              type="button"
              onClick={() => setDocType('obektivka')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                docType === 'obektivka'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Ma'lumotnoma (Obektivka)</span>
            </button>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-end gap-2 shrink-0">
          {docType === 'resume' ? (
            <>
              {/* PRESETS DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsPresetsOpen(!isPresetsOpen)}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="hidden sm:inline">Misollar & Namunalar</span>
                  <span className="sm:hidden text-xs">Namuna</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </button>

                {isPresetsOpen && (
                  <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-1.5rem)] bg-slate-900 border border-slate-750 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 border-b border-slate-800 mb-1">
                      Tayyor kasb namunalarini tanlang:
                    </div>
                    {RESUME_PRESETS.map((preset) => (
                      <button
                        key={preset.id}
                        onClick={() => {
                          onSelectPreset(preset.data);
                          setIsPresetsOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-slate-800 transition-colors group flex flex-col"
                      >
                        <span className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors">
                          {preset.name}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {preset.subtitle}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={onClear}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-900/50 transition-colors"
                title="Formani bo'shatish"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tozalash</span>
              </button>

              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline">PDF Yuklab Olish</span>
                <span className="sm:hidden text-xs">PDF</span>
              </button>
            </>
          ) : (
            <>
              {/* OBEKTIVKA ACTIONS */}
              <button
                type="button"
                onClick={onResetObektivka}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                title="Namuna ma'lumotlarini tiklash"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="hidden sm:inline">Namunani tiklash</span>
                <span className="sm:hidden text-xs">Namuna</span>
              </button>

              <button
                type="button"
                onClick={onClearObektivka}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-900/50 transition-colors"
                title="Formani bo'shatish"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Tozalash</span>
              </button>

              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="hidden sm:inline">PDF Yuklab Olish</span>
                <span className="sm:hidden text-xs">PDF</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
