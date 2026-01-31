"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

type HighlighterAction =
  | "highlight"
  | "underline"
  | "circle"
  | "box"
  | "bracket"
  | "crossed-off"
  | "strike-through"

interface HighlighterProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
  color?: string
  action?: HighlighterAction
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  className?: string
}

export function Highlighter({
  children,
  color = "#ffd1dc",
  action = "highlight",
  strokeWidth = 1.5,
  animationDuration = 500,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  className,
  style,
  ...props
}: HighlighterProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [pathData, setPathData] = useState<string>("")
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isInView, setIsInView] = useState(!isView)

  useEffect(() => {
    if (isView && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true)
          }
        },
        { threshold: 0.1 }
      )
      observer.observe(containerRef.current)
      return () => observer.disconnect()
    }
  }, [isView])

  useEffect(() => {
    if (!containerRef.current || !isInView) return

    const updatePath = () => {
      const element = containerRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      setDimensions({ width, height })

      let path = ""

      switch (action) {
        case "highlight":
          // Create a natural hand-drawn marker stroke
          const highlightHeight = height * 0.5
          const baseline = height * 0.65
          const waveAmplitude = height * 0.1
          const numWaves = Math.max(4, Math.floor(width / 50))
          
          // Start from left, create wavy top edge
          let highlightPath = `M ${-padding} ${baseline - highlightHeight / 2 + Math.sin(0) * waveAmplitude}`
          
          // Top wavy edge
          for (let i = 1; i <= numWaves; i++) {
            const progress = i / numWaves
            const x = progress * (width + padding * 2) - padding
            const wave = Math.sin(progress * Math.PI * 2.5) * waveAmplitude
            const y = baseline - highlightHeight / 2 + wave
            const controlX = (progress - 0.5 / numWaves) * (width + padding * 2) - padding
            const controlY = baseline - highlightHeight / 2 + Math.sin((progress - 0.25 / numWaves) * Math.PI * 2.5) * waveAmplitude
            highlightPath += ` Q ${controlX} ${controlY} ${x} ${y}`
          }
          
          // Right edge
          highlightPath += ` L ${width + padding} ${baseline + highlightHeight / 2 + Math.cos(1) * waveAmplitude * 0.8}`
          
          // Bottom wavy edge (going back)
          for (let i = numWaves - 1; i >= 0; i--) {
            const progress = i / numWaves
            const x = progress * (width + padding * 2) - padding
            const wave = Math.cos(progress * Math.PI * 2.3) * waveAmplitude * 0.9
            const y = baseline + highlightHeight / 2 + wave
            const controlX = (progress + 0.5 / numWaves) * (width + padding * 2) - padding
            const controlY = baseline + highlightHeight / 2 + Math.cos((progress + 0.25 / numWaves) * Math.PI * 2.3) * waveAmplitude * 0.9
            highlightPath += ` Q ${controlX} ${controlY} ${x} ${y}`
          }
          
          highlightPath += " Z"
          path = highlightPath
          break
        case "underline":
          path = `M ${-padding} ${height + padding} Q ${width / 4} ${height + padding * 2} ${width / 2} ${height + padding * 2} T ${width + padding} ${height + padding}`
          break
        case "circle":
          const centerX = width / 2
          const centerY = height / 2
          const radius = Math.max(width, height) / 2 + padding
          path = `M ${centerX + radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY}`
          break
        case "box":
          path = `M ${-padding} ${-padding} L ${width + padding} ${-padding} L ${width + padding} ${height + padding} L ${-padding} ${height + padding} Z`
          break
        case "bracket":
          const bracketWidth = 4
          path = `M ${-padding} ${-padding} L ${-padding + bracketWidth} ${-padding} L ${-padding + bracketWidth} ${height + padding} L ${-padding} ${height + padding} M ${width + padding} ${-padding} L ${width + padding - bracketWidth} ${-padding} L ${width + padding - bracketWidth} ${height + padding} L ${width + padding} ${height + padding}`
          break
        case "crossed-off":
        case "strike-through":
          path = `M ${-padding} ${height / 2} L ${width + padding} ${height / 2}`
          break
      }

      setPathData(path)
    }

    // Initial update
    updatePath()

    // Update on resize/scroll
    const timeout = setTimeout(updatePath, 100)
    window.addEventListener("resize", updatePath)
    window.addEventListener("scroll", updatePath, true)

    return () => {
      clearTimeout(timeout)
      window.removeEventListener("resize", updatePath)
      window.removeEventListener("scroll", updatePath, true)
    }
  }, [action, padding, isInView])

  const fillColor = action === "highlight" || action === "circle" || action === "box" ? color : "none"
  const strokeColor = action !== "highlight" && action !== "circle" && action !== "box" ? color : "none"
  const opacity = action === "highlight" || action === "circle" || action === "box" ? 0.4 : 1

  return (
    <span
      ref={containerRef}
      className={cn("relative inline-block", className)}
      style={{ fontFamily: "system-ui, -apple-system, sans-serif", ...style }}
      {...props}
    >
      {children}
      {isInView && pathData && dimensions.width > 0 && (
        <svg
          className="absolute pointer-events-none overflow-visible"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            top: 0,
            left: 0,
          }}
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        >
          <path
            d={pathData}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            opacity={opacity}
            style={{
              animation: `drawPath ${animationDuration}ms ease-in-out ${iterations} ${iterations > 1 ? "alternate" : ""}`,
            }}
          />
        </svg>
      )}
      <style jsx>{`
        @keyframes drawPath {
          from {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            fill-opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            fill-opacity: ${opacity};
          }
        }
      `}</style>
    </span>
  )
}
