"""Week 7 live script. Run from the repository root with python.

Every file path is built from this script's own folder, so the script works
no matter which folder you start it from.
"""

import csv
import os
import tempfile
from collections import Counter
from datetime import datetime, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")


# === 1. open() plus with: the walk-in cooler door that closes itself ===
# A file handle is a door you must shut. with shuts it for you, even if your
# code crashes halfway through the shift.
log_path = os.path.join(DATA, "shift_log.txt")
with open(log_path, encoding="utf-8") as handle:
    raw_lines = handle.readlines()

kept = []
for raw in raw_lines:
    line = raw.strip()  # strip() removes the newline AND stray spaces
    if line and not line.startswith("#"):
        kept.append(line)
print(f"Lines read: {len(raw_lines)}, kept: {len(kept)}")
print("First kept:", kept[0])


# === 2. Modes: r reads, w replaces, a appends ===
# Think of w as a save file with no backup. Opening in w wipes the old run.
with tempfile.TemporaryDirectory() as folder:
    notes = os.path.join(folder, "notes.txt")
    with open(notes, "w", encoding="utf-8") as handle:
        handle.write("first\n")
    with open(notes, "a", encoding="utf-8") as handle:
        handle.write("second\n")
    with open(notes, encoding="utf-8") as handle:
        after_append = handle.read()
    with open(notes, "w", encoding="utf-8") as handle:
        handle.write("third\n")
    with open(notes, encoding="utf-8") as handle:
        after_wipe = handle.read()
print("After a:", after_append.split())
print("After w:", after_wipe.split())

# Not every character is plain English. Say the encoding out loud.
with tempfile.TemporaryDirectory() as folder:
    menu = os.path.join(folder, "menu.txt")
    dish = "Sautéed shallots"
    with open(menu, "w", encoding="utf-8") as handle:
        handle.write(dish + "\n")
    with open(menu, encoding="utf-8") as handle:
        print("Accent survives the round trip:", handle.read().strip() == dish)


# === 3. csv.reader gives lists; DictReader gives dicts keyed by header ===
prep_path = os.path.join(DATA, "prep.csv")
with open(prep_path, newline="", encoding="utf-8") as handle:
    plain_rows = list(csv.reader(handle))
print("reader row 1:", plain_rows[1])

with open(prep_path, newline="", encoding="utf-8") as handle:
    dict_rows = list(csv.DictReader(handle))
print("DictReader row 1:", dict_rows[0])
print("Every value is text:", type(dict_rows[0]["qty"]).__name__)


# === 4. Parse into a list of dicts, convert types, then ask questions ===
prep = []
for row in dict_rows:
    prep.append({
        "station": row["station"],
        "item": row["item"],
        "qty": int(row["qty"] or 0),  # blank text is falsy, so it becomes 0
    })

totals = {}
for row in prep:
    totals[row["station"]] = totals.get(row["station"], 0) + row["qty"]
print("Station totals:", totals)
print("Total qty:", sum(row["qty"] for row in prep))
print("Grill items:", [row["item"] for row in prep if row["station"] == "Grill"])


# === 5. Write it yourself or import it? A comma inside a field decides ===
tickets_path = os.path.join(DATA, "tickets.csv")
with open(tickets_path, encoding="utf-8") as handle:
    handle.readline()  # skip the header
    fries_line = [line for line in handle if "Fries" in line][0].strip()
with open(tickets_path, newline="", encoding="utf-8") as handle:
    handle.readline()
    fries_fields = next(row for row in csv.reader(handle) if "Fries, large" in row)
print(f"Naive split: {len(fries_line.split(','))} pieces, csv: {len(fries_fields)} fields")
print("csv kept the dish whole:", fries_fields[2])


# === 6. os and os.path: build paths without guessing the slash ===
print("Joined:", os.path.join("..", "data", "prep.csv").replace(os.sep, "/"))
print("Exists (prep):", os.path.exists(prep_path))
print("Exists (menu):", os.path.exists(os.path.join(DATA, "menu.csv")))
print("Split extension:", os.path.splitext("prep.csv"))
print("Script name:", os.path.basename(__file__))
# os.getcwd() is the folder you RAN python from, which is not always the folder
# the script lives in. A relative path such as ../data follows the cwd.


# === 7. datetime: parse text into a date, do math, format it back ===
service = datetime.strptime("2026-11-29", "%Y-%m-%d")
print("Weekday:", service.strftime("%a %d %b %Y"))
print("Three days later:", (service + timedelta(days=3)).strftime("%Y-%m-%d"))
print("Days between:", (datetime(2026, 12, 25) - service).days)


# === 8. Write a CSV with DictWriter (newline='' stops blank rows on Windows) ===
with tempfile.TemporaryDirectory() as folder:
    out_path = os.path.join(folder, "summary.csv")
    with open(out_path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=["station", "total"])
        writer.writeheader()
        for station, total in totals.items():
            writer.writerow({"station": station, "total": total})
    with open(out_path, newline="", encoding="utf-8") as handle:
        summary_rows = list(csv.DictReader(handle))
print("Summary rows:", len(summary_rows), summary_rows[1])


# === 9. Counter is a dict that already knows how to count ===
words = " ".join(kept).lower().split()
by_hand = {}
for word in words:
    by_hand[word] = by_hand.get(word, 0) + 1
counted = Counter(words)
print("Same answer both ways:", dict(counted) == by_hand)
print("Most common:", counted.most_common(2))
