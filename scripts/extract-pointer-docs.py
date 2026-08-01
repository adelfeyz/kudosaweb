"""
Extract Pointer training docs to public/presentations/pointer/
Usage: python scripts/extract-pointer-docs.py
"""

import json
import re
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = Path(r"c:\Users\adelf\OneDrive\Documents\Raveshmand\Pointer\Training\Narges")
USER_GUIDE = BASE / "USER_GUIDE_FA (1).docx"
WEEK1 = BASE / "هفته 1 — مبانی برنامه_ریزی و معرفی Pointer.docx"
ORG_PDF = BASE / "Organization user guide (1).pdf"
OUT = ROOT / "public" / "presentations" / "pointer"


def extract_docx_text(path: Path) -> str:
    with zipfile.ZipFile(path) as z:
        xml = z.read("word/document.xml").decode("utf-8", errors="ignore")
        return "".join(re.findall(r"<w:t[^>]*>([^<]*)</w:t>", xml))


def extract_docx_images_ordered(docx_path: Path, out_dir: Path) -> list[str]:
    with zipfile.ZipFile(docx_path) as z:
        rels_xml = z.read("word/_rels/document.xml.rels").decode("utf-8", errors="ignore")
        rid_to_target = {}
        for m in re.finditer(r'Id="(rId\d+)"[^>]*Target="([^"]+)"', rels_xml):
            target = m.group(2).replace("../", "")
            if "media/" in target:
                rid_to_target[m.group(1)] = Path(target).name

        doc_xml = z.read("word/document.xml").decode("utf-8", errors="ignore")
        embeds = re.findall(r'r:embed="(rId\d+)"', doc_xml)

        exported = []
        seen = set()
        idx = 1
        for rid in embeds:
            if rid not in rid_to_target or rid in seen:
                continue
            seen.add(rid)
            src_name = f"word/media/{rid_to_target[rid]}"
            if src_name not in z.namelist():
                continue
            ext = Path(rid_to_target[rid]).suffix or ".png"
            dest_name = f"image{idx}{ext}"
            (out_dir / dest_name).write_bytes(z.read(src_name))
            exported.append(dest_name)
            idx += 1
        return exported


def extract_pdf_text(path: Path) -> str:
    try:
        from pypdf import PdfReader

        reader = PdfReader(str(path))
        parts = []
        for page in reader.pages:
            parts.append(page.extract_text() or "")
        return "\n".join(parts)
    except Exception as e:
        return f"(pdf extract failed: {e})"


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)

    if not USER_GUIDE.exists():
        raise SystemExit(f"USER_GUIDE not found: {USER_GUIDE}")

    images = extract_docx_images_ordered(USER_GUIDE, OUT)

    summary = {
        "images": images,
        "user_guide_text": extract_docx_text(USER_GUIDE) if USER_GUIDE.exists() else "",
        "week1_text": extract_docx_text(WEEK1) if WEEK1.exists() else "",
        "org_pdf_text": extract_pdf_text(ORG_PDF) if ORG_PDF.exists() else "",
    }

    (OUT / "slide-summary.json").write_text(
        json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(f"Exported {len(images)} images to {OUT}")
    print("Images:", ", ".join(images))


if __name__ == "__main__":
    main()
