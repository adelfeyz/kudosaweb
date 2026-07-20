"""
Extract Planning Agent docx to public/presentations/planning-agent/
Usage: python scripts/extract-planning-agent-docx.py [path-to-docx]
"""

import json
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_DOCX = Path(
    r"c:\Users\adelf\OneDrive\Documents\Raveshmand\Pointer\AI Agent\Planning and team management AI Agent.docx"
)
DOCX = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DOCX
OUT = ROOT / "public" / "presentations" / "planning-agent"

if not DOCX.exists():
    raise SystemExit(f"DOCX not found: {DOCX}")

OUT.mkdir(parents=True, exist_ok=True)

with zipfile.ZipFile(DOCX) as z:
    xml = z.read("word/document.xml").decode("utf-8", errors="ignore")
    texts = re.findall(r"<w:t[^>]*>([^<]*)</w:t>", xml)
    full_text = "".join(texts)

(OUT / "slide-summary.json").write_text(
    json.dumps({"text": full_text, "length": len(full_text)}, ensure_ascii=False, indent=2),
    encoding="utf-8",
)

print(f"Wrote slide-summary.json ({len(full_text)} chars) to {OUT}")
