"""Reference answers for this packet's independent, non-graded problems."""


def badge_line(name, role="guest"):
    """Return a stripped name and role for an event badge."""
    # Normalize the two fields once before formatting the result.
    return f"{name.strip() or 'Unknown'} | {role.strip() or 'guest'}"


def headline(title, marker="*"):
    """Wrap a normalized title in the chosen marker."""
    # Keep the fallback inside the return path so blank input is consistent.
    return f"{marker}{title.strip().upper() or 'UNTITLED'}{marker}"


def format_duration(seconds):
    """Format nonnegative seconds as minutes and seconds."""
    # divmod gives both parts without a floating-point conversion.
    minutes, remainder = divmod(seconds, 60)
    return f"{minutes}:{remainder:02d}"


def repair_price_line(item, cents):
    """Return a line showing a whole-dollar and cent price."""
    # Returning lets the caller decide when and where to display the text.
    return f"{item}: ${cents // 100}.{cents % 100:02d}"


def repair_shadowed_prefix(word, prefix="Note"):
    """Use the prefix supplied by the caller."""
    # A local reassignment would erase a keyword argument.
    return f"{prefix}: {word}"


def card_from_parts(title, place, start, tag="EVENT"):
    """Build a one-line event card."""
    # Parameter names make call sites readable when fields look alike.
    return f"[{tag}] {title} @ {place} ({start})"


def scope_snapshot(label):
    """Show an inner local name without changing the outer name."""
    message = f"outer:{label}"

    def inner():
        message = f"inner:{label}"
        return message

    # The inner assignment creates a different local variable.
    return message, inner(), message


def make_signoff(author):
    """Capture an author for later text formatting."""
    def sign(message):
        return f"{message} / {author}"

    # The returned function remembers the author for this one call.
    return sign


def _agenda_line(time, activity):
    """Format one agenda row."""
    return f"{time} | {activity}"


def render_agenda(entries, heading="Today's plan"):
    """Return a heading and ordered agenda rows."""
    # A small helper keeps the formatting rule in one place.
    return "\n".join([heading] + [_agenda_line(time, activity) for time, activity in entries])


def make_visit_tracker(start=0):
    """Return a counter with independent enclosed state."""
    count = start

    def visit():
        nonlocal count
        count += 1
        return count

    # Each call creates its own count, so trackers do not share visits.
    return visit


def batch_badges(names, role="guest"):
    """Make badges by reusing the single-badge function."""
    # One named helper avoids two different cleanup rules.
    return [badge_line(name, role) for name in names]


if __name__ == "__main__":
    print(badge_line(" Ari ", role="crew"))
    print(format_duration(125))
    print(render_agenda([("9 AM", "Doors")], heading="Monday"))
