import { createMaterial, newId, type ChibiDocument, type ChibiNode, type Vec3 } from "@chibi3d/runtime/schema";

const SYMBOLS = "0123456789-";
export const COUNTER_WIDTH = 2.65;
export const COUNTER_SLOTS = 16;
export type CounterModel = {
  slots: { id: string; drumId: string; symbols: string[] }[];
};

export function counterDigits(total: number, available: boolean) {
  return available && Number.isSafeInteger(total) && total >= 0
    ? String(total).padStart(6, "0") : "------";
}

export function addCounterModel(doc: ChibiDocument, parent: string, position: Vec3): CounterModel {
  const add = (node: ChibiNode, parentId: string) => {
    doc.nodes[node.id] = node;
    doc.nodes[parentId].children.push(node.id);
    return node.id;
  };
  const transform = (position: Vec3 = [0, 0, 0]) => ({ position, rotation: [0, 0, 0] as Vec3, scale: [1, 1, 1] as Vec3 });
  const group = (name: string, parentId: string, position?: Vec3) => add({
    id: newId("nd"), name, type: "group", transform: transform(position), children: [], visible: true,
  }, parentId);
  const material = (name: string, color: string, roughness = 0.6) => {
    const id = newId("mt");
    doc.materials[id] = { ...createMaterial(id, name), color, roughness };
    return id;
  };
  const artwork = (name: string, svg: string) => {
    const assetId = newId("as");
    doc.assets[assetId] = { id: assetId, kind: "texture", name: `data:image/svg+xml,${encodeURIComponent(svg)}`, hash: name, size: 0 };
    const id = material(name, "#ffffff");
    doc.materials[id].transparent = true;
    doc.materials[id].maps.map = assetId;
    return id;
  };
  const box = (name: string, parentId: string, materialId: string, position: Vec3, size: Vec3) => add({
    id: newId("nd"), name, type: "mesh", materialId, visible: true, children: [],
    geometry: { kind: "box", params: { width: size[0], height: size[1], depth: size[2] } },
    transform: transform(position), castShadow: true, receiveShadow: true,
  }, parentId);
  const plane = (name: string, parentId: string, materialId: string, width: number, height: number, position: Vec3) => add({
    id: newId("nd"), name, type: "mesh", materialId, visible: true, children: [],
    geometry: { kind: "plane", params: { width, height } },
    transform: transform(position), castShadow: false, receiveShadow: false,
  }, parentId);

  const root = group("Embedded press counter", parent, position);
  doc.nodes[root].transform.rotation = [0, -Math.PI / 2, 0];
  doc.nodes[root].transform.scale = [1, 0.8, 1];
  const rim = material("Counter bezel", "#343638", 0.46);
  const inset = material("Counter recess", "#070809", 0.8);
  const drum = material("Counter drums", "#161819", 0.46);
  box("Counter well", root, inset, [0, 0, 0.012], [2.79, 0.58, 0.024]);
  for (const y of [-0.3, 0.3]) box("Counter rim", root, rim, [0, y, 0.035], [2.89, 0.045, 0.07]);
  for (const x of [-1.425, 1.425]) box("Counter rim", root, rim, [x, 0, 0.035], [0.045, 0.6, 0.07]);

  const symbolMaterials = [...SYMBOLS].map(symbol => {
    const id = artwork(`Counter symbol ${symbol}`,
      `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="160" viewBox="0 0 128 160"><text x="64" y="119" text-anchor="middle" fill="#eee3c9" font-family="monospace" font-size="126">${symbol}</text></svg>`);
    doc.materials[id].emissive = "#e8dfcd";
    doc.materials[id].emissiveIntensity = 0.2;
    return id;
  });
  const slots = Array.from({ length: COUNTER_SLOTS }, (_, index) => {
    const id = group(`Counter digit ${index}`, root);
    doc.nodes[id].visible = false;
    box("Digit window", id, drum, [0, 0, 0.025], [0.94, 0.48, 0.024]);
    const drumId = group("Digit roll", id, [0, 0, 0.042]);
    const symbols = symbolMaterials.map((materialId, index) => {
      const symbolId = plane(`Digit ${SYMBOLS[index]}`, drumId, materialId, 0.78, 0.4, [0, 0, 0]);
      doc.nodes[symbolId].visible = false;
      return symbolId;
    });
    box("Drum seam", id, inset, [0, 0, 0.05], [0.94, 0.009, 0.005]);
    return { id, drumId, symbols };
  });
  return { slots };
}
