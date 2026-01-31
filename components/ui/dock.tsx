"use client"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion"
import React, { PropsWithChildren, useRef, createContext, useContext } from "react"

const DockContext = createContext<{
  mouseX: MotionValue<number>
  magnification: number
  distance: number
} | null>(null)

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string
  magnification?: number
  distance?: number
  direction?: "top" | "middle" | "bottom"
  children: React.ReactNode
}

const DEFAULT_MAGNIFICATION = 60
const DEFAULT_DISTANCE = 140

const dockVariants = cva(
  "mx-auto w-max h-[58px] p-2 flex gap-2 rounded-2xl border backdrop-blur-md"
)

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "bottom",
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(Infinity)

    return (
      <DockContext.Provider value={{ mouseX, magnification, distance }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => {
            mouseX.set(e.pageX)
          }}
          onMouseLeave={() => {
            mouseX.set(Infinity)
          }}
          {...props}
          className={cn(dockVariants({ className }), {
            "items-start": direction === "top",
            "items-center": direction === "middle",
            "items-end": direction === "bottom",
          })}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    )
  }
)

Dock.displayName = "Dock"

export interface DockIconProps {
  size?: number
  magnification?: number
  distance?: number
  mouseX?: any
  className?: string
  children?: React.ReactNode
  props?: PropsWithChildren
}

const DockIcon = ({
  size,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseX: propMouseX,
  className,
  children,
  ...props
}: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const context = useContext(DockContext)
  const defaultMouseX = useMotionValue(Infinity)
  const mouseX = propMouseX || context?.mouseX || defaultMouseX
  const finalMagnification = context?.magnification ?? magnification
  const finalDistance = context?.distance ?? distance

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(
    distanceCalc,
    [-finalDistance, 0, finalDistance],
    [40, finalMagnification, 40]
  )

  let width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  })

  return (
    <motion.div
      ref={ref}
      style={{ width, minWidth: 40 }}
      className={cn(
        "flex aspect-square cursor-pointer items-center justify-center rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

DockIcon.displayName = "DockIcon"

export { Dock, DockIcon, dockVariants }
