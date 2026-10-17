import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Download, Printer, FileText, CheckCircle2 } from 'lucide-react';
import ObektivkaDocument from './ObektivkaDocument';
import { printObektivkaPdf } from '../../utils/pdfExport';

export default function ObektivkaPreviewPanel({ data, obektivkaRef, onExport }) {
  const getAutoFitScale = () => {
    if (typeof window === 'undefined') return 80;
    const w = window.innerWidth;
    if (w < 640) {
      const available = Math.max(260, w - 24);
      return Math.min(60, Math.max(35, Math.floor((available / 794) * 100)));
    }
    if (w < 1024) {
      const available = Math.max(380, w - 48);
      return Math.min(80, Math.max(50, Math.floor((available / 794) * 100)));
    }
    return 80;
  };

  const [zoom, setZoom] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      return getAutoFitScale();
    }
    return 80;
  });

  const [selectedPage, setSelectedPage] = useState('all'); // 'all' | '1' | '2'

  const handlePrint = () => {
    if (obektivkaRef?.current) {
      printObektivkaPdf(obektivkaRef.current, data.personal?.fullName);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* TOOLBAR CONTROLS */}
      <div className="no-print bg-slate-900 border border-slate-800 rounded-xl p-2.5 sm:p-3 mb-3 backdrop-blur shadow-sm space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* SAHIFA TANLASH TUGMALARI */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setSelectedPage('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                selectedPage === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hammasi (2 sahifa)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPage('1')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                selectedPage === '1'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1-sahifa (Asosiy)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPage('2')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                selectedPage === '2'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2-sahifa (Qarindoshlar)
            </button>
          </div>

          {/* ZOOM VA EXPORT CONTROLS */}
          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 text-xs">
              <button
                type="button"
                onClick={() => setZoom(prev => Math.max(35, prev - 10))}
                className="p-1 hover:text-white text-slate-400 transition-colors"
                title="Kichraytirish"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-slate-300 w-10 text-center select-none text-[11px]">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={() => setZoom(prev => Math.min(130, prev + 10))}
                className="p-1 hover:text-white text-slate-400 transition-colors"
                title="Kattalashtirish"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(80)}
                className="p-1 hover:text-white text-slate-400 transition-colors border-l border-slate-800 ml-0.5 pl-1.5"
                title="Masshtabni tiklash"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Print / Save button */}
            <button
              type="button"
              onClick={onExport || handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="PDF Yuklab Olish"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Yuklab Olish</span>
            </button>
          </div>
        </div>

        {/* Info banner */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 px-1">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ўзбекистон Республикаси давлат органлари ва ташкилотлари учун расмий шакл</span>
          </div>
          <span className="font-mono text-slate-500 text-[10px]">
            A4 (210×297 мм) • Times New Roman
          </span>
        </div>
      </div>

      {/* A4 PREVIEW CANVAS CONTAINER */}
      <div className="flex-1 bg-slate-900/60 border border-slate-800 rounded-2xl p-2 sm:p-4 overflow-auto flex justify-center items-start shadow-inner">
        <div 
          className="transition-transform duration-200 origin-top flex flex-col items-center"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            marginBottom: `${(zoom / 100) * 40}px`
          }}
        >
          {/* Printable Element Ref */}
          <div ref={obektivkaRef} id="obektivka-to-print">
            <ObektivkaDocument data={data} page={selectedPage} />
          </div>
        </div>
      </div>
    </div>
  );
}
