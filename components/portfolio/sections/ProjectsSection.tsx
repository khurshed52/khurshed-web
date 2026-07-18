import { projects } from '@/data/portfolio'
import { SectionShell } from '../SectionShell'

export function ProjectsSection() {
  return (
    <SectionShell id="projects" title="projects.json">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <a key={project.name} href={project.href} className="group rounded-lg border border-border bg-panel p-6 transition hover:-translate-y-1 hover:border-accent/70 hover:shadow-glow">
            <p className="mb-2 text-xs text-zinc-500">{String(index + 1).padStart(2, '0')}</p>
            <h3 className="text-xl font-bold text-zinc-100 group-hover:text-accent">{project.name}</h3>
            <p className="mt-3 leading-7 text-zinc-400">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => <span key={item} className="text-xs text-mint">{item}</span>)}
            </div>
          </a>
        ))}
      </div>
    </SectionShell>
  )
}
