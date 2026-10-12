(function () {
  "use strict";

  const plan = window.COURSE_PLAN;
  const map = document.getElementById("phase-list");
  const detail = document.getElementById("lesson-detail");
  const search = document.getElementById("lesson-search");
  const filters = Array.from(document.querySelectorAll("[data-filter]"));
  const progressText = document.getElementById("progress-text");
  const progressFill = document.getElementById("progress-fill");
  const progressKey = "python-fall26-complete-v1";
  const liveUnits = plan.units.filter((unit) => unit.status === "live");
  const knownIds = new Set(plan.units.map((unit) => unit.id));
  let selectedId = knownIds.has(location.hash.slice(1)) ? location.hash.slice(1) : "week01";
  let activeFilter = "all";
  let completed = readProgress();

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
    button.setAttribute("aria-pressed", String(selectedId === unit.id));
    button.setAttribute("aria-label", `${unit.code}: ${unit.title}. ${statusLabel(unit.status)}. Show details`);
    const top = el("span", "unit-top");
    top.append(el("span", "unit-code", unit.code), el("span", `status-pill ${unit.status}`, statusLabel(unit.status)));
    button.append(top, el("strong", "unit-title", unit.title), el("span", "unit-summary", unit.summary));
    const bottom = el("span", "unit-bottom");
    bottom.append(el("span", "unit-topic", unit.topics[0]), el("span", "unit-arrow", "↗"));
    button.append(bottom);
    if (completed.has(unit.id)) button.append(el("span", "completed-badge", "✓ Completed"));
    button.addEventListener("click", () => {
      selectedId = unit.id;
      history.replaceState(null, "", `#${unit.id}`);
      render();
      if (window.matchMedia("(max-width: 960px)").matches) detail.scrollIntoView({ behavior: "smooth", block: "start" });
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

  function renderDetail() {
    const unit = plan.units.find((item) => item.id === selectedId) || plan.units[0];
    detail.replaceChildren();
    const cap = el("div", "detail-cap");
    cap.append(el("span", "detail-cap-code", unit.code), el("span", `status-pill ${unit.status}`, statusLabel(unit.status)));
    detail.append(cap, el("h3", "", unit.title), el("p", "detail-summary", unit.summary));
    const outcome = el("div", "outcome");
    outcome.append(el("span", "mini-label", "THE GOAL"), el("p", "", unit.objective));
    detail.append(outcome);
    const topics = el("div", "detail-topics");
    unit.topics.forEach((topic) => topics.append(el("span", "topic-chip", topic)));
    detail.append(topics);
    const rhythm = el("div", "rhythm");
    rhythm.append(el("span", "mini-label", "HOW YOU'LL LEARN"));
    [["I DO", unit.teach], ["WE DO", unit.together], ["YOU DO", unit.solo]].forEach(([label, text]) => {
      const row = el("div", "rhythm-row");
      row.append(el("span", "rhythm-label", label), el("p", "", text));
      rhythm.append(row);
    });
    detail.append(rhythm);
    const links = el("div", "detail-links");
    if (unit.links.length) {
      links.append(el("span", "mini-label", "OPEN THE MATERIALS"));
      unit.links.forEach((resource) => {
        const link = el("a", `detail-link${resource.kind === "primary" ? " primary" : ""}`, resource.label);
        link.href = resource.href;
        link.append(el("span", "", "↗"));
        links.append(link);
      });
    } else {
      links.append(el("p", "coming-note", "This stop is on the roadmap. Its lesson materials will appear here as the cohort reaches it."));
    }
    detail.append(links);
    if (unit.status === "live") {
      const check = el("button", `complete-button${completed.has(unit.id) ? " is-complete" : ""}`, completed.has(unit.id) ? "✓ Marked complete · click to undo" : "○ Mark this week complete");
      check.type = "button";
      check.setAttribute("aria-pressed", String(completed.has(unit.id)));
      check.addEventListener("click", () => {
        if (completed.has(unit.id)) completed.delete(unit.id); else completed.add(unit.id);
        saveProgress(); updateProgress(); render();
      });
      detail.append(check);
    }
  }

  function render() {
    const units = visibleUnits();
    if (!units.length) {
      renderMap(units);
      detail.replaceChildren(el("p", "coming-note", "No lesson is selected. Clear the search or choose another filter to explore the path."));
      return;
    }
    if (units.length && !units.some((unit) => unit.id === selectedId)) selectedId = units[0].id;
    renderMap(units);
    renderDetail();
  }

  filters.forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    render();
  }));
  search.addEventListener("input", render);
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    if (knownIds.has(id)) { selectedId = id; activeFilter = "all"; search.value = ""; filters[0].click(); }
  });
  updateProgress();
  render();
})();
