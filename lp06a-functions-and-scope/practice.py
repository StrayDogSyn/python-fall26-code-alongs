"""Week 6 practice. Run python lp06a-functions-and-scope/check.py."""


def badge_line(name, role="guest"):
    """[Warm-up] Return a name and role for an event badge.

    Strip both fields. A blank name becomes 'Unknown'; a blank role becomes
    'guest'. Example: (' Ari ', 'crew') gives 'Ari | crew'.
    Edge: ('   ',) gives 'Unknown | guest'.
    """
    raise NotImplementedError("TODO")


def headline(title, marker="*"):
    """[Warm-up] Wrap an uppercase title in a marker on each side.

    Strip the title; a blank title becomes 'UNTITLED'.
    Example: (' orbit ', '#') gives '#ORBIT#'.
    Edge: ('',) gives '*UNTITLED*'.
    """
    raise NotImplementedError("TODO")


def format_duration(seconds):
    """[Warm-up] Return nonnegative seconds as minutes:two-digit seconds.

    Example: 125 gives '2:05'. Edge: 0 gives '0:00'.
    The caller, not this function, decides whether to print the result.
    """
    raise NotImplementedError("TODO")


def repair_price_line(item, cents):
    """[Fix it] Return a price line instead of printing or dropping it.

    Example: ('Pencil', 125) gives 'Pencil: $1.25'.
    Edge: ('Free', 0) gives 'Free: $0.00'. Cents are nonnegative.
    """
    raise NotImplementedError("TODO")
    line = f"{item}: ${cents // 100}.{cents % 100:02d}"
    print(line)  # Bug: the caller needs the returned text, not a side effect.


def repair_shadowed_prefix(word, prefix="Note"):
    """[Fix it] Respect the caller's prefix instead of shadowing it.

    Example: ('Doors open', 'Alert') gives 'Alert: Doors open'.
    Edge: ('',) gives 'Note: '.
    """
    raise NotImplementedError("TODO")
    prefix = "Note"  # Bug: this assignment discards a custom argument.
    return f"{prefix}: {word}"


def card_from_parts(title, place, start, tag="EVENT"):
    """[Build] Return a one-line event card from four named parts.

    Example: ('Open Mic', 'Hall', '7 PM') gives
    '[EVENT] Open Mic @ Hall (7 PM)'.
    Edge: an empty place stays empty: '[EVENT] Open Mic @  (7 PM)'.
    """
    raise NotImplementedError("TODO")


def scope_snapshot(label):
    """[Build] Return values before, inside, and after a nested scope.

    Use a nested function whose local `message` shadows the outer `message`.
    Example: 'map' gives ('outer:map', 'inner:map', 'outer:map').
    Edge: '' gives ('outer:', 'inner:', 'outer:').
    """
    raise NotImplementedError("TODO")


def make_signoff(author):
    """[Build] Return a function that appends an author's signoff.

    Example: make_signoff('Ari')('Ready') gives 'Ready / Ari'.
    Edge: an empty message gives ' / Ari'. Separate authors stay separate.
    """
    raise NotImplementedError("TODO")


def render_agenda(entries, heading="Today's plan"):
    """[Build] Refactor agenda formatting into a returned text block.

    Each entry is (time, activity). Keep their input order and render one
    'time | activity' line under the heading.
    Example: ([('9 AM', 'Doors')], 'Monday') gives 'Monday\\n9 AM | Doors'.
    Edge: [] gives only the heading. Leave entries unchanged.
    """
    raise NotImplementedError("TODO")


def make_visit_tracker(start=0):
    """[Extend] Return a function that counts visits from a local start.

    Each call increases that tracker's count and returns the new count.
    Example: a tracker starting at 2 returns 3, then 4.
    Edge: two default trackers both start with 1 on their first call.
    """
    raise NotImplementedError("TODO")


def batch_badges(names, role="guest"):
    """[Build] Return badge_line results for names in their input order.

    Example: ([' Ari ', 'Bo'], 'crew') gives
    ['Ari | crew', 'Bo | crew']. Edge: [] gives [].
    Leave names unchanged; use badge_line rather than duplicate its rules.
    """
    raise NotImplementedError("TODO")


if __name__ == "__main__":
    from check import main

    raise SystemExit(main())
