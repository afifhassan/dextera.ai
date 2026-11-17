"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene3D } from "@/components/three/Scene3D";
import { TreatedPhoto } from "@/components/media/TreatedPhoto";
import { home } from "@/lib/data/home";
import { palette } from "@/lib/palette";

const TwinScene = dynamic(
  () =>
    import("@/components/three/TwinScene").then((module) => module.TwinScene),
  { ssr: false },
);

/** Static stand-in for the PBR centre stage (no WebGL, reduced motion). */
function SimPlate() {
  return (
    <svg
      viewBox="0 0 340 560"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="twin-bed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a4f56" />
          <stop offset="100%" stopColor="#22252a" />
        </linearGradient>
        <linearGradient id="twin-part" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7e8791" />
          <stop offset="34%" stopColor="#e4e9ee" />
          <stop offset="62%" stopColor="#aab3bd" />
          <stop offset="100%" stopColor="#616a74" />
        </linearGradient>
        <linearGradient id="twin-probe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8d959e" />
          <stop offset="45%" stopColor="#f0f3f6" />
          <stop offset="100%" stopColor="#7a828c" />
        </linearGradient>
        <radialGradient id="twin-ao" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0b0906" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0b0906" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="340" height="560" fill="#141312" />
      <ellipse cx="170" cy="386" rx="150" ry="54" fill="url(#twin-ao)" />
      <path d="M40 356 L110 322 L300 322 L246 372 Z" fill="url(#twin-bed)" />
      <path
        d="M40 356 L110 322 L300 322 L246 372 Z"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.24"
      />
      <path
        d="M40 356V286 L110 252 L300 252 L300 322 M110 252V322"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.12"
      />

      <ellipse cx="176" cy="336" rx="54" ry="20" fill="url(#twin-part)" />
      <path d="M122 336v-46a54 20 0 0 0 108 0v46Z" fill="url(#twin-part)" />
      <ellipse
        cx="176"
        cy="290"
        rx="54"
        ry="20"
        fill="#d8dee4"
        fillOpacity="0.9"
      />
      <ellipse cx="176" cy="284" rx="20" ry="8" fill={palette.amber} />

      <path d="M232 236 L252 236 L252 296 L232 296 Z" fill="url(#twin-probe)" />
      <path d="M242 296 L238 322 L246 322 Z" fill="#cfd5db" />
      <circle cx="242" cy="324" r="4" fill={palette.amber} />

      <ellipse
        cx="176"
        cy="304"
        rx="72"
        ry="26"
        fill="none"
        stroke={palette.trace}
        strokeOpacity="0.35"
        strokeDasharray="3 6"
      />
      <path
        d="M176 304 L232 274 M176 304 L140 280"
        stroke={palette.amber}
        strokeOpacity="0.4"
      />
      <text
        x="36"
        y="52"
        fill={palette.bench}
        fillOpacity="0.5"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="2"
      >
        PBR / METAL 0.95 ROUGH 0.24
      </text>
    </svg>
  );
}

/** Stage one: orthographic CAD schematic with dimensions and axis triad. */
function CadStage() {
  return (
    <svg
      viewBox="0 0 340 560"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="cad-grid"
          width="28"
          height="28"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M28 0H0V28"
            fill="none"
            stroke={palette.steel}
            strokeOpacity="0.28"
          />
        </pattern>
        <pattern
          id="cad-grid-fine"
          width="7"
          height="7"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M7 0H0V7"
            fill="none"
            stroke={palette.steel}
            strokeOpacity="0.12"
          />
        </pattern>
      </defs>

      <rect width="340" height="560" fill="url(#cad-grid-fine)" />
      <rect width="340" height="560" fill="url(#cad-grid)" />

      {/* Fixture plate */}
      <path
        d="M44 372 L112 336 L296 336 L242 386 Z"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.5"
      />
      <path
        d="M44 372V318 L112 282 L296 282 L296 336 M112 282V336 M242 386V330"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.3"
      />

      {/* Machined part, orthographic */}
      <ellipse
        cx="176"
        cy="348"
        rx="52"
        ry="18"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.7"
      />
      <path
        d="M124 348v-48a52 18 0 0 0 104 0v48"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.55"
      />
      <ellipse
        cx="176"
        cy="300"
        rx="52"
        ry="18"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.75"
      />
      <ellipse
        cx="176"
        cy="300"
        rx="19"
        ry="7"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.6"
      />
      <path
        d="M176 300v-22 M170 278h12"
        stroke={palette.bench}
        strokeOpacity="0.5"
      />

      {/* Probe, exploded orthographic view */}
      <path
        d="M236 214 L258 214 L258 292 L236 292 Z"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.6"
      />
      <path
        d="M236 240h22M236 268h22M247 214v78"
        stroke={palette.bench}
        strokeOpacity="0.28"
        strokeDasharray="2 4"
      />
      <path
        d="M247 292 L243 314 M247 292 L251 314"
        stroke={palette.amber}
        strokeOpacity="0.8"
      />
      <circle cx="247" cy="316" r="3.2" fill={palette.amber} />

      {/* Dimension lines */}
      <path
        d="M92 424h172M92 416v16M264 416v16"
        stroke={palette.bench}
        strokeOpacity="0.55"
      />
      <path
        d="M92 424l9-4v8zM264 424l-9-4v8z"
        fill={palette.bench}
        fillOpacity="0.7"
      />
      <text
        x="140"
        y="442"
        fill={palette.bench}
        fillOpacity="0.8"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        Ø 42.00
      </text>

      <path
        d="M286 214v122M278 214h16M278 336h16"
        stroke={palette.bench}
        strokeOpacity="0.4"
      />
      <text
        x="292"
        y="280"
        fill={palette.bench}
        fillOpacity="0.7"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.2"
        transform="rotate(90 292 280)"
      >
        78.40
      </text>

      {/* Angular callout */}
      <path
        d="M176 348 L232 316"
        stroke={palette.bench}
        strokeOpacity="0.35"
        strokeDasharray="3 4"
      />
      <path
        d="M206 332 A42 42 0 0 0 196 348"
        fill="none"
        stroke={palette.amber}
        strokeOpacity="0.7"
      />
      <text
        x="206"
        y="322"
        fill={palette.amber}
        fillOpacity="0.9"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.2"
      >
        θ 12.4°
      </text>

      {/* Datum crosshair */}
      <path
        d="M120 300h112M176 262v88"
        stroke={palette.trace}
        strokeOpacity="0.35"
        strokeDasharray="6 4"
      />
      <circle cx="176" cy="300" r="2.6" fill={palette.trace} />

      {/* Axis triad */}
      <g transform="translate(48 486)">
        <path d="M0 0h34" stroke={palette.amber} strokeOpacity="0.8" />
        <path d="M0 0v-34" stroke={palette.bench} strokeOpacity="0.6" />
        <path d="M0 0l-22 18" stroke={palette.trace} strokeOpacity="0.7" />
        <text
          x="38"
          y="4"
          fill={palette.amber}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="7"
        >
          X
        </text>
        <text
          x="-4"
          y="-38"
          fill={palette.bench}
          fillOpacity="0.8"
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="7"
        >
          Z
        </text>
        <text
          x="-30"
          y="28"
          fill={palette.trace}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="7"
        >
          Y
        </text>
      </g>

      <text
        x="44"
        y="524"
        fill={palette.bench}
        fillOpacity="0.6"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        Δx +0.04 mm
      </text>
      <text
        x="44"
        y="540"
        fill={palette.bench}
        fillOpacity="0.38"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        TOLERANCE ±0.08 mm
      </text>
    </svg>
  );
}

/**
 * The sim-to-real triptych: CAD schematic, PBR simulation and the physical
 * cell. Scroll scrubs a wipe cursor across all three, and the simulated error
 * drift resolves from coral to trace teal as the gap closes.
 */
export function ChallengeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLSpanElement>(null);
  const deltaRef = useRef<HTMLSpanElement>(null);
  const stageProgress = useRef(0);
  const cadLabelRef = useRef<HTMLSpanElement>(null);
  const simLabelRef = useRef<HTMLSpanElement>(null);
  const realLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      stageProgress.current = 1;
      gsap.set(centerRef.current, { clipPath: "inset(0 0% 0 0)" });
      gsap.set(rightRef.current, { clipPath: "inset(0 0% 0 0)" });
      gsap.set(cursorRef.current, { left: "99.9%" });
      gsap.set([cadLabelRef.current, simLabelRef.current, realLabelRef.current], {
        opacity: 1,
      });
      gsap.set(driftRef.current, { opacity: 0 });
      gsap.set(deltaRef.current, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.set(centerRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(rightRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(cursorRef.current, { left: "33.333%" });
      gsap.set([simLabelRef.current, realLabelRef.current], { opacity: 0.25 });
      gsap.set(cadLabelRef.current, { opacity: 1 });
      gsap.set(driftRef.current, { opacity: 1 });
      gsap.set(deltaRef.current, { opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.7,
          onUpdate: (self) => {
            stageProgress.current = self.progress;
          },
        },
      });

      timeline
        .to(cursorRef.current, { left: "66.666%", duration: 0.48, ease: "none" }, 0)
        .to(
          centerRef.current,
          { clipPath: "inset(0 0% 0 0)", duration: 0.48, ease: "none" },
          0,
        )
        .to(simLabelRef.current, { opacity: 1, duration: 0.2 }, 0.18)
        .to(cursorRef.current, { left: "99.9%", duration: 0.52, ease: "none" }, 0.48)
        .to(
          rightRef.current,
          { clipPath: "inset(0 0% 0 0)", duration: 0.52, ease: "none" },
          0.48,
        )
        .to(realLabelRef.current, { opacity: 1, duration: 0.2 }, 0.66)
        .to(driftRef.current, { opacity: 0, duration: 0.24, ease: "none" }, 0.58)
        .to(deltaRef.current, { opacity: 1, duration: 0.24, ease: "none" }, 0.66);
    }, container);

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      context.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="relative overflow-hidden rounded-[12px] border border-steel/15 bg-ink">
        <div className="relative aspect-[3/4] w-full sm:aspect-[1000/560]">
          {/* 01 — CAD schematic */}
          <div className="absolute inset-y-0 left-0 w-1/3 overflow-hidden border-r border-bench/12 bg-ink">
            <CadStage />
            <span
              ref={cadLabelRef}
              className="absolute left-3 top-3 font-mono text-[7px] uppercase leading-[1.6] tracking-[0.16em] text-bench/80 sm:left-4 sm:top-4 sm:text-[8px]"
            >
              01 · CAD schematic
              <span className="mt-0.5 block text-bench/45">vector / orthographic</span>
            </span>
          </div>

          {/* 02 — PBR simulation */}
          <div
            ref={centerRef}
            className="absolute inset-y-0 left-1/3 w-1/3 overflow-hidden border-r border-bench/12 bg-[#141312]"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <Scene3D
              minWidth={1024}
              camera={{ position: [0, 1.1, 4.6], fov: 32 }}
              fallback={<SimPlate />}
              className="absolute inset-0"
            >
              <TwinScene progress={stageProgress} />
            </Scene3D>
            <div
              className="bg-grid-dark pointer-events-none absolute inset-0 opacity-30"
              aria-hidden="true"
            />
            <span
              ref={simLabelRef}
              className="absolute left-3 top-3 font-mono text-[7px] uppercase leading-[1.6] tracking-[0.16em] text-bench/80 sm:left-4 sm:top-4 sm:text-[8px]"
            >
              02 · {home.challenge.visual.leftLabel}
              <span className="mt-0.5 block text-bench/45">PBR / calibrated mesh</span>
            </span>

            <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-col gap-1 sm:inset-x-4 sm:bottom-4">
              <span
                ref={driftRef}
                className="font-mono text-[7px] uppercase tracking-[0.14em] text-coral sm:text-[8px]"
              >
                Drift Δ 18.4 mm · uncalibrated
              </span>
              <span
                ref={deltaRef}
                className="absolute bottom-0 font-mono text-[7px] uppercase tracking-[0.14em] text-trace sm:text-[8px]"
              >
                Match Δ 0.7 mm · calibrated
              </span>
              <span className="mt-3 font-mono text-[7px] uppercase tracking-[0.14em] text-bench/55">
                Fn 14.2 N · jitter 0.02 mm
              </span>
            </div>
          </div>

          {/* 03 — Physical reality */}
          <div
            ref={rightRef}
            className="absolute inset-y-0 right-0 w-1/3 overflow-hidden"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <TreatedPhoto
              src="/photos/sim-to-real-twin.webp"
              alt="The physical robotic cell that the simulation is calibrated against."
              sizes="(max-width: 1024px) 34vw, 31vw"
              className="absolute inset-0"
              imageClassName="object-[18%_center]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/35"
              aria-hidden="true"
            />
            <span
              ref={realLabelRef}
              className="absolute left-3 top-3 font-mono text-[7px] uppercase leading-[1.6] tracking-[0.16em] text-bench/85 sm:left-4 sm:top-4 sm:text-[8px]"
            >
              03 · {home.challenge.visual.rightLabel}
              <span className="mt-0.5 block text-bench/45">field plate / duotone</span>
            </span>
            <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-end justify-between gap-2 sm:inset-x-4 sm:bottom-4">
              <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-bench/70 sm:text-[8px]">
                Verified on site
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-trace"
                aria-hidden="true"
              />
            </div>
            {/* Registration marks */}
            <svg
              viewBox="0 0 340 560"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d="M16 16h34M16 16v34M324 16h-34M324 16v34M16 544h34M16 544v-34M324 544h-34M324 544v-34"
                fill="none"
                stroke={palette.bench}
                strokeOpacity="0.5"
              />
            </svg>
          </div>

          {/* Scroll wipe cursor */}
          <div
            ref={cursorRef}
            className="pointer-events-none absolute inset-y-0 z-10 w-px bg-amber/90 shadow-[0_0_26px_rgba(240,161,43,0.55)]"
            style={{ left: "33.333%" }}
            aria-hidden="true"
          >
            <span className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap bg-amber px-1.5 py-0.5 font-mono text-[6.5px] uppercase tracking-[0.14em] text-ink sm:text-[7px]">
              {home.challenge.visual.divergenceLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <p className="max-w-2xl font-mono text-[10px] leading-[1.7] uppercase tracking-[0.12em] text-steel">
          {home.challenge.visual.caption}
        </p>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.14em] text-steel">
          <span aria-hidden="true" className="h-px w-6 bg-steel/40" />
          {home.challenge.visual.bridgeLabel} · measured
        </span>
      </div>
    </div>
  );
}
