"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  PenTool, 
  Brush,
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  CheckCircle, 
  History, 
  Home,
  Layers
} from "lucide-react";
import { BASIC_KANA, KanaItem } from "@/data/kanaData";
import DrawingCanvas, { DrawingCanvasHandle } from "./DrawingCanvas";
import { evaluateDrawingSimilarity, SimilarityResult } from "@/lib/canvasSimilarity";
import { saveQuizSession, QuizQuestionResult, QuizSession } from "@/lib/storage";

interface DrawQuizViewProps {
  targetType: "hiragana" | "katakana";
}

interface QuestionAttempt {
  attemptNumber: number;
  score: number;
  category: string;
  overlayDataUrl?: string;
}

interface QuestionState {
  item: KanaItem;
  attempts: QuestionAttempt[];
  bestScore: number;
  isEvaluated: boolean;
}

export default function DrawQuizView({ targetType }: DrawQuizViewProps) {
  const canvasRef = useRef<DrawingCanvasHandle | null>(null);

  const [gameState, setGameState] = useState<"intro" | "drawing" | "result">("intro");
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAttemptCount, setCurrentAttemptCount] = useState(0);
  const [currentEvalResult, setCurrentEvalResult] = useState<SimilarityResult | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [finalResults, setFinalResults] = useState<QuizQuestionResult[]>([]);

  const kanaTitle = targetType === "hiragana" ? "Hiragana (ひらがな)" : "Katakana (カタカナ)";

  const startQuiz = () => {
    // Pick 25 distinct randomized kana from the 46
    const shuffled = [...BASIC_KANA].sort(() => Math.random() - 0.5);
    const selected25 = shuffled.slice(0, 25);

    const qs: QuestionState[] = selected25.map((item) => ({
      item,
      attempts: [],
      bestScore: 0,
      isEvaluated: false,
    }));

    setQuestions(qs);
    setCurrentIndex(0);
    setCurrentAttemptCount(0);
    setCurrentEvalResult(null);
    setStartTime(Date.now());
    setGameState("drawing");
  };

  const handleEvaluate = () => {
    const canvas = canvasRef.current?.getCanvas();
    if (!canvas) return;

    const currentQ = questions[currentIndex];
    const targetChar = targetType === "hiragana" ? currentQ.item.hiragana : currentQ.item.katakana;

    const result = evaluateDrawingSimilarity(canvas, targetChar);
    setCurrentEvalResult(result);

    const newAttemptCount = currentAttemptCount + 1;
    setCurrentAttemptCount(newAttemptCount);

    const attemptData: QuestionAttempt = {
      attemptNumber: newAttemptCount,
      score: result.score,
      category: result.category,
      overlayDataUrl: result.overlayDataUrl,
    };

    const updatedAttempts = [...currentQ.attempts, attemptData];
    const best = Math.max(currentQ.bestScore, result.score);

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...currentQ,
      attempts: updatedAttempts,
      bestScore: best,
      isEvaluated: true,
    };
    setQuestions(updatedQuestions);
  };

  const handleRetryCurrentQuestion = () => {
    canvasRef.current?.clear();
    setCurrentEvalResult(null);
  };

  const handleNextQuestion = () => {
    canvasRef.current?.clear();
    setCurrentEvalResult(null);
    setCurrentAttemptCount(0);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    setDuration(elapsedSeconds);

    const resultsList: QuizQuestionResult[] = questions.map((q) => {
      const char = targetType === "hiragana" ? q.item.hiragana : q.item.katakana;
      const isPass = q.bestScore >= 50; // Threshold considered pass in drawing
      return {
        kana: char,
        romaji: q.item.romaji,
        type: targetType,
        isCorrect: isPass,
        drawingScore: q.bestScore,
        drawingAttempts: q.attempts.length || 1,
        drawingCategory:
          q.attempts[q.attempts.length - 1]?.category || "Perlu Latihan",
      };
    });

    const sumScore = resultsList.reduce((acc, curr) => acc + (curr.drawingScore || 0), 0);
    const avgScore = Math.round(sumScore / (resultsList.length || 1));
    const correctCount = resultsList.filter((r) => r.isCorrect).length;

    setFinalScore(avgScore);
    setFinalResults(resultsList);

    const date = new Date();
    const dateFormatted = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

    const session: QuizSession = {
      id: `draw_${targetType}_${Date.now()}`,
      timestamp: Date.now(),
      dateFormatted,
      testType: targetType === "hiragana" ? "draw-hiragana" : "draw-katakana",
      testMode: targetType,
      totalQuestions: resultsList.length,
      correctAnswers: correctCount,
      score: avgScore,
      durationSeconds: elapsedSeconds,
      questions: resultsList,
    };

    saveQuizSession(session);
    setGameState("result");

    if (avgScore >= 65) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#55A9A0", "#FFDDDD", "#FFB6B6", "#D9EFEC"],
        });
      } catch (e) {}
    }
  };

  const currentQ = questions[currentIndex];
  const targetChar = currentQ
    ? targetType === "hiragana"
      ? currentQ.item.hiragana
      : currentQ.item.katakana
    : "";
  const progressPercent = Math.round(((currentIndex + 1) / (questions.length || 25)) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. INTRO STATE */}
      {gameState === "intro" && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-xs font-semibold text-[#293C3A]">
              <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
              <span>25 Soal Menggambar Kanvas</span>
            </div>
            <h1 className="text-3xl font-black text-[#293C3A]">
              Kuis Menggambar {kanaTitle}
            </h1>
            <p className="text-sm text-[#6F7775] max-w-lg mx-auto">
              Kamu akan diminta menggambar 25 karakter acak yang berbeda di kanvas. Sistem akan menilai kemiripan bentuk secara otomatis!
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs space-y-6">
            <h3 className="font-bold text-[#293C3A] text-sm uppercase tracking-wider text-center">
              Ketentuan dan Aturan Kuis:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] space-y-1">
                <span className="font-bold text-[#55A9A0] text-sm block">1. 25 Karakter Acak</span>
                <p className="text-[#6F7775] leading-relaxed">
                  Diambil tanpa pengulangan dari 46 karakter dasar {targetType}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] space-y-1">
                <span className="font-bold text-[#55A9A0] text-sm block">2. Maks. 3 Percobaan</span>
                <p className="text-[#6F7775] leading-relaxed">
                  Bisa mencoba hingga 3 kali per soal. Nilai terbaikmu yang akan disimpan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] space-y-1">
                <span className="font-bold text-[#55A9A0] text-sm block">3. Evaluasi Kemiripan</span>
                <p className="text-[#6F7775] leading-relaxed">
                  Bentuk gambar dinormalisasi dan dibandingkan langsung dengan karakter asli.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={startQuiz}
                className="px-8 py-3.5 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-sm shadow-md shadow-[#55A9A0]/25 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                {targetType === "katakana" ? (
                  <Brush className="w-4 h-4" />
                ) : (
                  <PenTool className="w-4 h-4" />
                )}
                <span>Mulai Sesi Menggambar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. DRAWING STATE */}
      {gameState === "drawing" && currentQ && (
        <div className="space-y-4 sm:space-y-6">
          {/* Header Bar */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#55A9A0] text-white shrink-0">
                Soal {currentIndex + 1} dari {questions.length}
              </span>
              <span className="text-xs font-semibold text-[#6F7775]">
                Gambarlah karakter Romaji: <strong className="text-[#293C3A] uppercase">[{currentQ.item.romaji}]</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setGameState("intro")}
              className="text-xs text-rose-500 hover:underline cursor-pointer"
            >
              Keluar Sesi
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[#FFF0EF] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#55A9A0] to-[#71C5BC] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Drawing Board Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-sm flex flex-col items-center space-y-5">
            {/* Target Character Clue */}
            <div className="flex items-center gap-3">
              <div className="px-5 py-2 rounded-2xl bg-[#FFF0EF] border border-[#FFDDDD]">
                <span className="text-xs text-[#6F7775]">Karakter target: </span>
                <span className="text-lg font-black text-[#293C3A] uppercase tracking-wider ml-1">
                  {currentQ.item.romaji}
                </span>
              </div>

              <span className="text-xs text-[#6F7775]">
                Percobaan: <strong className="text-[#293C3A]">{currentAttemptCount} / 3</strong>
              </span>
            </div>

            {/* Drawing Canvas */}
            <DrawingCanvas
              ref={canvasRef}
              width={280}
              height={280}
              initialLineWidth={12}
              showGridDefault={true}
            />

            {/* Evaluation Actions */}
            {!currentEvalResult ? (
              <div className="flex items-center gap-3 w-full max-w-xs">
                <button
                  type="button"
                  onClick={handleEvaluate}
                  className="flex-1 py-3 px-6 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Evaluasi Gambar ({currentAttemptCount + 1}/3)</span>
                </button>
              </div>
            ) : (
              /* Evaluation Result Display & Next Options */
              <div className="w-full max-w-md p-5 rounded-3xl bg-[#FFF8F7] border border-[#55A9A0]/40 shadow-xs space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#6F7775]">
                      Skor Percobaan {currentAttemptCount}:
                    </span>
                    <h4 className="text-2xl font-black text-[#55A9A0]">
                      {currentEvalResult.score}%
                    </h4>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D9EFEC] text-[#377770]">
                    {currentEvalResult.category}
                  </span>
                </div>

                {/* Visual Overlay Comparison */}
                <div className="flex items-center gap-4 p-3 bg-white rounded-2xl border border-[#FFDDDD]">
                  {currentEvalResult.overlayDataUrl && (
                    <div className="w-20 h-20 rounded-xl border border-gray-200 overflow-hidden shrink-0 bg-white shadow-2xs">
                      <img
                        src={currentEvalResult.overlayDataUrl}
                        alt="Perbandingan gambar"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-[#293C3A]">
                      Bentuk Asli: <span className="font-japanese text-xl text-[#55A9A0] ml-1">{targetChar}</span>
                    </p>
                    <p className="text-[#6F7775] leading-relaxed">
                      {currentEvalResult.description}
                    </p>
                  </div>
                </div>

                {/* Best score indicator */}
                <p className="text-[11px] text-gray-500 text-center">
                  Skor terbaik untuk soal ini: <strong className="text-[#293C3A]">{currentQ.bestScore}%</strong>
                </p>

                {/* Buttons: Try Again (if attempts < 3) or Next */}
                <div className="flex items-center gap-2.5 pt-1">
                  {currentAttemptCount < 3 ? (
                    <button
                      type="button"
                      onClick={handleRetryCurrentQuestion}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-white border border-[#FFDDDD] hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Coba Lagi ({currentAttemptCount}/3)</span>
                    </button>
                  ) : (
                    <span className="text-xs text-amber-600 font-semibold px-2 py-1">
                      Maksimal 3 percobaan tercapai!
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentIndex + 1 < questions.length ? "Soal Berikutnya" : "Lihat Hasil"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. RESULT STATE */}
      {gameState === "result" && (
        <div className="space-y-6">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF0EF] via-[#FFDDDD]/40 to-[#D9EFEC]/50 border border-[#FFDDDD] text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-white border border-[#FFDDDD] flex items-center justify-center text-amber-500 mx-auto shadow-xs">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#55A9A0]">
                Sesi Menggambar Selesai!
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#293C3A] mt-1">
                Rata-Rata Kemiripan: {finalScore}%
              </h2>
            </div>

            <div className="flex justify-center gap-6 text-sm text-[#6F7775] pt-2">
              <div>
                <p className="font-bold text-[#293C3A] text-lg">
                  {finalResults.filter((r) => r.isCorrect).length} / {finalResults.length}
                </p>
                <p className="text-xs">Karakter Layak (&ge; 50%)</p>
              </div>
              <div className="w-px h-8 bg-[#FFDDDD]" />
              <div>
                <p className="font-bold text-[#293C3A] text-lg">{duration} detik</p>
                <p className="text-xs">Durasi Sesi</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={startQuiz}
                className="px-6 py-3 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Sesi</span>
              </button>

              <Link
                href="/history"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs border border-[#FFDDDD] shadow-xs transition-colors flex items-center gap-1.5"
              >
                <History className="w-4 h-4" />
                <span>Lihat History</span>
              </Link>

              <Link
                href="/"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs border border-[#FFDDDD] shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="p-6 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs space-y-4">
            <h3 className="font-bold text-[#293C3A] text-base">
              Rincian Skor Kemiripan per Karakter
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {finalResults.map((r, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-japanese font-bold text-2xl text-[#293C3A]">
                      {r.kana}
                    </span>
                    <div>
                      <p className="font-semibold text-[#293C3A]">
                        Romaji: <span className="uppercase text-[#55A9A0]">{r.romaji}</span>
                      </p>
                      <p className="text-[11px] text-[#6F7775]">
                        {r.drawingAttempts}x Percobaan &bull; {r.drawingCategory}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-[#55A9A0]">
                      {r.drawingScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
