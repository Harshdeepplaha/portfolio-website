"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";
import { TextReveal } from "@/components/ui/text-reveal";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mt-20 mb-36 max-w-prose leading-8 sm:mb-52 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      
      <div className="mt-8 px-4 space-y-4">
        <TextReveal className="text-gray-800 dark:text-gray-200 text-lg sm:text-2xl">
          I'm a passionate developer and data scientist who loves turning complex problems into elegant solutions. 
          From building full-stack applications to developing machine learning models, I thrive on the intersection 
          of software engineering and artificial intelligence. My curiosity drives me to continuously learn and explore new technologies, always seeking to create 
          impactful solutions that make a difference.
        </TextReveal>
        
      </div>
    </motion.section>
  );
}
