import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LifeBuoy, X, Copy, Check } from "lucide-react";
import { getSOSSuggestions } from "@/store/useStore";
import { useT } from "@/i18n/translations";

interface SOSBallProps {
  language: "en" | "zh";
  question: string;
}

export default function SOSBall({ language, question }: SOSBallProps) {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleOpen = () => {
    setSuggestions(getSOSSuggestions(language, question));
    setIsOpen(true);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <>
      <motion.button
        onClick={handleOpen}
        className="relative z-10 w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="absolute inset-0 rounded-lg bg-quest-sos/20 animate-pulse" />
        <span className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-quest-sos to-rose-600 flex items-center justify-center shadow-[0_0_14px_rgba(255,107,107,0.35)]">
          <LifeBuoy className="w-4 h-4 text-white" />
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-quest-bg/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg p-4"
            >
              <div className="glass-strong rounded-3xl p-6 shadow-[0_-10px_40px_rgba(255,107,107,0.15)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-quest-sos/20 flex items-center justify-center">
                      <LifeBuoy className="w-5 h-5 text-quest-sos" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-quest-sos">{t("sos.title")}</h3>
                      <p className="text-[11px] text-quest-dim font-body">
                        {language === "en" ? t("sos.enSub") : t("sos.zhSub")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-lg bg-quest-card/50 hover:bg-quest-card flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-quest-dim" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {suggestions.map((sentence, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="group relative p-4 rounded-xl bg-quest-card/50 border border-quest-border/50 hover:border-quest-sos/40 transition-all cursor-pointer"
                      onClick={() => handleCopy(sentence, i)}
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-display text-quest-sos/60 font-bold text-sm shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <p className="font-body text-sm text-quest-text/90 flex-1 pr-6 leading-relaxed">
                          {sentence}
                        </p>
                        <div className="absolute right-3 top-3">
                          {copiedIndex === i ? (
                            <Check className="w-4 h-4 text-quest-success" />
                          ) : (
                            <Copy className="w-4 h-4 text-quest-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-center text-[11px] text-quest-muted font-body mt-4">
                  {t("sos.hint")} · {language === "en" ? "🇬🇧 English" : "🇨🇳 中文"}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
