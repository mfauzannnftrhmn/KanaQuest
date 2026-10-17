"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  BarChart2, 
  Trophy, 
  Clock, 
  Flame, 
  Target, 
  CheckCircle2, 
  Circle, 
  Award, 
  ArrowRight,
  Keyboard,
  PenTool,
  Brush,
  Zap,
  Sparkles,
  BookOpen
} from "lucide-react";
import { 
  getUserStats, 
  getAchievements, 
  getKanaMastery, 
  getHistory,
  UserStats, 
  Achievement, 
  QuizSession 
} from "@/lib/storage";
import { BASIC_KANA } from "@/data/kanaData";

export default function ProgressPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [mastery, setMastery] = useState<Record<string, boolean>>({});
  const [history, setHistory] = useState<QuizSession[]>([]);

  useEffect(() => {
    setStats(getUserStats());
    setAchievements(getAchievements());
    setMastery(getKanaMastery());
    setHistory(getHistory());
  }, []);

  const totalMastered = Object.values(mastery).filter(Boolean).length;
  const masteryPercent = Math.round((totalMastered / BASIC_KANA.length) * 100);

  const typingSessions = history.filter((s) => s.testType === "typing");
  const drawHiraSessions = history.filter((s) => s.testType === "draw-hiragana");
  const drawKataSessions = history.filter((s) => s.testType === "draw-katakana");

  const avgTyping = typingSessions.length
    ? Math.round(typingSessions.reduce((a, b) => a + b.score, 0) / typingSessions.length)
    : 0;
  const avgDrawHira = drawHiraSessions.length
    ? Math.round(drawHiraSessions.reduce((a, b) => a + b.score, 0) / drawHiraSessions.length)
    : 0;
  const avgDrawKata = drawKataSessions.length
    ? Math.round(drawKataSessions.reduce((a, b) => a + b.score, 0) / drawKataSessions.length)
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#293C3A] tracking-tight">
          Statistik & Progres Belajar (成長)
        </h1>
        <p className="text-sm text-[#6F7775]">
          Pantau perkembangan hafalan huruf kana dan pencapaian latihanmu dari waktu ke waktu.
        </p>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0EF] flex items-center justify-center text-rose-500">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6F7775] uppercase">Total Tes</p>
            <p className="text-2xl font-black text-[#293C3A] mt-0.5">
              {stats?.totalSessions || 0} Sesi
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D9EFEC] flex items-center justify-center text-[#377770]">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6F7775] uppercase">Rata-Rata Skor</p>
            <p className="text-2xl font-black text-[#293C3A] mt-0.5">
              {stats?.averageScore || 0}%
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6F7775] uppercase">Skor Tertinggi</p>
            <p className="text-2xl font-black text-[#293C3A] mt-0.5">
              {stats?.bestScore || 0}%
            </p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Flame className="w-6 h-6 fill-orange-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#6F7775] uppercase">Streak Hari Ini</p>
            <p className="text-2xl font-black text-[#293C3A] mt-0.5">
              {stats?.currentStreak || 1} Hari
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown per Jenis Kuis */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs space-y-5">
        <h2 className="text-lg font-bold text-[#293C3A]">
          Performa Berdasarkan Jenis Kuis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Typing Quiz */}
          <div className="p-5 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#293C3A] text-sm flex items-center gap-2">
                <Keyboard className="w-4 h-4 text-[#55A9A0]" />
                <span>Kuis Mengetik</span>
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#D9EFEC] text-[#377770]">
                {typingSessions.length} Sesi
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#6F7775]">
                <span>Rata-Rata Skor</span>
                <span className="font-bold text-[#293C3A]">{avgTyping}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-gray-100">
                <div 
                  className="h-full bg-[#55A9A0] rounded-full" 
                  style={{ width: `${avgTyping}%` }} 
                />
              </div>
            </div>

            <Link
              href="/quiz/typing"
              className="text-xs font-bold text-[#55A9A0] hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Latihan Mengetik</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Draw Hiragana */}
          <div className="p-5 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#293C3A] text-sm flex items-center gap-2">
                <PenTool className="w-4 h-4 text-rose-500" />
                <span>Gambar Hiragana</span>
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FFF0EF] text-rose-600">
                {drawHiraSessions.length} Sesi
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#6F7775]">
                <span>Rata-Rata Skor</span>
                <span className="font-bold text-[#293C3A]">{avgDrawHira}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-gray-100">
                <div 
                  className="h-full bg-rose-400 rounded-full" 
                  style={{ width: `${avgDrawHira}%` }} 
                />
              </div>
            </div>

            <Link
              href="/quiz/draw-hiragana"
              className="text-xs font-bold text-rose-500 hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Latihan Hiragana</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Draw Katakana */}
          <div className="p-5 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#293C3A] text-sm flex items-center gap-2">
                <PenTool className="w-4 h-4 text-[#377770]" />
                <span>Gambar Katakana</span>
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#D9EFEC] text-[#377770]">
                {drawKataSessions.length} Sesi
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#6F7775]">
                <span>Rata-Rata Skor</span>
                <span className="font-bold text-[#293C3A]">{avgDrawKata}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white overflow-hidden border border-gray-100">
                <div 
                  className="h-full bg-[#377770] rounded-full" 
                  style={{ width: `${avgDrawKata}%` }} 
                />
              </div>
            </div>

            <Link
              href="/quiz/draw-katakana"
              className="text-xs font-bold text-[#377770] hover:underline inline-flex items-center gap-1 pt-1"
            >
              <span>Latihan Katakana</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Visual Mastery Grid */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-[#293C3A]">
              Peta Penguasaan Seluruh Karakter Kana (104 Karakter Lengkap)
            </h2>
            <p className="text-xs text-[#6F7775]">
              {totalMastered} dari {BASIC_KANA.length} karakter telah ditandai dikuasai ({masteryPercent}%).
            </p>
          </div>

          <Link
            href="/learn"
            className="text-xs font-bold text-[#55A9A0] hover:underline flex items-center gap-1"
          >
            <span>Buka Tabel Belajar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-4 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1.5 sm:gap-2">
          {BASIC_KANA.map((item) => {
            const isLearned = !!mastery[item.id];
            return (
              <div
                key={item.id}
                title={`${item.romaji.toUpperCase()} - ${item.hiragana} / ${item.katakana}`}
                className={`p-2 rounded-xl border text-center transition-all ${
                  isLearned
                    ? "bg-[#D9EFEC] border-[#55A9A0] text-[#377770]"
                    : "bg-gray-50 border-gray-200 text-gray-400"
                }`}
              >
                <span className="font-japanese font-bold text-lg block">
                  {item.hiragana}
                </span>
                <span className="text-[10px] font-semibold uppercase">
                  {item.romaji}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements / Lencana Pencapaian */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs space-y-5">
        <div>
          <h2 className="text-lg font-bold text-[#293C3A] flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Lencana Pencapaian (Achievements)</span>
          </h2>
          <p className="text-xs text-[#6F7775]">
            Buka lencana penghargaan seiring dengan konsistensi belajarmu di Kana Quest.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => {
            const isUnlocked = !!ach.unlockedAt;
            return (
              <div
                key={ach.id}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all ${
                  isUnlocked
                    ? "bg-[#FFF8F7] border-[#FFDDDD] shadow-xs"
                    : "bg-gray-50/60 border-gray-200 opacity-60"
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-2xs flex items-center justify-center shrink-0">
                  {ach.icon === "sparkles" && <Sparkles className="w-6 h-6 text-amber-500" />}
                  {ach.icon === "zap" && <Zap className="w-6 h-6 text-amber-500" />}
                  {ach.icon === "pen-tool" && <PenTool className="w-6 h-6 text-rose-500" />}
                  {ach.icon === "brush" && <Brush className="w-6 h-6 text-[#55A9A0]" />}
                  {ach.icon === "award" && <Award className="w-6 h-6 text-yellow-500" />}
                  {ach.icon === "flame" && <Flame className="w-6 h-6 text-orange-500 fill-orange-500" />}
                  {ach.icon === "book-open" && <BookOpen className="w-6 h-6 text-[#377770]" />}
                  {!["sparkles", "zap", "pen-tool", "brush", "award", "flame", "book-open"].includes(ach.icon) && (
                    <Award className="w-6 h-6 text-amber-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-[#293C3A] text-sm">
                      {ach.title}
                    </h4>
                    {isUnlocked && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-[#D9EFEC] text-[#377770]">
                        Terbuka
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#6F7775] mt-1 leading-snug">
                    {ach.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
