"use client";

/* eslint-disable react-hooks/immutability -- R3F drives the camera imperatively. */

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Billboard, Line } from "@react-three/drei";
import { palette, alpha } from "@/lib/palette";

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

function ContactPulse() {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pulse = (Math.sin(t * 1.7) + 1) / 2;
    ref.current.scale.setScalar(0.92 + pulse * 0.25);
    ref.current.rotation.z = t * 0.12;
  });

  return (
    <group position={[0.74, 0.13, 0.1]}>
      <mesh>
        <sphereGeometry args={[0.035, 24, 24]} />
        <meshBasicMaterial color={palette.amber} toneMapped={false} />
      </mesh>
      <Billboard>
        <group ref={ref}>
          <mesh>
            <ringGeometry args={[0.1, 0.106, 64]} />
            <meshBasicMaterial
              color={palette.amber}
              transparent
              opacity={0.55}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[0.18, 0.183, 64]} />
            <meshBasicMaterial
              color={palette.amber}
              transparent
              opacity={0.2}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[0.23, 0.232, 64]} />
            <meshBasicMaterial
              color={palette.bench}
              transparent
              opacity={0.32}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </Billboard>
      <Billboard>
        <mesh>
          <circleGeometry args={[0.3, 64]} />
          <meshBasicMaterial
            color={palette.amber}
            transparent
            opacity={0.035}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

function StarField() {
  const geometry = useMemo(() => {
    const random = seeded(412);
    const count = 220;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const angle = random() * Math.PI * 2;
      const radius = 2.4 + random() * 4.2;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = (random() - 0.5) * 4.4;
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
        size={0.018}
        transparent
        opacity={0.44}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const { camera } = useThree();

  const handPoints = useCurve([
    [-3.8, 2.1, -0.45],
    [-2.95, 1.48, -0.22],
    [-2.15, 1.02, -0.04],
    [-1.36, 0.81, 0.02],
    [-0.56, 0.66, 0.06],
    [0.1, 0.42, 0.08],
    [0.5, 0.24, 0.1],
    [0.74, 0.13, 0.1],
  ]);

  const robotUpper = useCurve([
    [3.75, 1.44, -0.62],
    [3.18, 1.09, -0.35],
    [2.55, 0.79, -0.12],
    [1.86, 0.53, 0.02],
    [1.28, 0.31, 0.08],
    [0.9, 0.18, 0.1],
  ]);

  const robotLower = useCurve([
    [3.75, -0.98, -0.62],
    [3.2, -0.78, -0.35],
    [2.56, -0.49, -0.12],
    [1.9, -0.2, 0.02],
    [1.3, 0.01, 0.08],
    [0.9, 0.09, 0.1],
  ]);

  const jawUpper = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.3, 0.34, 0.08),
        new THREE.Vector3(1.02, 0.25, 0.09),
        new THREE.Vector3(0.8, 0.17, 0.1),
      ]).getPoints(24),
    [],
  );

  const jawLower = useMemo(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(1.3, -0.02, 0.08),
        new THREE.Vector3(1.02, 0.03, 0.09),
        new THREE.Vector3(0.8, 0.1, 0.1),
      ]).getPoints(24),
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / 950);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const ease = 1 - Math.pow(0.001, delta);

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        state.pointer.x * 0.13 + scroll.current * 0.12,
        ease,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -state.pointer.y * 0.06 + Math.sin(t * 0.2) * 0.025,
        ease,
      );
      group.current.position.y =
        Math.sin(t * 0.33) * 0.045 - scroll.current * 0.18;
    }

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      state.pointer.x * 0.18,
      ease,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      0.35 + state.pointer.y * 0.1 + scroll.current * 0.3,
      ease,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      7.2 - scroll.current * 0.55,
      ease,
    );
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <StarField />
      <group ref={group}>
        <gridHelper
          args={[14, 28, palette.bench, palette.bench]}
          position={[0, -1.82, 0]}
        >
          <lineBasicMaterial
            attach="material"
            color={palette.bench}
            transparent
            opacity={0.12}
          />
        </gridHelper>

        <Line
          points={handPoints}
          color={palette.bench}
          lineWidth={1}
          transparent
          opacity={0.62}
        />
        <TraceParticles
          points={handPoints}
          from={palette.bench}
          to={palette.amber}
          size={0.03}
        />

        <Line
          points={robotUpper}
          color={palette.bench}
          lineWidth={0.9}
          transparent
          opacity={0.34}
        />
        <Line
          points={robotLower}
          color={palette.bench}
          lineWidth={0.9}
          transparent
          opacity={0.34}
        />
        <TraceParticles
          points={robotUpper}
          from={alpha(palette.bench, 1)}
          to={palette.amber}
          size={0.018}
        />
        <TraceParticles
          points={robotLower}
          from={alpha(palette.bench, 1)}
          to={palette.amber}
          size={0.018}
        />

        <Line
          points={jawUpper}
          color={palette.bench}
          lineWidth={1.3}
          transparent
          opacity={0.78}
        />
        <Line
          points={jawLower}
          color={palette.bench}
          lineWidth={1.3}
          transparent
          opacity={0.78}
        />

        <ContactPulse />

        <mesh position={[0.74, 0.13, 0.1]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshBasicMaterial
            color={palette.amber}
            transparent
            opacity={0.06}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[-3.0, 1.52, -0.4]}>
          <sphereGeometry args={[0.028, 16, 16]} />
          <meshBasicMaterial color={palette.bench} transparent opacity={0.8} />
        </mesh>
      </group>
    </>
  );
}

export function HeroScene() {
  return <Scene />;
}
