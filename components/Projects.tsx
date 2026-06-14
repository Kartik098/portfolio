'use client';

import { portfolio } from '@/lib/data';

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl text-center mb-4">Featured Projects</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          A selection of projects that showcase my skills and experience in full-stack development
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {portfolio.projects.map((project) => (
            <div key={project.id} className="group card-base flex flex-col">
              {/* Project Image */}
              <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 mb-6 flex items-center justify-center overflow-hidden border border-border">
                <div className="text-center text-muted">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-sm">{project.title}</p>
                </div>
              </div>

              {/* Project Content */}
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-secondary mb-4 flex-grow">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="mb-6 pb-6 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-secondary uppercase mb-2">Key Features</p>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted flex items-start gap-2">
                        <span className="text-primary mt-0.5">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-border">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 button-secondary text-center text-sm group/btn"
                >
                  <span className="group-hover/btn:text-primary smooth-transition">GitHub</span>
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 button-secondary text-center text-sm group/btn"
                >
                  <span className="group-hover/btn:text-primary smooth-transition">Live Demo</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="mt-16 text-center">
          <p className="text-secondary mb-6">Want to see more of my work?</p>
          <a
            href="https://github.com/Kartik098"
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary inline-block"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
