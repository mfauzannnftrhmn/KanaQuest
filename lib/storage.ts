export interface QuizQuestionResult {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
  direction?: "kana_to_romaji" | "romaji_to_kana";
  userAnswer?: string;
  isCorrect: boolean;
  drawingScore?: number;
  drawingAttempts?: number;
  drawingCategory?: string;
}

export interface QuizSession {
  id: string;
  timestamp: number;
  dateFormatted: string;
  testType: "typing" | "draw-hiragana" | "draw-katakana";
  testMode: "hiragana" | "katakana" | "mixed";
  totalQuestions: number;
  correctAnswers: number;
  score: number; // 0 - 100
  durationSeconds: number;
  questions: QuizQuestionResult[];
}

export interface UserStats {
  totalSessions: number;
  averageScore: number;
  bestScore: number;
  typingCount: number;
  drawHiraganaCount: number;
  drawKatakanaCount: number;
  dailyGoal: number; // e.g. 25
  todayAnsweredCount: number;
  currentStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  {
    id: "first_quiz",
    title: "Langkah Pertama (一歩)",
    description: "Selesaikan sesi kuis pertama kamu.",
    icon: "sparkles",
    unlockedAt: null,
  },
  {
    id: "typing_master",
    title: "Jari Cepat (タイピング)",
    description: "Selesaikan satu sesi Kuis Mengetik Kana.",
    icon: "zap",
    unlockedAt: null,
  },
  {
    id: "hira_artist",
    title: "Seniman Hiragana (ひらがな)",
    description: "Selesaikan satu sesi Kuis Menggambar Hiragana.",
    icon: "pen-tool",
    unlockedAt: null,
  },
  {
    id: "kata_artist",
    title: "Seniman Katakana (カタカナ)",
    description: "Selesaikan satu sesi Kuis Menggambar Katakana.",
    icon: "brush",
    unlockedAt: null,
  },
  {
    id: "perfect_score",
    title: "Nilai Sempurna (満点)",
    description: "Raih skor 100% pada salah satu sesi kuis.",
    icon: "award",
    unlockedAt: null,
  },
  {
    id: "streak_3",
    title: "Kobar Semangat (3 Hari)",
    description: "Capai streak belajar selama 3 hari berturut-turut.",
    icon: "flame",
    unlockedAt: null,
  },
  {
    id: "master_10",
    title: "Pelajar Tekun (10 Kana)",
    description: "Tandai minimal 10 karakter kana sebagai sudah dipelajari.",
    icon: "book-open",
    unlockedAt: null,
  },
];

const HISTORY_KEY = "kanaquest_history";
const MASTERY_KEY = "kanaquest_mastery";
const STATS_KEY = "kanaquest_stats";
const ACHIEVEMENTS_KEY = "kanaquest_achievements";

// Get today's YYYY-MM-DD string
function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getHistory(): QuizSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read history", e);
    return [];
  }
}

export function saveQuizSession(session: QuizSession): void {
  if (typeof window === "undefined") return;
  try {
    const history = getHistory();
    const updated = [session, ...history];
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

    // Update stats
    updateUserStatsAfterSession(session);

    // Check & trigger achievements
    checkAchievements(session, updated);
  } catch (e) {
    console.error("Failed to save session", e);
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(HISTORY_KEY);
    // Reset stats but keep daily goal
    const currentStats = getUserStats();
    const resetStats: UserStats = {
      ...currentStats,
      totalSessions: 0,
      averageScore: 0,
      bestScore: 0,
      typingCount: 0,
      drawHiraganaCount: 0,
      drawKatakanaCount: 0,
      todayAnsweredCount: 0,
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(resetStats));
  } catch (e) {
    console.error("Failed to clear history", e);
  }
}

export function getUserStats(): UserStats {
  if (typeof window === "undefined") {
    return {
      totalSessions: 0,
      averageScore: 0,
      bestScore: 0,
      typingCount: 0,
      drawHiraganaCount: 0,
      drawKatakanaCount: 0,
      dailyGoal: 25,
      todayAnsweredCount: 0,
      currentStreak: 1,
      lastActiveDate: getTodayString(),
    };
  }

  try {
    const raw = localStorage.getItem(STATS_KEY);
    const today = getTodayString();
    if (!raw) {
      const initial: UserStats = {
        totalSessions: 0,
        averageScore: 0,
        bestScore: 0,
        typingCount: 0,
        drawHiraganaCount: 0,
        drawKatakanaCount: 0,
        dailyGoal: 25,
        todayAnsweredCount: 0,
        currentStreak: 1,
        lastActiveDate: today,
      };
      localStorage.setItem(STATS_KEY, JSON.stringify(initial));
      return initial;
    }

    const stats: UserStats = JSON.parse(raw);
    // Reset daily count if date changed
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

      if (stats.lastActiveDate === yesterdayStr) {
        // Streak maintained
      } else {
        // Streak broken
        stats.currentStreak = 1;
      }
      stats.todayAnsweredCount = 0;
      stats.lastActiveDate = today;
      localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }

    return stats;
  } catch (e) {
    return {
      totalSessions: 0,
      averageScore: 0,
      bestScore: 0,
      typingCount: 0,
      drawHiraganaCount: 0,
      drawKatakanaCount: 0,
      dailyGoal: 25,
      todayAnsweredCount: 0,
      currentStreak: 1,
      lastActiveDate: getTodayString(),
    };
  }
}

function updateUserStatsAfterSession(session: QuizSession): void {
  const stats = getUserStats();
  const history = getHistory();
  const today = getTodayString();

  const totalSessions = history.length;
  const avg = Math.round(
    history.reduce((acc, curr) => acc + curr.score, 0) / (totalSessions || 1)
  );
  const best = Math.max(stats.bestScore, session.score);

  let typingCount = stats.typingCount;
  let drawHiraganaCount = stats.drawHiraganaCount;
  let drawKatakanaCount = stats.drawKatakanaCount;

  if (session.testType === "typing") typingCount++;
  if (session.testType === "draw-hiragana") drawHiraganaCount++;
  if (session.testType === "draw-katakana") drawKatakanaCount++;

  const todayCount = stats.todayAnsweredCount + session.totalQuestions;

  const updated: UserStats = {
    ...stats,
    totalSessions,
    averageScore: avg,
    bestScore: best,
    typingCount,
    drawHiraganaCount,
    drawKatakanaCount,
    todayAnsweredCount: todayCount,
    lastActiveDate: today,
  };

  localStorage.setItem(STATS_KEY, JSON.stringify(updated));
}

// Kana Mastery Tracker
export function getKanaMastery(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(MASTERY_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

export function toggleKanaLearned(kanaId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const current = getKanaMastery();
    const isNowLearned = !current[kanaId];
    current[kanaId] = isNowLearned;
    localStorage.setItem(MASTERY_KEY, JSON.stringify(current));

    // Check 10 learned achievement
    const countLearned = Object.values(current).filter(Boolean).length;
    if (countLearned >= 10) {
      unlockAchievement("master_10");
    }

    return isNowLearned;
  } catch (e) {
    return false;
  }
}

// Achievements
export function getAchievements(): Achievement[] {
  if (typeof window === "undefined") return ACHIEVEMENTS_LIST;
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) {
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(ACHIEVEMENTS_LIST));
      return ACHIEVEMENTS_LIST;
    }
    const saved: Achievement[] = JSON.parse(raw);
    // Merge in case new achievements were added
    return ACHIEVEMENTS_LIST.map((def) => {
      const found = saved.find((s) => s.id === def.id);
      return found ? { ...def, unlockedAt: found.unlockedAt } : def;
    });
  } catch (e) {
    return ACHIEVEMENTS_LIST;
  }
}

export function unlockAchievement(achievementId: string): void {
  if (typeof window === "undefined") return;
  try {
    const list = getAchievements();
    const target = list.find((a) => a.id === achievementId);
    if (target && !target.unlockedAt) {
      target.unlockedAt = Date.now();
      localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(list));
    }
  } catch (e) {}
}

function checkAchievements(latestSession: QuizSession, allHistory: QuizSession[]): void {
  // First quiz
  unlockAchievement("first_quiz");

  // Type specific
  if (latestSession.testType === "typing") unlockAchievement("typing_master");
  if (latestSession.testType === "draw-hiragana") unlockAchievement("hira_artist");
  if (latestSession.testType === "draw-katakana") unlockAchievement("kata_artist");

  // Perfect score
  if (latestSession.score === 100) unlockAchievement("perfect_score");

  // Streak 3 days
  const stats = getUserStats();
  if (stats.currentStreak >= 3) {
    unlockAchievement("streak_3");
  }
}

// Mistakes review aggregator
export interface KanaMistakeItem {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
  timesWrong: number;
  lastTestedAt: number;
  latestScore?: number;
}

export function getMistakes(): KanaMistakeItem[] {
  const history = getHistory();
  const mistakeMap: Record<string, KanaMistakeItem> = {};

  history.forEach((session) => {
    session.questions.forEach((q) => {
      const isDrawingWrong = q.drawingScore !== undefined && q.drawingScore < 60;
      const isTypingWrong = !q.isCorrect;

      if (isTypingWrong || isDrawingWrong) {
        const key = `${q.kana}_${q.type}`;
        if (!mistakeMap[key]) {
          mistakeMap[key] = {
            kana: q.kana,
            romaji: q.romaji,
            type: q.type,
            timesWrong: 0,
            lastTestedAt: session.timestamp,
            latestScore: q.drawingScore,
          };
        }
        mistakeMap[key].timesWrong += 1;
        if (session.timestamp > mistakeMap[key].lastTestedAt) {
          mistakeMap[key].lastTestedAt = session.timestamp;
          mistakeMap[key].latestScore = q.drawingScore;
        }
      }
    });
  });

  return Object.values(mistakeMap).sort((a, b) => b.timesWrong - a.timesWrong);
}
