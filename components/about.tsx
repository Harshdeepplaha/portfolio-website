"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useSectionInView } from "@/lib/hooks";

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-3">
  From a young age, I was captivated by technology. Whether it was taking apart
  gadgets to see how they worked or experimenting with new software installing custom ROM's on my mom's phone, my
  curiosity about the digital world has always driven me. This fascination
  naturally evolved into a passion for <span className="font-medium">software engineering</span>, where I’ve
  found joy in turning ideas into reality through code. I’ve had the
  opportunity to work with a variety of technologies, including{" "}
  <span className="font-medium">React, Node.js, Python, Docker, Kubernetes, and Machine Learning and Artificial intelligence is what fascinates me!</span>. My experiences
  range from working with distributed systems during my internship at Q2 to
  optimizing CI/CD processes, which has deepened my understanding of scalable
  infrastructure and effective software development practices.
  I’m always eager to learn and explore new technologies, constantly driven by
  the same curiosity that got me started. Now,
</p>



      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        Badmintion, watching movies and do outdoor activities. I also enjoy{" "}
        <span className="font-medium">learning new things</span>. I am currently
        learning about{" "}
        <span className="font-medium">Large Language Models</span>. I'm also
        learning how to play tennis.
      </p>
    </motion.section>
  );
}
