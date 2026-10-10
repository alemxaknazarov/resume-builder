import React, { useState } from 'react';
import { 
  User, Briefcase, GraduationCap, FolderGit2, Wrench, Languages, 
  ChevronDown, ChevronUp, Plus, Trash2, Link as LinkIcon, Sparkles, ExternalLink
} from 'lucide-react';

export default function FormPanel({ data, onChange }) {
  const [openSections, setOpenSections] = useState({
    personal: true,
    experience: true,
    projects: false,
    education: false,
    skills: false,
    languages: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Personal data handler
  const handlePersonalChange = (field, value) => {
    onChange({
      ...data,
      personal: {
        ...data.personal,
        [field]: value,
      }
    });
  };

  // Experience handlers
  const addExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: "",
      company: "",
      location: "",
      companyUrl: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      highlights: [""]
    };
    onChange({
      ...data,
      experience: [newExp, ...data.experience]
    });
  };

  const updateExperience = (id, field, value) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const deleteExperience = (id) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addHighlight = (expId) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            highlights: [...(exp.highlights || []), ""]
          };
        }
        return exp;
      })
    });
  };

  const updateHighlight = (expId, index, value) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => {
        if (exp.id === expId) {
          const newH = [...(exp.highlights || [])];
          newH[index] = value;
          return { ...exp, highlights: newH };
        }
        return exp;
      })
    });
  };

  const deleteHighlight = (expId, index) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => {
        if (exp.id === expId) {
          return {
            ...exp,
            highlights: exp.highlights.filter((_, i) => i !== index)
          };
        }
        return exp;
      })
    });
  };

  // Project handlers
  const addProject = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      name: "",
      role: "",
      liveUrl: "",
      githubUrl: "",
      description: "",
      techStack: ""
    };
    onChange({
      ...data,
      projects: [...data.projects, newProj]
    });
  };

  const updateProject = (id, field, value) => {
    onChange({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const deleteProject = (id) => {
    onChange({
      ...data,
      projects: data.projects.filter(p => p.id !== id)
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      degree: "",
      school: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: ""
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (id, field, value) => {
    onChange({
      ...data,
      education: data.education.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const deleteEducation = (id) => {
    onChange({
      ...data,
      education: data.education.filter(e => e.id !== id)
    });
  };

  // Language handlers
  const addLanguage = () => {
    const newLang = {
      id: `lang-${Date.now()}`,
      name: "",
      level: ""
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const updateLanguage = (id, field, value) => {
    onChange({
      ...data,
      languages: data.languages.map(l => l.id === id ? { ...l, [field]: value } : l)
    });
  };

  const deleteLanguage = (id) => {
    onChange({
      ...data,
      languages: data.languages.filter(l => l.id !== id)
    });
  };

  // Skills handlers (tags split by comma)
  const handleSkillsChange = (category, value) => {
    const items = value.split(',').map(s => s.trim()).filter(Boolean);
    onChange({
      ...data,
      skills: {
        ...data.skills,
        [category]: items
      }
    });
  };

  return (
    <div className="space-y-4 pb-20">
      {/* 1. PERSONAL INFORMATION */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm backdrop-blur">
        <button
          onClick={() => toggleSection('personal')}
          className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-100 hover:bg-slate-700/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <User className="w-4 h-4" />
            </span>
            <span>Shaxsiy Ma'lumotlar & Kontaktlar</span>
          </div>
          {openSections.personal ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.personal && (
          <div className="p-4 pt-0 space-y-3.5 border-t border-slate-700/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">To'liq Ism & Familiya</label>
                <input
                  type="text"
                  placeholder="Masalan: Alisher Usmonov"
                  value={data.personal.fullName || ''}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Kasb / Mutaxassislik (Title)</label>
                <input
                  type="text"
                  placeholder="Masalan: Senior Full-Stack Engineer"
                  value={data.personal.jobTitle || ''}
                  onChange={(e) => handlePersonalChange('jobTitle', e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="alisher@example.com"
                  value={data.personal.email || ''}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Telefon</label>
                <input
                  type="text"
                  placeholder="+998 90 123 45 67"
                  value={data.personal.phone || ''}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Manzil (Shahar, Davlat)</label>
                <input
                  type="text"
                  placeholder="Toshkent, O'zbekiston"
                  value={data.personal.location || ''}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Clickable Social & Web Links */}
            <div className="pt-2 border-t border-slate-750">
              <span className="text-xs font-semibold text-blue-400 block mb-2 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5" />
                Interaktiv Havolalar (PDF da bosilganda to'g'ridan-to'g'ri o'tadi)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Shaxsiy Sayt / Portfolio URL</label>
                  <input
                    type="url"
                    placeholder="https://alisher.dev"
                    value={data.personal.website || ''}
                    onChange={(e) => handlePersonalChange('website', e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">GitHub Profili URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={data.personal.github || ''}
                    onChange={(e) => handlePersonalChange('github', e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">LinkedIn Profili URL</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    value={data.personal.linkedin || ''}
                    onChange={(e) => handlePersonalChange('linkedin', e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Telegram URL yoki @username</label>
                  <input
                    type="text"
                    placeholder="https://t.me/username"
                    value={data.personal.telegram || ''}
                    onChange={(e) => handlePersonalChange('telegram', e.target.value)}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Kasbiy Xulosa (Summary / Bio)</label>
              <textarea
                rows={3}
                placeholder="Tajribangiz, kuchli tomonlaringiz va asosiy yutuqlaringiz haqida qisqacha..."
                value={data.personal.summary || ''}
                onChange={(e) => handlePersonalChange('summary', e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* 2. EXPERIENCE */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm backdrop-blur">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-100 hover:bg-slate-700/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Briefcase className="w-4 h-4" />
            </span>
            <span>Ish Tajribasi ({data.experience?.length || 0})</span>
          </div>
          {openSections.experience ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.experience && (
          <div className="p-4 pt-0 space-y-4 border-t border-slate-700/50">
            <div className="pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">Eng oxirgi ish joyingizdan boshlang</span>
              <button
                type="button"
                onClick={addExperience}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Ish joyi qo'shish
              </button>
            </div>

            {data.experience?.map((exp, expIndex) => (
              <div key={exp.id} className="p-3.5 bg-slate-900/80 border border-slate-700 rounded-lg space-y-3 relative group">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-emerald-400">
                    #{expIndex + 1} {exp.role || "Yangi lavozim"}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteExperience(exp.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 rounded transition-colors"
                    title="O'chirish"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Lavozim (Role)</label>
                    <input
                      type="text"
                      placeholder="Masalan: Senior Frontend Engineer"
                      value={exp.role}
                      onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Kompaniya nomi</label>
                    <input
                      type="text"
                      placeholder="Masalan: FinTech Hub"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Kompaniya sayti (Link)</label>
                    <input
                      type="url"
                      placeholder="https://company.uz"
                      value={exp.companyUrl || ''}
                      onChange={(e) => updateExperience(exp.id, 'companyUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Boshlangan yil/oy</label>
                    <input
                      type="text"
                      placeholder="2022"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-medium text-slate-300">Tugagan yil</label>
                      <label className="text-[10px] text-emerald-400 flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current || false}
                          onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-emerald-500"
                        />
                        Hozirgi paytgacha
                      </label>
                    </div>
                    <input
                      type="text"
                      disabled={exp.current}
                      placeholder={exp.current ? "Hozirgacha" : "2024"}
                      value={exp.current ? "Hozirgacha" : exp.endDate}
                      onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white disabled:opacity-50 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Umumiy tavsif</label>
                  <textarea
                    rows={2}
                    placeholder="Kompaniyadagi asosiy missiyangiz..."
                    value={exp.description || ''}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Bullets / Highlights */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-medium text-slate-300">Asosiy yutuqlar (Bullet points)</label>
                    <button
                      type="button"
                      onClick={() => addHighlight(exp.id)}
                      className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Yutuq qo'shish
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {exp.highlights?.map((hl, hIdx) => (
                      <div key={hIdx} className="flex gap-2 items-center">
                        <span className="text-slate-500 text-xs">•</span>
                        <input
                          type="text"
                          placeholder="Masalan: Yuklanish tezligini 40% ga yaxshiladi..."
                          value={hl}
                          onChange={(e) => updateHighlight(exp.id, hIdx, e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-750 rounded px-2.5 py-1 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                        <button
                          type="button"
                          onClick={() => deleteHighlight(exp.id, hIdx)}
                          className="text-slate-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. PROJECTS */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm backdrop-blur">
        <button
          onClick={() => toggleSection('projects')}
          className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-100 hover:bg-slate-700/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <FolderGit2 className="w-4 h-4" />
            </span>
            <span>Loyihalar ({data.projects?.length || 0})</span>
          </div>
          {openSections.projects ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.projects && (
          <div className="p-4 pt-0 space-y-4 border-t border-slate-700/50">
            <div className="pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">Portfolio yoki ochiq manbali loyihalaringiz</span>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Loyiha qo'shish
              </button>
            </div>

            {data.projects?.map((proj, pIdx) => (
              <div key={proj.id} className="p-3.5 bg-slate-900/80 border border-slate-700 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-indigo-400">
                    #{pIdx + 1} {proj.name || "Nomsiz Loyiha"}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteProject(proj.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Loyiha Nomi</label>
                    <input
                      type="text"
                      placeholder="Masalan: DevCollab Web Editor"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Texnologiyalar (Stack)</label>
                    <input
                      type="text"
                      placeholder="React, Node.js, PostgreSQL"
                      value={proj.techStack || ''}
                      onChange={(e) => updateProject(proj.id, 'techStack', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Live Demo Havolasi (URL)</label>
                    <input
                      type="url"
                      placeholder="https://myproject.com"
                      value={proj.liveUrl || ''}
                      onChange={(e) => updateProject(proj.id, 'liveUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">GitHub Havolasi (URL)</label>
                    <input
                      type="url"
                      placeholder="https://github.com/my-project"
                      value={proj.githubUrl || ''}
                      onChange={(e) => updateProject(proj.id, 'githubUrl', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-300 mb-1">Loyiha Tavsifi</label>
                  <textarea
                    rows={2}
                    placeholder="Loyiha nima vazifa bajaradi, uning o'ziga xosligi..."
                    value={proj.description || ''}
                    onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. SKILLS */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm backdrop-blur">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-100 hover:bg-slate-700/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Wrench className="w-4 h-4" />
            </span>
            <span>Ko'nikmalar & Texnologiyalar</span>
          </div>
          {openSections.skills ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.skills && (
          <div className="p-4 pt-0 space-y-3.5 border-t border-slate-700/50">
            <p className="text-xs text-slate-400 pt-3">
              Ko'nikmalarni vergul bilan ajratib yozing (masalan: <code className="text-amber-300 font-mono">React, TypeScript, Next.js</code>)
            </p>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Frontend</label>
              <input
                type="text"
                placeholder="React, Next.js, TypeScript, Tailwind CSS, Redux"
                value={data.skills.frontend?.join(', ') || ''}
                onChange={(e) => handleSkillsChange('frontend', e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Backend & Ma'lumotlar Bazasi</label>
              <input
                type="text"
                placeholder="Node.js, PostgreSQL, Redis, REST API, Prisma"
                value={data.skills.backend?.join(', ') || ''}
                onChange={(e) => handleSkillsChange('backend', e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">DevOps, Asboblar & Boshqa</label>
              <input
                type="text"
                placeholder="Docker, Git, CI/CD, Linux, Figma, Vite"
                value={data.skills.devopsAndTools?.join(', ') || ''}
                onChange={(e) => handleSkillsChange('devopsAndTools', e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-mono text-xs"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. EDUCATION */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm backdrop-blur">
        <button
          onClick={() => toggleSection('education')}
          className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-100 hover:bg-slate-700/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span>Ta'lim ({data.education?.length || 0})</span>
          </div>
          {openSections.education ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.education && (
          <div className="p-4 pt-0 space-y-4 border-t border-slate-700/50">
            <div className="pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">Universitet, kollej yoki diplomlar</span>
              <button
                type="button"
                onClick={addEducation}
                className="inline-flex items-center gap-1.5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Ta'lim qo'shish
              </button>
            </div>

            {data.education?.map((edu, eIdx) => (
              <div key={edu.id} className="p-3.5 bg-slate-900/80 border border-slate-700 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-sky-400">
                    #{eIdx + 1} {edu.degree || "Mutaxassislik"}
                  </span>
                  <button
                    type="button"
                    onClick={() => deleteEducation(edu.id)}
                    className="text-slate-400 hover:text-rose-400 p-1 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Daraja / Yo'nalish</label>
                    <input
                      type="text"
                      placeholder="Kompyuter Injiniringi (BSc)"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Universitet / O'quv yurti</label>
                    <input
                      type="text"
                      placeholder="TATU, INHA, WIUT..."
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Shahar</label>
                    <input
                      type="text"
                      placeholder="Toshkent"
                      value={edu.location || ''}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Boshlangan yil</label>
                    <input
                      type="text"
                      placeholder="2018"
                      value={edu.startDate || ''}
                      onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Tugagan yil</label>
                    <input
                      type="text"
                      placeholder="2022"
                      value={edu.endDate || ''}
                      onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">GPA / Baho</label>
                    <input
                      type="text"
                      placeholder="4.8 / 5.0"
                      value={edu.gpa || ''}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-sky-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. LANGUAGES */}
      <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl overflow-hidden shadow-sm backdrop-blur">
        <button
          onClick={() => toggleSection('languages')}
          className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-100 hover:bg-slate-700/40 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400">
              <Languages className="w-4 h-4" />
            </span>
            <span>Tillar ({data.languages?.length || 0})</span>
          </div>
          {openSections.languages ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {openSections.languages && (
          <div className="p-4 pt-0 space-y-3.5 border-t border-slate-700/50">
            <div className="pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">Biladigan tillaringiz va darajangiz</span>
              <button
                type="button"
                onClick={addLanguage}
                className="inline-flex items-center gap-1.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                Til qo'shish
              </button>
            </div>

            <div className="space-y-2.5">
              {data.languages?.map((lang) => (
                <div key={lang.id} className="flex gap-2 items-center bg-slate-900/80 p-2 rounded-lg border border-slate-700">
                  <input
                    type="text"
                    placeholder="Til nomi (Ingliz tili)"
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Daraja (IELTS 7.5, C1)"
                    value={lang.level}
                    onChange={(e) => updateLanguage(lang.id, 'level', e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-750 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => deleteLanguage(lang.id)}
                    className="text-slate-400 hover:text-rose-400 p-1.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
