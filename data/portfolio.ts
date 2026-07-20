export const profile = {
  name: 'Khurshed Khan',
  location: 'Dubai, UAE',
  role: 'Senior Frontend Developer',
  experience: '9+ years',
  passion: 'Building delightful digital products',
  intro:
    'Frontend Engineer with 9+ years of experience building scalable, high-performance web applications using React, Next.js, and TypeScript. Passionate about crafting intuitive user experiences, clean architecture, and performant solutions that deliver real business value',
  email: 'hello@example.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
}

export const projects = [
  {
    name: 'TradePro AI Trading Platform',
    description:
      'An AI-powered Forex trading platform that enables secure user onboarding with KYC verification, wallet deposits, live market trading, portfolio management, and AI-driven trading insights to support smarter investment decisions.',

    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'GSAP', 'Ant Design'],

    image: '/projects/tradepro.png',

    live: 'https://ai-trading-platfrom.vercel.app',

    github: 'https://github.com/khurshed52/ai-trading-platfrom',

    featured: true,

    hasGithub: true,
  },

  {
    name: 'Trive Client Portal',

    description:
      'A secure Forex trading platform that streamlines user registration, KYC verification, wallet deposits, and seamless trading through MetaTrader 4 (MT4) and MetaTrader 5 (MT5), providing a reliable experience for global traders.',

    stack: ['Angular', 'TypeScript', 'NgRx', 'Ant Design', 'PSP Integration'],

    image: '/projects/trive-portal.png',

    live: 'https://global-int.trive.com/',

    github: '',

    featured: true,

    hasGithub: false,
  },

  {
    name: 'CPT Markets Website',

    description:
      'CPT Markets is a global trading service company providing Forex and CFDs trading services we provide the fastest and secure trading platforms for traders from all over the world.',

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
      'Reusable component architecture',
      '40% faster page loads',
      'Frontend team leadership',
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
]