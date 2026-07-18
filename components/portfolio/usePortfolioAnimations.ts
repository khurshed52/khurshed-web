import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

export function usePortfolioAnimations(root: RefObject<HTMLDivElement | null>, orbitRef: RefObject<HTMLDivElement | null>) {
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
      if (!orbit) return

      const center = orbit.querySelector('[data-orbit-center]')
      const rings = orbit.querySelectorAll('[data-orbit-ring]')
      const cards = orbit.querySelectorAll('[data-orbit-card]')
      const dots = orbit.querySelectorAll('[data-orbit-dot]')

      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(orbit, { opacity: 0, y: 35, scale: 0.97, duration: 0.8 })
        .from(rings, { scale: 0.4, opacity: 0, stagger: 0.12, duration: 0.7 }, '-=0.4')
        .from(center, { scale: 0, rotate: -20, opacity: 0, duration: 0.75, ease: 'back.out(1.8)' }, '-=0.5')
        .from(cards, { scale: 0.75, opacity: 0, stagger: 0.12, duration: 0.55, ease: 'back.out(1.5)' }, '-=0.4')
        .from(dots, { scale: 0, opacity: 0, stagger: 0.05, duration: 0.35 }, '-=0.3')

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
        stagger: { each: 0.35, from: 'random' },
        ease: 'sine.inOut',
      })
      gsap.to(center, {
        scale: 1.04,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    }, root)

    return () => ctx.revert()
  }, [root, orbitRef])
}
