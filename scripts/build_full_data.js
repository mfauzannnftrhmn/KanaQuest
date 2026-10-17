// scripts/build_full_data.js
const fs = require("fs");
const path = require("path");

// 1. Process kanaData.ts
const kanaPath = path.join(__dirname, "../data/kanaData.ts");
let kanaCode = fs.readFileSync(kanaPath, "utf8");

// Check if DAKUON_KANA is already in kanaData.ts
if (!kanaCode.includes("export const DAKUON_KANA")) {
  const dakuonAndHandakuonKana = `
export const DAKUON_KANA: KanaItem[] = [
  // Baris G (Ga-Gi-Gu-Ge-Go) - Tenten ゛
  {
    id: "ga",
    romaji: "ga",
    hiragana: "が",
    katakana: "ガ",
    row: "g",
    rowName: "Baris G (Ga-Gi-Gu-Ge-Go) - Tenten ゛",
    strokes: 5,
    strokeTips: [
      "Goreskan garis lengkung utama Ka (か) dengan kait di ujung.",
      "Tarik garis vertikal sedikit miring melengkung di kanan.",
      "Beri titik miring pendek di atas garis Ka.",
      "Tambahkan dua coretan diagonal pendek (tenten ゛) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "がくせい", wordKatakana: "ガクセイ", romaji: "gakusei", meaning: "Siswa / Pelajar" },
      { wordHiragana: "がっこう", wordKatakana: "ガッコウ", romaji: "gakkou", meaning: "Sekolah" },
      { wordHiragana: "がいこくじん", wordKatakana: "ガイコクジン", romaji: "gaikokujin", meaning: "Orang asing" }
    ]
  },
  {
    id: "gi",
    romaji: "gi",
    hiragana: "ぎ",
    katakana: "ギ",
    row: "g",
    rowName: "Baris G (Ga-Gi-Gu-Ge-Go) - Tenten ゛",
    strokes: 6,
    strokeTips: [
      "Buat dua garis mendatar sejajar milik Ki (き).",
      "Tarik garis memotong diagonal melengkung ke kiri.",
      "Beri lengkungan terpisah di bagian bawah.",
      "Tambahkan dua coretan diagonal pendek (tenten ゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ぎんこう", wordKatakana: "ギンコウ", romaji: "ginkou", meaning: "Bank" },
      { wordHiragana: "ぎゅうにく", wordKatakana: "ギュウニク", romaji: "gyuuniku", meaning: "Daging sapi" }
    ]
  },
  {
    id: "gu",
    romaji: "gu",
    hiragana: "ぐ",
    katakana: "グ",
    row: "g",
    rowName: "Baris G (Ga-Gi-Gu-Ge-Go) - Tenten ゛",
    strokes: 3,
    strokeTips: [
      "Tarik satu goresan siku tumpul membuka ke kanan Ku (く).",
      "Tambahkan tanda tenten (゛) di sebelah kanan atas."
    ],
    examples: [
      { wordHiragana: "グラス", wordKatakana: "グラス", romaji: "gurasu", meaning: "Gelas kaca" },
      { wordHiragana: "ぐあい", wordKatakana: "グアイ", romaji: "guai", meaning: "Kondisi tubuh / Keadaan" }
    ]
  },
  {
    id: "ge",
    romaji: "ge",
    hiragana: "げ",
    katakana: "ゲ",
    row: "g",
    rowName: "Baris G (Ga-Gi-Gu-Ge-Go) - Tenten ゛",
    strokes: 5,
    strokeTips: [
      "Goreskan garis vertikal sedikit melengkung di sebelah kiri.",
      "Buat garis horizontal pendek dan garis vertikal kanan Ke (け).",
      "Tambahkan dua tanda tenten (゛) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "げつようび", wordKatakana: "ゲツヨウビ", romaji: "getsuyoobi", meaning: "Hari Senin" },
      { wordHiragana: "げんかん", wordKatakana: "ゲンカン", romaji: "genkan", meaning: "Pintu masuk" }
    ]
  },
  {
    id: "go",
    romaji: "go",
    hiragana: "ご",
    katakana: "ゴ",
    row: "g",
    rowName: "Baris G (Ga-Gi-Gu-Ge-Go) - Tenten ゛",
    strokes: 4,
    strokeTips: [
      "Buat garis horizontal atas Ko (こ).",
      "Buat garis horizontal bawah melengkung lembut.",
      "Tambahkan dua coretan tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ごはん", wordKatakana: "ゴハン", romaji: "gohan", meaning: "Nasi / Makanan" },
      { wordHiragana: "ごご", wordKatakana: "ゴゴ", romaji: "gogo", meaning: "P.M. / Sore hari" },
      { wordHiragana: "ごめん", wordKatakana: "ゴメン", romaji: "gomen", meaning: "Maaf" }
    ]
  },

  // Baris Z (Za-Ji-Zu-Ze-Zo) - Tenten ゛
  {
    id: "za",
    romaji: "za",
    hiragana: "ざ",
    katakana: "ザ",
    row: "z",
    rowName: "Baris Z (Za-Ji-Zu-Ze-Zo) - Tenten ゛",
    strokes: 5,
    strokeTips: [
      "Buat garis horizontal Sa (さ).",
      "Tarik garis miring memotong dengan kaitan kecil.",
      "Beri lengkungan di bagian bawah.",
      "Tambahkan tanda tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ざっし", wordKatakana: "ザッシ", romaji: "zasshi", meaning: "Majalah" },
      { wordHiragana: "ざんぎょう", wordKatakana: "ザンギョウ", romaji: "zangyoo", meaning: "Lembur kerja" }
    ]
  },
  {
    id: "ji",
    romaji: "ji",
    hiragana: "じ",
    katakana: "ジ",
    row: "z",
    rowName: "Baris Z (Za-Ji-Zu-Ze-Zo) - Tenten ゛",
    strokes: 3,
    strokeTips: [
      "Tarik garis Shi (し) vertikal ke bawah lalu melengkung naik mirip kail pancing.",
      "Tambahkan dua coretan diagonal pendek (tenten ゛) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "じこしょうかい", wordKatakana: "ジコショウカイ", romaji: "jikoshoukai", meaning: "Perkenalan diri" },
      { wordHiragana: "じかん", wordKatakana: "ジカン", romaji: "jikan", meaning: "Waktu / Jam" },
      { wordHiragana: "じしょ", wordKatakana: "ジショ", romaji: "jisho", meaning: "Kamus" }
    ]
  },
  {
    id: "zu",
    romaji: "zu",
    hiragana: "ず",
    katakana: "ズ",
    row: "z",
    rowName: "Baris Z (Za-Ji-Zu-Ze-Zo) - Tenten ゛",
    strokes: 4,
    strokeTips: [
      "Goreskan garis horizontal Su (す).",
      "Tarik vertikal memotong lalu bentuk loop melingkar ke bawah.",
      "Tambahkan tanda tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ちず", wordKatakana: "チズ", romaji: "chizu", meaning: "Peta" },
      { wordHiragana: "みず", wordKatakana: "ミズ", romaji: "mizu", meaning: "Air putih" }
    ]
  },
  {
    id: "ze",
    romaji: "ze",
    hiragana: "ぜ",
    katakana: "ゼ",
    row: "z",
    rowName: "Baris Z (Za-Ji-Zu-Ze-Zo) - Tenten ゛",
    strokes: 5,
    strokeTips: [
      "Buat garis horizontal Se (せ).",
      "Goreskan garis vertikal pendek di sisi kanan.",
      "Tarik garis vertikal kiri melengkung ke kanan bawah.",
      "Tambahkan dua coretan tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ぜんぜん", wordKatakana: "ゼンゼン", romaji: "zenzen", meaning: "Sama sekali tidak" },
      { wordHiragana: "ごぜん", wordKatakana: "ゴゼン", romaji: "gozen", meaning: "A.M. / Pagi hari" }
    ]
  },
  {
    id: "zo",
    romaji: "zo",
    hiragana: "ぞ",
    katakana: "ゾ",
    row: "z",
    rowName: "Baris Z (Za-Ji-Zu-Ze-Zo) - Tenten ゛",
    strokes: 3,
    strokeTips: [
      "Buat goresan zig-zag bersambung So (そ) melengkung ke bawah.",
      "Tambahkan tanda tenten (゛) di sebelah kanan atas."
    ],
    examples: [
      { wordHiragana: "ぞう", wordKatakana: "ゾウ", romaji: "zou", meaning: "Gajah" },
      { wordHiragana: "れいぞうこ", wordKatakana: "レイゾウコ", romaji: "reezooko", meaning: "Kulkas" }
    ]
  },

  // Baris D (Da-Ji-Zu-De-Do) - Tenten ゛
  {
    id: "da",
    romaji: "da",
    hiragana: "だ",
    katakana: "ダ",
    row: "d",
    rowName: "Baris D (Da-Ji-Zu-De-Do) - Tenten ゛",
    strokes: 6,
    strokeTips: [
      "Buat garis horizontal Ta (た) dan garis miring memotongnya.",
      "Buat dua garis kecil sejajar di bawah kanan.",
      "Tambahkan dua coretan diagonal tenten (゛) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "だいどころ", wordKatakana: "ダイドコロ", romaji: "daidokoro", meaning: "Dapur" },
      { wordHiragana: "ただいま", wordKatakana: "タダイマ", romaji: "tadaima", meaning: "Saya pulang" }
    ]
  },
  {
    id: "dji",
    romaji: "ji",
    hiragana: "ぢ",
    katakana: "ヂ",
    row: "d",
    rowName: "Baris D (Da-Ji-Zu-De-Do) - Tenten ゛",
    strokes: 4,
    strokeTips: [
      "Goreskan garis horizontal Chi (ち).",
      "Tarik garis vertikal meliuk memutar membentuk angka 5.",
      "Tambahkan dua tanda tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "はなぢ", wordKatakana: "ハナヂ", romaji: "hanaji", meaning: "Mimisan" },
      { wordHiragana: "ちぢむ", wordKatakana: "チヂム", romaji: "chijimu", meaning: "Menyusut / Menciut" }
    ]
  },
  {
    id: "dzu",
    romaji: "zu",
    hiragana: "づ",
    katakana: "ヅ",
    row: "d",
    rowName: "Baris D (Da-Ji-Zu-De-Do) - Tenten ゛",
    strokes: 3,
    strokeTips: [
      "Tarik garis lengkung ombak Tsu (つ) dari kiri ke kanan lalu meliuk ke bawah.",
      "Tambahkan dua garis diagonal pendek tenten (゛) di sebelah kanan atas."
    ],
    examples: [
      { wordHiragana: "つづく", wordKatakana: "ツヅク", romaji: "tsudzuku", meaning: "Berlanjut" },
      { wordHiragana: "みかづき", wordKatakana: "ミカヅキ", romaji: "mikadzuki", meaning: "Bulan sabit" }
    ]
  },
  {
    id: "de",
    romaji: "de",
    hiragana: "で",
    katakana: "デ",
    row: "d",
    rowName: "Baris D (Da-Ji-Zu-De-Do) - Tenten ゛",
    strokes: 3,
    strokeTips: [
      "Tarik garis horizontal Te (て) lalu melengkung kembali ke bawah.",
      "Tambahkan dua coretan tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "でんしゃ", wordKatakana: "デンシャ", romaji: "densha", meaning: "Kereta api" },
      { wordHiragana: "でぐち", wordKatakana: "デグチ", romaji: "deguchi", meaning: "Pintu keluar" },
      { wordHiragana: "でんわ", wordKatakana: "デンワ", romaji: "denwa", meaning: "Telepon" }
    ]
  },
  {
    id: "do",
    romaji: "do",
    hiragana: "ど",
    katakana: "ド",
    row: "d",
    rowName: "Baris D (Da-Ji-Zu-De-Do) - Tenten ゛",
    strokes: 4,
    strokeTips: [
      "Garis miring pendek To (と) di atas.",
      "Lengkungan besar membuka ke kiri di bawahnya.",
      "Tambahkan dua coretan tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "どこ", wordKatakana: "ドコ", romaji: "doko", meaning: "Di mana" },
      { wordHiragana: "ともだち", wordKatakana: "トモダチ", romaji: "tomodachi", meaning: "Teman" },
      { wordHiragana: "ドア", wordKatakana: "ドア", romaji: "doa", meaning: "Pintu" }
    ]
  },

  // Baris B (Ba-Bi-Bu-Be-Bo) - Tenten ゛
  {
    id: "ba",
    romaji: "ba",
    hiragana: "ば",
    katakana: "バ",
    row: "b",
    rowName: "Baris B (Ba-Bi-Bu-Be-Bo) - Tenten ゛",
    strokes: 5,
    strokeTips: [
      "Tulis garis vertikal kiri Ha (は).",
      "Buat garis horizontal atas dan garis vertikal dengan loop bawah.",
      "Tambahkan dua tanda tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ばんごはん", wordKatakana: "バンゴハン", romaji: "bangohan", meaning: "Makan malam" },
      { wordHiragana: "おばあさん", wordKatakana: "オバアサン", romaji: "obaasan", meaning: "Nenek" }
    ]
  },
  {
    id: "bi",
    romaji: "bi",
    hiragana: "び",
    katakana: "ビ",
    row: "b",
    rowName: "Baris B (Ba-Bi-Bu-Be-Bo) - Tenten ゛",
    strokes: 3,
    strokeTips: [
      "Satu tarikan garis Hi (ひ) melengkung membentuk mangkuk 'U'.",
      "Tambahkan tanda tenten (゛) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "びょういん", wordKatakana: "ビョウイン", romaji: "byooin", meaning: "Rumah sakit" },
      { wordHiragana: "ビール", wordKatakana: "ビール", romaji: "biiru", meaning: "Bir" }
    ]
  },
  {
    id: "bu",
    romaji: "bu",
    hiragana: "ぶ",
    katakana: "ブ",
    row: "b",
    rowName: "Baris B (Ba-Bi-Bu-Be-Bo) - Tenten ゛",
    strokes: 6,
    strokeTips: [
      "Tulis karakter dasar Fu (ふ) dengan 4 goresan.",
      "Tambahkan dua garis tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ぶたにく", wordKatakana: "ブタニク", romaji: "butaniku", meaning: "Daging babi" },
      { wordHiragana: "ぶどう", wordKatakana: "ブドウ", romaji: "budoo", meaning: "Anggur" }
    ]
  },
  {
    id: "be",
    romaji: "be",
    hiragana: "べ",
    katakana: "ベ",
    row: "b",
    rowName: "Baris B (Ba-Bi-Bu-Be-Bo) - Tenten ゛",
    strokes: 3,
    strokeTips: [
      "Satu goresan He (へ) meliuk naik lalu turun landai.",
      "Tambahkan dua garis tenten (゛) di sebelah kanan atas."
    ],
    examples: [
      { wordHiragana: "べんきょう", wordKatakana: "ベンキョウ", romaji: "benkyoo", meaning: "Belajar" },
      { wordHiragana: "べんり", wordKatakana: "ベンリ", romaji: "benri", meaning: "Praktis" },
      { wordHiragana: "ベッド", wordKatakana: "ベッド", romaji: "beddo", meaning: "Tempat tidur" }
    ]
  },
  {
    id: "bo",
    romaji: "bo",
    hiragana: "ぼ",
    katakana: "ボ",
    row: "b",
    rowName: "Baris B (Ba-Bi-Bu-Be-Bo) - Tenten ゛",
    strokes: 6,
    strokeTips: [
      "Goreskan garis vertikal kiri Ho (ほ).",
      "Buat dua garis mendatar dan loop vertikal memotong.",
      "Tambahkan dua tanda tenten (゛) di kanan atas."
    ],
    examples: [
      { wordHiragana: "ぼく", wordKatakana: "ボク", romaji: "boku", meaning: "Aku (laki-laki)" },
      { wordHiragana: "ぼうし", wordKatakana: "ボウシ", romaji: "booshi", meaning: "Topi" }
    ]
  }
];

export const HANDAKUON_KANA: KanaItem[] = [
  // Baris P (Pa-Pi-Pu-Pe-Po) - Maru ゜
  {
    id: "pa",
    romaji: "pa",
    hiragana: "ぱ",
    katakana: "パ",
    row: "p",
    rowName: "Baris P (Pa-Pi-Pu-Pe-Po) - Maru ゜",
    strokes: 4,
    strokeTips: [
      "Tulis huruf dasar Ha (は) lengkap (garis vertikal, horizontal, dan lingkaran loop).",
      "Beri lingkaran kecil maru (゜) di bagian kanan atas."
    ],
    examples: [
      { wordHiragana: "パン", wordKatakana: "パン", romaji: "pan", meaning: "Roti" },
      { wordHiragana: "パーティー", wordKatakana: "パーティー", romaji: "paathii", meaning: "Pesta" }
    ]
  },
  {
    id: "pi",
    romaji: "pi",
    hiragana: "ぴ",
    katakana: "ピ",
    row: "p",
    rowName: "Baris P (Pa-Pi-Pu-Pe-Po) - Maru ゜",
    strokes: 2,
    strokeTips: [
      "Tulis huruf dasar Hi (ひ) melengkung seperti cangkir.",
      "Beri lingkaran kecil maru (゜) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "ピアノ", wordKatakana: "ピアノ", romaji: "piano", meaning: "Piano" },
      { wordHiragana: "ピザ", wordKatakana: "ピザ", romaji: "piza", meaning: "Pizza" }
    ]
  },
  {
    id: "pu",
    romaji: "pu",
    hiragana: "ぷ",
    katakana: "プ",
    row: "p",
    rowName: "Baris P (Pa-Pi-Pu-Pe-Po) - Maru ゜",
    strokes: 5,
    strokeTips: [
      "Tulis huruf dasar Fu (ふ) dengan 4 goresan dasarnya.",
      "Beri lingkaran kecil maru (゜) di sebelah kanan atas."
    ],
    examples: [
      { wordHiragana: "てんぷら", wordKatakana: "テンプラ", romaji: "tenpura", meaning: "Tempura" },
      { wordHiragana: "きっぷ", wordKatakana: "キップ", romaji: "kippu", meaning: "Tiket" }
    ]
  },
  {
    id: "pe",
    romaji: "pe",
    hiragana: "ぺ",
    katakana: "ペ",
    row: "p",
    rowName: "Baris P (Pa-Pi-Pu-Pe-Po) - Maru ゜",
    strokes: 2,
    strokeTips: [
      "Tulis huruf dasar He (へ) dengan satu tarikan garis berbentuk puncak bukit.",
      "Beri lingkaran kecil maru (゜) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "ペン", wordKatakana: "ペン", romaji: "pen", meaning: "Pena / Pulpen" },
      { wordHiragana: "ページ", wordKatakana: "ページ", romaji: "peeji", meaning: "Halaman" }
    ]
  },
  {
    id: "po",
    romaji: "po",
    hiragana: "ぽ",
    katakana: "ポ",
    row: "p",
    rowName: "Baris P (Pa-Pi-Pu-Pe-Po) - Maru ゜",
    strokes: 5,
    strokeTips: [
      "Tulis huruf dasar Ho (ほ) dengan goresan garis dan loop bawahnya.",
      "Beri lingkaran kecil maru (゜) di sudut kanan atas."
    ],
    examples: [
      { wordHiragana: "さんぽ", wordKatakana: "サンポ", romaji: "sanpo", meaning: "Jalan-jalan santai" },
      { wordHiragana: "ポスター", wordKatakana: "ポスター", romaji: "posutaa", meaning: "Poster" }
    ]
  }
];
`;

  // Rename "export const BASIC_KANA: KanaItem[] = [" to "export const GOJUON_KANA: KanaItem[] = ["
  kanaCode = kanaCode.replace("export const BASIC_KANA: KanaItem[] = [", "export const GOJUON_KANA: KanaItem[] = [");

  // Insert DAKUON_KANA and HANDAKUON_KANA right after GOJUON_KANA array ends
  // And define BASIC_KANA as combined
  const insertIndex = kanaCode.indexOf("export const ROW_GROUPS = [");
  if (insertIndex !== -1) {
    const before = kanaCode.slice(0, insertIndex);
    const after = kanaCode.slice(insertIndex);
    kanaCode = before + dakuonAndHandakuonKana + "\nexport const BASIC_KANA: KanaItem[] = [...GOJUON_KANA, ...DAKUON_KANA, ...HANDAKUON_KANA];\n\n" + after;
  }

  // Update ROW_GROUPS
  const updatedRowGroups = `export const ROW_GROUPS = [
  // 50 Bunyi Dasar (Gojuon)
  { key: "vowel", name: "Baris Vokal (A-I-U-E-O)", group: "gojuon" },
  { key: "k", name: "Baris K (Ka-Ki-Ku-Ke-Ko)", group: "gojuon" },
  { key: "s", name: "Baris S (Sa-Shi-Su-Se-So)", group: "gojuon" },
  { key: "t", name: "Baris T (Ta-Chi-Tsu-Te-To)", group: "gojuon" },
  { key: "n", name: "Baris N (Na-Ni-Nu-Ne-No)", group: "gojuon" },
  { key: "h", name: "Baris H (Ha-Hi-Fu-He-Ho)", group: "gojuon" },
  { key: "m", name: "Baris M (Ma-Mi-Mu-Me-Mo)", group: "gojuon" },
  { key: "y", name: "Baris Y (Ya-Yu-Yo)", group: "gojuon" },
  { key: "r", name: "Baris R (Ra-Ri-Ru-Re-Ro)", group: "gojuon" },
  { key: "w", name: "Baris W (Wa-Wo)", group: "gojuon" },
  { key: "n_special", name: "Karakter N Khusus (N)", group: "gojuon" },
  // Dakuon (Tenten ゛)
  { key: "g", name: "Baris G (Ga-Gi-Gu-Ge-Go) - Tenten ゛", group: "dakuon" },
  { key: "z", name: "Baris Z (Za-Ji-Zu-Ze-Zo) - Tenten ゛", group: "dakuon" },
  { key: "d", name: "Baris D (Da-Ji-Zu-De-Do) - Tenten ゛", group: "dakuon" },
  { key: "b", name: "Baris B (Ba-Bi-Bu-Be-Bo) - Tenten ゛", group: "dakuon" },
  // Handakuon (Maru ゜)
  { key: "p", name: "Baris P (Pa-Pi-Pu-Pe-Po) - Maru ゜", group: "handakuon" },
];`;

  // Replace ROW_GROUPS
  kanaCode = kanaCode.replace(/export const ROW_GROUPS = \[[\s\S]*?\];/, updatedRowGroups);

  // Update normalizeRomaji
  const updatedNormalize = `// Normalizer for romaji variations
export function normalizeRomaji(input: string): string {
  const clean = input.trim().toLowerCase();
  const map: Record<string, string> = {
    "si": "shi",
    "ti": "chi",
    "tu": "tsu",
    "hu": "fu",
    "zi": "ji",
    "di": "ji",
    "dji": "ji",
    "du": "zu",
    "dzu": "zu",
    "o": "wo", // for を
  };
  return map[clean] || clean;
}`;
  kanaCode = kanaCode.replace(/\/\/ Normalizer for romaji variations[\s\S]*?return map\[clean\] \|\| clean;\s*\}/, updatedNormalize);

  // Update ROMAJI_TO_HIRAGANA
  const updatedHiraMap = `const ROMAJI_TO_HIRAGANA: Record<string, string> = {
  a: "あ", i: "い", u: "う", e: "え", o: "お",
  ka: "か", ki: "き", ku: "く", ke: "け", ko: "こ",
  sa: "さ", shi: "し", si: "し", su: "す", se: "せ", so: "そ",
  ta: "た", chi: "ち", ti: "ち", tsu: "つ", tu: "つ", te: "て", to: "と",
  na: "な", ni: "に", nu: "ぬ", ne: "ね", no: "の",
  ha: "は", hi: "ひ", fu: "ふ", hu: "ふ", he: "へ", ho: "ほ",
  ma: "ま", mi: "み", mu: "む", me: "め", mo: "も",
  ya: "や", yu: "ゆ", yo: "よ",
  ra: "ら", ri: "り", ru: "る", re: "れ", ro: "ろ",
  wa: "わ", wo: "を",
  n: "ん", nn: "ん",
  // Dakuon (Tenten)
  ga: "が", gi: "ぎ", gu: "ぐ", ge: "げ", go: "ご",
  za: "ざ", ji: "じ", zi: "じ", zu: "ず", ze: "ぜ", zo: "ぞ",
  da: "だ", dji: "ぢ", di: "ぢ", dzu: "づ", du: "づ", de: "で", do: "ど",
  ba: "ば", bi: "び", bu: "ぶ", be: "べ", bo: "ぼ",
  // Handakuon (Maru)
  pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",
};`;
  kanaCode = kanaCode.replace(/const ROMAJI_TO_HIRAGANA: Record<string, string> = \{[\s\S]*?\};/, updatedHiraMap);

  // Update ROMAJI_TO_KATAKANA
  const updatedKataMap = `const ROMAJI_TO_KATAKANA: Record<string, string> = {
  a: "ア", i: "イ", u: "ウ", e: "エ", o: "オ",
  ka: "カ", ki: "キ", ku: "ク", ke: "ケ", ko: "コ",
  sa: "サ", shi: "シ", si: "シ", su: "ス", se: "セ", so: "ソ",
  ta: "タ", chi: "チ", ti: "チ", tsu: "ツ", tu: "ツ", te: "テ", to: "ト",
  na: "ナ", ni: "ニ", nu: "ヌ", ne: "ネ", no: "ノ",
  ha: "ハ", hi: "ヒ", fu: "フ", hu: "フ", he: "ヘ", ho: "ホ",
  ma: "マ", mi: "ミ", mu: "ム", me: "メ", mo: "モ",
  ya: "ヤ", yu: "ユ", yo: "ヨ",
  ra: "ラ", ri: "リ", ru: "ル", re: "レ", ro: "ロ",
  wa: "ワ", wo: "ヲ",
  n: "ン", nn: "ン",
  // Dakuon (Tenten)
  ga: "ガ", gi: "ギ", gu: "グ", ge: "ゲ", go: "ゴ",
  za: "ザ", ji: "ジ", zi: "ジ", zu: "ズ", ze: "ゼ", zo: "ゾ",
  da: "ダ", dji: "ヂ", di: "ヂ", dzu: "ヅ", du: "ヅ", de: "デ", do: "ド",
  ba: "バ", bi: "ビ", bu: "ブ", be: "ベ", bo: "ボ",
  // Handakuon (Maru)
  pa: "パ", pi: "ピ", pu: "プ", pe: "ペ", po: "ポ",
};`;
  kanaCode = kanaCode.replace(/const ROMAJI_TO_KATAKANA: Record<string, string> = \{[\s\S]*?\};/, updatedKataMap);

  fs.writeFileSync(kanaPath, kanaCode, "utf8");
  console.log("Updated kanaData.ts successfully with Dakuon (Tenten) & Handakuon (Maru)!");
} else {
  console.log("kanaData.ts already contains DAKUON_KANA.");
}
