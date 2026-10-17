"use client";

import { useState, useEffect } from "react";
import { 
  RotateCw, 
  Shuffle, 
  Volume2, 
  Check, 
  X, 
  Sparkles, 
  Filter, 
  HelpCircle,
  CheckCircle2,
  PartyPopper
} from "lucide-react";
import { BASIC_KANA, KanaItem, speakKana } from "@/data/kanaData";
import { getKanaMastery, toggleKanaLearned } from "@/lib/storage";

export default function FlashcardsPage() {
  const [activeType, setActiveType] = useState<"hiragana" | "katakana">("hiragana");
  const [cards, setCards] = useState<KanaItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [onlyUnlearned, setOnlyUnlearned] = useState(false);
  const [mastery, setMastery] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const m = getKanaMastery();
    setMastery(m);
    resetDeck(activeType, onlyUnlearned, m);
  }, [activeType, onlyUnlearned]);

  const resetDeck = (
    type: "hiragana" | "katakana",
    unlearnedFilter: boolean,
    currentMastery: Record<string, boolean>
  ) => {
    let items = [...BASIC_KANA];
    if (unlearnedFilter) {
      items = items.filter((item) => !currentMastery[item.id]);
    }
    // Default shuffle
    items = items.sort(() => Math.random() - 0.5);
    setCards(items);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleShuffle = () => {
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    if (nextFlipped && currentCard) {
      const char = activeType === "hiragana" ? currentCard.hiragana : currentCard.katakana;
      speakKana(char);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        // Reset to first card
        setCurrentIndex(0);
      }
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        setCurrentIndex(cards.length - 1);
      }
    }, 200);
  };

  const handleMarkLearned = (learnedStatus: boolean) => {
    if (!currentCard) return;
    const currentIsLearned = !!mastery[currentCard.id];
    if (currentIsLearned !== learnedStatus) {
      toggleKanaLearned(currentCard.id);
      setMastery((prev) => ({ ...prev, [currentCard.id]: learnedStatus }));
    }
    handleNext();
  };

  const currentCard = cards[currentIndex];
  const charDisplay = currentCard
    ? activeType === "hiragana"
      ? currentCard.hiragana
      : currentCard.katakana
    : "";

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-xs font-semibold text-[#293C3A]">
          <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
          <span>Latihan Hafalan Cepat</span>
        </div>
        <h1 className="text-3xl font-black text-[#293C3A]">
          Flashcard Kana (フラッシュカード)
        </h1>
        <p className="text-xs sm:text-sm text-[#6F7775]">
          Klik atau ketuk kartu untuk membalik dan melihat romaji serta contoh kata.
        </p>
      </div>

      {/* Mode Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs">
        {/* Type toggle */}
        <div className="flex bg-[#FFF0EF] p-1 rounded-xl border border-[#FFDDDD]">
          <button
            type="button"
            onClick={() => setActiveType("hiragana")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeType === "hiragana"
                ? "bg-[#55A9A0] text-white shadow-2xs"
                : "text-[#293C3A] hover:bg-[#FFDDDD]/40"
            }`}
          >
            Hiragana
          </button>
          <button
            type="button"
            onClick={() => setActiveType("katakana")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeType === "katakana"
                ? "bg-[#55A9A0] text-white shadow-2xs"
                : "text-[#293C3A] hover:bg-[#FFDDDD]/40"
            }`}
          >
            Katakana
          </button>
        </div>

        {/* Filter & Shuffle actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOnlyUnlearned(!onlyUnlearned)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              onlyUnlearned
                ? "bg-[#D9EFEC] border-[#55A9A0] text-[#377770]"
                : "bg-white border-gray-200 text-[#6F7775] hover:bg-gray-50"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{onlyUnlearned ? "Hanya Belum Hafal" : "Semua Karakter"}</span>
          </button>

          <button
            type="button"
            onClick={handleShuffle}
            title="Acak urutan kartu"
            className="p-2 rounded-xl bg-white border border-gray-200 text-[#6F7775] hover:bg-gray-50 transition-colors"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cards remaining progress counter */}
      {cards.length > 0 && (
        <div className="flex items-center justify-between text-xs font-semibold text-[#6F7775] px-2">
          <span>Kartu ke-{currentIndex + 1} dari {cards.length}</span>
          <span className="flex items-center gap-1">
            {mastery[currentCard?.id] ? (
              <span className="text-[#55A9A0] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Sudah Dikuasai
              </span>
            ) : (
              <span>Belum Dikuasai</span>
            )}
          </span>
        </div>
      )}

      {/* 3D Flip Flashcard */}
      {cards.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#FFDDDD] space-y-3">
          <p className="font-bold text-[#293C3A] text-sm flex items-center justify-center gap-1.5">
            <span>Semua kartu dalam kategori ini sudah kamu kuasai!</span>
            <PartyPopper className="w-4 h-4 text-amber-500 shrink-0" />
          </p>
          <button
            type="button"
            onClick={() => setOnlyUnlearned(false)}
            className="px-4 py-2 rounded-xl bg-[#55A9A0] text-white text-xs font-bold"
          >
            Tampilkan Semua Kartu
          </button>
        </div>
      ) : (
        <div className="perspective-1000 w-full min-h-[340px] select-none cursor-pointer">
          <div
            onClick={handleFlip}
            className={`relative w-full h-[340px] rounded-3xl shadow-md transition-transform duration-500 transform-style-3d ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            {/* FRONT FACE (Character Big) */}
            <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-white via-[#FFF8F7] to-[#FFF0EF] border-2 border-[#FFDDDD] p-8 flex flex-col items-center justify-between">
              <div className="w-full flex justify-between items-center text-xs font-semibold text-[#6F7775]">
                <span className="px-2.5 py-1 rounded-full bg-[#D9EFEC] text-[#377770]">
                  {currentCard.rowName}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-gray-400">
                  <HelpCircle className="w-3.5 h-3.5" /> Ketuk untuk membalik
                </span>
              </div>

              <div className="text-center my-auto">
                <span className="font-japanese font-black text-8xl text-[#293C3A] drop-shadow-xs">
                  {charDisplay}
                </span>
              </div>

              <div className="w-full flex items-center justify-between text-xs text-[#6F7775]">
                <span>{currentCard.strokes} Goresan</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakKana(charDisplay);
                  }}
                  className="p-2 rounded-full bg-[#FFF0EF] hover:bg-[#FFDDDD] text-[#293C3A] transition-colors"
                  title="Dengarkan pengucapan"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* BACK FACE (Romaji & Meaning) */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-[#FFF0EF] via-white to-[#D9EFEC]/40 border-2 border-[#55A9A0] p-8 flex flex-col items-center justify-between">
              <div className="w-full flex justify-between items-center text-xs font-semibold text-[#55A9A0]">
                <span>Jawaban & Contoh</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakKana(charDisplay);
                  }}
                  className="p-1.5 rounded-full bg-white border border-[#55A9A0]/30 text-[#377770]"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center my-auto space-y-2">
                <span className="text-5xl font-black text-[#293C3A] uppercase tracking-wider block">
                  {currentCard.romaji}
                </span>
                <p className="font-japanese text-2xl font-bold text-[#55A9A0]">
                  {charDisplay}
                </p>
                {currentCard.examples[0] && (
                  <p className="text-xs text-[#6F7775] mt-2">
                    Contoh: <strong className="text-[#293C3A]">{currentCard.examples[0].wordHiragana}</strong> ({currentCard.examples[0].romaji}) - {currentCard.examples[0].meaning}
                  </p>
                )}
              </div>

              <span className="text-[11px] text-gray-400">
                Ketuk lagi untuk kembali ke depan
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Bar: Belum Hafal / Sudah Hafal */}
      {cards.length > 0 && (
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => handleMarkLearned(false)}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-white border-2 border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Belum Hafal (Ulangi)</span>
          </button>

          <button
            type="button"
            onClick={handleFlip}
            className="p-3.5 rounded-2xl bg-[#FFF0EF] border border-[#FFDDDD] text-[#293C3A] hover:bg-[#FFDDDD] transition-colors"
            title="Balik kartu"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => handleMarkLearned(true)}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-md shadow-[#55A9A0]/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Sudah Hafal (Lanjut)</span>
          </button>
        </div>
      )}
    </div>
  );
}
