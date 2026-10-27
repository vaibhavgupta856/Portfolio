import { strict as assert } from "node:assert";
import { test } from "node:test";
import type { EditableMeshGeometry } from "@chibi3d/runtime/schema";
import { createKeyWell } from "./key-well";

function bounds(mesh: EditableMeshGeometry, axis: number) {
  const values = mesh.positions.filter((_, index) => index % 3 === axis);
  return [Math.min(...values), Math.max(...values)];
}

test("the recessed case retains its original height across keyboard layouts", () => {
  for (const cols of [1, 6, 12]) for (const rows of [1, 4, 8]) {
    const width = (cols - 1) * 1.04468 + 1;
    const depth = (rows - 1) * 1.04468 + 1;
    const outerX = 3.67448 + (cols - 6) * 1.04468 / 2;
    const outerZ = 2.57744 + (rows - 4) * 1.04468 / 2;
    const well = createKeyWell(outerX, outerZ, width, depth);
    for (const mesh of [well.edge, well.shelf, well.body, well.plate]) {
      const [bottom, top] = bounds(mesh, 1);
      assert.ok(bottom >= 0 && top <= 0.77, "no additional frame above the original case");
      assert.ok(mesh.positions.every(Number.isFinite));
      assert.ok(mesh.faces.every(face => face.length >= 3 && face.every(index => index < mesh.positions.length / 3)));
    }
    assert.deepEqual(bounds(well.plate, 1), [0.6, 0.6]);
    assert.ok(bounds(well.plate, 0)[1] > width / 2);
    assert.ok(bounds(well.plate, 2)[1] > depth / 2);
  }
});

test("the original-width case joins meet without gaps", () => {
  const well = createKeyWell(3.67448, 2.57744, 6.2234, 4.13404);
  const edgeRight = bounds(well.edge, 0)[1];
  const [shelfLeft, shelfRight] = bounds(well.shelf, 0);
  const bodyLeft = bounds(well.body, 0)[0];
  assert.ok(Math.abs(edgeRight - (well.shelfCenter + shelfLeft)) < 1e-12);
  assert.ok(Math.abs(well.shelfCenter + shelfRight - bodyLeft) < 1e-12);
});
