import React, { useState } from 'react';
import { Download, Check, Printer, X, FileDown, Loader2 } from 'lucide-react';
import { 
  downloadDirectPdf, 
  printVectorPdf, 
  downloadDirectObektivkaPdf, 
  printObektivkaPdf 
} from '../utils/pdfExport';

export default function ExportModal({ 
  isOpen, 
  onClose, 
  docType = 'resume',
  fullName, 
  resumeRef, 
  obektivkaRef,
  onPrint 
}) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const isObektivka = docType === 'obektivka';
  const targetRef = isObektivka ? obektivkaRef : resumeRef;

  // 1. High-DPI Vector Print dialog via isolated iframe
  const handleVectorPrint = () => {
    onClose();
    setTimeout(() => {
      if (targetRef?.current) {
        if (isObektivka) {
          printObektivkaPdf(targetRef.current, fullName);
        } else {
          printVectorPdf(targetRef.current, fullName);
        }
      } else if (onPrint) {
        onPrint();
      }
    }, 150);
  };

  // 2. Direct one-click download using WYSIWYG html-to-image + jsPDF engine
  const handleDirectDownload = async () => {
    setIsGenerating(true);
    try {
      if (!targetRef?.current) {
        handleVectorPrint();
        return;
      }

      if (isObektivka) {
        await downloadDirectObektivkaPdf(targetRef.current, fullName);
      } else {
        await downloadDirectPdf(targetRef.current, fullName);
      }
      onClose();
    } catch (err) {
      console.error('Direct PDF error, falling back to print:', err);
      handleVectorPrint();
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm no-print">
      <div className="bg-slate-900 border border-slate-750 w-full max-w-lg rounded-2xl p-4 sm:p-6 shadow-2xl relative animate-in fade-in duration-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isObektivka ? "Маълумотнома (Объективка) PDF" : "PDF Yuklab Olish"}
            </h3>
            <p className="text-xs text-slate-400">
              {isObektivka 
                ? "Ўзбекистон давлат хизмати андозасида 2 саҳифали расмий А4 шакл"
                : "Siljishlarsiz, to'liq A4 formatda va ishlaydigan havolalar bilan"}
            </p>
          </div>
        </div>

        {/* DUAL OPTIONS BOX */}
        <div className="space-y-3 mb-5">
          {/* OPTION 1: Vector Print dialog */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Printer className="w-4 h-4 text-emerald-400" />
                    Vektor PDF (Tavsiya etiladi — 100% Aniq & Tiniq)
                  </span>
                  <span className="text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                    300+ DPI
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {isObektivka
                    ? "Brauzerning toza vektor dvigateli orqali: 2 ta sahifa to'liq, jadvallar va fotosurat kristall tiniq chiqadi."
                    : "Brauzerning toza vektor dvigateli orqali: hech qanday siljish bo'lmaydi, harflar va chiziqlar kristall tiniq chiqadi."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleVectorPrint}
              className="mt-3 w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Chop etish / PDF Saqlash ("Save as PDF")</span>
            </button>
          </div>

          {/* OPTION 2: Direct 1-click Download */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5 mb-1">
                  <FileDown className="w-4 h-4 text-blue-400" />
                  To'g'ridan-to'g'ri .pdf Yuklash (1-bosishda)
                </span>
                <p className="text-xs text-slate-400">
                  {isObektivka
                    ? "Brauzer dialogisiz 2 sahifali tayyor .pdf faylni darhol kompyuteringizga yuklab olish."
                    : "Brauzer dialogisiz faylni darhol kompyuteringizga yuklab olish."}
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={isGenerating}
              onClick={handleDirectDownload}
              className="mt-3 w-full py-2 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:bg-slate-850 text-slate-200 border border-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span>PDF tayyorlanmoqda...</span>
                </>
              ) : (
                <>
                  <FileDown className="w-4 h-4" />
                  <span>To'g'ridan-to'g'ri Yuklab Olish</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 justify-center">
          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>
            {isObektivka
              ? "2 ta sahifa, 3x4 surat, mehnat faoliyati va qarindoshlar jadvali 100% to'liq chiqadi!"
              : "Ism-familiya, chiziqlar va barcha havolalar 100% to'liq chiqadi!"}
          </span>
        </div>
      </div>
    </div>
  );
}
