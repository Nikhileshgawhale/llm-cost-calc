// 3D bar carousel of monthly cost per model. Reads window.__costs and redraws on the "costs" event.
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";

const COLORS = { anthropic: "#d97757", openai: "#10a37f", google: "#4285f4", xai: "#a78bfa", deepseek: "#e5b23a" };
const wrap = document.querySelector(".hero3d");
const canvas = document.getElementById("scene");
const tip = document.getElementById("tip");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

function init() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    wrap.classList.add("no3d"); // No WebGL: hide the chart, the table still works.
    return;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  scene.add(new THREE.AmbientLight(0xffffff, 0.75));
  const sun = new THREE.DirectionalLight(0xffffff, 1.6);
  sun.position.set(5, 10, 7);
  scene.add(sun);

  const css = getComputedStyle(document.documentElement);
  const grid = new THREE.GridHelper(16, 16, css.getPropertyValue("--muted").trim(), css.getPropertyValue("--border").trim());
  grid.material.transparent = true;
  grid.material.opacity = 0.35;
  scene.add(grid);

  const carousel = new THREE.Group();
  scene.add(carousel);
  const geo = new THREE.BoxGeometry(0.55, 1, 0.55);
  geo.translate(0, 0.5, 0); // grow bars upward from the floor
  const bars = new Map(); // model id -> mesh

  function update() {
    const list = (window.__costs || []).slice().sort((a, b) => a.perMonth - b.perMonth);
    const seen = new Set();
    const vals = list.map((r) => Math.max(r.perMonth, 1e-9));
    const lo = Math.log10(Math.min(...vals)), hi = Math.log10(Math.max(...vals));
    const radius = Math.max(2.6, (list.length * 0.95) / (2 * Math.PI));
    list.forEach((r, i) => {
      seen.add(r.id);
      let bar = bars.get(r.id);
      if (!bar) {
        bar = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: COLORS[r.provider] || "#888", roughness: 0.35, metalness: 0.15 }));
        bar.scale.y = 0.01;
        carousel.add(bar);
        bars.set(r.id, bar);
      }
      // Log scale so cheap and expensive models are both visible.
      const t = hi > lo ? (Math.log10(vals[i]) - lo) / (hi - lo) : 0.5;
      const a = (i / list.length) * Math.PI * 2;
      bar.userData = { row: r, targetH: 0.25 + t * 4.2, tx: Math.sin(a) * radius, tz: Math.cos(a) * radius };
      if (bar.position.lengthSq() === 0) bar.position.set(bar.userData.tx, 0, bar.userData.tz);
    });
    for (const [id, bar] of bars) if (!seen.has(id)) { carousel.remove(bar); bar.material.dispose(); bars.delete(id); }

    const legend = document.getElementById("legend");
    const providers = [...new Set(list.map((r) => r.provider))];
    legend.innerHTML = providers.map((p) => `<span><i style="background:${COLORS[p]}"></i>${window.PRICING.providers[p].name}</span>`).join("");
  }

  function resize() {
    const w = wrap.clientWidth, h = wrap.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const dist = camera.aspect < 1.4 ? 15 : 11.5;
    camera.position.set(0, dist * 0.45, dist);
    camera.lookAt(0, 1.6, 0);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(wrap);
  resize();

  // Drag to rotate; hover to see the model and cost.
  let dragging = false, lastX = 0, spin = 0;
  const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
  canvas.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener("pointerup", () => { dragging = false; });
  canvas.addEventListener("pointerleave", () => tip.classList.remove("show"));
  canvas.addEventListener("pointermove", (e) => {
    if (dragging) { spin = (e.clientX - lastX) * 0.01; carousel.rotation.y += spin; lastX = e.clientX; }
    const rect = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects([...bars.values()])[0];
    if (hit) {
      const r = hit.object.userData.row;
      tip.textContent = `${r.name}: ${window.fmtMoney(r.perMonth)}/mo`;
      tip.style.left = Math.min(e.clientX - rect.left + 12, rect.width - tip.offsetWidth - 8) + "px";
      tip.style.top = e.clientY - rect.top - 30 + "px";
      tip.classList.add("show");
    } else tip.classList.remove("show");
  });

  window.addEventListener("costs", update);
  update();

  (function loop() {
    requestAnimationFrame(loop);
    if (document.hidden) return;
    if (!dragging) {
      spin *= 0.95;
      carousel.rotation.y += reduceMotion ? spin : 0.003 + spin;
    }
    for (const bar of bars.values()) {
      const d = bar.userData;
      bar.scale.y += (d.targetH - bar.scale.y) * 0.12;
      bar.position.x += (d.tx - bar.position.x) * 0.12;
      bar.position.z += (d.tz - bar.position.z) * 0.12;
    }
    renderer.render(scene, camera);
  })();
}

init();
