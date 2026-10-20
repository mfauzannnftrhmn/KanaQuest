"use client";

import { useEffect, useState } from "react";
import { Sparkles, Compass } from "lucide-react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [currentKanaIndex, setCurrentKanaIndex] = useState(0);

  const kanaSamples = [
    { kana: "あ", type: "Hiragana", romaji: "a" },
    { kana: "ア", type: "Katakana", romaji: "a" },
    { kana: "道", type: "Kanji Michi", romaji: "Perjalanan" },
    { kana: "和", type: "Kanji Wa", romaji: "Harmoni" },
  ];

  useEffect(() => {
    // Only lock scroll while splash is active
    document.body.style.overflow = "hidden";

    // Cycle kana calligraphy during splash
    const interval = setInterval(() => {
      setCurrentKanaIndex((prev) => (prev + 1) % kanaSamples.length);
    }, 400);

    // Auto dismiss after 2.0s
    const timer = setTimeout(() => {
      handleDismiss();
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleDismiss = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
    }, 550);
  };

  // Replay splash listener
  useEffect(() => {
    const handleReplay = () => {
      setIsFading(false);
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        handleDismiss();
      }, 2000);
    };

    window.addEventListener("kanaquest:replay-splash", handleReplay);
    return () => window.removeEventListener("kanaquest:replay-splash", handleReplay);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="KanaQuest Splash Screen"
      onClick={handleDismiss}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden transition-all duration-600 ease-out ${
        isFading
          ? "opacity-0 scale-105 pointer-events-none filter blur-sm"
          : "opacity-100 scale-100"
      }`}
      style={{
        background: "radial-gradient(circle at 50% 45%, #FFFFFF 0%, #FFF5F4 50%, #F5ECEB 100%)",
      }}
    >
      {/* Traditional Washi Paper Texture Subtle Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#293C3A 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ambient Japanese Lantern Glows */}
      <div className="absolute top-1/4 -left-12 w-80 h-80 rounded-full bg-[#FFDDDD]/60 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-12 w-80 h-80 rounded-full bg-[#D9EFEC]/70 blur-3xl pointer-events-none animate-pulse" />

      {/* Top Traditional Kanji Watermark */}
      <div className="absolute top-8 left-8 sm:top-12 sm:left-12 flex flex-col items-center gap-1 opacity-25 font-japanese text-xs sm:text-sm tracking-widest text-[#293C3A]">
        <span>日</span>
        <span>本</span>
        <span>語</span>
      </div>
      <div className="absolute top-8 right-8 sm:top-12 sm:right-12 flex flex-col items-center gap-1 opacity-25 font-japanese text-xs sm:text-sm tracking-widest text-[#55A9A0]">
        <span>探</span>
        <span>求</span>
        <span>旅</span>
      </div>

      {/* Main Center Crest & Brand Reveal */}
      <div className="relative flex flex-col items-center px-6 max-w-md w-full text-center animate-ink-spread">
        
        {/* Dynamic Enso (円相) Zen Brush Circle + Calligraphy Center */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-6">
          {/* SVG Zen Enso Brush Circle */}
          <svg
            className="absolute inset-0 w-full h-full animate-enso"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#55A9A0"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeDasharray="360 40"
              className="opacity-80"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              stroke="#FFB6B6"
              strokeWidth="2.5"
              strokeDasharray="60 120"
              strokeLinecap="round"
              className="opacity-70 rotate-45 origin-center"
            />
          </svg>

          {/* Central Rotating Kana / Kanji Character */}
          <div className="relative z-10 flex flex-col items-center justify-center transition-all duration-300 transform scale-100">
            <span className="text-5xl sm:text-6xl font-black font-japanese text-[#293C3A] drop-shadow-sm transition-transform duration-300">
              {kanaSamples[currentKanaIndex].kana}
            </span>
            <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#55A9A0] uppercase mt-1">
              {kanaSamples[currentKanaIndex].type}
            </span>
          </div>

          {/* Red Hanko Seal Stamp (印鑑) in bottom-right of Enso */}
          <div className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#E14949] border-2 border-white/90 shadow-md flex items-center justify-center text-white font-japanese font-black text-xs sm:text-sm rotate-6 animate-hanko">
            探求
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="flex flex-col items-center gap-1.5 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-[#377770] text-xs font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#55A9A0] animate-spin" style={{ animationDuration: "6s" }} />
            <span>ようこそ • Selamat Datang</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#293C3A] mt-2">
            Kana<span className="text-[#55A9A0]">Quest</span>
          </h1>

          <p className="font-japanese text-sm sm:text-base font-medium text-[#6F7775] tracking-widest mt-0.5">
            かなクエスト・日本語の旅
          </p>
        </div>

        {/* Minimalist Ink Loading Bar */}
        <div className="w-48 sm:w-56 h-1 bg-[#F0E3E1] rounded-full overflow-hidden mt-5 relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#55A9A0] via-[#65B7AE] to-[#FFB6B6] rounded-full transition-all duration-2000 ease-out"
            style={{
              width: isFading ? "100%" : "88%",
              transitionDuration: "2000ms",
            }}
          />
        </div>

        {/* Touch / Click Hint */}
        <div className="mt-6 flex items-center gap-1.5 text-[11px] font-semibold text-[#8B9694] tracking-wide">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#55A9A0]/70 animate-ping" />
          <span>Sentuh layar untuk membuka langsung</span>
        </div>
      </div>

      {/* Bottom Floating Skip Pill */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        className="absolute bottom-6 sm:bottom-8 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-xs font-semibold text-[#6F7775] hover:text-[#293C3A] border border-[#F0E3E1] shadow-xs backdrop-blur-md transition-all active:scale-95 flex items-center gap-1.5 group cursor-pointer"
        aria-label="Lewati animasi splash"
      >
        <span>Lewati (Skip)</span>
        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
      </button>
    </div>
  );
}
