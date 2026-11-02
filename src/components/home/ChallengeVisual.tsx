"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home } from "@/lib/data/home";
import { palette } from "@/lib/palette";

function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

const random = seeded(8421);
const points = Array.from({ length: 190 }, () => {
  const x = 634 + random() * 262;
  const y = 158 + random() * 246;
  return { x, y, r: 0.8 + random() * 1.6, o: 0.25 + random() * 0.65 };
});

export function ChallengeVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const realRef = useRef<SVGGElement>(null);
  const divergenceRef = useRef<SVGGElement>(null);
  const bridgeRef = useRef<SVGPathElement>(null);
  const bridgeGlowRef = useRef<SVGPathElement>(null);
  const bridgeNodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      gsap.set(realRef.current, { x: 0, opacity: 1 });
      gsap.set(divergenceRef.current, { opacity: 0.32 });
      gsap.set(bridgeRef.current, { strokeDashoffset: 0 });
      gsap.set(bridgeGlowRef.current, { opacity: 0.25 });
      gsap.set(bridgeNodesRef.current, { opacity: 1 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.set(realRef.current, { x: 44, opacity: 0.62 });
      gsap.set(divergenceRef.current, { opacity: 0 });
      gsap.set(bridgeRef.current, { strokeDashoffset: 420 });
      gsap.set(bridgeGlowRef.current, { opacity: 0 });
      gsap.set(bridgeNodesRef.current, { opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 82%",
          end: "bottom 48%",
          scrub: 0.8,
        },
      });

      timeline
        .to(
          realRef.current,
          { x: 0, opacity: 1, duration: 0.8, ease: "none" },
          0,
        )
        .to(
          divergenceRef.current,
          { opacity: 1, duration: 0.18, ease: "none" },
          0.06,
        )
        .to(
          divergenceRef.current,
          { opacity: 0.28, duration: 0.3, ease: "none" },
          0.58,
        )
        .to(
          bridgeRef.current,
          { strokeDashoffset: 0, duration: 0.65, ease: "none" },
          0.38,
        )
        .to(
          bridgeGlowRef.current,
          { opacity: 0.2, duration: 0.4, ease: "none" },
          0.55,
        )
        .to(
          bridgeNodesRef.current,
          { opacity: 1, duration: 0.28, ease: "none" },
          0.68,
        );
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
        <div
          className="bg-grid-dark absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 1000 520"
          className="relative h-auto w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bridge-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={palette.bench} stopOpacity="0" />
              <stop offset="28%" stopColor={palette.bench} stopOpacity="0.65" />
              <stop offset="72%" stopColor={palette.bench} stopOpacity="0.65" />
              <stop offset="100%" stopColor={palette.bench} stopOpacity="0" />
            </linearGradient>
            <radialGradient id="synthetic-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={palette.bench} stopOpacity="0.11" />
              <stop offset="100%" stopColor={palette.bench} stopOpacity="0" />
            </radialGradient>
            <filter
              id="bridge-blur"
              x="-40%"
              y="-200%"
              width="180%"
              height="500%"
            >
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <clipPath id="real-reference-clip">
              <rect x="614" y="92" width="330" height="322" rx="8" />
            </clipPath>
          </defs>

          <text
            x="64"
            y="64"
            fill={palette.bench}
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="10"
            letterSpacing="2.4"
          >
            SYNTHETIC SCENE
          </text>
          <text
            x="632"
            y="64"
            fill={palette.bench}
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="10"
            letterSpacing="2.4"
          >
            REAL-WORLD REFERENCE
          </text>

          <path
            d="M500 92V438"
            stroke={palette.bench}
            strokeOpacity="0.18"
            strokeDasharray="2 9"
          />
          <circle cx="500" cy="260" r="210" fill="url(#synthetic-glow)" />
          <circle
            cx="500"
            cy="260"
            r="158"
            fill="none"
            stroke={palette.bench}
            strokeOpacity="0.1"
          />

          {/* Clean synthetic geometry */}
          <g>
            <path
              d="M96 366 L246 272 L414 272 L282 382 Z"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.5"
              strokeWidth="1.1"
            />
            <path
              d="M96 366V238L246 144V272M282 382V264L414 272"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.34"
              strokeWidth="1"
            />
            <path
              d="M246 144L414 178V272M246 144L96 238"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.2"
              strokeWidth="1"
            />
            <path
              d="M134 332 L226 278 L350 278 L274 340 Z"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.26"
              strokeWidth="1"
            />
            <path
              d="M196 232V172H308V222M196 232L154 258M308 222L350 246"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.32"
            />
            <rect
              x="268"
              y="206"
              width="54"
              height="42"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.65"
            />
            <path
              d="M268 228h54M295 206v42"
              stroke={palette.bench}
              strokeOpacity="0.35"
            />
            <circle cx="338" cy="240" r="3.5" fill={palette.amber} />
            <path
              d="M338 240l22-16"
              stroke={palette.amber}
              strokeOpacity="0.45"
            />
            <path
              d="M96 416h332M112 404V430M306 404V430"
              stroke={palette.bench}
              strokeOpacity="0.2"
            />
            <path
              d="M68 260h360M68 300h360M68 340h360"
              stroke={palette.bench}
              strokeOpacity="0.08"
            />
          </g>

          {/* Real-world reference: field photography, point-cloud overlay. */}
          <g clipPath="url(#real-reference-clip)">
            <g ref={realRef}>
              <image
                href="/photos/connector-work.webp"
                x="614"
                y="92"
                width="330"
                height="322"
                preserveAspectRatio="xMidYMid slice"
                opacity="0.76"
              />
              <rect
                x="614"
                y="92"
                width="330"
                height="322"
                fill={palette.ink}
                opacity="0.28"
              />
            <path
              d="M630 356 C690 324 730 330 772 296 C812 264 862 258 902 282"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.18"
            />
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={point.r}
                fill={point.o > 0.7 ? palette.bench : palette.bench}
                opacity={point.o}
              />
            ))}
            <path
              d="M690 346 C734 314 766 312 806 288 C850 262 880 278 918 258"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <path
              d="M652 196 C700 178 742 190 790 172 C832 156 870 164 904 150"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.14"
              strokeDasharray="2 5"
            />
            <circle
              cx="744"
              cy="232"
              r="2.4"
              fill={palette.bench}
              opacity="0.8"
            />
            <circle cx="862" cy="326" r="3" fill={palette.bench} />
            <circle
              cx="862"
              cy="326"
              r="12"
              fill="none"
              stroke={palette.bench}
              strokeOpacity="0.25"
            />
            <path
              d="M860 410h96M888 396v30M934 396v30"
              stroke={palette.bench}
              strokeOpacity="0.2"
            />
            </g>
          </g>

          {/* Divergence, then bridge */}
          <g ref={divergenceRef}>
            <path
              d="M432 234 C462 210 486 226 520 204 C548 186 564 198 578 182"
              fill="none"
              stroke={palette.amber}
              strokeWidth="1.4"
            />
            <path
              d="M424 280 C456 272 482 294 518 282 C544 273 560 282 582 270"
              fill="none"
              stroke={palette.amber}
              strokeOpacity="0.75"
              strokeWidth="1.2"
              strokeDasharray="3 4"
            />
            <path
              d="M430 332 C462 350 488 326 520 342 C544 354 564 338 580 350"
              fill="none"
              stroke={palette.amber}
              strokeOpacity="0.55"
              strokeWidth="1.1"
            />
            <g transform="translate(496 188)">
              <path d="M0 0l6 14H-6Z" fill={palette.amber} />
              <text
                x="12"
                y="12"
                fill={palette.bench}
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="9"
                letterSpacing="1.6"
              >
                DIVERGENCE
              </text>
            </g>
          </g>

          <path
            ref={bridgeGlowRef}
            d="M408 286 C462 246 540 244 604 280"
            fill="none"
            stroke={palette.bench}
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0"
            filter="url(#bridge-blur)"
          />
          <path
            ref={bridgeRef}
            d="M408 286 C462 246 540 244 604 280"
            fill="none"
            stroke="url(#bridge-gradient)"
            strokeWidth="1.8"
            strokeDasharray="420"
            strokeDashoffset="420"
          />
          <g ref={bridgeNodesRef} opacity="0">
            <circle cx="408" cy="286" r="3.2" fill={palette.bench} />
            <circle cx="506" cy="253" r="3.2" fill={palette.bench} />
            <circle cx="604" cy="280" r="3.2" fill={palette.bench} />
            <text
              x="508"
              y="226"
              textAnchor="middle"
              fill={palette.bench}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="9"
              letterSpacing="1.6"
            >
              MEASURED
            </text>
          </g>

          <path d="M64 454h872" stroke={palette.bench} strokeOpacity="0.18" />
          <path
            d="M64 454v8M936 454v8"
            stroke={palette.bench}
            strokeOpacity="0.3"
          />
        </svg>
      </div>
      <p className="mt-4 max-w-2xl font-mono text-[10px] leading-[1.7] uppercase tracking-[0.12em] text-steel">
        {home.challenge.visual.caption}
      </p>
    </div>
  );
}
