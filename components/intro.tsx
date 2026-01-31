"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { Linkedin, Github } from "lucide-react";
import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/active-section-context";
import ProfileImg from "@/public/profile.jpg";
import { Highlighter } from "@/components/ui/highlighter";
import { Button } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.5);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  return (
    <section
      ref={ref}
      id="home"
      className="mb-28 max-w-[70rem] text-center sm:mb-0 scroll-mt-[100rem] relative min-h-[700px] w-full overflow-visible"
    >
      {/* Meteors Background - Full Screen */}
      <div className="absolute left-[calc(-50vw+50%)] right-[calc(-50vw+50%)] w-screen h-full z-0 pointer-events-none overflow-visible">
        <Meteors 
          number={20}
          angle={45}
        />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* Background circle to hide meteors behind image */}
            <div className="absolute inset-0 h-64 w-64 rounded-full bg-background dark:bg-background -z-10" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "tween",
                duration: 0.2,
              }}
              className="h-64 w-64 rounded-full overflow-hidden shadow-2xl dark:bg-black/30 relative z-10"
              style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
              <Image
                src={ProfileImg}
                alt="Harshdeep"
                width="300"
                height="300"
                quality="100"
                priority={true}
                className="h-full w-full object-cover scale-150 shadow-2xl"
                style={{ objectPosition: 'center 95%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
              />
            </motion.div>

            <motion.span
              className="absolute bottom-0 right-0 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 125,
                delay: 0.1,
                duration: 0.7,
              }}
            >
              
            </motion.span>
          </div>
        </div>

        <motion.h1
          className="mb-3 mt-4 px-4 text-2xl font-medium !leading-[1.5] sm:text-4xl"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="">Hey👋, I'm{" "}
            <Highlighter 
              action="highlight" 
              color="#FFD700"
              className="font-bold"
            >
              Harshdeep Singh Plaha
            </Highlighter>.
          </span> 
        </motion.h1>
        <motion.h2 
          className="mb-10  px-4 sm:text-2xl" 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}>
        <span className="">Developer and Data Scientist.</span>
        </motion.h2>
        

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-2 px-4 text-lg font-medium"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
          }}
        >
          <Button
            onClick={() => {
              setActiveSection("Contact");
              setTimeOfLastClick(Date.now());
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-white text-black border border-black hover:bg-black hover:text-white hover:border-black dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white rounded-full transition-colors"
          >
            Let's connect
          </Button>

          <Button
            asChild
            variant="secondary"
            className="group rounded-full focus:scale-110 hover:scale-110 active:scale-105 transition bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <a
              href="/Zip.pdf"
              download
              className="flex items-center gap-2"
            >
              Download CV{" "}
              <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
            </a>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="icon"
            className="rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <a
              href="https://www.linkedin.com/in/harshdeep-plaha-86b7181b9"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>

          <Button
            asChild
            variant="secondary"
            size="icon"
            className="rounded-full focus:scale-[1.15] hover:scale-[1.15] active:scale-105 transition bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
          >
            <a
              href="https://github.com/Harshdeepplaha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
