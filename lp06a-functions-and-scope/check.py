"""Run from the repo root: python lp06a-functions-and-scope/check.py."""

import argparse
import importlib.util
from pathlib import Path
import unittest
from contextlib import redirect_stdout
from io import StringIO


HERE = Path(__file__).resolve().parent
EXERCISES = (
    "badge_line", "headline", "format_duration", "repair_price_line",
    "repair_shadowed_prefix", "card_from_parts", "scope_snapshot",
    "make_signoff", "render_agenda", "make_visit_tracker", "batch_badges",
)


def load_module(path):
    spec = importlib.util.spec_from_file_location("week6_work", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class LessonChecks(unittest.TestCase):
    target = None

    def expect(self, name, args, expected, nudge, kwargs=None):
        kwargs = kwargs or {}
        try:
            actual = getattr(self.target, name)(*args, **kwargs)
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(
                f"input {args!r}, {kwargs!r}; expected {expected!r}, got "
                f"{type(error).__name__}: {error}. Hint: {nudge}"
            )
        if type(actual) is not type(expected) or actual != expected:
            self.fail(
                f"input {args!r}, {kwargs!r}; expected {expected!r}, "
                f"got {actual!r}. Hint: {nudge}"
            )
        return actual

    def test_01_badge_line(self):
        self.expect("badge_line", (" Ari ", "crew"), "Ari | crew", "Strip both fields.")
        self.expect("badge_line", ("   ",), "Unknown | guest", "Use a fallback for a blank name.")
        self.expect("badge_line", ("Bo", "  "), "Bo | guest", "A blank role uses guest.")

    def test_02_headline(self):
        self.expect("headline", (" orbit ", "#"), "#ORBIT#", "Strip and uppercase the title.")
        self.expect("headline", ("",), "*UNTITLED*", "Use the blank-title fallback.")
        self.expect("headline", ("Map", ""), "MAP", "An empty marker adds nothing.")

    def test_03_format_duration(self):
        self.expect("format_duration", (125,), "2:05", "Pad the seconds part to two digits.")
        self.expect("format_duration", (0,), "0:00", "Zero still needs two second digits.")
        self.expect("format_duration", (60,), "1:00", "Sixty seconds starts a new minute.")
        self.expect("format_duration", (59,), "0:59", "Do not round seconds to minutes.")

    def test_04_repair_price_line(self):
        output = StringIO()
        with redirect_stdout(output):
            self.expect("repair_price_line", ("Pencil", 125), "Pencil: $1.25", "Return the line.")
        self.assertEqual(output.getvalue(), "", f"input ('Pencil', 125); expected no print, got {output.getvalue()!r}. Hint: Return the line.")
        self.expect("repair_price_line", ("Free", 0), "Free: $0.00", "Keep two cent digits.")
        self.expect("repair_price_line", ("Clip", 5), "Clip: $0.05", "Pad a single cent digit.")

    def test_05_repair_shadowed_prefix(self):
        self.expect("repair_shadowed_prefix", ("Doors open", "Alert"), "Alert: Doors open", "Keep the caller's prefix.")
        self.expect("repair_shadowed_prefix", ("",), "Note: ", "Use the default only when omitted.")
        self.expect("repair_shadowed_prefix", ("Ready",), "Note: Ready", "Keep the default prefix.")

    def test_06_card_from_parts(self):
        self.expect("card_from_parts", ("Open Mic", "Hall", "7 PM"), "[EVENT] Open Mic @ Hall (7 PM)", "Keep the fields in order.")
        self.expect("card_from_parts", ("Open Mic", "", "7 PM"), "[EVENT] Open Mic @  (7 PM)", "Do not invent a missing place.")
        self.expect("card_from_parts", ("Talk", "Room 2", "9 AM"), "[CLASS] Talk @ Room 2 (9 AM)", "Use the supplied tag.", {"tag": "CLASS"})

    def test_07_scope_snapshot(self):
        self.expect("scope_snapshot", ("map",), ("outer:map", "inner:map", "outer:map"), "The inner local does not replace the outer value.")
        self.expect("scope_snapshot", ("",), ("outer:", "inner:", "outer:"), "Empty text still has both scope labels.")

    def test_08_make_signoff(self):
        try:
            ari = self.target.make_signoff("Ari")
            bo = self.target.make_signoff("Bo")
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(f"input authors Ari and Bo; expected two functions, got {type(error).__name__}: {error}. Hint: Return the inner function.")
        self.assertTrue(callable(ari) and callable(bo), f"input authors Ari and Bo; expected callables, got {ari!r} and {bo!r}. Hint: Return the inner function.")
        for function, message, expected in ((ari, "Ready", "Ready / Ari"), (bo, "Ready", "Ready / Bo"), (ari, "", " / Ari")):
            actual = function(message)
            self.assertEqual(actual, expected, f"input {message!r}; expected {expected!r}, got {actual!r}. Hint: Each function keeps its own author.")

    def test_09_render_agenda(self):
        entries = [("9 AM", "Doors"), ("10 AM", "Talk")]
        self.expect("render_agenda", (entries,), "Today's plan\n9 AM | Doors\n10 AM | Talk", "Keep the input order and heading.")
        self.assertEqual(entries, [("9 AM", "Doors"), ("10 AM", "Talk")], f"input agenda; expected unchanged entries, got {entries!r}. Hint: Build new text.")
        self.expect("render_agenda", ([],), "Today's plan", "An empty agenda still has a heading.")
        self.expect("render_agenda", ([("9 AM", "Doors")],), "Monday\n9 AM | Doors", "Use the keyword heading.", {"heading": "Monday"})
        self.expect("render_agenda", ([("4 PM", "Close"), ("9 AM", "Open")],), "Today's plan\n4 PM | Close\n9 AM | Open", "Keep input order, even when times are not sorted.")

    def test_10_make_visit_tracker(self):
        try:
            first = self.target.make_visit_tracker(2)
            second = self.target.make_visit_tracker()
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(f"input starts 2 and 0; expected two trackers, got {type(error).__name__}: {error}. Hint: Return a nested function.")
        self.assertTrue(callable(first) and callable(second), f"input starts 2 and 0; expected callables, got {first!r} and {second!r}. Hint: Return a nested function.")
        for function, expected in ((first, 3), (first, 4), (second, 1), (first, 5), (second, 2)):
            actual = function()
            self.assertEqual(actual, expected, f"input tracker call; expected {expected!r}, got {actual!r}. Hint: Trackers keep separate local counts.")

    def test_11_batch_badges(self):
        names = [" Ari ", "Bo"]
        self.expect("batch_badges", (names, "crew"), ["Ari | crew", "Bo | crew"], "Reuse badge_line for each name.")
        self.assertEqual(names, [" Ari ", "Bo"], f"input names; expected unchanged list, got {names!r}. Hint: Build a new list.")
        self.expect("batch_badges", ([],), [], "An empty batch stays empty.")
        self.expect("batch_badges", (["  "],), ["Unknown | guest"], "Keep badge_line's blank-name rule.")


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
