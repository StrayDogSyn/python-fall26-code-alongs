"""LP 01 reference solutions. Try practice.py before reading these."""


def classify_score(score):
    # The boundary belongs in the ready branch.
    if score >= 70:
        return "ready"
    return "keep practicing"


def count_passing(scores):
    # Return after the loop so every score is visited.
    count = 0
    for score in scores:
        if score >= 70:
            count += 1
    return count


def parse_score(text):
    # Catch only the conversion error, not every possible programming error.
    try:
        return int(text.strip())
    except ValueError:
        return None


def average(scores):
    # Empty input has no divisor; handle it before the calculation.
    if not scores:
        return 0.0
    return round(sum(scores) / len(scores), 1)


def lowest_and_highest(scores):
    # min and max need at least one item.
    if not scores:
        return None
    return min(scores), max(scores)


def countdown(n):
    # Decrease the changing condition so the while loop stops.
    result = []
    while n > 0:
        result.append(n)
        n -= 1
    return result


def numbered_lines(names):
    # Starting enumerate at 1 matches how people number lines.
    return [f"{number}. {name}" for number, name in enumerate(names, start=1)]


def clean_name(text):
    # split removes extra whitespace; join restores one space per gap.
    return " ".join(text.split()).title()


def grade_letter(score):
    # Highest first prevents a 90 from being captured by a lower cutoff.
    if score >= 90:
        return "A"
    if score >= 80:
        return "B"
    if score >= 70:
        return "C"
    if score >= 60:
        return "D"
    return "F"


def total_points(points):
    # The return belongs after the loop, including for empty input.
    total = 0
    for point in points:
        total += point
    return total


if __name__ == "__main__":
    from check import main

    raise SystemExit(main(["--solutions"]))
