import { cn } from "@/lib/utils";

type Variant =
  "hero" | "loop" | "challenge" | "dataset" | "simulator" | "benchmark";

/**
 * Static, hand-drawn SVG posters. They are the accessible visual for
 * reduced-motion users, low-power phones and devices without WebGL.
 */
export function Poster({
  variant,
  label,
  className,
}: {
  variant: Variant;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[12px] border border-bench/10 bg-ink",
        className,
      )}
    >
      <svg
        viewBox="0 0 640 520"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id={`grid-${variant}`}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="#EEF1F4"
              strokeOpacity="0.06"
            />
          </pattern>
          <radialGradient id={`glow-${variant}`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#EEF1F4" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#EEF1F4" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="640" height="520" fill="#A55704" />
        <rect width="640" height="520" fill={`url(#grid-${variant})`} />
        <rect width="640" height="520" fill={`url(#glow-${variant})`} />

        {variant === "hero" ? <HeroPoster /> : null}
        {variant === "loop" ? <LoopPoster /> : null}
        {variant === "challenge" ? <ChallengePoster /> : null}
        {variant === "dataset" ? <DatasetPoster /> : null}
        {variant === "simulator" ? <SimulatorPoster /> : null}
        {variant === "benchmark" ? <BenchmarkPoster /> : null}
      </svg>
      {label ? (
        <span className="absolute bottom-4 left-4 font-mono text-[9px] uppercase tracking-[0.18em] text-bench">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function HeroPoster() {
  const hand =
    "M70 340 C140 290 175 220 250 238 C305 251 325 305 382 295 C430 287 455 245 500 258";
  return (
    <g fill="none">
      <path
        d="M78 372 C150 338 210 280 280 290 C350 300 400 348 470 318 C515 299 540 278 572 284"
        stroke="#EEF1F4"
        strokeOpacity="0.16"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <path
        d={hand}
        stroke="#EEF1F4"
        strokeOpacity="0.8"
        strokeWidth="1.2"
        strokeDasharray="2 5"
      />
      <path
        d="M500 258 C524 258 543 268 552 286 C562 306 557 326 540 340"
        stroke="#EEF1F4"
        strokeOpacity="0.7"
        strokeWidth="1.2"
      />
      <path
        d="M552 286 L586 274 M540 340 L572 354"
        stroke="#EEF1F4"
        strokeOpacity="0.35"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {[
        [112, 320],
        [158, 276],
        [214, 246],
        [272, 245],
        [330, 279],
        [392, 296],
        [450, 279],
        [500, 258],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={i % 3 === 0 ? 3 : 1.7}
          fill="#EEF1F4"
          opacity={i > 5 ? 0.95 : 0.6}
        />
      ))}
      <circle cx="540" cy="298" r="4" fill="#F0A12B" />
      <circle
        cx="540"
        cy="298"
        r="18"
        fill="none"
        stroke="#F0A12B"
        strokeOpacity="0.45"
      />
      <circle
        cx="540"
        cy="298"
        r="34"
        fill="none"
        stroke="#F0A12B"
        strokeOpacity="0.16"
      />
      <path
        d="M276 424 C340 450 418 450 492 414"
        stroke="#EEF1F4"
        strokeOpacity="0.18"
        strokeDasharray="4 8"
      />
    </g>
  );
}

function LoopPoster() {
  const nodes = Array.from({ length: 5 }, (_, i) => {
    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return [320 + Math.cos(angle) * 142, 260 + Math.sin(angle) * 112];
  });

  return (
    <g fill="none">
      <ellipse
        cx="320"
        cy="260"
        rx="142"
        ry="112"
        stroke="#EEF1F4"
        strokeOpacity="0.35"
      />
      <ellipse
        cx="320"
        cy="260"
        rx="184"
        ry="148"
        stroke="#EEF1F4"
        strokeOpacity="0.1"
        strokeDasharray="3 9"
      />
      <path
        d="M462 260 C520 210 500 120 420 100"
        stroke="#EEF1F4"
        strokeOpacity="0.22"
        strokeDasharray="4 7"
      />
      {nodes.map(([cx, cy], i) => (
        <g key={i}>
          <circle
            cx={cx}
            cy={cy}
            r="7"
            fill={i === 0 ? "#F0A12B" : "#EEF1F4"}
          />
          <circle
            cx={cx}
            cy={cy}
            r="20"
            stroke={i === 0 ? "#F0A12B" : "#EEF1F4"}
            strokeOpacity={i === 0 ? 0.55 : 0.18}
          />
        </g>
      ))}
      <circle cx="320" cy="260" r="3" fill="#EEF1F4" fillOpacity="0.8" />
      <circle cx="320" cy="260" r="44" stroke="#EEF1F4" strokeOpacity="0.12" />
      <path d="M305 260h30M320 245v30" stroke="#EEF1F4" strokeOpacity="0.28" />
    </g>
  );
}

function ChallengePoster() {
  const dots = Array.from({ length: 95 }, (_, i) => {
    const x = 346 + ((i * 47) % 238);
    const y = 118 + ((i * 73) % 254);
    return [x, y, (i % 4) * 0.22 + 0.28];
  });

  return (
    <g fill="none">
      <path
        d="M70 342 L150 220 L264 252 L210 388 Z"
        stroke="#EEF1F4"
        strokeOpacity="0.2"
      />
      <path
        d="M150 220V130L264 164V252M150 220L264 164"
        stroke="#EEF1F4"
        strokeOpacity="0.18"
      />
      <path
        d="M110 280h194M186 180v232"
        stroke="#EEF1F4"
        strokeOpacity="0.2"
        strokeDasharray="3 7"
      />
      {dots.map(([cx, cy, opacity], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="1.4"
          fill="#EEF1F4"
          opacity={opacity + 0.2}
        />
      ))}
      <path
        d="M264 252 C320 262 340 250 368 238"
        stroke="#F0A12B"
        strokeOpacity="0.8"
        strokeDasharray="3 5"
      />
      <path
        d="M392 230 C442 212 474 208 514 160"
        stroke="#EEF1F4"
        strokeOpacity="0.75"
      />
      <circle cx="392" cy="230" r="3" fill="#F0A12B" />
      <circle cx="514" cy="160" r="4" fill="#EEF1F4" />
      <circle cx="514" cy="160" r="18" stroke="#EEF1F4" strokeOpacity="0.3" />
    </g>
  );
}

function DatasetPoster() {
  return (
    <g fill="none">
      {Array.from({ length: 7 }, (_, i) => {
        const x = 92 + i * 66;
        const y = 340 - i * 23;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="50"
              height="36"
              rx="6"
              stroke={i === 4 ? "#F0A12B" : "#EEF1F4"}
              strokeOpacity={i === 4 ? 0.8 : 0.45}
              fill="#A55704"
            />
            <path
              d={`M${x + 9} ${y + 11}h32M${x + 9} ${y + 19}h24`}
              stroke={i === 4 ? "#F0A12B" : "#EEF1F4"}
              strokeOpacity="0.5"
            />
          </g>
        );
      })}
      <path
        d="M390 252 C430 225 470 222 510 200"
        stroke="#EEF1F4"
        strokeOpacity="0.25"
        strokeDasharray="4 7"
      />
      <circle cx="540" cy="180" r="27" stroke="#EEF1F4" strokeOpacity="0.45" />
      <path d="M527 181l9 9 16-19" stroke="#EEF1F4" strokeWidth="1.6" />
      <path
        d="M392 280 C444 290 494 278 542 242"
        stroke="#EEF1F4"
        strokeOpacity="0.16"
      />
    </g>
  );
}

function SimulatorPoster() {
  return (
    <g fill="none">
      <path
        d="M136 358 L252 280 L488 280 L374 368 Z"
        stroke="#EEF1F4"
        strokeOpacity="0.38"
      />
      <path d="M252 280V156L488 156V280" stroke="#EEF1F4" strokeOpacity="0.2" />
      <path
        d="M136 358V240L252 156M374 368V248L488 156"
        stroke="#EEF1F4"
        strokeOpacity="0.12"
      />
      <path
        d="M200 326h174M200 300h174M226 280v76M382 280v76"
        stroke="#EEF1F4"
        strokeOpacity="0.3"
        strokeDasharray="3 6"
      />
      <rect
        x="302"
        y="202"
        width="58"
        height="38"
        rx="4"
        stroke="#EEF1F4"
        strokeOpacity="0.65"
      />
      <path d="M302 224h58M316 202v38" stroke="#EEF1F4" strokeOpacity="0.35" />
      <circle cx="404" cy="238" r="5" fill="#F0A12B" />
      <circle cx="404" cy="238" r="17" stroke="#F0A12B" strokeOpacity="0.35" />
      <path d="M118 400h404" stroke="#EEF1F4" strokeOpacity="0.16" />
    </g>
  );
}

function BenchmarkPoster() {
  return (
    <g fill="none">
      <path
        d="M212 324 A124 124 0 0 1 428 324"
        stroke="#EEF1F4"
        strokeOpacity="0.45"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M228 324 A108 108 0 0 1 412 324"
        stroke="#EEF1F4"
        strokeOpacity="0.65"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="3 7"
      />
      <path
        d="M320 324 L398 218"
        stroke="#EEF1F4"
        strokeOpacity="0.6"
        strokeWidth="1.4"
      />
      <circle cx="320" cy="324" r="6" fill="#F0A12B" />
      <circle cx="320" cy="324" r="22" stroke="#F0A12B" strokeOpacity="0.25" />
      <path d="M216 360h208" stroke="#EEF1F4" strokeOpacity="0.28" />
      <path
        d="M244 360v10M320 360v14M396 360v10"
        stroke="#EEF1F4"
        strokeOpacity="0.55"
      />
      <path
        d="M254 204 C292 190 344 202 390 238"
        stroke="#EEF1F4"
        strokeOpacity="0.3"
      />
    </g>
  );
}
