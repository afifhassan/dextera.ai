"use client";

import { useState } from "react";
import { TreatedPhoto } from "@/components/media/TreatedPhoto";
import type { ServiceVisual as ServiceVisualType } from "@/lib/data/services";
import { palette } from "@/lib/palette";

export function ServiceVisual({
  type,
  label,
  photo,
  photoAlt,
}: {
  type: ServiceVisualType;
  label?: string;
  photo: string;
  photoAlt: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[12px] border border-bench/15 bg-ink">
      <TreatedPhoto
        src={photo}
        alt={photoAlt}
        sizes="(max-width: 1024px) 100vw, 44vw"
        priority
        className="absolute inset-0"
        imageClassName={
          type === "benchmark" ? "object-[62%_center]" : "object-center"
        }
      />
      <div
        className="bg-grid-dark absolute inset-0 opacity-25"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
        aria-hidden="true"
      />

      {type === "dataset" ? <DatasetOverlay /> : null}
      {type === "simulator" ? <SimulatorOverlay /> : null}
      {type === "benchmark" ? <BenchmarkOverlay /> : null}

      {label ? (
        <span className="absolute inset-x-4 bottom-3 font-mono text-[8px] uppercase tracking-[0.16em] text-bench">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function DatasetOverlay() {
  const cells = Array.from({ length: 32 }, (_, index) => ({
    x: 58 + (index % 8) * 25,
    y: 104 + Math.floor(index / 8) * 23,
    flagged: index === 18,
    missing: index === 27,
  }));

  return (
    <svg
      viewBox="0 0 600 460"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <text
        x="52"
        y="58"
        fill={palette.bench}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="10"
        letterSpacing="2.2"
      >
        EPISODES / VERIFIED
      </text>
      <path
        d="M52 76 H370"
        stroke={palette.bench}
        strokeOpacity="0.28"
        strokeDasharray="2 7"
      />

      <rect
        x="42"
        y="88"
        width="238"
        height="126"
        rx="8"
        fill={palette.ink}
        fillOpacity="0.52"
        stroke={palette.bench}
        strokeOpacity="0.28"
      />
      {cells.map((cell, index) => (
        <g key={index}>
          <rect
            x={cell.x}
            y={cell.y}
            width="17"
            height="13"
            rx="2"
            fill={
              cell.flagged
                ? palette.amber
                : cell.missing
                  ? "transparent"
                  : palette.bench
            }
            fillOpacity={
              cell.flagged ? 0.22 : cell.missing ? 0 : 0.08
            }
            stroke={
              cell.flagged
                ? palette.amber
                : cell.missing
                  ? palette.bench
                  : palette.bench
            }
            strokeOpacity={cell.missing ? 0.15 : cell.flagged ? 0.9 : 0.48}
          />
          {cell.flagged ? (
            <path d="M107 112l4 8h-8z" fill={palette.amber} />
          ) : null}
        </g>
      ))}

      <path
        d="M300 150 C360 150 378 110 420 96"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.4"
        strokeDasharray="3 7"
      />
      <g transform="translate(462 76)">
        <circle
          r="23"
          fill={palette.ink}
          fillOpacity="0.72"
          stroke={palette.bench}
          strokeOpacity="0.45"
        />
        <path
          d="M-8 1l5 5 10-12"
          fill="none"
          stroke={palette.bench}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="-21"
          y="40"
          fill={palette.bench}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="8"
          letterSpacing="1.4"
        >
          VERIFIED
        </text>
      </g>

      <text
        x="42"
        y="248"
        fill={palette.bench}
        fillOpacity="0.7"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        LABELS · OUTCOMES · RIGHTS · VERSION HISTORY
      </text>
    </svg>
  );
}

function SimulatorOverlay() {
  const [lighting, setLighting] = useState(0.62);
  const [friction, setFriction] = useState(0.48);

  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 600 460"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <text
          x="52"
          y="58"
          fill={palette.bench}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="10"
          letterSpacing="2.2"
        >
          MEASURED / CALIBRATED
        </text>
        <path
          d="M52 76 H370"
          stroke={palette.bench}
          strokeOpacity="0.28"
          strokeDasharray="2 7"
        />
        <path
          d="M92 330 L226 208 L508 208 L390 348 Z"
          fill={palette.bench}
          fillOpacity={0.02 + lighting * 0.035}
          stroke={palette.bench}
          strokeOpacity={0.36 + lighting * 0.26}
        />
        <path
          d="M226 208V126L508 126V208M92 330V256L226 126M390 348V272L508 208"
          fill="none"
          stroke={palette.bench}
          strokeOpacity={0.3 + lighting * 0.2}
        />
        <path
          d="M128 296h314M128 264h314M154 348V208M346 348V208"
          stroke={palette.bench}
          strokeOpacity={0.2}
          strokeDasharray={`${1.5 + friction * 3} ${6 - friction * 2}`}
        />
        <rect
          x="268"
          y="174"
          width="62"
          height="46"
          rx="4"
          fill={palette.bench}
          fillOpacity={0.04 + lighting * 0.04}
          stroke={palette.bench}
          strokeOpacity="0.7"
        />
        <path
          d="M268 197h62M299 174v46"
          stroke={palette.bench}
          strokeOpacity="0.4"
        />
        <circle cx="434" cy="250" r="5" fill={palette.amber} />
        <circle
          cx="434"
          cy="250"
          r={13 + friction * 10}
          fill="none"
          stroke={palette.amber}
          strokeOpacity={0.2 + friction * 0.3}
        />
      </svg>

      <fieldset className="absolute inset-x-4 bottom-10 grid grid-cols-2 gap-4 rounded-lg border border-bench/20 bg-ink/75 p-3 backdrop-blur-sm">
        <legend className="sr-only">Simulator scene controls</legend>
        <label className="block">
          <span className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-bench">
            Lighting
            <span>{Math.round(lighting * 100)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(lighting * 100)}
            onChange={(event) => setLighting(Number(event.target.value) / 100)}
            className="mt-2 h-1 w-full cursor-pointer accent-amber"
            aria-label="Scene lighting"
          />
        </label>
        <label className="block">
          <span className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-bench">
            Friction
            <span>{Math.round(friction * 100)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(friction * 100)}
            onChange={(event) => setFriction(Number(event.target.value) / 100)}
            className="mt-2 h-1 w-full cursor-pointer accent-amber"
            aria-label="Surface friction"
          />
        </label>
      </fieldset>
    </div>
  );
}

function BenchmarkOverlay() {
  return (
    <svg
      viewBox="0 0 600 460"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <text
        x="52"
        y="58"
        fill={palette.bench}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="10"
        letterSpacing="2.2"
      >
        SYSTEM / REFERENCE
      </text>
      <path
        d="M52 76 H370"
        stroke={palette.bench}
        strokeOpacity="0.28"
        strokeDasharray="2 7"
      />
      <path
        d="M120 330 A180 180 0 0 1 480 330"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.35"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M144 330 A156 156 0 0 1 456 330"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.75"
        strokeWidth="2"
        strokeDasharray="3 8"
      />
      <path
        d="M120 304 C188 190 300 166 390 214 C436 238 468 276 488 310"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.75"
        strokeWidth="1.6"
      />
      <path
        d="M120 316 C192 216 306 194 396 236 C442 258 470 286 492 318"
        fill="none"
        stroke={palette.amber}
        strokeOpacity="0.9"
        strokeWidth="1.4"
        strokeDasharray="3 5"
      />
      <path
        d="M120 304 C188 190 300 166 390 214 C436 238 468 276 488 310 L492 318 C470 286 442 258 396 236 C306 194 192 216 120 316 Z"
        fill={palette.bench}
        fillOpacity="0.06"
      />
      <circle cx="300" cy="330" r="6" fill={palette.amber} />
      <circle
        cx="300"
        cy="330"
        r="22"
        fill="none"
        stroke={palette.bench}
        strokeOpacity="0.3"
      />
      <path
        d="M300 330L404 224"
        stroke={palette.bench}
        strokeOpacity="0.6"
      />
      <text
        x="410"
        y="196"
        fill={palette.bench}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.3"
      >
        SIM
      </text>
      <text
        x="124"
        y="360"
        fill={palette.bench}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.3"
      >
        REAL
      </text>
      <text
        x="260"
        y="390"
        fill={palette.bench}
        fillOpacity="0.7"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.2"
      >
        CONFIDENCE BAND
      </text>
    </svg>
  );
}
