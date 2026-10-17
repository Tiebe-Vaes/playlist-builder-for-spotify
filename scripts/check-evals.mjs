// Checks evals and version consistency. Node stdlib only.
// Usage: node scripts/check-evals.mjs [tag]   e.g. node scripts/check-evals.mjs v0.1.0
import { readFileSync } from "node:fs";

const read = (path) => JSON.parse(readFileSync(path, "utf8"));
const errors = [];
const check = (ok, message) => ok || errors.push(message);

const triggers = read("evals/trigger-queries.json");
check(Array.isArray(triggers), "trigger-queries.json must be an array");
for (const [i, t] of triggers.entries()) {
  check(typeof t.query === "string" && t.query.trim(), `trigger ${i}: query must be a non-empty string`);
  check(typeof t.should_trigger === "boolean", `trigger ${i}: should_trigger must be a boolean`);
}
const queries = triggers.map((t) => t.query.toLowerCase());
check(new Set(queries).size === queries.length, "trigger queries must be unique");
const positives = triggers.filter((t) => t.should_trigger).length;
check(positives > 0 && positives < triggers.length, "trigger set needs both should and shouldn't-fire queries");

const plugin = read("plugins/playlist-builder-for-spotify/.claude-plugin/plugin.json");
const { skill_name, evals } = read("evals/evals.json");
check(skill_name === plugin.name, `evals.json skill_name "${skill_name}" must match plugin name "${plugin.name}"`);
check(Array.isArray(evals) && evals.length > 0, "evals.json needs at least one eval");
const ids = new Set();
for (const e of evals ?? []) {
  check(Number.isInteger(e.id) && !ids.has(e.id), `eval ${e.id}: id must be a unique integer`);
  ids.add(e.id);
  check(typeof e.prompt === "string" && e.prompt.trim(), `eval ${e.id}: prompt is required`);
  check(typeof e.expected_output === "string" && e.expected_output.trim(), `eval ${e.id}: expected_output is required`);
  check(Array.isArray(e.expectations) && e.expectations.length > 0, `eval ${e.id}: needs expectations`);
}

const marketplace = read(".claude-plugin/marketplace.json");
check(marketplace.metadata?.version === plugin.version,
  `marketplace version ${marketplace.metadata?.version} must match plugin.json version ${plugin.version}`);
const tag = process.argv[2];
if (tag) check(tag === `v${plugin.version}`, `tag ${tag} must match plugin.json version v${plugin.version}`);

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`✓ ${triggers.length} trigger queries, ${evals.length} flow evals, version ${plugin.version}`);
