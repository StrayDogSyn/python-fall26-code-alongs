"""Check Week 8 practice: --solutions or --module PATH selects other work."""
import argparse
import importlib.util
from datetime import date
from pathlib import Path
import tempfile
import unittest
from unittest.mock import Mock

HERE = Path(__file__).resolve().parent
EXERCISES = ('describe_error', 'station_note', 'portion_size', 'repair_pick', 'require_label', 'read_optional', 'parse_service_date', 'run_with_cleanup', 'logged_lookup', 'collect_dates', 'balanced_brackets')

def load_module(path):
    spec = importlib.util.spec_from_file_location("week8_work", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

class LessonChecks(unittest.TestCase):
    target = None

    def setUp(self):
        self.folder = tempfile.TemporaryDirectory()
        self.addCleanup(self.folder.cleanup)

    def temp(self, name, text=None):
        path = Path(self.folder.name) / name
        if text is not None:
            path.write_text(text, encoding="utf-8")
        return path

    def expect(self, name, args, expected, nudge):
        try:
            actual = getattr(self.target, name)(*args)
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(f"input {args!r}; got {type(error).__name__}: {error}. Hint: {nudge}")
        self.assertIs(type(actual), type(expected), f"input {args!r}. Hint: {nudge}")
        self.assertEqual(actual, expected, f"input {args!r}. Hint: {nudge}")
        return actual

    def test_01_describe_error(self):
        self.expect("describe_error", (KeyError("oven"),), "KeyError", "Read the type, not the message.")
        self.expect("describe_error", (ValueError(""),), "ValueError", "An empty message still has a class.")
        self.expect("describe_error", (IndexError("out"),), "IndexError", "Do not hard-code one class.")

    def test_02_station_note(self):
        self.expect("station_note", ({"Grill": "hot", "Pastry": ""}, "Grill"), "hot", "Return the stored text.")
        self.expect("station_note", ({"Pastry": ""}, "Pastry"), "", "Empty is different from missing.")
        self.expect("station_note", ({}, "Grill"), "No note", "Catch KeyError.")
        with self.assertRaises(TypeError):
            self.target.station_note({}, [])

    def test_03_portion_size(self):
        self.expect("portion_size", (9, 2), 4.5, "Use true division.")
        self.expect("portion_size", (0, 2), 0.0, "Zero total is valid.")
        self.expect("portion_size", (9, 0), None, "Catch only division by zero.")
        with self.assertRaises(TypeError):
            self.target.portion_size("9", 2)

    def test_04_repair_pick(self):
        self.expect("repair_pick", (["soup", "tart"], 1), "tart", "The last index is length minus one.")
        self.expect("repair_pick", (["soup"], 1), None, "Equal to length is out of range.")
        self.expect("repair_pick", (["soup"], -1), None, "Reject negative indices here.")
        self.expect("repair_pick", ([], 0), None, "An empty list has no index zero.")

    def test_05_require_label(self):
        self.expect("require_label", (" Grill ",), "Grill", "Strip the edges.")
        for text in ("", " \t"):
            with self.assertRaisesRegex(ValueError, "^label required$"):
                self.target.require_label(text)

    def test_06_read_optional(self):
        path = self.temp("note.txt", "menu\ncafé\n")
        self.expect("read_optional", (path,), "menu\ncafé\n", "Keep newlines and UTF-8 text.")
        self.expect("read_optional", (self.temp("missing.txt"),), "", "Only a missing file gets the fallback.")
        with self.assertRaises(OSError):
            self.target.read_optional(self.folder.name)
        bad = Path(self.folder.name) / "bad.txt"
        bad.write_bytes(bytes([255]))
        with self.assertRaises(UnicodeDecodeError):
            self.target.read_optional(bad)

    def test_07_parse_service_date(self):
        self.expect("parse_service_date", ("2028-02-29",), date(2028, 2, 29), "Let datetime handle leap years.")
        with self.assertRaisesRegex(ValueError, "^invalid service date$") as found:
            self.target.parse_service_date("2026-02-29")
        self.assertIsInstance(found.exception.__cause__, ValueError, "Keep the original exception as the cause.")
        with self.assertRaises(TypeError):
            self.target.parse_service_date(None)

    def test_08_run_with_cleanup(self):
        events = []
        def operation():
            events.append("run")
            return 7
        self.expect("run_with_cleanup", (operation, lambda: events.append("close")), 7, "Preserve the operation result.")
        self.assertEqual(events, ["run", "close"])
        events.clear()
        error = RuntimeError("oven offline")
        def broken():
            events.append("run")
            raise error
        with self.assertRaises(RuntimeError) as found:
            self.target.run_with_cleanup(broken, lambda: events.append("close"))
        self.assertIs(found.exception, error)
        self.assertEqual(events, ["run", "close"], "Cleanup runs exactly once even on failure.")

    def test_09_logged_lookup(self):
        logger = Mock()
        self.expect("logged_lookup", ({"Grill": "ready"}, "Grill", logger), "ready", "Successful work belongs in else.")
        logger.warning.assert_not_called()
        self.expect("logged_lookup", ({}, "Pastry", logger), None, "Warn once for missing data.")
        logger.warning.assert_called_once_with("Missing station: %s", "Pastry")
        logger.reset_mock()
        with self.assertRaises(TypeError):
            self.target.logged_lookup({}, [], logger)
        logger.warning.assert_not_called()

    def test_10_collect_dates(self):
        texts = ["bad", "2026-11-23", "2026-02-29", "2028-02-29"]
        self.expect("collect_dates", (texts,), ([date(2026, 11, 23), date(2028, 2, 29)], [1, 3]), "Catch each bad row and continue.")
        self.assertEqual(texts, ["bad", "2026-11-23", "2026-02-29", "2028-02-29"])
        self.expect("collect_dates", ([],), ([], []), "Keep both result lists.")
        with self.assertRaises(TypeError):
            self.target.collect_dates([None])

    def test_11_balanced_brackets(self):
        for text, expected in [("{[]}", True), ("()[]{}", True), ("([)]", False), ("]", False), ("((", False), ("", True), ("(]", False)]:
            self.expect("balanced_brackets", (text,), expected, "Check before popping, and check leftover opens.")


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
