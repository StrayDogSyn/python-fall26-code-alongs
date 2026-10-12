// Validate the editable course map and the links needed by the static site.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "site/plan.js"), "utf8"), sandbox);
const plan = sandbox.window.COURSE_PLAN;
assert.ok(plan && Array.isArray(plan.phases) && Array.isArray(plan.units));
const phaseIds = new Set(plan.phases.map((phase) => phase.id));
const unitIds = new Set();

for (const unit of plan.units) {
  assert.ok(!unitIds.has(unit.id), `Duplicate unit ID: ${unit.id}`);
  unitIds.add(unit.id);
  assert.ok(phaseIds.has(unit.phase), `Unknown phase: ${unit.id}`);
  assert.ok(["live", "preview", "planned"].includes(unit.status), `Bad status: ${unit.id}`);
  for (const field of ["code", "title", "summary", "objective", "teach", "together", "solo"]) {
    assert.ok(typeof unit[field] === "string" && unit[field].trim(), `Missing ${field}: ${unit.id}`);
  }
  assert.ok(Array.isArray(unit.topics) && unit.topics.length, `Missing topics: ${unit.id}`);
  assert.ok(Array.isArray(unit.links), `Missing links: ${unit.id}`);
  for (const link of unit.links) {
    assert.ok(link.label && link.href, `Incomplete link: ${unit.id}`);
    if (!/^https?:\/\//.test(link.href)) {
      assert.ok(!link.href.startsWith("/"), `Use relative paths for project Pages: ${link.href}`);
      assert.ok(fs.existsSync(path.join(root, link.href)), `Missing local link: ${link.href}`);
    }
  }
}

assert.ok(plan.units.length >= 2, "The hub needs at least the two launch weeks");
for (const file of ["index.html", "site/style.css", "site/app.js", "week01/week01-slides.html", "week02/week02-slides.html"]) {
  assert.ok(fs.existsSync(path.join(root, file)), `Missing site file: ${file}`);
}
for (const htmlFile of ["index.html", "week01/week01-slides.html", "week02/week02-slides.html"]) {
  const html = fs.readFileSync(path.join(root, htmlFile), "utf8");
  for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1];
    if (/^(?:https?:|#|data:|mailto:)/.test(href)) continue;
    const local = path.resolve(root, path.dirname(htmlFile), href.split("#")[0]);
    assert.ok(fs.existsSync(local), `Broken local link in ${htmlFile}: ${href}`);
  }
}
console.log(`Course map valid: ${plan.units.length} stops across ${plan.phases.length} phases.`);
