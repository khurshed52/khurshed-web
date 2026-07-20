import type { Metadata } from 'next'

import { ResumeDocument } from '@/components/resume/ResumeDocument'

import './resume.css'
import { ibmPlexSans } from '@/app/fonts'

export const metadata: Metadata = {
  title: 'Khurshed Khan Resume',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResumeSourcePage() {
  return (
    <main className={`${ibmPlexSans.variable} resume-source-page`}>
      <ResumeDocument />
    </main>
  )
}