"""I Do: run from the root with python lp03a-iteration-and-algorithms/code-along.py."""


def main():
    # ===== 1. Count, accumulate, search, and filter =====
    print("1. Loop patterns")
    waits = [4, 7, 2, 9]
    count = 0
    total = 0
    short_waits = []
    first_long = None
    for index, minutes in enumerate(waits):
        count += 1
        total += minutes
        if minutes < 5:
            short_waits.append(minutes)
        if first_long is None and minutes >= 8:
            first_long = index
    print(f"count={count}, total={total}, short={short_waits}, first_long={first_long}")
    print(f"range(2, 10, 3)={list(range(2, 10, 3))}")

    # ===== 2. A bounded while loop and a sentinel =====
    print("2. While with a guard")
    readings = iter(["wait", "wait", "go", "wait"])
    attempts = 0
    signal = None
    while signal != "go" and attempts < 3:
        signal = next(readings)
        attempts += 1
        print(f"attempt {attempts}: {signal}")
    print(f"stopped={signal == 'go'} after {attempts} readings")

    # ===== 3. Debug a loop by tracing its state =====
    print("3. Trace the accumulator")
    running = 0
    for value in [2, 5, 1]:
        running += value
        print(f"added {value}, running={running}")
    print("Predict what resetting running inside this loop would do.")

    # ===== 4. Linear search and comparison cost =====
    print("4. Linear search")
    room_codes = [17, 24, 31, 42, 58]
    wanted = 42
    linear_checks = 0
    found_at = -1
    for index, code in enumerate(room_codes):
        linear_checks += 1
        print(f"compare room {code} with {wanted}")
        if code == wanted:
            found_at = index
            break
    print(f"linear index={found_at}, comparisons={linear_checks}")

    # ===== 5. Binary search needs sorted input =====
    print("5. Binary search")
    low = 0
    high = len(room_codes) - 1
    binary_checks = 0
    while low <= high:
        mid = (low + high) // 2
        binary_checks += 1
        print(f"window {low}..{high}, mid={mid}, value={room_codes[mid]}")
        if room_codes[mid] == wanted:
            break
        if room_codes[mid] < wanted:
            low = mid + 1
        else:
            high = mid - 1
    print(f"binary comparisons={binary_checks}")

    # ===== 6. Trace one bubble pass and one selection =====
    print("6. Sort traces")
    values = [8, 3, 5]
    for index in range(len(values) - 1):
        if values[index] > values[index + 1]:
            values[index], values[index + 1] = values[index + 1], values[index]
        print(f"bubble compare {index}: {values}")
    picked = [8, 3, 5]
    smallest = 0
    for index in range(1, len(picked)):
        if picked[index] < picked[smallest]:
            smallest = index
    picked[0], picked[smallest] = picked[smallest], picked[0]
    print(f"selection first position={picked}")

    # ===== 7. Nested loops and two ways to filter =====
    print("7. Pairs and comprehensions")
    for left in range(3):
        for right in range(left + 1, 3):
            print(f"pair ({left}, {right})")
    above_four_loop = []
    for value in waits:
        if value > 4:
            above_four_loop.append(value)
    above_four_comp = [value for value in waits if value > 4]
    print(f"loop={above_four_loop}, comprehension={above_four_comp}")


if __name__ == "__main__":
    main()
