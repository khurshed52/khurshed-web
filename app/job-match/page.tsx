import { JobMatchAnalyzer } from '@/components/job-match/JobMatchAnalyzer'

export const metadata = {
  title: 'AI Job Match',
  description:
    'Compare a job description with my frontend engineering experience.',
}

export default function JobMatchPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-16 sm:px-6 lg:px-8">
      <JobMatchAnalyzer />
    </main>
  )
}