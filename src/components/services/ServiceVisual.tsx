"use client";

import { useState } from "react";
import { TreatedPhoto } from "@/components/media/TreatedPhoto";
import type { ServiceVisual as ServiceVisualType } from "@/lib/data/services";
import { palette } from "@/lib/palette";

const mono = {
  fontFamily: "var(--font-geist-mono), monospace",
} as const;

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
          type === "benchmark"
            ? "object-[62%_center]"
            : type === "simulator"
              ? "object-[26%_center]"
              : "object-center"
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

/** Multi-modal sensor telemetry, episode verification and force gauge. */
function DatasetOverlay() {
  const cells = Array.from({ length: 32 }, (_, index) => ({
    x: 58 + (index % 8) * 25,
    y: 104 + Math.floor(index / 8) * 23,
    flagged: index === 18,
    missing: index === 27,
  }));

  const channels = [
    {
      label: "FORCE",
      colour: palette.trace,
      opacity: 0.95,
      path: "M320 234 C348 234 356 200 380 198 C404 196 412 222 436 228 C460 234 468 190 492 182 C508 177 520 184 534 188",
    },
    {
      label: "TORQUE",
      colour: palette.amber,
      opacity: 0.85,
      path: "M320 268 C346 262 360 276 386 264 C412 252 424 270 448 260 C472 250 486 266 510 256 C524 251 532 255 534 256",
    },
    {
      label: "TEMP",
      colour: palette.coral,
      opacity: 0.75,
      path: "M320 300 C350 304 362 292 388 296 C414 300 426 284 452 288 C478 292 492 280 516 284 C526 286 530 286 534 286",
    },
    {
      label: "VIBRATION",
      colour: palette.bench,
      opacity: 0.42,
      path: "M320 330 L328 322 L336 336 L344 318 L352 338 L360 324 L368 334 L376 320 L384 336 L392 326 L400 334 L408 320 L416 338 L424 324 L432 336 L440 322 L448 334 L456 326 L464 338 L472 320 L480 334 L488 326 L496 336 L504 322 L512 338 L520 328 L534 332",
    },
  ];

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
          {...mono}
          fontSize="10"
          letterSpacing="2.2"
        >
          EPISODES / MULTI-MODAL
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
              fillOpacity={cell.flagged ? 0.22 : cell.missing ? 0 : 0.08}
              stroke={cell.flagged ? palette.amber : palette.bench}
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
            {...mono}
            fontSize="8"
            letterSpacing="1.4"
          >
            VERIFIED
          </text>
        </g>

        {/* Episode verification flags */}
        <g transform="translate(300 130)">
          {Array.from({ length: 10 }, (_, index) => (
            <g key={index} transform={`translate(${(index % 5) * 16} ${Math.floor(index / 5) * 16})`}>
              <rect
                width="11"
                height="11"
                rx="2"
                fill={index === 6 ? palette.amber : palette.trace}
                fillOpacity={index === 6 ? 0.18 : 0.1}
                stroke={index === 6 ? palette.amber : palette.trace}
                strokeOpacity={index === 6 ? 0.9 : 0.55}
              />
              {index === 6 ? (
                <path
                  d="M2 5.5l2 2 4-4.5"
                  fill="none"
                  stroke={palette.amber}
                  strokeWidth="1"
                />
              ) : (
                <path
                  d="M2.5 5.5l2 2 4-4.5"
                  fill="none"
                  stroke={palette.trace}
                  strokeWidth="1"
                />
              )}
            </g>
          ))}
        </g>
        <text
          x="300"
          y="172"
          fill={palette.bench}
          fillOpacity="0.55"
          {...mono}
          fontSize="7"
          letterSpacing="1.2"
        >
          FLAGS 9 / 10 CLEAR
        </text>

        {/* Force gauge */}
        <g transform="translate(116 330)">
          <path
            d="M-58 22 A62 62 0 0 1 58 22"
            fill="none"
            stroke={palette.bench}
            strokeOpacity="0.28"
            strokeWidth="5"
          />
          <path
            d="M-58 22 A62 62 0 0 1 12 -60"
            fill="none"
            stroke={palette.amber}
            strokeOpacity="0.9"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {[-58, -29, 0, 29, 58].map((offset, index) => (
            <line
              key={index}
              x1={offset}
              y1={index === 0 || index === 4 ? 22 : 16}
              x2={offset}
              y2="30"
              stroke={palette.bench}
              strokeOpacity="0.35"
            />
          ))}
          <g transform="rotate(-38)">
            <line
              x1="0"
              y1="22"
              x2="0"
              y2="-46"
              stroke={palette.amber}
              strokeWidth="2"
            />
          </g>
          <circle cy="22" r="4" fill={palette.amber} />
          <text
            x="-58"
            y="56"
            fill={palette.bench}
            {...mono}
            fontSize="8"
            letterSpacing="1.4"
          >
            GRIP FORCE 12.4 N
          </text>
          <text
            x="-58"
            y="70"
            fill={palette.bench}
            fillOpacity="0.5"
            {...mono}
            fontSize="7"
            letterSpacing="1.2"
          >
            TEMP 38.2 °C · VIB 0.14 g
          </text>
        </g>

        {/* Channel traces */}
        <path
          d="M310 200V346M310 346h236"
          stroke={palette.bench}
          strokeOpacity="0.25"
        />
        <text
          x="310"
          y="190"
          fill={palette.bench}
          fillOpacity="0.7"
          {...mono}
          fontSize="8"
          letterSpacing="1.4"
        >
          SENSOR TIME-SERIES
        </text>
        {[234, 268, 300, 330].map((y) => (
          <line
            key={y}
            x1="310"
            y1={y}
            x2="546"
            y2={y}
            stroke={palette.bench}
            strokeOpacity="0.07"
          />
        ))}
        {channels.map((channel) => (
          <path
            key={channel.label}
            d={channel.path}
            fill="none"
            stroke={channel.colour}
            strokeOpacity={channel.opacity}
            strokeWidth="1.4"
          />
        ))}
        <g transform="translate(310 360)">
          {channels.map((channel, index) => (
            <g key={channel.label} transform={`translate(${index * 60} 0)`}>
              <circle cx="3" cy="4" r="2.4" fill={channel.colour} />
              <text
                x="10"
                y="7"
                fill={palette.bench}
                fillOpacity="0.65"
                {...mono}
                fontSize="6.5"
                letterSpacing="1"
              >
                {channel.label}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <span className="absolute right-4 top-4 rounded border border-bench/25 bg-ink/70 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-bench">
        4 sensors · 500 Hz
      </span>
    </div>
  );
}

/** Split wireframe / photoreal digital twin with transfer-loss measurement. */
function SimulatorOverlay() {
  const [lighting, setLighting] = useState(0.62);
  const [friction, setFriction] = useState(0.48);

  const deltaX = (lighting - 0.62) * 60;
  const deltaY = (friction - 0.48) * 46;
  const deltaMm = (
    Math.abs(lighting - 0.62) * 18 +
    Math.abs(friction - 0.48) * 12
  ).toFixed(1);
  const deltaMs = (Math.abs(lighting - 0.62) * 74 + 3).toFixed(0);

  return (
    <div className="absolute inset-0">
      {/* Simulated half: wireframe only */}
      <div className="absolute inset-y-0 left-0 w-[46%] overflow-hidden border-r border-bench/30">
        <div className="absolute inset-0 bg-ink/78" aria-hidden="true" />
        <svg
          viewBox="0 0 300 460"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`v-${index}`}
              x1={index * 36}
              y1="0"
              x2={index * 36}
              y2="460"
              stroke={palette.bench}
              strokeOpacity="0.07"
            />
          ))}
          {Array.from({ length: 13 }, (_, index) => (
            <line
              key={`h-${index}`}
              x1="0"
              y1={index * 36}
              x2="300"
              y2={index * 36}
              stroke={palette.bench}
              strokeOpacity="0.07"
            />
          ))}

          {/* Sim part, wireframe */}
          <ellipse
            cx="132"
            cy="286"
            rx="62"
            ry="20"
            fill="none"
            stroke={palette.bench}
            strokeOpacity="0.7"
          />
          <path
            d="M70 286v-70a62 20 0 0 0 124 0v70"
            fill="none"
            stroke={palette.bench}
            strokeOpacity="0.55"
          />
          <ellipse
            cx="132"
            cy="216"
            rx="62"
            ry="20"
            fill="none"
            stroke={palette.bench}
            strokeOpacity="0.75"
          />
          <ellipse
            cx="132"
            cy="216"
            rx="24"
            ry="8"
            fill="none"
            stroke={palette.amber}
            strokeOpacity="0.8"
          />
          <path
            d="M132 216v-26M70 216h124"
            stroke={palette.bench}
            strokeOpacity="0.3"
            strokeDasharray="3 5"
          />

          {/* Fixture / bed */}
          <path
            d="M34 320 L82 296 L240 296 L196 330 Z"
            fill="none"
            stroke={palette.bench}
            strokeOpacity="0.4"
          />
          <path
            d="M34 320V300M240 296v-22"
            stroke={palette.bench}
            strokeOpacity="0.2"
          />

          {/* Measured-vs-simulated offset mesh */}
          <g
            transform={`translate(${deltaX.toFixed(2)} ${deltaY.toFixed(2)})`}
            style={{ transition: "transform 220ms linear" }}
          >
            <ellipse
              cx="132"
              cy="286"
              rx="62"
              ry="20"
              fill="none"
              stroke={palette.trace}
              strokeOpacity="0.9"
              strokeWidth="1.4"
            />
            <path
              d="M70 286v-70a62 20 0 0 0 124 0v70"
              fill="none"
              stroke={palette.trace}
              strokeOpacity="0.65"
              strokeWidth="1.2"
            />
            <ellipse
              cx="132"
              cy="216"
              rx="62"
              ry="20"
              fill="none"
              stroke={palette.trace}
              strokeOpacity="0.85"
            />
            {Array.from({ length: 5 }, (_, index) => (
              <line
                key={index}
                x1={70 + index * 31}
                y1="216"
                x2={70 + index * 31}
                y2="286"
                stroke={palette.trace}
                strokeOpacity="0.28"
              />
            ))}
          </g>

          {/* Axis triad */}
          <g transform="translate(46 386)">
            <path d="M0 0h28" stroke={palette.amber} strokeOpacity="0.8" />
            <path d="M0 0v-28" stroke={palette.bench} strokeOpacity="0.6" />
            <path d="M0 0l-16 13" stroke={palette.trace} strokeOpacity="0.7" />
          </g>
          <text
            x="42"
            y="424"
            fill={palette.bench}
            fillOpacity="0.5"
            {...mono}
            fontSize="7"
            letterSpacing="1.2"
          >
            SIM / WIREFRAME
          </text>
        </svg>
        <span className="absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.18em] text-bench/80">
          01 · Simulated
        </span>
      </div>

      {/* Photoreal half */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[54%]">
        <span className="absolute right-4 top-4 font-mono text-[8px] uppercase tracking-[0.18em] text-bench/85">
          02 · Captured
        </span>
        <div className="absolute inset-x-4 top-12 rounded-md border border-bench/25 bg-ink/75 p-2.5">
          <span className="block font-mono text-[7px] uppercase tracking-[0.16em] text-bench/60">
            Transfer loss
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-mono text-[15px] tabular-nums leading-none text-bench">
              {deltaMm}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-bench/60">
              mm
            </span>
            <span className="ml-auto font-mono text-[10px] tabular-nums text-trace">
              {deltaMs} ms
            </span>
          </div>
          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-bench/15">
            <span
              className="block h-full rounded-full bg-trace transition-[width] duration-300"
              style={{
                width: `${Math.min(100, 18 + Number(deltaMm) * 9)}%`,
              }}
            />
          </div>
          <span className="mt-1.5 block font-mono text-[6.5px] uppercase tracking-[0.12em] text-bench/45">
            Contact / soft body / friction
          </span>
        </div>

        <span className="absolute bottom-3 right-4 font-mono text-[7px] uppercase tracking-[0.14em] text-bench/55">
          Real / duotone plate
        </span>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-[46%] w-px bg-bench/40"
        aria-hidden="true"
      />

      <fieldset className="absolute inset-x-4 bottom-10 grid grid-cols-2 gap-4 rounded-lg border border-bench/20 bg-ink/80 p-3 backdrop-blur-sm">
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

/** AOI overlay: bounding boxes, confidence tags, OK/NG metrics. */
function BenchmarkOverlay() {
  const boxes = [
    {
      x: 56,
      y: 252,
      w: 132,
      h: 108,
      ok: true,
      conf: "99.8",
      id: "P-0412",
    },
    {
      x: 204,
      y: 214,
      w: 148,
      h: 142,
      ok: false,
      conf: "61.4",
      id: "P-0413",
    },
    {
      x: 368,
      y: 244,
      w: 122,
      h: 118,
      ok: true,
      conf: "98.6",
      id: "P-0414",
    },
  ];

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
          {...mono}
          fontSize="10"
          letterSpacing="2.2"
        >
          AOI / VISION INSPECTION
        </text>
        <path
          d="M52 76 H370"
          stroke={palette.bench}
          strokeOpacity="0.28"
          strokeDasharray="2 7"
        />

        {boxes.map((box) => {
          const colour = box.ok ? palette.trace : palette.coral;
          return (
            <g key={box.id}>
              <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx="2"
                fill={colour}
                fillOpacity="0.06"
                stroke={colour}
                strokeOpacity="0.9"
              />
              <path
                d={`M${box.x + 9} ${box.y + 9}h16M${box.x + 9} ${box.y + 9}v16`}
                stroke={colour}
                strokeWidth="1.8"
              />
              <path
                d={`M${box.x + box.w - 9} ${box.y + box.h - 9}h-16M${box.x + box.w - 9} ${box.y + box.h - 9}v-16`}
                stroke={colour}
                strokeWidth="1.8"
              />
              <rect
                x={box.x}
                y={box.y - 17}
                width={box.w}
                height="15"
                fill={palette.ink}
                fillOpacity="0.85"
              />
              <text
                x={box.x + 4}
                y={box.y - 6}
                fill={colour}
                {...mono}
                fontSize="7.5"
                letterSpacing="1"
              >
                {box.ok ? "OK" : "NG"} · CONF {box.conf}%
              </text>
              <text
                x={box.x + 4}
                y={box.y + box.h + 12}
                fill={palette.bench}
                fillOpacity="0.55"
                {...mono}
                fontSize="6.5"
                letterSpacing="1"
              >
                {box.id}
              </text>
            </g>
          );
        })}

        {/* Scan line across the conveyor */}
        <path
          d="M52 196h440"
          stroke={palette.amber}
          strokeOpacity="0.45"
          strokeDasharray="8 6"
        />
        <path
          d="M52 196l10-4v8z"
          fill={palette.amber}
          fillOpacity="0.7"
        />

        <path d="M52 392h440" stroke={palette.bench} strokeOpacity="0.3" />
        <text
          x="52"
          y="410"
          fill={palette.bench}
          fillOpacity="0.7"
          {...mono}
          fontSize="8"
          letterSpacing="1.3"
        >
          OK 42 · NG 1 · YIELD 97.7% · 42 PARTS/MIN
        </text>

        {/* 3D safety clearance */}
        <path
          d="M126 360 A190 190 0 0 1 506 360"
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.2"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M156 360 A160 160 0 0 1 476 360"
          fill="none"
          stroke={palette.amber}
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeDasharray="3 7"
        />
        <text
          x="264"
          y="372"
          fill={palette.bench}
          fillOpacity="0.55"
          {...mono}
          fontSize="7"
          letterSpacing="1.2"
        >
          SAFETY CLEARANCE 500 mm
        </text>
      </svg>

      <span className="absolute right-4 top-4 flex flex-wrap justify-end gap-1.5">
        <span className="rounded border border-trace/50 bg-ink/70 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-trace">
          Pass 2
        </span>
        <span className="rounded border border-coral/50 bg-ink/70 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-coral">
          Fail 1
        </span>
        <span className="rounded border border-bench/25 bg-ink/70 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-bench">
          Zone collaborative
        </span>
      </span>
    </div>
  );
}
