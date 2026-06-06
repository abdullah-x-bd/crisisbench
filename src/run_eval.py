"""Minimal CrisisBench data loader.

This small script checks that the sample scenario file can be loaded.
"""

from __future__ import annotations

import csv
from pathlib import Path


def load_rows(path: str | Path) -> list[dict[str, str]]:
    with open(path, newline="", encoding="utf-8") as file:
        return list(csv.DictReader(file))


def main() -> None:
    rows = load_rows("sample_scenarios.csv")
    print(f"Loaded {len(rows)} CrisisBench rows.")
    for row in rows[:3]:
        print(row["id"], row["domain"], row["capacity_axis"], row["failure_mode"])


if __name__ == "__main__":
    main()
