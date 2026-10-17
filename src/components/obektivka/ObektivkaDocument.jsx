import React from 'react';
import { User } from 'lucide-react';

export default function ObektivkaDocument({ data, page = 'all' }) {
  const { personal = {}, workHistory = [], relatives = [] } = data || {};

  return (
    <div className="flex flex-col gap-8 print:gap-0 print:block">
      {/* PAGE 1: ASOSIY MA'LUMOTLAR VA MEHNAT FAOLIYATI */}
      {(page === 'all' || page === '1') && (
        <div 
          className="resume-paper bg-white text-black shadow-2xl print:shadow-none print:m-0 print:border-none"
          style={{
            fontFamily: "'Times New Roman', Times, 'Nimbus Roman No9 L', serif",
            width: '210mm',
            minHeight: '297mm',
            padding: '12mm 15mm',
            boxSizing: 'border-box',
            pageBreakAfter: 'always',
            breakAfter: 'page',
          }}
        >
          {/* Sarlavha */}
          <div className="text-center mb-2">
            <h1 className="font-bold text-[15px] uppercase tracking-wider text-black">
              МАЪЛУМОТНОМА
            </h1>
            <h2 className="font-bold text-[13.5px] uppercase text-black mt-1">
              {personal.fullName || "ФАМИЛИЯСИ ИСМИ ШАРИФИ"}
            </h2>
          </div>

          {/* Hozirgi lavozim bloki va 3x4 rasm */}
          <div className="flex gap-4 items-start justify-between border-t border-black pt-2 pb-2">
            <div className="flex-1 pr-2 text-[11px] leading-snug">
              <p className="font-bold text-black mb-1">
                {personal.currentPositionDate || "2025 йилдан:"}
              </p>
              <p className="font-bold text-black text-justify leading-tight">
                {personal.currentPosition || "Ҳозирги иш жойи ва эгаллаб турган лавозими"}
              </p>
            </div>

            {/* 3x4 Surat ramkasi */}
            <div className="w-[30mm] h-[40mm] min-w-[30mm] border border-black bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
              {personal.photoUrl ? (
                <img 
                  src={personal.photoUrl} 
                  alt={personal.fullName || "3x4 surat"} 
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                  <User className="w-8 h-8 opacity-40 mb-1" />
                  <span className="text-[9px] font-sans text-slate-500">3x4 Расм</span>
                </div>
              )}
            </div>
          </div>

          {/* Shaxsiy Ma'lumotlar Jadvali */}
          <table className="w-full border-collapse border border-black text-[10.5px] leading-tight mb-2">
            <tbody>
              {/* 1-qator */}
              <tr>
                <td className="border border-black p-1.5 w-1/2 align-top">
                  <span className="font-bold block text-black">Туғилган йили:</span>
                  <span className="text-black">{personal.birthDate || "-"}</span>
                </td>
                <td className="border border-black p-1.5 w-1/2 align-top">
                  <span className="font-bold block text-black">Туғилган жойи:</span>
                  <span className="text-black">{personal.birthPlace || "-"}</span>
                </td>
              </tr>

              {/* 2-qator */}
              <tr>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Миллати:</span>
                  <span className="text-black">{personal.nationality || "ўзбек"}</span>
                </td>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Партиявийлиги:</span>
                  <span className="text-black">{personal.party || "партиясиз"}</span>
                </td>
              </tr>

              {/* 3-qator */}
              <tr>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Маълумоти:</span>
                  <span className="text-black">{personal.education || "олий"}</span>
                </td>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Тамомлаган:</span>
                  <span className="text-black">{personal.graduated || "-"}</span>
                </td>
              </tr>

              {/* 4-qator: Mutaxassislik (to'liq kenglikda) */}
              <tr>
                <td colSpan={2} className="border border-black p-1.5 align-top">
                  <span className="font-bold text-black">Маълумоти бўйича мутахассислиги: </span>
                  <span className="text-black">{personal.specialization || "-"}</span>
                </td>
              </tr>

              {/* 5-qator: Ilmiy daraja va unvon */}
              <tr>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Илмий даражаси:</span>
                  <span className="text-black">{personal.academicDegree || "йўқ"}</span>
                </td>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Илмий унвони:</span>
                  <span className="text-black">{personal.academicTitle || "йўқ"}</span>
                </td>
              </tr>

              {/* 6-qator: Chet tillari va Harbiy unvon */}
              <tr>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Қайси чет тилларини билади:</span>
                  <span className="text-black">{personal.languages || "-"}</span>
                </td>
                <td className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Ҳарбий (махсус) унвони:</span>
                  <span className="text-black">{personal.militaryRank || "йўқ"}</span>
                </td>
              </tr>

              {/* 7-qator: Davlat mukofotlari */}
              <tr>
                <td colSpan={2} className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">Давлат мукофотлари билан тақдирланганми (қанақа):</span>
                  <span className="text-black">{personal.awards || "йўқ"}</span>
                </td>
              </tr>

              {/* 8-qator: Deputatligi */}
              <tr>
                <td colSpan={2} className="border border-black p-1.5 align-top">
                  <span className="font-bold block text-black">
                    Халқ депутатлари республика, вилоят, шаҳар ва туман Кенгаши депутатими ёки бошқа сайланадиган органларнинг аъзосими:
                  </span>
                  <span className="text-black">{personal.deputy || "йўқ"}</span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* MEHNAT FAOLIYATI */}
          <div className="mt-3">
            <h3 className="text-center font-bold text-xs uppercase mb-1.5 tracking-wider text-black">
              МЕҲНАТ ФАОЛИЯТИ:
            </h3>

            <table className="w-full border-collapse border border-black text-[10.5px] leading-snug">
              <tbody>
                {workHistory && workHistory.length > 0 ? (
                  workHistory.map((wh) => (
                    <tr key={wh.id} className="border-b border-black">
                      <td className="border-r border-black p-1.5 w-[28%] font-semibold align-top text-black whitespace-nowrap">
                        {wh.period}
                      </td>
                      <td className="p-1.5 w-[72%] align-top text-black text-justify">
                        {wh.description}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="p-3 text-center text-slate-400 italic">
                      Меҳнат фаолияти киритилмаган
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAGE 2: YAQIN QARINDOSHLARI HAQIDA MA'LUMOT */}
      {(page === 'all' || page === '2') && (
        <div 
          className="resume-paper bg-white text-black shadow-2xl print:shadow-none print:m-0 print:border-none"
          style={{
            fontFamily: "'Times New Roman', Times, 'Nimbus Roman No9 L', serif",
            width: '210mm',
            minHeight: '297mm',
            padding: '12mm 15mm',
            boxSizing: 'border-box',
            pageBreakBefore: 'always',
            breakBefore: 'page',
          }}
        >
          {/* Sarlavha */}
          <div className="text-center mb-4">
            <h2 className="font-bold text-[12.5px] uppercase text-black">
              {personal.fullName || "ФАМИЛИЯСИ ИСМИ ШАРИФИ"}нинг яқин қариндошлари ҳақида
            </h2>
            <h1 className="font-bold text-[15px] uppercase tracking-wider text-black mt-1">
              МАЪЛУМОТ
            </h1>
          </div>

          {/* Qarindoshlar 5 ustunli rasmiy jadvali */}
          <table className="w-full border-collapse border border-black text-[10.5px] leading-tight">
            <thead>
              <tr className="bg-slate-100/70 border-b border-black text-black">
                <th className="border border-black p-1.5 text-center font-bold w-[12%]">
                  Қариндошлиги
                </th>
                <th className="border border-black p-1.5 text-center font-bold w-[23%]">
                  Фамилияси, исми ва отасининг исми
                </th>
                <th className="border border-black p-1.5 text-center font-bold w-[22%]">
                  Туғилган йили ва жойи
                </th>
                <th className="border border-black p-1.5 text-center font-bold w-[23%]">
                  Иш жойи ва лавозими
                </th>
                <th className="border border-black p-1.5 text-center font-bold w-[20%]">
                  Яшаш жойи
                </th>
              </tr>
            </thead>
            <tbody>
              {relatives && relatives.length > 0 ? (
                relatives.map((rel) => (
                  <tr key={rel.id} className="border-b border-black">
                    <td className="border border-black p-1.5 font-bold text-center align-top text-black">
                      {rel.relation}
                    </td>
                    <td className="border border-black p-1.5 align-top text-black">
                      {rel.fullName}
                    </td>
                    <td className="border border-black p-1.5 align-top text-black">
                      {rel.birthInfo}
                    </td>
                    <td className="border border-black p-1.5 align-top text-black">
                      {rel.workInfo}
                    </td>
                    <td className="border border-black p-1.5 align-top text-black">
                      {rel.address}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-slate-400 italic">
                    Қариндошлар ҳақида маълумот киритилмаган
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
