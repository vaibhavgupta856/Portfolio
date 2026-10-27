import gsap from "gsap";
import type { ChibiSceneApi } from "@chibi3d/runtime";
import { COUNTER_WIDTH, counterDigits, type CounterModel } from "./counter-model";

export function createCounterMotion(api: ChibiSceneApi, model: CounterModel, onActivity: () => void) {
  let previous = "";
  const rolls = model.slots.map(() => ({ angle: 0 }));
  const show = (index: number, character: string) => {
    model.slots[index].symbols.forEach((id, symbol) => api.setNodeVisible(id, symbol === (character === "-" ? 10 : Number(character))));
  };
  return {
    update(total: number, available: boolean) {
      const digits = counterDigits(total, available);
      const animate = previous.length === digits.length && !previous.includes("-") && available
        && !document.hidden && !matchMedia("(prefers-reduced-motion: reduce)").matches;
      model.slots.forEach((slot, index) => {
        api.setNodeVisible(slot.id, index < digits.length);
        if (index >= digits.length) return;
        const pitch = COUNTER_WIDTH / digits.length;
        api.setNodeTransform(slot.id, { position: [(index - (digits.length - 1) / 2) * pitch, 0, 0], scale: [pitch, 1, 1] });
        if (digits[index] === previous[index]) return;
        const roll = rolls[index];
        gsap.killTweensOf(roll);
        if (!animate) {
          roll.angle = 0;
          show(index, digits[index]);
          api.setNodeTransform(slot.drumId, { rotation: [0, 0, 0] });
          return;
        }
        show(index, digits[index]);
        roll.angle = -Math.PI / 2;
        gsap.to(roll, { angle: 0, duration: 0.16, ease: "power2.out", onUpdate: () => {
          api.setNodeTransform(slot.drumId, { rotation: [roll.angle, 0, 0] });
          onActivity();
        } });
      });
      previous = digits;
      onActivity();
    },
    dispose() { rolls.forEach(roll => gsap.killTweensOf(roll)); },
  };
}
