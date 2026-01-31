"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaCode, FaBrain, FaDatabase, FaCloud, FaMobile, FaDesktop } from "react-icons/fa";
import { GiArtificialIntelligence, GiGearHammer } from "react-icons/gi";

type TechNode = {
  id: string;
  name: string;
  category: string;
  projects: string[];
  icon: any;
  color: string;
};

type TechLink = {
  source: string;
  target: string;
  projects: string[];
};

type TechGraphProps = {
  projects: any[];
  onTechHover?: (tech: string) => void;
  onTechClick?: (tech: string) => void;
};

export default function TechGraph({ projects, onTechHover, onTechClick }: TechGraphProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Extract unique technologies from projects
  const techMap = new Map<string, { projects: string[]; category: string }>();
  
  projects.forEach(project => {
    project.tags.forEach((tag: string) => {
      if (!techMap.has(tag)) {
        techMap.set(tag, { projects: [], category: 'general' });
      }
      techMap.get(tag)!.projects.push(project.title);
    });
  });

  // Categorize technologies
  const categorizeTech = (tech: string): string => {
    const frontend = ['React', 'React Native', 'Angular', 'Vue', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];
    const backend = ['Node.js', 'Python', 'FastAPI', 'Flask', 'Java', 'C#', 'Go'];
    const ml = ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Hugging Face', 'NLP'];
    const infra = ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Firebase', 'MongoDB', 'PostgreSQL'];
    const tools = ['Git', 'GitHub', 'Jenkins', 'Terraform', 'Unity'];

    if (frontend.includes(tech)) return 'frontend';
    if (backend.includes(tech)) return 'backend';
    if (ml.includes(tech)) return 'ml';
    if (infra.includes(tech)) return 'infra';
    if (tools.includes(tech)) return 'tools';
    return 'general';
  };

  const techNodes: TechNode[] = Array.from(techMap.entries()).map(([tech, data]) => ({
    id: tech,
    name: tech,
    category: categorizeTech(tech),
    projects: data.projects,
    icon: getTechIcon(tech),
    color: getTechColor(categorizeTech(tech)),
  }));

  const techLinks: TechLink[] = [];
  
  // Create links between technologies used in the same projects
  projects.forEach(project => {
    const projectTechs = project.tags;
    for (let i = 0; i < projectTechs.length; i++) {
      for (let j = i + 1; j < projectTechs.length; j++) {
        const existingLink = techLinks.find(
          link => 
            (link.source === projectTechs[i] && link.target === projectTechs[j]) ||
            (link.source === projectTechs[j] && link.target === projectTechs[i])
        );
        
        if (existingLink) {
          if (!existingLink.projects.includes(project.title)) {
            existingLink.projects.push(project.title);
          }
        } else {
          techLinks.push({
            source: projectTechs[i],
            target: projectTechs[j],
            projects: [project.title],
          });
        }
      }
    }
  });

  const handleTechHover = (tech: string) => {
    setHoveredTech(tech);
    onTechHover?.(tech);
  };

  const handleTechClick = (tech: string) => {
    setSelectedTech(selectedTech === tech ? null : tech);
    onTechClick?.(tech);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Tech Graph
      </h3>
      
      <div className="relative min-h-[400px]">
        {/* Legend */}
        <div className="absolute top-0 right-0 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Frontend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Backend</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">ML/AI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-600 dark:text-gray-400">Tools</span>
            </div>
          </div>
        </div>

        {/* Tech Nodes */}
        <div className="relative">
          {techNodes.map((node, index) => (
            <motion.div
              key={node.id}
              className={`absolute cursor-pointer transition-all duration-300 ${
                hoveredTech && hoveredTech !== node.id ? 'opacity-30' : 'opacity-100'
              } ${
                selectedTech === node.id ? 'scale-110 z-20' : 'z-10'
              }`}
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${20 + Math.floor(index / 5) * 15}%`,
              }}
              onMouseEnter={() => handleTechHover(node.id)}
              onMouseLeave={() => handleTechHover('')}
              onClick={() => handleTechClick(node.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`p-3 rounded-full shadow-lg border-2 transition-all duration-300 ${
                  hoveredTech === node.id ? 'border-white shadow-xl' : 'border-transparent'
                }`}
                style={{ backgroundColor: node.color }}
              >
                <node.icon className="text-white text-xl" />
              </div>
              
              {/* Tooltip */}
              {hoveredTech === node.id && (
                <motion.div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-30"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="font-medium mb-1">{node.name}</div>
                  <div className="text-gray-300">
                    Used in {node.projects.length} project{node.projects.length !== 1 ? 's' : ''}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {techLinks.map((link, index) => {
            const sourceNode = techNodes.find(n => n.id === link.source);
            const targetNode = techNodes.find(n => n.id === link.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const sourceIndex = techNodes.indexOf(sourceNode);
            const targetIndex = techNodes.indexOf(targetNode);
            
            const sourceX = 20 + (sourceIndex % 5) * 15 + 7.5;
            const sourceY = 20 + Math.floor(sourceIndex / 5) * 15 + 7.5;
            const targetX = 20 + (targetIndex % 5) * 15 + 7.5;
            const targetY = 20 + Math.floor(targetIndex / 5) * 15 + 7.5;
            
            const isHighlighted = hoveredTech === link.source || hoveredTech === link.target;
            
            return (
              <line
                key={index}
                x1={`${sourceX}%`}
                y1={`${sourceY}%`}
                x2={`${targetX}%`}
                y2={`${targetY}%`}
                stroke={isHighlighted ? '#3b82f6' : '#e5e7eb'}
                strokeWidth={isHighlighted ? 3 : 1}
                opacity={isHighlighted ? 1 : 0.3}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>
      </div>

      {/* Selected Tech Details */}
      {selectedTech && (
        <motion.div
          className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            {selectedTech}
          </h4>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <div className="mb-2">
              <span className="font-medium">Projects:</span> {techMap.get(selectedTech)?.projects.join(', ')}
            </div>
            <div>
              <span className="font-medium">Category:</span> {categorizeTech(selectedTech)}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function getTechIcon(tech: string) {
  const iconMap: { [key: string]: any } = {
    React: FaCode,
    'React Native': FaMobile,
    Python: FaCode,
    'TensorFlow': GiArtificialIntelligence,
    'Machine Learning': GiArtificialIntelligence,
    Docker: FaCloud,
    Kubernetes: FaCloud,
    AWS: FaCloud,
    Firebase: FaDatabase,
    MongoDB: FaDatabase,
    PostgreSQL: FaDatabase,
    Unity: FaDesktop,
    'C#': FaCode,
    'Node.js': FaCode,
    'TypeScript': FaCode,
    'JavaScript': FaCode,
  };
  
  return iconMap[tech] || FaCode;
}

function getTechColor(category: string): string {
  const colorMap: { [key: string]: string } = {
    frontend: '#3b82f6', // blue
    backend: '#10b981', // green
    ml: '#8b5cf6', // purple
    infra: '#f59e0b', // orange
    tools: '#6b7280', // gray
    general: '#6b7280', // gray
  };
  
  return colorMap[category] || '#6b7280';
}


