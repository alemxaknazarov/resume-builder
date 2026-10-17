import React, { useState, useRef } from 'react';
import { 
  User, Briefcase, GraduationCap, Award, Users, ChevronDown, ChevronUp, 
  Plus, Trash2, Upload, RotateCcw, Image, Sparkles
} from 'lucide-react';
import { sampleObektivkaData, emptyObektivkaData } from '../../data/obektivkaData';

const COMMON_RELATIONS = [
  'Отаси',
  'Онаси',
  'Турмуш ўртоғи',
  'Ўғли',
  'Қизи',
  'Акаси',
  'Укаси',
  'Опаси',
  'Синглиси',
  'Қайнотаси',
  'Қайнонаси',
];

export default function ObektivkaFormPanel({ data, onChange }) {
  const [openSections, setOpenSections] = useState({
    personal: true,
    position: true,
    education: false,
    additional: false,
    workHistory: true,
    relatives: true,
  });

  const fileInputRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Personal field change
  const handlePersonalChange = (field, value) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      }
    });
  };

  // 3x4 Photo upload via FileReader
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert("Iltimos, faqat rasm faylini tanlang (JPEG, PNG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Rasm hajmi 5MB dan oshmasligi kerak.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (typeof base64Url === 'string') {
        handlePersonalChange('photoUrl', base64Url);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    handlePersonalChange('photoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Work History Handlers
  const addWorkHistory = () => {
    const newEntry = {
      id: `wh-${Date.now()}`,
      period: '2025 й. - ҳ.в.',
      description: ''
    };
    onChange({
      ...data,
      workHistory: [...(data.workHistory || []), newEntry]
    });
  };

  const updateWorkHistory = (id, field, value) => {
    onChange({
      ...data,
      workHistory: (data.workHistory || []).map(wh => 
        wh.id === id ? { ...wh, [field]: value } : wh
      )
    });
  };

  const deleteWorkHistory = (id) => {
    onChange({
      ...data,
      workHistory: (data.workHistory || []).filter(wh => wh.id !== id)
    });
  };

  // Relatives Handlers
  const addRelative = () => {
    const newRel = {
      id: `rel-${Date.now()}`,
      relation: 'Отаси',
      fullName: '',
      birthInfo: '',
      workInfo: '',
      address: ''
    };
    onChange({
      ...data,
      relatives: [...(data.relatives || []), newRel]
    });
  };

  const updateRelative = (id, field, value) => {
    onChange({
      ...data,
      relatives: (data.relatives || []).map(rel => 
        rel.id === id ? { ...rel, [field]: value } : rel
      )
    });
  };

  const deleteRelative = (id) => {
    onChange({
      ...data,
      relatives: (data.relatives || []).filter(rel => rel.id !== id)
    });
  };

  const handleResetSample = () => {
    if (window.confirm("Namuna ma'lumotlarini qayta yuklamoqchimisiz?")) {
      onChange(sampleObektivkaData);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Barcha ma'lumotlarni tozalab, bo'sh ma'lumotnomadan boshlamoqchimisiz?")) {
      onChange(emptyObektivkaData);
    }
  };

  const personal = data.personal || {};

  return (
    <div className="space-y-4 pb-12">
      {/* Tezkor amallar */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ma'lumotnoma (Obektivka) Formasi</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleResetSample}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1 transition-colors"
            title="Namuna ma'lumotlarini yuklash"
          >
            <RotateCcw className="w-3 h-3 text-blue-400" />
            <span>Namuna</span>
          </button>
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 hover:border-rose-900/40 flex items-center gap-1 transition-colors"
            title="Barchasini tozalash"
          >
            <Trash2 className="w-3 h-3" />
            <span>Tozalash</span>
          </button>
        </div>
      </div>

      {/* 1. SHAXSIY MA'LUMOTLAR VA 3x4 SURAT */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('personal')}
          className="w-full px-4 py-3 bg-slate-850 hover:bg-slate-800/90 flex items-center justify-between transition-colors border-b border-slate-800/60"
        >
          <div className="flex items-center gap-2.5">
            <User className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-sm text-white">1. Shaxsiy ma'lumotlar & 3x4 Rasm</span>
          </div>
          {openSections.personal ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.personal && (
          <div className="p-4 space-y-4">
            {/* 3x4 Rasm yuklash bloki */}
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-3.5">
              <div className="w-[28mm] h-[37mm] rounded-lg border border-slate-700 bg-slate-900 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                {personal.photoUrl ? (
                  <img src={personal.photoUrl} alt="3x4 Rasm" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-2 text-slate-500">
                    <Image className="w-6 h-6 mx-auto mb-1 opacity-50" />
                    <span className="text-[10px] block font-mono">3x4 Rasm</span>
                  </div>
                )}
              </div>
              <div className="flex-1 w-full space-y-2">
                <p className="text-xs font-semibold text-slate-200">
                  Rasmiy 3x4 o'lchamdagi fotosurat
                </p>
                <p className="text-[11px] text-slate-400">
                  Faylni qurilmangizdan yuklang (JPG/PNG). Rasm avtomatik 3x4 ramkaga joylashtiriladi.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="obektivka-photo-upload"
                  />
                  <label
                    htmlFor="obektivka-photo-upload"
                    className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Rasm yuklash</span>
                  </label>
                  {personal.photoUrl && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>O'chirish</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* F.I.Sh */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Familiyasi, ismi va sharifi (F.I.Sh)
              </label>
              <input
                type="text"
                placeholder="Раҳимов Жасур Анвар ўғли"
                value={personal.fullName || ''}
                onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Туғилган йили ва санаси
                </label>
                <input
                  type="text"
                  placeholder="12.04.1996"
                  value={personal.birthDate || ''}
                  onChange={(e) => handlePersonalChange('birthDate', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Миллати
                </label>
                <input
                  type="text"
                  placeholder="ўзбек"
                  value={personal.nationality || ''}
                  onChange={(e) => handlePersonalChange('nationality', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Туғилган жойи (вилоят, туман, шаҳар)
              </label>
              <input
                type="text"
                placeholder="Тошкент шаҳри, Юнусобод тумани"
                value={personal.birthPlace || ''}
                onChange={(e) => handlePersonalChange('birthPlace', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Партиявийлиги
              </label>
              <input
                type="text"
                placeholder="партиясиз"
                value={personal.party || ''}
                onChange={(e) => handlePersonalChange('party', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. HOZIRGI ISH JOYI VA LAVOZIMI */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('position')}
          className="w-full px-4 py-3 bg-slate-850 hover:bg-slate-800/90 flex items-center justify-between transition-colors border-b border-slate-800/60"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-sm text-white">2. Hozirgi lavozim & Ish joyi</span>
          </div>
          {openSections.position ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.position && (
          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Қайси санадан эгаллаб турибди (сана / йил)
              </label>
              <input
                type="text"
                placeholder="2025 йил 15 мартдан:"
                value={personal.currentPositionDate || ''}
                onChange={(e) => handlePersonalChange('currentPositionDate', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Ҳозирги тўлиқ лавозими ва ташкилот номи
              </label>
              <textarea
                rows={3}
                placeholder="Ўзбекистон Республикаси Рақамли технологиялар вазирлиги ҳузуридаги Рақамли ҳукумат маркази Бош мутахассиси"
                value={personal.currentPosition || ''}
                onChange={(e) => handlePersonalChange('currentPosition', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. TA'LIM VA MUTAXASSISLIK */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('education')}
          className="w-full px-4 py-3 bg-slate-850 hover:bg-slate-800/90 flex items-center justify-between transition-colors border-b border-slate-800/60"
        >
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-sm text-white">3. Ma'lumoti & Mutaxassisligi</span>
          </div>
          {openSections.education ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.education && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Маълумоти
                </label>
                <input
                  type="text"
                  placeholder="олий"
                  value={personal.education || ''}
                  onChange={(e) => handlePersonalChange('education', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Тамомлаган (йил ва таълим муассасаси)
                </label>
                <input
                  type="text"
                  placeholder="2019 йил, Тошкент ахборот технологиялари университети"
                  value={personal.graduated || ''}
                  onChange={(e) => handlePersonalChange('graduated', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Маълумоти бўйича мутахассислиги
              </label>
              <input
                type="text"
                placeholder="Ахборот хавфсизлиги ва дастурий инжиниринг"
                value={personal.specialization || ''}
                onChange={(e) => handlePersonalChange('specialization', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Илмий даражаси
                </label>
                <input
                  type="text"
                  placeholder="йўқ"
                  value={personal.academicDegree || ''}
                  onChange={(e) => handlePersonalChange('academicDegree', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Илмий унвони
                </label>
                <input
                  type="text"
                  placeholder="йўқ"
                  value={personal.academicTitle || ''}
                  onChange={(e) => handlePersonalChange('academicTitle', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. QO'SHIMCHA MA'LUMOTLAR */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('additional')}
          className="w-full px-4 py-3 bg-slate-850 hover:bg-slate-800/90 flex items-center justify-between transition-colors border-b border-slate-800/60"
        >
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-sm text-white">4. Chet tillari & Unvonlar</span>
          </div>
          {openSections.additional ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.additional && (
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Қайси чет тилларини билади
                </label>
                <input
                  type="text"
                  placeholder="ўзбек, рус, инглиз тиллари"
                  value={personal.languages || ''}
                  onChange={(e) => handlePersonalChange('languages', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Ҳарбий (махсус) унвони
                </label>
                <input
                  type="text"
                  placeholder="оддий аскар (захирадаги)"
                  value={personal.militaryRank || ''}
                  onChange={(e) => handlePersonalChange('militaryRank', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Давлат мукофотлари билан тақдирланганми (қанақа)
              </label>
              <input
                type="text"
                placeholder="йўқ"
                value={personal.awards || ''}
                onChange={(e) => handlePersonalChange('awards', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Халқ депутатлари кенгаши ёки сайланадиган органлар аъзосими
              </label>
              <input
                type="text"
                placeholder="йўқ"
                value={personal.deputy || ''}
                onChange={(e) => handlePersonalChange('deputy', e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. MEHNAT FAOLIYATI */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('workHistory')}
          className="w-full px-4 py-3 bg-slate-850 hover:bg-slate-800/90 flex items-center justify-between transition-colors border-b border-slate-800/60"
        >
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span className="font-semibold text-sm text-white">
              5. Меҳнат фаолияти ({data.workHistory?.length || 0})
            </span>
          </div>
          {openSections.workHistory ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.workHistory && (
          <div className="p-4 space-y-3">
            <p className="text-[11px] text-slate-400 mb-2">
              Хронологик тартибда илк иш фаолиятингиздан ҳозирги кунгача бўлган лавозимларни киритинг:
            </p>

            {(data.workHistory || []).map((wh, idx) => (
              <div key={wh.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 relative group">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    #{idx + 1} Босқич
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteWorkHistory(wh.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded-md hover:bg-slate-800 transition-colors"
                    title="Ўчириш"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Давр (йиллар)
                    </label>
                    <input
                      type="text"
                      placeholder="2019 - 2021 йй."
                      value={wh.period}
                      onChange={(e) => updateWorkHistory(wh.id, 'period', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 font-mono"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-medium text-slate-400 mb-1">
                      Иш жойи ва лавозими
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Корхона/ташкилот номи ҳамда эгаллаган лавозими"
                      value={wh.description}
                      onChange={(e) => updateWorkHistory(wh.id, 'description', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500 leading-snug resize-none"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addWorkHistory}
              className="w-full py-2 border-2 border-dashed border-slate-700 hover:border-sky-500/60 rounded-xl text-xs font-semibold text-slate-300 hover:text-sky-300 hover:bg-sky-500/5 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Янги меҳнат босқичини қўшиш</span>
            </button>
          </div>
        )}
      </div>

      {/* 6. YAQIN QARINDOSHLAR (2-SAHIFA) */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl overflow-hidden transition-all">
        <button
          type="button"
          onClick={() => toggleSection('relatives')}
          className="w-full px-4 py-3 bg-slate-850 hover:bg-slate-800/90 flex items-center justify-between transition-colors border-b border-slate-800/60"
        >
          <div className="flex items-center gap-2.5">
            <Users className="w-4 h-4 text-purple-400" />
            <span className="font-semibold text-sm text-white">
              6. Яқин қариндошлар (2-саҳифа) ({data.relatives?.length || 0})
            </span>
          </div>
          {openSections.relatives ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.relatives && (
          <div className="p-4 space-y-3">
            <p className="text-[11px] text-slate-400 mb-2">
              Ота-она, турмуш ўртоғи, фарзандлар, ака-ука ва опа-сингиллар маълумотлари (расмий 5 та устун):
            </p>

            {(data.relatives || []).map((rel, idx) => (
              <div key={rel.id} className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2.5 relative">
                <div className="flex items-center justify-between gap-2 border-b border-slate-800/70 pb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase">
                      #{idx + 1}
                    </span>
                    <select
                      value={rel.relation}
                      onChange={(e) => updateRelative(rel.id, 'relation', e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded-md px-2 py-1 text-xs text-white font-semibold focus:outline-none focus:border-purple-500"
                    >
                      {COMMON_RELATIONS.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteRelative(rel.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 rounded-md hover:bg-slate-800 transition-colors"
                    title="Қариндошни ўчириш"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-0.5">
                    Фамилияси, исми ва отасининг исми (Ф.И.О.)
                  </label>
                  <input
                    type="text"
                    placeholder="Раҳимов Анвар Исмоилович"
                    value={rel.fullName}
                    onChange={(e) => updateRelative(rel.id, 'fullName', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-0.5">
                      Туғилган йили ва жойи
                    </label>
                    <input
                      type="text"
                      placeholder="1968 йил, Тошкент вилояти..."
                      value={rel.birthInfo}
                      onChange={(e) => updateRelative(rel.id, 'birthInfo', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-400 mb-0.5">
                      Иш жойи ва лавозими
                    </label>
                    <input
                      type="text"
                      placeholder="Корхона ва лавозими (ёки пенсионер / талаба)"
                      value={rel.workInfo}
                      onChange={(e) => updateRelative(rel.id, 'workInfo', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-0.5">
                    Яшаш жойи (манзили)
                  </label>
                  <input
                    type="text"
                    placeholder="Тошкент шаҳри, Юнусобод тумани..."
                    value={rel.address}
                    onChange={(e) => updateRelative(rel.id, 'address', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addRelative}
              className="w-full py-2 border-2 border-dashed border-slate-700 hover:border-purple-500/60 rounded-xl text-xs font-semibold text-slate-300 hover:text-purple-300 hover:bg-purple-500/5 transition-all flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Янги қариндош қўшиш</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
