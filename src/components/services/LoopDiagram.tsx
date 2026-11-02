import { palette } from "@/lib/palette";

const labels = ["Capture", "Calibrate", "Train", "Test", "Learn"];

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
      lx: cx + Math.cos(angle) * (radius + 48),
      ly: cy + Math.sin(angle) * (radius + 48),
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
