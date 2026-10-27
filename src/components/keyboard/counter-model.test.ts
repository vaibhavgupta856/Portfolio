import { strict as assert } from "node:assert";
import { test } from "node:test";
import { createDocument, newId } from "@chibi3d/runtime/schema";
import { addCounterModel, counterDigits, COUNTER_SLOTS } from "./counter-model";

test("counter carries across every digit and never truncates lifetime totals", () => {
  assert.equal(counterDigits(9_999, true), "009999");
  assert.equal(counterDigits(10_000, true), "010000");
  assert.equal(counterDigits(1_000_000, true), "1000000");
  assert.equal(counterDigits(Number.MAX_SAFE_INTEGER, true).length, COUNTER_SLOTS);
  assert.equal(counterDigits(0, true), "000000");
  assert.equal(counterDigits(23_313, false), "------");
});

test("counter geometry stays under the keyboard layout and shares digit textures", () => {
  const doc = createDocument("Counter test");
  const parent = newId("nd");
  doc.nodes[parent] = { id: parent, type: "group", name: "Keyboard layout", visible: true,
    transform: { position: [0, 0, 0], rotation: [0, 0, 0], scale: [1, 1, 1] }, children: [] };
  const model = addCounterModel(doc, parent, [-3.6, 0.775, -0.3]);
  const descendants = new Set<string>();
  const visit = (id: string) => { descendants.add(id); doc.nodes[id].children.forEach(visit); };
  visit(parent);
  assert.equal(model.slots.length, COUNTER_SLOTS);
  for (const slot of model.slots) {
    assert.ok(descendants.has(slot.id));
    assert.ok(descendants.has(slot.drumId));
    assert.equal(slot.symbols.length, 11);
    slot.symbols.forEach(id => assert.ok(descendants.has(id)));
  }
  assert.equal(Object.values(doc.assets).filter(asset => asset.hash.startsWith("Counter symbol")).length, 11);
});
