import * as THREE from "three";
import { buildArena, loadArena } from "./arena";
import { Horde, loadCharacters } from "./characters";
import { buildWorld } from "./world";
import { ZOMBIES } from "../protocol";

const WANDERERS = Array.from({ length: 9 }, (_, i) => ({
  type: i % 5 === 4 ? 2 : i % 3 === 2 ? 1 : 0,
  cx: Math.cos(i * 2.4) * (6 + (i % 3) * 4),
  cz: Math.sin(i * 2.4) * (6 + (i % 3) * 4),
  r: 2.5 + (i % 4),
  speed: (i % 3 === 2 ? 1.6 : 0.8) * (i % 2 ? 1 : -1),
  phase: i * 1.7,
}));

// room-picker scenery: arena + idle horde, orbiting camera, no networking
export class ArenaBackdrop {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(45, 1, 0.5, 120);
  private resizer: ResizeObserver;
  private horde: Horde | null = null;
  private disposed = false;
  private raf = 0;
  private last = 0;
  private time = 0;

  constructor(
    private canvas: HTMLCanvasElement,
    private opts: { maxDpr: number; shadows: boolean; still: boolean; onReady: () => void },
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "low-power" });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.maxDpr));
    this.renderer.shadowMap.enabled = opts.shadows;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.toneMapping = THREE.LinearToneMapping;
    const { sun } = buildWorld(this.scene, opts.shadows);
    sun.position.set(8, 22, 6);

    this.resizer = new ResizeObserver(this.resize);
    this.resizer.observe(canvas.parentElement ?? canvas);
    this.resize();

    Promise.all([loadCharacters(), loadArena()]).then(([chars, arena]) => {
      if (this.disposed) return;
      this.scene.add(buildArena(arena));
      this.horde = new Horde(this.scene, chars, WANDERERS.length);
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
      opts.onReady();
    }).catch((error) => {
      // plain background is an acceptable fallback
      if (!this.disposed) console.warn("Game backdrop unavailable:", error);
    });
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.resizer.disconnect();
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      mesh.geometry?.dispose();
      const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
      for (const m of Array.isArray(mat) ? mat : mat ? [mat] : []) {
        (m as THREE.MeshBasicMaterial).map?.dispose();
        m.dispose();
      }
    });
    this.renderer.dispose();
  }

  private resize = () => {
    const el = this.canvas.parentElement ?? this.canvas;
    const w = el.clientWidth || 1;
    const h = el.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.opts.still && this.horde) this.render();
  };

  private frame = (t: number) => {
    if (!this.opts.still) this.raf = requestAnimationFrame(this.frame);
    this.time += Math.min(0.05, (t - this.last) / 1000);
    this.last = t;
    this.render();
  };

  private render() {
    const t = this.opts.still ? 4 : this.time;
    const orbit = t * 0.04;
    const dist = this.camera.aspect < 1 ? 40 : 30;
    this.camera.position.set(Math.cos(orbit) * dist, 17, Math.sin(orbit) * dist);
    this.camera.lookAt(0, 0, 0);

    const horde = this.horde;
    if (horde) {
      horde.begin();
      WANDERERS.forEach((z, id) => {
        const a = z.phase + (t * z.speed) / z.r;
        const facing = a + (z.speed > 0 ? Math.PI / 2 : -Math.PI / 2);
        horde.add(z.type, id, z.cx + Math.cos(a) * z.r, z.cz + Math.sin(a) * z.r, facing, ZOMBIES[z.type].scale, 0, t);
      });
      horde.end();
    }
    this.renderer.render(this.scene, this.camera);
  }
}
