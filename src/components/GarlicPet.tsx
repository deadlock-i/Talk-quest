import { useId } from "react";

export default function GarlicPet({ stage, className = "" }: { stage: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const final = stage === 4;
  const body = "#fff2ce";
  return (
    <svg viewBox="0 0 180 180" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`garlicBody-${id}`} cx="35%" cy="25%"><stop offset="0" stopColor="#fffef5" /><stop offset=".68" stopColor={body} /><stop offset="1" stopColor="#e7c98e" /></radialGradient>
        <linearGradient id={`garlicBow-${id}`} x1="0" x2="1"><stop stopColor="#ff9fc9" /><stop offset="1" stopColor="#ff4d91" /></linearGradient>
      </defs>
      {final && <><circle cx="90" cy="88" r="75" fill="none" stroke="#ff9ee8" strokeWidth="7" opacity=".8" strokeDasharray="5 8" /><circle cx="90" cy="88" r="66" fill="#ffb7f0" opacity=".12" /></>}
      {stage >= 3 && <path d="M48 48 Q30 13 56 30 L70 48" fill={body} stroke="#bf9b63" strokeWidth="4" />}
      {stage >= 3 && <path d="M132 48 Q150 13 124 30 L110 48" fill={body} stroke="#bf9b63" strokeWidth="4" />}
      {stage === 1 && <path d="M83 38 Q75 8 88 19 Q95 3 100 34" fill="none" stroke="#62c86d" strokeWidth="8" strokeLinecap="round" />}
      {final && <path d="M70 35 L78 17 L90 32 L103 15 L109 40 Z" fill="#ffd84d" stroke="#bd8632" strokeWidth="3" />}
      <path d="M90 43 C72 32 43 47 43 76 C43 104 57 137 90 145 C123 137 137 104 137 76 C137 47 108 32 90 43 Z" fill={`url(#garlicBody-${id})`} stroke="#bf9b63" strokeWidth="4" />
      <path d="M90 45 C76 54 70 77 74 104 C76 121 83 136 90 143" fill="none" stroke="#e4c486" strokeWidth="3" opacity=".8" />
      <path d="M90 45 C104 54 110 77 106 104 C104 121 97 136 90 143" fill="none" stroke="#e4c486" strokeWidth="3" opacity=".8" />
      {stage >= 2 && <><ellipse cx="36" cy="96" rx="13" ry="23" fill={body} stroke="#bf9b63" strokeWidth="4" transform="rotate(28 36 96)" /><ellipse cx="144" cy="96" rx="13" ry="23" fill={body} stroke="#bf9b63" strokeWidth="4" transform="rotate(-28 144 96)" /></>}
      {stage === 0 ? <circle cx="90" cy="82" r="6" fill="#d2a968" /> : <>
        <ellipse cx="72" cy="78" rx={final ? 12 : 9} ry={final ? 15 : 12} fill="#342b32" /><ellipse cx="108" cy="78" rx={final ? 12 : 9} ry={final ? 15 : 12} fill="#342b32" />
        <circle cx="68" cy="73" r="4" fill="#fff" /><circle cx="104" cy="73" r="4" fill="#fff" />
        <ellipse cx="60" cy="101" rx="12" ry="7" fill="#ff8eae" opacity=".7" /><ellipse cx="120" cy="101" rx="12" ry="7" fill="#ff8eae" opacity=".7" />
        <path d="M78 106 Q90 117 102 106" fill="none" stroke="#c45c77" strokeWidth="4" strokeLinecap="round" />
      </>}
      {stage >= 3 && <path d="M58 127 Q90 146 122 127 L119 157 Q90 166 61 157 Z" fill={`url(#garlicBow-${id})`} stroke="#bd3e75" strokeWidth="3" />}
      {stage >= 3 && <circle cx="90" cy="143" r="9" fill="#ffd84d" stroke="#bd7b32" strokeWidth="3" />}
      {final && <><circle cx="28" cy="43" r="5" fill="#ffd84d" /><circle cx="151" cy="48" r="5" fill="#7de4ff" /><circle cx="27" cy="130" r="5" fill="#ff89bd" /><circle cx="153" cy="129" r="5" fill="#8eea75" /></>}
    </svg>
  );
}
