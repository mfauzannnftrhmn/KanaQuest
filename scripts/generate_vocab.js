// scripts/generate_vocab.js
const fs = require("fs");
const path = require("path");

const vocabData = `export interface VocabularyItem {
  id: string;
  word: string;
  romaji: string;
  meaning: string;
  type: "hiragana" | "katakana";
  category: "salam" | "keluarga" | "sekolah" | "profesi" | "makanan" | "benda" | "tempat" | "transportasi" | "sifat" | "waktu" | "hewan" | "teknologi";
  categoryName: string;
  kanji?: string;
  exampleSentence?: {
    japanese: string;
    romaji: string;
    meaning: string;
  };
}

export const VOCABULARY_LIST: VocabularyItem[] = [
  // ==========================================
  // 1. SALAM & UNGKAPAN SEHARI-HARI (Materi 1-2 & Marugoto)
  // ==========================================
  {
    id: "v_sensei_suf",
    word: "〜せんせい",
    romaji: "~sensei",
    meaning: "Pengajar / Guru / Dokter (panggilan hormat)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    kanji: "〜先生",
    exampleSentence: {
      japanese: "たなか先生、おはようございます。",
      romaji: "Tanaka-sensei, ohayou gozaimasu.",
      meaning: "Selamat pagi, Guru Tanaka."
    }
  },
  {
    id: "v_san",
    word: "〜さん",
    romaji: "~san",
    meaning: "Akhiran panggilan sopan / Saudara(i)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "アリさん、こんにちは。",
      romaji: "Ari-san, konnichiwa.",
      meaning: "Halo, Saudara Ari."
    }
  },
  {
    id: "v_chan",
    word: "〜ちゃん",
    romaji: "~chan",
    meaning: "Akhiran panggilan akrab (anak-anak / perempuan)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "ハナちゃん、いっしょにあそぼう。",
      romaji: "Hana-chan, issho ni asobou.",
      meaning: "Hana-chan, ayo bermain bersama."
    }
  },
  {
    id: "v_kun",
    word: "〜くん",
    romaji: "~kun",
    meaning: "Akhiran panggilan (laki-laki / teman sebaya / junior)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    kanji: "〜君",
    exampleSentence: {
      japanese: "ケンくん、がっこうへ行こう。",
      romaji: "Ken-kun, gakkou e ikou.",
      meaning: "Ken-kun, ayo pergi ke sekolah."
    }
  },
  {
    id: "v_ohayou_gozaimasu",
    word: "おはようございます",
    romaji: "ohayou gozaimasu",
    meaning: "Selamat pagi (sopan)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "みなさん、おはようございます。",
      romaji: "Minasan, ohayou gozaimasu.",
      meaning: "Selamat pagi semuanya."
    }
  },
  {
    id: "v_ohayou",
    word: "おはよう",
    romaji: "ohayou",
    meaning: "Selamat pagi (akrab / santai)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "ともだちにおはようと言いました。",
      romaji: "Tomodachi ni ohayou to iimashita.",
      meaning: "Mengucapkan selamat pagi kepada teman."
    }
  },
  {
    id: "v_konnichiwa",
    word: "こんにちは",
    romaji: "konnichiwa",
    meaning: "Selamat siang / Halo",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "こんにちは、いい天気ですね。",
      romaji: "Konnichiwa, ii tenki desu ne.",
      meaning: "Halo / Selamat siang, cuaca yang bagus ya."
    }
  },
  {
    id: "v_konbanwa",
    word: "こんばんは",
    romaji: "konbanwa",
    meaning: "Selamat malam (salam saat bertemu)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "こんばんは、お元気ですか？",
      romaji: "Konbanwa, ogenki desu ka?",
      meaning: "Selamat malam, apa kabar?"
    }
  },
  {
    id: "v_oyasuminasai",
    word: "おやすみなさい",
    romaji: "oyasuminasai",
    meaning: "Selamat tidur / Selamat istirahat",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "もう夜ですから、おやすみなさい。",
      romaji: "Mou yoru desu kara, oyasuminasai.",
      meaning: "Karena sudah malam, selamat tidur."
    }
  },
  {
    id: "v_sayounara",
    word: "さようなら",
    romaji: "sayounara",
    meaning: "Selamat tinggal",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "先生、さようなら。",
      romaji: "Sensei, sayounara.",
      meaning: "Sampai jumpa / selamat tinggal, guru."
    }
  },
  {
    id: "v_jaane",
    word: "じゃあね",
    romaji: "jaa ne",
    meaning: "Sampai jumpa (santai / antar teman)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "じゃあね、またあした！",
      romaji: "Jaa ne, mata ashita!",
      meaning: "Sampai jumpa, besok ketemu lagi ya!"
    }
  },
  {
    id: "v_matane",
    word: "またね",
    romaji: "mata ne",
    meaning: "Sampai nanti",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "今日は楽しかったよ、またね。",
      romaji: "Kyou wa tanoshikatta yo, mata ne.",
      meaning: "Hari ini sangat menyenangkan, sampai nanti."
    }
  },
  {
    id: "v_hajimemashite",
    word: "はじめまして",
    romaji: "hajimemashite",
    meaning: "Salam kenal (pertama kali bertemu)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "はじめまして、どうぞよろしく。",
      romaji: "Hajimemashite, douzo yoroshiku.",
      meaning: "Salam kenal, senang bertemu dengan Anda."
    }
  },
  {
    id: "v_dewamata",
    word: "ではまた",
    romaji: "dewa mata",
    meaning: "Sampai ketemu lagi",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "ではまた、来週会いましょう。",
      romaji: "Dewa mata, raishuu aimashou.",
      meaning: "Sampai ketemu lagi, mari bertemu minggu depan."
    }
  },
  {
    id: "v_mataashita",
    word: "またあした",
    romaji: "mata ashita",
    meaning: "Sampai besok",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "おつかれさまでした、またあした。",
      romaji: "Otsukaresama deshita, mata ashita.",
      meaning: "Terima kasih atas kerja kerasnya, sampai besok."
    }
  },
  {
    id: "v_mataraishuu",
    word: "またらいしゅう",
    romaji: "mata raishuu",
    meaning: "Sampai minggu depan",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "よい週末を、またらいしゅう！",
      romaji: "Yoi shuumatsu o, mata raishuu!",
      meaning: "Selamat akhir pekan, sampai minggu depan!"
    }
  },
  {
    id: "v_ittekimasu",
    word: "いってきます",
    romaji: "ittekimasu",
    meaning: "Saya pergi dulu / Saya berangkat",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "がっこうへ行ってきます！",
      romaji: "Gakkou e ittekimasu!",
      meaning: "Saya berangkat ke sekolah!"
    }
  },
  {
    id: "v_itterasshai",
    word: "いってらっしゃい",
    romaji: "itterasshai",
    meaning: "Hati-hati di jalan (jawaban untuk ittekimasu)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "きをつけて、いってらっしゃい。",
      romaji: "Ki o tsukete, itterasshai.",
      meaning: "Hati-hati di jalan ya."
    }
  },
  {
    id: "v_tadaima",
    word: "ただいま",
    romaji: "tadaima",
    meaning: "Saya pulang / Saya kembali",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "ただいま、お腹がすきました。",
      romaji: "Tadaima, onaka ga sukimashita.",
      meaning: "Saya pulang, saya lapar."
    }
  },
  {
    id: "v_okaerinasai",
    word: "おかえりなさい",
    romaji: "okaerinasai",
    meaning: "Selamat datang kembali (jawaban untuk tadaima)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "おかえりなさい、おつかれさま。",
      romaji: "Okaerinasai, otsukaresama.",
      meaning: "Selamat datang kembali, terima kasih atas kerja kerasmu."
    }
  },
  {
    id: "v_yoroshiku",
    word: "よろしくおねがいします",
    romaji: "yoroshiku onegaishimasu",
    meaning: "Mohon kerjasamanya / Senang bekerja sama",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "これからよろしくおねがいします。",
      romaji: "Korekara yoroshiku onegaishimasu.",
      meaning: "Mulai sekarang mohon kerja sama dan bimbingannya."
    }
  },
  {
    id: "v_gomennasai",
    word: "ごめんなさい",
    romaji: "gomen nasai",
    meaning: "Maaf (lebih sopan)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "遅れてごめんなさい。",
      romaji: "Okurete gomen nasai.",
      meaning: "Maaf karena saya terlambat."
    }
  },
  {
    id: "v_sumimasen",
    word: "すみません",
    romaji: "sumimasen",
    meaning: "Permisi / Maaf",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "すみません、水をください。",
      romaji: "Sumimasen, mizu o kudasai.",
      meaning: "Permisi, tolong minta air."
    }
  },
  {
    id: "v_shitsureishimasu",
    word: "しつれいします",
    romaji: "shitsurei shimasu",
    meaning: "Permisi / Maaf mengganggu / Pamit (formal)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    kanji: "失礼します",
    exampleSentence: {
      japanese: "しつれいします、入ってもいいですか？",
      romaji: "Shitsurei shimasu, haitte mo ii desu ka?",
      meaning: "Permisi, bolehkah saya masuk?"
    }
  },
  {
    id: "v_otsukaresama",
    word: "おつかれさまでした",
    romaji: "otsukaresama deshita",
    meaning: "Terima kasih atas kerja kerasmu",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "今日のしごとは終わりました。おつかれさまでした。",
      romaji: "Kyou no shigoto wa owarimashita. Otsukaresama deshita.",
      meaning: "Pekerjaan hari ini sudah selesai. Terima kasih atas kerja kerasnya."
    }
  },
  {
    id: "v_arigatou_gozaimasu",
    word: "どうもありがとうございます",
    romaji: "doumo arigatou gozaimasu",
    meaning: "Terima kasih banyak (sangat sopan)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "手伝ってくれて、どうもありがとうございます。",
      romaji: "Tetsudatte kurete, doumo arigatou gozaimasu.",
      meaning: "Terima kasih banyak telah membantu saya."
    }
  },
  {
    id: "v_dooitashimashite",
    word: "いいえ、どういたしまして",
    romaji: "iie, doitashimashite",
    meaning: "Sama-sama (dalam bentuk sopan)",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    exampleSentence: {
      japanese: "「ありがとう」「いいえ、どういたしまして」",
      romaji: "'Arigatou' 'Iie, doitashimashite'",
      meaning: "'Terima kasih' 'Sama-sama'."
    }
  },
  {
    id: "v_ojigi",
    word: "おじぎ",
    romaji: "ojigi",
    meaning: "Budaya membungkukkan badan untuk memberi hormat",
    type: "hiragana",
    category: "salam",
    categoryName: "Salam & Ungkapan",
    kanji: "お辞儀",
    exampleSentence: {
      japanese: "日本人はあいさつでおじぎをします。",
      romaji: "Nihonjin wa aisatsu de ojigi o shimasu.",
      meaning: "Orang Jepang membungkukkan badan saat memberi salam."
    }
  },

  // ==========================================
  // 2. ORANG, KELUARGA & KATA GANTI (Materi 1-2 & Marugoto)
  // ==========================================
  {
    id: "v_watashi",
    word: "わたし",
    romaji: "watashi",
    meaning: "Saya / Aku",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "私",
    exampleSentence: {
      japanese: "わたしはがくせいです。",
      romaji: "Watashi wa gakusei desu.",
      meaning: "Saya adalah seorang siswa."
    }
  },
  {
    id: "v_watashitachi",
    word: "わたしたち",
    romaji: "watashitachi",
    meaning: "Kita / Kami",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "私たち",
    exampleSentence: {
      japanese: "わたしたちは日本語をべんきょうします。",
      romaji: "Watashitachi wa nihongo o benkyou shimasu.",
      meaning: "Kami belajar bahasa Jepang."
    }
  },
  {
    id: "v_anata",
    word: "あなた",
    romaji: "anata",
    meaning: "Anda / Kamu",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    exampleSentence: {
      japanese: "あなたのおなまえは何ですか？",
      romaji: "Anata no onamae wa nan desu ka?",
      meaning: "Siapa nama Anda?"
    }
  },
  {
    id: "v_anatatachi",
    word: "あなたたち",
    romaji: "anatatachi",
    meaning: "Anda sekalian / Kalian",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    exampleSentence: {
      japanese: "あなたたちはどこへ行きますか？",
      romaji: "Anatatachi wa doko e ikimasu ka?",
      meaning: "Kalian mau pergi ke mana?"
    }
  },
  {
    id: "v_kare",
    word: "かれ",
    romaji: "kare",
    meaning: "Dia (laki-laki)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "彼",
    exampleSentence: {
      japanese: "かれはわたしのともだちです。",
      romaji: "Kare wa watashi no tomodachi desu.",
      meaning: "Dia (laki-laki) adalah teman saya."
    }
  },
  {
    id: "v_kanojo",
    word: "かのじょ",
    romaji: "kanojo",
    meaning: "Dia (perempuan)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "彼女",
    exampleSentence: {
      japanese: "かのじょはとても親切です。",
      romaji: "Kanojo wa totemo shinsetsu desu.",
      meaning: "Dia (perempuan) sangat ramah."
    }
  },
  {
    id: "v_minasan",
    word: "みなさん",
    romaji: "minasan",
    meaning: "Semuanya / Hadirin sekalian",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "皆さん",
    exampleSentence: {
      japanese: "みなさん、聞いてください。",
      romaji: "Minasan, kiite kudasai.",
      meaning: "Semuanya, tolong dengarkan."
    }
  },
  {
    id: "v_hito",
    word: "ひと",
    romaji: "hito",
    meaning: "Orang",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "人",
    exampleSentence: {
      japanese: "あのひとはだれですか？",
      romaji: "Ano hito wa dare desu ka?",
      meaning: "Siapakah orang itu?"
    }
  },
  {
    id: "v_otona",
    word: "おとな",
    romaji: "otona",
    meaning: "Dewasa",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "大人",
    exampleSentence: {
      japanese: "おとなのチケットを２枚買いました。",
      romaji: "Otona no chiketto o nimai kaimashita.",
      meaning: "Membeli 2 lembar tiket dewasa."
    }
  },
  {
    id: "v_kodomo",
    word: "こども",
    romaji: "kodomo",
    meaning: "Anak-anak",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "子供",
    exampleSentence: {
      japanese: "こうえんでこどもがあそんでいます。",
      romaji: "Kouen de kodomo ga asonde imasu.",
      meaning: "Anak-anak sedang bermain di taman."
    }
  },
  {
    id: "v_otoko",
    word: "おとこ",
    romaji: "otoko",
    meaning: "Laki-laki (gender)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "男",
    exampleSentence: {
      japanese: "おとこの人のこえが聞こえました。",
      romaji: "Otoko no hito no koe ga kikoemashita.",
      meaning: "Terdengar suara laki-laki."
    }
  },
  {
    id: "v_otokonohito",
    word: "おとこのひと",
    romaji: "otokonohito",
    meaning: "Pria",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "男の人",
    exampleSentence: {
      japanese: "あのおとこのひとはエンジニアです。",
      romaji: "Ano otokonohito wa enjinia desu.",
      meaning: "Pria itu adalah seorang teknisi / insinyur."
    }
  },
  {
    id: "v_otokonoko",
    word: "おとこのこ",
    romaji: "otokonoko",
    meaning: "Anak laki-laki",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "男の子",
    exampleSentence: {
      japanese: "おとこのこがサッカーをしています。",
      romaji: "Otokonoko ga sakkaa o shite imasu.",
      meaning: "Anak laki-laki sedang bermain sepak bola."
    }
  },
  {
    id: "v_onna",
    word: "おんな",
    romaji: "onna",
    meaning: "Perempuan (gender)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "女",
    exampleSentence: {
      japanese: "おんなのひとの写真です。",
      romaji: "Onna no hito no shashin desu.",
      meaning: "Foto seorang perempuan."
    }
  },
  {
    id: "v_onnanohito",
    word: "おんなのひと",
    romaji: "onnanohito",
    meaning: "Wanita",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "女の人",
    exampleSentence: {
      japanese: "あのおんなのひとは先生です。",
      romaji: "Ano onnanohito wa sensei desu.",
      meaning: "Wanita itu adalah seorang guru."
    }
  },
  {
    id: "v_onnanoko",
    word: "おんなのこ",
    romaji: "onnanoko",
    meaning: "Anak perempuan",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "女の子",
    exampleSentence: {
      japanese: "おんなのこが本をよんでいます。",
      romaji: "Onnanoko ga hon o yonde imasu.",
      meaning: "Anak perempuan sedang membaca buku."
    }
  },
  {
    id: "v_tomodachi",
    word: "ともだち",
    romaji: "tomodachi",
    meaning: "Teman",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "友達",
    exampleSentence: {
      japanese: "ともだちとお茶をのみます。",
      romaji: "Tomodachi to ocha o nomimasu.",
      meaning: "Minum teh bersama teman."
    }
  },
  {
    id: "v_kazoku",
    word: "かぞく",
    romaji: "kazoku",
    meaning: "Keluarga",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "家族",
    exampleSentence: {
      japanese: "わたしの家族は４人です。",
      romaji: "Watashi no kazoku wa yonin desu.",
      meaning: "Keluarga saya berjumlah 4 orang."
    }
  },
  {
    id: "v_chichi",
    word: "ちち",
    romaji: "chichi",
    meaning: "Ayah (saya sendiri)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "父",
    exampleSentence: {
      japanese: "ちちは会社員です。",
      romaji: "Chichi wa kaishain desu.",
      meaning: "Ayah saya adalah karyawan perusahaan."
    }
  },
  {
    id: "v_haha",
    word: "はは",
    romaji: "haha",
    meaning: "Ibu (saya sendiri)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "母",
    exampleSentence: {
      japanese: "はははりょうりが上手です。",
      romaji: "Haha wa ryouri ga jouzu desu.",
      meaning: "Ibu saya pandai memasak."
    }
  },
  {
    id: "v_ani",
    word: "あに",
    romaji: "ani",
    meaning: "Kakak laki-laki (saya sendiri)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "兄",
    exampleSentence: {
      japanese: "あには東京にすんでいます。",
      romaji: "Ani wa Toukyou ni sunde imasu.",
      meaning: "Kakak laki-laki saya tinggal di Tokyo."
    }
  },
  {
    id: "v_ane",
    word: "あね",
    romaji: "ane",
    meaning: "Kakak perempuan (saya sendiri)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "姉",
    exampleSentence: {
      japanese: "あねは先生をしています。",
      romaji: "Ane wa sensei o shite imasu.",
      meaning: "Kakak perempuan saya bekerja sebagai guru."
    }
  },
  {
    id: "v_otooto",
    word: "おとうと",
    romaji: "otooto",
    meaning: "Adik laki-laki (saya sendiri)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "弟",
    exampleSentence: {
      japanese: "おとうとは高校生です。",
      romaji: "Otooto wa koukousei desu.",
      meaning: "Adik laki-laki saya adalah siswa SMA."
    }
  },
  {
    id: "v_imooto",
    word: "いもうと",
    romaji: "imooto",
    meaning: "Adik perempuan (saya sendiri)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "妹",
    exampleSentence: {
      japanese: "いもうとは歌が好きです。",
      romaji: "Imooto wa uta ga suki desu.",
      meaning: "Adik perempuan saya suka bernyanyi."
    }
  },
  {
    id: "v_ojisan",
    word: "おじさん",
    romaji: "ojisan",
    meaning: "Paman / Om",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    exampleSentence: {
      japanese: "おじさんからプレゼントをもらいました。",
      romaji: "Ojisan kara purezento o moraimashita.",
      meaning: "Saya mendapat hadiah dari paman."
    }
  },
  {
    id: "v_obasan",
    word: "おばさん",
    romaji: "obasan",
    meaning: "Bibi / Tante",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    exampleSentence: {
      japanese: "おばさんの家へあそびに行きます。",
      romaji: "Obasan no ie e asobi ni ikimasu.",
      meaning: "Pergi bermain ke rumah bibi."
    }
  },
  {
    id: "v_ryoushin",
    word: "りょうしん",
    romaji: "ryoushin",
    meaning: "Kedua orang tua",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "両親",
    exampleSentence: {
      japanese: "りょうしんに感謝しています。",
      romaji: "Ryoushin ni kansha shite imasu.",
      meaning: "Saya berterima kasih kepada kedua orang tua saya."
    }
  },
  {
    id: "v_kyoudai",
    word: "きょうだい",
    romaji: "kyoudai",
    meaning: "Saudara kandung (laki-laki / saudara)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "兄弟",
    exampleSentence: {
      japanese: "きょうだいは何人ですか？",
      romaji: "Kyoudai wa nannin desu ka?",
      meaning: "Berapa orang saudara kandungmu?"
    }
  },
  {
    id: "v_shimai",
    word: "しまい",
    romaji: "shimai",
    meaning: "Saudara kandung perempuan",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "姉妹",
    exampleSentence: {
      japanese: "わたしたちは３人姉妹です。",
      romaji: "Watashitachi wa sannin shimai desu.",
      meaning: "Kami adalah tiga bersaudari."
    }
  },
  {
    id: "v_otousan",
    word: "おとうさん",
    romaji: "otousan",
    meaning: "Ayah (panggilan / ayah orang lain)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "お父さん",
    exampleSentence: {
      japanese: "おとうさんはお元気ですか？",
      romaji: "Otousan wa ogenki desu ka?",
      meaning: "Apakah ayah Anda sehat?"
    }
  },
  {
    id: "v_okaasan",
    word: "おかあさん",
    romaji: "okaasan",
    meaning: "Ibu (panggilan / ibu orang lain)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "お母さん",
    exampleSentence: {
      japanese: "おかあさん、ごはんまだ？",
      romaji: "Okaasan, gohan mada?",
      meaning: "Ibu, apakah makannya belum siap?"
    }
  },
  {
    id: "v_oniisan",
    word: "おにいさん",
    romaji: "oniisan",
    meaning: "Kakak laki-laki (panggilan / kakak orang lain)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "お兄さん",
    exampleSentence: {
      japanese: "たなかさんのおにいさんは背が高いですね。",
      romaji: "Tanaka-san no oniisan wa se ga takai desu ne.",
      meaning: "Kakak laki-laki Saudara Tanaka tinggi ya."
    }
  },
  {
    id: "v_oneesan",
    word: "おねえさん",
    romaji: "oneesan",
    meaning: "Kakak perempuan (panggilan / kakak orang lain)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "お姉さん",
    exampleSentence: {
      japanese: "おねえさんは親切な方です。",
      romaji: "Oneesan wa shinsetsu na kata desu.",
      meaning: "Kakak perempuannya adalah orang yang ramah."
    }
  },
  {
    id: "v_ojiisan",
    word: "おじいさん",
    romaji: "ojiisan",
    meaning: "Kakek",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    exampleSentence: {
      japanese: "おじいさんは毎朝散歩をします。",
      romaji: "Ojiisan wa maiasa sanpo o shimasu.",
      meaning: "Kakek jalan-jalan pagi setiap hari."
    }
  },
  {
    id: "v_obaasan",
    word: "おばあさん",
    romaji: "obaasan",
    meaning: "Nenek",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    exampleSentence: {
      japanese: "おばあさんの昔話を聞きました。",
      romaji: "Obaasan no mukashibanashi o kikimashita.",
      meaning: "Mendengarkan cerita masa lalu dari nenek."
    }
  },
  {
    id: "v_kimi",
    word: "きみ",
    romaji: "kimi",
    meaning: "Kamu (akrab)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "君",
    exampleSentence: {
      japanese: "きみはどう思う？",
      romaji: "Kimi wa dou omou?",
      meaning: "Bagaimana menurutmu?"
    }
  },
  {
    id: "v_boku",
    word: "ぼく",
    romaji: "boku",
    meaning: "Aku (biasa digunakan laki-laki)",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "僕",
    exampleSentence: {
      japanese: "ぼくは日本のアニメが好きです。",
      romaji: "Boku wa nihon no anime ga suki desu.",
      meaning: "Aku suka anime Jepang."
    }
  },
  {
    id: "v_katei",
    word: "かてい",
    romaji: "katei",
    meaning: "Rumah tangga / Keluarga",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "家庭",
    exampleSentence: {
      japanese: "あたたかいかていを築きたいです。",
      romaji: "Atatakai katei o kizukitai desu.",
      meaning: "Ingin membangun rumah tangga yang hangat."
    }
  },
  {
    id: "v_jibun",
    word: "じぶん",
    romaji: "jibun",
    meaning: "Diri sendiri",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "自分",
    exampleSentence: {
      japanese: "じぶんでべんきょうします。",
      romaji: "Jibun de benkyou shimasu.",
      meaning: "Belajar sendiri."
    }
  },
  {
    id: "v_namae",
    word: "なまえ",
    romaji: "namae",
    meaning: "Nama",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "名前",
    exampleSentence: {
      japanese: "おなまえを書いてください。",
      romaji: "Onamae o kaite kudasai.",
      meaning: "Tolong tulis nama Anda."
    }
  },
  {
    id: "v_gaikokujin",
    word: "がいこくじん",
    romaji: "gaikokujin",
    meaning: "Orang asing",
    type: "hiragana",
    category: "keluarga",
    categoryName: "Orang & Keluarga",
    kanji: "外国人",
    exampleSentence: {
      japanese: "学校にはたくさんの外国人学生がいます。",
      romaji: "Gakkou ni wa takusan no gaikokujin gakusei ga imasu.",
      meaning: "Di sekolah ada banyak siswa berkewarganegaraan asing."
    }
  },

  // ==========================================
  // 3. KELAS & SEKOLAH (きょうしつのことば - Marugoto)
  // ==========================================
  {
    id: "v_gakusei",
    word: "がくせい",
    romaji: "gakusei",
    meaning: "Siswa / Pelajar / Mahasiswa",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "学生",
    exampleSentence: {
      japanese: "わたしは日本語学校の学生です。",
      romaji: "Watashi wa nihongo gakkou no gakusei desu.",
      meaning: "Saya adalah siswa sekolah bahasa Jepang."
    }
  },
  {
    id: "v_gakkou",
    word: "がっこう",
    romaji: "gakkou",
    meaning: "Sekolah",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "学校",
    exampleSentence: {
      japanese: "毎日学校へ通います。",
      romaji: "Mainichi gakkou e kayoimasu.",
      meaning: "Setiap hari pergi ke sekolah."
    }
  },
  {
    id: "v_kyoushitsu",
    word: "きょうしつ",
    romaji: "kyoushitsu",
    meaning: "Ruang kelas",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "教室",
    exampleSentence: {
      japanese: "きょうしつに入りましょう。",
      romaji: "Kyoushitsu ni hairimashou.",
      meaning: "Mari masuk ke dalam ruang kelas."
    }
  },
  {
    id: "v_kurasu",
    word: "クラス",
    romaji: "kurasu",
    meaning: "Kelas / Pelajaran",
    type: "katakana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    exampleSentence: {
      japanese: "このクラスはとてもにぎやかです。",
      romaji: "Kono kurasu wa totemo nigiyaka desu.",
      meaning: "Kelas ini sangat ramai dan menyenangkan."
    }
  },
  {
    id: "v_isu",
    word: "いす",
    romaji: "isu",
    meaning: "Kursi",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    exampleSentence: {
      japanese: "いすに座ってください。",
      romaji: "Isu ni suwatte kudasai.",
      meaning: "Silakan duduk di kursi."
    }
  },
  {
    id: "v_tsukue",
    word: "つくえ",
    romaji: "tsukue",
    meaning: "Meja kerja / Meja belajar",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "机",
    exampleSentence: {
      japanese: "つくえの上に本があります。",
      romaji: "Tsukue no ue ni hon ga arimasu.",
      meaning: "Ada buku di atas meja."
    }
  },
  {
    id: "v_enpitsu",
    word: "えんぴつ",
    romaji: "enpitsu",
    meaning: "Pensil",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "鉛筆",
    exampleSentence: {
      japanese: "えんぴつで名前を書きます。",
      romaji: "Enpitsu de namae o kakimasu.",
      meaning: "Menulis nama dengan pensil."
    }
  },
  {
    id: "v_pen",
    word: "ペン",
    romaji: "pen",
    meaning: "Pena / Pulpen",
    type: "katakana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    exampleSentence: {
      japanese: "黒いペンを貸してください。",
      romaji: "Kuroi pen o kashite kudasai.",
      meaning: "Tolong pinjamkan pulpen hitam."
    }
  },
  {
    id: "v_keshigomu",
    word: "けしごむ",
    romaji: "keshigomu",
    meaning: "Karet penghapus",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "消しゴム",
    exampleSentence: {
      japanese: "けしごむで字を消します。",
      romaji: "Keshigomu de ji o keshimasu.",
      meaning: "Menghapus tulisan dengan karet penghapus."
    }
  },
  {
    id: "v_nooto",
    word: "ノート",
    romaji: "nooto",
    meaning: "Buku tulis / Catatan",
    type: "katakana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    exampleSentence: {
      japanese: "ノートにメモをとります。",
      romaji: "Nooto ni memo o torimasu.",
      meaning: "Membuat catatan di buku tulis."
    }
  },
  {
    id: "v_jisho",
    word: "じしょ",
    romaji: "jisho",
    meaning: "Kamus",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "辞書",
    exampleSentence: {
      japanese: "わからない言葉をじしょで調べます。",
      romaji: "Wakaranai kotoba o jisho de shirabemasu.",
      meaning: "Mencari kata yang tidak dimengerti di kamus."
    }
  },
  {
    id: "v_kyoukasho",
    word: "きょうかしょ",
    romaji: "kyoukasho",
    meaning: "Buku pelajaran / Buku teks",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "教科書",
    exampleSentence: {
      japanese: "きょうかしょの10ページを開いてください。",
      romaji: "Kyoukasho no juupeeji o hiraite kudasai.",
      meaning: "Tolong buka buku pelajaran halaman 10."
    }
  },
  {
    id: "v_mondai",
    word: "もんだい",
    romaji: "mondai",
    meaning: "Pertanyaan / Soal / Masalah",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "問題",
    exampleSentence: {
      japanese: "このもんだいは難しいです。",
      romaji: "Kono mondai wa muzukashii desu.",
      meaning: "Soal pertanyaan ini sulit."
    }
  },
  {
    id: "v_kotae",
    word: "こたえ",
    romaji: "kotae",
    meaning: "Jawaban",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "答え",
    exampleSentence: {
      japanese: "正しいこたえを選んでください。",
      romaji: "Tadashii kotae o erande kudasai.",
      meaning: "Pilihlah jawaban yang benar."
    }
  },
  {
    id: "v_shiken",
    word: "しけん",
    romaji: "shiken",
    meaning: "Ujian",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "試験",
    exampleSentence: {
      japanese: "あした日本語のしけんがあります。",
      romaji: "Ashita nihongo no shiken ga arimasu.",
      meaning: "Besok ada ujian bahasa Jepang."
    }
  },
  {
    id: "v_tesuto",
    word: "テスト",
    romaji: "tesuto",
    meaning: "Tes / Kuis",
    type: "katakana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    exampleSentence: {
      japanese: "漢字のテストで満点をとりました。",
      romaji: "Kanji no tesuto de manten o torimashita.",
      meaning: "Mendapat nilai sempurna pada tes kanji."
    }
  },
  {
    id: "v_shukudai",
    word: "しゅくだい",
    romaji: "shukudai",
    meaning: "Pekerjaan rumah (PR)",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "宿題",
    exampleSentence: {
      japanese: "今日のしゅくだいを終えました。",
      romaji: "Kyou no shukudai o oemashita.",
      meaning: "Saya sudah menyelesaikan PR hari ini."
    }
  },
  {
    id: "v_benkyou",
    word: "べんきょう",
    romaji: "benkyou",
    meaning: "Belajar",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "勉強",
    exampleSentence: {
      japanese: "毎日２時間べんきょうします。",
      romaji: "Mainichi nijikan benkyou shimasu.",
      meaning: "Belajar selama 2 jam setiap hari."
    }
  },
  {
    id: "v_renshuu",
    word: "れんしゅう",
    romaji: "renshuu",
    meaning: "Latihan / Berlatih",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    kanji: "練習",
    exampleSentence: {
      japanese: "ひらがなのれんしゅうをしましょう。",
      romaji: "Hiragana no renshuu o shimashou.",
      meaning: "Mari berlatih menulis hiragana."
    }
  },
  {
    id: "v_wakarimashita",
    word: "わかりました",
    romaji: "wakarimashita",
    meaning: "Mengerti / Paham",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    exampleSentence: {
      japanese: "はい、よくわかりました。",
      romaji: "Hai, yoku wakarimashita.",
      meaning: "Ya, saya sudah mengerti dengan jelas."
    }
  },
  {
    id: "v_wakarimasen",
    word: "わかりません",
    romaji: "wakarimasen",
    meaning: "Tidak mengerti / Belum paham",
    type: "hiragana",
    category: "sekolah",
    categoryName: "Kelas & Sekolah",
    exampleSentence: {
      japanese: "すみません、まだわかりません。",
      romaji: "Sumimasen, mada wakarimasen.",
      meaning: "Maaf, saya masih belum mengerti."
    }
  },

  // ==========================================
  // 4. PEKERJAAN & PROFESI (しごと - Marugoto)
  // ==========================================
  {
    id: "v_isha",
    word: "いしゃ",
    romaji: "isha",
    meaning: "Dokter",
    type: "hiragana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    kanji: "医者",
    exampleSentence: {
      japanese: "びょういんでいしゃに診てもらいました。",
      romaji: "Byooin de isha ni mite moraimashita.",
      meaning: "Diperiksa oleh dokter di rumah sakit."
    }
  },
  {
    id: "v_enjinia",
    word: "エンジニア",
    romaji: "enjinia",
    meaning: "Insinyur / Teknisi",
    type: "katakana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    exampleSentence: {
      japanese: "彼はITのエンジニアです。",
      romaji: "Kare wa IT no enjinia desu.",
      meaning: "Dia adalah seorang insinyur IT."
    }
  },
  {
    id: "v_kaishain",
    word: "かいしゃいん",
    romaji: "kaishain",
    meaning: "Pegawai perusahaan / Karyawan kantor",
    type: "hiragana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    kanji: "会社員",
    exampleSentence: {
      japanese: "多くの会社員が電車で通勤します。",
      romaji: "Ooku no kaishain ga densha de tsuukin shimasu.",
      meaning: "Banyak karyawan pergi kerja naik kereta."
    }
  },
  {
    id: "v_kangoshi",
    word: "かんごし",
    romaji: "kangoshi",
    meaning: "Perawat",
    type: "hiragana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    kanji: "看護師",
    exampleSentence: {
      japanese: "かんごしさんが優しく世話をしてくれました。",
      romaji: "Kangoshi-san ga yasashiku sewa o shite kuremashita.",
      meaning: "Perawat merawat dengan sangat ramah."
    }
  },
  {
    id: "v_kyoushi",
    word: "きょうし",
    romaji: "kyoushi",
    meaning: "Pengajar / Guru (profesi)",
    type: "hiragana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    kanji: "教師",
    exampleSentence: {
      japanese: "わたしの夢は高校のきょうしです。",
      romaji: "Watashi no yume wa koukou no kyoushi desu.",
      meaning: "Impian saya adalah menjadi guru SMA."
    }
  },
  {
    id: "v_koumuin",
    word: "こうむいん",
    romaji: "koumuin",
    meaning: "Pegawai negeri",
    type: "hiragana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    kanji: "公務員",
    exampleSentence: {
      japanese: "あねは市役所のこうむいんです。",
      romaji: "Ane wa shiyakusho no koumuin desu.",
      meaning: "Kakak perempuan saya adalah pegawai negeri di balai kota."
    }
  },
  {
    id: "v_shufu",
    word: "しゅふ",
    romaji: "shufu",
    meaning: "Ibu rumah tangga",
    type: "hiragana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    kanji: "主婦",
    exampleSentence: {
      japanese: "母は忙しいしゅふです。",
      romaji: "Haha wa isogashii shufu desu.",
      meaning: "Ibu saya adalah ibu rumah tangga yang sibuk."
    }
  },
  {
    id: "v_arubaito",
    word: "アルバイト",
    romaji: "arubaito",
    meaning: "Pekerjaan paruh waktu (part-time)",
    type: "katakana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    exampleSentence: {
      japanese: "コンビニでアルバイトをしています。",
      romaji: "Konbini de arubaito o shite imasu.",
      meaning: "Bekerja paruh waktu di minimarket."
    }
  },
  {
    id: "v_kaisha",
    word: "かいしゃ",
    romaji: "kaisha",
    meaning: "Perusahaan / Kantor",
    type: "hiragana",
    category: "profesi",
    categoryName: "Pekerjaan & Profesi",
    kanji: "会社",
    exampleSentence: {
      japanese: "かいしゃは９時から始まります。",
      romaji: "Kaisha wa kuji kara hajimarimasu.",
      meaning: "Kantor dimulai dari jam 9."
    }
  },

  // ==========================================
  // 5. MAKANAN & MINUMAN (たべもの・のみもの)
  // ==========================================
  {
    id: "v_gohan",
    word: "ごはん",
    romaji: "gohan",
    meaning: "Nasi / Makanan pokok",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "ご飯",
    exampleSentence: {
      japanese: "あさごはんをたべました。",
      romaji: "Asagohan o tabemashita.",
      meaning: "Saya sudah makan sarapan."
    }
  },
  {
    id: "v_pan",
    word: "パン",
    romaji: "pan",
    meaning: "Roti",
    type: "katakana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    exampleSentence: {
      japanese: "朝はパンとコーヒーです。",
      romaji: "Asa wa pan to koohii desu.",
      meaning: "Pagi hari makan roti dan minum kopi."
    }
  },
  {
    id: "v_sakana",
    word: "さかな",
    romaji: "sakana",
    meaning: "Ikan",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "魚",
    exampleSentence: {
      japanese: "新鮮なさかなを料理します。",
      romaji: "Shinsen na sakana o ryouri shimasu.",
      meaning: "Memasak ikan segar."
    }
  },
  {
    id: "v_niku",
    word: "にく",
    romaji: "niku",
    meaning: "Daging",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "肉",
    exampleSentence: {
      japanese: "やきにくを食べに行きました。",
      romaji: "Yakiniku o tabe ni ikimashita.",
      meaning: "Pergi makan daging bakar."
    }
  },
  {
    id: "v_gyuuniku",
    word: "ぎゅうにく",
    romaji: "gyuuniku",
    meaning: "Daging sapi",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "牛肉",
    exampleSentence: {
      japanese: "ぎゅうにくのカレーを作ります。",
      romaji: "Gyuuniku no karee o tsukurimasu.",
      meaning: "Membuat kari daging sapi."
    }
  },
  {
    id: "v_toriniku",
    word: "とりにく",
    romaji: "toriniku",
    meaning: "Daging ayam",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "鶏肉",
    exampleSentence: {
      japanese: "とりにくのからあげが大好きです。",
      romaji: "Toriniku no karaage ga daisuki desu.",
      meaning: "Saya sangat suka karaage ayam goreng."
    }
  },
  {
    id: "v_butaniku",
    word: "ぶたにく",
    romaji: "butaniku",
    meaning: "Daging babi",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "豚肉",
    exampleSentence: {
      japanese: "ぶたにくをやさいと炒めます。",
      romaji: "Butaniku o yasai to itamemasu.",
      meaning: "Menumis daging babi dengan sayuran."
    }
  },
  {
    id: "v_tamago",
    word: "たまご",
    romaji: "tamago",
    meaning: "Telur",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "卵",
    exampleSentence: {
      japanese: "たまごやきを作りました。",
      romaji: "Tamagoyaki o tsukurimashita.",
      meaning: "Membuat telur dadar gulung."
    }
  },
  {
    id: "v_yasai",
    word: "やさい",
    romaji: "yasai",
    meaning: "Sayuran",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "野菜",
    exampleSentence: {
      japanese: "からだのためにやさいを食べます。",
      romaji: "Karada no tame ni yasai o tabemasu.",
      meaning: "Makan sayuran demi kesehatan tubuh."
    }
  },
  {
    id: "v_kudamono",
    word: "くだもの",
    romaji: "kudamono",
    meaning: "Buah-buahan",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "果物",
    exampleSentence: {
      japanese: "くだものは甘くておいしいです。",
      romaji: "Kudamono wa amakute oishii desu.",
      meaning: "Buah-buahan manis dan lezat."
    }
  },
  {
    id: "v_mizu",
    word: "みず",
    romaji: "mizu",
    meaning: "Air putih",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "水",
    exampleSentence: {
      japanese: "つめたい水を一杯ください。",
      romaji: "Tsumetai mizu o ippai kudasai.",
      meaning: "Tolong minta segelas air dingin."
    }
  },
  {
    id: "v_ocha",
    word: "おちゃ",
    romaji: "ocha",
    meaning: "Teh hijau Jepang",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "お茶",
    exampleSentence: {
      japanese: "食後におちゃをのみます。",
      romaji: "Shokugo ni ocha o nomimasu.",
      meaning: "Minum teh hijau setelah makan."
    }
  },
  {
    id: "v_koucha",
    word: "こうちゃ",
    romaji: "koucha",
    meaning: "Teh hitam",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "紅茶",
    exampleSentence: {
      japanese: "レモンこうちゃが好きです。",
      romaji: "Remon koucha ga suki desu.",
      meaning: "Saya suka teh hitam lemon."
    }
  },
  {
    id: "v_koohii",
    word: "コーヒー",
    romaji: "koohii",
    meaning: "Kopi",
    type: "katakana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    exampleSentence: {
      japanese: "ブラックコーヒーをのみます。",
      romaji: "Burakku koohii o nomimasu.",
      meaning: "Minum kopi hitam."
    }
  },
  {
    id: "v_gyuunyuu",
    word: "ぎゅうにゅう",
    romaji: "gyuunyuu",
    meaning: "Susu sapi",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "牛乳",
    exampleSentence: {
      japanese: "毎朝ぎゅうにゅうを一杯のみます。",
      romaji: "Maiasa gyuunyuu o ippai nomimasu.",
      meaning: "Minum segelas susu sapi setiap pagi."
    }
  },
  {
    id: "v_juusu",
    word: "ジュース",
    romaji: "juusu",
    meaning: "Jus",
    type: "katakana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    exampleSentence: {
      japanese: "オレンジジュースを注文しました。",
      romaji: "Orenji juusu o chuumon shimashita.",
      meaning: "Memesan jus jeruk."
    }
  },
  {
    id: "v_sushi",
    word: "すし",
    romaji: "sushi",
    meaning: "Sushi",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "寿司",
    exampleSentence: {
      japanese: "回転寿司に行きましょう。",
      romaji: "Kaitenzushi ni ikimashou.",
      meaning: "Ayo pergi ke restoran sushi ban berjalan."
    }
  },
  {
    id: "v_sashimi",
    word: "さしみ",
    romaji: "sashimi",
    meaning: "Sashimi (hidangan ikan laut mentah segar)",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "刺身",
    exampleSentence: {
      japanese: "マグロのさしみを食べました。",
      romaji: "Maguro no sashimi o tabemashita.",
      meaning: "Makan sashimi tuna."
    }
  },
  {
    id: "v_tenpura",
    word: "てんぷら",
    romaji: "tenpura",
    meaning: "Tempura (gorengan tepung renyah khas Jepang)",
    type: "hiragana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    kanji: "天ぷら",
    exampleSentence: {
      japanese: "えびのてんぷらがサクサクしています。",
      romaji: "Ebi no tenpura ga sakusaku shite imasu.",
      meaning: "Tempura udangnya renyah sekali."
    }
  },
  {
    id: "v_raamen",
    word: "ラーメン",
    romaji: "raamen",
    meaning: "Ramen (mi kuah khas Jepang)",
    type: "katakana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    exampleSentence: {
      japanese: "あたたかいラーメンを食べます。",
      romaji: "Atatakai raamen o tabemasu.",
      meaning: "Makan ramen hangat."
    }
  },
  {
    id: "v_karee",
    word: "カレー",
    romaji: "karee",
    meaning: "Kari (curry Jepang)",
    type: "katakana",
    category: "makanan",
    categoryName: "Makanan & Minuman",
    exampleSentence: {
      japanese: "日本のカレーライスはおいしいです。",
      romaji: "Nihon no kareeraisu wa oishii desu.",
      meaning: "Nasi kari Jepang sangat lezat."
    }
  },

  // ==========================================
  // 6. RUMAH & BENDA (いえ・へや・かぐ - Marugoto)
  // ==========================================
  {
    id: "v_ie",
    word: "いえ",
    romaji: "ie",
    meaning: "Rumah",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "家",
    exampleSentence: {
      japanese: "わたしのいえは静かな場所にあります。",
      romaji: "Watashi no ie wa shizuka na basho ni arimasu.",
      meaning: "Rumah saya berada di tempat yang tenang."
    }
  },
  {
    id: "v_apaato",
    word: "アパート",
    romaji: "apaato",
    meaning: "Apartemen / Rumah susun",
    type: "katakana",
    category: "benda",
    categoryName: "Benda & Rumah",
    exampleSentence: {
      japanese: "大学の近くのアパートに住んでいます。",
      romaji: "Daigaku no chikaku no apaato ni sunde imasu.",
      meaning: "Tinggal di apartemen dekat kampus."
    }
  },
  {
    id: "v_heya",
    word: "へや",
    romaji: "heya",
    meaning: "Kamar / Ruangan",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "部屋",
    exampleSentence: {
      japanese: "へやをそうじしました。",
      romaji: "Heya o souji shimashita.",
      meaning: "Saya sudah membersihkan kamar."
    }
  },
  {
    id: "v_genkan",
    word: "げんかん",
    romaji: "genkan",
    meaning: "Pintu masuk / Area lobi depan rumah",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "玄関",
    exampleSentence: {
      japanese: "げんかんでくつを脱ぎます。",
      romaji: "Genkan de kutsu o nugimasu.",
      meaning: "Melepas sepatu di pintu masuk (genkan)."
    }
  },
  {
    id: "v_toire",
    word: "トイレ",
    romaji: "toire",
    meaning: "Toilet / Kamar kecil",
    type: "katakana",
    category: "benda",
    categoryName: "Benda & Rumah",
    exampleSentence: {
      japanese: "トイレはどこですか？",
      romaji: "Toire wa doko desu ka?",
      meaning: "Toilet ada di sebelah mana?"
    }
  },
  {
    id: "v_ofuro",
    word: "おふろ",
    romaji: "ofuro",
    meaning: "Kamar mandi / Bak berendam Jepang",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "お風呂",
    exampleSentence: {
      japanese: "おふろに入ってリフレッシュします。",
      romaji: "Ofuro ni haitte rifuresshu shimasu.",
      meaning: "Berendam di ofuro untuk menyegarkan tubuh."
    }
  },
  {
    id: "v_daidokoro",
    word: "だいどころ",
    romaji: "daidokoro",
    meaning: "Dapur",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "台所",
    exampleSentence: {
      japanese: "だいどころで夕食を作ります。",
      romaji: "Daidokoro de yuushoku o tsukurimasu.",
      meaning: "Membuat makan malam di dapur."
    }
  },
  {
    id: "v_terebi",
    word: "テレビ",
    romaji: "terebi",
    meaning: "Televisi",
    type: "katakana",
    category: "benda",
    categoryName: "Benda & Rumah",
    exampleSentence: {
      japanese: "夜テレビのニュースを見ます。",
      romaji: "Yoru terebi no nyuusu o mimasu.",
      meaning: "Menonton berita di televisi pada malam hari."
    }
  },
  {
    id: "v_reezooko",
    word: "れいぞうこ",
    romaji: "reezooko",
    meaning: "Kulkas / Lemari es",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "冷蔵庫",
    exampleSentence: {
      japanese: "れいぞうこに牛乳があります。",
      romaji: "Reezooko ni gyuunyuu ga arimasu.",
      meaning: "Ada susu di dalam lemari es."
    }
  },
  {
    id: "v_eakon",
    word: "エアコン",
    romaji: "eakon",
    meaning: "Pendingin / Pendingin udara (AC)",
    type: "katakana",
    category: "benda",
    categoryName: "Benda & Rumah",
    exampleSentence: {
      japanese: "暑いのでエアコンをつけました。",
      romaji: "Atsui node eakon o tsukemashita.",
      meaning: "Karena panas, saya menyalakan AC."
    }
  },
  {
    id: "v_denwa",
    word: "でんわ",
    romaji: "denwa",
    meaning: "Telepon",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "電話",
    exampleSentence: {
      japanese: "ともだちにでんわをかけます。",
      romaji: "Tomodachi ni denwa o kakemasu.",
      meaning: "Menelepon teman."
    }
  },
  {
    id: "v_tokei",
    word: "とけい",
    romaji: "tokei",
    meaning: "Jam / Arloji",
    type: "hiragana",
    category: "benda",
    categoryName: "Benda & Rumah",
    kanji: "時計",
    exampleSentence: {
      japanese: "壁にとけいがあります。",
      romaji: "Kabe ni tokei ga arimasu.",
      meaning: "Ada jam di dinding."
    }
  },

  // ==========================================
  // 7. KOTA, TEMPAT & FASILITAS (まち・ばしょ - Marugoto)
  // ==========================================
  {
    id: "v_machi",
    word: "まち",
    romaji: "machi",
    meaning: "Kota",
    type: "hiragana",
    category: "tempat",
    categoryName: "Kota & Tempat",
    kanji: "町",
    exampleSentence: {
      japanese: "このまちは便利で住みやすいです。",
      romaji: "Kono machi wa benri de sumiyasui desu.",
      meaning: "Kota ini praktis dan nyaman untuk ditinggali."
    }
  },
  {
    id: "v_eki",
    word: "えき",
    romaji: "eki",
    meaning: "Stasiun kereta",
    type: "hiragana",
    category: "tempat",
    categoryName: "Kota & Tempat",
    kanji: "駅",
    exampleSentence: {
      japanese: "駅の前で会いましょう。",
      romaji: "Eki no mae de aimashou.",
      meaning: "Mari bertemu di depan stasiun."
    }
  },
  {
    id: "v_ginkou",
    word: "ぎんこう",
    romaji: "ginkou",
    meaning: "Bank",
    type: "hiragana",
    category: "tempat",
    categoryName: "Kota & Tempat",
    kanji: "銀行",
    exampleSentence: {
      japanese: "ぎんこうでお金を下ろします。",
      romaji: "Ginkou de okane o oroshimasu.",
      meaning: "Mengambil uang di bank."
    }
  },
  {
    id: "v_byooin",
    word: "びょういん",
    romaji: "byooin",
    meaning: "Rumah sakit",
    type: "hiragana",
    category: "tempat",
    categoryName: "Kota & Tempat",
    kanji: "病院",
    exampleSentence: {
      japanese: "風邪をひいたのでびょういんへ行きます。",
      romaji: "Kaze o hiita node byooin e ikimasu.",
      meaning: "Karena masuk angin, saya pergi ke rumah sakit."
    }
  },
  {
    id: "v_hoteru",
    word: "ホテル",
    romaji: "hoteru",
    meaning: "Hotel",
    type: "katakana",
    category: "tempat",
    categoryName: "Kota & Tempat",
    exampleSentence: {
      japanese: "東京のホテルを予約しました。",
      romaji: "Toukyou no hoteru o yoyaku shimashita.",
      meaning: "Memesan kamar hotel di Tokyo."
    }
  },
  {
    id: "v_konbini",
    word: "コンビニ",
    romaji: "konbini",
    meaning: "Minimarket (buka 24 jam)",
    type: "katakana",
    category: "tempat",
    categoryName: "Kota & Tempat",
    exampleSentence: {
      japanese: "コンビニでお弁当を買いました。",
      romaji: "Konbini de obentou o kaimashita.",
      meaning: "Membeli bekal makan di minimarket."
    }
  },
  {
    id: "v_resutoran",
    word: "レストラン",
    romaji: "resutoran",
    meaning: "Restoran",
    type: "katakana",
    category: "tempat",
    categoryName: "Kota & Tempat",
    exampleSentence: {
      japanese: "おいしいレストランで夕食を食べました。",
      romaji: "Oishii resutoran de yuushoku o tabemashita.",
      meaning: "Makan malam di restoran yang lezat."
    }
  },

  // ==========================================
  // 8. TRANSPORTASI (のりもの - Marugoto)
  // ==========================================
  {
    id: "v_jitensha",
    word: "じてんしゃ",
    romaji: "jitensha",
    meaning: "Sepeda",
    type: "hiragana",
    category: "transportasi",
    categoryName: "Transportasi",
    kanji: "自転車",
    exampleSentence: {
      japanese: "じてんしゃで学校へ行きます。",
      romaji: "Jitensha de gakkou e ikimasu.",
      meaning: "Pergi ke sekolah naik sepeda."
    }
  },
  {
    id: "v_kuruma",
    word: "くるま",
    romaji: "kuruma",
    meaning: "Mobil",
    type: "hiragana",
    category: "transportasi",
    categoryName: "Transportasi",
    kanji: "車",
    exampleSentence: {
      japanese: "新しいくるまを買いました。",
      romaji: "Atarashii kuruma o kaimashita.",
      meaning: "Membeli mobil baru."
    }
  },
  {
    id: "v_takushii",
    word: "タクシー",
    romaji: "takushii",
    meaning: "Taksi",
    type: "katakana",
    category: "transportasi",
    categoryName: "Transportasi",
    exampleSentence: {
      japanese: "雨なのでタクシーに乗ります。",
      romaji: "Ame na node takushii ni norimasu.",
      meaning: "Karena hujan, saya naik taksi."
    }
  },
  {
    id: "v_basu",
    word: "バス",
    romaji: "basu",
    meaning: "Bus",
    type: "katakana",
    category: "transportasi",
    categoryName: "Transportasi",
    exampleSentence: {
      japanese: "バス停でバスを待ちます。",
      romaji: "Basutei de basu o machimasu.",
      meaning: "Menunggu bus di halte bus."
    }
  },
  {
    id: "v_densha",
    word: "でんしゃ",
    romaji: "densha",
    meaning: "Kereta api listrik",
    type: "hiragana",
    category: "transportasi",
    categoryName: "Transportasi",
    kanji: "電車",
    exampleSentence: {
      japanese: "でんしゃは時間通りに来ます。",
      romaji: "Densha wa jikandoori ni kimasu.",
      meaning: "Kereta api datang tepat waktu."
    }
  },
  {
    id: "v_chikatetsu",
    word: "ちかてつ",
    romaji: "chikatetsu",
    meaning: "Kereta bawah tanah (subway)",
    type: "hiragana",
    category: "transportasi",
    categoryName: "Transportasi",
    kanji: "地下鉄",
    exampleSentence: {
      japanese: "ちかてつに乗って渋谷へ行きました。",
      romaji: "Chikatetsu ni notte Shibuya e ikimashita.",
      meaning: "Naik kereta bawah tanah pergi ke Shibuya."
    }
  },
  {
    id: "v_shinkansen",
    word: "しんかんせん",
    romaji: "shinkansen",
    meaning: "Kereta peluru Shinkansen",
    type: "hiragana",
    category: "transportasi",
    categoryName: "Transportasi",
    kanji: "新幹線",
    exampleSentence: {
      japanese: "しんかんせんで京都へ旅行しました。",
      romaji: "Shinkansen de Kyouto e ryokou shimashita.",
      meaning: "Wisata ke Kyoto naik Shinkansen."
    }
  },
  {
    id: "v_hikooki",
    word: "ひこうき",
    romaji: "hikooki",
    meaning: "Pesawat terbang",
    type: "hiragana",
    category: "transportasi",
    categoryName: "Transportasi",
    kanji: "飛行機",
    exampleSentence: {
      japanese: "ひこうきで日本へ来ました。",
      romaji: "Hikooki de nihon e kimashita.",
      meaning: "Datang ke Jepang naik pesawat terbang."
    }
  },

  // ==========================================
  // 9. KATA SIFAT (けいようし - Marugoto)
  // ==========================================
  {
    id: "v_oishii",
    word: "おいしい",
    romaji: "oishii",
    meaning: "Enak / Lezat",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "美味しい",
    exampleSentence: {
      japanese: "このラーメンはとてもおいしいです。",
      romaji: "Kono raamen wa totemo oishii desu.",
      meaning: "Ramen ini sangat lezat."
    }
  },
  {
    id: "v_mazui",
    word: "まずい",
    romaji: "mazui",
    meaning: "Tidak enak (rasa)",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    exampleSentence: {
      japanese: "この薬は苦くてまずいです。",
      romaji: "Kono kusuri wa nigakute mazui desu.",
      meaning: "Obat ini pahit dan tidak enak."
    }
  },
  {
    id: "v_takai",
    word: "たかい",
    romaji: "takai",
    meaning: "Mahal / Tinggi",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "高い",
    exampleSentence: {
      japanese: "富士山は日本で一番たかい山です。",
      romaji: "Fujisan wa nihon de ichiban takai yama desu.",
      meaning: "Gunung Fuji adalah gunung tertinggi di Jepang."
    }
  },
  {
    id: "v_yasui",
    word: "やすい",
    romaji: "yasui",
    meaning: "Murah",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "安い",
    exampleSentence: {
      japanese: "あのスーパーの野菜は安いです。",
      romaji: "Ano suupaa no yasai wa yasui desu.",
      meaning: "Sayuran di supermarket itu murah."
    }
  },
  {
    id: "v_hayai",
    word: "はやい",
    romaji: "hayai",
    meaning: "Cepat / Pagi-pagi",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "早い",
    exampleSentence: {
      japanese: "新幹線はとても速いです。",
      romaji: "Shinkansen wa totemo hayai desu.",
      meaning: "Shinkansen sangat cepat."
    }
  },
  {
    id: "v_osoi",
    word: "おそい",
    romaji: "osoi",
    meaning: "Lambat / Terlambat",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "遅い",
    exampleSentence: {
      japanese: "足がおそいので走るのが苦手です。",
      romaji: "Ashi ga osoi node hashiru no ga nigate desu.",
      meaning: "Karena larinya lambat, saya kurang mahir berlari."
    }
  },
  {
    id: "v_atarashii",
    word: "あたらしい",
    romaji: "atarashii",
    meaning: "Baru",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "新しい",
    exampleSentence: {
      japanese: "あたらしい靴を買いました。",
      romaji: "Atarashii kutsu o kaimashita.",
      meaning: "Membeli sepatu baru."
    }
  },
  {
    id: "v_furui",
    word: "ふるい",
    romaji: "furui",
    meaning: "Lama / Kuno / Usang",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "古い",
    exampleSentence: {
      japanese: "京都にはふるいお寺がたくさんあります。",
      romaji: "Kyouto ni wa furui otera ga takusan arimasu.",
      meaning: "Di Kyoto ada banyak kuil kuno."
    }
  },
  {
    id: "v_ookii",
    word: "おおきい",
    romaji: "ookii",
    meaning: "Besar",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "大きい",
    exampleSentence: {
      japanese: "おおきい犬が走っています。",
      romaji: "Ookii inu ga hashitte imasu.",
      meaning: "Anjing besar sedang berlari."
    }
  },
  {
    id: "v_chiisai",
    word: "ちいさい",
    romaji: "chiisai",
    meaning: "Kecil",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "小さい",
    exampleSentence: {
      japanese: "ちいさい鳥が鳴いています。",
      romaji: "Chiisai tori ga naite imasu.",
      meaning: "Burung kecil sedang berkicau."
    }
  },
  {
    id: "v_ii",
    word: "いい",
    romaji: "ii",
    meaning: "Bagus / Baik",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "良い",
    exampleSentence: {
      japanese: "今日はとてもいい天気ですね。",
      romaji: "Kyou wa totemo ii tenki desu ne.",
      meaning: "Hari ini cuacanya sangat bagus ya."
    }
  },
  {
    id: "v_shizuka",
    word: "しずか（な）",
    romaji: "shizuka",
    meaning: "Tenang / Hening",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "静か",
    exampleSentence: {
      japanese: "図書館はとてもしずかです。",
      romaji: "Toshokan wa totemo shizuka desu.",
      meaning: "Perpustakaan sangat tenang."
    }
  },
  {
    id: "v_nigiyaka",
    word: "にぎやか（な）",
    romaji: "nigiyaka",
    meaning: "Ramai / Meriah",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    exampleSentence: {
      japanese: "お祭りはとてもにぎやかでした。",
      romaji: "Omatsuri wa totemo nigiyaka deshita.",
      meaning: "Festivalnya sangat meriah dan ramai."
    }
  },
  {
    id: "v_benri",
    word: "べんり（な）",
    romaji: "benri",
    meaning: "Praktis / Nyaman",
    type: "hiragana",
    category: "sifat",
    categoryName: "Kata Sifat",
    kanji: "便利",
    exampleSentence: {
      japanese: "スマートフォンはとてもべんりです。",
      romaji: "Sumaatofon wa totemo benri desu.",
      meaning: "Ponsel pintar sangat praktis."
    }
  },

  // ==========================================
  // 10. WAKTU & HARI (じかん・カレンダー)
  // ==========================================
  {
    id: "v_ima",
    word: "いま",
    romaji: "ima",
    meaning: "Sekarang",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "今",
    exampleSentence: {
      japanese: "いま、何時ですか？",
      romaji: "Ima, nanji desu ka?",
      meaning: "Sekarang jam berapa?"
    }
  },
  {
    id: "v_kyou",
    word: "きょう",
    romaji: "kyou",
    meaning: "Hari ini",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "今日",
    exampleSentence: {
      japanese: "きょうはテストがあります。",
      romaji: "Kyou wa tesuto ga arimasu.",
      meaning: "Hari ini ada tes."
    }
  },
  {
    id: "v_ashita",
    word: "あした",
    romaji: "ashita",
    meaning: "Besok",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "明日",
    exampleSentence: {
      japanese: "あした映画を見に行きます。",
      romaji: "Ashita eiga o mi ni ikimasu.",
      meaning: "Besok saya pergi menonton bioskop."
    }
  },
  {
    id: "v_kinou",
    word: "きのう",
    romaji: "kinou",
    meaning: "Kemarin",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "昨日",
    exampleSentence: {
      japanese: "きのうは本を読みました。",
      romaji: "Kinou wa hon o yomimashita.",
      meaning: "Kemarin saya membaca buku."
    }
  },
  {
    id: "v_mainichi",
    word: "まいにち",
    romaji: "mainichi",
    meaning: "Setiap hari",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "毎日",
    exampleSentence: {
      japanese: "まいにち日本語をれんしゅうします。",
      romaji: "Mainichi nihongo o renshuu shimasu.",
      meaning: "Setiap hari berlatih bahasa Jepang."
    }
  },
  {
    id: "v_asa",
    word: "あさ",
    romaji: "asa",
    meaning: "Pagi hari",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "朝",
    exampleSentence: {
      japanese: "あさ６時におきます。",
      romaji: "Asa rokuji ni okimasu.",
      meaning: "Bangun tidur jam 6 pagi."
    }
  },
  {
    id: "v_hiru",
    word: "ひる",
    romaji: "hiru",
    meaning: "Siang hari",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "昼",
    exampleSentence: {
      japanese: "ひるごはんはうどんを食べました。",
      romaji: "Hirugohan wa udon o tabemashita.",
      meaning: "Makan siang dengan mi udon."
    }
  },
  {
    id: "v_yoru",
    word: "よる",
    romaji: "yoru",
    meaning: "Malam hari",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "夜",
    exampleSentence: {
      japanese: "よる１１時にねます。",
      romaji: "Yoru juuichiji ni nemasu.",
      meaning: "Tidur pada jam 11 malam."
    }
  },
  {
    id: "v_nichiyoobi",
    word: "にちようび",
    romaji: "nichiyoobi",
    meaning: "Hari Minggu",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "日曜日",
    exampleSentence: {
      japanese: "にちようびは休みです。",
      romaji: "Nichiyoobi wa yasumi desu.",
      meaning: "Hari Minggu adalah hari libur."
    }
  },
  {
    id: "v_getsuyoobi",
    word: "げつようび",
    romaji: "getsuyoobi",
    meaning: "Hari Senin",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "月曜日",
    exampleSentence: {
      japanese: "げつようびから仕事が始まります。",
      romaji: "Getsuyoobi kara shigoto ga hajimarimasu.",
      meaning: "Pekerjaan dimulai dari hari Senin."
    }
  },
  {
    id: "v_kayoobi",
    word: "かようび",
    romaji: "kayoobi",
    meaning: "Hari Selasa",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "火曜日",
    exampleSentence: {
      japanese: "かようびにテニスをします。",
      romaji: "Kayoobi ni tenisu o shimasu.",
      meaning: "Bermain tenis pada hari Selasa."
    }
  },
  {
    id: "v_suiyoobi",
    word: "すいようび",
    romaji: "suiyoobi",
    meaning: "Hari Rabu",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "水曜日",
    exampleSentence: {
      japanese: "すいようびは日本語の授業があります。",
      romaji: "Suiyoobi wa nihongo no jugyou ga arimasu.",
      meaning: "Hari Rabu ada kelas bahasa Jepang."
    }
  },
  {
    id: "v_mokuyoobi",
    word: "もくようび",
    romaji: "mokuyoobi",
    meaning: "Hari Kamis",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "木曜日",
    exampleSentence: {
      japanese: "もくようびに友達と買い物をします。",
      romaji: "Mokuyoobi ni tomodachi to kaimono o shimasu.",
      meaning: "Belanja bersama teman di hari Kamis."
    }
  },
  {
    id: "v_kinyoobi",
    word: "きんようび",
    romaji: "kin'yoobi",
    meaning: "Hari Jumat",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "金曜日",
    exampleSentence: {
      japanese: "きんようびの夜はゆっくりします。",
      romaji: "Kin'yoobi no yoru wa yukkuri shimasu.",
      meaning: "Bersantai di malam Jumat."
    }
  },
  {
    id: "v_doyoobi",
    word: "どようび",
    romaji: "doyoobi",
    meaning: "Hari Sabtu",
    type: "hiragana",
    category: "waktu",
    categoryName: "Waktu & Hari",
    kanji: "土曜日",
    exampleSentence: {
      japanese: "どようびは家族とドライブに行きます。",
      romaji: "Doyoobi wa kazoku to doraibu ni ikimasu.",
      meaning: "Jalan-jalan naik mobil bersama keluarga di hari Sabtu."
    }
  },

  // ==========================================
  // 11. HEWAN & PELIHARAAN (ペット - Marugoto)
  // ==========================================
  {
    id: "v_inu",
    word: "いぬ",
    romaji: "inu",
    meaning: "Anjing",
    type: "hiragana",
    category: "hewan",
    categoryName: "Hewan & Peliharaan",
    kanji: "犬",
    exampleSentence: {
      japanese: "白いかわいいいぬを飼っています。",
      romaji: "Shiroi kawaii inu o katte imasu.",
      meaning: "Memelihara anjing putih yang lucu."
    }
  },
  {
    id: "v_neko",
    word: "ねこ",
    romaji: "neko",
    meaning: "Kucing",
    type: "hiragana",
    category: "hewan",
    categoryName: "Hewan & Peliharaan",
    kanji: "猫",
    exampleSentence: {
      japanese: "ねこが日なたで寝ています。",
      romaji: "Neko ga hinata de nete imasu.",
      meaning: "Kucing sedang tidur di tempat yang terkena sinar matahari."
    }
  },
  {
    id: "v_tori",
    word: "とり",
    romaji: "tori",
    meaning: "Burung",
    type: "hiragana",
    category: "hewan",
    categoryName: "Hewan & Peliharaan",
    kanji: "鳥",
    exampleSentence: {
      japanese: "庭にきれいなとりが来ました。",
      romaji: "Niwa ni kirei na tori ga kimashita.",
      meaning: "Burung cantik datang ke halaman."
    }
  },
  {
    id: "v_usagi",
    word: "うさぎ",
    romaji: "usagi",
    meaning: "Kelinci",
    type: "hiragana",
    category: "hewan",
    categoryName: "Hewan & Peliharaan",
    kanji: "兎",
    exampleSentence: {
      japanese: "うさぎの耳は長いです。",
      romaji: "Usagi no mimi wa nagai desu.",
      meaning: "Telinga kelinci panjang."
    }
  },
  {
    id: "v_kingyo",
    word: "きんぎょ",
    romaji: "kingyo",
    meaning: "Ikan mas koki",
    type: "hiragana",
    category: "hewan",
    categoryName: "Hewan & Peliharaan",
    kanji: "金魚",
    exampleSentence: {
      japanese: "水槽できんぎょが泳いでいます。",
      romaji: "Suisou de kingyo ga oyoide imasu.",
      meaning: "Ikan mas koki sedang berenang di akuarium."
    }
  },

  // ==========================================
  // 12. TEKNOLOGI & MODERN (Marugoto)
  // ==========================================
  {
    id: "v_keitai",
    word: "けいたいでんわ",
    romaji: "keitai-denwa",
    meaning: "Telepon genggam / Handphone",
    type: "hiragana",
    category: "teknologi",
    categoryName: "Teknologi & Modern",
    kanji: "携帯電話",
    exampleSentence: {
      japanese: "けいたいでんわで写真を撮ります。",
      romaji: "Keitai-denwa de shashin o torimasu.",
      meaning: "Mengambil foto dengan telepon genggam."
    }
  },
  {
    id: "v_konpyuutaa",
    word: "コンピューター",
    romaji: "konpyuutaa",
    meaning: "Komputer",
    type: "katakana",
    category: "teknologi",
    categoryName: "Teknologi & Modern",
    exampleSentence: {
      japanese: "コンピューターでレポートを書きます。",
      romaji: "Konpyuutaa de repooto o kakimasu.",
      meaning: "Menulis laporan di komputer."
    }
  },
  {
    id: "v_intaanetto",
    word: "インターネット",
    romaji: "intaanetto",
    meaning: "Internet",
    type: "katakana",
    category: "teknologi",
    categoryName: "Teknologi & Modern",
    exampleSentence: {
      japanese: "インターネットで日本のニュースを見ます。",
      romaji: "Intaanetto de nihon no nyuusu o mimasu.",
      meaning: "Melihat berita Jepang di internet."
    }
  },
  {
    id: "v_geemu",
    word: "ゲーム",
    romaji: "geemu",
    meaning: "Game / Video game",
    type: "katakana",
    category: "teknologi",
    categoryName: "Teknologi & Modern",
    exampleSentence: {
      japanese: "休みの日にゲームをします。",
      romaji: "Yasumi no hi ni geemu o shimasu.",
      meaning: "Bermain game di hari libur."
    }
  }
];

export const VOCAB_CATEGORIES = [
  { key: "all", name: "Semua Kategori" },
  { key: "salam", name: "Salam & Ungkapan (Materi 1-2)" },
  { key: "keluarga", name: "Orang & Keluarga" },
  { key: "sekolah", name: "Kelas & Sekolah" },
  { key: "profesi", name: "Pekerjaan & Profesi" },
  { key: "makanan", name: "Makanan & Minuman" },
  { key: "benda", name: "Benda & Rumah" },
  { key: "tempat", name: "Kota & Tempat" },
  { key: "transportasi", name: "Transportasi" },
  { key: "sifat", name: "Kata Sifat" },
  { key: "waktu", name: "Waktu & Hari" },
  { key: "hewan", name: "Hewan & Peliharaan" },
  { key: "teknologi", name: "Teknologi & Modern" },
];
`;

fs.writeFileSync(path.join(__dirname, "../data/vocabularyData.ts"), vocabData, "utf8");
console.log("vocabularyData.ts generated successfully!");
