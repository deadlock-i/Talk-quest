import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useT } from "@/i18n/translations";

export default function LanguageToggle() {
  const uiLanguage = useStore((s) => s.uiLanguage);
  const setUiLanguage = useStore((s) => s.setUiLanguage);
  const t = useT();

  const toggle = () => setUiLanguage(uiLanguage === "en" ? "zh" : "en");

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-xl glass-strong border-quest-primary/30 hover:border-quest-primary/60 transition-colors"
      aria-label={t("lang.switch")}
    >
      <Languages className="w-4 h-4 text-quest-primary" />
      <span className="text-xs font-display font-bold text-quest-text">
        {uiLanguage === "en" ? "中" : "EN"}
      </span>
    </motion.button>
  );
}
