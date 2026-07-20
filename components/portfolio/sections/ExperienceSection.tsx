import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Code2,
  GitCommitHorizontal,
  MapPin,
  Sparkles,
} from 'lucide-react'

import { experience } from '@/data/portfolio'
import { SectionShell } from '../SectionShell'

type ExperienceItem = (typeof experience)[number]

export function ExperienceSection() {
  return (
    <SectionShell id="experience" title="experience.json">
      <div className="relative">
        <div className="absolute bottom-0 left-[17px] top-3 hidden w-px bg-gradient-to-b from-accent via-purple-500/50 to-transparent sm:block" />

        <div className="space-y-8">
          {experience.map((item, index) => (
            <article
              key={`${item.company}-${item.period}`}
              className="relative sm:pl-14"
            >
              <div
                className={`absolute left-0 top-8 hidden h-9 w-9 items-center justify-center rounded-full border sm:flex ${
                  item.current
                    ? 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.25)]'
                    : 'border-accent/40 bg-accent/10 text-accent'
                }`}
              >
                <GitCommitHorizontal size={18} />
              </div>

              <div className="group overflow-hidden rounded-2xl border border-border bg-panel transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {/* <div className="border-b border-border bg-[#1b1b1b] px-6 py-5 sm:px-8">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="text-xs text-zinc-500">
                          commit {String(index + 1).padStart(2, '0')}
                        </span>

                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                            Current role
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-zinc-100 sm:text-3xl">
                        {item.role}
                      </h3>

                      <p className="mt-2 text-base font-semibold text-mint">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 text-xs text-zinc-400 sm:flex-row lg:flex-col lg:items-end">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays size={14} className="text-accent" />
                        {item.period}
                      </span>

                      <span className="inline-flex items-center gap-2">
                        <MapPin size={14} className="text-purple-400" />
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div> */}

                <div className="grid gap-8 p-6 sm:p-8 xl:grid-cols-[310px_1fr]">
                  <aside className="space-y-6">
                    <ExperienceJson item={item} index={index} />

                    <div className="rounded-xl border border-border bg-editor/80 p-5">
                      <h4 className="mb-4 text-sm font-semibold text-zinc-100">
                        Technology stack
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {item.stack.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-xs text-mint transition hover:border-accent/60 hover:bg-accent/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </aside>

                  <div>
                    <div className="mb-7 flex gap-3">
                      <BriefcaseBusiness
                        size={20}
                        className="mt-1 shrink-0 text-accent"
                      />

                      <p className="max-w-3xl leading-7 text-zinc-300">
                        {item.summary}
                      </p>
                    </div>

                    <div>
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-200">
                        <Code2 size={16} className="text-mint" />
                        Key contributions
                      </h4>

                      <ul className="space-y-3">
                        {item.achievements.map((achievement) => (
                          <li
                            key={achievement}
                            className="flex gap-3 leading-7 text-zinc-400"
                          >
                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                              <Check size={12} />
                            </span>

                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 rounded-xl border border-border bg-editor/80 p-5">
                      <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold text-zinc-100">
                        <Sparkles size={16} className="text-yellow-300" />
                        Career highlights
                      </h4>

                      <div className="grid gap-3 sm:grid-cols-2">
                        {item.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="rounded-lg border border-border bg-panel px-3 py-3 text-xs leading-5 text-zinc-300"
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}

function ExperienceJson({
  item,
  index,
}: {
  item: ExperienceItem
  index: number
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-[#181818]">
      <div className="flex items-center justify-between border-b border-border bg-[#202020] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>

        <span className="text-[10px] text-zinc-500">
          experience-{String(index + 1).padStart(2, '0')}.json
        </span>
      </div>

      <div className="overflow-x-auto p-4 font-mono text-xs leading-6">
        <CodeRow>
          <span className="text-yellow-300">{'{'}</span>
        </CodeRow>

        <JsonProperty
          name="company"
          value={item.company}
          comma
        />

        <JsonProperty
          name="role"
          value={item.role}
          comma
        />

        <JsonProperty
          name="location"
          value={item.location}
          comma
        />

        <JsonProperty
          name="period"
          value={item.period}
          comma
        />

        <CodeRow indent>
          <span className="text-sky-300">&quot;current&quot;</span>
          <span className="text-zinc-500">: </span>
          <span className={item.current ? 'text-blue-400' : 'text-purple-400'}>
            {String(item.current)}
          </span>
        </CodeRow>

        <CodeRow>
          <span className="text-yellow-300">{'}'}</span>
        </CodeRow>
      </div>
    </div>
  )
}

function JsonProperty({
  name,
  value,
  comma = false,
}: {
  name: string
  value: string
  comma?: boolean
}) {
  return (
    <CodeRow indent>
      <span className="text-sky-300">
        &quot;{name}&quot;
      </span>

      <span className="text-zinc-500">: </span>

      <span className="text-orange-300">
        &quot;{value}&quot;
      </span>

      {comma && <span className="text-zinc-500">,</span>}
    </CodeRow>
  )
}

function CodeRow({
  children,
  indent = false,
}: {
  children: React.ReactNode
  indent?: boolean
}) {
  return (
    <div className={indent ? 'pl-4' : undefined}>
      {children}
    </div>
  )
}