// Misst Bundling und Rendering getrennt (Phase 0).
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "node:path";

const browserExecutable = process.env.REMOTION_BROWSER ?? null;
const t0 = Date.now();
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const tBundle = Date.now() - t0;
const res = {};
for (const [label, scale, crf] of [["720p", 2 / 3, 28], ["1080p", 1, 20]]) {
  const comp = await selectComposition({ serveUrl, id: "Preflight", browserExecutable });
  const t1 = Date.now();
  await renderMedia({ serveUrl, composition: comp, codec: "h264", crf, scale, browserExecutable,
    outputLocation: `${process.argv[2]}/bench-${label}.mp4`, concurrency: 4 });
  res[label] = Date.now() - t1;
}
console.log(JSON.stringify({ bundleMs: tBundle, renderMs: res }));
