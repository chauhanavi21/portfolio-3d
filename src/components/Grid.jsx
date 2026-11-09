import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects, categories } from '../data';
import { openProject } from '../store';
import Reveal from './Reveal';

/** Card that tilts in 3D toward the pointer. Touch devices skip the tilt and keep the lift on press. */
function Card({ p }) {
  const ref = useRef();
  const raf = useRef(0);
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => { if (ref.current) ref.current.style.transform = `perspective(1000px) rotateY(${x * 11}deg) rotateX(${-y * 9}deg) translateY(-6px)`; });
  };
  const reset = () => { cancelAnimationFrame(raf.current); if (ref.current) ref.current.style.transform = ''; };
  return (
    <button
      ref={ref}
      className="card"
      data-card={p.slug}
      style={{ '--a': p.accent }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      onClick={() => openProject(p.slug)}
      aria-label={`${p.title}: ${p.kicker}. Open case study`}
    >
      <div className="shot">
        <img src={p.image.cover.thumb} alt="" loading="lazy" decoding="async" width="800" height="500" />
      </div>
      <span className="arrow" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
      <div className="body">
        <div className="k">{p.kicker}</div>
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        <div className="tags">{p.stack.slice(0, 4).map((t) => <span key={t}>{t}</span>)}</div>
      </div>
    </button>
  );
}

export default function Grid() {
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? projects : projects.filter((p) => p.cats.includes(filter));
  return (
    <section className="wrap" id="work" aria-labelledby="work-h">
      <Reveal className="sec-head">
        <h2 id="work-h">Every project, up close.</h2>
        <p>Real apps I designed, built and tested. Open any card for the story, how it works, the numbers I measured and screenshots.</p>
      </Reveal>
      <div className="chips" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c} className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>
      <motion.div className="grid" layout>
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              <Card p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
