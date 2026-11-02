"""LP 02 checks shared by the local runner and future browser runner."""

from itertools import permutations
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest


EXERCISES = (
    "unique_names", "highest_score", "save_names", "load_names",
    "word_counts", "ranked", "group_by_length", "top_n",
    "parse_roster", "meeting_text", "remove_short_words",
)


class LessonChecks(unittest.TestCase):
    target = None

    def call(self, name, args, expected, nudge):
        try:
            return getattr(self.target, name)(*args)
        except NotImplementedError:
            raise
        except Exception as error:
            self.fail(
                f"input {args!r}; expected {expected!r}, got "
                f"{type(error).__name__}: {error}. Hint: {nudge}"
            )

    def expect(self, name, args, expected, nudge):
        actual = self.call(name, args, expected, nudge)
        if type(actual) is not type(expected) or actual != expected:
            self.fail(f"input {args!r}; expected {expected!r}, got {actual!r}. Hint: {nudge}")

    def test_01_unique_names(self):
        self.expect("unique_names", (["Maya", "Luis", "Maya", "Ari"],), ["Maya", "Luis", "Ari"], "Keep first appearance order.")
        self.expect("unique_names", (["Ari", "Luis", "Maya"],), ["Ari", "Luis", "Maya"], "A set alone cannot preserve both orders.")
        self.expect("unique_names", ([],), [], "Empty input stays empty.")
        # A set can accidentally preserve a few input orders under one hash seed.
        for order in permutations(["Maya", "Luis", "Ari", "Zoe", "Noor"]):
            names = list(order)
            self.expect("unique_names", (names,), names, "Keep first appearance order for any input order.")

    def test_02_highest_score(self):
        self.expect("highest_score", ({"Maya": 82, "Ari": 91},), "Ari", "Compare every score.")
        self.expect("highest_score", ({"Maya": 82, "Luis": 82},), "Maya", "Replace only for a strictly higher score.")
        self.expect("highest_score", ({},), None, "No score means no winner.")

    def test_03_save_names(self):
        with TemporaryDirectory() as folder:
            path = Path(folder) / "names.txt"
            for names, expected in ((["Maya", "Luis"], "Maya\nLuis\n"), (["José", "Zoë"], "José\nZoë\n"), ([], "")):
                self.call("save_names", (path, names), expected, "Write UTF-8 and end nonempty text with a newline.")
                try:
                    actual = path.read_text(encoding="utf-8")
                except Exception as error:
                    self.fail(f"input {names!r}; expected {expected!r}, got {type(error).__name__}: {error}. Hint: Write UTF-8 text.")
                if actual != expected:
                    self.fail(f"input {names!r}; expected {expected!r}, got {actual!r}. Hint: Check order and final newline.")

    def test_04_load_names(self):
        with TemporaryDirectory() as folder:
            path = Path(folder) / "names.txt"
            self.expect("load_names", (path,), [], "Return [] when the file is missing.")
            path.write_text(" José \n\n Zoë\n", encoding="utf-8")
            self.expect("load_names", (path,), ["José", "Zoë"], "Strip lines, skip blanks, and read UTF-8.")
            path.write_text("", encoding="utf-8")
            self.expect("load_names", (path,), [], "An empty file has no names.")

    def test_05_word_counts(self):
        self.expect("word_counts", ("Cat cat DOG",), {"cat": 2, "dog": 1}, "Lower each word before counting.")
        self.expect("word_counts", ("",), {}, "No words means an empty dictionary.")
        self.expect("word_counts", ("  one\tTWO one\n",), {"one": 2, "two": 1}, "split handles all whitespace.")

    def test_06_ranked(self):
        self.expect("ranked", ({"Maya": 82, "Ari": 91, "Luis": 82},), [("Ari", 91), ("Luis", 82), ("Maya", 82)], "Sort by descending score, then name.")
        self.expect("ranked", ({},), [], "Empty input makes no ranking.")
        self.expect("ranked", ({"Zoe": 5, "Ana": 5},), [("Ana", 5), ("Zoe", 5)], "Break ties alphabetically.")

    def test_07_group_by_length(self):
        self.expect("group_by_length", (["cat", "to", "dog"],), {3: ["cat", "dog"], 2: ["to"]}, "Append to each length group.")
        self.expect("group_by_length", ([],), {}, "Empty input makes no groups.")
        self.expect("group_by_length", (["a", "b", "it"],), {1: ["a", "b"], 2: ["it"]}, "Keep same-length words in input order.")

    def test_08_top_n(self):
        self.expect("top_n", ([8, 3, 9], 2), [9, 8], "Sort highest first before slicing.")
        self.expect("top_n", ([8, 3, 9], 0), [], "Nonpositive n means no scores.")
        self.expect("top_n", ([8, 8, 3], 5), [8, 8, 3], "Keep ties and handle n larger than the list.")

    def test_09_parse_roster(self):
        self.expect("parse_roster", (["Maya,82", "Ari,91"],), {"Maya": 82, "Ari": 91}, "Split at the comma and convert the score.")
        self.expect("parse_roster", (["", "  ", " Zoë , 70 ", "Zoë,75"],), {"Zoë": 75}, "Skip blanks, strip fields, and let later scores win.")
        self.expect("parse_roster", ([],), {}, "No lines means no roster.")

    def test_10_meeting_text(self):
        self.expect("meeting_text", ((20, 0),), "20:00", "Pad the minute to two digits.")
        self.expect("meeting_text", ((0, 5),), "00:05", "Pad both fields to two digits.")

    def test_11_remove_short_words(self):
        words = ["go", "to", "python", "sun"]
        self.expect("remove_short_words", (words, 3), ["python", "sun"], "Do not remove from a list while visiting it.")
        if words != ["go", "to", "python", "sun"]:
            self.fail(f"input ['go', 'to', 'python', 'sun']; expected unchanged input, got {words!r}. Hint: Build a new list.")
        self.expect("remove_short_words", ([], 3), [], "Empty input stays empty.")
        self.expect("remove_short_words", (["a", "ab"], 2), ["ab"], "Keep words on the boundary.")
