"""Run the lesson references and check that student starters still have TODOs.

Run from any directory: python scripts/check_lessons.py
"""

from contextlib import redirect_stdout
from io import StringIO
from pathlib import Path
import runpy
import subprocess
import sys
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
PACKETS = (
    "lp01-intro-to-python",
    "lp02-data-structures",
    "lp03-more-python-skills",
    "lp03a-iteration-and-algorithms",
)


def run(path: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(path), *args],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )


def main() -> int:
    failures = []
    for packet in PACKETS:
        folder = ROOT / packet
        if packet == "lp01-intro-to-python":
            demo = run(folder / "code-along.py")
            if demo.returncode or "Score status: ready" not in demo.stdout or "Final total: 9" not in demo.stdout:
                failures.append(f"{packet} code-along output changed:\n{demo.stdout}{demo.stderr}")
            else:
                print(f"PASS {packet}/code-along.py (label and total)")
            try:
                ask_age = runpy.run_path(str(folder / "code-along.py"))["ask_age"]
                with patch("builtins.input", side_effect=["oops", " 20 "]), redirect_stdout(StringIO()):
                    age = ask_age()
                if age != 20:
                    failures.append(f"{packet} ask_age returned {age!r}, expected 20")
                else:
                    print(f"PASS {packet}/code-along.py (scripted input retry)")
            except Exception as error:
                failures.append(f"{packet} ask_age failed: {type(error).__name__}: {error}")
        if packet == "lp02-data-structures":
            demo = run(folder / "code-along.py")
            if demo.returncode or "First sign-ins: ['Maya', 'Luis', 'Ari']" not in demo.stdout or "Meeting: 20:00" not in demo.stdout:
                failures.append(f"{packet} code-along output changed:\n{demo.stdout}{demo.stderr}")
            else:
                print(f"PASS {packet}/code-along.py (roster and meeting)")
        if packet == "lp03-more-python-skills":
            demo = run(folder / "code-along.py")
            expected = (
                "'Maya': 78.0", "Passing: ['Maya']", "Latest marks:",
                "Stack top: decorator, size: 3", "Turns: 1, 2",
                "First label stays: PYTHON, PYTHON", "Add then double: 14",
            )
            if demo.returncode or any(item not in demo.stdout for item in expected):
                failures.append(f"{packet} code-along output changed:\n{demo.stdout}{demo.stderr}")
            else:
                print(f"PASS {packet}/code-along.py (classes, comprehensions, wrappers, closures)")
        if packet == "lp03a-iteration-and-algorithms":
            demo = run(folder / "code-along.py")
            expected = (
                "count=4, total=22", "range(2, 10, 3)=[2, 5, 8]",
                "linear index=3, comparisons=4", "binary comparisons=2",
                "loop=[7, 9], comprehension=[7, 9]",
            )
            if demo.returncode or any(piece not in demo.stdout for piece in expected):
                failures.append(f"{packet} code-along output changed:\n{demo.stdout}{demo.stderr}")
            else:
                print(f"PASS {packet}/code-along.py (loop and algorithm traces)")
        names = (
                "classify_score", "count_passing", "parse_score", "average",
                "lowest_and_highest", "countdown", "numbered_lines", "clean_name",
                "grade_letter", "total_points",
        ) if packet == "lp01-intro-to-python" else (
                "unique_names", "highest_score", "save_names", "load_names",
                "word_counts", "ranked", "group_by_length", "top_n",
                "parse_roster", "meeting_text", "remove_short_words",
        ) if packet == "lp02-data-structures" else (
            "Tally", "long_words", "make_multiplier", "count_calls", "make_counter",
            "once", "Stack", "group_scores", "compose", "Gradebook",
        ) if packet == "lp03-more-python-skills" else (
            "total_of_evens", "count_up_by", "repair_average", "repair_first_even",
            "ask_until_valid", "linear_search", "binary_search", "selection_sort",
            "bubble_sort_passes", "duplicate_pair", "squares_of_odds",
        )
        reference = run(folder / "check.py", "--solutions")
        expected_pass = [f"PASS {name}" for name in names]
        if reference.returncode or reference.stdout.splitlines() != expected_pass:
            failures.append(f"{packet} reference check failed:\n{reference.stdout}{reference.stderr}")
        else:
            print(f"PASS {packet}/solutions.py ({len(names)} exercises)")
        starter = run(folder / "practice.py")
        lines = starter.stdout.splitlines()
        if starter.returncode != 1 or len(lines) != len(names) or any(
            not line.startswith(f"NOT STARTED {name}:")
            for line, name in zip(lines, names)
        ):
            failures.append(f"{packet} starter check failed:\n{starter.stdout}{starter.stderr}")
        else:
            print(f"PASS {packet}/practice.py ({len(names)} expected TODOs)")

    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    print("All lesson checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
