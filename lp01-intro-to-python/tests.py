"""LP 01 checks shared by the local runner and future browser runner."""

import unittest


EXERCISES = (
    "classify_score", "count_passing", "parse_score", "average",
    "lowest_and_highest", "countdown", "numbered_lines", "clean_name",
    "grade_letter", "total_points",
)


class LessonChecks(unittest.TestCase):
    target = None

    def expect(self, name, args, expected, nudge):
        try:
            actual = getattr(self.target, name)(*args)
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(
                f"input {args!r}; expected {expected!r}, got "
                f"{type(error).__name__}: {error}. Hint: {nudge}"
            )
        if type(actual) is not type(expected) or actual != expected:
            self.fail(
                f"input {args!r}; expected {expected!r}, got {actual!r}. Hint: {nudge}"
            )

    def test_01_classify_score(self):
        self.expect("classify_score", (72,), "ready", "Check the cutoff with >=.")
        self.expect("classify_score", (70,), "ready", "70 belongs in ready.")
        self.expect("classify_score", (69,), "keep practicing", "Return the full label.")

    def test_02_count_passing(self):
        self.expect("count_passing", ([70, 62, 91, 69],), 2, "Count both 70 and 91.")
        self.expect("count_passing", ([],), 0, "Start the counter at zero.")
        self.expect("count_passing", ([69, 70, 70],), 2, "Visit every item, including repeats.")

    def test_03_parse_score(self):
        self.expect("parse_score", (" 42 ",), 42, "Strip the text before conversion.")
        self.expect("parse_score", ("oops",), None, "Catch ValueError from int().")
        self.expect("parse_score", ("   ",), None, "Blank text is not an integer.")
        self.expect("parse_score", ("3.5",), None, "Only whole-number text is valid.")
        self.expect("parse_score", ("-3",), -3, "int() also handles negative text.")

    def test_04_average(self):
        self.expect("average", ([1, 2, 2],), 1.7, "Divide sum by len, then round to 1 place.")
        self.expect("average", ([],), 0.0, "Check empty input before division.")
        self.expect("average", ([2, 4],), 3.0, "Return a float with one decimal.")

    def test_05_lowest_and_highest(self):
        self.expect("lowest_and_highest", ([8, 2, 5],), (2, 8), "Put min before max.")
        self.expect("lowest_and_highest", ([],), None, "Check empty input first.")
        self.expect("lowest_and_highest", ([4],), (4, 4), "One item is both ends.")

    def test_06_countdown(self):
        self.expect("countdown", (3,), [3, 2, 1], "Decrease the counter after appending.")
        self.expect("countdown", (0,), [], "Stop before zero.")
        self.expect("countdown", (-2,), [], "Only positive values go in the list.")

    def test_07_numbered_lines(self):
        self.expect("numbered_lines", (["Maya", "Luis"],), ["1. Maya", "2. Luis"], "Start at 1.")
        self.expect("numbered_lines", ([],), [], "Empty input makes no lines.")
        self.expect("numbered_lines", (["Zoë"],), ["1. Zoë"], "Keep the name unchanged.")

    def test_08_clean_name(self):
        self.expect("clean_name", ("  mAya   lee ",), "Maya Lee", "Split and rejoin the words.")
        self.expect("clean_name", ("   ",), "", "Whitespace alone becomes empty.")
        self.expect("clean_name", ("aRI",), "Ari", "Use title case.")

    def test_09_grade_letter(self):
        for score, letter in ((95, "A"), (90, "A"), (80, "B"), (70, "C"), (60, "D"), (59, "F")):
            self.expect("grade_letter", (score,), letter, "Check higher cutoffs first, including edges.")

    def test_10_total_points(self):
        self.expect("total_points", ([2, 3, 4],), 9, "Return after the loop.")
        self.expect("total_points", ([],), 0, "Start from zero.")
        self.expect("total_points", ([0, 5],), 5, "Add values, not list length.")
