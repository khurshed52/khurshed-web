import type { JobMatchResult } from '@/types/jobMatch'

const allowedVerdicts = [
  'Excellent Match',
  'Strong Match',
  'Moderate Match',
  'Low Match',
] as const

export function validateJobMatchResult(
  value: unknown,
): JobMatchResult {
  if (!value || typeof value !== 'object') {
    throw new Error('Invalid AI response')
  }

  const result = value as Partial<JobMatchResult>

  if (
    typeof result.score !== 'number' ||
    !Number.isFinite(result.score)
  ) {
    throw new Error('Invalid score')
  }

  if (
    typeof result.verdict !== 'string' ||
    !allowedVerdicts.includes(
      result.verdict as (typeof allowedVerdicts)[number],
    )
  ) {
    throw new Error('Invalid verdict')
  }

  if (typeof result.summary !== 'string') {
    throw new Error('Invalid summary')
  }

  if (!Array.isArray(result.matchedSkills)) {
    throw new Error('Invalid matched skills')
  }

  if (!Array.isArray(result.missingSkills)) {
    throw new Error('Invalid missing skills')
  }

  if (!Array.isArray(result.strengths)) {
    throw new Error('Invalid strengths')
  }

  if (!Array.isArray(result.recommendations)) {
    throw new Error('Invalid recommendations')
  }

  if (typeof result.disclaimer !== 'string') {
    throw new Error('Invalid disclaimer')
  }

  return {
    score: Math.max(
      0,
      Math.min(100, Math.round(result.score)),
    ),

    verdict: result.verdict as JobMatchResult['verdict'],

    summary: result.summary.trim(),

    matchedSkills: result.matchedSkills
      .filter(
        (
          item,
        ): item is {
          skill: string
          evidence: string
        } =>
          Boolean(item) &&
          typeof item === 'object' &&
          typeof item.skill === 'string' &&
          typeof item.evidence === 'string',
      )
      .slice(0, 10),

    missingSkills: result.missingSkills
      .filter(
        (item): item is string =>
          typeof item === 'string',
      )
      .slice(0, 8),

    strengths: result.strengths
      .filter(
        (item): item is string =>
          typeof item === 'string',
      )
      .slice(0, 6),

    recommendations: result.recommendations
      .filter(
        (item): item is string =>
          typeof item === 'string',
      )
      .slice(0, 5),

    disclaimer: result.disclaimer.trim(),
  }
}