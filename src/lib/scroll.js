import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenis = null;
export function initScroll() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}
export function scrollToSel(sel) {
  const el = document.querySelector(sel);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -56, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
}
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();
