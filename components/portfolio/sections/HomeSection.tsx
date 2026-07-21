import type { Ref } from 'react'
import {
  BriefcaseBusiness,
  MapPin,
  Rocket,
  ShieldCheck,
} from 'lucide-react'
import { profile } from '@/data/portfolio'

type HomeSectionProps = {
  orbitRef: Ref<HTMLDivElement>
}

export function HomeSection({ orbitRef }: HomeSectionProps) {
  return (
    <section
      id="home"
      className="min-h-screen overflow-hidden px-4 py-4 sm:px-10 lg:px-16 xl:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <p
          data-animate="hero"
          className="mb-5 truncate text-xs text-zinc-500"
        >
          KHURSHED.DEV › src › components › Home.tsx
        </p>

        <div data-animate="hero">
          <h1 className="flex flex-col text-4xl font-bold leading-tight tracking-tight text-zinc-100 sm:flex-row sm:items-baseline sm:text-4xl lg:text-4xl">
            <span>Khurshed Khan</span>

            <span className="mt-1 text-2xl font-medium text-accent sm:ml-4 sm:mt-0 sm:text-3xl lg:text-3xl">
              Frontend Engineer
            </span>
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Building fast, scalable and polished web experiences.
          </p>
        </div>

        <div
          ref={orbitRef}
          data-animate="hero"
          className="relative mt-6 w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-panel/80 px-3 py-3 shadow-glow sm:px-8 sm:py-4"
        >
          {/* Dotted background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(113,113,122,0.22) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative mx-auto h-[510px] w-full max-w-4xl sm:h-[500px]">
            {/* Top cards */}
            <div className="absolute inset-x-0 top-0 z-30 grid grid-cols-2 gap-2 sm:inset-x-5 sm:top-4 sm:gap-5">
              {/* Current role */}
              <div
                data-orbit-card
                className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#202020]/95 p-2.5 shadow-xl backdrop-blur sm:min-w-[210px] sm:gap-3 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg sm:h-11 sm:w-11 sm:rounded-xl">
                  <BriefcaseBusiness size={19} />
                </div>

                <div className="min-w-0">
                  <p
                    className="truncate text-xs font-semibold text-zinc-100 sm:text-base"
                    title={profile.role}
                  >
                    {profile.role}
                  </p>

                  <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-zinc-500 sm:text-xs">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span className="truncate">Current role</span>
                  </p>
                </div>
              </div>

              {/* Experience */}
              <div
                data-orbit-card
                className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#202020]/95 p-2.5 shadow-xl backdrop-blur sm:min-w-[210px] sm:gap-3 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500 text-white shadow-lg sm:h-11 sm:w-11 sm:rounded-xl">
                  <Rocket size={19} />
                </div>

                <div className="min-w-0">
                  <p
                    className="truncate text-xs font-semibold text-zinc-100 sm:text-base"
                    title={profile.experience}
                  >
                    {profile.experience}
                  </p>

                  <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-zinc-500 sm:text-xs">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span className="truncate">Experience</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Main outer orbit */}
            <div
              data-orbit-ring
              data-orbit-rotate="slow"
              className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/40 min-[390px]:h-[290px] min-[390px]:w-[290px] sm:h-[360px] sm:w-[360px]"
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
              className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 min-[390px]:h-[220px] min-[390px]:w-[220px] sm:h-[290px] sm:w-[290px]"
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

            {/* Decorative paths */}
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
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
              className="absolute left-1/2 top-1/2 z-20 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent/40 bg-gradient-to-br from-blue-700 via-accent to-cyan-500 shadow-[0_0_60px_rgba(0,122,204,0.35)] min-[390px]:h-40 min-[390px]:w-40 sm:h-48 sm:w-48"
            >
              <div className="absolute inset-4 rounded-full border border-white/25" />
              <div className="absolute inset-8 rounded-full border border-white/15" />

              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 text-xl font-bold text-white backdrop-blur sm:h-20 sm:w-20 sm:text-3xl">
                {profile.name
                  .split(' ')
                  .map((word) => word.charAt(0))
                  .join('')
                  .slice(0, 2)}
              </div>

              <p className="relative z-10 mt-2 max-w-[120px] truncate text-xs font-bold uppercase tracking-wider text-white sm:mt-3 sm:max-w-[170px] sm:text-base">
                {profile.name}
              </p>

              <p className="relative z-10 mt-1 text-[8px] uppercase tracking-[0.2em] text-white/70 sm:text-xs sm:tracking-[0.25em]">
                Developer hub
              </p>
            </div>

            {/* Bottom cards */}
            <div className="absolute inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 sm:inset-x-5 sm:bottom-4 sm:gap-5">
              {/* Location */}
              <div
                data-orbit-card
                className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#202020]/95 p-2.5 shadow-xl backdrop-blur sm:min-w-[210px] sm:gap-3 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple text-white shadow-lg sm:h-11 sm:w-11 sm:rounded-xl">
                  <MapPin size={19} />
                </div>

                <div className="min-w-0">
                  <p
                    className="truncate text-xs font-semibold text-zinc-100 sm:text-base"
                    title={profile.location}
                  >
                    {profile.location}
                  </p>

                  <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-zinc-500 sm:text-xs">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span className="truncate">Location</span>
                  </p>
                </div>
              </div>

              {/* Availability */}
              <div
                data-orbit-card
                className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-[#202020]/95 p-2.5 shadow-xl backdrop-blur sm:min-w-[210px] sm:gap-3 sm:p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-lg sm:h-11 sm:w-11 sm:rounded-xl">
                  <ShieldCheck size={19} />
                </div>

                <div className="min-w-0">
                  <p
                    className="truncate text-xs font-semibold text-zinc-100 sm:text-base"
                    title="Available to build"
                  >
                    Available to build
                  </p>

                  <p className="mt-1 flex min-w-0 items-center gap-1.5 text-[10px] text-zinc-500 sm:text-xs">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                    <span className="truncate">Open to work</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          data-animate="hero"
          className="mt-6 max-w-5xl text-base leading-8 text-zinc-300 sm:mt-9 sm:text-xl"
        >
          {profile.intro}
        </p>
      </div>
    </section>
  )
}