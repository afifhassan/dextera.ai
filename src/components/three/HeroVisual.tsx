"use client";

import dynamic from "next/dynamic";
import { Scene3D } from "@/components/three/Scene3D";
import { TreatedPhoto } from "@/components/media/TreatedPhoto";
import { palette } from "@/lib/palette";

// Loaded only on suitable screens with WebGL. Phones keep the photo and SVG trace.
const HeroScene = dynamic(
  () =>
    import("@/components/three/HeroScene").then((module) => module.HeroScene),
  { ssr: false },
);

function HeroTraceOverlay() {
  return (
    <svg
      viewBox="0 0 640 520"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <path
        d="M56 382 C140 318 196 232 292 248 C360 259 402 314 470 292 C522 276 548 242 608 258"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.72"
        strokeWidth="1.2"
        strokeDasharray="2 6"
      />
      {[
        [96, 354],
        [148, 300],
        [210, 256],
        [274, 248],
        [340, 272],
        [402, 306],
        [466, 292],
        [526, 270],
      ].map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={index > 5 ? 2.6 : 1.8}
          fill={palette.bench}
          opacity={0.65}
        />
      ))}
      <circle cx="588" cy="260" r="5" fill={palette.amber} />
      <circle
        cx="588"
        cy="260"
        r="19"
        fill="none"
        stroke={palette.amber}
        strokeOpacity="0.55"
      />
      <circle
        cx="588"
        cy="260"
        r="36"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.2"
      />
      <path
        d="M590 236 L642 208 M590 284 L642 312"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HeroVisual() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[12px] border border-bench/15 bg-ink">
      <TreatedPhoto
        src="/photos/expert-work-portrait.webp"
        alt="An expert's hands fitting a machined component with a precision tool."
        sizes="(max-width: 1024px) 90vw, 42vw"
        priority
        className="absolute inset-0"
        imageClassName="object-[52%_center]"
      />
      <div
        className="bg-grid-dark absolute inset-0 opacity-25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/80 to-transparent"
        aria-hidden="true"
      />
      <Scene3D
        minWidth={1024}
        camera={{ position: [0, 0.35, 7.2], fov: 38 }}
        fallback={<HeroTraceOverlay />}
        className="absolute inset-0"
      >
        <HeroScene />
      </Scene3D>
      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-bench">
          Field reference / expert work
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden="true" />
      </div>
    </div>
  );
}
