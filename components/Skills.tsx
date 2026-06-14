'use client';

import { portfolio } from '@/lib/data';

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: portfolio.skills.frontend,
      color: 'from-primary/20 to-primary/5',
    },
    {
      title: 'Backend',
      skills: portfolio.skills.backend,
      color: 'from-accent/20 to-accent/5',
    },
    {
      title: 'Databases',
      skills: portfolio.skills.databases,
      color: 'from-primary/20 to-accent/5',
    },
    {
      title: 'Tools & DevOps',
      skills: portfolio.skills.tools,
      color: 'from-accent/20 to-primary/5',
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl text-center mb-4">Skills & Technologies</h2>
        <p className="section-subtitle text-center max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise across the modern web stack
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {categories.map((category) => (
            <div key={category.title} className="card-base">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-primary rounded-full" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border border-primary/20 bg-gradient-to-r ${category.color} text-primary hover:border-primary/40 smooth-transition`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-16 p-8 rounded-xl border border-border bg-black/30">
          <h3 className="font-semibold text-lg mb-4">My Learning Philosophy</h3>
          <p className="text-secondary leading-relaxed">
            I believe in continuous learning and staying updated with the latest technologies. Beyond the technical
            stack, I value clean code practices, performance optimization, and building scalable solutions. I&apos;m
            always exploring new frameworks and tools that can improve development efficiency and user experience.
          </p>
        </div>
      </div>
    </section>
  );
}
