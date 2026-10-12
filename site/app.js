(function () {
  "use strict";

  const plan = window.COURSE_PLAN;
  const artifacts = Array.isArray(window.NOTEBOOK_ARTIFACTS) ? window.NOTEBOOK_ARTIFACTS : [];
  const map = document.getElementById("phase-list");
  const lessonView = document.getElementById("lesson-view");
  const search = document.getElementById("lesson-search");
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");
  const progressKey = "python-fall26-complete-v1";
  const liveUnits = plan.units.filter((unit) => unit.status === "live");
  const knownIds = new Set(plan.units.map((unit) => unit.id));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let selectedId = "week01";
  let activeFilter = "all";
  let completed = readProgress();
  let currentView = "map";

  document.getElementById("stop-count").textContent = String(plan.units.length);
  document.getElementById("week-count").textContent = String(liveUnits.length).padStart(2, "0");
  document.getElementById("lab-count").textContent = String(plan.units.filter((unit) => unit.status === "preview").length).padStart(2, "0");
  document.getElementById("packet-count").textContent = String(plan.units.filter((unit) => unit.code.startsWith("LP")).length).padStart(2, "0");

  function el(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = content;
    return node;
  }

  function readProgress() {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || "[]");
      return new Set(Array.isArray(saved) ? saved.filter((id) => knownIds.has(id)) : []);
    } catch (_) {
      return new Set();
    }
  }

  function saveProgress() {
    try { localStorage.setItem(progressKey, JSON.stringify(Array.from(completed))); } catch (_) { /* Private browsing may block storage. */ }
  }

  function updateProgress() {
    const count = liveUnits.filter((unit) => completed.has(unit.id)).length;
    progressText.textContent = `${count} of ${liveUnits.length} weeks marked complete`;
    progressFill.style.width = `${liveUnits.length ? (count / liveUnits.length) * 100 : 0}%`;
  }

  function statusLabel(status) {
    return { live: "Ready now", preview: "Lab preview", planned: "On the roadmap" }[status] || status;
  }

  function visibleUnits() {
    const query = search.value.trim().toLocaleLowerCase();
    return plan.units.filter((unit) => {
      const filterMatch = activeFilter === "all" || (activeFilter === "ready" ? unit.status !== "planned" : unit.status === "planned");
      const text = `${unit.code} ${unit.title} ${unit.summary} ${unit.topics.join(" ")}`.toLocaleLowerCase();
      return filterMatch && (!query || text.includes(query));
    });
  }

  function makeUnitCard(unit) {
    const button = el("button", `unit-card status-${unit.status}${selectedId === unit.id ? " selected" : ""}`);
    button.type = "button";
    button.dataset.unit = unit.id;
    button.setAttribute("aria-label", `${unit.code}: ${unit.title}. ${statusLabel(unit.status)}. Open the lesson route`);
    const top = el("span", "unit-top");
    top.append(el("span", "unit-code", unit.code), el("span", `status-pill ${unit.status}`, statusLabel(unit.status)));
    button.append(top, el("strong", "unit-title", unit.title), el("span", "unit-summary", unit.summary));
    const bottom = el("span", "unit-bottom");
    bottom.append(el("span", "unit-topic", unit.topics[0]), el("span", "unit-arrow", "↗"));
    button.append(bottom);
    if (completed.has(unit.id)) button.append(el("span", "completed-badge", "✓ Completed"));
    button.addEventListener("click", () => {
      location.hash = `/${unit.id}`;
    });
    return button;
  }

  function renderMap(units) {
    map.replaceChildren();
    if (!units.length) {
      const empty = el("div", "empty-state");
      empty.append(el("strong", "", "No stops match that search."), el("p", "", "Try a topic such as terminal, Git, Python, or SQL."));
      map.append(empty);
      return;
    }
    for (const phase of plan.phases) {
      const inPhase = units.filter((unit) => unit.phase === phase.id);
      if (!inPhase.length) continue;
      const section = el("section", `phase phase-${phase.color}`);
      section.setAttribute("aria-label", phase.title);
      const head = el("div", "phase-head");
      const marker = el("div", "phase-marker", phase.label.slice(0, 2));
      marker.setAttribute("aria-hidden", "true");
      const title = el("div", "phase-title");
      title.append(el("span", "phase-label", phase.label), el("h3", "", phase.title), el("p", "", phase.description));
      head.append(marker, title);
      const cards = el("div", "unit-grid");
      inPhase.forEach((unit) => cards.append(makeUnitCard(unit)));
      section.append(head, cards);
      map.append(section);
    }
  }

  function addLinkRow(parent, links, className) {
    if (!links || !links.length) return;
    const row = el("div", className);
    links.forEach((resource) => {
      const link = el("a", `step-link${resource.kind === "primary" ? " primary" : ""}`, resource.label);
      link.href = resource.href;
      row.append(link);
    });
    parent.append(row);
  }

  function renderLessonSteps(unit, body) {
    if (unit.lesson && unit.lesson.steps && unit.lesson.steps.length) {
      const steps = el("ol", "lesson-steps");
      steps.setAttribute("aria-label", `${unit.title} study route`);
      unit.lesson.steps.forEach((step, index) => {
        const item = el("li", "lesson-step");
        item.id = `step-${step.key}`;
        item.tabIndex = -1;
        const marker = el("span", "step-marker", String(index + 1).padStart(2, "0"));
        marker.setAttribute("aria-hidden", "true");
        const stepBody = el("div", "step-body");
        const head = el("div", "step-head");
        head.append(el("strong", "step-label", step.label));
        if (step.mode) head.append(el("span", `mode-badge mode-${step.mode.split(" ")[0].toLowerCase()}`, step.mode));
        stepBody.append(head, el("p", "step-text", step.text));
        addLinkRow(stepBody, step.links, "step-links");
        item.append(marker, stepBody);
        steps.append(item);
      });
      body.append(el("span", "mini-label", "YOUR ROUTE"), steps);
      return;
    }
    const rhythm = el("div", "rhythm");
    rhythm.append(el("span", "mini-label", "HOW YOU'LL LEARN"));
    [["I DO", unit.teach], ["WE DO", unit.together], ["YOU DO", unit.solo]].forEach(([label, text]) => {
      const row = el("div", "rhythm-row");
      row.append(el("span", "rhythm-label", label), el("p", "", text));
      rhythm.append(row);
    });
    body.append(rhythm);
    if (!unit.links.length) {
      body.append(el("p", "coming-note", "This stop is on the roadmap. Its lesson materials will appear here as the cohort reaches it."));
    }
  }

  function renderLesson(unit) {
    lessonView.replaceChildren();
    const shell = el("div", "lesson-shell");
    const back = el("a", "back-link", "← Back to course map");
    back.href = "#journey";
    shell.append(back);
    const cap = el("div", "detail-cap");
    cap.append(el("span", "detail-cap-code", unit.code), el("span", `status-pill ${unit.status}`, statusLabel(unit.status)));
    const heading = el("h2", "", unit.title);
    heading.tabIndex = -1;
    const meta = el("p", "lesson-meta");
    if (unit.lesson && unit.lesson.estimate) {
      meta.append(el("span", "lesson-estimate", unit.lesson.estimate), document.createTextNode(" approximate, including practice"));
    } else {
      meta.textContent = "Materials appear as the cohort reaches this stop.";
    }
    shell.append(cap, heading, meta, el("p", "detail-summary", unit.summary));
    const outcome = el("div", "outcome");
    outcome.append(el("span", "mini-label", "THE GOAL"), el("p", "", unit.objective));
    const topics = el("div", "detail-topics");
    unit.topics.forEach((topic) => topics.append(el("span", "topic-chip", topic)));
    shell.append(outcome, topics);
    renderLessonSteps(unit, shell);
    const shared = artifacts.filter((item) => item.unit === unit.id);
    if (shared.length) {
      const study = el("div", "artifact-block");
      study.append(el("span", "mini-label", "STUDY ROUTES"));
      const grid = el("div", "artifact-grid");
      shared.forEach((item) => {
        const card = el("a", "artifact-card");
        card.href = item.url;
        card.append(el("strong", "", item.title), el("span", "", `${item.format} · ${item.alt || "Reviewed " + item.reviewDate}`));
        grid.append(card);
      });
      study.append(grid);
      shell.append(study);
    }
    if (unit.links.length) {
      const links = el("div", "detail-links");
      links.append(el("span", "mini-label", "ALL MATERIALS"));
      unit.links.forEach((resource) => {
        const link = el("a", `detail-link${resource.kind === "primary" ? " primary" : ""}`, resource.label);
        link.href = resource.href;
        link.append(el("span", "", "↗"));
        links.append(link);
      });
      shell.append(links);
    }
    if (unit.status === "live") {
      const check = el("button", `complete-button${completed.has(unit.id) ? " is-complete" : ""}`, completed.has(unit.id) ? "✓ Marked complete · click to undo" : "○ Mark this week complete");
      check.type = "button";
      check.setAttribute("aria-pressed", String(completed.has(unit.id)));
      check.addEventListener("click", () => {
        if (completed.has(unit.id)) completed.delete(unit.id); else completed.add(unit.id);
        saveProgress(); updateProgress(); renderMap(visibleUnits()); renderLesson(unit);
      });
      shell.append(check);
    }
    lessonView.append(shell);
  }

  function parseHash() {
    let raw;
    try { raw = decodeURIComponent(location.hash.slice(1)); } catch (_) { raw = ""; }
    const match = raw.match(/^\/?([a-z0-9-]+)(?:\/([a-z-]+))?$/i);
    if (match && knownIds.has(match[1])) return { unit: match[1], step: match[2] || null };
    return { unit: null, step: null };
  }

  function setFilter(name) {
    activeFilter = name;
    filters.forEach((item) => {
      const active = item.dataset.filter === name;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
  }

  function showLesson(unitId, stepKey) {
    const unit = plan.units.find((item) => item.id === unitId) || plan.units[0];
    selectedId = unit.id;
    const wasLesson = currentView === "lesson";
    currentView = "lesson";
    document.body.dataset.view = "lesson";
    lessonView.hidden = false;
    renderMap(visibleUnits());
    renderLesson(unit);
    const stepEl = stepKey ? lessonView.querySelector(`#step-${stepKey}`) : null;
    const target = stepEl || lessonView.querySelector("h2");
    if (stepEl) {
      stepEl.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    } else if (!wasLesson) {
      lessonView.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth", block: "start" });
    }
    target.focus({ preventScroll: true });
  }

  function showMap(focusCard) {
    const wasLesson = currentView === "lesson";
    currentView = "map";
    document.body.dataset.view = "map";
    lessonView.hidden = true;
    renderMap(visibleUnits());
    if (wasLesson && focusCard) {
      const card = map.querySelector(`[data-unit="${selectedId}"]`);
      if (card) card.focus();
    }
  }

  function route() {
    const { unit, step } = parseHash();
    if (unit) {
      const raw = location.hash.slice(1);
      if (!raw.startsWith("/")) history.replaceState(null, "", `#/${raw}`);
      showLesson(unit, step);
    } else {
      showMap(location.hash === "#journey");
    }
  }

  filters.forEach((button) => button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
    renderMap(visibleUnits());
  }));
  search.addEventListener("input", () => renderMap(visibleUnits()));
  lessonView.addEventListener("keydown", (event) => {
    if (event.key === "Escape") location.hash = "#journey";
  });
  window.addEventListener("hashchange", route);
  document.body.dataset.view = "map";
  updateProgress();
  route();
})();
