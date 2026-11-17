"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { palette } from "@/lib/palette";

/**
 * Procedural studio environment for the PBR metals.
 *
 * A PMREM-filtered scene of soft bench-white key panels, an amber kicker and a
 * trace-teal rim, so steel picks up Daxtera light instead of a stock HDRI. No
 * network request, no bundled environment map, disposed with the canvas.
 */
export function StudioEnvironment({ intensity = 1 }: { intensity?: number }) {
  const gl = useThree((state) => state.gl);

  const target = useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const studio = new THREE.Scene();
    const plane = new THREE.PlaneGeometry(1, 1);
    const materials: THREE.Material[] = [];

    const addPanel = (
      colour: string,
      power: number,
      position: [number, number, number],
      scale: [number, number],
    ) => {
      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colour).multiplyScalar(power * intensity),
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(plane, material);
      mesh.position.set(...position);
      mesh.scale.set(scale[0], scale[1], 1);
      mesh.lookAt(0, 0, 0);
      studio.add(mesh);
      materials.push(material);
    };

    // Key and fill
    addPanel(palette.bench, 1.35, [0.4, 3.4, 1.2], [7, 6]);
    addPanel(palette.bench, 0.5, [-2.6, 0.4, 2.6], [3.4, 3.4]);
    // Brand kicker lights
    addPanel(palette.amber, 1.9, [-3.1, 0.9, 1.1], [2.8, 2.2]);
    addPanel(palette.trace, 1.2, [3.2, 0.2, 0.6], [2.2, 2.2]);
    // Dark surround and floor bounce
    addPanel(palette.ink, 0.32, [0, 0.6, -4.2], [9, 7]);
    addPanel(palette.ink, 0.55, [0, -2.8, 0.8], [9, 7]);

    const renderTarget = pmrem.fromScene(studio, 0.035);

    pmrem.dispose();
    materials.forEach((material) => material.dispose());
    plane.dispose();
    studio.clear();

    return renderTarget;
  }, [gl, intensity]);

  useEffect(() => () => target.dispose(), [target]);

  return <primitive object={target.texture} attach="environment" />;
}

/** Radial falloff plane used as a cheap contact shadow under a metal part. */
export function groundAOTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      4,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, "rgba(11, 9, 6, 0.72)");
    gradient.addColorStop(0.55, "rgba(11, 9, 6, 0.3)");
    gradient.addColorStop(1, "rgba(11, 9, 6, 0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
