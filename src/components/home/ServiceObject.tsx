import { palette } from "@/lib/palette";
import type { ServiceVisual } from "@/lib/data/services";

const mono = {
  fontFamily: "var(--font-geist-mono), monospace",
} as const;

const PANELS = [
  { x: 20, label: "POINT CLOUD" },
  { x: 144, label: "CALIBRATED MESH" },
  { x: 268, label: "TESTED BENCHMARK" },
];
const PANEL_W = 112;
const PANEL_Y = 46;
const PANEL_H = 132;

/**
 * Compact triptych preview on each service card: point cloud → calibrated mesh
 * → tested benchmark. The card's own stage is the lit panel; the other two stay
 * legible but quiet, so the three services read as one pipeline.
 */
export function ServiceObject({ variant }: { variant: ServiceVisual }) {
  const activeIndex = variant === "dataset" ? 0 : variant === "simulator" ? 1 : 2;

  return (
    <svg
      viewBox="0 0 400 240"
      className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.025]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="triptych-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={palette.bench} stopOpacity="0.06" />
          <stop offset="100%" stopColor={palette.bench} stopOpacity="0" />
        </linearGradient>
      </defs>

      <text
        x="20"
        y="30"
        fill={palette.bench}
        fillOpacity="0.55"
        {...mono}
        fontSize="6.5"
        letterSpacing="1.6"
      >
        POINT CLOUD → MESH → BENCHMARK
      </text>

      {PANELS.map((panel, index) => {
        const active = index === activeIndex;
        const colour = active ? palette.trace : palette.bench;
        return (
          <g key={panel.label}>
            <rect
              x={panel.x}
              y={PANEL_Y}
              width={PANEL_W}
              height={PANEL_H}
              rx="4"
              fill={active ? palette.trace : palette.bench}
              fillOpacity={active ? 0.05 : 0.015}
              stroke={colour}
              strokeOpacity={active ? 0.7 : 0.2}
            />
            <path
              d={`M${panel.x + 6} ${PANEL_Y + 6}h11M${panel.x + 6} ${PANEL_Y + 6}v11`}
              stroke={colour}
              strokeOpacity={active ? 0.8 : 0.35}
            />
            <path
              d={`M${panel.x + PANEL_W - 6} ${PANEL_Y + PANEL_H - 6}h-11M${panel.x + PANEL_W - 6} ${PANEL_Y + PANEL_H - 6}v-11`}
              stroke={colour}
              strokeOpacity={active ? 0.8 : 0.35}
            />
            <text
              x={panel.x + 4}
              y={PANEL_Y + PANEL_H + 16}
              fill={active ? palette.trace : palette.bench}
              fillOpacity={active ? 1 : 0.4}
              {...mono}
              fontSize="6"
              letterSpacing="1.1"
            >
              {panel.label}
            </text>
            <text
              x={panel.x + 4}
              y={PANEL_Y + PANEL_H + 27}
              fill={palette.bench}
              fillOpacity={active ? 0.55 : 0.22}
              {...mono}
              fontSize="5.5"
              letterSpacing="1"
            >
              0{index + 1}
            </text>

            {index === 0 ? <PointCloudMarks active={active} /> : null}
            {index === 1 ? <MeshMarks active={active} /> : null}
            {index === 2 ? <BenchmarkMarks active={active} /> : null}

            {active ? (
              <g>
                <rect
                  x={panel.x + PANEL_W - 22}
                  y={PANEL_Y + 6}
                  width="16"
                  height="8"
                  rx="2"
                  fill={palette.trace}
                  fillOpacity="0.9"
                />
                <text
                  x={panel.x + PANEL_W - 14}
                  y={PANEL_Y + 12}
                  textAnchor="middle"
                  fill={palette.ink}
                  {...mono}
                  fontSize="4.6"
                  letterSpacing="0.8"
                >
                  LIVE
                </text>
              </g>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

function PointCloudMarks({ active }: { active: boolean }) {
  const cx = 76;
  const cy = 112;
  return (
    <g>
      {Array.from({ length: 46 }, (_, index) => {
        const angle = (index * 137.5 * Math.PI) / 180;
        const radius = 8 + ((index * 11) % 38);
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius * 0.72 - (index % 5) * 1.6;
        return (
          <circle
            key={index}
            cx={x.toFixed(1)}
            cy={y.toFixed(1)}
            r={index % 7 === 0 ? 1.5 : 0.9}
            fill={active ? palette.trace : palette.bench}
            opacity={active ? 0.55 + (index % 4) * 0.1 : 0.32}
          />
        );
      })}
      <ellipse
        cx={cx}
        cy={cy + 26}
        rx="42"
        ry="10"
        fill="none"
        stroke={active ? palette.trace : palette.bench}
        strokeOpacity={active ? 0.35 : 0.14}
        strokeDasharray="2 4"
      />
      <text
        x="26"
        y="76"
        fill={palette.bench}
        fillOpacity={active ? 0.6 : 0.3}
        {...mono}
        fontSize="5"
        letterSpacing="1"
      >
        1.2 M PTS
      </text>
    </g>
  );
}

function MeshMarks({ active }: { active: boolean }) {
  const colour = active ? palette.trace : palette.bench;
  return (
    <g>
      <path
        d="M154 146 L196 124 L242 138 L202 160 Z"
        fill={active ? palette.trace : palette.bench}
        fillOpacity="0.05"
        stroke={colour}
        strokeOpacity={active ? 0.85 : 0.35}
      />
      <path
        d="M196 124V82 L242 96V138M154 146V108 L196 82 M202 160V122 L242 138"
        fill="none"
        stroke={colour}
        strokeOpacity={active ? 0.6 : 0.26}
      />
      {[0, 1, 2, 3].map((index) => (
        <line
          key={`v-${index}`}
          x1={196 + index * 11.5}
          y1={124 - index * 7}
          x2={196 + index * 11.5}
          y2={82 - index * 7}
          stroke={colour}
          strokeOpacity={active ? 0.3 : 0.14}
        />
      ))}
      {[0, 1, 2].map((index) => (
        <line
          key={`d-${index}`}
          x1={154 + index * 14}
          y1={146 - index * 12}
          x2={196 + index * 14}
          y2={124 - index * 14}
          stroke={colour}
          strokeOpacity={active ? 0.24 : 0.12}
        />
      ))}
      <circle cx="221" cy="128" r="2.4" fill={active ? palette.amber : palette.bench} />
      <text
        x="154"
        y="176"
        fill={palette.bench}
        fillOpacity={active ? 0.6 : 0.3}
        {...mono}
        fontSize="5"
        letterSpacing="1"
      >
        Δ 0.7 mm
      </text>
    </g>
  );
}

function BenchmarkMarks({ active }: { active: boolean }) {
  const colour = active ? palette.trace : palette.bench;
  return (
    <g>
      <path
        d="M284 150h88M284 92h88"
        stroke={colour}
        strokeOpacity={active ? 0.35 : 0.16}
        strokeDasharray="3 4"
      />
      <rect
        x="284"
        y={active ? 112 : 116}
        width="88"
        height="26"
        fill={colour}
        fillOpacity={active ? 0.08 : 0.02}
      />
      <path
        d="M284 138 C304 128 312 108 330 104 C348 100 356 118 370 110"
        fill="none"
        stroke={colour}
        strokeOpacity={active ? 0.9 : 0.4}
        strokeWidth="1.2"
      />
      <path
        d="M284 148 C306 138 316 120 334 116 C352 112 360 128 372 122"
        fill="none"
        stroke={palette.amber}
        strokeOpacity={active ? 0.75 : 0.3}
        strokeDasharray="2 3"
      />
      <circle cx="370" cy="110" r="2.6" fill={active ? palette.amber : palette.bench} />
      <circle
        cx="370"
        cy="110"
        r="7"
        fill="none"
        stroke={active ? palette.amber : palette.bench}
        strokeOpacity={active ? 0.5 : 0.2}
      />
      <text
        x="284"
        y="170"
        fill={palette.bench}
        fillOpacity={active ? 0.6 : 0.3}
        {...mono}
        fontSize="5"
        letterSpacing="1"
      >
        PASS 3 / 3
      </text>
    </g>
  );
}
