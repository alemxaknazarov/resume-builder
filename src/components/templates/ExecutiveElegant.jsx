import React from 'react';
import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TelegramIcon } from '../Icons';

export default function ExecutiveElegant({ data }) {
  const { personal, experience, education, projects, skills, languages, customization } = data;
  const accent = customization?.accentColor || '#1e293b';

  return (
    <div className="resume-paper bg-white text-slate-800 font-serif min-h-full">
      {/* ELEGANT CENTERED HEADER */}
      <header className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: accent }}>
        <h1 className="text-3xl md:text-4xl font-bold tracking-normal text-slate-900 font-serif mb-1">
          {personal.fullName || "Ism Familiya"}
        </h1>
        <p className="text-sm md:text-base font-sans uppercase tracking-widest text-slate-600 font-medium">
          {personal.jobTitle || "Mutaxassislik"}
        </p>

        {/* Centered contact strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mt-3 font-sans" style={{ fontSize: '10.5px', color: '#475569' }}>
          {personal.location && (
            <span className="icon-link gap-1 shrink-0">
              <MapPin className="w-3 h-3 shrink-0 text-slate-400" />
              <span>{personal.location}</span>
            </span>
          )}
          {personal.phone && (
            <a
              href={`tel:${personal.phone.replace(/\s+/g, '')}`}
              className="icon-link gap-1 hover:text-slate-950 shrink-0"
            >
              <Phone className="w-3 h-3 shrink-0 text-slate-400" />
              <span>{personal.phone}</span>
            </a>
          )}
          {personal.email && (
            <a
              href={`mailto:${personal.email}`}
              className="icon-link gap-1 hover:text-slate-950 shrink-0"
            >
              <Mail className="w-3 h-3 shrink-0 text-slate-400" />
              <span>{personal.email}</span>
            </a>
          )}
          {personal.website && (
            <a
              href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link gap-1 hover:underline shrink-0"
              style={{ color: accent }}
            >
              <Globe className="w-3 h-3 shrink-0" />
              <span>{personal.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {personal.linkedin && (
            <a
              href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link gap-1 hover:underline shrink-0"
              style={{ color: accent }}
            >
              <LinkedinIcon className="w-3 h-3 shrink-0" />
              <span>LinkedIn</span>
            </a>
          )}
          {personal.github && (
            <a
              href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link gap-1 hover:underline shrink-0"
              style={{ color: accent }}
            >
              <GithubIcon className="w-3 h-3 shrink-0" />
              <span>GitHub</span>
            </a>
          )}
          {personal.telegram && (
            <a
              href={personal.telegram.startsWith('http') ? personal.telegram : `https://t.me/${personal.telegram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link gap-1 hover:underline shrink-0"
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
        <section className="mb-6 avoid-break font-sans">
          <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
            Kasbiy Profil
          </h2>
          <p className="text-xs leading-relaxed text-slate-700 italic">
            "{personal.summary}"
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience && experience.length > 0 && (
        <section className="mb-6 font-sans">
          <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Ish Faoliyati & Tajriba
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-baseline flex-wrap">
                  <div className="font-bold text-sm text-slate-950 font-serif">
                    {exp.role}
                  </div>
                  <span className="text-xs text-slate-500 italic">
                    {exp.startDate} – {exp.current ? 'Hozirgi vaqtgacha' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-700 font-medium mb-1">
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
                  {exp.location && <span>, {exp.location}</span>}
                </div>
                {exp.description && (
                  <p className="text-xs text-slate-600 leading-relaxed mb-1">
                    {exp.description}
                  </p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-slate-600">
                    {exp.highlights.filter(Boolean).map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS (if any) */}
      {projects && projects.length > 0 && (
        <section className="mb-6 font-sans">
          <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-3">
            Muhim Loyihalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break border border-slate-200 p-2.5 rounded bg-stone-50/50">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-xs text-slate-900">{proj.name}</span>
                  {proj.liveUrl && (
                    <a 
                      href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs hover:underline inline-flex items-center gap-0.5"
                      style={{ color: accent }}
                    >
                      <span>Havola</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                {proj.description && (
                  <p className="text-[11px] text-slate-600 mt-1 leading-snug">{proj.description}</p>
                )}
                {proj.techStack && (
                  <p className="text-[10px] text-slate-500 mt-1 italic">
                    {proj.techStack}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION & SKILLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
        {education && education.length > 0 && (
          <section className="avoid-break">
            <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
              Ta'lim & Diplomlar
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="text-xs mb-2">
                <div className="font-bold text-slate-900 font-serif">{edu.degree}</div>
                <div className="text-slate-700">{edu.school} {edu.location && `• ${edu.location}`}</div>
                <div className="text-[11px] text-slate-500 italic">{edu.startDate} – {edu.endDate} {edu.gpa && `(${edu.gpa})`}</div>
              </div>
            ))}
          </section>
        )}

        <section className="avoid-break">
          {skills && (
            <div className="mb-4">
              <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                Asosiy Kompetensiyalar
              </h2>
              <div className="text-xs text-slate-700 space-y-1">
                {skills.frontend && skills.frontend.length > 0 && (
                  <div>
                    <span className="font-semibold text-slate-900">Frontend: </span>
                    {skills.frontend.join(' • ')}
                  </div>
                )}
                {skills.backend && skills.backend.length > 0 && (
                  <div>
                    <span className="font-semibold text-slate-900">Backend: </span>
                    {skills.backend.join(' • ')}
                  </div>
                )}
                {skills.devopsAndTools && skills.devopsAndTools.length > 0 && (
                  <div>
                    <span className="font-semibold text-slate-900">Boshqa: </span>
                    {skills.devopsAndTools.join(' • ')}
                  </div>
                )}
              </div>
            </div>
          )}

          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-1.5">
                Chet Tillari
              </h2>
              <div className="text-xs text-slate-700 space-y-0.5">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-[11px]">
                    <span className="font-medium text-slate-900">{l.name}</span>
                    <span className="text-slate-500 italic">{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
