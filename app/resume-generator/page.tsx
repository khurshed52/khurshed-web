import type { Metadata } from 'next'

import { ResumePreview } from '@/components/resume/ResumePreview'

export const metadata: Metadata = {
  title: 'Resume Generator | Khurshed Khan',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResumeGeneratorPage() {
  return (
    <main className="resume-generator-page min-h-screen bg-editor">
      <ResumePreview />
    </main>
  )
}
