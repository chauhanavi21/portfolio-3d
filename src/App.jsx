import { lazy, Suspense, useEffect, useState } from 'react';
import { profile, projects, stats, skills } from './data';
import { useStore, syncFromHash } from './store';
import { ring } from './lib/ring';
import { initScroll, scrollToSel } from './lib/scroll';
import Hero from './components/Hero';
import Grid from './components/Grid';
import Reel from './components/Reel';
import CaseStudy from './components/CaseStudy';
import Reveal from './components/Reveal';

const Scene = lazy(() => import('./components/Scene'));

function webglOK() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch { return false; }
}

function Nav({ solid }) {
  return (
    <nav className={`nav ${solid ? 'solid' : ''}`} aria-label="Main">
      <a className="logo" href="#top" onClick={(e) => { e.preventDefault(); scrollToSel('#top'); }}><i>AC</i> Avi Chauhan</a>
      <div className="links">
        <button className="hide-s" onClick={() => scrollToSel('#work')}>Work</button>
        <button className="hide-s" onClick={() => scrollToSel('#about')}>About</button>
        <a className="hide-s" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <button className="cta" onClick={() => scrollToSel('#contact')}>Contact</button>
      </div>
    </nav>
  );
}

function About() {
  return (
    <section className="wrap" id="about" aria-labelledby="about-h">
      <div className="about">
        <Reveal>
          <h2 id="about-h">Software engineer, building across the stack.</h2>
          <p>I like finishing things. Each project here runs for real: it has data, sign-in, permissions and tests, and I have checked it on phone, tablet and desktop widths. I work in Java, .NET, TypeScript and Python, and I enjoy the moments where the interface, the server and the database agree with each other.</p>
          <div className="stats">
            {stats.map((s) => <div className="stat" key={s.l}><b>{s.v.toLocaleString()}</b><span>{s.l}</span></div>)}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <h3 className="skill-title">Tools I reach for</h3>
          <div className="skill-cloud">{skills.map((s) => <span key={s}>{s}</span>)}</div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="wrap contact" id="contact" aria-labelledby="contact-h">
      <Reveal>
        <h2 id="contact-h">Let’s build something good.</h2>
        <p>Open to software engineering roles and interesting projects. Email is the fastest way to reach me.</p>
        <div className="row">
          <a className="cta" href={`mailto:${profile.email}`}>{profile.email}</a>
          <a className="cta ghost" href={profile.resume} target="_blank" rel="noopener noreferrer">Resume</a>
          <a className="cta ghost" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="cta ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </Reveal>
    </section>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [solid, setSolid] = useState(false);
  const [gl] = useState(webglOK);
  const open = useStore((s) => s.open);
  const focus = useStore((s) => s.focus);

  useEffect(() => {
    initScroll();
    syncFromHash();
    addEventListener('popstate', syncFromHash);
    addEventListener('hashchange', syncFromHash);
    return () => { removeEventListener('popstate', syncFromHash); removeEventListener('hashchange', syncFromHash); };
  }, []);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = innerHeight || 800;
        ring.scroll = Math.min(1, Math.max(0, scrollY / h));
        setSolid(scrollY > 40);
      });
    };
    on();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, []);

  // no WebGL (or it failed): drop the loader straight away and show the grid
  useEffect(() => { if (!gl) setReady(true); const t = setTimeout(() => setReady(true), 6000); return () => clearTimeout(t); }, [gl]);

  const accent = projects[focus].accent;

  return (
    <div className={gl ? '' : 'no-gl'} style={{ '--a': accent }}>
      <div className="aurora" aria-hidden="true" />
      {gl && (
        <div className="stage">
          <Suspense fallback={null}>
            <Scene onReady={() => setReady(true)} active={!open} />
          </Suspense>
        </div>
      )}
      <div className="grain" aria-hidden="true" />
      <div className={`loader ${ready ? 'done' : ''}`} role="status" aria-live="polite" aria-hidden={ready}>
        <div className="loader-mark"><div className="loader-ring" /><p>Loading portfolio</p></div>
      </div>

      <Nav solid={solid} />
      <main inert={open ? '' : undefined}>
        <Hero />
        <div className="panel">
          <Grid />
          <Reel />
          <About />
          <Contact />
          <footer className="foot">© {new Date().getFullYear()} Avi Chauhan · Built with React, Three.js and Motion</footer>
        </div>
      </main>
      <CaseStudy />
    </div>
  );
}
