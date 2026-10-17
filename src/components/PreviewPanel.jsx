import React, { useState } from 'react';
import ModernMinimal from './templates/ModernMinimal';
import TechPro from './templates/TechPro';
import ExecutiveElegant from './templates/ExecutiveElegant';
import CreativeDesigner from './templates/CreativeDesigner';
import HarvardClassic from './templates/HarvardClassic';
import { ZoomIn, ZoomOut, RotateCcw, LayoutTemplate, Palette, Link2 } from 'lucide-react';

const ACCENT_COLORS = [
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Sky Cyan', value: '#0284c7' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Violet', value: '#7c3aed' },
  { name: 'Slate Dark', value: '#334155' },
  { name: 'Amber Bronze', value: '#b45309' },
  { name: 'Crimson', value: '#be123c' },
];

const TEMPLATES = [
  { id: 'modern', name: 'Modern Minimal' },
  { id: 'tech', name: 'Tech Pro' },
  { id: 'creative', name: 'Creative Designer' },
  { id: 'executive', name: 'Executive' },
  { id: 'harvard', name: 'Harvard ATS' },
];

export default function PreviewPanel({ data, onCustomizationChange, resumeRef }) {
  const getAutoFitScale = () => {
    if (typeof window === 'undefined') return 85;
    const w = window.innerWidth;
    if (w < 640) {
      // Mobile screen width ~360px - 414px (with margin and padding)
      const available = Math.max(260, w - 24);
      return Math.min(65, Math.max(35, Math.floor((available / 794) * 100)));
    }
    if (w < 1024) {
      // Tablet screen width
      const available = Math.max(380, w - 48);
      return Math.min(85, Math.max(50, Math.floor((available / 794) * 100)));
    }
    return 85;
  };

  const [zoom, setZoom] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return getAutoFitScale();
    }
    return 85;
  });

  const activeTemplate = data.customization?.template || 'modern';
  const activeColor = data.customization?.accentColor || '#2563eb';

  const setTemplate = (tpl) => {
    onCustomizationChange({ ...data.customization, template: tpl });
  };

  const setColor = (hex) => {
    onCustomizationChange({ ...data.customization, accentColor: hex });
  };

  return (
    <div className="flex flex-col h-full">
      {/* TOOLBAR CONTROLS (Hidden during print) */}
      <div className="no-print bg-slate-800/90 border border-slate-700/80 rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 backdrop-blur shadow-sm space-y-2.5 sm:space-y-3">
        {/* Top Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 lg:gap-3">
          {/* Template Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 w-full lg:w-auto overflow-hidden">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 shrink-0">
              <LayoutTemplate className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Shablon:</span>
            </span>
            <div className="flex items-center bg-slate-900/90 p-1 rounded-lg border border-slate-750 gap-1 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {TEMPLATES.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setTemplate(tpl.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap transition-all shrink-0 ${
                    activeTemplate === tpl.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tpl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Color Palettes and Zoom Controls */}
          <div className="flex items-center justify-between lg:justify-end gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
            {/* Color Palettes */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-750 shrink-0">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-4 h-4 rounded-full transition-transform relative flex items-center justify-center ${
                    activeColor === c.value ? 'scale-125 ring-2 ring-white/70' : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-lg border border-slate-750 text-slate-300 shrink-0">
              <button
                onClick={() => setZoom((z) => Math.max(30, z - 10))}
                className="p-1 hover:text-white rounded"
                title="Kichraytirish"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono px-1 w-10 text-center">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(130, z + 10))}
                className="p-1 hover:text-white rounded"
                title="Kattalashtirish"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(window.innerWidth < 1024 ? getAutoFitScale() : 85)}
                className="p-1 hover:text-white rounded border-l border-slate-700 ml-0.5"
                title={window.innerWidth < 1024 ? "Ekranga moslash" : "Asliga qaytarish (85%)"}
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Hyperlink Hint Banner */}
        <div className="flex items-center justify-between text-[11px] bg-blue-950/40 border border-blue-800/40 px-2.5 sm:px-3 py-1.5 rounded-lg text-blue-200">
          <div className="flex items-center gap-2">
            <Link2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="text-[10px] sm:text-[11px] leading-tight">
              <strong>Interaktiv Havolalar:</strong> PDF ga eksport qilinganda barcha linklar to'liq bosiladigan holatda saqlanadi.
            </span>
          </div>
          <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono hidden md:inline shrink-0">
            A4 Standart
          </span>
        </div>
      </div>

      {/* PAPER CANVAS CONTAINER */}
      <div className="flex-1 overflow-auto bg-slate-950/60 rounded-xl p-2 sm:p-4 md:p-8 flex justify-center items-start border border-slate-800/80 shadow-inner print:bg-white print:border-none print:p-0 print:m-0 print:overflow-visible pb-20 lg:pb-8">
        <div 
          className="relative transition-all duration-150 shrink-0"
          style={{ 
            width: `${(210 * zoom) / 100}mm`,
            height: `${(297 * zoom) / 100}mm`,
          }}
        >
          <div 
            id="resume-to-print"
            ref={resumeRef}
            className="print-container transition-transform origin-top-left shadow-2xl rounded-sm shrink-0 print:shadow-none print:border-none print:m-0 print:p-0 absolute top-0 left-0"
            style={{ 
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
              width: '210mm',
              minWidth: '210mm',
              maxWidth: '210mm',
              minHeight: '297mm',
            }}
          >
            {activeTemplate === 'modern' && <ModernMinimal data={data} />}
            {activeTemplate === 'tech' && <TechPro data={data} />}
            {activeTemplate === 'creative' && <CreativeDesigner data={data} />}
            {activeTemplate === 'executive' && <ExecutiveElegant data={data} />}
            {activeTemplate === 'harvard' && <HarvardClassic data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}
