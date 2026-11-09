import { useEffect, useRef, useState } from 'react';
import { profile, projects } from '../data';
import { ring, picker, nudge, goto, N, mod } from '../lib/ring';
import { useStore, openProject } from '../store';
import { scrollToSel } from '../lib/scroll';

const Arrow = ({ d = 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d === 'right' ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
  </svg>
);

/** Pointer drag + flick + wheel + keys, all feeding the shared ring state. */
function useRingControls(layer) {
  useEffect(() => {
    const el = layer.current;
    if (!el) return;
    let id = null, startX = 0, startY = 0, lastX = 0, lastT = 0, moved = false, vx = 0, axis = null;
    const sens = () => (Math.PI * 2) / N / Math.max(150, Math.min(innerWidth * 0.22, 300)); // radians per pixel: ~one card per swipe

    const down = (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      id = e.pointerId; startX = lastX = e.clientX; startY = e.clientY; lastT = performance.now(); moved = false; vx = 0; axis = null;
      ring.target = null; ring.snap = false; ring.vel = 0;
    };
    const move = (e) => {
      if (e.pointerId !== id) return;
      const dx = e.clientX - startX, dy = e.clientY - startY;
      if (!axis && Math.hypot(dx, dy) > 8) axis = Math.abs(dx) > Math.abs(dy) * 1.1 ? 'x' : 'y';
      if (axis === 'y') return; // let the page scroll
      if (axis === 'x') {
        if (!moved) { moved = true; ring.dragging = true; ring.moved = true; ring.touched = true; el.setPointerCapture(id); el.classList.add('grabbing'); }
        const now = performance.now(), dt = Math.max(1, now - lastT) / 1000;
        const d = -(e.clientX - lastX) * sens();
        ring.rot += d;
        vx = vx * 0.6 + (d / dt) * 0.4;
        lastX = e.clientX; lastT = now;
      }
    };
    const up = (e) => {
      if (e.pointerId !== id) return;
      const wasMoved = moved;
      id = null;
      el.classList.remove('grabbing');
      ring.dragging = false;
      if (wasMoved) {
        ring.vel = Math.max(-9, Math.min(9, vx));
        ring.snap = true;
        setTimeout(() => { ring.moved = false; }, 60);
      } else if (axis !== 'y') { // a tap: pick whichever card is under the finger
        const hit = picker.pick(e.clientX, e.clientY);
        if (hit === -1) return;
        const front = mod(Math.round(ring.rot / ((Math.PI * 2) / N)), N);
        if (hit === front) openProject(projects[hit].slug); else goto(hit);
      }
    };
    const cancel = () => { id = null; ring.dragging = false; ring.snap = true; el.classList.remove('grabbing'); };
    const hover = (e) => { if (e.pointerType === 'mouse' && id == null) { const h = picker.pick(e.clientX, e.clientY); ring.hover = h !== -1; el.style.cursor = h !== -1 ? 'pointer' : ''; } };
    const leave = () => { ring.hover = false; };
    const wheel = (e) => { // sideways trackpad swipes spin the ring; vertical wheel still scrolls the page
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.4) { e.preventDefault(); ring.touched = true; ring.target = null; ring.rot += e.deltaX * 0.0016; ring.vel = 0; ring.snap = true; }
    };
    const key = (e) => {
      if (useStore.getState().open) return;
      if (e.target.closest('input,textarea,select')) return;
      if (e.key === 'ArrowRight') { nudge(1); }
      else if (e.key === 'ArrowLeft') { nudge(-1); }
    };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointermove', hover);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', cancel);
    el.addEventListener('pointerleave', leave);
    el.addEventListener('wheel', wheel, { passive: false });
    addEventListener('keydown', key);
    return () => {
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointermove', hover);
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', cancel); el.removeEventListener('pointerleave', leave);
      el.removeEventListener('wheel', wheel); removeEventListener('keydown', key);
    };
  }, [layer]);
}

export default function Hero() {
  const layer = useRef();
  const focus = useStore((s) => s.focus);
  const p = projects[focus];
  const [hint, setHint] = useState(true);
  useRingControls(layer);

  useEffect(() => {
    const off = () => setHint(false);
    const t = setTimeout(off, 9000);
    layer.current?.addEventListener('pointerdown', off, { once: true });
    return () => clearTimeout(t);
  }, []);
  useEffect(() => { if (focus !== 0) setHint(false); }, [focus]);

  return (
    <header className="hero" id="top" style={{ '--a': p.accent }}>
      <div className="hero-top">
        <p className="eyebrow">{profile.role} · {profile.location}</p>
        <h1>
          <span>Things I’ve</span>{' '}
          <span className="grad">built.</span>
        </h1>
        <p className="tag">{profile.intro}</p>
      </div>

      <div
        ref={layer}
        className="drag-layer"
        role="group"
        aria-roledescription="carousel"
        aria-label="Project carousel. Use the previous and next buttons or the left and right arrow keys."
      />
      <div className={`hint ${hint ? '' : 'gone'}`} aria-hidden="true">
        <Arrow d="left" /> drag to spin · tap a card <Arrow />
      </div>

      <div className="hero-bottom">
        <div className="focus-card" aria-live="polite">
          <div className="k">{p.kicker}</div>
          <h2>{p.title}</h2>
          <p>{p.summary}</p>
          <button className="cta" onClick={() => openProject(p.slug)}>Open case study <Arrow /></button>
        </div>
        <div className="ring-ctl">
          <button className="round" onClick={() => nudge(-1)} aria-label="Previous project"><Arrow d="left" /></button>
          <div className="count"><b>{String(focus + 1).padStart(2, '0')}</b> / {String(N).padStart(2, '0')}</div>
          <button className="round" onClick={() => nudge(1)} aria-label="Next project"><Arrow /></button>
          <button className="round" onClick={() => scrollToSel('#work')} aria-label="Scroll to all projects" style={{ transform: 'rotate(90deg)' }}><Arrow /></button>
        </div>
      </div>
    </header>
  );
}
