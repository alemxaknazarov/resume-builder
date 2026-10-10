import React, { useState, useRef, useEffect } from 'react';
import { FileText, Download, Sparkles, Trash2, Eye, Edit3, ChevronDown, Check } from 'lucide-react';
import { RESUME_PRESETS } from '../data/initialData';

export default function Navbar({ 
  onSelectPreset, 
  onClear, 
  onExport, 
  mobileView, 
  setMobileView 
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
    <header className="no-print bg-slate-900/95 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">ProResume</span>
              <span className="text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                ATS-Ready
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Interaktiv havolalar va bir nechta kasb namunalari
            </p>
          </div>
        </div>

        {/* MOBILE TOGGLE (Hidden on desktop) */}
        <div className="flex lg:hidden bg-slate-800 p-1 rounded-lg border border-slate-700">
          <button
            onClick={() => setMobileView('edit')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mobileView === 'edit'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Tahrirlash</span>
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mobileView === 'preview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ko'rish</span>
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2.5">
          {/* PRESETS DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsPresetsOpen(!isPresetsOpen)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-750 text-amber-300 border border-slate-700 transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Misollar & Namunalar</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isPresetsOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-750 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>PDF Yuklab Olish</span>
          </button>
        </div>
      </div>
    </header>
  );
}
