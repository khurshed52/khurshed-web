import type { Section } from './types'

export function SectionShell({ id, title, children }: { id: Section; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-border px-5 py-12 sm:px-10 lg:px-16 xl:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs text-zinc-500">src › portfolio › {title}</p>
        {children}
      </div>
    </section>
  )
}
