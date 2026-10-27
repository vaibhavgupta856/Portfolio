import type { EditableMeshGeometry, Vec3 } from "@chibi3d/runtime/schema";

type Contour = { halfWidth: number; halfDepth: number; radius: number; y: number };
const CORNER_SEGMENTS = 16;

function roundedContour({ halfWidth, halfDepth, radius, y }: Contour): number[] {
  const positions: number[] = [];
  for (let corner = 0; corner < 4; corner++) {
    const angle = corner * Math.PI / 2;
    const cx = (corner === 0 || corner === 3 ? 1 : -1) * (halfWidth - radius);
    const cz = (corner < 2 ? 1 : -1) * (halfDepth - radius);
    for (let step = 0; step <= CORNER_SEGMENTS; step++) {
      const theta = angle + step / CORNER_SEGMENTS * Math.PI / 2;
      positions.push(cx + Math.cos(theta) * radius, y, cz + Math.sin(theta) * radius);
    }
  }
  return positions;
}

export function createKeyWell(outerX: number, outerZ: number, keysWidth: number, keysDepth: number) {
  // Keep the opening clear of the full keycap skirt throughout its press travel.
  const opening = { halfWidth: keysWidth / 2 + 0.07, halfDepth: keysDepth / 2 + 0.07, radius: 0.12 };
  const profiles: Contour[] = [
    { halfWidth: outerX - 0.08, halfDepth: outerZ - 0.08, radius: 0.26, y: 0 },
    { halfWidth: outerX, halfDepth: outerZ, radius: 0.34, y: 0.08 },
    { halfWidth: outerX, halfDepth: outerZ, radius: 0.34, y: 0.65 },
    { halfWidth: outerX - 0.018, halfDepth: outerZ - 0.018, radius: 0.322, y: 0.73 },
    { halfWidth: outerX - 0.055, halfDepth: outerZ - 0.055, radius: 0.285, y: 0.77 },
    { halfWidth: opening.halfWidth + 0.025, halfDepth: opening.halfDepth + 0.025, radius: opening.radius + 0.025, y: 0.77 },
    { ...opening, y: 0.745 },
    { ...opening, y: 0.6 },
  ];
  const positions = profiles.flatMap(roundedContour);
  const faces: number[][] = [];
  const count = (CORNER_SEGMENTS + 1) * 4;
  for (let level = 0; level < profiles.length - 1; level++) {
    for (let vertex = 0; vertex < count; vertex++) {
      const next = (vertex + 1) % count;
      faces.push([level * count + vertex, (level + 1) * count + vertex,
        (level + 1) * count + next, level * count + next]);
    }
  }
  faces.push(Array.from({ length: count }, (_, index) => index));
  const shell: EditableMeshGeometry = { kind: "editableMesh", positions, faces, subdivisions: 0, sharpEdges: [] };
  const plate: EditableMeshGeometry = {
    kind: "editableMesh",
    positions: [0, 0.6, 0, ...roundedContour({ ...opening, y: 0.6 })],
    faces: Array.from({ length: count }, (_, index) => [0, (index + 1) % count + 1, index + 1]),
    subdivisions: 0,
    sharpEdges: [],
  };
  // Only the solid shelf stretches. The opening and its inner wall stay fixed.
  const leftCut = -outerX + 0.35;
  const rightCut = -opening.halfWidth - 0.04;
  const center = (leftCut + rightCut) / 2;
  return {
    edge: sliceShell(shell, -Infinity, leftCut),
    shelf: sliceShell(shell, leftCut, rightCut, center),
    body: sliceShell(shell, rightCut, Infinity),
    shelfCenter: center,
    shelfWidth: rightCut - leftCut,
    plate,
  };
}

function sliceShell(mesh: EditableMeshGeometry, min: number, max: number, offset = 0): EditableMeshGeometry {
  const positions: number[] = [];
  const faces: number[][] = [];
  for (const face of mesh.faces) {
    let polygon = face.map(index => mesh.positions.slice(index * 3, index * 3 + 3) as Vec3);
    for (const [cut, direction] of [[min, 1], [max, -1]]) {
      if (!Number.isFinite(cut)) continue;
      const clipped: Vec3[] = [];
      for (let index = 0; index < polygon.length; index++) {
        const a = polygon[index];
        const b = polygon[(index + 1) % polygon.length];
        const insideA = (a[0] - cut) * direction >= 0;
        const insideB = (b[0] - cut) * direction >= 0;
        if (insideA) clipped.push(a);
        if (insideA !== insideB) {
          const t = (cut - a[0]) / (b[0] - a[0]);
          clipped.push([cut, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
        }
      }
      polygon = clipped;
    }
    if (polygon.length < 3) continue;
    const start = positions.length / 3;
    polygon.forEach(([x, y, z]) => positions.push(x - offset, y, z));
    faces.push(polygon.map((_, index) => start + index));
  }
  return { kind: "editableMesh", positions, faces, subdivisions: 0, sharpEdges: [] };
}
