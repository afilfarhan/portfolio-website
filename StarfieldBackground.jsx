import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { easing } from 'maath'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ──────────────────────────────────────────────────────────────────────────
 * SHARED SCROLL STATE
 * Plain mutable object (not React state) so ScrollTrigger can write 60fps
 * and the R3F render loop can read 60fps without React re-renders.
 * ────────────────────────────────────────────────────────────────────────── */
const SECTION_COUNT = 5
const SECTION_DEPTH = 16

const scrollState = {
  /** Normalized page progress 0 (top) → 1 (bottom) */
  progress: 0,
}

/* ──────────────────────────────────────────────────────────────────────────
 * CAMERA RIG
 * Moves the camera vertically through "sections" as the user scrolls.
 * Matches the original Scene.jsx CameraRig behavior:
 * - Camera Y position eases toward target based on scroll progress
 * - 5 sections, each 16 units apart vertically
 * - Uses maath.easing.damp for smooth "chase" motion
 * ────────────────────────────────────────────────────────────────────────── */
function CameraRig() {
  const { camera } = useThree()

  useFrame((_, delta) => {
    const p = scrollState.progress
    // Target Y: camera moves down through 5 sections (4 gaps × 16 = 64 units)
    const targetY = -p * (SECTION_COUNT - 1) * SECTION_DEPTH

    // Smooth damp toward target (matches maath.easing.damp behavior)
    easing.damp(camera.position, 'y', targetY, 0.25, delta)
  })

  return null
}

/* ──────────────────────────────────────────────────────────────────────────
 * STARFIELD PARTICLE SYSTEM
 * - Particle count adapts to viewport width for mobile performance
 * - Stars live in a spherical shell around the camera so they never clip
 * - Color shifts from cyan (top) → violet (bottom) with scroll progress
 * - Slow continuous rotation on Y and X axes
 * - Follows camera Y position so stars persist through vertical camera travel
 * ────────────────────────────────────────────────────────────────────────── */
function Starfield() {
  const points = useRef()
  const materialRef = useRef()
  const { camera } = useThree()

  // Fewer stars on mobile to maintain 60fps
  const count = useMemo(
    () => (typeof window !== 'undefined' && window.innerWidth < 768 ? 1200 : 3000),
    []
  )

  // Pre-compute star positions in a spherical shell
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 40 + Math.random() * 140
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  const cyan = useMemo(() => new THREE.Color('#9ee8ff'), [])
  const violet = useMemo(() => new THREE.Color('#c4b5fd'), [])
  const tmp = useMemo(() => new THREE.Color(), [])

  // Per-frame animation: follow camera Y, rotate, lerp color by scroll
  useFrame((_, delta) => {
    if (!points.current) return

    // Keep starfield centered on camera vertically
    points.current.position.y = camera.position.y

    // Slow continuous rotation
    points.current.rotation.y += delta * 0.008
    points.current.rotation.x += delta * 0.002

    // Color shift tied to global scroll progress
    if (materialRef.current) {
      tmp.lerpColors(cyan, violet, scrollState.progress)
      materialRef.current.color.copy(tmp)
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.35}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
 * SCROLL CONTROLLER
 * Single ScrollTrigger spanning the full page height that writes
 * normalized progress (0–1) into scrollState on every scroll event.
 * Also cleans up on unmount.
 * ────────────────────────────────────────────────────────────────────────── */
function ScrollController() {
  useEffect(() => {
    const tracker = ScrollTrigger.create({
      trigger: document.body,
      scroller: window,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollState.progress = self.progress
      },
    })

    return () => {
      tracker.kill()
    }
  }, [])

  return null
}

/* ──────────────────────────────────────────────────────────────────────────
 * STARFIELD CANVAS
 * Full-viewport fixed canvas behind page content.
 * - Camera starts at z=11, fov=50 (matches original SceneCanvas)
 * - DPR capped at 1.5 for mobile performance
 * - Dark background matching original scene (#05060f)
 * ────────────────────────────────────────────────────────────────────────── */
function StarfieldCanvas() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // let DOM content receive clicks
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 11], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#05060f']} />
        <Starfield />
        <CameraRig />
        <ScrollController />
      </Canvas>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
 * STARFIELD BACKGROUND – MAIN EXPORT
 * Drop-in component: renders a fixed full-screen WebGL canvas behind your
 * page content. Scroll the page → camera travels down, starfield follows,
 * rotates & shifts color.
 *
 * USAGE:
 *   import StarfieldBackground from './StarfieldBackground'
 *   function App() {
 *     return (
 *       <>
 *         <StarfieldBackground />
 *         <main style={{ position: 'relative', zIndex: 1 }}>
 *           { your scrollable page content - must be tall enough to scroll }
 *         </main>
 *       </>
 *     )
 *   }
 *
 * DEPENDENCIES (install if missing):
 *   npm i three @react-three/fiber gsap @react-three/drei maath
 *
 * CSS REQUIREMENTS:
 *   - Page content must have position: relative and z-index ≥ 1
 *   - body must have height ≥ 100vh (enough scroll to trigger progress)
 *   - For best effect, content should span multiple viewport heights
 * ────────────────────────────────────────────────────────────────────────── */
export default function StarfieldBackground() {
  return <StarfieldCanvas />
}

/* ──────────────────────────────────────────────────────────────────────────
 * DEMO WRAPPER — for instant testing without existing page content
 * Usage: import { StarfieldBackgroundDemo } from './StarfieldBackground'
 * ────────────────────────────────────────────────────────────────────────── */
export function StarfieldBackgroundDemo() {
  return (
    <>
      <StarfieldBackground />
      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* 5 sections × 100vh = 500vh total scroll height */}
        {[0, 1, 2, 3, 4].map((i) => (
          <section
            key={i}
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              color: '#e2e8f0',
              fontFamily: 'system-ui, sans-serif',
              textAlign: 'center',
              padding: '2rem',
              borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
              background: i % 2 === 0
                ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))'
                : 'linear-gradient(180deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.3))',
            }}
          >
            <h2 style={{ margin: 0, fontWeight: 600, letterSpacing: '0.05em' }}>
              Section {i + 1}
            </h2>
            <p style={{ margin: '1rem 0 0', color: '#94a3b8', fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>
              Scroll down — camera travels, stars rotate & shift cyan → violet
            </p>
            <div
              style={{
                marginTop: '2rem',
                width: '60px',
                height: '4px',
                background: 'linear-gradient(90deg, #9ee8ff, #c4b5fd)',
                borderRadius: '2px',
                opacity: 0.6,
              }}
            />
          </section>
        ))}
      </main>
    </>
  )
}