"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { TreatedPhoto } from "@/components/media/TreatedPhoto";
import { home } from "@/lib/data/home";
import { useScrollProgress } from "@/components/three/useScrollProgress";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { cn } from "@/lib/utils";
import { palette } from "@/lib/palette";

const ACTION_SHORT = ["Phases", "Contact", "Outcome", "Recovery", "Safety"];

const PHOTO_CHIP: Record<number, { src: string; alt: string; label: string }> = {
  1: {
    src: "/photos/tactile-glove.webp",
    alt: "A pair of sensorized electronic-skin gloves used to capture contact pressure.",
    label: "Sensorized glove",
  },
  3: {
    src: "/photos/trajectory-failure.webp",
    alt: "Recorded frames and the trajectory of a failed grasp, used to model recovery.",
    label: "Failure reference",
  },
  4: {
    src: "/photos/safety-dome-robot.webp",
    alt: "A collaborative robot cell operating inside its protective safety envelope.",
    label: "Collaborative cell",
  },
};

/** Deterministic pressure map for the tactile matrix. */
const PRESSURE = Array.from({ length: 45 }, (_, index) => {
  const column = index % 9;
  const row = Math.floor(index / 9);
  const distance = Math.hypot((column - 3.4) / 3.2, (row - 2) / 1.9);
  const value = Math.max(0, 1 - distance * 0.82);
  return { column, row, value: Math.round(value * 96) };
});

const PHASES = [
  { label: "APPROACH", start: 0, width: 0.28 },
  { label: "ALIGN", start: 0.28, width: 0.26 },
  { label: "SEAT", start: 0.54, width: 0.26 },
  { label: "RELEASE", start: 0.8, width: 0.2 },
];

function StageGroup({
  active,
  index,
  children,
}: {
  active: number;
  index: number;
  children: ReactNode;
}) {
  return (
    <g
      className={cn(
        "transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        active === index ? "opacity-100" : "opacity-0",
      )}
    >
      {children}
    </g>
  );
}

/** 01 — multi-phase trajectory with real tool approach vectors. */
function PhaseStage({ active }: { active: number }) {
  return (
    <StageGroup active={active} index={0}>
      <path
        d="M96 268 L232 216 L372 196 L516 208 L660 236"
        fill="none"
        stroke={palette.trace}
        strokeOpacity="0.7"
        strokeWidth="1.6"
      />
      <path
        d="M96 292 L232 240 L372 220 L516 232 L660 260"
        fill="none"
        stroke={palette.steel}
        strokeOpacity="0.35"
        strokeDasharray="4 8"
      />
      {[232, 372, 516].map((x, index) => (
        <g key={x}>
          <path
            d={`M${x} ${120 + index * 14} L${x} ${196 + index * 4}`}
            stroke={palette.amber}
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <path
            d={`M${x - 5} ${186 + index * 4} L${x} ${196 + index * 4} L${x + 5} ${186 + index * 4}`}
            fill="none"
            stroke={palette.amber}
            strokeOpacity="0.7"
            strokeWidth="1.2"
          />
          <circle cx={x} cy={110 + index * 14} r="2.6" fill={palette.amber} />
          <text
            x={x + 8}
            y={110 + index * 14}
            fill={palette.steel}
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7.5"
            letterSpacing="1.2"
          >
            {["v 42 mm/s", "v 18 mm/s", "v 6 mm/s"][index]}
          </text>
          <text
            x={x + 8}
            y={121 + index * 14}
            fill={palette.steel}
            fillOpacity="0.6"
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6.5"
            letterSpacing="1.1"
          >
            {["t+0.000 µs", "t+4.200 µs", "t+11.800 µs"][index]}
          </text>
        </g>
      ))}

      {PHASES.map((phase, index) => {
        const x = 96 + phase.start * 700;
        const width = phase.width * 700;
        const isSeat = index === 2;
        return (
          <g key={phase.label}>
            <rect
              x={x}
              y={296}
              width={width - 8}
              height={26}
              rx={4}
              fill={isSeat ? palette.trace : palette.steel}
              fillOpacity={isSeat ? 0.12 : 0.04}
              stroke={isSeat ? palette.trace : palette.steel}
              strokeOpacity={isSeat ? 0.6 : 0.28}
            />
            <text
              x={x + 7}
              y={309}
              fill={isSeat ? palette.deep : palette.steel}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="7.5"
              letterSpacing="1.1"
            >
              {phase.label}
            </text>
            <text
              x={x + 7}
              y={318}
              fill={palette.steel}
              fillOpacity="0.55"
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="6"
              letterSpacing="0.8"
            >
              {["0–420 µs", "420–980 µs", "980–1.64 ms", "1.64–2.10 ms"][index]}
            </text>
          </g>
        );
      })}

      <path d="M96 334h696" stroke={palette.steel} strokeOpacity="0.2" />
      <text
        x="800"
        y="200"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        4 phases
      </text>
      <text
        x="800"
        y="216"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        3 approach vectors
      </text>
    </StageGroup>
  );
}

/** 02 — tactile sensor matrix over the contact footprint. */
function ContactStage({ active }: { active: number }) {
  const cell = 42;
  const originX = 150;
  const originY = 96;
  const [frame, setFrame] = useState(0);

  // The heatmap breathes only while this tab is the active one, and never
  // under prefers-reduced-motion.
  useEffect(() => {
    if (active !== 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((value) => value + 1), 850);
    return () => window.clearInterval(id);
  }, [active]);

  const load = 0.84 + Math.sin(frame * 0.9) * 0.16;

  return (
    <StageGroup active={active} index={1}>
      <text
        x={originX}
        y={originY - 18}
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.6"
      >
        TACTILE MATRIX · 9 × 5
      </text>
      {PRESSURE.map(({ column, row, value: base }) => {
        const x = originX + column * cell;
        const y = originY + row * cell;
        const breathing =
          base === 0
            ? 0
            : Math.max(
                0,
                base *
                  load *
                  (0.86 + 0.14 * Math.sin(frame * 0.7 + column * 0.55 + row * 0.8)),
              );
        const value = Math.round(breathing);
        const hot = value > 60;
        const warm = value > 25 && value <= 60;
        return (
          <g key={`${column}-${row}`}>
            <rect
              x={x}
              y={y}
              width={cell - 4}
              height={cell - 4}
              rx="3"
              fill={hot ? palette.amber : warm ? palette.trace : palette.steel}
              fillOpacity={value === 0 ? 0.02 : 0.1 + value / 180}
              stroke={hot ? palette.amber : warm ? palette.trace : palette.steel}
              strokeOpacity={value === 0 ? 0.14 : 0.32 + value / 220}
            />
            {value > 60 ? (
              <text
                x={x + 6}
                y={y + 24}
                fill={palette.ink}
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="7"
              >
                {value}
              </text>
            ) : null}
          </g>
        );
      })}
      <ellipse
        cx={originX + 3.4 * cell + 19}
        cy={originY + 2 * cell + 19}
        rx="66"
        ry="42"
        fill="none"
        stroke={palette.amber}
        strokeOpacity="0.6"
        strokeDasharray="3 5"
      />
      <circle
        cx={originX + 3.4 * cell + 19}
        cy={originY + 2 * cell + 19}
        r="4"
        fill={palette.amber}
      />

      <path
        d={`M${originX + 3.4 * cell + 19} ${originY + 2 * cell + 19} l0 -54`}
        stroke={palette.amber}
        strokeOpacity="0.8"
        strokeWidth="1.4"
      />
      <path
        d={`M${originX + 3.4 * cell + 19 - 6} ${originY + 2 * cell - 27} l6 -12 l6 12`}
        fill="none"
        stroke={palette.amber}
        strokeOpacity="0.8"
        strokeWidth="1.4"
      />
      <text
        x={originX + 3.4 * cell + 30}
        y={originY + 2 * cell - 26}
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.2"
      >
        Fn 12.4 N
      </text>

      <text
        x={660}
        y={112}
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        CONTACT AREA 214 mm²
      </text>
      <text
        x={660}
        y={130}
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        PEAK {Math.round(96 * load)} kPa
      </text>
      <text
        x={660}
        y={148}
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.4"
      >
        SHEAR {(3.1 + load * 0.9).toFixed(1)} N
      </text>
      <path d="M660 150h206M660 176h206M660 202h206" stroke={palette.steel} strokeOpacity="0.16" />
      <path
        d="M660 262 C696 262 704 214 738 214 C772 214 780 250 820 250 C850 250 858 226 866 226"
        fill="none"
        stroke={palette.trace}
        strokeOpacity="0.7"
        strokeWidth="1.3"
      />
      <text
        x={660}
        y={292}
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7.5"
        letterSpacing="1.2"
      >
        PRESSURE / TIME
      </text>
    </StageGroup>
  );
}

/** 03 — tolerance envelope with micrometric error margins. */
function OutcomeStage({ active }: { active: number }) {
  return (
    <StageGroup active={active} index={2}>
      <path d="M120 96v214M120 310h640" stroke={palette.steel} strokeOpacity="0.24" />
      <rect
        x="120"
        y="164"
        width="640"
        height="82"
        fill={palette.trace}
        fillOpacity="0.06"
        stroke={palette.trace}
        strokeOpacity="0.4"
        strokeDasharray="4 7"
      />
      <path
        d="M120 164h640M120 246h640"
        stroke={palette.trace}
        strokeOpacity="0.45"
      />
      <text
        x="132"
        y="158"
        fill={palette.deep}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.3"
      >
        +8 µm · upper limit
      </text>
      <text
        x="132"
        y="262"
        fill={palette.deep}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.3"
      >
        −8 µm · lower limit
      </text>

      {/* Hard failure thresholds just outside the envelope */}
      <path
        d="M120 132h640M120 278h640"
        stroke={palette.coral}
        strokeOpacity="0.65"
        strokeDasharray="6 5"
      />
      <text
        x="132"
        y="126"
        fill={palette.coral}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7"
        letterSpacing="1.2"
      >
        FAIL +12 µm
      </text>
      <text
        x="132"
        y="292"
        fill={palette.coral}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7"
        letterSpacing="1.2"
      >
        FAIL −12 µm
      </text>
      <text
        x="640"
        y="126"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7"
        letterSpacing="1.2"
      >
        SAMPLES 3 / 3 PASS
      </text>
      <path
        d="M120 205h640"
        stroke={palette.steel}
        strokeOpacity="0.5"
        strokeDasharray="2 6"
      />
      <text
        x="596"
        y="200"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7.5"
        letterSpacing="1.2"
      >
        NOMINAL
      </text>

      <path
        d="M120 224 C184 232 214 190 268 186 C322 182 352 214 408 210 C462 206 492 180 548 178 C602 176 636 200 692 196 C726 194 746 202 760 204"
        fill="none"
        stroke={palette.ink}
        strokeOpacity="0.85"
        strokeWidth="1.6"
      />
      {[268, 408, 548].map((x, index) => (
        <g key={x}>
          <circle cx={x} cy={[186, 210, 178][index]} r="3" fill={palette.amber} />
          <circle
            cx={x}
            cy={[186, 210, 178][index]}
            r="9"
            fill="none"
            stroke={palette.amber}
            strokeOpacity="0.4"
          />
        </g>
      ))}

      <g transform="translate(790 120)">
        <circle r="26" fill="none" stroke={palette.trace} strokeOpacity="0.6" />
        <path
          d="M-9 1l6 7 12-15"
          fill="none"
          stroke={palette.deep}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          y="46"
          textAnchor="middle"
          fill={palette.deep}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="7.5"
          letterSpacing="1.1"
        >
          IN TOLERANCE
        </text>
        <text
          y="60"
          textAnchor="middle"
          fill={palette.steel}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="7.5"
          letterSpacing="1.1"
        >
          ±3.2 µm
        </text>
      </g>
    </StageGroup>
  );
}

/** 04 — slip onset, divergence and the rerouted recovery path. */
function RecoveryStage({ active }: { active: number }) {
  return (
    <StageGroup active={active} index={3}>
      <path
        d="M110 128 C196 128 236 186 320 190 C404 194 452 166 540 168 C620 170 660 208 738 212"
        fill="none"
        stroke={palette.trace}
        strokeOpacity="0.55"
        strokeDasharray="4 7"
      />
      <path
        d="M110 128 C196 128 236 186 320 190 C360 192 384 208 408 240 C432 272 470 286 512 268 C554 250 576 214 620 208 C668 201 700 208 738 212"
        fill="none"
        stroke={palette.coral}
        strokeOpacity="0.85"
        strokeWidth="1.6"
      />
      <circle cx="408" cy="240" r="4.5" fill={palette.coral} />
      <circle
        cx="408"
        cy="240"
        r="16"
        fill="none"
        stroke={palette.coral}
        strokeOpacity="0.4"
      />
      <path
        d="M408 240v-52"
        stroke={palette.coral}
        strokeOpacity="0.7"
        strokeDasharray="2 4"
      />
      <text
        x="418"
        y="180"
        fill={palette.coral}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.3"
      >
        ONSET SLIP · 18 ms
      </text>

      <path
        d="M470 286 C494 272 504 250 522 232"
        fill="none"
        stroke={palette.trace}
        strokeOpacity="0.9"
        strokeWidth="1.6"
      />
      <path
        d="M512 228 L526 230 L518 242"
        fill="none"
        stroke={palette.trace}
        strokeOpacity="0.9"
        strokeWidth="1.4"
      />
      {[
        { x: 470, y: 286, label: "WP 01" },
        { x: 522, y: 232, label: "WP 02" },
        { x: 620, y: 208, label: "WP 03" },
      ].map((waypoint) => (
        <g key={waypoint.label}>
          <circle
            cx={waypoint.x}
            cy={waypoint.y}
            r="3"
            fill="none"
            stroke={palette.trace}
            strokeOpacity="0.85"
          />
          <text
            x={waypoint.x + 6}
            y={waypoint.y - 6}
            fill={palette.deep}
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="6.5"
            letterSpacing="1"
          >
            {waypoint.label}
          </text>
        </g>
      ))}
      <text
        x="470"
        y="312"
        fill={palette.deep}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.3"
      >
        AUTO-REPLAN 38 ms
      </text>
      <text
        x="470"
        y="326"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7"
        letterSpacing="1.1"
      >
        TORQUE RAMP −18% · GRIP RECOVERED
      </text>
      <text
        x="620"
        y="188"
        fill={palette.deep}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.3"
      >
        REJOIN
      </text>

      <path
        d="M110 128 L150 128 M110 128 L118 120 M110 128 L118 136"
        fill="none"
        stroke={palette.steel}
        strokeOpacity="0.5"
      />
      <text
        x="110"
        y="112"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="7.5"
        letterSpacing="1.2"
      >
        PLANNED PATH
      </text>
      <path
        d="M96 240 C140 306 220 326 300 326"
        fill="none"
        stroke={palette.steel}
        strokeOpacity="0.18"
        strokeDasharray="2 6"
      />
    </StageGroup>
  );
}

/** 05 — collaborative safety envelope around the cell. */
function SafetyStage({ active }: { active: number }) {
  return (
    <StageGroup active={active} index={4}>
      <g transform="translate(430 250)">
        <ellipse
          cx="0"
          cy="0"
          rx="270"
          ry="196"
          fill={palette.amber}
          fillOpacity="0.035"
          stroke={palette.amber}
          strokeOpacity="0.5"
          strokeDasharray="5 8"
        />

        {/* Geodesic wireframe: latitude rings and meridians */}
        {[
          { y: -58, rx: 244, ry: 62 },
          { y: -116, rx: 176, ry: 45 },
          { y: -164, rx: 96, ry: 25 },
        ].map((ring) => (
          <ellipse
            key={ring.y}
            cx="0"
            cy={ring.y}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={palette.amber}
            strokeOpacity="0.22"
          />
        ))}
        {[-1, 1].map((side) =>
          [0.42, 0.74, 1].map((k) => (
            <path
              key={`${side}-${k}`}
              d={`M0 -196 C ${side * 130 * k} -196, ${side * 270 * k} -104, ${side * 270 * k} 0`}
              fill="none"
              stroke={palette.amber}
              strokeOpacity={k === 1 ? 0.42 : 0.2}
            />
          )),
        )}
        {[-1, 1].map((side) =>
          [0.3, 0.62, 0.86].map((k) => (
            <path
              key={`chord-${side}-${k}`}
              d={`M${side * 240 * k} -${58 + k * 54} L${side * 196 * k} -${128 + k * 28}`}
              stroke={palette.amber}
              strokeOpacity="0.16"
              strokeDasharray="2 5"
            />
          )),
        )}
        <ellipse
          cx="0"
          cy="0"
          rx="270"
          ry="76"
          fill="none"
          stroke={palette.amber}
          strokeOpacity="0.28"
        />
        <ellipse
          cx="0"
          cy="0"
          rx="150"
          ry="196"
          fill="none"
          stroke={palette.amber}
          strokeOpacity="0.18"
        />
        <path
          d="M-270 0 A270 196 0 0 1 0 -196 A270 196 0 0 1 270 0"
          fill="none"
          stroke={palette.amber}
          strokeOpacity="0.45"
        />
        <path
          d="M-270 0 A270 196 0 0 0 0 196 A270 196 0 0 0 270 0"
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.14"
        />
        <path
          d="M0 0 L214 -114"
          stroke={palette.steel}
          strokeOpacity="0.5"
          strokeDasharray="3 5"
        />
        <circle cx="214" cy="-114" r="3.4" fill={palette.trace} />
        <text
          x="128"
          y="-124"
          fill={palette.steel}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="8"
          letterSpacing="1.2"
        >
          R 1400 mm
        </text>

        {/* Robot cell inside the envelope */}
        <path
          d="M0 96V24 L-38 -22 L-8 -54"
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.75"
          strokeWidth="2"
        />
        <path
          d="M-8 -54 L-40 -80 M-8 -54 L18 -74"
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.6"
        />
        {[
          [0, 96],
          [0, 24],
          [-38, -22],
          [-8, -54],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r={index === 0 ? 5 : 3.4}
            fill={palette.bench}
          />
        ))}
        <path
          d="M-60 96h120"
          stroke={palette.bench}
          strokeOpacity="0.4"
          strokeWidth="2"
        />
        <circle cx="0" cy="96" r="26" fill={palette.amber} fillOpacity="0.12" />
        <circle
          cx="0"
          cy="96"
          r="46"
          fill="none"
          stroke={palette.amber}
          strokeOpacity="0.4"
        />
        <text
          x="-24"
          y="146"
          fill={palette.steel}
          fontFamily="var(--font-geist-mono), monospace"
          fontSize="8"
          letterSpacing="1.4"
        >
          OPERATOR ZONE
        </text>
      </g>

      <text
        x="92"
        y="104"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.5"
      >
        ENVELOPE · COLLABORATIVE
      </text>
      <text
        x="92"
        y="122"
        fill={palette.steel}
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.5"
      >
        MIN CLEARANCE 500 mm
      </text>
      <path d="M92 138h96" stroke={palette.steel} strokeOpacity="0.3" />
    </StageGroup>
  );
}

const STAGES = [PhaseStage, ContactStage, OutcomeStage, RecoveryStage, SafetyStage];

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
  const chip = PHOTO_CHIP[active];

  return (
    <div ref={triggerRef}>
      <div
        ref={areaRef}
        onPointerMove={handlePointer}
        className="overflow-hidden rounded-[12px] border border-steel/15 bg-ink/[0.012]"
      >
        <div className="flex items-center justify-between border-b border-steel/15 px-4 py-2.5">
          <MicroLabel>Signals → action</MicroLabel>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-steel">
            playhead 0{active + 1} · {ACTION_SHORT[active]}
          </span>
        </div>

        <div className="relative">
          <svg
            viewBox="0 0 1000 360"
            preserveAspectRatio="xMidYMid meet"
            className="h-auto w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="primitive-fade" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={palette.trace} stopOpacity="0.04" />
                <stop offset="100%" stopColor={palette.trace} stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Shared technical grid */}
            {Array.from({ length: 13 }, (_, index) => (
              <line
                key={`v-${index}`}
                x1={index * 82}
                y1="0"
                x2={index * 82}
                y2="360"
                stroke={palette.steel}
                strokeOpacity="0.06"
              />
            ))}
            {Array.from({ length: 6 }, (_, index) => (
              <line
                key={`h-${index}`}
                x1="0"
                y1={index * 62}
                x2="1000"
                y2={index * 62}
                stroke={palette.steel}
                strokeOpacity="0.06"
              />
            ))}

            {STAGES.map((Stage, index) => (
              <Stage key={index} active={active} />
            ))}
          </svg>

          <div
            className={cn(
              "pointer-events-none absolute inset-x-3 top-3 flex items-center gap-2 transition-opacity duration-500 sm:inset-x-4",
              "opacity-100",
            )}
          >
            <span className="rounded-full border border-steel/25 bg-bench/80 px-2.5 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-ink backdrop-blur-sm">
              0{active + 1} · {ACTION_SHORT[active]}
            </span>
          </div>

          <div
            className={cn(
              "pointer-events-none absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5 transition-all duration-500 sm:left-4",
              active === 4
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-0",
            )}
          >
            <span className="rounded border border-amber/45 bg-ink/85 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-bench">
              SPEED: 500mm/s
            </span>
            <span className="rounded border border-bench/25 bg-ink/85 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-bench">
              ZONE: COLLABORATIVE
            </span>
            <span className="rounded border border-deep/40 bg-bench/85 px-2 py-1 font-mono text-[7.5px] uppercase tracking-[0.14em] text-deep">
              STATUS: CERTIFIED
            </span>
          </div>

          {chip ? (
            <div
              className={cn(
                "pointer-events-none absolute right-3 top-3 hidden w-[132px] overflow-hidden rounded-md border border-bench/25 transition-opacity duration-700 sm:block",
                active === 1 || active === 3 || active === 4
                  ? "opacity-100"
                  : "opacity-0",
              )}
            >
              <div className="relative h-[82px] w-full">
                <TreatedPhoto
                  src={chip.src}
                  alt={chip.alt}
                  sizes="132px"
                  className="absolute inset-0"
                  imageClassName="object-center"
                />
              </div>
              <span className="absolute inset-x-1.5 bottom-1 flex items-center justify-between font-mono text-[6.5px] uppercase tracking-[0.12em] text-bench">
                <span className="truncate">{chip.label}</span>
                <span className="text-amber">REC</span>
              </span>
            </div>
          ) : null}
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
                    index === active ? "text-deep" : "text-steel hover:text-ink",
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
