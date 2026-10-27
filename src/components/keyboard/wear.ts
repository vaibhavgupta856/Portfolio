/** A key reaches half its wear at 1,000 presses and approaches its cap slowly. */
export function keyWear(count: number) {
  const presses = Number.isFinite(count) ? Math.max(0, count) : 0;
  const wear = presses / (presses + 1_000);
  return {
    roughness: 0.34 - wear * 0.22,
  };
}

export function mergeKeyboardCounts(previous: Record<string, number>, incoming: Record<string, unknown>, skills: ReadonlySet<string>) {
  let next = previous;
  for (const [skill, count] of Object.entries(incoming)) {
    if (!skills.has(skill) || typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) continue;
    if (count <= (previous[skill] ?? -1)) continue;
    if (next === previous) next = { ...previous };
    next[skill] = count;
  }
  return next;
}
