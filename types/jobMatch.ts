export type JobMatchSkill = {
  skill: string
  evidence: string
}

export type JobMatchResult = {
  score: number
  verdict: 'Excellent Match' | 'Strong Match' | 'Moderate Match' | 'Low Match'
  summary: string
  matchedSkills: JobMatchSkill[]
  missingSkills: string[]
  strengths: string[]
  recommendations: string[]
  disclaimer: string
}