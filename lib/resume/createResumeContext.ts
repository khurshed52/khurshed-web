import type { ResumeTarget } from '@/data/resume-targets'
import { getResumeData } from '@/lib/resume/getResumeData'

export function createResumeContext(
  target: ResumeTarget = 'default',
) {
  return getResumeData(target)
}
