import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UILang = "en" | "zh";

export interface QuestCard {
  topic: string;
  challenges: string[];
  questions: string[];
  interests: string[];
  isCustom?: boolean;
}

export interface SOSSuggestion {
  sentences: string[];
  language: "en" | "zh";
}

export interface TalkSession {
  currentLanguage: "en" | "zh";
  elapsedSeconds: number;
  totalSeconds: number;
  isEnglishPhase: boolean;
  isPaused: boolean;
  xp: number;
  badge: string | null;
  enSeconds: number;
  zhSeconds: number;
  // New: word tracking
  wordsUsed: number;
  player1Words: number;
  player2Words: number;
}

export interface PetState {
  xp: number;
  totalSessions: number;
  totalMinutes: number;
}

export interface ReviewRecord {
  id: string;
  date: number;
  topic: string;
  questions: string[];
  challenges: string[];
  durationMinutes: number;
  enMinutes: number;
  zhMinutes: number;
  xp: number;
  petXpGained: number;
  petLevelAfter: number;
  notes: string;
}

// --- New types ---

export interface VocabItem {
  word: string;
  learnedAt: number;
  questTopic: string;
  mastered: boolean;
  reviewCount: number;
  lastReviewed: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
  requirement: number;
  current: number;
}

export interface Player {
  name: string;
  color: string;
  xp: number;
  wordsLearned: number;
}

interface QuestHistoryEntry {
  id: string;
  date: number;
  topic: string;
  durationMinutes: number;
  xpGained: number;
  wordsUsed: number;
}

// --- Default achievements (10 total) ---

function createDefaultAchievements(): Achievement[] {
  return [
    {
      id: "first_quest",
      name: "First Steps",
      description: "Complete your first quest",
      icon: "🌟",
      unlockedAt: null,
      requirement: 1,
      current: 0,
    },
    {
      id: "quest_5",
      name: "Quest Explorer",
      description: "Complete 5 quests",
      icon: "🗺️",
      unlockedAt: null,
      requirement: 5,
      current: 0,
    },
    {
      id: "quest_10",
      name: "Quest Master",
      description: "Complete 10 quests",
      icon: "🏆",
      unlockedAt: null,
      requirement: 10,
      current: 0,
    },
    {
      id: "quest_25",
      name: "Quest Legend",
      description: "Complete 25 quests",
      icon: "👑",
      unlockedAt: null,
      requirement: 25,
      current: 0,
    },
    {
      id: "streak_3",
      name: "On Fire",
      description: "Maintain a 3-day streak",
      icon: "🔥",
      unlockedAt: null,
      requirement: 3,
      current: 0,
    },
    {
      id: "streak_7",
      name: "Weekly Warrior",
      description: "Maintain a 7-day streak",
      icon: "⚡",
      unlockedAt: null,
      requirement: 7,
      current: 0,
    },
    {
      id: "streak_30",
      name: "Unstoppable",
      description: "Maintain a 30-day streak",
      icon: "💎",
      unlockedAt: null,
      requirement: 30,
      current: 0,
    },
    {
      id: "words_50",
      name: "Vocabulary Builder",
      description: "Learn 50 words",
      icon: "📚",
      unlockedAt: null,
      requirement: 50,
      current: 0,
    },
    {
      id: "words_200",
      name: "Word Collector",
      description: "Learn 200 words",
      icon: "🎯",
      unlockedAt: null,
      requirement: 200,
      current: 0,
    },
    {
      id: "level_5",
      name: "Level Up!",
      description: "Reach player level 5",
      icon: "🚀",
      unlockedAt: null,
      requirement: 5,
      current: 0,
    },
  ];
}

interface AppState {
  // UI language
  uiLanguage: UILang;

  // Quest
  interests: string[];
  questCard: QuestCard | null;
  isGenerating: boolean;
  customTimeMinutes: number;

  // Custom topic
  useCustomTopic: boolean;
  customTopic: string;
  customQuestions: string[];

  // Talk session
  talkSession: TalkSession;

  // Settlement
  isSettled: boolean;

  // Growth pet
  pet: PetState;

  // Review history
  reviews: ReviewRecord[];

  // --- New fields ---
  vocabulary: VocabItem[];
  player1: Player;
  player2: Player;
  streak: number;
  lastQuestDate: string | null;
  totalXP: number;
  level: number;
  achievements: Achievement[];
  questHistory: QuestHistoryEntry[];

  // --- Actions (existing) ---
  setUiLanguage: (lang: UILang) => void;
  setInterests: (interests: string[]) => void;
  generateQuest: () => Promise<void>;
  refreshQuest: () => Promise<void>;
  refreshQuestions: () => void;
  setCustomTime: (minutes: number) => void;
  setQuestCard: (card: QuestCard) => void;
  setUseCustomTopic: (v: boolean) => void;
  setCustomTopic: (topic: string) => void;
  setCustomQuestions: (qs: string[]) => void;
  startTalk: () => void;
  updateTalkSession: (partial: Partial<TalkSession>) => void;
  togglePause: () => void;
  toggleLanguage: () => void;
  setLanguage: (lang: "en" | "zh") => void;
  settleTalk: () => void;
  updateReviewNote: (id: string, notes: string) => void;
  resetAll: () => void;

  // --- New actions ---
  setPlayer1: (player: Partial<Player>) => void;
  setPlayer2: (player: Partial<Player>) => void;
  addVocabulary: (word: string, questTopic: string) => void;
  markWordMastered: (word: string) => void;
  reviewWord: (word: string) => void;
  updateStreak: () => void;
  checkAchievements: () => void;
  useWord: (player: 1 | 2) => void;
}

// Mock data for quest cards -- each now has 7 challenges
const mockQuestBank: QuestCard[] = [
  {
    topic: "If you could teleport to any concert right now, where would you go?",
    challenges: ["nostalgic", "mind-blowing", "encore", "acoustic", "crowd surfing", "backstage", "setlist"],
    questions: [
      "What's the most unforgettable live performance you've ever seen?",
      "If your life had a soundtrack, what song would play during the climax?",
      "Which artist's concert would you travel across the world to see?",
      "What's a song that instantly transports you back to a specific memory?",
      "If you could resurrect one musician for a final show, who would it be?",
    ],
    interests: [],
  },
  {
    topic: "The ultimate street food adventure — what's on your plate?",
    challenges: ["mouthwatering", "culinary", "authentic", "street vendor", "spicy", "comfort food", "local delicacy"],
    questions: [
      "What's a dish from your hometown that foreigners rarely know about?",
      "If you could only eat one cuisine for the rest of your life, what would it be?",
      "What's the weirdest thing you've ever eaten and actually enjoyed?",
      "Which food instantly reminds you of your childhood?",
      "If you opened a restaurant tomorrow, what would be your signature dish?",
    ],
    interests: [],
  },
  {
    topic: "Cinema deep dive: the movie that rewired your brain",
    challenges: ["cinematic", "plot twist", "masterpiece", "director's cut", "opening scene", "soundtrack", "dialogue"],
    questions: [
      "Which movie ending left you staring at the ceiling for hours?",
      "If you could erase your memory and rewatch one film, which would it be?",
      "What's an underrated movie everyone should watch at least once?",
      "Which movie character do you secretly relate to the most?",
      "If you could direct a remake of any film, which would you choose?",
    ],
    interests: [],
  },
  {
    topic: "Wanderlust unlocked — your dream destination decoded",
    challenges: ["breathtaking", "off the beaten path", "culture shock", "hidden gem", "solo travel", "road trip", "passport stamps"],
    questions: [
      "What's a place you've been to that exceeded all your expectations?",
      "If you could live anywhere in the world for a year, where would you go?",
      "What's a travel experience that changed how you see the world?",
      "Which destination is on your bucket list but you haven't visited yet?",
      "What's the most surprising cultural difference you've experienced abroad?",
    ],
    interests: [],
  },
  {
    topic: "Game night confessions: the game that ruined friendships",
    challenges: ["competitive", "strategic", "rage quit", "boss fight", "speedrun", "multiplayer", "cheat code"],
    questions: [
      "What's a video game world you'd actually want to live in?",
      "Board games or video games — which brings out the worst in you?",
      "What's the most intense gaming moment you've ever had?",
      "Which game do you think tells the best story?",
      "If you could master any game instantly, which would you choose?",
    ],
    interests: [],
  },
  {
    topic: "Childhood nostalgia — the things that shaped who you are",
    challenges: ["nostalgic", "formative", "throwback", "school days", "summer vacation", "playground", "bedtime story"],
    questions: [
      "What's a childhood hobby you wish you never gave up?",
      "Which cartoon or show defined your childhood?",
      "What's a lesson you learned as a kid that still guides you today?",
      "If you could relive one day from your childhood, which would it be?",
      "What's something you believed as a kid that makes you laugh now?",
    ],
    interests: [],
  },
  {
    topic: "The creativity spark — where do ideas come from?",
    challenges: ["inspiration", "innovative", "brainstorm", "eureka moment", "daydream", "side project", "blank canvas"],
    questions: [
      "When do your best ideas usually strike — shower, walk, or midnight?",
      "What's a creative project you've always wanted to start but haven't?",
      "Who is the most creative person you know, and what makes them special?",
      "If you had unlimited time and money, what would you create?",
      "What's something ordinary that you find endlessly fascinating?",
    ],
    interests: [],
  },
  {
    topic: "Tech & future — where is humanity heading?",
    challenges: ["cutting-edge", "dystopia", "breakthrough", "startup", "open source", "singularity", "digital detox"],
    questions: [
      "What technology do you think will change the world in the next 10 years?",
      "Are you optimistic or worried about AI? Why?",
      "What's a gadget you can't live without?",
      "If you could time travel 100 years into the future, would you? Why?",
      "What's a tech trend you think is overhyped?",
    ],
    interests: [],
  },
];

const mockSOSBank: Record<"en" | "zh", Record<string, string[]>> = {
  en: {
    followUp: [
      "That's such a fascinating take. What first got you interested in it?",
      "I want to understand your angle better. What makes this feel important to you?",
      "What was the moment when you realized you cared about this topic?",
      "If you had to explain this to a total beginner, where would you start?",
    ],
    clarify: [
      "Let me make sure I understood you correctly: do you mean that the main point is...?",
      "Could you give me a quick example? I think that would help me follow you better.",
      "I'm missing one detail here. When you say that, are you talking about now or in the past?",
      "Can I pause you for a second? I know the words, but I want to catch the nuance.",
    ],
    share: [
      "That reminds me of something similar I experienced. Can I share a quick story?",
      "I have a slightly different experience with this, but I think it connects to your point.",
      "For me, the surprising part is how much this depends on culture and timing.",
      "My first instinct is to agree, but there's one small detail that makes me hesitate.",
    ],
    bridge: [
      "This connects nicely to another question: how do people around you usually see this?",
      "Let's take this one level deeper. What do you think most people misunderstand about it?",
      "That makes me wonder about the bigger picture. Has your opinion changed over time?",
      "Can we compare our cultures on this? I feel like the answer might be really different.",
    ],
    rescue: [
      "Give me a second to organize my thoughts. I know what I want to say.",
      "I lost the exact word, but the feeling I'm trying to describe is...",
      "That's a great question. My short answer is yes, but the reason is a little complicated.",
      "I'm not sure how to say this perfectly, so I'll try a simple version first.",
    ],
  },
  zh: {
    followUp: [
      "这个观点很有意思，你最开始是怎么对它产生兴趣的？",
      "我想更理解你的角度，这件事对你来说最重要的点是什么？",
      "你是从什么时候开始意识到自己在意这个话题的？",
      "如果要讲给一个完全不了解的人听，你会从哪里开始说？",
    ],
    clarify: [
      "我确认一下我有没有理解对：你的意思是重点在于……对吗？",
      "你能不能举个小例子？这样我应该会更容易跟上。",
      "这里我有个细节没听明白，你说的是现在的情况，还是以前的经历？",
      "我可以打断一下吗？词我大概懂，但我想确认一下语气和细微含义。",
    ],
    share: [
      "这让我想到一个类似的经历，我可以快速分享一下吗？",
      "我对这件事的经历有点不一样，但我觉得和你说的有关。",
      "对我来说，最意外的是这件事其实很受文化和时机影响。",
      "我第一反应是同意你，但有一个小细节让我有点犹豫。",
    ],
    bridge: [
      "这个刚好可以接到另一个问题：你身边的人一般怎么看这件事？",
      "我们可以再聊深一点，你觉得大多数人最容易误解它的地方是什么？",
      "这让我想到一个更大的问题：你的看法有随着时间改变过吗？",
      "我们要不要比较一下两种文化里的差异？我感觉答案会很不一样。",
    ],
    rescue: [
      "给我几秒钟组织一下语言，我知道自己想表达什么。",
      "我一下子想不起那个准确的词，但我想描述的感觉是……",
      "这个问题很好。简单说是同意，但原因有点复杂。",
      "我不确定怎么说得特别准确，所以我先用简单的方式讲一遍。",
    ],
  },
};

// Track which quests have been used to avoid repeats
let usedQuestIndices: number[] = [];
let questionRefreshCount = 0;

const interestQuestionProfiles: Record<string, { challenges: string[]; questions: string[] }> = {
  music: {
    challenges: ["soundtrack", "live", "lyrics"],
    questions: ["Which song best captures a chapter of your life?", "What live music experience would you relive tomorrow?"],
  },
  movies: {
    challenges: ["cinematic", "plot twist", "director"],
    questions: ["Which film changed the way you see the world?", "What scene would you want to experience in person?"],
  },
  anime: {
    challenges: ["character arc", "opening", "world-building"],
    questions: ["Which anime character would make the best travel companion?", "What fictional world would you spend a year exploring?"],
  },
  travel: {
    challenges: ["hidden gem", "culture", "road trip"],
    questions: ["Which destination changed your view of everyday life?", "What local experience belongs on everyone's travel list?"],
  },
  food: {
    challenges: ["street food", "spicy", "comfort food"],
    questions: ["Which dish carries the strongest memory from your childhood?", "What food would you serve to introduce someone to your culture?"],
  },
  coffee: {
    challenges: ["brew", "ritual", "cafe"],
    questions: ["What is your ideal coffee ritual and where did it come from?", "Which cafe would you visit first in a new city?"],
  },
  gaming: {
    challenges: ["multiplayer", "boss fight", "strategy"],
    questions: ["Which game world would you choose for a real weekend getaway?", "What gaming moment made you unexpectedly emotional?"],
  },
  sports: {
    challenges: ["competition", "teamwork", "comeback"],
    questions: ["Which sporting moment still gives you chills?", "What does your favorite sport teach you about teamwork?"],
  },
  books: {
    challenges: ["protagonist", "page-turner", "imagery"],
    questions: ["Which book would you give to someone who wants to understand you?", "What fictional place would you most like to visit?"],
  },
  photography: {
    challenges: ["composition", "light", "perspective"],
    questions: ["What moment do you wish you had photographed perfectly?", "How has taking photos changed the way you notice places?"],
  },
  art: {
    challenges: ["texture", "gallery", "expression"],
    questions: ["What artwork would you hang in the room where you spend most of your time?", "Where do you notice art in ordinary life?"],
  },
  tech: {
    challenges: ["innovation", "future", "digital"],
    questions: ["Which technology has most changed your daily routine?", "What future invention would genuinely improve your life?"],
  },
};

function buildRefreshQuestions(topic: string, interests: string[]): string[] {
  const refreshIndex = questionRefreshCount++;
  const specificQuestions = interests.map((interest) => {
    const profile = interestQuestionProfiles[interest.toLocaleLowerCase()];
    return profile?.questions[refreshIndex % profile.questions.length]
      ?? `What is something about ${interest} that you have learned only through experience?`;
  });
  const variants = [
    `What is the first story that comes to mind when you think about ${topic}?`,
    `What is one detail about ${topic} that most people would find surprising?`,
    `How would you introduce ${topic} to someone who knows nothing about it?`,
    `What is your strongest opinion about ${topic}, and what shaped it?`,
    `If you could change one thing about ${topic}, what would it be?`,
    `What does ${topic} look like in your everyday life?`,
    `What question about ${topic} do you wish people asked you more often?`,
    `Where do you hope your relationship with ${topic} goes next?`,
  ];
  const crossQuestions = interests.slice(0, -1).map(
    (interest, index) => `What unexpected connection do you see between ${interest} and ${interests[index + 1]}?`
  );
  const offset = (refreshIndex * 3) % variants.length;
  return [...specificQuestions, ...crossQuestions, ...variants.slice(offset), ...variants.slice(0, offset)].slice(0, 5);
}

const questIndicesByInterest: Record<string, number[]> = {
  music: [0],
  food: [1],
  coffee: [1],
  movies: [2],
  anime: [2],
  travel: [3],
  photography: [3],
  gaming: [4],
  sports: [4],
  books: [5],
  art: [6],
  tech: [7],
};

function buildInterestQuest(interest: string, interests: string[], template?: QuestCard): QuestCard {
  if (interests.length > 1) {
    const combinedTopic = interests.join(" × ");
    const profiles = interests.map((item) => interestQuestionProfiles[item.toLocaleLowerCase()]);
    const primaryChallenges = profiles.map((profile) => profile?.challenges[0]).filter(Boolean) as string[];
    const extraChallenges = profiles.flatMap((profile) => profile?.challenges.slice(1) ?? []);
    const profileQuestions = interests.map((item, index) =>
      profiles[index]?.questions[0] ?? `What is a moment that made ${item} personally meaningful to you?`
    );
    const [first, second] = interests;
    const crossQuestion = `How do ${first} and ${second} influence each other in your life?`;
    const fallbackQuestions = [
      `What specific memory connects ${first} with ${second}?`,
      `If you combined ${combinedTopic} into one experience, what would it look like?`,
    ];

    return {
      topic: `${combinedTopic} — a crossover conversation adventure`,
      challenges: [...new Set([...primaryChallenges, ...extraChallenges, "connection", "perspective"])].slice(0, 7),
      questions: [...profileQuestions, crossQuestion, ...fallbackQuestions].slice(0, 5),
      interests: [...interests],
    };
  }

  if (template) {
    const topicAlreadyIncludesInterest = template.topic
      .toLocaleLowerCase()
      .includes(interest.toLocaleLowerCase());

    return {
      ...template,
      topic: topicAlreadyIncludesInterest
        ? template.topic
        : `${interest} — ${template.topic}`,
      interests: [...interests],
    };
  }

  return {
    topic: `${interest} — stories, opinions, and unexpected discoveries`,
    challenges: ["memorable", "perspective", "recommend", "experience", "inspire", "surprising", "passionate"],
    questions: [
      `What first made you interested in ${interest}?`,
      `What's your most memorable experience related to ${interest}?`,
      `What would you recommend to someone who is new to ${interest}?`,
      `How has your opinion about ${interest} changed over time?`,
      `What do you think most people misunderstand about ${interest}?`,
    ],
    interests: [...interests],
  };
}

function pickRandomQuest(interests: string[]): QuestCard {
  const selectedInterest = interests[Math.floor(Math.random() * interests.length)] ?? "Free Talk";
  const matchingIndices = questIndicesByInterest[selectedInterest.toLocaleLowerCase()];

  // A free-form interest gets a tailored card instead of an unrelated preset.
  if (selectedInterest && !matchingIndices) {
    return buildInterestQuest(selectedInterest, interests);
  }

  const candidateIndices = matchingIndices ?? mockQuestBank.map((_, i) => i);
  let availableIndices = candidateIndices.filter((i) => !usedQuestIndices.includes(i));

  if (availableIndices.length === 0) {
    usedQuestIndices = usedQuestIndices.filter((i) => !candidateIndices.includes(i));
    availableIndices = [...candidateIndices];
  }

  const randomIndex =
    availableIndices[Math.floor(Math.random() * availableIndices.length)];
  usedQuestIndices.push(randomIndex);

  return buildInterestQuest(selectedInterest, interests, mockQuestBank[randomIndex]);
}

function buildCustomQuest(topic: string, questions: string[], interests: string[]): QuestCard {
  const cleanQuestions = questions.map((q) => q.trim()).filter(Boolean);
  return {
    topic: topic.trim() || "Free Talk",
    challenges: ["free style", "improvise", "deep dive", "open mic", "off script", "wild card", "unplugged"],
    questions:
      cleanQuestions.length > 0
        ? cleanQuestions
        : ["Tell me anything on your mind about this topic."],
    interests: [...interests],
    isCustom: true,
  };
}

// Shared user and pet growth thresholds (cumulative XP).
export const LEVEL_XP_THRESHOLDS = [0, 100, 400, 900, 1600] as const;
export const XP_PER_STUDY_MINUTE = 1;
export const FULL_LEVEL_TARGET_DAYS = 30;
export const DAILY_XP_TARGET = Math.ceil(LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1] / FULL_LEVEL_TARGET_DAYS);

function getLevelFromXP(xp: number): number {
  for (let index = LEVEL_XP_THRESHOLDS.length - 1; index >= 0; index--) {
    if (xp >= LEVEL_XP_THRESHOLDS[index]) return index + 1;
  }
  return 1;
}

export function getPetLevel(xp: number): number {
  return getLevelFromXP(xp);
}

export function getPetStage(level: number): number {
  if (level <= 1) return 0;
  if (level === 2) return 1;
  if (level === 3) return 2;
  if (level === 4) return 3;
  return 4;
}

export function getPetProgress(xp: number): number {
  return getLevelInfo(xp).progress;
}

// Player level helpers
function getPlayerLevel(xp: number): number {
  return getLevelFromXP(xp);
}

// Helper: get today's date as YYYY-MM-DD string
function getTodayDateStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Helper: check if two date strings are consecutive days
function isConsecutiveDay(previousDateStr: string, currentDateStr: string): boolean {
  const prev = new Date(previousDateStr + "T00:00:00");
  const curr = new Date(currentDateStr + "T00:00:00");
  const diffMs = curr.getTime() - prev.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

// Helper: compute level from totalXP
function computeLevelFromXP(xp: number): number {
  return getPlayerLevel(xp);
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      uiLanguage: "en",

      interests: [],
      questCard: null,
      isGenerating: false,
      customTimeMinutes: 30,

      useCustomTopic: false,
      customTopic: "",
      customQuestions: [],

      talkSession: {
        currentLanguage: "en",
        elapsedSeconds: 0,
        totalSeconds: 1800,
        isEnglishPhase: true,
        isPaused: false,
        xp: 0,
        badge: null,
        enSeconds: 0,
        zhSeconds: 0,
        wordsUsed: 0,
        player1Words: 0,
        player2Words: 0,
      },
      isSettled: false,

      pet: {
        xp: 0,
        totalSessions: 0,
        totalMinutes: 0,
      },

      reviews: [],

      // --- New state fields ---
      vocabulary: [],
      player1: {
        name: "Player 1",
        color: "#4F46E5",
        xp: 0,
        wordsLearned: 0,
      },
      player2: {
        name: "Player 2",
        color: "#EC4899",
        xp: 0,
        wordsLearned: 0,
      },
      streak: 0,
      lastQuestDate: null,
      totalXP: 0,
      level: 1,
      achievements: createDefaultAchievements(),
      questHistory: [],

      // --- Existing actions ---

      setUiLanguage: (lang) => set({ uiLanguage: lang }),

      setInterests: (interests) => set({ interests }),

      generateQuest: async () => {
        set({ isGenerating: true });
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const state = get();
        let card: QuestCard;
        if (state.useCustomTopic && state.customTopic.trim()) {
          card = buildCustomQuest(state.customTopic, state.customQuestions, state.interests);
        } else {
          card = pickRandomQuest(state.interests);
        }
        set({ questCard: card, isGenerating: false });
      },

      refreshQuest: async () => {
        set({ isGenerating: true });
        await new Promise((resolve) => setTimeout(resolve, 1200));
        const state = get();
        let card: QuestCard;
        if (state.useCustomTopic && state.customTopic.trim()) {
          card = buildCustomQuest(state.customTopic, state.customQuestions, state.interests);
        } else {
          card = pickRandomQuest(state.interests);
        }
        set({ questCard: card, isGenerating: false });
      },

      refreshQuestions: () => {
        const state = get();
        if (!state.questCard) return;
        set({ questCard: { ...state.questCard, questions: buildRefreshQuestions(state.questCard.topic, state.questCard.interests) } });
      },

      setCustomTime: (minutes) =>
        set({
          customTimeMinutes: Math.max(1, Math.min(180, Math.round(minutes))),
        }),

      setQuestCard: (card) => set({ questCard: card }),

      setUseCustomTopic: (v) => set({ useCustomTopic: v }),
      setCustomTopic: (topic) => set({ customTopic: topic }),
      setCustomQuestions: (qs) => set({ customQuestions: qs }),

      startTalk: () => {
        const totalSeconds = get().customTimeMinutes * 60;
        set({
          talkSession: {
            currentLanguage: "en",
            elapsedSeconds: 0,
            totalSeconds,
            isEnglishPhase: true,
            isPaused: false,
            xp: 0,
            badge: null,
            enSeconds: 0,
            zhSeconds: 0,
            wordsUsed: 0,
            player1Words: 0,
            player2Words: 0,
          },
          isSettled: false,
        });
      },

      updateTalkSession: (partial) =>
        set((state) => ({
          talkSession: { ...state.talkSession, ...partial },
        })),

      togglePause: () =>
        set((state) => ({
          talkSession: { ...state.talkSession, isPaused: !state.talkSession.isPaused },
        })),

      toggleLanguage: () =>
        set((state) => {
          const newLang = state.talkSession.currentLanguage === "en" ? "zh" : "en";
          return {
            talkSession: {
              ...state.talkSession,
              currentLanguage: newLang,
              isEnglishPhase: newLang === "en",
            },
          };
        }),

      setLanguage: (lang) =>
        set((state) => ({
          talkSession: {
            ...state.talkSession,
            currentLanguage: lang,
            isEnglishPhase: lang === "en",
          },
        })),

      settleTalk: () => {
        const state = get();
        const ts = state.talkSession;
        const durationMinutes = Math.max(1, Math.floor(ts.elapsedSeconds / 60));
        const xpGained = durationMinutes * XP_PER_STUDY_MINUTE;

        // --- Pet XP ---
        const newPetXp = state.pet.xp + xpGained;
        const petLevelAfter = getPetLevel(newPetXp);

        // --- Total XP & Level ---
        const newTotalXP = state.totalXP + xpGained;
        const newLevel = computeLevelFromXP(newTotalXP);

        // --- Dual player XP (split evenly) ---
        const xpPerPlayer = Math.floor(xpGained / 2);
        const player1XP = state.player1.xp + xpPerPlayer;
        const player2XP = state.player2.xp + xpPerPlayer;

        // --- Vocabulary collection from used words ---
        const topicWords = (state.questCard?.topic ?? "").split(/\s+/).filter((w) => w.length > 2);
        const challengeWords = (state.questCard?.challenges ?? []).flatMap((c) => c.split(/\s+/).filter((w) => w.length > 2));
        const allNewWords = [...new Set([...topicWords, ...challengeWords])];

        const existingWordSet = new Set(state.vocabulary.map((v) => v.word.toLowerCase()));
        const newVocabItems: VocabItem[] = allNewWords
          .filter((w) => !existingWordSet.has(w.toLowerCase()))
          .map((w) => ({
            word: w,
            learnedAt: Date.now(),
            questTopic: state.questCard?.topic ?? "",
            mastered: false,
            reviewCount: 0,
            lastReviewed: 0,
          }));

        const updatedVocabulary = [...state.vocabulary, ...newVocabItems];

        // --- Streak update ---
        const todayStr = getTodayDateStr();
        let newStreak = state.streak;
        if (state.lastQuestDate) {
          if (state.lastQuestDate === todayStr) {
            // Same day — no streak change
          } else if (isConsecutiveDay(state.lastQuestDate, todayStr)) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        // --- Quest history entry ---
        const historyEntry: QuestHistoryEntry = {
          id: Date.now().toString(),
          date: Date.now(),
          topic: state.questCard?.topic ?? "",
          durationMinutes,
          xpGained,
          wordsUsed: ts.wordsUsed,
        };

        // --- Create review record ---
        const review: ReviewRecord = {
          id: Date.now().toString(),
          date: Date.now(),
          topic: state.questCard?.topic ?? "",
          questions: state.questCard?.questions ?? [],
          challenges: state.questCard?.challenges ?? [],
          durationMinutes,
          enMinutes: Math.floor(ts.enSeconds / 60),
          zhMinutes: Math.floor(ts.zhSeconds / 60),
          xp: xpGained,
          petXpGained: xpGained,
          petLevelAfter,
          notes: "",
        };

        // --- Set all state updates ---
        set({
          talkSession: { ...ts, xp: xpGained, badge: "Icebreaker Pioneers" },
          isSettled: true,
          pet: {
            xp: newPetXp,
            totalSessions: state.pet.totalSessions + 1,
            totalMinutes: state.pet.totalMinutes + durationMinutes,
          },
          reviews: [review, ...state.reviews].slice(0, 30),
          totalXP: newTotalXP,
          level: newLevel,
          player1: {
            ...state.player1,
            xp: player1XP,
            wordsLearned: state.player1.wordsLearned + ts.player1Words,
          },
          player2: {
            ...state.player2,
            xp: player2XP,
            wordsLearned: state.player2.wordsLearned + ts.player2Words,
          },
          vocabulary: updatedVocabulary,
          streak: newStreak,
          lastQuestDate: todayStr,
          questHistory: [historyEntry, ...state.questHistory].slice(0, 50),
        });

        // --- Check achievements after state is updated ---
        get().checkAchievements();
      },

      updateReviewNote: (id, notes) =>
        set((state) => ({
          reviews: state.reviews.map((r) => (r.id === id ? { ...r, notes } : r)),
        })),

      resetAll: () =>
        set({
          interests: [],
          questCard: null,
          isGenerating: false,
          talkSession: {
            currentLanguage: "en",
            elapsedSeconds: 0,
            totalSeconds: get().customTimeMinutes * 60,
            isEnglishPhase: true,
            isPaused: false,
            xp: 0,
            badge: null,
            enSeconds: 0,
            zhSeconds: 0,
            wordsUsed: 0,
            player1Words: 0,
            player2Words: 0,
          },
          isSettled: false,
        }),

      // --- New actions ---

      setPlayer1: (partial) =>
        set((state) => ({
          player1: { ...state.player1, ...partial },
        })),

      setPlayer2: (partial) =>
        set((state) => ({
          player2: { ...state.player2, ...partial },
        })),

      addVocabulary: (word, questTopic) =>
        set((state) => {
          const exists = state.vocabulary.some(
            (v) => v.word.toLowerCase() === word.toLowerCase()
          );
          if (exists) return state;
          const newItem: VocabItem = {
            word,
            learnedAt: Date.now(),
            questTopic,
            mastered: false,
            reviewCount: 0,
            lastReviewed: 0,
          };
          return { vocabulary: [...state.vocabulary, newItem] };
        }),

      markWordMastered: (word) =>
        set((state) => ({
          vocabulary: state.vocabulary.map((v) =>
            v.word.toLowerCase() === word.toLowerCase()
              ? { ...v, mastered: true }
              : v
          ),
        })),

      reviewWord: (word) =>
        set((state) => ({
          vocabulary: state.vocabulary.map((v) =>
            v.word.toLowerCase() === word.toLowerCase()
              ? { ...v, reviewCount: v.reviewCount + 1, lastReviewed: Date.now() }
              : v
          ),
        })),

      updateStreak: () => {
        const state = get();
        const todayStr = getTodayDateStr();
        let newStreak = state.streak;

        if (state.lastQuestDate) {
          if (state.lastQuestDate === todayStr) {
            // Same day — no change
          } else if (isConsecutiveDay(state.lastQuestDate, todayStr)) {
            newStreak += 1;
          } else {
            newStreak = 1;
          }
        } else {
          newStreak = 1;
        }

        set({
          streak: newStreak,
          lastQuestDate: todayStr,
        });
      },

      checkAchievements: () => {
        const state = get();
        const now = Date.now();
        const updatedAchievements = state.achievements.map((a) => {
          // Already unlocked — skip
          if (a.unlockedAt !== null) return a;

          let current = a.current;
          let shouldUnlock = false;

          switch (a.id) {
            case "first_quest":
            case "quest_5":
            case "quest_10":
            case "quest_25":
              current = state.pet.totalSessions;
              shouldUnlock = current >= a.requirement;
              break;
            case "streak_3":
            case "streak_7":
            case "streak_30":
              current = state.streak;
              shouldUnlock = current >= a.requirement;
              break;
            case "words_50":
            case "words_200":
              current = state.vocabulary.length;
              shouldUnlock = current >= a.requirement;
              break;
            case "level_5":
              current = state.level;
              shouldUnlock = current >= a.requirement;
              break;
          }

          return {
            ...a,
            current,
            unlockedAt: shouldUnlock ? now : null,
          };
        });

        set({ achievements: updatedAchievements });
      },

      useWord: (player) =>
        set((state) => {
          const session = state.talkSession;
          const isPlayer1 = player === 1;
          return {
            talkSession: {
              ...session,
              wordsUsed: session.wordsUsed + 1,
              player1Words: isPlayer1 ? session.player1Words + 1 : session.player1Words,
              player2Words: !isPlayer1 ? session.player2Words + 1 : session.player2Words,
            },
          };
        }),
    }),
    {
      name: "talkquest-storage",

      onRehydrateStorage: () => (state) => {
        if (!state) return;

        // Use a safe cast through unknown to work with raw persisted state
        const rawState = state as unknown as Record<string, unknown>;

        // New field defaults
        if (!rawState.vocabulary) rawState.vocabulary = [];
        if (!rawState.player1) {
          rawState.player1 = {
            name: "Player 1",
            color: "#4F46E5",
            xp: 0,
            wordsLearned: 0,
          };
        }
        if (!rawState.player2) {
          rawState.player2 = {
            name: "Player 2",
            color: "#EC4899",
            xp: 0,
            wordsLearned: 0,
          };
        }
        if (typeof rawState.streak !== "number") rawState.streak = 0;
        if (!rawState.lastQuestDate) rawState.lastQuestDate = null;
        if (typeof rawState.totalXP !== "number") rawState.totalXP = 0;
        rawState.level = computeLevelFromXP(rawState.totalXP as number);
        if (!rawState.achievements) rawState.achievements = createDefaultAchievements();
        if (!rawState.questHistory) rawState.questHistory = [];

        // Ensure talkSession has new word-tracking fields
        const ts = rawState.talkSession as Record<string, unknown> | undefined;
        if (ts) {
          if (typeof ts.wordsUsed !== "number") ts.wordsUsed = 0;
          if (typeof ts.player1Words !== "number") ts.player1Words = 0;
          if (typeof ts.player2Words !== "number") ts.player2Words = 0;
        }
      },

      partialize: (state) => ({
        uiLanguage: state.uiLanguage,
        interests: state.interests,
        questCard: state.questCard,
        isSettled: state.isSettled,
        customTimeMinutes: state.customTimeMinutes,
        useCustomTopic: state.useCustomTopic,
        customTopic: state.customTopic,
        customQuestions: state.customQuestions,
        pet: state.pet,
        reviews: state.reviews,
        vocabulary: state.vocabulary,
        player1: state.player1,
        player2: state.player2,
        streak: state.streak,
        lastQuestDate: state.lastQuestDate,
        totalXP: state.totalXP,
        level: state.level,
        achievements: state.achievements,
        questHistory: state.questHistory,
      }),
    }
  )
);

// Export mock SOS data getter
export function getSOSSuggestions(language: "en" | "zh", question?: string): string[] {
  const categories = Object.values(mockSOSBank[language]);
  const shuffledCategories = [...categories].sort(() => Math.random() - 0.5);

  const suggestions = shuffledCategories.slice(0, 3).map((sentences) => {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    return sentences[randomIndex];
  });
  if (!question) return suggestions;
  return suggestions;
}


// Export level info helper
export function getLevelInfo(totalXP: number): {
  level: number;
  currentXP: number;
  levelXP: number;
  nextLevelXP: number;
  progress: number;
} {
  const level = getLevelFromXP(totalXP);
  const maxXP = LEVEL_XP_THRESHOLDS[LEVEL_XP_THRESHOLDS.length - 1];
  if (level >= LEVEL_XP_THRESHOLDS.length) {
    return { level, currentXP: Math.min(totalXP, maxXP), levelXP: maxXP, nextLevelXP: maxXP, progress: 1 };
  }
  const levelStartXP = LEVEL_XP_THRESHOLDS[level - 1];
  const nextLevelXP = LEVEL_XP_THRESHOLDS[level];
  const progress = (totalXP - levelStartXP) / (nextLevelXP - levelStartXP);
  return { level, currentXP: totalXP, levelXP: nextLevelXP, nextLevelXP, progress };
}
