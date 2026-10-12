import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { FONT_FAMILY } from "./fonts";

// 2-Sekunden-Testkomposition für Phase 0: langsamer Push, Text in Code.
export const Preflight: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const scale = interpolate(frame, [0, durationInFrames - 1], [1, 1.04], {
    easing: Easing.inOut(Easing.sin),
  });
  const opacity = interpolate(frame, [0, 7, durationInFrames - 8, durationInFrames - 1], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale})`,
          background: "radial-gradient(circle at 40% 45%, #f4efe6 0%, #c9b79c 55%, #6e6a63 100%)",
        }}
      />
      <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 140 }}>
        <div style={{ fontFamily: FONT_FAMILY, fontSize: 56, color: "#fff", opacity, textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>
          „Testrendering Phase 0“
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
