"use client";

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Undo, Trash2, Grid } from "lucide-react";

export interface DrawingCanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
  clear: () => void;
  hasDrawn: () => boolean;
}

interface DrawingCanvasProps {
  width?: number;
  height?: number;
  lineColor?: string;
  initialLineWidth?: number;
  className?: string;
  showGridDefault?: boolean;
  onStrokeEnd?: () => void;
}

const DrawingCanvas = forwardRef<DrawingCanvasHandle, DrawingCanvasProps>(
  (
    {
      width = 320,
      height = 320,
      lineColor = "#293C3A",
      initialLineWidth = 10,
      className = "",
      showGridDefault = true,
      onStrokeEnd,
    },
    ref
  ) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [lineWidth, setLineWidth] = useState(initialLineWidth);
    const [showGrid, setShowGrid] = useState(showGridDefault);
    const [strokeCount, setStrokeCount] = useState(0);

    // Expose methods to parent
    useImperativeHandle(ref, () => ({
      getCanvas: () => canvasRef.current,
      clear: () => clearCanvas(true),
      hasDrawn: () => strokeCount > 0,
    }));

    // Setup Canvas on mount
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Handle retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      clearCanvas(false);
    }, [width, height]);

    const drawGridLines = (ctx: CanvasRenderingContext2D) => {
      if (!showGrid) return;
      ctx.save();
      ctx.strokeStyle = "rgba(85, 169, 160, 0.25)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 6]);

      // Vertical center line
      ctx.beginPath();
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width / 2, height);
      ctx.stroke();

      // Horizontal center line
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Outer border
      ctx.strokeStyle = "rgba(85, 169, 160, 0.15)";
      ctx.setLineDash([]);
      ctx.strokeRect(1, 1, width - 2, height - 2);

      ctx.restore();
    };

    const clearCanvas = (resetHistory = true) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // Guide grid
      drawGridLines(ctx);

      if (resetHistory) {
        setHistory([]);
        setStrokeCount(0);
      }
    };

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

      const scaleX = width / (rect.width || width);
      const scaleY = height / (rect.height || height);

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

      const dpr = window.devicePixelRatio || 1;
      const snapshot = ctx.getImageData(0, 0, width * dpr, height * dpr);
      setHistory((prev) => [...prev.slice(-10), snapshot]);
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      e.preventDefault();
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
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = lineWidth;

      setIsDrawing(true);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();

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

    const toggleGrid = () => {
      setShowGrid((prev) => !prev);
      // Re-render
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Redraw grid lines
      drawGridLines(ctx);
    };

    return (
      <div className={`flex flex-col items-center select-none w-full ${className}`}>
        {/* Canvas area */}
        <div 
          className="relative rounded-2xl overflow-hidden border-2 border-[#55A9A0]/40 shadow-sm bg-white touch-none max-w-full flex items-center justify-center"
          style={{ width: "100%", maxWidth: width, height: "auto", aspectRatio: `${width}/${height}` }}
        >
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", maxWidth: width, maxHeight: height }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="cursor-crosshair block touch-none"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 w-full max-w-xs px-1">
          {/* Brush thickness */}
          <div className="flex items-center gap-1 bg-[#FFF0EF] p-1 rounded-xl border border-[#FFDDDD]">
            {[
              { label: "Tipis", size: 6 },
              { label: "Sedang", size: 10 },
              { label: "Tebal", size: 16 },
            ].map((b) => (
              <button
                key={b.size}
                type="button"
                onClick={() => setLineWidth(b.size)}
                className={`px-2 sm:px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer active:scale-95 ${
                  lineWidth === b.size
                    ? "bg-[#55A9A0] text-white shadow-2xs"
                    : "text-[#293C3A] hover:bg-[#FFDDDD]"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Action buttons: Grid, Undo, Clear */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleGrid}
              title={showGrid ? "Sembunyikan Garis Bantu" : "Tampilkan Garis Bantu"}
              className={`p-2 rounded-xl border transition-colors cursor-pointer active:scale-95 ${
                showGrid
                  ? "bg-[#D9EFEC] border-[#55A9A0] text-[#377770]"
                  : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              title="Batalkan goresan (Undo)"
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer active:scale-95"
            >
              <Undo className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => clearCanvas(true)}
              title="Hapus Kanvas (Clear)"
              className="p-2 rounded-xl bg-[#FFF0EF] border border-[#FFDDDD] text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }
);

DrawingCanvas.displayName = "DrawingCanvas";

export default DrawingCanvas;
