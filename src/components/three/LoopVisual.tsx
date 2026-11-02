"use client";

import dynamic from "next/dynamic";
import type { RefObject } from "react";
import { Scene3D } from "@/components/three/Scene3D";
import { Poster } from "@/components/three/Poster";

const LoopScene = dynamic(
  () =>
    import("@/components/three/LoopScene").then((module) => module.LoopScene),
  { ssr: false },
);

export function LoopVisual({
  progress,
  active,
}: {
  progress: RefObject<number>;
  active: number;
}) {
  return (
    <Scene3D
      minWidth={768}
      camera={{ position: [0, 2.8, 7.2], fov: 38 }}
      fallback={<Poster variant="loop" />}
      className="h-full w-full"
    >
      <LoopScene progress={progress} active={active} />
    </Scene3D>
  );
}
