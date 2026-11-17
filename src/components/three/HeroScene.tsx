"use client";

/* eslint-disable react-hooks/immutability -- R3F drives the camera imperatively. */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { palette, alpha } from "@/lib/palette";
import { StudioEnvironment, groundAOTexture } from "./StudioEnvironment";

/** Contact point on the fixtured component, in scene millimetres. */
const CONTACT: [number, number, number] = [0.6, 0.09, 0.12];

/** Articulated probe path, base to end effector. */
const JOINTS: [number, number, number][] = [
  [2.72, 1.62, -0.56],
  [2.16, 1.12, -0.32],
  [1.5, 0.76, -0.05],
  [1.02, 0.48, 0.06],
  [0.84, 0.33, 0.1],
];

const STEEL = { color: "#a9b2bc", metalness: 1, roughness: 0.3 } as const;
const ALUMINIUM = { color: "#cfd5db", metalness: 0.92, roughness: 0.24 } as const;
const DARK = { color: "#1b1d22", metalness: 0.35, roughness: 0.68 } as const;

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function useCurve(points: [number, number, number][], segments = 260) {
  return useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
      false,
      "catmullrom",
      0.28,
    );
    return curve.getPoints(segments);
  }, [points, segments]);
}

function TraceParticles({
  points,
  from,
  to,
  size = 0.028,
}: {
  points: THREE.Vector3[];
  from: string;
  to: string;
  size?: number;
}) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);
    const start = new THREE.Color(from);
    const end = new THREE.Color(to);
    const colour = new THREE.Color();

    points.forEach((point, index) => {
      positions[index * 3] = point.x;
      positions[index * 3 + 1] = point.y;
      positions[index * 3 + 2] = point.z;
      const t = index / Math.max(1, points.length - 1);
      colour.copy(start).lerp(end, Math.pow(t, 2.4));
      colors[index * 3] = colour.r;
      colors[index * 3 + 1] = colour.g;
      colors[index * 3 + 2] = colour.b;
    });

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return buffer;
  }, [points, from, to]);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={size}
        sizeAttenuation
        transparent
        opacity={0.9}
        vertexColors
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Cylinder between two points — the building block of the PBR assembly. */
function Beam({
  from,
  to,
  radius,
  taper = 0,
  material = STEEL,
  segments = 28,
}: {
  from: [number, number, number];
  to: [number, number, number];
  radius: number;
  taper?: number;
  material?: { color: string; metalness: number; roughness: number };
  segments?: number;
}) {
  const { position, quaternion, length } = useMemo(() => {
    const a = new THREE.Vector3(...from);
    const b = new THREE.Vector3(...to);
    const direction = new THREE.Vector3().subVectors(b, a);
    const distance = direction.length();
    const orientation = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.clone().normalize(),
    );
    return {
      position: a.clone().add(b).multiplyScalar(0.5),
      quaternion: orientation,
      length: distance,
    };
  }, [from, to]);

  return (
    <mesh position={position} quaternion={quaternion}>
      <cylinderGeometry args={[radius, radius * (1 - taper), length, segments, 1]} />
      <meshStandardMaterial
        color={material.color}
        metalness={material.metalness}
        roughness={material.roughness}
        envMapIntensity={1.15}
      />
    </mesh>
  );
}

function Joint({
  position,
  radius = 0.085,
  accent = false,
}: {
  position: [number, number, number];
  radius?: number;
  accent?: boolean;
}) {
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[radius, 28, 22]} />
        <meshStandardMaterial
          color={DARK.color}
          metalness={DARK.metalness}
          roughness={DARK.roughness}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius * 1.06, radius * 1.06, radius * 0.72, 32]} />
        <meshStandardMaterial
          color={STEEL.color}
          metalness={STEEL.metalness}
          roughness={STEEL.roughness}
          envMapIntensity={1.2}
        />
      </mesh>
      {accent ? (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 1.1, 0.012, 8, 32]} />
          <meshStandardMaterial
            color={palette.amber}
            metalness={0.85}
            roughness={0.28}
            emissive={palette.amber}
            emissiveIntensity={0.28}
          />
        </mesh>
      ) : null}
    </group>
  );
}

/** Flat rectangle outline used for the fixture table and clamps. */
function rect(w: number, d: number, y = 0, cx = 0, cz = 0) {
  const x0 = cx - w / 2;
  const x1 = cx + w / 2;
  const z0 = cz - d / 2;
  const z1 = cz + d / 2;
  return [
    new THREE.Vector3(x0, y, z0),
    new THREE.Vector3(x1, y, z0),
    new THREE.Vector3(x1, y, z1),
    new THREE.Vector3(x0, y, z1),
    new THREE.Vector3(x0, y, z0),
  ];
}

function Arrow({
  from,
  to,
  color,
  opacity = 0.8,
  width = 1.1,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  color: string;
  opacity?: number;
  width?: number;
}) {
  const head = useMemo(() => {
    const direction = new THREE.Vector3().subVectors(to, from).normalize();
    const side = new THREE.Vector3(direction.y, -direction.x, 0).normalize();
    if (!Number.isFinite(side.x) || side.lengthSq() < 0.001) side.set(1, 0, 0);
    const base = to.clone().addScaledVector(direction, -0.055);
    return [
      to.clone(),
      base.clone().addScaledVector(side, 0.022),
      to.clone(),
      base.clone().addScaledVector(side, -0.022),
    ];
  }, [from, to]);

  return (
    <>
      <Line
        points={[from, to]}
        color={color}
        lineWidth={width}
        transparent
        opacity={opacity}
      />
      <Line
        points={head}
        color={color}
        lineWidth={width}
        transparent
        opacity={opacity}
      />
    </>
  );
}

/** CAD layer: fixtured component drawn as an orthographic wireframe. */
function Fixture() {
  const table = useMemo(() => rect(2.7, 1.55, -0.52, 0.42, 0.08), []);
  const clamps = useMemo(
    () => [
      ...rect(0.44, 0.16, -0.505, 0.06, -0.24),
      ...rect(0.44, 0.16, -0.505, 0.06, 0.42),
      ...rect(0.16, 0.44, -0.505, 1.02, 0.1),
    ],
    [],
  );
  const ao = useMemo(() => groundAOTexture(), []);

  return (
    <group>
      <Line
        points={table}
        color={palette.bench}
        lineWidth={1}
        transparent
        opacity={0.32}
      />
      <Line
        points={clamps}
        color={palette.bench}
        lineWidth={1}
        transparent
        opacity={0.2}
      />
      {[-0.9, -0.3, 0.3, 0.9].map((x) => (
        <Line
          key={x}
          points={[
            new THREE.Vector3(x, -0.52, -0.66),
            new THREE.Vector3(x, -0.52, 0.82),
          ]}
          color={palette.bench}
          lineWidth={0.6}
          transparent
          opacity={0.07}
        />
      ))}

      {/* Physical part (PBR) sitting on the CAD fixture */}
      <mesh position={[0.52, -0.44, 0.06]}>
        <cylinderGeometry args={[0.23, 0.23, 0.16, 48]} />
        <meshStandardMaterial
          color={ALUMINIUM.color}
          metalness={ALUMINIUM.metalness}
          roughness={ALUMINIUM.roughness}
          envMapIntensity={1.25}
        />
      </mesh>
      <mesh position={[0.52, -0.34, 0.06]}>
        <cylinderGeometry args={[0.085, 0.085, 0.06, 36]} />
        <meshStandardMaterial
          color="#e2e7eb"
          metalness={0.88}
          roughness={0.2}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh position={[0.52, -0.29, 0.06]}>
        <cylinderGeometry args={[0.012, 0.026, 0.1, 20]} />
        <meshStandardMaterial
          color={palette.amber}
          metalness={0.8}
          roughness={0.3}
          emissive={palette.amber}
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.52, -0.515, 0.06]}>
        <planeGeometry args={[0.78, 0.78]} />
        <meshBasicMaterial map={ao} transparent opacity={0.7} depthWrite={false} />
      </mesh>
    </group>
  );
}

/** World-space x/y/z crosshair anchored to the live contact point. */
function CoordinateCrosshair({ scale = 1 }: { scale?: number }) {
  const size = 0.24 * scale;
  const axes: Array<{ dir: THREE.Vector3; colour: string }> = [
    { dir: new THREE.Vector3(1, 0, 0), colour: palette.amber },
    { dir: new THREE.Vector3(0, 1, 0), colour: palette.bench },
    { dir: new THREE.Vector3(0, 0, 1), colour: palette.trace },
  ];

  return (
    <group>
      {axes.map(({ dir, colour }, index) => {
        const ticks = Array.from({ length: 5 }, (_, tick) => {
          const t = ((tick + 1) / 5) * size;
          const origin = dir.clone().multiplyScalar(t);
          const side =
            Math.abs(dir.y) > 0.5
              ? new THREE.Vector3(1, 0, 0)
              : new THREE.Vector3(0, 1, 0);
          return {
            points: [
              origin.clone().addScaledVector(side, 0.014),
              origin.clone().addScaledVector(side, -0.014),
            ],
            big: tick === 4,
          };
        });

        return (
          <group key={index}>
            <Arrow
              from={dir.clone().multiplyScalar(-size)}
              to={dir.clone().multiplyScalar(size)}
              color={colour}
              opacity={0.7}
              width={1}
            />
            {ticks.map((tick, tickIndex) => (
              <Line
                key={tickIndex}
                points={tick.points}
                color={colour}
                lineWidth={tick.big ? 1 : 0.6}
                transparent
                opacity={tick.big ? 0.8 : 0.42}
              />
            ))}
            <mesh position={dir.clone().multiplyScalar(size)}>
              <sphereGeometry args={[0.012, 10, 10]} />
              <meshBasicMaterial color={colour} toneMapped={false} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Interactive contact: normal-force stack, tangential friction and a
 * millimetre crosshair that damps toward the pointer.
 */
function ContactProbe() {
  const group = useRef<THREE.Group>(null);
  const forceRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const ease = 1 - Math.pow(0.001, delta);

    // The parent group already sits at CONTACT, so only the pointer drift is
    // applied here; adding CONTACT again would double the offset.
    if (group.current) {
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        state.pointer.x * 0.16,
        ease,
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        Math.max(0, state.pointer.y) * 0.1,
        ease,
      );
      group.current.position.z = THREE.MathUtils.lerp(
        group.current.position.z,
        state.pointer.x * 0.05,
        ease,
      );
    }

    if (forceRef.current) {
      const load =
        0.82 + Math.sin(t * 1.6) * 0.08 + Math.abs(state.pointer.y) * 0.16;
      forceRef.current.scale.set(1, load, 1);
    }

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      const pulse = 1 + Math.sin(t * 2.2) * 0.08;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  const normalEnd = useMemo(
    () => new THREE.Vector3(CONTACT[0], CONTACT[1] + 0.5, CONTACT[2]),
    [],
  );
  const normalStart = useMemo(
    () => new THREE.Vector3(CONTACT[0], CONTACT[1], CONTACT[2]),
    [],
  );
  const frictionStart = useMemo(
    () => new THREE.Vector3(CONTACT[0], CONTACT[1] + 0.06, CONTACT[2]),
    [],
  );
  const frictionEnd = useMemo(
    () =>
      new THREE.Vector3(
        CONTACT[0] + 0.3,
        CONTACT[1] + 0.06,
        CONTACT[2] + 0.18,
      ),
    [],
  );

  return (
    <group position={CONTACT}>
      <group ref={group} position={[0, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.028, 24, 24]} />
          <meshStandardMaterial
            color={palette.amber}
            emissive={palette.amber}
            emissiveIntensity={1.1}
            metalness={0.3}
            roughness={0.35}
          />
        </mesh>
        <group ref={coreRef}>
          <mesh>
            <ringGeometry args={[0.085, 0.092, 64]} />
            <meshBasicMaterial
              color={palette.amber}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.17, 0.174, 64]} />
          <meshBasicMaterial
            color={palette.bench}
            transparent
            opacity={0.24}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>

        <group ref={forceRef}>
          <Arrow
            from={new THREE.Vector3(0, 0, 0)}
            to={new THREE.Vector3(0, 0.42, 0)}
            color={palette.amber}
            opacity={0.85}
            width={1.4}
          />
          <Arrow
            from={new THREE.Vector3(0.03, 0, 0)}
            to={new THREE.Vector3(0.03, 0.3, 0)}
            color={palette.bench}
            opacity={0.5}
            width={0.8}
          />
          <Arrow
            from={new THREE.Vector3(-0.03, 0, 0)}
            to={new THREE.Vector3(-0.03, 0.36, 0)}
            color={palette.bench}
            opacity={0.32}
            width={0.7}
          />
        </group>

        <Arrow
          from={new THREE.Vector3(0, 0.05, 0)}
          to={new THREE.Vector3(0.28, 0.05, 0.17)}
          color={palette.coral}
          opacity={0.6}
          width={0.9}
        />

        <CoordinateCrosshair />
      </group>

      <group position={[0, 0, 0]}>
        <Line
          points={[normalStart, normalEnd]}
          color={palette.bench}
          lineWidth={0.6}
          transparent
          opacity={0.2}
          dashed
          dashSize={0.03}
          gapSize={0.03}
        />
        <Line
          points={[frictionStart, frictionEnd]}
          color={palette.bench}
          lineWidth={0.5}
          transparent
          opacity={0.12}
        />
      </group>
    </group>
  );
}

function StarField() {
  const geometry = useMemo(() => {
    const random = seeded(412);
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const angle = random() * Math.PI * 2;
      const radius = 2.6 + random() * 4.2;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = (random() - 0.5) * 3.6 + 0.2;
      positions[index * 3 + 2] = Math.sin(angle) * radius * 0.55 - 1.6;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={palette.bench}
        size={0.016}
        transparent
        opacity={0.34}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Moving bead along the tool trajectory. */
function ToolPulse({ points }: { points: THREE.Vector3[] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * 0.09) % 1;
    const index = Math.min(
      points.length - 1,
      Math.floor(t * (points.length - 1)),
    );
    ref.current.position.copy(points[index]);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.026, 16, 16]} />
      <meshStandardMaterial
        color={palette.amber}
        emissive={palette.amber}
        emissiveIntensity={1.2}
        metalness={0.2}
        roughness={0.4}
      />
    </mesh>
  );
}

/** PBR industrial probe: metallic housing, anodised collars, hardened stylus. */
function ProbeAssembly() {
  const tool = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!tool.current) return;
    const ease = 1 - Math.pow(0.01, delta);
    tool.current.rotation.z = THREE.MathUtils.lerp(
      tool.current.rotation.z,
      state.pointer.x * 0.035,
      ease,
    );
    tool.current.rotation.x = THREE.MathUtils.lerp(
      tool.current.rotation.x,
      -state.pointer.y * 0.025,
      ease,
    );
  });

  const [base, shoulder, elbow, wrist, flange] = JOINTS;

  return (
    <group ref={tool}>
      {/* Base column */}
      <mesh position={[base[0], base[1] - 0.16, base[2]]}>
        <cylinderGeometry args={[0.14, 0.17, 0.26, 36]} />
        <meshStandardMaterial
          color={DARK.color}
          metalness={0.5}
          roughness={0.6}
          envMapIntensity={0.8}
        />
      </mesh>
      <mesh position={[base[0], base[1] - 0.02, base[2]]}>
        <cylinderGeometry args={[0.1, 0.12, 0.1, 36]} />
        <meshStandardMaterial
          color={palette.amber}
          metalness={0.8}
          roughness={0.32}
          envMapIntensity={1.1}
        />
      </mesh>

      <Joint position={base} radius={0.105} accent />
      <Beam from={base} to={shoulder} radius={0.072} material={STEEL} />
      <Joint position={shoulder} radius={0.092} />
      <Beam from={shoulder} to={elbow} radius={0.058} material={ALUMINIUM} />
      <Joint position={elbow} radius={0.076} />
      <Beam from={elbow} to={wrist} radius={0.046} material={DARK} />
      <Joint position={wrist} radius={0.062} accent />
      <Beam from={wrist} to={flange} radius={0.042} taper={0.1} material={STEEL} />

      {/* End effector: anodised collar, hardened stylus, carbide jaws */}
      <Beam
        from={flange}
        to={[0.755, 0.25, 0.11]}
        radius={0.062}
        taper={0.08}
        material={{
          color: palette.amber,
          metalness: 0.85,
          roughness: 0.3,
        }}
      />
      <mesh position={[0.755, 0.27, 0.11]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.062, 0.013, 10, 32]} />
        <meshStandardMaterial
          color={palette.amber}
          metalness={0.9}
          roughness={0.26}
          emissive={palette.amber}
          emissiveIntensity={0.22}
        />
      </mesh>
      <Beam
        from={[0.755, 0.25, 0.11]}
        to={CONTACT}
        radius={0.022}
        taper={0.62}
        material={ALUMINIUM}
        segments={24}
      />
      <Beam
        from={[0.78, 0.3, 0.11]}
        to={[0.68, 0.16, 0.18]}
        radius={0.018}
        taper={0.35}
        material={DARK}
        segments={16}
      />
      <Beam
        from={[0.78, 0.3, 0.11]}
        to={[0.68, 0.16, 0.04]}
        radius={0.018}
        taper={0.35}
        material={DARK}
        segments={16}
      />

      {/* CAD layer over the physical assembly: kinematic links */}
      <Line
        points={JOINTS.map(([x, y, z]) => new THREE.Vector3(x, y, z))}
        color={palette.bench}
        lineWidth={0.6}
        transparent
        opacity={0.28}
        dashed
        dashSize={0.05}
        gapSize={0.07}
      />
      {JOINTS.map(([x, y, z], index) => (
        <Line
          key={index}
          points={[
            new THREE.Vector3(x - 0.06, y, z),
            new THREE.Vector3(x + 0.06, y, z),
          ]}
          color={palette.bench}
          lineWidth={0.8}
          transparent
          opacity={0.4}
        />
      ))}
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const { camera } = useThree();

  const approachTrace = useCurve([
    [-2.9, 1.15, -0.7],
    [-2.1, 1.05, -0.42],
    [-1.35, 0.86, -0.2],
    [-0.55, 0.62, -0.02],
    [0.1, 0.4, 0.06],
    [0.44, 0.22, 0.1],
    [0.6, 0.09, 0.12],
  ]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const ease = 1 - Math.pow(0.001, delta);

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        state.pointer.x * 0.1 + scroll.current * 0.1,
        ease,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -state.pointer.y * 0.045 + Math.sin(t * 0.2) * 0.018,
        ease,
      );
      group.current.position.y =
        Math.sin(t * 0.32) * 0.032 - scroll.current * 0.16;
    }

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      state.pointer.x * 0.16,
      ease,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.3 + state.pointer.y * 0.08 + scroll.current * 0.28,
      ease,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      6.8 - scroll.current * 0.5,
      ease,
    );
    camera.lookAt(0, -0.05, 0);
  });

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / 950);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <StudioEnvironment intensity={1.15} />
      <ambientLight intensity={0.32} />
      <directionalLight
        position={[4.2, 6, 4.4]}
        intensity={2.4}
        color={palette.bench}
      />
      <pointLight
        position={[-3.2, 1.4, 2.2]}
        intensity={11}
        distance={11}
        decay={2}
        color={palette.amber}
      />
      <pointLight
        position={[2.4, 0.9, -2.2]}
        intensity={6}
        distance={9}
        decay={2}
        color={palette.trace}
      />

      <StarField />
      <group ref={group}>
        <Fixture />

        <Line
          points={approachTrace}
          color={palette.bench}
          lineWidth={0.7}
          transparent
          opacity={0.32}
          dashed
          dashSize={0.04}
          gapSize={0.05}
        />
        <TraceParticles
          points={approachTrace}
          from={alpha(palette.bench, 1)}
          to={palette.amber}
          size={0.022}
        />
        <ToolPulse points={approachTrace} />

        <ProbeAssembly />
        <ContactProbe />
      </group>
    </>
  );
}

export function HeroScene() {
  return <Scene />;
}
