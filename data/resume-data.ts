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
  keyAchievements: string[]
}

export type ResumeProject = {
  name: string
  role: string
  software: string[]
  responsibilities: string[]

  visitLink: string | false
  githubLink: string | false
}

export type ResumeEducation = {
  degree: string
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
    'Senior Frontend Developer with 9+ years of experience designing and developing scalable, high-performance web applications using React.js, Next.js, Angular, Vue.js, and TypeScript. Specialized in fintech, trading platforms, real-time dashboards, and enterprise applications. Proven expertise in building responsive user interfaces, API integrations, performance optimization, and leading frontend initiatives. Strong experience collaborating with cross-functional teams and mentoring developers to deliver enterprise-grade solutions.',

  skillGroups: [
    {
      title: 'Frontend Technologies',
      skills: [
        'React',
        'Next.js',
        'Angular',
        'Vue.js',
        'Redux',
        'Context API',
        'Ember.js',
        'TypeScript',
        'JavaScript (ES6+)',
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
      skills: ['Highcharts.js', 'Chart.js'],
    },
    {
      title: 'Backend Integration',
      skills: [
        'REST APIs',
        'WebSocket',
        'API Integration',
        'Third-Party Services',
      ],
    },
    {
      title: 'Tools & Technologies',
      skills: [
        'Git',
        'GitHub',
        'Node.js',
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
      degree: 'Bachelor of Commerce',
      institution: 'DDU University',
      location: 'Uttar Pradesh',
      period: 'May 2008 — May 2011',
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

      keyAchievements: [
        'Developed real-time market data dashboards and reusable component libraries, accelerating feature delivery and improving development efficiency.',
        'Improved application performance and reduced page load time by 40%.',
      ],
    },
    {
      role: 'Senior Frontend Developer',
      company: 'CPT Markets',
      location: 'Dubai',
      period: 'March 2021 — September 2025',

      achievements: [
        'Developed and maintained global trading platforms using React.js, Next.js, and Vue.js.',
        'Implemented multilingual support (i18n) for international users.',
        'Built interactive analytics dashboards using Highcharts.js.',
        'Integrated REST APIs, WebSocket services, and third-party financial systems.',
        'Worked closely with UX designers and backend teams.',
        'Mentored junior developers and improved code quality standards.',
      ],

      keyAchievements: [
        'Implemented multilingual support across global markets.',
        'Improved development productivity through reusable UI components.',
      ],
    },
  ] satisfies ResumeExperience[],

 projects: [
      {
    name: 'TradePro AI Trading Platform',
    role: 'Front End Developer',

    software: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Gemini API',
      'GSAP',
      'Ant Design',
    ],

    responsibilities: [
      'Built responsive trading dashboards and authentication modules using Next.js and TypeScript.',
      'Integrated REST APIs for user onboarding, KYC verification, wallet management, and live market data.',
      'Built reusable frontend components and scalable application architecture for maintainable development.',
      'Collaborated with designers and backend developers to deliver AI-powered trading features and production-ready releases.',
      'Optimized application performance with code splitting, lazy loading, and GSAP animations.',
      'Implemented Gemini API integration for AI-powered chat, investment insights, and natural language query processing.'
    ],

    visitLink: 'https://ai-trading-platfrom.vercel.app/login',
    githubLink: 'https://github.com/khurshed52/ai-trading-platfrom',
  },
    {
    name: 'Trive Client Portal',
    role: 'Front End Developer',

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
    role: 'Front End Developer',

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