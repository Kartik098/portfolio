export const portfolio = {
  name: 'Kartik',
  title: 'Full-Stack MERN Developer',
  description: 'I craft beautiful, scalable web experiences with MongoDB, Express, React, and Node.js',
  location: 'India',
  email: 'kartik@example.com',
  github: 'https://github.com/Kartik098',
  linkedin: 'https://linkedin.com/in/kartik',
  twitter: 'https://twitter.com/kartik',

  about: `I'm a full-stack developer passionate about building modern web applications. With expertise in the MERN stack, I create responsive, performant solutions that solve real-world problems. I love collaborating with teams and continuously learning new technologies.

My journey in web development started with a passion for creating intuitive user interfaces, but I quickly realized the power of understanding both frontend and backend systems. This pushed me to become a full-stack developer.

Currently, I'm focused on building scalable applications, optimizing performance, and mentoring junior developers.`,

  skills: {
    frontend: [
      'React.js',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'Redux',
      'Responsive Design',
    ],
    backend: [
      'Node.js',
      'Express.js',
      'RESTful APIs',
      'Authentication',
      'Database Design',
      'Server Optimization',
      'Middleware',
    ],
    databases: [
      'MongoDB',
      'PostgreSQL',
      'Firebase',
      'Redis',
    ],
    tools: [
      'Git',
      'Docker',
      'VS Code',
      'Webpack',
      'Vite',
      'Figma',
      'Postman',
      'Linux',
    ],
  },

  experience: [
    {
      id: 1,
      title: 'Senior Full-Stack Developer',
      company: 'Tech Solutions Inc.',
      period: '2023 - Present',
      description: 'Leading development of high-performance web applications. Architecting scalable backend systems and optimizing frontend performance. Mentoring junior developers and conducting code reviews.',
      achievements: [
        'Reduced API response time by 40% through optimization',
        'Led migration to Next.js, improving Core Web Vitals',
        'Mentored 5+ junior developers',
      ],
    },
    {
      id: 2,
      title: 'Full-Stack Developer',
      company: 'StartUp Hub',
      period: '2021 - 2023',
      description: 'Developed and maintained full-stack applications using MERN stack. Worked with cross-functional teams to deliver features on schedule.',
      achievements: [
        'Built 10+ production applications',
        'Implemented CI/CD pipelines',
        'Improved application performance by 35%',
      ],
    },
    {
      id: 3,
      title: 'Junior Developer',
      company: 'Web Agency',
      period: '2020 - 2021',
      description: 'Started career building responsive web applications. Learned frontend and backend development fundamentals.',
      achievements: [
        'Completed 15+ client projects',
        'Achieved 98% client satisfaction',
      ],
    },
  ],

  projects: [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-featured e-commerce application with payment integration, product search, and user authentication.',
      image: '/projects/ecommerce.png',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: 'https://github.com/Kartik098/ecommerce',
      live: 'https://ecommerce-demo.com',
      highlights: [
        'Payment gateway integration',
        'Advanced product filtering',
        'Real-time inventory management',
      ],
    },
    {
      id: 2,
      title: 'Real-Time Chat Application',
      description: 'Chat application with real-time messaging, user status, and file sharing capabilities.',
      image: '/projects/chat.png',
      tech: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
      github: 'https://github.com/Kartik098/chat-app',
      live: 'https://chat-demo.com',
      highlights: [
        'Real-time messaging with WebSockets',
        'User presence tracking',
        'File sharing',
      ],
    },
    {
      id: 3,
      title: 'Task Management Dashboard',
      description: 'Collaborative task management tool with real-time updates and team collaboration features.',
      image: '/projects/dashboard.png',
      tech: ['Next.js', 'Tailwind CSS', 'Firebase', 'TypeScript'],
      github: 'https://github.com/Kartik098/task-manager',
      live: 'https://tasks-demo.com',
      highlights: [
        'Real-time collaboration',
        'Drag-and-drop interface',
        'Team permissions',
      ],
    },
  ],

  certifications: [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      issuer: 'freeCodeCamp',
      date: '2021',
      credentialUrl: 'https://freecodecamp.org/certification/kartik',
    },
    {
      id: 2,
      title: 'React.js Advanced Patterns',
      issuer: 'Udemy',
      date: '2022',
      credentialUrl: 'https://udemy.com/certificate/react-patterns',
    },
    {
      id: 3,
      title: 'Node.js & Express Backend Development',
      issuer: 'Coursera',
      date: '2022',
      credentialUrl: 'https://coursera.org/certificate/nodejs',
    },
  ],

  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/Kartik098',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/kartik',
      icon: 'linkedin',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/kartik',
      icon: 'twitter',
    },
    {
      name: 'Email',
      url: 'mailto:kartik@example.com',
      icon: 'email',
    },
  ],
};
