'use client';

import { portfolio } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border bg-black/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Kartik</h3>
            <p className="text-secondary">{portfolio.title}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', id: 'about' },
                { label: 'Skills', id: 'skills' },
                { label: 'Projects', id: 'projects' },
                { label: 'Contact', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-secondary hover:text-primary smooth-transition text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Follow</h4>
            <div className="flex gap-4">
              {portfolio.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-primary smooth-transition text-2xl"
                  title={link.name}
                >
                  {link.icon === 'github' && '🐙'}
                  {link.icon === 'linkedin' && '💼'}
                  {link.icon === 'twitter' && '𝕏'}
                  {link.icon === 'email' && '✉️'}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-secondary text-center md:text-left">
            <p>
              © {currentYear} {portfolio.name}. All rights reserved.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-lg border border-border hover:border-primary text-secondary hover:text-primary smooth-transition text-sm font-medium"
            aria-label="Scroll to top"
          >
            Back to Top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
