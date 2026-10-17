// scripts/append_yoon.js
const fs = require("fs");
const path = require("path");

const kanaPath = path.join(__dirname, "../data/kanaData.ts");
let kanaCode = fs.readFileSync(kanaPath, "utf8");

const yoonKanaCode = `
export const YOON_KANA: KanaItem[] = [
  // 1. Baris K (Kya - Kyu - Kyo)
  {
    id: "kya",
    romaji: "kya",
    hiragana: "きゃ",
    katakana: "キャ",
    row: "ky",
    rowName: "Baris Kya-Kyu-Kyo (きゃ・きゅ・きょ)",
    strokes: 7,
    strokeTips: [
      "Tulis huruf Ki (き) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "きゃく", wordKatakana: "キャク", romaji: "kyaku", meaning: "Tamu / Pengunjung" },
      { wordHiragana: "キャベツ", wordKatakana: "キャベツ", romaji: "kyabetsu", meaning: "Kol / Kubis" }
    ]
  },
  {
    id: "kyu",
    romaji: "kyu",
    hiragana: "きゅ",
    katakana: "キュ",
    row: "ky",
    rowName: "Baris Kya-Kyu-Kyo (きゃ・きゅ・きょ)",
    strokes: 6,
    strokeTips: [
      "Tulis huruf Ki (き) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "きゅうり", wordKatakana: "キュウリ", romaji: "kyuuri", meaning: "Mentimun" },
      { wordHiragana: "やきゅう", wordKatakana: "ヤキュウ", romaji: "yakyuu", meaning: "Bisbol" }
    ]
  },
  {
    id: "kyo",
    romaji: "kyo",
    hiragana: "きょ",
    katakana: "キョ",
    row: "ky",
    rowName: "Baris Kya-Kyu-Kyo (きゃ・きゅ・きょ)",
    strokes: 6,
    strokeTips: [
      "Tulis huruf Ki (き) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "きょう", wordKatakana: "キョウ", romaji: "kyou", meaning: "Hari ini" },
      { wordHiragana: "きょうしつ", wordKatakana: "キョウシツ", romaji: "kyoushitsu", meaning: "Ruang kelas" }
    ]
  },

  // 2. Baris S (Sha - Shu - Sho)
  {
    id: "sha",
    romaji: "sha",
    hiragana: "しゃ",
    katakana: "シャ",
    row: "sh",
    rowName: "Baris Sha-Shu-Sho (しゃ・しゅ・しょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Shi (し) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "しゃしん", wordKatakana: "シャシン", romaji: "shashin", meaning: "Foto" },
      { wordHiragana: "かいしゃ", wordKatakana: "カイシャ", romaji: "kaisha", meaning: "Perusahaan / Kantor" }
    ]
  },
  {
    id: "shu",
    romaji: "shu",
    hiragana: "しゅ",
    katakana: "シュ",
    row: "sh",
    rowName: "Baris Sha-Shu-Sho (しゃ・しゅ・しょ)",
    strokes: 3,
    strokeTips: [
      "Tulis huruf Shi (し) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "しゅふ", wordKatakana: "シュフ", romaji: "shufu", meaning: "Ibu rumah tangga" },
      { wordHiragana: "しゅくだい", wordKatakana: "シュクダイ", romaji: "shukudai", meaning: "Pekerjaan rumah (PR)" }
    ]
  },
  {
    id: "sho",
    romaji: "sho",
    hiragana: "しょ",
    katakana: "ショ",
    row: "sh",
    rowName: "Baris Sha-Shu-Sho (しゃ・しゅ・しょ)",
    strokes: 3,
    strokeTips: [
      "Tulis huruf Shi (し) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "じしょ", wordKatakana: "ジショ", romaji: "jisho", meaning: "Kamus" },
      { wordHiragana: "しょっき", wordKatakana: "ショッキ", romaji: "shokki", meaning: "Alat makan" }
    ]
  },

  // 3. Baris T (Cha - Chu - Cho)
  {
    id: "cha",
    romaji: "cha",
    hiragana: "ちゃ",
    katakana: "チャ",
    row: "ch",
    rowName: "Baris Cha-Chu-Cho (ちゃ・ちゅ・ちょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Chi (ち) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "おちゃ", wordKatakana: "オチャ", romaji: "ocha", meaning: "Teh hijau Jepang" },
      { wordHiragana: "あかちゃん", wordKatakana: "アカチャン", romaji: "akachan", meaning: "Bayi" }
    ]
  },
  {
    id: "chu",
    romaji: "chu",
    hiragana: "ちゅ",
    katakana: "チュ",
    row: "ch",
    rowName: "Baris Cha-Chu-Cho (ちゃ・ちゅ・ちょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Chi (ち) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ちゅうごく", wordKatakana: "チュウゴク", romaji: "chuugoku", meaning: "China / Tiongkok" },
      { wordHiragana: "ちゅうしゃじょう", wordKatakana: "チュウシャジョウ", romaji: "chuushajou", meaning: "Tempat parkir" }
    ]
  },
  {
    id: "cho",
    romaji: "cho",
    hiragana: "ちょ",
    katakana: "チョ",
    row: "ch",
    rowName: "Baris Cha-Chu-Cho (ちゃ・ちゅ・ちょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Chi (ち) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ちょっと", wordKatakana: "チョット", romaji: "chotto", meaning: "Sebentar / Sedikit" },
      { wordHiragana: "チョコレート", wordKatakana: "チョコレート", romaji: "chokoreeto", meaning: "Cokelat" }
    ]
  },

  // 4. Baris N (Nya - Nyu - Nyo)
  {
    id: "nya",
    romaji: "nya",
    hiragana: "にゃ",
    katakana: "ニャ",
    row: "ny",
    rowName: "Baris Nya-Nyu-Nyo (にゃ・にゅ・にょ)",
    strokes: 6,
    strokeTips: [
      "Tulis huruf Ni (に) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "にゃー", wordKatakana: "ニャー", romaji: "nyaa", meaning: "Suara meong kucing" },
      { wordHiragana: "こんにゃく", wordKatakana: "コンニャク", romaji: "konnyaku", meaning: "Konnyaku" }
    ]
  },
  {
    id: "nyu",
    romaji: "nyu",
    hiragana: "にゅ",
    katakana: "ニュ",
    row: "ny",
    rowName: "Baris Nya-Nyu-Nyo (にゃ・にゅ・にょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Ni (に) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ぎゅうにゅう", wordKatakana: "ギュウニュウ", romaji: "gyuunyuu", meaning: "Susu sapi" },
      { wordHiragana: "メニュー", wordKatakana: "メニュー", romaji: "menyuu", meaning: "Menu makanan" }
    ]
  },
  {
    id: "nyo",
    romaji: "nyo",
    hiragana: "にょ",
    katakana: "ニョ",
    row: "ny",
    rowName: "Baris Nya-Nyu-Nyo (にゃ・にゅ・にょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Ni (に) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "にょうぼう", wordKatakana: "ニョウボウ", romaji: "nyoubou", meaning: "Istri" },
      { wordHiragana: "にょきにょき", wordKatakana: "ニョキニョキ", romaji: "nyokinyoki", meaning: "Tumbuh bermunculan" }
    ]
  },

  // 5. Baris H (Hya - Hyu - Hyo)
  {
    id: "hya",
    romaji: "hya",
    hiragana: "ひゃ",
    katakana: "ヒャ",
    row: "hy",
    rowName: "Baris Hya-Hyu-Hyo (ひゃ・ひゅ・ひょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Hi (ひ) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ひゃく", wordKatakana: "ヒャク", romaji: "hyaku", meaning: "Seratus (100)" },
      { wordHiragana: "さんびゃく", wordKatakana: "サンビャク", romaji: "sanbyaku", meaning: "Tiga ratus (300)" }
    ]
  },
  {
    id: "hyu",
    romaji: "hyu",
    hiragana: "ひゅ",
    katakana: "ヒュ",
    row: "hy",
    rowName: "Baris Hya-Hyu-Hyo (ひゃ・ひゅ・ひょ)",
    strokes: 3,
    strokeTips: [
      "Tulis huruf Hi (ひ) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ひゅーひゅー", wordKatakana: "ヒューヒュー", romaji: "hyuuhyuu", meaning: "Suara siulan angin" },
      { wordHiragana: "ヒューズ", wordKatakana: "ヒューズ", romaji: "hyuuzu", meaning: "Sekering listrik" }
    ]
  },
  {
    id: "hyo",
    romaji: "hyo",
    hiragana: "ひょ",
    katakana: "ヒョ",
    row: "hy",
    rowName: "Baris Hya-Hyu-Hyo (ひゃ・ひゅ・ひょ)",
    strokes: 3,
    strokeTips: [
      "Tulis huruf Hi (ひ) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ひょうげん", wordKatakana: "ヒョウゲン", romaji: "hyougen", meaning: "Ungkapan / Ekspresi" },
      { wordHiragana: "ひょう", wordKatakana: "ヒョウ", romaji: "hyou", meaning: "Bagan / Tabel" }
    ]
  },

  // 6. Baris M (Mya - Myu - Myo)
  {
    id: "mya",
    romaji: "mya",
    hiragana: "みゃ",
    katakana: "ミャ",
    row: "my",
    rowName: "Baris Mya-Myu-Myo (みゃ・みゅ・みょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Mi (み) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "みゃく", wordKatakana: "ミャク", romaji: "myaku", meaning: "Denyut nadi" },
      { wordHiragana: "ミャンマー", wordKatakana: "ミャンマー", romaji: "myanmaa", meaning: "Myanmar" }
    ]
  },
  {
    id: "myu",
    romaji: "myu",
    hiragana: "みゅ",
    katakana: "ミュ",
    row: "my",
    rowName: "Baris Mya-Myu-Myo (みゃ・みゅ・みょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Mi (み) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ミュージカル", wordKatakana: "ミュージカル", romaji: "myuujikaru", meaning: "Drama musikal" },
      { wordHiragana: "ミュージック", wordKatakana: "ミュージック", romaji: "myuujikku", meaning: "Musik" }
    ]
  },
  {
    id: "myo",
    romaji: "myo",
    hiragana: "みょ",
    katakana: "ミョ",
    row: "my",
    rowName: "Baris Mya-Myu-Myo (みゃ・みゅ・みょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Mi (み) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "みょうじ", wordKatakana: "ミョウジ", romaji: "myouji", meaning: "Nama keluarga (marga)" },
      { wordHiragana: "みょうごにち", wordKatakana: "ミョウゴニチ", romaji: "myougonichi", meaning: "Lusa" }
    ]
  },

  // 7. Baris R (Rya - Ryu - Ryo)
  {
    id: "rya",
    romaji: "rya",
    hiragana: "りゃ",
    katakana: "リャ",
    row: "ry",
    rowName: "Baris Rya-Ryu-Ryo (りゃ・りゅ・りょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Ri (り) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "りゃくご", wordKatakana: "リャクゴ", romaji: "ryakugo", meaning: "Singkatan kata" },
      { wordHiragana: "りゃく", wordKatakana: "リャク", romaji: "ryaku", meaning: "Ringkasan" }
    ]
  },
  {
    id: "ryu",
    romaji: "ryu",
    hiragana: "りゅ",
    katakana: "リュ",
    row: "ry",
    rowName: "Baris Rya-Ryu-Ryo (りゃ・りゅ・りょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Ri (り) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "りゅうがくせい", wordKatakana: "リュウガクセイ", romaji: "ryuugakusei", meaning: "Mahasiswa asing" },
      { wordHiragana: "りゅう", wordKatakana: "リュウ", romaji: "ryuu", meaning: "Naga" }
    ]
  },
  {
    id: "ryo",
    romaji: "ryo",
    hiragana: "りょ",
    katakana: "リョ",
    row: "ry",
    rowName: "Baris Rya-Ryu-Ryo (りゃ・りゅ・りょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Ri (り) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "りょこう", wordKatakana: "リョコウ", romaji: "ryokou", meaning: "Wisata / Perjalanan" },
      { wordHiragana: "りょうり", wordKatakana: "リョウリ", romaji: "ryouri", meaning: "Masakan" },
      { wordHiragana: "りょうしん", wordKatakana: "リョウシン", romaji: "ryoushin", meaning: "Orang tua" }
    ]
  },

  // 8. Baris G Dakuon (Gya - Gyu - Gyo)
  {
    id: "gya",
    romaji: "gya",
    hiragana: "ぎゃ",
    katakana: "ギャ",
    row: "gy",
    rowName: "Baris Gya-Gyu-Gyo (ぎゃ・ぎゅ・ぎょ)",
    strokes: 9,
    strokeTips: [
      "Tulis huruf Gi (ぎ) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ギャラリー", wordKatakana: "ギャラリー", romaji: "gyararii", meaning: "Galeri seni" },
      { wordHiragana: "ぎゃくてん", wordKatakana: "ギャクテン", romaji: "gyakuten", meaning: "Pembalikan keadaan" }
    ]
  },
  {
    id: "gyu",
    romaji: "gyu",
    hiragana: "ぎゅ",
    katakana: "ギュ",
    row: "gy",
    rowName: "Baris Gya-Gyu-Gyo (ぎゃ・ぎゅ・ぎょ)",
    strokes: 8,
    strokeTips: [
      "Tulis huruf Gi (ぎ) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ぎゅうにく", wordKatakana: "ギュウニク", romaji: "gyuuniku", meaning: "Daging sapi" },
      { wordHiragana: "ぎゅうにゅう", wordKatakana: "ギュウニュウ", romaji: "gyuunyuu", meaning: "Susu sapi" }
    ]
  },
  {
    id: "gyo",
    romaji: "gyo",
    hiragana: "ぎょ",
    katakana: "ギョ",
    row: "gy",
    rowName: "Baris Gya-Gyu-Gyo (ぎゃ・ぎゅ・ぎょ)",
    strokes: 8,
    strokeTips: [
      "Tulis huruf Gi (ぎ) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "じゅぎょう", wordKatakana: "ジュギョウ", romaji: "jugyou", meaning: "Pelajaran / Kuliah" },
      { wordHiragana: "きんぎょ", wordKatakana: "キンギョ", romaji: "kingyo", meaning: "Ikan mas koki" }
    ]
  },

  // 9. Baris Z Dakuon (Ja - Ju - Jo)
  {
    id: "ja",
    romaji: "ja",
    hiragana: "じゃ",
    katakana: "ジャ",
    row: "j",
    rowName: "Baris Ja-Ju-Jo (じゃ・じゅ・じょ)",
    strokes: 6,
    strokeTips: [
      "Tulis huruf Ji (じ) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "じゃあね", wordKatakana: "ジャーネ", romaji: "jaa ne", meaning: "Sampai jumpa" },
      { wordHiragana: "じゃがいも", wordKatakana: "ジャガイモ", romaji: "jagaimo", meaning: "Kentang" },
      { wordHiragana: "ジャム", wordKatakana: "ジャム", romaji: "jamu", meaning: "Selai" }
    ]
  },
  {
    id: "ju",
    romaji: "ju",
    hiragana: "じゅ",
    katakana: "ジュ",
    row: "j",
    rowName: "Baris Ja-Ju-Jo (じゃ・じゅ・じょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Ji (じ) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ジュース", wordKatakana: "ジュース", romaji: "juusu", meaning: "Jus" },
      { wordHiragana: "じゅう", wordKatakana: "ジュウ", romaji: "juu", meaning: "Sepuluh (10)" },
      { wordHiragana: "じゅぎょう", wordKatakana: "ジュギョウ", romaji: "jugyou", meaning: "Kelas / Kuliah" }
    ]
  },
  {
    id: "jo",
    romaji: "jo",
    hiragana: "じょ",
    katakana: "ジョ",
    row: "j",
    rowName: "Baris Ja-Ju-Jo (じゃ・じゅ・じょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Ji (じ) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "かのじょ", wordKatakana: "カノジョ", romaji: "kanojo", meaning: "Dia (perempuan)" },
      { wordHiragana: "じょせい", wordKatakana: "ジョセイ", romaji: "josei", meaning: "Wanita" }
    ]
  },

  // 10. Baris B Dakuon (Bya - Byu - Byo)
  {
    id: "bya",
    romaji: "bya",
    hiragana: "びゃ",
    katakana: "ビャ",
    row: "by",
    rowName: "Baris Bya-Byu-Byo (びゃ・びゅ・びょ)",
    strokes: 6,
    strokeTips: [
      "Tulis huruf Bi (び) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "さんびゃく", wordKatakana: "サンビャク", romaji: "sanbyaku", meaning: "Tiga ratus (300)" },
      { wordHiragana: "びゃっこ", wordKatakana: "ビャッコ", romaji: "byakko", meaning: "Harimau putih" }
    ]
  },
  {
    id: "byu",
    romaji: "byu",
    hiragana: "びゅ",
    katakana: "ビュ",
    row: "by",
    rowName: "Baris Bya-Byu-Byo (びゃ・びゅ・びょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Bi (び) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ビュッフェ", wordKatakana: "ビュッフェ", romaji: "byuffe", meaning: "Prasmanan / Buffet" },
      { wordHiragana: "インタビュー", wordKatakana: "インタビュー", romaji: "intabyuu", meaning: "Wawancara" }
    ]
  },
  {
    id: "byo",
    romaji: "byo",
    hiragana: "びょ",
    katakana: "ビョ",
    row: "by",
    rowName: "Baris Bya-Byu-Byo (びゃ・びゅ・びょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Bi (び) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "びょういん", wordKatakana: "ビョウイン", romaji: "byooin", meaning: "Rumah sakit" },
      { wordHiragana: "びょうき", wordKatakana: "ビョウキ", romaji: "byouki", meaning: "Sakit / Penyakit" }
    ]
  },

  // 11. Baris P Handakuon (Pya - Pyu - Pyo)
  {
    id: "pya",
    romaji: "pya",
    hiragana: "ぴゃ",
    katakana: "ピャ",
    row: "py",
    rowName: "Baris Pya-Pyu-Pyo (ぴゃ・ぴゅ・ぴょ)",
    strokes: 5,
    strokeTips: [
      "Tulis huruf Pi (ぴ) ukuran normal.",
      "Tulis huruf Ya kecil (ゃ / ャ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "ろっぴゃく", wordKatakana: "ロッピャク", romaji: "roppyaku", meaning: "Enam ratus (600)" },
      { wordHiragana: "はっぴゃく", wordKatakana: "ハッピャク", romaji: "happyaku", meaning: "Delapan ratus (800)" }
    ]
  },
  {
    id: "pyu",
    romaji: "pyu",
    hiragana: "ぴゅ",
    katakana: "ピュ",
    row: "py",
    rowName: "Baris Pya-Pyu-Pyo (ぴゃ・ぴゅ・ぴょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Pi (ぴ) ukuran normal.",
      "Tulis huruf Yu kecil (ゅ / ュ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "コンピューター", wordKatakana: "コンピューター", romaji: "konpyuutaa", meaning: "Komputer" },
      { wordHiragana: "ピューレ", wordKatakana: "ピューレ", romaji: "pyuure", meaning: "Bubur buah / Puree" }
    ]
  },
  {
    id: "pyo",
    romaji: "pyo",
    hiragana: "ぴょ",
    katakana: "ピョ",
    row: "py",
    rowName: "Baris Pya-Pyu-Pyo (ぴゃ・ぴゅ・ぴょ)",
    strokes: 4,
    strokeTips: [
      "Tulis huruf Pi (ぴ) ukuran normal.",
      "Tulis huruf Yo kecil (ょ / ョ) di sisi kanan bawah."
    ],
    examples: [
      { wordHiragana: "はっぴょう", wordKatakana: "ハッピョウ", romaji: "happyou", meaning: "Presentasi / Pengumuman" },
      { wordHiragana: "ピョコピョコ", wordKatakana: "ピョコピョコ", romaji: "pyokopyoko", meaning: "Melompat-lompat kecil" }
    ]
  }
];
`;

if (!kanaCode.includes("export const YOON_KANA")) {
  // Insert YOON_KANA right after HANDAKUON_KANA
  const handakuonIndex = kanaCode.indexOf("export const BASIC_KANA: KanaItem[] = [...GOJUON_KANA, ...DAKUON_KANA, ...HANDAKUON_KANA];");
  if (handakuonIndex !== -1) {
    const before = kanaCode.slice(0, handakuonIndex);
    const after = kanaCode.slice(handakuonIndex + "export const BASIC_KANA: KanaItem[] = [...GOJUON_KANA, ...DAKUON_KANA, ...HANDAKUON_KANA];".length);
    kanaCode = before + yoonKanaCode + "\nexport const BASIC_KANA: KanaItem[] = [...GOJUON_KANA, ...DAKUON_KANA, ...HANDAKUON_KANA, ...YOON_KANA];" + after;
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

  // Yōon (Kombinasi 3 Huruf / Digraphs)
  { key: "ky", name: "Baris Kya-Kyu-Kyo (きゃ・きゅ・きょ)", group: "yoon" },
  { key: "sh", name: "Baris Sha-Shu-Sho (しゃ・しゅ・しょ)", group: "yoon" },
  { key: "ch", name: "Baris Cha-Chu-Cho (ちゃ・ちゅ・ちょ)", group: "yoon" },
  { key: "ny", name: "Baris Nya-Nyu-Nyo (にゃ・にゅ・にょ)", group: "yoon" },
  { key: "hy", name: "Baris Hya-Hyu-Hyo (ひゃ・ひゅ・ひょ)", group: "yoon" },
  { key: "my", name: "Baris Mya-Myu-Myo (みゃ・みゅ・みょ)", group: "yoon" },
  { key: "ry", name: "Baris Rya-Ryu-Ryo (りゃ・りゅ・りょ)", group: "yoon" },
  { key: "gy", name: "Baris Gya-Gyu-Gyo (ぎゃ・ぎゅ・ぎょ)", group: "yoon" },
  { key: "j", name: "Baris Ja-Ju-Jo (じゃ・じゅ・じょ)", group: "yoon" },
  { key: "by", name: "Baris Bya-Byu-Byo (びゃ・びゅ・びょ)", group: "yoon" },
  { key: "py", name: "Baris Pya-Pyu-Pyo (ぴゃ・ぴゅ・ぴょ)", group: "yoon" },
];`;

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
    // Yōon variations
    "sya": "sha", "syu": "shu", "syo": "sho",
    "tya": "cha", "tyu": "chu", "tyo": "cho",
    "cya": "cha", "cyu": "chu", "cyo": "cho",
    "jya": "ja", "jyu": "ju", "jyo": "jo",
    "zya": "ja", "zyu": "ju", "zyo": "jo",
  };
  return map[clean] || clean;
}`;
  kanaCode = kanaCode.replace(/\/\/ Normalizer for romaji variations[\s\S]*?return map\[clean\] \|\| clean;\s*\}/, updatedNormalize);

  // Update ROMAJI_TO_HIRAGANA
  const yoonHiraEntries = `  // Yōon (Kombinasi 3 Huruf)
  kya: "きゃ", kyu: "きゅ", kyo: "きょ",
  sha: "しゃ", shu: "しゅ", sho: "しょ", sya: "しゃ", syu: "しゅ", syo: "しょ",
  cha: "ちゃ", chu: "ちゅ", cho: "ちょ", tya: "ちゃ", tyu: "ちゅ", tyo: "ちょ",
  nya: "にゃ", nyu: "にゅ", nyo: "にょ",
  hya: "ひゃ", hyu: "ひゅ", hyo: "ひょ",
  mya: "みゃ", myu: "みゅ", myo: "みょ",
  rya: "りゃ", ryu: "りゅ", ryo: "りょ",
  gya: "ぎゃ", gyu: "ぎゅ", gyo: "ぎょ",
  ja: "じゃ", ju: "じゅ", jo: "じょ", jya: "じゃ", jyu: "じゅ", jyo: "じょ", zya: "じゃ", zyu: "じゅ", zyo: "じょ",
  bya: "びゃ", byu: "びゅ", byo: "びょ",
  pya: "ぴゃ", pyu: "ぴゅ", pyo: "ぴょ",
};`;
  kanaCode = kanaCode.replace(/pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",\s*\};/, 'pa: "ぱ", pi: "ぴ", pu: "ぷ", pe: "ぺ", po: "ぽ",\n' + yoonHiraEntries);

  // Update ROMAJI_TO_KATAKANA
  const yoonKataEntries = `  // Yōon (Kombinasi 3 Huruf)
  kya: "キャ", kyu: "キュ", kyo: "キョ",
  sha: "シャ", shu: "シュ", sho: "ショ", sya: "シャ", syu: "シュ", syo: "ショ",
  cha: "チャ", chu: "チュ", cho: "チョ", tya: "チャ", tyu: "チュ", tyo: "チョ",
  nya: "ニャ", nyu: "ニュ", nyo: "ニョ",
  hya: "ヒャ", hyu: "ヒュ", hyo: "ヒョ",
  mya: "ミャ", myu: "ミュ", myo: "ミョ",
  rya: "リャ", ryu: "リュ", ryo: "リョ",
  gya: "ギャ", gyu: "ギュ", gyo: "ギョ",
  ja: "ジャ", ju: "ジュ", jo: "ジョ", jya: "ジャ", jyu: "ジュ", jyo: "ジョ", zya: "ジャ", zyu: "ジュ", zyo: "ジョ",
  bya: "ビャ", byu: "ビュ", byo: "ビョ",
  pya: "ピャ", pyu: "ピュ", pyo: "ピョ",
};`;
  kanaCode = kanaCode.replace(/pa: "パ", pi: "ピ", pu: "プ", pe: "ペ", po: "ポ",\s*\};/, 'pa: "パ", pi: "ピ", pu: "プ", pe: "ペ", po: "ポ",\n' + yoonKataEntries);

  fs.writeFileSync(kanaPath, kanaCode, "utf8");
  console.log("Successfully added YOON_KANA to kanaData.ts!");
} else {
  console.log("YOON_KANA is already present in kanaData.ts.");
}
