"""Reference answers. Try practice.py first."""

from datetime import date, datetime


def describe_error(error):
    """
    Warm-up: Return the exception class name, not its message. Example: KeyError("oven")
    gives "KeyError". Edge: ValueError("") still gives "ValueError".
    """
    return type(error).__name__


def station_note(notes, station):
    """
    Warm-up: Look up a station in a dictionary. Catch only KeyError and return "No note"
    for a missing key. Example: ({"Grill": "hot"}, "Grill") gives "hot". Edge: an
    existing empty note stays ""; an unhashable key must still raise TypeError.
    """
    try:
        return notes[station]
    except KeyError:
        return "No note"


def portion_size(total, trays):
    """
    Warm-up: Divide total by trays; return None only for ZeroDivisionError. Example: (9,
    2) gives 4.5. Edge: (0, 2) gives 0.0, (9, 0) gives None; ("9", 2) must raise
    TypeError. No input() loop.
    """
    try:
        return total / trays
    except ZeroDivisionError:
        return None


def repair_pick(labels, index):
    """
    Fix it: Return labels[index] only for a nonnegative index within the list. Otherwise
    return None. Example: (["soup", "tart"], 1) gives "tart". Edge: index -1 and an
    empty list give None. Inputs are a list and an integer. Repair the faulty guard: if
    index <= len(labels): return labels[index].
    """
    if 0 <= index < len(labels):
        return labels[index]
    return None


def require_label(text):
    """
    Fix it: Return stripped text, but raise ValueError("label required") for blank text.
    Example: " Grill " gives "Grill". Edge: " \t" must raise. Repair the faulty
    response: if not text: return "unknown". The caller supplies a string.
    """
    label = text.strip()
    if not label:
        raise ValueError("label required")
    return label


def read_optional(path):
    """
    Build: Read all UTF-8 text with with; return "" only when the file is missing.
    Example: a file containing "menu\n" gives "menu\n". Edge: a missing path gives ""; a
    directory or invalid UTF-8 must still raise its own error.
    """
    try:
        with open(path, encoding="utf-8") as handle:
            return handle.read()
    except FileNotFoundError:
        return ""


def parse_service_date(text):
    """
    Build: Parse YYYY-MM-DD with datetime.strptime and return a date object. Chain
    ValueError("invalid service date") from the original ValueError when parsing fails.
    Example: "2028-02-29" is a valid leap date. Edge: "2026-02-29" raises; wrong
    argument types must propagate TypeError.
    """
    try:
        return datetime.strptime(text, "%Y-%m-%d").date()
    except ValueError as error:
        raise ValueError("invalid service date") from error


def run_with_cleanup(operation, cleanup):
    """
    Build: Call operation() and return its result; always call cleanup() exactly once
    afterward. Do not suppress an operation exception. cleanup itself is assumed not to
    raise. Example: an operation returning 7 gives 7 after cleanup. Edge: a failing
    operation still cleans up.
    """
    try:
        return operation()
    finally:
        cleanup()


def logged_lookup(notes, station, logger):
    """
    Build: Return a stored note. On KeyError, call logger.warning("Missing station: %s",
    station) once and return None. Example: ({"Grill": "ready"}, "Grill", logger) gives
    "ready" with no log. Edge: missing station logs; a TypeError propagates without a
    warning.
    """
    try:
        note = notes[station]
    except KeyError:
        logger.warning("Missing station: %s", station)
        return None
    else:
        return note


def collect_dates(texts):
    """
    Build: For strings in texts, return (valid, rejected). valid contains date objects
    in input order; rejected contains one-based positions of invalid calendar strings.
    Catch only ValueError per item. Example: ["2026-11-23", "oops"] gives
    ([date(2026,11,23)], [2]). Edge: [] gives ([], []); None in the list must raise
    TypeError. Do not alter the input.
    """
    valid, rejected = [], []
    for position, text in enumerate(texts, start=1):
        try:
            parsed = datetime.strptime(text, "%Y-%m-%d").date()
        except ValueError:
            rejected.append(position)
        else:
            valid.append(parsed)
    return valid, rejected


def balanced_brackets(text):
    """
    Extend: For bracket-only text, return whether (), [] and {} close in reverse opening
    order. Example: "{[]}" gives True, "([)]" gives False. Edge: "]" and "((" give
    False; "" gives True as a local extension beyond LeetCode's nonempty input contract.
    Other characters are outside this function's contract.
    """
    pairs = {"(": ")", "[": "]", "{": "}"}
    stack = []
    for char in text:
        if char in pairs:
            stack.append(pairs[char])
        elif not stack or stack.pop() != char:
            return False
    return not stack


