"use client";

import React from "react";
import { useSectionInView } from "@/lib/hooks";
import { motion } from "framer-motion";
import { IconCloud } from "./ui/icon-cloud";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiFastapi,
  SiReact,
  SiPytorch,
  SiTensorflow,
  SiKubernetes,
  SiDocker,
  SiPostgresql,
  SiAmazon,
  SiApachekafka,
  SiGit,
  SiMysql,
  SiNeo4J,
  SiHuggingface,
  SiJenkins,
  SiApachespark,
  SiApacheairflow,
  SiGooglecloud,
} from "react-icons/si";
import { FaJava, FaMicrosoft, FaDatabase } from "react-icons/fa";

// Skill groups - comprehensive list from resume
const skillGroups = [
  {
    label: "Languages",
    skills: ["C/C++", "Python", "R", "C#", "Java", "TypeScript", "JavaScript", "SQL", "HTML/CSS", "Shell Scripting", "GQL"],
  },
  {
    label: "Databases",
    skills: ["MySQL", "Qdrant", "Neo4J", "Postgres"],
  },
  {
    label: "Frameworks & Libraries",
    skills: ["NumPy", "Pandas", "TensorFlow", "Keras", "Scikit-learn", "PyTorch", "React.js", "OpenCV", "Node.js", "Hugging Face", "Apache Kafka", "FastAPI", "PySpark", "React Native", "LangChain", "FastMCP"],
  },
  {
    label: "Tools & Infrastructure",
    skills: ["Kubernetes", "Git", "Jenkins", "Docker", "Linux/Unix", "Apache Spark", "REST APIs", "Atlassian", "Teradata", "AWS", "Apache Airflow", "Microsoft Azure", "GCP", "Apache Iceberg", "MLflow", "Kubeflow", "LangSmith"],
  },
];

// Map top skills to React Icons components for icon cloud (selecting most prominent ones)
const skillIcons = [
  <SiPython key="python" className="text-[#3776AB]" />,
  <FaJava key="java" className="text-[#007396]" />,
  <SiTypescript key="typescript" className="text-[#3178C6]" />,
  <SiJavascript key="javascript" className="text-[#F7DF1E]" />,
  <SiNodedotjs key="nodejs" className="text-[#339933]" />,
  <SiFastapi key="fastapi" className="text-[#009688]" />,
  <SiReact key="react" className="text-[#61DAFB]" />,
  <SiPytorch key="pytorch" className="text-[#EE4C2C]" />,
  <SiTensorflow key="tensorflow" className="text-[#FF6F00]" />,
  <SiHuggingface key="huggingface" className="text-[#FFD21E]" />,
  <SiKubernetes key="kubernetes" className="text-[#326CE5]" />,
  <SiDocker key="docker" className="text-[#2496ED]" />,
  <SiPostgresql key="postgresql" className="text-[#4169E1]" />,
  <SiMysql key="mysql" className="text-[#4479A1]" />,
  <SiAmazon key="aws" className="text-[#FF9900]" />,
  <FaMicrosoft key="azure" className="text-[#0078D4]" />,
  <SiGooglecloud key="gcp" className="text-[#4285F4]" />,
  <SiApachekafka key="kafka" className="text-[#231F20] dark:text-white" />,
  <SiApachespark key="spark" className="text-[#E25A1C]" />,
  <SiGit key="git" className="text-[#F05032]" />,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Skills() {
  const { ref } = useSectionInView("Skills");

  return (
    <section
      id="skills"
      ref={ref}
      className="mb-28 max-w-7xl scroll-mt-28 sm:mb-40 mx-auto px-4 lg:px-6"
    >
      <h2 className="text-2xl font-medium mb-10 text-center text-gray-600 dark:text-gray-400">
        Skills
      </h2>

      <div className="mt-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Left Column: Skills Groups - Takes 2/3 of width */}
          <motion.div
            className="w-full lg:col-span-2 flex flex-col items-start justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="w-full space-y-6">
              {skillGroups.map((group) => (
                <div key={group.label} className="space-y-2.5">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2.5 tracking-wide">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-2 justify-start">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-white/5 rounded-md border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/15 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Icon Cloud - Takes 1/3 of width */}
          <motion.div
            className="w-full lg:col-span-1 flex items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          >
            <div className="relative h-[480px] lg:h-[560px] w-full max-w-lg flex items-center justify-center">
              <IconCloud icons={skillIcons} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
