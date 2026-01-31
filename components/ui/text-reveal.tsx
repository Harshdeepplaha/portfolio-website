"use client"

import { cn } from "@/lib/utils"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"
import { useRef, useMemo } from "react"

interface WordRevealProps {
  word: string
  scrollYProgress: MotionValue<number>
  index: number
  totalWords: number
}

function WordReveal({ word, scrollYProgress, index, totalWords }: WordRevealProps) {
  const start = index / totalWords
  const end = start + 1 / totalWords
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [20, 0])

  return (
    <>
      <motion.span
        style={{ opacity, y }}
        className="inline-block"
      >
        {word}
      </motion.span>
      {" "}
    </>
  )
}

interface TextRevealProps {
  children: string
  className?: string
}

export function TextReveal({ children, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.25"],
  })

  const words = useMemo(() => children.split(" "), [children])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <p className="block leading-relaxed text-justify">
        {words.map((word, i) => (
          <WordReveal
            key={i}
            word={word}
            scrollYProgress={scrollYProgress}
            index={i}
            totalWords={words.length}
          />
        ))}
      </p>
    </div>
  )
}
