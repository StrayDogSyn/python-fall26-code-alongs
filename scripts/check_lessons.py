"""Run the lesson references and check that student starters still have TODOs.

Run from any directory: python scripts/check_lessons.py
"""

from pathlib import Path
import subprocess
import sys


ROOT = Path(__file__).resolve().parents[1]
PACKETS = (
    "lp01-intro-to-python",
    "lp02-data-structures",
    "lp03-more-python-skills",
)


def run(path: Path) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        [sys.executable, str(path)],
        cwd=ROOT,
        capture_output=True,
        text=True,
        check=False,
    )


def main() -> int:
    failures = []
    for packet in PACKETS:
        folder = ROOT / packet
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
