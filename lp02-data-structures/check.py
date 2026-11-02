"""Run LP 02 checks: python lp02-data-structures/check.py from the repository root."""

import argparse
import importlib.util
from pathlib import Path
import unittest

from tests import EXERCISES, LessonChecks


HERE = Path(__file__).resolve().parent


def load_module(path):
    spec = importlib.util.spec_from_file_location("lp02_work", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


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
    group.add_argument("--solutions", action="store_true", help="check the reference solutions")
    group.add_argument("--module", type=Path, help="check another module path")
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
