import { AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig } from "remotion";

// Veo-Clip, Ausschnitt ab "from" Sekunden. Der Veo-Ton ist immer stumm geschaltet.
export const Clip: React.FC<{ src: string; from: number }> = ({ src, from }) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <OffthreadVideo src={staticFile(src)} startFrom={Math.round(from * fps)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </AbsoluteFill>
  );
};
