import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  User,
  Users,
  Palette,
  Check,
} from "lucide-react";
import { useStore, Player } from "@/store/useStore";
import { useT } from "@/i18n/translations";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PLAYER_COLORS = [
  "#FFD93D", // quest-primary (yellow)
  "#4ADE80", // quest-accent (green)
  "#86EFAC", // quest-accentLight
  "#FFE66D", // quest-primaryLight
  "#FF6B6B", // quest-sos (red)
  "#FFD700", // quest-gold
  "#F472B6", // pink
  "#A78BFA", // purple
  "#38BDF8", // sky blue
  "#FB923C", // orange
];

/* ------------------------------------------------------------------ */
/*  Player card sub-component                                          */
/* ------------------------------------------------------------------ */

function PlayerCard({
  label,
  player,
  onChangeName,
  onChangeColor,
  delay,
}: {
  label: string;
  player: Player;
  onChangeName: (name: string) => void;
  onChangeColor: (color: string) => void;
  delay: number;
}) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-strong rounded-3xl p-6 mb-5"
    >
      {/* Player label */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${player.color}20` }}
        >
          <User className="w-5 h-5" style={{ color: player.color }} />
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-quest-text">
            {label}
          </h2>
          <p className="text-xs text-quest-dim font-body">
            {player.name || t("team.unnamed")}
          </p>
        </div>
      </div>

      {/* Name input */}
      <div className="mb-4">
        <label className="text-[10px] font-body text-quest-muted uppercase tracking-wider mb-2 block">
          {t("team.name")}
        </label>
        <input
          type="text"
          value={player.name}
          onChange={(e) => onChangeName(e.target.value)}
          placeholder="Enter name..."
          maxLength={20}
          className="w-full px-4 py-3 rounded-xl bg-quest-bg/60 border border-quest-border text-quest-text font-body placeholder-quest-muted/50 focus:outline-none focus:border-quest-primary/60 focus:ring-2 focus:ring-quest-primary/20 transition-all"
        />
      </div>

      {/* Color picker */}
      <div>
        <label className="text-[10px] font-body text-quest-muted uppercase tracking-wider mb-2 block flex items-center gap-1">
          <Palette className="w-3 h-3" />
          {t("team.color")}
        </label>
        <div className="flex flex-wrap gap-2.5">
          {PLAYER_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => onChangeColor(color)}
              className={`relative w-9 h-9 rounded-full transition-all hover:scale-110 ${
                player.color === color ? "ring-2 ring-offset-2 ring-offset-quest-bg" : ""
              }`}
              style={{
                backgroundColor: color,
                outlineColor: player.color === color ? color : undefined,
              }}
              type="button"
            >
              {player.color === color && (
                <Check
                  className="w-4 h-4 absolute inset-0 m-auto"
                  style={{ color: color === "#FFD93D" || color === "#FFE66D" || color === "#FFD700" || color === "#86EFAC" ? "#0a1f12" : "#ffffff" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function TeamSetup() {
  const navigate = useNavigate();
  const t = useT();

  /* Read player state from the store */
  const player1FromStore = useStore((s) => s.player1);
  const player2FromStore = useStore((s) => s.player2);
  const setPlayer1 = useStore((s) => s.setPlayer1);
  const setPlayer2 = useStore((s) => s.setPlayer2);

  /* Local state (initialised from store or defaults) */
  const [player1, setLocalPlayer1] = useState<Player>(
    player1FromStore ?? { name: "Player 1", color: "#FFD93D", xp: 0, wordsLearned: 0 }
  );
  const [player2, setLocalPlayer2] = useState<Player>(
    player2FromStore ?? { name: "Player 2", color: "#4ADE80", xp: 0, wordsLearned: 0 }
  );

  const handleSave = () => {
    setPlayer1(player1);
    setPlayer2(player2);
    navigate("/");
  };

  const canSave = player1.name.trim().length > 0 && player2.name.trim().length > 0;

  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Ambient blurs */}
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
            className="sky-copy flex items-center gap-2 text-quest-dim hover:text-quest-text text-sm font-body transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t("global.home")}</span>
          </button>

          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass">
            <Users className="w-4 h-4 text-quest-accent" />
            <span className="text-xs font-body tracking-wider text-quest-dim uppercase">
              {t("team.title")}
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
            <span className="gradient-text">{t("team.title")}</span>
          </h1>
          <p className="sky-copy font-body text-quest-dim text-sm">
            {t("team.subtitle")}
          </p>
        </motion.div>

        {/* Preview avatars */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-6 mb-8"
        >
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: `${player1.color}25` }}
            >
              <User className="w-8 h-8" style={{ color: player1.color }} />
            </div>
            <span className="text-xs font-body text-quest-dim max-w-[80px] truncate">
              {player1.name || t("team.player1")}
            </span>
          </div>

          <div className="text-quest-muted font-display text-lg">{t("team.vs")}</div>

          <div className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: `${player2.color}25` }}
            >
              <User className="w-8 h-8" style={{ color: player2.color }} />
            </div>
            <span className="text-xs font-body text-quest-dim max-w-[80px] truncate">
              {player2.name || t("team.player2")}
            </span>
          </div>
        </motion.div>

        {/* Player 1 */}
        <PlayerCard
          label={t("team.player1")}
          player={player1}
          onChangeName={(name) => setLocalPlayer1({ ...player1, name })}
          onChangeColor={(color) => setLocalPlayer1({ ...player1, color })}
          delay={0.2}
        />

        {/* Player 2 */}
        <PlayerCard
          label={t("team.player2")}
          player={player2}
          onChangeName={(name) => setLocalPlayer2({ ...player2, name })}
          onChangeColor={(color) => setLocalPlayer2({ ...player2, color })}
          delay={0.3}
        />

        {/* Save button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-2"
        >
          <motion.button
            onClick={handleSave}
            disabled={!canSave}
            className="group relative w-full py-5 rounded-2xl font-display text-lg font-bold tracking-wide overflow-hidden transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={{ scale: canSave ? 1.02 : 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-quest-primary via-quest-primaryLight to-quest-accent bg-[length:200%_100%] group-hover:animate-shimmer" />
            <span className="relative flex items-center justify-center gap-3 text-quest-bg">
              <Save className="w-5 h-5" />
              {t("team.save")}
            </span>
          </motion.button>
        </motion.div>

        <div className="flex-1" />
      </div>
    </div>
  );
}
