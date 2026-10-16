// Typen und Zugriff auf data/timeline.json (erzeugt von scripts/build-timeline.mjs).
import raw from "../data/timeline.json";

export type Move =
  | { kind: "push"; from: number; to: number; origin?: string; ease?: "inOut" | "out" }
  | { kind: "pan"; from: number; to: number }
  | { kind: "crop"; scale: number }
  | { kind: "static" };

export type Shot = {
  id: string;
  type: "black" | "still" | "clip" | "endcard" | "coda";
  start: number;
  duration: number;
  src: string | null;
  move?: Move;
  clip?: { from: number; to: number };
  crossfadeIn?: number;
  width?: number;
  height?: number;
};

export type Scene = { id: string; name: string; start: number; end: number; duration: number; shots: Shot[] };
export type VoiceCue = { id: string; file: string; start: number; text: string };
export type Overlay = { scene: string; text: string; start: number; fadeIn: number; visible: number; fadeOut: number };

export type Timeline = {
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
  audioTracks: { voice: string; music: string | null; ambience: string | null };
  scenes: Scene[];
  voice: VoiceCue[];
  overlays: Overlay[];
  endcard: { line1: string; line2: string | null; line1At: number; line2At: number | null };
  coda: { cardDuration: number; fade: number; cards: { title: string; body: string }[] };
};

export const timeline = raw as unknown as Timeline;
export const sec = (s: number) => Math.round(s * timeline.fps);
