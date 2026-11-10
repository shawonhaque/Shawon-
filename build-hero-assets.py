#!/usr/bin/env python3
"""Turn the intro video into a seamless looping hero clip + stills.

Usage: python3 scripts/build-hero-assets.py <intro.mp4> <character_still.jpg> <out_dir>

1. Detects the person (non-white pixels) and crops a 4:5 frame around them.
2. Whitens the off-white backdrop so it blends into the page (mix-blend multiply).
3. Cross-fades the last 0.5 s into the first 0.5 s (video via xfade, audio in numpy)
   so the clip loops with no visible jump or audible click. Never retimed.
4. Exports hero.mp4 (H.264 + AAC) and hero.webm (VP9 + Opus), plus
   portrait-bust.webp (480x600) and og.jpg (1200x630).
"""
import json
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np
from PIL import Image, ImageChops

FADE = 0.5
SR = 48000


def run(*args):
    subprocess.run(args, check=True)


def probe_duration(path):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", path]
    )
    return float(json.loads(out)["format"]["duration"])


def detect_box(frame_path):
    img = np.asarray(Image.open(frame_path).convert("L"), dtype=np.int16)
    mask = img < 200
    cols = np.where(mask.sum(axis=0) > 4)[0]
    rows = np.where(mask.sum(axis=1) > 4)[0]
    return cols.min(), cols.max(), rows.min(), rows.max()


def main(src, still, out):
    out = Path(out)
    tmp = out / "_tmp"
    tmp.mkdir(parents=True, exist_ok=True)

    dur = min(probe_duration(src), 10.0)

    # 1. detect person on a few frames, union of boxes
    xs0, xs1 = [], []
    for t in (0.5, dur / 2, dur - 0.5):
        f = tmp / f"probe_{t:.2f}.png"
        run("ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", src, "-frames:v", "1", str(f))
        x0, x1, _, _ = detect_box(f)
        xs0.append(x0)
        xs1.append(x1)
    cx = (min(xs0) + max(xs1)) // 2
    H = 1080
    W = int(H * 768 / 960) // 2 * 2  # 864
    x = int(max(0, min(1920 - W, cx - W // 2)))
    print(f"crop={W}:{H}:{x}:0  (person centre x={cx})")

    vf_base = (
        f"crop={W}:{H}:{x}:0,scale=768:960:flags=lanczos,"
        "colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,format=yuv420p"
    )

    # 2. seamless video loop: the tail cross-fades into the head
    body = dur - FADE
    loop_v = tmp / "loop.mov"
    run(
        "ffmpeg", "-v", "error", "-y", "-i", src, "-filter_complex",
        f"[0:v]{vf_base},split[a][b];"
        f"[a]trim=start={FADE}:end={dur},setpts=PTS-STARTPTS[main];"
        f"[b]trim=start=0:end={FADE},setpts=PTS-STARTPTS[head];"
        f"[main][head]xfade=transition=fade:duration={FADE}:offset={body - FADE}[v]",
        "-map", "[v]", "-an", "-c:v", "prores_ks", "-profile:v", "1", str(loop_v),
    )

    # 3. audio cross-fade in numpy (sample accurate)
    wav = tmp / "a.wav"
    run("ffmpeg", "-v", "error", "-y", "-i", src, "-t", str(dur), "-vn", "-ac", "2", "-ar", str(SR), "-f", "wav", str(wav))
    with wave.open(str(wav)) as w:
        a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).reshape(-1, 2).astype(np.float32)
    n = int(FADE * SR)
    total = int(dur * SR)
    a = a[:total]
    head, main = a[:n], a[n:]
    ramp = np.linspace(0, 1, n, dtype=np.float32)[:, None]
    main[-n:] = main[-n:] * (1 - ramp) + head * ramp
    looped = np.clip(main, -32768, 32767).astype(np.int16)
    wav2 = tmp / "loop.wav"
    with wave.open(str(wav2), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(looped.tobytes())

    # 4. exports
    run(
        "ffmpeg", "-v", "error", "-y", "-i", str(loop_v), "-i", str(wav2),
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", "-shortest", str(out / "hero.mp4"),
    )
    run(
        "ffmpeg", "-v", "error", "-y", "-i", str(loop_v), "-i", str(wav2),
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0", "-row-mt", "1", "-pix_fmt", "yuv420p",
        "-c:a", "libopus", "-b:a", "80k", "-shortest", str(out / "hero.webm"),
    )

    # 5. stills from the character image
    img = Image.open(still).convert("RGB")
    g = np.asarray(img.convert("L"), dtype=np.int16)
    m = g < 200
    cols = np.where(m.sum(axis=0) > 4)[0]
    rows = np.where(m.sum(axis=1) > 4)[0]
    top = rows.min()
    height = rows.max() - top
    # head-to-shirt: the top ~40% of the figure
    bust_h = int(height * 0.40)
    bust_w = int(bust_h * 480 / 600)
    ccx = int((cols.min() + cols.max()) / 2)
    y0 = max(0, top - int(bust_h * 0.08))
    box = (ccx - bust_w // 2, y0, ccx + bust_w // 2, y0 + bust_h)
    img.crop(box).resize((480, 600), Image.LANCZOS).save(out / "portrait-bust.webp", quality=86)

    og = Image.new("RGB", (1200, 630), (244, 242, 238))
    fig = img.crop((cols.min() - 40, max(0, top - 20), cols.max() + 40, rows.max() + 20))
    fig.thumbnail((600, 600), Image.LANCZOS)
    pos = (1200 - fig.width - 80, 630 - fig.height - 15)
    region = og.crop((pos[0], pos[1], pos[0] + fig.width, pos[1] + fig.height))
    og.paste(ImageChops.multiply(region, fig), pos)
    og.save(out / "og.jpg", quality=88)
    print("done:", [p.name for p in out.iterdir() if p.is_file()])


if __name__ == "__main__":
    main(*sys.argv[1:4])
