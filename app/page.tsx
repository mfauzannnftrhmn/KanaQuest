"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Keyboard, 
  PenTool, 
  Brush, 
  Layers, 
  RotateCcw, 
  Flame, 
  Trophy, 
  Target, 
  ArrowRight, 
  Clock, 
  Sparkles,
  CheckCircle2,
  Volume2,
  ChevronRight,
  Play,
  TrendingUp,
  BookOpen,
  Calendar,
  Check,
  AlertCircle
} from "lucide-react";
import { 
  getHistory, 
  getUserStats, 
  getKanaMastery, 
  getMistakes,
  toggleKanaLearned,
  QuizSession, 
  UserStats,
  KanaMistakeItem 
} from "@/lib/storage";
import { BASIC_KANA, KanaItem, speakKana } from "@/data/kanaData";
import KanaDetailModal from "@/components/KanaDetailModal";

export default function DashboardPage() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [history, setHistory] = useState<QuizSession[]>([]);
  const [mastery, setMastery] = useState<Record<string, boolean>>({});
  const [mistakes, setMistakes] = useState<KanaMistakeItem[]>([]);
  const [kanaOfTheDay, setKanaOfTheDay] = useState<KanaItem>(BASIC_KANA[0]);
  const [selectedModalItem, setSelectedModalItem] = useState<KanaItem | null>(null);
  const [modalType, setModalType] = useState<"hiragana" | "katakana">("hiragana");
  
  // Interactive widget states
  const [dayKanaType, setDayKanaType] = useState<"hiragana" | "katakana">("hiragana");
  const [activeStudioTab, setActiveStudioTab] = useState<"typing" | "draw" | "review">("typing");
  const [selectedVowelRow, setSelectedVowelRow] = useState<string>("vowel");
  
  // Real-time time & date greeting
  const [todayDayIndex, setTodayDayIndex] = useState<number>(1);
  const [greetingInfo, setGreetingInfo] = useState({
    japaneseGreeting: "こんにちは",
    romajiGreeting: "Konnichiwa",
    dayJp: "土",
    dateFormatted: "",
  });

  useEffect(() => {
    const s = getUserStats();
    const h = getHistory();
    const m = getKanaMastery();
    const mist = getMistakes();

    setStats(s);
    setHistory(h);
    setMastery(m);
    setMistakes(mist);

    // Pick Kana of the Day deterministically based on date
    const now = new Date();
    setTodayDayIndex(now.getDay());
    const dayOfYear = Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const dayIndex = dayOfYear % BASIC_KANA.length;
    setKanaOfTheDay(BASIC_KANA[dayIndex] || BASIC_KANA[0]);

    // Greeting and Date formatting
    const hour = now.getHours();
    let jGreeting = "こんにちは";
    let rGreeting = "Konnichiwa";
    if (hour >= 4 && hour < 11) {
      jGreeting = "おはようございます";
      rGreeting = "Ohayou gozaimasu";
    } else if (hour >= 18 || hour < 4) {
      jGreeting = "こんばんは";
      rGreeting = "Konbanwa";
    }

    const jpDays = ["日", "月", "火", "水", "木", "金", "土"];
    const idMonths = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const dateFormatted = `${now.getDate()} ${idMonths[now.getMonth()]} ${now.getFullYear()}`;

    setGreetingInfo({
      japaneseGreeting: jGreeting,
      romajiGreeting: rGreeting,
      dayJp: jpDays[now.getDay()],
      dateFormatted,
    });
  }, []);

  const masteredCount = Object.values(mastery).filter(Boolean).length;
  const masteryPercentage = Math.round((masteredCount / BASIC_KANA.length) * 100);
  const dailyTarget = stats?.dailyGoal || 25;
  const todayCount = stats?.todayAnsweredCount || 0;
  const dailyProgress = Math.min(100, Math.round((todayCount / dailyTarget) * 100));

  const recentSessions = history.slice(0, 4);

  // Grouped rows for mini-matrix preview
  const rowTabs = [
    { key: "vowel", label: "A-I-U-E-O (Baris Vokal)" },
    { key: "k", label: "Ka-Ki-Ku-Ke-Ko" },
    { key: "s", label: "Sa-Shi-Su-Se-So" },
    { key: "t", label: "Ta-Chi-Tsu-Te-To" },
    { key: "n", label: "Na-Ni-Nu-Ne-No" },
  ];

  const filteredMatrixKana = BASIC_KANA.filter((k) => k.row === selectedVowelRow);

  // 7-day habit tracker dots (Senin - Minggu)
  const daysOfWeek = [
    { label: "Sen", dayIdx: 1 },
    { label: "Sel", dayIdx: 2 },
    { label: "Rab", dayIdx: 3 },
    { label: "Kam", dayIdx: 4 },
    { label: "Jum", dayIdx: 5 },
    { label: "Sab", dayIdx: 6 },
    { label: "Min", dayIdx: 0 },
  ];

  const handleToggleLearnedModal = (id: string) => {
    toggleKanaLearned(id);
    setMastery(getKanaMastery());
  };

  return (
    <div className="space-y-7 pb-10">
      
      {/* 1. EDITORIAL HEADER & HABIT STRIP */}
      <div className="rounded-3xl bg-white border border-[#FFDDDD]/70 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Soft background watermark */}
        <div className="absolute top-0 right-0 translate-x-12 -translate-y-8 pointer-events-none select-none font-japanese font-black text-8xl text-stone-900/[0.02]">
          日本語
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            {/* Japanese Hanko/Seal + Date indicator */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-rose-50 border border-rose-200/80 text-rose-700 font-bold text-[11px] tracking-wide">
                <span className="font-japanese">日課</span>
                <span className="text-rose-400 font-normal">/</span>
                <span>Hanko Harian</span>
              </span>

              <span className="text-[#6F7775] font-medium flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#55A9A0]" />
                <span>{greetingInfo.dateFormatted}</span>
                <span className="font-japanese text-[#377770] font-semibold">({greetingInfo.dayJp})</span>
              </span>
            </div>

            {/* Personalized greeting & headline */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#55A9A0] animate-pulse" />
                <span className="font-japanese font-bold text-sm text-[#377770]">
                  {greetingInfo.japaneseGreeting}
                </span>
                <span className="text-xs text-[#6F7775]">({greetingInfo.romajiGreeting})</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#293C3A] tracking-tight">
                Studio Latihan Aksara Kana
              </h1>
              <p className="text-xs sm:text-sm text-[#6F7775] max-w-xl">
                Pertajam kecepatan membaca Romaji dan presisi goresan kaligrafi setiap hari.
              </p>
            </div>
          </div>

          {/* 7-Day Habit Tracker Strip */}
          <div className="bg-[#FFF8F7] border border-[#FFDDDD]/70 rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between shrink-0 lg:min-w-[320px]">
            <div className="flex items-center justify-between gap-3 mb-2.5 pb-2 border-b border-[#FFDDDD]/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-orange-100/80 text-orange-600 flex items-center justify-center">
                  <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
                </div>
                <div>
                  <span className="text-xs font-black text-[#293C3A]">
                    Streak {stats?.currentStreak || 1} Hari
                  </span>
                  <span className="block text-[10px] text-[#6F7775]">Konsistensi belajar</span>
                </div>
              </div>

              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#FFDDDD] text-[#377770]">
                {todayCount >= dailyTarget ? "Target Tercapai" : `${dailyTarget - todayCount} lagi`}
              </span>
            </div>

            {/* Weekly Days Bar */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {daysOfWeek.map((d) => {
                const isToday = d.dayIdx === todayDayIndex;
                const isCompleted = isToday ? todayCount >= dailyTarget : false;

                return (
                  <div key={d.label} className="space-y-1">
                    <span className="text-[10px] font-medium text-[#6F7775] block">
                      {d.label}
                    </span>
                    <div
                      className={`h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        isToday
                          ? "ring-2 ring-[#55A9A0] bg-white text-[#293C3A] shadow-xs"
                          : "bg-white/60 text-gray-400 border border-gray-100"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 text-[#55A9A0] stroke-[3]" />
                      ) : isToday ? (
                        <span className="text-[11px] text-[#55A9A0] font-black font-japanese">今</span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. CORE INTERACTION BENTO: Kana of the Day & Studio Station */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Kana of the Day Luxury Calligraphy Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white border border-[#FFDDDD]/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div>
            {/* Card header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#55A9A0]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#293C3A]">
                  Kana Hari Ini &bull; 今日のカナ
                </span>
              </div>
              
              {/* Type Switcher pill */}
              <div className="inline-flex rounded-xl bg-[#FFF8F7] p-0.5 border border-[#FFDDDD]">
                <button
                  type="button"
                  onClick={() => setDayKanaType("hiragana")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dayKanaType === "hiragana"
                      ? "bg-white text-[#293C3A] shadow-2xs"
                      : "text-[#6F7775] hover:text-[#293C3A]"
                  }`}
                >
                  Hiragana
                </button>
                <button
                  type="button"
                  onClick={() => setDayKanaType("katakana")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dayKanaType === "katakana"
                      ? "bg-white text-[#293C3A] shadow-2xs"
                      : "text-[#6F7775] hover:text-[#293C3A]"
                  }`}
                >
                  Katakana
                </button>
              </div>
            </div>

            {/* Genkouyoushi Calligraphy Canvas Aesthetic Tile */}
            <div className="my-5 p-5 rounded-2xl bg-gradient-to-b from-[#FFF8F7] to-[#FFF0EF] border border-[#FFDDDD]/60 relative flex flex-col items-center justify-center">
              {/* Subtle calligraphy grid crosshairs */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                <div className="w-full h-px border-b border-dashed border-[#55A9A0]" />
                <div className="h-full w-px border-r border-dashed border-[#55A9A0] absolute" />
              </div>

              {/* Huge Japanese character */}
              <div className="relative z-10 text-center space-y-1">
                <span className="font-japanese font-black text-7xl sm:text-8xl text-[#293C3A] block select-none tracking-tight leading-none hover:scale-105 transition-transform duration-200">
                  {dayKanaType === "hiragana" ? kanaOfTheDay.hiragana : kanaOfTheDay.katakana}
                </span>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <span className="text-xl font-black text-[#55A9A0] uppercase tracking-wider">
                    {kanaOfTheDay.romaji}
                  </span>
                  <span className="text-gray-300">&bull;</span>
                  <span className="text-xs font-semibold text-[#6F7775]">
                    {kanaOfTheDay.strokes} Goresan
                  </span>
                </div>
              </div>

              {/* Audio button floating on the tile */}
              <button
                type="button"
                onClick={() => speakKana(kanaOfTheDay.hiragana)}
                className="absolute top-3 right-3 p-2.5 rounded-xl bg-white border border-[#FFDDDD] hover:border-[#55A9A0] hover:bg-[#D9EFEC] text-[#377770] shadow-2xs transition-colors cursor-pointer group"
                title="Dengarkan Pengucapan"
              >
                <Volume2 className="w-4 h-4 text-[#55A9A0] group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Context snippet & example word */}
            <div className="space-y-1.5 text-xs bg-white rounded-xl p-3 border border-gray-100">
              <span className="text-[11px] font-bold text-[#6F7775] uppercase tracking-wider block">
                Contoh Kata:
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-japanese font-bold text-base text-[#293C3A]">
                  {kanaOfTheDay.examples[0]?.wordHiragana}
                  <span className="font-sans text-xs font-normal text-[#6F7775] ml-2">
                    ({kanaOfTheDay.examples[0]?.romaji})
                  </span>
                </span>
                <span className="text-xs font-medium text-[#377770]">
                  {kanaOfTheDay.examples[0]?.meaning}
                </span>
              </div>
            </div>
          </div>

          {/* Action triggers */}
          <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => {
                setSelectedModalItem(kanaOfTheDay);
                setModalType(dayKanaType);
              }}
              className="px-3.5 py-2.5 rounded-xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>Latih di Kanvas</span>
            </button>

            <Link
              href="/learn"
              className="px-3.5 py-2.5 rounded-xl bg-[#FFF8F7] hover:bg-[#FFF0EF] border border-[#FFDDDD] text-[#293C3A] font-bold text-xs transition-all flex items-center justify-center gap-1 active:scale-95 text-center cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#55A9A0]" />
              <span>Tabel Lengkap</span>
            </Link>
          </div>
        </div>

        {/* Right: Interactive Studio Launchpad (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white border border-[#FFDDDD]/80 p-6 sm:p-7 shadow-xs flex flex-col justify-between">
          <div className="space-y-5">
            
            {/* Studio Navigation Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
              <div>
                <h2 className="text-base font-black text-[#293C3A] tracking-tight">
                  Pusat Latihan Cepat
                </h2>
                <p className="text-xs text-[#6F7775]">Pilih modul latihan yang ingin kamu jalankan saat ini.</p>
              </div>

              {/* Segmented Control */}
              <div className="inline-flex rounded-xl bg-[#FFF8F7] p-1 border border-[#FFDDDD] self-start sm:self-auto max-w-full overflow-x-auto scrollbar-none">
                <button
                  type="button"
                  onClick={() => setActiveStudioTab("typing")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeStudioTab === "typing"
                      ? "bg-white text-[#293C3A] shadow-xs"
                      : "text-[#6F7775] hover:text-[#293C3A]"
                  }`}
                >
                  <Keyboard className="w-3.5 h-3.5 text-[#55A9A0]" />
                  <span>Mengetik</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStudioTab("draw")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeStudioTab === "draw"
                      ? "bg-white text-[#293C3A] shadow-xs"
                      : "text-[#6F7775] hover:text-[#293C3A]"
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 text-rose-500" />
                  <span>Kanvas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStudioTab("review")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeStudioTab === "review"
                      ? "bg-white text-[#293C3A] shadow-xs"
                      : "text-[#6F7775] hover:text-[#293C3A]"
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                  <span>Review ({mistakes.length})</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT 1: TYPING ARENA */}
            {activeStudioTab === "typing" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#55A9A0] uppercase tracking-wider">
                      Speed Typing Arena &bull; 25 Soal Acak
                    </span>
                    <h3 className="text-base font-bold text-[#293C3A]">
                      Uji Refleks Keyboard Romaji
                    </h3>
                    <p className="text-xs text-[#6F7775] leading-relaxed max-w-sm">
                      Karakter muncul di layar tanpa terjemahan. Ketik Romajinya secepat mungkin (misal: <em>shi / si</em>).
                    </p>
                  </div>

                  {/* Mechanical Keycap visual accents */}
                  <div className="flex items-center gap-1.5 self-center sm:self-auto">
                    {["A", "K", "S", "T"].map((k) => (
                      <div
                        key={k}
                        className="w-8 h-8 rounded-lg bg-white border border-stone-200 shadow-2xs flex items-center justify-center font-mono font-black text-xs text-[#293C3A] select-none"
                      >
                        {k}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct quick launch buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Link
                    href="/quiz/typing"
                    className="p-3.5 rounded-2xl bg-white border border-[#FFDDDD] hover:border-[#55A9A0] hover:bg-[#D9EFEC]/30 transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-japanese font-black text-xl text-[#55A9A0] group-hover:scale-110 transition-transform">
                        あ
                      </span>
                      <span className="text-[10px] font-semibold text-[#6F7775]">25 Soal</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#293C3A] block">Hiragana</span>
                      <span className="text-[10px] text-[#6F7775]">46 Karakter Dasar</span>
                    </div>
                  </Link>

                  <Link
                    href="/quiz/typing"
                    className="p-3.5 rounded-2xl bg-white border border-[#FFDDDD] hover:border-[#55A9A0] hover:bg-[#D9EFEC]/30 transition-all flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-japanese font-black text-xl text-[#377770] group-hover:scale-110 transition-transform">
                        ア
                      </span>
                      <span className="text-[10px] font-semibold text-[#6F7775]">25 Soal</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#293C3A] block">Katakana</span>
                      <span className="text-[10px] text-[#6F7775]">46 Karakter Dasar</span>
                    </div>
                  </Link>

                  <Link
                    href="/quiz/typing"
                    className="p-3.5 rounded-2xl bg-gradient-to-br from-[#55A9A0] to-[#47928a] text-white transition-all flex flex-col justify-between group shadow-sm cursor-pointer hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Sparkles className="w-4 h-4 text-white/90 group-hover:rotate-12 transition-transform" />
                      <span className="text-[10px] font-semibold text-white/80">Campuran</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Mulai Kuis Cepat</span>
                      <span className="text-[10px] text-white/80">Mode Campuran Acak</span>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: DRAWING CANVAS */}
            {activeStudioTab === "draw" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-[#FFF0EF] border border-[#FFDDDD]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">
                      Kanvas Kaligrafi &bull; Algoritma IoU
                    </span>
                    <h3 className="text-base font-bold text-[#293C3A]">
                      Evaluasi Bentuk & Urutan Goresan
                    </h3>
                    <p className="text-xs text-[#6F7775] leading-relaxed max-w-sm">
                      Goreskan jarimu atau kursor mouse pada kanvas. Dapatkan evaluasi kemiripan bentuk karakter secara presisi.
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-white border border-[#FFDDDD] flex items-center justify-center text-rose-500 shadow-2xs self-center sm:self-auto">
                    <Brush className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    href="/quiz/draw-hiragana"
                    className="p-4 rounded-2xl bg-white border border-[#FFDDDD] hover:border-rose-400 hover:bg-rose-50/40 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="font-japanese font-black text-2xl text-rose-500 block">
                        ひらがな
                      </span>
                      <span className="text-xs font-bold text-[#293C3A] block">
                        Studio Gambar Hiragana
                      </span>
                      <span className="text-[11px] text-[#6F7775]">25 Soal &bull; Maks 3 percobaan</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6F7775] group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                  </Link>

                  <Link
                    href="/quiz/draw-katakana"
                    className="p-4 rounded-2xl bg-white border border-[#FFDDDD] hover:border-[#55A9A0] hover:bg-[#D9EFEC]/40 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="font-japanese font-black text-2xl text-[#377770] block">
                        カタカナ
                      </span>
                      <span className="text-xs font-bold text-[#293C3A] block">
                        Studio Gambar Katakana
                      </span>
                      <span className="text-[11px] text-[#6F7775]">25 Soal &bull; Maks 3 percobaan</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6F7775] group-hover:text-[#55A9A0] group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: SPACED REPETITION & REVIEW */}
            {activeStudioTab === "review" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {mistakes.length === 0 ? (
                  <div className="p-6 text-center rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/70 space-y-2">
                    <div className="w-10 h-10 rounded-full bg-[#D9EFEC] text-[#377770] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#293C3A]">Semua Karakter Terkuasai Baik!</p>
                    <p className="text-[11px] text-[#6F7775] max-w-sm mx-auto">
                      Belum ada karakter yang tercatat keliru pada sesi kuis. Ikuti kuis mengetik atau gambar untuk menguji daya ingatmu.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-amber-900">
                          {mistakes.length} Karakter Perlu Penguatan Hafalan
                        </span>
                      </div>
                      <Link
                        href="/review"
                        className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
                      >
                        <span>Buka Studio Review</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Chips of weak kana */}
                    <div className="flex flex-wrap items-center gap-2">
                      {mistakes.slice(0, 8).map((m) => (
                        <div
                          key={m.kana}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#FFDDDD] shadow-2xs flex items-center gap-2 text-xs"
                        >
                          <span className="font-japanese font-black text-sm text-[#293C3A]">{m.kana}</span>
                          <span className="font-mono text-[10px] text-[#6F7775] uppercase">{m.romaji}</span>
                          <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.2 rounded-md">
                            {m.timesWrong}x keliru
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Quick Deck link */}
          <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-xs text-[#6F7775]">
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Flashcard 3D tersedia untuk menghafal santai</span>
            </span>
            <Link href="/flashcards" className="font-bold text-[#55A9A0] hover:underline flex items-center gap-1">
              <span>Buka Flashcard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* 3. INTERACTIVE MINI KANA MATRIX (Visual Mastery & Soundboard) */}
      <div className="rounded-3xl bg-white border border-[#FFDDDD]/80 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-[#293C3A] tracking-tight">
                Matriks Aksara & Audio Soundboard
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D9EFEC] text-[#377770]">
                {masteredCount} / 46 Dikuasai
              </span>
            </div>
            <p className="text-xs text-[#6F7775]">
              Klik pada karakter untuk memutar pengucapan atau membuka panduan goresan.
            </p>
          </div>

          {/* Row group selector pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {rowTabs.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setSelectedVowelRow(r.key)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedVowelRow === r.key
                    ? "bg-[#55A9A0] text-white shadow-2xs font-bold"
                    : "bg-[#FFF8F7] text-[#6F7775] hover:text-[#293C3A] border border-[#FFDDDD]"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Characters Grid */}
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-3 pt-2">
          {filteredMatrixKana.map((item) => {
            const isLearned = !!mastery[item.id];

            return (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/70 hover:border-[#55A9A0] hover:bg-white transition-all flex flex-col justify-between group shadow-2xs relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#55A9A0] uppercase">
                    {item.romaji}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLearnedModal(item.id);
                    }}
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] transition-colors cursor-pointer ${
                      isLearned ? "bg-[#55A9A0] text-white" : "border border-gray-300 text-transparent hover:border-[#55A9A0]"
                    }`}
                    title={isLearned ? "Sudah Dikuasai" : "Tandai Dikuasai"}
                  >
                    <Check className="w-3 h-3 stroke-[3]" />
                  </button>
                </div>

                <div className="my-2 flex items-center justify-around py-1">
                  <span className="font-japanese font-black text-3xl text-[#293C3A] group-hover:scale-110 transition-transform">
                    {item.hiragana}
                  </span>
                  <span className="text-gray-300">/</span>
                  <span className="font-japanese font-bold text-2xl text-[#377770]">
                    {item.katakana}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-gray-100 text-[11px]">
                  <button
                    type="button"
                    onClick={() => speakKana(item.hiragana)}
                    className="text-[#55A9A0] hover:text-[#377770] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Audio</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedModalItem(item);
                      setModalType("hiragana");
                    }}
                    className="text-[#6F7775] hover:text-[#293C3A] font-medium cursor-pointer"
                  >
                    Detail
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. REFINED TACTILE HUD STRIP (3 Intentional Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Metric 1: Target Harian */}
        <div className="p-5 rounded-3xl bg-white border border-[#FFDDDD]/80 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F7775] uppercase tracking-wider">
              Target Soal Harian
            </span>
            <Target className="w-4 h-4 text-[#55A9A0]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#293C3A]">
                {todayCount} <span className="text-xs font-normal text-gray-400">/ {dailyTarget} soal</span>
              </span>
              <span className="text-xs font-bold text-[#55A9A0]">{dailyProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#FFF0EF] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#55A9A0] to-[#71C5BC] rounded-full transition-all duration-500"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-[#6F7775]">
            {todayCount >= dailyTarget ? "🎉 Target hari ini sudah selesai!" : `Selesaikan ${dailyTarget - todayCount} soal lagi hari ini.`}
          </p>
        </div>

        {/* Metric 2: Akurasi & Total Tes */}
        <div className="p-5 rounded-3xl bg-white border border-[#FFDDDD]/80 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F7775] uppercase tracking-wider">
              Performa & Akurasi
            </span>
            <TrendingUp className="w-4 h-4 text-[#377770]" />
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-black text-[#293C3A]">
                {stats?.averageScore || 0}%
              </span>
              <span className="text-xs text-[#6F7775] ml-1.5">Rata-rata</span>
            </div>
            <span className="text-xs font-bold text-[#55A9A0] bg-[#D9EFEC] px-2 py-0.5 rounded-full">
              Top: {stats?.bestScore || 0}%
            </span>
          </div>
          <p className="text-[11px] text-[#6F7775]">
            Tercatat dari <strong>{stats?.totalSessions || 0}</strong> sesi tes yang telah diselesaikan.
          </p>
        </div>

        {/* Metric 3: Penguasaan Huruf */}
        <div className="p-5 rounded-3xl bg-white border border-[#FFDDDD]/80 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#6F7775] uppercase tracking-wider">
              Total Penguasaan
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#55A9A0]" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-[#293C3A]">
                {masteredCount} <span className="text-xs font-normal text-gray-400">/ 46 Huruf</span>
              </span>
              <span className="text-xs font-bold text-[#377770]">{masteryPercentage}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#FFF0EF] overflow-hidden">
              <div 
                className="h-full bg-[#55A9A0] rounded-full transition-all duration-500"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-[#6F7775]">
            {masteredCount === 46 ? "👑 Sempurna! Semua kana dasar telah dikuasai." : `${46 - masteredCount} karakter lagi menuju penguasaan penuh.`}
          </p>
        </div>

      </div>

      {/* 5. RECENT ACTIVITY JOURNEY */}
      <div className="rounded-3xl bg-white border border-[#FFDDDD]/80 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-black text-[#293C3A] tracking-tight">
              Riwayat Sesi Tes Terakhir
            </h2>
            <p className="text-xs text-[#6F7775]">
              Hasil evaluasi kuis tersimpan di perangkatmu.
            </p>
          </div>

          <Link
            href="/history"
            className="text-xs font-bold text-[#55A9A0] hover:underline flex items-center gap-1"
          >
            <span>Semua Riwayat ({history.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentSessions.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD]/60 space-y-2">
            <p className="font-bold text-[#293C3A] text-xs">Belum ada tes yang selesai.</p>
            <p className="text-[11px] text-[#6F7775] max-w-sm mx-auto">
              Selesaikan salah satu kuis mengetik cepat atau kanvas kaligrafi untuk mencatat progres skormu.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentSessions.map((session) => {
              const typeNames: Record<string, string> = {
                typing: "Kuis Mengetik Cepat",
                "draw-hiragana": "Kanvas Hiragana",
                "draw-katakana": "Kanvas Katakana",
              };
              const isHigh = session.score >= 80;

              return (
                <div
                  key={session.id}
                  className="py-3.5 first:pt-1 last:pb-1 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                        isHigh
                          ? "bg-[#D9EFEC] text-[#377770]"
                          : "bg-[#FFF0EF] text-rose-600"
                      }`}
                    >
                      {session.score}%
                    </div>
                    <div>
                      <p className="font-bold text-[#293C3A]">
                        {typeNames[session.testType] || session.testType}
                        <span className="font-normal text-gray-400 capitalize ml-1.5">
                          ({session.testMode})
                        </span>
                      </p>
                      <p className="text-[11px] text-[#6F7775]">
                        {session.dateFormatted} &bull; {session.correctAnswers} dari {session.totalQuestions} Benar
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/history"
                    className="text-xs font-semibold text-[#55A9A0] hover:underline flex items-center gap-0.5"
                  >
                    <span>Rincian</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DETAIL MODAL (WHEN A KANA IS CLICKED) */}
      {selectedModalItem && (
        <KanaDetailModal
          item={selectedModalItem}
          activeType={modalType}
          isLearned={!!mastery[selectedModalItem.id]}
          onToggleLearned={handleToggleLearnedModal}
          onClose={() => setSelectedModalItem(null)}
        />
      )}

    </div>
  );
}
