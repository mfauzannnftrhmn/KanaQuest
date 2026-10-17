"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speakKana } from "@/data/kanaData";

interface AudioButtonProps {
  text: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "ghost" | "solid" | "subtle";
}

export default function AudioButton({
  text,
  size = "md",
  className = "",
  variant = "ghost",
}: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
    speakKana(text);
    setTimeout(() => {
      setIsPlaying(false);
    }, 700);
  };

  const sizeClasses = {
    sm: "w-7 h-7 p-1 text-xs",
    md: "w-9 h-9 p-2 text-sm",
    lg: "w-11 h-11 p-2.5 text-base",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  const variantClasses = {
    ghost: "text-[#55A9A0] hover:bg-[#D9EFEC]/60 hover:text-[#377770]",
    solid: "bg-[#55A9A0] text-white hover:bg-[#47928a] shadow-xs",
    subtle: "bg-[#FFF0EF] text-[#293C3A] hover:bg-[#FFDDDD]",
  };

  return (
    <button
      type="button"
      onClick={handlePlay}
      aria-label={`Dengarkan pengucapan ${text}`}
      title={`Dengarkan pengucapan "${text}"`}
      className={`rounded-full flex items-center justify-center transition-all active:scale-90 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${
        isPlaying ? "scale-110 ring-2 ring-[#55A9A0]/50" : ""
      } ${className}`}
    >
      <Volume2 className={`${iconSizes[size]} ${isPlaying ? "animate-bounce" : ""}`} />
    </button>
  );
}
