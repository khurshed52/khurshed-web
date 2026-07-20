import Image from 'next/image'
import Link from 'next/link'
import { Github, ArrowUpRight, Star } from 'lucide-react'

import { projects } from '@/data/portfolio'
import { SectionShell } from '../SectionShell'

export function ProjectsSection() {
  return (
    <SectionShell id="projects" title="projects.json">
      <div className="grid gap-7 lg:grid-cols-3">
        {projects.map((project, index) => (
          <article
            key={project.name}
            className="group overflow-hidden rounded-2xl border border-border bg-panel transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 hover:shadow-[0_0_35px_rgba(0,122,204,.15)]"
          >
            {/* Top */}

            <div className="flex items-center justify-between p-5">
              <span className="rounded-lg border border-accent/30 px-3 py-1 text-xs text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>

              {project.featured && (
                <span className="flex items-center gap-1 rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
                  <Star size={12} fill="currentColor" />
                  Featured
                </span>
              )}
            </div>

            {/* Screenshot */}

            <div className="px-5">
              <div className="overflow-hidden rounded-xl border border-border">
                <Image
                  src={project.image}
                  alt={project.name}
                  width={1200}
                  height={700}
                  className="transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Content */}

            <div className="p-5">
              <h3 className="text-lg font-bold text-zinc-100">
                {project.name}
              </h3>

              <p className="mt-2 text-zinc-400 leading-6 text-sm">
                {project.description}
              </p>

              {/* Tech */}

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-accent/20 bg-accent/5 px-3 py-1 text-xs text-mint"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Footer */}

              <div className="mt-8 flex items-center justify-between">
                <Link
                  href={project.live}
                  target="_blank"
                  className="flex items-center gap-2 text-accent transition hover:gap-3"
                >
                  View Project

                  <ArrowUpRight size={18} />
                </Link>

                {project.hasGithub && (
                  <Link
                    href={project.github}
                    target="_blank"
                    className="rounded-lg border border-border p-2 text-zinc-400 transition hover:border-accent hover:text-white"
                  >
                    <Github size={18} />
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}