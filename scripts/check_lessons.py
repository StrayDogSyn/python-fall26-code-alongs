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
        if packet in ("lp01-intro-to-python", "lp02-data-structures"):
            names = (
                "classify_score", "count_passing", "parse_score", "average",
                "lowest_and_highest", "countdown", "numbered_lines", "clean_name",
                "grade_letter", "total_points",
            ) if packet == "lp01-intro-to-python" else (
                "unique_names", "highest_score", "save_names", "load_names",
                "word_counts", "ranked", "group_by_length", "top_n",
                "parse_roster", "meeting_text", "remove_short_words",
            )
            reference = run(folder / "check.py", "--solutions")
            expected_pass = [f"PASS {name}" for name in names]
            if reference.returncode or reference.stdout.splitlines() != expected_pass:
                failures.append(f"{packet} reference check failed:\n{reference.stdout}{reference.stderr}")
            else:
                print(f"PASS {packet}/solutions.py ({len(names)} exercises)")
            starter = run(folder / "check.py")
            lines = starter.stdout.splitlines()
            if starter.returncode != 1 or len(lines) != len(names) or any(
                not line.startswith(f"NOT STARTED {name}:")
                for line, name in zip(lines, names)
            ):
                failures.append(f"{packet} starter check failed:\n{starter.stdout}{starter.stderr}")
            else:
                print(f"PASS {packet}/practice.py ({len(names)} expected TODOs)")
            continue
        for name in ("solutions.py",):
            result = run(folder / name)
            if result.returncode:
                failures.append(f"{packet}/{name}: exited {result.returncode}\n{result.stderr}")
            else:
                print(f"PASS {packet}/{name}")

        starter = run(folder / "practice.py")
        if starter.returncode == 0 or "NotImplementedError" not in starter.stderr:
            failures.append(
                f"{packet}/practice.py: expected a TODO NotImplementedError, "
                f"got exit {starter.returncode}\n{starter.stderr}"
            )
        else:
            print(f"PASS {packet}/practice.py (expected TODO)")

    if failures:
        print("\n".join(failures), file=sys.stderr)
        return 1
    print("All lesson checks passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
