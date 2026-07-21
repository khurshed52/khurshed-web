'use client'

import {
  AlertCircle,
  Check,
  ClipboardCheck,
  LoaderCircle,
  Search,
  Sparkles,
  Target,
} from 'lucide-react'
import { FormEvent, useState } from 'react'

import type { JobMatchResult } from '@/types/jobMatch'

const MAX_CHARACTERS = 12_000

export function JobMatchAnalyzer() {
  const [jobDescription, setJobDescription] =
    useState('')

  const [result, setResult] =
    useState<JobMatchResult | null>(null)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] =
    useState(false)

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const value = jobDescription.trim()

    if (value.length < 100) {
      setError(
        'Please paste a detailed job description.',
      )

      return
    }

    setError('')
    setResult(null)
    setIsLoading(true)

    try {
      const response = await fetch(
        '/api/job-match',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            jobDescription: value,
          }),
        },
      )

      const data: {
        result?: JobMatchResult
        error?: string
      } = await response.json()

      if (!response.ok || !data.result) {
        throw new Error(
          data.error ??
            'Unable to analyse the job description.',
        )
      }

      setResult(data.result)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Something went wrong.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2 text-sm text-emerald-400">
          <Sparkles size={16} />
          AI Recruiter Tool
        </div>

        <h2 className="text-3xl font-semibold text-zinc-100 sm:text-4xl">
          Job Description Match
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Paste a job description to compare its
          requirements with my documented experience,
          projects and technical skills.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 sm:p-6"
      >
        <label
          htmlFor="job-description"
          className="mb-3 block text-sm font-medium text-zinc-200"
        >
          Job description
        </label>

        <textarea
          id="job-description"
          value={jobDescription}
          onChange={(event) => {
            setJobDescription(
              event.target.value.slice(
                0,
                MAX_CHARACTERS,
              ),
            )

            if (error) {
              setError('')
            }
          }}
          placeholder="Paste the complete job description here..."
          rows={12}
          disabled={isLoading}
          className="min-h-72 w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-zinc-500">
            {jobDescription.length.toLocaleString()} /{' '}
            {MAX_CHARACTERS.toLocaleString()}
          </span>

          <button
            type="submit"
            disabled={
              isLoading ||
              jobDescription.trim().length < 100
            }
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                Analysing match...
              </>
            ) : (
              <>
                <Search size={17} />
                Analyse Match
              </>
            )}
          </button>
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
          >
            <AlertCircle
              size={17}
              className="mt-0.5 shrink-0"
            />
            <span>{error}</span>
          </div>
        ) : null}
      </form>

      {result ? (
        <JobMatchResults result={result} />
      ) : null}
    </section>
  )
}

function JobMatchResults({
  result,
}: {
  result: JobMatchResult
}) {
  return (
    <div
      aria-live="polite"
      className="mt-6 space-y-5"
    >
      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Target size={17} />
            Match score
          </div>

          <div className="mt-5 flex items-end gap-2">
            <strong className="text-6xl font-semibold tracking-tight text-emerald-400">
              {result.score}
            </strong>

            <span className="pb-2 text-lg text-zinc-500">
              /100
            </span>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-emerald-500 transition-[width] duration-700"
              style={{
                width: `${result.score}%`,
              }}
            />
          </div>

          <p className="mt-4 font-medium text-zinc-100">
            {result.verdict}
          </p>
        </article>

        <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <ClipboardCheck size={17} />
            Candidate summary
          </div>

          <p className="mt-4 leading-7 text-zinc-300">
            {result.summary}
          </p>
        </article>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <ResultCard title="Matched requirements">
          {result.matchedSkills.length ? (
            <div className="space-y-4">
              {result.matchedSkills.map(
                (item, index) => (
                  <div
                    key={`${item.skill}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                      <Check size={13} />
                    </span>

                    <div>
                      <p className="font-medium text-zinc-200">
                        {item.skill}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-zinc-500">
                        {item.evidence}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          ) : (
            <EmptyResult />
          )}
        </ResultCard>

        <ResultCard title="Potential gaps">
          {result.missingSkills.length ? (
            <ul className="space-y-3">
              {result.missingSkills.map(
                (item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="flex items-start gap-3 text-sm leading-6 text-zinc-400"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          ) : (
            <EmptyResult text="No major gaps were identified." />
          )}
        </ResultCard>

        <ResultCard title="Relevant strengths">
          <ResultList items={result.strengths} />
        </ResultCard>

        <ResultCard title="Positioning recommendations">
          <ResultList
            items={result.recommendations}
          />
        </ResultCard>
      </div>

      <p className="rounded-lg border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-xs leading-5 text-zinc-500">
        {result.disclaimer}
      </p>
    </div>
  )
}

function ResultCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 sm:p-6">
      <h3 className="mb-5 text-base font-medium text-zinc-100">
        {title}
      </h3>

      {children}
    </article>
  )
}

function ResultList({
  items,
}: {
  items: string[]
}) {
  if (!items.length) {
    return <EmptyResult />
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li
          key={`${item}-${index}`}
          className="flex items-start gap-3 text-sm leading-6 text-zinc-400"
        >
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-400" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function EmptyResult({
  text = 'No items were returned.',
}: {
  text?: string
}) {
  return (
    <p className="text-sm text-zinc-500">
      {text}
    </p>
  )
}