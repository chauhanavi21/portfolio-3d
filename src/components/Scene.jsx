import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image as DreiImage, RoundedBox, Stars, Float, PerformanceMonitor, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../data';
import { STEP, ring, updateRing, picker, frontIndex } from '../lib/ring';
import { useStore } from '../store';

const CARD_W = 2.5;
const CARD_H = CARD_W * 0.625;
const R = 6.4;

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(255,255,255,0.9)');
  grad.addColorStop(0.4, 'rgba(255,255,255,0.25)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function Card({ project, i }) {
  const group = useRef();
  const img = useRef();
  const frame = useRef();
  const hit = useRef();
  const accent = useMemo(() => new THREE.Color(project.accent), [project.accent]);
  const white = useMemo(() => new THREE.Color('#ffffff'), []);
  const dim = useMemo(() => new THREE.Color('#5b6073'), []);
  const tint = useMemo(() => new THREE.Color(), []);

  useFrame((_, dt) => {
    const a = i * STEP - ring.rot;
    const g = group.current;
    g.position.set(Math.sin(a) * R, 0, Math.cos(a) * R - R);
    g.rotation.y = a;
    const front = (Math.cos(a) + 1) / 2; // 1 at the front, 0 at the back
    const f = Math.pow(front, 6);
    const s = 1 + f * 0.16;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 8, dt));
    g.position.y = Math.sin(performance.now() / 1400 + i) * 0.04 * (1 - f) + f * 0.06;
    if (img.current?.material) {
      tint.copy(dim).lerp(white, Math.min(1, 0.25 + front * 0.9));
      img.current.material.color.copy(tint);
    }
    if (frame.current) frame.current.material.emissiveIntensity = 0.1 + f * 1.1;
  });

  return (
    <group ref={group}>
      <RoundedBox ref={frame} args={[CARD_W + 0.14, CARD_H + 0.14, 0.06]} radius={0.07} smoothness={3} position={[0, 0, -0.01]}>
        <meshStandardMaterial color="#0a0a0a" emissive={accent} emissiveIntensity={0.1} metalness={0.6} roughness={0.35} />
      </RoundedBox>
      <DreiImage
        ref={img}
        url={project.image.cover.thumb}
        scale={[CARD_W, CARD_H]}
        radius={0.05}
        position={[0, 0, 0.026]}
        toneMapped={false}
        transparent
      />
      {/* generous invisible hit area so thumbs and cursors land easily */}
      <mesh ref={hit} position={[0, 0, 0.05]} userData={{ hit: i }}>
        <planeGeometry args={[CARD_W + 0.2, CARD_H + 0.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Floor({ accentRef }) {
  const glow = useMemo(glowTexture, []);
  const mat = useRef();
  useFrame(() => {
    const p = projects[frontIndex()];
    if (mat.current) mat.current.color.lerp(new THREE.Color(p.accent), 0.06);
  });
  return (
    <group position={[0, -1.35, -R]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[R - 0.04, R + 0.04, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[R * 2.6, R * 2.6]} />
        <meshBasicMaterial ref={mat} map={glow} transparent opacity={0.5} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function Shapes() {
  const reduce = useMemo(reducedMotion, []);
  const knot = useRef();
  const ico = useRef();
  useFrame((_, dt) => {
    if (reduce) return;
    if (knot.current) { knot.current.rotation.x += dt * 0.25; knot.current.rotation.y += dt * 0.32; }
    if (ico.current) { ico.current.rotation.y -= dt * 0.18; ico.current.rotation.z += dt * 0.1; }
  });
  return (
    <group position={[0, 0.2, -R]}>
      <Float speed={reduce ? 0 : 1.4} floatIntensity={reduce ? 0 : 1.2} rotationIntensity={0}>
        <mesh ref={knot} position={[0, 0.5, -0.5]} scale={0.78}>
          <torusKnotGeometry args={[1, 0.3, 200, 28]} />
          <meshStandardMaterial color="#e8e8e8" metalness={1} roughness={0.12} envMapIntensity={1.4} />
        </mesh>
      </Float>
      <mesh ref={ico} position={[0, 0.4, 0]} scale={2.1}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function Rig() {
  const { camera, size } = useThree();
  const reduce = useMemo(reducedMotion, []);
  const p = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => { p.current.x = (e.clientX / innerWidth) * 2 - 1; p.current.y = (e.clientY / innerHeight) * 2 - 1; };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, []);
  useFrame((_, dt) => {
    const aspect = size.width / size.height;
    // pull the camera back on narrow screens so a whole card always fits
    const fovY = THREE.MathUtils.degToRad(camera.fov);
    const need = (CARD_W * 1.18) / (2 * Math.tan(fovY / 2) * aspect);
    const dist = Math.max(8.6, need + 0.4);
    // portrait screens: slide the picture up so the ring sits between the headline and the project text
    const off = aspect < 0.85 ? Math.round(size.height * 0.11) : 0;
    if ((camera.view?.offsetY ?? 0) !== off || (off && camera.view?.fullHeight !== size.height)) {
      if (off) camera.setViewOffset(size.width, size.height, 0, off, size.width, size.height);
      else camera.clearViewOffset();
    }
    const px = reduce ? 0 : p.current.x * 0.55;
    const py = reduce ? 0 : p.current.y * 0.25;
    const sc = ring.scroll;
    const tx = THREE.MathUtils.damp(camera.position.x, px, 3, dt);
    const ty = THREE.MathUtils.damp(camera.position.y, 1.5 - py + sc * 1.4, 3, dt);
    const tz = THREE.MathUtils.damp(camera.position.z, dist + sc * 3, 3, dt);
    camera.position.set(tx, ty, tz);
    camera.lookAt(0, 0.1 + sc * 0.6, -1.8);
  });
  return null;
}

function Loop() {
  const reduce = useMemo(reducedMotion, []);
  useFrame((_, dt) => {
    updateRing(Math.min(dt, 0.05), reduce);
    const f = frontIndex();
    if (f !== useStore.getState().focus) useStore.setState({ focus: f });
  });
  return null;
}

/** The drag layer sits above the canvas, so cards are picked by raycasting a screen point ourselves. */
function Picker() {
  const { camera, scene } = useThree();
  useEffect(() => {
    const ray = new THREE.Raycaster();
    const v = new THREE.Vector2();
    picker.pick = (x, y) => {
      const hits = [];
      scene.traverse((o) => { if (o.userData && o.userData.hit != null) hits.push(o); });
      v.set((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1);
      ray.setFromCamera(v, camera);
      const r = ray.intersectObjects(hits, false)[0];
      return r ? r.object.userData.hit : -1;
    };
    return () => { picker.pick = () => -1; };
  }, [camera, scene]);
  return null;
}

function Ready({ onReady }) {
  useEffect(() => { onReady(); }, [onReady]);
  return null;
}

export default function Scene({ onReady, active }) {
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio || 1, 2));
  const mobile = useMemo(() => matchMedia('(max-width: 760px)').matches, []);

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, dpr]}
      camera={{ position: [0, 1.5, 9.5], fov: 40, near: 0.1, far: 120 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); gl.toneMapping = THREE.ACESFilmicToneMapping; }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} />
      <ambientLight intensity={0.6} />
      <pointLight position={[0, 4, 3]} intensity={60} color="#ffffff" />
      <pointLight position={[-6, 1, -8]} intensity={40} color="#ffb547" />
      {/* offline studio lighting made from light panels, so metal has something to reflect and nothing is fetched */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={5} position={[0, 6, -4]} scale={[12, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={4} position={[-7, 1, 3]} scale={[5, 6, 1]} color="#ffb547" />
        <Lightformer form="rect" intensity={3} position={[7, 0, 2]} scale={[4, 6, 1]} color="#dfe6ff" />
        <Lightformer form="ring" intensity={2} position={[0, -3, 4]} scale={6} color="#ffffff" />
      </Environment>
      <Stars radius={70} depth={50} count={mobile ? 1400 : 3600} factor={3.2} fade speed={0.5} />
      <Suspense fallback={null}>
        <Shapes />
        <Floor />
        <group>
          {projects.map((p, i) => <Card key={p.slug} project={p} i={i} />)}
        </group>
        <Ready onReady={onReady} />
      </Suspense>
      <Rig />
      <Loop />
      <Picker />
    </Canvas>
  );
}
