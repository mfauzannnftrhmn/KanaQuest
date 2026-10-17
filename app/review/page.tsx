"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  RotateCcw, 
  Volume2, 
  AlertCircle, 
  Sparkles, 
  Keyboard, 
  PenTool, 
  Brush,
  BookOpen,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { getMistakes, KanaMistakeItem } from "@/lib/storage";
import { speakKana } from "@/data/kanaData";

export default function ReviewMistakesPage() {
  const [mistakes, setMistakes] = useState<KanaMistakeItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "hiragana" | "katakana">("all");

  useEffect(() => {
    setMistakes(getMistakes());
  }, []);

  const filteredMistakes = mistakes.filter((item) => {
    if (filterType === "all") return true;
    return item.type === filterType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-xs font-semibold text-[#293C3A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
            <span>Fokus Perbaikan Otomatis</span>
          </div>
          <h1 className="text-3xl font-black text-[#293C3A] tracking-tight">
            Review Kesalahan (復習)
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7775]">
            Karakter-karakter berikut paling sering salah kamu jawab atau memiliki skor kemiripan gambar rendah.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-white border border-[#FFDDDD] rounded-2xl w-fit">
          {[
            { key: "all", label: "Semua" },
            { key: "hiragana", label: "Hiragana" },
            { key: "katakana", label: "Katakana" },
          ].map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilterType(f.key as any)}
              className={`px-3 py-1.5 text-xs rounded-xl font-semibold transition-colors ${
                filterType === f.key
                  ? "bg-[#55A9A0] text-white shadow-2xs"
                  : "text-[#6F7775] hover:text-[#293C3A]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      {filteredMistakes.length === 0 ? (
        <div className="p-12 sm:p-16 text-center rounded-3xl bg-white border border-[#FFDDDD]/60 space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#D9EFEC] text-[#377770] flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-[#293C3A] text-lg">
              Hebat! Tidak Ada Catatan Kesalahan
            </h3>
            <p className="text-xs sm:text-sm text-[#6F7775] max-w-md mx-auto">
              Belum ada karakter yang tercatat salah, atau kamu belum mengikuti kuis. Ikuti kuis mengetik atau kuis menggambar untuk menguji penguasaanmu!
            </p>
          </div>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quiz/typing"
              className="px-5 py-2.5 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Keyboard className="w-4 h-4" />
              <span>Mulai Kuis Mengetik</span>
            </Link>
            <Link
              href="/quiz/draw-hiragana"
              className="px-5 py-2.5 rounded-2xl bg-white border border-[#FFDDDD] hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <PenTool className="w-4 h-4" />
              <span>Kuis Menggambar</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMistakes.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white border border-[#FFDDDD]/60 shadow-xs hover:border-[#55A9A0]/50 card-hover flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  {item.timesWrong}x Salah / Rendah
                </span>

                <button
                  type="button"
                  onClick={() => speakKana(item.kana)}
                  className="p-1.5 rounded-full bg-[#FFF0EF] text-[#293C3A] hover:bg-[#FFDDDD] transition-colors"
                  title="Dengarkan pengucapan"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Character display */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] flex items-center justify-center shadow-2xs">
                  <span className="font-japanese font-bold text-4xl text-[#293C3A]">
                    {item.kana}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl font-black text-[#293C3A] uppercase tracking-wide">
                    {item.romaji}
                  </h4>
                  <p className="text-xs text-[#6F7775] capitalize">
                    Jenis: {item.type}
                  </p>
                  {item.latestScore !== undefined && (
                    <p className="text-[11px] text-[#55A9A0] font-semibold mt-0.5">
                      Skor Terakhir: {item.latestScore}%
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <Link
                  href="/learn"
                  className="flex-1 py-2 px-3 rounded-xl bg-[#FFF8F7] border border-[#FFDDDD] hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#55A9A0]" />
                  <span>Panduan</span>
                </Link>

                <Link
                  href={item.type === "hiragana" ? "/quiz/draw-hiragana" : "/quiz/draw-katakana"}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs text-center shadow-2xs transition-colors flex items-center justify-center gap-1.5"
                >
                  {item.type === "hiragana" ? (
                    <PenTool className="w-3.5 h-3.5" />
                  ) : (
                    <Brush className="w-3.5 h-3.5" />
                  )}
                  <span>Latih Gambar</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
