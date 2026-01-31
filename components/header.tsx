"use client";

import React from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import Link from "next/link";
import clsx from "clsx";
import { useActiveSectionContext } from "@/context/active-section-context";
import { Dock, DockIcon } from "@/components/ui/dock";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Home, User, FolderKanban, Code, Briefcase, Mail } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const iconMap = {
  Home: Home,
  About: User,
  Projects: FolderKanban,
  Skills: Code,
  Experience: Briefcase,
  Contact: Mail,
};

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="z-[999] relative">
      <motion.div
        className="fixed bottom-6 left-1/2 -translate-x-1/2"
        initial={{ y: 100, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
      >
        <TooltipProvider>
          <Dock
            direction="middle"
            className="bg-white/90 dark:bg-zinc-900/95 border border-gray-200 dark:border-zinc-800 shadow-lg backdrop-blur-md"
          >
            {links.map((link) => {
              const Icon = iconMap[link.name as keyof typeof iconMap];
              const isActive = activeSection === link.name;
              
              return (
                <DockIcon key={link.hash} className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.hash}
                        onClick={() => {
                          setActiveSection(link.name);
                          setTimeOfLastClick(Date.now());
                        }}
                        className={clsx(
                          "flex h-full w-full items-center justify-center rounded-full transition-colors",
                          {
                            "bg-gray-200 dark:bg-zinc-800": isActive,
                          }
                        )}
                      >
                        <Icon
                          className={clsx(
                            "h-5 w-5 transition-colors",
                            {
                              "text-gray-950 dark:text-gray-200": isActive,
                              "text-gray-600 dark:text-gray-400": !isActive,
                            }
                          )}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-none"
                    >
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </DockIcon>
              );
            })}
            <DockIcon className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex h-full w-full items-center justify-center rounded-full">
                    <AnimatedThemeToggler />
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-none"
                >
                  <p>Toggle Theme</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          </Dock>
        </TooltipProvider>
      </motion.div>
    </header>
  );
}






