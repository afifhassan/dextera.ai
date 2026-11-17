"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Billboard, Line } from "@react-three/drei";
import { palette } from "@/lib/palette";

const NODES = 5;
const RADIUS = 2.15;

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function ringPoints(radius: number, segments = 180) {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const angle = (index / segments) * Math.PI * 2;
    return new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius,
    );
  });
}

function nodeBase(index: number) {
  const angle = (index / NODES) * Math.PI * 2 - Math.PI / 2;
  return new THREE.Vector3(
    Math.cos(angle) * RADIUS,
    0,
    Math.sin(angle) * RADIUS,
  );
}

function ReturnArc() {
  const points = useMemo(() => {
    const startAngle = ((NODES - 1) / NODES) * Math.PI * 2 - Math.PI / 2;
    const endAngle = -Math.PI / 2;
    const start = new THREE.Vector3(
      Math.cos(startAngle) * RADIUS,
      0,
      Math.sin(startAngle) * RADIUS,
    );
    const end = new THREE.Vector3(
      Math.cos(endAngle) * RADIUS,
      0,
      Math.sin(endAngle) * RADIUS,
    );
    const lift = new THREE.Vector3(0, 1.25, -3.3);
    return new THREE.QuadraticBezierCurve3(start, lift, end).getPoints(60);
  }, []);

  return (
    <Line
      points={points}
      color={palette.bench}
      lineWidth={0.6}
      transparent
      opacity={0.24}
      dashed
      dashSize={0.06}
      gapSize={0.11}
    />
  );
}

/**
 * Node 01 — Capture. A sensor raycasts a point cloud onto the virtual table
 * fixture, one sweep at a time.
 */
function CaptureStage({ active }: { active: boolean }) {
  const sweepRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Points>(null);
  const emitter = useMemo(() => new THREE.Vector3(0.62, 0.86, 0.44), []);

  const geometry = useMemo(() => {
    const random = seeded(551);
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const x = (random() - 0.5) * 0.72;
      const z = (random() - 0.5) * 0.72;
      const ridge = Math.sin(x * 9) * 0.03 + Math.cos(z * 11) * 0.025;
      positions[index * 3] = x;
      positions[index * 3 + 1] = 0.02 + ridge + random() * 0.012;
      positions[index * 3 + 2] = z;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sweepRef.current) {
      sweepRef.current.rotation.y = t * 0.9;
      sweepRef.current.visible = active;
    }
    if (cloudRef.current) {
      const material = cloudRef.current.material as THREE.PointsMaterial;
      material.opacity = active ? 0.85 : 0.4;
    }
  });

  const table = useMemo(
    () => [
      new THREE.Vector3(-0.42, 0, -0.42),
      new THREE.Vector3(0.42, 0, -0.42),
      new THREE.Vector3(0.42, 0, 0.42),
      new THREE.Vector3(-0.42, 0, 0.42),
      new THREE.Vector3(-0.42, 0, -0.42),
    ],
    [],
  );

  const beams = useMemo(() => {
    const random = seeded(88);
    return Array.from({ length: 16 }, () => {
      const target = new THREE.Vector3(
        (random() - 0.5) * 0.7,
        0.02,
        (random() - 0.5) * 0.7,
      );
      return [emitter.clone(), target];
    });
  }, [emitter]);

  return (
    <group position={[0, 0.06, 0.34]}>
      <Line
        points={table}
        color={palette.bench}
        lineWidth={0.8}
        transparent
        opacity={active ? 0.55 : 0.25}
      />
      <mesh position={[0, -0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.84, 0.84]} />
        <meshBasicMaterial color={palette.bench} transparent opacity={0.03} />
      </mesh>

      <points ref={cloudRef} geometry={geometry}>
        <pointsMaterial
          color={palette.trace}
          size={0.016}
          sizeAttenuation
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points geometry={geometry}>
        <pointsMaterial
          color={palette.bench}
          size={0.036}
          sizeAttenuation
          transparent
          opacity={active ? 0.16 : 0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Raycast fan from the sensor head onto the fixture */}
      {beams.map(([from, to], index) => (
        <Line
          key={index}
          points={[from, to]}
          color={palette.trace}
          lineWidth={0.5}
          transparent
          opacity={active ? 0.34 : 0.12}
        />
      ))}
      <mesh position={emitter}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={palette.amber} toneMapped={false} />
      </mesh>

      <group ref={sweepRef} position={[0, 0.02, 0]}>
        <Line
          points={[
            new THREE.Vector3(-0.34, 0, 0),
            new THREE.Vector3(0.34, 0, 0),
          ]}
          color={palette.amber}
          lineWidth={1.1}
          transparent
          opacity={0.4}
        />
      </group>

      <Billboard position={[0, 0.5, -0.2]}>
        <mesh>
          <circleGeometry args={[0.02, 16]} />
          <meshBasicMaterial color={palette.trace} transparent opacity={0.7} />
        </mesh>
      </Billboard>
    </group>
  );
}

/**
 * Node 02 — Calibrate. Coordinate alignment frame: three measured axes, a
 * reference grid and the probe datum from the CMM fixture.
 */
function CalibrationStage({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = 0.5 + Math.sin(t * 0.35) * 0.18;
    group.current.position.y = active ? 0.05 : 0;
  });

  const grid = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let index = -2; index <= 2; index += 1) {
      const offset = index * 0.14;
      lines.push([
        new THREE.Vector3(-0.28, 0, offset),
        new THREE.Vector3(0.28, 0, offset),
      ]);
      lines.push([
        new THREE.Vector3(offset, 0, -0.28),
        new THREE.Vector3(offset, 0, 0.28),
      ]);
    }
    return lines;
  }, []);

  const axes = [
    { dir: new THREE.Vector3(0.34, 0, 0), colour: palette.amber },
    { dir: new THREE.Vector3(0, 0.34, 0), colour: palette.bench },
    { dir: new THREE.Vector3(0, 0, 0.34), colour: palette.trace },
  ];

  return (
    <group ref={group} position={[0, 0.04, 0.3]}>
      {grid.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={palette.bench}
          lineWidth={0.5}
          transparent
          opacity={index % 2 === 0 ? 0.16 : 0.09}
        />
      ))}
      {axes.map(({ dir, colour }, index) => (
        <Line
          key={index}
          points={[new THREE.Vector3(0, 0, 0), dir]}
          color={colour}
          lineWidth={1.2}
          transparent
          opacity={active ? 0.85 : 0.4}
        />
      ))}
      <mesh>
        <sphereGeometry args={[0.022, 14, 14]} />
        <meshBasicMaterial color={palette.amber} toneMapped={false} />
      </mesh>
      {/* Probe stylus */}
      <Line
        points={[
          new THREE.Vector3(0.02, 0.3, -0.12),
          new THREE.Vector3(0, 0.02, 0),
        ]}
        color={palette.bench}
        lineWidth={1.3}
        transparent
        opacity={0.7}
      />
      <mesh position={[0, 0.32, -0.13]}>
        <cylinderGeometry args={[0.028, 0.018, 0.1, 12]} />
        <meshBasicMaterial
          color={palette.bench}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      <Billboard position={[0.12, 0.36, 0]}>
        <mesh>
          <ringGeometry args={[0.05, 0.054, 24]} />
          <meshBasicMaterial
            color={palette.trace}
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

/**
 * Node 04 — Test. A failure detection volume that flashes when the trial
 * parameter leaves its boundary.
 */
function FailureVolume({ active }: { active: boolean }) {
  const box = useRef<THREE.LineSegments>(null);
  const shellRef = useRef<THREE.Mesh>(null);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.62, 0.42, 0.62)),
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const excursion = Math.max(0, Math.sin(t * 1.15) - 0.45) / 0.55;
    if (box.current) {
      const material = box.current.material as THREE.LineBasicMaterial;
      material.color.set(excursion > 0.05 ? palette.coral : palette.bench);
      material.opacity = active ? 0.55 + excursion * 0.45 : 0.2;
      box.current.scale.setScalar(1 + excursion * 0.06);
    }
    if (shellRef.current) {
      const material = shellRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = active ? 0.05 + excursion * 0.16 : 0.03;
      material.color.set(excursion > 0.05 ? palette.coral : palette.trace);
    }
  });

  return (
    <group position={[0, 0.24, 0.32]}>
      <lineSegments ref={box} geometry={edges}>
        <lineBasicMaterial
          color={palette.bench}
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </lineSegments>
      <mesh ref={shellRef}>
        <boxGeometry args={[0.62, 0.42, 0.62]} />
        <meshBasicMaterial
          color={palette.trace}
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
      {/* Trial trajectory passing through the volume */}
      <Line
        points={[
          new THREE.Vector3(-0.34, -0.12, -0.2),
          new THREE.Vector3(-0.1, 0.02, 0.02),
          new THREE.Vector3(0.12, 0.1, 0.16),
          new THREE.Vector3(0.36, 0.16, 0.08),
        ]}
        color={palette.amber}
        lineWidth={1}
        transparent
        opacity={active ? 0.8 : 0.35}
      />
    </group>
  );
}

function Node({ index, active }: { index: number; active: number }) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);

  const base = useMemo(() => nodeBase(index), [index]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      const lift = active === index ? 0.12 : 0;
      const pulse =
        active === index
          ? Math.sin(t * 1.8) * 0.04
          : Math.sin(t * 0.8 + index) * 0.014;
      group.current.position.y = lift + pulse;
    }
    if (halo.current) {
      const pulse = 1 + Math.sin(t * 1.5 + index) * 0.08;
      halo.current.scale.setScalar(active === index ? pulse : 1);
      (halo.current.material as THREE.MeshBasicMaterial).opacity =
        active === index ? 0.32 : 0.06;
    }
  });

  return (
    <group position={base}>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[active === index ? 0.098 : 0.07, 24, 24]} />
          <meshBasicMaterial
            color={active === index ? palette.amber : palette.bench}
            toneMapped={false}
          />
        </mesh>
        <Billboard>
          <mesh ref={halo}>
            <ringGeometry args={[0.15, 0.158, 64]} />
            <meshBasicMaterial
              color={active === index ? palette.amber : palette.bench}
              transparent
              opacity={0.18}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </Billboard>
      </group>

      <mesh position={[0, -0.48, 0]}>
        <cylinderGeometry args={[0.003, 0.003, 0.9, 6]} />
        <meshBasicMaterial
          color={palette.bench}
          transparent
          opacity={0.24}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, -0.93, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.085, 40]} />
        <meshBasicMaterial
          color={active === index ? palette.amber : palette.bench}
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {index === 0 ? <CaptureStage active={active === 0} /> : null}
      {index === 1 ? <CalibrationStage active={active === 1} /> : null}
      {index === 3 ? <FailureVolume active={active === 3} /> : null}
    </group>
  );
}

function Dust() {
  const geometry = useMemo(() => {
    const random = seeded(917);
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const angle = random() * Math.PI * 2;
      const radius = 2.7 + random() * 3.4;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = (random() - 0.5) * 3.6;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, []);

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={palette.bench}
        size={0.012}
        transparent
        opacity={0.3}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene({
  progress,
  active,
}: {
  progress: React.RefObject<number>;
  active: number;
}) {
  const group = useRef<THREE.Group>(null);
  const ring = useMemo(() => ringPoints(RADIUS), []);
  const inner = useMemo(() => ringPoints(1.76), []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = -0.22 + (progress.current ?? 0) * Math.PI * 1.55;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target,
      1 - Math.pow(0.001, delta),
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -0.04 + Math.sin((progress.current ?? 0) * Math.PI) * 0.04,
      0.04,
    );
  });

  return (
    <>
      <Dust />
      <group ref={group} rotation={[0.02, -0.22, 0]}>
        <Line
          points={ring}
          color={palette.bench}
          lineWidth={0.9}
          transparent
          opacity={0.36}
        />
        <Line
          points={inner}
          color={palette.bench}
          lineWidth={0.5}
          transparent
          opacity={0.12}
          dashed
          dashSize={0.04}
          gapSize={0.12}
        />
        <ReturnArc />

        {Array.from({ length: NODES }, (_, index) => (
          <Node key={index} index={index} active={active} />
        ))}

        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshBasicMaterial color={palette.bench} transparent opacity={0.6} />
        </mesh>
        <mesh position={[0, -1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.305, 64]} />
          <meshBasicMaterial
            color={palette.bench}
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      <gridHelper
        args={[12, 24, palette.bench, palette.bench]}
        position={[0, -1.25, 0]}
      >
        <lineBasicMaterial
          attach="material"
          color={palette.bench}
          transparent
          opacity={0.1}
        />
      </gridHelper>
    </>
  );
}

export function LoopScene({
  progress,
  active,
}: {
  progress: RefObject<number>;
  active: number;
}) {
  return <Scene progress={progress} active={active} />;
}
