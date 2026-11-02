"""Generate Daxtera brand derivatives, OG images and the blog figure.

Run from the project root:
  python scripts/generate-assets.py

Requires Pillow. All artwork is procedural and original to this project.
"""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
BRAND = PUBLIC / "brand"
OG = PUBLIC / "og"
OG_SERVICES = OG / "services"
OG_BLOG = OG / "blog"
APP = ROOT / "src" / "app"

INK = "#A55704"
BENCH = "#EEF1F4"
AMBER = "#F0A12B"
TRACE = "#17A398"
DEEP = "#0F766E"
STEEL = "#566678"
CORAL = "#C23B2B"

FONT_REGULAR = "C:/Windows/Fonts/segoeui.ttf"
FONT_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_LIGHT = "C:/Windows/Fonts/segoeuil.ttf"
FONT_MONO = "C:/Windows/Fonts/consola.ttf"

for directory in (BRAND, OG, OG_SERVICES, OG_BLOG, APP):
    directory.mkdir(parents=True, exist_ok=True)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def rgba(hex_value: str, opacity: int = 255) -> tuple[int, int, int, int]:
    value = hex_value.lstrip("#")
    return (
        int(value[0:2], 16),
        int(value[2:4], 16),
        int(value[4:6], 16),
        opacity,
    )


def spaced_text(
    draw: ImageDraw.ImageDraw,
    xy: tuple[int, int],
    text: str,
    label_font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    spacing: int = 3,
) -> None:
    x, y = xy
    for character in text:
        draw.text((x, y), character, font=label_font, fill=fill)
        x += draw.textlength(character, font=label_font) + spacing


def wrap_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    title_font: ImageFont.FreeTypeFont,
    max_width: int,
) -> list[str]:
    words = text.split()
    lines: list[str] = []
    line = ""
    for word in words:
        candidate = f"{line} {word}".strip()
        if draw.textlength(candidate, font=title_font) <= max_width:
            line = candidate
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines


def make_light_wordmark() -> None:
    source = BRAND / "daxtera-wordmark.png"
    image = Image.open(source).convert("RGBA")
    pixels = image.load()
    # Keep the original gradient A mark; only recolour the navy letterforms.
    for y in range(image.height):
        for x in range(image.width):
            if 390 <= x <= 812:
                continue
            r, g, b, a = pixels[x, y]
            if a and b < 150 and g < 90 and r < 70:
                pixels[x, y] = (238, 241, 244, a)
    image.thumbnail((1600, 600), Image.Resampling.LANCZOS)
    image.save(BRAND / "daxtera-wordmark-light.png", optimize=True)

    dark = Image.open(source).convert("RGBA")
    dark.thumbnail((1600, 600), Image.Resampling.LANCZOS)
    dark.save(BRAND / "daxtera-wordmark-dark.png", optimize=True)


def make_icons() -> None:
    icon = Image.open(BRAND / "daxtera-icon.png").convert("RGBA")
    icon.resize((512, 512), Image.Resampling.LANCZOS).save(
        APP / "icon.png", optimize=True
    )
    icon.resize((180, 180), Image.Resampling.LANCZOS).save(
        APP / "apple-icon.png", optimize=True
    )
    icon.save(BRAND / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])


def draw_grid(image: Image.Image, step: int = 48) -> None:
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    for x in range(0, image.width, step):
        draw.line((x, 0, x, image.height), fill=rgba(BENCH, 13), width=1)
    for y in range(0, image.height, step):
        draw.line((0, y, image.width, y), fill=rgba(BENCH, 13), width=1)
    image.alpha_composite(overlay)


def draw_glow(image: Image.Image, center: tuple[int, int], radius: int) -> None:
    glow = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(glow)
    for step in range(10, 0, -1):
        current = int(radius * step / 10)
        opacity = int(2 + (10 - step) * 1.3)
        draw.ellipse(
            (
                center[0] - current,
                center[1] - current,
                center[0] + current,
                center[1] + current,
            ),
            fill=rgba(AMBER, opacity),
        )
    glow = glow.filter(ImageFilter.GaussianBlur(38))
    image.alpha_composite(glow)


def draw_art(image: Image.Image, variant: str) -> None:
    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)

    if variant == "trace":
        points = []
        for index in range(150):
            x = 650 + index * 3.75
            y = 470 - 130 * math.sin(index / 42) - 32 * math.sin(index / 13)
            points.append((x, y))
        draw.line(points, fill=rgba(BENCH, 150), width=2)
        for index in range(0, len(points), 9):
            x, y = points[index]
            draw.ellipse((x - 2, y - 2, x + 2, y + 2), fill=rgba(BENCH, 170))
        draw.ellipse((1060, 392, 1072, 404), fill=rgba(AMBER, 255))
        draw.ellipse((1040, 372, 1092, 424), outline=rgba(AMBER, 90), width=2)

    elif variant == "loop":
        cx, cy, radius = 950, 330, 148
        draw.ellipse(
            (cx - radius, cy - radius, cx + radius, cy + radius),
            outline=rgba(BENCH, 150),
            width=2,
        )
        for index in range(5):
            angle = index / 5 * math.tau - math.pi / 2
            x = cx + math.cos(angle) * radius
            y = cy + math.sin(angle) * radius
            draw.ellipse((x - 5, y - 5, x + 5, y + 5), fill=rgba(AMBER if index == 0 else TRACE))
            draw.ellipse((x - 15, y - 15, x + 15, y + 15), outline=rgba(BENCH, 60), width=1)

    elif variant == "gauge":
        cx, cy = 950, 390
        draw.arc(
            (cx - 170, cy - 170, cx + 170, cy + 170),
            start=196,
            end=344,
            fill=rgba(BENCH, 210),
            width=10,
        )
        draw.arc(
            (cx - 145, cy - 145, cx + 145, cy + 145),
            start=200,
            end=340,
            fill=rgba(BENCH, 150),
            width=2,
        )
        draw.line((cx, cy, cx + 94, cy - 128), fill=rgba(BENCH, 170), width=2)
        draw.ellipse((cx - 7, cy - 7, cx + 7, cy + 7), fill=rgba(AMBER))
        draw.ellipse((cx - 26, cy - 26, cx + 26, cy + 26), outline=rgba(AMBER, 70), width=2)

    elif variant == "cloud":
        for index in range(115):
            x = 700 + ((index * 71) % 390)
            y = 150 + ((index * 113) % 330)
            draw.ellipse((x - 2, y - 2, x + 2, y + 2), fill=rgba(BENCH, 100 + (index % 4) * 30))
        draw.line(
            [(690, 430), (780, 300), (910, 330), (980, 210), (1080, 240)],
            fill=rgba(BENCH, 90),
            width=2,
        )

    image.alpha_composite(overlay)


def make_og(
    filename: Path,
    title: str,
    subtitle: str,
    *,
    overline: str,
    meta: str,
    variant: str,
) -> None:
    image = Image.new("RGBA", (1200, 630), rgba(INK))
    draw_grid(image)
    draw_glow(image, (980, 300), 320)
    draw_art(image, variant)

    overlay = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((24, 24, 1176, 606), outline=rgba(BENCH, 28), width=1)

    icon = Image.open(BRAND / "daxtera-icon.png").convert("RGBA")
    icon = icon.resize((44, 44), Image.Resampling.LANCZOS)
    image.alpha_composite(icon, (56, 44))
    draw.text(
        (116, 46),
        "Daxtera",
        font=font(FONT_BOLD, 31),
        fill=rgba(BENCH),
    )

    label_font = font(FONT_MONO, 11)
    spaced_text(draw, (119, 170), overline.upper(), label_font, rgba(BENCH, 255), 2)
    draw.line((58, 196, 119, 196), fill=rgba(BENCH, 110), width=1)

    title_font = font(FONT_BOLD, 62)
    lines = wrap_text(draw, title, title_font, 930)
    y = 226
    for line in lines:
        draw.text((56, y), line, font=title_font, fill=rgba(BENCH))
        y += 68

    subtitle_font = font(FONT_REGULAR, 21)
    sub_lines = wrap_text(draw, subtitle, subtitle_font, 930)[:3]
    y += 14
    for line in sub_lines:
        draw.text((59, y), line, font=subtitle_font, fill=rgba(BENCH, 255))
        y += 30

    meta_font = font(FONT_MONO, 10)
    spaced_text(draw, (119, 538), meta.upper(), meta_font, rgba(BENCH, 255), 2)
    draw.line((58, 556, 119, 556), fill=rgba(BENCH, 150), width=1)

    draw.ellipse((58, 574, 63, 579), fill=rgba(AMBER))
    spaced_text(draw, (80, 569), "DAXTERA — PHYSICAL AI", meta_font, rgba(BENCH, 255), 1)

    image.alpha_composite(overlay)
    image.convert("RGB").save(filename, optimize=True, quality=92)


def make_blog_figure() -> None:
    width, height = 1600, 900
    image = Image.new("RGBA", (width, height), rgba(BENCH))
    draw = ImageDraw.Draw(image)
    draw.rectangle((0, 0, width, height), fill=rgba(BENCH))

    # faint plotting grid
    for x in range(120, 1500, 115):
        draw.line((x, 120, x, 740), fill=rgba(BENCH, 23), width=1)
    for y in range(180, 760, 96):
        draw.line((110, y, 1500, y), fill=rgba(BENCH, 23), width=1)

    label_font = font(FONT_MONO, 16)
    spaced_text(draw, (110, 74), "ILLUSTRATIVE — NOT A CUSTOMER RESULT", label_font, rgba(DEEP), 2)

    # confidence band
    band_top = []
    band_bottom = []
    for index in range(0, 141):
        x = 110 + index * 9.9
        base = 590 - 180 * math.sin(index / 74) - index * 0.55
        band_top.append((x, base - 38 - 12 * math.sin(index / 17)))
        band_bottom.append((x, base + 38 + 12 * math.cos(index / 19)))
    draw.polygon(band_top + list(reversed(band_bottom)), fill=rgba(BENCH, 34))
    draw.line(band_top, fill=rgba(BENCH, 70), width=2)
    draw.line(band_bottom, fill=rgba(BENCH, 70), width=2)

    # real reference line
    real = []
    sim = []
    for index in range(0, 141):
        x = 110 + index * 9.9
        y = 590 - 180 * math.sin(index / 74) - index * 0.55
        real.append((x, y))
        sim.append((x, y + 26 * math.sin(index / 23) - 16 * (index / 140)))
    draw.line(real, fill=rgba(INK, 235), width=5)
    dash = 16
    for index in range(0, len(sim) - 1, dash * 2):
        segment = sim[index : index + dash]
        if len(segment) > 1:
            draw.line(segment, fill=rgba(BENCH, 255), width=4)

    # annotation
    draw.line((780, 360, 870, 300), fill=rgba(DEEP, 130), width=2)
    draw.ellipse((770, 350, 790, 370), fill=rgba(AMBER))
    spaced_text(draw, (890, 292), "SIMULATED", label_font, rgba(BENCH), 2)
    spaced_text(draw, (140, 756), "REAL-WORLD REFERENCE", label_font, rgba(INK), 2)
    spaced_text(draw, (1180, 756), "CONFIDENCE BAND", label_font, rgba(DEEP), 2)

    draw.line((110, 790, 1490, 790), fill=rgba(BENCH, 80), width=2)
    draw.line((110, 782, 110, 798), fill=rgba(BENCH, 120), width=2)
    draw.line((1490, 782, 1490, 798), fill=rgba(BENCH, 120), width=2)
    spaced_text(draw, (110, 812), "TASK CONDITIONS", label_font, rgba(STEEL), 2)
    spaced_text(draw, (1280, 812), "MEASURED BEHAVIOUR", label_font, rgba(STEEL), 2)

    image.convert("RGB").save(PUBLIC / "blog" / "fidelity-plot.png", optimize=True)


def main() -> None:
    make_light_wordmark()
    make_icons()

    make_og(
        OG / "home.png",
        "Ground truth for physical AI.",
        "Verified real-world data, calibrated simulation and independent testing, built niche by niche from real experts.",
        overline="Daxtera",
        meta="Physical AI / Ground truth",
        variant="trace",
    )
    make_og(
        OG / "services.png",
        "Three services. One loop.",
        "Real-world physical data, a calibrated simulator and independent testing.",
        overline="Our services",
        meta="Capture / Calibrate / Test",
        variant="loop",
    )
    make_og(
        OG_SERVICES / "real-world-data.png",
        "Datasets built from work that actually happened.",
        "Model-ready data of real expert work, with verified labels and full documentation.",
        overline="Service 01",
        meta="Real-world physical data",
        variant="cloud",
    )
    make_og(
        OG_SERVICES / "calibrated-simulator.png",
        "A simulator that has met the real world.",
        "Niche simulation tuned against real measurements, with fidelity documented honestly.",
        overline="Service 02",
        meta="Calibrated simulator",
        variant="cloud",
    )
    make_og(
        OG_SERVICES / "testing-and-comparison.png",
        "Proof that holds up outside the demo.",
        "Benchmarks and reports measured against real-world references.",
        overline="Service 03",
        meta="Testing and comparison",
        variant="gauge",
    )
    make_og(
        OG / "vision.png",
        "A physical world machines can learn from.",
        "Real before synthetic. Measured, not claimed. Experts first. Niche by niche.",
        overline="Our vision",
        meta="Daxtera vision",
        variant="trace",
    )
    make_og(
        OG / "about.png",
        "A company built around what can be proved.",
        "Real work, measured simulation fidelity and documented rights.",
        overline="About us",
        meta="Daxtera",
        variant="loop",
    )
    make_og(
        OG / "careers.png",
        "Work on the data physical AI depends on.",
        "Verified experts, capture specialists and the team behind them.",
        overline="Careers",
        meta="Daxtera",
        variant="trace",
    )
    make_og(
        OG / "blog.png",
        "Notes on ground truth.",
        "Real-world data, measured simulation fidelity and tests that hold up.",
        overline="Blog",
        meta="Daxtera editorial",
        variant="gauge",
    )
    make_og(
        OG_BLOG / "why-simulation-fidelity-should-be-measured-not-claimed.png",
        "Why simulation fidelity should be measured, not claimed.",
        "The useful question is not whether it looks real, but how closely it matches the task.",
        overline="Simulation",
        meta="Daxtera editorial",
        variant="gauge",
    )
    make_og(
        OG_BLOG / "what-makes-expert-demonstrations-different-from-internet-video.png",
        "What makes expert demonstrations different from internet video.",
        "A video shows appearance. A demonstration records the attempt, the outcome and the rights.",
        overline="Data",
        meta="Daxtera editorial",
        variant="cloud",
    )
    make_og(
        OG_BLOG / "how-to-design-a-physical-ai-test-you-can-trust.png",
        "How to design a physical AI test you can trust.",
        "A test is only evidence if it could have failed.",
        overline="Testing",
        meta="Daxtera editorial",
        variant="gauge",
    )

    make_blog_figure()
    print("Brand derivatives, OG images and blog figure generated.")


if __name__ == "__main__":
    main()
