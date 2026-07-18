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
  "name": "khurshed.dev",
  "version": "2.0.0",
  "private": true,
  "author": "Khurshed Khan",
  "description": "Personal Developer Portfolio",

  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write ."
  },

  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "gsap": "^3.12.0",
    "lucide-react": "^0.468.0",
    "framer-motion": "^11.0.0"
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
  website: "https://khurshedkhan.dev",

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

NEXT_PUBLIC_SITE_URL="https://khurshed.dev"

NEXT_PUBLIC_ROLE="Senior Frontend Engineer"

NEXT_PUBLIC_LOCATION="Dubai, UAE"

NEXT_PUBLIC_AVAILABILITY="Open to Work"

NEXT_PUBLIC_EMAIL="khurshedkhan52@gmail.com"

NEXT_PUBLIC_GITHUB="https://github.com/khurshed52"

NEXT_PUBLIC_LINKEDIN="https://www.linkedin.com/in/khurshed-khan-a30b0159/"
`,
}