"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  Search, 
  Volume2, 
  CheckCircle2, 
  Circle, 
  BookOpen, 
  Layers, 
  Check, 
  HelpCircle, 
  RotateCcw, 
  Shuffle, 
  ArrowRight, 
  ArrowLeft,
  Trophy,
  Filter,
  Flame,
  Award,
  ChevronRight
} from "lucide-react";
import confetti from "canvas-confetti";
import { 
  VOCABULARY_LIST, 
  VOCAB_CATEGORIES, 
  VocabularyItem 
} from "@/data/vocabularyData";
import { speakKana } from "@/data/kanaData";
import { getVocabMastery, toggleVocabLearned } from "@/lib/storage";

type StudyMode = "browse" | "flashcard" | "quiz";

export default function VocabularyPage() {
  const [activeMode, setActiveMode] = useState<StudyMode>("browse");
  const [activeType, setActiveType] = useState<"all" | "hiragana" | "katakana">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyUnlearned, setOnlyUnlearned] = useState(false);
  const [mastery, setMastery] = useState<Record<string, boolean>>({});

  // Flashcard states
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mini Quiz states
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<{
    item: VocabularyItem;
    options: string[];
    correctAnswer: string;
  }[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizSelectedAnswer, setQuizSelectedAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    setMastery(getVocabMastery());
  }, []);

  const handleToggleMastery = (id: string) => {
    toggleVocabLearned(id);
    setMastery(getVocabMastery());
  };

  // Filtered Vocabulary items
  const filteredVocab = useMemo(() => {
    return VOCABULARY_LIST.filter((item) => {
      // Type filter
      if (activeType !== "all" && item.type !== activeType) return false;
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      // Mastery filter
      if (onlyUnlearned && mastery[item.id]) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchWord = item.word.toLowerCase().includes(q);
        const matchRomaji = item.romaji.toLowerCase().includes(q);
        const matchMeaning = item.meaning.toLowerCase().includes(q);
        const matchKanji = item.kanji?.toLowerCase().includes(q);
        if (!matchWord && !matchRomaji && !matchMeaning && !matchKanji) {
          return false;
        }
      }
      return true;
    });
  }, [activeType, selectedCategory, onlyUnlearned, searchQuery, mastery]);

  // Flashcard deck
  const flashcardDeck = filteredVocab;
  const currentCard = flashcardDeck[cardIndex] || flashcardDeck[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev + 1) % (flashcardDeck.length || 1));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCardIndex((prev) => (prev - 1 + flashcardDeck.length) % (flashcardDeck.length || 1));
  };

  const handleShuffleDeck = () => {
    setIsFlipped(false);
    setCardIndex(Math.floor(Math.random() * (flashcardDeck.length || 1)));
  };

  // Mini Quiz Engine
  const startQuiz = () => {
    const pool = filteredVocab.length >= 4 ? filteredVocab : VOCABULARY_LIST;
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, 10);

    const questions = shuffled.map((target) => {
      // Pick 3 distractors
      const distractors = pool
        .filter((i) => i.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((i) => i.meaning);

      const options = [target.meaning, ...distractors].sort(() => 0.5 - Math.random());

      return {
        item: target,
        options,
        correctAnswer: target.meaning,
      };
    });

    setQuizQuestions(questions);
    setQuizIndex(0);
    setQuizSelectedAnswer(null);
    setQuizScore(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  const handleAnswerQuiz = (selected: string) => {
    if (quizSelectedAnswer !== null) return;
    setQuizSelectedAnswer(selected);

    const currentQ = quizQuestions[quizIndex];
    const isCorrect = selected === currentQ.correctAnswer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (quizIndex + 1 < quizQuestions.length) {
        setQuizIndex((prev) => prev + 1);
        setQuizSelectedAnswer(null);
      } else {
        setQuizFinished(true);
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
            colors: ["#55A9A0", "#FFDDDD", "#FFB6B6", "#D9EFEC"],
          });
        } catch (e) {}
      }
    }, 1100);
  };

  const totalLearned = Object.values(mastery).filter(Boolean).length;
  const progressPercent = Math.round((totalLearned / VOCABULARY_LIST.length) * 100);

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-300 pb-10">
      
      {/* 1. EDITORIAL HEADER & VOCAB MASTERY HUD */}
      <div className="rounded-3xl bg-white border border-[#FFDDDD]/70 p-5 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="absolute top-0 right-0 translate-x-10 -translate-y-6 pointer-events-none select-none font-japanese font-black text-8xl text-stone-900/[0.02]">
          単語
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-teal-50 border border-teal-200/80 text-[#377770] font-bold text-[11px] tracking-wide">
                <span className="font-japanese">単語学習</span>
                <span className="text-teal-400 font-normal">/</span>
                <span>Kosakata Praktis</span>
              </span>
              <span className="text-xs text-[#6F7775]">
                {VOCABULARY_LIST.length} Kosakata Terpilih
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#293C3A] tracking-tight">
              Hafalan Kosakata Hiragana & Katakana
            </h1>
            <p className="text-xs sm:text-sm text-[#6F7775] max-w-xl">
              Perkaya perbendaharaan kata Jepang melalui katalog bertema, latihan kartu memori 3D, dan kuis cepat pengingat arti.
            </p>
          </div>

          {/* Progress Card */}
          <div className="bg-[#FFF8F7] border border-[#FFDDDD]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shrink-0 lg:min-w-[300px]">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs font-bold text-[#6F7775] uppercase tracking-wider">
                Progres Penguasaan
              </span>
              <span className="text-xs font-black text-[#377770] bg-[#D9EFEC] px-2 py-0.5 rounded-full">
                {progressPercent}%
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between text-xs">
                <span className="font-black text-xl text-[#293C3A]">
                  {totalLearned} <span className="text-xs font-normal text-gray-400">/ {VOCABULARY_LIST.length} kata</span>
                </span>
                <span className="text-[11px] text-[#6F7775]">
                  {VOCABULARY_LIST.length - totalLearned} tersisa
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#FFF0EF] overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#55A9A0] to-[#71C5BC] rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* STUDY MODE TABS */}
        <div className="relative z-10 pt-5 mt-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-2xl bg-[#FFF8F7] p-1 border border-[#FFDDDD] max-w-full overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveMode("browse")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeMode === "browse"
                  ? "bg-[#55A9A0] text-white shadow-xs"
                  : "text-[#6F7775] hover:text-[#293C3A]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Daftar Kosakata ({filteredVocab.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode("flashcard")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeMode === "flashcard"
                  ? "bg-[#55A9A0] text-white shadow-xs"
                  : "text-[#6F7775] hover:text-[#293C3A]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcard 3D</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode("quiz");
                if (!quizStarted) startQuiz();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeMode === "quiz"
                  ? "bg-[#55A9A0] text-white shadow-xs"
                  : "text-[#6F7775] hover:text-[#293C3A]"
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Kuis Cepat (10 Soal)</span>
            </button>
          </div>

          <div className="text-xs text-[#6F7775]">
            Dilengkapi audio pelafalan asli & contoh kalimat
          </div>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Type Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#FFDDDD]/70 shadow-2xs">
          {[
            { id: "all", label: "Semua Aksara" },
            { id: "hiragana", label: "Hiragana Saja (和語)" },
            { id: "katakana", label: "Katakana Saja (外来語)" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveType(t.id as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeType === t.id
                  ? "bg-[#55A9A0] text-white shadow-2xs"
                  : "text-[#6F7775] hover:text-[#293C3A] hover:bg-[#FFF8F7]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search bar & Unlearned Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata, romaji, atau arti..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#FFDDDD] rounded-xl text-xs text-[#293C3A] focus:outline-none focus:ring-2 focus:ring-[#55A9A0]"
            />
          </div>

          {/* Only unlearned toggle */}
          <button
            type="button"
            onClick={() => setOnlyUnlearned(!onlyUnlearned)}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              onlyUnlearned
                ? "bg-[#D9EFEC] border-[#55A9A0] text-[#377770]"
                : "bg-white border-[#FFDDDD] text-[#6F7775] hover:bg-[#FFF8F7]"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{onlyUnlearned ? "Hanya Belum Hafal" : "Semua Status"}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Horizontal Scroll */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {VOCAB_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setSelectedCategory(cat.key)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat.key
                ? "bg-[#377770] text-white shadow-2xs font-bold"
                : "bg-white text-[#6F7775] hover:text-[#293C3A] border border-[#FFDDDD]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 3. MODE CONTENT */}
      
      {/* MODE 1: BROWSE CATALOG GRID */}
      {activeMode === "browse" && (
        <div className="space-y-4">
          {filteredVocab.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#FFDDDD]/60 space-y-3">
              <BookOpen className="w-8 h-8 text-gray-300 mx-auto" />
              <h3 className="font-bold text-[#293C3A] text-base">Tidak Ada Kosakata yang Cocok</h3>
              <p className="text-xs text-[#6F7775] max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau sesuaikan filter aksara dan kategori.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveType("all");
                  setSelectedCategory("all");
                  setOnlyUnlearned(false);
                }}
                className="px-4 py-2 rounded-xl bg-[#55A9A0] text-white text-xs font-bold"
              >
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredVocab.map((item) => {
                const isLearned = !!mastery[item.id];

                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-[#FFDDDD]/80 shadow-xs hover:border-[#55A9A0]/60 transition-all card-hover flex flex-col justify-between space-y-3 relative group"
                  >
                    <div>
                      {/* Top Bar: Category badge, Type, and Learned Toggle */}
                      <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF0EF] text-[#55A9A0] border border-[#FFDDDD]/60">
                          {item.categoryName}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleToggleMastery(item.id)}
                            className={`p-1 rounded-md transition-colors cursor-pointer ${
                              isLearned
                                ? "text-[#55A9A0]"
                                : "text-gray-300 hover:text-gray-400"
                            }`}
                            title={isLearned ? "Sudah Dihafal" : "Tandai Sudah Dihafal"}
                          >
                            {isLearned ? (
                              <CheckCircle2 className="w-4 h-4 fill-[#D9EFEC]" />
                            ) : (
                              <Circle className="w-4 h-4" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => speakKana(item.word)}
                            className="p-1 rounded-md text-[#55A9A0] hover:bg-[#D9EFEC] transition-colors cursor-pointer"
                            title="Dengarkan Pelafalan"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Main Word Display */}
                      <div className="pt-3 pb-1 flex items-baseline justify-between gap-3">
                        <div>
                          <span className="font-japanese font-black text-2xl sm:text-3xl text-[#293C3A] block tracking-tight leading-snug group-hover:text-[#55A9A0] transition-colors">
                            {item.word}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#55A9A0] uppercase tracking-wide">
                            {item.romaji}
                          </span>
                        </div>

                        {item.kanji && (
                          <span className="font-japanese text-xs font-bold px-2 py-0.5 rounded-lg bg-stone-50 border border-stone-200 text-stone-600">
                            {item.kanji}
                          </span>
                        )}
                      </div>

                      {/* Meaning Indonesian */}
                      <p className="text-xs font-bold text-[#293C3A] mt-1">
                        {item.meaning}
                      </p>
                    </div>

                    {/* Example sentence snippet */}
                    {item.exampleSentence && (
                      <div className="pt-2.5 border-t border-gray-100 text-[11px] space-y-0.5 bg-[#FFF8F7] p-2.5 rounded-xl">
                        <p className="font-japanese text-[#293C3A] font-medium leading-relaxed">
                          {item.exampleSentence.japanese}
                        </p>
                        <p className="text-[#6F7775]">
                          {item.exampleSentence.meaning}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: FLASHCARD 3D DECK */}
      {activeMode === "flashcard" && (
        <div className="max-w-xl mx-auto space-y-4">
          {flashcardDeck.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-white border border-[#FFDDDD] space-y-3">
              <p className="font-bold text-[#293C3A] text-sm">Tidak ada kartu dalam filter ini.</p>
              <button
                type="button"
                onClick={() => setOnlyUnlearned(false)}
                className="px-4 py-2 rounded-xl bg-[#55A9A0] text-white text-xs font-bold"
              >
                Tampilkan Semua Kosakata
              </button>
            </div>
          ) : (
            <>
              {/* Counter & Action */}
              <div className="flex items-center justify-between text-xs font-semibold text-[#6F7775] px-2">
                <span>Kartu ke-{cardIndex + 1} dari {flashcardDeck.length}</span>
                <span className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleShuffleDeck}
                    className="flex items-center gap-1 text-[#55A9A0] hover:underline cursor-pointer"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Acak</span>
                  </button>
                  <span>&bull;</span>
                  <span>{currentCard?.categoryName}</span>
                </span>
              </div>

              {/* 3D Flip Card Container */}
              <div className="perspective-1000 w-full min-h-[320px] select-none cursor-pointer">
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className={`relative w-full h-[320px] rounded-3xl shadow-sm hover:shadow-md transition-transform duration-500 transform-style-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* FRONT FACE (Kata dalam Aksara Jepang) */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-white via-[#FFF8F7] to-[#FFF0EF] border-2 border-[#FFDDDD] p-7 flex flex-col justify-between items-center text-center">
                    <div className="w-full flex items-center justify-between text-xs text-[#6F7775]">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#D9EFEC] text-[#377770]">
                        {currentCard?.type === "hiragana" ? "Hiragana" : "Katakana"}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-gray-400">
                        <HelpCircle className="w-3.5 h-3.5" /> Ketuk kartu untuk membalik
                      </span>
                    </div>

                    <div className="my-auto space-y-2">
                      <span className="font-japanese font-black text-5xl sm:text-6xl text-[#293C3A] block tracking-tight">
                        {currentCard?.word}
                      </span>
                      {currentCard?.kanji && (
                        <span className="font-japanese text-sm font-semibold text-[#6F7775]">
                          (Kanji: {currentCard.kanji})
                        </span>
                      )}
                    </div>

                    <div className="w-full flex items-center justify-between pt-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleMastery(currentCard.id);
                        }}
                        className={`text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                          mastery[currentCard?.id] ? "text-[#55A9A0]" : "text-gray-400 hover:text-gray-600"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{mastery[currentCard?.id] ? "Sudah Dihafal" : "Tandai Hafal"}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakKana(currentCard.word);
                        }}
                        className="p-2 rounded-xl bg-white border border-[#FFDDDD] text-[#55A9A0] hover:bg-[#D9EFEC] transition-colors cursor-pointer"
                        title="Dengarkan pengucapan"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* BACK FACE (Romaji, Arti, & Contoh) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-[#FFF0EF] via-white to-[#D9EFEC]/40 border-2 border-[#55A9A0] p-7 flex flex-col justify-between items-center text-center">
                    <div className="w-full flex items-center justify-between text-xs text-[#55A9A0] font-bold">
                      <span>Arti & Pelafalan</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakKana(currentCard.word);
                        }}
                        className="p-1.5 rounded-full bg-white border border-[#55A9A0]/30 text-[#377770]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="my-auto space-y-2">
                      <span className="text-3xl font-black text-[#293C3A] block">
                        {currentCard?.meaning}
                      </span>
                      <p className="font-mono text-base font-bold text-[#55A9A0] uppercase">
                        {currentCard?.romaji}
                      </p>
                      {currentCard?.exampleSentence && (
                        <div className="pt-2 text-xs text-[#6F7775] max-w-sm mx-auto">
                          <p className="font-japanese text-[#293C3A] font-semibold">
                            {currentCard.exampleSentence.japanese}
                          </p>
                          <p className="text-[11px]">{currentCard.exampleSentence.meaning}</p>
                        </div>
                      )}
                    </div>

                    <span className="text-[11px] text-gray-400">
                      Ketuk lagi untuk kembali ke depan
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrevCard}
                  className="flex-1 py-3 px-4 rounded-2xl bg-white hover:bg-[#FFF0EF] border border-[#FFDDDD] font-bold text-xs text-[#293C3A] shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="px-5 py-3 rounded-2xl bg-[#D9EFEC] text-[#377770] font-bold text-xs shadow-xs hover:bg-[#c9e8e4] transition-colors cursor-pointer active:scale-95"
                >
                  Balik Kartu
                </button>

                <button
                  type="button"
                  onClick={handleNextCard}
                  className="flex-1 py-3 px-4 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <span>Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* MODE 3: SPEED MINI QUIZ */}
      {activeMode === "quiz" && (
        <div className="max-w-xl mx-auto space-y-5">
          {!quizStarted ? (
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#FFDDDD] text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-[#D9EFEC] text-[#377770] mx-auto flex items-center justify-center shadow-2xs">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#293C3A]">
                  Kuis Cepat Kosakata (10 Soal)
                </h3>
                <p className="text-xs text-[#6F7775] max-w-sm mx-auto mt-1">
                  Uji daya ingat arti kosakata bahasa Jepangmu dengan 10 pertanyaan pilihan ganda acak.
                </p>
              </div>
              <button
                type="button"
                onClick={startQuiz}
                className="px-6 py-3 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Mulai Sesi Kuis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : quizFinished ? (
            /* Quiz Result Screen */
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-[#FFF8F7] to-[#FFF0EF] border border-[#FFDDDD] text-center space-y-5 shadow-sm animate-in fade-in">
              <div className="w-16 h-16 rounded-3xl bg-white border border-[#FFDDDD] text-amber-500 mx-auto flex items-center justify-center shadow-xs">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#55A9A0]">
                  Sesi Kuis Selesai!
                </span>
                <h3 className="text-3xl font-black text-[#293C3A] mt-1">
                  Skor: {quizScore * 10}%
                </h3>
                <p className="text-xs text-[#6F7775] mt-1">
                  Kamu berhasil menjawab benar <strong>{quizScore}</strong> dari 10 soal kosakata.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={startQuiz}
                  className="px-5 py-2.5 rounded-2xl bg-[#55A9A0] text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Main Lagi</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("browse")}
                  className="px-5 py-2.5 rounded-2xl bg-white border border-[#FFDDDD] text-[#293C3A] font-bold text-xs shadow-xs hover:bg-gray-50 cursor-pointer"
                >
                  Kembali ke Daftar
                </button>
              </div>
            </div>
          ) : (
            /* Active Question Card */
            <div className="space-y-4 animate-in fade-in">
              {/* Question Header */}
              <div className="flex items-center justify-between text-xs p-3.5 bg-white rounded-2xl border border-[#FFDDDD]/70 shadow-xs">
                <span className="font-bold text-[#55A9A0]">
                  Soal {quizIndex + 1} dari {quizQuestions.length}
                </span>
                <span className="font-semibold text-[#6F7775]">
                  Skor Sementara: {quizScore}
                </span>
              </div>

              {/* Character Prompt Box */}
              <div className="p-7 rounded-3xl bg-white border border-[#FFDDDD] text-center space-y-2 shadow-xs relative">
                <button
                  type="button"
                  onClick={() => speakKana(quizQuestions[quizIndex]?.item.word)}
                  className="absolute top-3.5 right-3.5 p-2 rounded-xl bg-[#FFF8F7] border border-[#FFDDDD] text-[#55A9A0] hover:bg-[#D9EFEC] transition-colors cursor-pointer"
                  title="Dengarkan pengucapan"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6F7775]">
                  Apa arti dari kata ini?
                </span>
                <h3 className="font-japanese font-black text-5xl sm:text-6xl text-[#293C3A] tracking-tight">
                  {quizQuestions[quizIndex]?.item.word}
                </h3>
                <span className="font-mono text-xs font-bold text-[#55A9A0] uppercase block">
                  [{quizQuestions[quizIndex]?.item.romaji}]
                </span>
              </div>

              {/* 4 Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {quizQuestions[quizIndex]?.options.map((option, idx) => {
                  const isSelected = quizSelectedAnswer === option;
                  const isCorrect = option === quizQuestions[quizIndex]?.correctAnswer;

                  let btnStyle = "bg-white border-[#FFDDDD] text-[#293C3A] hover:border-[#55A9A0]";
                  if (quizSelectedAnswer !== null) {
                    if (isCorrect) {
                      btnStyle = "bg-teal-50 border-teal-500 text-teal-800 font-bold";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-800 font-bold";
                    } else {
                      btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={quizSelectedAnswer !== null}
                      onClick={() => handleAnswerQuiz(option)}
                      className={`p-3.5 rounded-2xl border-2 text-xs font-semibold text-center transition-all cursor-pointer ${btnStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
