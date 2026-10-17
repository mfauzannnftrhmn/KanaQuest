# Kana Quest --- Spesifikasi Konsep Website

> Status: dokumen perencanaan. Implementasi kode website belum dimulai.

## 1. Ringkasan Proyek

**Nama:** Kana Quest\
**Jenis:** Website belajar kana bahasa Jepang.\
**Tujuan:** Membantu pengguna belajar hiragana dan katakana melalui
referensi karakter, kuis mengetik, kuis menggambar, serta pemantauan
progres dan riwayat tes.

## 2. Tujuan Produk

-   Memudahkan pemula mempelajari karakter kana dan romaji.
-   Memberikan latihan yang terstruktur dan menyenangkan.
-   Membantu pengguna mengulang karakter yang belum dikuasai.
-   Menampilkan hasil tes dan perkembangan belajar.
-   Menyediakan UI yang nyaman di desktop, tablet, dan ponsel.

## 3. Teknologi yang Direncanakan

  Teknologi            Peran
  -------------------- -------------------------------------------------
  Next.js App Router   Framework dan routing
  TypeScript           Tipe data dan struktur kode
  Tailwind CSS         Styling responsif
  Canvas API           Area menggambar dan membandingkan bentuk
  Local Storage        Penyimpanan awal progres dan riwayat di browser

### Catatan arsitektur

-   Gunakan direktori `app/` dari Next.js App Router.
-   Local Storage memungkinkan versi awal berjalan tanpa login/backend,
    tetapi data hanya tersedia di browser/perangkat yang sama dan dapat
    hilang jika data browser dihapus.
-   Jika kelak dibutuhkan akun atau sinkronisasi antarperangkat,
    tambahkan backend/database.
-   Komponen yang menggunakan Canvas dan API browser perlu dijalankan
    sebagai Client Components.

## 4. Arahan UI dan Identitas Visual

**Gaya:** simple, menarik, modern, bersih, dan nyaman untuk belajar.

Prinsip desain: - Tata letak minimalis dengan ruang kosong yang cukup. -
Kartu bersudut membulat dan bayangan tipis. - Ikon sederhana dan
tipografi yang mudah dibaca. - Karakter Jepang tampil besar dan jelas. -
Area menggambar luas. - Navigasi mudah ditemukan. - Desain responsif
untuk desktop, tablet, dan ponsel. - Kontras teks dan elemen interaktif
harus tetap terbaca.

### Palet warna

  Nama            Hex         Penggunaan
  --------------- ----------- ------------------------------------------
  Soft Pink       `#FFDDDD`   Latar lembut, highlight, kartu dekoratif
  Teal            `#55A9A0`   Tombol utama, progres, elemen interaktif
  Putih hangat    `#FFF8F7`   Latar utama alternatif
  Teks gelap      `#293C3A`   Teks utama
  Teks sekunder   `#6F7775`   Deskripsi dan metadata
  Pink lembut     `#FFF0EF`   Latar kartu sekunder
  Teal muda       `#D9EFEC`   Latar pendukung

Pilihan gaya akhir antara cute Jepang dan clean modern minimalis masih
bisa ditentukan sebelum implementasi.

## 5. Halaman Dashboard

Dashboard adalah halaman awal saat pengguna membuka website.

### Komponen yang direncanakan

-   **Welcome section:** sapaan, pengantar singkat, dan tombol mulai
    belajar.
-   **Ringkasan progres:** total tes, rata-rata skor, dan skor terbaik.
-   **Akses cepat:** Belajar Kana, Kuis Mengetik, Gambar Hiragana, dan
    Gambar Katakana.
-   **Aktivitas terakhir:** sesi tes terbaru.
-   **Target belajar harian:** indikator target apabila fitur target
    harian disetujui.
-   **Navigasi utama:** Dashboard, Belajar Kana, Kuis, Progress, dan
    History Test.

Angka statistik di mockup hanyalah contoh. Dashboard harus menggunakan
data aktual yang tersimpan, dan menampilkan keadaan kosong yang
informatif bagi pengguna baru.

## 6. Halaman Belajar Kana

Halaman ini menjadi tempat pengguna mempelajari karakter sebelum
mengikuti kuis.

### Fitur

-   Tab Hiragana dan Katakana terpisah.
-   Tabel 46 karakter dasar untuk setiap jenis kana.
-   Karakter dikelompokkan berdasarkan bunyi, misalnya baris vokal, K,
    S, T, N, dan seterusnya.
-   Klik karakter untuk melihat detail.
-   Detail menampilkan karakter Jepang, romaji, dan kelompoknya.
-   Pencarian berdasarkan kana atau romaji.
-   Penanda karakter yang sudah dipelajari.
-   Tombol untuk mulai latihan yang relevan.

### Panduan urutan goresan

Panduan stroke order merupakan fitur tambahan yang belum dipastikan.
Jika disetujui, fitur dapat mencakup animasi urutan goresan, nomor
langkah, contoh karakter, dan area untuk mencoba menulis sendiri.

## 7. Kuis Mengetik Kana

### Aturan yang telah disepakati

-   25 soal per sesi.
-   Tidak menggunakan pilihan ganda; jawaban diketik langsung.
-   Arah soal diacak antara:
    -   Karakter kana → ketik romaji.
    -   Romaji → ketik karakter kana.
-   Mode yang direncanakan: hiragana, katakana, atau campuran.

### Detail yang masih perlu ditetapkan

Aturan poin, toleransi variasi penulisan romaji, waktu menampilkan
koreksi, dan bentuk ulasan hasil belum dikunci sepenuhnya.

## 8. Kuis Menggambar Hiragana

-   Mode hiragana terpisah dari katakana.
-   25 soal per sesi.
-   Pilih 25 karakter acak yang berbeda dari 46 karakter dasar hiragana.
-   Pengguna menggambar menggunakan mouse atau layar sentuh.
-   Maksimal 3 percobaan per soal.
-   Skor terbaik dari 3 percobaan dihitung.
-   Karakter referensi ditampilkan setelah soal selesai.
-   Tampilkan persentase kemiripan, kategori hasil, dan skor soal.

## 9. Kuis Menggambar Katakana

Mekanismenya sama dengan kuis menggambar hiragana, tetapi menggunakan 46
karakter dasar katakana. Hiragana dan katakana tidak dicampur dalam satu
sesi menggambar.

## 10. Penilaian Kemiripan Gambar

Pendekatan awal menggunakan perbandingan bentuk berbasis Canvas, bukan
pengenalan karakter berbasis AI.

Hal yang perlu diperhatikan: - Normalisasi ukuran dan posisi gambar. -
Membandingkan bentuk secara konsisten meskipun ukuran tulisan berbeda. -
Menguji variasi gaya tulisan, ketebalan garis, ukuran, dan posisi. -
Menetapkan kategori dan ambang skor setelah pengujian.

**Penting:** persentase merupakan estimasi kemiripan algoritmik, bukan
bukti pasti bahwa karakter ditulis dengan benar atau sesuai urutan
goresan.

## 11. Hasil Kuis

Halaman atau panel hasil direncanakan menampilkan: - Skor akhir dan
ringkasan sesi. - Koreksi jawaban kuis mengetik sesuai aturan final. -
Persentase kemiripan dan kategori hasil pada kuis menggambar. - Akses
untuk mencoba lagi, kembali ke Dashboard, atau melihat History Test.

## 12. Progress

Ringkasan perkembangan yang direncanakan: - Total sesi tes. - Rata-rata
skor. - Skor terbaik. - Ringkasan berdasarkan jenis kuis. - Perkembangan
hasil dari waktu ke waktu jika data mencukupi.

## 13. History Test

### Fitur

-   Daftar semua sesi tes.
-   Urutkan dari sesi terbaru.
-   Filter berdasarkan jenis tes:
    -   Kuis Mengetik Kana.
    -   Menggambar Hiragana.
    -   Menggambar Katakana.
-   Statistik jumlah tes, rata-rata skor, dan skor terbaik.
-   Informasi setiap sesi: tanggal, jenis/mode, jumlah soal, dan skor.
-   Membuka detail sesi.

### Keputusan yang belum ditetapkan

Belum diputuskan apakah detail riwayat akan menampilkan setiap soal,
jawaban pengguna, jawaban benar, dan skor kemiripan gambar, atau hanya
ringkasan skor akhir.

## 14. Review Kesalahan --- Usulan Fitur

Halaman untuk mengulang karakter yang sebelumnya sering salah dijawab
atau sulit digambar.

Usulan kemampuan: - Mengumpulkan soal yang salah dari riwayat. -
Menampilkan karakter, romaji, dan jawaban yang benar. - Tombol latihan
ulang. - Filter berdasarkan jenis kuis.

Fitur ini direkomendasikan, tetapi belum ditetapkan sebagai kebutuhan
final.

## 15. Flashcard --- Usulan Fitur

Kartu hafalan dengan karakter di satu sisi dan romaji di sisi lain.

Usulan kemampuan: - Mode hiragana dan katakana. - Tampilkan atau balik
kartu untuk melihat jawaban. - Tandai "Sudah hafal" atau "Belum
hafal". - Prioritaskan kartu yang belum dikuasai.

Fitur ini direkomendasikan sebagai pelengkap halaman Belajar Kana,
tetapi belum ditetapkan sebagai kebutuhan final.

## 16. Daily Challenge dan Achievement --- Usulan Fitur

-   Target latihan harian, misalnya sejumlah karakter atau satu sesi.
-   Streak berdasarkan hari latihan.
-   Lencana pencapaian, misalnya First Quiz, Perfect Score, atau 7-Day
    Streak.
-   Indikator progres target.

Fitur gamifikasi ini opsional dan dapat ditambahkan setelah fitur inti
stabil.

## 17. Halaman dan Navigasi

  -----------------------------------------------------------------------
  Halaman                             Fungsi
  ----------------------------------- -----------------------------------
  Dashboard                           Halaman awal, progres ringkas,
                                      akses cepat, aktivitas terakhir

  Belajar Kana                        Tabel karakter, romaji, pencarian,
                                      penanda belajar

  Kuis Mengetik                       Latihan mengetik kana dan romaji

  Gambar Hiragana                     Latihan menggambar hiragana

  Gambar Katakana                     Latihan menggambar katakana

  Hasil Kuis                          Skor, koreksi, ringkasan sesi

  Progress                            Statistik perkembangan

  History Test                        Riwayat, filter, detail sesi

  Review Kesalahan                    Usulan untuk mengulang jawaban yang
                                      salah

  Flashcard                           Usulan untuk latihan hafalan
  -----------------------------------------------------------------------

Navigasi utama sebaiknya tidak terlalu padat. Kelompok yang
disarankan: - **Dashboard** - **Belajar** --- Belajar Kana dan Flashcard
jika disetujui - **Latihan** --- Kuis Mengetik dan Kuis Menggambar -
**Perkembangan** --- Progress, History Test, dan Review Kesalahan jika
disetujui

## 18. Data yang Perlu Disimpan

Struktur awal setiap sesi dapat mencakup: - ID sesi. - Waktu sesi
selesai. - Jenis tes dan mode karakter. - Jumlah soal dan skor akhir. -
Detail soal apabila fitur ulasan diaktifkan.

Detail soal dapat mencakup karakter target, arah soal mengetik, jawaban
pengguna, jawaban benar, status benar/salah, jumlah percobaan
menggambar, dan skor kemiripan terbaik.

Data penguasaan karakter, target harian, streak, atau pencapaian hanya
diperlukan jika fitur terkait disetujui.

## 19. Alur Pengguna

1.  Pengguna membuka Dashboard.
2.  Memilih Belajar Kana atau langsung memilih latihan.
3.  Jika belajar, pengguna mempelajari karakter dan romaji.
4.  Pengguna memulai sesi kuis berisi 25 soal.
5.  Sistem menampilkan hasil dan koreksi sesuai aturan kuis.
6.  Sesi disimpan di browser.
7.  Pengguna memeriksa Progress atau History Test.
8.  Pengguna dapat mengulang latihan atau meninjau kesalahan jika fitur
    Review Kesalahan diimplementasikan.

## 20. Aksesibilitas dan Responsivitas

-   Tombol dan input memiliki label yang jelas.
-   Navigasi dapat digunakan dengan keyboard.
-   Jangan mengandalkan warna saja untuk membedakan benar dan salah.
-   Area menggambar mendukung mouse dan sentuhan.
-   Target sentuh cukup besar.
-   Hindari scroll horizontal pada layar kecil.
-   Pastikan kontras teks memadai pada latar pink dan teal.
-   Sediakan pesan yang jelas untuk keadaan kosong, jawaban salah, dan
    kesalahan penyimpanan.

## 21. Tahapan Implementasi yang Disarankan

1.  **Fondasi:** setup Next.js App Router, TypeScript, Tailwind, token
    warna, navigasi, dan kerangka halaman.
2.  **Dashboard dan Belajar Kana:** layout awal, tabel karakter,
    pencarian, dan detail karakter.
3.  **Kuis Mengetik:** data kana, mode, pengacakan, input, evaluasi, dan
    hasil.
4.  **Kuis Menggambar:** Canvas, pemilihan karakter, percobaan,
    algoritma kemiripan, dan pengujian.
5.  **Progress dan History Test:** Local Storage, statistik, filter, dan
    detail sesi.
6.  **Penyempurnaan:** aksesibilitas, responsivitas, pengujian alur, dan
    perbaikan bug.
7.  **Fitur tambahan opsional:** Review Kesalahan, Flashcard, stroke
    order, Daily Challenge, dan Achievement sesuai prioritas.

## 22. Keputusan yang Sudah Disepakati

-   Nama proyek: Kana Quest.
-   Next.js digunakan; App Router direkomendasikan.
-   TypeScript dan Tailwind CSS direkomendasikan.
-   Warna utama: `#FFDDDD` dan `#55A9A0`.
-   UI diinginkan simple, menarik, dan modern.
-   Dashboard menjadi halaman awal.
-   Halaman Belajar Kana ditambahkan dengan tab hiragana dan katakana
    serta tabel karakter dan romaji.
-   Kuis mengetik berisi 25 soal tanpa pilihan ganda, dengan arah soal
    acak.
-   Kuis menggambar hiragana dan katakana dipisahkan, masing-masing 25
    soal, 46 karakter dasar, tanpa pengulangan, maksimal 3 percobaan per
    soal.
-   Penilaian gambar menggunakan kemiripan bentuk berbasis Canvas, bukan
    pengenalan AI.
-   Progress dan History Test termasuk dalam ruang lingkup.
-   Konsep dibahas terlebih dahulu; implementasi belum dimulai.

## 23. Hal yang Masih Perlu Diputuskan

1.  Aturan skor, koreksi, dan toleransi jawaban kuis mengetik.
2.  Apakah detail History Test menampilkan jawaban setiap soal.
3.  Kategori dan ambang skor kemiripan gambar setelah pengujian.
4.  Apakah panduan urutan goresan dimasukkan ke versi awal.
5.  Pilihan gaya visual akhir: cute Jepang atau clean modern minimalis.
6.  Apakah Local Storage cukup untuk versi pertama.
7.  Prioritas final untuk Review Kesalahan, Flashcard, Daily Challenge,
    dan Achievement.

------------------------------------------------------------------------

**Status dokumen:** Spesifikasi konsep awal\
**Status implementasi:** Belum dimulai
