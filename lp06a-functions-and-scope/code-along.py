"""Week 6 live script. Run from the repository root with python."""


# === 1. A function accepts information and returns a result ===
def shelf_tag(title, shelf):
    """Return a short tag for a library book."""
    return f"{shelf}: {title}"


print("Tag:", shelf_tag("Night Sky", "Science"))


# === 2. A default is chosen only when the caller omits an argument ===
def postcard(city, stamp="standard"):
    """Describe the postage for one postcard."""
    return f"{city} / {stamp}"


print("Default:", postcard("Detroit"))
print("Keyword:", postcard("Detroit", stamp="express"))


# === 3. Printing is a side effect; return supplies the caller ===
def announce_tag(title):
    """Print a tag and therefore return None."""
    print("Announced:", title)


result = announce_tag("Field Guide")
print("Printed function returned:", result)


# === 4. Local scope, global reading, and shadowing ===
theme = "sky"


def show_theme(place):
    """Read the module theme, then shadow it locally."""
    before = theme

    def card_theme():
        theme = f"{place}:local"  # This name belongs to card_theme only.
        return theme

    return before, card_theme()


print("Scope:", show_theme("hall"), "global:", theme)


# === 5. Avoid a shared mutable default ===
def add_stop(stop, stops=None):
    """Return a fresh list with one more route stop."""
    if stops is None:
        stops = []
    return [*stops, stop]


print("Fresh defaults:", add_stop("A"), add_stop("B"))


# === 6. Refactor a text task into named pieces ===
def agenda_line(time, activity):
    """Return one event line."""
    return f"{time} | {activity}"


def agenda_text(heading, entries):
    """Return a heading and one line per event."""
    lines = [heading]
    for time, activity in entries:
        lines.append(agenda_line(time, activity))
    return "\n".join(lines)


print("Agenda:\n" + agenda_text("Monday", [("9 AM", "Doors"), ("10 AM", "Talk")]))


# === 7. A nested function can keep its own state ===
def make_click_counter(start=0):
    """Return a counter that remembers its last result."""
    count = start

    def click():
        nonlocal count
        count += 1
        return count

    return click


counter = make_click_counter(2)
print("Clicks:", counter(), counter())
