"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { palette } from "@/lib/palette";
import { StudioEnvironment, groundAOTexture } from "./StudioEnvironment";

const CORAL = new THREE.Color(palette.coral);
const TRACE = new THREE.Color(palette.trace);

/** The centre stage of the sim-to-real triptych, in PBR. */
export function TwinScene({ progress }: { progress: RefObject<number> }) {
  const cell = useRef<THREE.Group>(null);
  const driftRef = useRef<THREE.Group>(null);
  const driftMaterial = useRef<THREE.MeshStandardMaterial>(null);
  const shellMaterial = useRef<THREE.MeshBasicMaterial>(null);

  const ao = useMemo(() => groundAOTexture(), []);

  useFrame((state, delta) => {
    const p = progress.current ?? 0;
    const ease = 1 - Math.pow(0.002, delta);
    const t = state.clock.getElapsedTime();

    if (cell.current) {
      cell.current.rotation.y = THREE.MathUtils.lerp(
        cell.current.rotation.y,
        -0.34 + state.pointer.x * 0.14 + p * 0.18,
        ease,
      );
      cell.current.rotation.x = THREE.MathUtils.lerp(
        cell.current.rotation.x,
        -0.04 - state.pointer.y * 0.05,
        ease,
      );
    }

    if (driftRef.current) {
      const jitter = (1 - p) * 0.035;
      driftRef.current.position.set(
        Math.sin(t * 1.7) * jitter,
        Math.cos(t * 1.3) * jitter * 0.6,
        Math.sin(t * 2.1) * jitter,
      );
      driftRef.current.scale.setScalar(1 + (1 - p) * 0.16);
    }

    if (driftMaterial.current) {
      driftMaterial.current.color.lerpColors(CORAL, TRACE, p);
      driftMaterial.current.emissive.lerpColors(CORAL, TRACE, p);
    }

    if (shellMaterial.current) {
      shellMaterial.current.color.lerpColors(CORAL, TRACE, p);
      shellMaterial.current.opacity = 0.05 - p * 0.028;
    }
  });

  return (
    <>
      <StudioEnvironment intensity={0.85} />
      <ambientLight intensity={0.28} />
      <directionalLight
        position={[3.4, 5.2, 3.8]}
        intensity={2.1}
        color={palette.bench}
      />
      <pointLight
        position={[-2.8, 1.1, 1.6]}
        intensity={9}
        distance={9}
        decay={2}
        color={palette.amber}
      />
      <pointLight
        position={[2.6, 0.6, -1.6]}
        intensity={5}
        distance={7}
        decay={2}
        color={palette.trace}
      />

      <group ref={cell} position={[0, -0.12, 0]}>
        {/* Machine bed */}
        <mesh position={[0, -0.66, 0]}>
          <boxGeometry args={[2.5, 0.13, 1.5]} />
          <meshStandardMaterial
            color="#3a3d42"
            metalness={0.86}
            roughness={0.42}
          />
        </mesh>
        <mesh position={[0, -0.595, 0]}>
          <boxGeometry args={[2.16, 0.014, 1.2]} />
          <meshStandardMaterial
            color="#8d959e"
            metalness={1}
            roughness={0.24}
          />
        </mesh>

        {/* Fixtured machined part */}
        <mesh position={[-0.12, -0.44, 0.02]}>
          <cylinderGeometry args={[0.34, 0.34, 0.26, 48]} />
          <meshStandardMaterial
            color="#b9c0c7"
            metalness={0.95}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[-0.12, -0.26, 0.02]}>
          <cylinderGeometry args={[0.13, 0.13, 0.11, 36]} />
          <meshStandardMaterial
            color="#d5dae0"
            metalness={0.9}
            roughness={0.22}
          />
        </mesh>
        <mesh position={[-0.12, -0.19, 0.02]}>
          <cylinderGeometry args={[0.02, 0.035, 0.16, 24]} />
          <meshStandardMaterial
            color={palette.amber}
            metalness={0.7}
            roughness={0.35}
            emissive={palette.amber}
            emissiveIntensity={0.12}
          />
        </mesh>

        {/* Robotic probe over the part */}
        <group position={[0.62, 0.16, 0.1]} rotation={[0, -0.5, -0.18]}>
          <mesh>
            <boxGeometry args={[0.2, 0.42, 0.2]} />
            <meshStandardMaterial
              color="#22242a"
              metalness={0.35}
              roughness={0.72}
            />
          </mesh>
          <mesh position={[0, 0.26, 0]}>
            <cylinderGeometry args={[0.072, 0.086, 0.2, 32]} />
            <meshStandardMaterial
              color="#9aa3ad"
              metalness={1}
              roughness={0.26}
            />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <cylinderGeometry args={[0.052, 0.052, 0.06, 28]} />
            <meshStandardMaterial
              color={palette.amber}
              metalness={0.85}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, -0.48, 0]}>
            <cylinderGeometry args={[0.012, 0.028, 0.52, 20]} />
            <meshStandardMaterial
              color="#cdd3d9"
              metalness={1}
              roughness={0.2}
            />
          </mesh>
          <mesh position={[0, -0.745, 0]}>
            <sphereGeometry args={[0.026, 24, 18]} />
            <meshStandardMaterial
              color={palette.amber}
              metalness={0.4}
              roughness={0.3}
              emissive={palette.amber}
              emissiveIntensity={0.9}
            />
          </mesh>
        </group>

        {/* Error-drift mesh: coral uncalibrated → trace calibrated */}
        <group ref={driftRef} position={[-0.12, -0.2, 0.02]}>
          <mesh>
            <sphereGeometry args={[0.4, 10, 7]} />
            <meshStandardMaterial
              ref={driftMaterial}
              color={palette.coral}
              emissive={palette.coral}
              emissiveIntensity={0.5}
              metalness={0.1}
              roughness={0.6}
              wireframe
              transparent
              opacity={0.85}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.4, 10, 7]} />
            <meshBasicMaterial
              ref={shellMaterial}
              color={palette.coral}
              transparent
              opacity={0.05}
              depthWrite={false}
            />
          </mesh>
        </group>

        {/* Coordinate frame on the fixture datum */}
        <group position={[-0.12, -0.16, 0.02]}>
          {[
            { dir: [0.44, 0, 0], colour: palette.amber },
            { dir: [0, 0.44, 0], colour: palette.bench },
            { dir: [0, 0, 0.44], colour: palette.trace },
          ].map(({ dir, colour }, index) => (
            <Line
              key={index}
              points={[
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(dir[0], dir[1], dir[2]),
              ]}
              color={colour}
              lineWidth={1}
              transparent
              opacity={0.6}
            />
          ))}
        </group>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.05, -0.585, 0]}>
          <planeGeometry args={[2.1, 1.4]} />
          <meshBasicMaterial map={ao} transparent opacity={0.6} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}
