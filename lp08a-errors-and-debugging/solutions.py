"""Week 8 reference answers. Try practice.py first, then compare here."""

import math


def parse_temp(text):
    """[Warm-up] Return text as a finite float, or None when it is not a usable number."""
    try:
        value = float(text)
    except ValueError:
        return None
    # float("nan") and float("inf") do not raise, so ask one more question.
    return value if math.isfinite(value) else None


def average_temp(readings):
    """[Warm-up] Return the average rounded to one decimal, or None for no readings."""
    try:
        return round(sum(readings) / len(readings), 1)
    except ZeroDivisionError:
        return None


def ticket_field(fields, index, default=""):
    """[Warm-up] Return fields[index], or default when there is no such field."""
    if index < 0:
        # A negative index would silently count from the end. That is a wrong
        # answer, not an error, so a guard clause has to stop it.
        return default
    try:
        return fields[index]
    except IndexError:
        return default


def repair_parse_qty(text):
    """[Fix it] Return text as an int; text that is not a whole number gives 0."""
    try:
        return int(text)
    except ValueError:  # catch only the failure you expect
        return 0


def repair_total_weight(weights):
    """[Fix it] Total the weights that parse as numbers, skipping the rest."""
    total = 0.0
    for text in weights:
        try:  # inside the loop, so one bad entry only skips itself
            total += float(text)
        except ValueError:
            continue
    return total


def _number(value):
    """Return value as a finite float, or None. None itself is an expected input here."""
    try:
        number = float(value)
    except (ValueError, TypeError):
        return None
    return number if math.isfinite(number) else None


def delivery_problems(record):
    """[Build] List what is wrong with a delivery record; [] means it is fine."""
    problems = []
    if not (record.get("item") or "").strip():
        problems.append("missing item")
    weight = _number(record.get("weight"))
    if weight is None or weight <= 0:
        problems.append("bad weight")
    temp = _number(record.get("temp"))
    if temp is None:
        problems.append("bad temp")
    elif temp > 41.0:
        problems.append("too warm")
    return problems


def read_cooler_log(path):
    """[Build] Read 'time | temp' lines into readings plus the numbers of the bad lines."""
    try:
        with open(path, encoding="utf-8") as handle:
            lines = handle.readlines()
    except FileNotFoundError:  # the try covers only the open and read
        return None
    readings = []
    bad_lines = []
    for number, raw in enumerate(lines, start=1):
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        parts = [part.strip() for part in line.split("|")]
        value = parse_temp(parts[1]) if len(parts) == 2 else None
        if value is None:
            bad_lines.append(number)
        else:
            readings.append(value)
    return {"readings": readings, "bad_lines": bad_lines}


def log_reading(logger, reading, limit=41.0):
    """[Build] Log one cooler reading at the right level; return True when it is fine."""
    if reading is None:
        logger.error("cooler reading missing")
        return False
    if reading > limit:
        logger.warning("cooler warm: %.1f F (limit %.1f)", reading, limit)
        return False
    logger.info("cooler ok: %.1f F", reading)
    return True


def parse_ticket_strict(line):
    """[Build] Parse 'ticket | table | dish | qty | price' or raise ValueError naming the problem."""
    parts = [part.strip() for part in line.split("|")]
    if len(parts) != 5:
        raise ValueError(f"expected 5 fields, got {len(parts)}")
    ticket_text, table_text, dish, qty_text, price_text = parts
    numbers = {}
    for name, text in (("ticket", ticket_text), ("table", table_text), ("qty", qty_text)):
        try:
            numbers[name] = int(text)
        except ValueError:
            raise ValueError(f"{name} must be a whole number, got {text!r}") from None
    if not dish:
        raise ValueError("dish is empty")
    if numbers["qty"] < 1:
        raise ValueError("qty must be at least 1")
    price = _number(price_text)
    if price is None:
        raise ValueError(f"price must be a number, got {price_text!r}")
    if price < 0:
        raise ValueError("price cannot be negative")
    return {
        "ticket": numbers["ticket"], "table": numbers["table"], "dish": dish,
        "qty": numbers["qty"], "price": price,
    }


def collect_tickets(lines):
    """[Build] Parse every non-blank line; return (good tickets, error strings)."""
    good = []
    errors = []
    for number, line in enumerate(lines, start=1):
        if not line.strip():
            continue
        try:
            good.append(parse_ticket_strict(line))
        except ValueError as error:
            errors.append(f"line {number}: {error}")
    return good, errors


def call_with_retries(action, attempts):
    """[Extend] Call action() up to attempts times, retrying only on ConnectionError."""
    if attempts < 1:
        raise ValueError("attempts must be at least 1")
    for attempt in range(1, attempts + 1):
        try:
            return action()
        except ConnectionError:
            if attempt == attempts:
                raise  # out of tries: pass the original error along unchanged


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
