"use client";

import Link from "next/link";
import { Languages, ArrowUp, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navSections = [
    {
      title: "Belajar & Aksara",
      links: [
        { label: "Tabel 71 Kana", href: "/learn" },
        { label: "Daftar Kosakata", href: "/vocabulary" },
        { label: "Flashcards", href: "/flashcards" },
      ],
    },
    {
      title: "Latihan & Kuis",
      links: [
        { label: "Kuis Mengetik", href: "/quiz/typing" },
        { label: "Tulis Hiragana", href: "/quiz/draw-hiragana" },
        { label: "Tulis Katakana", href: "/quiz/draw-katakana" },
      ],
    },
    {
      title: "Perkembangan",
      links: [
        { label: "Statistik Progres", href: "/progress" },
        { label: "Riwayat Latihan", href: "/history" },
        { label: "Review Kesalahan", href: "/review" },
      ],
    },
  ];

  return (
    <footer className="mt-auto border-t border-[#FFDDDD]/60 bg-gradient-to-b from-white/30 via-white/70 to-[#FFF0EF]/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Info (2 Columns) */}
          <div className="md:col-span-2 space-y-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2.5 group transition-transform active:scale-95"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#55A9A0] via-[#65B7AE] to-[#FFDDDD] p-[1.5px] shadow-xs group-hover:rotate-6 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-white/90 backdrop-blur-md flex items-center justify-center text-[#377770]">
                  <Languages className="w-4 h-4 text-[#55A9A0]" />
                </div>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-black text-xl tracking-tight text-[#293C3A]">
                  Kana<span className="text-[#55A9A0]">Quest</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FFF0EF] text-[#55A9A0] border border-[#FFDDDD]/80">
                  かな
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#6F7775] leading-relaxed max-w-sm">
              Platform belajar Hiragana dan Katakana interaktif dengan evaluasi goresan Canvas cerdas, kuis mengetik, dan kurikulum kosakata terstruktur.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#FFDDDD]/80 text-[11px] font-medium text-[#293C3A] shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#55A9A0]" />
              <span>71 Karakter Kana & 180+ Kosakata Terintegrasi</span>
            </div>
          </div>

          {/* Navigation Links (3 Columns) */}
          {navSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#293C3A]/80">
                {section.title}
              </h4>
              <ul className="space-y-2 text-xs">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#6F7775] hover:text-[#55A9A0] transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-10 pt-6 border-t border-[#FFDDDD]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F7775]">
          <div className="flex items-center gap-1.5 order-2 sm:order-1 text-center sm:text-left">
            <span>&copy; 2026 KanaQuest.</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="inline-flex items-center gap-1">
              Dibuat dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> untuk pembelajar bahasa Jepang.
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="order-1 sm:order-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-[#FFDDDD] hover:border-[#55A9A0]/50 hover:bg-[#FFF0EF] text-xs font-semibold text-[#293C3A] transition-all shadow-2xs cursor-pointer group"
          >
            <span>Kembali ke Atas</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#55A9A0] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
