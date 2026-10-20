"use client";

import { useEffect, useState, useMemo } from "react";

interface Petal {
  id: number;
  left: number; // percentage 0 - 100
  size: number; // px 14 - 24
  duration: number; // seconds 9 - 18
  delay: number; // seconds 0 - 12
  xEnd: number; // drift px -60 to 100
  rotation: number; // degrees 180 to 720
  opacity: number; // 0.6 - 0.95
}

export default function SakuraBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate deterministic petals array once
  const petals: Petal[] = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: Math.round(((i * 6.25 + 3) % 96) + (i % 3) * 1.5),
      size: 14 + (i % 5) * 2.2,
      duration: 11 + (i % 7) * 1.5,
      delay: (i * 0.85) % 10,
      xEnd: ((i % 4) - 1.5) * 45,
      rotation: 260 + (i % 6) * 90,
      opacity: 0.55 + (i % 4) * 0.1,
    }));
  }, []);

  if (!isClient) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
          {petals.map((petal) => (
            <div
              key={petal.id}
              className="absolute animate-sakura"
              style={
                {
                  left: `${petal.left}%`,
                  top: "-30px",
                  opacity: petal.opacity,
                  "--sakura-duration": `${petal.duration}s`,
                  "--sakura-delay": `${petal.delay}s`,
                  "--sakura-x-start": "0px",
                  "--sakura-x-end": `${petal.xEnd}px`,
                  "--sakura-rotation": `${petal.rotation}deg`,
                } as React.CSSProperties
              }
            >
              {/* Sakura Petal Curved SVG Shape */}
              <svg
                width={petal.size}
                height={petal.size * 1.25}
                viewBox="0 0 30 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-xs"
              >
                <path
                  d="M15 2C18 7 28 12 28 22C28 30 22 36 15 36C8 36 2 30 2 22C2 12 12 7 15 2Z"
                  fill="url(#sakuraGrad)"
                />
                <path
                  d="M15 5C17 10 24 14 24 22C24 27 20 31 15 31C10 31 6 27 6 22C6 14 13 10 15 5Z"
                  fill="#FFF0F3"
                  opacity="0.4"
                />
                <defs>
                  <linearGradient
                    id="sakuraGrad"
                    x1="15"
                    y1="2"
                    x2="15"
                    y2="36"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FFA6B9" />
                    <stop offset="0.6" stopColor="#FFC2D1" />
                    <stop offset="1" stopColor="#FFE5EC" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ))}

          {/* Faint Traditional Japanese Watermarks at Screen Margins */}
          <div className="absolute top-24 left-4 font-japanese text-7xl font-black text-rose-900/[0.015] pointer-events-none select-none hidden lg:block animate-gentle-float">
            桜
          </div>
          <div className="absolute top-1/2 right-4 font-japanese text-8xl font-black text-teal-900/[0.018] pointer-events-none select-none hidden lg:block animate-gentle-float" style={{ animationDelay: "2s" }}>
            和
          </div>
        </div>
  );
}
