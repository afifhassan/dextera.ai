"use client";

import { useRef, useState } from "react";
import { home } from "@/lib/data/home";
import { useScrollProgress } from "@/components/three/useScrollProgress";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { cn } from "@/lib/utils";
import { palette } from "@/lib/palette";

const ACTION_SHORT = ["Phases", "Contact", "Outcome", "Recovery", "Safety"];

const ribbons = [
  { start: 46, width: 1.6, opacity: 0.55 },
  { start: 72, width: 1.2, opacity: 0.42 },
  { start: 98, width: 1.9, opacity: 0.7 },
  { start: 124, width: 1.1, opacity: 0.36 },
  { start: 150, width: 1.4, opacity: 0.48 },
];

const segments = Array.from({ length: 5 }, (_, index) => ({
  x: 652 + index * 62,
  width: 54,
}));

export function PrimitivesVisual() {
  const [active, setActive] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const { triggerRef } = useScrollProgress<HTMLDivElement>({
    start: "top 82%",
    end: "bottom 48%",
    scrub: 0.8,
    onProgress: (value) => {
      const next = Math.min(4, Math.max(0, Math.floor(value * 5)));
      setActive((current) => (current === next ? current : next));
    },
  });

  const handlePointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const normalized = (event.clientX - rect.left) / rect.width;
    if (normalized < 0.6) return;
    const next = Math.min(
      4,
      Math.max(0, Math.floor(((normalized - 0.6) / 0.4) * 5)),
    );
    setActive(next);
  };

  const current = home.primitives.actions[active];

  return (
    <div ref={triggerRef}>
      <div
        ref={areaRef}
        onPointerMove={handlePointer}
        className="overflow-hidden rounded-[12px] border border-steel/15 bg-ink/[0.012]"
      >
        <div className="relative hidden aspect-[1000/340] w-full sm:block">
          <svg
            viewBox="0 0 1000 340"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ribbon-gradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={palette.trace} stopOpacity="0.1" />
                <stop
                  offset="62%"
                  stopColor={palette.trace}
                  stopOpacity="0.62"
                />
                <stop
                  offset="100%"
                  stopColor={palette.trace}
                  stopOpacity="0.9"
                />
              </linearGradient>
              <linearGradient id="action-fade" x1="0" x2="1" y1="0" y2="0">
                <stop
                  offset="0%"
                  stopColor={palette.trace}
                  stopOpacity="0.05"
                />
                <stop
                  offset="100%"
                  stopColor={palette.trace}
                  stopOpacity="0.13"
                />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="1000" height="340" fill="transparent" />

            {/* Technical grid */}
            {Array.from({ length: 13 }, (_, index) => (
              <line
                key={`v-${index}`}
                x1={index * 82}
                y1="0"
                x2={index * 82}
                y2="340"
                stroke={palette.steel}
                strokeOpacity="0.08"
              />
            ))}
            {Array.from({ length: 5 }, (_, index) => (
              <line
                key={`h-${index}`}
                x1="0"
                y1={70 + index * 50}
                x2="1000"
                y2={70 + index * 50}
                stroke={palette.steel}
                strokeOpacity="0.08"
              />
            ))}

            <text
              x="40"
              y="36"
              fill={palette.steel}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="9"
              letterSpacing="2.2"
            >
              SIGNALS
            </text>
            <text
              x="652"
              y="36"
              fill={palette.steel}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="9"
              letterSpacing="2.2"
            >
              ACTION TIMELINE
            </text>

            {ribbons.map((ribbon, index) => {
              const y = ribbon.start + 58;
              const path = `M 40 ${y} C 190 ${y}, 218 ${170}, 342 ${168} S 520 ${170}, 640 ${170}`;
              return (
                <g key={index}>
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#ribbon-gradient)"
                    strokeWidth={ribbon.width}
                    opacity={ribbon.opacity}
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke={palette.trace}
                    strokeWidth="1"
                    strokeDasharray="2 10"
                    opacity="0.32"
                    className="dax-dash"
                  />
                  <circle
                    cx="40"
                    cy={y}
                    r={index === 2 ? 3 : 2}
                    fill={palette.trace}
                    opacity={0.5 + index * 0.05}
                  />
                </g>
              );
            })}

            <circle cx="640" cy="170" r="4" fill={palette.trace} />
            <circle
              cx="640"
              cy="170"
              r="15"
              fill="none"
              stroke={palette.trace}
              strokeOpacity="0.2"
            />

            <line
              x1="640"
              y1="170"
              x2="652"
              y2="170"
              stroke={palette.trace}
              strokeOpacity="0.4"
              strokeDasharray="2 3"
            />

            {segments.map((segment, index) => {
              const isActive = index === active;
              return (
                <g key={index}>
                  <rect
                    x={segment.x}
                    y="140"
                    width={segment.width}
                    height="60"
                    rx="6"
                    fill={isActive ? "url(#action-fade)" : "transparent"}
                    stroke={isActive ? palette.trace : palette.steel}
                    strokeOpacity={isActive ? 0.55 : 0.2}
                  />
                  <text
                    x={segment.x + 7}
                    y="166"
                    fill={isActive ? palette.deep : palette.steel}
                    fontFamily="var(--font-geist-mono), monospace"
                    fontSize="8"
                    letterSpacing="1.1"
                  >
                    0{index + 1}
                  </text>
                  <line
                    x1={segment.x + 7}
                    y1="177"
                    x2={segment.x + segment.width - 7}
                    y2="177"
                    stroke={isActive ? palette.trace : palette.steel}
                    strokeOpacity={isActive ? 0.52 : 0.2}
                  />
                  <text
                    x={segment.x + 7}
                    y="191"
                    fill={isActive ? palette.ink : palette.steel}
                    fontFamily="var(--font-geist-mono), monospace"
                    fontSize="7"
                    letterSpacing="0.6"
                  >
                    {ACTION_SHORT[index].toUpperCase()}
                  </text>
                </g>
              );
            })}

            <g
              style={{
                transform: `translateX(${segments[active].x + segments[active].width / 2}px)`,
                transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <line
                x1="0"
                y1="92"
                x2="0"
                y2="224"
                stroke={palette.amber}
                strokeWidth="1.2"
              />
              <circle cx="0" cy="92" r="3" fill={palette.amber} />
              <path d="M-5 84 L0 77 L5 84Z" fill={palette.amber} />
            </g>

            <text
              x="40"
              y="248"
              fill={palette.steel}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="8"
              letterSpacing="1.4"
            >
              01 VISION
            </text>
            <text
              x="40"
              y="266"
              fill={palette.steel}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="8"
              letterSpacing="1.4"
            >
              02 MOTION · 03 TOUCH
            </text>
            <text
              x="40"
              y="284"
              fill={palette.steel}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="8"
              letterSpacing="1.4"
            >
              04 SOUND · 05 ENVIRONMENT
            </text>
          </svg>
        </div>

        {/* Compact diagram for phones: readable at 360 px without shrinking
            the full timeline into illegibility. */}
        <div className="sm:hidden">
          <div className="px-3 py-4">
            <svg
              viewBox="0 0 360 160"
              className="h-auto w-full"
              aria-hidden="true"
            >
              <text
                x="10"
                y="18"
                fill={palette.steel}
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="7"
                letterSpacing="1.4"
              >
                SIGNALS
              </text>
              <text
                x="84"
                y="18"
                fill={palette.steel}
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="7"
                letterSpacing="1.4"
              >
                ACTION TIMELINE
              </text>

              {[0, 1, 2, 3, 4].map((index) => {
                const startY = 30 + index * 18;
                return (
                  <g key={index}>
                    <path
                      d={`M10 ${startY} C42 ${startY}, 48 78, 82 78`}
                      fill="none"
                      stroke={palette.trace}
                      strokeOpacity={0.35 + index * 0.04}
                    />
                    <circle cx="10" cy={startY} r="2" fill={palette.trace} />
                  </g>
                );
              })}
              <circle cx="84" cy="78" r="3" fill={palette.trace} />

              {segments.map((_, index) => {
                const activeSegment = index === active;
                const x = 92 + index * 52;
                return (
                  <g key={index}>
                    <rect
                      x={x}
                      y="48"
                      width="46"
                      height="60"
                      rx="5"
                      fill={activeSegment ? palette.trace : "transparent"}
                      fillOpacity={activeSegment ? 0.1 : 0}
                      stroke={activeSegment ? palette.trace : palette.steel}
                      strokeOpacity={activeSegment ? 0.6 : 0.25}
                    />
                    <text
                      x={x + 5}
                      y="66"
                      fill={palette.steel}
                      fontFamily="var(--font-geist-mono), monospace"
                      fontSize="6.5"
                      letterSpacing="0.8"
                    >
                      0{index + 1}
                    </text>
                    <line
                      x1={x + 5}
                      y1="74"
                      x2={x + 41}
                      y2="74"
                      stroke={activeSegment ? palette.trace : palette.steel}
                      strokeOpacity={activeSegment ? 0.55 : 0.2}
                    />
                    <text
                      x={x + 5}
                      y="90"
                      fill={palette.ink}
                      fontFamily="var(--font-geist-mono), monospace"
                      fontSize="6"
                      letterSpacing="0.4"
                    >
                      {ACTION_SHORT[index].toUpperCase()}
                    </text>
                  </g>
                );
              })}

              <g
                style={{
                  transform: `translateX(${92 + active * 52 + 23}px)`,
                  transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <line
                  x1="0"
                  y1="36"
                  x2="0"
                  y2="122"
                  stroke={palette.amber}
                  strokeWidth="1.2"
                />
                <circle cx="0" cy="36" r="2.5" fill={palette.amber} />
              </g>

              <text
                x="10"
                y="142"
                fill={palette.steel}
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="6.5"
                letterSpacing="0.8"
              >
                VISION · MOTION · TOUCH · SOUND · ENVIRONMENT
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between border-b border-steel/15 pb-3">
            <MicroLabel>{home.primitives.signalsLabel}</MicroLabel>
            <span className="font-mono text-[9px] tracking-[0.14em] text-steel">
              05 families
            </span>
          </div>
          <ul className="mt-1">
            {home.primitives.signals.map((signal, index) => (
              <li
                key={signal.title}
                className="group flex gap-4 border-b border-steel/12 py-4"
              >
                <span className="mt-0.5 font-mono text-[9px] tracking-[0.14em] text-steel">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-[15px] font-medium text-ink">
                    {signal.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.6] text-steel">
                    {signal.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="flex items-center justify-between border-b border-steel/15 pb-3">
            <MicroLabel>{home.primitives.actionsLabel}</MicroLabel>
            <span className="font-mono text-[9px] tracking-[0.14em] text-steel">
              playhead 0{active + 1}
            </span>
          </div>
          <div className="mt-1 grid grid-cols-1 sm:grid-cols-2">
            <div className="border-steel/12 sm:border-r">
              {home.primitives.actions.map((action, index) => (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-steel/12 py-3.5 text-left transition-colors duration-300",
                    index === active
                      ? "text-deep"
                      : "text-steel hover:text-ink",
                  )}
                >
                  <span className="font-mono text-[9px] tracking-[0.12em]">
                    0{index + 1}
                  </span>
                  <span className="h-px flex-1 bg-current opacity-20" />
                  <span className="max-w-[11rem] text-[13px] font-medium leading-snug">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>

            <div className="px-0 pt-6 sm:px-6 sm:pt-0">
              <MicroLabel tone="deep">Action 0{active + 1}</MicroLabel>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink">
                {current.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-[1.7] text-steel">
                {current.body}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-deep/30 bg-deep/[0.05] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-deep">
                  <span className="h-1 w-1 rounded-full bg-deep" />
                  {home.primitives.verifiedLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-coral/40 bg-transparent px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-coral">
                  <span aria-hidden="true">▲</span>
                  {home.primitives.rejectedLabel}
                </span>
                <span aria-hidden="true" className="text-steel">
                  →
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-deep/30 bg-deep/[0.05] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-deep">
                  <span className="h-1 w-1 rounded-full bg-deep" />
                  Replaced
                </span>
              </div>
              <p className="mt-3 max-w-xs text-[11px] leading-[1.6] text-steel">
                {home.primitives.rejectedNote}
              </p>
            </div>
          </div>
          <p className="mt-5 font-mono text-[9px] uppercase leading-[1.6] tracking-[0.12em] text-steel">
            {home.primitives.interactionHint}
          </p>
        </div>
      </div>
    </div>
  );
}
