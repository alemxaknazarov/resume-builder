import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Send, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '../Icons';

export default function CreativeDesigner({ data }) {
  const { personal, experience, education, projects, skills, languages, customization } = data;
  const accent = customization?.accentColor || '#7c3aed'; // violet/purple default

  return (
    <div className="resume-paper bg-white text-slate-800 font-sans min-h-full">
      {/* CREATIVE TOP HERO */}
      <header className="relative pb-5 mb-5 border-b border-slate-200">
        <div className="flex flex-col gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold mb-2" style={{ backgroundColor: `${accent}15`, color: accent }}>
              <Sparkles className="w-3 h-3" />
              <span>{personal.jobTitle || "Dizayner / Mutaxassis"}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {personal.fullName || "Ism Familiya"}
            </h1>
          </div>

          {/* Social Links Chips — full width row, never wraps on A4 */}
          <div className="flex flex-wrap items-center gap-1.5">
            {personal.website && (
              <a
                href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full border border-slate-200 icon-link gap-1 transition-colors font-medium text-[10.5px] shrink-0"
                style={{ color: accent }}
              >
                <Globe className="w-3 h-3 shrink-0" />
                <span>Portfolio</span>
              </a>
            )}
            {personal.github && (
              <a
                href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full border border-slate-200 icon-link gap-1 text-slate-700 transition-colors text-[10.5px] shrink-0"
              >
                <GithubIcon className="w-3 h-3 shrink-0" />
                <span>GitHub / Dribbble</span>
              </a>
            )}
            {personal.linkedin && (
              <a
                href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full border border-slate-200 icon-link gap-1 text-slate-700 transition-colors text-[10.5px] shrink-0"
              >
                <LinkedinIcon className="w-3 h-3 shrink-0" />
                <span>LinkedIn</span>
              </a>
            )}
            {personal.telegram && (
              <a
                href={personal.telegram.startsWith('http') ? personal.telegram : `https://t.me/${personal.telegram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded-full border border-slate-200 icon-link gap-1 text-slate-700 transition-colors text-[10.5px] shrink-0"
              >
                <TelegramIcon className="w-3 h-3 shrink-0" />
                <span>Telegram</span>
              </a>
            )}
          </div>
        </div>

        {/* Contact info sub-bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-500">
          {personal.email && (
            <a href={`mailto:${personal.email}`} className="icon-link gap-1.5 hover:text-slate-800">
              <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personal.email}</span>
            </a>
          )}
          {personal.phone && (
            <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="icon-link gap-1.5 hover:text-slate-800">
              <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personal.phone}</span>
            </a>
          )}
          {personal.location && (
            <span className="icon-link gap-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span>{personal.location}</span>
            </span>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {personal.summary && (
        <section className="mb-5 avoid-break bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {personal.summary}
          </p>
        </section>
      )}

      {/* 2-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* MAIN COLUMN (8 cols): Experience & Projects */}
        <div className="md:col-span-8 space-y-5">
          {/* EXPERIENCE */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accent }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }}></span>
                Tajriba & Faoliyat
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="avoid-break bg-white p-3 rounded-xl border border-slate-150 shadow-xs">
                    <div className="flex justify-between items-baseline flex-wrap gap-1">
                      <div className="font-bold text-sm text-slate-900">{exp.role}</div>
                      <span className="text-[11px] font-medium text-slate-400">
                        {exp.startDate} - {exp.current ? 'Hozir' : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-slate-600 mb-1.5">
                      {exp.companyUrl ? (
                        <a 
                          href={exp.companyUrl.startsWith('http') ? exp.companyUrl : `https://${exp.companyUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline font-semibold inline-flex items-center gap-1"
                          style={{ color: accent }}
                        >
                          {exp.company}
                          <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                      {exp.location && <span className="text-slate-400"> • {exp.location}</span>}
                    </div>

                    {exp.description && (
                      <p className="text-xs text-slate-600 mb-1.5 leading-relaxed">{exp.description}</p>
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

          {/* FEATURED PROJECTS */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accent }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }}></span>
                Tanlangan Loyihalar & Keyslar
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="avoid-break p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="font-bold text-xs text-slate-900">{proj.name}</span>
                        {proj.liveUrl && (
                          <a 
                            href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] font-semibold hover:underline inline-flex items-center gap-0.5 shrink-0"
                            style={{ color: accent }}
                          >
                            <span>Keysni ko'rish</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      {proj.description && (
                        <p className="text-[11px] text-slate-600 leading-snug">{proj.description}</p>
                      )}
                    </div>
                    {proj.techStack && (
                      <div className="mt-2 pt-1.5 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                        {proj.techStack}
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
            <section className="avoid-break bg-slate-50 p-4 rounded-xl border border-slate-150">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Asosiy Ko'nikmalar
              </h2>

              {skills.frontend && skills.frontend.length > 0 && (
                <div className="mb-3">
                  <div className="text-[11px] font-semibold text-slate-700 mb-1.5">Dizayn & Asboblar</div>
                  <div className="flex flex-wrap gap-1">
                    {skills.frontend.map((s, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.backend && skills.backend.length > 0 && (
                <div className="mb-3">
                  <div className="text-[11px] font-semibold text-slate-700 mb-1.5">Metodologiya & Tadqiqot</div>
                  <div className="flex flex-wrap gap-1">
                    {skills.backend.map((s, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10px] font-medium px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.devopsAndTools && skills.devopsAndTools.length > 0 && (
                <div>
                  <div className="text-[11px] font-semibold text-slate-700 mb-1.5">Boshqa ko'nikmalar</div>
                  <div className="flex flex-wrap gap-1">
                    {skills.devopsAndTools.map((s, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10px] font-medium px-2 py-0.5 rounded-full">
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
            <section className="avoid-break bg-slate-50 p-4 rounded-xl border border-slate-150">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5">
                Ta'lim
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-700 font-medium">{edu.school}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {edu.startDate} - {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* LANGUAGES */}
          {languages && languages.length > 0 && (
            <section className="avoid-break bg-slate-50 p-4 rounded-xl border border-slate-150">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                Tillar
              </h2>
              <div className="space-y-1 text-xs">
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
