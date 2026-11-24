"""I Do -> We Do -> You Do: run safely from any working directory."""
import logging
from solutions import (station_note, logged_lookup, run_with_cleanup,
                       collect_dates, balanced_brackets)


def main():
    # I Do: catch an expected failure; inspect the class and message.
    try:
        print({}["Grill"])
    except KeyError as error:
        print("Error:", type(error).__name__)
    print("Recovery:", station_note({}, "Grill"))
    # A named logger; configuration belongs at the program entry point.
    logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
    logger = logging.getLogger("week08.kitchen")
    print("Success:", logged_lookup({"Grill": "ready"}, "Grill", logger))
    logged_lookup({}, "Pastry", logger)
    # We Do: predict cleanup even when an exception leaves operation().
    def offline():
        raise RuntimeError("oven offline")
    try:
        run_with_cleanup(offline, lambda: print("Cleanup: done"))
    except RuntimeError as error:
        print("Caller recovered:", error)
    # You Do: insert a bad date between two valid dates and trace the loop.
    valid, rejected = collect_dates(["2026-11-23", "bad", "2028-02-29"])
    print(f"Dates: {len(valid)} accepted, rejected rows {rejected}")
    print("Brackets:", balanced_brackets("{[]}"), balanced_brackets("]"))


if __name__ == "__main__":
    main()
