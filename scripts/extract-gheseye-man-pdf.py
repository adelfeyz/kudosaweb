"""
Extract Gheseye Man / Life Journey PDF to public/presentations/gheseye-man/
Usage: python scripts/extract-gheseye-man-pdf.py [path-to-pdf]
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_PDF = Path(
    r"c:\Users\adelf\OneDrive\Documents\Aidra\LifeJourney\Business Canvas V2.pdf"
)
PDF = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PDF
OUT = ROOT / "public" / "presentations" / "gheseye-man"

if not PDF.exists():
    raise SystemExit(f"PDF not found: {PDF}")

OUT.mkdir(parents=True, exist_ok=True)

try:
    from pypdf import PdfReader
except ImportError:
    raise SystemExit("Install pypdf: pip install pypdf")

reader = PdfReader(str(PDF))
summary = []

for i, page in enumerate(reader.pages, 1):
    text = (page.extract_text() or "").strip()
    summary.append({"page": i, "text": text})

(OUT / "slide-summary.json").write_text(
    json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
)

# Optional: render pages 1-4 as PNG if pymupdf available
rendered = []
try:
    import fitz  # pymupdf

    doc = fitz.open(str(PDF))
    for page_num in (1, 2, 3, 4):
        idx = page_num - 1
        if idx < doc.page_count:
            pix = doc[idx].get_pixmap(matrix=fitz.Matrix(2, 2))
            name = f"page-{page_num}.png"
            pix.save(str(OUT / name))
            rendered.append(name)
    doc.close()
except ImportError:
    pass

print(f"Wrote slide-summary.json ({len(summary)} pages) to {OUT}")
if rendered:
    print(f"Rendered PNGs: {', '.join(rendered)}")
else:
    print("No PNGs rendered (pymupdf not installed — slides will be text-only)")
