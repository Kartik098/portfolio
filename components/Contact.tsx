'use client';

import { portfolio } from '@/lib/data';

export default function Contact() {
  const socialIcons: Record<string, string> = {
    github: '🐙',
    linkedin: '💼',
    twitter: '𝕏',
    email: '✉️',
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl text-center mb-4">Let&apos;s Connect</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>

        {/* Contact Card */}
        <div className="mt-12 card-base max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
            <p className="text-secondary">
              Feel free to reach out through any of these channels. I typically respond within 24 hours.
            </p>
          </div>

          {/* Email CTA */}
          <a
            href={`mailto:${portfolio.email}`}
            className="block w-full button-primary text-center mb-6 py-4 text-lg font-semibold"
          >
            Send Me an Email
          </a>

          {/* Social Links */}
          <div className="border-t border-border pt-8">
            <p className="text-sm font-semibold text-secondary uppercase mb-6 text-center">
              Or connect on social media
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolio.socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-base text-center py-6 hover:bg-primary/5"
                >
                  <span className="text-3xl block mb-2">
                    {socialIcons[link.icon] || '→'}
                  </span>
                  <span className="text-sm font-medium text-primary hover:text-accent smooth-transition">
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Response Message */}
        <div className="mt-12 p-6 rounded-lg border border-primary/20 bg-primary/5">
          <p className="text-center text-sm text-muted">
            📌 Whether you have a project in mind, want to collaborate, or just want to chat about web development,
            I&apos;d love to hear from you!
          </p>
        </div>
      </div>
    </section>
  );
}
