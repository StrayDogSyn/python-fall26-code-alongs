"""LP 01 instructor code-along. Run from the repository root or this folder."""


def classify_score(score):
    """Return a practice label for a numeric score."""
    if score >= 70:
        return "ready"
    return "keep practicing"


def total_points(points):
    """Add all the values in a list while making the loop easy to trace."""
    total = 0
    for point in points:
        total = total + point
        print(f"Added {point}; total is now {total}")
    return total


def ask_age():
    """Optional live demo: ask again until the learner enters an integer."""
    while True:
        typed = input("Age in whole years: ").strip()
        try:
            return int(typed)
        except ValueError:
            print("Use a whole number, then try again.")


def weather_label(temperature):
    """Show why the order of if/elif cutoffs matters."""
    if temperature >= 30:
        return "hot"
    elif temperature >= 15:
        return "mild"
    else:
        return "cold"


def show_more_patterns():
    """Model the tools used later in practice without solving the tasks."""
    raw = "  mAya,  LUIS "
    names = [part.strip().title() for part in raw.split(",")]
    for number, name in enumerate(names, start=1):
        print(f"Guest {number}: {name}")
    readings = [2, 3, 4]
    print(f"Range: {min(readings)} to {max(readings)}")
    print(f"Mean: {round(sum(readings) / len(readings), 1)}")
    print(f"Weather at 20: {weather_label(20)}")
    steps = 2
    while steps > 0:
        print(f"Steps left: {steps}")
        steps -= 1


if __name__ == "__main__":
    score_text = "72"
    score = int(score_text)
    print(f"{score_text!r} is {type(score_text).__name__}")
    print(f"After conversion, {score} is {type(score).__name__}")
    print(f"Score status: {classify_score(score)}")
    show_more_patterns()
    print(f"Final total: {total_points([2, 3, 4])}")
