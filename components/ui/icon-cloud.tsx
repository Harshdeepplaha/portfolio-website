"use client";

import { useEffect, useRef, useState } from "react";

interface IconCloudProps {
  images?: string[];
  icons?: React.ReactNode[];
}

// Generate 3D spherical positions for icons using Fibonacci sphere algorithm
function generateSpherePositions(count: number, radius: number = 150) {
  const positions: Array<{ x: number; y: number; z: number; scale: number }> = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
  
  for (let i = 0; i < count; i++) {
    const theta = goldenAngle * i; // Azimuthal angle
    const y = 1 - (2 * i) / (count - 1); // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // Radius at y
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    // Scale based on distance from center for depth effect
    const distance = Math.sqrt(x * x + y * y + z * z);
    const scale = 0.6 + (1 - distance) * 0.4; // Scale from 0.6 to 1.0
    
    positions.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
      scale: Math.max(0.5, scale),
    });
  }
  
  return positions;
}

export function IconCloud({ images = [], icons = [] }: IconCloudProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  const items = images.length > 0 ? images : icons;
  // Larger radius for more prominent cloud
  const positions = generateSpherePositions(items.length, 140);

  // Calculate current rotation values for counter-rotation
  const currentRotateY = isHovered ? mousePosition.x * 15 : rotation;
  const currentRotateX = isHovered ? -mousePosition.y * 15 : 10;

  // Auto-rotation when not hovered
  useEffect(() => {
    if (isHovered) return;
    
    const intervalId = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(intervalId);
  }, [isHovered]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        No icons to display
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full pointer-events-none"
        style={{
          transform: isHovered
            ? `rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg)`
            : `rotateY(${rotation}deg) rotateX(10deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered ? "transform 0.2s ease-out" : "none",
        }}
      >
        {items.map((item, index) => {
          const pos = positions[index];
          const isImage = typeof item === "string";
          
          return (
            <div
              key={index}
              className="absolute hover:scale-125 hover:z-20 pointer-events-auto cursor-pointer"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate3d(-50%, -50%, 0) translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${pos.scale}) rotateY(${-currentRotateY}deg) rotateX(${-currentRotateX}deg)`,
                transformStyle: "preserve-3d",
                transition: isHovered ? "transform 0.2s ease-out" : "none",
              }}
              title={`Tech icon ${index + 1}`}
            >
              {isImage ? (
                <img
                  src={item as string}
                  alt="tech icon"
                  className="w-12 h-12 md:w-14 md:h-14 opacity-80 hover:opacity-100 transition-all duration-300 object-contain"
                  style={{
                    filter: "invert(0.7)",
                  }}
                  loading="eager"
                  onLoad={(e) => {
                    console.log('Icon loaded:', item);
                    const target = e.target as HTMLImageElement;
                    target.style.visibility = 'visible';
                  }}
                  onError={(e) => {
                    console.error('Failed to load icon:', item);
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-14 h-14 md:w-16 md:h-16 text-4xl md:text-5xl opacity-90 hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  {item}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
