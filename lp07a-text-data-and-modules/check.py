"""Run from the repo root: python lp07a-text-data-and-modules/check.py."""

import argparse
import csv
import importlib.util
import os
from pathlib import Path
import tempfile
import unittest


HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
EXERCISES = (
    "read_clean_lines", "longest_line", "append_note", "repair_total_qty",
    "repair_save_lines", "load_prep", "totals_by_station", "write_prep_report",
    "parse_ticket_line", "first_existing", "shift_dates",
)


def load_module(path):
    spec = importlib.util.spec_from_file_location("week7_work", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class LessonChecks(unittest.TestCase):
    target = None

    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)

    def temp(self, name, text=None):
        path = os.path.join(self.folder.name, name)
        if text is not None:
            with open(path, "w", encoding="utf-8", newline="") as handle:
                handle.write(text)
        return path

    def read(self, path):
        with open(path, encoding="utf-8", newline="") as handle:
            return handle.read()

    def expect(self, name, args, expected, nudge):
        try:
            actual = getattr(self.target, name)(*args)
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(
                f"input {args!r}; expected {expected!r}, got "
                f"{type(error).__name__}: {error}. Hint: {nudge}"
            )
        if type(actual) is not type(expected) or actual != expected:
            self.fail(f"input {args!r}; expected {expected!r}, got {actual!r}. Hint: {nudge}")
        return actual

    def test_01_read_clean_lines(self):
        self.expect(
            "read_clean_lines", (str(DATA / "shift_log.txt"),),
            ["Walk-in cooler holding at 38 F", "Stock pot on at 3:00 PM",
             "Braised short rib is the feature", "Fennel slaw needs two more jars",
             "86 the halibut"],
            "Strip each line, then skip blanks and lines that start with #.",
        )
        self.expect("read_clean_lines", (self.temp("empty.txt", ""),), [], "An empty file has no lines.")
        self.expect(
            "read_clean_lines", (self.temp("edge.txt", "  # hidden\n\n  keep me  \n#\n"),),
            ["keep me"], "Check for # after stripping the edges.",
        )

    def test_02_longest_line(self):
        self.expect("longest_line", (self.temp("a.txt", "ab\nabc\nxyz\n"),), "abc", "Keep the first line on a tie.")
        self.expect("longest_line", (self.temp("b.txt", "\n   \n"),), "", "Blank lines are not candidates.")
        self.expect("longest_line", (self.temp("c.txt", "  pad  \nlonger line\n"),), "longer line", "Measure the stripped text.")
        self.expect("longest_line", (self.temp("d.txt", "# a comment is long\nshort\n"),), "# a comment is long", "Comment lines count here.")

    def test_03_append_note(self):
        path = self.temp("notes.txt", "one\n")
        self.target.append_note(path, "two")
        self.assertEqual(self.read(path), "one\ntwo\n", "input append to 'one\\n'; expected 'one\\ntwo\\n'. Hint: Mode a keeps old content.")
        missing = self.temp("fresh.txt")
        self.target.append_note(missing, "two")
        self.assertEqual(self.read(missing), "two\n", "input append to a missing file; expected 'two\\n'. Hint: Mode a creates the file.")
        self.target.append_note(missing, "three")
        self.assertEqual(self.read(missing), "two\nthree\n", "input two appends; expected 'two\\nthree\\n'. Hint: End each note with a newline.")

    def test_04_repair_total_qty(self):
        self.expect("repair_total_qty", (str(DATA / "prep.csv"),), 45, "Convert qty with int() and treat blank as 0.")
        self.expect("repair_total_qty", (self.temp("head.csv", "station,item,qty,unit\n"),), 0, "A header-only file totals 0.")
        self.expect("repair_total_qty", (self.temp("two.csv", "station,item,qty,unit\nA,x,2,u\nA,y,3,u\n"),), 5, "Add numbers, not text.")

    def test_05_repair_save_lines(self):
        path = self.temp("out.txt", "old content\nmore old\n")
        count = self.expect("repair_save_lines", (path, ["a", "b", "c"]), 3, "Return how many lines you wrote.")
        self.assertEqual(count, 3)
        self.assertEqual(self.read(path), "a\nb\nc\n", "input three lines; expected 'a\\nb\\nc\\n'. Hint: Open once, write every line inside that one block.")
        self.expect("repair_save_lines", (path, ["z"]), 1, "A second save replaces the first.")
        self.assertEqual(self.read(path), "z\n", "input ['z'] after an earlier save; expected 'z\\n'. Hint: Mode w replaces old content once, not on every line.")
        self.expect("repair_save_lines", (path, []), 0, "An empty list still returns a count.")
        self.assertEqual(self.read(path), "", "input []; expected an empty file. Hint: Opening in w mode empties the file.")

    def test_06_load_prep(self):
        rows = self.expect(
            "load_prep", (str(DATA / "prep.csv"),),
            [
                {"station": "Garde Manger", "item": "Fennel slaw", "qty": 4, "unit": "quarts"},
                {"station": "Garde Manger", "item": "Pickled onions", "qty": 6, "unit": "pints"},
                {"station": "Grill", "item": "Short rib", "qty": 12, "unit": "portions"},
                {"station": "Grill", "item": "Corn", "qty": 18, "unit": "ears"},
                {"station": "Saute", "item": "Shallots", "qty": 3, "unit": "lbs"},
                {"station": "Saute", "item": "Butter", "qty": 0, "unit": "lbs"},
                {"station": "Pastry", "item": "Tart dough", "qty": 2, "unit": "batches"},
            ],
            "Use DictReader, convert qty, and use 0 for a blank qty.",
        )
        self.assertEqual(len(rows), 7)
        padded = self.temp("pad.csv", "station,item,qty,unit\n Grill , Corn , 3 , ears \n")
        self.expect(
            "load_prep", (padded,),
            [{"station": "Grill", "item": "Corn", "qty": 3, "unit": "ears"}],
            "Strip every text field, including the unit.",
        )
        self.expect("load_prep", (self.temp("head.csv", "station,item,qty,unit\n"),), [], "A header-only file has no rows.")

    def test_07_totals_by_station(self):
        rows = [
            {"station": "Pastry", "item": "Tart dough", "qty": 2, "unit": "batches"},
            {"station": "Grill", "item": "Corn", "qty": 18, "unit": "ears"},
            {"station": "Grill", "item": "Short rib", "qty": 12, "unit": "portions"},
        ]
        before = [dict(row) for row in rows]
        actual = self.expect("totals_by_station", (rows,), {"Pastry": 2, "Grill": 30}, "Add each qty to its station's running total.")
        self.assertEqual(list(actual), ["Pastry", "Grill"], f"input three rows; expected key order ['Pastry', 'Grill'], got {list(actual)!r}. Hint: Keep first-seen order, do not sort.")
        self.assertEqual(rows, before, "input rows; expected unchanged rows. Hint: Build a new dict.")
        self.expect("totals_by_station", ([],), {}, "No rows means no stations.")

    def test_08_write_prep_report(self):
        rows = [
            {"station": "Grill", "item": "Corn", "qty": 18, "unit": "ears"},
            {"station": "Garde Manger", "item": "Fennel slaw", "qty": 4, "unit": "quarts"},
            {"station": "Grill", "item": "Short rib", "qty": 12, "unit": "portions"},
        ]
        path = self.temp("report.csv")
        count = self.expect("write_prep_report", (rows, path), 2, "Return the number of station rows.")
        self.assertEqual(count, 2)
        with open(path, newline="", encoding="utf-8") as handle:
            written = list(csv.reader(handle))
        self.assertEqual(
            written,
            [["station", "items", "total_qty"], ["Garde Manger", "1", "4"], ["Grill", "2", "30"]],
            f"input three rows; expected a header and two sorted station rows, got {written!r}. Hint: Sort stations and write the header first.",
        )
        empty = self.temp("empty.csv")
        self.expect("write_prep_report", ([], empty), 0, "No rows still writes a header.")
        with open(empty, newline="", encoding="utf-8") as handle:
            self.assertEqual(list(csv.reader(handle)), [["station", "items", "total_qty"]], "input []; expected only the header. Hint: Use writeheader.")
        raw = self.read(path)
        self.assertNotIn("\r\r", raw, "input a Windows-style write; expected no doubled carriage returns. Hint: Open the file with newline=''.")

    def test_09_parse_ticket_line(self):
        self.expect(
            "parse_ticket_line", ("104 | 2 | Corn | 3 | 3.50",),
            {"ticket": 104, "table": 2, "dish": "Corn", "qty": 3, "price": 3.5},
            "Split on |, strip each part, then convert the numbers.",
        )
        self.expect(
            "parse_ticket_line", ("7|11|Fries, large|1|4.25",),
            {"ticket": 7, "table": 11, "dish": "Fries, large", "qty": 1, "price": 4.25},
            "A comma in the dish is just text when the separator is a pipe.",
        )
        self.expect("parse_ticket_line", ("104|2|Corn|3",), None, "Four fields is not a ticket.")
        self.expect("parse_ticket_line", ("",), None, "Empty text is not a ticket.")

    def test_10_first_existing(self):
        self.temp("b.csv", "x")
        self.temp("c.csv", "x")
        folder = self.folder.name
        self.expect("first_existing", (folder, ["a.csv", "b.csv", "c.csv"]), os.path.join(folder, "b.csv"), "Return the first candidate that exists.")
        self.expect("first_existing", (folder, ["c.csv", "b.csv"]), os.path.join(folder, "c.csv"), "Check names in the order given.")
        self.expect("first_existing", (folder, ["nope.csv"]), None, "Return None when nothing exists.")
        self.expect("first_existing", (folder, []), None, "No names means no match.")

    def test_11_shift_dates(self):
        self.expect("shift_dates", ("2026-11-29", 3), ["2026-11-29", "2026-11-30", "2026-12-01"], "Add one day at a time with timedelta.")
        self.expect("shift_dates", ("2026-11-29", 0), [], "Zero days gives an empty list.")
        self.expect("shift_dates", ("2028-02-28", 3), ["2028-02-28", "2028-02-29", "2028-03-01"], "Let datetime handle leap days.")
        self.expect("shift_dates", ("2026-12-31", 2), ["2026-12-31", "2027-01-01"], "Let datetime roll over the year.")


class LineResult(unittest.TestResult):
    def __init__(self):
        super().__init__()
        self.statuses = {}

    @staticmethod
    def name(test):
        return test._testMethodName.split("_", 2)[2]

    def addSuccess(self, test):
        super().addSuccess(test)
        name = self.name(test)
        self.statuses[name] = "PASS"
        print(f"PASS {name}")

    def addFailure(self, test, error):
        super().addFailure(test, error)
        name = self.name(test)
        self.statuses[name] = "FAIL"
        print(f"FAIL {name}: {error[1]}")

    def addError(self, test, error):
        super().addError(test, error)
        name = self.name(test)
        if isinstance(error[1], NotImplementedError):
            self.statuses[name] = "NOT STARTED"
            print(f"NOT STARTED {name}: {error[1]}")
        else:
            self.statuses[name] = "FAIL"
            print(f"FAIL {name}: {type(error[1]).__name__}: {error[1]}")


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--solutions", action="store_true")
    group.add_argument("--module", type=Path)
    args = parser.parse_args(argv)
    path = args.module or HERE / ("solutions.py" if args.solutions else "practice.py")
    LessonChecks.target = load_module(path)
    result = LineResult()
    unittest.defaultTestLoader.loadTestsFromTestCase(LessonChecks).run(result)
    return 0 if len(result.statuses) == len(EXERCISES) and all(
        status == "PASS" for status in result.statuses.values()
    ) else 1


if __name__ == "__main__":
    raise SystemExit(main())
