'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import gsap from 'gsap'

import { experience, profile, projects } from '@/data/portfolio'

const chapters = ['Projects', 'Experience', 'Skills', 'Contact'] as const
const storyFrames = [
  '/storyboard/scene-01-arrival.png',
  '/storyboard/scene-02-seated.png',
  '/storyboard/scene-03-work.png',
  '/storyboard/scene-04-reveal.png',
] as const
const phaseCopy = [
  ['01 / Arrival', 'A quiet studio after dark.'],
  ['02 / Approach', 'Ideas become systems.'],
  ['03 / Activation', 'The workspace comes alive.'],
  ['04 / Explore', 'Selected work and experience.'],
] as const

const skillGroups = [
  ['Frontend systems', 'Angular 20/21', 'React.js', 'Next.js', 'TypeScript', 'Vue.js', 'NgRx'],
  ['Full-stack delivery', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'REST APIs', 'WebSockets'],
  ['Quality & intelligence', 'Playwright', 'WCAG 2.1 AA', 'Gemini API', 'Secure LLM integration', 'CI/CD'],
]

export default function CinematicPortfolio() {
  const [phase, setPhase] = useState(0)
  const [introComplete, setIntroComplete] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const phasePanel = useRef<HTMLDivElement>(null)
  const storyStage = useRef<HTMLDivElement>(null)
  const audioContext = useRef<AudioContext | null>(null)
  const ambientOscillator = useRef<OscillatorNode | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (paused || introComplete) return
    if (reducedMotion) {
      setPhase(3)
      setIntroComplete(true)
      return
    }
    const panel = phasePanel.current
    const timeline = gsap.timeline({
      onComplete: () => {
        if (phase >= 3) setIntroComplete(true)
        else setPhase((current) => current + 1)
      },
    })
    timeline.fromTo(panel, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' })
      .to(panel, { opacity: phase === 3 ? 1 : 0, y: phase === 3 ? 0 : -10, duration: 0.45, delay: phase === 0 ? 1.35 : 1.15, ease: 'power2.in' })
    return () => {
      timeline.kill()
    }
  }, [phase, paused, introComplete, reducedMotion])

  useEffect(() => {
    if (!introComplete) return
    const observers = chapters.map((chapter, index) => {
      const element = document.getElementById(chapter.toLowerCase())
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveChapter(index)
      }, { threshold: 0.42 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach((observer) => observer?.disconnect())
  }, [introComplete])

  const skipIntro = () => {
    setPhase(3)
    setIntroComplete(true)
  }

  const toggleAmbientSound = () => {
    if (!muted) {
      ambientOscillator.current?.stop()
      audioContext.current?.close()
      ambientOscillator.current = null
      audioContext.current = null
      setMuted(true)
      return
    }

    const context = new AudioContext()
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const filter = context.createBiquadFilter()
    oscillator.type = 'sine'
    oscillator.frequency.value = 72
    filter.type = 'lowpass'
    filter.frequency.value = 180
    gain.gain.value = 0.012
    oscillator.connect(filter)
    filter.connect(gain)
    gain.connect(context.destination)
    oscillator.start()
    audioContext.current = context
    ambientOscillator.current = oscillator
    setMuted(false)
  }

  useEffect(() => () => {
    ambientOscillator.current?.stop()
    audioContext.current?.close()
  }, [])

  const scrollToChapter = (index: number) => {
    document.getElementById(chapters[index].toLowerCase())?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })
  }

  const moveCamera = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || !storyStage.current) return
    const x = (event.clientX / window.innerWidth - 0.5) * 2
    const y = (event.clientY / window.innerHeight - 0.5) * 2
    storyStage.current.style.setProperty('--camera-x', x.toFixed(3))
    storyStage.current.style.setProperty('--camera-y', y.toFixed(3))
  }

  const resetCamera = () => {
    storyStage.current?.style.setProperty('--camera-x', '0')
    storyStage.current?.style.setProperty('--camera-y', '0')
  }

  return (
    <main
      className="cinematic-portfolio min-h-screen bg-[#050712] text-slate-100"
      onPointerMove={moveCamera}
      onPointerLeave={resetCamera}
    >
      <a href="#projects" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-slate-950">Skip to portfolio</a>

      <div ref={storyStage} className={`story-stage fixed inset-0 z-0 story-phase-${phase}`} aria-hidden="true">
        <div className="story-depth-layer story-depth-back">
          {storyFrames.map((frame, index) => (
            <div
              key={frame}
              className={`story-frame story-frame-${index} absolute inset-[-3%] ${index === phase ? 'story-frame-active' : ''}`}
            >
              <Image
                src={frame}
                alt=""
                fill
                priority={index < 2}
                sizes="100vw"
                className="story-frame-image object-cover"
              />
            </div>
          ))}
        </div>
        <div className="story-depth-layer story-depth-mid">
          <div className="story-window-reflection" />
          <div className="story-light-sweep" />
        </div>
        <div className="story-depth-layer story-depth-front">
          <div className="story-bokeh story-bokeh-one" />
          <div className="story-bokeh story-bokeh-two" />
          <div className="story-bokeh story-bokeh-three" />
          <div className="story-dust" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/38 via-transparent to-[#030712]/10" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#050712]/75 to-transparent" />
      </div>

      {!introComplete && (
        <section className="fixed inset-0 z-30 flex items-end p-5 sm:p-10 lg:p-14" aria-label="Cinematic introduction">
          <div ref={phasePanel} className="max-w-xl pb-12">
            <span className="text-xs uppercase tracking-[0.34em] text-sky-300">{phaseCopy[phase][0]}</span>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">{phase === 3 ? 'Khurshed Khan' : phaseCopy[phase][1]}</h1>
            {phase === 3 && <p className="mt-4 text-lg text-slate-300 sm:text-xl">Senior Frontend Developer · Full-stack systems · Dubai</p>}
          </div>
          <div className="absolute right-5 top-5 flex items-center gap-2 sm:right-10 sm:top-8">
            <button type="button" onClick={() => setPaused((value) => !value)} className="cinematic-control" aria-label={paused ? 'Play introduction' : 'Pause introduction'}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
            <button type="button" onClick={toggleAmbientSound} className="cinematic-control" aria-label={muted ? 'Enable ambient sound' : 'Mute ambient sound'}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
            <button type="button" onClick={skipIntro} className="rounded-full border border-white/15 bg-slate-950/45 px-4 py-2 text-xs text-slate-200 backdrop-blur-xl transition hover:border-sky-300/50 hover:text-white">Skip intro</button>
          </div>
          <div className="absolute bottom-6 right-6 text-xs text-slate-500 sm:right-10">{String(phase + 1).padStart(2, '0')} / 04</div>
        </section>
      )}

      {introComplete && (
        <>
          <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#050712]/58 backdrop-blur-2xl">
            <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 sm:px-8">
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })} className="text-left">
                <span className="block text-sm font-semibold tracking-[0.16em] text-white">KHURSHED KHAN</span>
                <span className="mt-1 block text-[10px] uppercase tracking-[0.24em] text-sky-300">Designing systems after dark</span>
              </button>
              <nav aria-label="Portfolio chapters" className="hidden items-center gap-1 md:flex">
                {chapters.map((chapter, index) => (
                  <button key={chapter} type="button" onClick={() => scrollToChapter(index)} className={`rounded-full px-4 py-2 text-xs transition ${activeChapter === index ? 'bg-white text-slate-950' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>{chapter}</button>
                ))}
              </nav>
              <Link href="/Resume.pdf" target="_blank" className="rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-2 text-xs font-medium text-sky-100 transition hover:bg-sky-300 hover:text-slate-950">Resume <ArrowUpRight className="ml-1 inline" size={13} /></Link>
            </div>
          </header>

          <section className="relative z-10 flex min-h-screen items-end justify-center px-5 pb-12 pt-28 sm:px-8 lg:px-14">
            <button type="button" onClick={() => scrollToChapter(0)} className="group flex items-center gap-3 rounded-full border border-white/20 bg-slate-950/50 px-5 py-3 text-sm text-white shadow-2xl backdrop-blur-xl transition hover:border-sky-300/55 hover:bg-sky-300/15">Scroll to explore <ArrowDown className="transition group-hover:translate-y-1" size={16} /></button>
          </section>

          <section id="projects" className="chapter-section relative z-10 min-h-screen px-5 py-28 sm:px-8 lg:px-14">
            <ChapterHeading eyebrow="01 / Selected work" title="Projects built for moments that matter." description="Financial workflows, global trading experiences, and operational systems—designed to stay fast when the data does not slow down." />
            <div className="mx-auto mt-14 grid max-w-[1500px] gap-5 lg:grid-cols-3">
              {projects.map((project, index) => (
                <article key={project.name} className="cinematic-card group">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.3rem] border border-white/10">
                    <Image src={project.image} alt={`${project.name} interface`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08101f] via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/60 px-3 py-1 text-[10px] tracking-[0.24em] text-white backdrop-blur-xl">0{index + 1}</span>
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
                  <div><p className="text-xs uppercase tracking-[0.24em] text-sky-300">{item.period}</p><h3 className="mt-4 text-2xl font-semibold text-white">{item.company}</h3><p className="mt-2 text-sm text-slate-400">{item.role} · {item.location}</p></div>
                  <div><p className="text-base leading-7 text-slate-300">{item.summary}</p><ul className="mt-6 grid gap-3 sm:grid-cols-2">{item.highlights.map((highlight) => <li key={highlight} className="rounded-2xl border border-white/8 bg-white/[0.035] px-4 py-3 text-sm text-slate-300">{highlight}</li>)}</ul></div>
                </article>
              ))}
            </div>
          </section>

          <section id="skills" className="chapter-section relative z-10 min-h-screen px-5 py-28 sm:px-8 lg:px-14">
            <ChapterHeading eyebrow="03 / Skills" title="A practical stack for ambitious products." description="Architecture, implementation, quality, and collaboration—connected into one delivery practice." />
            <div className="mx-auto mt-14 grid max-w-[1200px] gap-5 lg:grid-cols-3">
              {skillGroups.map(([title, ...skills], index) => (
                <article key={title} className="cinematic-card">
                  <span className="text-xs tracking-[0.24em] text-sky-300">0{index + 1}</span>
                  <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
                  <div className="mt-7 space-y-3">{skills.map((skill) => <div key={skill} className="flex items-center justify-between border-b border-white/8 pb-3 text-sm text-slate-300"><span>{skill}</span><span className="h-1.5 w-1.5 rounded-full bg-sky-300" /></div>)}</div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="chapter-section relative z-10 flex min-h-screen items-center px-5 py-28 sm:px-8 lg:px-14">
            <div className="mx-auto w-full max-w-[1200px] rounded-[2.2rem] border border-white/12 bg-[#07101f]/80 p-7 shadow-2xl backdrop-blur-2xl sm:p-12 lg:p-16">
              <p className="text-xs uppercase tracking-[0.35em] text-sky-300">04 / Contact</p>
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
      )}
    </main>
  )
}

function ChapterHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-[1500px]">
      <p className="text-xs uppercase tracking-[0.34em] text-sky-300">{eyebrow}</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_480px] lg:items-end">
        <h2 className="max-w-4xl text-balance text-4xl font-semibold tracking-[-0.045em] text-white sm:text-6xl">{title}</h2>
        <p className="text-base leading-7 text-slate-400">{description}</p>
      </div>
    </div>
  )
}
