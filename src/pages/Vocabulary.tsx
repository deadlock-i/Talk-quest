import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  CheckCircle2,
  RefreshCw,
  Star,
  Zap,
} from "lucide-react";
import { useStore, VocabItem } from "@/store/useStore";
import { useT } from "@/i18n/translations";

export default function Vocabulary() {
  const navigate = useNavigate();
  const t = useT();

  const vocabulary = useStore((s) => s.vocabulary);
  const markWordMastered = useStore((s) => s.markWordMastered);
  const reviewWord = useStore((s) => s.reviewWord);

  const totalCount = vocabulary.length;
  const masteredWords = useMemo(
    () => vocabulary.filter((w) => w.mastered),
    [vocabulary]
  );
  const reviewWords = useMemo(
    () => vocabulary.filter((w) => !w.mastered),
    [vocabulary]
  );

  const masteredCount = masteredWords.length;
  const reviewCount = reviewWords.length;

  const tagColors = [
    "bg-quest-primary/20 border-quest-primary/40 text-quest-primary",
    "bg-quest-accent/20 border-quest-accent/40 text-quest-accent",
    "bg-quest-gold/20 border-quest-gold/40 text-quest-gold",
    "bg-quest-primaryLight/20 border-quest-primaryLight/40 text-quest-primaryLight",
    "bg-quest-accentLight/20 border-quest-accentLight/40 text-quest-accentLight",
    "bg-quest-sos/20 border-quest-sos/40 text-quest-sos",
  ];

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-quest-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-quest-accent/10 rounded-full blur-3xl animate-float" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-quest-dim hover:text-quest-text text-sm font-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass">
            <BookOpen className="w-4 h-4 text-quest-primary" />
            <span className="text-xs font-body tracking-wider text-quest-dim uppercase">
              {t("vocab.title")}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-black tracking-tight mb-2">
            <span className="gradient-text">{t("vocab.title")}</span>
          </h1>
          <p className="font-body text-quest-dim text-sm">
            {t("vocab.subtitle")}
          </p>
        </motion.div>

        {/* Empty state */}
        {totalCount === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-3xl p-10 text-center mb-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-quest-card/60 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-quest-muted" />
            </div>
            <h3 className="font-display text-lg font-bold text-quest-text mb-1">
              {t("vocab.empty")}
            </h3>
            <p className="text-xs font-body text-quest-dim max-w-xs mx-auto">
              {t("vocab.emptyDesc")}
            </p>
          </motion.div>
        )}

        {/* Stats row */}
        {totalCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-3 gap-3 mb-5"
          >
            <div className="glass rounded-2xl p-4 text-center">
              <Zap className="w-5 h-5 text-quest-primary mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-quest-text">
                {totalCount}
              </div>
              <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider">
                {t("vocab.total")}
              </div>
            </div>
            <div className="glass rounded-2xl p-4 text-center">
              <CheckCircle2 className="w-5 h-5 text-quest-accent mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-quest-accent">
                {masteredCount}
              </div>
              <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider">
                {t("vocab.mastered")}
              </div>
            </div>
            <div className="glass rounded-2xl p-4 text-center">
              <Brain className="w-5 h-5 text-quest-primary mx-auto mb-2" />
              <div className="font-display text-2xl font-bold text-quest-primary">
                {reviewCount}
              </div>
              <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider">
                {t("vocab.review")}
              </div>
            </div>
          </motion.div>
        )}

        {/* Review list */}
        {reviewWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="glass-strong rounded-3xl p-6 mb-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-5 h-5 text-quest-primary" />
              <h2 className="font-display text-lg font-bold text-quest-text">
                {t("vocab.review")}
              </h2>
              <span className="ml-auto px-2 py-0.5 rounded-full bg-quest-primary/15 text-[10px] font-body font-bold text-quest-primary">
                {reviewCount}
              </span>
            </div>

            <AnimatePresence>
              {reviewWords.map((word: VocabItem, i: number) => (
                <motion.div
                  key={word.word}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center justify-between p-3 rounded-xl bg-quest-card/40 border border-quest-border/40 hover:border-quest-primary/30 transition-colors mb-2 last:mb-0"
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-display text-sm font-bold text-quest-text truncate">
                      {word.word}
                    </span>
                    <span className="text-[11px] font-body text-quest-dim truncate">
                      {word.questTopic}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      onClick={() => reviewWord?.(word.word)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-quest-primary/15 border border-quest-primary/30 text-quest-primary text-xs font-body font-medium hover:bg-quest-primary/25 transition-all"
                    >
                      <RefreshCw className="w-3 h-3" />
                      {t("vocab.reviewAction")}
                    </button>
                    <button
                      onClick={() => markWordMastered?.(word.word)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-quest-accent/15 border border-quest-accent/30 text-quest-accent text-xs font-body font-medium hover:bg-quest-accent/25 transition-all"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {t("vocab.masterAction")}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Mastered words */}
        {masteredWords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="glass-strong rounded-3xl p-6 mb-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-quest-gold" />
              <h2 className="font-display text-lg font-bold text-quest-text">
                {t("vocab.mastered")}
              </h2>
              <span className="ml-auto px-2 py-0.5 rounded-full bg-quest-gold/15 text-[10px] font-body font-bold text-quest-gold">
                {masteredCount}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {masteredWords.map((word: VocabItem, i: number) => (
                  <motion.span
                    key={word.word}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ delay: 0.03 * i }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-body font-medium ${
                      tagColors[i % tagColors.length]
                    }`}
                  >
                    <Star className="w-3 h-3" />
                    {word.word}
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        <div className="flex-1" />
      </div>
    </div>
  );
}
