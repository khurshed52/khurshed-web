'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Accessibility, Activity, ArrowUpRight, BarChart3, CalendarDays, ChartNoAxesCombined, Code2, FileCog, Github, Globe2, Languages, Layers3, Linkedin, Mail, MapPin, MonitorCog, Network, ShieldCheck, Users, WalletCards, Zap } from 'lucide-react'

import { experience, profile, projects } from '@/data/portfolio'

const chapters = ['Projects', 'Experience', 'Skills', 'Contact'] as const

const skillGroups = [
  {
    title: 'Frontend systems',
    number: '01',
    tone: 'blue',
    icon: MonitorCog,
    skills: [
      { name: 'React.js', code: 'RE' },
      { name: 'Next.js', code: 'NX' },
      { name: 'Angular 19', code: 'NG' },
      { name: 'JavaScript', code: 'JS' },
      { name: 'TypeScript', code: 'TS' },
      { name: 'Vue.js', code: 'VU' },
      { name: 'NgRx', code: 'RX' },
    ],
  },
  {
    title: 'Full-stack delivery',
    number: '02',
    tone: 'violet',
    icon: Layers3,
    skills: [
      { name: 'Node.js', code: 'JS' },
      { name: 'Express.js', code: 'EX' },
      { name: 'PostgreSQL', code: 'PG' },
      { name: 'Prisma ORM', code: 'PR' },
      { name: 'REST APIs', code: '{}' },
      { name: 'WebSockets', code: 'WS' },
    ],
  },
  {
    title: 'Quality & intelligence',
    number: '03',
    tone: 'teal',
    icon: ShieldCheck,
    skills: [
      { name: 'Playwright', code: 'PW' },
      { name: 'WCAG 2.1 AA, TDRA', code: 'A11Y' },
      { name: 'Gemini API', code: 'AI' },
      { name: 'Secure LLM integration', code: 'LLM' },
      { name: 'CI/CD', code: 'CD' },
    ],
  },
] as const

const experiencePresentation = [
  {
    tone: 'blue',
    icon: Activity,
    highlightIcons: [Activity, Layers3, Zap, Users],
  },
  {
    tone: 'violet',
    icon: BarChart3,
    highlightIcons: [Globe2, Languages, ChartNoAxesCombined, Layers3],
  },
  {
    tone: 'teal',
    icon: ShieldCheck,
    highlightIcons: [Code2, Languages, Accessibility, Network],
  },
] as const

const achievementGroups = [
  {
    middle: { label: 'KYC, payments & multi-currency wallets', icon: WalletCards },
    right: { label: 'Technical leadership · 3–5 developers', icon: Users },
  },
  {
    middle: { label: 'Real-time WebSocket dashboards', icon: Activity },
    right: { label: 'Secure AI function calling', icon: ShieldCheck },
  },
  {
    middle: { label: 'Arabic RTL & English LTR', icon: Languages },
    right: { label: 'WCAG 2.1 AA & UAE TDRA guidelines', icon: Accessibility },
  },
] as const

const contactSlides = [
  {
    src: '/contact/secure-platform-observability.png',
    alt: 'Secure platform observability and infrastructure illustration',
  },
  {
    src: '/contact/secure-customer-workflow.png',
    alt: 'Secure customer identity and financial workflow illustration',
  },
  {
    src: '/contact/secure-fintech-integrations.png',
    alt: 'Secure fintech system integrations illustration',
  },
] as const

export default function CinematicPortfolio() {
  const [activeChapter, setActiveChapter] = useState<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [showOwnerTools, setShowOwnerTools] = useState(false)
  const [achievementGroup, setAchievementGroup] = useState(0)
  const [achievementPhase, setAchievementPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(motionMedia.matches)
    update()
    motionMedia.addEventListener('change', update)
    return () => motionMedia.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    setShowOwnerTools(
      window.location.hostname === 'localhost'
      || window.location.hostname === '127.0.0.1'
    )
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    if (reducedMotion) video.pause()
    else void video.play().catch(() => undefined)
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      setAchievementGroup(0)
      setAchievementPhase('idle')
      return
    }

    let intervalId: number | undefined
    let swapTimeoutId: number | undefined
    let firstFrameId: number | undefined
    let secondFrameId: number | undefined

    const rotateAchievements = () => {
      setAchievementPhase('out')
      swapTimeoutId = window.setTimeout(() => {
        setAchievementGroup((current) => (current + 1) % achievementGroups.length)
        setAchievementPhase('in')
        firstFrameId = window.requestAnimationFrame(() => {
          secondFrameId = window.requestAnimationFrame(() => setAchievementPhase('idle'))
        })
      }, 350)
    }

    const startRotation = () => {
      if (document.hidden || intervalId !== undefined) return
      intervalId = window.setInterval(rotateAchievements, 3500)
    }

    const stopRotation = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId)
      if (swapTimeoutId !== undefined) window.clearTimeout(swapTimeoutId)
      if (firstFrameId !== undefined) window.cancelAnimationFrame(firstFrameId)
      if (secondFrameId !== undefined) window.cancelAnimationFrame(secondFrameId)
      intervalId = undefined
      swapTimeoutId = undefined
      firstFrameId = undefined
      secondFrameId = undefined
      setAchievementPhase('idle')
    }

    const handleVisibilityChange = () => {
      if (document.hidden) stopRotation()
      else startRotation()
    }

    startRotation()
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      stopRotation()
    }
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

  const rotatingAchievements = achievementGroups[achievementGroup]
  const MiddleAchievementIcon = rotatingAchievements.middle.icon
  const RightAchievementIcon = rotatingAchievements.right.icon
  const achievementMotionClass = achievementPhase === 'out'
    ? '-translate-y-2.5 opacity-0'
    : achievementPhase === 'in'
      ? 'translate-y-2.5 opacity-0'
      : 'translate-y-0 opacity-100'

  return (
    <main className="cinematic-portfolio min-h-screen bg-[#050712] text-slate-100">
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">Skip to portfolio</a>

      <div className="story-stage fixed inset-0 z-0" aria-hidden="true">
        <video ref={heroVideoRef} className="h-full w-full object-cover" autoPlay loop muted playsInline preload="metadata" poster="/storyboard/portfolio-hero-poster.png">
          <source src="/storyboard/portfolio-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-texture-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/58 via-[#030712]/12 to-[#030712]/10" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050712]/75 to-transparent" />
      </div>
      <>
          <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050712]/58 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })} className="text-left">
                <span className="portfolio-display block text-sm font-semibold tracking-[0.16em] text-white">KHURSHED KHAN</span>
                <span className="portfolio-label mt-1 block text-[10px] uppercase tracking-[0.24em] text-sky-300">ENGINEERING RELIABLE DIGITAL PRODUCTS</span>
              </button>
              <nav aria-label="Portfolio chapters" className="hidden items-center gap-8 md:flex lg:gap-12">
                {chapters.map((chapter, index) => (
                  <button key={chapter} type="button" onClick={() => scrollToChapter(index)} className={`portfolio-label rounded-full px-2 py-2 text-xs font-semibold transition ${activeChapter === index ? 'bg-white px-4 text-slate-950' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`}>{chapter}</button>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                {showOwnerTools && (
                  <Link
                    href="/resume-generator"
                    target="_blank"
                    rel="noreferrer"
                    className="hidden items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-xs font-semibold text-teal-100 transition hover:bg-teal-300 hover:text-slate-950 sm:inline-flex"
                  >
                    <FileCog size={14} />
                    Generate Resume
                  </Link>
                )}
                <Link
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-medium text-sky-100 transition hover:bg-sky-300 hover:text-slate-950"
                >
                  Resume <ArrowUpRight className="ml-1 inline" size={13} />
                </Link>
              </div>
            </div>
          </header>

          <section id="hero" className="relative z-10 mt-[73px] flex min-h-[calc(100svh-73px)] items-center px-5 pb-[190px] pt-8 sm:px-8 sm:pb-[104px] lg:px-14">
            <div className="mx-auto w-full max-w-[1500px]">
              <div className="max-w-[690px]">
                <p className="hero-role-badge portfolio-label">
                  <Code2 size={17} aria-hidden="true" />
                  <span>Senior Frontend Developer</span>
                  <span className="text-white/35">·</span>
                  <span>Full-Stack Developer</span>
                </p>
                <h1 className="mt-7 text-balance text-4xl font-semibold leading-[1.06] tracking-[-0.045em] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.85)] lg:text-5xl xl:text-6xl">
                  I build
                  <span className="mt-2 block text-teal-300">scalable FinTech and Forex platforms.</span>
                </h1>
                <p className="portfolio-display mt-6 text-sm font-semibold tracking-[0.02em] text-white/85 sm:text-base">
                  React.js · Next.js · TypeScript · Node.js <span className="text-teal-300/70">|</span> Dubai, UAE
                </p>
              </div>
            </div>

          </section>

            <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-[#030712]/88 px-5 py-4 backdrop-blur-md sm:px-8 sm:py-2 lg:px-14">
              <div className="mx-auto grid min-h-[116px] max-w-[1500px] grid-cols-2 gap-3 sm:min-h-[48px] sm:grid-cols-3 sm:gap-0">
                <div className="col-span-2 flex items-center justify-center gap-3 sm:col-span-1 sm:justify-start sm:border-r sm:border-white/15 sm:px-3 lg:gap-4 lg:px-8 xl:px-12">
                  <CalendarDays className="shrink-0 text-teal-300" size={22} aria-hidden="true" />
                  <span className="portfolio-label whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.1em] text-white lg:text-[11px] xl:text-xs">9+ years experience</span>
                </div>
                <div className="flex min-w-0 items-center justify-center sm:border-r sm:border-white/15 sm:px-3 lg:px-8 xl:px-12">
                  <div className={`flex w-full min-w-0 items-center justify-center gap-2 transition-[opacity,transform] duration-[350ms] ease-out sm:justify-start lg:gap-3 ${achievementMotionClass}`}>
                    <MiddleAchievementIcon className="shrink-0 text-teal-300" size={22} aria-hidden="true" />
                    <span className="portfolio-label text-center text-[9px] font-bold uppercase leading-4 tracking-[0.1em] text-white sm:whitespace-nowrap sm:text-left lg:text-[11px] xl:text-xs">{rotatingAchievements.middle.label}</span>
                  </div>
                </div>
                <div className="flex min-w-0 items-center justify-center sm:px-3 lg:px-8 xl:px-12">
                  <div className={`flex w-full min-w-0 items-center justify-center gap-2 transition-[opacity,transform] duration-[350ms] ease-out sm:justify-start lg:gap-3 ${achievementMotionClass}`}>
                    <RightAchievementIcon className="shrink-0 text-teal-300" size={22} aria-hidden="true" />
                    <span className="portfolio-label text-center text-[9px] font-bold uppercase leading-4 tracking-[0.1em] text-white sm:whitespace-nowrap sm:text-left lg:text-[11px] xl:text-xs">{rotatingAchievements.right.label}</span>
                  </div>
                </div>
              </div>
            </div>

          <section id="projects" className="chapter-section relative z-10 px-5 pb-14 pt-10 sm:px-8 lg:px-14 lg:pt-12">
            <ChapterHeading compact eyebrow="01 / Selected work" title="Projects built for moments that matter." description="Financial workflows, global trading experiences, and operational systems—designed to stay fast when the data does not slow down." />
            <div className="mx-auto mt-8 grid max-w-[1500px] gap-5 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article key={project.name} className="cinematic-card group">
                  <div className="relative aspect-video overflow-hidden rounded-[1.3rem] border border-white/10">
                    <Image src={project.image} alt={`${project.name} interface`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08101f] via-transparent to-transparent" />
                    <span className="portfolio-label absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-[10px] tracking-[0.24em] text-white backdrop-blur-xl">0{index + 1}</span>
                  </div>
                  <div className="px-1 pb-1 pt-4">
                    <h3 className="text-2xl font-semibold tracking-[-0.03em] text-white">{project.name}</h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-400">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">{project.stack.map((tech) => <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-300">{tech}</span>)}</div>
                    <div className="mt-4 flex flex-wrap items-center gap-5">
                      <Link href={project.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition hover:text-white">View live site <ArrowUpRight size={15} /></Link>
                      {project.hasGithub && project.github && (
                        <Link href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white"><Github size={15} /> View source</Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="chapter-section relative z-10 px-5 pb-14 pt-10 sm:px-8 lg:px-14 lg:pt-12">
            <ChapterHeading compact eyebrow="02 / Experience" title="Leadership grounded in delivery." description="Nine years shaping frontend architecture, real-time interfaces, and dependable product systems across FinTech and government services." />
            <div className="experience-showcase mx-auto mt-8 max-w-[1500px] space-y-4">
              {experience.map((item, index) => {
                const presentation = experiencePresentation[index]
                const CompanyIcon = presentation.icon

                return (
                  <article key={item.company} className={`experience-showcase-card skill-tone-${presentation.tone}`}>
                    <span className="experience-timeline-dot" aria-hidden="true" />
                    <div className="experience-identity">
                      <div className="experience-company-icon"><CompanyIcon size={28} strokeWidth={1.8} aria-hidden="true" /></div>
                      <div className="min-w-0">
                        <p className="experience-date portfolio-label">{item.period}</p>
                        <h3 className="mt-3 text-xl font-semibold leading-tight tracking-[-0.025em] text-white sm:text-2xl">{item.company}</h3>
                        <p className="portfolio-display mt-2 text-sm font-medium text-slate-300">{item.role}</p>
                        <p className="portfolio-display mt-1 flex items-center gap-2 text-sm font-medium text-slate-400"><MapPin size={16} aria-hidden="true" />{item.location}</p>
                      </div>
                    </div>
                    <div className="experience-content">
                      <p className="portfolio-display text-base font-medium leading-7 text-slate-200">{item.summary}</p>
                      <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                        {item.highlights.map((highlight, highlightIndex) => {
                          const HighlightIcon = presentation.highlightIcons[highlightIndex]
                          return (
                            <li key={highlight} className="experience-highlight portfolio-display">
                              <HighlightIcon size={18} strokeWidth={1.9} aria-hidden="true" />
                              <span>{highlight}</span>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section id="skills" className="chapter-section relative z-10 px-5 pb-14 pt-10 sm:px-8 lg:px-14 lg:pt-12">
            <ChapterHeading compact eyebrow="03 / Skills" title="A practical stack for ambitious products." description="Architecture, implementation, quality, and collaboration—connected into one delivery practice." />
            <div className="mx-auto mt-8 grid max-w-[1500px] gap-5 lg:grid-cols-3">
              {skillGroups.map((group) => {
                const GroupIcon = group.icon

                return (
                  <article key={group.title} className={`skill-showcase-card skill-tone-${group.tone}`}>
                    <div className="relative z-10 flex items-start justify-between">
                      <div className="skill-group-icon"><GroupIcon size={27} strokeWidth={1.7} aria-hidden="true" /></div>
                      <span className="portfolio-label text-sm font-medium tracking-[0.12em] text-[rgb(var(--skill-accent))]">{group.number}</span>
                    </div>
                    <h3 className="relative z-10 mt-4 text-2xl font-semibold tracking-[-0.025em] text-white">{group.title}</h3>
                    <div className="relative z-10 mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      {group.skills.map((skill) => (
                        <div key={skill.name} className="skill-chip">
                          <span className="skill-chip-code portfolio-label">{skill.code}</span>
                          <span className="portfolio-display min-w-0 text-sm font-medium text-slate-200">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section id="contact" className="chapter-section relative z-10 px-5 pb-24 pt-10 sm:px-8 lg:px-14 lg:pt-12">
            <div className="mx-auto grid w-full max-w-[1400px] overflow-hidden rounded-[2.2rem] bg-[#07101f]/80 shadow-2xl backdrop-blur-2xl lg:grid-cols-[1.08fr_0.92fr]">
              <div className="p-7 sm:p-10 lg:p-12 lg:pr-8">
                <p className="portfolio-label text-xs uppercase tracking-[0.35em] text-sky-300">04 / Contact</p>
                <h2 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">Let’s build the next dependable thing.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Available for senior frontend and full-stack opportunities where thoughtful architecture and strong product craft matter.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`mailto:${profile.email.trim()}`} className="contact-pill"><Mail size={16} /> Email me</Link>
                  <Link href={profile.linkedin} target="_blank" className="contact-pill"><Linkedin size={16} /> LinkedIn</Link>
                  <Link href={profile.github} target="_blank" className="contact-pill"><Github size={16} /> GitHub</Link>
                  <span className="contact-pill"><MapPin size={16} /> {profile.location}</span>
                </div>
              </div>
              <ContactImageSlider reducedMotion={reducedMotion} />
            </div>
          </section>
      </>
    </main>
  )
}

function ContactImageSlider({ reducedMotion }: { reducedMotion: boolean }) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (reducedMotion) {
      setActiveSlide(0)
      return
    }

    let intervalId: number | undefined

    const start = () => {
      if (document.hidden || intervalId !== undefined) return
      intervalId = window.setInterval(() => {
        setActiveSlide((current) => (current + 1) % contactSlides.length)
      }, 4000)
    }

    const stop = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId)
      intervalId = undefined
    }

    const handleVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }

    start()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      stop()
    }
  }, [reducedMotion])

  return (
    <div className="relative min-h-[300px] border-t border-white/10 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.13),transparent_68%)] sm:min-h-[390px] lg:min-h-full lg:border-l lg:border-t-0" aria-label="Secure digital product illustrations">
      {contactSlides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 flex items-center justify-center p-7 transition-all duration-700 ease-out sm:p-10 lg:p-8 ${index === activeSlide ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}
          aria-hidden={index !== activeSlide}
        >
          <Image
            src={slide.src}
            alt={index === activeSlide ? slide.alt : ''}
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-contain p-7 drop-shadow-[0_24px_50px_rgba(45,212,191,0.18)] sm:p-10 lg:p-8"
          />
        </div>
      ))}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2" aria-label={`Slide ${activeSlide + 1} of ${contactSlides.length}`}>
        {contactSlides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${index === activeSlide ? 'w-7 bg-teal-300' : 'w-1.5 bg-white/30 hover:bg-white/55'}`}
            aria-label={`Show illustration ${index + 1}`}
            aria-current={index === activeSlide ? 'true' : undefined}
          />
        ))}
      </div>
    </div>
  )
}

function ChapterHeading({ eyebrow, title, description, compact = false }: { eyebrow: string; title: string; description: string; compact?: boolean }) {
  return (
    <div className="mx-auto max-w-[1500px]">
      <p className="portfolio-label text-xs font-semibold uppercase tracking-[0.34em] text-sky-300">{eyebrow}</p>
      <div className={`${compact ? 'mt-3 gap-4' : 'mt-5 gap-6'} grid lg:grid-cols-[1fr_480px] lg:items-end`}>
        <h2 className={`max-w-4xl text-balance font-semibold tracking-[-0.045em] text-white ${compact ? 'text-4xl sm:text-5xl' : 'text-4xl sm:text-6xl'}`}>{title}</h2>
        <p className="portfolio-display text-base font-medium leading-7 text-slate-300">{description}</p>
      </div>
    </div>
  )
}
