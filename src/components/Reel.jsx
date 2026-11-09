import { useMemo } from 'react';
import { projects } from '../data';
import { openProject } from '../store';
import Reveal from './Reveal';

/** Two rows of real screenshots drifting in opposite directions. Pauses on hover; static for reduced motion. */
export default function Reel() {
  const rows = useMemo(() => {
    const all = [];
    projects.forEach((p) => {
      [p.image.cover, ...p.image.shots.filter((s) => !s.portrait)].forEach((img, i) => {
        all.push({ slug: p.slug, title: p.title, accent: p.accent, src: i === 0 ? img.thumb : img.src, w: i === 0 ? 800 : img.w, h: i === 0 ? 500 : img.h, key: p.slug + i });
      });
    });
    const a = [], b = [];
    all.forEach((x, i) => (i % 2 ? b : a).push(x));
    return [a, b];
  }, []);

  return (
    <section className="reel-sec" aria-labelledby="reel-h">
      <Reveal className="wrap reel-head">
        <h2 id="reel-h">A look at the screens.</h2>
        <p>Real screenshots from every build. Tap one to open its project.</p>
      </Reveal>
      {rows.map((row, r) => (
        <div className={`reel ${r ? 'rev' : ''}`} key={r}>
          <div className="reel-track">
            {[0, 1].map((dup) => (
              <div className="reel-set" key={dup} aria-hidden={dup === 1}>
                {row.map((x) => (
                  <button
                    key={x.key + dup}
                    className="reel-item"
                    style={{ '--a': x.accent }}
                    onClick={() => openProject(x.slug)}
                    tabIndex={dup ? -1 : 0}
                    aria-label={`${x.title}: open case study`}
                  >
                    <img src={x.src} alt="" width={x.w} height={x.h} loading="lazy" decoding="async" />
                    <span>{x.title}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
