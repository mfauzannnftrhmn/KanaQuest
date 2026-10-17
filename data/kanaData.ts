export interface KanaItem {
  id: string;
  romaji: string;
  hiragana: string;
  katakana: string;
  row: string; // 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'n'
  rowName: string;
  strokes: number;
  strokeTips: string[];
  examples: {
    wordHiragana: string;
    wordKatakana: string;
    romaji: string;
    meaning: string;
  }[];
}

export const BASIC_KANA: KanaItem[] = [
  // Vowel (A-I-U-E-O)
  {
    id: "a",
    romaji: "a",
    hiragana: "あ",
    katakana: "ア",
    row: "vowel",
    rowName: "Baris Vokal (A)",
    strokes: 3,
    strokeTips: [
      "Tarik garis horizontal dari kiri ke kanan.",
      "Tarik garis vertikal sedikit melengkung memotong di tengah.",
      "Mulai loop memutar searah jarum jam dari sisi kiri ke bawah dan naik kembali."
    ],
    examples: [
      { wordHiragana: "あめ", wordKatakana: "アメ", romaji: "ame", meaning: "Hujan / Permen" },
      { wordHiragana: "あさ", wordKatakana: "アサ", romaji: "asa", meaning: "Pagi hari" }
    ]
  },
  {
    id: "i",
    romaji: "i",
    hiragana: "い",
    katakana: "イ",
    row: "vowel",
    rowName: "Baris Vokal (A)",
    strokes: 2,
    strokeTips: [
      "Tarik garis kiri melengkung sedikit ke bawah dengan kait kecil ke atas di ujungnya.",
      "Tarik garis kanan lebih pendek melengkung ke dalam."
    ],
    examples: [
      { wordHiragana: "いぬ", wordKatakana: "イヌ", romaji: "inu", meaning: "Anjing" },
      { wordHiragana: "いえ", wordKatakana: "イエ", romaji: "ie", meaning: "Rumah" }
    ]
  },
  {
    id: "u",
    romaji: "u",
    hiragana: "う",
    katakana: "ウ",
    row: "vowel",
    rowName: "Baris Vokal (A)",
    strokes: 2,
    strokeTips: [
      "Garis pendek miring di bagian atas tengah.",
      "Lengkungan besar membuka ke kiri di bagian bawah."
    ],
    examples: [
      { wordHiragana: "うみ", wordKatakana: "ウミ", romaji: "umi", meaning: "Laut" },
      { wordHiragana: "うし", wordKatakana: "ウシ", romaji: "ushi", meaning: "Sapi" }
    ]
  },
  {
    id: "e",
    romaji: "e",
    hiragana: "え",
    katakana: "エ",
    row: "vowel",
    rowName: "Baris Vokal (A)",
    strokes: 2,
    strokeTips: [
      "Garis pendek miring di bagian atas.",
      "Mulai garis zig-zag mirip angka 7 lalu meliuk ke bawah dengan gelombang lembut."
    ],
    examples: [
      { wordHiragana: "えき", wordKatakana: "エキ", romaji: "eki", meaning: "Stasiun" },
      { wordHiragana: "えんぴつ", wordKatakana: "エンピツ", romaji: "enpitsu", meaning: "Pensil" }
    ]
  },
  {
    id: "o",
    romaji: "o",
    hiragana: "お",
    katakana: "オ",
    row: "vowel",
    rowName: "Baris Vokal (A)",
    strokes: 3,
    strokeTips: [
      "Garis horizontal pendek dari kiri ke kanan.",
      "Tarik vertikal ke bawah lalu putar loop ke kiri dan bawah meliuk ke kanan.",
      "Beri titik kecil miring di kanan atas."
    ],
    examples: [
      { wordHiragana: "おちゃ", wordKatakana: "オチャ", romaji: "ocha", meaning: "Teh hijau" },
      { wordHiragana: "おにぎり", wordKatakana: "オニギリ", romaji: "onigiri", meaning: "Nasi kepal" }
    ]
  },

  // K Row (Ka-Ki-Ku-Ke-Ko)
  {
    id: "ka",
    romaji: "ka",
    hiragana: "か",
    katakana: "カ",
    row: "k",
    rowName: "Baris K (Ka)",
    strokes: 3,
    strokeTips: [
      "Garis mendatar lalu tekuk ke bawah dengan kait di ujung.",
      "Garis tegak sedikit melengkung melintasi bagian kiri.",
      "Titik/coretan pendek di sebelah kanan atas."
    ],
    examples: [
      { wordHiragana: "かさ", wordKatakana: "カサ", romaji: "kasa", meaning: "Payung" },
      { wordHiragana: "かわ", wordKatakana: "カワ", romaji: "kawa", meaning: "Sungai" }
    ]
  },
  {
    id: "ki",
    romaji: "ki",
    hiragana: "き",
    katakana: "キ",
    row: "k",
    rowName: "Baris K (Ka)",
    strokes: 4,
    strokeTips: [
      "Garis horizontal atas agak miring ke atas.",
      "Garis horizontal bawah sejajar lebih panjang sedikit.",
      "Garis diagonal melintang dari atas ke bawah kanan.",
      "Lengkungan bawah seperti mangkuk terbuka ke kiri."
    ],
    examples: [
      { wordHiragana: "き", wordKatakana: "キ", romaji: "ki", meaning: "Pohon" },
      { wordHiragana: "きつね", wordKatakana: "キツネ", romaji: "kitsune", meaning: "Rubah" }
    ]
  },
  {
    id: "ku",
    romaji: "ku",
    hiragana: "く",
    katakana: "ク",
    row: "k",
    rowName: "Baris K (Ka)",
    strokes: 1,
    strokeTips: [
      "Satu tarikan garis membentuk sudut lancip mirip tanda kurung '<' atau paruh burung."
    ],
    examples: [
      { wordHiragana: "くるま", wordKatakana: "クルマ", romaji: "kuruma", meaning: "Mobil" },
      { wordHiragana: "くも", wordKatakana: "クモ", romaji: "kumo", meaning: "Awan / Laba-laba" }
    ]
  },
  {
    id: "ke",
    romaji: "ke",
    hiragana: "け",
    katakana: "ケ",
    row: "k",
    rowName: "Baris K (Ka)",
    strokes: 3,
    strokeTips: [
      "Garis vertikal kiri sedikit melengkung dengan kaitan kecil.",
      "Garis horizontal pendek di kanan atas.",
      "Garis vertikal kanan melengkung memotong garis horizontal."
    ],
    examples: [
      { wordHiragana: "けさ", wordKatakana: "ケサ", romaji: "kesa", meaning: "Pagi ini" },
      { wordHiragana: "けむし", wordKatakana: "ケムシ", romaji: "kemushi", meaning: "Ulat bulu" }
    ]
  },
  {
    id: "ko",
    romaji: "ko",
    hiragana: "こ",
    katakana: "コ",
    row: "k",
    rowName: "Baris K (Ka)",
    strokes: 2,
    strokeTips: [
      "Garis horizontal atas melengkung lembut ke bawah.",
      "Garis horizontal bawah melengkung lembut ke atas (seperti dua bibir)."
    ],
    examples: [
      { wordHiragana: "こども", wordKatakana: "コドモ", romaji: "kodomo", meaning: "Anak-anak" },
      { wordHiragana: "こころ", wordKatakana: "ココロ", romaji: "kokoro", meaning: "Hati / Jiwa" }
    ]
  },

  // S Row (Sa-Shi-Su-Se-So)
  {
    id: "sa",
    romaji: "sa",
    hiragana: "さ",
    katakana: "サ",
    row: "s",
    rowName: "Baris S (Sa)",
    strokes: 3,
    strokeTips: [
      "Garis horizontal agak miring ke atas.",
      "Garis diagonal melintang dari kiri atas memotong garis pertama.",
      "Lengkungan bawah terbuka ke kiri (kebalikan dari ち)."
    ],
    examples: [
      { wordHiragana: "さくら", wordKatakana: "サクラ", romaji: "sakura", meaning: "Bunga sakura" },
      { wordHiragana: "さかな", wordKatakana: "サカナ", romaji: "sakana", meaning: "Ikan" }
    ]
  },
  {
    id: "shi",
    romaji: "shi",
    hiragana: "し",
    katakana: "シ",
    row: "s",
    rowName: "Baris S (Sa)",
    strokes: 1,
    strokeTips: [
      "Satu tarikan garis vertikal lurus ke bawah lalu melengkung ke atas kanan seperti mata pancing."
    ],
    examples: [
      { wordHiragana: "しま", wordKatakana: "シマ", romaji: "shima", meaning: "Pulau" },
      { wordHiragana: "しろ", wordKatakana: "シロ", romaji: "shiro", meaning: "Putih" }
    ]
  },
  {
    id: "su",
    romaji: "su",
    hiragana: "す",
    katakana: "ス",
    row: "s",
    rowName: "Baris S (Sa)",
    strokes: 2,
    strokeTips: [
      "Garis horizontal panjang dari kiri ke kanan.",
      "Garis vertikal turun memotong, membuat loop kecil memutar di tengah, lalu menjuntai lurus ke bawah."
    ],
    examples: [
      { wordHiragana: "すし", wordKatakana: "スシ", romaji: "sushi", meaning: "Sushi" },
      { wordHiragana: "すずめ", wordKatakana: "スズメ", romaji: "suzume", meaning: "Burung gereja" }
    ]
  },
  {
    id: "se",
    romaji: "se",
    hiragana: "せ",
    katakana: "セ",
    row: "s",
    rowName: "Baris S (Sa)",
    strokes: 3,
    strokeTips: [
      "Garis horizontal panjang.",
      "Garis vertikal kanan ditarik turun dan dibelokkan mendatar ke kiri.",
      "Garis vertikal kiri lurus memotong ke bawah."
    ],
    examples: [
      { wordHiragana: "せんせい", wordKatakana: "センセイ", romaji: "sensei", meaning: "Guru" },
      { wordHiragana: "せかい", wordKatakana: "セカイ", romaji: "sekai", meaning: "Dunia" }
    ]
  },
  {
    id: "so",
    romaji: "so",
    hiragana: "そ",
    katakana: "ソ",
    row: "s",
    rowName: "Baris S (Sa)",
    strokes: 1,
    strokeTips: [
      "Satu tarikan bersambung: garis mendatar pendek, diagonal ke kiri bawah, mendatar ke kanan lagi, lalu melengkung besar ke bawah mirip huruf 'C'."
    ],
    examples: [
      { wordHiragana: "そら", wordKatakana: "ソラ", romaji: "sora", meaning: "Langit" },
      { wordHiragana: "そば", wordKatakana: "ソバ", romaji: "soba", meaning: "Mi soba / Dekat" }
    ]
  },

  // T Row (Ta-Chi-Tsu-Te-To)
  {
    id: "ta",
    romaji: "ta",
    hiragana: "た",
    katakana: "タ",
    row: "t",
    rowName: "Baris T (Ta)",
    strokes: 4,
    strokeTips: [
      "Garis horizontal pendek.",
      "Garis diagonal miring memotong garis pertama.",
      "Dua garis pendek mirip huruf 'こ' di sebelah kanan."
    ],
    examples: [
      { wordHiragana: "たこ", wordKatakana: "タコ", romaji: "tako", meaning: "Gurita" },
      { wordHiragana: "たまご", wordKatakana: "タマゴ", romaji: "tamago", meaning: "Telur" }
    ]
  },
  {
    id: "chi",
    romaji: "chi",
    hiragana: "ち",
    katakana: "チ",
    row: "t",
    rowName: "Baris T (Ta)",
    strokes: 2,
    strokeTips: [
      "Garis horizontal mendatar sedikit miring ke atas.",
      "Tarik garis dari atas kiri memotong ke bawah tengah lalu buat lengkungan bulat besar ke kanan mirip angka '5'."
    ],
    examples: [
      { wordHiragana: "ちず", wordKatakana: "チズ", romaji: "chizu", meaning: "Peta" },
      { wordHiragana: "ちから", wordKatakana: "チカラ", romaji: "chikara", meaning: "Kekuatan" }
    ]
  },
  {
    id: "tsu",
    romaji: "tsu",
    hiragana: "つ",
    katakana: "ツ",
    row: "t",
    rowName: "Baris T (Ta)",
    strokes: 1,
    strokeTips: [
      "Satu tarikan melengkung besar menyerupai ombak laut atau bulan sabit."
    ],
    examples: [
      { wordHiragana: "つき", wordKatakana: "ツキ", romaji: "tsuki", meaning: "Bulan" },
      { wordHiragana: "つくえ", wordKatakana: "ツクエ", romaji: "tsukue", meaning: "Meja" }
    ]
  },
  {
    id: "te",
    romaji: "te",
    hiragana: "て",
    katakana: "テ",
    row: "t",
    rowName: "Baris T (Ta)",
    strokes: 1,
    strokeTips: [
      "Tarik garis horizontal dari kiri ke kanan lalu belokkan melengkung halus ke kiri bawah."
    ],
    examples: [
      { wordHiragana: "て", wordKatakana: "テ", romaji: "te", meaning: "Tangan" },
      { wordHiragana: "てんき", wordKatakana: "テンキ", romaji: "tenki", meaning: "Cuaca" }
    ]
  },
  {
    id: "to",
    romaji: "to",
    hiragana: "と",
    katakana: "ト",
    row: "t",
    rowName: "Baris T (Ta)",
    strokes: 2,
    strokeTips: [
      "Garis pendek miring vertikal di kiri atas.",
      "Lengkungan terbuka ke kiri seperti huruf 'C' yang menyentuh ujung garis pertama."
    ],
    examples: [
      { wordHiragana: "とり", wordKatakana: "トリ", romaji: "tori", meaning: "Burung" },
      { wordHiragana: "ともだち", wordKatakana: "トモダチ", romaji: "tomodachi", meaning: "Teman" }
    ]
  },

  // N Row (Na-Ni-Nu-Ne-No)
  {
    id: "na",
    romaji: "na",
    hiragana: "な",
    katakana: "ナ",
    row: "n",
    rowName: "Baris N (Na)",
    strokes: 4,
    strokeTips: [
      "Garis mendatar pendek.",
      "Garis diagonal melintang ke kiri bawah.",
      "Titik kecil di kanan atas.",
      "Garis vertikal melengkung dengan loop kecil di kanan bawah."
    ],
    examples: [
      { wordHiragana: "なつ", wordKatakana: "ナツ", romaji: "natsu", meaning: "Musim panas" },
      { wordHiragana: "なまえ", wordKatakana: "ナマエ", romaji: "namae", meaning: "Nama" }
    ]
  },
  {
    id: "ni",
    romaji: "ni",
    hiragana: "に",
    katakana: "ニ",
    row: "n",
    rowName: "Baris N (Na)",
    strokes: 3,
    strokeTips: [
      "Garis vertikal kiri melengkung sedikit dengan kaitan.",
      "Garis horizontal atas di kanan.",
      "Garis horizontal bawah di kanan (bagian kanan mirip karakter こ)."
    ],
    examples: [
      { wordHiragana: "にく", wordKatakana: "ニク", romaji: "niku", meaning: "Daging" },
      { wordHiragana: "にほん", wordKatakana: "ニホン", romaji: "nihon", meaning: "Jepang" }
    ]
  },
  {
    id: "nu",
    romaji: "nu",
    hiragana: "ぬ",
    katakana: "ヌ",
    row: "n",
    rowName: "Baris N (Na)",
    strokes: 2,
    strokeTips: [
      "Garis miring dari kiri atas ke kanan bawah.",
      "Mulai dari kanan atas, melingkar ke bawah lalu buat simpul loop kecil di ujung kanan bawah."
    ],
    examples: [
      { wordHiragana: "ぬいぐるみ", wordKatakana: "ヌイグルミ", romaji: "nuigurumi", meaning: "Boneka" },
      { wordHiragana: "ぬま", wordKatakana: "ヌマ", romaji: "numa", meaning: "Rawa" }
    ]
  },
  {
    id: "ne",
    romaji: "ne",
    hiragana: "ね",
    katakana: "ネ",
    row: "n",
    rowName: "Baris N (Na)",
    strokes: 2,
    strokeTips: [
      "Garis vertikal lurus di sisi kiri.",
      "Tarik garis horizontal, serong ke kiri bawah, naik lengkung ke kanan atas lalu loop kecil di ujung."
    ],
    examples: [
      { wordHiragana: "ねこ", wordKatakana: "ネコ", romaji: "neko", meaning: "Kucing" },
      { wordHiragana: "ねつ", wordKatakana: "ネツ", romaji: "netsu", meaning: "Demam / Panas" }
    ]
  },
  {
    id: "no",
    romaji: "no",
    hiragana: "の",
    katakana: "ノ",
    row: "n",
    rowName: "Baris N (Na)",
    strokes: 1,
    strokeTips: [
      "Satu tarikan garis spiral melengkung mirip tanda larangan atau cangkang keong."
    ],
    examples: [
      { wordHiragana: "のみもの", wordKatakana: "ノミモノ", romaji: "nomimono", meaning: "Minuman" },
      { wordHiragana: "のり", wordKatakana: "ノリ", romaji: "nori", meaning: "Rumput laut" }
    ]
  },

  // H Row (Ha-Hi-Fu-He-Ho)
  {
    id: "ha",
    romaji: "ha",
    hiragana: "は",
    katakana: "ハ",
    row: "h",
    rowName: "Baris H (Ha)",
    strokes: 3,
    strokeTips: [
      "Garis vertikal kiri dengan kaitan di bawah.",
      "Garis horizontal pendek di kanan.",
      "Garis vertikal kanan memotong lalu memutar loop ke kiri dan menutup."
    ],
    examples: [
      { wordHiragana: "はな", wordKatakana: "ハナ", romaji: "hana", meaning: "Bunga / Hidung" },
      { wordHiragana: "はる", wordKatakana: "ハル", romaji: "haru", meaning: "Musim semi" }
    ]
  },
  {
    id: "hi",
    romaji: "hi",
    hiragana: "ひ",
    katakana: "ヒ",
    row: "h",
    rowName: "Baris H (Ha)",
    strokes: 1,
    strokeTips: [
      "Garis mendatar ke kanan, turun melengkung ke bawah membentuk mangkuk bulat, lalu naik ke kanan atas dan turun lagi."
    ],
    examples: [
      { wordHiragana: "ひかり", wordKatakana: "ヒカリ", romaji: "hikari", meaning: "Cahaya" },
      { wordHiragana: "ひと", wordKatakana: "ヒト", romaji: "hito", meaning: "Orang" }
    ]
  },
  {
    id: "fu",
    romaji: "fu",
    hiragana: "ふ",
    katakana: "フ",
    row: "h",
    rowName: "Baris H (Ha)",
    strokes: 4,
    strokeTips: [
      "Titik/coretan pendek di bagian atas tengah.",
      "Lengkungan tengah mirip paruh burung meliuk ke kiri bawah.",
      "Titik lengkung di sisi kiri.",
      "Titik lengkung di sisi kanan."
    ],
    examples: [
      { wordHiragana: "ふね", wordKatakana: "フネ", romaji: "fune", meaning: "Kapal" },
      { wordHiragana: "ふゆ", wordKatakana: "フユ", romaji: "fuyu", meaning: "Musim dingin" }
    ]
  },
  {
    id: "he",
    romaji: "he",
    hiragana: "へ",
    katakana: "ヘ",
    row: "h",
    rowName: "Baris H (Ha)",
    strokes: 1,
    strokeTips: [
      "Satu tarikan garis naik miring lalu meluncur turun lebih panjang membentuk gunung/atap."
    ],
    examples: [
      { wordHiragana: "へや", wordKatakana: "ヘヤ", romaji: "heya", meaning: "Kamar" },
      { wordHiragana: "へび", wordKatakana: "ヘビ", romaji: "hebi", meaning: "Ular" }
    ]
  },
  {
    id: "ho",
    romaji: "ho",
    hiragana: "ほ",
    katakana: "ホ",
    row: "h",
    rowName: "Baris H (Ha)",
    strokes: 4,
    strokeTips: [
      "Garis vertikal kiri.",
      "Garis horizontal atas di kanan.",
      "Garis horizontal bawah di kanan.",
      "Garis vertikal melintang memotong garis kedua lalu berputar loop di bawah (garis atas tidak ditembus)."
    ],
    examples: [
      { wordHiragana: "ほし", wordKatakana: "ホシ", romaji: "hoshi", meaning: "Bintang" },
      { wordHiragana: "ほん", wordKatakana: "ホン", romaji: "hon", meaning: "Buku" }
    ]
  },

  // M Row (Ma-Mi-Mu-Me-Mo)
  {
    id: "ma",
    romaji: "ma",
    hiragana: "ま",
    katakana: "マ",
    row: "m",
    rowName: "Baris M (Ma)",
    strokes: 3,
    strokeTips: [
      "Garis horizontal atas.",
      "Garis horizontal bawah yang sedikit lebih pendek.",
      "Garis vertikal memotong kedua garis horizontal lalu berputar membuat loop di bawah."
    ],
    examples: [
      { wordHiragana: "まち", wordKatakana: "マチ", romaji: "machi", meaning: "Kota" },
      { wordHiragana: "まど", wordKatakana: "マド", romaji: "mado", meaning: "Jendela" }
    ]
  },
  {
    id: "mi",
    romaji: "mi",
    hiragana: "み",
    katakana: "ミ",
    row: "m",
    rowName: "Baris M (Ma)",
    strokes: 2,
    strokeTips: [
      "Tarik horizontal membelok ke kiri bawah, loop memutar ke kanan dan mendatar.",
      "Garis vertikal melengkung memotong di sisi kanan."
    ],
    examples: [
      { wordHiragana: "みず", wordKatakana: "ミズ", romaji: "mizu", meaning: "Air" },
      { wordHiragana: "みち", wordKatakana: "ミチ", romaji: "michi", meaning: "Jalan" }
    ]
  },
  {
    id: "mu",
    romaji: "mu",
    hiragana: "む",
    katakana: "ム",
    row: "m",
    rowName: "Baris M (Ma)",
    strokes: 3,
    strokeTips: [
      "Garis mendatar pendek.",
      "Garis vertikal turun memotong, membuat loop ke kiri, melengkung ke kanan atas.",
      "Titik kecil di kanan atas."
    ],
    examples: [
      { wordHiragana: "むし", wordKatakana: "ムシ", romaji: "mushi", meaning: "Serangga" },
      { wordHiragana: "むら", wordKatakana: "ムラ", romaji: "mura", meaning: "Desa" }
    ]
  },
  {
    id: "me",
    romaji: "me",
    hiragana: "め",
    katakana: "メ",
    row: "m",
    rowName: "Baris M (Ma)",
    strokes: 2,
    strokeTips: [
      "Garis miring dari kiri atas ke kanan bawah.",
      "Lengkungan besar melingkari garis pertama menyerupai mi/ramen (tanpa loop akhir)."
    ],
    examples: [
      { wordHiragana: "め", wordKatakana: "メ", romaji: "me", meaning: "Mata" },
      { wordHiragana: "めがね", wordKatakana: "メガネ", romaji: "megane", meaning: "Kacamata" }
    ]
  },
  {
    id: "mo",
    romaji: "mo",
    hiragana: "mo",
    katakana: "モ",
    row: "m",
    rowName: "Baris M (Ma)",
    strokes: 3,
    strokeTips: [
      "Garis vertikal melengkung mirip pancingan seperti し.",
      "Dua garis horizontal melintang memotong pancingan."
    ],
    examples: [
      { wordHiragana: "もり", wordKatakana: "モリ", romaji: "mori", meaning: "Hutan" },
      { wordHiragana: "もも", wordKatakana: "モモ", romaji: "momo", meaning: "Buah persik" }
    ]
  },

  // Y Row (Ya-Yu-Yo)
  {
    id: "ya",
    romaji: "ya",
    hiragana: "や",
    katakana: "ヤ",
    row: "y",
    rowName: "Baris Y (Ya)",
    strokes: 3,
    strokeTips: [
      "Lengkungan mendatar lalu memutar turun ke kiri bawah.",
      "Coretan kecil di kanan atas.",
      "Garis lurus miring memotong dari atas ke bawah kiri."
    ],
    examples: [
      { wordHiragana: "やま", wordKatakana: "ヤマ", romaji: "yama", meaning: "Gunung" },
      { wordHiragana: "やすみ", wordKatakana: "ヤスミ", romaji: "yasumi", meaning: "Libur / Istirahat" }
    ]
  },
  {
    id: "yu",
    romaji: "yu",
    hiragana: "ゆ",
    katakana: "ユ",
    row: "y",
    rowName: "Baris Y (Ya)",
    strokes: 2,
    strokeTips: [
      "Tarik garis vertikal belok ke kanan membentuk mangkuk lalu naik.",
      "Garis vertikal lurus melintasi memotong di tengah kanan."
    ],
    examples: [
      { wordHiragana: "ゆき", wordKatakana: "ユキ", romaji: "yuki", meaning: "Salju" },
      { wordHiragana: "ゆめ", wordKatakana: "ユメ", romaji: "yume", meaning: "Mimpi" }
    ]
  },
  {
    id: "yo",
    romaji: "yo",
    hiragana: "よ",
    katakana: "ヨ",
    row: "y",
    rowName: "Baris Y (Ya)",
    strokes: 2,
    strokeTips: [
      "Garis mendatar pendek di kiri atas.",
      "Garis vertikal melintas turun, memutar membuat loop ke kiri lalu mendatar ke kanan."
    ],
    examples: [
      { wordHiragana: "よる", wordKatakana: "ヨル", romaji: "yoru", meaning: "Malam hari" },
      { wordHiragana: "よい", wordKatakana: "ヨイ", romaji: "yoi", meaning: "Bagus / Baik" }
    ]
  },

  // R Row (Ra-Ri-Ru-Re-Ro)
  {
    id: "ra",
    romaji: "ra",
    hiragana: "ら",
    katakana: "ラ",
    row: "r",
    rowName: "Baris R (Ra)",
    strokes: 2,
    strokeTips: [
      "Garis pendek miring di atas.",
      "Lengkungan besar di bawah mirip angka 5 bulat tanpa topi."
    ],
    examples: [
      { wordHiragana: "らいおん", wordKatakana: "ライオン", romaji: "raion", meaning: "Singa" },
      { wordHiragana: "らいねん", wordKatakana: "ライネン", romaji: "rainen", meaning: "Tahun depan" }
    ]
  },
  {
    id: "ri",
    romaji: "ri",
    hiragana: "り",
    katakana: "リ",
    row: "r",
    rowName: "Baris R (Ra)",
    strokes: 2,
    strokeTips: [
      "Garis vertikal kiri pendek dengan sedikit kaitan.",
      "Garis vertikal kanan lebih panjang melengkung lembut ke bawah."
    ],
    examples: [
      { wordHiragana: "りんご", wordKatakana: "リンゴ", romaji: "ringo", meaning: "Apel" },
      { wordHiragana: "りす", wordKatakana: "リス", romaji: "risu", meaning: "Tupai" }
    ]
  },
  {
    id: "ru",
    romaji: "ru",
    hiragana: "る",
    katakana: "ル",
    row: "r",
    rowName: "Baris R (Ra)",
    strokes: 1,
    strokeTips: [
      "Mirip angka 3 dengan loop lingkaran kecil mengunci di ujung bawah."
    ],
    examples: [
      { wordHiragana: "るす", wordKatakana: "ルス", romaji: "rusu", meaning: "Tidak di rumah" },
      { wordHiragana: "るび", wordKatakana: "ルビ", romaji: "rubi", meaning: "Furigana / Ruby" }
    ]
  },
  {
    id: "re",
    romaji: "re",
    hiragana: "れ",
    katakana: "レ",
    row: "r",
    rowName: "Baris R (Ra)",
    strokes: 2,
    strokeTips: [
      "Garis vertikal di sisi kiri.",
      "Garis kanan zig-zag lalu melengkung keluar ke kanan atas."
    ],
    examples: [
      { wordHiragana: "れいぞうこ", wordKatakana: "レイゾウコ", romaji: "reizouko", meaning: "Kulkas" },
      { wordHiragana: "れきし", wordKatakana: "レキシ", romaji: "rekishi", meaning: "Sejarah" }
    ]
  },
  {
    id: "ro",
    romaji: "ro",
    hiragana: "ろ",
    katakana: "ロ",
    row: "r",
    rowName: "Baris R (Ra)",
    strokes: 1,
    strokeTips: [
      "Mirip angka 3 terbuka di bawah (tanpa loop lingkaran kecil seperti る)."
    ],
    examples: [
      { wordHiragana: "ろうそく", wordKatakana: "ロウソク", romaji: "rousoku", meaning: "Lilin" },
      { wordHiragana: "ろく", wordKatakana: "ロク", romaji: "roku", meaning: "Enam (6)" }
    ]
  },

  // W & N Row (Wa-Wo-N)
  {
    id: "wa",
    romaji: "wa",
    hiragana: "わ",
    katakana: "ワ",
    row: "w",
    rowName: "Baris W & N",
    strokes: 2,
    strokeTips: [
      "Garis vertikal lurus di sisi kiri.",
      "Lengkungan besar di kanan melengkung ke dalam mirip huruf 'O' tanpa loop."
    ],
    examples: [
      { wordHiragana: "わたし", wordKatakana: "ワタシ", romaji: "watashi", meaning: "Saya" },
      { wordHiragana: "わに", wordKatakana: "ワニ", romaji: "wani", meaning: "Buaya" }
    ]
  },
  {
    id: "wo",
    romaji: "wo",
    hiragana: "を",
    katakana: "ヲ",
    row: "w",
    rowName: "Baris W & N",
    strokes: 3,
    strokeTips: [
      "Garis horizontal pendek di atas.",
      "Garis diagonal turun lalu melengkung ke kanan.",
      "Garis lengkung melintasi di bawah mirip huruf 'C'."
    ],
    examples: [
      { wordHiragana: "ほんをよむ", wordKatakana: "ホンヲヨム", romaji: "hon o yomu", meaning: "Membaca buku (partikel)" },
      { wordHiragana: "みずをのむ", wordKatakana: "ミズヲノム", romaji: "mizu o nomu", meaning: "Minum air" }
    ]
  },
  {
    id: "n",
    romaji: "n",
    hiragana: "ん",
    katakana: "ン",
    row: "n_special",
    rowName: "Karakter Khusus (N)",
    strokes: 1,
    strokeTips: [
      "Satu tarikan garis meliuk turun lalu naik ke kanan mirip huruf 'n' atau 'h' tulisan tangan latin."
    ],
    examples: [
      { wordHiragana: "にほん", wordKatakana: "ニホン", romaji: "nihon", meaning: "Jepang" },
      { wordHiragana: "みかん", wordKatakana: "ミカン", romaji: "mikan", meaning: "Jeruk mandarin" }
    ]
  }
];

export const ROW_GROUPS = [
  { key: "vowel", name: "Baris Vokal (A-I-U-E-O)" },
  { key: "k", name: "Baris K (Ka-Ki-Ku-Ke-Ko)" },
  { key: "s", name: "Baris S (Sa-Shi-Su-Se-So)" },
  { key: "t", name: "Baris T (Ta-Chi-Tsu-Te-To)" },
  { key: "n", name: "Baris N (Na-Ni-Nu-Ne-No)" },
  { key: "h", name: "Baris H (Ha-Hi-Fu-He-Ho)" },
  { key: "m", name: "Baris M (Ma-Mi-Mu-Me-Mo)" },
  { key: "y", name: "Baris Y (Ya-Yu-Yo)" },
  { key: "r", name: "Baris R (Ra-Ri-Ru-Re-Ro)" },
  { key: "w", name: "Baris W (Wa-Wo)" },
  { key: "n_special", name: "Karakter N Khusus (N)" },
];

// Helper to speak Japanese Kana
export function speakKana(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.85; // Sedikit lebih lambat agar artikulasi jelas bagi pemula
  window.speechSynthesis.speak(utterance);
}

// Normalizer for romaji variations
export function normalizeRomaji(input: string): string {
  const clean = input.trim().toLowerCase();
  const map: Record<string, string> = {
    "si": "shi",
    "ti": "chi",
    "tu": "tsu",
    "hu": "fu",
    "zi": "ji",
    "o": "wo", // for を
  };
  return map[clean] || clean;
}

const ROMAJI_TO_HIRAGANA: Record<string, string> = {
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
};

const ROMAJI_TO_KATAKANA: Record<string, string> = {
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
};

export function transliterateRomajiToKana(text: string, type: "hiragana" | "katakana" = "hiragana"): string {
  const map = type === "hiragana" ? ROMAJI_TO_HIRAGANA : ROMAJI_TO_KATAKANA;
  const lower = text.toLowerCase().trim();
  if (map[lower]) return map[lower];
  return text;
}
