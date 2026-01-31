"use client"

import { cn } from "@/lib/utils"
import React from "react"

interface AuroraTextProps {
  className?: string
  children: React.ReactNode
  colors?: string[]
  speed?: number
}

export function AuroraText({
  className,
  children,
  colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
  speed = 1,
}: AuroraTextProps) {
  return (
    <span
      className={cn(
        "relative inline-block bg-clip-text text-transparent",
        className
      )}
      style={{
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        backgroundSize: "200% 100%",
        animation: `aurora ${3 / speed}s ease-in-out infinite alternate`,
      }}
    >
      {children}
    </span>
  )
}
