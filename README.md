# Kana Quest (かな探求) 🌸

Website interaktif modern untuk belajar **Hiragana (ひらがな)** dan **Katakana (カタカナ)** bahasa Jepang, dilengkapi dengan latihan mengetik cepat, kuis menggambar interaktif dengan evaluasi kemiripan kanvas, flashcard hafalan 3D, serta pemantauan progres dan riwayat belajar lengkap.

---

## 🎨 Palet Desain & Identitas Visual
- **Soft Pink:** `#FFDDDD`
- **Teal (Aksen Utama):** `#55A9A0`
- **Teal Muda:** `#D9EFEC`
- **Putih Hangat:** `#FFF8F7`
- **Teks Gelap:** `#293C3A`
- **Teks Sekunder:** `#6F7775`
- **Tipografi:** Plus Jakarta Sans & Noto Sans JP (untuk karakter Jepang yang otentik dan bersih).

---

## ✨ Fitur-Fitur Utama

### 1. 🧭 Dashboard (`/`)
- **Sapaan & Hero Banner:** Pengantar belajar ramah dengan ornamen visual bernuansa Jepang.
- **Ringkasan Progres:** Total sesi tes, rata-rata skor, skor tertinggi, dan jumlah kana yang dikuasai.
- **Target Belajar Harian & Streak Counter:** Pelacak konsistensi latihan harian dengan progress bar interaktif.
- **6 Akses Cepat:** Pintasan langsung ke Belajar Kana, Kuis Mengetik, Gambar Hiragana, Gambar Katakana, Flashcard, dan Review Kesalahan.
- **Aktivitas Terakhir:** Daftar sesi tes terbaru dengan rincian skor dan durasi.

### 2. 📖 Belajar Kana (`/learn`)
- **Tab Terpisah:** Hiragana (46 karakter dasar) dan Katakana (46 karakter dasar).
- **Pengelompokan Baris Bunyi:** Vokal (A-I-U-E-O), K, S, T, N, H, M, Y, R, W, dan N khusus.
- **Pencarian Instan:** Cari berdasarkan huruf kana maupun romaji.
- **Filter Penguasaan:** Tampilkan Semua, Sudah Dikuasai, atau Belum Dikuasai.
- **Modal Detail Karakter:**
  - Tampilan karakter besar dan indah.
  - Audio pengucapan otentik (*Japanese Speech Synthesis*).
  - Panduan urutan goresan (*Stroke Order Tips*) langkah demi langkah.
  - Contoh kosakata dengan makna bahasa Indonesia.
  - **Kanvas Latihan Interaktif:** Uji langsung goresan tanganmu di kanvas mini modal dengan tombol evaluasi kemiripan!
  - Tombol penanda "Dikuasai / Belum".

### 3. ⌨️ Kuis Mengetik Kana (`/quiz/typing`)
- **25 Soal per Sesi:** Tanpa pilihan ganda, jawaban diketik langsung.
- **Mode:** Hiragana Saja, Katakana Saja, atau Campuran (*Mixed*).
- **Arah Soal Acak:** Kana &rarr; Romaji dan Romaji &rarr; Kana.
- **Toleransi Variasi Romaji:** Menerima *shi/si, chi/ti, tsu/tu, fu/hu, ji/zi, wo/o*.
- **Feedback Instan:** Informasi jawaban benar seketika dan audio pengucapan otomatis.
- **Layar Hasil & Confetti:** Ringkasan akurasi, waktu pengerjaan, dan ulasan setiap nomor soal.

### 4. 🖌️ Kuis Menggambar Hiragana & Katakana (`/quiz/draw-hiragana` & `/quiz/draw-katakana`)
- **25 Soal Acak Tanpa Pengulangan** dari 46 karakter dasar.
- **Kanvas Interaktif:** Mendukung mouse desktop dan sentuhan layar tablet/smartphone (*touch-action: none*).
- **Fitur Kanvas:** Pilihan ketebalan kuas, tombol Undo goresan, tombol Hapus, serta kisi bantu (*grid guides*).
- **Maksimal 3 Percobaan per Soal:** Mengambil skor terbaik dari 3 percobaan.
- **Algoritma Penilaian Kemiripan Bentuk Canvas:**
  - Normalisasi kotak pembatas (*bounding box*) dan skala proporsional.
  - Evaluasi *Dilated Intersection over Union* (IoU) dan kepadatan goresan terhadap *glyph* referensi.
  - Kategori evaluasi: **Sempurna (&ge;80%)**, **Bagus Sekali (65-79%)**, **Cukup Baik (45-64%)**, dan **Perlu Latihan (<45%)**.
  - **Visual Overlay Comparison:** Tampilan perbandingan visual goresan pengguna di atas bayangan karakter referensi.

### 5. 🎴 Flashcard Kana (`/flashcards`)
- Kartu hafalan bolak-balik dengan animasi flip 3D yang halus.
- Audio pengucapan saat kartu dibuka.
- Tombol **Belum Hafal** (merah) dan **Sudah Hafal** (hijau).
- Tombol **Acak Kartu (Shuffle)** dan filter hanya yang belum dihafal.

### 6. 📊 Progress & Statistik (`/progress`)
- Rata-rata skor keseluruhan dan skor terbaik.
- Breakdown performa per jenis kuis (Kuis Mengetik, Gambar Hiragana, Gambar Katakana).
- **Peta Penguasaan 46 Karakter:** Visual grid status seluruh huruf kana.
- **Lencana Pencapaian (Achievements):**
  - 🌸 *Langkah Pertama (一歩)*
  - ⚡ *Jari Cepat (タイピング)*
  - 🖌️ *Seniman Hiragana (ひらがな)*
  - ⛩️ *Seniman Katakana (カタカナ)*
  - 💯 *Nilai Sempurna (満点)*
  - 🔥 *Kobar Semangat (3 Hari Streak)*
  - 📚 *Pelajar Tekun (10 Kana Dikuasai)*

### 7. 📜 History Test (`/history`)
- Riwayat seluruh sesi latihan tersimpan aman di Local Storage.
- Filter berdasarkan jenis kuis dan urutan terbaru.
- **Modal Detail Sesi:** Melihat rincian setiap butir soal, jawaban pengguna, status benar/salah, dan skor kemiripan gambar.
- Opsi Hapus Semua Riwayat.

### 8. 🔄 Review Kesalahan (`/review`)
- Otomatis menghimpun karakter-karakter yang paling sering keliru dari sesi kuis sebelumnya.
- Pintasan langsung untuk melatih kembali karakter tersebut.

---

## 🚀 Menjalankan Website Secara Lokal

1. Pastikan **Node.js** (v18+) telah terpasang.
2. Jalankan perintah:
   ```bash
   npm run dev
   ```
3. Buka peramban di [http://localhost:3000](http://localhost:3000).

Untuk membuat *production bundle*:
```bash
npm run build
npm start
```
