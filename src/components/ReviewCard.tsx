import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Globe, Zap, ChevronDown, StickyNote, Check } from "lucide-react";
import { useStore, ReviewRecord } from "@/store/useStore";
import { useT } from "@/i18n/translations";

function formatDate(ts: number, lang: "en" | "zh") {
  const d = new Date(ts);
  if (lang === "zh") {
    return `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  return d.toLocaleDateString("en", { month: "short", day: "numeric" }) +
    ` ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function ReviewCard({ review, defaultOpen = false }: { review: ReviewRecord; defaultOpen?: boolean }) {
  const t = useT();
  const uiLanguage = useStore((s) => s.uiLanguage);
  const updateReviewNote = useStore((s) => s.updateReviewNote);
  const [open, setOpen] = useState(defaultOpen);
  const [notes, setNotes] = useState(review.notes);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateReviewNote(review.id, notes);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-quest-card/30 transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-quest-accent/15 border border-quest-accent/30 flex items-center justify-center shrink-0">
          <Zap className="w-4 h-4 text-quest-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-bold text-quest-text truncate">{review.topic || "Free Talk"}</p>
          <div className="flex items-center gap-3 text-[10px] font-body text-quest-muted mt-0.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {review.durationMinutes}m
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              +{review.xp} XP
            </span>
            <span>{formatDate(review.date, uiLanguage)}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-quest-dim transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-3">
              {/* Time split */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-quest-primary/10 border border-quest-primary/20 px-2 py-1.5 text-center">
                  <div className="font-display text-sm font-bold text-quest-primary">{review.enMinutes}m</div>
                  <div className="text-[9px] font-body text-quest-muted uppercase">EN</div>
                </div>
                <div className="rounded-lg bg-quest-accent/10 border border-quest-accent/20 px-2 py-1.5 text-center">
                  <div className="font-display text-sm font-bold text-quest-accent">{review.zhMinutes}m</div>
                  <div className="text-[9px] font-body text-quest-muted uppercase">ZH</div>
                </div>
                <div className="rounded-lg bg-quest-card/40 border border-quest-border/40 px-2 py-1.5 text-center">
                  <div className="font-display text-sm font-bold text-quest-text">{review.durationMinutes}m</div>
                  <div className="text-[9px] font-body text-quest-muted uppercase">{uiLanguage === "zh" ? "总" : "Total"}</div>
                </div>
              </div>

              {/* Challenge words */}
              {review.challenges.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {review.challenges.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-quest-accent/10 border border-quest-accent/20 text-[10px] font-body text-quest-accent">
                      {c}
                    </span>
                  ))}
                </div>
              )}

              {/* Questions */}
              {review.questions.length > 0 && (
                <div>
                  <div className="text-[10px] font-body text-quest-muted uppercase tracking-wider mb-1.5">
                    {t("reviews.questions")}
                  </div>
                  <ul className="space-y-1">
                    {review.questions.map((q, i) => (
                      <li key={i} className="text-[11px] font-body text-quest-dim flex gap-1.5">
                        <span className="text-quest-primary shrink-0">{i + 1}.</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reflection notes */}
              <div className="pt-2 border-t border-quest-border/40">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <StickyNote className="w-3.5 h-3.5 text-quest-dim" />
                  <span className="text-[10px] font-body text-quest-muted uppercase tracking-wider">{t("reviews.notes")}</span>
                </div>
                {editing ? (
                  <div>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={t("reviews.notesPlaceholder")}
                      rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-quest-bg/60 border border-quest-border text-quest-text font-body text-xs placeholder-quest-muted/50 focus:outline-none focus:border-quest-primary/50 resize-none"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 rounded-md bg-quest-primary/20 border border-quest-primary/40 text-quest-primary text-[11px] font-body font-medium hover:bg-quest-primary/30"
                      >
                        {t("reviews.save")}
                      </button>
                      <button
                        onClick={() => { setNotes(review.notes); setEditing(false); }}
                        className="px-3 py-1 rounded-md bg-quest-card/40 border border-quest-border/40 text-quest-dim text-[11px] font-body hover:text-quest-text"
                      >
                        {uiLanguage === "zh" ? "取消" : "Cancel"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-left w-full"
                  >
                    {review.notes ? (
                      <p className="text-[11px] font-body text-quest-text/80 italic">"{review.notes}"</p>
                    ) : (
                      <p className="text-[11px] font-body text-quest-muted italic">+ {t("reviews.notesPlaceholder")}</p>
                    )}
                  </button>
                )}
                {saved && (
                  <p className="text-[10px] text-quest-success font-body mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> {t("reviews.saved")}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
