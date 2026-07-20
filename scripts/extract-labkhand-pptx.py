"""
Extract Labkhand.pptx media to public/presentations/labkhand/
Usage: python scripts/extract-labkhand-pptx.py [path-to-pptx]
"""

import json
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PPTX = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "tmp-labkhand.pptx"
OUT = ROOT / "public" / "presentations" / "labkhand"

if not PPTX.exists():
    raise SystemExit(f"PPTX not found: {PPTX}")

OUT.mkdir(parents=True, exist_ok=True)

with zipfile.ZipFile(PPTX) as z:
    exported = 0
    for name in z.namelist():
        if name.startswith("ppt/media/"):
            dest = OUT / Path(name).name
            dest.write_bytes(z.read(name))
            exported += 1

    slides = sorted(
        [n for n in z.namelist() if re.match(r"ppt/slides/slide\d+\.xml$", n)],
        key=lambda x: int(re.search(r"slide(\d+)", x).group(1)),
    )

    summary = []
    for i, slide_path in enumerate(slides, 1):
        xml = z.read(slide_path).decode("utf-8", errors="ignore")
        texts = re.findall(r"<a:t[^>]*>([^<]*)</a:t>", xml)
        summary.append({"slide": i, "texts": texts})

    (OUT / "slide-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )

print(f"Exported {exported} media files to {OUT}")
print(f"Wrote slide-summary.json ({len(summary)} slides)")
