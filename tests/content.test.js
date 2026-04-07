import test from "node:test";
import assert from "node:assert/strict";
import profile from "../src/content/profile.json" with { type: "json" };
import projects from "../src/content/projects.json" with { type: "json" };

test("profile content has required fields", () => {
  assert.equal(typeof profile.name, "string");
  assert.ok(profile.name.length > 0);
  assert.ok(Array.isArray(profile.roles) && profile.roles.length > 0);
  assert.ok(Array.isArray(profile.emails) && profile.emails.length > 0);
  assert.equal(typeof profile.phone, "string");
  assert.equal(typeof profile.location, "string");
  assert.equal(typeof profile.socials.github, "string");
  assert.equal(typeof profile.socials.linkedin, "string");
  assert.equal(typeof profile.socials.canvaProjects, "string");
});

test("projects have unique ids and essential fields", () => {
  assert.ok(Array.isArray(projects) && projects.length >= 5);

  const ids = new Set();
  for (const p of projects) {
    assert.equal(typeof p.id, "string");
    assert.ok(p.id.length > 0);
    assert.ok(!ids.has(p.id));
    ids.add(p.id);

    assert.equal(typeof p.title, "string");
    assert.ok(Array.isArray(p.roles) && p.roles.length > 0);
    assert.ok(Array.isArray(p.tools) && p.tools.length > 0);
    assert.ok(Array.isArray(p.tags) && p.tags.length > 0);
    assert.ok(Array.isArray(p.responsibilities) && p.responsibilities.length > 0);
    assert.ok(Array.isArray(p.outcomes) && p.outcomes.length > 0);

    assert.equal(typeof p.writeup, "string");
    assert.ok(p.writeup.length > 0);
    assert.equal(typeof p.source?.url, "string");
    assert.ok(p.source.url.startsWith("https://"));
  }
});

