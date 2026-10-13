import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Move } from "../timeline";

// Standbild mit Kamerabewegung laut Technik-Spalte der Shotliste:
// push = langsame Skalierung mit sanfter Beschleunigung, pan = Schwenk über ein breites Bild,
// crop = fester engerer Ausschnitt, static = unbewegt.
export const Still: React.FC<{ src: string; move?: Move; width?: number; height?: number }> = ({ src, move, width, height }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width: W, height: H } = useVideoConfig();
  const p = interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
    // "out": setzt mit Tempo ein, damit eine laufende Fahrt aus der vorigen Einstellung ohne Ruck weitergeht
    easing: move?.kind === "push" && move.ease === "out" ? Easing.out(Easing.sin) : Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (move?.kind === "pan" && width && height) {
    // Bild auf Bildhöhe skalieren und horizontal verschieben
    const scaledW = (width / height) * H;
    const travel = scaledW - W;
    const x = -travel * (move.from + (move.to - move.from) * p);
    return (
      <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
        <Img src={staticFile(src)} style={{ position: "absolute", height: H, width: scaledW, left: 0, top: 0, transform: `translateX(${x}px)` }} />
      </AbsoluteFill>
    );
  }

  let scale = 1;
  let origin = "50% 50%";
  if (move?.kind === "push") {
    scale = move.from + (move.to - move.from) * p;
    origin = move.origin ?? origin;
  } else if (move?.kind === "crop") {
    scale = move.scale;
  }
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`, transformOrigin: origin }} />
    </AbsoluteFill>
  );
};
