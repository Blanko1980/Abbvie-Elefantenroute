// Ergebnis der Qualitätsprüfung eintragen.
// node scripts/review.mjs accept <ID> <Versuch> <Zielordner: refs|public/stills> [Notiz]
// node scripts/review.mjs reject <ID> <Versuch> <Begründung>
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { setStatus, loadManifest, saveManifest } from "./lib/assets.mjs";

const [cmd, id, attemptStr, a3, a4] = process.argv.slice(2);
const attempt = Number(attemptStr);
const ext = existsSync(`work/candidates/${id}_a${attempt}.mp4`) ? "mp4" : "jpg";
const src = `work/candidates/${id}_a${attempt}.${ext}`;
if (cmd === "accept") {
  mkdirSync(a3, { recursive: true });
  const dest = `${a3}/${id}.${ext}`;
  copyFileSync(src, dest);
  // Ein älterer akzeptierter Versuch derselben ID wird damit ersetzt.
  const m = loadManifest();
  for (const e of m.assets) if (e.id === id && e.attempt !== attempt && e.file) { e.file = null; e.status = "abgelehnt"; e.note = (e.note ?? "") + " (ersetzt)"; }
  saveManifest(m);
  const e = setStatus(id, attempt, "zur Freigabe", a4);
  e.file = dest;
  const m2 = loadManifest();
  Object.assign(m2.assets.find((x) => x.id === id && x.attempt === attempt), { file: dest });
  saveManifest(m2);
  console.log(`${id} Versuch ${attempt} -> ${dest}`);
} else if (cmd === "reject") {
  setStatus(id, attempt, "abgelehnt", a3);
  console.log(`${id} Versuch ${attempt} abgelehnt`);
} else {
  console.error("accept|reject");
  process.exit(1);
}
