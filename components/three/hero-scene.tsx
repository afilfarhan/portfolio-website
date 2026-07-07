"use client"

import { useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const NODE_COUNT = 140
const MAX_LINK_DIST = 2.1
const PULSE_COUNT = 24

const ACCENT = new THREE.Color("#3ECFFF")
const ACCENT_2 = new THREE.Color("#7C4DFF")

function generateGraph() {
  const positions: THREE.Vector3[] = []
  // Distribute nodes in a flattened ellipsoid cloud (reads like a network diagram)
  for (let i = 0; i < NODE_COUNT; i++) {
    const theta = Math.acos(2 * Math.random() - 1)
    const phi = Math.random() * Math.PI * 2
    const r = 3.2 + (Math.random() - 0.5) * 2.4
    positions.push(
      new THREE.Vector3(
        r * Math.sin(theta) * Math.cos(phi) * 1.6,
        r * Math.sin(theta) * Math.sin(phi) * 0.85,
        r * Math.cos(theta) * 1.1,
      ),
    )
  }
  // Connect near neighbors
  const edges: [number, number][] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    for (let j = i + 1; j < NODE_COUNT; j++) {
      if (positions[i].distanceTo(positions[j]) < MAX_LINK_DIST) {
        edges.push([i, j])
      }
    }
  }
  return { positions, edges }
}

function NodeGraph() {
  const groupRef = useRef<THREE.Group>(null)
  const pulsesRef = useRef<THREE.Points>(null)
  const { positions, edges } = useMemo(generateGraph, [])
  const pointer = useThree((s) => s.pointer)

  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const arr = new Float32Array(NODE_COUNT * 3)
    const colors = new Float32Array(NODE_COUNT * 3)
    positions.forEach((p, i) => {
      arr.set([p.x, p.y, p.z], i * 3)
      const c = ACCENT.clone().lerp(ACCENT_2, Math.random() * 0.6)
      colors.set([c.r, c.g, c.b], i * 3)
    })
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3))
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    return geo
  }, [positions])

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const arr = new Float32Array(edges.length * 6)
    edges.forEach(([a, b], i) => {
      arr.set([positions[a].x, positions[a].y, positions[a].z], i * 6)
      arr.set([positions[b].x, positions[b].y, positions[b].z], i * 6 + 3)
    })
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3))
    return geo
  }, [positions, edges])

  // Pulses: points that travel along random edges to suggest inference / data flow
  const pulseState = useMemo(() => {
    return Array.from({ length: PULSE_COUNT }, () => ({
      edge: Math.floor(Math.random() * edges.length),
      t: Math.random(),
      speed: 0.15 + Math.random() * 0.35,
    }))
  }, [edges.length])

  const pulseGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PULSE_COUNT * 3), 3))
    return geo
  }, [])

  useFrame((_, delta) => {
    const group = groupRef.current
    if (group) {
      group.rotation.y += delta * 0.06
      // subtle mouse parallax (lerped, not drag control)
      group.rotation.x += (pointer.y * 0.18 - group.rotation.x) * 0.04
      group.rotation.z += (pointer.x * 0.08 - group.rotation.z) * 0.04
    }
    // advance pulses along edges
    const attr = pulseGeometry.getAttribute("position") as THREE.BufferAttribute
    pulseState.forEach((p, i) => {
      p.t += delta * p.speed
      if (p.t > 1) {
        p.t = 0
        p.edge = Math.floor(Math.random() * edges.length)
      }
      const [a, b] = edges[p.edge]
      const x = positions[a].x + (positions[b].x - positions[a].x) * p.t
      const y = positions[a].y + (positions[b].y - positions[a].y) * p.t
      const z = positions[a].z + (positions[b].z - positions[a].z) * p.t
      attr.setXYZ(i, x, y, z)
    })
    attr.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points geometry={nodeGeometry}>
        <pointsMaterial
          size={0.09}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#3ECFFF"
          transparent
          opacity={0.12}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      <points ref={pulsesRef} geometry={pulseGeometry}>
        <pointsMaterial
          size={0.14}
          color="#7C4DFF"
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0A0A0F"]} />
        <fog attach="fog" args={["#0A0A0F", 8, 16]} />
        <NodeGraph />
      </Canvas>
    </div>
  )
}
