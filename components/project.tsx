"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { FaPlay, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type ProjectProps = {
  title: string;
  impact: string;
  description: string;
  tags: string[];
  impactTags: string[];
  imageUrl: any;
  demoVideo?: string;
  caseStudy: {
    problem: string;
    approach: string;
    result: string;
    role: string;
    stack: string[];
    learnings: string[];
    links: {
      demo?: string;
      github?: string;
      live?: string;
      research?: string;
      paper?: string;
    };
  };
  onOpenCaseStudy: () => void;
};

export default function Project({
  title,
  impact,
  description,
  tags,
  impactTags,
  imageUrl,
  demoVideo,
  caseStudy,
  onOpenCaseStudy,
}: ProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);
  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenCaseStudy}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Light glare effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl pointer-events-none"
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: "100%" }}
          transition={{ duration: 0.6 }}
        />
      )}

      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
            {impact}
          </p>
        </div>

        {/* Demo Video or Image */}
        <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-video">
          {demoVideo && !isVideoPlaying ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
              <motion.button
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoPlaying(true);
                }}
              >
                <FaPlay className="text-white text-2xl" />
              </motion.button>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Impact Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {impactTags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Tech Stack Icons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full"
            >
              {tag}
            </span>
          ))}
          {tags.length > 4 && (
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full">
              +{tags.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onOpenCaseStudy();
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Case Study
            </Button>
          </motion.div>
          
          {caseStudy.links.github && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="secondary"
                size="icon"
              >
                <a
                  href={caseStudy.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub className="text-lg" />
                </a>
              </Button>
            </motion.div>
          )}
          
          {caseStudy.links.demo && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                variant="secondary"
                size="icon"
              >
                <a
                  href={caseStudy.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaPlay className="text-lg" />
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
