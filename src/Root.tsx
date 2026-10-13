import { Composition } from "remotion";
import { Preflight } from "./Preflight";
import { Film } from "./Film";
import { timeline } from "./timeline";

export const FPS = 24;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Film" component={Film} durationInFrames={timeline.durationInFrames} fps={timeline.fps} width={timeline.width} height={timeline.height} />
      <Composition id="Preflight" component={Preflight} durationInFrames={2 * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
    </>
  );
};
