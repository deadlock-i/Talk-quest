import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Star, RotateCcw, Share2, Zap, Heart, Sparkles, Clock, Globe, BookOpen, Check } from "lucide-react";
import { useStore, getPetLevel } from "@/store/useStore";
import { useT } from "@/i18n/translations";
import Pet from "@/components/Pet";

export default function Settlement() {
  const navigate = useNavigate();
  const t = useT();
  const questCard = useStore((s) => s.questCard);
  const talkSession = useStore((s) => s.talkSession);
  const pet = useStore((s) => s.pet);
  const reviews = useStore((s) => s.reviews);
  const isSettled = useStore((s) => s.isSettled);
  const resetAll = useStore((s) => s.resetAll);
  const updateReviewNote = useStore((s) => s.updateReviewNote);

  const [displayXP, setDisplayXP] = useState(0);
  const [showBadge, setShowBadge] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const latestReview = reviews[0] ?? null;
  const previousLevel = latestReview ? getPetLevel(pet.xp - latestReview.petXpGained) : getPetLevel(pet.xp);
  const currentLevel = getPetLevel(pet.xp);
  const leveledUp = currentLevel > previousLevel;

  useEffect(() => {
    if (latestReview) setNoteText(latestReview.notes);
  }, [latestReview]);

  // Animate XP counting up
  useEffect(() => {
    const target = 50;
    const duration = 1500;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayXP(target);
        clearInterval(interval);
        setTimeout(() => setShowBadge(true), 300);
      } else {
        setDisplayXP(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, []);

  if (!isSettled || !latestReview) {
    return <Navigate to="/" replace />;
  }

  const handleRestart = () => {
    resetAll();
    navigate("/");
  };

  const handleSaveNote = () => {
    updateReviewNote(latestReview.id, noteText);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const elapsedMins = Math.floor(talkSession.elapsedSeconds / 60);
  const enMins = Math.floor(talkSession.enSeconds / 60);
  const zhMins = Math.floor(talkSession.zhSeconds / 60);

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-quest-gold/10 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-quest-accent/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      {/* Confetti */}
      {showBadge && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                background: ["#FFD93D", "#4ADE80", "#FFD700", "#86EFAC"][i % 4],
              }}
              initial={{ y: -10, opacity: 1 }}
              animate={{
                y: "120vh",
                x: (Math.random() - 0.5) * 200,
                opacity: [1, 1, 0],
                rotate: Math.random() * 360,
              }}
              transition={{ duration: 3 + Math.random() * 2, delay: Math.random() * 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-lg mx-auto px-6 py-8 w-full">
        {/* Victory banner */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
            <Trophy className="w-4 h-4 text-quest-gold" />
            <span className="text-xs font-body tracking-wider text-quest-dim uppercase">{t("settle.complete")}</span>
          </div>
          <h1 className="font-display text-5xl font-black mb-2">
            <span className="gradient-text">{t("settle.victory")}</span>
          </h1>
          <p className="font-body text-quest-dim text-sm">{t("settle.victoryDesc")}</p>
        </motion.div>

        {/* XP + Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative mb-5"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-quest-primary/20 to-quest-accent/20 rounded-3xl blur-lg" />
          <div className="relative glass-strong rounded-3xl p-6">
            <div className="text-center mb-5">
              <div className="text-[10px] font-body text-quest-muted uppercase tracking-widest mb-2">{t("settle.xpGained")}</div>
              <div className="flex items-center justify-center gap-3">
                <Zap className="w-8 h-8 text-quest-primary" />
                <span className="font-display text-6xl font-black gradient-text tabular-nums">+{displayXP}</span>
                <span className="font-display text-2xl font-bold text-quest-dim">XP</span>
              </div>
            </div>

            {showBadge && (
              <motion.div
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-quest-gold/30 rounded-full blur-2xl animate-badge-shine" />
                  <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-quest-primary via-quest-gold to-quest-accent flex items-center justify-center shadow-[0_0_40px_rgba(255,217,61,0.4)] animate-badge-shine">
                    <div className="absolute inset-2 rounded-full border-2 border-quest-bg/40" />
                    <div className="flex flex-col items-center">
                      <Star className="w-7 h-7 text-quest-bg fill-quest-bg mb-1" />
                      <span className="font-display text-[9px] font-black text-quest-bg uppercase tracking-wider">Lv.1</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-md bg-quest-accent text-quest-bg">
                    <span className="font-display text-[10px] font-black uppercase tracking-wider whitespace-nowrap">{t("settle.unlocked")}</span>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="font-display text-lg font-bold gradient-text mb-1">{t("settle.badgeName")}</div>
                  <div className="text-xs font-body text-quest-dim">{t("settle.badgeDesc")}</div>
                </div>
              </motion.div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-quest-border/40">
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-quest-text">{elapsedMins}</div>
                <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider">{t("settle.stats.minutes")}</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-quest-text">2</div>
                <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider">{t("settle.stats.languages")}</div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-quest-text">2</div>
                <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider">{t("settle.stats.players")}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pet growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-3xl p-5 mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-quest-accent" />
              <span className="font-display text-sm font-bold text-quest-text">{t("settle.petGrew")}</span>
            </div>
            {leveledUp && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.8, type: "spring" }}
                className="px-2.5 py-1 rounded-full bg-quest-primary/20 border border-quest-primary/40 text-[10px] font-display font-black text-quest-primary uppercase tracking-wider"
              >
                {t("settle.petLeveledUp")}
              </motion.span>
            )}
          </div>
          <p className="text-xs font-body text-quest-dim mb-3">
            {t("settle.petGrewDesc", { xp: latestReview.petXpGained, level: currentLevel })}
          </p>
          <Pet size="md" showStats={false} compact />
        </motion.div>

        {/* Quick review / recap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-strong rounded-3xl p-6 mb-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-4 h-4 text-quest-primary" />
            <span className="font-display text-sm font-bold text-quest-text">{t("settle.review.title")}</span>
          </div>

          {/* Time split */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="rounded-xl bg-quest-primary/10 border border-quest-primary/20 px-3 py-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-body text-quest-muted uppercase mb-0.5">
                <Globe className="w-3 h-3" /> EN
              </div>
              <div className="font-display text-lg font-bold text-quest-primary">{enMins}m</div>
              <div className="text-[9px] font-body text-quest-dim">{t("settle.review.enTime")}</div>
            </div>
            <div className="rounded-xl bg-quest-accent/10 border border-quest-accent/20 px-3 py-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-body text-quest-muted uppercase mb-0.5">
                <Globe className="w-3 h-3" /> ZH
              </div>
              <div className="font-display text-lg font-bold text-quest-accent">{zhMins}m</div>
              <div className="text-[9px] font-body text-quest-dim">{t("settle.review.zhTime")}</div>
            </div>
            <div className="rounded-xl bg-quest-card/40 border border-quest-border/40 px-3 py-2 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-body text-quest-muted uppercase mb-0.5">
                <Clock className="w-3 h-3" /> Σ
              </div>
              <div className="font-display text-lg font-bold text-quest-text">{elapsedMins}m</div>
              <div className="text-[9px] font-body text-quest-dim">{t("settle.review.totalTime")}</div>
            </div>
          </div>

          {/* Topic & challenges */}
          {questCard && (
            <div className="mb-4 pb-4 border-b border-quest-border/40">
              <p className="font-display text-sm font-bold text-quest-text/90 mb-2">{questCard.topic}</p>
              <div className="flex flex-wrap gap-1.5">
                {questCard.challenges.map((word) => (
                  <span key={word} className="px-2 py-0.5 rounded-md bg-quest-accent/15 border border-quest-accent/25 text-[10px] font-body text-quest-accent">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Questions covered */}
          {questCard && questCard.questions.length > 0 && (
            <div className="mb-4 pb-4 border-b border-quest-border/40">
              <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider mb-2">{t("reviews.questions")}</div>
              <ul className="space-y-1.5">
                {questCard.questions.map((q, i) => (
                  <li key={i} className="text-[11px] font-body text-quest-dim flex gap-1.5">
                    <Check className="w-3 h-3 text-quest-accent shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reflection notes */}
          <div>
            <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider mb-2">{t("settle.review.notesLabel")}</div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={t("settle.review.notesPlaceholder")}
              rows={3}
              className="w-full px-3 py-2 rounded-lg bg-quest-bg/60 border border-quest-border text-quest-text font-body text-xs placeholder-quest-muted/50 focus:outline-none focus:border-quest-primary/50 resize-none"
            />
            <button
              onClick={handleSaveNote}
              className="mt-2 w-full py-2 rounded-lg bg-quest-primary/20 border border-quest-primary/40 text-quest-primary text-xs font-display font-bold hover:bg-quest-primary/30 transition-all flex items-center justify-center gap-2"
            >
              {noteSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" /> {t("settle.review.saved")}
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5" /> {t("settle.review.save")}
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <motion.button
            onClick={handleRestart}
            className="group relative w-full py-4 rounded-2xl font-display text-base font-bold tracking-wide overflow-hidden transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-quest-primary via-quest-primaryLight to-quest-accent bg-[length:200%_100%] group-hover:animate-shimmer" />
            <span className="relative flex items-center justify-center gap-3 text-quest-bg">
              <RotateCcw className="w-5 h-5" />
              {t("settle.restart")}
            </span>
          </motion.button>

          <button className="w-full py-3 rounded-2xl font-body text-sm text-quest-dim hover:text-quest-primary border border-quest-border/60 hover:border-quest-primary/40 transition-all flex items-center justify-center gap-2">
            <Share2 className="w-4 h-4" />
            {t("settle.share")}
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-xs text-quest-muted font-body mt-8 flex items-center justify-center gap-1.5"
        >
          {t("settle.footer")} <Heart className="w-3 h-3 text-quest-sos fill-quest-sos" /> {t("settle.footerTail")}
        </motion.p>
      </div>
    </div>
  );
}
