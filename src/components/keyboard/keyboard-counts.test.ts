import { strict as assert } from "node:assert";
import { test } from "node:test";
import { createKeyInput } from "./input";
import type { KeyboardKey } from "./scene";
import { keyWear, mergeKeyboardCounts } from "./wear";

test("stale snapshots and out-of-order broadcasts cannot reduce lifetime totals", () => {
  const skills = new Set(["react", "js"]);
  let counts = mergeKeyboardCounts({}, { react: 42, js: 10 }, skills);
  counts = mergeKeyboardCounts(counts, { react: 44 }, skills);
  counts = mergeKeyboardCounts(counts, { react: 43, js: 10 }, skills);
  assert.deepEqual(counts, { react: 44, js: 10 });
  assert.equal(mergeKeyboardCounts(counts, { react: -1, js: NaN, unknown: 900 }, skills), counts);
});

test("a click on an already hovered key counts once and releases independently", () => {
  const input = createKeyInput([{ nodeId: "react", skill: { shortcut: "KeyR" } } as KeyboardKey]);
  const transitions: boolean[] = [];
  input.subscribe((_key, pressed) => transitions.push(pressed));
  assert.equal(input.press("hover", "react"), true);
  assert.equal(input.press("pointer:1", "react"), true);
  assert.equal(input.press("pointer:1", "react"), false);
  input.release("pointer:1");
  assert.deepEqual(transitions, [true]);
  input.release("hover");
  assert.deepEqual(transitions, [true, false]);
  assert.equal(input.press("pointer:1", "missing"), false);
});

test("wear remains bounded and grows independently with each key's lifetime count", () => {
  const fresh = keyWear(0);
  const used = keyWear(1_000);
  const old = keyWear(Number.MAX_SAFE_INTEGER);
  assert.equal(fresh.roughness, 0.34);
  assert.ok(used.roughness < fresh.roughness && old.roughness < used.roughness);
  assert.ok(old.roughness >= 0.12);
  assert.deepEqual(keyWear(-1), fresh);
  assert.deepEqual(keyWear(NaN), fresh);
});

test("hover, touch and keyboard count only new visual presses", () => {
  const input = createKeyInput(["react", "js"].map(nodeId => ({ nodeId, skill: {} }) as KeyboardKey));
  const presses: string[] = [];
  input.subscribe((key, pressed) => { if (pressed) presses.push(key.nodeId); });
  input.press("hover", "react");
  input.press("pointer:1", "react");
  input.press("key:KeyR", "react");
  assert.deepEqual(presses, ["react"]);
  input.releaseAll();
  assert.deepEqual(presses, ["react"]);
  input.press("hover", "react");
  input.press("hover", "js");
  input.releaseAll();
  input.press("pointer:2", "js");
  input.releaseAll();
  input.press("key:KeyR", "react");
  input.press("key:KeyR", "react");
  assert.deepEqual(presses, ["react", "react", "js", "js", "react"]);
});
