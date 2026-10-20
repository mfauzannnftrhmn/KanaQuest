"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  PenTool,
  Brush,
  BookOpen,
  Volume2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Award,
  Compass,
  Eye,
  SlidersHorizontal,
  Zap,
  ArrowRight,
  Loader2,
} from "lucide-react";
import {
  WRITING_GUIDE_KANA,
  WRITING_ROW_GROUPS,
  GOLDEN_WRITING_RULES,
  STROKE_TYPES_INFO,
  SIMILAR_CHARACTERS_GUIDE,
  ROMAJI_WRITING_RULES,
  ROMAJI_QUIZ_DATA,
  WritingGuideItem,
  StrokeType
} from "@/data/writingGuideData";
import { speakKana } from "@/data/kanaData";
import StrokeOrderCanvas, { StrokeOrderCanvasHandle } from "./StrokeOrderCanvas";
import { evaluateDrawingSimilarity, SimilarityResult } from "@/lib/canvasSimilarity";
import StrokeStepVisualizer from "./StrokeStepVisualizer";

export default function WritingStudio() {
  const [activeMainTab, setActiveMainTab] = useState<"hiragana" | "katakana" | "rules" | "romaji">("hiragana");
  const [mobileStudioView, setMobileStudioView] = useState<"all" | "canvas" | "steps">("all");
  const [selectedRow, setSelectedRow] = useState<string>("vowel");
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [animatingStep, setAnimatingStep] = useState<number | null>(null);
  const [isPlayingAnimation, setIsPlayingAnimation] = useState<boolean>(false);
  const [similarityScore, setSimilarityScore] = useState<SimilarityResult | null>(null);
  const [autoCheckEnabled, setAutoCheckEnabled] = useState<boolean>(true);
  const [isAutoEvaluating, setIsAutoEvaluating] = useState<boolean>(false);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);

  const canvasRef = useRef<StrokeOrderCanvasHandle | null>(null);
  const autoCheckTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter items by row
  const rowItems = WRITING_GUIDE_KANA.filter((item) => {
    if (selectedRow === "all") return true;
    if (selectedRow === "w") return item.row === "w" || item.row === "n-single";
    return item.row === selectedRow;
  });

  const currentItem = rowItems[selectedIndex] || rowItems[0] || WRITING_GUIDE_KANA[0];
  const kanaData = activeMainTab === "katakana" ? currentItem.katakana : currentItem.hiragana;

  // Handle character switch
  const handleSelectCharacter = (index: number) => {
    if (autoCheckTimerRef.current) clearTimeout(autoCheckTimerRef.current);
    setSelectedIndex(index);
    setSimilarityScore(null);
    setIsPlayingAnimation(false);
    setAnimatingStep(null);
    canvasRef.current?.clear();
  };

  const handlePrevCharacter = () => {
    if (selectedIndex > 0) {
      handleSelectCharacter(selectedIndex - 1);
    } else {
      handleSelectCharacter(rowItems.length - 1);
    }
  };

  const handleNextCharacter = () => {
    if (autoCheckTimerRef.current) clearTimeout(autoCheckTimerRef.current);
    if (selectedIndex < rowItems.length - 1) {
      handleSelectCharacter(selectedIndex + 1);
    } else {
      handleSelectCharacter(0);
    }
  };

  // Animated Stroke order playback loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAnimation) {
      const totalSteps = kanaData.steps.length;
      timer = setInterval(() => {
        setAnimatingStep((prev) => {
          if (prev === null || prev >= totalSteps) {
            return 1;
          }
          return prev + 1;
        });
      }, 1400);
    } else {
      setAnimatingStep(null);
    }
    return () => clearInterval(timer);
  }, [isPlayingAnimation, kanaData.steps.length]);

  const handleEvaluateDrawing = useCallback(() => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;
    const res = evaluateDrawingSimilarity(canvas, kanaData.character);
    setSimilarityScore(res);
  }, [kanaData.character]);

  const handleStrokeEnd = useCallback(() => {
    if (similarityScore) setSimilarityScore(null);
    if (!autoCheckEnabled) return;

    if (autoCheckTimerRef.current) {
      clearTimeout(autoCheckTimerRef.current);
    }

    // Auto-check 1100ms setelah goresan diangkat jika ada goresan
    autoCheckTimerRef.current = setTimeout(() => {
      const canvas = canvasRef.current?.getCanvas();
      if (!canvas || !canvasRef.current?.hasDrawn()) return;

      setIsAutoEvaluating(true);
      setTimeout(() => {
        const res = evaluateDrawingSimilarity(canvas, kanaData.character);
        setSimilarityScore(res);
        setIsAutoEvaluating(false);
      }, 60);
    }, 1100);
  }, [autoCheckEnabled, similarityScore, kanaData.character]);

  const getStrokeTypeBadge = (type: StrokeType) => {
    switch (type) {
      case "tome":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
            🛑 Tome
          </span>
        );
      case "hane":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-bold">
            🪝 Hane
          </span>
        );
      case "harai":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
            💫 Harai
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Main Mode Navigation Bar - Responsive on Mobile */}
      <div className="p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs flex items-center justify-center">
        {/* Horizontal Scrollable Tabs on Mobile */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none w-full sm:w-auto justify-start sm:justify-center">
          <button
            type="button"
            onClick={() => {
              setActiveMainTab("hiragana");
              setSelectedIndex(0);
              setSimilarityScore(null);
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeMainTab === "hiragana"
                ? "bg-[#55A9A0] text-white shadow-md shadow-[#55A9A0]/20"
                : "text-[#293C3A] hover:bg-[#FFF0EF]"
            }`}
          >
            <PenTool className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Hiragana <span className="hidden xs:inline font-japanese">(ひらがな)</span></span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveMainTab("katakana");
              setSelectedIndex(0);
              setSimilarityScore(null);
            }}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeMainTab === "katakana"
                ? "bg-[#55A9A0] text-white shadow-md shadow-[#55A9A0]/20"
                : "text-[#293C3A] hover:bg-[#FFF0EF]"
            }`}
          >
            <Brush className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Katakana <span className="hidden xs:inline font-japanese">(カタカナ)</span></span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("rules")}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeMainTab === "rules"
                ? "bg-[#55A9A0] text-white shadow-md shadow-[#55A9A0]/20"
                : "text-[#293C3A] hover:bg-[#FFF0EF]"
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>7 Kaidah <span className="hidden xs:inline">Goresan</span></span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMainTab("romaji")}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer shrink-0 ${
              activeMainTab === "romaji"
                ? "bg-[#55A9A0] text-white shadow-md shadow-[#55A9A0]/20"
                : "text-[#293C3A] hover:bg-[#FFF0EF]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Kaidah Romaji</span>
          </button>
        </div>
      </div>

      {/* VIEW 1 & 2: HIRAGANA & KATAKANA WRITING STUDIO */}
      {(activeMainTab === "hiragana" || activeMainTab === "katakana") && (
        <div className="space-y-4 sm:space-y-6">
          {/* Row Filter Pills & Character Selector Carousel */}
          <div className="space-y-2.5 sm:space-y-3">
            {/* Row Selector Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none px-0.5">
              {WRITING_ROW_GROUPS.map((grp) => (
                <button
                  key={grp.id}
                  type="button"
                  onClick={() => {
                    setSelectedRow(grp.id);
                    setSelectedIndex(0);
                    setSimilarityScore(null);
                    canvasRef.current?.clear();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    selectedRow === grp.id
                      ? "bg-[#293C3A] text-white shadow-xs"
                      : "bg-white text-[#6F7775] border border-[#FFDDDD]/60 hover:bg-[#FFF0EF]"
                  }`}
                >
                  {grp.label}
                </button>
              ))}
            </div>

            {/* Character Carousel Cards */}
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin px-0.5">
              {rowItems.map((item, idx) => {
                const char = activeMainTab === "katakana" ? item.katakana.character : item.hiragana.character;
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectCharacter(idx)}
                    className={`flex flex-col items-center justify-center min-w-[62px] sm:min-w-[76px] h-18 sm:h-20 rounded-xl sm:rounded-2xl border transition-all cursor-pointer shrink-0 ${
                      isSelected
                        ? "bg-gradient-to-b from-[#FFF0EF] to-[#FFDDDD]/60 border-[#55A9A0] shadow-md scale-105"
                        : "bg-white border-[#FFDDDD]/60 hover:bg-[#FFF8F7] opacity-85 hover:opacity-100"
                    }`}
                  >
                    <span className="font-japanese font-black text-2xl sm:text-3xl text-[#293C3A]">
                      {char}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#55A9A0] font-mono lowercase mt-0.5">
                      {item.romaji}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Focus Toggle (Only on small screens: all vs canvas vs steps) */}
          <div className="lg:hidden flex items-center justify-center p-1 rounded-xl bg-gray-100 border border-gray-200">
            <button
              type="button"
              onClick={() => setMobileStudioView("all")}
              className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mobileStudioView === "all"
                  ? "bg-white text-[#293C3A] shadow-xs"
                  : "text-[#6F7775]"
              }`}
            >
              Semua Tampilan
            </button>
            <button
              type="button"
              onClick={() => setMobileStudioView("steps")}
              className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mobileStudioView === "steps"
                  ? "bg-white text-[#293C3A] shadow-xs"
                  : "text-[#6F7775]"
              }`}
            >
              📖 Langkah
            </button>
            <button
              type="button"
              onClick={() => setMobileStudioView("canvas")}
              className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mobileStudioView === "canvas"
                  ? "bg-white text-[#55A9A0] shadow-xs"
                  : "text-[#6F7775]"
              }`}
            >
              ✍️ Kanvas Latihan
            </button>
          </div>

          {/* Main Studio Grid: Left (Stroke Breakdown & Tips) & Right (Interactive Canvas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
            
            {/* LEFT COLUMN: Character Details & Step-by-Step Breakdown (7 Cols) */}
            <div className={`lg:col-span-7 space-y-4 sm:space-y-5 ${mobileStudioView === "canvas" ? "hidden lg:block" : "block"}`}>
              
              {/* Character Header Showcase */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs space-y-3.5 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Big Character Box */}
                  <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFF0EF] to-[#FFDDDD]/50 border-2 border-[#FFDDDD] flex items-center justify-center shadow-xs shrink-0">
                    <span className="font-japanese font-black text-4xl sm:text-5xl text-[#293C3A]">
                      {kanaData.character}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-[#293C3A] font-mono lowercase">
                        {currentItem.romaji}
                      </h2>
                      <button
                        type="button"
                        onClick={() => speakKana(kanaData.character)}
                        title="Dengarkan pengucapan audio"
                        className="p-1.5 rounded-full bg-[#D9EFEC] text-[#377770] hover:bg-[#55A9A0] hover:text-white transition-colors cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1">
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#55A9A0] text-white text-[10px] sm:text-[11px] font-bold">
                        {currentItem.rowName}
                      </span>
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-[#FFF0EF] text-[#293C3A] border border-[#FFDDDD] text-[10px] sm:text-[11px] font-bold">
                        {kanaData.strokes} Goresan
                      </span>
                    </div>

                    <p className="text-[11px] sm:text-xs text-[#6F7775] mt-1">
                      Aksara:{" "}
                      <span className="font-japanese font-bold text-[#293C3A]">
                        {activeMainTab === "hiragana" ? currentItem.katakana.character : currentItem.hiragana.character}
                      </span>{" "}
                      ({activeMainTab === "hiragana" ? "Katakana" : "Hiragana"})
                    </p>
                  </div>
                </div>

                {/* Animation & Nav controls */}
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-[#FFDDDD]/40">
                  <button
                    type="button"
                    onClick={() => setIsPlayingAnimation(!isPlayingAnimation)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      isPlayingAnimation
                        ? "bg-rose-500 text-white"
                        : "bg-[#D9EFEC] text-[#377770] hover:bg-[#55A9A0] hover:text-white"
                    }`}
                  >
                    {isPlayingAnimation ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Jeda Animasi</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Putar Animasi</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevCharacter}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-[#FFF0EF] text-[#293C3A] transition-colors cursor-pointer"
                      title="Karakter Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextCharacter}
                      className="p-2 rounded-xl bg-gray-100 hover:bg-[#FFF0EF] text-[#293C3A] transition-colors cursor-pointer"
                      title="Karakter Berikutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calligraphy Notes & Pitfall Alerts */}
              {(kanaData.handwritingNote || kanaData.pitfalls) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {kanaData.handwritingNote && (
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-[#55A9A0] shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-[#293C3A] block">Kaidah Kaligrafi:</span>
                        <p className="text-[#6F7775] mt-0.5 leading-relaxed">{kanaData.handwritingNote}</p>
                      </div>
                    </div>
                  )}

                  {kanaData.pitfalls && (
                    <div className="p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <span className="font-bold text-amber-900 block">Perhatian Khusus:</span>
                        <p className="text-amber-800 mt-0.5 leading-relaxed">{kanaData.pitfalls}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP-BY-STEP PROGRESSION CARDS (Standard Worksheet Style) */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-[#293C3A] flex items-center gap-1.5 sm:gap-2">
                      <Sparkles className="w-4 h-4 text-[#55A9A0]" />
                      <span>Urutan Goresan & Bayang-bayang Menulis</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#6F7775]">
                      Setiap kotak menampilkan bayangan huruf lengkap, nomor awal (①), dan panah arah:
                    </p>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-[#55A9A0]">
                    {kanaData.strokes} Langkah
                  </span>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {kanaData.steps.map((step, idx) => {
                    const isStepActive = animatingStep === step.stepNumber;
                    return (
                      <div
                        key={idx}
                        className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all flex items-start sm:items-center justify-between gap-2.5 sm:gap-3 ${
                          isStepActive
                            ? "bg-[#FFF0EF] border-[#55A9A0] shadow-xs ring-2 ring-[#55A9A0]/20"
                            : "bg-[#FFF8F7]/50 border-[#FFDDDD]/60 hover:bg-[#FFF8F7]"
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                          {/* Mini Genkoyoushi diagram box with GHOST SHADOW and DIRECTION ARROW */}
                          <StrokeStepVisualizer
                            character={kanaData.character}
                            step={step}
                            currentStepIndex={idx}
                            totalSteps={kanaData.steps.length}
                            isActive={isStepActive}
                            size="md"
                          />

                          {/* Step Explanation */}
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#D9EFEC] text-[#377770] font-black text-[10px] sm:text-xs flex items-center justify-center">
                                {step.stepNumber}
                              </span>
                              <span className="text-xs font-bold text-[#293C3A]">
                                Langkah {step.stepNumber}
                              </span>
                              {getStrokeTypeBadge(step.strokeType)}
                            </div>
                            <p className="text-[11px] sm:text-xs text-[#6F7775] mt-1 leading-relaxed">
                              {step.tip}
                            </p>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#55A9A0] block mt-0.5">
                              Arah: {step.direction}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Example Words */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs space-y-3">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#6F7775]">
                  Contoh Penggunaan Kata Praktis:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {currentItem.examples.map((ex, i) => (
                    <div
                      key={i}
                      className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="font-japanese font-bold text-lg sm:text-xl text-[#293C3A]">
                            {activeMainTab === "hiragana" ? ex.wordHiragana : ex.wordKatakana}
                          </span>
                          <span className="text-[11px] sm:text-xs font-bold text-[#55A9A0] font-mono">
                            [{ex.romaji}]
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-[#6F7775] mt-0.5">{ex.meaning}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => speakKana(activeMainTab === "hiragana" ? ex.wordHiragana : ex.wordKatakana)}
                        className="p-1.5 sm:p-2 rounded-xl bg-white hover:bg-[#D9EFEC] text-[#377770] transition-colors cursor-pointer"
                        title="Dengar pengucapan kata"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Drawing & Tracing Canvas (5 Cols) */}
            <div className={`lg:col-span-5 space-y-4 sm:space-y-5 ${mobileStudioView === "steps" ? "hidden lg:block" : "block"}`}>
              <div className="p-3.5 xs:p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs flex flex-col items-center">
                <div className="text-center mb-3 sm:mb-4">
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#D9EFEC] text-[#377770] text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5" />
                    Kanvas Kotak Genkōyōshi
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#293C3A] mt-1.5 sm:mt-2">
                    Latihan Menulis Huruf {kanaData.character}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#6F7775] mt-0.5 max-w-xs">
                    Tiru urutan goresan atau aktifkan tombol &quot;Jiplak&quot; untuk panduan bayangan.
                  </p>
                </div>

                {/* Canvas Component with full mobile responsiveness & bayang-bayang */}
                <StrokeOrderCanvas
                  ref={canvasRef}
                  referenceCharacter={kanaData.character}
                  steps={kanaData.steps}
                  width={310}
                  height={310}
                  onStrokeEnd={handleStrokeEnd}
                />

                {/* Similarity Evaluation Button & Auto-Check Controls */}
                <div className="mt-3 sm:mt-4 w-full max-w-[280px] xs:max-w-[310px] sm:max-w-[340px] space-y-2 sm:space-y-2.5">
                  {/* Auto-Check Toggle Bar */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-white border border-[#FFDDDD] text-xs">
                    <span className="flex items-center gap-1.5 font-bold text-[#293C3A] text-[11px] sm:text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
                      <span>Auto-Nilai Selesai Menulis</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setAutoCheckEnabled(!autoCheckEnabled)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                        autoCheckEnabled ? "bg-[#55A9A0]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                          autoCheckEnabled ? "translate-x-4" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Manual Button (if Auto-Check disabled or instant check) */}
                  <button
                    type="button"
                    onClick={handleEvaluateDrawing}
                    disabled={isAutoEvaluating}
                    className="w-full py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#55A9A0] to-[#377770] hover:from-[#47928a] hover:to-[#2e625c] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    {isAutoEvaluating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Menilai kemiripan...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Cek Kemiripan & Nilai Tulisan</span>
                      </>
                    )}
                  </button>

                  {/* Similarity Result Card */}
                  {similarityScore && (
                    <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF0EF] border border-[#FFDDDD] animate-in fade-in duration-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#55A9A0]" />
                          <span className="font-black text-xs sm:text-sm text-[#293C3A]">
                            {similarityScore.category}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg sm:rounded-xl bg-white font-black text-xs sm:text-sm text-[#55A9A0] border border-[#FFDDDD]">
                          {similarityScore.score}%
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#6F7775] leading-relaxed">
                        {similarityScore.description}
                      </p>

                      {/* Fast Next Button if score >= 70% */}
                      {similarityScore.score >= 70 && (
                        <button
                          type="button"
                          onClick={handleNextCharacter}
                          className="w-full mt-2 py-2 rounded-xl bg-[#55A9A0] hover:bg-[#377770] text-white font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <span>Lanjut Karakter Berikutnya</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Writing Tips Reminder Card */}
              <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FFF0EF] to-white border border-[#FFDDDD] space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#55A9A0]" />
                  <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#293C3A]">
                    Prinsip Memori Otot Menulis
                  </h4>
                </div>
                <ul className="text-[11px] sm:text-xs text-[#6F7775] space-y-1.5 sm:space-y-2 leading-relaxed">
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55A9A0] shrink-0 mt-1.5" />
                    <span>Goreskan garis dengan kecepatan konstan tanpa ragu.</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55A9A0] shrink-0 mt-1.5" />
                    <span>Gunakan garis putus-putus sebagai patokan simetri kiri dan kanan.</span>
                  </li>
                  <li className="flex items-start gap-1.5 sm:gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55A9A0] shrink-0 mt-1.5" />
                    <span>Ucapkan bunyinya secara lantang sambil menggoreskan pena.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: 7 KAIDAH EMAS URUTAN GORESAN (KAKIJUN) */}
      {activeMainTab === "rules" && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
          {/* Rules Banner Header */}
          <div className="p-4 sm:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FFF0EF] via-white to-[#D9EFEC]/60 border border-[#FFDDDD] shadow-xs">
            <div className="max-w-2xl space-y-2">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#55A9A0] text-white text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Filosofi Menulis Aksara Jepang (筆順)
              </span>
              <h2 className="text-xl sm:text-2xl sm:text-3xl font-black text-[#293C3A] tracking-tight">
                7 Kaidah Emas Urutan Goresan & Tipe Ujung Garis
              </h2>
              <p className="text-xs sm:text-sm text-[#6F7775] leading-relaxed">
                Urutan goresan (Kakijun / 筆順) adalah anatomi tulisan tangan yang membuat aksara Jepang terlihat proporsional, seimbang, dan mengalir cepat.
              </p>
            </div>
          </div>

          {/* 7 Golden Rules Grid */}
          <div className="space-y-3.5 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-black text-[#293C3A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#55A9A0]" />
              <span>7 Prinsip Utama Kakijun</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {GOLDEN_WRITING_RULES.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs hover:border-[#55A9A0] transition-all space-y-2.5 sm:space-y-3"
                >
                  <div className="flex items-start justify-between gap-2 sm:gap-3">
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-[#293C3A]">
                        {rule.title}
                      </h4>
                      <span className="text-[11px] sm:text-xs font-semibold text-[#55A9A0]">
                        {rule.japanese}
                      </span>
                    </div>

                    {/* Example Kana Chips */}
                    <div className="flex items-center gap-1 shrink-0">
                      {rule.exampleKana.slice(0, 3).map((ch, i) => (
                        <span
                          key={i}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#FFF0EF] border border-[#FFDDDD] text-[#293C3A] font-japanese font-black text-base sm:text-lg flex items-center justify-center shadow-xs"
                        >
                          {ch}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-[#293C3A] leading-relaxed">
                    {rule.description}
                  </p>

                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 text-[11px] sm:text-xs text-[#6F7775] leading-relaxed">
                    <span className="font-bold text-[#293C3A] block mb-0.5">Alasan Estetika:</span>
                    {rule.rationale}
                  </div>

                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#377770]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Tips: {rule.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3 Stroke Types (Tome, Hane, Harai) */}
          <div className="space-y-3.5 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-black text-[#293C3A] flex items-center gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#55A9A0]" />
              <span>3 Karakteristik Ujung Goresan</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
              {STROKE_TYPES_INFO.map((item) => (
                <div
                  key={item.type}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs space-y-2.5 sm:space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-japanese font-black text-xl sm:text-2xl text-[#293C3A]">
                        {item.nameJap}
                      </span>
                      <h4 className="text-xs sm:text-sm font-black text-[#293C3A] mt-0.5">
                        {item.nameIndo}
                      </h4>
                    </div>
                    {getStrokeTypeBadge(item.type)}
                  </div>

                  <p className="text-xs text-[#293C3A] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 text-[11px] sm:text-xs space-y-1">
                    <span className="font-bold text-[#293C3A] block">Teknik Pensil / Kuas:</span>
                    <p className="text-[#6F7775] leading-relaxed">{item.technique}</p>
                  </div>

                  <div className="text-[10px] sm:text-[11px] text-[#6F7775]">
                    <span className="font-bold text-[#293C3A]">Contoh: </span>
                    {item.examples.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Characters Matrix (Shi vs Tsu, So vs N, etc.) */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
              <h3 className="text-base sm:text-lg font-black text-[#293C3A] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                <span>Karakter Mirip yang Rawan Tertukar</span>
              </h3>
              <span className="text-[11px] sm:text-xs font-semibold text-[#6F7775]">
                Fokus Arah Sapuan Garis
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
              {SIMILAR_CHARACTERS_GUIDE.map((pair, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs space-y-3 sm:space-y-4"
                >
                  <h4 className="text-sm sm:text-base font-black text-[#293C3A] border-b border-[#FFDDDD]/60 pb-2">
                    {pair.title}
                  </h4>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {/* Char A */}
                    <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 flex flex-col items-center text-center space-y-1 sm:space-y-2">
                      <span className="font-japanese font-black text-3xl sm:text-4xl text-[#293C3A]">
                        {pair.charA.char}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-[#55A9A0] font-mono lowercase">
                        [{pair.charA.romaji}] - {pair.charA.strokes} Goresan
                      </span>
                      <p className="text-[10px] sm:text-[11px] text-[#6F7775] leading-tight">
                        {pair.charA.direction}
                      </p>
                    </div>

                    {/* Char B */}
                    <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 flex flex-col items-center text-center space-y-1 sm:space-y-2">
                      <span className="font-japanese font-black text-3xl sm:text-4xl text-[#293C3A]">
                        {pair.charB.char}
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-[#55A9A0] font-mono lowercase">
                        [{pair.charB.romaji}] - {pair.charB.strokes} Goresan
                      </span>
                      <p className="text-[10px] sm:text-[11px] text-[#6F7775] leading-tight">
                        {pair.charB.direction}
                      </p>
                    </div>
                  </div>

                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50/70 border border-amber-200 text-[11px] sm:text-xs text-amber-900 leading-relaxed font-semibold">
                    🔑 Kunci Perbedaan: {pair.keyDifference}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: KAIDAH LENGKAP PENULISAN ROMAJI */}
      {activeMainTab === "romaji" && (
        <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
          {/* Romaji Header Banner */}
          <div className="p-4 sm:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FFF0EF] via-white to-[#D9EFEC]/60 border border-[#FFDDDD] shadow-xs">
            <div className="max-w-2xl space-y-2">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#55A9A0] text-white text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Pedoman Transliterasi Resmi
              </span>
              <h2 className="text-xl sm:text-2xl sm:text-3xl font-black text-[#293C3A] tracking-tight">
                Kaidah Penulisan Romaji yang Baik dan Benar
              </h2>
              <p className="text-xs sm:text-sm text-[#6F7775] leading-relaxed">
                Pelajari kaidah Modified Hepburn, tanda vokal panjang (macron), konsonan ganda sokuon, dan aturan partikel gramatikal khusus di bawah ini!
              </p>
            </div>
          </div>

          {/* Romaji Rules Cards */}
          <div className="space-y-4 sm:space-y-6">
            {ROMAJI_WRITING_RULES.map((sec, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-[#FFDDDD] shadow-xs space-y-3 sm:space-y-4"
              >
                <div className="border-b border-[#FFDDDD]/60 pb-2.5">
                  <span className="text-[10px] sm:text-xs font-bold text-[#55A9A0] uppercase tracking-wider">
                    {sec.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#293C3A] mt-0.5">
                    {sec.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#6F7775] leading-relaxed">
                  {sec.explanation}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                  {sec.rules.map((rule, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 space-y-2"
                    >
                      <h4 className="text-xs font-black text-[#293C3A]">
                        {rule.ruleTitle}
                      </h4>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-start gap-2 text-emerald-700 bg-emerald-50/70 p-2 rounded-xl border border-emerald-200">
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                          <div className="break-words">
                            <span className="font-bold">Benar: </span>
                            <span className="font-mono font-semibold">{rule.correct}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-rose-700 bg-rose-50/70 p-2 rounded-xl border border-rose-200">
                          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                          <div className="break-words">
                            <span className="font-bold">Keliru: </span>
                            <span className="font-mono">{rule.wrong}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[10px] sm:text-[11px] text-[#6F7775] leading-relaxed pt-0.5">
                        💡 {rule.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Romaji Quiz */}
          <div className="p-4 sm:p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border-2 border-[#55A9A0]/30 shadow-md space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#D9EFEC] text-[#377770] text-[10px] sm:text-xs font-bold inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Kuis Pemahaman Kilat
                </span>
                <h3 className="text-base sm:text-xl font-black text-[#293C3A] mt-1 sm:mt-2">
                  Uji Pemahaman Kaidah Romaji (5 Soal)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedQuizAnswers({});
                  setShowQuizResults(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-[#6F7775] hover:bg-gray-50 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {ROMAJI_QUIZ_DATA.map((q) => {
                const selectedOpt = selectedQuizAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 space-y-2.5 sm:space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold text-[#55A9A0]">
                          Soal #{q.id}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#293C3A] mt-0.5 leading-snug">
                          {q.question}
                        </h4>
                      </div>
                      <span className="font-japanese font-bold text-base sm:text-lg text-[#293C3A] bg-white px-2.5 py-1 rounded-xl border border-[#FFDDDD] shrink-0">
                        {q.kanaText}
                      </span>
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = selectedOpt === optIdx;
                        let btnStyle = "bg-white border-[#FFDDDD]/60 hover:bg-[#FFF0EF] text-[#293C3A]";

                        if (showQuizResults) {
                          if (optIdx === q.correctAnswer) {
                            btnStyle = "bg-emerald-100 border-emerald-400 text-emerald-900 font-bold";
                          } else if (isThisSelected && !isCorrect) {
                            btnStyle = "bg-rose-100 border-rose-400 text-rose-900";
                          }
                        } else if (isThisSelected) {
                          btnStyle = "bg-[#55A9A0] text-white border-[#55A9A0] font-bold";
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => {
                              setSelectedQuizAnswers((prev) => ({
                                ...prev,
                                [q.id]: optIdx,
                              }));
                            }}
                            className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer min-h-[44px] flex items-center ${btnStyle}`}
                          >
                            <span className="font-mono font-medium">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if show results */}
                    {showQuizResults && (
                      <div className="p-2.5 sm:p-3 rounded-xl bg-white border border-[#FFDDDD] text-xs text-[#6F7775] leading-relaxed">
                        <span className="font-bold text-[#293C3A] block mb-0.5">Penjelasan:</span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Check Button */}
            {!showQuizResults ? (
              <button
                type="button"
                onClick={() => setShowQuizResults(true)}
                disabled={Object.keys(selectedQuizAnswers).length < ROMAJI_QUIZ_DATA.length}
                className="w-full py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                Periksa Jawaban Kuis Romaji
              </button>
            ) : (
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#D9EFEC] text-[#377770] font-bold text-xs sm:text-sm text-center">
                Skor Anda:{" "}
                {
                  ROMAJI_QUIZ_DATA.filter(
                    (q) => selectedQuizAnswers[q.id] === q.correctAnswer
                  ).length
                }{" "}
                dari {ROMAJI_QUIZ_DATA.length} Benar! 🎉
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
