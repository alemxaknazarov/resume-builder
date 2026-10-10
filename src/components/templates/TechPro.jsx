import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Terminal, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '../Icons';

export default function TechPro({ data }) {
  const { personal, experience, education, projects, skills, languages, customization } = data;
  const accent = customization?.accentColor || '#0284c7';

  return (
    <div className="resume-paper bg-white text-slate-800 font-sans min-h-full">
      {/* HEADER */}
      <header className="border-b-2 pb-4 mb-5" style={{ borderColor: accent }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded text-white" style={{ backgroundColor: accent }}>
                <Terminal className="w-4 h-4" />
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight">
                {personal.fullName || "Ism Familiya"}
              </h1>
            </div>
            <p className="text-base font-semibold text-slate-600">
              {personal.jobTitle || "Dasturchi / Mutaxassis"}
            </p>
          </div>

          {/* Quick contact pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {personal.email && (
              <a 
                href={`mailto:${personal.email}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded icon-link gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span>{personal.email}</span>
              </a>
            )}
            {personal.phone && (
              <a 
                href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded icon-link gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span>{personal.phone}</span>
              </a>
            )}
            {personal.location && (
              <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded icon-link gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-500" />
                <span>{personal.location}</span>
              </span>
            )}
          </div>
        </div>

        {/* Technical Social Links Row */}
        <div className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
          {personal.github && (
            <a 
              href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-link gap-1.5 font-mono font-medium hover:underline"
              style={{ color: accent }}
            >
              <GithubIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{personal.github.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personal.website && (
            <a 
              href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-link gap-1.5 font-mono font-medium hover:underline"
              style={{ color: accent }}
            >
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personal.linkedin && (
            <a 
              href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-link gap-1.5 font-mono font-medium hover:underline"
              style={{ color: accent }}
            >
              <LinkedinIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{personal.linkedin.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personal.telegram && (
            <a 
              href={personal.telegram.startsWith('http') ? personal.telegram : `https://t.me/${personal.telegram.replace('@', '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="icon-link gap-1.5 font-mono font-medium hover:underline"
              style={{ color: accent }}
            >
              <TelegramIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{personal.telegram.replace(/^https?:\/\/t\.me\//, '@')}</span>
            </a>
          )}
        </div>
      </header>

      {/* 2-COLUMN TECHNICAL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* MAIN COLUMN (8 cols): Summary, Experience, Projects */}
        <div className="md:col-span-8 space-y-5">
          {personal.summary && (
            <section className="avoid-break">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-3 rounded-full" style={{ backgroundColor: accent }}></span>
                Kasbiy Xulosa
              </h2>
              <p className="text-xs leading-relaxed text-slate-700 bg-slate-50 p-2.5 rounded border border-slate-100">
                {personal.summary}
              </p>
            </section>
          )}

          {/* EXPERIENCE */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-3">
                <span className="w-1.5 h-3 rounded-full" style={{ backgroundColor: accent }}></span>
                Tajriba & Mas'uliyatlar
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="avoid-break border-l-2 pl-3 relative" style={{ borderColor: `${accent}40` }}>
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <div className="font-bold text-sm text-slate-950">
                        {exp.role}
                      </div>
                      <span className="text-[11px] font-mono text-slate-500">
                        {exp.startDate} - {exp.current ? 'Hozir' : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-600 mb-1">
                      {exp.companyUrl ? (
                        <a 
                          href={exp.companyUrl.startsWith('http') ? exp.companyUrl : `https://${exp.companyUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline inline-flex items-center gap-1 font-semibold"
                          style={{ color: accent }}
                        >
                          {exp.company}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                      {exp.location && <span className="text-slate-400"> • {exp.location}</span>}
                    </div>

                    {exp.description && (
                      <p className="text-xs text-slate-700 leading-relaxed mb-1.5">
                        {exp.description}
                      </p>
                    )}

                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-600 list-disc list-outside pl-4">
                        {exp.highlights.filter(Boolean).map((h, i) => (
                          <li key={i} className="leading-snug">{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* PROJECTS */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5 mb-3">
                <span className="w-1.5 h-3 rounded-full" style={{ backgroundColor: accent }}></span>
                Asosiy Loyihalar
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="avoid-break p-3 rounded-lg border border-slate-200 bg-white shadow-xs">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-slate-400" />
                        {proj.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs">
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium hover:underline inline-flex items-center gap-0.5 text-[11px]"
                            style={{ color: accent }}
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a 
                            href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-600 hover:text-slate-950 inline-flex items-center gap-0.5 text-[11px]"
                          >
                            <GithubIcon className="w-2.5 h-2.5" />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                    {proj.description && (
                      <p className="text-xs text-slate-600 mt-1 leading-snug">{proj.description}</p>
                    )}
                    {proj.techStack && (
                      <div className="mt-2 text-[10px] font-mono text-slate-700 bg-slate-50 px-2 py-1 rounded inline-block">
                        <strong>Stack:</strong> {proj.techStack}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* SIDEBAR COLUMN (4 cols): Skills, Education, Languages */}
        <div className="md:col-span-4 space-y-5">
          {/* SKILLS */}
          {skills && (
            <section className="avoid-break bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                Texnik Ko'nikmalar
              </h2>
              
              {skills.frontend && skills.frontend.length > 0 && (
                <div className="mb-3">
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5">Frontend</div>
                  <div className="flex flex-wrap gap-1">
                    {skills.frontend.map((s, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10px] font-mono px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.backend && skills.backend.length > 0 && (
                <div className="mb-3">
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5">Backend & DB</div>
                  <div className="flex flex-wrap gap-1">
                    {skills.backend.map((s, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10px] font-mono px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.devopsAndTools && skills.devopsAndTools.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5">DevOps & Asboblar</div>
                  <div className="flex flex-wrap gap-1">
                    {skills.devopsAndTools.map((s, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10px] font-mono px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* EDUCATION */}
          {education && education.length > 0 && (
            <section className="avoid-break bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                Ta'lim
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-700 font-medium">{edu.school}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {languages && languages.length > 0 && (
            <section className="avoid-break bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Tillar
              </h2>
              <div className="space-y-1.5 text-xs">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between items-center text-[11px]">
                    <span className="font-medium text-slate-800">{l.name}</span>
                    <span className="text-slate-500">{l.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
