import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Sword, HelpCircle, Play, RefreshCw, Tag, Clock, Pencil } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useT } from "@/i18n/translations";

export default function Quest() {
  const navigate = useNavigate();
  const t = useT();
  const { questCard, startTalk, resetAll, refreshQuest, isGenerating, customTimeMinutes, useCustomTopic } = useStore();

  // Fix: render-time navigate crashes React 18. Use <Navigate> instead.
  if (!questCard) {
    return <Navigate to="/" replace />;
  }

  const handleStart = () => {
    startTalk();
    navigate("/talk");
  };

  const shuffleDisabled = useCustomTopic && questCard.isCustom;

  return (
    <div className="quest-page min-h-screen grid-bg relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-quest-primary/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-quest-accent/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass">
            <Target className="w-4 h-4 text-quest-primary" />
            <span className="text-xs font-body tracking-wider text-quest-dim uppercase">{t("quest.badge")}</span>
          </div>
          <button
            onClick={() => {
              resetAll();
              navigate("/");
            }}
            className="quest-back-button sky-copy text-quest-dim hover:text-quest-text text-sm font-body transition-colors"
          >
            {t("quest.back")}
          </button>
        </motion.div>

        {/* Quest Card with loading state for refresh */}
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass-strong rounded-3xl p-12 mb-8 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-quest-primary/20 border-t-quest-primary mb-4"
              />
              <p className="font-display text-sm text-quest-dim">{t("quest.shuffling")}</p>
            </motion.div>
          ) : (
            <motion.div
              key={questCard.topic}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative mb-6"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-quest-primary/30 via-quest-accent/20 to-quest-primary/30 rounded-3xl blur-xl opacity-60" />

              <div className="relative glass-strong rounded-3xl p-8 glow-border">
                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-quest-primary to-quest-accent flex items-center justify-center">
                      <Sword className="w-4 h-4 text-quest-bg" />
                    </div>
                    <span className="font-display text-sm font-bold text-quest-primary tracking-wider">{t("quest.cardLabel")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {questCard.isCustom && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-quest-accent/15 border border-quest-accent/30 text-[10px] font-display font-bold text-quest-accent uppercase">
                        <Pencil className="w-3 h-3" />
                        {t("quest.customBadge")}
                      </span>
                    )}
                    <span className="text-[10px] font-body text-quest-muted uppercase tracking-widest">{t("quest.coop")}</span>
                  </div>
                </div>

                {/* Topic */}
                <div className="mb-6">
                  <div className="text-[10px] font-body text-quest-muted uppercase tracking-widest mb-2">{t("quest.topic")}</div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-quest-text leading-tight">
                    "{questCard.topic}"
                  </h2>
                </div>

                {/* Challenge words */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sword className="w-4 h-4 text-quest-accent" />
                    <span className="text-xs font-display font-bold text-quest-accent uppercase tracking-wider">{t("quest.challenges")}</span>
                    <span className="text-[10px] text-quest-dim font-body">{t("quest.challengesHint")}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {questCard.challenges.map((word, i) => (
                      <motion.div
                        key={word}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="px-4 py-2 rounded-xl bg-quest-accent/15 border border-quest-accent/30"
                      >
                        <span className="font-display text-base font-bold text-quest-accent">{word}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Questions */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-quest-primary" />
                      <span className="text-xs font-display font-bold text-quest-primary uppercase tracking-wider">{t("quest.starters")}</span>
                    </div>
                    <span className="text-[10px] font-body text-quest-muted">{questCard.questions.length} {t("quest.questionsCount")}</span>
                  </div>
                  <div className="space-y-2">
                    {questCard.questions.map((question, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        className="flex gap-3 p-3 rounded-xl bg-quest-card/40 border border-quest-border/40 hover:border-quest-primary/30 transition-colors"
                      >
                        <span className="font-display text-quest-primary font-bold text-sm shrink-0">{String(i + 1).padStart(2, "0")}</span>
                        <span className="font-body text-sm text-quest-text/90">{question}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Interests & time */}
                <div className="pt-4 border-t border-quest-border/40 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="w-3.5 h-3.5 text-quest-dim" />
                      <span className="text-[10px] font-body text-quest-dim uppercase tracking-widest">{t("quest.interests")}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {questCard.interests.map((interest) => (
                        <span key={interest} className="px-2.5 py-1 rounded-md bg-quest-primary/10 border border-quest-primary/20 text-[11px] font-body text-quest-dim">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 mb-1 justify-end">
                      <Clock className="w-3.5 h-3.5 text-quest-dim" />
                      <span className="text-[10px] font-body text-quest-dim uppercase tracking-widest">{t("quest.duration")}</span>
                    </div>
                    <span className="font-display text-sm font-bold text-quest-primary">{customTimeMinutes} min</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action buttons */}
        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={handleStart}
            disabled={isGenerating}
            className="group relative w-full py-5 rounded-2xl font-display text-lg font-bold tracking-wide overflow-hidden transition-all disabled:opacity-40"
            whileHover={{ scale: isGenerating ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-quest-primary via-quest-primaryLight to-quest-accent bg-[length:200%_100%] group-hover:animate-shimmer" />
            <span className="relative flex items-center justify-center gap-3 text-quest-bg">
              <Play className="w-5 h-5 fill-quest-bg" />
              {t("quest.start")}
            </span>
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={refreshQuest}
              disabled={isGenerating || shuffleDisabled}
              title={shuffleDisabled ? t("quest.shuffleDisabled") : undefined}
              className="quest-secondary-button py-3 rounded-2xl font-body text-sm text-quest-dim hover:text-quest-accent border border-quest-border/60 hover:border-quest-accent/40 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <RefreshCw className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
              {t("quest.shuffle")}
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              onClick={() => {
                resetAll();
                navigate("/");
              }}
              className="quest-secondary-button py-3 rounded-2xl font-body text-sm text-quest-dim hover:text-quest-sos border border-quest-border/60 hover:border-quest-sos/40 transition-all flex items-center justify-center gap-2"
            >
              {t("quest.newSetup")}
            </motion.button>
          </div>
        </div>

        <div className="flex-1" />
        <p className="sky-copy text-center text-xs text-quest-muted font-body mt-8">
          {shuffleDisabled ? t("quest.shuffleDisabled") : t("quest.shuffleHint")}
        </p>
      </div>
    </div>
  );
}
