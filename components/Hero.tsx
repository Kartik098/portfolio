'use client';

import { portfolio } from '@/lib/data';

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative pt-16 px-4 sm:px-6 lg:px-8"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 border border-primary/30 rounded-full">
          <span className="text-sm font-medium text-primary">Welcome to my portfolio</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
          Hi, I&apos;m <span className="gradient-text">Kartik</span>
        </h1>

        {/* Subheading */}
        <h2 className="text-xl md:text-2xl text-secondary mb-8 text-balance">
          {portfolio.description}
        </h2>

        {/* Description */}
        <p className="text-lg text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
          I build full-stack applications with modern technologies. Specializing in MERN stack development,
          I create beautiful, performant web experiences that users love.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollToSection('projects')}
            className="button-primary px-8 py-3 text-lg"
          >
            View My Work
          </button>
          <a
            href={`mailto:${portfolio.email}`}
            className="button-secondary px-8 py-3 text-lg"
          >
            Get in Touch
          </a>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-20 md:mt-24">
          <div className="card-base">
            <div className="text-3xl font-bold gradient-text">{portfolio.projects.length}+</div>
            <div className="text-sm text-secondary mt-2">Projects Completed</div>
          </div>
          <div className="card-base">
            <div className="text-3xl font-bold gradient-text">
              {Object.values(portfolio.skills).flat().length}+
            </div>
            <div className="text-sm text-secondary mt-2">Skills & Technologies</div>
          </div>
          <div className="card-base">
            <div className="text-3xl font-bold gradient-text">{portfolio.experience.length}+</div>
            <div className="text-sm text-secondary mt-2">Years Experience</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce"
            aria-label="Scroll to next section"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
