"use strict";

const $ = (id) => document.getElementById(id);
const ui = {
  form: $("number-form"), input: $("numbers-input"), meta: $("input-meta"),
  drop: $("drop-button"), clean: $("clean-button"), sample: $("sample-button"),
  speed: $("speed-select"), validation: $("validation"),
  validationSummary: $("validation-summary"), invalidList: $("invalid-list"),
  board: $("board"), pegs: $("peg-field"), balls: $("ball-layer"),
  status: $("stage-status"), skip: $("skip-button"), reset: $("reset-button"),
  total: $("total-count"), empty: $("results-empty"), results: $("result-list")
};

const labels = { fizzbuzz: "FizzBuzz!", fizz: "Fizz!", buzz: "Buzz!", number: "Just a number" };
const counts = { fizzbuzz: 0, fizz: 0, buzz: 0, number: 0 };
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let runId = 0;
let running = false;
let skipAnimation = false;
let currentAnimation = null;

function tokensFrom(text) {
  return text.split(/[,;\s]+/u).filter(Boolean);
}

function inspectInput(text) {
  const tokens = tokensFrom(text);
  const valid = [];
  const invalid = [];

  if (tokens.length === 0) {
    invalid.push({ position: 0, token: "(empty input)", reason: "Add at least one whole number." });
  }

  tokens.forEach((token, index) => {
    if (!/^[0-9]+$/u.test(token)) {
      invalid.push({ position: index + 1, token, reason: "Use digits only. No signs, letters, symbols, or decimal points." });
      return;
    }
    try {
      const value = BigInt(token);
      if (value < 1n) {
        invalid.push({ position: index + 1, token, reason: "Zero cannot play. Start at 1." });
      } else {
        valid.push(value);
      }
    } catch {
      invalid.push({ position: index + 1, token, reason: "This entry is too large for this browser to read." });
    }
  });

  return { tokens, valid, invalid };
}

function outcome(value) {
  if (value % 15n === 0n) return "fizzbuzz";
  if (value % 3n === 0n) return "fizz";
  if (value % 5n === 0n) return "buzz";
  return "number";
}

function refreshInputState() {
  const report = inspectInput(ui.input.value);
  const count = report.tokens.length;
  ui.meta.textContent = count === 0
    ? "The chute is empty. Add a number to begin."
    : `${count} ${count === 1 ? "entry" : "entries"} in the chute. ${report.invalid.length ? `${report.invalid.length} need a second look.` : "Ready to drop!"}`;
  ui.clean.disabled = running || count === 0 || report.invalid.length === 0;
  return report;
}

function hideWarning() {
  ui.validation.hidden = true;
  ui.input.removeAttribute("aria-invalid");
  ui.input.removeAttribute("aria-describedby");
}

function showWarning(invalid) {
  ui.invalidList.replaceChildren();
  const fragment = document.createDocumentFragment();
  invalid.forEach(({ position, token, reason }) => {
    const item = document.createElement("li");
    const code = document.createElement("code");
    code.textContent = token;
    item.append(position ? `Entry ${position}: ` : "", code, `: ${reason}`);
    fragment.append(item);
  });
  ui.invalidList.append(fragment);
  const count = invalid.length;
  ui.validationSummary.textContent = `${count} ${count === 1 ? "entry is" : "entries are"} invalid. Every rejected entry is listed below; no numbers have been dropped.`;
  ui.validation.hidden = false;
  ui.input.setAttribute("aria-invalid", "true");
  ui.input.setAttribute("aria-describedby", "validation-summary");
  ui.validation.scrollIntoView({ behavior: reducedMotion.matches ? "instant" : "smooth", block: "nearest" });
}

function cleanInput() {
  const cleaned = [];
  for (const token of tokensFrom(ui.input.value)) {
    const digits = token.replace(/[^0-9]/gu, "");
    if (!digits) continue;
    try {
      const value = BigInt(digits);
      if (value > 0n) cleaned.push(value.toString());
    } catch {
      // An unrepresentable entry is removed, just like an entry with no digits.
    }
  }
  ui.input.value = cleaned.join(", ");
  hideWarning();
  refreshInputState();
  ui.status.textContent = cleaned.length
    ? `Cleaner kept ${cleaned.length} ${cleaned.length === 1 ? "number" : "numbers"}. Review them before dropping; cleaning may change values.`
    : "Cleaner found no valid positive whole numbers. Add a new entry to try again.";
  ui.input.focus();
}

function makePegs() {
  const fragment = document.createDocumentFragment();
  for (let row = 0; row < 8; row += 1) {
    for (let column = 0; column < 9; column += 1) {
      const peg = document.createElement("span");
      peg.className = "peg";
      peg.style.left = `${8 + column * 10.5 + (row % 2 ? 5.25 : 0)}%`;
      peg.style.top = `${12 + row * 9}%`;
      fragment.append(peg);
    }
  }
  ui.pegs.append(fragment);
}

function clearBoard() {
  ui.results.replaceChildren();
  ui.balls.replaceChildren();
  ui.empty.hidden = false;
  ui.total.textContent = "0";
  for (const key of Object.keys(counts)) {
    counts[key] = 0;
    $(`bucket-count-${key}`).textContent = "0";
  }
}

function setRunning(value) {
  running = value;
  ui.input.disabled = value;
  ui.drop.disabled = value;
  ui.sample.disabled = value;
  ui.skip.disabled = !value;
  if (!value) refreshInputState();
  else ui.clean.disabled = true;
}

function addResult(value, key) {
  counts[key] += 1;
  $(`bucket-count-${key}`).textContent = String(counts[key]);
  const number = ui.results.children.length + 1;
  ui.total.textContent = String(number);
  ui.empty.hidden = true;

  const item = document.createElement("li");
  item.className = "result-item";
  item.dataset.outcome = key;
  const position = document.createElement("span");
  position.className = "result-index";
  position.textContent = String(number);
  const digits = document.createElement("span");
  digits.className = "result-number";
  digits.textContent = value.toString();
  const label = document.createElement("strong");
  label.className = "result-label";
  label.textContent = labels[key];
  item.append(position, digits, label);
  ui.results.append(item);
  ui.status.textContent = `${value} lands in ${labels[key]}`;
}

async function animateDrop(value, key, index) {
  if (skipAnimation || reducedMotion.matches || typeof Element.prototype.animate !== "function") return;

  const boardRect = ui.board.getBoundingClientRect();
  const bucketRect = $(`bucket-${key}`).getBoundingClientRect();
  const ball = document.createElement("span");
  ball.className = `ball ball-${key}`;
  const digits = value.toString();
  ball.textContent = digits.length > 3 ? `${digits.slice(0, 2)}…` : digits;
  ball.title = digits;
  ui.balls.append(ball);

  const startX = boardRect.width / 2;
  const endX = bucketRect.left - boardRect.left + bucketRect.width / 2;
  const endY = bucketRect.top - boardRect.top + 33;
  const steps = [{ transform: `translate(${startX - 19}px, 1px)`, offset: 0 }];
  for (let row = 0; row < 8; row += 1) {
    const progress = (row + 1) / 9;
    const drift = (row % 2 ? -1 : 1) * (14 + (index % 3) * 3);
    const x = startX + (endX - startX) * progress + drift;
    const y = 18 + (endY - 18) * progress;
    steps.push({ transform: `translate(${x - 19}px, ${y - 19}px)`, offset: progress * .9, easing: "ease-in-out" });
  }
  steps.push({ transform: `translate(${endX - 19}px, ${endY - 19}px)`, offset: 1 });

  const animation = ball.animate(steps, {
    duration: ui.speed.value === "turbo" ? 420 : 1400,
    easing: "ease-in",
    fill: "forwards"
  });
  currentAnimation = animation;
  try {
    await animation.finished;
  } catch {
    // Reset cancels an in-flight drop.
  } finally {
    if (currentAnimation === animation) currentAnimation = null;
    ball.remove();
  }
}

async function startRun(values) {
  runId += 1;
  const thisRun = runId;
  skipAnimation = false;
  clearBoard();
  setRunning(true);
  ui.status.textContent = `${values.length} ${values.length === 1 ? "number is" : "numbers are"} lining up at the chute.`;

  for (let index = 0; index < values.length; index += 1) {
    if (thisRun !== runId) return;
    const value = values[index];
    const key = outcome(value);
    await animateDrop(value, key, index);
    if (thisRun !== runId) return;
    addResult(value, key);
  }

  if (thisRun !== runId) return;
  setRunning(false);
  ui.status.textContent = `Show complete! ${values.length} ${values.length === 1 ? "number has" : "numbers have"} landed. Try another round or reset the board.`;
}

ui.input.addEventListener("input", () => {
  hideWarning();
  refreshInputState();
});
ui.form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (running) return;
  const report = refreshInputState();
  if (report.invalid.length) {
    showWarning(report.invalid);
    return;
  }
  hideWarning();
  void startRun(report.valid);
});
ui.clean.addEventListener("click", cleanInput);
ui.sample.addEventListener("click", () => {
  ui.input.value = "3, 5, 15, 22, banana, -4, 0";
  refreshInputState();
  showWarning(inspectInput(ui.input.value).invalid);
  ui.input.focus();
});
ui.skip.addEventListener("click", () => {
  skipAnimation = true;
  if (currentAnimation) currentAnimation.finish();
  ui.skip.disabled = true;
});
ui.reset.addEventListener("click", () => {
  runId += 1;
  skipAnimation = false;
  if (currentAnimation) currentAnimation.cancel();
  currentAnimation = null;
  clearBoard();
  setRunning(false);
  ui.status.textContent = "Board reset. Your numbers are still in the chute.";
});

makePegs();
refreshInputState();
