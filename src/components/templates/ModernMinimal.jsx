import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '../Icons';

export default function ModernMinimal({ data }) {
  const { personal, experience, education, projects, skills, languages, customization } = data;
  const accent = customization?.accentColor || '#2563eb';

  return (
    <div className="resume-paper bg-white text-slate-800 font-sans min-h-full transition-all">
      {/* HEADER */}
      <header className="border-b pb-4 border-slate-200">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-1">
              {personal.fullName || "Ism Familiya"}
            </h1>
            <p className="text-lg font-medium" style={{ color: accent }}>
              {personal.jobTitle || "Kasbingiz / Mutaxassislik"}
            </p>
          </div>
        </div>

        {/* Contact Links Bar — single row or clean wrap without clipping */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-2 text-slate-600" style={{ fontSize: '10.5px' }}>
          {personal.email && (
            <a
              href={`mailto:${personal.email}`}
              className="icon-link gap-1 hover:text-slate-900 transition-colors shrink-0"
              title="Email"
            >
              <Mail className="w-3 h-3 shrink-0 text-slate-400" />
              <span>{personal.email}</span>
            </a>
          )}
          {personal.phone && (
            <a
              href={`tel:${personal.phone.replace(/\s+/g, '')}`}
              className="icon-link gap-1 hover:text-slate-900 transition-colors shrink-0"
            >
              <Phone className="w-3 h-3 shrink-0 text-slate-400" />
              <span>{personal.phone}</span>
            </a>
          )}
          {personal.location && (
            <span className="icon-link gap-1 shrink-0">
              <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.website && (
            <a
              href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link gap-1 font-medium hover:underline shrink-0"
              style={{ color: accent }}
            >
              <Globe className="w-3 h-3 shrink-0" />
              <span>{personal.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
            </a>
          )}
          {personal.github && (
            <a
              href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link gap-1 font-medium hover:underline shrink-0"
              style={{ color: accent }}
            >
              <GithubIcon className="w-3 h-3 shrink-0" />
              <span>GitHub</span>
            </a>
          )}
          {personal.linkedin && (
            <a
              href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link gap-1 font-medium hover:underline shrink-0"
              style={{ color: accent }}
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
              className="icon-link gap-1 font-medium hover:underline shrink-0"
              style={{ color: accent }}
            >
              <TelegramIcon className="w-3 h-3 shrink-0" />
              <span>Telegram</span>
            </a>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {personal.summary && (
        <section className="mt-4 text-xs leading-relaxed text-slate-700">
          <p>{personal.summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience && experience.length > 0 && (
        <section className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">
            Ish Tajribasi
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-start gap-2 mb-0.5">
                  <div className="font-semibold text-sm text-slate-900 flex-1">
                    {exp.role} 
                    <span className="text-slate-400 font-normal"> — </span>
                    {exp.companyUrl ? (
                      <a 
                        href={exp.companyUrl.startsWith('http') ? exp.companyUrl : `https://${exp.companyUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline font-medium icon-link gap-0.5"
                        style={{ color: accent }}
                      >
                        <span>{exp.company}</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-60" />
                      </a>
                    ) : (
                      <span className="text-slate-700 font-medium">{exp.company}</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium shrink-0 text-right">
                    {exp.startDate} - {exp.current ? 'Hozir' : exp.endDate} {exp.location && `| ${exp.location}`}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {exp.description}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-600">
                    {exp.highlights.filter(Boolean).map((h, idx) => (
                      <li key={idx} className="leading-snug">{h}</li>
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
        <section className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 border-b border-slate-100 pb-1">
            Loyihalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break bg-slate-50/70 p-2.5 rounded border border-slate-100">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-xs text-slate-900">{proj.name}</span>
                  <div className="flex items-center gap-2 text-[11px]">
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline icon-link gap-1"
                        style={{ color: accent }}
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a 
                        href={proj.githubUrl.startsWith('http') ? proj.githubUrl : `https://${proj.githubUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-slate-900 icon-link gap-1"
                      >
                        <GithubIcon className="w-3 h-3 shrink-0" />
                        <span>Kod</span>
                      </a>
                    )}
                  </div>
                </div>
                {proj.description && (
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">{proj.description}</p>
                )}
                {proj.techStack && (
                  <p className="text-[10px] text-slate-500 mt-1.5 font-mono">
                    <span className="font-semibold text-slate-700">Texnologiyalar:</span> {proj.techStack}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS & EDUCATION GRID */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SKILLS */}
        {skills && (
          <section className="avoid-break">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-100 pb-1">
              Ko'nikmalar
            </h2>
            <div className="space-y-1.5 text-xs">
              {skills.frontend && skills.frontend.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-700 text-[11px]">Frontend: </span>
                  <span className="text-slate-600 text-[11px]">{skills.frontend.join(', ')}</span>
                </div>
              )}
              {skills.backend && skills.backend.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-700 text-[11px]">Backend: </span>
                  <span className="text-slate-600 text-[11px]">{skills.backend.join(', ')}</span>
                </div>
              )}
              {skills.devopsAndTools && skills.devopsAndTools.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-700 text-[11px]">Asboblar & DevOps: </span>
                  <span className="text-slate-600 text-[11px]">{skills.devopsAndTools.join(', ')}</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* EDUCATION & LANGUAGES */}
        <section className="avoid-break">
          {education && education.length > 0 && (
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 border-b border-slate-100 pb-1">
                Ta'lim
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="text-xs mb-2">
                  <div className="font-semibold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.school} {edu.location && `• ${edu.location}`}</div>
                  <div className="text-[11px] text-slate-400">{edu.startDate} - {edu.endDate} {edu.gpa && `(GPA: ${edu.gpa})`}</div>
                </div>
              ))}
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 border-b border-slate-100 pb-1">
                Tillar
              </h2>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
                {languages.map((l) => (
                  <span key={l.id}>
                    <strong className="text-slate-800">{l.name}:</strong> {l.level}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
