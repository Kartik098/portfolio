'use client';

import { portfolio } from '@/lib/data';

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl text-center mb-4">Professional Experience</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          My journey in full-stack development across different roles and companies
        </p>

        <div className="mt-12 space-y-8">
          {portfolio.experience.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative pl-6 md:pl-12 pb-8 ${
                index !== portfolio.experience.length - 1
                  ? 'border-l-2 border-primary/30 pb-12 md:pb-16'
                  : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute -left-4 top-0 w-8 h-8 bg-primary rounded-full border-4 border-background" />

              <div className="card-base">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold">{exp.title}</h3>
                    <p className="text-primary font-medium mt-1">{exp.company}</p>
                  </div>
                  <span className="text-sm text-secondary whitespace-nowrap">{exp.period}</span>
                </div>

                <p className="text-secondary mb-4">{exp.description}</p>

                {/* Achievements */}
                <div className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-muted">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
