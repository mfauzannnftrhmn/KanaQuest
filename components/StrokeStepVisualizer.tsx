"use client";

import React from "react";
import { StrokeStep } from "@/data/writingGuideData";

interface StrokeStepVisualizerProps {
  character: string;
  step: StrokeStep;
  currentStepIndex: number;
  totalSteps: number;
  isActive?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function StrokeStepVisualizer({
  character,
  step,
  currentStepIndex,
  totalSteps,
  isActive = false,
  size = "md",
  className = "",
}: StrokeStepVisualizerProps) {
  // Dimension classes
  const sizeClasses = {
    sm: "w-11 h-11 text-xl",
    md: "w-14 h-14 sm:w-16 sm:h-16 text-2xl sm:text-3xl",
    lg: "w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl",
  }[size];

  // Unique marker id to avoid SVG conflicts
  const reactId = React.useId().replace(/:/g, "_");
  const markerId = `arrow-${character}-${step.stepNumber}-${reactId}`;

  // Calculate arrow end point slightly pulled back so marker head fits inside
  const dx = step.endPoint.x - step.startPoint.x;
  const dy = step.endPoint.y - step.startPoint.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Normalize and scale arrow vector
  const arrowEndX = dist > 0 ? step.startPoint.x + (dx / dist) * Math.min(dist, 28) : step.endPoint.x;
  const arrowEndY = dist > 0 ? step.startPoint.y + (dy / dist) * Math.min(dist, 28) : step.endPoint.y;

  return (
    <div
      className={`relative ${sizeClasses} rounded-xl bg-white border border-[#FFDDDD] flex items-center justify-center shrink-0 shadow-xs select-none overflow-hidden ${
        isActive ? "ring-2 ring-rose-500 border-rose-300" : ""
      } ${className}`}
    >
      {/* Genkōyōshi 4-quadrant dashed crosshair grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-teal-200/80" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-teal-200/80" />
      </div>

      {/* 1. BAYANG-BAYANG DASAR: Faint gray ghost shadow of the whole character */}
      <span className="font-japanese font-black text-gray-200/90 dark:text-gray-300 absolute inset-0 flex items-center justify-center leading-none pointer-events-none select-none">
        {character}
      </span>

      {/* 2. SVG DIRECTION ARROW OVERLAY */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 100 100"
      >
        <defs>
          <marker
            id={markerId}
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#f43f5e" />
          </marker>
        </defs>

        {/* Direction arrow line */}
        {dist > 4 && (
          <line
            x1={step.startPoint.x}
            y1={step.startPoint.y}
            x2={arrowEndX}
            y2={arrowEndY}
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd={`url(#${markerId})`}
            className="animate-pulse"
          />
        )}
      </svg>

      {/* 3. RED CIRCLED NUMBER at Stroke Start Point */}
      <div
        className="absolute z-20 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-md border border-white"
        style={{
          left: `${step.startPoint.x}%`,
          top: `${step.startPoint.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        title={`Goresan ke-${step.stepNumber}: mulai di sini`}
      >
        {step.stepNumber}
      </div>

      {/* Active step pulse border */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl border-2 border-rose-500 pointer-events-none animate-pulse" />
      )}
    </div>
  );
}
