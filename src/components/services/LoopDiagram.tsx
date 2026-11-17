import { palette } from "@/lib/palette";

const labels = ["Capture", "Calibrate", "Train", "Test", "Learn"];

function glyph(index: number, x: number, y: number, colour: string) {
  switch (index) {
    // Capture — sensor cone onto a fixture
    case 0:
      return (
        <g transform={`translate(${x} ${y})`} stroke={colour} fill="none">
          <path d="M-16 -14 L-5 -4 L-5 10 L-16 16 Z" strokeOpacity="0.8" />
          <path d="M-5 -4 L12 -10 M-5 10 L12 4 M-5 3 L12 -3" strokeOpacity="0.45" />
          <circle cx="12" cy="-10" r="1.6" fill={colour} stroke="none" />
          <circle cx="12" cy="4" r="1.6" fill={colour} stroke="none" />
          <circle cx="12" cy="-3" r="1.6" fill={colour} stroke="none" />
        </g>
      );
    // Calibrate — coordinate alignment frame
    case 1:
      return (
        <g transform={`translate(${x} ${y})`} stroke={colour} fill="none">
          <path d="M-14 8 L-14 -8 M-14 8 L0 8" strokeOpacity="0.55" strokeWidth="1" />
          <path d="M-14 -8 L-14 -8" strokeOpacity="0.55" />
          {[-8, 0, 8].map((tick) => (
            <path
              key={tick}
              d={`M${-14 + tick} 8 L${-14 + tick} 4`}
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          ))}
          <path d="M-14 8 L0 8 M-14 8 L-20 -2" strokeOpacity="0.8" />
          <circle cx="-14" cy="8" r="1.8" fill={colour} stroke="none" />
          <path d="M2 -2 L14 -2 M2 -2 L2 6 M2 -2 L10 -10" strokeOpacity="0.55" />
        </g>
      );
    // Train — stacked parameter layers
    case 2:
      return (
        <g transform={`translate(${x} ${y})`} stroke={colour} fill="none">
          <path d="M-13 4 L0 -3 L13 4 L0 11 Z" strokeOpacity="0.75" />
          <path d="M-13 0 L0 -7 L13 0" strokeOpacity="0.45" />
          <path d="M-13 -4 L0 -11 L13 -4" strokeOpacity="0.25" />
        </g>
      );
    // Test — failure bounding volume
    case 3:
      return (
        <g transform={`translate(${x} ${y})`} stroke={colour} fill="none">
          <rect x="-11" y="-9" width="22" height="18" rx="1" strokeOpacity="0.8" />
          <path d="M-11 -9 L-6 -4 M11 -9 L6 -4 M11 9 L6 4 M-11 9 L-6 4" strokeOpacity="0.4" />
          <path d="M-4 3 L0 -2 L4 1" strokeOpacity="0.9" />
        </g>
      );
    // Learn — return arrow feeding the next capture
    default:
      return (
        <g transform={`translate(${x} ${y})`} stroke={colour} fill="none">
          <path d="M-12 6 A13 13 0 1 1 4 -10" strokeOpacity="0.8" />
          <path d="M4 -14 L4 -10 L8 -8" strokeOpacity="0.9" />
          <path d="M-6 6 L4 6" strokeOpacity="0.4" strokeDasharray="2 3" />
        </g>
      );
  }
}

export function LoopDiagram({ compact = false }: { compact?: boolean }) {
  const cx = 280;
  const cy = 242;
  const radius = 148;

  const nodes = labels.map((label, index) => {
    const angle = (index / labels.length) * Math.PI * 2 - Math.PI / 2;
    return {
      label,
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      lx: cx + Math.cos(angle) * (radius + 52),
      ly: cy + Math.sin(angle) * (radius + 52),
      ix: cx + Math.cos(angle) * (radius - 42),
      iy: cy + Math.sin(angle) * (radius - 42),
    };
  });

  return (
    <figure className="relative">
      <svg viewBox="0 0 560 500" className="h-auto w-full" aria-hidden="true">
        <defs>
          <radialGradient id="loop-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.bench} stopOpacity="0.12" />
            <stop offset="100%" stopColor={palette.bench} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r="200" fill="url(#loop-core)" />
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.42"
          strokeWidth="1"
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius + 30}
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.12"
          strokeDasharray="2 8"
        />
        <circle
          cx={cx}
          cy={cy}
          r={radius - 32}
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.1"
        />

        {/* Angular tick ring: one tick per 15°, weighted on the five stages. */}
        {Array.from({ length: 24 }, (_, index) => {
          const angle = (index / 24) * Math.PI * 2;
          const major = index % 5 === 0;
          const inner = radius + (major ? 6 : 3);
          const outer = radius + 14;
          return (
            <line
              key={index}
              x1={cx + Math.cos(angle) * inner}
              y1={cy + Math.sin(angle) * inner}
              x2={cx + Math.cos(angle) * outer}
              y2={cy + Math.sin(angle) * outer}
              stroke={palette.bench}
              strokeOpacity={major ? 0.4 : 0.14}
            />
          );
        })}

        <path
          d={`M ${nodes[4].x} ${nodes[4].y} C ${nodes[4].x + 110} ${nodes[4].y - 20}, ${nodes[0].x + 110} ${nodes[0].y + 40}, ${nodes[0].x} ${nodes[0].y}`}
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.25"
          strokeDasharray="4 7"
        />

        {nodes.map((node, index) => (
          <g key={node.label}>
            <line
              x1={node.x}
              y1={node.y}
              x2={node.lx}
              y2={node.ly}
              stroke={palette.bench}
              strokeOpacity="0.25"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={index === 0 ? 6 : 4.5}
              fill={index === 0 ? palette.amber : palette.bench}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="15"
              fill="none"
              stroke={index === 0 ? palette.amber : palette.bench}
              strokeOpacity={index === 0 ? 0.4 : 0.15}
            />
            {glyph(
              index,
              node.ix,
              node.iy,
              index === 0 ? palette.amber : palette.bench,
            )}
            <text
              x={node.lx}
              y={node.ly + 3}
              textAnchor={
                node.lx > cx + 20
                  ? "start"
                  : node.lx < cx - 20
                    ? "end"
                    : "middle"
              }
              fill={index === 0 ? palette.amber : palette.bench}
              fillOpacity={index === 0 ? 1 : 0.72}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="9"
              letterSpacing="1.6"
            >
              {node.label.toUpperCase()}
            </text>
            <text
              x={node.lx}
              y={node.ly + 18}
              textAnchor={
                node.lx > cx + 20
                  ? "start"
                  : node.lx < cx - 20
                    ? "end"
                    : "middle"
              }
              fill={palette.bench}
              fontFamily="var(--font-geist-mono), monospace"
              fontSize="7"
              letterSpacing="1.2"
            >
              0{index + 1}
            </text>
          </g>
        ))}

        <circle cx={cx} cy={cy} r="3" fill={palette.bench} fillOpacity="0.75" />
        <circle
          cx={cx}
          cy={cy}
          r="52"
          fill="none"
          stroke={palette.bench}
          strokeOpacity="0.12"
        />
        <path
          d={`M${cx - 10} ${cy}h20M${cx} ${cy - 10}v20`}
          stroke={palette.bench}
          strokeOpacity="0.28"
        />
        {!compact ? (
          <text
            x={cx}
            y={cy + 78}
            textAnchor="middle"
            fill={palette.bench}
            fontFamily="var(--font-geist-mono), monospace"
            fontSize="7"
            letterSpacing="2.2"
          >
            THE DAXTERA LOOP
          </text>
        ) : null}
      </svg>
      <figcaption className="sr-only">
        The Daxtera Loop:{" "}
        {labels.map((label, index) => `${index + 1}. ${label}`).join("; ")}. The
        loop returns from Learn to Capture.
      </figcaption>
    </figure>
  );
}
