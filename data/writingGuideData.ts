// data/writingGuideData.ts
// Data komprehensif kaidah dan tata cara menulis Romaji, Hiragana, dan Katakana dengan baik dan benar.

export type StrokeType = "tome" | "hane" | "harai";

export interface StrokeStep {
  stepNumber: number;
  tip: string;
  strokeType: StrokeType;
  direction: string; // Misal: "Kiri ke kanan", "Atas ke bawah miring", "Loop melingkar"
  startPoint: { x: number; y: number }; // Persentase 0-100 pada grid
  endPoint: { x: number; y: number };
}

export interface KanaWritingData {
  character: string;
  strokes: number;
  steps: StrokeStep[];
  handwritingNote?: string;
  pitfalls?: string;
}

export interface WritingGuideItem {
  id: string;
  romaji: string;
  row: string;
  rowName: string;
  hiragana: KanaWritingData;
  katakana: KanaWritingData;
  examples: {
    wordHiragana: string;
    wordKatakana: string;
    romaji: string;
    meaning: string;
  }[];
}

// 7 Prinsip Emas Urutan Goresan (Kakijun / 筆順)
export interface WritingRule {
  id: string;
  title: string;
  japanese: string;
  description: string;
  rationale: string;
  exampleKana: string[];
  tip: string;
}

export const GOLDEN_WRITING_RULES: WritingRule[] = [
  {
    id: "top-to-bottom",
    title: "1. Dari Atas ke Bawah",
    japanese: "上から下へ (Ue kara shita e)",
    description: "Goresan yang posisinya berada di bagian atas selalu ditarik terlebih dahulu sebelum goresan di bagian bawah.",
    rationale: "Menjaga keseimbangan vertikal karakter agar proporsional dan tidak jatuh ke bawah.",
    exampleKana: ["三", "エ", "ニ", "ミ", "う", "え"],
    tip: "Mulailah selalu dari garis atau titik paling atas, jangan menggambar bagian bawah lebih dulu."
  },
  {
    id: "left-to-right",
    title: "2. Dari Kiri ke Kanan",
    japanese: "左から右へ (Hidari kara migi e)",
    description: "Goresan horizontal dan elemen yang berada di sisi kiri selalu ditulis mendahului elemen di sisi kanan.",
    rationale: "Arah alami pergerakan tangan dan kuas kaligrafi agar tulisan mengalir lancar.",
    exampleKana: ["い", "り", "ハ", "リ", "ル", "け"],
    tip: "Tarik garis kiri terlebih dahulu, lalu lanjutkan dengan garis pendamping di sebelah kanan."
  },
  {
    id: "horizontal-before-vertical",
    title: "3. Garis Horizontal Sebelum Vertikal",
    japanese: "横が先、縦が後 (Yoko ga saki, tate ga ato)",
    description: "Ketika ada garis horizontal dan vertikal yang saling bersilangan atau berpotongan, tarik garis mendatar terlebih dahulu.",
    rationale: "Garis horizontal menjadi patokan lebar dan pondasi sebelum garis vertikal membelahnya secara simetris.",
    exampleKana: ["十", "木", "あ", "せ", "ナ", "オ"],
    tip: "Garis mendatar menjadi jangkar; garis vertikal kemudian memotong di titik tengah yang presisi."
  },
  {
    id: "center-before-sides",
    title: "4. Garis Tengah Sebelum Sisi Kiri-Kanan",
    japanese: "中が先、左右が後 (Naka ga saki, sayuu ga ato)",
    description: "Untuk karakter yang memiliki pilar vertikal di tengah dengan sayap atau lengkungan simetris di kedua sisinya, buat pilar tengah terlebih dahulu.",
    rationale: "Menentukan sumbu simetri utama terlebih dahulu sehingga kedua sisi kiri dan kanan bisa seimbang.",
    exampleKana: ["小", "水", "木", "ホ"],
    tip: "Tarik tiang tengah lurus, lalu tambahkan sayap kiri, dan terakhir sayap kanan."
  },
  {
    id: "enclosure-inside-close",
    title: "5. Kotak Luar, Isi Tengah, Baru Tutup Bawah",
    japanese: "外側から内側、最後に閉じる (Sotogawa kara uchigawa, saigo ni tojiru)",
    description: "Ketika menulis bentuk kotak atau bingkai tertutup: buat garis kiri, lalu garis atas-siku kanan, isi elemen di dalam kotak jika ada, dan terakhir tutup dengan garis horizontal paling bawah.",
    rationale: "Memastikan ruang di dalam kotak cukup luas dan rapi sebelum menguncinya dengan garis bawah.",
    exampleKana: ["口", "日", "目", "四", "ロ", "コ"],
    tip: "Garis horizontal penutup bawah SELALU menjadi goresan terakhir dari sebuah kotak."
  },
  {
    id: "left-diagonal-before-right",
    title: "6. Miring Kiri Sebelum Miring Kanan",
    japanese: "左払いが先、右払いが後 (Hidari-barai ga saki, migi-barai ga ato)",
    description: "Ketika ada dua goresan diagonal yang menyilang atau membentuk atap segitiga, sapuan miring ke kiri bawah ditarik sebelum sapuan ke kanan bawah.",
    rationale: "Sesuai kaidah kaligrafi kanji kuno untuk membentuk kuda-kuda karakter yang kokoh.",
    exampleKana: ["人", "八", "文", "メ", "ス", "ソ"],
    tip: "Tarik goresan diagonal kiri (ノ) terlebih dahulu, baru diagonal kanan yang menyilang atau menopang."
  },
  {
    id: "dots-diacritics-last",
    title: "7. Titik & Tanda Diakritik Selalu Terakhir",
    japanese: "点や濁点は最後 (Ten ya dakuten wa saigo)",
    description: "Titik aksen terpisah (seperti pada お, む, ふ) serta tanda Tenten (゛) dan Maru (゜) selalu digoreskan paling akhir setelah bentuk dasar huruf selesai dibuat.",
    rationale: "Agar posisi titik aksen dapat ditempatkan pada koordinat yang tepat relatif terhadap badan utama huruf.",
    exampleKana: ["お", "む", "ふ", "が", "ば", "ぱ"],
    tip: "Selesaikan tubuh utama karakter 100%, baru bubuhkan titik aksen atau tanda dakuon di kanan atas."
  }
];

// 3 Karakteristik Ujung Goresan Esensial (Hitsu-shitsu / 筆質)
export interface StrokeTypeInfo {
  type: StrokeType;
  nameIndo: string;
  nameJap: string;
  romaji: string;
  description: string;
  technique: string;
  examples: string[];
}

export const STROKE_TYPES_INFO: StrokeTypeInfo[] = [
  {
    type: "tome",
    nameIndo: "Tome (Berhenti Tegas)",
    nameJap: "止め",
    romaji: "Tome",
    description: "Ujung goresan dihentikan secara mantap dan terkontrol tanpa mengangkat pena secara tiba-tiba.",
    technique: "Tekan pensil/kuas dengan stabil sampai ujung garis, berhenti sejenak ~0.5 detik, lalu angkat lurus tegak ke atas.",
    examples: ["一", "こ (garis atas & bawah)", "エ (semua garis)", "ニ"]
  },
  {
    type: "hane",
    nameIndo: "Hane (Kait / Sentakan Melenting)",
    nameJap: "跳ね",
    romaji: "Hane",
    description: "Di ujung goresan, pena menyentak atau melenting membentuk kait kecil tajam ke arah goresan berikutnya.",
    technique: "Pada titik akhir garis, kurangi sedikit tekanan lalu gerakkan ujung pena menyentak cepat ke atas atau samping diagonal.",
    examples: ["い (goresan 1)", "か (goresan 1)", "し (lengkung akhir)", "り (goresan 1)"]
  },
  {
    type: "harai",
    nameIndo: "Harai (Sapuan Lepas Melayang)",
    nameJap: "払い",
    romaji: "Harai",
    description: "Goresan disapu meluncur dengan melepaskan tekanan tangan secara perlahan hingga garis meruncing halus.",
    technique: "Gerakkan pena meluncur mulus sambil mengangkatnya secara bertahap dari kertas, menghasilkan ujung garis yang tipis runcing.",
    examples: ["の", "人", "ノ", "ル (kaki kanan)", "レ"]
  }
];

// Analisis Karakter Mirip yang Sering Salah Tulis
export interface SimilarPair {
  title: string;
  kanaType: "hiragana" | "katakana";
  charA: { char: string; romaji: string; strokes: number; direction: string; tip: string };
  charB: { char: string; romaji: string; strokes: number; direction: string; tip: string };
  keyDifference: string;
}

export const SIMILAR_CHARACTERS_GUIDE: SimilarPair[] = [
  {
    title: "Katakana Shi (シ) vs Tsu (ツ)",
    kanaType: "katakana",
    charA: {
      char: "シ",
      romaji: "shi",
      strokes: 3,
      direction: "Garis ke-3 ditarik dari KIRI BAWAH menyapu ke KANAN ATAS (sudut landai ~30°).",
      tip: "Bayangkan wajah mendongak: 2 titik sejajar vertikal di kiri, lalu sapuan meluncur naik dari bawah."
    },
    charB: {
      char: "ツ",
      romaji: "tsu",
      strokes: 3,
      direction: "Garis ke-3 ditarik dari KANAN ATAS menyapu ke KIRI BAWAH (sudut curam ~60°).",
      tip: "Bayangkan air menetes: 2 titik berjejer horizontal di atas, lalu sapuan menukik turun dari atas."
    },
    keyDifference: "Arah sapuan garis panjang: Shi ditarik dari BAWAH ke ATAS; Tsu ditarik dari ATAS ke BAWAH."
  },
  {
    title: "Katakana So (ソ) vs N (ン)",
    kanaType: "katakana",
    charA: {
      char: "ソ",
      romaji: "so",
      strokes: 2,
      direction: "Garis ke-2 ditarik dari KANAN ATAS menukik turun ke KIRI BAWAH.",
      tip: "Pasangan dari Tsu (ツ). Titik pertama tegak, garis panjang jatuh menukik ke bawah."
    },
    charB: {
      char: "ン",
      romaji: "n",
      strokes: 2,
      direction: "Garis ke-2 ditarik dari KIRI BAWAH melesat naik ke KANAN ATAS.",
      tip: "Pasangan dari Shi (シ). Titik pertama mendatar, garis panjang melesat naik ke atas."
    },
    keyDifference: "So ditarik menukik dari ATAS ke BAWAH; N ditarik meluncur dari BAWAH ke ATAS."
  },
  {
    title: "Katakana Ku (ク) vs Wa (ワ) vs Ta (タ)",
    kanaType: "katakana",
    charA: {
      char: "ク",
      romaji: "ku",
      strokes: 2,
      direction: "Goresan ke-2 berawal dari garis miring pertama lalu membelok tajam menyapu ke kiri bawah.",
      tip: "Bentuk terbuka tanpa garis vertikal pendek di kiri atas."
    },
    charB: {
      char: "ワ",
      romaji: "wa",
      strokes: 2,
      direction: "Goresan ke-1 adalah garis vertikal pendek di kiri atas, lalu garis ke-2 siku horizontal melengkung ke kiri bawah.",
      tip: "Memiliki tiang vertikal pendek di kiri atas sebagai patokan."
    },
    keyDifference: "ク tidak memiliki tiang kiri; ワ memiliki tiang kiri pendek; タ memiliki garis memotong di bagian perut."
  },
  {
    title: "Hiragana Re (れ) vs Wa (わ) vs Ne (ね)",
    kanaType: "hiragana",
    charA: {
      char: "れ",
      romaji: "re",
      strokes: 2,
      direction: "Bagian kanan meliuk seperti gelombang lalu berakhir dengan kait/sapuan terbuka ke KANAN ATAS.",
      tip: "Ujung akhir 're' membuka ke luar kanan seperti ekor burung berkicau."
    },
    charB: {
      char: "わ",
      romaji: "wa",
      strokes: 2,
      direction: "Bagian kanan melengkung bulat besar ke dalam seperti busur atau angka 3 mulus.",
      tip: "Ujung akhir 'wa' melengkung bulat ke dalam tanpa loop atau kait."
    },
    keyDifference: "れ berujung kait ke luar kanan; わ berujung lengkung bulat polos; ね berujung lingkaran loop tertutup."
  },
  {
    title: "Hiragana Tulisan Tangan Sa (さ) & Ki (き)",
    kanaType: "hiragana",
    charA: {
      char: "さ",
      romaji: "sa",
      strokes: 3,
      direction: "Garis mendatar (1), garis miring berkait (2), lengkungan bawah TERPISAH (3).",
      tip: "Dalam tulisan tangan standar (Kyōkasho-tai), garis bawah さ HARUS terpisah dari kait garis kedua!"
    },
    charB: {
      char: "き",
      romaji: "ki",
      strokes: 4,
      direction: "Dua garis mendatar (1 & 2), garis miring berkait (3), lengkungan bawah TERPISAH (4).",
      tip: "Garis lengkung bawah ki juga terpisah dalam tulisan tangan resmi Jepang."
    },
    keyDifference: "Di font cetak komputer sering tersambung menjadi satu loop, tetapi dalam tulisan tangan yang benar harus TERPISAH."
  }
];

// Kaidah Penulisan Romaji Lengkap & Benar
export interface RomajiSection {
  title: string;
  badge: string;
  explanation: string;
  rules: {
    ruleTitle: string;
    correct: string;
    wrong: string;
    note: string;
  }[];
}

export const ROMAJI_WRITING_RULES: RomajiSection[] = [
  {
    title: "1. Standar Romanisasi: Hepburn vs Kunrei",
    badge: "Sistem Standar",
    explanation: "Dalam pembelajaran global, paspor, dan plang stasiun Jepang, sistem 'Modified Hepburn' adalah standar resmi yang paling umum karena mewakili bunyi fonetik bahasa Inggris dan internasional.",
    rules: [
      {
        ruleTitle: "Karakter Baris S (し)",
        correct: "shi (Contoh: sushi, Hiroshima)",
        wrong: "si (susi, Hirosima)",
        note: "Bunyi konsonan adalah alveolo-palatal desis lembut seperti 'sy' pada 'syarat'."
      },
      {
        ruleTitle: "Karakter Baris T (ち & つ)",
        correct: "chi & tsu (Contoh: Tokyo, tsunami, matcha)",
        wrong: "ti & tu (tunami, matya)",
        note: "'Chi' berbunyi seperti 'c' pada 'cinta'; 'Tsu' berbunyi desis 'ts' pada 'tsunami'."
      },
      {
        ruleTitle: "Karakter Baris H (ふ)",
        correct: "fu (Contoh: Fuji, tofu)",
        wrong: "hu (Huji, tohu)",
        note: "Bunyi bibir bilabial hembus tanpa menyentuh gigi, dilambangkan 'fu'."
      },
      {
        ruleTitle: "Karakter Dakuon (じ & ぢ)",
        correct: "ji (Contoh: Kanji, jidousha)",
        wrong: "zi / di",
        note: "Dalam Hepburn, keduanya ditulis 'ji' karena pengucapan modernnya identik."
      }
    ]
  },
  {
    title: "2. Kaidah Vokal Panjang (Chōon / 長音)",
    badge: "Bunyi Panjang",
    explanation: "Vokal panjang dalam bahasa Jepang mengubah arti kata secara fatal. Penulisan Romaji yang tepat menggunakan garis datar di atas huruf (Macron: ā, ī, ū, ē, ō) atau penulisan ejaan kana asli.",
    rules: [
      {
        ruleTitle: "Vokal O Panjang (おう)",
        correct: "Tōkyō atau Toukyou (東京), arigatō (ありがとう)",
        wrong: "Tokyo (jika tanpa konteks / arti keliru), arigato",
        note: "'O' panjang berasal dari kombinasi 'o + u' (おう) atau 'o + o' (おお). Tanda makron 'ō' atau 'ou' menjaga panjang bunyi 2 ketukan (mora)."
      },
      {
        ruleTitle: "Vokal U Panjang (うう)",
        correct: "kyūdō / kyuudou (弓道), yūki / yuuki (勇気)",
        wrong: "kyudo (bisa tertukar dengan arti lain)",
        note: "Dua ketukan 'uu' ditulis 'ū' atau 'uu'."
      },
      {
        ruleTitle: "Katakana Dash Panjang (ー)",
        correct: "rāmen / raamen (ラーメン), kōhī / koohii (コーヒー)",
        wrong: "ramen / kohi (bunyi pendek)",
        note: "Tanda dash 'ー' pada Katakana menandakan bunyi vokal sebelumnya ditarik panjang 2 ketukan."
      }
    ]
  },
  {
    title: "3. Konsonan Ganda / Sokuon (っ / ッ)",
    badge: "Jeda Sejenak (Stop)",
    explanation: "Huruf kecil 'tsu' (っ / ッ) melambangkan konsonan kembar atau jeda henti sesaat (glottal stop) sebelum konsonan berikutnya diucapkan.",
    rules: [
      {
        ruleTitle: "Penggandaan Konsonan Biasa (k, s, t, p)",
        correct: "gakkō (がっこう = sekolah), kitte (きって = perangko), zasshi (ざっし = majalah)",
        wrong: "gakukou, kitete, zatshi",
        note: "Huruf konsonan berikutnya digandakan (kk, tt, ss, pp)."
      },
      {
        ruleTitle: "Pengecualian Khusus Bunyi 'Ch' (っ + ち / ちゃ)",
        correct: "matchi (まっち = korek api), botchan (坊ちゃん)",
        wrong: "macchi (kurang tepat dalam Modified Hepburn)",
        note: "Dalam Modified Hepburn, konsonan ganda sebelum 'ch' ditulis dengan huruf 't', menjadi 'tch' bukan 'cch'."
      }
    ]
  },
  {
    title: "4. Partikel Gramatikal Khusus (は, を, へ)",
    badge: "Partikel Tata Bahasa",
    explanation: "Beberapa karakter kana diucapkan berbeda ketika berfungsi sebagai partikel gramatikal kalimat, sehingga penulisan Romaji-nya mengikuti bunyi pengucapannya, BUKAN bentuk ejaan huruf dasarnya.",
    rules: [
      {
        ruleTitle: "Partikel Topik: は",
        correct: "Watashi wa Tanaka desu (私は田中です)",
        wrong: "Watashi ha Tanaka desu",
        note: "Huruf 'ha' (は) saat berfungsi sebagai partikel penanda topik WAJIB ditulis 'wa'."
      },
      {
        ruleTitle: "Partikel Objek: を",
        correct: "Hon o yomimasu (本を読みます)",
        wrong: "Hon wo yomimasu (wo hanya untuk input keyboard IME)",
        note: "Huruf 'wo' (を) dalam bahasa Jepang modern diucapkan 'o' murni, sehingga ditulis 'o' dalam Romaji standar Hepburn."
      },
      {
        ruleTitle: "Partikel Arah: へ",
        correct: "Nihon e ikimasu (日本へ行きます)",
        wrong: "Nihon he ikimasu",
        note: "Huruf 'he' (へ) saat berfungsi sebagai partikel arah pergerakan WAJIB ditulis 'e'."
      }
    ]
  },
  {
    title: "5. Huruf Sengau 'N' (ん) & Tanda Apostrof",
    badge: "Pemisah Suku Kata",
    explanation: "Huruf 'n' (ん) adalah satu-satunya konsonan tunggal tanpa vokal di bahasa Jepang. Penggunaan tanda apostrof (') sangat penting untuk mencegah kerancuan makna dengan suku kata baris Na/Nya.",
    rules: [
      {
        ruleTitle: "Pemisah Apostrof Sebelum Vokal (a, i, u, e, o)",
        correct: "tan'i (単位 = satuan / unit), kin'en (禁煙 = dilarang merokok)",
        wrong: "tani (谷 = lembah!), kinen (記念 = peringatan!)",
        note: "Tanda apostrof menunjukkan bahwa 'n' berdiri sendiri sebagai 'ん', bukan suku kata 'ni' (に) atau 'ne' (ね)."
      },
      {
        ruleTitle: "Pemisah Sebelum Huruf 'Y'",
        correct: "shin'yō (信用 = kepercayaan), jun'yōkan (巡洋艦)",
        wrong: "shinyo (akan dibaca しにょ)",
        note: "Membedakan antara 'n + yo' (ん + よ) dengan 'nyo' (にょ / yoon)."
      },
      {
        ruleTitle: "Sebelum Konsonan Bilabial (b, m, p)",
        correct: "shinbun atau shimbun (新聞 = koran), senpai atau sempai",
        wrong: "simbun",
        note: "Hepburn Tradisional menulis 'm' sebelum b/m/p karena bibir otomatis terkatup. Hepburn Modern memperbolehkan penulisan 'n'."
      }
    ]
  }
];

// Soal Latihan Kuis Romaji Cepat
export interface RomajiQuizItem {
  id: number;
  question: string;
  kanaText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const ROMAJI_QUIZ_DATA: RomajiQuizItem[] = [
  {
    id: 1,
    question: "Manakah penulisan Romaji yang benar untuk kalimat 'わたしは がくせいです'?",
    kanaText: "わたしは がくせいです",
    options: [
      "Watashi ha gakusei desu",
      "Watashi wa gakusei desu",
      "Watasi wa gakusei desu",
      "Watashi wa gakuse desu"
    ],
    correctAnswer: 1,
    explanation: "Partikel topik 'は' dibaca dan ditulis 'wa' dalam Romaji, dan 'し' ditulis 'shi' menurut standar Hepburn."
  },
  {
    id: 2,
    question: "Bagaimana penulisan kata 'がっこう' (sekolah) dalam Romaji yang baik dan benar?",
    kanaText: "がっこう",
    options: [
      "Gakukou",
      "Gakkou / Gakkō",
      "Gaku kou",
      "Gatkou"
    ],
    correctAnswer: 1,
    explanation: "Huruf kecil 'っ' menggandakan konsonan berikutnya ('k' -> 'kk'), dan 'ou' dilafalkan sebagai vokal panjang 'ō' atau 'ou'."
  },
  {
    id: 3,
    question: "Bagaimana menulis kata 'まっち' (korek api) sesuai standar Modified Hepburn?",
    kanaText: "まっち",
    options: [
      "Matchi",
      "Macchi",
      "Maty",
      "Matschi"
    ],
    correctAnswer: 0,
    explanation: "Dalam Modified Hepburn, konsonan ganda sokuon (っ) sebelum bunyi 'ch' ditulis dengan huruf 't', menghasilkan 'matchi'."
  },
  {
    id: 4,
    question: "Mengapa kata '単位' (たんい = unit) harus ditulis 'tan'i' dan bukan 'tani'?",
    kanaText: "たんい",
    options: [
      "Hanya hiasan tanda baca",
      "Jika ditulis 'tani', artinya berubah menjadi '谷' (lembah)",
      "Karena huruf vokal 'i' harus selalu didahului apostrof",
      "Agar huruf n dibaca lebih keras"
    ],
    correctAnswer: 1,
    explanation: "Tanda apostrof memisahkan huruf n (ん) tunggal dari vokal i (い). Jika digabung menjadi 'tani', pembaca akan mengiranya sebagai たに (谷 = lembah)."
  },
  {
    id: 5,
    question: "Manakah pasangan penulisan Katakana yang memiliki arah sapuan dari KIRI BAWAH ke KANAN ATAS?",
    kanaText: "シ (shi) & ン (n)",
    options: [
      "Tsu (ツ) dan So (ソ)",
      "Shi (シ) dan N (ン)",
      "Ku (ク) dan Wa (ワ)",
      "Ta (タ) dan Nu (ヌ)"
    ],
    correctAnswer: 1,
    explanation: "Katakana Shi (シ) dan N (ン) memiliki goresan panjang yang disapu mendaki dari kiri bawah meluncur ke kanan atas."
  }
];

// 46 Karakter Dasar Gojūon Lengkap dengan Langkah Goresan untuk Hiragana DAN Katakana
export const WRITING_GUIDE_KANA: WritingGuideItem[] = [
  // --- VOWEL ROW (A-I-U-E-O) ---
  {
    id: "a",
    romaji: "a",
    row: "vowel",
    rowName: "Baris Vokal (A-I-U-E-O)",
    hiragana: {
      character: "あ",
      strokes: 3,
      handwritingNote: "Garis horizontal atas agak melengkung naik lembut. Tiang vertikal sedikit melengkung ke kanan.",
      pitfalls: "Jangan membuat lingkaran perut terlalu kecil atau menyentuh garis horizontal atas.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal dari kiri ke kanan, sedikit condong naik.",
          strokeType: "tome",
          direction: "Kiri ke kanan (Horizontal)",
          startPoint: { x: 25, y: 30 },
          endPoint: { x: 75, y: 30 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis vertikal sedikit melengkung memotong di tengah garis pertama.",
          strokeType: "tome",
          direction: "Atas ke bawah (Vertikal lengkung)",
          startPoint: { x: 50, y: 15 },
          endPoint: { x: 45, y: 85 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari sisi kiri tiang, putar loop searah jarum jam ke bawah dan buat lengkung perut besar.",
          strokeType: "harai",
          direction: "Putaran melingkar searah jarum jam",
          startPoint: { x: 30, y: 55 },
          endPoint: { x: 75, y: 75 }
        }
      ]
    },
    katakana: {
      character: "ア",
      strokes: 2,
      handwritingNote: "Garis pertama memiliki sudut siku tajam. Garis kedua adalah sapuan melengkung anggun.",
      pitfalls: "Garis kedua jangan terlalu lurus kaku; harus melengkung lembut ke kiri bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal ke kanan lalu tekuk diagonal ke kiri bawah (membentuk sudut siku tajam).",
          strokeType: "tome",
          direction: "Kiri ke kanan lalu tekuk ke kiri bawah",
          startPoint: { x: 25, y: 25 },
          endPoint: { x: 45, y: 55 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari titik tekukan garis pertama, tarik sapuan melengkung panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Atas menyapu melengkung ke kiri bawah",
          startPoint: { x: 60, y: 35 },
          endPoint: { x: 20, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "あめ", wordKatakana: "アメ", romaji: "ame", meaning: "Hujan / Permen" },
      { wordHiragana: "あさ", wordKatakana: "アサ", romaji: "asa", meaning: "Pagi hari" }
    ]
  },
  {
    id: "i",
    romaji: "i",
    row: "vowel",
    rowName: "Baris Vokal (A-I-U-E-O)",
    hiragana: {
      character: "い",
      strokes: 2,
      handwritingNote: "Garis kiri lebih panjang dan memiliki kait (hane) di ujungnya. Garis kanan lebih pendek.",
      pitfalls: "Kedua garis tidak boleh bersentuhan. Garis kanan jangan lebih panjang dari garis kiri.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis kiri melengkung turun ke bawah, akhiri dengan kait melenting ke atas (hane).",
          strokeType: "hane",
          direction: "Atas ke bawah dengan kait lentik di ujung",
          startPoint: { x: 30, y: 25 },
          endPoint: { x: 28, y: 75 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis kanan lebih pendek, melengkung lembut menghadap ke garis pertama.",
          strokeType: "tome",
          direction: "Atas ke bawah melengkung pendek",
          startPoint: { x: 70, y: 35 },
          endPoint: { x: 72, y: 65 }
        }
      ]
    },
    katakana: {
      character: "イ",
      strokes: 2,
      handwritingNote: "Goresan pertama adalah sapuan miring ke kiri bawah. Goresan kedua adalah tiang vertikal tegak lurus.",
      pitfalls: "Garis kedua harus menempel di tengah goresan pertama dan ditarik lurus ke bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik sapuan miring dari kanan atas meluncur ke kiri bawah.",
          strokeType: "harai",
          direction: "Kanan atas ke kiri bawah (miring)",
          startPoint: { x: 65, y: 20 },
          endPoint: { x: 30, y: 55 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari sekitar sepertiga atas garis pertama, tarik garis lurus tegak ke bawah.",
          strokeType: "tome",
          direction: "Atas lurus ke bawah (vertikal)",
          startPoint: { x: 45, y: 40 },
          endPoint: { x: 45, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "いぬ", wordKatakana: "イヌ", romaji: "inu", meaning: "Anjing" },
      { wordHiragana: "いえ", wordKatakana: "イエ", romaji: "ie", meaning: "Rumah" }
    ]
  },
  {
    id: "u",
    romaji: "u",
    row: "vowel",
    rowName: "Baris Vokal (A-I-U-E-O)",
    hiragana: {
      character: "う",
      strokes: 2,
      handwritingNote: "Titik atas pendek sedikit miring. Lengkungan bawah menyerupai telinga manusia.",
      pitfalls: "Jangan menyatukan titik atas dengan lengkungan bawah; sisakan celah udara yang jelas.",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik garis pendek miring sedikit ke kanan di bagian atas tengah.",
          strokeType: "tome",
          direction: "Kiri atas ke kanan bawah pendek",
          startPoint: { x: 45, y: 20 },
          endPoint: { x: 55, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik lengkungan besar membuka ke kiri di bagian bawah, menyapu lembut di ujungnya.",
          strokeType: "harai",
          direction: "Lengkung C terbalik membuka ke kiri",
          startPoint: { x: 35, y: 45 },
          endPoint: { x: 40, y: 85 }
        }
      ]
    },
    katakana: {
      character: "ウ",
      strokes: 3,
      handwritingNote: "Terdiri dari atap kanji (kanki). Titik tengah atas dibuat lebih dahulu.",
      pitfalls: "Garis kiri pendek dibuat sebelum garis horizontal bersiku kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik titik vertikal pendek di bagian atas tengah.",
          strokeType: "tome",
          direction: "Atas ke bawah pendek",
          startPoint: { x: 50, y: 15 },
          endPoint: { x: 50, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis pendek vertikal miring di sisi kiri.",
          strokeType: "tome",
          direction: "Atas ke bawah miring di kiri",
          startPoint: { x: 28, y: 35 },
          endPoint: { x: 26, y: 50 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari ujung atas garis kedua, tarik garis mendatar lalu tekuk melengkung ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal ke kanan lalu tekuk menyapu ke kiri bawah",
          startPoint: { x: 28, y: 35 },
          endPoint: { x: 40, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "うみ", wordKatakana: "ウミ", romaji: "umi", meaning: "Laut" },
      { wordHiragana: "うし", wordKatakana: "ウシ", romaji: "ushi", meaning: "Sapi" }
    ]
  },
  {
    id: "e",
    romaji: "e",
    row: "vowel",
    rowName: "Baris Vokal (A-I-U-E-O)",
    hiragana: {
      character: "え",
      strokes: 2,
      handwritingNote: "Garis kedua mirip angka 7 yang bagian bawahnya meliuk seperti gelombang air.",
      pitfalls: "Garis bawah jangan terlalu curam; buat landai meliuk ke kanan dengan ujung tumpul.",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat garis pendek miring ke kanan bawah di bagian atas tengah.",
          strokeType: "tome",
          direction: "Titik miring pendek",
          startPoint: { x: 45, y: 20 },
          endPoint: { x: 55, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis zig-zag mirip angka 7 lalu meliuk ke bawah kanan dengan gelombang lembut.",
          strokeType: "tome",
          direction: "Zig-zag horisontal-diagonal lalu meliuk horizontal",
          startPoint: { x: 30, y: 45 },
          endPoint: { x: 78, y: 82 }
        }
      ]
    },
    katakana: {
      character: "エ",
      strokes: 3,
      handwritingNote: "Sangat geometris seperti balok I kapital atau kanji pekerja (工).",
      pitfalls: "Garis horizontal bawah harus sedikit lebih panjang dari garis horizontal atas.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal kiri ke kanan",
          startPoint: { x: 30, y: 25 },
          endPoint: { x: 70, y: 25 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang vertikal di tengah garis pertama ke arah bawah.",
          strokeType: "tome",
          direction: "Vertikal lurus ke bawah",
          startPoint: { x: 50, y: 25 },
          endPoint: { x: 50, y: 75 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis horizontal bawah yang lebih panjang dari garis atas.",
          strokeType: "tome",
          direction: "Horizontal penutup bawah",
          startPoint: { x: 20, y: 75 },
          endPoint: { x: 80, y: 75 }
        }
      ]
    },
    examples: [
      { wordHiragana: "えき", wordKatakana: "エキ", romaji: "eki", meaning: "Stasiun" },
      { wordHiragana: "えんぴつ", wordKatakana: "エンピツ", romaji: "enpitsu", meaning: "Pensil" }
    ]
  },
  {
    id: "o",
    romaji: "o",
    row: "vowel",
    rowName: "Baris Vokal (A-I-U-E-O)",
    hiragana: {
      character: "お",
      strokes: 3,
      handwritingNote: "Tiang vertikal turun lalu memutar loop kecil ke kiri sebelum meliuk ke kanan.",
      pitfalls: "Titik ketiga (di kanan atas) jangan lupa dibubuhkan paling akhir.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal pendek dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal pendek",
          startPoint: { x: 25, y: 35 },
          endPoint: { x: 65, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Tarik vertikal memotong garis pertama, buat loop kecil ke kiri lalu busur besar ke kanan bawah.",
          strokeType: "harai",
          direction: "Vertikal turun, loop kiri, meliuk ke kanan",
          startPoint: { x: 45, y: 20 },
          endPoint: { x: 65, y: 78 }
        },
        {
          stepNumber: 3,
          tip: "Bubuhkan titik kecil miring di kanan atas sebagai penutup.",
          strokeType: "tome",
          direction: "Titik aksen kanan atas",
          startPoint: { x: 72, y: 32 },
          endPoint: { x: 80, y: 40 }
        }
      ]
    },
    katakana: {
      character: "オ",
      strokes: 3,
      handwritingNote: "Mirip kanji berbakat (才). Tiang vertikal memiliki kait kecil ke kiri.",
      pitfalls: "Garis horizontal dibuat pertama, lalu tiang vertikal berkait, dan terakhir garis miring.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal kiri ke kanan",
          startPoint: { x: 25, y: 35 },
          endPoint: { x: 75, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang vertikal memotong garis pertama, akhiri dengan kait kecil melenting ke kiri atas.",
          strokeType: "hane",
          direction: "Vertikal lurus dengan kait ke kiri",
          startPoint: { x: 50, y: 15 },
          endPoint: { x: 50, y: 85 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari persilangan tiang, tarik sapuan diagonal menyapu ke kanan bawah.",
          strokeType: "harai",
          direction: "Diagonal menyapu ke kanan bawah",
          startPoint: { x: 50, y: 42 },
          endPoint: { x: 85, y: 80 }
        }
      ]
    },
    examples: [
      { wordHiragana: "おんがく", wordKatakana: "オンガク", romaji: "ongaku", meaning: "Musik" },
      { wordHiragana: "おちゃ", wordKatakana: "オチャ", romaji: "ocha", meaning: "Teh hijau" }
    ]
  },

  // --- KA ROW ---
  {
    id: "ka",
    romaji: "ka",
    row: "k",
    rowName: "Baris Ka (Ka-Ki-Ku-Ke-Ko)",
    hiragana: {
      character: "か",
      strokes: 3,
      handwritingNote: "Garis pertama memiliki kait (hane) di bawah. Titik ketiga melayang di kanan atas.",
      pitfalls: "Jangan satukan garis lengkung kanan dengan titik atas.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal melengkung ke bawah, lalu lentingkan kait ke kiri atas (hane).",
          strokeType: "hane",
          direction: "Horizontal tekuk ke bawah dengan kait",
          startPoint: { x: 25, y: 35 },
          endPoint: { x: 42, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis sedikit melengkung memotong di sisi kanan garis pertama.",
          strokeType: "harai",
          direction: "Atas ke bawah miring memotong",
          startPoint: { x: 55, y: 22 },
          endPoint: { x: 30, y: 82 }
        },
        {
          stepNumber: 3,
          tip: "Bubuhkan titik garis miring pendek di sebelah kanan atas.",
          strokeType: "tome",
          direction: "Titik aksen kanan atas",
          startPoint: { x: 68, y: 32 },
          endPoint: { x: 76, y: 40 }
        }
      ]
    },
    katakana: {
      character: "カ",
      strokes: 2,
      handwritingNote: "Sangat mirip kanji kekuatan (力). Tanpa titik aksen di kanan atas.",
      pitfalls: "Jangan tambahkan titik ketiga pada Katakana カ (titik hanya ada pada Hiragana か).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal ke kanan lalu tekuk ke kiri bawah dengan kait kecil.",
          strokeType: "hane",
          direction: "Horizontal ke kanan tekuk kait ke kiri",
          startPoint: { x: 25, y: 30 },
          endPoint: { x: 50, y: 75 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis melengkung memotong dari atas kanan meluncur ke kiri bawah.",
          strokeType: "harai",
          direction: "Kanan atas meluncur ke kiri bawah",
          startPoint: { x: 58, y: 18 },
          endPoint: { x: 25, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "かさ", wordKatakana: "カサ", romaji: "kasa", meaning: "Payung" },
      { wordHiragana: "かばん", wordKatakana: "カバン", romaji: "kaban", meaning: "Tas" }
    ]
  },
  {
    id: "ki",
    romaji: "ki",
    row: "k",
    rowName: "Baris Ka (Ka-Ki-Ku-Ke-Ko)",
    hiragana: {
      character: "き",
      strokes: 4,
      handwritingNote: "Dua garis horizontal sejajar. Garis ke-4 melengkung di bawah HARUS TERPISAH dalam tulisan tangan.",
      pitfalls: "Jangan menyambungkan garis ke-3 dengan lengkung ke-4 menjadi loop tertutup seperti di font cetak.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal pendek atas",
          startPoint: { x: 32, y: 28 },
          endPoint: { x: 68, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kedua sejajar dan sedikit lebih panjang.",
          strokeType: "tome",
          direction: "Horizontal kedua sejajar",
          startPoint: { x: 26, y: 44 },
          endPoint: { x: 74, y: 44 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis diagonal memotong kedua garis horizontal, akhiri dengan kait ke kiri bawah.",
          strokeType: "hane",
          direction: "Diagonal memotong dengan kait",
          startPoint: { x: 58, y: 15 },
          endPoint: { x: 38, y: 68 }
        },
        {
          stepNumber: 4,
          tip: "Buat garis lengkung terpisah di bagian bawah menghadap ke kiri atas.",
          strokeType: "harai",
          direction: "Lengkungan bawah terpisah",
          startPoint: { x: 35, y: 78 },
          endPoint: { x: 65, y: 86 }
        }
      ]
    },
    katakana: {
      character: "キ",
      strokes: 3,
      handwritingNote: "Sama seperti Hiragana tetapi tanpa lengkungan ke-4 di bawah. Tiang ke-3 lurus diagonal.",
      pitfalls: "Hanya 3 goresan! Garis ke-3 tidak memiliki lengkungan bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas condong sedikit naik.",
          strokeType: "tome",
          direction: "Horizontal atas",
          startPoint: { x: 30, y: 32 },
          endPoint: { x: 70, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kedua sejajar di bawahnya sedikit lebih panjang.",
          strokeType: "tome",
          direction: "Horizontal kedua",
          startPoint: { x: 24, y: 50 },
          endPoint: { x: 76, y: 50 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis diagonal dari kanan atas memotong kedua garis ke kiri bawah.",
          strokeType: "harai",
          direction: "Diagonal memotong menyapu ke kiri bawah",
          startPoint: { x: 60, y: 18 },
          endPoint: { x: 30, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "きって", wordKatakana: "キッテ", romaji: "kitte", meaning: "Perangko" },
      { wordHiragana: "きもの", wordKatakana: "キモノ", romaji: "kimono", meaning: "Pakaian tradisional Kimono" }
    ]
  },
  {
    id: "ku",
    romaji: "ku",
    row: "k",
    rowName: "Baris Ka (Ka-Ki-Ku-Ke-Ko)",
    hiragana: {
      character: "く",
      strokes: 1,
      handwritingNote: "Satu goresan tunggal mirip simbol matematika '<' atau paruh burung.",
      pitfalls: "Sudut tekukan harus tumpul (~70-80°), jangan terlalu lancip.",
      steps: [
        {
          stepNumber: 1,
          tip: "Mulai dari kanan atas, tarik miring ke kiri tengah lalu tekuk menyapu ke kanan bawah dalam 1 goresan.",
          strokeType: "harai",
          direction: "Kanan atas ke kiri lalu tekuk ke kanan bawah (<)",
          startPoint: { x: 65, y: 20 },
          endPoint: { x: 65, y: 85 }
        }
      ]
    },
    katakana: {
      character: "ク",
      strokes: 2,
      handwritingNote: "Goresan pertama sapuan miring pendek. Goresan kedua horizontal lalu menyapu panjang ke kiri.",
      pitfalls: "Jangan tertukar dengan Katakana Wa (ワ) atau Ta (タ).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis diagonal pendek dari kanan atas ke kiri bawah.",
          strokeType: "harai",
          direction: "Miring pendek ke kiri bawah",
          startPoint: { x: 48, y: 22 },
          endPoint: { x: 30, y: 45 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari tengah goresan pertama, tarik horizontal ke kanan lalu tekuk menyapu panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal lalu tekuk melengkung ke kiri bawah",
          startPoint: { x: 40, y: 35 },
          endPoint: { x: 25, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "くるま", wordKatakana: "クルマ", romaji: "kuruma", meaning: "Mobil" },
      { wordHiragana: "くち", wordKatakana: "クチ", romaji: "kuchi", meaning: "Mulut" }
    ]
  },
  {
    id: "ke",
    romaji: "ke",
    row: "k",
    rowName: "Baris Ka (Ka-Ki-Ku-Ke-Ko)",
    hiragana: {
      character: "け",
      strokes: 3,
      handwritingNote: "Tiang kiri memiliki kait di bawah. Garis kedua horizontal memotong tiang ketiga.",
      pitfalls: "Garis tengah horizontal jangan menyentuh tiang kiri.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang kiri vertikal sedikit melengkung dengan kait lentik di ujungnya.",
          strokeType: "hane",
          direction: "Vertikal kiri berkait",
          startPoint: { x: 28, y: 20 },
          endPoint: { x: 26, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal di sebelah kanan tiang kiri.",
          strokeType: "tome",
          direction: "Horizontal tengah",
          startPoint: { x: 42, y: 40 },
          endPoint: { x: 75, y: 40 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis vertikal sedikit melengkung memotong garis horizontal kedua menyapu ke kiri.",
          strokeType: "harai",
          direction: "Vertikal kanan melengkung menyapu",
          startPoint: { x: 62, y: 25 },
          endPoint: { x: 55, y: 85 }
        }
      ]
    },
    katakana: {
      character: "ケ",
      strokes: 3,
      handwritingNote: "Berasal dari kanji介. Goresan pertama miring pendek, kedua horizontal, ketiga sapuan melengkung panjang.",
      pitfalls: "Garis ke-3 melengkung panjang ke kiri bawah (harai).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik sapuan miring pendek di kiri atas.",
          strokeType: "harai",
          direction: "Miring pendek kiri",
          startPoint: { x: 45, y: 18 },
          endPoint: { x: 26, y: 40 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari sepertiga bawah garis pertama, tarik garis horizontal ke kanan.",
          strokeType: "tome",
          direction: "Horizontal ke kanan",
          startPoint: { x: 35, y: 36 },
          endPoint: { x: 80, y: 36 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari tengah garis kedua, tarik sapuan melengkung panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Lengkung panjang menyapu ke kiri bawah",
          startPoint: { x: 58, y: 36 },
          endPoint: { x: 28, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "けさ", wordKatakana: "ケサ", romaji: "kesa", meaning: "Pagi ini" },
      { wordHiragana: "けっこん", wordKatakana: "ケッコン", romaji: "kekkon", meaning: "Pernikahan" }
    ]
  },
  {
    id: "ko",
    romaji: "ko",
    row: "k",
    rowName: "Baris Ka (Ka-Ki-Ku-Ke-Ko)",
    hiragana: {
      character: "こ",
      strokes: 2,
      handwritingNote: "Dua kurva horizontal sejajar seperti mangkuk yang saling berhadapan.",
      pitfalls: "Garis atas memiliki kait halus di ujung kanan mengarah ke awal garis bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas melengkung sedikit, akhiri dengan kait halus ke kiri bawah.",
          strokeType: "hane",
          direction: "Horizontal atas dengan kait",
          startPoint: { x: 30, y: 32 },
          endPoint: { x: 70, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Tarik kurva horizontal bawah membuka ke atas, sejajar dengan garis pertama.",
          strokeType: "tome",
          direction: "Horizontal melengkung bawah",
          startPoint: { x: 32, y: 68 },
          endPoint: { x: 72, y: 68 }
        }
      ]
    },
    katakana: {
      character: "コ",
      strokes: 2,
      handwritingNote: "Bentuk siku kotak terbuka ke kiri. Terdiri dari sudut siku atas dan garis penutup bawah.",
      pitfalls: "Garis horizontal bawah menutup tepat di sudut garis pertama.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal ke kanan lalu tekuk lurus ke bawah membentuk sudut siku 90 derajat.",
          strokeType: "tome",
          direction: "Horizontal lalu siku vertikal ke bawah",
          startPoint: { x: 30, y: 28 },
          endPoint: { x: 75, y: 72 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal bawah dari kiri menyambung ke sudut bawah garis pertama.",
          strokeType: "tome",
          direction: "Horizontal penutup bawah",
          startPoint: { x: 30, y: 72 },
          endPoint: { x: 75, y: 72 }
        }
      ]
    },
    examples: [
      { wordHiragana: "こども", wordKatakana: "コドモ", romaji: "kodomo", meaning: "Anak-anak" },
      { wordHiragana: "こえ", wordKatakana: "コエ", romaji: "koe", meaning: "Suara" }
    ]
  },

  // --- SA ROW ---
  {
    id: "sa",
    romaji: "sa",
    row: "s",
    rowName: "Baris Sa (Sa-Shi-Su-Se-So)",
    hiragana: {
      character: "さ",
      strokes: 3,
      handwritingNote: "Garis bawah TERPISAH dalam tulisan tangan. Kemiringan garis pertama sedikit menanjak.",
      pitfalls: "Jangan menyambungkan garis ke-2 dan ke-3 menjadi satu lingkaran tertutup.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal sedikit miring menanjak ke kanan.",
          strokeType: "tome",
          direction: "Horizontal menanjak",
          startPoint: { x: 28, y: 35 },
          endPoint: { x: 72, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis diagonal memotong garis pertama dari kanan atas ke kiri bawah dengan kait halus.",
          strokeType: "hane",
          direction: "Diagonal memotong dengan kait",
          startPoint: { x: 56, y: 18 },
          endPoint: { x: 40, y: 65 }
        },
        {
          stepNumber: 3,
          tip: "Buat garis lengkung bawah terpisah meliuk ke kanan atas.",
          strokeType: "harai",
          direction: "Lengkungan bawah terpisah",
          startPoint: { x: 36, y: 74 },
          endPoint: { x: 68, y: 80 }
        }
      ]
    },
    katakana: {
      character: "サ",
      strokes: 3,
      handwritingNote: "Terdiri dari garis horizontal panjang yang dipotong oleh dua garis vertikal.",
      pitfalls: "Tiang kiri dibuat lebih dahulu daripada tiang kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal panjang dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal panjang",
          startPoint: { x: 20, y: 35 },
          endPoint: { x: 80, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang kiri pendek memotong garis horizontal.",
          strokeType: "tome",
          direction: "Vertikal pendek kiri",
          startPoint: { x: 36, y: 22 },
          endPoint: { x: 36, y: 55 }
        },
        {
          stepNumber: 3,
          tip: "Tarik tiang kanan memotong garis horizontal lalu melengkung menyapu ke kiri bawah.",
          strokeType: "harai",
          direction: "Vertikal kanan melengkung menyapu ke kiri bawah",
          startPoint: { x: 64, y: 22 },
          endPoint: { x: 45, y: 82 }
        }
      ]
    },
    examples: [
      { wordHiragana: "さくら", wordKatakana: "サクラ", romaji: "sakura", meaning: "Bunga Sakura" },
      { wordHiragana: "さかな", wordKatakana: "サカナ", romaji: "sakana", meaning: "Ikan" }
    ]
  },
  {
    id: "shi",
    romaji: "shi",
    row: "s",
    rowName: "Baris Sa (Sa-Shi-Su-Se-So)",
    hiragana: {
      character: "し",
      strokes: 1,
      handwritingNote: "Satu goresan tunggal mirip mata kail pancing (fishhook).",
      pitfalls: "Lengkungan bawah jangan terlalu mendatar; tarik meluncur anggun ke kanan atas.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik vertikal lurus ke bawah lalu melengkung bulat naik ke kanan atas dalam 1 goresan.",
          strokeType: "harai",
          direction: "Vertikal turun lalu melengkung naik ke kanan (kail)",
          startPoint: { x: 38, y: 18 },
          endPoint: { x: 68, y: 65 }
        }
      ]
    },
    katakana: {
      character: "シ",
      strokes: 3,
      handwritingNote: "SANGAT PENTING: Garis ke-3 ditarik dari KIRI BAWAH menyapu ke KANAN ATAS (sudut ~30°).",
      pitfalls: "JANGAN DITARIK DARI ATAS KE BAWAH! Itu adalah kesalahan paling umum (akan tertukar dengan Tsu ツ).",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik miring pendek di kiri atas.",
          strokeType: "tome",
          direction: "Titik kiri atas",
          startPoint: { x: 32, y: 25 },
          endPoint: { x: 42, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Buat titik miring kedua sejajar di bawah titik pertama.",
          strokeType: "tome",
          direction: "Titik kiri tengah",
          startPoint: { x: 26, y: 48 },
          endPoint: { x: 36, y: 54 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari KIRI BAWAH, sapukan garis meluncur naik ke KANAN ATAS dengan sudut landai.",
          strokeType: "harai",
          direction: "DARI BAWAH MENYAPU NAIK KE KANAN ATAS",
          startPoint: { x: 22, y: 82 },
          endPoint: { x: 78, y: 35 }
        }
      ]
    },
    examples: [
      { wordHiragana: "しんぶん", wordKatakana: "シンブン", romaji: "shinbun", meaning: "Koran" },
      { wordHiragana: "しろ", wordKatakana: "シロ", romaji: "shiro", meaning: "Warna Putih" }
    ]
  },
  {
    id: "su",
    romaji: "su",
    row: "s",
    rowName: "Baris Sa (Sa-Shi-Su-Se-So)",
    hiragana: {
      character: "す",
      strokes: 2,
      handwritingNote: "Tiang vertikal kedua membentuk simpul loop bundar di tengah lalu meluncur ke bawah.",
      pitfalls: "Simpul loop bundar harus berada di sisi kiri garis vertikal.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal panjang dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal panjang",
          startPoint: { x: 22, y: 32 },
          endPoint: { x: 78, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang vertikal memotong, buat loop melingkar di tengah, lalu sapukan ujungnya ke bawah.",
          strokeType: "harai",
          direction: "Vertikal turun, loop bulat, sapuan ke bawah",
          startPoint: { x: 55, y: 15 },
          endPoint: { x: 42, y: 88 }
        }
      ]
    },
    katakana: {
      character: "ス",
      strokes: 2,
      handwritingNote: "Goresan pertama mirip angka 7 bersiku tumpul. Goresan kedua memotong dari tengah ke kanan bawah.",
      pitfalls: "Garis kedua jangan terlalu panjang; berakhir simetris dengan garis pertama.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik horizontal ke kanan lalu tekuk diagonal panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal lalu tekuk diagonal kiri bawah",
          startPoint: { x: 28, y: 28 },
          endPoint: { x: 30, y: 85 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari tengah kemiringan garis pertama, tarik garis diagonal menyapu ke kanan bawah.",
          strokeType: "harai",
          direction: "Diagonal menyapu ke kanan bawah",
          startPoint: { x: 50, y: 48 },
          endPoint: { x: 78, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "すし", wordKatakana: "スシ", romaji: "sushi", meaning: "Sushi" },
      { wordHiragana: "すずしい", wordKatakana: "スズシイ", romaji: "suzushii", meaning: "Sejuk" }
    ]
  },
  {
    id: "se",
    romaji: "se",
    row: "s",
    rowName: "Baris Sa (Sa-Shi-Su-Se-So)",
    hiragana: {
      character: "せ",
      strokes: 3,
      handwritingNote: "Garis horizontal dibuat pertama. Tiang kanan berkait dibuat kedua. Tiang kiri melengkung penutup.",
      pitfalls: "Perhatikan urutan goresan: tiang kanan berkait dibuat SEBELUM tiang kiri.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal melintang dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal melintang",
          startPoint: { x: 22, y: 38 },
          endPoint: { x: 78, y: 38 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang kanan vertikal memotong garis pertama, akhiri dengan kait ke kiri atas (hane).",
          strokeType: "hane",
          direction: "Vertikal kanan berkait ke kiri",
          startPoint: { x: 66, y: 20 },
          endPoint: { x: 66, y: 65 }
        },
        {
          stepNumber: 3,
          tip: "Tarik tiang kiri melengkung ke bawah memotong garis pertama lalu meliuk ke kanan bawah.",
          strokeType: "tome",
          direction: "Vertikal kiri melengkung meliuk ke kanan",
          startPoint: { x: 38, y: 22 },
          endPoint: { x: 72, y: 80 }
        }
      ]
    },
    katakana: {
      character: "セ",
      strokes: 2,
      handwritingNote: "Hanya 2 goresan! Goresan pertama siku horizontal-vertikal. Goresan kedua vertikal meliuk ke kanan.",
      pitfalls: "Katakana セ hanya terdiri dari 2 goresan, berbeda dari Hiragana せ yang memiliki 3 goresan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal ke kanan lalu tekuk vertikal ke bawah dengan kait kecil ke kiri.",
          strokeType: "hane",
          direction: "Horizontal ke kanan tekuk vertikal turun",
          startPoint: { x: 25, y: 32 },
          endPoint: { x: 68, y: 70 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang kiri memotong garis pertama lalu belokkan horizontal ke kanan di bagian bawah.",
          strokeType: "tome",
          direction: "Vertikal kiri turun belok horizontal ke kanan",
          startPoint: { x: 42, y: 18 },
          endPoint: { x: 75, y: 80 }
        }
      ]
    },
    examples: [
      { wordHiragana: "せんせい", wordKatakana: "センセイ", romaji: "sensei", meaning: "Guru / Dokter" },
      { wordHiragana: "せかい", wordKatakana: "セカイ", romaji: "sekai", meaning: "Dunia" }
    ]
  },
  {
    id: "so",
    romaji: "so",
    row: "s",
    rowName: "Baris Sa (Sa-Shi-Su-Se-So)",
    hiragana: {
      character: "そ",
      strokes: 1,
      handwritingNote: "Satu goresan kontinu membentuk huruf Z di bagian atas lalu meliuk seperti huruf C di bawah.",
      pitfalls: "Jangan melepaskan pena di tengah-tengah goresan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal, diagonal ke kiri bawah, horizontal lagi, lalu lengkung setengah lingkaran di bawah.",
          strokeType: "tome",
          direction: "Z kontinu lalu lengkung C di bawah",
          startPoint: { x: 30, y: 22 },
          endPoint: { x: 68, y: 82 }
        }
      ]
    },
    katakana: {
      character: "ソ",
      strokes: 2,
      handwritingNote: "SANGAT PENTING: Garis ke-2 ditarik DARI ATAS MENUKIK KE KIRI BAWAH.",
      pitfalls: "Jangan ditarik dari bawah ke atas! Itu adalah Katakana N (ン).",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik miring pendek di kiri atas (sedikit lebih tegak dari titik Katakana N).",
          strokeType: "tome",
          direction: "Titik pendek kiri atas",
          startPoint: { x: 36, y: 25 },
          endPoint: { x: 44, y: 38 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari KANAN ATAS, sapukan garis melengkung menukik turun ke KIRI BAWAH.",
          strokeType: "harai",
          direction: "DARI KANAN ATAS MENUKIK TURUN KE KIRI BAWAH",
          startPoint: { x: 72, y: 20 },
          endPoint: { x: 30, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "そら", wordKatakana: "ソラ", romaji: "sora", meaning: "Langit" },
      { wordHiragana: "そこ", wordKatakana: "ソコ", romaji: "soko", meaning: "Di situ (dekat lawan bicara)" }
    ]
  },

  // --- TA ROW ---
  {
    id: "ta",
    romaji: "ta",
    row: "t",
    rowName: "Baris Ta (Ta-Chi-Tsu-Te-To)",
    hiragana: {
      character: "た",
      strokes: 4,
      handwritingNote: "Sisi kiri mirip kanji 十, sisi kanan mirip Hiragana こ mini di dalam perut.",
      pitfalls: "Dua goresan di kanan (mirip こ) jangan menyentuh garis diagonal kiri.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal kiri pendek.",
          strokeType: "tome",
          direction: "Horizontal pendek kiri",
          startPoint: { x: 20, y: 35 },
          endPoint: { x: 50, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis miring memotong garis pertama dari kanan atas ke kiri bawah.",
          strokeType: "harai",
          direction: "Diagonal memotong ke kiri bawah",
          startPoint: { x: 42, y: 20 },
          endPoint: { x: 26, y: 78 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis horizontal atas mini di sisi kanan.",
          strokeType: "tome",
          direction: "Horizontal mini kanan atas",
          startPoint: { x: 52, y: 45 },
          endPoint: { x: 78, y: 45 }
        },
        {
          stepNumber: 4,
          tip: "Tarik garis lengkung horizontal bawah mini di bawah langkah ke-3.",
          strokeType: "tome",
          direction: "Lengkung mini kanan bawah",
          startPoint: { x: 50, y: 68 },
          endPoint: { x: 76, y: 72 }
        }
      ]
    },
    katakana: {
      character: "タ",
      strokes: 3,
      handwritingNote: "Mirip kanji petang (夕). Garis ke-3 memotong di bagian tengah dalam perut.",
      pitfalls: "Garis ke-3 harus memotong garis diagonal luar.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik sapuan miring pendek di kiri atas.",
          strokeType: "harai",
          direction: "Miring pendek kiri atas",
          startPoint: { x: 45, y: 18 },
          endPoint: { x: 28, y: 42 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari sepertiga atas garis pertama, tarik horizontal lalu tekuk menyapu melengkung ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal lalu lengkung panjang ke kiri bawah",
          startPoint: { x: 36, y: 32 },
          endPoint: { x: 30, y: 88 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis pendek diagonal memotong dari dalam perut ke kanan bawah.",
          strokeType: "tome",
          direction: "Diagonal pendek memotong perut",
          startPoint: { x: 44, y: 52 },
          endPoint: { x: 74, y: 65 }
        }
      ]
    },
    examples: [
      { wordHiragana: "たべもの", wordKatakana: "タベモノ", romaji: "tabemono", meaning: "Makanan" },
      { wordHiragana: "たいよう", wordKatakana: "タイヨウ", romaji: "taiyou", meaning: "Matahari" }
    ]
  },
  {
    id: "chi",
    romaji: "chi",
    row: "t",
    rowName: "Baris Ta (Ta-Chi-Tsu-Te-To)",
    hiragana: {
      character: "ち",
      strokes: 2,
      handwritingNote: "Garis horizontal atas dibuat pertama, lalu tiang vertikal meliuk memutar loop seperti angka 5.",
      pitfalls: "Jangan tertukar dengan Sa (さ) yang memiliki arah berlawanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal kiri ke kanan",
          startPoint: { x: 26, y: 32 },
          endPoint: { x: 74, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang vertikal memotong lalu putar lengkungan perut besar ke kanan bawah.",
          strokeType: "harai",
          direction: "Vertikal turun lalu busur perut melingkar",
          startPoint: { x: 50, y: 18 },
          endPoint: { x: 48, y: 85 }
        }
      ]
    },
    katakana: {
      character: "チ",
      strokes: 3,
      handwritingNote: "Mirip kanji seribu (千). Garis pertama miring pendek dari kanan ke kiri.",
      pitfalls: "Garis pertama ditarik dari kanan atas ke kiri bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik sapuan miring pendek di bagian atas dari kanan ke kiri.",
          strokeType: "harai",
          direction: "Kanan atas ke kiri bawah pendek",
          startPoint: { x: 70, y: 22 },
          endPoint: { x: 38, y: 30 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal melintang di bawah garis pertama.",
          strokeType: "tome",
          direction: "Horizontal melintang",
          startPoint: { x: 24, y: 46 },
          endPoint: { x: 76, y: 46 }
        },
        {
          stepNumber: 3,
          tip: "Tarik tiang vertikal memotong kedua garis lalu melengkung menyapu ke kiri bawah.",
          strokeType: "harai",
          direction: "Vertikal memotong menyapu ke kiri bawah",
          startPoint: { x: 52, y: 25 },
          endPoint: { x: 32, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ちず", wordKatakana: "チズ", romaji: "chizu", meaning: "Peta" },
      { wordHiragana: "ちち", wordKatakana: "チチ", romaji: "chichi", meaning: "Ayah kandung" }
    ]
  },
  {
    id: "tsu",
    romaji: "tsu",
    row: "t",
    rowName: "Baris Ta (Ta-Chi-Tsu-Te-To)",
    hiragana: {
      character: "つ",
      strokes: 1,
      handwritingNote: "Satu goresan tunggal mirip gelombang ombak tsunami yang menggulung ke bawah.",
      pitfalls: "Bagian atas horizontal datar sejenak sebelum melengkung besar ke kiri bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Mulai dari kiri, tarik mendatar ke kanan lalu buat lengkungan busur besar menyapu ke kiri bawah dalam 1 goresan.",
          strokeType: "harai",
          direction: "Horizontal naik lalu lengkungan busur menyapu",
          startPoint: { x: 25, y: 35 },
          endPoint: { x: 32, y: 85 }
        }
      ]
    },
    katakana: {
      character: "ツ",
      strokes: 3,
      handwritingNote: "SANGAT PENTING: Garis ke-3 ditarik DARI KANAN ATAS MENUKIK KE KIRI BAWAH (sudut curam ~60°).",
      pitfalls: "JANGAN DITARIK DARI BAWAH KE ATAS! Itu adalah Katakana Shi (シ).",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik miring pertama di kiri atas.",
          strokeType: "tome",
          direction: "Titik kiri atas",
          startPoint: { x: 32, y: 22 },
          endPoint: { x: 38, y: 36 }
        },
        {
          stepNumber: 2,
          tip: "Buat titik miring kedua di sebelah kanan titik pertama (berjejer horizontal).",
          strokeType: "tome",
          direction: "Titik tengah atas",
          startPoint: { x: 52, y: 26 },
          endPoint: { x: 58, y: 40 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari KANAN ATAS, sapukan garis melengkung menukik turun ke KIRI BAWAH dengan sudut curam.",
          strokeType: "harai",
          direction: "DARI KANAN ATAS MENUKIK CURAM KE KIRI BAWAH",
          startPoint: { x: 78, y: 22 },
          endPoint: { x: 32, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "つき", wordKatakana: "ツキ", romaji: "tsuki", meaning: "Bulan" },
      { wordHiragana: "つくえ", wordKatakana: "ツクエ", romaji: "tsukue", meaning: "Meja belajar" }
    ]
  },
  {
    id: "te",
    romaji: "te",
    row: "t",
    rowName: "Baris Ta (Ta-Chi-Tsu-Te-To)",
    hiragana: {
      character: "て",
      strokes: 1,
      handwritingNote: "Satu goresan: garis horizontal lalu melengkung setengah lingkaran seperti telapak tangan.",
      pitfalls: "Lengkungan bawah jangan ditutup menjadi lingkaran.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal ke kanan, lalu putar balik membentuk lengkungan busur besar di bawah dalam 1 goresan.",
          strokeType: "tome",
          direction: "Horizontal ke kanan lalu lengkungan C terbalik di bawah",
          startPoint: { x: 26, y: 32 },
          endPoint: { x: 62, y: 80 }
        }
      ]
    },
    katakana: {
      character: "テ",
      strokes: 3,
      handwritingNote: "Dua garis horizontal dan satu sapuan lengkung ke kiri bawah.",
      pitfalls: "Garis horizontal kedua lebih panjang dari garis horizontal pertama.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas pendek.",
          strokeType: "tome",
          direction: "Horizontal pendek atas",
          startPoint: { x: 32, y: 28 },
          endPoint: { x: 68, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kedua di bawahnya lebih panjang.",
          strokeType: "tome",
          direction: "Horizontal kedua panjang",
          startPoint: { x: 22, y: 48 },
          endPoint: { x: 78, y: 48 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari tengah garis kedua, tarik sapuan melengkung panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Melengkung menyapu ke kiri bawah",
          startPoint: { x: 50, y: 48 },
          endPoint: { x: 26, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "てがみ", wordKatakana: "テガミ", romaji: "tegami", meaning: "Surat" },
      { wordHiragana: "てんき", wordKatakana: "テンキ", romaji: "tenki", meaning: "Cuaca" }
    ]
  },
  {
    id: "to",
    romaji: "to",
    row: "t",
    rowName: "Baris Ta (Ta-Chi-Tsu-Te-To)",
    hiragana: {
      character: "と",
      strokes: 2,
      handwritingNote: "Garis pertama miring pendek, garis kedua melengkung besar menyerupai huruf C.",
      pitfalls: "Lengkungan kedua menempel pada ujung garis pertama.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis pendek miring dari kiri atas ke kanan bawah.",
          strokeType: "tome",
          direction: "Miring pendek ke kanan bawah",
          startPoint: { x: 42, y: 22 },
          endPoint: { x: 48, y: 42 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari sepertiga atas, tarik lengkungan besar membuka ke kiri mengelilingi bawah garis pertama.",
          strokeType: "tome",
          direction: "Lengkung C membuka ke kiri",
          startPoint: { x: 62, y: 35 },
          endPoint: { x: 65, y: 82 }
        }
      ]
    },
    katakana: {
      character: "ト",
      strokes: 2,
      handwritingNote: "Tiang vertikal tegak lurus dengan cabang miring ke kanan bawah.",
      pitfalls: "Tiang vertikal dibuat LEBIH DAHULU sebelum cabang miring.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang lurus vertikal dari atas ke bawah.",
          strokeType: "tome",
          direction: "Vertikal lurus ke bawah",
          startPoint: { x: 44, y: 16 },
          endPoint: { x: 44, y: 88 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari tengah tiang vertikal, tarik garis miring meluncur ke kanan bawah.",
          strokeType: "tome",
          direction: "Miring ke kanan bawah",
          startPoint: { x: 44, y: 44 },
          endPoint: { x: 78, y: 65 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ともだち", wordKatakana: "トモダチ", romaji: "tomodachi", meaning: "Teman / Sahabat" },
      { wordHiragana: "とり", wordKatakana: "トリ", romaji: "tori", meaning: "Burung" }
    ]
  },

  // --- NA ROW ---
  {
    id: "na",
    romaji: "na",
    row: "n",
    rowName: "Baris Na (Na-Ni-Nu-Ne-No)",
    hiragana: {
      character: "な",
      strokes: 4,
      handwritingNote: "Sisi kiri mirip salib 十, sisi kanan memiliki titik aksen dan loop vertikal.",
      pitfalls: "Titik ke-3 di kanan atas dibuat sebelum loop ke-4.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal kiri pendek.",
          strokeType: "tome",
          direction: "Horizontal kiri",
          startPoint: { x: 22, y: 32 },
          endPoint: { x: 48, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis miring memotong garis pertama dari kanan atas ke kiri bawah.",
          strokeType: "hane",
          direction: "Diagonal memotong dengan kait",
          startPoint: { x: 40, y: 18 },
          endPoint: { x: 30, y: 62 }
        },
        {
          stepNumber: 3,
          tip: "Bubuhkan titik miring pendek di sebelah kanan atas.",
          strokeType: "tome",
          direction: "Titik kanan atas",
          startPoint: { x: 62, y: 28 },
          endPoint: { x: 70, y: 36 }
        },
        {
          stepNumber: 4,
          tip: "Tarik tiang vertikal di kanan bawah, lalu buat simpul loop bundar meliuk ke kanan.",
          strokeType: "harai",
          direction: "Vertikal turun lalu loop simpul",
          startPoint: { x: 60, y: 48 },
          endPoint: { x: 72, y: 82 }
        }
      ]
    },
    katakana: {
      character: "ナ",
      strokes: 2,
      handwritingNote: "Hanya 2 goresan: garis horizontal dan sapuan miring panjang ke kiri bawah.",
      pitfalls: "Garis horizontal dibuat pertama, lalu sapuan miring memotongnya.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal",
          startPoint: { x: 22, y: 35 },
          endPoint: { x: 78, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari sepertiga kiri garis horizontal, tarik garis memotong melengkung menyapu panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Melengkung menyapu panjang ke kiri bawah",
          startPoint: { x: 48, y: 20 },
          endPoint: { x: 26, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "なつ", wordKatakana: "ナツ", romaji: "natsu", meaning: "Musim panas" },
      { wordHiragana: "なまえ", wordKatakana: "ナマエ", romaji: "namae", meaning: "Nama" }
    ]
  },
  {
    id: "ni",
    romaji: "ni",
    row: "n",
    rowName: "Baris Na (Na-Ni-Nu-Ne-No)",
    hiragana: {
      character: "に",
      strokes: 3,
      handwritingNote: "Tiang kiri berkait, di kanan ada dua garis horizontal (mirip こ).",
      pitfalls: "Tiang kiri dibuat pertama sebelum dua garis kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang kiri vertikal dengan kait kecil di ujung bawah.",
          strokeType: "hane",
          direction: "Vertikal kiri berkait",
          startPoint: { x: 28, y: 20 },
          endPoint: { x: 26, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kanan atas pendek.",
          strokeType: "tome",
          direction: "Horizontal kanan atas",
          startPoint: { x: 48, y: 38 },
          endPoint: { x: 76, y: 38 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis horizontal kanan bawah melengkung sedikit, lebih panjang dari langkah 2.",
          strokeType: "tome",
          direction: "Horizontal kanan bawah",
          startPoint: { x: 46, y: 65 },
          endPoint: { x: 80, y: 65 }
        }
      ]
    },
    katakana: {
      character: "ニ",
      strokes: 2,
      handwritingNote: "Persis seperti kanji dua (二). Garis bawah lebih panjang dari garis atas.",
      pitfalls: "Garis atas lebih pendek dari garis bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas lebih pendek.",
          strokeType: "tome",
          direction: "Horizontal atas pendek",
          startPoint: { x: 30, y: 35 },
          endPoint: { x: 70, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal bawah sejajar lebih panjang.",
          strokeType: "tome",
          direction: "Horizontal bawah panjang",
          startPoint: { x: 20, y: 68 },
          endPoint: { x: 80, y: 68 }
        }
      ]
    },
    examples: [
      { wordHiragana: "にほん", wordKatakana: "ニホン", romaji: "nihon", meaning: "Jepang" },
      { wordHiragana: "にく", wordKatakana: "ニク", romaji: "niku", meaning: "Daging" }
    ]
  },
  {
    id: "nu",
    romaji: "nu",
    row: "n",
    rowName: "Baris Na (Na-Ni-Nu-Ne-No)",
    hiragana: {
      character: "ぬ",
      strokes: 2,
      handwritingNote: "Sangat mirip me (め) tetapi memiliki simpul loop kecil di ujung ekor kanan.",
      pitfalls: "Jangan lupakan simpul loop kecil di ekor kanan (tanpa loop akan menjadi め).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis miring dari kiri atas ke kanan bawah.",
          strokeType: "tome",
          direction: "Miring kiri atas ke kanan bawah",
          startPoint: { x: 38, y: 22 },
          endPoint: { x: 30, y: 75 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari kiri tengah, tarik melengkung memotong, buat perut besar lalu simpul loop kecil di ekor kanan.",
          strokeType: "tome",
          direction: "Lengkung perut besar dengan simpul loop di ekor",
          startPoint: { x: 22, y: 42 },
          endPoint: { x: 78, y: 78 }
        }
      ]
    },
    katakana: {
      character: "ヌ",
      strokes: 2,
      handwritingNote: "Garis pertama sudut siku tumpul, garis kedua memotong diagonal menyapu ke kanan bawah.",
      pitfalls: "Garis kedua memotong garis pertama tepat di bawah sudutnya.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal ke kanan lalu tekuk melengkung panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal lalu lengkung ke kiri bawah",
          startPoint: { x: 26, y: 30 },
          endPoint: { x: 28, y: 82 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis pendek diagonal memotong dari kiri atas ke kanan bawah.",
          strokeType: "tome",
          direction: "Diagonal memotong ke kanan bawah",
          startPoint: { x: 42, y: 45 },
          endPoint: { x: 76, y: 78 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ぬいぐるみ", wordKatakana: "ヌイグルミ", romaji: "nuigurumi", meaning: "Boneka beruang/kain" },
      { wordHiragana: "ぬま", wordKatakana: "ヌマ", romaji: "numa", meaning: "Rawa" }
    ]
  },
  {
    id: "ne",
    romaji: "ne",
    row: "n",
    rowName: "Baris Na (Na-Ni-Nu-Ne-No)",
    hiragana: {
      character: "ね",
      strokes: 2,
      handwritingNote: "Tiang kiri lurus, bagian kanan zig-zag dengan simpul loop di ujung ekor.",
      pitfalls: "Perhatikan bedanya dengan れ (re) dan わ (wa): hanya ね yang memiliki simpul loop di ujung.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang lurus vertikal dari atas ke bawah.",
          strokeType: "tome",
          direction: "Vertikal lurus",
          startPoint: { x: 30, y: 18 },
          endPoint: { x: 30, y: 85 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari kiri tiang, buat zig-zag mirip angka 7, naik lagi lalu buat lengkung perut dan simpul loop kecil di ujung.",
          strokeType: "tome",
          direction: "Zig-zag, perut bulat dan simpul ekor",
          startPoint: { x: 18, y: 35 },
          endPoint: { x: 74, y: 78 }
        }
      ]
    },
    katakana: {
      character: "ネ",
      strokes: 4,
      handwritingNote: "Berasal dari radikal kanji (示 / 礻). Titik atas dibuat pertama.",
      pitfalls: "Tiang vertikal memotong dibuat ke-3, titik aksen kanan dibuat terakhir.",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik miring pendek di bagian atas.",
          strokeType: "tome",
          direction: "Titik atas",
          startPoint: { x: 46, y: 15 },
          endPoint: { x: 54, y: 24 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal ke kanan lalu tekuk diagonal panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal tekuk diagonal kiri bawah",
          startPoint: { x: 26, y: 35 },
          endPoint: { x: 26, y: 85 }
        },
        {
          stepNumber: 3,
          tip: "Tarik tiang vertikal memotong di tengah garis kedua lurus ke bawah.",
          strokeType: "tome",
          direction: "Vertikal lurus turun",
          startPoint: { x: 50, y: 44 },
          endPoint: { x: 50, y: 88 }
        },
        {
          stepNumber: 4,
          tip: "Bubuhkan titik garis miring ke kanan bawah di sebelah tiang ketiga.",
          strokeType: "tome",
          direction: "Titik aksen kanan",
          startPoint: { x: 62, y: 55 },
          endPoint: { x: 76, y: 68 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ねこ", wordKatakana: "ネコ", romaji: "neko", meaning: "Kucing" },
      { wordHiragana: "ねつ", wordKatakana: "ネツ", romaji: "netsu", meaning: "Demam / Panas" }
    ]
  },
  {
    id: "no",
    romaji: "no",
    row: "n",
    rowName: "Baris Na (Na-Ni-Nu-Ne-No)",
    hiragana: {
      character: "の",
      strokes: 1,
      handwritingNote: "Satu goresan tunggal memutar seperti lingkaran spiral atau tanda dilarang (no sign).",
      pitfalls: "Goresan berakhir dengan sapuan lepas meruncing halus (harai).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik diagonal ke kiri bawah lalu putar lengkungan melingkar besar searah jarum jam menyapu lembut di ujungnya.",
          strokeType: "harai",
          direction: "Spiral melingkar searah jarum jam",
          startPoint: { x: 52, y: 22 },
          endPoint: { x: 68, y: 72 }
        }
      ]
    },
    katakana: {
      character: "ノ",
      strokes: 1,
      handwritingNote: "Hanya 1 goresan tunggal: sapuan diagonal anggun dari kanan atas ke kiri bawah.",
      pitfalls: "Sapuan harus sedikit melengkung lembut, bukan garis lurus kaku.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik sapuan diagonal melengkung lembut dari kanan atas meluncur ke kiri bawah.",
          strokeType: "harai",
          direction: "Kanan atas meluncur ke kiri bawah",
          startPoint: { x: 70, y: 20 },
          endPoint: { x: 30, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "のみもの", wordKatakana: "ノミモノ", romaji: "nomimono", meaning: "Minuman" },
      { wordHiragana: "のど", wordKatakana: "ノド", romaji: "nodo", meaning: "Tenggorokan" }
    ]
  },

  // --- HA ROW ---
  {
    id: "ha",
    romaji: "ha",
    row: "h",
    rowName: "Baris Ha (Ha-Hi-Fu-He-Ho)",
    hiragana: {
      character: "は",
      strokes: 3,
      handwritingNote: "Tiang kiri berkait, di kanan ada garis horizontal dipotong tiang berloop.",
      pitfalls: "Berbeda dari ho (ほ): bagian atas tiang kanan pada は TIDAK memiliki topi garis horizontal.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang kiri vertikal sedikit melengkung dengan kait di ujung bawah.",
          strokeType: "hane",
          direction: "Vertikal kiri berkait",
          startPoint: { x: 28, y: 20 },
          endPoint: { x: 26, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal di sebelah kanan tiang.",
          strokeType: "tome",
          direction: "Horizontal tengah kanan",
          startPoint: { x: 45, y: 38 },
          endPoint: { x: 75, y: 38 }
        },
        {
          stepNumber: 3,
          tip: "Tarik tiang memotong garis kedua ke bawah, buat simpul loop bundar meliuk ke kanan.",
          strokeType: "harai",
          direction: "Vertikal turun lalu simpul loop",
          startPoint: { x: 62, y: 22 },
          endPoint: { x: 74, y: 78 }
        }
      ]
    },
    katakana: {
      character: "ハ",
      strokes: 2,
      handwritingNote: "Berasal dari kanji delapan (八). Garis kiri turun melengkung, garis kanan turun meluncur.",
      pitfalls: "Kedua garis tidak boleh bersentuhan di puncak; sisakan celah di atas.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik sapuan miring dari tengah atas meluncur ke kiri bawah.",
          strokeType: "harai",
          direction: "Tengah atas ke kiri bawah",
          startPoint: { x: 42, y: 25 },
          endPoint: { x: 22, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik sapuan miring dari tengah atas meluncur ke kanan bawah.",
          strokeType: "harai",
          direction: "Tengah atas ke kanan bawah",
          startPoint: { x: 58, y: 25 },
          endPoint: { x: 78, y: 80 }
        }
      ]
    },
    examples: [
      { wordHiragana: "はな", wordKatakana: "ハナ", romaji: "hana", meaning: "Bunga / Hidung" },
      { wordHiragana: "はる", wordKatakana: "ハル", romaji: "haru", meaning: "Musim semi" }
    ]
  },
  {
    id: "hi",
    romaji: "hi",
    row: "h",
    rowName: "Baris Ha (Ha-Hi-Fu-He-Ho)",
    hiragana: {
      character: "ひ",
      strokes: 1,
      handwritingNote: "Satu goresan: horizontal pendek, cekungan busur mangkuk, lalu garis diagonal turun ke kanan.",
      pitfalls: "Lengkungan mangkuk tengah harus simetris dan lebar.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis pendek ke kanan atas, tekuk turun buat mangkuk U besar lalu turunkan diagonal ke kanan bawah dalam 1 goresan.",
          strokeType: "tome",
          direction: "Horizontal pendek, mangkuk U, diagonal kanan bawah",
          startPoint: { x: 24, y: 35 },
          endPoint: { x: 76, y: 78 }
        }
      ]
    },
    katakana: {
      character: "ヒ",
      strokes: 2,
      handwritingNote: "Garis horizontal atas dibuat pertama, lalu garis siku melengkung ke kanan.",
      pitfalls: "Garis horizontal atas dibuat LEBIH DAHULU sebelum tiang siku.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas pendek dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal atas pendek",
          startPoint: { x: 30, y: 30 },
          endPoint: { x: 62, y: 30 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari kiri garis pertama, tarik garis vertikal turun lalu tekuk horizontal panjang ke kanan.",
          strokeType: "tome",
          direction: "Vertikal turun belok horizontal panjang ke kanan",
          startPoint: { x: 30, y: 30 },
          endPoint: { x: 80, y: 75 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ひと", wordKatakana: "ヒト", romaji: "hito", meaning: "Orang / Manusia" },
      { wordHiragana: "ひこうき", wordKatakana: "ヒコウキ", romaji: "hikouki", meaning: "Pesawat terbang" }
    ]
  },
  {
    id: "fu",
    romaji: "fu",
    row: "h",
    rowName: "Baris Ha (Ha-Hi-Fu-He-Ho)",
    hiragana: {
      character: "ふ",
      strokes: 4,
      handwritingNote: "Titik atas (1), kait tengah (2), titik kiri (3), dan titik kanan (4).",
      pitfalls: "Titik kiri (3) dan titik kanan (4) dibuat setelah badan tengah selesai.",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik miring pendek di bagian atas tengah.",
          strokeType: "tome",
          direction: "Titik atas",
          startPoint: { x: 48, y: 16 },
          endPoint: { x: 54, y: 25 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang tengah melengkung ke bawah lalu lentingkan kait ke kiri atas.",
          strokeType: "hane",
          direction: "Tengah lengkung berkait",
          startPoint: { x: 50, y: 36 },
          endPoint: { x: 46, y: 65 }
        },
        {
          stepNumber: 3,
          tip: "Buat titik miring melengkung di sisi kiri.",
          strokeType: "harai",
          direction: "Titik lengkung kiri",
          startPoint: { x: 26, y: 55 },
          endPoint: { x: 22, y: 70 }
        },
        {
          stepNumber: 4,
          tip: "Buat titik sapuan melengkung di sisi kanan.",
          strokeType: "harai",
          direction: "Titik lengkung kanan",
          startPoint: { x: 72, y: 52 },
          endPoint: { x: 80, y: 68 }
        }
      ]
    },
    katakana: {
      character: "フ",
      strokes: 1,
      handwritingNote: "Hanya 1 goresan: garis horizontal ke kanan lalu melengkung menyapu ke kiri bawah.",
      pitfalls: "Satu goresan tanpa putus. Jangan dipisah menjadi dua.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal ke kanan lalu tekuk menyapu melengkung ke kiri bawah dalam 1 goresan.",
          strokeType: "harai",
          direction: "Horizontal lalu lengkung menyapu ke kiri bawah",
          startPoint: { x: 28, y: 32 },
          endPoint: { x: 30, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ふゆ", wordKatakana: "フユ", romaji: "fuyu", meaning: "Musim dingin" },
      { wordHiragana: "ふね", wordKatakana: "フネ", romaji: "fune", meaning: "Kapal laut" }
    ]
  },
  {
    id: "he",
    romaji: "he",
    row: "h",
    rowName: "Baris Ha (Ha-Hi-Fu-He-Ho)",
    hiragana: {
      character: "へ",
      strokes: 1,
      handwritingNote: "Satu goresan menyerupai atap gunung: sisi kiri pendek naik, sisi kanan panjang meluncur turun.",
      pitfalls: "Bentuk Hiragana へ dan Katakana ヘ hampir identik; Katakana sedikit lebih bersudut tajam.",
      steps: [
        {
          stepNumber: 1,
          tip: "Mulai dari kiri bawah, tarik garis naik pendek lalu belok meluncur panjang ke kanan bawah dalam 1 goresan.",
          strokeType: "harai",
          direction: "Naik pendek lalu meluncur panjang ke kanan bawah (atap)",
          startPoint: { x: 20, y: 60 },
          endPoint: { x: 82, y: 72 }
        }
      ]
    },
    katakana: {
      character: "ヘ",
      strokes: 1,
      handwritingNote: "Sama persis dengan Hiragana tetapi sudut puncaknya sedikit lebih kaku dan tegas.",
      pitfalls: "Sisi kanan lebih panjang daripada sisi kiri.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis miring naik ke puncak lalu tekuk meluncur lurus ke kanan bawah.",
          strokeType: "harai",
          direction: "Naik tegas lalu meluncur turun ke kanan",
          startPoint: { x: 22, y: 58 },
          endPoint: { x: 80, y: 70 }
        }
      ]
    },
    examples: [
      { wordHiragana: "へや", wordKatakana: "ヘヤ", romaji: "heya", meaning: "Kamar / Ruangan" },
      { wordHiragana: "へび", wordKatakana: "ヘビ", romaji: "hebi", meaning: "Ular" }
    ]
  },
  {
    id: "ho",
    romaji: "ho",
    row: "h",
    rowName: "Baris Ha (Ha-Hi-Fu-He-Ho)",
    hiragana: {
      character: "ほ",
      strokes: 4,
      handwritingNote: "Tiang kiri berkait, di kanan ada dua garis horizontal dipotong tiang berloop.",
      pitfalls: "Tiang kanan TIDAK boleh menembus garis horizontal paling atas (berbeda dari kanji 末).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang vertikal kiri dengan kait di ujung bawah.",
          strokeType: "hane",
          direction: "Vertikal kiri berkait",
          startPoint: { x: 26, y: 20 },
          endPoint: { x: 24, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kanan atas.",
          strokeType: "tome",
          direction: "Horizontal kanan atas",
          startPoint: { x: 44, y: 30 },
          endPoint: { x: 76, y: 30 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis horizontal kedua sejajar di bawah garis kedua.",
          strokeType: "tome",
          direction: "Horizontal kanan tengah",
          startPoint: { x: 46, y: 48 },
          endPoint: { x: 74, y: 48 }
        },
        {
          stepNumber: 4,
          tip: "Mulai dari garis horizontal atas (jangan menembus ke atas!), tarik vertikal lalu simpul loop meliuk ke kanan.",
          strokeType: "harai",
          direction: "Vertikal turun lalu loop simpul",
          startPoint: { x: 62, y: 30 },
          endPoint: { x: 76, y: 80 }
        }
      ]
    },
    katakana: {
      character: "ホ",
      strokes: 4,
      handwritingNote: "Berasal dari kanji kayu (木) atau menjaga (保). Garis horizontal dibuat pertama.",
      pitfalls: "Tiang tengah memiliki kait ke kiri; sayap kiri dibuat sebelum sayap kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal melintang di bagian atas.",
          strokeType: "tome",
          direction: "Horizontal melintang",
          startPoint: { x: 25, y: 30 },
          endPoint: { x: 75, y: 30 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang vertikal memotong garis pertama dengan kait melenting ke kiri atas.",
          strokeType: "hane",
          direction: "Vertikal tengah berkait ke kiri",
          startPoint: { x: 50, y: 15 },
          endPoint: { x: 50, y: 85 }
        },
        {
          stepNumber: 3,
          tip: "Tarik sapuan miring di sebelah kiri tiang menyapu ke kiri bawah.",
          strokeType: "harai",
          direction: "Miring kiri bawah",
          startPoint: { x: 38, y: 48 },
          endPoint: { x: 24, y: 75 }
        },
        {
          stepNumber: 4,
          tip: "Tarik garis miring di sebelah kanan tiang ke kanan bawah.",
          strokeType: "tome",
          direction: "Miring kanan bawah",
          startPoint: { x: 62, y: 48 },
          endPoint: { x: 76, y: 75 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ほし", wordKatakana: "ホシ", romaji: "hoshi", meaning: "Bintang" },
      { wordHiragana: "ほん", wordKatakana: "ホン", romaji: "hon", meaning: "Buku" }
    ]
  },

  // --- MA ROW ---
  {
    id: "ma",
    romaji: "ma",
    row: "m",
    rowName: "Baris Ma (Ma-Mi-Mu-Me-Mo)",
    hiragana: {
      character: "ま",
      strokes: 3,
      handwritingNote: "Dua garis horizontal sejajar dipotong tiang vertikal dengan simpul loop di bawah.",
      pitfalls: "Garis horizontal atas lebih panjang dari garis horizontal kedua.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas lebih panjang.",
          strokeType: "tome",
          direction: "Horizontal atas panjang",
          startPoint: { x: 26, y: 28 },
          endPoint: { x: 74, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kedua di bawahnya sedikit lebih pendek.",
          strokeType: "tome",
          direction: "Horizontal kedua pendek",
          startPoint: { x: 30, y: 45 },
          endPoint: { x: 70, y: 45 }
        },
        {
          stepNumber: 3,
          tip: "Tarik tiang vertikal memotong kedua garis, buat simpul loop bulat di kiri lalu meliuk ke kanan bawah.",
          strokeType: "harai",
          direction: "Vertikal memotong lalu simpul loop",
          startPoint: { x: 50, y: 15 },
          endPoint: { x: 68, y: 82 }
        }
      ]
    },
    katakana: {
      character: "マ",
      strokes: 2,
      handwritingNote: "Berasal dari kanji akhir (末). Goresan pertama siku, kedua titik garis pendek.",
      pitfalls: "Titik kedua menempel di ujung garis pertama meluncur ke kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik horizontal ke kanan lalu tekuk diagonal panjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal lalu diagonal kiri bawah",
          startPoint: { x: 25, y: 32 },
          endPoint: { x: 30, y: 78 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis pendek dari dekat sudut garis pertama meluncur ke kanan bawah.",
          strokeType: "tome",
          direction: "Garis pendek kanan bawah",
          startPoint: { x: 48, y: 55 },
          endPoint: { x: 75, y: 75 }
        }
      ]
    },
    examples: [
      { wordHiragana: "まち", wordKatakana: "マチ", romaji: "machi", meaning: "Kota" },
      { wordHiragana: "まつり", wordKatakana: "マツリ", romaji: "matsuri", meaning: "Festival" }
    ]
  },
  {
    id: "mi",
    romaji: "mi",
    row: "m",
    rowName: "Baris Ma (Ma-Mi-Mu-Me-Mo)",
    hiragana: {
      character: "み",
      strokes: 2,
      handwritingNote: "Garis pertama berputar simpul loop lalu meliuk horizontal. Garis kedua memotong miring.",
      pitfalls: "Garis kedua memotong bagian ekor horizontal dari langkah pertama.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal pendek, turun buat simpul loop bundar lalu meliuk horizontal ke kanan.",
          strokeType: "tome",
          direction: "Horizontal, loop bundar, liukan ke kanan",
          startPoint: { x: 24, y: 35 },
          endPoint: { x: 76, y: 62 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis diagonal melengkung memotong liukan horizontal ke kanan bawah.",
          strokeType: "harai",
          direction: "Diagonal melengkung memotong",
          startPoint: { x: 62, y: 22 },
          endPoint: { x: 42, y: 85 }
        }
      ]
    },
    katakana: {
      character: "ミ",
      strokes: 3,
      handwritingNote: "Terdiri dari 3 garis diagonal sejajar dari atas ke bawah (mirip kanji 3 miring).",
      pitfalls: "Tiga garis miring ditarik dari kiri atas ke kanan bawah secara berurutan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis miring pertama di bagian atas.",
          strokeType: "harai",
          direction: "Miring atas",
          startPoint: { x: 34, y: 25 },
          endPoint: { x: 65, y: 32 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis miring kedua sejajar di tengah.",
          strokeType: "harai",
          direction: "Miring tengah",
          startPoint: { x: 30, y: 48 },
          endPoint: { x: 68, y: 55 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis miring ketiga sejajar di bawah sedikit lebih panjang.",
          strokeType: "harai",
          direction: "Miring bawah panjang",
          startPoint: { x: 26, y: 72 },
          endPoint: { x: 74, y: 80 }
        }
      ]
    },
    examples: [
      { wordHiragana: "みず", wordKatakana: "ミズ", romaji: "mizu", meaning: "Air minum" },
      { wordHiragana: "みち", wordKatakana: "ミチ", romaji: "michi", meaning: "Jalanan" }
    ]
  },
  {
    id: "mu",
    romaji: "mu",
    row: "m",
    rowName: "Baris Ma (Ma-Mi-Mu-Me-Mo)",
    hiragana: {
      character: "む",
      strokes: 3,
      handwritingNote: "Garis horizontal (1), tiang turun berloop meliuk naik (2), dan titik aksen di kanan atas (3).",
      pitfalls: "Titik ke-3 di kanan atas jangan lupa dibubuhkan paling akhir.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal",
          startPoint: { x: 22, y: 35 },
          endPoint: { x: 70, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang vertikal memotong, buat loop kecil lalu liukkan naik ke kanan atas.",
          strokeType: "hane",
          direction: "Vertikal turun, loop simpul, liuk naik berkait",
          startPoint: { x: 42, y: 20 },
          endPoint: { x: 76, y: 55 }
        },
        {
          stepNumber: 3,
          tip: "Bubuhkan titik aksen miring di kanan atas.",
          strokeType: "tome",
          direction: "Titik kanan atas",
          startPoint: { x: 72, y: 25 },
          endPoint: { x: 80, y: 34 }
        }
      ]
    },
    katakana: {
      character: "ム",
      strokes: 2,
      handwritingNote: "Berasal dari kanji pribadi (私). Goresan pertama segitiga terbuka, kedua garis pendek.",
      pitfalls: "Garis pertama adalah sapuan miring ke kiri bawah lalu ditarik mendatar ke kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Mulai dari atas tengah, tarik diagonal ke kiri bawah lalu belok horizontal ke kanan.",
          strokeType: "tome",
          direction: "Diagonal kiri bawah lalu horizontal kanan",
          startPoint: { x: 50, y: 20 },
          endPoint: { x: 76, y: 72 }
        },
        {
          stepNumber: 2,
          tip: "Bubuhkan garis pendek miring di kanan atas menutup sudut.",
          strokeType: "tome",
          direction: "Garis pendek kanan atas",
          startPoint: { x: 62, y: 52 },
          endPoint: { x: 74, y: 64 }
        }
      ]
    },
    examples: [
      { wordHiragana: "むし", wordKatakana: "ムシ", romaji: "mushi", meaning: "Serangga" },
      { wordHiragana: "むすめ", wordKatakana: "ムスメ", romaji: "musume", meaning: "Anak perempuan" }
    ]
  },
  {
    id: "me",
    romaji: "me",
    row: "m",
    rowName: "Baris Ma (Ma-Mi-Mu-Me-Mo)",
    hiragana: {
      character: "め",
      strokes: 2,
      handwritingNote: "Sangat mirip nu (ぬ) tetapi ekor kanannya polos menyapu tanpa simpul loop.",
      pitfalls: "JANGAN beri simpul loop di ujungnya; jika ada loop akan menjadi ぬ (nu).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis miring dari kiri atas ke kanan bawah melengkung sedikit.",
          strokeType: "tome",
          direction: "Miring kiri atas ke kanan bawah",
          startPoint: { x: 40, y: 22 },
          endPoint: { x: 30, y: 78 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari kiri tengah, tarik melengkung memotong, buat perut besar lalu sapukan lepas ke kanan bawah.",
          strokeType: "harai",
          direction: "Lengkung perut besar sapuan lepas polos (tanpa loop)",
          startPoint: { x: 24, y: 40 },
          endPoint: { x: 78, y: 82 }
        }
      ]
    },
    katakana: {
      character: "メ",
      strokes: 2,
      handwritingNote: "Dua garis silang miring (X). Goresan miring ke kiri dibuat lebih dahulu.",
      pitfalls: "Sesuai Kaidah Emas: miring kiri (1) dibuat SEBELUM miring kanan (2).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis diagonal panjang dari kanan atas menyapu meluncur ke kiri bawah.",
          strokeType: "harai",
          direction: "Kanan atas ke kiri bawah (miring kiri)",
          startPoint: { x: 68, y: 22 },
          endPoint: { x: 26, y: 82 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis diagonal memotong dari kiri atas ke kanan bawah.",
          strokeType: "harai",
          direction: "Kiri atas ke kanan bawah (memotong)",
          startPoint: { x: 35, y: 35 },
          endPoint: { x: 74, y: 78 }
        }
      ]
    },
    examples: [
      { wordHiragana: "めがね", wordKatakana: "メガネ", romaji: "megane", meaning: "Kacamata" },
      { wordHiragana: "めいし", wordKatakana: "メイシ", romaji: "meishi", meaning: "Kartu nama" }
    ]
  },
  {
    id: "mo",
    romaji: "mo",
    row: "m",
    rowName: "Baris Ma (Ma-Mi-Mu-Me-Mo)",
    hiragana: {
      character: "も",
      strokes: 3,
      handwritingNote: "Tiang tengah berkait dibuat pertama (mirip し), baru dipotong dua garis horizontal.",
      pitfalls: "Urutan goresan: pilar tengah dibuat LEBIH DULU, baru dua garis horizontal.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang tengah vertikal melengkung ke kanan bawah lalu naik berkait seperti mata kail.",
          strokeType: "harai",
          direction: "Vertikal turun melengkung naik ke kanan (kail)",
          startPoint: { x: 50, y: 15 },
          endPoint: { x: 74, y: 65 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal atas memotong tiang tengah.",
          strokeType: "tome",
          direction: "Horizontal atas memotong",
          startPoint: { x: 30, y: 38 },
          endPoint: { x: 70, y: 38 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis horizontal kedua sejajar di bawah garis kedua.",
          strokeType: "tome",
          direction: "Horizontal kedua memotong",
          startPoint: { x: 32, y: 52 },
          endPoint: { x: 68, y: 52 }
        }
      ]
    },
    katakana: {
      character: "モ",
      strokes: 3,
      handwritingNote: "Berasal dari kanji rambut/bulu (毛). Garis horizontal dibuat pertama, lalu tiang berkait.",
      pitfalls: "Berbeda dari Hiragana: pada Katakana モ garis horizontal atas dibuat LEBIH DULU.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal atas",
          startPoint: { x: 28, y: 30 },
          endPoint: { x: 72, y: 30 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kedua sejajar lebih panjang.",
          strokeType: "tome",
          direction: "Horizontal kedua panjang",
          startPoint: { x: 20, y: 50 },
          endPoint: { x: 80, y: 50 }
        },
        {
          stepNumber: 3,
          tip: "Tarik tiang vertikal memotong kedua garis lalu belok horizontal ke kanan di bagian bawah.",
          strokeType: "tome",
          direction: "Vertikal memotong belok horizontal kanan",
          startPoint: { x: 44, y: 18 },
          endPoint: { x: 76, y: 80 }
        }
      ]
    },
    examples: [
      { wordHiragana: "もり", wordKatakana: "モリ", romaji: "mori", meaning: "Hutan lebat" },
      { wordHiragana: "もの", wordKatakana: "モノ", romaji: "mono", meaning: "Barang / Benda" }
    ]
  },

  // --- YA ROW ---
  {
    id: "ya",
    romaji: "ya",
    row: "y",
    rowName: "Baris Ya (Ya-Yu-Yo)",
    hiragana: {
      character: "や",
      strokes: 3,
      handwritingNote: "Lengkung utama berkait (1), titik aksen kiri atas (2), dan garis diagonal memotong (3).",
      pitfalls: "Titik kecil (2) dibuat sebelum tiang diagonal panjang (3).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal melengkung turun ke bawah lalu kaitkan ke atas.",
          strokeType: "hane",
          direction: "Lengkung horizontal turun berkait",
          startPoint: { x: 26, y: 40 },
          endPoint: { x: 46, y: 78 }
        },
        {
          stepNumber: 2,
          tip: "Buat titik aksen pendek di kiri atas garis pertama.",
          strokeType: "tome",
          direction: "Titik kiri atas",
          startPoint: { x: 38, y: 22 },
          endPoint: { x: 44, y: 30 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis diagonal dari kanan atas memotong garis pertama ke kiri bawah.",
          strokeType: "harai",
          direction: "Diagonal panjang memotong menyapu",
          startPoint: { x: 68, y: 20 },
          endPoint: { x: 30, y: 85 }
        }
      ]
    },
    katakana: {
      character: "ヤ",
      strokes: 2,
      handwritingNote: "Hanya 2 goresan! Bentuknya bersudut tajam dan modern.",
      pitfalls: "Hanya 2 goresan tanpa titik aksen tambahan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis miring naik ke kanan lalu tekuk memanjang ke kiri bawah.",
          strokeType: "harai",
          direction: "Miring naik ke kanan tekuk ke kiri bawah",
          startPoint: { x: 26, y: 42 },
          endPoint: { x: 48, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis diagonal memotong dari kanan atas ke kiri bawah.",
          strokeType: "harai",
          direction: "Diagonal kanan atas memotong ke kiri bawah",
          startPoint: { x: 68, y: 18 },
          endPoint: { x: 30, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "やま", wordKatakana: "ヤマ", romaji: "yama", meaning: "Gunung" },
      { wordHiragana: "やすみ", wordKatakana: "ヤスミ", romaji: "yasumi", meaning: "Libur / Istirahat" }
    ]
  },
  {
    id: "yu",
    romaji: "yu",
    row: "y",
    rowName: "Baris Ya (Ya-Yu-Yo)",
    hiragana: {
      character: "ゆ",
      strokes: 2,
      handwritingNote: "Garis pertama melengkung turun, loop bundar lalu liuk ke kanan. Garis kedua tiang vertikal memotong.",
      pitfalls: "Tiang vertikal kedua memotong tepat di tengah loop bundar.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang vertikal turun, buat loop melingkar ke kanan lalu liukkan ke kanan atas.",
          strokeType: "tome",
          direction: "Vertikal turun, loop bulat meliuk naik",
          startPoint: { x: 35, y: 20 },
          endPoint: { x: 75, y: 60 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis vertikal sedikit melengkung memotong di tengah garis pertama menyapu ke bawah.",
          strokeType: "harai",
          direction: "Vertikal memotong menyapu ke bawah",
          startPoint: { x: 56, y: 15 },
          endPoint: { x: 50, y: 88 }
        }
      ]
    },
    katakana: {
      character: "ユ",
      strokes: 2,
      handwritingNote: "Berasal dari kanji busur (弓). Siku kotak atas dan garis penutup horizontal bawah.",
      pitfalls: "Garis horizontal bawah lebih panjang menonjol keluar ke kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik horizontal pendek ke kanan lalu tekuk vertikal lurus ke bawah.",
          strokeType: "tome",
          direction: "Horizontal siku vertikal turun",
          startPoint: { x: 30, y: 30 },
          endPoint: { x: 66, y: 68 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal panjang di bawah dari kiri menyambung siku dan memanjang ke kanan.",
          strokeType: "tome",
          direction: "Horizontal penutup bawah panjang",
          startPoint: { x: 25, y: 68 },
          endPoint: { x: 78, y: 68 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ゆき", wordKatakana: "ユキ", romaji: "yuki", meaning: "Salju" },
      { wordHiragana: "ゆめ", wordKatakana: "ユメ", romaji: "yume", meaning: "Mimpi" }
    ]
  },
  {
    id: "yo",
    romaji: "yo",
    row: "y",
    rowName: "Baris Ya (Ya-Yu-Yo)",
    hiragana: {
      character: "よ",
      strokes: 2,
      handwritingNote: "Garis horizontal pendek atas (1), tiang vertikal dengan simpul loop ke kiri (2).",
      pitfalls: "Garis horizontal atas pendek, jangan terlalu panjang.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal pendek di sebelah kiri atas.",
          strokeType: "tome",
          direction: "Horizontal pendek kiri",
          startPoint: { x: 26, y: 35 },
          endPoint: { x: 52, y: 35 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang vertikal memotong ujung garis pertama, buat simpul loop ke kiri lalu liuk horizontal ke kanan.",
          strokeType: "tome",
          direction: "Vertikal turun, simpul loop kiri, liuk kanan",
          startPoint: { x: 50, y: 18 },
          endPoint: { x: 74, y: 78 }
        }
      ]
    },
    katakana: {
      character: "ヨ",
      strokes: 3,
      handwritingNote: "Berasal dari kanji (与). Mirip huruf E terbalik atau sisir tiga gigi.",
      pitfalls: "Garis atas dan tiang vertikal dibuat dalam 1 goresan siku, lalu garis tengah, lalu garis bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik horizontal atas ke kanan lalu tekuk vertikal lurus ke bawah.",
          strokeType: "tome",
          direction: "Horizontal atas siku vertikal turun",
          startPoint: { x: 30, y: 26 },
          endPoint: { x: 30, y: 76 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal tengah pendek dari tiang ke arah kanan.",
          strokeType: "tome",
          direction: "Horizontal tengah pendek",
          startPoint: { x: 30, y: 51 },
          endPoint: { x: 64, y: 51 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis horizontal bawah menutup dari tiang ke kanan sejajar garis atas.",
          strokeType: "tome",
          direction: "Horizontal bawah penutup",
          startPoint: { x: 30, y: 76 },
          endPoint: { x: 72, y: 76 }
        }
      ]
    },
    examples: [
      { wordHiragana: "よる", wordKatakana: "ヨル", romaji: "yoru", meaning: "Malam hari" },
      { wordHiragana: "よみもの", wordKatakana: "ヨミモノ", romaji: "yomimono", meaning: "Bahan bacaan" }
    ]
  },

  // --- RA ROW ---
  {
    id: "ra",
    romaji: "ra",
    row: "r",
    rowName: "Baris Ra (Ra-Ri-Ru-Re-Ro)",
    hiragana: {
      character: "ら",
      strokes: 2,
      handwritingNote: "Titik atas miring pendek (1), lengkungan busur besar di bawah (2).",
      pitfalls: "Titik atas terpisah dari lengkungan bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik garis pendek miring di bagian atas.",
          strokeType: "tome",
          direction: "Titik pendek atas",
          startPoint: { x: 44, y: 20 },
          endPoint: { x: 54, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang pendek turun lalu buat lengkungan busur bulat besar ke kanan bawah.",
          strokeType: "harai",
          direction: "Tiang pendek turun lalu busur lengkung bulat",
          startPoint: { x: 36, y: 40 },
          endPoint: { x: 62, y: 82 }
        }
      ]
    },
    katakana: {
      character: "ラ",
      strokes: 2,
      handwritingNote: "Garis horizontal atas (1), garis horizontal kedua tekuk melengkung ke kiri (2).",
      pitfalls: "Garis pertama pendek mendatar, garis kedua melengkung ke kiri bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas pendek.",
          strokeType: "tome",
          direction: "Horizontal pendek atas",
          startPoint: { x: 32, y: 26 },
          endPoint: { x: 68, y: 26 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kedua lalu tekuk melengkung menyapu ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal lalu lengkung menyapu ke kiri bawah",
          startPoint: { x: 26, y: 46 },
          endPoint: { x: 32, y: 86 }
        }
      ]
    },
    examples: [
      { wordHiragana: "らいしゅう", wordKatakana: "ライシュウ", romaji: "raishuu", meaning: "Minggu depan" },
      { wordHiragana: "ラジオ", wordKatakana: "ラジオ", romaji: "rajio", meaning: "Radio" }
    ]
  },
  {
    id: "ri",
    romaji: "ri",
    row: "r",
    rowName: "Baris Ra (Ra-Ri-Ru-Re-Ro)",
    hiragana: {
      character: "り",
      strokes: 2,
      handwritingNote: "Garis kiri pendek berkait halus, garis kanan panjang melengkung menyapu. TERPISAH dalam tulisan tangan.",
      pitfalls: "Kedua garis terpisah pada tulisan tangan kyōkasho-tai, jangan digabung jadi loop.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis kiri pendek melengkung turun dengan kait kecil di ujungnya.",
          strokeType: "hane",
          direction: "Vertikal kiri pendek berkait",
          startPoint: { x: 34, y: 28 },
          endPoint: { x: 32, y: 58 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis kanan lebih panjang melengkung anggun menyapu ke kiri bawah.",
          strokeType: "harai",
          direction: "Vertikal kanan panjang menyapu melengkung",
          startPoint: { x: 64, y: 18 },
          endPoint: { x: 50, y: 86 }
        }
      ]
    },
    katakana: {
      character: "リ",
      strokes: 2,
      handwritingNote: "Sangat mirip Hiragana tetapi garis-garisnya lebih lurus dan tegak.",
      pitfalls: "Garis kiri pendek lurus, garis kanan panjang menyapu ke kiri bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis vertikal pendek lurus di sisi kiri.",
          strokeType: "tome",
          direction: "Vertikal pendek kiri lurus",
          startPoint: { x: 36, y: 24 },
          endPoint: { x: 36, y: 55 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang kanan panjang lurus lalu melengkung menyapu ke kiri bawah di ujungnya.",
          strokeType: "harai",
          direction: "Vertikal panjang lurus menyapu ke kiri bawah",
          startPoint: { x: 64, y: 20 },
          endPoint: { x: 48, y: 88 }
        }
      ]
    },
    examples: [
      { wordHiragana: "りんご", wordKatakana: "リンゴ", romaji: "ringo", meaning: "Apel" },
      { wordHiragana: "りょこう", wordKatakana: "リョコウ", romaji: "ryokou", meaning: "Wisata / Travelling" }
    ]
  },
  {
    id: "ru",
    romaji: "ru",
    row: "r",
    rowName: "Baris Ra (Ra-Ri-Ru-Re-Ro)",
    hiragana: {
      character: "る",
      strokes: 1,
      handwritingNote: "Satu goresan mirip angka 3 yang di ujung ekor bawahnya membuat simpul loop bulat tertutup.",
      pitfalls: "Berbeda dari ro (ろ): 'ru' memiliki simpul loop di ujung bawah, sedangkan 'ro' ekornya terbuka.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik horizontal, diagonal ke kiri bawah, busur bulat besar lalu buat simpul loop bundar tertutup di ekornya.",
          strokeType: "tome",
          direction: "Horizontal, diagonal, busur bulat dan loop tertutup di ujung",
          startPoint: { x: 28, y: 28 },
          endPoint: { x: 54, y: 72 }
        }
      ]
    },
    katakana: {
      character: "ル",
      strokes: 2,
      handwritingNote: "Berasal dari kanji aliran (流). Kaki kiri miring menyapu, kaki kanan turun meliuk berkait ke atas.",
      pitfalls: "Kaki kanan ditarik turun lalu membelok horizontal dan berkait melenting ke atas.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik kaki kiri dari tengah atas menyapu meluncur ke kiri bawah.",
          strokeType: "harai",
          direction: "Miring kiri bawah menyapu",
          startPoint: { x: 42, y: 22 },
          endPoint: { x: 25, y: 80 }
        },
        {
          stepNumber: 2,
          tip: "Tarik kaki kanan vertikal turun lalu tekuk horizontal ke kanan dan lentingkan kait ke atas.",
          strokeType: "hane",
          direction: "Vertikal turun belok horizontal berkait ke atas",
          startPoint: { x: 58, y: 22 },
          endPoint: { x: 78, y: 72 }
        }
      ]
    },
    examples: [
      { wordHiragana: "くるま", wordKatakana: "クルマ", romaji: "kuruma", meaning: "Mobil" },
      { wordHiragana: "ルール", wordKatakana: "ルール", romaji: "ruuru", meaning: "Aturan / Rules" }
    ]
  },
  {
    id: "re",
    romaji: "re",
    row: "r",
    rowName: "Baris Ra (Ra-Ri-Ru-Re-Ro)",
    hiragana: {
      character: "れ",
      strokes: 2,
      handwritingNote: "Tiang vertikal kiri (1), bagian kanan zig-zag lalu liuk kait membuka ke luar kanan (2).",
      pitfalls: "Ekor kanan membuka ke luar kanan atas (berbeda dari わ yang melengkung bulat dan ね yang berloop).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang vertikal kiri lurus dari atas ke bawah.",
          strokeType: "tome",
          direction: "Vertikal kiri lurus",
          startPoint: { x: 30, y: 18 },
          endPoint: { x: 30, y: 85 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari kiri tiang, buat zig-zag mirip angka 7 lalu liukkan ekor membuka meluncur ke kanan atas.",
          strokeType: "harai",
          direction: "Zig-zag lalu sapuan ekor membuka ke kanan atas",
          startPoint: { x: 18, y: 35 },
          endPoint: { x: 78, y: 70 }
        }
      ]
    },
    katakana: {
      character: "レ",
      strokes: 1,
      handwritingNote: "Hanya 1 goresan tunggal mirip tanda centang (check mark) bersiku.",
      pitfalls: "Vertikal turun lalu tekuk melesat miring ke kanan atas dalam 1 goresan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik vertikal lurus ke bawah lalu tekuk tajam meluncur menyapu ke kanan atas dalam 1 goresan.",
          strokeType: "harai",
          direction: "Vertikal turun tekuk menyapu ke kanan atas",
          startPoint: { x: 38, y: 20 },
          endPoint: { x: 72, y: 65 }
        }
      ]
    },
    examples: [
      { wordHiragana: "れきし", wordKatakana: "レキシ", romaji: "rekishi", meaning: "Sejarah" },
      { wordHiragana: "レストラン", wordKatakana: "レストラン", romaji: "resutoran", meaning: "Restoran" }
    ]
  },
  {
    id: "ro",
    romaji: "ro",
    row: "r",
    rowName: "Baris Ra (Ra-Ri-Ru-Re-Ro)",
    hiragana: {
      character: "ろ",
      strokes: 1,
      handwritingNote: "Satu goresan persis seperti angka 3 dengan bagian bawah melengkung terbuka polos tanpa simpul loop.",
      pitfalls: "JANGAN buat simpul loop di ujung bawah! Jika ada simpul akan menjadi る (ru).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik horizontal, diagonal ke kiri bawah lalu buat busur setengah lingkaran terbuka di bawah dalam 1 goresan.",
          strokeType: "tome",
          direction: "Angka 3 kontinu dengan ekor terbuka polos",
          startPoint: { x: 28, y: 28 },
          endPoint: { x: 66, y: 80 }
        }
      ]
    },
    katakana: {
      character: "ロ",
      strokes: 3,
      handwritingNote: "Bentuk kotak sempurna persis kanji mulut (口). Mengikuti aturan kotak Kaidah Emas.",
      pitfalls: "Kotak terdiri dari 3 goresan: tiang kiri, sudut atas-kanan, dan penutup bawah.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang kiri vertikal lurus ke bawah.",
          strokeType: "tome",
          direction: "Vertikal kiri kotak",
          startPoint: { x: 26, y: 25 },
          endPoint: { x: 26, y: 75 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari ujung atas tiang kiri, tarik horizontal ke kanan lalu tekuk siku turun ke bawah.",
          strokeType: "tome",
          direction: "Horizontal atas lalu siku vertikal kanan",
          startPoint: { x: 26, y: 25 },
          endPoint: { x: 74, y: 75 }
        },
        {
          stepNumber: 3,
          tip: "Tarik garis horizontal penutup bawah dari kiri ke kanan mengunci kotak.",
          strokeType: "tome",
          direction: "Horizontal penutup bawah",
          startPoint: { x: 24, y: 75 },
          endPoint: { x: 76, y: 75 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ろうそく", wordKatakana: "ロウソク", romaji: "rousoku", meaning: "Lilin" },
      { wordHiragana: "ロシア", wordKatakana: "ロシア", romaji: "roshia", meaning: "Negara Rusia" }
    ]
  },

  // --- WA / WO / N ROW ---
  {
    id: "wa",
    romaji: "wa",
    row: "w",
    rowName: "Baris Wa / Wo / N",
    hiragana: {
      character: "わ",
      strokes: 2,
      handwritingNote: "Tiang vertikal kiri (1), bagian kanan melengkung busur bulat besar ke dalam seperti perut buncit (2).",
      pitfalls: "Ekor kanan melengkung bulat polos ke dalam (tanpa kait keluar seperti れ, tanpa loop seperti ね).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang vertikal kiri lurus dari atas ke bawah.",
          strokeType: "tome",
          direction: "Vertikal kiri lurus",
          startPoint: { x: 30, y: 18 },
          endPoint: { x: 30, y: 85 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari kiri tiang, buat zig-zag mirip angka 7 lalu busur bulat besar melengkung ke dalam di bawah.",
          strokeType: "tome",
          direction: "Zig-zag lalu busur bulat besar melengkung ke dalam",
          startPoint: { x: 18, y: 35 },
          endPoint: { x: 68, y: 80 }
        }
      ]
    },
    katakana: {
      character: "ワ",
      strokes: 2,
      handwritingNote: "Tiang kiri pendek (1), horizontal tekuk melengkung ke kiri bawah (2).",
      pitfalls: "Memiliki tiang kiri pendek sebagai pembeda utama dari Katakana Ku (ク).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik tiang kiri vertikal pendek di kiri atas.",
          strokeType: "tome",
          direction: "Vertikal pendek kiri atas",
          startPoint: { x: 28, y: 26 },
          endPoint: { x: 28, y: 46 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari ujung atas tiang pertama, tarik horizontal ke kanan lalu tekuk menyapu melengkung ke kiri bawah.",
          strokeType: "harai",
          direction: "Horizontal ke kanan lalu lengkung menyapu ke kiri bawah",
          startPoint: { x: 28, y: 26 },
          endPoint: { x: 34, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "わたし", wordKatakana: "ワタシ", romaji: "watashi", meaning: "Saya / Aku" },
      { wordHiragana: "わに", wordKatakana: "ワニ", romaji: "wani", meaning: "Buaya" }
    ]
  },
  {
    id: "wo",
    romaji: "wo",
    row: "w",
    rowName: "Baris Wa / Wo / N",
    hiragana: {
      character: "を",
      strokes: 3,
      handwritingNote: "Digunakan khusus sebagai partikel gramatikal objek (diucapkan 'o').",
      pitfalls: "Garis horizontal atas (1), tiang diagonal melengkung (2), dan lengkungan C setengah lingkaran bawah (3).",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas dari kiri ke kanan.",
          strokeType: "tome",
          direction: "Horizontal atas",
          startPoint: { x: 26, y: 30 },
          endPoint: { x: 68, y: 30 }
        },
        {
          stepNumber: 2,
          tip: "Tarik tiang diagonal miring ke kiri bawah lalu tekuk mendatar ke kanan.",
          strokeType: "tome",
          direction: "Diagonal kiri bawah tekuk horizontal",
          startPoint: { x: 48, y: 18 },
          endPoint: { x: 72, y: 56 }
        },
        {
          stepNumber: 3,
          tip: "Tarik kurva setengah lingkaran melengkung memotong di bagian bawah.",
          strokeType: "harai",
          direction: "Kurva C setengah lingkaran bawah",
          startPoint: { x: 44, y: 52 },
          endPoint: { x: 74, y: 80 }
        }
      ]
    },
    katakana: {
      character: "ヲ",
      strokes: 3,
      handwritingNote: "Berasal dari kanji (乎). Dua garis horizontal dan satu garis diagonal menyapu.",
      pitfalls: "Sangat jarang digunakan dalam kata modern, utamanya untuk tata bahasa penulisan tertentu.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis horizontal atas pendek.",
          strokeType: "tome",
          direction: "Horizontal atas pendek",
          startPoint: { x: 28, y: 28 },
          endPoint: { x: 70, y: 28 }
        },
        {
          stepNumber: 2,
          tip: "Tarik garis horizontal kedua sejajar di bawahnya sedikit lebih panjang.",
          strokeType: "tome",
          direction: "Horizontal kedua",
          startPoint: { x: 24, y: 46 },
          endPoint: { x: 74, y: 46 }
        },
        {
          stepNumber: 3,
          tip: "Mulai dari garis horizontal pertama, tarik garis diagonal memotong menyapu ke kiri bawah.",
          strokeType: "harai",
          direction: "Diagonal memotong menyapu ke kiri bawah",
          startPoint: { x: 58, y: 28 },
          endPoint: { x: 28, y: 85 }
        }
      ]
    },
    examples: [
      { wordHiragana: "ほんをよむ", wordKatakana: "ホンヲヨム", romaji: "hon o yomu", meaning: "Membaca buku (partikel objek)" },
      { wordHiragana: "みずをのむ", wordKatakana: "ミズヲノム", romaji: "mizu o nomu", meaning: "Meminum air" }
    ]
  },
  {
    id: "n",
    romaji: "n",
    row: "n-single",
    rowName: "Baris Wa / Wo / N",
    hiragana: {
      character: "ん",
      strokes: 1,
      handwritingNote: "Satu goresan kontinu mirip huruf 'n' dalam abjad latin atau ombak lembut.",
      pitfalls: "Garis miring turun dari kiri atas, lalu naik melengkung bulat dan berakhir meluncur ke kanan.",
      steps: [
        {
          stepNumber: 1,
          tip: "Tarik garis miring dari kiri atas ke kiri bawah, lalu naik membentuk busur gelombang dan meluncur ke kanan atas dalam 1 goresan.",
          strokeType: "harai",
          direction: "Diagonal turun lalu busur gelombang naik ke kanan",
          startPoint: { x: 38, y: 22 },
          endPoint: { x: 75, y: 68 }
        }
      ]
    },
    katakana: {
      character: "ン",
      strokes: 2,
      handwritingNote: "SANGAT PENTING: Garis ke-2 ditarik DARI KIRI BAWAH MENYAPU NAIK KE KANAN ATAS.",
      pitfalls: "JANGAN DITARIK DARI ATAS KE BAWAH! Itu adalah Katakana So (ソ). Titik pertama mendatar.",
      steps: [
        {
          stepNumber: 1,
          tip: "Buat titik garis pendek agak mendatar di kiri atas tengah.",
          strokeType: "tome",
          direction: "Titik mendatar pendek",
          startPoint: { x: 30, y: 35 },
          endPoint: { x: 42, y: 40 }
        },
        {
          stepNumber: 2,
          tip: "Mulai dari KIRI BAWAH, sapukan garis meluncur naik ke KANAN ATAS dengan kemiringan anggun.",
          strokeType: "harai",
          direction: "DARI KIRI BAWAH MELESAT NAIK KE KANAN ATAS",
          startPoint: { x: 24, y: 82 },
          endPoint: { x: 76, y: 32 }
        }
      ]
    },
    examples: [
      { wordHiragana: "にほん", wordKatakana: "ニホン", romaji: "nihon", meaning: "Negara Jepang" },
      { wordHiragana: "パン", wordKatakana: "パン", romaji: "pan", meaning: "Roti" }
    ]
  }
];

export const WRITING_ROW_GROUPS = [
  { id: "all", label: "Semua 46 Huruf" },
  { id: "vowel", label: "Baris Vokal (A-I-U-E-O)" },
  { id: "k", label: "Baris K (Ka-Ki-Ku-Ke-Ko)" },
  { id: "s", label: "Baris S (Sa-Shi-Su-Se-So)" },
  { id: "t", label: "Baris T (Ta-Chi-Tsu-Te-To)" },
  { id: "n", label: "Baris N (Na-Ni-Nu-Ne-No)" },
  { id: "h", label: "Baris H (Ha-Hi-Fu-He-Ho)" },
  { id: "m", label: "Baris M (Ma-Mi-Mu-Me-Mo)" },
  { id: "y", label: "Baris Y (Ya-Yu-Yo)" },
  { id: "r", label: "Baris R (Ra-Ri-Ru-Re-Ro)" },
  { id: "w", label: "Baris W & N (Wa-Wo-N)" }
];
