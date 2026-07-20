'use client'

import {
  Braces,
  Code2,
  Database,
  Layers3,
  MapPin,
  MonitorSmartphone,
  Palette,
  Server,
  Sparkles,
  UserRound,
  Workflow,
} from 'lucide-react'

const skillGroups = [
  {
    title: 'Frontend',
    icon: <MonitorSmartphone size={16} />,
    skills: [
      'React.js',
      'Vue.js',
      'Angular',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Redux Toolkit',
      'Context API',
    ],
  },
  {
    title: 'UI & Design',
    icon: <Palette size={16} />,
    skills: [
      'Responsive Design',
      'Angular Material',
      'Ant Design',
      'Tailwind CSS',
      'Figma',
      'GSAP',
      'Framer Motion',
    ],
  },
  {
    title: 'Backend & APIs',
    icon: <Server size={16} />,
    skills: [
      'Node.js',
      'REST APIs',
      'WebSocket',
      'API Integration',
      'Authentication',
      'Third-Party Services',
    ],
  },
  {
    title: 'Data & Tools',
    icon: <Database size={16} />,
    skills: [
      'Git',
      'GitHub',
      'Vercel',
      'Jest',
      'React Testing Library',
    ],
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-border px-5 py-10 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-8 text-xs text-zinc-500">
          src › portfolio › About.md
        </p>

        <div className="overflow-hidden rounded-2xl border border-border bg-panel shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
          <div className="grid lg:grid-cols-[1.05fr_.95fr]">
            <div className="relative border-b border-border p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.08),transparent_42%)]" />

              <div className="relative">
                
                <div className="space-y-5 text-base leading-7 text-zinc-300">
                  <p>
                   I build scalable, high-performance web applications using React, Next.js, and TypeScript, transforming complex business requirements into fast, intuitive, and reliable user experiences.
                  </p>

                  <p>
                   My expertise includes frontend architecture, reusable component systems, API integration, real-time applications, accessibility, and performance optimization, with a strong focus on clean, maintainable code.
                  </p>

                  <p>
                   I enjoy collaborating with product, design, and engineering teams to deliver polished, user-centric solutions that drive measurable business impact.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2">
                  {[
                    'Product-minded',
                    'Performance-focused',
                    'Accessible UI',
                    'Clean architecture',
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-zinc-700 bg-editor px-3 py-1.5 text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-purple-400/20 bg-purple-500/10 text-purple-300">
                    <Layers3 size={19} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-purple-400">
                      Expertise
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-zinc-100">
                      Toolkit
                    </h3>
                  </div>
                </div>

                <span className="rounded-full border border-border bg-editor px-3 py-1 text-[11px] text-zinc-500">
                  {skillGroups.reduce(
                    (total, group) => total + group.skills.length,
                    0
                  )}{' '}
                  skills
                </span>
              </div>

              <div className="max-h-[430px] space-y-6 overflow-y-auto pr-2 [scrollbar-color:#3f3f46_transparent] [scrollbar-width:thin]">
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-200">
                      <span className="text-mint">{group.icon}</span>
                      {group.title}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="group inline-flex items-center gap-2 rounded-lg border border-border bg-editor px-3 py-2 text-xs text-zinc-300 transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/5 hover:text-zinc-100"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-mint transition group-hover:shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-xs text-zinc-500">
                <Workflow size={15} className="text-accent" />
                Continuously learning and improving the stack
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-editor/80 p-4">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-sky-300">
        {icon}
      </div>

      <p className="text-[10px] uppercase tracking-widest text-zinc-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold leading-6 text-zinc-100">
        {value}
      </p>
    </div>
  )
}