"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface VelocityScrollProps {
  text: string;
  default_velocity?: number;
  className?: string;
}

export function VelocityScroll({ 
  text, 
  default_velocity = 5, 
  className = "" 
}: VelocityScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -default_velocity * 100]);

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        style={{ y }}
        className={className}
      >
        {text}
      </motion.div>
    </div>
  );
}
