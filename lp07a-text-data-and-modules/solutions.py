"""Week 7 reference answers. Try practice.py first, then compare here."""

import csv
import os
from datetime import datetime, timedelta


def read_clean_lines(path):
    """[Warm-up] Return stripped lines, skipping blank and comment lines."""
    lines = []
    with open(path, encoding="utf-8") as handle:
        for raw in handle:
            line = raw.strip()
            if line and not line.startswith("#"):
                lines.append(line)
    return lines


def longest_line(path):
    """[Warm-up] Return the longest stripped non-blank line, or ''."""
    best = ""
    with open(path, encoding="utf-8") as handle:
        for raw in handle:
            line = raw.strip()
            if len(line) > len(best):
                best = line
    return best


def append_note(path, text):
    """[Warm-up] Add text as a new last line, creating the file if needed."""
    with open(path, "a", encoding="utf-8") as handle:
        handle.write(text + "\n")


def repair_total_qty(path):
    """[Fix it] Return the qty column total as an int; blank counts as 0."""
    total = 0
    with open(path, newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            total += int(row["qty"] or 0)
    return total


def repair_save_lines(path, lines):
    """[Fix it] Write every line once, replacing old content; return count."""
    with open(path, "w", encoding="utf-8") as handle:
        for line in lines:
            handle.write(line + "\n")
    return len(lines)


def load_prep(path):
    """[Build] Read prep rows into dicts with a numeric qty."""
    rows = []
    with open(path, newline="", encoding="utf-8") as handle:
        for row in csv.DictReader(handle):
            rows.append({
                "station": row["station"].strip(),
                "item": row["item"].strip(),
                "qty": int(row["qty"].strip() or 0),
                "unit": row["unit"].strip(),
            })
    return rows


def totals_by_station(rows):
    """[Build] Return {station: total qty} in first-seen order."""
    totals = {}
    for row in rows:
        totals[row["station"]] = totals.get(row["station"], 0) + row["qty"]
    return totals


def write_prep_report(rows, path):
    """[Build] Write one summary CSV row per station; return the row count."""
    summary = {}
    for row in rows:
        entry = summary.setdefault(row["station"], {"items": 0, "total_qty": 0})
        entry["items"] += 1
        entry["total_qty"] += row["qty"]
    with open(path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["station", "items", "total_qty"])
        writer.writeheader()
        for station in sorted(summary):
            writer.writerow({"station": station, **summary[station]})
    return len(summary)


def parse_ticket_line(line):
    """[Build] Turn 'ticket|table|dish|qty|price' text into a dict."""
    parts = [part.strip() for part in line.split("|")]
    if len(parts) != 5:
        return None
    ticket, table, dish, qty, price = parts
    return {
        "ticket": int(ticket),
        "table": int(table),
        "dish": dish,
        "qty": int(qty),
        "price": float(price),
    }


def first_existing(folder, names):
    """[Build] Return the first joined path that exists, else None."""
    for name in names:
        candidate = os.path.join(folder, name)
        if os.path.exists(candidate):
            return candidate
    return None


def shift_dates(start_iso, days):
    """[Extend] Return ISO dates for consecutive days beginning at start."""
    start = datetime.strptime(start_iso, "%Y-%m-%d")
    return [(start + timedelta(days=offset)).strftime("%Y-%m-%d") for offset in range(days)]


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
