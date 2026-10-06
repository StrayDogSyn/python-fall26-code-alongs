"""
Spyder 6 Intro Tour
===================
Python Fall 26 Code-Alongs | Code the Dream | Mondays 8:00 PM Eastern
Suggested home: lp01-intro-to-python/00_spyder_intro.py

Welcome to Spyder, an IDE (Integrated Development Environment) built for
people who work with Python and data. Think of it as a kitchen:

    Editor ............ the recipe card (this file)
    IPython Console ... the stovetop (where code actually cooks)
    Variable Explorer . the glass pantry door (see what is on every shelf)

HOW THIS FILE WORKS
-------------------
The file is split into CELLS. A cell starts at a line beginning with "# %%"
and runs until the next one. You run one cell at a time, like playing one
level before loading the next.

    Run the current cell ............. Ctrl+Enter   (Cmd+Return on Mac)
    Run the cell, then move on ....... Shift+Enter
    Run the current line or selection  F9
    Run the whole file ............... F5

THE SPYDER MAP (default layout)
-------------------------------
    Left ............ Editor
    Bottom right .... IPython Console (your output shows up here)
    Top right ....... tabs for Variable Explorer, Help, Plots, and Files

If your layout looks different, open the View menu, find Window layouts,
and choose the Spyder default. Every IDE ships with a "reset" button for
exactly this reason.

START HERE: click anywhere inside Cell 1 below and press Ctrl+Enter.
"""

# %% Cell 1: Hello, Spyder
# The Editor holds the code. The Console shows the result.
print("Hello, Spyder! Fall 26 is officially in session.")
print("Check the IPython Console. That output came from the lines above.")


# %% Cell 2: Variables and the Variable Explorer
# A variable is a labeled save slot. The name goes on the left, the value on
# the right, and a single = means "store this here".
player_name = "Neo"
level = 1
health = 100.0
has_sword = True

print(player_name, level, health, has_sword)
print(type(player_name), type(level), type(health), type(has_sword))

# NOW LOOK at the Variable Explorer tab (top right). Four rows, four columns:
# Name, Type, Size, Value. Spyder is showing you exactly what Python remembers.
#
# TRY IT: change level = 1 to level = 5 and run this cell again. Watch the
# Value column update. No rewind button needed.


# %% Cell 3: The Console is a scratchpad
# The Editor is for code you keep. The Console is for quick experiments you
# do not. Click inside the IPython Console (bottom right) and type these,
# pressing Enter after each one:
#
#     level + 1
#     player_name.upper()
#     health / 4
#
# Notice the console shows the answer without print(). It echoes the last
# value, a console habit that does NOT work inside a saved file.
#
# This runs in the file as a normal line:
next_level = level + 1
print(f"{player_name} is about to reach level {next_level}.")

# Fresh start? Type %reset -f in the console to wipe every variable, then run
# a cell to rebuild the ones you need. Think of it as pulling the power cord
# on an old Nintendo, minus the blowing on the cartridge.


# %% Cell 4: Ask Spyder for help (the Help pane)
# Click directly on the word len in the line below, then press Ctrl+I.
# The Help pane (top right) opens the documentation for that function.
# You can also type len( and Spyder shows a small tooltip with its signature.
item_name = "Master Sword"
print(len(item_name))

# Reading documentation is a core developer skill, and Spyder puts it one
# keystroke away. Try Ctrl+I on print, type, or input too.


# %% Cell 5: Strings and f-strings
# An f-string is a fill-in-the-blanks sentence. Put an f before the opening
# quote and wrap any variable in curly braces. Mad Libs, but it compiles.
message = f"{player_name} is level {level} with {health} health."
print(message)
print(message.upper())
print(len(message))

# TRY IT: add has_sword to the message and rerun the cell.


# %% Cell 6: Talking back with input()
# input() pauses the program and waits for you. After you run this cell,
# click in the IPython Console, type an answer, and press Enter.
# Nothing happens until you do. Python is a very patient dinner guest.
visitor = input("What should I call you? ").strip()
if not visitor:
    visitor = "Player Two"
print(f"Welcome to the party, {visitor}.")


# %% Cell 7: Making decisions with if / elif / else
# Indentation is Python's punctuation. After a colon, Spyder indents the next
# line for you (4 spaces). Everything indented belongs to that block.
health = 35

if health > 70:
    status = "Healthy"
elif health > 30:
    status = "Wounded"
else:
    status = "Critical"

print(f"Health is {health}, so status is {status}.")

# TRY IT: change health to 90, then to 10, and rerun the cell each time.
# Watch status change in the Variable Explorer.


# %% Cell 8: Loops with for and range
# A loop repeats a block of code. Here, three rounds against a boss.
boss_health = 100

for round_number in range(1, 4):
    damage = round_number * 10
    boss_health = boss_health - damage
    print(
        f"Round {round_number}: hit for {damage}, "
        f"boss health is {boss_health}"
    )

# range(1, 4) gives you 1, 2, 3. It stops BEFORE 4. Remember this moment:
# it is the root of the off-by-one jokes in the Dad Joke Vault.
#
# TRY IT: delete the boss_health = 100 line above, run the cell twice, and
# watch what happens to the boss. State sticks around between runs. That is
# a feature, and also a classic source of confusing bugs.


# %% Cell 9: Functions are cheat codes you write yourself
def greet(name, level=1):
    """Return a greeting for a player."""
    return f"Welcome, {name}. You are level {level}."


print(greet("Trinity"))
print(greet("Morpheus", level=9))

# Click on greet in either print line above and press Ctrl+I. The Help pane
# shows YOUR docstring, the text in triple quotes. Documentation you wrote
# yourself, served by the same system that serves the pros.


# %% Cell 10: Lists and the Variable Explorer viewer
inventory = ["potion", "map", "lantern"]
inventory.append("rope")

print(inventory)
print("Items:", len(inventory))
print("First:", inventory[0], "| Last:", inventory[-1])

# Double-click inventory in the Variable Explorer. Spyder opens a viewer so
# you can see (and even edit) the list. Counting starts at 0, which is why
# the first item is inventory[0].


# %% Cell 11: Break it on purpose (reading errors)
# Errors are not failures. They are a teacher that always tells the truth.
# These two are caught safely so the whole file keeps running:
try:
    print(undefined_variable)  # type: ignore
except NameError as error:
    print(f"NameError caught: {error}")

current_level = 5
try:
    print("Level " + current_level)
except TypeError as error:
    print(f"TypeError caught: {error}")

# NOW THE REAL THING. Remove the # from ONE line below, run this cell, and
# read the traceback in the console. Start at the BOTTOM line: it says what
# went wrong. The lines above it say where. Then put the # back.
#
# print(undefined_variable)
# print(10 / 0)
# print(inventory[10])


# %% Cell 12: Pause time (breakpoints and the debugger)
def total_damage(hits):
    total = 0
    for hit in hits:
        total += hit
    return total


damage_report = total_damage([10, 25, 5])
print(f"Total damage: {damage_report}")

# A breakpoint tells Python to freeze the game at a specific line.
#   1. Click on the line  total += hit  and press F12. A red dot appears.
#   2. Use the Debug menu to debug this file.
#   3. The console switches to an ipdb> prompt and the game is paused.
#      Type  n  and press Enter to step to the next line.
#      Type  p total  to print a value. Type  c  to continue. Type  q  to quit.
#   4. Watch the Variable Explorer: total and hit change as you step.
#
# Press F12 on that line again to remove the breakpoint when you are done.
# This is how professionals find bugs. print() is the flashlight,
# the debugger is the whole security camera system.


# %% Cell 13: Meet the Plots pane
# This cell uses matplotlib, a charting library. If it is not installed, the
# cell explains itself instead of crashing, which is good habit on its own.
try:
    import matplotlib.pyplot as plt  # type: ignore

    levels = []
    xp_needed = []
    for lvl in range(1, 11):
        levels.append(lvl)
        xp_needed.append(100 * lvl * lvl)

    plt.plot(levels, xp_needed, marker="o")
    plt.title("XP needed per level")
    plt.xlabel("Level")
    plt.ylabel("XP")
    plt.show()
    print("Check the Plots tab (top right) for your chart.")
except ImportError:
    print("matplotlib is not installed here. That is fine. We meet it later.")


# %% Cell 14: Your turn
# Three quick missions. Save your changes with Ctrl+S.
#
# MISSION 1: Change player_name in Cell 2 to your own character, then rerun
#            Cells 2, 5, and 9. See your name travel through the file.
#
# MISSION 2: Finish the heal function below. It should return the new health
#            but never go above 100. Hint: if is your friend.
def heal(current_health, amount):
    """Return health after healing, capped at 100."""
    # TODO: replace the next line with your own logic
    return current_health


print(heal(80, 10))  # goal: 90
print(heal(80, 50))  # goal: 100

# MISSION 3: Write a for loop that prints each item in inventory on its own
#            line, like "You are carrying: potion".
#
# BONUS:     Break something on purpose, read the error, and fix it.
#
# (No peeking) One possible heal solution:
#     new_health = current_health + amount
#     if new_health > 100:
#         new_health = 100
#     return new_health


# %% Cell 15: Wrap-up and cheat sheet
# SHORTCUTS
#   Ctrl+Enter ... run cell        Shift+Enter ... run cell and advance
#   F9 ........... run selection   F5 ............ run whole file
#   Ctrl+I ....... show Help       F12 ........... toggle breakpoint
#   Ctrl+S ....... save
#
# PANES
#   Variable Explorer ... what Python remembers right now
#   Help ................ documentation, one keystroke away
#   Plots ............... your charts
#   IPython Console ..... output, input, and quick experiments
#
# NEXT STEPS
#   1. Save this file and commit it to your own fork.
#   2. Rerun the whole file with F5 and make sure it works top to bottom.
#   3. Pick one cell, change something, and predict what will happen
#      BEFORE you run it. Predicting is how intuition gets built.
print(
    "Dad joke unlocked: why is Spyder great at debugging? "
    "It is already good at catching bugs."
)
