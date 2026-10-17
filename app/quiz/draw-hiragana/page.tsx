import DrawQuizView from "@/components/DrawQuizView";

export const metadata = {
  title: "Kuis Menggambar Hiragana - Kana Quest",
  description: "Latihan menggambar 25 karakter dasar Hiragana di kanvas interaktif dengan penilaian kemiripan bentuk otomatis.",
};

export default function DrawHiraganaPage() {
  return <DrawQuizView targetType="hiragana" />;
}
