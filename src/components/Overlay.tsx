import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";

// Einblendung im Doku-Untertitelstil: weiß, serifenlos, in Anführungszeichen, unteres Drittel, zentriert.
export const Overlay: React.FC<{ text: string; fadeIn: number; visible: number; fadeOut: number }> = ({ text, fadeIn, visible, fadeOut }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const a = fadeIn * fps, b = (fadeIn + visible) * fps, c = (fadeIn + visible + fadeOut) * fps;
  const opacity = interpolate(frame, [0, a, b, c], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      {/* weicher dunkler Verlauf im unteren Drittel für die Lesbarkeit, blendet mit der Einblendung */}
      <AbsoluteFill style={{ opacity, background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 22%, rgba(0,0,0,0) 40%)" }} />
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 150 }}>
      <div style={{ fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 52, color: "#fff", opacity, textAlign: "center", maxWidth: 1500,
        textShadow: "0 2px 14px rgba(0,0,0,0.55), 0 0 2px rgba(0,0,0,0.4)" }}>
        {text}
      </div>
    </AbsoluteFill>
    </AbsoluteFill>
  );
};
