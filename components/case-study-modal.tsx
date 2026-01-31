"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaPlay, FaFileAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type CaseStudyModalProps = {
  isOpen: boolean;
  onClose: () => void;
  caseStudy: {
    problem: string;
    approach: string;
    result: string;
    role: string;
    stack: ReadonlyArray<string> | string[];
    learnings: ReadonlyArray<string> | string[];
    links: {
      demo?: string;
      github?: string;
      live?: string;
      research?: string;
      paper?: string;
    };
  };
  title: string;
  impact: string;
};

export default function CaseStudyModal({
  isOpen,
  onClose,
  caseStudy,
  title,
  impact,
}: CaseStudyModalProps) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h2>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">
                    {impact}
                  </p>
                </div>
                <Button
                  onClick={onClose}
                  variant="ghost"
                  size="icon"
                  className="rounded-lg"
                >
                  <FaTimes className="text-gray-500 dark:text-gray-400 text-xl" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Problem */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Problem
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.problem}
                </p>
              </div>

              {/* Approach */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Approach
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.approach}
                </p>
              </div>

              {/* Result */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  Result
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.result}
                </p>
              </div>

              {/* Your Role */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  Your Role
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {caseStudy.role}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.stack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Learnings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  Key Learnings
                </h3>
                <ul className="space-y-2">
                  {caseStudy.learnings.map((learning, index) => (
                    <li
                      key={index}
                      className="flex items-start text-gray-700 dark:text-gray-300"
                    >
                      <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      <span>{learning}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <span className="w-2 h-2 bg-pink-500 rounded-full mr-3"></span>
                  Links
                </h3>
                <div className="flex flex-wrap gap-3">
                  {caseStudy.links.demo && (
                    <Button
                      asChild
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <a
                        href={caseStudy.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaPlay className="text-sm" />
                        Watch Demo
                      </a>
                    </Button>
                  )}
                  
                  {caseStudy.links.github && (
                    <Button
                      asChild
                      className="bg-gray-800 hover:bg-gray-900 text-white"
                    >
                      <a
                        href={caseStudy.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaGithub className="text-sm" />
                        View Code
                      </a>
                    </Button>
                  )}
                  
                  {caseStudy.links.live && (
                    <Button
                      asChild
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <a
                        href={caseStudy.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaExternalLinkAlt className="text-sm" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  
                  {caseStudy.links.research && (
                    <Button
                      asChild
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <a
                        href={caseStudy.links.research}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaFileAlt className="text-sm" />
                        Research Paper
                      </a>
                    </Button>
                  )}
                  
                  {caseStudy.links.paper && (
                    <Button
                      asChild
                      className="bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      <a
                        href={caseStudy.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FaFileAlt className="text-sm" />
                        Technical Paper
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


