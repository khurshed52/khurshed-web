import { SectionShell } from '../SectionShell'

export function AboutSection() {
  const skills = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GSAP', 'PostgreSQL', 'Figma']

  return (
    <SectionShell id="about" title="About.md">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-lg border border-border bg-panel p-6 leading-8 text-zinc-300">
          <p className="mb-4 text-2xl font-bold text-zinc-100"># About me</p>
          <p>I&apos;m a product-minded engineer who enjoys turning complex requirements into simple, fast and maintainable interfaces.</p>
          <p className="mt-4">My work sits at the intersection of engineering, design systems and motion—where every interaction should feel intentional.</p>
        </div>
        <div className="rounded-lg border border-border bg-panel p-6">
          <p className="mb-4 text-zinc-100">## Toolkit</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="rounded border border-border bg-editor px-3 py-2 text-xs text-mint">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
