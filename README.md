# Avi Chauhan: 3D portfolio

An interactive portfolio where the projects live on a rotating 3D ring. Drag it, flick it, or use the arrow keys; click the front card and a case study grows out of it with the story, what it does, how it is built, measured numbers and screenshots.

Thirteen projects: SaaS and clinic back-ends in .NET, Java relief and repair systems, three storefronts, a Three.js product page, an AI-agent platform, a from-scratch agent, a browser handwriting model and the earlier 2D portfolio.

## Run it

Needs Node 20+.

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build
```

Deep links work: `/#/p/halo` opens the HALO case study directly.

## How it works

| Piece | What it does |
| --- | --- |
| `src/components/Scene.jsx` | React Three Fiber scene: ring of image cards, floor glow, torus knot and wireframe, stars, offline studio lighting. |
| `src/lib/ring.js` | Ring physics shared between the DOM and WebGL: drag, flick momentum, snap to the nearest card, idle spin. Plain mutable state, not React state, because it changes every frame. |
| `src/components/Hero.jsx` | Pointer, touch, wheel and keyboard controls. A horizontal swipe spins the ring; a vertical swipe still scrolls the page. Taps are resolved with a raycast. |
| `src/components/CaseStudy.jsx` | Shared-element transition: the dialog grows from the card's screen rectangle and shrinks back. Escape, the browser Back button and focus return all work. |
| `src/components/Grid.jsx` | All projects as tilting 3D cards with an animated category filter. |
| `src/data.js` | Every word of project copy. Add or edit a project here. |
| `scripts/prepare-images.mjs` | Turns screenshots into optimised WebP and writes `src/images.json`. It reads from my local project folders, so it only runs on my machine; the generated images are committed, so you do not need it to run the site. |

## Adding or changing a project

1. Add an entry to `raw` in `src/data.js` (slug, title, summary, story, does, built, stack, proof).
2. Put its images in `public/projects/<slug>/` (`cover.webp`, `thumb.webp`, optional `shot-N.webp` and `phone.webp`) and list them in `src/images.json`.
3. Run `npm run dev`.

`proof` should only hold numbers that are measured or counted, such as tests passing or items in a seed file.

## Accessibility and devices

- Layouts checked from 320 px to 1920 px, in portrait and landscape.
- `prefers-reduced-motion` stops the idle spin, floating shapes, parallax, smooth scrolling and page transitions.
- Previous and next buttons and the arrow keys do everything dragging does.
- The case study is a modal dialog: focus moves in, is trapped while open, and returns to the card on close. The page behind it is inert.
- If WebGL is unavailable the 3D layer is skipped and the project grid still works.
- 3D rendering lowers its pixel ratio automatically on slow devices.

## Honest notes about the images

Most images are the screenshots already stored in each project. Four projects had none, so I captured them from the running apps: the Company Map, HALO, InkComplete and SaasPlatform. SaasPlatform was captured against a throwaway database with a fictional company. Clinic Management and AgentForge have no UI, so their covers are real terminal output (a passing test run and a real company run), rendered as images and labelled as such on the page.

## Left out on purpose

Anything submitted to IBM, and plan-only or scaffold-only folders (`repostr`, `database-engine`, `fleet-dispatch`, `learning-platform`).

## Stack

React 19, Vite, Three.js with React Three Fiber and drei, Motion, Lenis smooth scroll, Zustand.
