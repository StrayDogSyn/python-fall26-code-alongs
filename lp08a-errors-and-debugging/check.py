"""Run from the repo root: python lp08a-errors-and-debugging/check.py."""

import argparse
import importlib.util
import logging
import os
from pathlib import Path
import tempfile
import unittest


HERE = Path(__file__).resolve().parent
DATA = HERE / "data"
EXERCISES = (
    "parse_temp", "average_temp", "ticket_field", "repair_parse_qty",
    "repair_total_weight", "delivery_problems", "read_cooler_log", "log_reading",
    "parse_ticket_strict", "collect_tickets", "call_with_retries",
)


def load_module(path):
    spec = importlib.util.spec_from_file_location("week8_work", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ListHandler(logging.Handler):
    """Collects log records so a test can look at their levels and messages."""

    def __init__(self):
        super().__init__(level=logging.DEBUG)
        self.records = []

    def emit(self, record):
        self.records.append(record)


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

    def expect_raises(self, name, args, error_type, nudge, word=None):
        """The call must raise error_type, and its message must contain word."""
        try:
            actual = getattr(self.target, name)(*args)
        except NotImplementedError:
            raise
        except error_type as error:
            if word is not None and word not in str(error):
                self.fail(
                    f"input {args!r}; expected a {error_type.__name__} message that "
                    f"mentions {word!r}, got {str(error)!r}. Hint: {nudge}"
                )
            return error
        except Exception as error:
            self.fail(
                f"input {args!r}; expected {error_type.__name__}, got "
                f"{type(error).__name__}: {error}. Hint: {nudge}"
            )
        self.fail(f"input {args!r}; expected {error_type.__name__}, got the result {actual!r}. Hint: {nudge}")

    def test_01_parse_temp(self):
        self.expect("parse_temp", ("38.5",), 38.5, "float() turns text into a number.")
        self.expect("parse_temp", (" 40 ",), 40.0, "float() ignores spaces around the number.")
        self.expect("parse_temp", ("n/a",), None, "Catch the ValueError and return None.")
        self.expect("parse_temp", ("",), None, "Empty text is not a number.")
        self.expect("parse_temp", ("nan",), None, "float('nan') does not raise. Check for it after converting.")
        self.expect("parse_temp", ("inf",), None, "float('inf') does not raise either. math.isfinite helps.")
        self.expect("parse_temp", ("-4",), -4.0, "A freezer reading below zero is still a number.")

    def test_02_average_temp(self):
        self.expect("average_temp", ([38.0, 39.0, 41.0],), 39.3, "Round to one decimal place.")
        self.expect("average_temp", ([40.0],), 40.0, "One reading is its own average.")
        self.expect("average_temp", ([37.5, 38.5],), 38.0, "Add, divide by the count, round.")
        self.expect("average_temp", ([],), None, "No readings means None, not a crash.")

    def test_03_ticket_field(self):
        fields = ["104", "2", "Corn"]
        self.expect("ticket_field", (fields, 1), "2", "Index 1 is the second field.")
        self.expect("ticket_field", (fields, 3), "", "Past the end gives the default.")
        self.expect("ticket_field", (fields, 3, "n/a"), "n/a", "Use the default you were given.")
        self.expect("ticket_field", (fields, -1), "", "A negative index must not wrap around to the last item.")
        self.expect("ticket_field", ([], 0), "", "An empty list has no field 0.")
        self.expect("ticket_field", (fields, 0, None), "104", "A real field wins over the default.")

    def test_04_repair_parse_qty(self):
        self.expect("repair_parse_qty", ("12",), 12, "int() turns whole-number text into an int.")
        self.expect("repair_parse_qty", (" 7 ",), 7, "int() ignores spaces around the number.")
        self.expect("repair_parse_qty", ("oops",), 0, "Text that is not a number gives 0.")
        self.expect("repair_parse_qty", ("",), 0, "Empty text gives 0.")
        self.expect("repair_parse_qty", ("12.5",), 0, "int('12.5') raises ValueError, so this gives 0.")
        self.expect_raises(
            "repair_parse_qty", (None,), TypeError,
            "None is a bug in the caller, not bad text. Catch only ValueError so the TypeError still shows.",
        )

    def test_05_repair_total_weight(self):
        self.expect("repair_total_weight", (["5", "oops", "7"],), 12.0, "One bad entry should skip only itself.")
        self.expect("repair_total_weight", (["1.5", "2.5"],), 4.0, "Good entries add up.")
        self.expect("repair_total_weight", (["bad"],), 0.0, "All bad entries total 0.0.")
        self.expect("repair_total_weight", ([],), 0.0, "No entries total 0.0.")
        self.expect("repair_total_weight", (["", "3"],), 3.0, "An empty entry is skipped like any other bad one.")

    def test_06_delivery_problems(self):
        good = {"item": "Halibut", "weight": "12.5", "temp": "38"}
        self.expect("delivery_problems", (good,), [], "A clean record has no problems.")
        self.expect("delivery_problems", ({"item": "  ", "weight": "12", "temp": "38"},), ["missing item"], "Blank after strip counts as missing.")
        self.expect("delivery_problems", ({"item": "Cream", "weight": "0", "temp": "38"},), ["bad weight"], "Weight must be above zero.")
        self.expect("delivery_problems", ({"item": "Cream", "weight": "-3", "temp": "38"},), ["bad weight"], "Negative weight is bad.")
        self.expect("delivery_problems", ({"item": "Cream", "weight": "abc", "temp": "38"},), ["bad weight"], "Text that is not a number is a bad weight.")
        self.expect("delivery_problems", ({"item": "Cream", "weight": "5", "temp": "45.5"},), ["too warm"], "Above 41 is too warm.")
        self.expect("delivery_problems", ({"item": "Cream", "weight": "5", "temp": "41"},), [], "41 exactly is still fine.")
        self.expect("delivery_problems", ({"item": "Cream", "weight": "5", "temp": "n/a"},), ["bad temp"], "Unreadable temp is a bad temp, not a warm one.")
        self.expect("delivery_problems", ({},), ["missing item", "bad weight", "bad temp"], "Missing keys count as missing values; keep this order.")
        self.expect("delivery_problems", ({"item": "", "weight": "nan", "temp": "90"},), ["missing item", "bad weight", "too warm"], "nan is not a usable weight.")
        self.expect("delivery_problems", ({"item": "Eggs", "weight": "5", "temp": None},), ["bad temp"], "None is a missing temp.")
        before = dict(good)
        self.target.delivery_problems(good)
        self.assertEqual(good, before, "input a record; expected it unchanged. Hint: Only read the record.")

    def test_07_read_cooler_log(self):
        self.expect(
            "read_cooler_log", (str(DATA / "cooler_log.txt"),),
            {"readings": [37.5, 38.0, 39.5, 44.0, 38.2], "bad_lines": [5, 9, 10, 11]},
            "Count physical lines from 1, skip blank and # lines, and flag lines without exactly two parts or a usable temp.",
        )
        self.expect("read_cooler_log", (self.temp("none.txt"),), None, "A missing file gives None.")
        self.expect("read_cooler_log", (self.temp("empty.txt", ""),), {"readings": [], "bad_lines": []}, "An empty file is not a missing file.")
        self.expect(
            "read_cooler_log", (self.temp("pad.txt", "\n# note\n  1:00  |  36.0  \nbroken\n"),),
            {"readings": [36.0], "bad_lines": [4]},
            "Strip each part, and number the lines before you skip any.",
        )

    def test_08_log_reading(self):
        def run(reading, *extra):
            logger = logging.getLogger(f"lp08a.check.{reading!r}.{extra!r}")
            logger.setLevel(logging.DEBUG)
            logger.propagate = False
            handler = ListHandler()
            logger.addHandler(handler)
            try:
                result = self.target.log_reading(logger, reading, *extra)
            except NotImplementedError:
                raise
            except Exception as error:
                self.fail(f"input {reading!r}; expected a log record, got {type(error).__name__}: {error}. Hint: Call the logger, do not print.")
            finally:
                logger.removeHandler(handler)
            return result, [(r.levelname, r.getMessage()) for r in handler.records]

        result, records = run(38.0)
        self.assertEqual(result, True, f"input 38.0; expected True, got {result!r}. Hint: A fine reading returns True.")
        self.assertEqual([level for level, _ in records], ["INFO"], f"input 38.0; expected one INFO record, got {records!r}. Hint: logger.info for a normal reading.")
        self.assertIn("38.0", records[0][1], f"input 38.0; expected the reading in the message, got {records[0][1]!r}. Hint: Put the number in the text.")
        result, records = run(45.0)
        self.assertEqual(result, False, f"input 45.0; expected False, got {result!r}. Hint: A warm reading returns False.")
        self.assertEqual([level for level, _ in records], ["WARNING"], f"input 45.0; expected one WARNING record, got {records!r}. Hint: logger.warning when above the limit.")
        self.assertIn("45.0", records[0][1], f"input 45.0; expected the reading in the message, got {records[0][1]!r}. Hint: Put the number in the text.")
        result, records = run(41.0)
        self.assertEqual((result, [level for level, _ in records]), (True, ["INFO"]), f"input 41.0; expected True with an INFO record, got {(result, records)!r}. Hint: The limit itself is still fine.")
        result, records = run(None)
        self.assertEqual(result, False, f"input None; expected False, got {result!r}. Hint: A missing reading is not fine.")
        self.assertEqual([level for level, _ in records], ["ERROR"], f"input None; expected one ERROR record, got {records!r}. Hint: logger.error for a missing reading.")
        result, records = run(40.0, 39.0)
        self.assertEqual((result, [level for level, _ in records]), (False, ["WARNING"]), f"input 40.0 with limit 39.0; expected False with a WARNING, got {(result, records)!r}. Hint: Use the limit you were given.")

    def test_09_parse_ticket_strict(self):
        self.expect(
            "parse_ticket_strict", ("104 | 2 | Corn | 3 | 3.50",),
            {"ticket": 104, "table": 2, "dish": "Corn", "qty": 3, "price": 3.5},
            "Split on |, strip each part, convert the numbers.",
        )
        self.expect(
            "parse_ticket_strict", ("7|11|Fries, large|1|4.25",),
            {"ticket": 7, "table": 11, "dish": "Fries, large", "qty": 1, "price": 4.25},
            "A comma in the dish is plain text here.",
        )
        self.expect_raises("parse_ticket_strict", ("104|2|Corn|3",), ValueError, "Say how many fields you expected.", "5 fields")
        self.expect_raises("parse_ticket_strict", ("",), ValueError, "Empty text has one piece, not five.", "5 fields")
        self.expect_raises("parse_ticket_strict", ("x|2|Corn|3|3.50",), ValueError, "Name the field that failed.", "ticket")
        self.expect_raises("parse_ticket_strict", ("104|two|Corn|3|3.50",), ValueError, "Name the field that failed.", "table")
        self.expect_raises("parse_ticket_strict", ("104|2||3|3.50",), ValueError, "A blank dish is an error.", "dish")
        self.expect_raises("parse_ticket_strict", ("104|2|Corn|0|3.50",), ValueError, "Zero portions is not an order.", "qty")
        self.expect_raises("parse_ticket_strict", ("104|2|Corn|1.5|3.50",), ValueError, "qty must be a whole number.", "qty")
        self.expect_raises("parse_ticket_strict", ("104|2|Corn|3|-1",), ValueError, "A negative price is an error.", "price")
        self.expect_raises("parse_ticket_strict", ("104|2|Corn|3|abc",), ValueError, "Text that is not a number is a bad price.", "price")
        self.expect_raises("parse_ticket_strict", ("104|2|Corn|3|nan",), ValueError, "nan is not a price.", "price")

    def test_10_collect_tickets(self):
        lines = ["101|4|Ramen|2|14.50", "102|7|Fries|x|4.25", "", "104|2|Corn|3|3.50", "oops"]
        good, errors = self.expect_pair("collect_tickets", (lines,))
        self.assertEqual(
            [ticket["ticket"] for ticket in good], [101, 104],
            f"input five lines; expected tickets [101, 104], got {good!r}. Hint: Keep only lines that parse.",
        )
        self.assertEqual(len(errors), 2, f"input five lines; expected 2 errors, got {errors!r}. Hint: Blank lines are skipped, not errors.")
        self.assertTrue(errors[0].startswith("line 2: ") and "qty" in errors[0], f"input five lines; expected the first error to start 'line 2: ' and name qty, got {errors[0]!r}. Hint: Number lines from 1 and add the ValueError text.")
        self.assertTrue(errors[1].startswith("line 5: "), f"input five lines; expected the second error to start 'line 5: ', got {errors[1]!r}. Hint: Count the blank line too.")
        good, errors = self.expect_pair("collect_tickets", ([],))
        self.assertEqual((good, errors), ([], []), "input []; expected ([], []). Hint: No lines means nothing to report.")
        good, errors = self.expect_pair("collect_tickets", (["  ", ""],))
        self.assertEqual((good, errors), ([], []), "input two blank lines; expected ([], []). Hint: Blank lines are not errors.")

    def expect_pair(self, name, args):
        try:
            result = getattr(self.target, name)(*args)
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(f"input {args!r}; expected a (list, list) pair, got {type(error).__name__}: {error}. Hint: Catch the ValueError inside the loop.")
        if not (isinstance(result, tuple) and len(result) == 2):
            self.fail(f"input {args!r}; expected a (good, errors) tuple, got {result!r}. Hint: return good, errors.")
        return result

    def test_11_call_with_retries(self):
        def flaky(failures, result="ok"):
            state = {"calls": 0}

            def action():
                state["calls"] += 1
                if state["calls"] <= failures:
                    raise ConnectionError(f"attempt {state['calls']}")
                return result

            return action, state

        action, state = flaky(0)
        self.expect("call_with_retries", (action, 3), "ok", "A first-try success returns its result.")
        self.assertEqual(state["calls"], 1, f"input an action that works; expected 1 call, got {state['calls']}. Hint: Stop as soon as it works.")
        action, state = flaky(2)
        self.expect("call_with_retries", (action, 3), "ok", "Retry on ConnectionError until it works.")
        self.assertEqual(state["calls"], 3, f"input an action that fails twice; expected 3 calls, got {state['calls']}. Hint: Count every try.")
        action, state = flaky(5)
        error = self.expect_raises("call_with_retries", (action, 2), ConnectionError, "After the last try, let the error out.")
        self.assertEqual(state["calls"], 2, f"input an action that always fails with attempts=2; expected 2 calls, got {state['calls']}. Hint: attempts is the total number of tries.")
        self.assertEqual(str(error), "attempt 2", f"input an action that always fails; expected the last error 'attempt 2', got {str(error)!r}. Hint: Re-raise the error you caught with a bare raise.")
        calls = []

        def broken():
            calls.append(1)
            raise ValueError("not a network problem")

        self.expect_raises("call_with_retries", (broken, 3), ValueError, "Only ConnectionError is worth a retry.")
        self.assertEqual(len(calls), 1, f"input an action that raises ValueError; expected 1 call, got {len(calls)}. Hint: Catch only ConnectionError.")
        untouched, state = flaky(0)
        self.expect_raises("call_with_retries", (untouched, 0), ValueError, "Zero attempts is a mistake in the caller.")
        self.assertEqual(state["calls"], 0, f"input attempts=0; expected 0 calls, got {state['calls']}. Hint: Check attempts before you call anything.")


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
