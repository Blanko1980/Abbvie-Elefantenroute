import { Composition } from "remotion";
import { Preflight } from "./Preflight";

export const FPS = 24;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="Preflight" component={Preflight} durationInFrames={2 * FPS} fps={FPS} width={WIDTH} height={HEIGHT} />
    </>
  );
};
