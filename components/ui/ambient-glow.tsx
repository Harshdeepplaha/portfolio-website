"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface AmbientGlowProps {
  className?: string
  style?: React.CSSProperties
}

export function AmbientGlow({
  className,
  style,
}: AmbientGlowProps) {
  return (
    <div
      className={cn("fixed inset-0 pointer-events-none overflow-hidden -z-10", className)}
      style={{ top: 0, left: 0, right: 0, bottom: 0, margin: 0, padding: 0, ...style }}
    >
      {/* Film grain effect - subtle */}
      <div
        className="absolute inset-0 w-full h-full opacity-[0.50] dark:opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
      
      {/* Top center glow - covers entire viewport */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(ellipse at center top, rgba(96, 165, 250, 0.15) 0%, rgba(96, 165, 250, 0.08) 30%, transparent 70%)",
          filter: "blur(60px)",
          animation: "ambientPulse 8s ease-in-out infinite",
        }}
      />
      
      {/* Secondary glow - wider spread */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(ellipse at center top, rgba(147, 197, 253, 0.1) 0%, rgba(147, 197, 253, 0.05) 40%, transparent 70%)",
          filter: "blur(50px)",
          animation: "ambientPulse 10s ease-in-out infinite 1s",
        }}
      />
      
      {/* Tertiary glow - full coverage */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "100vw",
          height: "100vh",
          background: "radial-gradient(ellipse at center top, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0.03) 50%, transparent 80%)",
          filter: "blur(80px)",
          animation: "ambientPulse 12s ease-in-out infinite 2s",
        }}
      />
    </div>
  )
}
