"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  )

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }))
    setMeteorStyles(styles)
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  return (
    <>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            "animate-meteor pointer-events-none absolute w-[2px] h-[2px] rotate-[var(--angle)] rounded-full bg-gray-300 dark:bg-gray-400 shadow-[0_0_4px_rgba(255,255,255,0.5)]",
            className
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[80px] -translate-y-1/2 bg-gradient-to-r from-gray-300 via-gray-400/50 to-transparent dark:from-gray-400 dark:via-gray-500/40" />
        </span>
      ))}
    </>
  )
}
