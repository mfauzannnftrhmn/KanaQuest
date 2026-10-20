"use client";

import { useEffect, useState, useMemo } from "react";
import { Flower2, Sparkles } from "lucide-react";

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
  const [isEnabled, setIsEnabled] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const saved = localStorage.getItem("kanaquest_sakura_anim");
      if (saved !== null) {
        setIsEnabled(saved === "true");
      }
    } catch {
      // LocalStorage safe
    }
  }, []);

  const toggleSakura = () => {
    setIsEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("kanaquest_sakura_anim", next.toString());
      } catch {
        // safe
      }
      return next;
    });
  };

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
    <>
      {/* 1. Subtle Floating Sakura Petals in Background */}
      {isEnabled && (
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
      )}

      {/* 2. Floating Quick Controls (Bottom Left) */}
      <div className="fixed bottom-3.5 left-14 sm:bottom-4 sm:left-14 z-40 flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleSakura}
          title={isEnabled ? "Matikan animasi kelopak sakura" : "Nyalakan animasi kelopak sakura"}
          className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-bold shadow-md transition-all cursor-pointer backdrop-blur-md border ${
            isEnabled
              ? "bg-white/90 text-rose-600 border-rose-200 hover:bg-rose-50 hover:scale-105"
              : "bg-white/70 text-gray-400 border-gray-200 hover:text-gray-600 hover:bg-white"
          }`}
        >
          <Flower2
            className={`w-3.5 h-3.5 transition-transform duration-500 ${
              isEnabled ? "text-rose-500 group-hover:rotate-45" : "text-gray-400"
            }`}
          />
          <span className="hidden xs:inline">
            {isEnabled ? "Sakura: Hidup" : "Sakura: Mati"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.dispatchEvent(new CustomEvent("kanaquest:replay-splash"));
            }
          }}
          title="Tampilkan kembali animasi splash screen pembuka"
          className="group flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-bold shadow-md transition-all cursor-pointer backdrop-blur-md border bg-white/90 text-[#377770] border-[#D9EFEC] hover:bg-[#D9EFEC]/40 hover:scale-105 active:scale-95"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#55A9A0] group-hover:rotate-12 transition-transform" />
          <span className="hidden xs:inline">Intro</span>
        </button>
      </div>
    </>
  );
}
