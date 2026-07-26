type PixelIconProps = {
  kind: "console" | "chat" | "potion" | "controller" | "heart" | "star" | "globe" | "sword";
};

function PixelIcon({ kind }: PixelIconProps) {
  const common = { shapeRendering: "crispEdges" as const };

  if (kind === "console") return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="12" y="6" width="40" height="52" fill="#ff91d1" />
      <rect x="8" y="10" width="4" height="44" fill="#fff4df" />
      <rect x="52" y="10" width="4" height="44" fill="#8d4d9f" />
      <rect x="16" y="13" width="32" height="22" fill="#17131f" />
      <rect x="20" y="17" width="24" height="14" fill="#79e55b" />
      <rect x="23" y="21" width="5" height="5" fill="#3b8a42" />
      <rect x="31" y="21" width="5" height="5" fill="#3b8a42" />
      <rect x="39" y="21" width="3" height="5" fill="#3b8a42" />
      <rect x="18" y="42" width="16" height="5" fill="#17131f" />
      <rect x="23" y="37" width="5" height="15" fill="#17131f" />
      <rect x="42" y="42" width="6" height="6" fill="#17131f" />
    </svg>
  );

  if (kind === "chat") return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="8" y="10" width="48" height="36" fill="#2ed8e6" />
      <rect x="12" y="14" width="40" height="28" fill="#251d33" />
      <rect x="16" y="22" width="6" height="6" fill="#fff4df" />
      <rect x="29" y="22" width="6" height="6" fill="#fff4df" />
      <rect x="42" y="22" width="6" height="6" fill="#fff4df" />
      <rect x="16" y="46" width="8" height="8" fill="#2ed8e6" />
      <rect x="24" y="42" width="8" height="8" fill="#2ed8e6" />
    </svg>
  );

  if (kind === "potion") return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="25" y="5" width="14" height="8" fill="#fff4df" />
      <rect x="21" y="13" width="22" height="7" fill="#b967ff" />
      <rect x="17" y="20" width="30" height="8" fill="#fff4df" />
      <rect x="13" y="28" width="38" height="24" fill="#ff8c32" />
      <rect x="17" y="32" width="30" height="16" fill="#ffd83d" />
      <rect x="21" y="35" width="7" height="7" fill="#fff4df" />
      <rect x="9" y="32" width="4" height="16" fill="#8d4d9f" />
      <rect x="51" y="32" width="4" height="16" fill="#8d4d9f" />
    </svg>
  );

  if (kind === "controller") return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="10" y="23" width="44" height="24" fill="#fff4df" />
      <rect x="6" y="29" width="8" height="22" fill="#b9a8d1" />
      <rect x="50" y="29" width="8" height="22" fill="#b9a8d1" />
      <rect x="17" y="30" width="14" height="5" fill="#17131f" />
      <rect x="21" y="26" width="5" height="14" fill="#17131f" />
      <rect x="41" y="29" width="5" height="5" fill="#ff5b48" />
      <rect x="47" y="35" width="5" height="5" fill="#2ed8e6" />
      <rect x="34" y="39" width="5" height="4" fill="#73558d" />
    </svg>
  );

  if (kind === "heart") return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="12" y="14" width="16" height="8" fill="#ff5b6e" />
      <rect x="36" y="14" width="16" height="8" fill="#ff5b6e" />
      <rect x="8" y="22" width="48" height="16" fill="#ff5b6e" />
      <rect x="14" y="38" width="36" height="8" fill="#ff5b6e" />
      <rect x="21" y="46" width="22" height="7" fill="#ff5b6e" />
      <rect x="28" y="53" width="8" height="5" fill="#ff5b6e" />
      <rect x="15" y="20" width="8" height="6" fill="#ff9aaa" />
    </svg>
  );

  if (kind === "star") return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="27" y="5" width="10" height="12" fill="#ffd83d" />
      <rect x="17" y="17" width="30" height="10" fill="#ffd83d" />
      <rect x="7" y="27" width="50" height="10" fill="#ffd83d" />
      <rect x="14" y="37" width="36" height="8" fill="#ffd83d" />
      <rect x="18" y="45" width="10" height="12" fill="#ffd83d" />
      <rect x="36" y="45" width="10" height="12" fill="#ffd83d" />
      <rect x="25" y="24" width="5" height="5" fill="#9b6b27" />
      <rect x="36" y="24" width="5" height="5" fill="#9b6b27" />
    </svg>
  );

  if (kind === "globe") return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="17" y="7" width="30" height="5" fill="#2ed8e6" />
      <rect x="10" y="12" width="44" height="9" fill="#2ed8e6" />
      <rect x="6" y="21" width="52" height="22" fill="#2ed8e6" />
      <rect x="10" y="43" width="44" height="9" fill="#2ed8e6" />
      <rect x="17" y="52" width="30" height="5" fill="#2ed8e6" />
      <rect x="15" y="16" width="15" height="10" fill="#79d34c" />
      <rect x="25" y="24" width="12" height="9" fill="#79d34c" />
      <rect x="39" y="34" width="14" height="12" fill="#79d34c" />
      <rect x="14" y="40" width="13" height="8" fill="#79d34c" />
      <rect x="20" y="10" width="4" height="44" fill="#fff4df" opacity=".45" />
    </svg>
  );

  return (
    <svg viewBox="0 0 64 64" {...common}>
      <rect x="28" y="4" width="8" height="10" fill="#fff4df" />
      <rect x="23" y="10" width="18" height="10" fill="#ffd83d" />
      <rect x="18" y="18" width="20" height="10" fill="#ffd83d" />
      <rect x="14" y="25" width="18" height="9" fill="#ffd83d" />
      <rect x="28" y="28" width="8" height="24" fill="#2ed8e6" />
      <rect x="34" y="34" width="8" height="23" fill="#2ed8e6" />
      <rect x="42" y="50" width="7" height="10" fill="#73558d" />
    </svg>
  );
}

const leftIcons: PixelIconProps["kind"][] = ["console", "chat", "potion", "star"];
const rightIcons: PixelIconProps["kind"][] = ["sword", "controller", "heart", "globe"];

export default function PixelSideDecor() {
  return (
    <div className="pixel-side-decor" aria-hidden="true">
      <div className="pixel-sticker-column pixel-sticker-column-left">
        {leftIcons.map((kind, index) => (
          <div className={`pixel-sticker pixel-sticker-${index + 1}`} key={kind}>
            <PixelIcon kind={kind} />
          </div>
        ))}
      </div>
      <div className="pixel-sticker-column pixel-sticker-column-right">
        {rightIcons.map((kind, index) => (
          <div className={`pixel-sticker pixel-sticker-${index + 1}`} key={kind}>
            <PixelIcon kind={kind} />
          </div>
        ))}
      </div>
    </div>
  );
}
