import { projects } from '../data';

export const N = projects.length;
export const STEP = (Math.PI * 2) / N;
const TAU = Math.PI * 2;
export const mod = (a, n) => ((a % n) + n) % n;

/*
 * Mutable state shared between the DOM (drag, buttons, keys) and the WebGL loop. It is not React state because it
 * changes every frame; React only hears about the front card through the zustand `focus` value.
 */
export const ring = {
  rot: 0,        // current angle in radians
  vel: 0,        // radians per second, from a flick
  target: null,  // angle we are easing towards (a button press or a settle)
  dragging: false,
  moved: false,  // true once a pointer gesture became a drag, so the release is not treated as a click
  snap: false,   // settle on the nearest card once a flick slows down
  touched: false,// the visitor has interacted: stop the idle spin for good
  hover: false,
  idleAt: 0,
  scroll: 0,     // 0..1 progress through the hero, drives the camera
};

// Raycast helper, installed by the scene once it exists. Returns the card index under a screen point, or -1.
export const picker = { pick: () => -1 };

export function goto(i) {
  const d = mod(i * STEP - ring.rot + Math.PI, TAU) - Math.PI; // the short way round
  ring.target = ring.rot + d;
  ring.vel = 0;
  ring.snap = false;
  ring.touched = true;
}
export const frontIndex = () => mod(Math.round(ring.rot / STEP), N);
export const nudge = (dir) => goto(mod(frontIndex() + dir, N));

export function updateRing(dt, reduced) {
  if (ring.dragging) return;

  if (ring.target != null) {
    ring.rot += (ring.target - ring.rot) * (1 - Math.exp(-7 * dt));
    if (Math.abs(ring.target - ring.rot) < 0.0005) { ring.rot = ring.target; ring.target = null; }
    return;
  }

  if (Math.abs(ring.vel) > 0.9) { // coast after a flick
    ring.rot += ring.vel * dt;
    ring.vel *= Math.exp(-3 * dt);
    return;
  }

  if (ring.snap) { // slowed down (or released without a flick): ease onto the nearest card
    ring.target = Math.round((ring.rot + ring.vel * 0.3) / STEP) * STEP;
    ring.vel = 0;
    ring.snap = false;
    return;
  }

  if (!reduced && !ring.touched && !ring.hover && ring.scroll < 0.3) ring.rot += 0.085 * dt; // gentle idle spin until the first touch
}
