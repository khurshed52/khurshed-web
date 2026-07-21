import type { EditorFile, Section } from './types'

export const defaultTabs: EditorFile[] = [
  'Home.tsx',
  'About.md',
  'projects.json',
  'experience.json',
  'contact.ts',
  'Resume.pdf',
]

export const sectionFiles: Record<Section, EditorFile> = {
  home: 'Home.tsx',
  about: 'About.md',
  projects: 'projects.json',
  experience: 'experience.json',
  contact: 'contact.ts',
}

export const fileContents: Partial<Record<EditorFile, string>> = {
  'package.json': `{
  "name": "khurshed-khan",
  "version": "1.0.0",
  "private": true,

  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },

  "dependencies": {
    "@google/genai": "^2.12.0",
    "@sparticuz/chromium": "149.0.0",
    "@types/node": "^20.14.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "clsx": "^2.1.1",
    "gsap": "^3.12.5",
    "lucide-react": "^0.468.0",
    "next": "^14.2.5",
    "postcss": "^8.4.40",
    "puppeteer-core": "25.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-markdown": "^10.1.0",
    "remark-gfm": "^4.0.1",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.4"
  },

  "devDependencies": {
    "puppeteer": "25.1.0"
  }
}`,

  'contact.ts': `/**
 * -----------------------------------------
 * Khurshed Khan
 * Senior Frontend Engineer
 * -----------------------------------------
 */

export const contact = {
  // 📧 Email
  email: "khurshedkhan52@gmail.com",

  // 🌐 Portfolio
  website: "https://www.khurshedkhan.dev/",

  // 💼 LinkedIn
  linkedin: "https://www.linkedin.com/in/khurshed-khan-a30b0159/",

  // 💻 GitHub
  github: "https://github.com/khurshed52",

  // 📍 Location
  location: "Dubai, UAE",

  // 📱 Phone
  phone: "+971 55 955 3204",

  // 💬 Availability
  available: true,
}

export default contact
`,

  '.gitignore': `# Dependencies
node_modules/

# Next.js
.next/
out/

# Production
build/
dist/

# Environment Variables
.env
.env.local
.env.production

# Logs
npm-debug.log*
pnpm-debug.log*
yarn-error.log*

# IDE
.vscode/

# macOS
.DS_Store

# Vercel
.vercel/
`,

  '.env.local': `# ----------------------------------------
# Portfolio Configuration
# ----------------------------------------

NEXT_PUBLIC_SITE_NAME="Khurshed Khan"

NEXT_PUBLIC_SITE_URL="https://www.khurshedkhan.dev/"

NEXT_PUBLIC_ROLE="Senior Frontend Engineer"

NEXT_PUBLIC_LOCATION="Dubai, UAE"

NEXT_PUBLIC_AVAILABILITY="Open to Work"

NEXT_PUBLIC_EMAIL="khurshedkhan52@gmail.com"

NEXT_PUBLIC_GITHUB="https://github.com/khurshed52"

NEXT_PUBLIC_LINKEDIN="https://www.linkedin.com/in/khurshed-khan-a30b0159/"
`,
}