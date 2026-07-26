import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import GarlicPet from "@/components/GarlicPet";
import { useStore, getPetLevel, getPetStage, getLevelInfo } from "@/store/useStore";
import { useT } from "@/i18n/translations";

const stages = [
  { nameKey: "pet.stage0", hintKey: "pet.stage0Hint", xp: 0 },
  { nameKey: "pet.stage1", hintKey: "pet.stage1Hint", xp: 100 },
  { nameKey: "pet.stage2", hintKey: "pet.stage2Hint", xp: 400 },
  { nameKey: "pet.stage3", hintKey: "pet.stage3Hint", xp: 900 },
  { nameKey: "pet.stage4", hintKey: "pet.stage4Hint", xp: 1600 },
];

export default function PetPrototypeGallery() {
  const pet = useStore((state) => state.pet);
  const t = useT();
  const [showAllStages, setShowAllStages] = useState(false);
  const level = getPetLevel(pet.xp);
  const stage = getPetStage(level);
  const current = stages[stage];
  const levelInfo = getLevelInfo(pet.xp);
  const nextStage = stages[stage + 1];
  const otherStages = stages.map((item, index) => ({ ...item, index })).filter((item) => item.index !== stage);

  return (
    <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .16 }} className="glass-strong rounded-3xl p-5 mb-6 pet-prototype-card" aria-label="Current pet growth">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-quest-primary" /><div><h2 className="font-display text-lg font-bold text-white">{t("pet.title")}</h2><p className="text-xs text-quest-dim font-body">{t("pet.growthBasis")}</p></div></div>
        <span className="text-[10px] font-display font-bold px-2 py-1 rounded-full border text-quest-primary border-quest-primary/30 bg-quest-primary/10">{t("pet.stageLabel", { stage: stage + 1 })}</span>
      </div>
      <div className="pet-current-layout">
        <div className="pet-hover-zone" onMouseEnter={() => setShowAllStages(true)} onMouseLeave={() => setShowAllStages(false)}>
          <motion.div key={stage} initial={{ scale: .75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 180, damping: 15 }} className="pet-current-art">
            <GarlicPet stage={stage} className="pet-prototype-svg" />
          </motion.div>
          <AnimatePresence>
            {showAllStages && (
              <motion.div initial={{ opacity: 0, y: 8, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .94 }} className="pet-stage-popover">
                {otherStages.map((item) => <div className="pet-stage-preview" key={item.index}><GarlicPet stage={item.index} className="pet-stage-preview-svg" /><span>{t(item.nameKey)}</span><small>{t("pet.unlockAt", { xp: item.xp })}</small></div>)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2"><div className="font-display text-xl font-black text-white">{t(current.nameKey)}</div><div className="text-xs text-quest-dim font-body">Lv.{level}</div></div>
          <p className="text-xs text-quest-dim font-body mt-1 mb-3">{t(current.hintKey)}</p>
          <div className="flex justify-between text-[10px] text-quest-dim font-body mb-1"><span>{t("pet.progress")}</span><span>{levelInfo.currentXP}/{levelInfo.levelXP} XP</span></div>
          <div className="h-3 rounded-full bg-quest-bg/70 border border-quest-border/70 overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-quest-primary via-quest-purple to-quest-pink" initial={{ width: 0 }} animate={{ width: `${levelInfo.progress * 100}%` }} transition={{ duration: .8 }} /></div>
          <div className="text-[10px] text-quest-muted font-body mt-2">{nextStage ? t("pet.toEvolution", { xp: nextStage.xp - pet.xp, name: t(nextStage.nameKey) }) : t("pet.maxed")}</div>
        </div>
      </div>
      <div className="pet-preview-hint">{t("pet.hoverHint")}</div>
    </motion.section>
  );
}
