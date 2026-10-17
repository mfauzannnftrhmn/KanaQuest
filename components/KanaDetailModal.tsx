"use client";

import { useRef, useState } from "react";
import { X, CheckCircle2, Circle, PenTool, Sparkles, Volume2 } from "lucide-react";
import { KanaItem, speakKana } from "@/data/kanaData";
import DrawingCanvas, { DrawingCanvasHandle } from "./DrawingCanvas";
import { evaluateDrawingSimilarity, SimilarityResult } from "@/lib/canvasSimilarity";

interface KanaDetailModalProps {
  item: KanaItem | null;
  activeType: "hiragana" | "katakana";
  isLearned: boolean;
  onToggleLearned: (id: string) => void;
  onClose: () => void;
}

export default function KanaDetailModal({
  item,
  activeType,
  isLearned,
  onToggleLearned,
  onClose,
}: KanaDetailModalProps) {
  const canvasRef = useRef<DrawingCanvasHandle | null>(null);
  const [practiceResult, setPracticeResult] = useState<SimilarityResult | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "practice">("info");

  if (!item) return null;

  const currentCharacter = activeType === "hiragana" ? item.hiragana : item.katakana;
  const alternateCharacter = activeType === "hiragana" ? item.katakana : item.hiragana;
  const alternateName = activeType === "hiragana" ? "Katakana" : "Hiragana";

  const handleTestPractice = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;
    const res = evaluateDrawingSimilarity(canvas, currentCharacter);
    setPracticeResult(res);
  };

  const handleClearPractice = () => {
    canvasRef.current?.clear();
    setPracticeResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#FFF8F7] border border-[#FFDDDD] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#FFDDDD]/60 via-[#FFF0EF] to-[#D9EFEC]/60 border-b border-[#FFDDDD] flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#55A9A0] text-white">
              {item.rowName}
            </span>
            <span className="text-xs font-medium text-[#6F7775]">
              {item.strokes} Goresan
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/80 text-[#293C3A] transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character showcase */}
        <div className="px-4 sm:px-6 pt-4 pb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#FFDDDD]/40 bg-white">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#FFF0EF] to-[#FFDDDD]/40 border border-[#FFDDDD] flex items-center justify-center shadow-xs shrink-0">
              <span className="font-japanese font-bold text-4xl sm:text-5xl text-[#293C3A]">
                {currentCharacter}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-[#293C3A] uppercase tracking-wide">
                  {item.romaji}
                </h2>
                <button
                  type="button"
                  onClick={() => speakKana(currentCharacter)}
                  title="Dengarkan pengucapan"
                  className="p-1.5 rounded-full bg-[#D9EFEC] text-[#377770] hover:bg-[#55A9A0] hover:text-white transition-colors cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-[#6F7775] mt-0.5">
                {alternateName}: <span className="font-japanese font-semibold text-[#293C3A]">{alternateCharacter}</span>
              </p>
            </div>
          </div>

          {/* Toggle learned button */}
          <button
            type="button"
            onClick={() => onToggleLearned(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isLearned
                ? "bg-[#D9EFEC] text-[#377770] border border-[#55A9A0]"
                : "bg-gray-100 text-[#6F7775] border border-gray-200 hover:bg-[#FFF0EF]"
            }`}
          >
            {isLearned ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#55A9A0]" />
                <span>Dikuasai</span>
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                <span>Tandai Dikuasai</span>
              </>
            )}
          </button>
        </div>

        {/* Tab switcher: Info & Stroke tips VS Interactive Practice */}
        <div className="flex border-b border-[#FFDDDD]/60 bg-[#FFF0EF]/60 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`py-2.5 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTab === "info"
                ? "border-[#55A9A0] text-[#293C3A]"
                : "border-transparent text-[#6F7775] hover:text-[#293C3A]"
            }`}
          >
            Panduan & Contoh
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("practice")}
            className={`py-2.5 px-4 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === "practice"
                ? "border-[#55A9A0] text-[#55A9A0]"
                : "border-transparent text-[#6F7775] hover:text-[#293C3A]"
            }`}
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Latihan Menulis</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {activeTab === "info" ? (
            <>
              {/* Stroke Order Tips */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F7775] mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
                  <span>Panduan Urutan Goresan (Stroke Order)</span>
                </h4>
                <div className="space-y-2">
                  {item.strokeTips.map((tip, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-2.5 rounded-xl bg-white border border-[#FFDDDD]/50 text-xs text-[#293C3A]"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#D9EFEC] text-[#377770] font-bold flex items-center justify-center shrink-0 text-[11px]">
                        {idx + 1}
                      </span>
                      <p className="pt-0.5 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example Words */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F7775] mb-2.5">
                  Contoh Kata Kosakata:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white border border-[#FFDDDD]/60 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-japanese font-bold text-lg text-[#293C3A]">
                            {activeType === "hiragana" ? ex.wordHiragana : ex.wordKatakana}
                          </span>
                          <span className="text-xs font-semibold text-[#55A9A0]">
                            [{ex.romaji}]
                          </span>
                        </div>
                        <p className="text-xs text-[#6F7775] mt-0.5">{ex.meaning}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => speakKana(activeType === "hiragana" ? ex.wordHiragana : ex.wordKatakana)}
                        className="p-1.5 rounded-full bg-[#FFF0EF] text-[#293C3A] hover:bg-[#FFDDDD] transition-colors"
                        title="Dengarkan kata"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Interactive Drawing Practice */
            <div className="flex flex-col items-center">
              <p className="text-xs text-[#6F7775] text-center mb-3">
                Cobalah menulis karakter <span className="font-japanese font-bold text-base text-[#293C3A]">"{currentCharacter}"</span> pada kanvas di bawah, lalu periksa kemiripannya!
              </p>

              <DrawingCanvas
                ref={canvasRef}
                width={260}
                height={260}
                initialLineWidth={12}
                showGridDefault={true}
              />

              <div className="flex items-center gap-2.5 mt-4 w-full max-w-xs">
                <button
                  type="button"
                  onClick={handleTestPractice}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-semibold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Uji Kemiripan</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearPractice}
                  className="py-2 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#293C3A] font-medium text-xs transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Practice Result evaluation */}
              {practiceResult && (
                <div className="mt-4 w-full p-4 rounded-2xl bg-white border border-[#55A9A0]/30 shadow-xs animate-in fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#6F7775]">Hasil Evaluasi</span>
                    <span className="text-sm font-black text-[#55A9A0]">
                      {practiceResult.score}% Kemiripan
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {practiceResult.overlayDataUrl && (
                      <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden shrink-0 bg-white">
                        <img 
                          src={practiceResult.overlayDataUrl} 
                          alt="Overlay comparison" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D9EFEC] text-[#377770]">
                        {practiceResult.category}
                      </span>
                      <p className="text-xs text-[#293C3A] mt-1 leading-snug">
                        {practiceResult.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FFF0EF]/60 border-t border-[#FFDDDD]/60 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#55A9A0] hover:bg-[#47928a] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
