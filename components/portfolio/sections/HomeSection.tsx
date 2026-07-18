import type { Ref } from 'react'
import { BriefcaseBusiness, MapPin, Rocket, ShieldCheck } from 'lucide-react'
import { profile } from '@/data/portfolio'

type HomeSectionProps = {
  orbitRef: Ref<HTMLDivElement>
}



export function HomeSection({ orbitRef }: HomeSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen px-5 py-4 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <p data-animate="hero" className="mb-5 text-xs text-zinc-500">
          KHURSHED.DEV › src › components › Home.tsx
        </p>
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
                "radial-gradient(circle at 1px 1px, rgba(113,113,122,0.22) 1px, transparent 0)",
              backgroundSize: "24px 24px",
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
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")
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
                <p className="font-semibold text-zinc-100">
                  {profile.role}
                </p>
    
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
    
        <p
          data-animate="hero"
          className="mt-9 max-w-5xl text-lg leading-8 text-zinc-300 sm:text-xl"
        >
          {profile.intro}
        </p>
      </div>
    </section>
  )
}
