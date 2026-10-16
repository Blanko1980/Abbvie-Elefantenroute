import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { timeline, sec, type Shot } from "./timeline";
import { Still } from "./components/Still";
import { Clip } from "./components/Clip";
import { Overlay } from "./components/Overlay";
import { Endcard } from "./components/Endcard";
import { Coda } from "./components/Coda";
import { MusicTrack } from "./components/Music";

// Überblendung am Anfang einer Einstellung (nur Szene 5)
const FadeIn: React.FC<{ seconds?: number; children: React.ReactNode }> = ({ seconds, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = seconds ? interpolate(frame, [0, seconds * fps], [0, 1], { extrapolateRight: "clamp" }) : 1;
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const ShotView: React.FC<{ shot: Shot }> = ({ shot }) => {
  switch (shot.type) {
    case "black":
      return <AbsoluteFill style={{ backgroundColor: "#000" }} />;
    case "still":
      return <Still src={shot.src!} move={shot.move} width={shot.width} height={shot.height} />;
    case "clip":
      return <Clip src={shot.src!} from={shot.clip!.from} move={shot.move} />;
    case "endcard":
      return <Endcard line1={timeline.endcard.line1} line2={timeline.endcard.line2} line2At={timeline.endcard.line2At} />;
    case "coda":
      return <Coda cards={timeline.coda.cards} cardDuration={timeline.coda.cardDuration} fade={timeline.coda.fade} />;
  }
};

// Leere, benannte Audiospur: wird später nur noch befüllt (Musik, Raumton).
const AudioTrack: React.FC<{ name: string; src: string | null }> = ({ name, src }) => (
  <Sequence name={name} layout="none">{src ? <Audio src={staticFile(src)} /> : null}</Sequence>
);

export const Film: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {timeline.scenes.flatMap((scene) =>
      scene.shots.map((shot) => (
        <Sequence key={`${scene.id}-${shot.id}`} name={`${scene.id} ${shot.id}`} from={sec(shot.start)} durationInFrames={sec(shot.start + shot.duration) - sec(shot.start)}>
          <FadeIn seconds={shot.crossfadeIn}>
            <ShotView shot={shot} />
          </FadeIn>
        </Sequence>
      )),
    )}
    {timeline.overlays.map((o, i) => (
      <Sequence key={`ov-${i}`} name={`Einblendung ${i + 1}`} from={sec(o.start)} durationInFrames={sec(o.fadeIn + o.visible + o.fadeOut)}>
        <Overlay text={o.text} fadeIn={o.fadeIn} visible={o.visible} fadeOut={o.fadeOut} />
      </Sequence>
    ))}
    <Sequence name="voice" layout="none">
      {timeline.voice.map((v) => (
        <Sequence key={v.id} name={`voice ${v.id}`} from={sec(v.start)} layout="none">
          <Audio src={staticFile(v.file)} />
        </Sequence>
      ))}
    </Sequence>
    <MusicTrack />
    <AudioTrack name="ambience" src={timeline.audioTracks.ambience} />
  </AbsoluteFill>
);
