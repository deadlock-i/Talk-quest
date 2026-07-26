import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  Zap,
  Flame,
  Gamepad2,
  BookOpen,
  Lock,
  Star,
  Calendar,
} from "lucide-react";
import { useStore, Achievement, getLevelInfo } from "@/store/useStore";
import { useT } from "@/i18n/translations";


/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Achievements() {
  const navigate = useNavigate();
  const t = useT();

  /* Read state from the store */
  const totalXP = useStore((s) => s.totalXP);
  const streak = useStore((s) => s.streak);
  const questHistory = useStore((s) => s.questHistory);
  const vocabulary = useStore((s) => s.vocabulary);
  const achievements = useStore((s) => s.achievements);

  /* Derived */
  const levelInfo = getLevelInfo(totalXP);

  const unlockedAchievements = useMemo(
    () => achievements.filter((a) => a.unlockedAt !== null),
    [achievements]
  );
  const lockedAchievements = useMemo(
    () => achievements.filter((a) => a.unlockedAt === null),
    [achievements]
  );

  const vocabCount = vocabulary.length;
  const questCount = questHistory.length;

  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Ambient blurs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-quest-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-quest-accent/10 rounded-full blur-3xl animate-float" />

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
            className="sky-copy flex items-center gap-2 text-quest-dim hover:text-quest-text text-sm font-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("global.home")}</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass">
            <Trophy className="w-4 h-4 text-quest-gold" />
            <span className="text-xs font-body tracking-wider text-quest-dim uppercase">
              Achievements
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
            <span className="gradient-text">{t("achievements.title")}</span>
          </h1>
          <p className="sky-copy font-body text-quest-dim text-sm">
            {t("achievements.subtitle", { level: levelInfo.level })}
          </p>
        </motion.div>

        {/* Level progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="glass-strong rounded-3xl p-6 mb-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-quest-primary" />
              <span className="font-display text-sm font-bold text-quest-text">
                Level {levelInfo.level}
              </span>
            </div>
            <span className="text-xs font-body text-quest-dim">
              {levelInfo.currentXP} / {levelInfo.levelXP} XP
            </span>
          </div>

          {/* Progress bar */}
          <div className="relative h-3 rounded-full bg-quest-card/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(levelInfo.progress * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-quest-primary via-quest-primaryLight to-quest-accent"
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] font-body text-quest-muted">
              {levelInfo.currentXP} XP
            </span>
            <span className="text-[10px] font-body text-quest-muted">
              {levelInfo.nextLevelXP} XP
            </span>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-4 gap-3 mb-5"
        >
          <div className="glass rounded-2xl p-4 text-center">
            <Zap className="w-5 h-5 text-quest-primary mx-auto mb-2" />
            <div className="font-display text-xl font-bold text-quest-text">
              {totalXP}
            </div>
            <div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">
              XP
            </div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Flame className="w-5 h-5 text-quest-sos mx-auto mb-2" />
            <div className="font-display text-xl font-bold text-quest-text">
              {streak}
            </div>
            <div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">
              {t("achievements.streak")}
            </div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <Gamepad2 className="w-5 h-5 text-quest-accent mx-auto mb-2" />
            <div className="font-display text-xl font-bold text-quest-text">
              {questCount}
            </div>
            <div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">
              {t("achievements.quests")}
            </div>
          </div>
          <div className="glass rounded-2xl p-4 text-center">
            <BookOpen className="w-5 h-5 text-quest-gold mx-auto mb-2" />
            <div className="font-display text-xl font-bold text-quest-text">
              {vocabCount}
            </div>
            <div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">
              {t("achievements.words")}
            </div>
          </div>
        </motion.div>

        {/* Unlocked achievements */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-strong rounded-3xl p-6 mb-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-quest-gold" />
              <h2 className="font-display text-lg font-bold text-quest-text">
                {t("achievements.unlocked")}
              </h2>
              <span className="ml-auto px-2 py-0.5 rounded-full bg-quest-gold/15 text-[10px] font-body font-bold text-quest-gold">
                {unlockedAchievements.length}
              </span>
            </div>

            <div className="space-y-2">
              {unlockedAchievements.map((achievement: Achievement, i: number) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-quest-card/40 border border-quest-gold/20 hover:border-quest-gold/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-quest-gold/20 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-quest-gold" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-sm font-bold text-quest-text truncate">
                      {t(`achievement.${achievement.id}.name`) === `achievement.${achievement.id}.name` ? achievement.name : t(`achievement.${achievement.id}.name`)}
                    </div>
                    <div className="text-[11px] font-body text-quest-dim truncate">
                      {t(`achievement.${achievement.id}.desc`) === `achievement.${achievement.id}.desc` ? achievement.description : t(`achievement.${achievement.id}.desc`)}
                    </div>
                  </div>
                  {achievement.unlockedAt && (
                    <div className="flex items-center gap-1 text-[10px] font-body text-quest-muted shrink-0">
                      <Calendar className="w-3 h-3" />
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Locked achievements */}
        {lockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-strong rounded-3xl p-6 mb-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-quest-muted" />
              <h2 className="font-display text-lg font-bold text-quest-text">
                {t("achievements.locked")}
              </h2>
              <span className="ml-auto px-2 py-0.5 rounded-full bg-quest-card/60 text-[10px] font-body font-bold text-quest-muted">
                {lockedAchievements.length}
              </span>
            </div>

            <div className="space-y-2">
              {lockedAchievements.map((achievement: Achievement, i: number) => {
                const progressPct = Math.min(100, Math.round((achievement.current / achievement.requirement) * 100));
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-quest-card/20 border border-quest-border/30"
                  >
                    <div className="w-10 h-10 rounded-xl bg-quest-card/40 flex items-center justify-center shrink-0">
                      <Lock className="w-4 h-4 text-quest-muted" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-display text-sm font-bold text-quest-dim truncate">
                        {t(`achievement.${achievement.id}.name`) === `achievement.${achievement.id}.name` ? achievement.name : t(`achievement.${achievement.id}.name`)}
                      </div>
                      <div className="text-[11px] font-body text-quest-muted truncate mb-1">
                        {t(`achievement.${achievement.id}.desc`) === `achievement.${achievement.id}.desc` ? achievement.description : t(`achievement.${achievement.id}.desc`)}
                      </div>
                      {/* Progress bar */}
                      <div className="h-1.5 rounded-full bg-quest-card/60 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-quest-muted/40 to-quest-muted/70 transition-all"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-[10px] font-body text-quest-muted shrink-0">
                      {progressPct}%
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Empty state */}
        {achievements.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-3xl p-10 text-center mb-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-quest-card/60 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-quest-muted" />
            </div>
            <h3 className="font-display text-lg font-bold text-quest-text mb-1">
              No achievements yet
            </h3>
            <p className="text-xs font-body text-quest-dim max-w-xs mx-auto">
              Start completing quests to unlock achievements!
            </p>
          </motion.div>
        )}

        <div className="flex-1" />
      </div>
    </div>
  );
}
