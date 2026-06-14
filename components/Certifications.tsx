'use client';

import { portfolio } from '@/lib/data';

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl text-center mb-4">Certifications & Credentials</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          Professional certifications and credentials that validate my expertise
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {portfolio.certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="card-base group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary smooth-transition">
                    {cert.title}
                  </h3>
                  <p className="text-primary font-medium text-sm">{cert.issuer}</p>
                </div>
                <span className="text-2xl">🏆</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-secondary text-sm">{cert.date}</span>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 smooth-transition">
                  Credential
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
