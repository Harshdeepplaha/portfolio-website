"use client";

import React from "react";
import SectionHeading from "./section-heading";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";

export default function Experience() {
  const { ref } = useSectionInView("Experience");
  const { theme } = useTheme();

  return (
    <section id="experience" ref={ref} className="scroll-mt-28 mb-28 sm:mb-40">
      <SectionHeading>My experience</SectionHeading>
      <VerticalTimeline lineColor={theme === "light" ? "#e5e7eb" : "rgba(255, 255, 255, 0.1)"}>
        {experiencesData.map((item, index) => (
          <React.Fragment key={index}>
            <VerticalTimelineElement
              contentStyle={{
                background:
                  theme === "light" 
                    ? "#ffffff" 
                    : "rgba(255, 255, 255, 0.05)",
                boxShadow: theme === "light" 
                  ? "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                  : "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)",
                border: theme === "light" 
                  ? "1px solid rgba(229, 231, 235, 1)" 
                  : "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "left",
                padding: "2rem 2.5rem",
                borderRadius: "16px",
              }}
              contentArrowStyle={{
                borderRight:
                  theme === "light"
                    ? "0.4rem solid rgba(229, 231, 235, 1)"
                    : "0.4rem solid rgba(255, 255, 255, 0.1)",
              }}
              date={item.date}
              dateClassName={`text-sm font-medium ${
                theme === "light" 
                  ? "text-gray-500" 
                  : "text-gray-400"
              }`}
              icon={item.icon}
              iconStyle={{
                background:
                  theme === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(24, 24, 27, 0.95)",
                color: theme === "light" ? "#000000" : "white",
                fontSize: "1.5rem",
                boxShadow: theme === "light" 
                  ? "0 4px 12px rgba(0, 0, 0, 0.25)" 
                  : "0 4px 12px rgba(0, 0, 0, 0.3)",
                border: theme === "light"
                  ? "3px solid rgba(255, 255, 255, 0.9)"
                  : "3px solid rgba(24, 24, 27, 0.95)",
              }}
            >
              <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-1">
                {item.title}
              </h3>
              <p className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-4">
                {item.location}
              </p>
              <ul className="space-y-2.5">
                {Array.isArray(item.description) 
                  ? item.description.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${
                          theme === "light" 
                            ? "bg-gray-400" 
                            : "bg-gray-500"
                        }`} />
                        <span className={`text-sm leading-relaxed ${
                          theme === "light" 
                            ? "text-gray-700" 
                            : "text-gray-300"
                        }`}>
                          {point}
                        </span>
                      </li>
                    ))
                  : <li className="flex items-start gap-3">
                      <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${
                        theme === "light" 
                          ? "bg-gray-400" 
                          : "bg-gray-500"
                      }`} />
                      <span className={`text-sm leading-relaxed ${
                        theme === "light" 
                          ? "text-gray-700" 
                          : "text-gray-300"
                      }`}>
                        {item.description}
                      </span>
                    </li>
                }
              </ul>
            </VerticalTimelineElement>
          </React.Fragment>
        ))}
      </VerticalTimeline>
    </section>
  );
}
