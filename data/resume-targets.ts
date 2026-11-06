export const resumeTargets = {
  default: {
    filename: 'Khurshed-Khan-Resume.pdf',
  },
  'uae-fullstack': {
    filename: 'Khurshed-Khan-Resume-UAE-FullStack.pdf',
    role: 'Full Stack Developer',
    summary:
      'Full Stack Developer with 9+ years of experience building scalable, high-performance FinTech and enterprise web applications, plus hands-on full-stack project experience using React.js, Next.js, TypeScript, Node.js, Express.js, PostgreSQL, and Prisma ORM. Experienced in secure REST APIs, real-time WebSocket workflows, WCAG-aligned interfaces, financial transactions, and Gemini-powered features. Combines senior frontend architecture expertise with practical backend, database, and API integration experience to deliver secure, maintainable applications. Foundational understanding of Java and Spring Boot.',
    skillGroupOrder: [
      'Frontend Technologies',
      'Backend & API Development',
      'State Management & UI',
      'Integrations',
      'Quality & Performance',
      'AI & LLM Integration',
      'Visualization, GIS & Media',
      'Tools & Technologies',
    ],
    skillAdditions: {
      'Backend & API Development': [
        'Java (Foundational Knowledge)',
        'Spring Boot (Foundational Knowledge)',
      ],
      'Tools & Technologies': ['Docker'],
    },
    experienceOverrides: {
      'Trive International': {
        role: 'Full Stack Developer',
        achievementReplacements: {
          0: 'Led application architecture and delivery of Forex/CFD trading platforms using React.js, Next.js, and TypeScript.',
          3: 'Built real-time trading and monitoring dashboards, integrating high-frequency WebSocket data streams with reliable loading, error-handling, and reconnect workflows.',
          7: 'Delivered end-to-end trading features across the frontend and integration layers, partnering with backend teams to define REST and WebSocket contracts for live pricing and trading data.',
        },
        highlights: [
          'application architecture and delivery',
          'end-to-end trading features',
          'frontend and integration layers',
          'REST and WebSocket contracts',
          'live pricing and trading data',
        ],
      },
    },
  },
  'angular-frontend': {
    filename: 'Khurshed-Khan-Resume-Angular.pdf',
    role: 'Senior Frontend Developer',
    summary:
      'Senior Frontend Developer with 9+ years building scalable FinTech, trading, enterprise, and government applications. Strong expertise in Angular 20/21, TypeScript, React.js, Next.js, and Vue.js, with backend experience in Node.js, Express.js, PostgreSQL, and Prisma ORM. Delivered four years of Angular-based UAE government applications featuring reusable components, REST APIs, Arabic RTL and English LTR interfaces, WCAG 2.1 AA accessibility, TDRA alignment, and frontend security. Also experienced in WebSockets, secure financial workflows, and Gemini API integration.',
    skillGroupOrder: [
      'Frontend Technologies',
      'State Management & UI',
      'Backend & API Development',
      'Integrations',
      'Quality & Performance',
      'AI & LLM Integration',
      'Visualization, GIS & Media',
      'Tools & Technologies',
    ],
    skillReplacements: {
      'Frontend Technologies': [
        'Angular 20/21',
        'TypeScript',
        'JavaScript (ES6+)',
        'React.js',
        'Next.js',
        'Vue.js',
        'NgRx',
        'Redux',
        'TanStack Query (React Query)',
        'Context API',
        'HTML5',
        'CSS3',
      ],
      'State Management & UI': [
        'NgRx',
        'Pinia',
        'Redux',
        'TanStack Query (React Query)',
        'Context API',
        'Angular Material',
        'Tailwind CSS',
        'Bootstrap',
        'Ant Design',
      ],
    },
    experienceOverrides: {
      'Trive International': {
        role: 'Senior Frontend Developer',
        achievementReplacements: {
          2: 'Delivered Angular 20/21 client portal features using TypeScript and NgRx, including authentication, KYC, account management, and payment workflows.',
        },
        highlights: [
          'Angular 20/21 client portal features',
          'TypeScript and NgRx',
          'authentication, KYC, account management, and payment workflows',
        ],
      },
      'Micro Pro LLC — General Authority of Sports': {
        role: 'Frontend Developer',
        achievementReplacements: {
          0: 'Developed responsive, accessible, and interactive UAE government applications using Angular, TypeScript, JavaScript, HTML5, and CSS3.',
          1: 'Built reusable Angular components and integrated REST APIs to deliver maintainable and scalable government digital services.',
          2: 'Implemented multilingual Arabic (RTL) and English (LTR) interfaces, maintaining consistent layouts, typography, and user experience across languages.',
          3: 'Delivered WCAG 2.1 AA and UAE TDRA-aligned interfaces, applied CSP and XSS/CSRF mitigation, and improved frontend performance and cross-browser compatibility.',
        },
        highlights: [
          'UAE government applications',
          'Angular',
          'reusable Angular components',
          'REST APIs',
          'Arabic (RTL) and English (LTR) interfaces',
          'WCAG 2.1 AA accessibility and UAE TDRA standards',
          'CSP and XSS/CSRF mitigation',
        ],
      },
    },
    projectOrder: [
      'Trive Client Portal',
      'TradePro — AI-Powered Trading Platform',
      'CPT Markets',
    ],
    projectOverrides: {
      'Trive Client Portal': {
        name: 'Trive Client Portal — Angular Trading Platform',
        role: 'Senior Frontend Developer | Angular 20/21 & TypeScript',
        software: [
          'Angular 20/21',
          'TypeScript',
          'NgRx',
          'Ant Design',
          'REST APIs',
          'Authentication',
          'KYC',
          'PSP Integration',
          'MT4',
          'MT5',
        ],
        responsibilities: [
          'Developed responsive and scalable client portal interfaces using Angular 20/21, TypeScript, and Ant Design.',
          'Built secure registration, authentication, KYC verification, and client profile management workflows.',
          'Managed user sessions, trading workflows, and application state using NgRx.',
          'Integrated REST APIs for MetaTrader 4 (MT4), MetaTrader 5 (MT5), and real-time client account management.',
          'Integrated payment service providers to support secure wallet deposits, withdrawals, and transaction processing.',
        ],
      },
    },
  },
} as const

export type ResumeTarget = keyof typeof resumeTargets

export function parseResumeTarget(
  value: string | null | undefined,
): ResumeTarget {
  if (value === 'uae-fullstack') return 'uae-fullstack'
  if (value === 'angular-frontend') return 'angular-frontend'
  return 'default'
}
