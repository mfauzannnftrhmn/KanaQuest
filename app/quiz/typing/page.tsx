"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { 
  Keyboard, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle, 
  XCircle, 
  Sparkles,
  Trophy,
  History,
  Home,
  Lightbulb
} from "lucide-react";
import { 
  BASIC_KANA, 
  KanaItem, 
  normalizeRomaji 
} from "@/data/kanaData";
import { saveQuizSession, QuizQuestionResult, QuizSession } from "@/lib/storage";

type QuizMode = "hiragana" | "katakana" | "mixed";

interface TypingQuestion {
  item: KanaItem;
  type: "hiragana" | "katakana";
  kanaChar: string; // The Japanese Kana character displayed
  expectedRomaji: string; // The Romaji the user must type
  acceptableRomaji: string[]; // Variations like shi/si, tsu/tu
}

export default function TypingQuizPage() {
  const [mode, setMode] = useState<QuizMode>("mixed");
  const [gameState, setGameState] = useState<"setup" | "playing" | "result">("setup");
  const [questions, setQuestions] = useState<TypingQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [results, setResults] = useState<QuizQuestionResult[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Focus input when question changes
  useEffect(() => {
    if (gameState === "playing" && questions[currentIndex]) {
      inputRef.current?.focus();
    }
  }, [currentIndex, gameState, questions]);

  const startQuiz = (selectedMode: QuizMode) => {
    setMode(selectedMode);

    // Shuffle and pick 25 distinct items from BASIC_KANA
    const shuffled = [...BASIC_KANA].sort(() => Math.random() - 0.5);
    const selected25 = shuffled.slice(0, 25);

    const generatedQuestions: TypingQuestion[] = selected25.map((item) => {
      let qType: "hiragana" | "katakana" = "hiragana";
      if (selectedMode === "katakana") qType = "katakana";
      else if (selectedMode === "hiragana") qType = "hiragana";
      else qType = Math.random() > 0.5 ? "hiragana" : "katakana";

      const kanaChar = qType === "hiragana" ? item.hiragana : item.katakana;
      const primaryRomaji = item.romaji.toLowerCase();
      const normalized = normalizeRomaji(primaryRomaji);

      const acceptable = [primaryRomaji, normalized];
      if (primaryRomaji === "shi") acceptable.push("si");
      if (primaryRomaji === "chi") acceptable.push("ti");
      if (primaryRomaji === "tsu") acceptable.push("tu");
      if (primaryRomaji === "fu") acceptable.push("hu");
      if (primaryRomaji === "ji") acceptable.push("zi");
      if (primaryRomaji === "wo") acceptable.push("o");
      if (primaryRomaji === "n") acceptable.push("nn");

      return {
        item,
        type: qType,
        kanaChar,
        expectedRomaji: primaryRomaji,
        acceptableRomaji: acceptable,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setResults([]);
    setUserAnswer("");
    setLastFeedback(null);
    setStartTime(Date.now());
    setGameState("playing");
  };

  const handleAnswerSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userAnswer.trim()) return;

    const currentQ = questions[currentIndex];
    const cleanInput = userAnswer.trim().toLowerCase();
    const cleanNormalized = normalizeRomaji(cleanInput);

    const isCorrect =
      cleanInput === currentQ.expectedRomaji ||
      cleanNormalized === currentQ.expectedRomaji ||
      currentQ.acceptableRomaji.includes(cleanInput) ||
      currentQ.acceptableRomaji.includes(cleanNormalized);

    const resultItem: QuizQuestionResult = {
      kana: currentQ.kanaChar,
      romaji: currentQ.expectedRomaji,
      type: currentQ.type,
      direction: "kana_to_romaji",
      userAnswer: cleanInput,
      isCorrect: !!isCorrect,
    };

    const newResults = [...results, resultItem];
    setResults(newResults);

    // Visual feedback
    setLastFeedback({
      isCorrect: !!isCorrect,
      message: isCorrect
        ? `Benar! (${currentQ.expectedRomaji})`
        : `Kurang tepat. Jawaban benar: ${currentQ.expectedRomaji}`,
    });

    // Proceed to next question or finish
    setTimeout(() => {
      setLastFeedback(null);
      setUserAnswer("");

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        finishQuiz(newResults);
      }
    }, 600);
  };

  const finishQuiz = (finalResults: QuizQuestionResult[]) => {
    const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
    setDuration(elapsedSeconds);

    const correctCount = finalResults.filter((r) => r.isCorrect).length;
    const finalScore = Math.round((correctCount / finalResults.length) * 100);

    const date = new Date();
    const dateFormatted = date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });

    const session: QuizSession = {
      id: `quiz_${Date.now()}`,
      timestamp: Date.now(),
      dateFormatted,
      testType: "typing",
      testMode: mode,
      totalQuestions: finalResults.length,
      correctAnswers: correctCount,
      score: finalScore,
      durationSeconds: elapsedSeconds,
      questions: finalResults,
    };

    saveQuizSession(session);
    setGameState("result");

    if (finalScore >= 70) {
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
  const progressPercent = Math.round(((currentIndex + 1) / (questions.length || 25)) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* 1. SETUP STATE */}
      {gameState === "setup" && (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-xs font-semibold text-[#293C3A]">
              <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
              <span>Sesi 25 Soal &bull; Ketik Romaji</span>
            </div>
            <h1 className="text-3xl font-black text-[#293C3A]">
              Kuis Mengetik Kana (タイピング)
            </h1>
            <p className="text-sm text-[#6F7775] max-w-lg mx-auto">
              Lihat karakter aksara Jepang yang tampil, lalu ketik padanan Romajinya secara cepat dan tepat.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs space-y-6">
            <h3 className="font-bold text-[#293C3A] text-sm uppercase tracking-wider text-center">
              Pilih Mode Karakter:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: "hiragana",
                  name: "Hiragana Saja",
                  jap: "ひらがな",
                  desc: "25 soal karakter Hiragana (ketik romaji).",
                  color: "border-[#FFDDDD] hover:border-rose-400",
                },
                {
                  id: "katakana",
                  name: "Katakana Saja",
                  jap: "カタカナ",
                  desc: "25 soal karakter Katakana (ketik romaji).",
                  color: "border-[#D9EFEC] hover:border-[#55A9A0]",
                },
                {
                  id: "mixed",
                  name: "Campuran (Mixed)",
                  jap: "両方",
                  desc: "Kombinasi acak Hiragana & Katakana.",
                  color: "border-[#55A9A0] bg-[#FFF8F7]",
                },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => startQuiz(m.id as QuizMode)}
                  className={`p-5 rounded-2xl border-2 text-left transition-all card-hover flex flex-col justify-between space-y-3 cursor-pointer ${m.color}`}
                >
                  <div>
                    <span className="font-japanese text-xs font-bold text-[#55A9A0]">
                      {m.jap}
                    </span>
                    <h4 className="font-bold text-[#293C3A] text-base mt-0.5">
                      {m.name}
                    </h4>
                    <p className="text-xs text-[#6F7775] mt-1 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#55A9A0]">
                    <span>Mulai Kuis</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF0EF] border border-[#FFDDDD] text-xs text-[#6F7775] space-y-1.5">
              <p className="font-bold text-[#293C3A] flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Tips Mengetik Romaji:</span>
              </p>
              <p>&bull; Ketik romaji huruf kecil atau besar (misal: <code>ka</code>, <code>shi</code>, <code>tsu</code>) lalu tekan <kbd className="px-1.5 py-0.5 bg-white border rounded text-[11px] font-mono">Enter</kbd>.</p>
              <p>&bull; Sistem menerima toleransi variasi penulisan seperti <em>shi/si, chi/ti, tsu/tu, fu/hu, ji/zi</em>.</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. PLAYING STATE */}
      {gameState === "playing" && currentQ && (
        <div className="space-y-6">
          {/* Header Bar: Progress & Mode */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#55A9A0] text-white shrink-0">
                Soal {currentIndex + 1} dari {questions.length}
              </span>
              <span className="text-xs font-semibold text-[#6F7775]">
                Ketik Romaji karakter ini:
              </span>
            </div>

            <button
              type="button"
              onClick={() => setGameState("setup")}
              className="text-xs text-rose-500 hover:underline cursor-pointer"
            >
              Keluar Kuis
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[#FFF0EF] overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#55A9A0] to-[#71C5BC] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Card (Kana character displayed pure and clean, without Indonesian translation words) */}
          <div className="p-6 sm:p-12 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-sm flex flex-col items-center text-center space-y-5 sm:space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFF0EF] text-[#55A9A0] border border-[#FFDDDD]">
                {currentQ.type === "hiragana" ? "Hiragana" : "Katakana"}
              </span>
            </div>

            {/* Target Japanese Kana Character Display */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-b from-[#FFF0EF] to-[#FFDDDD]/30 border border-[#FFDDDD] flex items-center justify-center shadow-xs">
              <span className="font-japanese font-black text-5xl sm:text-7xl text-[#293C3A]">
                {currentQ.kanaChar}
              </span>
            </div>

            {/* Input Form for Romaji */}
            <form onSubmit={handleAnswerSubmit} className="w-full max-w-sm space-y-3">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Ketik romaji..."
                  autoComplete="off"
                  autoFocus
                  className="w-full px-5 py-4 bg-[#FFF8F7] border-2 border-[#55A9A0] rounded-2xl text-center text-2xl font-bold text-[#293C3A] focus:outline-none focus:ring-4 focus:ring-[#55A9A0]/20 shadow-inner placeholder:text-gray-300 placeholder:text-base"
                />
              </div>

              <button
                type="submit"
                disabled={!userAnswer.trim()}
                className="w-full py-3 px-6 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-sm shadow-xs disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                Kirim Jawaban (Enter)
              </button>
            </form>

            {/* Feedback alert */}
            {lastFeedback && (
              <div 
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold animate-in fade-in shadow-xs ${
                  lastFeedback.isCorrect
                    ? "bg-[#D9EFEC] text-[#377770] border border-[#55A9A0]/40"
                    : "bg-rose-100 text-rose-700 border border-rose-300"
                }`}
              >
                {lastFeedback.isCorrect ? (
                  <CheckCircle className="w-5 h-5 shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 shrink-0" />
                )}
                <span>{lastFeedback.message}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. RESULT STATE */}
      {gameState === "result" && (
        <div className="space-y-6">
          {/* Result Summary Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FFF0EF] via-[#FFDDDD]/40 to-[#D9EFEC]/50 border border-[#FFDDDD] text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-white border border-[#FFDDDD] flex items-center justify-center text-amber-500 mx-auto shadow-xs">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#55A9A0]">
                Sesi Kuis Selesai!
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#293C3A] mt-1">
                Skor Akhir: {Math.round((results.filter((r) => r.isCorrect).length / (results.length || 1)) * 100)}%
              </h2>
            </div>

            <div className="flex justify-center gap-6 text-sm text-[#6F7775] pt-2">
              <div>
                <p className="font-bold text-[#293C3A] text-lg">
                  {results.filter((r) => r.isCorrect).length} / {results.length}
                </p>
                <p className="text-xs">Jawaban Benar</p>
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
                onClick={() => startQuiz(mode)}
                className="px-6 py-3 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Coba Lagi</span>
              </button>

              <Link
                href="/review"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs border border-[#FFDDDD] shadow-xs transition-colors"
              >
                Review Kesalahan
              </Link>

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

          {/* Breakdown of questions */}
          <div className="p-6 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs space-y-4">
            <h3 className="font-bold text-[#293C3A] text-base">
              Rincian Jawaban Soal ({results.length} Karakter)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {results.map((r, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs ${
                    r.isCorrect
                      ? "bg-[#D9EFEC]/30 border-[#55A9A0]/40"
                      : "bg-rose-50/50 border-rose-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-japanese font-bold text-3xl text-[#293C3A]">
                      {r.kana}
                    </span>
                    <div>
                      <p className="font-semibold text-[#293C3A]">
                        Romaji: <span className="uppercase text-[#55A9A0] font-bold">{r.romaji}</span> ({r.type})
                      </p>
                      <p className="text-[11px] text-[#6F7775]">
                        Ketik: "{r.userAnswer || "-"}"
                      </p>
                    </div>
                  </div>

                  <div>
                    {r.isCorrect ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#D9EFEC] text-[#377770] font-bold text-[10px]">
                        Benar
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                        Salah
                      </span>
                    )}
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
