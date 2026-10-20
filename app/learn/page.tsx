"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  Keyboard, 
  PenTool, 
  Brush,
  Filter, 
  Sparkles 
} from "lucide-react";
import { BASIC_KANA, ROW_GROUPS, KanaItem, speakKana } from "@/data/kanaData";
import { getKanaMastery, toggleKanaLearned } from "@/lib/storage";
import KanaDetailModal from "@/components/KanaDetailModal";

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"hiragana" | "katakana">("hiragana");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLearned, setFilterLearned] = useState<"all" | "learned" | "unlearned">("all");
  const [filterKanaType, setFilterKanaType] = useState<"all" | "gojuon" | "dakuon" | "handakuon" | "yoon">("all");
  const [selectedKana, setSelectedKana] = useState<KanaItem | null>(null);
  const [mastery, setMastery] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMastery(getKanaMastery());
  }, []);

  const handleToggleLearned = (kanaId: string) => {
    const isNowLearned = toggleKanaLearned(kanaId);
    setMastery((prev) => ({ ...prev, [kanaId]: isNowLearned }));
  };

  // Filter kana
  const filteredKana = BASIC_KANA.filter((item) => {
    const matchesSearch =
      item.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.hiragana.includes(searchQuery) ||
      item.katakana.includes(searchQuery);

    if (!matchesSearch) return false;

    const isLearned = !!mastery[item.id];
    if (filterLearned === "learned") return isLearned;
    if (filterLearned === "unlearned") return !isLearned;
    return true;
  });

  const learnedCount = BASIC_KANA.filter((item) => mastery[item.id]).length;
  const progressPercent = Math.round((learnedCount / BASIC_KANA.length) * 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-xs font-semibold text-[#293C3A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
            <span>Referensi 104 Karakter Kana Lengkap (Dasar 46, Tenten 20, Maru 5 & Yōon 33)</span>
          </div>
          <h1 className="text-3xl font-black text-[#293C3A] tracking-tight">
            Belajar Kana ({activeTab === "hiragana" ? "Hiragana ひらがな" : "Katakana カタカナ"})
          </h1>
          <p className="text-sm text-[#6F7775]">
            Klik pada karakter mana saja untuk melihat urutan goresan, audio, contoh kosakata, serta kanvas latihan menulis!
          </p>
        </div>

        {/* Quick Quiz Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/writing"
            className="px-4 py-2.5 rounded-2xl bg-[#FFF0EF] border border-[#FFDDDD] hover:bg-[#FFDDDD] text-[#293C3A] font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <PenTool className="w-4 h-4 text-[#55A9A0]" />
            <span>Panduan Menulis</span>
          </Link>
          <Link
            href="/quiz/typing"
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#FFDDDD] hover:bg-[#FFF0EF] text-[#293C3A] font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Keyboard className="w-4 h-4 text-[#55A9A0]" />
            <span>Kuis Mengetik</span>
          </Link>
          <Link
            href={activeTab === "hiragana" ? "/quiz/draw-hiragana" : "/quiz/draw-katakana"}
            className="px-4 py-2.5 rounded-2xl bg-[#55A9A0] hover:bg-[#47928a] text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
          >
            {activeTab === "hiragana" ? (
              <PenTool className="w-4 h-4" />
            ) : (
              <Brush className="w-4 h-4" />
            )}
            <span>Kuis Gambar {activeTab === "hiragana" ? "Hiragana" : "Katakana"}</span>
          </Link>
        </div>
      </div>

      {/* Progress & Mastery Banner */}
      <div className="p-4 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D9EFEC] flex items-center justify-center text-[#377770] font-black text-sm">
            {progressPercent}%
          </div>
          <div>
            <p className="text-xs font-bold text-[#293C3A]">
              Progres Penguasaan: {learnedCount} dari {BASIC_KANA.length} Karakter
            </p>
            <p className="text-[11px] text-[#6F7775]">
              Tandai karakter yang sudah kamu hafal agar terlacak di dashboard.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-48 h-2 rounded-full bg-[#FFF0EF] overflow-hidden">
          <div 
            className="h-full bg-[#55A9A0] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Controls: Tab, Search, Filter */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Tab Hiragana / Katakana */}
        <div className="flex bg-[#FFF0EF] p-1 rounded-2xl border border-[#FFDDDD] w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("hiragana")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "hiragana"
                ? "bg-[#55A9A0] text-white shadow-xs"
                : "text-[#293C3A] hover:bg-[#FFDDDD]/40"
            }`}
          >
            Hiragana (あ)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("katakana")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "katakana"
                ? "bg-[#55A9A0] text-white shadow-xs"
                : "text-[#293C3A] hover:bg-[#FFDDDD]/40"
            }`}
          >
            Katakana (ア)
          </button>
        </div>

        {/* Search bar & Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kana atau romaji (misal: kya, きゃ, ga)..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#FFDDDD] rounded-xl text-xs text-[#293C3A] focus:outline-none focus:ring-2 focus:ring-[#55A9A0]"
            />
          </div>

          {/* Filter Learned status */}
          <div className="flex items-center gap-1 bg-white border border-[#FFDDDD] p-1 rounded-xl">
            <Filter className="w-3.5 h-3.5 text-gray-400 ml-2 mr-1" />
            {(
              [
                { key: "all", label: "Semua" },
                { key: "learned", label: "Dikuasai" },
                { key: "unlearned", label: "Belum" },
              ] as const
            ).map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilterLearned(f.key)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${
                  filterLearned === f.key
                    ? "bg-[#D9EFEC] text-[#377770]"
                    : "text-[#6F7775] hover:text-[#293C3A]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Kana Type Filter Bar (Dasar, Tenten, Maru, Yōon 3 Huruf) */}
      <div className="flex flex-wrap items-center gap-2 pt-1 pb-2">
        <span className="text-xs font-bold text-[#6F7775] mr-1">Kategori Huruf:</span>
        {(
          [
            { key: "all", label: "Semua (104 Kana)" },
            { key: "gojuon", label: "Dasar / Gojuon (46)" },
            { key: "dakuon", label: "Tenten ゛ (20)" },
            { key: "handakuon", label: "Maru ゜ (5)" },
            { key: "yoon", label: "Yōon / 3 Huruf (33)" },
          ] as const
        ).map((g) => (
          <button
            key={g.key}
            type="button"
            onClick={() => setFilterKanaType(g.key)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterKanaType === g.key
                ? "bg-[#55A9A0] text-white shadow-xs"
                : "bg-white border border-[#FFDDDD] text-[#293C3A] hover:bg-[#FFF0EF]"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Kana Grid Grouped by Rows */}
      <div className="space-y-6">
        {ROW_GROUPS.filter((r) => {
          if (filterKanaType === "all") return true;
          return r.group === filterKanaType;
        }).map((row) => {
          const rowItems = filteredKana.filter((item) => item.row === row.key);
          if (rowItems.length === 0) return null;

          return (
            <div key={row.key} className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#6F7775] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#55A9A0]" />
                <span>{row.name}</span>
              </h3>

              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5 sm:gap-3">
                {rowItems.map((item) => {
                  const character = activeTab === "hiragana" ? item.hiragana : item.katakana;
                  const isLearned = !!mastery[item.id];

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedKana(item)}
                      className={`group relative p-3 sm:p-4 rounded-2xl bg-white border cursor-pointer transition-all card-hover flex flex-col items-center justify-between min-h-[125px] sm:min-h-[140px] select-none ${
                        isLearned
                          ? "border-[#55A9A0]/50 shadow-xs"
                          : "border-[#FFDDDD]/60 hover:border-[#55A9A0]/40"
                      }`}
                    >
                      {/* Top bar: learned badge & audio button */}
                      <div className="w-full flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleLearned(item.id);
                          }}
                          className="p-1 rounded-lg text-gray-400 hover:text-[#55A9A0] transition-colors cursor-pointer"
                          title={isLearned ? "Tandai belum dikuasai" : "Tandai sudah dikuasai"}
                        >
                          {isLearned ? (
                            <CheckCircle2 className="w-4 h-4 text-[#55A9A0] fill-[#D9EFEC]" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            speakKana(character);
                          }}
                          className="p-1.5 rounded-full text-[#6F7775] hover:text-[#55A9A0] hover:bg-[#FFF0EF] transition-colors cursor-pointer"
                          title="Dengarkan pengucapan"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Character Big Display */}
                      <div className="my-1 text-center">
                        <span className="font-japanese font-bold text-3xl sm:text-4xl text-[#293C3A] group-hover:scale-110 group-hover:text-[#55A9A0] transition-all block">
                          {character}
                        </span>
                      </div>

                      {/* Romaji & stroke count */}
                      <div className="w-full flex items-center justify-between text-xs pt-1 border-t border-gray-100">
                        <span className="font-bold text-[#293C3A] uppercase tracking-wide">
                          {item.romaji}
                        </span>
                        <span className="text-[10px] text-[#6F7775]">
                          {item.strokes} strk
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {filteredKana.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white border border-[#FFDDDD] space-y-2">
            <p className="font-bold text-[#293C3A] text-sm">
              Tidak ada karakter kana yang cocok.
            </p>
            <p className="text-xs text-[#6F7775]">
              Coba gunakan kata kunci pencarian atau reset filter.
            </p>
          </div>
        )}
      </div>

      {/* Modal Detail Karakter */}
      <KanaDetailModal
        item={selectedKana}
        activeType={activeTab}
        isLearned={selectedKana ? !!mastery[selectedKana.id] : false}
        onToggleLearned={handleToggleLearned}
        onClose={() => setSelectedKana(null)}
      />
    </div>
  );
}
