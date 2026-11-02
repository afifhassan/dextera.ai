import type { ServiceVisual } from "@/lib/data/services";

/**
 * Small procedural objects for the service cards. Abstract on purpose:
 * point cloud, digital twin and benchmark, never hardware.
 */
export function ServiceObject({ variant }: { variant: ServiceVisual }) {
  return (
    <svg
      viewBox="0 0 400 240"
      className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:scale-[1.025]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`object-fade-${variant}`} x1="0" x2="1">
          <stop offset="0%" stopColor="#EEF1F4" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#EEF1F4" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {variant === "dataset" ? <DatasetObject /> : null}
      {variant === "simulator" ? <SimulatorObject /> : null}
      {variant === "benchmark" ? <BenchmarkObject /> : null}
    </svg>
  );
}

function DatasetObject() {
  const cells = Array.from({ length: 30 }, (_, index) => {
    const column = index % 10;
    const row = Math.floor(index / 10);
    return {
      x: 108 + column * 19,
      y: 92 + row * 19,
      flagged: index === 13,
      dim: index > 23,
    };
  });

  return (
    <g>
      <ellipse
        cx="200"
        cy="160"
        rx="130"
        ry="62"
        fill="url(#object-fade-dataset)"
      />
      {cells.map((cell, index) => (
        <g key={index}>
          <rect
            x={cell.x}
            y={cell.y}
            width="14"
            height="14"
            rx="2"
            fill={cell.flagged ? "#F0A12B" : "#EEF1F4"}
            fillOpacity={cell.dim ? 0.1 : cell.flagged ? 0.2 : 0.16}
            stroke={cell.flagged ? "#F0A12B" : "#EEF1F4"}
            strokeOpacity={cell.dim ? 0.24 : cell.flagged ? 0.86 : 0.68}
          />
          {index === 13 ? <path d="M196 88l3 7h-6z" fill="#F0A12B" /> : null}
        </g>
      ))}
      <path
        d="M86 188 C136 202 264 202 316 184"
        fill="none"
        stroke="#EEF1F4"
        strokeOpacity="0.25"
        strokeDasharray="3 7"
      />
      <g transform="translate(286 62)">
        <circle r="22" fill="#A55704" stroke="#EEF1F4" strokeOpacity="0.45" />
        <path
          d="M-7 1l5 5 9-11"
          fill="none"
          stroke="#EEF1F4"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <text
        x="96"
        y="62"
        fill="#EEF1F4"
        fillOpacity="0.7"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.6"
      >
        EPISODES → DATASET
      </text>
    </g>
  );
}

function SimulatorObject() {
  return (
    <g>
      <ellipse
        cx="208"
        cy="170"
        rx="130"
        ry="54"
        fill="url(#object-fade-simulator)"
      />
      <path
        d="M108 178 L176 106 L294 106 L232 188 Z"
        fill="none"
        stroke="#EEF1F4"
        strokeOpacity="0.6"
      />
      <path
        d="M176 106V48L294 48V106M108 178V118L176 48M232 188V126L294 106"
        fill="none"
        stroke="#EEF1F4"
        strokeOpacity="0.65"
      />
      <path
        d="M132 138h154M132 116h154M146 178V106M248 178V106"
        stroke="#EEF1F4"
        strokeOpacity="0.2"
        strokeDasharray="3 7"
      />
      <rect
        x="216"
        y="82"
        width="42"
        height="30"
        rx="3"
        fill="#EEF1F4"
        fillOpacity="0.04"
        stroke="#EEF1F4"
        strokeOpacity="0.6"
      />
      <path d="M216 97h42M237 82v30" stroke="#EEF1F4" strokeOpacity="0.28" />
      <circle cx="292" cy="142" r="4" fill="#F0A12B" />
      <circle
        cx="292"
        cy="142"
        r="14"
        fill="none"
        stroke="#F0A12B"
        strokeOpacity="0.3"
      />
      <path d="M98 208h206" stroke="#EEF1F4" strokeOpacity="0.32" />
      <text
        x="102"
        y="62"
        fill="#EEF1F4"
        fillOpacity="0.7"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.6"
      >
        MEASURED / CALIBRATED
      </text>
    </g>
  );
}

function BenchmarkObject() {
  return (
    <g>
      <ellipse
        cx="200"
        cy="158"
        rx="124"
        ry="58"
        fill="url(#object-fade-benchmark)"
      />
      <path
        d="M110 166 A92 92 0 0 1 290 166"
        fill="none"
        stroke="#EEF1F4"
        strokeOpacity="0.58"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M122 166 A80 80 0 0 1 278 166"
        fill="none"
        stroke="#EEF1F4"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeDasharray="3 7"
      />
      <path
        d="M200 166 L256 102"
        stroke="#EEF1F4"
        strokeOpacity="0.55"
        strokeWidth="1.2"
      />
      <circle cx="200" cy="166" r="5" fill="#F0A12B" />
      <circle
        cx="200"
        cy="166"
        r="20"
        fill="none"
        stroke="#F0A12B"
        strokeOpacity="0.25"
      />
      <path d="M116 196h168" stroke="#EEF1F4" strokeOpacity="0.35" />
      <path
        d="M142 196v8M200 196v11M258 196v8"
        stroke="#EEF1F4"
        strokeOpacity="0.55"
      />
      <path
        d="M154 140 C190 124 232 132 258 152"
        fill="none"
        stroke="#EEF1F4"
        strokeOpacity="0.42"
      />
      <text
        x="118"
        y="62"
        fill="#EEF1F4"
        fillOpacity="0.7"
        fontFamily="var(--font-geist-mono), monospace"
        fontSize="8"
        letterSpacing="1.6"
      >
        SYSTEM / REFERENCE
      </text>
    </g>
  );
}
