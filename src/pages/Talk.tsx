import { useEffect, useRef, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Flag, Languages, Coffee, Pause, Play, RefreshCw } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useT } from "@/i18n/translations";
import SOSBall from "@/components/SOSBall";

export default function Talk() {
  const navigate = useNavigate();
  const t = useT();
  const talkSession = useStore((s) => s.talkSession);
  const questCard = useStore((s) => s.questCard);
  const settleTalk = useStore((s) => s.settleTalk);
  const togglePause = useStore((s) => s.togglePause);
  const setLanguage = useStore((s) => s.setLanguage);
  const refreshQuestions = useStore((s) => s.refreshQuestions);

  const [showSwitchAlert, setShowSwitchAlert] = useState(false);
  const autoSwitchedRef = useRef(false);

  // Source of truth: currentLanguage. Manual switch now reflects in UI.
  const currentLang = talkSession.currentLanguage;
  const isEnglishPhase = currentLang === "en";

  const halfwayPoint = talkSession.totalSeconds / 2;

  // Timer — uses fresh state via getState() so manual switches track time correctly.
  useEffect(() => {
    if (talkSession.isPaused) return;
    const interval = setInterval(() => {
      const s = useStore.getState().talkSession;
      if (s.elapsedSeconds < s.totalSeconds) {
        const langInc =
          s.currentLanguage === "en"
            ? { enSeconds: s.enSeconds + 1 }
            : { zhSeconds: s.zhSeconds + 1 };
        useStore.getState().updateTalkSession({
          elapsedSeconds: s.elapsedSeconds + 1,
          ...langInc,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [talkSession.isPaused]);

  // Auto language switch at halfway (fires once, respects manual override)
  useEffect(() => {
    if (autoSwitchedRef.current) return;
    if (
      talkSession.elapsedSeconds >= Math.floor(halfwayPoint) &&
      !talkSession.isPaused
    ) {
      autoSwitchedRef.current = true;
      if (talkSession.currentLanguage === "en") {
        setLanguage("zh");
        setShowSwitchAlert(true);
        setTimeout(() => setShowSwitchAlert(false), 4000);
      }
    }
  }, [talkSession.elapsedSeconds, halfwayPoint, talkSession.isPaused, talkSession.currentLanguage, setLanguage]);

  if (!questCard) {
    return <Navigate to="/" replace />;
  }

  const handleFinish = () => {
    settleTalk();
    navigate("/settlement");
  };

  const progress = (talkSession.elapsedSeconds / talkSession.totalSeconds) * 100;
  const remainingSeconds = talkSession.totalSeconds - talkSession.elapsedSeconds;
  const remainingMins = Math.floor(remainingSeconds / 60);
  const remainingSecs = remainingSeconds % 60;
  const halfMins = talkSession.totalSeconds / 120;
  const formatElapsed = (seconds: number) =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="talk-page min-h-screen grid-bg relative overflow-x-hidden">
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isEnglishPhase
            ? "bg-gradient-to-b from-quest-primary/5 via-transparent to-transparent"
            : "bg-gradient-to-b from-quest-accent/5 via-transparent to-transparent"
        }`}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass">
            <div className={`w-2 h-2 rounded-full ${isEnglishPhase ? "bg-quest-primary" : "bg-quest-accent"} animate-pulse`} />
            <span className="text-xs font-body tracking-wider text-quest-dim uppercase">
              {isEnglishPhase ? t("talk.enPhase") : t("talk.zhPhase")}
            </span>
            {talkSession.isPaused && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-quest-sos/20 text-quest-sos text-[10px] font-bold uppercase">
                {t("talk.paused")}
              </span>
            )}
          </div>
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass hover:border-quest-sos/40 transition-all text-sm font-body text-quest-dim hover:text-quest-sos"
          >
            <Flag className="w-4 h-4" />
            {t("talk.end")}
          </button>
        </div>

        {/* Quest topic reminder */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-body text-quest-muted uppercase tracking-widest mb-1">{t("talk.currentQuest")}</div>
              <p className="font-display text-sm font-bold text-quest-text/90 truncate">{questCard.topic}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 ml-3 shrink-0">
              {questCard.challenges.map((word) => (
                <span key={word} className="px-2 py-0.5 rounded-md bg-quest-accent/15 border border-quest-accent/25 text-[11px] font-body text-quest-accent">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timer Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex-1 flex flex-col items-center justify-center"
        >
          {/* Circular timer */}
          <div className="relative w-64 h-64 mb-8">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isEnglishPhase ? "#FFD93D" : "#4ADE80"} />
                  <stop offset="100%" stopColor={isEnglishPhase ? "#FFE66D" : "#86EFAC"} />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(31, 69, 48, 0.3)" strokeWidth="6" />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 90}`}
                strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-linear"
                style={{ filter: `drop-shadow(0 0 8px ${isEnglishPhase ? "rgba(255, 217, 61, 0.5)" : "rgba(74, 222, 128, 0.5)"})` }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Clock className={`w-6 h-6 mb-2 ${isEnglishPhase ? "text-quest-primary" : "text-quest-accent"} ${talkSession.isPaused ? "opacity-40" : ""}`} />
              <div className="font-display text-4xl font-black text-quest-text tabular-nums">
                {String(remainingMins).padStart(2, "0")}:{String(remainingSecs).padStart(2, "0")}
              </div>
              <div className="text-[10px] font-body text-quest-muted uppercase tracking-widest mt-1">
                {talkSession.isPaused ? t("talk.paused") : t("talk.remaining")}
              </div>
              <div className="flex flex-col items-center gap-0.5 text-xs font-body text-quest-dim mt-2">
                <span>{t("talk.zhElapsed")}：{formatElapsed(talkSession.zhSeconds)}</span>
                <span>{t("talk.enElapsed")}：{formatElapsed(talkSession.enSeconds)}</span>
              </div>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center gap-3 mb-6">
            <motion.button
              onClick={togglePause}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-medium transition-all ${
                talkSession.isPaused
                  ? "bg-quest-accent/20 border border-quest-accent/40 text-quest-accent hover:bg-quest-accent/30"
                  : "bg-quest-card/50 border border-quest-border/60 text-quest-dim hover:text-quest-text hover:border-quest-primary/40"
              }`}
            >
              {talkSession.isPaused ? (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  {t("talk.resume")}
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  {t("talk.pause")}
                </>
              )}
            </motion.button>
          </div>

          {/* Language selector — manual switch (the fix) */}
          <div className="flex flex-col items-center mb-6">
            <div className="text-[10px] font-body text-quest-muted uppercase tracking-widest mb-2">
              {t("talk.speakingLang")} · {isEnglishPhase ? t("talk.speakingEN") : t("talk.speakingZH")}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage("en")}
                className={`flex items-center justify-center w-16 h-16 rounded-2xl font-display font-black text-lg transition-all ${
                  isEnglishPhase
                    ? "bg-quest-primary/20 text-quest-primary border-2 border-quest-primary/60 scale-110 shadow-[0_0_20px_rgba(255,217,61,0.3)]"
                    : "bg-quest-card/40 text-quest-muted border border-quest-border/50 hover:border-quest-primary/40"
                }`}
              >EN</button>

              <button
                onClick={() => setLanguage("zh")}
                className={`flex items-center justify-center w-16 h-16 rounded-2xl font-display font-black text-lg transition-all ${
                  !isEnglishPhase
                    ? "bg-quest-accent/20 text-quest-accent border-2 border-quest-accent/60 scale-110 shadow-[0_0_20px_rgba(74,222,128,0.3)]"
                    : "bg-quest-card/40 text-quest-muted border border-quest-border/50 hover:border-quest-accent/40"
                }`}
              >中</button>
            </div>
            <p className="text-[10px] font-body text-quest-muted mt-2 flex items-center gap-1">
              <Languages className="w-3 h-3" />
              {isEnglishPhase ? `~${halfMins} min ${t("talk.enPhase")}` : `~${halfMins} min ${t("talk.zhPhase")}`}
            </p>
          </div>

          {/* Linear progress bar */}
          <div className="w-full max-w-md">
            <div className="relative h-3 rounded-full bg-quest-card/50 overflow-hidden">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-quest-muted/40 z-10" />
              <motion.div
                className={`h-full rounded-full ${isEnglishPhase ? "bg-gradient-to-r from-quest-primary to-quest-primaryLight" : "bg-gradient-to-r from-quest-primaryLight via-quest-primary to-quest-accent"}`}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-2 text-[10px] font-body text-quest-muted">
              <span>00:00</span>
              <span className="text-quest-primary">{String(halfMins).padStart(2, "0")}:00 · {t("talk.halfway")}</span>
              <span>{String(talkSession.totalSeconds / 60).padStart(2, "0")}:00</span>
            </div>
          </div>

          {/* Quest questions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 w-full"
          >
            <div className="text-[10px] font-body text-quest-muted uppercase tracking-widest text-center mb-3">
              <Coffee className="w-3.5 h-3.5 inline mr-1" />
              {t("talk.inspiration")}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {questCard.questions.map((q, i) => (
                <div key={i} className="flex items-center gap-1.5 max-w-xs">
                  <span className="px-3 py-1.5 rounded-lg bg-quest-card/40 border border-quest-border/40 text-xs font-body text-quest-dim">
                    {q}
                  </span>
                  <SOSBall language={currentLang} question={q} />
                </div>
              ))}
            </div>
            <button
              onClick={refreshQuestions}
              className="mx-auto mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border border-quest-border/60 text-xs font-body text-quest-dim hover:text-quest-primary hover:border-quest-primary/40 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {t("talk.shuffleQuestions")}
            </button>
          </motion.div>
        </motion.div>

        <div className="flex-1" />
      </div>

      {/* Language Switch Alert */}
      <AnimatePresence>
        {showSwitchAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="glass-strong rounded-2xl px-6 py-4 flex items-center gap-3 border-quest-accent/40">
              <div className="w-10 h-10 rounded-xl bg-quest-accent/20 flex items-center justify-center">
                <Languages className="w-5 h-5 text-quest-accent" />
              </div>
              <div>
                <div className="font-display font-bold text-quest-accent text-sm">{t("talk.switchAlert")}</div>
                <div className="text-xs font-body text-quest-dim">{t("talk.switchAlertDesc")}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
