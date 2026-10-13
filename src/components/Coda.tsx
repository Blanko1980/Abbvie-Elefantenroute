import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";

const Card: React.FC<{ title: string; body: string; fade: number }> = ({ title, body, fade }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const opacity = interpolate(frame, [0, fade * fps, durationInFrames - fade * fps, durationInFrames], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", opacity, padding: "0 260px" }}>
      <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 60, color: "#fff", marginBottom: 28, textAlign: "center" }}>{title}</div>
      <div style={{ fontFamily: FONT_FAMILY, fontWeight: 400, fontSize: 38, lineHeight: 1.45, color: "#fff", textAlign: "center" }}>{body}</div>
    </AbsoluteFill>
  );
};

// Coda: vier Textkarten weiß auf Schwarz, ohne Sprecher.
export const Coda: React.FC<{ cards: { title: string; body: string }[]; cardDuration: number; fade: number }> = ({ cards, cardDuration, fade }) => {
  const { fps } = useVideoConfig();
  const d = Math.round(cardDuration * fps);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {cards.map((c, i) => (
        <Sequence key={i} from={i * d} durationInFrames={d} name={`Coda ${i + 1}`}>
          <Card title={c.title} body={c.body} fade={fade} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
