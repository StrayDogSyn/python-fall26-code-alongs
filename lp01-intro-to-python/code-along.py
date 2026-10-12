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


if __name__ == "__main__":
    score_text = "72"
    score = int(score_text)
    print(f"{score_text!r} is {type(score_text).__name__}")
    print(f"After conversion, {score} is {type(score).__name__}")
    print(f"Score status: {classify_score(score)}")
    print(f"Final total: {total_points([2, 3, 4])}")
