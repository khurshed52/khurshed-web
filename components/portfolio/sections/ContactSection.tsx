import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '@/data/portfolio'
import { SectionShell } from '../SectionShell'

export function ContactSection() {
  return (
    <SectionShell id="contact" title="contact.tsx">
      <div className="rounded-lg border border-border bg-panel p-7 sm:p-10">
        <p className="text-3xl font-bold text-zinc-100">Let&apos;s build something useful.</p>
        <p className="mt-4 max-w-2xl leading-7 text-zinc-400">Have a project, role or idea in mind? Send a message and tell me what you&apos;re working on.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 rounded bg-accent px-4 py-3 text-white transition hover:brightness-110"><Mail size={17} /> Email me</a>
          <a href={profile.github} className="flex items-center gap-2 rounded border border-border px-4 py-3 hover:border-zinc-500"><Github size={17} /> GitHub</a>
          <a href={profile.linkedin} className="flex items-center gap-2 rounded border border-border px-4 py-3 hover:border-zinc-500"><Linkedin size={17} /> LinkedIn</a>
        </div>
      </div>
    </SectionShell>
  )
}
