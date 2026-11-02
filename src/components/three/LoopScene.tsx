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

function Node({ index, active }: { index: number; active: number }) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Mesh>(null);

  const base = useMemo(() => {
    const angle = (index / NODES) * Math.PI * 2 - Math.PI / 2;
    return new THREE.Vector3(
      Math.cos(angle) * RADIUS,
      0,
      Math.sin(angle) * RADIUS,
    );
  }, [index]);

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
  progress: RefObject<number>;
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
