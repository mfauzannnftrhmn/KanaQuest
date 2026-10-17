import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#FFDDDD]/60 bg-[#FFF0EF]/50 py-8 px-4 sm:px-6 lg:px-8 text-sm text-[#6F7775]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#293C3A]">KanaQuest</span>
          <span>&bull;</span>
          <span className="text-xs">
            Belajar Hiragana & Katakana dengan percaya diri.
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-center">
          <Link href="/learn" className="hover:text-[#55A9A0] transition-colors">
            Tabel Kana
          </Link>
          <Link href="/quiz/typing" className="hover:text-[#55A9A0] transition-colors">
            Kuis Mengetik
          </Link>
          <Link href="/quiz/draw-hiragana" className="hover:text-[#55A9A0] transition-colors">
            Menggambar Hiragana
          </Link>
          <Link href="/quiz/draw-katakana" className="hover:text-[#55A9A0] transition-colors">
            Menggambar Katakana
          </Link>
          <Link href="/flashcards" className="hover:text-[#55A9A0] transition-colors">
            Flashcards
          </Link>
          <Link href="/progress" className="hover:text-[#55A9A0] transition-colors">
            Statistik
          </Link>
        </div>

        <div className="flex items-center gap-1 text-xs">
          <span>Dibuat dengan</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" />
          <span>untuk pembelajar Bahasa Jepang.</span>
        </div>
      </div>
    </footer>
  );
}
