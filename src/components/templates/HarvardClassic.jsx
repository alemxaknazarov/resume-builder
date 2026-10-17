import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function HarvardClassic({ data }) {
  const { personal, experience, education, projects, skills, languages, customization } = data;
  const accent = customization?.accentColor || '#0f172a';

  return (
    <div className="resume-paper bg-white text-slate-900 font-serif min-h-full leading-normal">
      {/* HARVARD STYLE HEADER */}
      <header className="text-center border-b-2 pb-4 mb-4" style={{ borderColor: accent }}>
        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-slate-950 font-serif">
          {personal.fullName || "Ism Familiya"}
        </h1>
        {personal.jobTitle && (
          <p className="text-xs uppercase tracking-widest mt-1 font-sans font-semibold" style={{ color: accent }}>
            {personal.jobTitle}
          </p>
        )}

        {/* Dense Contact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-slate-700 font-sans mt-2">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && (
            <>
              <span>•</span>
              <a href={`tel:${personal.phone.replace(/\s+/g, '')}`} className="hover:underline">{personal.phone}</a>
            </>
          )}
          {personal.email && (
            <>
              <span>•</span>
              <a href={`mailto:${personal.email}`} className="hover:underline">{personal.email}</a>
            </>
          )}
          {personal.website && (
            <>
              <span>•</span>
              <a 
                href={personal.website.startsWith('http') ? personal.website : `https://${personal.website}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline font-medium text-slate-900"
              >
                {personal.website.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
          {personal.linkedin && (
            <>
              <span>•</span>
              <a 
                href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline font-medium text-slate-900"
              >
                LinkedIn
              </a>
            </>
          )}
          {personal.github && (
            <>
              <span>•</span>
              <a 
                href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline font-medium text-slate-900"
              >
                Portfolio/GitHub
              </a>
            </>
          )}
          {personal.telegram && (
            <>
              <span>•</span>
              <a 
                href={personal.telegram.startsWith('http') ? personal.telegram : `https://t.me/${personal.telegram.replace('@', '')}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:underline font-medium text-slate-900"
              >
                Telegram
              </a>
            </>
          )}
        </div>
      </header>

      {/* SUMMARY */}
      {personal.summary && (
        <section className="mb-4 avoid-break">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b pb-0.5 mb-1.5 font-sans" style={{ borderColor: accent }}>
            Kasbiy Profil (Summary)
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed text-justify font-serif">
            {personal.summary}
          </p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience && experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b pb-0.5 mb-2 font-sans" style={{ borderColor: accent }}>
            Kasbiy Tajriba
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="avoid-break">
                <div className="flex justify-between items-start gap-2 mb-0.5">
                  <div className="text-xs font-bold text-slate-950 font-serif flex-1">
                    {exp.companyUrl ? (
                      <a 
                        href={exp.companyUrl.startsWith('http') ? exp.companyUrl : `https://${exp.companyUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline inline text-slate-950"
                      >
                        <span>{exp.company}</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-1 inline-block opacity-60 align-baseline" />
                      </a>
                    ) : (
                      <span>{exp.company}</span>
                    )}
                    {exp.location && <span className="font-normal italic text-slate-700"> — {exp.location}</span>}
                  </div>
                  <span className="text-xs font-sans text-slate-700 shrink-0 text-right">
                    {exp.startDate} – {exp.current ? 'Hozirgacha' : exp.endDate}
                  </span>
                </div>

                <div className="text-xs italic text-slate-800 font-serif mb-1">
                  {exp.role}
                </div>

                {exp.description && (
                  <p className="text-xs text-slate-800 leading-snug mb-1 font-serif">
                    {exp.description}
                  </p>
                )}

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-slate-800 font-serif">
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

      {/* EDUCATION */}
      {education && education.length > 0 && (
        <section className="mb-4 avoid-break">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b pb-0.5 mb-2 font-sans" style={{ borderColor: accent }}>
            Ta'lim
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start gap-2 mb-0.5">
                  <div className="text-xs font-bold text-slate-950 font-serif flex-1">
                    {edu.school} {edu.location && <span className="font-normal italic text-slate-700">— {edu.location}</span>}
                  </div>
                  <span className="text-xs font-sans text-slate-700 shrink-0 text-right">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-800 italic font-serif flex justify-between">
                  <span>{edu.degree}</span>
                  {edu.gpa && <span className="font-sans text-[11px] not-italic text-slate-700">GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects && projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b pb-0.5 mb-2 font-sans" style={{ borderColor: accent }}>
            Loyihalar & Tadqiqotlar
          </h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="avoid-break">
                <div className="flex justify-between items-start gap-2 mb-0.5">
                  <div className="text-xs font-bold text-slate-950 flex-1">
                    <span>{proj.name}</span>
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl.startsWith('http') ? proj.liveUrl : `https://${proj.liveUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1.5 font-normal text-slate-700 hover:underline inline text-[11px]"
                      >
                        <span>[Havola]</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline-block opacity-60 align-baseline" />
                      </a>
                    )}
                  </div>
                  {proj.techStack && (
                    <span className="text-[11px] font-sans text-slate-600 italic shrink-0 max-w-[50%] text-right">
                      {proj.techStack}
                    </span>
                  )}
                </div>
                {proj.description && (
                  <p className="text-xs text-slate-800 leading-snug">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SKILLS & LANGUAGES */}
      <section className="avoid-break">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b pb-0.5 mb-1.5 font-sans" style={{ borderColor: accent }}>
          Ko'nikmalar & Tillar
        </h2>
        <div className="text-xs text-slate-800 space-y-1 font-serif">
          {skills && (
            <>
              {skills.frontend && skills.frontend.length > 0 && (
                <div>
                  <strong className="font-sans text-slate-950">Texnik Ko'nikmalar: </strong>
                  <span>{skills.frontend.join(', ')}</span>
                </div>
              )}
              {skills.backend && skills.backend.length > 0 && (
                <div>
                  <strong className="font-sans text-slate-950">Boshqaruv & Asboblar: </strong>
                  <span>{skills.backend.join(', ')}</span>
                </div>
              )}
              {skills.devopsAndTools && skills.devopsAndTools.length > 0 && (
                <div>
                  <strong className="font-sans text-slate-950">Metodologiya: </strong>
                  <span>{skills.devopsAndTools.join(', ')}</span>
                </div>
              )}
            </>
          )}
          {languages && languages.length > 0 && (
            <div className="pt-0.5">
              <strong className="font-sans text-slate-950">Tillar: </strong>
              <span>
                {languages.map(l => `${l.name} (${l.level})`).join('; ')}
              </span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
