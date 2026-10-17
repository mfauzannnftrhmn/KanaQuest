"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  History as HistoryIcon, 
  Filter, 
  Trash2, 
  Calendar, 
  Clock, 
  ChevronRight, 
  X, 
  RotateCcw,
  Sparkles,
  Keyboard,
  PenTool,
  Brush
} from "lucide-react";
import { getHistory, clearHistory, QuizSession } from "@/lib/storage";

export default function HistoryPage() {
  const [history, setHistory] = useState<QuizSession[]>([]);
  const [filterType, setFilterType] = useState<"all" | "typing" | "draw-hiragana" | "draw-katakana">("all");
  const [selectedSession, setSelectedSession] = useState<QuizSession | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm("Apakah kamu yakin ingin menghapus seluruh riwayat tes? Data tidak dapat dipulihkan.")) {
      clearHistory();
      setHistory([]);
      setSelectedSession(null);
    }
  };

  const filteredHistory = history.filter((s) => {
    if (filterType === "all") return true;
    return s.testType === filterType;
  });

  const totalSessions = filteredHistory.length;
  const avgScore = totalSessions
    ? Math.round(filteredHistory.reduce((a, b) => a + b.score, 0) / totalSessions)
    : 0;
  const bestScore = totalSessions
    ? Math.max(...filteredHistory.map((s) => s.score))
    : 0;

  const testTypeLabels: Record<string, { label: string; icon: any; color: string }> = {
    typing: { label: "Kuis Mengetik", icon: Keyboard, color: "bg-[#D9EFEC] text-[#377770]" },
    "draw-hiragana": { label: "Gambar Hiragana", icon: PenTool, color: "bg-[#FFF0EF] text-rose-600" },
    "draw-katakana": { label: "Gambar Katakana", icon: Brush, color: "bg-[#D9EFEC] text-[#55A9A0]" },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0EF] border border-[#FFDDDD] text-xs font-semibold text-[#293C3A] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
            <span>Riwayat Latihan Browser</span>
          </div>
          <h1 className="text-3xl font-black text-[#293C3A] tracking-tight">
            History Test (履歴)
          </h1>
          <p className="text-xs sm:text-sm text-[#6F7775]">
            Daftar seluruh sesi kuis yang pernah kamu selesaikan lengkap dengan rincian per nomor soal.
          </p>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={handleClear}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Hapus Semua Riwayat</span>
          </button>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6F7775]">Total Sesi</p>
            <p className="text-2xl font-black text-[#293C3A]">{totalSessions}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#FFF0EF] text-[#55A9A0]">
            <HistoryIcon className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6F7775]">Rata-Rata Skor</p>
            <p className="text-2xl font-black text-[#293C3A]">{avgScore}%</p>
          </div>
          <div className="p-2.5 rounded-xl bg-[#D9EFEC] text-[#377770]">
            <span className="font-bold text-sm">AVG</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#6F7775]">Skor Terbaik</p>
            <p className="text-2xl font-black text-[#293C3A]">{bestScore}%</p>
          </div>
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500">
            <span className="font-bold text-sm">TOP</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-white border border-[#FFDDDD] rounded-2xl w-fit flex-wrap">
        <Filter className="w-3.5 h-3.5 text-gray-400 ml-3 mr-1" />
        {[
          { key: "all", label: "Semua Kuis" },
          { key: "typing", label: "Mengetik" },
          { key: "draw-hiragana", label: "Gambar Hiragana" },
          { key: "draw-katakana", label: "Gambar Katakana" },
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

      {/* History List */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-[#FFDDDD]/60 space-y-3">
          <HistoryIcon className="w-8 h-8 text-gray-300 mx-auto" />
          <h3 className="font-bold text-[#293C3A] text-base">Tidak Ada Riwayat Tes</h3>
          <p className="text-xs text-[#6F7775] max-w-sm mx-auto">
            Belum ada data tes untuk kategori ini. Selesaikan kuis untuk menyimpan riwayat belajarmu.
          </p>
          <div className="pt-2">
            <Link
              href="/quiz/typing"
              className="px-5 py-2.5 rounded-xl bg-[#55A9A0] text-white font-bold text-xs inline-flex items-center gap-1.5"
            >
              Mulai Kuis Mengetik
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredHistory.map((session) => {
            const typeInfo = testTypeLabels[session.testType] || {
              label: session.testType,
              color: "bg-gray-100 text-gray-700",
            };

            return (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className="p-3.5 sm:p-5 rounded-2xl bg-white border border-[#FFDDDD]/60 shadow-xs hover:border-[#55A9A0]/60 card-hover flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF8F7] border border-[#FFDDDD] flex flex-col items-center justify-center shrink-0">
                    <span className="text-base sm:text-lg font-black text-[#293C3A]">
                      {session.score}%
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium">
                      SKOR
                    </span>
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <span className={`text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full ${typeInfo.color}`}>
                        {typeInfo.label}
                      </span>
                      <span className="text-[11px] sm:text-xs text-[#6F7775] capitalize">
                        Mode: {session.testMode}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#6F7775]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>{session.dateFormatted}</span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{Math.round(session.durationSeconds)} detik</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                  <span className="hidden md:inline-block text-xs font-semibold text-[#55A9A0]">
                    Lihat Rincian
                  </span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Detail Sesi */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
          <div 
            className="w-full max-w-2xl bg-[#FFF8F7] rounded-3xl border border-[#FFDDDD] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-white border-b border-[#FFDDDD] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#293C3A] text-lg">
                  Detail Sesi: {testTypeLabels[selectedSession.testType]?.label || selectedSession.testType}
                </h3>
                <p className="text-xs text-[#6F7775]">
                  {selectedSession.dateFormatted} &bull; Durasi: {Math.round(selectedSession.durationSeconds)} detik
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-[#293C3A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Score Banner in Modal */}
            <div className="p-4 bg-[#FFF0EF] border-b border-[#FFDDDD]/60 flex items-center justify-between px-6">
              <div>
                <span className="text-xs font-semibold text-[#6F7775]">Hasil Akhir:</span>
                <p className="text-2xl font-black text-[#293C3A]">
                  {selectedSession.score}% Skor
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#D9EFEC] text-[#377770]">
                {selectedSession.correctAnswers} dari {selectedSession.totalQuestions} Soal Terjawab Benar
              </span>
            </div>

            {/* Questions Table / List */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6F7775]">
                Daftar Soal ({selectedSession.questions.length} Karakter):
              </h4>

              <div className="space-y-2">
                {selectedSession.questions.map((q, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                      q.isCorrect
                        ? "bg-white border-[#55A9A0]/30"
                        : "bg-rose-50/50 border-rose-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-japanese font-bold text-2xl text-[#293C3A]">
                        {q.kana}
                      </span>
                      <div>
                        <p className="font-semibold text-[#293C3A]">
                          Romaji: <span className="uppercase text-[#55A9A0]">{q.romaji}</span>
                        </p>
                        {q.userAnswer && (
                          <p className="text-[11px] text-[#6F7775]">
                            Jawabanmu: "{q.userAnswer}"
                          </p>
                        )}
                        {q.drawingScore !== undefined && (
                          <p className="text-[11px] text-[#6F7775]">
                            Kemiripan: {q.drawingScore}% &bull; {q.drawingCategory} ({q.drawingAttempts}x coba)
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      {q.isCorrect ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#D9EFEC] text-[#377770] font-bold text-[10px]">
                          Tepat
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 font-bold text-[10px]">
                          Keliru
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-white border-t border-[#FFDDDD] flex items-center justify-end">
              <button
                type="button"
                onClick={() => setSelectedSession(null)}
                className="px-4 py-2 rounded-xl bg-[#55A9A0] text-white text-xs font-semibold"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
