"""Generate app icons (favicon + PWA logos) — book motif for Podstawy section."""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent / "public"
BG = (74, 144, 217)  # #4a90d9 — menu button blue
COVER_GREEN = (107, 203, 119)  # #6BCB77
COVER_ORANGE = (255, 159, 67)  # warm accent
PAGE = (255, 252, 245)
PAGE_LINE = (200, 210, 225)
SPINE_SHADOW = (45, 100, 170)


def _rounded_rect(draw, box, radius, fill):
    draw.rounded_rectangle(box, radius=radius, fill=fill)


def draw_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = max(1, size // 16)
    _rounded_rect(draw, (pad, pad, size - pad, size - pad), max(2, size // 8), BG)

    cx, cy = size // 2, size // 2
    book_w = int(size * 0.52)
    book_h = int(size * 0.36)
    tilt = max(1, size // 40)

    # Back book (green) — slightly lower and left
    bx1 = cx - book_w // 2 - tilt
    by1 = cy - book_h // 2 + tilt
    bx2 = bx1 + book_w
    by2 = by1 + book_h
    _rounded_rect(draw, (bx1, by1, bx2, by2), max(2, size // 24), COVER_GREEN)
    spine_x = bx1 + int(book_w * 0.22)
    draw.rectangle((bx1, by1, spine_x, by2), fill=SPINE_SHADOW)

    # Front book (orange) — slightly higher and right
    fx1 = cx - book_w // 2 + tilt
    fy1 = cy - book_h // 2 - tilt
    fx2 = fx1 + book_w
    fy2 = fy1 + book_h
    _rounded_rect(draw, (fx1, fy1, fx2, fy2), max(2, size // 24), COVER_ORANGE)
    f_spine = fx1 + int(book_w * 0.22)
    draw.rectangle((fx1, fy1, f_spine, fy2), fill=(220, 120, 40))

    # Open pages hint on front cover (white strip)
    page_margin = max(2, size // 32)
    draw.rectangle(
        (
            f_spine + page_margin,
            fy1 + page_margin,
            fx2 - page_margin,
            fy2 - page_margin,
        ),
        fill=PAGE,
    )
    line_y = fy1 + int(book_h * 0.35)
    for i in range(3):
        y = line_y + i * max(2, size // 28)
        draw.line(
            (f_spine + page_margin * 2, y, fx2 - page_margin * 2, y),
            fill=PAGE_LINE,
            width=max(1, size // 64),
        )

    return img


def save_png(path: Path, size: int):
    draw_icon(size).save(path, "PNG")


def save_ico(path: Path):
    sizes = [16, 32, 48]
    images = [draw_icon(s) for s in sizes]
    images[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=images[1:],
    )


def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    save_ico(ROOT / "favicon.ico")
    save_png(ROOT / "logo192.png", 192)
    save_png(ROOT / "logo512.png", 512)
  # Optional crisp SVG favicon for modern browsers
    svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="Zabawa">
  <rect x="32" y="32" width="448" height="448" rx="64" fill="#4a90d9"/>
  <rect x="118" y="198" width="220" height="152" rx="12" fill="#6BCB77"/>
  <rect x="118" y="198" width="48" height="152" fill="#3a7bc8"/>
  <rect x="190" y="142" width="220" height="152" rx="12" fill="#ff9f43"/>
  <rect x="190" y="142" width="48" height="152" fill="#dc7828"/>
  <rect x="248" y="162" width="148" height="112" fill="#fff8f0"/>
  <line x1="268" y1="198" x2="388" y2="198" stroke="#c8d4e0" stroke-width="8"/>
  <line x1="268" y1="228" x2="388" y2="228" stroke="#c8d4e0" stroke-width="8"/>
  <line x1="268" y1="258" x2="360" y2="258" stroke="#c8d4e0" stroke-width="8"/>
</svg>
"""
    (ROOT / "favicon.svg").write_text(svg, encoding="utf-8")
    print("Generated favicon.ico, favicon.svg, logo192.png, logo512.png")


if __name__ == "__main__":
    main()
