import { AbsoluteFill, Easing, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Move } from "../timeline";

// Veo-Clip, Ausschnitt ab "from" Sekunden. Der Veo-Ton ist immer stumm geschaltet.
// Optional ein langsamer Push wie bei Standbildern (Skalierung mit sanfter Beschleunigung).
export const Clip: React.FC<{ src: string; from: number; move?: Move }> = ({ src, from, move }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const p = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    easing: Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = move?.kind === "push" ? move.from + (move.to - move.from) * p : move?.kind === "crop" ? move.scale : 1;
  const origin = move?.kind === "push" ? move.origin ?? "50% 50%" : "50% 50%";
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <OffthreadVideo src={staticFile(src)} startFrom={Math.round(from * fps)} muted
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`, transformOrigin: origin }} />
    </AbsoluteFill>
  );
};
