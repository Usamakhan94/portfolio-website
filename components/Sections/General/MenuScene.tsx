"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 10000;
const SIZE = 3.6;
const TEAL = new THREE.Color("#2fb6a2");
const WHITE = new THREE.Color("#ffffff");

type IconDef = { paths: string[]; fill?: boolean };
type Target = { pos: Float32Array; col: Float32Array };

// About = your photo (user icon is the fallback while it loads)
// Services = code, Work = briefcase, Experience = LinkedIn, Contact = mail
const ICONS: IconDef[] = [
  {
    paths: [
      "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z",
      "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
    ],
  },
  { paths: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6", "M14 4l-4 16"] },
  {
    paths: [
      "M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z",
      "M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
    ],
  },
  {
    fill: true,
    paths: [
      "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
      "M2 9h4v12H2z",
      "M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
    ],
  },
  {
    paths: [
      "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
      "M22 7l-10 6L2 7",
    ],
  },
];

const tmpColor = new THREE.Color();

function writeParticle(
  t: Target,
  i: number,
  x: number,
  y: number,
  z: number,
  brightness: number,
  whiten = 0,
) {
  t.pos[i * 3] = x;
  t.pos[i * 3 + 1] = y;
  t.pos[i * 3 + 2] = z;
  tmpColor.copy(TEAL);
  if (whiten > 0) tmpColor.lerp(WHITE, whiten);
  else if (Math.random() < 0.08) tmpColor.lerp(WHITE, 0.55);
  tmpColor.multiplyScalar(brightness);
  t.col[i * 3] = tmpColor.r;
  t.col[i * 3 + 1] = tmpColor.g;
  t.col[i * 3 + 2] = tmpColor.b;
}

function buildIcon(def: IconDef): Target {
  const res = 160;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = res;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.scale(res / 24, res / 24);
  ctx.strokeStyle = ctx.fillStyle = "#fff";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  def.paths.forEach((p) => {
    const path = new Path2D(p);
    if (def.fill) ctx.fill(path);
    ctx.stroke(path);
  });

  const data = ctx.getImageData(0, 0, res, res).data;
  const pts: number[] = [];
  for (let y = 0; y < res; y++)
    for (let x = 0; x < res; x++)
      if (data[(y * res + x) * 4 + 3] > 128) pts.push(x, y);

  const out: Target = {
    pos: new Float32Array(COUNT * 3),
    col: new Float32Array(COUNT * 3),
  };
  for (let i = 0; i < COUNT; i++) {
    const k = Math.floor(Math.random() * (pts.length / 2)) * 2;
    writeParticle(
      out,
      i,
      (pts[k] / res - 0.5) * SIZE,
      -(pts[k + 1] / res - 0.5) * SIZE,
      (Math.random() - 0.5) * 0.5,
      0.6 + Math.random() * 0.4,
    );
  }
  return out;
}

function buildImage(img: HTMLImageElement): Target {
  const res = 320;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = res;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  // crop to head + shoulders
  const sx = img.width * 0.1;
  const sy = img.height * 0.03;
  const sw = img.width * 0.8;
  const sh = img.height * 0.55;
  const s = Math.min(res / sw, res / sh);
  const dw = Math.floor(sw * s);
  const dh = Math.floor(sh * s);
  const x0 = Math.floor((res - dw) / 2);
  const y0 = Math.floor((res - dh) / 2);
  ctx.drawImage(img, sx, sy, sw, sh, x0, y0, dw, dh);

  const data = ctx.getImageData(0, 0, res, res).data;
  const lumAt = (p: number) =>
    (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]) / 255;

  // only inspect the area the photo was drawn into
  let opaque = 0;
  for (let y = y0; y < y0 + dh; y++)
    for (let x = x0; x < x0 + dw; x++)
      if (data[(y * res + x) * 4 + 3] > 250) opaque++;
  const noAlpha = opaque > dw * dh * 0.97;

  const px: number[] = [];
  for (let y = y0; y < y0 + dh; y++) {
    for (let x = x0; x < x0 + dw; x++) {
      const p = (y * res + x) * 4;
      const solid = noAlpha ? lumAt(p) < 0.93 : data[p + 3] > 128;
      if (solid) px.push(x, y);
    }
  }

  const S = SIZE * 1.25;
  const out: Target = {
    pos: new Float32Array(COUNT * 3),
    col: new Float32Array(COUNT * 3),
  };
  for (let i = 0; i < COUNT; i++) {
    let x = 0;
    let y = 0;
    let lum = 0;
    for (let tries = 0; tries < 16; tries++) {
      const k = Math.floor(Math.random() * (px.length / 2)) * 2;
      x = px[k];
      y = px[k + 1];
      lum = lumAt((y * res + x) * 4);
      if (Math.random() < Math.min(0.08 + lum * 3, 1)) break;
    }
    const l = Math.min(lum * 2.2, 1);
    writeParticle(
      out,
      i,
      (x / res - 0.5) * S,
      -(y / res - 0.5) * S,
      lum * 0.3 + (Math.random() - 0.5) * 0.06,
      0.25 + l * 0.75,
      l * 0.55, // highlights go whiter so the face reads
    );
  }
  return out;
}

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uScale;
  uniform float uTime;
  uniform float uSizeMul;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.8 + 0.3 * sin(uTime * (1.0 + aSeed * 2.5) + aSeed * 40.0);
    gl_PointSize = max(aSize * uSizeMul * twinkle * uScale / -mv.z, 1.0);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(vColor, a);
    #include <colorspace_fragment>
  }
`;

function Particles({ active }: { active: number }) {
  const group = useRef<THREE.Group>(null);
  const geo = useRef<THREE.BufferGeometry>(null);
  const lastActive = useRef(active);
  const { viewport, size, gl } = useThree();

  const pointer = useRef({ x: -9999, y: -9999, moved: false, speed: 0 });
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const state = useMemo(() => {
    const targets: Target[] = ICONS.map(buildIcon);
    // start close to the icon so nothing leaks over the menu text on open
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < positions.length; i++)
      positions[i] = (Math.random() - 0.5) * 2.4;
    const colors = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT).map(
      () => 0.03 + Math.random() * 0.09,
    );
    const phases = new Float32Array(COUNT).map(
      () => Math.random() * Math.PI * 2,
    );
    const seeds = new Float32Array(COUNT).map(() => Math.random());
    // mostly small dots, a few big ones
    const sizes = new Float32Array(COUNT).map(
      () => 0.03 + Math.pow(Math.random(), 3) * 0.1,
    );
    return {
      targets,
      positions,
      colors,
      velocities,
      speeds,
      phases,
      seeds,
      sizes,
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uScale: { value: 400 },
      uTime: { value: 0 },
      uSizeMul: { value: 1 },
    }),
    [],
  );

  // load photo into the "About" slot
  useEffect(() => {
    const img = new Image();
    img.src = "/usama.png";
    img.onload = () => {
      state.targets[0] = buildImage(img);
    };
    img.onerror = () =>
      console.warn("Could not load /usama.png (put it in /public)");
  }, [state]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const p = pointer.current;
      p.speed = Math.hypot(e.clientX - p.x, e.clientY - p.y);
      p.x = e.clientX;
      p.y = e.clientY;
      p.moved = true;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }, dt) => {
    if (!group.current || !geo.current) return;
    const t = clock.elapsedTime;
    const { positions: pos, colors, velocities, speeds, phases, seeds } = state;
    const target = state.targets[active] ?? state.targets[0];

    uniforms.uTime.value = t;
    uniforms.uScale.value = (size.height * viewport.dpr) / 2;
    // smaller dots on the photo so facial detail survives
    uniforms.uSizeMul.value = THREE.MathUtils.lerp(
      uniforms.uSizeMul.value,
      active === 0 ? 0.55 : 1,
      0.08,
    );

    // small burst on link change so particles stay on the right side
    if (lastActive.current !== active) {
      lastActive.current = active;
      for (let i = 0; i < pos.length; i++)
        pos[i] += (Math.random() - 0.5) * 0.6;
    }

    // icon sits in the right half on desktop, centered on mobile
    const isDesktop = size.width >= 768;
    const areaW = isDesktop ? viewport.width * 0.5 : viewport.width;
    const fit = (Math.min(areaW, viewport.height) * 0.75) / SIZE;

    group.current.position.x = isDesktop ? viewport.width * 0.25 : 0;
    group.current.scale.setScalar(fit);
    group.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    group.current.rotation.x = Math.cos(t * 0.3) * 0.06;
    group.current.updateMatrixWorld();

    // pointer -> icon local space
    const p = pointer.current;
    let mx = 9999;
    let my = 9999;
    let force = 0;
    if (p.moved) {
      const rect = gl.domElement.getBoundingClientRect();
      const nx = ((p.x - rect.left) / rect.width) * 2 - 1;
      const ny = -((p.y - rect.top) / rect.height) * 2 + 1;
      if (Math.abs(nx) <= 1 && Math.abs(ny) <= 1) {
        tmp.set((nx * viewport.width) / 2, (ny * viewport.height) / 2, 0);
        group.current.worldToLocal(tmp);
        mx = tmp.x;
        my = tmp.y;
        force = Math.min(p.speed / 12, 1.5);
      }
    }
    p.moved = false; // push only while the mouse is actually moving

    const RADIUS = 0.7;
    const frameScale = dt * 60;
    const damp = Math.pow(0.94, frameScale);
    const colorK = 1 - Math.pow(0.92, frameScale);
    const calm = active === 0 ? 0.2 : 1;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // disturbance: only the mouse throws particles far
      if (force > 0) {
        const dx = pos[i3] - mx;
        const dy = pos[i3 + 1] - my;
        const d = Math.hypot(dx, dy);
        if (d < RADIUS) {
          const f = (1 - d / RADIUS) ** 2 * force * 0.2;
          const inv = 1 / (d + 0.0001);
          velocities[i3] += dx * inv * f + (Math.random() - 0.5) * f * 0.6;
          velocities[i3 + 1] += dy * inv * f + (Math.random() - 0.5) * f * 0.6;
          velocities[i3 + 2] += (Math.random() - 0.5) * f * 2;
        }
      }

      // chaotic idle motion + return to home position
      const s = seeds[i];
      const amp = (0.02 + s * s * 0.13) * calm;
      const freq = 0.5 + s * 1.9;
      const ph = phases[i];
      const k = 1 - Math.pow(1 - speeds[i], frameScale);

      pos[i3] += (target.pos[i3] + Math.sin(t * freq + ph) * amp - pos[i3]) * k;
      pos[i3 + 1] +=
        (target.pos[i3 + 1] +
          Math.cos(t * freq * 0.8 + ph * 1.7) * amp -
          pos[i3 + 1]) *
        k;
      pos[i3 + 2] +=
        (target.pos[i3 + 2] +
          Math.sin(t * freq * 0.6 + ph * 2.3) * amp * 2.2 -
          pos[i3 + 2]) *
        k;

      const j = 0.003 * calm * frameScale;
      velocities[i3] += (Math.random() - 0.5) * j;
      velocities[i3 + 1] += (Math.random() - 0.5) * j;
      velocities[i3 + 2] += (Math.random() - 0.5) * j;

      // apply scatter velocity, then let it fade
      pos[i3] += velocities[i3] * frameScale;
      pos[i3 + 1] += velocities[i3 + 1] * frameScale;
      pos[i3 + 2] += velocities[i3 + 2] * frameScale;
      velocities[i3] *= damp;
      velocities[i3 + 1] *= damp;
      velocities[i3 + 2] *= damp;

      // ease colors toward the active target
      colors[i3] += (target.col[i3] - colors[i3]) * colorK;
      colors[i3 + 1] += (target.col[i3 + 1] - colors[i3 + 1]) * colorK;
      colors[i3 + 2] += (target.col[i3 + 2] - colors[i3 + 2]) * colorK;
    }
    geo.current.attributes.position.needsUpdate = true;
    geo.current.attributes.aColor.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry ref={geo}>
          <bufferAttribute
            attach="attributes-position"
            args={[state.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-aColor"
            args={[state.colors, 3]}
          />
          <bufferAttribute attach="attributes-aSize" args={[state.sizes, 1]} />
          <bufferAttribute attach="attributes-aSeed" args={[state.seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

export default function MenuScene({
  active,
  open,
}: {
  active: number;
  open: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      frameloop={open ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ alpha: true }}
    >
      <Particles active={active} />
    </Canvas>
  );
}
