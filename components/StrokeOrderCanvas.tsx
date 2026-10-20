"use client";

import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import { Undo, Trash2, Eye, EyeOff, Grid, ListOrdered } from "lucide-react";
import { StrokeStep } from "@/data/writingGuideData";

export interface StrokeOrderCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
  clear: () => void;
  hasDrawn: () => boolean;
}

interface StrokeOrderCanvasProps {
  referenceCharacter: string;
  steps?: StrokeStep[];
  width?: number;
  height?: number;
  initialLineWidth?: number;
  onStrokeEnd?: () => void;
  className?: string;
}

const INK_COLORS = [
  { id: "sumi", name: "Sumi Hitam", value: "#293C3A" },
  { id: "shu", name: "Merah Shodo", value: "#E11D48" },
  { id: "indigo", name: "Biru Indigo", value: "#1D4ED8" },
  { id: "teal", name: "Toska Kana", value: "#55A9A0" },
];

const BRUSH_SIZES = [
  { label: "Pensil", size: 6 },
  { label: "Spidol", size: 10 },
  { label: "Kuas", size: 16 },
];

const StrokeOrderCanvas = forwardRef<StrokeOrderCanvasHandle, StrokeOrderCanvasProps>(
  (
    {
      referenceCharacter,
      steps = [],
      width = 340,
      height = 340,
      initialLineWidth = 10,
      onStrokeEnd,
      className = "",
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [strokeWidth, setStrokeWidth] = useState(initialLineWidth);
    const [inkColor, setInkColor] = useState(INK_COLORS[0].value);
    const [showGhost, setShowGhost] = useState(true);
    const [showGrid, setShowGrid] = useState(true);
    const [showStepNumbers, setShowStepNumbers] = useState(true);
    const [strokeCount, setStrokeCount] = useState(0);

    // High internal resolution coordinates
    const RESOLUTION = 320;

    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
      clear: () => clearCanvas(true),
      hasDrawn: () => strokeCount > 0,
    }));

    const drawGridLines = useCallback((ctx: CanvasRenderingContext2D) => {
      if (!showGrid) return;
      ctx.save();

      // Outer border
      ctx.strokeStyle = "rgba(85, 169, 160, 0.28)";
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, RESOLUTION - 4, RESOLUTION - 4);

      // Genkoyoushi crosshair
      ctx.strokeStyle = "rgba(85, 169, 160, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);

      // Vertical center
      ctx.beginPath();
      ctx.moveTo(RESOLUTION / 2, 0);
      ctx.lineTo(RESOLUTION / 2, RESOLUTION);
      ctx.stroke();

      // Horizontal center
      ctx.beginPath();
      ctx.moveTo(0, RESOLUTION / 2);
      ctx.lineTo(RESOLUTION, RESOLUTION / 2);
      ctx.stroke();

      // Diagonal subtle quadrant guides
      ctx.strokeStyle = "rgba(85, 169, 160, 0.14)";
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(RESOLUTION, RESOLUTION);
      ctx.moveTo(RESOLUTION, 0);
      ctx.lineTo(0, RESOLUTION);
      ctx.stroke();

      ctx.restore();
    }, [showGrid]);

    const drawGhostCharacterAndSteps = useCallback((ctx: CanvasRenderingContext2D) => {
      if (!showGhost || !referenceCharacter) return;
      ctx.save();

      // 1. Draw clear ghost shadow (bayang-bayang)
      ctx.font = `bold ${Math.round(RESOLUTION * 0.65)}px "Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif`;
      ctx.fillStyle = "rgba(85, 169, 160, 0.22)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(referenceCharacter, RESOLUTION / 2, RESOLUTION / 2 + 8);

      // 2. Draw circled stroke start points & direction hints directly on canvas
      if (showStepNumbers && steps.length > 0) {
        steps.forEach((step) => {
          const px = (step.startPoint.x / 100) * RESOLUTION;
          const py = (step.startPoint.y / 100) * RESOLUTION;
          const endPx = (step.endPoint.x / 100) * RESOLUTION;
          const endPy = (step.endPoint.y / 100) * RESOLUTION;

          // Draw small arrow trajectory
          const dx = endPx - px;
          const dy = endPy - py;
          const len = Math.sqrt(dx * dx + dy * dy);
          if (len > 10) {
            const arrowLen = Math.min(len * 0.5, 26);
            const ax = px + (dx / len) * arrowLen;
            const ay = py + (dy / len) * arrowLen;

            ctx.save();
            ctx.strokeStyle = "rgba(244, 63, 94, 0.55)";
            ctx.lineWidth = 2.5;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(ax, ay);
            ctx.stroke();
            ctx.restore();
          }

          // Circled dot badge
          ctx.beginPath();
          ctx.arc(px, py, 9, 0, Math.PI * 2);
          ctx.fillStyle = "#F43F5E";
          ctx.fill();
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Step number text
          ctx.fillStyle = "#FFFFFF";
          ctx.font = "bold 10px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(step.stepNumber.toString(), px, py + 0.5);
        });
      }

      ctx.restore();
    }, [showGhost, referenceCharacter, showStepNumbers, steps]);

    const clearCanvas = useCallback((resetHistory = true) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, RESOLUTION, RESOLUTION);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, RESOLUTION, RESOLUTION);

      drawGridLines(ctx);
      drawGhostCharacterAndSteps(ctx);

      if (resetHistory) {
        setHistory([]);
        setStrokeCount(0);
      }
    }, [drawGhostCharacterAndSteps, drawGridLines]);

    const redrawCanvasBase = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // If user has history, redraw last user state
      if (history.length > 0) {
        const lastSnapshot = history[history.length - 1];
        ctx.putImageData(lastSnapshot, 0, 0);
        return;
      }

      // Blank canvas
      ctx.clearRect(0, 0, RESOLUTION, RESOLUTION);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, RESOLUTION, RESOLUTION);

      drawGridLines(ctx);
      drawGhostCharacterAndSteps(ctx);
    }, [drawGhostCharacterAndSteps, drawGridLines, history]);

    // Setup Canvas on Mount
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      canvas.width = RESOLUTION * dpr;
      canvas.height = RESOLUTION * dpr;
      ctx.scale(dpr, dpr);

      clearCanvas(false);
    }, [clearCanvas]);

    // Redraw whenever grid, ghost, step numbers, or character changes
    useEffect(() => {
      redrawCanvasBase();
    }, [showGrid, showGhost, showStepNumbers, referenceCharacter, steps, redrawCanvasBase]);

    const getCoordinates = (
      e: React.MouseEvent | React.TouchEvent
    ): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();

      let clientX = 0;
      let clientY = 0;

      if ("touches" in e) {
        if (e.touches.length === 0) return null;
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const scaleX = RESOLUTION / (rect.width || RESOLUTION);
      const scaleY = RESOLUTION / (rect.height || RESOLUTION);

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY,
      };
    };

    const saveCurrentState = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const snapshot = ctx.getImageData(0, 0, RESOLUTION * dpr, RESOLUTION * dpr);
      setHistory((prev) => [...prev.slice(-15), snapshot]);
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      if (e.cancelable) e.preventDefault();
      const coords = getCoordinates(e);
      if (!coords) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      saveCurrentState();

      ctx.beginPath();
      ctx.moveTo(coords.x, coords.y);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = strokeWidth;

      setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      if (e.cancelable) e.preventDefault();

      const coords = getCoordinates(e);
      if (!coords) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.lineTo(coords.x, coords.y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      if (!isDrawing) return;
      setIsDrawing(false);
      setStrokeCount((prev) => prev + 1);
      if (onStrokeEnd) {
        onStrokeEnd();
      }
    };

    const handleUndo = () => {
      if (history.length === 0) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const newHistory = [...history];
      const prevState = newHistory.pop();
      if (prevState) {
        ctx.putImageData(prevState, 0, 0);
        setHistory(newHistory);
        setStrokeCount((prev) => Math.max(0, prev - 1));
      }
    };

    return (
      <div ref={containerRef} className={`w-full flex flex-col items-center ${className}`}>
        {/* Canvas Frame with Responsive Sizing */}
        <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-[#FFF0EF] to-[#FFDDDD]/50 border-2 border-[#FFDDDD] shadow-lg w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] aspect-square flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-xl sm:rounded-2xl bg-white cursor-crosshair touch-none shadow-inner border border-teal-100 block"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {/* Stroke count badge */}
          <div className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-white/90 border border-[#55A9A0]/40 text-[10px] sm:text-[11px] font-bold text-[#293C3A] shadow-xs backdrop-blur-xs pointer-events-none select-none">
            Goresan: <span className="text-[#55A9A0]">{strokeCount}</span>
          </div>
        </div>

        {/* Toolbar Controls - Fully Mobile Friendly */}
        <div className="mt-3 sm:mt-4 w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] space-y-2 sm:space-y-3">
          {/* Top row: Ink & Brush */}
          <div className="flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-white border border-[#FFDDDD] shadow-xs">
            {/* Color swatches */}
            <div className="flex items-center gap-1.5">
              {INK_COLORS.map((col) => (
                <button
                  key={col.id}
                  type="button"
                  onClick={() => setInkColor(col.value)}
                  title={col.name}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full transition-transform cursor-pointer shrink-0 ${inkColor === col.value
                      ? "ring-2 ring-offset-2 ring-[#55A9A0] scale-110"
                      : "opacity-75 hover:opacity-100"
                    }`}
                  style={{ backgroundColor: col.value }}
                />
              ))}
            </div>

            {/* Brush sizes */}
            <div className="flex items-center rounded-lg sm:rounded-xl bg-gray-100 p-0.5 border border-gray-200">
              {BRUSH_SIZES.map((b) => (
                <button
                  key={b.size}
                  type="button"
                  onClick={() => setStrokeWidth(b.size)}
                  className={`px-2 py-1 rounded-md sm:rounded-lg text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer ${strokeWidth === b.size
                      ? "bg-white text-[#293C3A] shadow-xs"
                      : "text-gray-500 hover:text-gray-800"
                    }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom row: Toggles (Bayangan, Nomor, Kisi), Undo & Clear */}
          <div className="flex items-center justify-between gap-1 sm:gap-2">
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Ghost Guide Toggle */}
              <button
                type="button"
                onClick={() => setShowGhost(!showGhost)}
                title={showGhost ? "Sembunyikan bayangan huruf" : "Tampilkan bayangan huruf"}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer ${showGhost
                    ? "bg-[#D9EFEC] text-[#377770] border-[#55A9A0]"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
              >
                {showGhost ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>Bayang</span>
              </button>

              {/* Step Numbers Toggle */}
              <button
                type="button"
                onClick={() => setShowStepNumbers(!showStepNumbers)}
                title={showStepNumbers ? "Sembunyikan nomor goresan" : "Tampilkan nomor goresan di kanvas"}
                className={`flex items-center gap-1 px-2 sm:px-2 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer ${showStepNumbers
                    ? "bg-rose-50 text-rose-700 border-rose-300"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">No.</span>
              </button>

              {/* Grid Toggle */}
              <button
                type="button"
                onClick={() => setShowGrid(!showGrid)}
                title="Toggle garis kisi Genkouyoushi"
                className={`p-1.5 rounded-lg sm:rounded-xl border transition-all cursor-pointer ${showGrid
                    ? "bg-[#D9EFEC] text-[#377770] border-[#55A9A0]"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                  }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* Undo */}
              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold bg-white border border-gray-200 text-[#293C3A] hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <Undo className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>

              {/* Clear */}
              <button
                type="button"
                onClick={() => clearCanvas(true)}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 transition-all cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

StrokeOrderCanvas.displayName = "StrokeOrderCanvas";

export default StrokeOrderCanvas;
