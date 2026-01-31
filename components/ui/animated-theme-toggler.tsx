"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/theme-context"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps {
  className?: string
  duration?: number
}

export function AnimatedThemeToggler({
  className,
  duration = 400,
}: AnimatedThemeTogglerProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className={cn(
        "relative flex h-full w-full items-center justify-center rounded-full transition-colors",
        className
      )}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 0 : 180,
          scale: theme === "dark" ? 1 : 0,
        }}
        transition={{
          duration: duration / 1000,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <Sun className="h-5 w-5 text-gray-950 dark:text-gray-200" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "light" ? 0 : -180,
          scale: theme === "light" ? 1 : 0,
        }}
        transition={{
          duration: duration / 1000,
          ease: "easeInOut",
        }}
        className="absolute"
      >
        <Moon className="h-5 w-5 text-gray-950 dark:text-gray-200" />
      </motion.div>
    </motion.button>
  )
}
