import type { Metadata } from 'next'

import { ResumeDocument } from '@/components/resume/ResumeDocument'
import { parseResumeTarget } from '@/data/resume-targets'
import { getResumeData } from '@/lib/resume/getResumeData'

import './resume.css'
import { ibmPlexSans } from '@/app/fonts'

export const metadata: Metadata = {
  title: 'Khurshed Khan Resume',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ResumeSourcePage({
  searchParams,
}: {
  searchParams: { target?: string }
}) {
  const target = parseResumeTarget(searchParams.target)
  const data = getResumeData(target)

  return (
    <main
      className={`${ibmPlexSans.variable} resume-source-page`}
      data-resume-target={target}
    >
      <ResumeDocument data={data} />
    </main>
  )
}
