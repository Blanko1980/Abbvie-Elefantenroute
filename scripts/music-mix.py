"""Mischt Sprecher und Musik im Filmtiming (Hörprobe ohne Video) und schreibt die Musikspur-Daten für Remotion.

Musik: Einsätze, Pegel und Ducking aus data/timeline.json (Feld music, erzeugt aus data/music/mix.json).
python3 scripts/music-mix.py <ausgabe.mp3>
"""
import json, subprocess, sys
import numpy as np

SR = 44100
t = json.load(open("data/timeline.json"))
mix = t["music"]
total = t["durationSeconds"]
n = int(total * SR)


def load(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).reshape(-1, 2)


def db(x):
    return 10 ** (x / 20)


# Ducking-Hüllkurve: unter jedem Sprechersatz um duckDb leiser, mit Rampen
env = np.ones(n, np.float32)
ramp = int(mix["duckRamp"] * SR)
for v in t["voice"]:
    a = int(max(0, v["speechStart"] - mix["duckLead"]) * SR)
    b = int(min(total, v["end"] + mix["duckTail"]) * SR)
    seg = np.full(b - a, db(mix["duckDb"]), np.float32)
    seg[:ramp] = np.minimum(seg[:ramp], np.linspace(1, db(mix["duckDb"]), min(ramp, len(seg)))[: len(seg[:ramp])])
    seg[-ramp:] = np.minimum(seg[-ramp:], np.linspace(db(mix["duckDb"]), 1, min(ramp, len(seg)))[-len(seg[-ramp:]):])
    env[a:b] = np.minimum(env[a:b], seg)

music = np.zeros((n, 2), np.float32)
for cue in mix["cues"]:
    m = load(f"public/{cue['file']}") * db(cue["gainDb"])
    a = int(cue["start"] * SR)
    end = cue.get("cutAt")
    b = min(n, a + len(m), int(end * SR) if end else n)
    seg = m[: b - a].copy()
    if end:  # Ausblenden bis zum Abbruch
        k = min(len(seg), max(int(cue.get("fadeOut", 0) * SR), int(0.06 * SR)))
        seg[-k:] *= np.linspace(1, 0, k)[:, None]
    music[a:b] += seg
music *= env[:, None]

voice = load("review/voice/sprecher-timeline.mp3")[:n]
out = music.copy()
out[: len(voice)] += voice
peak = np.abs(out).max()
if peak > 0.98:
    out *= 0.98 / peak
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-b:a", "160k", sys.argv[1]], input=out.astype(np.float32).tobytes(), check=True)
print(sys.argv[1], f"{total:.2f} s, Spitze {20*np.log10(peak):.1f} dBFS")
