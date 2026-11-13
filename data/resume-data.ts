export type ResumeSkillGroup = {
  title: string
  skills: string[]
}

export type ResumeExperience = {
  role: string
  company: string
  location: string
  period: string
  achievements: string[]
  highlights: string[]
  keyAchievements: string[]
}

export type ResumeProject = {
  name: string
  role: string
  software: string[]
  stackGroups?: {
    label: string
    technologies: string[]
  }[]
  responsibilities: string[]

  visitLink: string | false
  githubLink: string | false
}

export type ResumeEducation = {
  degree: string
  specialization: string
  institution: string
  location: string
  period: string
}

// Skills intentionally excluded from the recruiter-facing PDF until their
// hands-on depth can be confirmed. Re-enable them from this single list only.
export const UNVERIFIED_SKILLS = [
  'Redis',
  'BullMQ',
  'End-to-End Testing',
  'UI Automation',
] as const

export const resumeData = {
  profile: {
    name: 'Khurshed Khan',
    role: 'Senior Frontend Developer | Full-Stack Developer',
    location: 'Dubai, UAE',
    relocation: 'Open to Relocate to India',
    phone: '+971 559553204',
    email: 'Khurshedkhan52@gmail.com',

    website: {
      label: 'khurshedkhan.dev',
      url: 'https://www.khurshedkhan.dev/',
    },

    linkedin: {
      label: 'linkedin.com/in/khurshed-khan',
      url: 'https://www.linkedin.com/in/khurshed-khan-a30b0159/',
    },

    photo: '/resume/profile.png',
  },

  summary:
    'Senior Frontend Developer and Full-Stack Developer with 9+ years of experience building scalable applications across FinTech, Forex/CFD trading, enterprise systems, and the UAE government sector. Strong expertise in React.js, Next.js, Angular, TypeScript, and JavaScript, with full-stack experience in Node.js, Express.js, REST APIs, PostgreSQL, and Prisma ORM. Experienced in developing secure, accessible, and multilingual government applications with Arabic/RTL support, real-time trading dashboards, WebSocket integrations, financial workflows, and secure Google Gemini AI function calling.',

  skillGroups: [
    {
      title: 'Frontend Technologies',
      skills: [
        'React.js',
        'Next.js',
        'Angular 19',
        'TypeScript',
        'JavaScript (ES6+)',
        'Vue.js',
        'Nuxt.js',
        'HTML5',
        'CSS3',
      ],
    },
    {
      title: 'State Management & UI',
      skills: [
        'NgRx',
        'Pinia',
        'Redux',
        'TanStack Query (React Query)',
        'Context API',
        'Tailwind CSS',
        'Angular Material',
        'Ant Design',
        'Bootstrap',
      ],
    },
    {
      title: 'Backend & API Development',
      skills: [
        'Node.js',
        'Express.js',
        'REST APIs',
        'PostgreSQL',
        'Prisma ORM',
        'WebSockets',
      ],
    },
    {
      title: 'Integrations',
      skills: [
        'Stripe',
        'Veriff (KYC)',
        'PSP Integration',
        'Authentication & Authorization',
        'Live Market Data APIs',
        'Arabic RTL/LTR',
      ],
    },
    {
      title: 'AI & LLM Integration',
      skills: [
        'Google Gemini API',
        'Function Calling',
        'Authenticated Backend Functions',
        'Secure AI Integration',
      ],
    },
    {
      title: 'Visualization, GIS & Media',
      skills: ['Recharts', 'Highcharts', 'Chart.js', 'Mapbox', 'Video.js'],
    },
    {
      title: 'Quality & Performance',
      skills: [
        'Playwright',
        'Responsive Design',
        'Performance Optimization',
        'State Management',
        'WCAG 2.1 AA',
        'UAE TDRA',
        'CSP',
        'XSS/CSRF Mitigation',
        'Cross-Browser Testing',
      ],
    },
    {
      title: 'Tools & Technologies',
      skills: [
        'Git',
        'GitHub',
        'CI/CD',
        'Postman',
        'MongoDB',
      ],
    },
  ] satisfies ResumeSkillGroup[],

  softSkills: [
    'System Design',
    'Frontend Architecture',
    'Technical Decision-Making',
    'Code Reviews',
    'Mentorship',
    'Agile/Scrum',
  ],

  languages: ['English', 'Hindi'],

  nationality: 'Indian',

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science & Engineering",
      institution: "Sabarmati University",
      location: "Ahmedabad, India",
      period: "2011 – 2015",
    },
  ] satisfies ResumeEducation[],

  experience: [
    {
      role: 'Senior Frontend Developer (Full-Stack)',
      company: 'Trive International',
      location: 'Dubai',
      period: 'October 2025 – Present',

      achievements: [
        // TODO_METRIC: Confirm [X active traders] before adding a user count.
        // The unverified "supporting thousands" wording is intentionally omitted.
        'Lead development of Forex/CFD trading platforms using React.js, Next.js, and TypeScript, delivering account and trading workflows through REST API integrations.',
        'Delivered Angular 19 client portal features using TypeScript and NgRx, including authentication, KYC, account management, and payment workflows.',
        'Built real-time trading dashboards using WebSockets for live market data.',
        'Reduced page load time by 40% through code-splitting, lazy loading, and bundle optimization.',
        'Architected a library of 20+ reusable UI components, accelerating feature development.',
        'Lead technical decision-making for a team of 3–5 developers, including code reviews and architecture improvements.',
      ],

      highlights: [
        'Forex/CFD trading platforms',
        '20+ reusable UI components',
        'real-time trading dashboards',
        '40%',
        '3–5 developers',
        'REST and WebSocket APIs',
        'Angular 19 client portal features',
        'TypeScript and NgRx',
      ],

      keyAchievements: [],
    },
    {
      role: 'Senior Frontend Developer',
      company: 'CPT Markets',
      location: 'Dubai',
      period: 'March 2021 – September 2025',

      achievements: [
        'Engineered and maintained global trading platforms using React.js, Next.js, Vue.js, and TypeScript.',
        'Built real-time dashboards, GIS maps, and video interfaces using Highcharts, Mapbox, and Video.js.',
        'Delivered multilingual Arabic and English experiences using i18n for international users and regional markets.',
        'Integrated REST APIs, WebSockets, and financial systems for live prices and account workflows.',
        'Built reusable UI components, mentored junior developers, and partnered with UX and backend teams to improve delivery speed and code quality.',
      ],

      highlights: [
        'global trading platforms',
        'real-time dashboards, GIS maps, and video interfaces',
        'multilingual Arabic and English experiences',
        'REST APIs, WebSockets, and financial systems',
        'delivery speed and code quality',
      ],

      keyAchievements: [],
      // TODO_METRIC: Confirm a CPT Markets metric before adding it to the PDF,
      // e.g. [X% faster load time] or [X releases per month].
    },
    {
      role: 'Frontend Developer',
      company: 'Micro Pro LLC — General Authority of Sports',
      location: 'Dubai',
      period: 'February 2017 – February 2021',

      achievements: [
        'Developed responsive, accessible, and interactive government web applications using Angular, TypeScript, JavaScript, HTML5, and CSS3.',
        'Built reusable Angular components and multilingual Arabic (RTL) and English (LTR) interfaces with consistent layouts and user experience.',
        'Delivered accessible WCAG 2.1 AA and UAE TDRA-aligned government interfaces.',
        'Integrated REST APIs, applied CSP and XSS/CSRF mitigation, and optimized performance and cross-browser compatibility for secure government applications.',
      ],

      highlights: [
        'government web applications',
        'Arabic (RTL) and English (LTR) interfaces',
        'WCAG 2.1 AA and UAE TDRA-aligned government interfaces',
        'CSP and XSS/CSRF mitigation',
        'reusable Angular components',
      ],

      keyAchievements: [],
      // TODO_METRIC: Confirm a Micro Pro metric before adding it to the PDF,
      // e.g. [X government portals delivered].
    },
  ] satisfies ResumeExperience[],

 projects: [
      {
    name: 'TradePro — AI-Powered Trading Platform',
    role: 'Senior Full-Stack Developer | FinTech & AI Integration',

    software: [
      'Next.js',
      'React.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Ant Design',
      'Node.js',
      'Express.js',
      'Prisma ORM',
      'PostgreSQL',
      'REST APIs',
      'Live Market Data APIs',
      'Veriff (KYC)',
      'Stripe',
      'Currency Exchange APIs',
      'Google Gemini API',
      'Function Calling',
      'Authenticated Backend Functions',
      'Authorization Controls',
      'Git',
      'GitHub',
      'Postman',
      'Custom React Hooks',
      'Component-Based Architecture',
      'Server-Side Pagination',
    ],

    stackGroups: [
      {
        label: 'Frontend',
        technologies: ['Next.js', 'React.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'Ant Design', 'Recharts'],
      },
      {
        label: 'Backend & Database',
        technologies: ['Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL'],
      },
      {
        label: 'Integrations',
        technologies: ['REST APIs', 'Live Market Data APIs', 'Veriff (KYC)', 'Stripe', 'Currency Exchange APIs'],
      },
      {
        label: 'AI & Function Calling',
        technologies: ['Google Gemini API', 'Function Calling', 'Authenticated Backend Functions', 'Authorization Controls'],
      },
      {
        label: 'Tools & Architecture',
        technologies: ['Git', 'GitHub', 'Postman', 'Custom React Hooks', 'Component-Based Architecture', 'Server-Side Pagination'],
      },
    ],

    responsibilities: [
      'Designed and developed responsive trading dashboards and financial data visualizations using Next.js, React.js, TypeScript, Recharts, Tailwind CSS, and Ant Design, integrating live market data APIs for real-time prices and currency exchange rates.',
      'Developed full-stack trading application features using Node.js, Express.js, Prisma ORM, and PostgreSQL, building REST APIs and integrating frontend and backend workflows.',
      'Implemented authentication, authorization, customer onboarding, Veriff KYC, and multi-currency deposit, withdrawal, transfer, and Stripe payment workflows.',
      'Integrated Google Gemini API using secure function calling with Node.js and TypeScript, enabling conversational access to account balances, transaction history, and withdrawal statuses through authenticated, authorized backend functions without direct database access.',
      'Developed transaction reporting with advanced filtering, server-side pagination, and history views, supported by reusable React components, custom hooks, and type-safe API services.',
    ],

    visitLink: 'https://ai-trading-platfrom.vercel.app/login',
    githubLink: 'https://github.com/khurshed52/ai-trading-platfrom',
  },
    {
    name: 'Trive Client Portal',
    role: 'Senior Frontend Developer',

    software: [
      'Angular 19',
      'TypeScript',
      'NgRx',
      'Ant Design',
      'PSP Integration',
    ],

    responsibilities: [
      'Developed responsive Angular 19 and TypeScript portal interfaces for registration, authentication, KYC, profiles, and account management, using NgRx for sessions and trading workflows.',
      'Integrated REST APIs for MetaTrader 4 (MT4), MetaTrader 5 (MT5), and real-time account information.',
      'Integrated PSP services supporting wallet deposits, withdrawals, and transaction processing.',
      'Collaborated with backend and product teams to deliver secure, responsive client workflows.',
    ],

    visitLink: 'https://global-int.trive.com/',
    githubLink: false,
  },
  {
    name: 'CPT Markets',
    role: 'Senior Frontend Developer',

    software: [
      'Vue.js',
      'Nuxt.js',
      'Mapbox',
      'Video.js',
      'Pinia',
    ],

    responsibilities: [
      'Developed responsive, SEO-friendly market interfaces using Vue.js and Nuxt.js.',
      'Built reusable UI components and managed application state using Pinia.',
      'Integrated REST APIs, Mapbox-powered mapping, and Video.js monitoring features.',
      'Converted approved UI/UX designs into responsive, cross-browser-compatible interfaces optimized for performance and technical SEO.',
    ],

    visitLink: 'https://www.cptmarkets.com/',
    githubLink: false,
  },
] satisfies ResumeProject[],
} as const

export type ResumeData = typeof resumeData
