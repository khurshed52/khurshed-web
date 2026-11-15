import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Khurshed Khan — Senior FinTech Frontend and Full-Stack Developer in Dubai'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #030712 0%, #0b1f38 58%, #063b45 100%)', color: 'white', padding: '72px', fontFamily: 'sans-serif' }}>
      <div style={{ position: 'absolute', width: 540, height: 540, right: -80, top: -120, borderRadius: 999, background: 'radial-gradient(circle, rgba(45,212,191,0.26), rgba(45,212,191,0))' }} />
      <div style={{ position: 'absolute', inset: 24, border: '1px solid rgba(125,211,252,0.25)', borderRadius: 34 }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#7dd3fc', fontSize: 23, letterSpacing: 8, textTransform: 'uppercase' }}>Engineering reliable digital products</div>
          <div style={{ marginTop: 34, fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>Khurshed Khan</div>
          <div style={{ marginTop: 20, maxWidth: 940, fontSize: 38, lineHeight: 1.18, color: '#d6fff8' }}>Senior FinTech Frontend &amp; Full-Stack Developer</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 25, color: '#cbd5e1' }}>
          <span>React.js · Next.js · TypeScript · Node.js</span><span style={{ color: '#5eead4' }}>Dubai, UAE</span>
        </div>
      </div>
    </div>,
    size,
  )
}
