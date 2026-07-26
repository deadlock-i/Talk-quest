import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import GarlicPet from "@/components/GarlicPet";
import { useStore, getPetLevel, getPetStage, getLevelInfo } from "@/store/useStore";
import { useT } from "@/i18n/translations";

interface PetProps { size?: "sm" | "md" | "lg"; showStats?: boolean; compact?: boolean; }

export default function Pet({ size = "md", showStats = true, compact = false }: PetProps) {
  const t = useT();
  const pet = useStore((s) => s.pet);
  const level = getPetLevel(pet.xp);
  const stage = getPetStage(level);
  const levelInfo = getLevelInfo(pet.xp);
  const xpToNext = Math.max(0, levelInfo.nextLevelXP - pet.xp);
  const petSize = size === "sm" ? 128 : size === "lg" ? 230 : 185;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <motion.div key={stage} initial={{ scale: .6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }} className="shrink-0" style={{ width: petSize, height: petSize }}>
          <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <GarlicPet stage={stage} className="w-full h-full overflow-visible drop-shadow-lg" />
          </motion.div>
        </motion.div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1"><Sparkles className="w-4 h-4 text-quest-primary" /><span className="font-display text-sm font-bold text-quest-primary">{t(`pet.stage${stage}`)}</span><span className="text-[10px] font-body text-quest-muted px-1.5 py-0.5 rounded bg-quest-card/60">Lv.{level}</span></div>
          <div className="mb-2">
            <div className="flex justify-between text-[10px] font-body text-quest-dim mb-1"><span>{t("pet.progress")}</span><span>{levelInfo.currentXP}/{levelInfo.levelXP} XP</span></div>
            <div className="relative h-2.5 rounded-full bg-quest-card/60 overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-quest-primary to-quest-accent" initial={{ width: 0 }} animate={{ width: `${levelInfo.progress * 100}%` }} transition={{ duration: .8, ease: "easeOut" }} /></div>
            <div className="text-[10px] font-body text-quest-muted mt-1">{xpToNext} XP {t("pet.nextLevel")}</div>
          </div>
          {!compact && <div className="grid grid-cols-2 gap-2"><div className="rounded-lg bg-quest-card/40 px-2 py-1.5"><div className="font-display text-base font-bold text-quest-text">{pet.totalSessions}</div><div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">{t("pet.sessions")}</div></div><div className="rounded-lg bg-quest-card/40 px-2 py-1.5"><div className="font-display text-base font-bold text-quest-text">{pet.totalMinutes}</div><div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">{t("pet.minutes")}</div></div></div>}
        </div>
      </div>
      {showStats && pet.totalSessions === 0 && <p className="text-center text-[11px] text-quest-muted font-body mt-3 italic">{t("pet.empty")}</p>}
    </div>
  );
}
