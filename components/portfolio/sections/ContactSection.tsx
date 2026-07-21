import { Github, Linkedin, Mail, ArrowRight, Sparkles } from "lucide-react";
import { profile } from "@/data/portfolio";
import { SectionShell } from "../SectionShell";

export function ContactSection() {
  return (
    <SectionShell id="contact" title="contact.tsx">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-panel px-4 py-6 sm:px-6 sm:py-6">
        {/* Background Glow */}
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)
            `,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Status */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-5 py-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>

            <span className="font-mono text-sm text-emerald-300">
              Available for new opportunities
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Let's build something{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
              useful.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-400">
            Have a project, role or idea in mind? Send a message and tell me
            what you're working on.
          </p>

          {/* Buttons */}
          <div className="mt-4 flex flex-col items-center justify-center gap-4 md:flex-row">
            <a
              href={`mailto:${profile.email}`}
              className="group flex h-14 min-w-[240px] items-center justify-center gap-3 rounded-2xl bg-accent px-8 text-lg font-medium text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-sky-500/40"
            >
              <Mail size={22} />

              Email me

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-2xl border border-border bg-white/[0.03] px-8 text-lg text-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-500 hover:bg-white/[0.05]"
            >
              <Github size={22} />

              GitHub

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex h-14 min-w-[220px] items-center justify-center gap-3 rounded-2xl border border-border bg-white/[0.03] px-8 text-lg text-zinc-200 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40 hover:bg-sky-500/5"
            >
              <Linkedin size={22} />

              LinkedIn

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>

          {/* Divider */}
          <div className="mx-auto mt-6 flex max-w-xl items-center gap-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-zinc-700" />

            <Sparkles className="text-sky-400" size={18} />

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-zinc-700" />
          </div>

          {/* Footer */}
          <p className="mt-6 text-sm text-zinc-500">
            Usually responds within <span className="text-white">24 hours</span>
          </p>
        </div>
      </div>
    </SectionShell>
  );
}