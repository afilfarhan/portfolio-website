"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)")
    setIsTouch(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return isTouch
}

export interface UseTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
  easing?: string
}

export interface UseTiltReturn {
  ref: React.RefObject<HTMLElement | null>
  style: React.CSSProperties
  isHovered: boolean
  onMouseMove: (e: React.MouseEvent) => void
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function useTilt(options: UseTiltOptions = {}): UseTiltReturn {
  const {
    maxTilt = 8,
    perspective = 1000,
    scale = 1.03,
    easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  } = options

  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const isTouch = useIsTouchDevice()
  const [transform, setTransform] = useState("")
  const [isHovered, setIsHovered] = useState(false)

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      if (prefersReducedMotion || isTouch || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      const rotateX = (-y * maxTilt).toFixed(2)
      const rotateY = (x * maxTilt).toFixed(2)
      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(8px)`,
      )
    },
    [prefersReducedMotion, isTouch, maxTilt, perspective, scale],
  )

  const handleEnter = useCallback(() => {
    if (!prefersReducedMotion && !isTouch) {
      setIsHovered(true)
    }
  }, [prefersReducedMotion, isTouch])

  const handleLeave = useCallback(() => {
    setTransform("")
    setIsHovered(false)
  }, [])

  const style: React.CSSProperties = {
    transform,
    transformStyle: "preserve-3d",
    transition: transform ? "none" : `transform 300ms ${easing}`,
  }

  return { ref, style, isHovered, onMouseMove: handleMove, onMouseEnter: handleEnter, onMouseLeave: handleLeave }
}