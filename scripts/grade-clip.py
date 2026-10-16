"""Gleicht die Lichtstimmung eines Clips an einen Referenzclip an (lokal, ohne API).

Farbtransfer über Mittelwert und Streuung je Kanal in einem Gegenfarbraum (Helligkeit, Gelb-Blau, Rot-Grün),
Statistik über Stichprobenbilder beider Clips, dann gleichmäßig auf alle Bilder angewendet.

python3 scripts/grade-clip.py <ziel.mp4> <referenz.mp4> <ausgabe.mp4> [stärke 0..1]
"""
import subprocess, sys
import numpy as np

src, ref, out = sys.argv[1:4]
strength = float(sys.argv[4]) if len(sys.argv) > 4 else 1.0


def probe(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate",
                        "-of", "csv=p=0", path], capture_output=True, text=True, check=True).stdout.strip().split(",")
    return int(r[0]), int(r[1]), r[2]


def frames(path, fps=None):
    w, h, _ = probe(path)
    vf = ["-vf", f"fps={fps}"] if fps else []
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, *vf, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.uint8).reshape(-1, h, w, 3)


# Gegenfarbraum: L = Helligkeit, A = Gelb-Blau, B = Rot-Grün
M = np.array([[1 / 3, 1 / 3, 1 / 3], [0.5, 0.0, -0.5], [-0.25, 0.5, -0.25]])
Minv = np.linalg.inv(M)


def to_opp(x):
    return (x.reshape(-1, 3).astype(np.float32) / 255.0) @ M.T


def stats(fr):
    o = to_opp(fr)
    return o.mean(0), o.std(0) + 1e-6


ms, ss = stats(frames(src, fps=2))
mr, sr = stats(frames(ref, fps=2))
w, h, rate = probe(src)
allf = frames(src)
o = to_opp(allf)
t = (o - ms) / ss * sr + mr
o = o + strength * (t - o)
rgb = np.clip(o @ Minv.T, 0, 1) * 255
rgb = rgb.astype(np.uint8).reshape(allf.shape)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{w}x{h}", "-r", rate, "-i", "-",
                "-c:v", "libx264", "-crf", "14", "-preset", "slow", "-pix_fmt", "yuv420p", "-an", out], input=rgb.tobytes(), check=True)
print(out, "Mittel vorher", np.round(ms, 3), "Referenz", np.round(mr, 3))
