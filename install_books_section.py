#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parent

FILES = {
    "index.html": {
        "anchor": '        <!-- ================= ACADEMIC PROGRAM ================= -->',
        "section": (ROOT / "books-section-en.html").read_text(encoding="utf-8"),
    },
    "index-es.html": {
        "anchor": '    <!-- ================= PROGRAMA ACADÉMICO ================= -->',
        "section": (ROOT / "books-section-es.html").read_text(encoding="utf-8"),
    },
}

for filename, cfg in FILES.items():
    path = Path(filename)

    if not path.exists():
        raise SystemExit(f"ERROR: {path} not found.")

    text = path.read_text(encoding="utf-8")

    if 'id="books"' in text:
        print(f"SKIP: {path} already contains the Books section.")
        continue

    if cfg["anchor"] not in text:
        raise SystemExit(f"ERROR: insertion anchor not found in {path}")

    updated = text.replace(
        cfg["anchor"],
        cfg["section"] + cfg["anchor"],
        1
    )

    path.write_text(updated, encoding="utf-8")
    print(f"UPDATED: {path}")

print()
print("Books section installed.")
print("It links to: the_books/dextiny.html")
print("It expects the cover at: assets/img/dextiny-cover.png")
