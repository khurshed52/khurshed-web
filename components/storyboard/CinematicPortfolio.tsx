'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Accessibility, Activity, ArrowUpRight, BarChart3, CalendarDays, ChartNoAxesCombined, Code2, FileCog, Github, Globe2, Languages, Layers3, Linkedin, Mail, MapPin, Menu, MonitorCog, Network, Play, ShieldCheck, Users, WalletCards, X, Zap } from 'lucide-react'

import { experience, profile, projects } from '@/data/portfolio'
import VisitorCounter from './VisitorCounter'

const chapters = ['Projects', 'Experience', 'Skills', 'Contact'] as const

const heroMessages = [
  'scalable FinTech and Forex platforms.',
  'real-time dashboards for live markets.',
  'secure full-stack financial workflows.',
  'accessible multilingual government applications.',
  'AI-powered experiences with controlled backend access.',
] as const

const tradeProCaseStudy = [
  { title: 'Product overview', body: 'TradePro is an AI-powered financial platform combining customer onboarding, KYC verification, multi-currency account workflows, payments, live market experiences, portfolio management and controlled AI assistance.' },
  { title: 'My role', body: 'Senior Full-Stack Developer responsible for frontend experiences, backend API workflows, data integration and secure AI function calling.' },
  { title: 'Core workflow', body: 'The product supports authentication, customer onboarding, Veriff KYC, deposits, withdrawals, transfers, Stripe payments, portfolio views and transaction history.' },
  { title: 'Frontend architecture', body: 'The interface uses Next.js, React and TypeScript with reusable components, custom hooks, type-safe API services, responsive dashboards and server-side pagination.' },
  { title: 'Backend and data layer', body: 'Node.js and Express provide REST APIs, with Prisma ORM and PostgreSQL supporting application data and financial workflows.' },
  { title: 'AI safety and controlled function calling', body: 'Google Gemini uses server-controlled function calling through authenticated and authorized backend functions. The AI does not receive direct database access.' },
  { title: 'Security considerations', body: 'Authentication and authorization protect account workflows and backend functions, while KYC and payment integrations remain server controlled.' },
  { title: 'Accessibility and responsive design', body: 'The component-based interface is designed to adapt across screen sizes with clear, consistent account, transaction and market-data views.' },
  { title: 'Technical challenges', body: 'The implementation coordinates type-safe frontend and backend workflows across onboarding, KYC, wallets, payments, live market data, transaction reporting and controlled AI actions.' },
  { title: 'Technology stack', body: 'Next.js, React, TypeScript, Node.js, Express, PostgreSQL, Prisma ORM, REST APIs, Veriff, Stripe, live market data APIs and Google Gemini.' },
] as const

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
  const [heroMessage, setHeroMessage] = useState(0)
  const [showOwnerTools, setShowOwnerTools] = useState(false)
  const [showVisitCount, setShowVisitCount] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [caseStudyOpen, setCaseStudyOpen] = useState(false)
  const [achievementGroup, setAchievementGroup] = useState(0)
  const [achievementPhase, setAchievementPhase] = useState<'idle' | 'out' | 'in'>('idle')
  const [heroVideoNeedsPlay, setHeroVideoNeedsPlay] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMenuItemRef = useRef<HTMLButtonElement>(null)
  const mobileNavRef = useRef<HTMLElement>(null)
  const caseStudyButtonRef = useRef<HTMLButtonElement>(null)
  const caseStudyCloseRef = useRef<HTMLButtonElement>(null)
  const caseStudyDialogRef = useRef<HTMLDivElement>(null)

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
    setShowVisitCount(
      new URLSearchParams(window.location.search).get('viewcount')?.toLowerCase() === 'true'
    )
  }, [])

  const requestHeroPlayback = useCallback(() => {
    const video = heroVideoRef.current
    if (!video) return

    // Safari requires the media element to be muted before play() is requested.
    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.setAttribute('muted', '')
    video.setAttribute('playsinline', '')

    void video.play()
      .then(() => setHeroVideoNeedsPlay(false))
      .catch(() => setHeroVideoNeedsPlay(true))
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const resumePlayback = () => {
      if (!document.hidden) requestHeroPlayback()
    }

    requestHeroPlayback()
    video.addEventListener('canplay', requestHeroPlayback)
    window.addEventListener('pageshow', requestHeroPlayback)
    document.addEventListener('visibilitychange', resumePlayback)

    return () => {
      video.removeEventListener('canplay', requestHeroPlayback)
      window.removeEventListener('pageshow', requestHeroPlayback)
      document.removeEventListener('visibilitychange', resumePlayback)
    }
  }, [requestHeroPlayback])

  useEffect(() => {
    if (reducedMotion) {
      setHeroMessage(0)
      return
    }

    let intervalId: number | undefined

    const startRotation = () => {
      if (document.hidden || intervalId !== undefined) return
      intervalId = window.setInterval(() => {
        setHeroMessage((current) => (current + 1) % heroMessages.length)
      }, 3400)
    }

    const stopRotation = () => {
      if (intervalId !== undefined) window.clearInterval(intervalId)
      intervalId = undefined
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
    if (!mobileMenuOpen && !caseStudyOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (caseStudyOpen) {
        setCaseStudyOpen(false)
        caseStudyButtonRef.current?.focus()
      } else {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen, caseStudyOpen])

  useEffect(() => {
    if (mobileMenuOpen) firstMenuItemRef.current?.focus()
  }, [mobileMenuOpen])

  useEffect(() => {
    if (caseStudyOpen) caseStudyCloseRef.current?.focus()
  }, [caseStudyOpen])

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
    setMobileMenuOpen(false)
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
        <video
          ref={heroVideoRef}
          className="h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/storyboard/portfolio-hero-poster.png"
          onPlay={() => setHeroVideoNeedsPlay(false)}
          onPause={() => {
            if (!document.hidden) setHeroVideoNeedsPlay(true)
          }}
        >
          <source src="/storyboard/portfolio-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-texture-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/20" />
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
                  className="hidden rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-medium text-sky-100 transition hover:bg-sky-300 hover:text-slate-950 md:inline-flex"
                >
                  Resume <ArrowUpRight className="ml-1 inline" size={13} />
                </Link>
                <button
                  ref={menuButtonRef}
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/25 bg-sky-300/10 text-sky-100 transition hover:bg-sky-300 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300 md:hidden"
                  aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                  onClick={() => setMobileMenuOpen((open) => !open)}
                >
                  {mobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
                </button>
              </div>
            </div>
          </header>

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-[35] bg-[#030712]/72 pt-[73px] backdrop-blur-xl md:hidden" onMouseDown={(event) => {
              if (event.target === event.currentTarget) setMobileMenuOpen(false)
            }}>
              <nav ref={mobileNavRef} id="mobile-navigation" aria-label="Mobile portfolio navigation" className="border-b border-white/10 bg-[#07101f]/96 px-5 py-5 shadow-2xl" onKeyDown={(event) => {
                if (event.key !== 'Tab') return
                const focusable = mobileNavRef.current?.querySelectorAll<HTMLElement>('button, a[href]')
                if (!focusable?.length) return
                const first = focusable[0]
                const last = focusable[focusable.length - 1]
                if (event.shiftKey && document.activeElement === first) {
                  event.preventDefault()
                  last.focus()
                } else if (!event.shiftKey && document.activeElement === last) {
                  event.preventDefault()
                  first.focus()
                }
              }}>
                <div className="mx-auto grid max-w-lg gap-2">
                  {chapters.map((chapter, index) => (
                    <button
                      ref={index === 0 ? firstMenuItemRef : undefined}
                      key={chapter}
                      type="button"
                      onClick={() => scrollToChapter(index)}
                      className="rounded-xl px-4 py-3 text-left font-semibold text-slate-100 transition hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                    >
                      {chapter}
                    </button>
                  ))}
                  <Link
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl px-4 py-3 font-semibold text-teal-200 transition hover:bg-white/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
                  >
                    Resume <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </nav>
            </div>
          )}

          <section id="hero" className="relative z-10 mt-[73px] flex min-h-[calc(100svh-73px)] items-center px-5 pb-10 pt-8 sm:px-8 lg:px-14 lg:pb-[104px]">
            {heroVideoNeedsPlay && (
              <button
                type="button"
                onClick={requestHeroPlayback}
                className="absolute left-1/2 top-1/2 z-20 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#050712]/75 text-white shadow-2xl backdrop-blur-md transition hover:scale-105 hover:bg-[#07101f]/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                aria-label="Play hero background video"
              >
                <Play className="ml-1" size={28} fill="currentColor" aria-hidden="true" />
              </button>
            )}
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
                  <span key={heroMessage} className="hero-rotating-copy mt-2 block text-teal-300">{heroMessages[heroMessage]}</span>
                </h1>
                <p className="portfolio-display mt-5 max-w-2xl text-base font-medium leading-7 text-white/82">
                  Senior Frontend &amp; Full-Stack Developer specialising in secure financial workflows, AI integrations and accessible multilingual experiences.
                </p>
                <p className="portfolio-display mt-6 text-sm font-semibold tracking-[0.02em] text-white/85 sm:text-base">
                  React.js · Next.js · TypeScript · Node.js <span className="text-teal-300/70">|</span> Dubai, UAE
                </p>
              </div>
            </div>

          </section>

            <div className="relative z-20 border-y border-white/10 bg-[#030712]/88 px-5 py-3 backdrop-blur-md sm:px-8 lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-30 lg:border-b-0 lg:px-14 lg:py-2">
              <div className="achievement-scroll mx-auto flex max-w-[1500px] gap-2 overflow-x-auto pb-1 lg:grid lg:min-h-[48px] lg:grid-cols-3 lg:gap-0 lg:overflow-visible lg:pb-0">
                <div className="flex min-w-[230px] items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 lg:min-w-0 lg:justify-start lg:gap-4 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:border-white/15 lg:bg-transparent lg:px-6 lg:py-0 xl:px-8">
                  <CalendarDays className="shrink-0 text-teal-300" size={22} aria-hidden="true" />
                  <span className="portfolio-label whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.1em] text-white lg:text-[11px] xl:text-xs">9+ years experience</span>
                </div>
                <div className="flex min-w-[300px] items-center rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 lg:min-w-0 lg:rounded-none lg:border-y-0 lg:border-l-0 lg:border-r lg:border-white/15 lg:bg-transparent lg:px-6 lg:py-0 xl:px-8">
                  <div className={`flex w-full min-w-0 items-center justify-center gap-2 transition-[opacity,transform] duration-[350ms] ease-out lg:justify-start lg:gap-3 ${achievementMotionClass}`}>
                    <MiddleAchievementIcon className="shrink-0 text-teal-300" size={22} aria-hidden="true" />
                    <span className="portfolio-label text-center text-[9px] font-bold uppercase leading-4 tracking-[0.1em] text-white lg:whitespace-nowrap lg:text-left lg:text-[11px] xl:text-xs">{rotatingAchievements.middle.label}</span>
                  </div>
                </div>
                <div className="flex min-w-[280px] items-center rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 lg:min-w-0 lg:rounded-none lg:border-0 lg:bg-transparent lg:px-6 lg:py-0 xl:px-8">
                  <div className={`flex w-full min-w-0 items-center justify-center gap-2 transition-[opacity,transform] duration-[350ms] ease-out lg:justify-start lg:gap-3 ${achievementMotionClass}`}>
                    <RightAchievementIcon className="shrink-0 text-teal-300" size={22} aria-hidden="true" />
                    <span className="portfolio-label text-center text-[9px] font-bold uppercase leading-4 tracking-[0.1em] text-white lg:whitespace-nowrap lg:text-left lg:text-[11px] xl:text-xs">{rotatingAchievements.right.label}</span>
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
                      <Link href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} live site`} className="inline-flex items-center gap-2 text-sm font-medium text-sky-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300">View live site <ArrowUpRight size={15} /></Link>
                      {project.hasGithub && project.github && (
                        <Link href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"><Github size={15} /> View source</Link>
                      )}
                      {index === 0 && (
                        <button
                          ref={caseStudyButtonRef}
                          type="button"
                          onClick={() => setCaseStudyOpen(true)}
                          className="inline-flex items-center gap-2 text-sm font-medium text-teal-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-300"
                        >
                          View case study <ArrowUpRight size={15} aria-hidden="true" />
                        </button>
                      )}
                    </div>
                    {index === 0 && <p className="portfolio-label mt-3 text-[10px] uppercase tracking-[0.13em] text-slate-500">Live product demo · Vercel</p>}
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
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Available for senior frontend and full-stack opportunities where thoughtful architecture, secure product delivery and strong frontend craft matter.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`mailto:${profile.email.trim()}`} className="contact-pill"><Mail size={16} /> Discuss an opportunity</Link>
                  <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-pill"><Linkedin size={16} /> LinkedIn</Link>
                  <Link href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-pill"><Github size={16} /> GitHub</Link>
                  <span className="contact-pill"><MapPin size={16} /> {profile.location}</span>
                  <VisitorCounter visible={showVisitCount} className="sm:ml-auto" />
                </div>
              </div>
              <ContactImageSlider reducedMotion={reducedMotion} />
            </div>
          </section>

          {caseStudyOpen && (
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center bg-[#020617]/88 p-4 backdrop-blur-xl sm:p-7"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setCaseStudyOpen(false)
                  caseStudyButtonRef.current?.focus()
                }
              }}
            >
              <div
                ref={caseStudyDialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="tradepro-case-study-title"
                className="max-h-[88svh] w-full max-w-5xl overflow-y-auto rounded-[1.75rem] border border-teal-300/25 bg-[#07101f] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.7)] sm:p-8"
                onKeyDown={(event) => {
                  if (event.key !== 'Tab') return
                  const focusable = caseStudyDialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])')
                  if (!focusable?.length) return
                  const first = focusable[0]
                  const last = focusable[focusable.length - 1]
                  if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault()
                    last.focus()
                  } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault()
                    first.focus()
                  }
                }}
              >
                <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
                  <div>
                    <p className="portfolio-label text-xs uppercase tracking-[0.28em] text-teal-300">TradePro case study</p>
                    <h2 id="tradepro-case-study-title" className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Secure financial workflows with controlled AI</h2>
                  </div>
                  <button ref={caseStudyCloseRef} type="button" onClick={() => {
                    setCaseStudyOpen(false)
                    caseStudyButtonRef.current?.focus()
                  }} aria-label="Close TradePro case study" className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-200 transition hover:border-teal-300/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"><X size={19} aria-hidden="true" /></button>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  {tradeProCaseStudy.map((section) => (
                    <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                      <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{section.body}</p>
                    </section>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-4 border-t border-white/10 pt-5">
                  <Link href={projects[0].live} target="_blank" rel="noopener noreferrer" className="contact-pill">View live site <ArrowUpRight size={15} aria-hidden="true" /></Link>
                  <Link href={projects[0].github} target="_blank" rel="noopener noreferrer" className="contact-pill"><Github size={15} aria-hidden="true" /> View source</Link>
                </div>
              </div>
            </div>
          )}
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
