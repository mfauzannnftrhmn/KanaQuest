import { Metadata } from "next";
import WritingStudio from "@/components/WritingStudio";
import { Sparkles, BookOpen, Layers } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Panduan & Latihan Menulis Romaji, Hiragana & Katakana - Kana Quest",
  description:
    "Pelajari kaidah urutan goresan (stroke order) aksara Jepang dengan baik dan benar, latihan di kanvas kotak Genkōyōshi interaktif, dan kuasai aturan penulisan Romaji standar Hepburn.",
  keywords: [
    "belajar menulis jepang",
    "stroke order hiragana",
    "stroke order katakana",
    "urutan goresan kana",
    "aturan romaji benar",
    "bayang-bayang menulis jepang",
    "genkouyoushi canvas",
  ],
};

export default function WritingPage() {
  return (
    <div className="space-y-4 sm:space-y-6 pb-8 sm:pb-12 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-[11px] sm:text-xs font-semibold text-[#293C3A] mb-1.5 sm:mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
            <span>Studio Panduan Menulis & Kanvas Genkōyōshi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#293C3A] tracking-tight leading-tight">
            Cara Menulis Romaji, Hiragana & Katakana dengan Benar
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7775] mt-1 max-w-3xl leading-relaxed">
            Kuasai urutan goresan (<span className="italic font-japanese">kakijun</span> 筆順), teknik ujung garis (<span className="italic">tome, hane, harai</span>), perbedaan tulisan tangan vs font komputer, serta standar transliterasi Romaji Modified Hepburn.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/learn"
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white border border-[#FFDDDD] hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#55A9A0]" />
            <span>Tabel Kana</span>
          </Link>
          <Link
            href="/flashcards"
            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#D9EFEC] hover:bg-[#c4e2de] text-[#377770] font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Flashcard 3D</span>
          </Link>
        </div>
      </div>

      {/* Main Studio View */}
      <WritingStudio />
    </div>
  );
}
