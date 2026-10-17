import DrawQuizView from "@/components/DrawQuizView";

export const metadata = {
  title: "Kuis Menggambar Katakana - Kana Quest",
  description: "Latihan menggambar 25 karakter dasar Katakana di kanvas interaktif dengan penilaian kemiripan bentuk otomatis.",
};

export default function DrawKatakanaPage() {
  return <DrawQuizView targetType="katakana" />;
}
