"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface LightRaysProps {
  count?: number
  color?: string
  blur?: number
  opacity?: number
  speed?: number
  length?: string | number
  className?: string
  style?: React.CSSProperties
}

export function LightRays({
  count = 7,
  color = "rgba(160, 210, 255, 0.2)",
  blur = 36,
  opacity = 0.65,
  speed = 14,
  length = "70vh",
  className,
  style,
}: LightRaysProps) {
  const lengthValue = typeof length === "number" ? `${length}px` : length

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      style={style}
    >
      {Array.from({ length: count }).map((_, i) => {
        const delay = (i / count) * speed
        const duration = speed + (Math.random() * speed * 0.5 - speed * 0.25)
        const left = count > 1 ? (i / (count - 1)) * 100 : 50
        
        return (
          <div
            key={i}
            className="absolute top-0"
            style={{
              left: `${left}%`,
              width: "12px",
              height: lengthValue,
              background: `linear-gradient(to bottom, transparent 0%, ${color} 20%, ${color} 50%, ${color} 80%, transparent 100%)`,
              filter: `blur(${blur}px)`,
              transform: "translateX(-50%)",
              transformOrigin: "top center",
              animation: `lightRay ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}
