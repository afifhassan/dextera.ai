"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
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
      {/* Normal force stack and millimetre crosshair, in 2D. */}
      <path
        d="M590 236 L642 208 M590 284 L642 312"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.7"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M588 260 L588 196 M552 260 L588 260 M588 260 L620 292"
        fill="none"
        stroke={palette.amber}
        strokeOpacity="0.65"
        strokeWidth="1.1"
      />
      <path d="M588 196l-4 9h8z" fill={palette.amber} />
      <path d="M552 260l9-4v8z" fill={palette.bench} fillOpacity="0.8" />
      <path d="M620 292l-8-1 4-7z" fill={palette.trace} />
      <text
        x="598"
        y="188"
        fill={palette.bench}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9"
        letterSpacing="1.4"
      >
        Z +0.42
      </text>
      <text
        x="500"
        y="276"
        fill={palette.bench}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9"
        letterSpacing="1.4"
      >
        X -1.20
      </text>
      <text
        x="604"
        y="322"
        fill={palette.trace}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9"
        letterSpacing="1.4"
      >
        Y +0.08
      </text>
      <text
        x="598"
        y="168"
        fill={palette.amber}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="9"
        letterSpacing="1.6"
      >
        Fn 12.4 N
      </text>
    </svg>
  );
}

/**
 * Millimetre readout beside the live contact point. Written straight to the
 * DOM on pointer move, so dragging the cursor never re-renders the canvas.
 */
function useContactReadout() {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const zRef = useRef<HTMLSpanElement>(null);
  const forceRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const write = () => {
      frame = 0;
      const set = (node: HTMLSpanElement | null, value: number) => {
        if (node) node.textContent = `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;
      };
      set(xRef.current, pointerX * 1.84);
      set(yRef.current, pointerY * 0.96);
      set(zRef.current, pointerX * 0.42);
      if (forceRef.current) {
        forceRef.current.textContent = (14.2 + Math.abs(pointerY) * 0.8).toFixed(1);
      }
    };

    const onPointer = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = -(event.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(write);
    };

    write();
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return { xRef, yRef, zRef, forceRef };
}

export function HeroVisual() {
  const readout = useContactReadout();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[12px] border border-bench/15 bg-ink">
      <TreatedPhoto
        src="/photos/real-assembly-hero.webp"
        alt="An expert's hands seating a pin fixture and spring rings into a machined component."
        sizes="(max-width: 1024px) 90vw, 42vw"
        priority
        className="absolute inset-0"
        imageClassName="object-[52%_center]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/70 via-ink/25 to-transparent"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_82%_18%,rgba(240,161,43,0.22),transparent_58%)]"
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
        camera={{ position: [0, 0.3, 6.8], fov: 38 }}
        fallback={<HeroTraceOverlay />}
        className="absolute inset-0"
      >
        <HeroScene />
      </Scene3D>

      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-bench">
          Field reference / hand assembly
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-bench">
          <span
            className="h-1.5 w-1.5 rounded-full bg-amber"
            aria-hidden="true"
          />
          Contact live
        </span>
      </div>

      <div className="pointer-events-none absolute right-4 top-10 flex flex-col items-end gap-1 text-right">
        <span className="font-mono text-[9px] tabular-nums tracking-[0.1em] text-bench">
          F<span className="text-[7px] align-sub">z</span>{" "}
          <span className="text-amber">14.2 N</span>
        </span>
        <span className="font-mono text-[9px] tabular-nums tracking-[0.1em] text-bench/80">
          Jitter <span className="text-trace">0.02 mm</span>
        </span>
        <span className="mt-1 h-px w-16 bg-bench/25" aria-hidden="true" />
        <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-bench/55">
          Probe / PBR render
        </span>
      </div>

      <dl className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-end gap-x-4 gap-y-2 rounded-lg border border-bench/15 bg-ink/55 px-3 py-2 backdrop-blur-[2px]">
        {[
          { label: "X", ref: readout.xRef, unit: "mm" },
          { label: "Y", ref: readout.yRef, unit: "mm" },
          { label: "Z", ref: readout.zRef, unit: "mm" },
          { label: "Fn", ref: readout.forceRef, unit: "N" },
        ].map((item) => (
          <div key={item.label} className="min-w-[54px]">
            <dt className="font-mono text-[7px] uppercase tracking-[0.2em] text-bench/60">
              {item.label}
            </dt>
            <dd className="font-mono text-[11px] tabular-nums tracking-[0.04em] text-bench">
              <span ref={item.ref}>+0.00</span>{" "}
              <span className="text-[8px] text-bench/55">{item.unit}</span>
            </dd>
          </div>
        ))}
        <span className="ml-auto hidden font-mono text-[7px] uppercase tracking-[0.16em] text-bench/50 sm:block">
          Commanded vs measured · 500 Hz
        </span>
      </dl>
    </div>
  );
}
