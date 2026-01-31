"use client";

import React, { useState } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import Image from "next/image";
import { FaGithub, FaArrowRight } from "react-icons/fa";
import CaseStudyModal from "./case-study-modal";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

// Category mapping for subtle tags
const projectCategories: { [key: string]: string } = {
  "Sign Lingo": "COMPUTER VISION",
  "IoT Device Control & Monitoring": "FULL-STACK",
  "VR Child Behavior Analysis": "RESEARCH",
  "Fraud Detection System": "ML SYSTEM",
};

// Create one-line impact statements (max 12-14 words)
const getOneLineImpact = (project: (typeof projectsData)[number]) => {
  const impactMap: { [key: string]: string } = {
    "Sign Lingo": "Real-time sign language interpretation using computer vision",
    "IoT Device Control & Monitoring": "Cross-platform IoT platform managing 500+ concurrent devices",
    "VR Child Behavior Analysis": "Immersive VR environment for behavioral research and analysis",
    "Fraud Detection System": "High-throughput ML system for real-time financial fraud detection",
  };
  return impactMap[project.title] || project.impact;
};

// Pastel color variants for skill pills
const pastelColors = [
  "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
  "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
  "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
  "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
];

const getPastelColor = (index: number) => {
  return pastelColors[index % pastelColors.length];
};

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[number] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCaseStudy = (project: (typeof projectsData)[number]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-40">
      <div className="mb-16">
        <SectionHeading>My projects</SectionHeading>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4">
        {/* Horizontal Scrollable Carousel */}
        <div className="overflow-x-auto overflow-y-hidden pb-4 scroll-smooth projects-carousel">
          <div className="flex gap-4 min-w-max">
            {projectsData.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex-shrink-0"
                style={{ width: '240px' }}
              >
                <div
                  className="bg-white/90 dark:bg-zinc-900/95 border border-gray-200 dark:border-zinc-800 rounded-[18px] p-3 cursor-pointer h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-full backdrop-blur-md"
                  onClick={() => handleOpenCaseStudy(project)}
                >
                  {/* Thumbnail with Overlay */}
                  <div className="relative mb-3 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 aspect-video">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 dark:bg-black/40 group-hover:bg-black/5 dark:group-hover:bg-black/30 transition-colors duration-300" />
                  </div>

                  {/* Title + One-line Impact */}
                  <div className="mb-3 flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1.5 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {getOneLineImpact(project)}
                    </p>
                  </div>

                  {/* Tech Stack - Pastel Pills */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-2 py-1 text-[10px] font-medium rounded-full ${getPastelColor(tagIndex)}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Single Primary Action Button */}
                  <div className="mt-auto pt-2.5 border-t border-gray-200 dark:border-zinc-800">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCaseStudy(project);
                      }}
                      variant="secondary"
                      size="sm"
                      className="w-full flex items-center justify-between text-[11px] font-normal group/btn"
                    >
                      <span>View Project</span>
                      <FaArrowRight className="text-[9px] opacity-60 group-hover/btn:translate-x-1 group-hover/btn:opacity-100 transition-all duration-200" />
                    </Button>
                    
                    {/* GitHub Icon - Appears on Hover Only */}
                    {project.caseStudy.links.github && (
                      <a
                        href={project.caseStudy.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3 p-1.5 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-zinc-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                      >
                        <FaGithub className="text-xs" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {selectedProject && (
        <CaseStudyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          caseStudy={selectedProject.caseStudy}
          title={selectedProject.title}
          impact={selectedProject.impact}
        />
      )}
    </section>
  );
}
