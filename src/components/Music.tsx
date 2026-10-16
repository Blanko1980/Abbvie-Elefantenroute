import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { timeline, sec, type MusicCue } from "../timeline";

const db = (x: number) => Math.pow(10, x / 20);
const { music } = timeline;

// Ducking: unter jedem Sprechersatz um duckDb leiser, mit Rampen (gleiche Kurve wie scripts/music-mix.py)
const duckAt = (t: number) => {
  let g = 1;
  const low = db(music.duckDb);
  for (const v of timeline.voice) {
    const a = v.speechStart - music.duckLead;
    const b = v.end + music.duckTail;
    if (t < a || t > b) continue;
    const inRamp = Math.min(1, (t - a) / music.duckRamp);
    const outRamp = Math.min(1, (b - t) / music.duckRamp);
    const k = Math.min(inRamp, outRamp);
    g = Math.min(g, 1 + (low - 1) * k);
  }
  return g;
};

const Cue: React.FC<{ cue: MusicCue }> = ({ cue }) => {
  const { fps } = useVideoConfig();
  return (
    <Audio
      src={staticFile(cue.file)}
      volume={(f) => {
        const t = cue.start + f / fps;
        let g = db(cue.gainDb) * duckAt(t);
        if (cue.cutAt != null && cue.fadeOut > 0) g *= Math.max(0, Math.min(1, (cue.cutAt - t) / cue.fadeOut));
        return g;
      }}
    />
  );
};

// Musikspur: jedes Stück als eigene Sequenz, bei cutAt endet es (davor ausgeblendet)
export const MusicTrack: React.FC = () => (
  <Sequence name="music" layout="none">
    {music.cues.map((c) => (
      <Sequence key={c.id} name={`music ${c.id}`} from={sec(c.start)} durationInFrames={c.cutAt != null ? sec(c.cutAt) - sec(c.start) : undefined} layout="none">
        <Cue cue={c} />
      </Sequence>
    ))}
  </Sequence>
);
