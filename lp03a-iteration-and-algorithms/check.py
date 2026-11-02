"""Run from the repo root: python lp03a-iteration-and-algorithms/check.py."""

import argparse
import importlib.util
from pathlib import Path
import unittest


HERE = Path(__file__).resolve().parent
EXERCISES = (
    "total_of_evens", "count_up_by", "repair_average", "repair_first_even",
    "ask_until_valid", "last_match_search", "binary_search", "selection_sort",
    "bubble_sort_passes", "duplicate_pair", "squares_of_odds",
)


def load_module(path):
    spec = importlib.util.spec_from_file_location("week5_work", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class LessonChecks(unittest.TestCase):
    target = None

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

    def test_01_total_of_evens(self):
        self.expect("total_of_evens", ([3, 4, 6],), 10, "Add only even values.")
        self.expect("total_of_evens", ([-4, -1, 2],), -2, "Negative evens count too.")
        self.expect("total_of_evens", ([],), 0, "Start the accumulator at zero.")

    def test_02_count_up_by(self):
        self.expect("count_up_by", (2, 9, 3), [2, 5, 8], "Stop is excluded.")
        self.expect("count_up_by", (2, 8, 3), [2, 5], "Exclude stop even when the step lands on it.")
        self.expect("count_up_by", (9, 2, -3), [9, 6, 3], "A negative step counts down.")
        self.expect("count_up_by", (5, 0, 2), [], "A step away from stop produces no values.")
        try:
            self.target.count_up_by(1, 5, 0)
        except NotImplementedError:
            raise
        except ValueError as error:
            if str(error) != "step cannot be zero":
                self.fail(f"input (1, 5, 0); expected ValueError('step cannot be zero'), got {error!r}. Hint: Name the bad step.")
        except Exception as error:
            self.fail(f"input (1, 5, 0); expected ValueError, got {type(error).__name__}: {error}. Hint: Reject a zero step.")
        else:
            self.fail("input (1, 5, 0); expected ValueError, got no error. Hint: Reject a zero step.")

    def test_03_repair_average(self):
        self.expect("repair_average", ([2, 4, 9],), 5.0, "Initialize the total before the loop.")
        self.expect("repair_average", ([1, 2, 2],), 1.7, "Round the mean to one decimal.")
        self.expect("repair_average", ([],), 0.0, "Handle empty input before division.")

    def test_04_repair_first_even(self):
        self.expect("repair_first_even", ([3, 7, 4, 8],), 4, "Do not give up after an odd first value.")
        self.expect("repair_first_even", ([2, 4],), 2, "Return the first match.")
        self.expect("repair_first_even", ([1, 3],), None, "Decide no match only after the loop.")
        self.expect("repair_first_even", ([],), None, "An empty search has no match.")

    def test_05_ask_until_valid(self):
        readings = iter([8, 12, 14])
        self.expect("ask_until_valid", (lambda: next(readings), 10, 15), 12, "Stop at the first in-range value.")
        self.expect("ask_until_valid", (lambda: 10, 10, 15), 10, "Bounds are inclusive.")
        calls = []
        def bad_read():
            calls.append(1)
            return 99
        self.expect("ask_until_valid", (bad_read, 10, 15, 3), None, "Stop after max_attempts.")
        self.assertEqual(len(calls), 3, f"input three invalid readings; expected 3 calls, got {len(calls)}. Hint: Count attempts.")
        self.expect("ask_until_valid", (bad_read, 10, 15, 0), None, "Zero attempts must not read.")
        self.assertEqual(len(calls), 3, f"input zero attempts; expected no extra read, got {len(calls)} total. Hint: Test the guard first.")

    def test_06_last_match_search(self):
        self.expect("last_match_search", ([5, 7, 5], 5), (2, 1), "Start at the last index; the first check wins.")
        self.expect("last_match_search", ([5, 7, 9], 5), (0, 3), "Count each checked item, right to left.")
        self.expect("last_match_search", ([5, 7, 9], 4), (-1, 3), "Count unsuccessful comparisons too.")
        self.expect("last_match_search", ([], 4), (-1, 0), "An empty list makes no comparisons.")

    def test_07_binary_search(self):
        self.expect("binary_search", ([1, 3, 5, 7, 9], 7), (3, 2), "Move low past mid when mid is too small.")
        self.expect("binary_search", ([1, 3, 5, 7, 9], 2), (-1, 3), "Narrow the sorted window each time.")
        self.expect("binary_search", ([], 4), (-1, 0), "An empty window makes no comparisons.")
        self.expect("binary_search", ([4], 4), (0, 1), "Check the one remaining value.")

    def test_08_selection_sort(self):
        values = [3, 1, 2]
        result = self.expect("selection_sort", (values,), [1, 2, 3], "Select the smallest remaining value.")
        self.assertEqual(values, [3, 1, 2], f"input [3, 1, 2]; expected unchanged input, got {values!r}. Hint: Copy before sorting.")
        self.assertIsNot(result, values, "input [3, 1, 2]; expected a new list, got the input list. Hint: Copy before sorting.")
        self.expect("selection_sort", ([-1, 3, -1, 0],), [-1, -1, 0, 3], "Keep duplicates and negative values.")
        self.expect("selection_sort", ([],), [], "An empty list remains empty.")

    def test_09_bubble_sort_passes(self):
        values = [3, 2, 1]
        self.expect("bubble_sort_passes", (values,), [[2, 1, 3], [1, 2, 3]], "Record a copy after every pass.")
        self.assertEqual(values, [3, 2, 1], f"input [3, 2, 1]; expected unchanged input, got {values!r}. Hint: Copy before swapping.")
        self.expect("bubble_sort_passes", ([1, 2, 3],), [[1, 2, 3], [1, 2, 3]], "Keep quiet passes too.")
        self.expect("bubble_sort_passes", ([5],), [], "One item needs no passes.")

    def test_10_duplicate_pair(self):
        self.expect("duplicate_pair", (["a", "b", "a"],), (0, 2), "Compare each item with later positions.")
        self.expect("duplicate_pair", (["a", "b", "a", "b"],), (0, 2), "Return the first pair in scan order.")
        self.expect("duplicate_pair", ([1, 2, 3],), None, "No equal pair means None.")
        self.expect("duplicate_pair", ([],), None, "An empty list has no pair.")

    def test_11_squares_of_odds(self):
        self.expect("squares_of_odds", ([-3, 2, 5],), ([9, 25], [9, 25]), "Both forms keep odd values in order.")
        self.expect("squares_of_odds", ([0, -2, 4],), ([], []), "No odd values makes two empty lists.")
        self.expect("squares_of_odds", ([],), ([], []), "Empty input stays empty.")


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
