import { experience } from '@/data/portfolio'
import { SectionShell } from '../SectionShell'

export function ExperienceSection() {
  return (
    <SectionShell id="experience" title="experience.json">
      <div className="space-y-5">
        {experience.map((item) => (
          <div key={item.company} className="grid gap-4 rounded-lg border border-border bg-panel p-6 md:grid-cols-[180px_1fr]">
            <p className="text-sm text-zinc-500">{item.period}</p>
            <div>
              <h3 className="text-xl font-bold text-zinc-100">{item.role}</h3>
              <p className="mt-1 text-mint">{item.company}</p>
              <p className="mt-3 leading-7 text-zinc-400">{item.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
