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
vm.runInNewContext(fs.readFileSync(path.join(root, "site/artifacts.js"), "utf8"), sandbox);
const artifacts = sandbox.window.NOTEBOOK_ARTIFACTS || [];
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
  const checkLinks = (links, where) => {
    for (const link of links) {
      assert.ok(link.label && link.href, `Incomplete link: ${where}`);
      if (!/^https?:\/\//.test(link.href)) {
        assert.ok(!link.href.startsWith("/"), `Use relative paths for project Pages: ${link.href}`);
        assert.ok(fs.existsSync(path.join(root, link.href)), `Missing local link: ${link.href}`);
      }
    }
  };
  checkLinks(unit.links, unit.id);
  if (unit.lesson) {
    assert.ok(typeof unit.lesson.estimate === "string" && unit.lesson.estimate.trim(), `Missing lesson estimate: ${unit.id}`);
    assert.ok(Array.isArray(unit.lesson.steps) && unit.lesson.steps.length, `Missing lesson steps: ${unit.id}`);
    const stepKeys = new Set();
    for (const step of unit.lesson.steps) {
      assert.ok(/^[a-z]+$/.test(step.key), `Bad step key: ${unit.id}`);
      assert.ok(!stepKeys.has(step.key), `Duplicate step key: ${unit.id}/${step.key}`);
      stepKeys.add(step.key);
      assert.ok(typeof step.label === "string" && step.label.trim(), `Missing step label: ${unit.id}/${step.key}`);
      assert.ok(typeof step.text === "string" && step.text.trim(), `Missing step text: ${unit.id}/${step.key}`);
      if (step.mode) assert.ok(["I DO", "WE DO", "YOU DO"].includes(step.mode), `Bad step mode: ${unit.id}/${step.key}`);
      assert.ok(Array.isArray(step.links), `Missing step links: ${unit.id}/${step.key}`);
      checkLinks(step.links, `${unit.id}/${step.key}`);
    }
  }
}

assert.ok(Array.isArray(artifacts), "NOTEBOOK_ARTIFACTS must be an array");
for (const item of artifacts) {
  assert.ok(unitIds.has(item.unit), `Artifact for unknown unit: ${item.unit}`);
  for (const field of ["title", "format", "scope", "reviewDate", "visibility", "url", "alt"]) {
    assert.ok(typeof item[field] === "string" && item[field].trim(), `Artifact missing ${field}: ${item.title || item.unit}`);
  }
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(item.reviewDate), `Bad reviewDate: ${item.title}`);
  assert.ok(["public", "cohort"].includes(item.visibility), `Bad visibility: ${item.title}`);
  assert.ok(/^https:\/\//.test(item.url), `Artifact URL must be https: ${item.title}`);
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
