import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useStore, getPetLevel, getPetStage, getPetProgress, PET_XP_PER_LEVEL } from "@/store/useStore";
import { useT } from "@/i18n/translations";

interface PetProps {
  size?: "sm" | "md" | "lg";
  showStats?: boolean;
  compact?: boolean;
}

function PetCreature({ stage, scale = 1 }: { stage: number; scale?: number }) {
  const bodyR = (24 + stage * 5) * scale;
  const cx = 100;
  const cy = 120;

  // Leaves grow with stage
  const leafPairs = Math.min(stage + 1, 4);
  const leaves: JSX.Element[] = [];
  for (let i = 0; i < leafPairs; i++) {
    const ly = cy - bodyR - 6 - i * 10 * scale;
    const spread = 14 + i * 4;
    const lsize = (10 - i * 1.2) * scale;
    leaves.push(
      <g key={`l${i}`}>
        <ellipse
          cx={cx - spread}
          cy={ly}
          rx={lsize}
          ry={lsize * 0.55}
          fill="#4ADE80"
          transform={`rotate(-35 ${cx - spread} ${ly})`}
          opacity={0.95}
        />
        <ellipse
          cx={cx + spread}
          cy={ly}
          rx={lsize}
          ry={lsize * 0.55}
          fill="#86EFAC"
          transform={`rotate(35 ${cx + spread} ${ly})`}
          opacity={0.95}
        />
      </g>
    );
  }

  const hasFlower = stage >= 3;
  const hasCrown = stage >= 4;
  const hasGlow = stage >= 4;

  return (
    <g>
      {/* Glow halo for ancient stage */}
      {hasGlow && (
        <circle cx={cx} cy={cy} r={bodyR + 18} fill="url(#petGlow)" opacity={0.6} />
      )}

      {/* Pot */}
      <path
        d={`M ${cx - 36} ${cy + bodyR - 4} L ${cx - 28} ${cy + bodyR + 36} L ${cx + 28} ${cy + bodyR + 36} L ${cx + 36} ${cy + bodyR - 4} Z`}
        fill="url(#potGrad)"
        stroke="#b8860b"
        strokeWidth="1.5"
      />
      <ellipse cx={cx} cy={cy + bodyR - 4} rx={36} ry={7} fill="#3a2a10" opacity={0.8} />

      {/* Stem */}
      <rect
        x={cx - 2.5}
        y={cy - bodyR - 4}
        width={5}
        height={bodyR + 8}
        rx={2.5}
        fill="#2f9e54"
      />

      {/* Leaves */}
      {leaves}

      {/* Flower on top */}
      {hasFlower && (
        <g>
          {[0, 72, 144, 216, 288].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const fx = cx + Math.cos(rad) * 11 * scale;
            const fy = cy - bodyR - 18 + Math.sin(rad) * 11 * scale;
            return (
              <ellipse
                key={`f${deg}`}
                cx={fx}
                cy={fy}
                rx={6 * scale}
                ry={4 * scale}
                fill="#FFD93D"
                transform={`rotate(${deg} ${fx} ${fy})`}
              />
            );
          })}
          <circle cx={cx} cy={cy - bodyR - 18} r={5 * scale} fill="#FF6B6B" />
        </g>
      )}

      {/* Crown */}
      {hasCrown && (
        <path
          d={`M ${cx - 16} ${cy - bodyR - 30} L ${cx - 10} ${cy - bodyR - 42} L ${cx - 4} ${cy - bodyR - 32} L ${cx} ${cy - bodyR - 44} L ${cx + 4} ${cy - bodyR - 32} L ${cx + 10} ${cy - bodyR - 42} L ${cx + 16} ${cy - bodyR - 30} Z`}
          fill="#FFD700"
          stroke="#b8860b"
          strokeWidth="1"
        />
      )}

      {/* Body */}
      <circle cx={cx} cy={cy} r={bodyR} fill="url(#bodyGrad)" stroke="#2f9e54" strokeWidth="1.5" />

      {/* Cheeks */}
      <circle cx={cx - bodyR * 0.5} cy={cy + bodyR * 0.2} r={bodyR * 0.16} fill="#FF6B6B" opacity={0.4} />
      <circle cx={cx + bodyR * 0.5} cy={cy + bodyR * 0.2} r={bodyR * 0.16} fill="#FF6B6B" opacity={0.4} />

      {/* Eyes */}
      <ellipse cx={cx - bodyR * 0.32} cy={cy - bodyR * 0.1} rx={bodyR * 0.1} ry={bodyR * 0.14} fill="#0a1f12" />
      <ellipse cx={cx + bodyR * 0.32} cy={cy - bodyR * 0.1} rx={bodyR * 0.1} ry={bodyR * 0.14} fill="#0a1f12" />
      <circle cx={cx - bodyR * 0.28} cy={cy - bodyR * 0.16} r={bodyR * 0.04} fill="#fff" />
      <circle cx={cx + bodyR * 0.36} cy={cy - bodyR * 0.16} r={bodyR * 0.04} fill="#fff" />

      {/* Smile */}
      <path
        d={`M ${cx - bodyR * 0.22} ${cy + bodyR * 0.22} Q ${cx} ${cy + bodyR * 0.42} ${cx + bodyR * 0.22} ${cy + bodyR * 0.22}`}
        stroke="#0a1f12"
        strokeWidth={2}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

export default function Pet({ size = "md", showStats = true, compact = false }: PetProps) {
  const t = useT();
  const pet = useStore((s) => s.pet);
  const level = getPetLevel(pet.xp);
  const stage = getPetStage(level);
  const progress = getPetProgress(pet.xp);
  const xpInLevel = pet.xp % PET_XP_PER_LEVEL;
  const xpToNext = PET_XP_PER_LEVEL - xpInLevel;

  const scale = size === "sm" ? 0.7 : size === "lg" ? 1.2 : 1;
  const svgH = size === "sm" ? 160 : size === "lg" ? 260 : 210;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        {/* Creature */}
        <motion.div
          key={stage}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="shrink-0"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width={svgH * 0.78} height={svgH} viewBox="0 0 200 230" className="overflow-visible">
              <defs>
                <radialGradient id="bodyGrad" cx="35%" cy="30%">
                  <stop offset="0%" stopColor="#86EFAC" />
                  <stop offset="60%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#2f9e54" />
                </radialGradient>
                <linearGradient id="potGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4a017" />
                  <stop offset="100%" stopColor="#8b6914" />
                </linearGradient>
                <radialGradient id="petGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#FFD93D" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#FFD93D" stopOpacity="0" />
                </radialGradient>
              </defs>
              <PetCreature stage={stage} scale={scale} />
            </svg>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-quest-primary" />
            <span className="font-display text-sm font-bold text-quest-primary">
              {t(`pet.stage${stage}`)}
            </span>
            <span className="text-[10px] font-body text-quest-muted px-1.5 py-0.5 rounded bg-quest-card/60">
              Lv.{level}
            </span>
          </div>

          {/* Growth progress bar */}
          <div className="mb-2">
            <div className="flex justify-between text-[10px] font-body text-quest-dim mb-1">
              <span>{t("pet.progress")}</span>
              <span>{xpInLevel}/{PET_XP_PER_LEVEL} XP</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-quest-card/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-quest-primary to-quest-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <div className="text-[10px] font-body text-quest-muted mt-1">
              {xpToNext} XP {t("pet.nextLevel")}
            </div>
          </div>

          {!compact && (
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-quest-card/40 px-2 py-1.5">
                <div className="font-display text-base font-bold text-quest-text">{pet.totalSessions}</div>
                <div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">{t("pet.sessions")}</div>
              </div>
              <div className="rounded-lg bg-quest-card/40 px-2 py-1.5">
                <div className="font-display text-base font-bold text-quest-text">{pet.totalMinutes}</div>
                <div className="text-[9px] font-body text-quest-muted uppercase tracking-wider">{t("pet.minutes")}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showStats && pet.totalSessions === 0 && (
        <p className="text-center text-[11px] text-quest-muted font-body mt-3 italic">
          {t("pet.empty")}
        </p>
      )}
    </div>
  );
}
