'use client'

import { Eye } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type CounterState =
  | { status: 'loading'; count: null }
  | { status: 'ready'; count: number }
  | { status: 'error'; count: null }

type VisitorCounterProps = {
  visible?: boolean
  className?: string
}

export default function VisitorCounter({ visible = true, className = '' }: VisitorCounterProps) {
  const [counter, setCounter] = useState<CounterState>({ status: 'loading', count: null })
  const [displayedCount, setDisplayedCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()

    void fetch('/api/visits', { cache: 'no-store', signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Counter unavailable')
        const data = await response.json() as { count?: unknown }
        if (typeof data.count !== 'number' || !Number.isFinite(data.count) || data.count < 0) {
          throw new Error('Invalid counter response')
        }
        setCounter({ status: 'ready', count: Math.floor(data.count) })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setCounter({ status: 'error', count: null })
      })

    return () => controller.abort()
  }, [])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.35 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (counter.status !== 'ready' || !isVisible) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion || counter.count === 0) {
      setDisplayedCount(counter.count)
      return
    }

    const duration = 700
    const startedAt = performance.now()
    let frameId = 0

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayedCount(Math.round(counter.count * eased))
      if (progress < 1) frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [counter, isVisible])

  if (!visible || counter.status === 'error') return null

  const formattedCount = counter.status === 'ready'
    ? new Intl.NumberFormat('en-US').format(displayedCount)
    : null

  return (
    <div
      ref={containerRef}
      className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-full border border-teal-300/25 bg-[#07101f]/80 px-4 py-2 shadow-[0_0_18px_rgba(45,212,191,0.08)] backdrop-blur-xl ${className}`}
      aria-live="polite"
      aria-busy={counter.status === 'loading'}
      aria-label={counter.status === 'ready' ? `${counter.count.toLocaleString('en-US')} website visits` : 'Loading website visits'}
    >
      <Eye className="shrink-0 text-teal-300" size={22} aria-hidden="true" />
      {counter.status === 'loading' ? (
        <span className="portfolio-label text-center text-[9px] font-bold uppercase tracking-[0.1em] text-white/55 lg:text-[11px] xl:text-xs">
          <span className="sr-only">Loading website visits</span>
          <span aria-hidden="true">— Website visits</span>
        </span>
      ) : (
        <span className="portfolio-label text-center text-[9px] font-bold uppercase leading-4 tracking-[0.1em] text-white lg:whitespace-nowrap lg:text-left lg:text-[11px] xl:text-xs">
          {formattedCount} website visits
        </span>
      )}
    </div>
  )
}
