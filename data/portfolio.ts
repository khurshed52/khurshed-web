export const profile = {
  name: 'Khurshed Khan',
  location: 'Dubai, UAE',
  role: 'Senior Frontend Developer',
  experience: '9+ years',
  passion: 'Building delightful digital products',
  intro:
    'Frontend Engineer with 9+ years of experience building scalable, high-performance web applications using React, Next.js, and TypeScript. Passionate about crafting intuitive user experiences, clean architecture, and performant solutions that deliver real business value',
  email: 'khurshedkhan52@gmail.com ',
  github: 'https://github.com/khurshed52/',
  linkedin: 'https://www.linkedin.com/in/khurshed-khan-a30b0159/',
}

export const projects = [
  {
    name: 'TradePro AI Trading Platform',
    description:
      'An AI-powered financial platform combining secure customer onboarding, KYC verification, multi-currency wallets, payments, live market experiences, portfolio management and controlled AI assistance.',

    stack: [
      'Next.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Prisma ORM',
      'Stripe',
      'Veriff',
      'Gemini API',
      'Secure Function Calling',
    ],

    image: '/projects/tradepro.png',

    live: 'https://ai-trading-platfrom.vercel.app',

    github: 'https://github.com/khurshed52/ai-trading-platfrom',

    featured: true,

    hasGithub: true,
  },

  {
    name: 'Trive Client Portal',

    description:
      'A secure global client portal supporting customer registration, KYC verification, wallet funding and access to MT4 and MT5 trading experiences through a scalable Angular architecture.',

    stack: ['Angular 19', 'TypeScript', 'NgRx', 'Ant Design', 'PSP Integration'],

    image: '/projects/trive-portal.png',

    live: 'https://global-int.trive.com/',

    github: '',

    featured: true,

    hasGithub: false,
  },

  {
    name: 'CPT Markets Website',

    description:
      'Developed and maintained CPT Markets’ multilingual global trading website, delivering responsive market content, localized customer journeys and consistent performance across regional audiences.',

    stack: ['Vue.js', 'Nuxt.js', 'Figma', 'Pinia'],

    image: '/projects/cpt-web.png',

    live: 'https://www.cptmarkets.com/',

    github: '',

    featured: true,

    hasGithub: false,
  },
]

export const experience = [
  {
    company: 'Trive International',
    location: 'Dubai, UAE',
    role: 'Senior Frontend Developer',
    period: 'October 2025 — Present',
    current: true,

    summary:
      'Leading frontend architecture and development for scalable Forex and CFD trading platforms used by global traders.',

    achievements: [
      'Lead frontend architecture and development using React, Next.js and TypeScript.',
      'Architected a library of 20+ reusable components, significantly reducing feature-development time.',
      'Built real-time trading dashboards handling high-frequency WebSocket market updates with minimal latency.',
      'Reduced page-load time by 40% through code splitting, lazy loading and bundle optimization.',
      'Own frontend technical decisions, code-review standards and architecture reviews across a team of 3–5 developers.',
      'Partner with product and backend teams to ship features using REST APIs and WebSocket services.',
    ],

    highlights: [
      'Real-time market dashboards',
      '20+ reusable UI components',
      '40% faster page loads',
      'Technical leadership · 3–5 developers',
    ],

    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'Redux',
      'WebSocket',
      'REST API',
      'Tailwind CSS',
    ],
  },

  {
    company: 'CPT Markets',
    location: 'Dubai, UAE',
    role: 'Senior Frontend Developer',
    period: 'March 2021 — September 2025',
    current: false,

    summary:
      'Developed and maintained global Forex trading platforms, analytics dashboards and multilingual customer experiences.',

    achievements: [
      'Developed global trading platforms using React, Next.js and Vue.js.',
      'Implemented multilingual support using internationalization for global markets.',
      'Built interactive financial analytics dashboards using Highcharts.',
      'Integrated REST APIs, WebSocket services and third-party financial systems.',
      'Worked closely with UX designers, backend engineers and product teams.',
      'Mentored junior developers and improved frontend code-quality standards.',
    ],

    highlights: [
      'Global trading platforms',
      'Multilingual applications',
      'Interactive financial dashboards',
      'Reusable UI components',
    ],

    stack: [
      'React',
      'Next.js',
      'Vue.js',
      'TypeScript',
      'Highcharts',
      'WebSocket',
      'REST API',
      'i18n',
    ],
  },

  {
    company: 'Micro Pro LLC — General Authority of Sports',
    location: 'Dubai, UAE',
    role: 'Frontend Developer',
    period: 'February 2017 — February 2021',
    current: false,

    summary:
      'Delivered secure, accessible UAE government applications using Angular and TypeScript, with multilingual Arabic RTL and English LTR experiences aligned with UAE TDRA standards.',

    achievements: [
      'Developed responsive and interactive government web applications using Angular, TypeScript, JavaScript, HTML5 and CSS3.',
      'Built reusable Angular components and consistent multilingual Arabic RTL and English LTR interfaces.',
      'Delivered accessible WCAG 2.1 AA and UAE TDRA-aligned government interfaces.',
      'Integrated REST APIs and collaborated with backend, UI/UX and stakeholder teams on scalable government services.',
      'Applied Content Security Policy and XSS/CSRF mitigation for secure frontend delivery.',
      'Optimized application performance, responsive behaviour and cross-browser compatibility.',
    ],

    highlights: [
      'Angular government applications',
      'Arabic RTL & English LTR',
      'WCAG 2.1 AA & UAE TDRA',
      'Secure REST API integration',
    ],

    stack: [
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'REST APIs',
      'WCAG 2.1 AA',
      'UAE TDRA',
    ],
  },
]
