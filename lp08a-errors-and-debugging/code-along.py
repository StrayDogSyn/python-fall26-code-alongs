"""Week 8 live script. Run from the repository root with python.

Every file path is built from this script's own folder, so the script works
no matter which folder you start it from. Nothing here needs a package.
"""

import csv
import io
import logging
import math
import os
import sys
import tempfile
import venv

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "data")


# === 1. Two kinds of error: the recipe is unreadable, or the kitchen fights back ===
# A syntax error stops Python before anything runs. A runtime error shows up
# mid-service, on one specific line, with one specific input.
try:
    compile("print('walk-in is open'", "<kitchen>", "exec")  # missing closing paren
except SyntaxError as error:
    print("Syntax error caught before running:", type(error).__name__)

samples = {
    "ValueError": lambda: int("twelve"),
    "TypeError": lambda: "4" + 6,
    "KeyError": lambda: {"item": "Corn"}["price"],
    "IndexError": lambda: ["Corn", "Ramen"][5],
    "FileNotFoundError": lambda: open(os.path.join(DATA, "no_such_file.txt")),
    "ZeroDivisionError": lambda: 10 / 0,
}
seen = []
for action in samples.values():
    try:
        action()
    except Exception as error:
        seen.append(type(error).__name__)
print("Runtime errors seen:", seen)
print("Every label matched its error:", seen == list(samples))


# === 2. try, except, else, finally: four rooms, one hallway ===
def read_temp_with_trail(text):
    trail = ["try"]
    try:
        value = float(text)
    except ValueError:
        trail.append("except")
        value = None
    else:
        trail.append("else")  # runs only when the try block raised nothing
    finally:
        trail.append("finally")  # runs every time, error or not
    return value, trail


print("Good text:", read_temp_with_trail("38.5"))
print("Bad text:", read_temp_with_trail("n/a"))


# === 3. Catch the failure you expect, not every failure ===
def sloppy_qty(text):
    try:
        return int(txt)  # typo: the name is txt, not text
    except Exception:  # catches the NameError too, so the typo hides
        return 0


def careful_qty(text):
    try:
        return int(text)
    except ValueError:
        return 0


print("Sloppy qty for '12':", sloppy_qty("12"), "(should be 12)")
print("Careful qty for '12':", careful_qty("12"))
try:
    careful_qty(None)
except TypeError as error:
    print("Careful qty still complains about None:", type(error).__name__)


# === 4. as e: the message is data you can use ===
try:
    int("12.5")
except ValueError as error:
    print("Message:", error)
    print("Type:", type(error).__name__)


# === 5. raise: when YOU find the problem, say so loudly ===
def pick_portion(guests):
    if guests < 1:
        raise ValueError(f"guests must be at least 1, got {guests}")
    return 120 * guests


try:
    pick_portion(0)
except ValueError as error:
    print("Raised on purpose:", error)


def keep_the_evidence(text):
    try:
        return int(text)
    except ValueError:
        print("  (logging a note, then passing the same error along)")
        raise  # a bare raise re-raises the original error, traceback intact


try:
    keep_the_evidence("oops")
except ValueError as error:
    print("Caller still sees:", error)


# === 6. Defensive programming: guard clauses and the quiet wrong answer ===
def label_nested(reading):
    if reading is not None:
        if reading > 0:
            if reading <= 41:
                return "ok"
            else:
                return "warm"
        else:
            return "check sensor"
    else:
        return "missing"


def label_guarded(reading):
    if reading is None:
        return "missing"
    if reading <= 0:
        return "check sensor"
    if reading > 41:
        return "warm"
    return "ok"


readings = [38.0, 45.0, None, -3.0]
print("Nested labels: ", [label_nested(r) for r in readings])
print("Guarded labels:", [label_guarded(r) for r in readings])
print("Same answers:", [label_nested(r) for r in readings] == [label_guarded(r) for r in readings])

items = ["Corn", "Ramen", "Fries"]
print("items[-1] is", items[-1], "(-1 counts from the end; guard negatives when your contract forbids them)")

menu = {"Ramen": 14.5}
print("Look before you leap:", menu["Ramen"] if "Ramen" in menu else None)
try:
    dish_price = menu["Pizza"]
except KeyError:
    dish_price = "not on the menu"
print("Ask forgiveness:", dish_price)
print("Safe lookup with a default:", menu.get("Pizza", "not on the menu"))


# === 7. What csv.DictReader does with a ragged row ===
# It does NOT raise. It fills and files things in ways you must check for.
ragged = "name,qty,unit\nCorn,18,ears\nButter,3\nSalt,1,lbs,extra\n"
for number, row in enumerate(csv.DictReader(io.StringIO(ragged)), start=1):
    print(f"Row {number}:", row)
print("A short row has None where the value should be, so int(None) raises TypeError.")
print("A long row stores the extras as a list under the key None.")


# === 8. Fail gracefully: a safe default, and a record of what went wrong ===
logger = logging.getLogger("kitchen")
logger.setLevel(logging.DEBUG)
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(logging.Formatter("%(levelname)s: %(message)s"))
logger.addHandler(handler)
logger.propagate = False

handler.setLevel(logging.INFO)  # DEBUG is hidden at this setting
logger.debug("walk-in door opened")
logger.info("cooler check started")
logger.warning("reading 45.0 is above 41")
logger.error("sensor 3 did not answer")


def average_log_temp(path):
    """Read the cooler log and average it. A missing log gives None; other file errors propagate."""
    try:
        with open(path, encoding="utf-8") as handle:
            lines = handle.readlines()
    except FileNotFoundError:
        logger.error("log not found: %s", os.path.basename(path))
        return None
    values = []
    for number, raw in enumerate(lines, start=1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = [part.strip() for part in line.split("|")]
        # This demo only looks at the second part. Your read_cooler_log exercise is
        # stricter: a line with extra parts is a bad line there.
        try:
            value = float(parts[1])
            if not math.isfinite(value):
                raise ValueError("not a finite number")
            values.append(value)
        except (IndexError, ValueError) as error:
            logger.warning("line %d skipped: %s", number, error)
    return round(sum(values) / len(values), 1) if values else None


print("Average:", average_log_temp(os.path.join(DATA, "cooler_log.txt")))
print("Missing log gives:", average_log_temp(os.path.join(DATA, "no_such_log.txt")))


# === 9. assert is a development tripwire, not input validation ===
def split_plates(total, guests):
    assert guests > 0, "guests must be positive"  # for the programmer, not for the user
    return total // guests


try:
    split_plates(10, 0)
except AssertionError as error:
    print("Assertion tripped:", error)
print("python -O removes assert lines, so never rely on one to check user input.")


# === 10. pip and virtual environments, in one screen ===
# pip installs packages from PyPI. Installing into your one global Python means
# every project shares one pile, and two projects can need different versions.
# A virtual environment is a private folder with its own Python and its own pile.
#
#   python -m venv .venv                  create it (once per project)
#   .venv\Scripts\Activate.ps1           activate in Windows PowerShell
#   source .venv/bin/activate             activate on macOS or Linux
#   pip install requests                  install into the active environment
#   pip freeze > requirements.txt         write down exactly what is installed
#   pip install -r requirements.txt       rebuild the same pile somewhere else
inside_venv = sys.prefix != sys.base_prefix
print("Inside a virtual environment:", inside_venv)
with tempfile.TemporaryDirectory() as folder:
    venv.EnvBuilder(with_pip=False).create(os.path.join(folder, ".venv"))
    print("A venv is just a folder with a config file:", "pyvenv.cfg" in os.listdir(os.path.join(folder, ".venv")))
print("Never commit .venv itself. Commit requirements.txt, and list .venv in .gitignore.")
