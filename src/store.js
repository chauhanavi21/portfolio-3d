import { create } from 'zustand';
import { projects } from './data';

export const useStore = create(() => ({ open: null, rect: null, focus: 0, filter: 'All', webgl: true }));

const valid = (slug) => projects.some((p) => p.slug === slug);

/** Where on screen the case study should grow from / shrink back to. */
export function originFor(slug) {
  const vw = window.innerWidth, vh = window.innerHeight;
  const el = document.querySelector(`[data-card="${slug}"]`);
  if (el) {
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < vh) return { top: r.top, left: r.left, width: r.width, height: r.height };
  }
  const w = Math.min(vw * 0.5, 520), h = w * 0.62; // otherwise: from the middle, where the 3D card sits
  return { top: vh * 0.55 - h / 2, left: vw / 2 - w / 2, width: w, height: h };
}

export function openProject(slug, replace = false) {
  if (!valid(slug)) return;
  const first = useStore.getState().open == null;
  useStore.setState({ open: slug, rect: first ? originFor(slug) : useStore.getState().rect });
  const url = `#/p/${slug}`;
  if (replace || !first) history.replaceState({ p: slug }, '', url);
  else history.pushState({ p: slug }, '', url);
}

export function closeProject() {
  if (history.state && history.state.p) history.back();
  else { useStore.setState({ open: null }); history.replaceState(null, '', location.pathname + location.search); }
}

export function syncFromHash() {
  const m = location.hash.match(/^#\/p\/([\w-]+)$/);
  const slug = m && valid(m[1]) ? m[1] : null;
  if (slug !== useStore.getState().open) useStore.setState({ open: slug, rect: slug ? originFor(slug) : useStore.getState().rect });
}
