"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, Download, Mail } from "lucide-react"
import { contact } from "@/content/resume-data"

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <StaticFallback />,
})

function StaticFallback() {
  return (
    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.22_0.05_240)_0%,oklch(0.13_0.01_280)_65%)]"
      aria-hidden="true"
    />
  )
}

function useCanRender3D() {
  const prefersReducedMotion = useReducedMotion()
  const [capable, setCapable] = useState<boolean | null>(null)

  useEffect(() => {
    // Low-end device heuristics: few cores, low memory, or no WebGL
    const cores = navigator.hardwareConcurrency ?? 4
    const memory = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4
    let webgl = false
    try {
      const canvas = document.createElement("canvas")
      webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"))
    } catch {
      webgl = false
    }
    // The scene is lightweight (~140 points + line segments), so only very
    // constrained devices need the static fallback
    setCapable(webgl && cores >= 2 && memory >= 2)
  }, [])

  if (prefersReducedMotion) return false
  return capable
}

export function Hero() {
  const canRender3D = useCanRender3D()
  const prefersReducedMotion = useReducedMotion()

  const fadeUp = {
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  }

  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {canRender3D === true ? <HeroScene /> : <StaticFallback />}
      {/* Legibility scrim */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,oklch(0.13_0.01_280/0.7)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
        <motion.p
          {...fadeUp}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="font-mono text-sm tracking-widest text-primary uppercase"
        >
          {contact.location}
        </motion.p>
        <motion.h1
          {...fadeUp}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.08 }}
          className="text-balance text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          {contact.name}
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.16 }}
          className="font-mono text-base text-primary sm:text-lg"
        >
          {contact.title}
        </motion.p>
        <motion.p
          {...fadeUp}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.24 }}
          className="max-w-2xl text-pretty leading-relaxed text-muted-foreground"
        >
          Building production-grade multi-agent systems, RAG pipelines, and full-stack AI
          applications — from LLM lifecycle ownership to on-device inference.
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.32 }}
          className="mt-4 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Projects
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
          <a
            href={contact.resumePdf}
            download
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Download className="size-4" aria-hidden="true" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Mail className="size-4" aria-hidden="true" />
            Contact
          </a>
        </motion.div>
      </div>
    </section>
  )
}
