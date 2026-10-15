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

export const resumeData = {
  profile: {
    name: 'Khurshed Khan',
    role: 'Senior Frontend Developer',
    location: 'Dubai, UAE',
    phone: '+971 559553204',
    email: 'Khurshedkhan52@gmail.com',

    website: {
      label: 'Website',
      url: 'https://www.khurshedkhan.dev/',
    },

    linkedin: {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/khurshed-khan-a30b0159/',
    },

    photo: '/resume/profile.png',
  },

  summary:
    'Senior Frontend Developer with 9+ years of experience designing and developing scalable, high-performance web applications using React.js, Next.js, Angular, Vue.js, and TypeScript. Specialized in fintech, trading platforms, real-time dashboards, and enterprise applications. Experienced in integrating AI/LLM capabilities into frontend products, including Gemini-powered conversational interfaces and natural-language workflows.',

  skillGroups: [
    {
      title: 'Frontend Technologies',
    skills: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Angular',
      'Vue.js',
      'Redux',
      'TanStack Query (React Query)',
      'Context API',
      'Ember.js',
      'HTML5',
      'CSS3',
    ],
    },
    {
      title: 'UI Frameworks',
      skills: [
        'Tailwind CSS',
        'Bootstrap',
        'Angular Material',
        'Ant Design',
      ],
    },
    {
      title: 'Data Visualization',
      skills: ['Highcharts.js', 'Chart.js', 'Recharts'],
    },
    {
      title: 'Backend & API Integration',
      skills: [
        'Node.js',
        'REST APIs',
        'WebSocket',
        'API Integration',
        'Third-Party Services',
      ],
    },
      {
      title: 'AI & LLM Integration',
      skills: [
        'Gemini API',
        'LLM Integration',
        'Prompt Engineering',
        'Generative AI Integration'
      ],
    },
    {
      title: 'Testing & Quality',
      skills: ['Playwright, End-to-End Testing, UI Automation, Cross-Browser Testing'],
    },
    {
      title: 'Tools & Technologies',
      skills: [
        'Git',
        'GitHub',
        'MongoDB',
        'Figma',
        'Webpack',
      ],
    },
  ] satisfies ResumeSkillGroup[],

  softSkills: [
    'Complex Problem Solving',
    'Agile/Scrum',
    'Mentorship',
  ],

  languages: ['English', 'Hindi'],

  nationality: 'Indian',

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      specialization: "Computer Science & Engineering",
      institution: "Sabarmati University",
      location: "Ahmedabad, India",
      period: "2011 — 2015",
    },
  ] satisfies ResumeEducation[],

  experience: [
    {
      role: 'Senior Frontend Developer',
      company: 'Trive International',
      location: 'Dubai',
      period: 'October 2025 — Present',

      achievements: [
        'Lead frontend architecture and development of Forex/CFD trading platforms supporting thousands of active traders, using React.js, Next.js, and TypeScript.',
        'Architected a library of 20+ reusable components, significantly cutting new feature development time.',
        'Built real-time trading dashboards handling high-frequency WebSocket price updates with minimal latency.',
        'Reduced page load time by 40% through code-splitting, lazy loading, and bundle optimization.',
        'Own frontend technical decisions across a team of 3-5 developers, including code review standards and architecture reviews.',
        'Partnered directly with product and backend teams to ship new features on a regular release cycle, integrating REST and WebSocket APIs for live market data.',
      ],

      highlights: [
        'Forex/CFD trading platforms',
        '20+ reusable components',
        'real-time trading dashboards',
        '40%',
        '3-5 developers',
        'REST and WebSocket APIs',
      ],

      keyAchievements: [],
    },
    {
      role: 'Senior Frontend Developer',
      company: 'CPT Markets',
      location: 'Dubai',
      period: 'March 2021 — September 2025',

      achievements: [
        'Developed and maintained global trading platforms using React.js, Next.js, Vue.js, and TypeScript.',
        'Built interactive financial dashboards with Highcharts.js for real-time market data and trading analytics.',
        'Delivered multilingual Arabic and English experiences using i18n for international users and regional markets.',
        'Integrated REST APIs, WebSockets, and financial systems for live prices and account workflows.',
        'Built reusable UI components, mentored junior developers, and partnered with UX and backend teams to improve delivery speed and code quality.',
      ],

      highlights: [
        'global trading platforms',
        'interactive financial dashboards',
        'multilingual Arabic and English experiences',
        'REST APIs, WebSockets, and financial systems',
        'delivery speed and code quality',
      ],

      keyAchievements: [],
    },
    {
      role: 'Frontend Developer',
      company: 'Micro Pro LLC — General Authority of Sports',
      location: 'Dubai',
      period: 'February 2017 – February 2021',

      achievements: [
        'Developed responsive, accessible, and interactive government web applications using Angular, TypeScript, JavaScript, HTML5, and CSS3.',
        'Implemented multilingual Arabic (RTL) and English (LTR) interfaces, ensuring consistent layouts, typography, and user experience across languages.',
        'Developed frontend interfaces aligned with UAE TDRA digital government guidelines and standards, focusing on usability, accessibility, and responsive design.',
        'Integrated REST APIs and collaborated with backend developers, UI/UX designers, and stakeholders to deliver scalable government web applications.',
        'Optimized frontend performance, cross-browser compatibility, and reusable Angular components to improve application quality and maintainability.',
      ],

      highlights: [
        'government web applications',
        'Arabic (RTL) and English (LTR) interfaces',
        'UAE TDRA digital government guidelines and standards',
        'scalable government web applications',
        'reusable Angular components',
      ],

      keyAchievements: [],
    },
  ] satisfies ResumeExperience[],

 projects: [
      {
    name: 'TradePro — AI-Powered Trading Platform',
    role: 'Senior Software Engineer | Frontend & FinTech Solutions',

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
      'Gemini API',
      'Conversational AI',
      'Secure Node.js AI Proxy',
      'Sanitized Query Routing',
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
        label: 'AI & Secure Proxy',
        technologies: ['Gemini API', 'Conversational AI', 'Secure Node.js AI Proxy', 'Sanitized Query Routing'],
      },
      {
        label: 'Tools & Architecture',
        technologies: ['Git', 'GitHub', 'Postman', 'Custom React Hooks', 'Component-Based Architecture', 'Server-Side Pagination'],
      },
    ],

    responsibilities: [
      'Designed and developed responsive trading dashboards and financial data visualizations using Next.js, React.js, TypeScript, Recharts, Tailwind CSS, and Ant Design, integrating live market data APIs for real-time prices and currency exchange rates.',
      'Developed full-stack trading application features using Node.js, Express.js, Prisma ORM, and PostgreSQL, building REST APIs and integrating frontend and backend workflows.',
      'Implemented secure authentication, customer onboarding, and trading account management, including Veriff KYC integration, identity verification workflows, and customer profile management.',
      'Developed multi-currency financial transaction modules for deposits, withdrawals, internal transfers, balance tracking, and currency conversion, including transaction lifecycle management.',
      'Built an AI-powered trading assistant using the Gemini API, enabling users to query account balances, transaction history, and withdrawal statuses through a conversational interface.',
      'Built a secure Node.js AI proxy that handles user-specific financial requests locally and uses Gemini only for sanitized public market and trading queries.',
      'Developed financial reporting modules with advanced filtering, server-side pagination, and transaction history, while building reusable React components, custom hooks, and type-safe API service layers for maintainability and scalability.',
    ],

    visitLink: 'https://ai-trading-platfrom.vercel.app/login',
    githubLink: 'https://github.com/khurshed52/ai-trading-platfrom',
  },
    {
    name: 'Trive Client Portal',
    role: 'Senior Front End Developer',

    software: [
      'Angular',
      'TypeScript',
      'NgRx',
      'Ant Design',
      'PSP Integration',
    ],

    responsibilities: [
      'Developed responsive and scalable user interfaces using Angular, TypeScript, and Ant Design.',
      'Built secure user registration, authentication, KYC verification, and client profile management modules.',
      'Integrated payment service providers (PSPs) to support secure wallet deposits, withdrawals, and transaction processing.',
      'Managed application state using NgRx for user sessions and trading workflows.',
      'Collaborated with backend developers to integrate REST APIs for MetaTrader 4 (MT4), MetaTrader 5 (MT5), and real-time client account management.',
    ],

    visitLink: 'https://global-int.trive.com/',
    githubLink: false,
  },
  {
    name: 'CPT Markets',
    role: 'Senior Front End Developer',

    software: [
      'Vue.js',
      'Nuxt.js',
      'Figma',
      'Pinia',
    ],

    responsibilities: [
      'Developed responsive, SEO-friendly web pages using Vue.js and Nuxt.js.',
      'Built reusable UI components and managed application state with Pinia.',
      'Collaborated with UI/UX designers to convert Figma designs into pixel-perfect, cross-browser compatible interfaces.',
      'Integrated RESTful APIs to deliver dynamic market data, multilingual content, and interactive website features.',
      'Enhanced website performance, responsiveness, and SEO best practices.'
    ],

    visitLink: 'https://www.cptmarkets.com/',
    githubLink: false,
  },
] satisfies ResumeProject[],
} as const

export type ResumeData = typeof resumeData
