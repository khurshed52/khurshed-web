'use client'

import Image from 'next/image'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { ClampToEdgeWrapping, LinearFilter, MathUtils, ShaderMaterial, SRGBColorSpace, TextureLoader, Vector2 } from 'three'

const sceneImage = '/storyboard/dubai-sequence-05.jpg'
const imageSize = new Vector2(1672, 941)

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform sampler2D uScene;
  uniform vec2 uResolution;
  uniform vec2 uImageSize;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uTravel;
  varying vec2 vUv;

  float random(vec2 point) {
    return fract(sin(dot(point, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float box(vec2 point, vec2 center, vec2 halfSize, float softness) {
    vec2 edge = abs(point - center) - halfSize;
    return 1.0 - smoothstep(0.0, softness, max(edge.x, edge.y));
  }

  vec2 coverUv(vec2 uv, float zoom) {
    float screenRatio = uResolution.x / uResolution.y;
    float imageRatio = uImageSize.x / uImageSize.y;
    vec2 scale = screenRatio < imageRatio
      ? vec2(screenRatio / imageRatio, 1.0)
      : vec2(1.0, imageRatio / screenRatio);
    vec2 covered = (uv - 0.5) * scale + 0.5;
    covered = (covered - vec2(0.54, 0.51)) / zoom + vec2(0.54, 0.51);
    return covered;
  }

  void main() {
    float cycle = fract(uTime / 13.0);
    float cameraEase = sin(cycle * 3.14159265);
    float zoom = 1.035 + cameraEase * 0.055 + uTravel * 0.02;
    vec2 uv = coverUv(vUv, zoom);

    // Region-aware parallax makes the nearby desk respond more than the skyline.
    float foregroundDepth = smoothstep(0.62, 0.98, 1.0 - uv.y);
    float midDepth = box(uv, vec2(0.59, 0.48), vec2(0.43, 0.40), 0.18);
    vec2 parallax = uPointer * (0.004 + midDepth * 0.006 + foregroundDepth * 0.011);
    parallax += vec2(sin(uTime * 0.12), cos(uTime * 0.09)) * 0.0018;
    uv = clamp(uv + parallax, 0.002, 0.998);

    vec3 color = texture2D(uScene, uv).rgb;

    // Live code and data graphics run separately from the source photograph.
    float leftScreen = box(uv, vec2(0.545, 0.505), vec2(0.105, 0.145), 0.012);
    float rightScreen = box(uv, vec2(0.775, 0.515), vec2(0.125, 0.16), 0.012);
    float scan = 0.5 + 0.5 * sin((uv.y * 520.0) - uTime * 4.5);
    color += vec3(0.01, 0.16, 0.18) * (leftScreen + rightScreen) * (0.12 + scan * 0.08);

    float codeRows = smoothstep(0.86, 1.0, sin((uv.y * 210.0) + uTime * 1.4));
    float codeCursor = step(0.48, fract(uTime * 0.7));
    float codeWidth = step(uv.x, 0.47 + 0.14 * random(vec2(floor(uv.y * 38.0), 2.0)));
    float code = leftScreen * codeRows * codeWidth;
    color += mix(vec3(0.08, 0.42, 0.95), vec3(0.14, 0.95, 0.72), codeCursor) * code * 0.18;

    vec2 graphUv = vec2((uv.x - 0.65) / 0.25, (uv.y - 0.39) / 0.27);
    float waveA = 0.48 + 0.18 * sin(graphUv.x * 8.0 + uTime * 0.9) + graphUv.x * 0.20;
    float waveB = 0.28 + 0.10 * sin(graphUv.x * 12.0 - uTime * 0.7) + graphUv.x * 0.16;
    float graph = (1.0 - smoothstep(0.008, 0.022, abs(graphUv.y - waveA)))
      + (1.0 - smoothstep(0.007, 0.018, abs(graphUv.y - waveB)));
    graph *= rightScreen * step(0.0, graphUv.x) * step(graphUv.x, 1.0);
    color += vec3(0.05, 0.92, 0.72) * graph * 0.34;

    float bars = rightScreen
      * step(0.62, graphUv.x)
      * step(graphUv.y, 0.32 + random(vec2(floor(graphUv.x * 28.0), 8.0)) * 0.35)
      * step(0.58, fract(graphUv.x * 30.0));
    color += vec3(0.08, 0.65, 0.95) * bars * 0.18;

    float monitorGlow = 1.0 - smoothstep(0.08, 0.48, distance(uv, vec2(0.72, 0.50)));
    color += vec3(0.0, 0.22, 0.25) * monitorGlow * (0.11 + 0.045 * sin(uTime * 1.6));

    // Moving window reflections, atmosphere, and film grain create temporal motion.
    float reflection = smoothstep(0.028, 0.0, abs(fract(uv.x * 0.72 + uTime * 0.025) - uv.y * 0.16 - 0.36));
    reflection *= smoothstep(0.16, 0.72, uv.y) * (1.0 - smoothstep(0.72, 0.96, uv.x));
    color += vec3(0.08, 0.26, 0.42) * reflection * 0.11;

    vec2 particleCell = floor(vUv * vec2(86.0, 48.0));
    float seed = random(particleCell);
    vec2 particleUv = fract(vUv * vec2(86.0, 48.0) + vec2(seed, uTime * (0.025 + seed * 0.04)));
    float particle = (1.0 - smoothstep(0.0, 0.075, distance(particleUv, vec2(0.5)))) * step(0.94, seed);
    color += vec3(0.42, 0.82, 0.95) * particle * 0.22;

    float vignette = smoothstep(0.88, 0.22, distance(vUv, vec2(0.52, 0.50)));
    color *= mix(0.58, 1.0, vignette);
    float grain = random(gl_FragCoord.xy + uTime * 37.0) - 0.5;
    color += grain * 0.014;
    gl_FragColor = vec4(color, 1.0);
  }
`

function LivingWorkspace({ onReveal }: { onReveal: () => void }) {
  const materialRef = useRef<ShaderMaterial>(null)
  const revealed = useRef(false)
  const motion = useRef({ travel: 0 })
  const texture = useLoader(TextureLoader, sceneImage)
  const { size, viewport } = useThree()

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace
    texture.minFilter = LinearFilter
    texture.magFilter = LinearFilter
    texture.wrapS = ClampToEdgeWrapping
    texture.wrapT = ClampToEdgeWrapping
    texture.needsUpdate = true
  }, [texture])

  const uniforms = useMemo(() => ({
    uScene: { value: texture },
    uResolution: { value: new Vector2(size.width, size.height) },
    uImageSize: { value: imageSize },
    uPointer: { value: new Vector2(0, 0) },
    uTime: { value: 0 },
    uTravel: { value: 0 },
  }), [size.height, size.width, texture])

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1 })
    timeline.to(motion.current, { travel: 1, duration: 6.5, ease: 'sine.inOut' })
    timeline.to(motion.current, { travel: 0, duration: 6.5, ease: 'sine.inOut' })
    const revealTimer = window.setTimeout(() => {
      if (revealed.current) return
      revealed.current = true
      onReveal()
    }, 900)
    return () => {
      timeline.kill()
      window.clearTimeout(revealTimer)
    }
  }, [onReveal])

  useFrame((state, delta) => {
    const material = materialRef.current
    if (!material) return
    const pointer = material.uniforms.uPointer.value as Vector2
    pointer.x = MathUtils.damp(pointer.x, state.pointer.x, 2.2, delta)
    pointer.y = MathUtils.damp(pointer.y, state.pointer.y, 2.2, delta)
    material.uniforms.uTime.value = state.clock.elapsedTime
    material.uniforms.uTravel.value = motion.current.travel
    material.uniforms.uResolution.value.set(state.size.width, state.size.height)
  })

  return (
    <mesh scale={[viewport.width * 1.075, viewport.height * 1.075, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={materialRef} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} toneMapped={false} />
    </mesh>
  )
}

export default function CinematicScene({ reducedMotion, onReveal }: { reducedMotion: boolean; onReveal: () => void }) {
  const [canRenderWebGL, setCanRenderWebGL] = useState(false)

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const canvas = document.createElement('canvas')
    const webgl = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    setCanRenderWebGL(!mobile && webgl && !reducedMotion)
    if (mobile || !webgl || reducedMotion) onReveal()
  }, [onReveal, reducedMotion])

  if (!canRenderWebGL) {
    return <Image src={sceneImage} alt="" fill priority sizes="100vw" className="story-frame-image object-cover" />
  }

  return (
    <Canvas
      aria-hidden="true"
      className="cinematic-webgl-canvas"
      camera={{ fov: 50, near: 0.1, far: 10, position: [0, 0, 1] }}
      dpr={[1, 1.5]}
      gl={{ alpha: false, antialias: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#030712')}
    >
      <Suspense fallback={null}>
        <LivingWorkspace onReveal={onReveal} />
      </Suspense>
    </Canvas>
  )
}
