'use client';

import { portfolio } from '@/lib/data';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="section-title text-3xl md:text-4xl mb-6">About Me</h2>
            <div className="space-y-4 text-muted leading-relaxed">
              {portfolio.about.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quick Facts */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                <p className="text-secondary">{portfolio.location}</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a
                  href={`mailto:${portfolio.email}`}
                  className="text-primary hover:text-accent smooth-transition"
                >
                  {portfolio.email}
                </a>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border p-4">
              <div className="text-center">
                <div className="text-6xl mb-4">👨‍💻</div>
                <p className="text-secondary">Full-Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
