import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects } from '../data';
import { useStore, openProject, closeProject, originFor } from '../store';
import { stopScroll, startScroll } from '../lib/scroll';

const Icon = ({ d }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const ease = [0.22, 1, 0.36, 1];

function Tilt({ children, className }) {
  const ref = useRef();
  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  };
  return <figure ref={ref} className={className} onPointerMove={move} onPointerLeave={() => { ref.current.style.transform = ''; }} style={{ transition: 'transform .35s cubic-bezier(.22,1,.36,1)' }}>{children}</figure>;
}

export default function CaseStudy() {
  const slug = useStore((s) => s.open);
  const rect = useStore((s) => s.rect);
  const [shown, setShown] = useState(null); // keep content mounted while the exit animation runs
  const scroller = useRef();
  const opener = useRef(null);
  const closeBtn = useRef();

  useEffect(() => { if (slug) setShown(slug); }, [slug]);
  const p = projects.find((x) => x.slug === shown);
  const idx = p ? projects.indexOf(p) : 0;
  const open = !!slug;

  // lock page scroll, restore focus, close on Escape
  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    document.body.classList.add('locked'); stopScroll();
    const t = setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 450);
    const key = (e) => {
      if (e.key === 'Escape') closeProject();
      if (e.key === 'Tab') { // keep focus inside the dialog
        const f = scroller.current?.parentElement.querySelectorAll('button, a[href]');
        if (!f || !f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    addEventListener('keydown', key);
    return () => {
      clearTimeout(t); removeEventListener('keydown', key);
      document.body.classList.remove('locked'); startScroll();
      opener.current?.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => { scroller.current?.scrollTo({ top: 0 }); }, [slug]);

  const go = (d) => { const next = projects[(idx + d + projects.length) % projects.length]; openProject(next.slug); };
  const full = { top: 0, left: 0, width: '100vw', height: '100dvh', borderRadius: 0 };
  const from = rect ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 22 } : full;

  return (
    <AnimatePresence onExitComplete={() => setShown(null)}>
      {open && p && (
        <>
          <motion.div
            key="scrim"
            style={{ position: 'fixed', inset: 0, zIndex: 69, background: 'rgba(0,0,0,.75)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            onClick={closeProject}
          />
          <motion.div
            key="shell"
            className="cs-shell"
            style={{ '--a': p.accent }}
            role="dialog" aria-modal="true" aria-label={`${p.title} case study`}
            initial={from}
            animate={{ ...full, transition: { duration: 0.65, ease } }}
            exit={{ ...(rect ? { top: rect.top, left: rect.left, width: rect.width, height: rect.height, borderRadius: 22 } : { opacity: 0 }), transition: { duration: 0.5, ease } }}
          >
            <div className="cs-scroll" ref={scroller} data-lenis-prevent>
              <div className="cs-bar">
                <button className="round" ref={closeBtn} onClick={closeProject} aria-label="Close case study"><Icon d="M18 6 6 18M6 6l12 12" /></button>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="round" onClick={() => go(-1)} aria-label="Previous project"><Icon d="M19 12H5M11 6l-6 6 6 6" /></button>
                  <button className="round" onClick={() => go(1)} aria-label="Next project"><Icon d="M5 12h14M13 6l6 6-6 6" /></button>
                </div>
              </div>

              <div className="cs-hero">
                <motion.img
                  key={p.slug}
                  src={p.image.cover.src} alt={`${p.title} screenshot`} width="1600" height="1000"
                  initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease }}
                />
              </div>

              <motion.div
                className="cs-body" key={p.slug + '-b'}
                initial="h" animate="s"
                variants={{ s: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } } }}
              >
                {[
                  <div className="cs-title" key="t">
                    <div className="k">{p.kicker} · {p.year}</div>
                    <h2>{p.title}</h2>
                    <p className="lead">{p.summary}</p>
                  </div>,
                  <div className="proof" key="pr">
                    {p.proof.map((x) => <div key={x.l}><b>{x.v}</b><span>{x.l}</span></div>)}
                  </div>,
                  <div className="story" key="st"><p>{p.story}</p></div>,
                  <div className="cols" key="c">
                    <div className="block"><h3>What it does</h3><ul>{p.does.map((x) => <li key={x}>{x}</li>)}</ul></div>
                    <div className="block"><h3>How it’s built</h3><ul>{p.built.map((x) => <li key={x}>{x}</li>)}</ul></div>
                  </div>,
                  <div className="tags" key="tg" style={{ marginTop: 28 }}>{p.stack.map((t) => <span key={t}>{t}</span>)}</div>,
                ].map((n, i) => (
                  <motion.div key={i} variants={{ h: { opacity: 0, y: 28 }, s: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}>{n}</motion.div>
                ))}

                {(() => {
                  const wide = p.image.shots.filter((x) => !x.portrait);
                  const tall = [...p.image.shots.filter((x) => x.portrait), ...(p.image.phone ? [p.image.phone] : [])];
                  return (
                    <>
                      {wide.length > 0 && (
                        <div className="gallery">
                          {wide.map((x, i) => (
                            <Tilt key={x.src} className="">
                              <img src={x.src} alt={`${p.title} screen ${i + 1}`} width={x.w} height={x.h} loading="lazy" decoding="async" />
                            </Tilt>
                          ))}
                        </div>
                      )}
                      {tall.length > 0 && (
                        <div className="phones">
                          {tall.map((x, i) => (
                            <Tilt key={x.src} className="phone-wrap">
                              <div className="phone"><img src={x.src} alt={`${p.title} on a phone, view ${i + 1}`} width={x.w} height={x.h} loading="lazy" decoding="async" /></div>
                            </Tilt>
                          ))}
                        </div>
                      )}
                    </>
                  );
                })()}
                {p.note && <p className="note">{p.note}</p>}

                <div className="cs-links">
                  {p.repo
                    ? <a className="cta" href={p.repo} target="_blank" rel="noopener noreferrer">View on GitHub <Icon d="M7 17 17 7M8 7h9v9" /></a>
                    : <span className="note" style={{ margin: 0 }}>Source is in a private repository. Happy to walk through it.</span>}
                </div>

                <nav className="cs-nav" aria-label="More projects">
                  <button onClick={() => go(-1)}><small>Previous</small><b>{projects[(idx + projects.length - 1) % projects.length].title}</b></button>
                  <button onClick={() => go(1)}><small>Next</small><b>{projects[(idx + 1) % projects.length].title}</b></button>
                </nav>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
