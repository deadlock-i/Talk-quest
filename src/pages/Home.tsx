import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Plus, X, ArrowRight, Gamepad2, Users, Zap,
  BookOpen, Trophy, Flame, Star, ChevronRight, Crown,
} from "lucide-react";
import { useStore, getLevelInfo } from "@/store/useStore";
import PetPrototypeGallery from "@/components/PetPrototypeGallery";

const suggestedInterests = [
  "Music", "Movies", "Travel", "Food", "Gaming",
  "Books", "Sports", "Anime", "Photography", "Tech", "Art", "Coffee",
];

const playerColors = ["#00e5ff", "#ff5ebc", "#ffd700", "#00e676", "#ff9500", "#b967ff"];

export default function Home() {
  const navigate = useNavigate();
  const {
    interests, setInterests, generateQuest, isGenerating,
    player1, player2, setPlayer1, setPlayer2,
    streak, totalXP, vocabulary, achievements,
  } = useStore();

  const [input, setInput] = useState("");
  const [showPlayerSetup, setShowPlayerSetup] = useState(false);

  const levelInfo = getLevelInfo(totalXP);
  const unlockedCount = achievements.filter((a) => a.unlockedAt).length;

  const addInterest = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && interests.length < 5 && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setInput("");
    }
  };

  const removeInterest = (value: string) => {
    setInterests(interests.filter((i) => i !== value));
  };

  const handleGenerate = async () => {
    if (interests.length === 0) return;
    await generateQuest();
    navigate("/quest");
  };

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Floating decorative orbs - more vibrant */}
      <div className="absolute top-10 left-5 w-80 h-80 bg-quest-primary/15 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-5 w-96 h-96 bg-quest-pink/15 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-quest-purple/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-5 py-8 min-h-screen flex flex-col">
        {/* Gamification Header Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-quest-primary to-quest-purple flex items-center justify-center shadow-lg shadow-quest-primary/30">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-quest-gold flex items-center justify-center text-[10px] font-display font-black text-quest-bg">
                {levelInfo.level}
              </div>
            </div>
            <div>
              <div className="font-display text-sm font-bold text-white">Lv.{levelInfo.level}</div>
              <div className="w-24 h-2 rounded-full bg-quest-surface overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-quest-primary to-quest-purple"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelInfo.progress * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/vocabulary")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass hover:bg-quest-card/60 transition-all"
            >
              <BookOpen className="w-4 h-4 text-quest-primary" />
              <span className="text-xs font-body font-semibold text-white">{vocabulary.length}</span>
            </button>
            <button
              onClick={() => navigate("/achievements")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass hover:bg-quest-card/60 transition-all"
            >
              <Trophy className="w-4 h-4 text-quest-gold" />
              <span className="text-xs font-body font-semibold text-white">{unlockedCount}</span>
            </button>
          </div>
        </motion.div>

        {/* Streak Banner */}
        {streak > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <div className="glass rounded-2xl px-4 py-3 flex items-center justify-between border border-quest-sos/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-quest-sos to-quest-gold flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-display text-lg font-black text-white">{streak} Day Streak!</div>
                  <div className="text-xs font-body text-quest-dim">Keep the momentum going!</div>
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(streak, 7) }).map((_, i) => (
                  <div key={i} className="w-3 h-8 rounded-full bg-gradient-to-t from-quest-sos to-quest-gold" />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Logo & Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full glass border border-quest-primary/30">
            <Sparkles className="w-4 h-4 text-quest-primary" />
            <span className="text-xs font-body tracking-wider text-quest-dim uppercase font-semibold">Quest Protocol v2.0</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight mb-3">
            <span className="gradient-text">Talk</span>
            <span className="text-white">Quest</span>
          </h1>
          <p className="hero-subtitle font-body text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Turn small talk into <span className="text-quest-primary neon-text font-bold">big quests</span>. A co-op language adventure for two.
          </p>
        </motion.div>

        <PetPrototypeGallery />

        {/* Player Setup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong rounded-3xl p-6 mb-6 border border-quest-purple/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-quest-purple/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-quest-purple" />
              </div>
              <div>
                <h2 className="font-display text-lg font-bold text-white">Team Setup</h2>
                <p className="text-xs text-quest-dim font-body">Customize your duo</p>
              </div>
            </div>
            <button
              onClick={() => setShowPlayerSetup(!showPlayerSetup)}
              className="chrome-button text-xs font-body text-quest-primary hover:text-white transition-colors"
            >
              {showPlayerSetup ? "Done" : "Edit"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Player 1 */}
            <div className="glass rounded-2xl p-4 border" style={{ borderColor: `${player1.color}40` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${player1.color}30` }}>
                  <span className="font-display text-sm font-bold" style={{ color: player1.color }}>P1</span>
                </div>
                <span className="font-body text-sm font-semibold text-white">{player1.name}</span>
              </div>
              <AnimatePresence>
                {showPlayerSetup && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <input
                      type="text"
                      value={player1.name}
                      onChange={(e) => setPlayer1({ name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-quest-bg/60 border border-quest-border text-sm text-white font-body focus:outline-none focus:border-quest-primary/60"
                      placeholder="Name"
                    />
                    <div className="flex gap-1.5 flex-wrap">
                      {playerColors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setPlayer1({ color: c })}
                          className="w-6 h-6 rounded-full border-2 transition-all"
                          style={{
                            backgroundColor: c,
                            borderColor: player1.color === c ? "white" : "transparent",
                            transform: player1.color === c ? "scale(1.2)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Player 2 */}
            <div className="glass rounded-2xl p-4 border" style={{ borderColor: `${player2.color}40` }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${player2.color}30` }}>
                  <span className="font-display text-sm font-bold" style={{ color: player2.color }}>P2</span>
                </div>
                <span className="font-body text-sm font-semibold text-white">{player2.name}</span>
              </div>
              <AnimatePresence>
                {showPlayerSetup && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <input
                      type="text"
                      value={player2.name}
                      onChange={(e) => setPlayer2({ name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-quest-bg/60 border border-quest-border text-sm text-white font-body focus:outline-none focus:border-quest-primary/60"
                      placeholder="Name"
                    />
                    <div className="flex gap-1.5 flex-wrap">
                      {playerColors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setPlayer2({ color: c })}
                          className="w-6 h-6 rounded-full border-2 transition-all"
                          style={{
                            backgroundColor: c,
                            borderColor: player2.color === c ? "white" : "transparent",
                            transform: player2.color === c ? "scale(1.2)" : "scale(1)",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Interest Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-strong rounded-3xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-quest-primary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-quest-primary" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">Sync Your Interests</h2>
              <p className="text-xs text-quest-dim font-body">Pick 1-5 shared topics to generate your quest</p>
            </div>
          </div>

          {/* Interest tags */}
          <div className="flex flex-wrap gap-2 mb-4 min-h-[44px]">
            <AnimatePresence>
              {interests.map((interest) => (
                <motion.div
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-quest-primary/20 to-quest-purple/20 border border-quest-primary/40"
                >
                  <span className="text-sm font-body text-white font-semibold">{interest}</span>
                  <button onClick={() => removeInterest(interest)} className="chrome-button opacity-60 hover:opacity-100 transition-opacity">
                    <X className="w-3.5 h-3.5 text-quest-primary" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Input field */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInterest(input);
                }
              }}
              placeholder="Type an interest and press Enter..."
              className="flex-1 px-4 py-3 rounded-xl bg-quest-bg/60 border border-quest-border text-white font-body placeholder-quest-muted/50 focus:outline-none focus:border-quest-primary/60 focus:ring-2 focus:ring-quest-primary/20 transition-all text-sm"
              disabled={interests.length >= 5}
            />
            <button
              onClick={() => addInterest(input)}
              disabled={!input.trim() || interests.length >= 5}
              className="px-4 py-3 rounded-xl bg-quest-primary/20 border border-quest-primary/40 text-quest-primary hover:bg-quest-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Suggested interests */}
          <div className="flex flex-wrap gap-2">
            {suggestedInterests
              .filter((s) => !interests.includes(s))
              .slice(0, 8)
              .map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => addInterest(suggestion)}
                  disabled={interests.length >= 5}
                  className="px-3 py-1.5 rounded-lg bg-quest-card/60 border border-quest-border/60 text-xs font-body text-quest-dim hover:text-white hover:border-quest-primary/40 transition-all disabled:opacity-30"
                >
                  + {suggestion}
                </button>
              ))}
          </div>
        </motion.div>

        {/* Generate Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onClick={handleGenerate}
          disabled={interests.length === 0 || isGenerating}
          className="group relative w-full py-5 rounded-2xl font-display text-lg font-bold tracking-wide overflow-hidden transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          whileHover={{ scale: interests.length > 0 && !isGenerating ? 1.02 : 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-quest-primary via-quest-purple to-quest-pink bg-[length:200%_100%] group-hover:animate-shimmer" />
          <div className="absolute inset-0 bg-gradient-to-r from-quest-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center justify-center gap-3 text-quest-bg">
            {isGenerating ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                Generating Your Quest...
              </>
            ) : (
              <>
                <Gamepad2 className="w-5 h-5" />
                Generate Quest Card
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </motion.button>

        {/* Feature hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-3 gap-3"
        >
          {[
            { icon: Gamepad2, label: "Quest Card", desc: "AI topics + 7 words", color: "text-quest-primary" },
            { icon: Zap, label: "50/50 Timer", desc: "Fair language split", color: "text-quest-purple" },
            { icon: BookOpen, label: "Word Bank", desc: `${vocabulary.length} words learned`, color: "text-quest-pink" },
          ].map((feature) => (
            <div key={feature.label} className="glass rounded-2xl p-4 text-center card-hover">
              <feature.icon className={`w-5 h-5 ${feature.color} mx-auto mb-2`} />
              <div className="text-xs font-display font-bold text-white">{feature.label}</div>
              <div className="text-[10px] text-quest-dim font-body mt-0.5">{feature.desc}</div>
            </div>
          ))}
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="sky-copy mt-6 flex items-center justify-center gap-6 text-xs font-body text-quest-dim"
        >
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-quest-primary" />
            <span>{totalXP} XP Total</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-quest-pink" />
            <span>{vocabulary.length} Words</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-quest-gold" />
            <span>{unlockedCount} Badges</span>
          </div>
        </motion.div>

        <div className="flex-1" />
        <p className="sky-copy text-center text-xs text-quest-muted font-body mt-6">
          Co-op Language Exchange · Empower Social, Don't Replace It
        </p>
      </div>
    </div>
  );
}
