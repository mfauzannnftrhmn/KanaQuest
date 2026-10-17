"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { 
  Compass,
  BookOpen, 
  Keyboard, 
  PenTool, 
  Brush,
  Layers, 
  BarChart2, 
  History, 
  RotateCcw, 
  Flame, 
  Menu, 
  X,
  Languages,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { getUserStats } from "@/lib/storage";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [streak, setStreak] = useState(1);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stats = getUserStats();
    setStreak(stats.currentStreak || 1);
  }, [pathname]);

  // Close menus on route change or click outside
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navGroups = [
    {
      id: "learn",
      label: "Belajar",
      icon: BookOpen,
      items: [
        {
          name: "Belajar Kana",
          href: "/learn",
          icon: BookOpen,
          desc: "Tabel 46 Hiragana & Katakana, urutan goresan, audio.",
        },
        {
          name: "Flashcard Kana",
          href: "/flashcards",
          icon: Layers,
          desc: "Latihan hafalan bolak-balik 3D cepat.",
        },
      ],
    },
    {
      id: "practice",
      label: "Latihan",
      icon: Keyboard,
      items: [
        {
          name: "Kuis Mengetik",
          href: "/quiz/typing",
          icon: Keyboard,
          desc: "25 soal mengetik cepat Romaji.",
        },
        {
          name: "Gambar Hiragana",
          href: "/quiz/draw-hiragana",
          icon: PenTool,
          desc: "Latihan gambar kanvas Hiragana & skor kemiripan.",
        },
        {
          name: "Gambar Katakana",
          href: "/quiz/draw-katakana",
          icon: Brush,
          desc: "Latihan gambar kanvas Katakana & skor kemiripan.",
        },
      ],
    },
    {
      id: "progress",
      label: "Perkembangan",
      icon: BarChart2,
      items: [
        {
          name: "Statistik & Progress",
          href: "/progress",
          icon: BarChart2,
          desc: "Peta penguasaan karakter dan lencana pencapaian.",
        },
        {
          name: "History Test",
          href: "/history",
          icon: History,
          desc: "Riwayat sesi tes lengkap dengan rincian soal.",
        },
        {
          name: "Review Kesalahan",
          href: "/review",
          icon: RotateCcw,
          desc: "Fokus mengulang karakter yang paling sering keliru.",
        },
      ],
    },
  ];

  const isGroupActive = (items: { href: string }[]) =>
    items.some((item) => pathname === item.href);

  return (
    <div className="sticky top-3 sm:top-4 z-50 px-3 sm:px-6 w-full max-w-6xl mx-auto">
      {/* Liquid Glass Pill Container */}
      <header className="relative rounded-2xl sm:rounded-full bg-white/65 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_0_rgba(85,169,160,0.12),0_2px_12px_0_rgba(255,221,221,0.3),inset_0_1px_1px_0_rgba(255,255,255,0.9)] transition-all">
        <div className="px-4 sm:px-6 h-15 flex items-center justify-between">
          
          {/* Logo with Frosted Glass Badge */}
          <Link 
            href="/" 
            className="flex items-center gap-2.5 group transition-transform active:scale-95 shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#55A9A0] via-[#65B7AE] to-[#FFDDDD] p-[1.5px] shadow-sm shadow-[#55A9A0]/20 group-hover:rotate-6 transition-transform">
              <div className="w-full h-full rounded-[10px] bg-white/80 backdrop-blur-md flex items-center justify-center text-[#377770]">
                <Languages className="w-4 h-4 text-[#55A9A0]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-lg tracking-tight text-[#293C3A]">
                Kana<span className="text-[#55A9A0]">Quest</span>
              </span>
              <span className="hidden sm:inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-[#FFF0EF]/80 text-[#55A9A0] border border-[#FFDDDD]/60">
                かな
              </span>
            </div>
          </Link>

          {/* Desktop Clean Navigation (Organized Dropdown Groups) */}
          <nav ref={dropdownRef} className="hidden md:flex items-center gap-1.5">
            {/* Direct Dashboard Link */}
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                pathname === "/"
                  ? "bg-[#55A9A0] text-white shadow-xs"
                  : "text-[#293C3A] hover:bg-white/80 hover:text-[#55A9A0]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            {/* Dropdown Groups: Belajar, Latihan, Perkembangan */}
            {navGroups.map((group) => {
              const active = isGroupActive(group.items);
              const isOpen = activeDropdown === group.id;

              return (
                <div key={group.id} className="relative">
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(isOpen ? null : group.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      active
                        ? "bg-[#D9EFEC]/80 text-[#377770] border border-[#55A9A0]/40 shadow-2xs"
                        : "text-[#293C3A] hover:bg-white/80 hover:text-[#55A9A0]"
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-[#6F7775] transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#55A9A0]" : ""
                      }`}
                    />
                  </button>

                  {/* Liquid Glass Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute top-full left-0 mt-2.5 w-64 p-2 rounded-2xl bg-white/85 backdrop-blur-2xl border border-white/90 shadow-[0_16px_40px_0_rgba(85,169,160,0.18),0_4px_16px_0_rgba(255,221,221,0.25)] animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                      <div className="space-y-1">
                        {group.items.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = pathname === subItem.href;

                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`p-2.5 rounded-xl transition-all flex items-start gap-2.5 group/item ${
                                isSubActive
                                  ? "bg-[#55A9A0] text-white shadow-2xs"
                                  : "hover:bg-[#FFF0EF]/80 text-[#293C3A]"
                              }`}
                            >
                              <div
                                className={`p-1.5 rounded-lg shrink-0 transition-colors ${
                                  isSubActive
                                    ? "bg-white/20 text-white"
                                    : "bg-white text-[#55A9A0] group-hover/item:bg-white shadow-2xs"
                                }`}
                              >
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <p className="text-xs font-bold leading-tight">
                                  {subItem.name}
                                </p>
                                <p
                                  className={`text-[10px] mt-0.5 leading-snug line-clamp-1 ${
                                    isSubActive ? "text-white/80" : "text-[#6F7775]"
                                  }`}
                                >
                                  {subItem.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action: Liquid Glass Streak Badge & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              href="/progress"
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-white/90 text-[#293C3A] hover:border-[#55A9A0]/60 transition-all text-xs font-bold shadow-xs hover:shadow-sm"
              title="Streak belajar harian kamu"
            >
              <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500 animate-pulse shrink-0" />
              <span>{streak} <span className="hidden xs:inline">Hari</span></span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/60 hover:bg-white text-[#293C3A] transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Liquid Glass Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden p-3.5 sm:p-4 border-t border-white/60 space-y-3 sm:space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto animate-in slide-in-from-top-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                pathname === "/"
                  ? "bg-[#55A9A0] text-white"
                  : "bg-white/60 text-[#293C3A] hover:bg-white"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            {navGroups.map((group) => (
              <div key={group.id} className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#6F7775] px-2 block">
                  {group.label}
                </span>
                <div className="grid grid-cols-1 gap-1">
                  {group.items.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = pathname === subItem.href;

                    return (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                          isSubActive
                            ? "bg-[#55A9A0] text-white"
                            : "bg-white/50 text-[#293C3A] hover:bg-white"
                        }`}
                      >
                        <SubIcon className="w-4 h-4 text-[#55A9A0]" />
                        <span>{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>
    </div>
  );
}
