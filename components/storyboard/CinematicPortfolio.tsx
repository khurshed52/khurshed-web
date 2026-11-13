'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, CalendarDays, Code2, Github, Linkedin, Mail, MapPin, Monitor, Zap } from 'lucide-react'

import { experience, profile, projects } from '@/data/portfolio'

const chapters = ['Projects', 'Experience', 'Skills', 'Contact'] as const
const storyFrame = '/storyboard/dubai-fintech-workspace.png'
const storyVideos = [
  '/storyboard/monitor-fintech-dashboard.mp4',
  '/storyboard/dubai-fintech-workspace.mp4',
] as const
const heroMessages = [
  'scalable FinTech and Forex platforms.',
  'real-time dashboards for live markets.',
  'secure full-stack financial workflows.',
  'accessible multilingual government applications.',
  'AI-powered experiences with controlled backend access.',
] as const

const skillGroups = [
  ['Frontend systems', 'Angular 20/21', 'React.js', 'Next.js', 'TypeScript', 'Vue.js', 'NgRx'],
  ['Full-stack delivery', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'REST APIs', 'WebSockets'],
  ['Quality & intelligence', 'Playwright', 'WCAG 2.1 AA', 'Gemini API', 'Secure LLM integration', 'CI/CD'],
]

export default function CinematicPortfolio() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [heroMessage, setHeroMessage] = useState(0)
  const [activeVideo, setActiveVideo] = useState(0)
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)]

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(motionMedia.matches)
    update()
    motionMedia.addEventListener('change', update)
    return () => motionMedia.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const interval = window.setInterval(() => {
      setHeroMessage((current) => (current + 1) % heroMessages.length)
    }, 3400)
    return () => window.clearInterval(interval)
  }, [reducedMotion])

  useEffect(() => {
    const hero = document.getElementById('hero')
    const heroObserver = hero
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) setActiveChapter(null)
        }, { threshold: 0.55 })
      : null
    if (hero && heroObserver) heroObserver.observe(hero)

    const observers = chapters.map((chapter, index) => {
      const element = document.getElementById(chapter.toLowerCase())
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveChapter(index)
      }, { threshold: 0.42 })
      observer.observe(element)
      return observer
    })
    return () => {
      heroObserver?.disconnect()
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const scrollToChapter = (index: number) => {
    document.getElementById(chapters[index].toLowerCase())?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const playNextVideo = (current: number) => {
    const next = (current + 1) % storyVideos.length
    const nextVideo = videoRefs[next].current
    if (!nextVideo) return
    nextVideo.currentTime = 0
    void nextVideo.play()
    setActiveVideo(next)
  }

  return (
    <main className="cinematic-portfolio min-h-screen bg-[#050712] text-slate-100">
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">Skip to portfolio</a>

      <div className="story-stage fixed inset-0 z-0" aria-hidden="true">
        {reducedMotion ? (
          <Image src={storyFrame} alt="" fill priority sizes="100vw" className="story-frame-image object-cover" />
        ) : (
          storyVideos.map((video, index) => (
            <video
              key={video}
              ref={videoRefs[index]}
              className={`story-frame-image absolute inset-0 h-full w-full object-cover ${activeVideo === index ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
              autoPlay={index === 0}
              muted
              playsInline
              preload="auto"
              poster={index === 0 ? storyFrame : undefined}
              onEnded={() => playNextVideo(index)}
            >
              <source src={video} type="video/mp4" />
            </video>
          ))
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/38 via-transparent to-[#030712]/10" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050712]/75 to-transparent" />
      </div>
      <>
          <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050712]/58 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })} className="text-left">
                <span className="portfolio-display block text-sm font-semibold tracking-[0.16em] text-white">KHURSHED KHAN</span>
                <span className="portfolio-label mt-1 block text-[10px] uppercase tracking-[0.24em] text-sky-300">Designing systems after dark</span>
              </button>
              <nav aria-label="Portfolio chapters" className="hidden items-center gap-8 md:flex lg:gap-12">
                {chapters.map((chapter, index) => (
                  <button key={chapter} type="button" onClick={() => scrollToChapter(index)} className={`portfolio-label rounded-full px-2 py-2 text-xs font-semibold transition ${activeChapter === index ? 'bg-white px-4 text-slate-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>{chapter}</button>
                ))}
              </nav>
              <Link href="/Resume.pdf" target="_blank" className="rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-medium text-sky-100 transition hover:bg-sky-300 hover:text-slate-950">Resume <ArrowUpRight className="ml-1 inline" size={13} /></Link>
            </div>
          </header>

          <section id="hero" className="relative z-10 flex min-h-screen items-center px-5 pb-36 pt-28 sm:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-[1500px]">
              <div className="max-w-[760px]">
                <p className="hero-role-badge portfolio-label">
                  <Code2 size={17} aria-hidden="true" />
                  <span>Senior Frontend Developer</span>
                  <span className="text-white/35">·</span>
                  <span>Full-Stack Developer</span>
                </p>
                <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.05em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.8)] lg:text-6xl xl:text-7xl">
                  I build
                  <span key={heroMessage} className="hero-rotating-copy mt-2 block text-teal-300">{heroMessages[heroMessage]}</span>
                </h1>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-y border-white/10 bg-[#030712]/88 px-5 py-5 backdrop-blur-md sm:px-8 lg:px-14">
              <div className="mx-auto grid max-w-[1500px] gap-4 sm:grid-cols-3 sm:gap-0">
                <div className="flex items-center gap-4 sm:border-r sm:border-white/15 sm:px-7 lg:px-12">
                  <CalendarDays className="text-teal-300" size={25} />
                  <span className="portfolio-label text-sm font-semibold uppercase tracking-[0.12em] text-white">9+ years experience</span>
                </div>
                <div className="flex items-center gap-4 sm:border-r sm:border-white/15 sm:px-7 lg:px-12">
                  <Monitor className="text-teal-300" size={25} />
                  <span className="portfolio-label text-sm font-semibold uppercase tracking-[0.12em] text-white">Real-time dashboards</span>
                </div>
                <div className="flex items-center gap-4 sm:px-7 lg:px-12">
                  <Zap className="text-teal-300" size={25} />
                  <span className="portfolio-label text-sm font-semibold uppercase tracking-[0.12em] text-white">40% faster page loads</span>
                </div>
              </div>
            </div>
          </section>

          <section id="projects" className="chapter-section relative z-10 min-h-screen px-5 py-28 sm:px-8 lg:px-14">
            <ChapterHeading eyebrow="01 / Selected work" title="Projects built for moments that matter." description="Financial workflows, global trading experiences, and operational systems—designed to stay fast when the data does not slow down." />
            <div className="mx-auto mt-14 grid max-w-[1500px] gap-5 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article key={project.name} className="cinematic-card group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.3rem] border border-white/10">
                    <Image src={project.image} alt={`${project.name} interface`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08101f] via-transparent to-transparent" />
                    <span className="portfolio-label absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-[10px] tracking-[0.24em] text-white backdrop-blur-xl">0{index + 1}</span>
                  </div>
                  <div className="px-1 pb-1 pt-6">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{project.name}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{project.stack.slice(0, 5).map((tech) => <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-300">{tech}</span>)}</div>
                    <Link href={project.live} target="_blank" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition hover:text-white">View case study <ArrowUpRight size={15} /></Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="chapter-section relative z-10 min-h-screen px-5 py-28 sm:px-8 lg:px-14">
            <ChapterHeading eyebrow="02 / Experience" title="Leadership grounded in delivery." description="Nine years shaping frontend architecture, real-time interfaces, and dependable product systems across FinTech and government services." />
            <div className="mx-auto mt-14 max-w-[1200px] space-y-5">
              {experience.map((item) => (
                <article key={item.company} className="cinematic-card grid gap-8 md:grid-cols-[260px_1fr]">
                  <div><p className="portfolio-label text-xs font-semibold uppercase tracking-[0.24em] text-sky-300">{item.period}</p><h3 className="mt-4 text-2xl font-semibold text-white">{item.company}</h3><p className="portfolio-display mt-2 text-sm font-medium text-slate-300">{item.role} · {item.location}</p></div>
                  <div><p className="portfolio-display text-base font-medium leading-7 text-slate-200">{item.summary}</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{item.highlights.map((highlight) => <li key={highlight} className="portfolio-display rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm font-medium text-slate-200">{highlight}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="chapter-section relative z-10 min-h-screen px-5 py-28 sm:px-8 lg:px-14">
            <ChapterHeading eyebrow="03 / Skills" title="A practical stack for ambitious products." description="Architecture, implementation, quality, and collaboration—connected into one delivery practice." />
            <div className="mx-auto mt-14 grid max-w-[1200px] gap-5 lg:grid-cols-3">
              {skillGroups.map(([title, ...skills], index) => (
                <article key={title} className="cinematic-card">
                  <span className="portfolio-label text-xs tracking-[0.24em] text-sky-300">0{index + 1}</span>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
                  <div className="mt-7 space-y-3">{skills.map((skill) => <div key={skill} className="flex items-center justify-between border-b border-white/8 pb-3 text-sm text-slate-300"><span>{skill}</span><span className="h-1.5 w-1.5 rounded-full bg-sky-300" /></div>)}</div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="chapter-section relative z-10 flex min-h-screen items-center px-5 py-28 sm:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-[1200px] rounded-[2.2rem] border border-white/12 bg-[#07101f]/80 p-7 shadow-2xl backdrop-blur-2xl sm:p-12 lg:p-16">
              <p className="portfolio-label text-xs uppercase tracking-[0.35em] text-sky-300">04 / Contact</p>
              <h2 className="mt-6 max-w-4xl text-balance text-5xl font-semibold tracking-[-0.05em] text-white sm:text-7xl">Let’s build the next dependable thing.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Available for senior frontend and full-stack opportunities where thoughtful architecture and strong product craft matter.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={`mailto:${profile.email.trim()}`} className="contact-pill"><Mail size={16} /> Email me</Link>
                <Link href={profile.linkedin} target="_blank" className="contact-pill"><Linkedin size={16} /> LinkedIn</Link>
                <Link href={profile.github} target="_blank" className="contact-pill"><Github size={16} /> GitHub</Link>
                <span className="contact-pill"><MapPin size={16} /> {profile.location}</span>
              </div>
            </div>
          </section>
      </>
    </main>
  )
}

function ChapterHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-[1500px]">
      <p className="portfolio-label text-xs font-semibold uppercase tracking-[0.34em] text-sky-300">{eyebrow}</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_480px] lg:items-end">
        <h2 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">{title}</h2>
        <p className="portfolio-display text-base font-medium leading-7 text-slate-300">{description}</p>
      </div>
    </div>
  )
}
