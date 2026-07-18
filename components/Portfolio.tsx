'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import {
  ChevronDown,
  ChevronRight,
  Code2,
  FileCode2,
  FileJson2,
  FileText,
  Folder,
  FolderOpen,
  Github,
  Linkedin,
  Mail,
  Menu,
  Search,
  Settings,
  BriefcaseBusiness,
  MapPin,
  Rocket,
  ShieldCheck,
  X,
} from 'lucide-react'
import { experience, profile, projects } from '@/data/portfolio'

const tabs = ['Home.tsx', 'About.md', 'projects.json', 'experience.json', 'Resume.pdf']

type Section = 'home' | 'about' | 'projects' | 'experience' | 'contact'

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<Section>('home')
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      gsap.from('[data-animate="chrome"]', { opacity: 0, duration: 0.5, ease: 'power2.out' })
      gsap.from('[data-animate="hero"]', {
        y: 24,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.15,
      })
      gsap.from('[data-animate="terminal"]', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.45,
      })

      const orbit = orbitRef.current

if (orbit) {
  const center = orbit.querySelector('[data-orbit-center]')
  const rings = orbit.querySelectorAll('[data-orbit-ring]')
  const cards = orbit.querySelectorAll('[data-orbit-card]')
  const dots = orbit.querySelectorAll('[data-orbit-dot]')

  const orbitTimeline = gsap.timeline({
    defaults: {
      ease: 'power3.out',
    },
  })

  orbitTimeline
    .from(orbit, {
      opacity: 0,
      y: 35,
      scale: 0.97,
      duration: 0.8,
    })
    .from(
      rings,
      {
        scale: 0.4,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
      },
      '-=0.4'
    )
    .from(
      center,
      {
        scale: 0,
        rotate: -20,
        opacity: 0,
        duration: 0.75,
        ease: 'back.out(1.8)',
      },
      '-=0.5'
    )
    .from(
      cards,
      {
        scale: 0.75,
        opacity: 0,
        stagger: 0.12,
        duration: 0.55,
        ease: 'back.out(1.5)',
      },
      '-=0.4'
    )
    .from(
      dots,
      {
        scale: 0,
        opacity: 0,
        stagger: 0.05,
        duration: 0.35,
      },
      '-=0.3'
    )

  gsap.to('[data-orbit-rotate="slow"]', {
    rotate: 360,
    duration: 24,
    repeat: -1,
    ease: 'none',
    transformOrigin: 'center center',
  })

  gsap.to('[data-orbit-rotate="reverse"]', {
    rotate: -360,
    duration: 18,
    repeat: -1,
    ease: 'none',
    transformOrigin: 'center center',
  })

  gsap.to(cards, {
    y: -8,
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    stagger: {
      each: 0.35,
      from: 'random',
    },
    ease: 'sine.inOut',
  })

  gsap.to(center, {
    scale: 1.04,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
}
    }, root)
    return () => ctx.revert()
  }, [])

  const navigate = (section: Section) => {
    setActive(section)
    setMobileNav(false)
    requestAnimationFrame(() => {
      const el = document.getElementById(section)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <div ref={root} className="min-h-screen bg-editor font-mono text-sm text-zinc-300">
      <div data-animate="chrome" className="fixed inset-x-0 top-0 z-50 flex h-11 items-center border-b border-border bg-[#181818]">
        <button onClick={() => setMobileNav(true)} className="px-3 text-zinc-400 lg:hidden" aria-label="Open navigation">
          <Menu size={19} />
        </button>
        <div className="hidden h-full w-12 items-center justify-center border-r border-border lg:flex">
          <Code2 className="text-accent" size={20} />
        </div>
        <div className="flex h-full min-w-0 flex-1 items-center overflow-hidden">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => navigate((['home','about','projects','experience','about'] as Section[])[index])}
              className={`flex h-full shrink-0 items-center gap-2 border-r border-border px-4 text-xs transition ${index === 0 ? 'border-t-2 border-t-accent bg-editor text-zinc-100' : 'text-zinc-500 hover:bg-[#202020] hover:text-zinc-300'}`}
            >
              {tab.endsWith('.tsx') && <FileCode2 size={14} className="text-sky-400" />}
              {tab.endsWith('.md') && <FileText size={14} className="text-purple" />}
              {tab.endsWith('.json') && <FileJson2 size={14} className="text-yellow-300" />}
              {tab.endsWith('.pdf') && <FileText size={14} className="text-zinc-300" />}
              {tab}
            </button>
          ))}
        </div>
      </div>

      <aside data-animate="chrome" className="fixed bottom-0 left-0 top-11 hidden w-[310px] border-r border-border bg-sidebar lg:flex">
        <div className="flex w-12 flex-col items-center border-r border-border py-4 text-zinc-500">
          <FileCode2 className="mb-6 text-zinc-200" />
          <Search className="mb-6" />
          <Github className="mb-6" />
          <div className="mt-auto"><Settings /></div>
        </div>
        <div className="flex-1 py-3">
          <p className="px-5 pb-3 text-[11px] uppercase tracking-widest text-zinc-500">Explorer</p>
          <div className="px-2">
            <div className="mb-2 flex items-center gap-1 px-2 font-semibold text-zinc-300">
              <ChevronDown size={14} /> KHURSHED.DEV
            </div>
            <TreeItem label="data" icon={<FolderOpen size={15} />}>
              <TreeButton label="experience.json" onClick={() => navigate('experience')} icon={<FileJson2 size={14} className="text-yellow-300" />} />
              <TreeButton label="projects.json" onClick={() => navigate('projects')} icon={<FileJson2 size={14} className="text-yellow-300" />} />
            </TreeItem>
            <TreeItem label="public" icon={<Folder size={15} />}>
              <TreeButton label="Resume.pdf" onClick={() => navigate('about')} icon={<FileText size={14} />} />
            </TreeItem>
            <TreeItem label="src" icon={<FolderOpen size={15} />}>
              <TreeItem label="components" icon={<FolderOpen size={15} />} inset>
                <TreeButton label="Home.tsx" active onClick={() => navigate('home')} icon={<FileCode2 size={14} className="text-sky-400" />} />
              </TreeItem>
              <TreeItem label="pages" icon={<FolderOpen size={15} />} inset>
                <TreeButton label="About.md" onClick={() => navigate('about')} icon={<FileText size={14} className="text-purple" />} />
              </TreeItem>
            </TreeItem>
          </div>
        </div>
      </aside>

      {mobileNav && (
        <div className="fixed inset-0 z-[60] bg-black/70 lg:hidden" onClick={() => setMobileNav(false)}>
          <div className="h-full w-72 border-r border-border bg-sidebar p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-8 flex items-center justify-between">
              <span className="uppercase tracking-widest">Explorer</span>
              <button onClick={() => setMobileNav(false)}><X /></button>
            </div>
            {(['home','about','projects','experience','contact'] as Section[]).map((item) => (
              <button key={item} onClick={() => navigate(item)} className="block w-full border-b border-border py-3 text-left capitalize text-zinc-300">{item}</button>
            ))}
          </div>
        </div>
      )}

      <main className="pt-11 lg:pl-[310px]">
        <section id="home" className="min-h-screen px-5 py-4 sm:px-10 lg:px-16 xl:px-20">
          <div className="mx-auto max-w-6xl">
            <p data-animate="hero" className="mb-5 text-xs text-zinc-500">KHURSHED.DEV › src › components › Home.tsx</p>
            <div data-animate="hero">
  <h1 className="text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:text-4xl lg:text-4xl">
    Khurshed Khan
    <span className="ml-4 text-2xl font-medium text-accent sm:text-3xl lg:text-3xl">
      Frontend Engineer
    </span>
  </h1>

  <p className="mt-3 text-base text-zinc-400 sm:text-lg">
    Building fast, scalable and polished web experiences.
  </p>
</div>

       <div
  ref={orbitRef}
  data-animate="hero"
  className="relative mt-6 max-w-5xl overflow-hidden rounded-2xl border border-border bg-panel/80 px-4 py-2 shadow-glow sm:px-8 sm:py-2"
>
  <div
    className="pointer-events-none absolute inset-0 opacity-40"
    style={{
      backgroundImage:
        'radial-gradient(circle at 1px 1px, rgba(113,113,122,0.22) 1px, transparent 0)',
      backgroundSize: '24px 24px',
    }}
  />

  <div className="relative mx-auto h-[430px] max-w-4xl sm:h-[500px]">
    {/* Main outer orbit */}
    <div
      data-orbit-ring
      data-orbit-rotate="slow"
      className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/40 sm:h-[360px] sm:w-[360px]"
    >
      <span
        data-orbit-dot
        className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_18px_rgba(0,122,204,0.8)]"
      />

      <span
        data-orbit-dot
        className="absolute bottom-12 -left-2 h-3 w-3 rounded-full bg-purple shadow-[0_0_15px_rgba(192,132,252,0.8)]"
      />

      <span
        data-orbit-dot
        className="absolute bottom-8 right-4 h-3.5 w-3.5 rounded-full bg-mint shadow-[0_0_15px_rgba(52,211,153,0.8)]"
      />
    </div>

    {/* Inner rotating orbit */}
    <div
      data-orbit-ring
      data-orbit-rotate="reverse"
      className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 sm:h-[290px] sm:w-[290px]"
    >
      <span
        data-orbit-dot
        className="absolute left-5 top-8 h-3 w-3 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.8)]"
      />

      <span
        data-orbit-dot
        className="absolute bottom-5 right-14 h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_14px_rgba(253,224,71,0.8)]"
      />
    </div>

    {/* Decorative curved paths */}
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 900 500"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M190 120C280 145 300 210 355 235"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 10"
        className="text-accent/45"
      />

      <path
        d="M710 120C620 145 600 210 545 235"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 10"
        className="text-accent/45"
      />

      <path
        d="M190 385C280 360 300 300 355 275"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 10"
        className="text-accent/45"
      />

      <path
        d="M710 385C620 360 600 300 545 275"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 10"
        className="text-accent/45"
      />
    </svg>

    {/* Center profile */}
    <div
      data-orbit-center
      className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/40 bg-gradient-to-br from-blue-700 via-accent to-cyan-500 shadow-[0_0_60px_rgba(0,122,204,0.35)] sm:h-48 sm:w-48"
    >
      <div className="absolute inset-4 rounded-full border border-white/25" />
      <div className="absolute inset-8 rounded-full border border-white/15" />

      <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl font-bold text-white backdrop-blur sm:h-20 sm:w-20 sm:text-3xl">
        {profile.name
          .split(' ')
          .map((word) => word.charAt(0))
          .join('')
          .slice(0, 2)}
      </div>

      <p className="relative z-10 mt-3 text-sm font-bold uppercase tracking-wider text-white sm:text-base">
        {profile.name}
      </p>

      <p className="relative z-10 mt-1 text-[10px] uppercase tracking-[0.25em] text-white/70 sm:text-xs">
        Developer hub
      </p>
    </div>

    {/* Top left card */}
    <div
      data-orbit-card
      className="absolute left-0 top-3 z-30 flex min-w-[175px] items-center gap-3 rounded-xl border border-border bg-[#202020]/95 p-4 shadow-xl backdrop-blur sm:left-5 sm:top-8 sm:min-w-[210px]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
        <BriefcaseBusiness size={21} />
      </div>

      <div>
        <p className="font-semibold text-zinc-100">{profile.role}</p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Current role
        </p>
      </div>
    </div>

    {/* Top right card */}
    <div
      data-orbit-card
      className="absolute right-0 top-3 z-30 flex min-w-[175px] items-center gap-3 rounded-xl border border-border bg-[#202020]/95 p-4 shadow-xl backdrop-blur sm:right-5 sm:top-8 sm:min-w-[210px]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-lg">
        <Rocket size={21} />
      </div>

      <div>
        <p className="font-semibold text-zinc-100">
          {profile.experience}
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Experience
        </p>
      </div>
    </div>

    {/* Bottom left card */}
    <div
      data-orbit-card
      className="absolute bottom-3 left-0 z-30 flex min-w-[175px] items-center gap-3 rounded-xl border border-border bg-[#202020]/95 p-4 shadow-xl backdrop-blur sm:bottom-8 sm:left-5 sm:min-w-[210px]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple text-white shadow-lg">
        <MapPin size={21} />
      </div>

      <div>
        <p className="font-semibold text-zinc-100">
          {profile.location}
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Location
        </p>
      </div>
    </div>

    {/* Bottom right card */}
    <div
      data-orbit-card
      className="absolute bottom-3 right-0 z-30 flex min-w-[175px] items-center gap-3 rounded-xl border border-border bg-[#202020]/95 p-4 shadow-xl backdrop-blur sm:bottom-8 sm:right-5 sm:min-w-[210px]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg">
        <ShieldCheck size={21} />
      </div>

      <div>
        <p className="font-semibold text-zinc-100">
          Available to build
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Open to work
        </p>
      </div>
    </div>
  </div>
</div>

            <p data-animate="hero" className="mt-9 max-w-5xl text-lg leading-8 text-zinc-300 sm:text-xl">{profile.intro}</p>

            <div data-animate="terminal" className="mt-14 overflow-hidden rounded-md border border-border bg-[#181818]">
              <div className="flex h-10 items-center gap-6 border-b border-border px-4 text-xs uppercase tracking-wider text-zinc-500">
                <span className="border-b border-zinc-200 py-3 text-zinc-200">Terminal</span><span>Problems</span><span>Output</span>
              </div>
              <div className="space-y-1 p-5 text-sm sm:text-base">
                <p className="text-mint">{profile.name} — {profile.role} ({profile.location})</p>
                <p className="text-zinc-500">{profile.experience} • frontend • backend • animation • accessibility</p>
                <p className="text-zinc-500">Type <span className="text-sky-400">help</span> to explore, or use the sidebar.</p>
                <p className="text-mint">visitor@portfolio ~ $ <span className="inline-block h-5 w-2 animate-pulse bg-zinc-300 align-middle" /></p>
              </div>
            </div>
          </div>
        </section>

        <Section id="about" title="About.md">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div className="rounded-lg border border-border bg-panel p-6 leading-8 text-zinc-300">
              <p className="mb-4 text-2xl font-bold text-zinc-100"># About me</p>
              <p>I&apos;m a product-minded engineer who enjoys turning complex requirements into simple, fast and maintainable interfaces.</p>
              <p className="mt-4">My work sits at the intersection of engineering, design systems and motion—where every interaction should feel intentional.</p>
            </div>
            <div className="rounded-lg border border-border bg-panel p-6">
              <p className="mb-4 text-zinc-100">## Toolkit</p>
              <div className="flex flex-wrap gap-2">
                {['React','Next.js','TypeScript','Tailwind CSS','Node.js','GSAP','PostgreSQL','Figma'].map((skill) => (
                  <span key={skill} className="rounded border border-border bg-editor px-3 py-2 text-xs text-mint">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section id="projects" title="projects.json">
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
        </Section>

        <Section id="experience" title="experience.json">
          <div className="space-y-5">
            {experience.map((item) => (
              <div key={item.company} className="grid gap-4 rounded-lg border border-border bg-panel p-6 md:grid-cols-[180px_1fr]">
                <p className="text-sm text-zinc-500">{item.period}</p>
                <div><h3 className="text-xl font-bold text-zinc-100">{item.role}</h3><p className="mt-1 text-mint">{item.company}</p><p className="mt-3 leading-7 text-zinc-400">{item.summary}</p></div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="contact" title="contact.tsx">
          <div className="rounded-lg border border-border bg-panel p-7 sm:p-10">
            <p className="text-3xl font-bold text-zinc-100">Let&apos;s build something useful.</p>
            <p className="mt-4 max-w-2xl leading-7 text-zinc-400">Have a project, role or idea in mind? Send a message and tell me what you&apos;re working on.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 rounded bg-accent px-4 py-3 text-white transition hover:brightness-110"><Mail size={17}/> Email me</a>
              <a href={profile.github} className="flex items-center gap-2 rounded border border-border px-4 py-3 hover:border-zinc-500"><Github size={17}/> GitHub</a>
              <a href={profile.linkedin} className="flex items-center gap-2 rounded border border-border px-4 py-3 hover:border-zinc-500"><Linkedin size={17}/> LinkedIn</a>
            </div>
          </div>
        </Section>
      </main>
    </div>
  )
}

function Section({ id, title, children }: { id: Section; title: string; children: React.ReactNode }) {
  return <section id={id} className="border-t border-border px-5 py-20 sm:px-10 lg:px-16 xl:px-20"><div className="mx-auto max-w-6xl"><p className="mb-8 text-xs text-zinc-500">src › portfolio › {title}</p>{children}</div></section>
}
function CodeLine({ children, indent = false }: { children: React.ReactNode; indent?: boolean }) { return <p className={`leading-7 ${indent ? 'pl-5' : ''}`}>{children}</p> }
function TreeItem({ label, icon, children, inset = false }: { label: string; icon: React.ReactNode; children: React.ReactNode; inset?: boolean }) { return <div className={inset ? 'pl-4' : ''}><div className="flex items-center gap-1 px-2 py-1 text-zinc-400"><ChevronDown size={13}/>{icon}<span>{label}</span></div><div className="pl-4">{children}</div></div> }
function TreeButton({ label, icon, onClick, active = false }: { label: string; icon: React.ReactNode; onClick: () => void; active?: boolean }) { return <button onClick={onClick} className={`flex w-full items-center gap-2 px-3 py-1.5 text-left ${active ? 'bg-[#37373d] text-zinc-100' : 'text-zinc-400 hover:bg-[#2a2d2e]'}`}><ChevronRight size={12} className="opacity-0"/>{icon}<span>{label}</span></button> }
