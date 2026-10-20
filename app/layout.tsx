import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SakuraBackground from "@/components/SakuraBackground";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFF8F7",
};

export const metadata: Metadata = {
  title: "Kana Quest - Belajar Hiragana & Katakana Jepang",
  description: "Platform interaktif belajar Hiragana dan Katakana Jepang dengan kuis mengetik, kuis menggambar dengan Canvas AI, flashcard, dan pemantauan progres belajar.",
  keywords: ["kana quest", "belajar jepang", "hiragana", "katakana", "kuis jepang", "menggambar kana", "romaji"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${notoSansJP.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-[#55A9A0] selection:text-white bg-[#FFF8F7] text-[#293C3A] relative">
        <SakuraBackground />
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-7 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
