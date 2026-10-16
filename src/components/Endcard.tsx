import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";

// Endcard: reines Weiß, schwarze serifenlose Schrift. Zeile 1 sofort ohne Überblendung, Zeile 2 ab line2At darunter.
export const Endcard: React.FC<{ line1: string; line2: string | null; line2At: number | null }> = ({ line1, line2, line2At }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#fff", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 74, letterSpacing: "0.04em", color: "#000" }}>{line1}</div>
      {line2 && line2At != null ? (
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 40, color: "#000", marginTop: 36, visibility: frame >= line2At * fps ? "visible" : "hidden" }}>
          {line2}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
