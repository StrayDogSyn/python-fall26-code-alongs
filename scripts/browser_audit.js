/*
 * Optional browser audit for the hub and the weekly decks (needs Playwright with Chromium).
 *
 *   python -m http.server 8765        (in one terminal, from the repository root)
 *   node scripts/browser_audit.js     (in another; set AUDIT_BASE to change the address)
 *
 * Fails (exit 1) on page errors, console errors other than blocked Google Fonts, broken internal
 * links, horizontal overflow at 375 px (slides taller than 1080p only warn unless AUDIT_STRICT=1), hub counters that disagree with site/plan.js, or a deck
 * whose last slide cannot be reached from the keyboard.
 */
const fs = require("fs");
const path = require("path");
const vm = require("vm");
let chromium;
try { ({ chromium } = require("playwright")); } catch (_) {
  console.error("Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium");
  process.exit(2);
}
const base = (process.env.AUDIT_BASE || "http://localhost:8765/").replace(/\/?$/, "/");
const root = path.resolve(__dirname, "..");
const ctxPlan = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "site", "plan.js"), "utf8"), ctxPlan);
const units = ctxPlan.window.COURSE_PLAN.units;
const live = units.filter((u) => u.status === "live");
const expected = {
  week: String(live.length).padStart(2, "0"),
  lab: String(live.filter((u) => u.code.includes("LP")).length).padStart(2, "0"),
  packet: String(units.filter((u) => u.status === "planned").length).padStart(2, "0"),
};
const ignorable = (t) => /fonts\.googleapis|fonts\.gstatic|ERR_TUNNEL|ERR_INTERNET|ERR_NAME_NOT_RESOLVED/.test(t);
const problems = [];
const report = {};

(async () => {
  const browser = await chromium.launch();
  async function open(rel, viewport) {
    const ctx = await browser.newContext({ viewport });
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push("pageerror: " + e.message));
    page.on("console", (m) => { if (m.type() === "error" && !ignorable(m.text())) errs.push("console: " + m.text()); });
    await page.goto(base + rel, { waitUntil: "load" });
    await page.waitForTimeout(500);
    return { ctx, page, errs };
  }

  { // Hub
    const { ctx, page, errs } = await open("index.html", { width: 1280, height: 800 });
    const stats = await page.evaluate(() => ({
      week: document.getElementById("week-count").textContent,
      lab: document.getElementById("lab-count").textContent,
      packet: document.getElementById("packet-count").textContent,
      progress: document.getElementById("progress-text").textContent,
      currentHref: (document.getElementById("current-week") || {}).getAttribute ? document.getElementById("current-week").getAttribute("href") : null,
      cards: document.querySelectorAll("#phase-list a, #phase-list button, #phase-list li").length,
    }));
    for (const k of ["week", "lab", "packet"]) if (stats[k] !== expected[k]) problems.push(`hub counter ${k}: page ${stats[k]} vs plan ${expected[k]}`);
    const links = await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
    const bad = [];
    for (const h of [...new Set(links.filter((x) => !/^(https?:|#|mailto:)/.test(x)))]) {
      const r = await page.request.get(base + h.split("#")[0]);
      if (!r.ok()) bad.push(`${h} ${r.status()}`);
    }
    await page.setViewportSize({ width: 375, height: 800 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) problems.push(`hub overflows by ${overflow}px at 375px`);
    for (const u of live) {
      await page.goto(base + "index.html#/" + u.id); await page.waitForTimeout(250);
      const ok = await page.evaluate((t) => document.body.innerText.includes(t), u.title);
      if (!ok) problems.push(`hub route #/${u.id} does not show "${u.title}"`);
    }
    problems.push(...errs.map((e) => "hub " + e), ...bad.map((b) => "hub broken link " + b));
    report.hub = { stats, expected, internalLinksChecked: links.length, overflow375: overflow };
    await ctx.close();
  }

  const decks = fs.readdirSync(root).filter((d) => /^week\d\d$/.test(d)).sort();
  for (const wk of decks) {
    const rel = `${wk}/${wk}-slides.html`;
    if (!fs.existsSync(path.join(root, rel))) continue;
    const { ctx, page, errs } = await open(rel, { width: 1920, height: 1080 });
    const n = await page.evaluate(() => document.querySelectorAll(".slide").length);
    const tall = [];
    for (let i = 0; i < n + 2; i++) {
      const s = await page.evaluate(() => { const e = document.querySelector(".slide.active, .slide.current, .slide[aria-current='true']") || document.querySelector(".slide:not([hidden])"); return e ? { h: e.scrollHeight, c: e.clientHeight } : null; });
      if (s && s.h > s.c + 4) tall.push(`slide ${i + 1} +${s.h - s.c}px`);
      await page.keyboard.press("ArrowRight"); await page.waitForTimeout(30);
    }
    const endHash = (page.url().split("#")[1] || "");
    if (endHash !== String(n)) problems.push(`${wk}: last slide not reached by keyboard (hash ${endHash}, slides ${n})`);
    await page.setViewportSize({ width: 375, height: 800 });
    const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (ov > 0) problems.push(`${wk} overflows by ${ov}px at 375px`);
    if (tall.length) {
      const msg = `${wk} slides taller than 1080p viewport: ${tall.join(", ")}`;
      if (process.env.AUDIT_STRICT) problems.push(msg); else console.warn("WARNING: " + msg);
    }
    problems.push(...errs.map((e) => `${wk} ${e}`));
    report[wk] = { slides: n, overflow375: ov, tallAt1080: tall };
    await ctx.close();
  }
  await browser.close();
  console.log(JSON.stringify(report, null, 1));
  if (problems.length) { console.error("\nPROBLEMS:\n- " + problems.join("\n- ")); process.exit(1); }
  console.log("\nBrowser audit: no problems.");
})().catch((e) => { console.error("AUDIT FAILED TO RUN", e); process.exit(2); });
