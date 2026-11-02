"use client";

import { useEffect, useRef, useState } from "react";
import { vision } from "@/lib/data/vision";
import { cn } from "@/lib/utils";
import { palette } from "@/lib/palette";

export function VisionScroll() {
  const [active, setActive] = useState(0);
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const elements = stageRefs.current.filter(
      (element): element is HTMLDivElement => Boolean(element),
    );
    if (!elements.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const focus = window.innerHeight * 0.46;
      let closest = 0;
      let distance = Number.POSITIVE_INFINITY;

      elements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const centre = rect.top + rect.height / 2;
        const nextDistance = Math.abs(centre - focus);
        if (nextDistance < distance) {
          distance = nextDistance;
          closest = index;
        }
      });

      setActive((current) => (current === closest ? current : closest));
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <div className="lg:sticky lg:top-24">
          <div className="relative overflow-hidden rounded-[12px] border border-bench/12 bg-ink">
            <div
              className="bg-grid-dark absolute inset-0 opacity-70"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 600 620"
              className="relative h-auto w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="vision-glow" cx="50%" cy="50%" r="50%">
                  <stop
                    offset="0%"
                    stopColor={palette.bench}
                    stopOpacity="0.12"
                  />
                  <stop
                    offset="100%"
                    stopColor={palette.bench}
                    stopOpacity="0"
                  />
                </radialGradient>
              </defs>
              <circle cx="300" cy="310" r="250" fill="url(#vision-glow)" />

              <g
                className={cn(
                  "transition-opacity duration-700",
                  active === 0 ? "opacity-100" : "opacity-0",
                )}
              >
                <path
                  d="M118 430 C172 350 196 250 282 274 C342 291 346 356 414 334 C462 318 478 274 514 292"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.8"
                  strokeWidth="1.2"
                  strokeDasharray="2 5"
                />
                <path
                  d="M132 452 C188 386 226 310 296 320 C356 329 378 382 438 358 C476 342 496 312 530 320"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.16"
                  strokeWidth="22"
                  strokeLinecap="round"
                />
                {[
                  [146, 404],
                  [178, 350],
                  [216, 306],
                  [264, 285],
                  [314, 301],
                  [358, 336],
                  [402, 336],
                  [446, 320],
                  [484, 300],
                ].map(([cx, cy], index) => (
                  <circle
                    key={index}
                    cx={cx}
                    cy={cy}
                    r={index === 6 ? 3.5 : 2}
                    fill={index > 5 ? palette.bench : palette.bench}
                    opacity={index > 5 ? 0.7 : 0.6}
                  />
                ))}
                <circle cx="514" cy="292" r="5" fill={palette.amber} />
                <circle
                  cx="514"
                  cy="292"
                  r="22"
                  fill="none"
                  stroke={palette.amber}
                  strokeOpacity="0.3"
                />
                <path
                  d="M98 508h404"
                  stroke={palette.bench}
                  strokeOpacity="0.2"
                />
                <text
                  x="98"
                  y="98"
                  fill={palette.bench}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontSize="8"
                  letterSpacing="2"
                >
                  EXPERT MOTION
                </text>
              </g>

              <g
                className={cn(
                  "transition-opacity duration-700",
                  active === 1 ? "opacity-100" : "opacity-0",
                )}
              >
                {Array.from({ length: 35 }, (_, index) => (
                  <g key={index}>
                    <rect
                      x={144 + (index % 7) * 45}
                      y={174 + Math.floor(index / 7) * 38}
                      width="34"
                      height="26"
                      rx="4"
                      fill={palette.bench}
                      fillOpacity={index === 19 ? 0.16 : 0.06}
                      stroke={index === 19 ? palette.amber : palette.bench}
                      strokeOpacity={index === 19 ? 0.7 : 0.38}
                    />
                    <path
                      d={`M${152 + (index % 7) * 45} ${185 + Math.floor(index / 7) * 38}h18`}
                      stroke={index === 19 ? palette.amber : palette.bench}
                      strokeOpacity="0.45"
                    />
                  </g>
                ))}
                <path
                  d="M160 466 C232 494 364 492 438 458"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.2"
                  strokeDasharray="4 8"
                />
                <circle
                  cx="464"
                  cy="148"
                  r="21"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.4"
                />
                <path
                  d="M455 149l6 6 11-13"
                  fill="none"
                  stroke={palette.bench}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="98"
                  y="98"
                  fill={palette.bench}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontSize="8"
                  letterSpacing="2"
                >
                  ALIGNED · VERIFIED
                </text>
              </g>

              <g
                className={cn(
                  "transition-opacity duration-700",
                  active === 2 ? "opacity-100" : "opacity-0",
                )}
              >
                <path
                  d="M126 430 L218 338 L428 338 L356 450 Z"
                  fill={palette.bench}
                  fillOpacity="0.025"
                  stroke={palette.bench}
                  strokeOpacity="0.35"
                />
                <path
                  d="M218 338V202L428 202V338M126 430V292L218 202M356 450V312L428 338"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.42"
                />
                <path
                  d="M166 392h196M166 364h196M186 430V338M316 430V338"
                  stroke={palette.bench}
                  strokeOpacity="0.2"
                  strokeDasharray="3 7"
                />
                <rect
                  x="282"
                  y="254"
                  width="64"
                  height="46"
                  rx="4"
                  fill={palette.bench}
                  fillOpacity="0.04"
                  stroke={palette.bench}
                  strokeOpacity="0.55"
                />
                <path
                  d="M282 278h64M314 254v46"
                  stroke={palette.bench}
                  strokeOpacity="0.25"
                />
                <circle cx="390" cy="302" r="4" fill={palette.amber} />
                <circle
                  cx="390"
                  cy="302"
                  r="18"
                  fill="none"
                  stroke={palette.amber}
                  strokeOpacity="0.28"
                />
                <text
                  x="98"
                  y="98"
                  fill={palette.bench}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontSize="8"
                  letterSpacing="2"
                >
                  MEASURED FIDELITY
                </text>
              </g>

              <g
                className={cn(
                  "transition-opacity duration-700",
                  active === 3 ? "opacity-100" : "opacity-0",
                )}
              >
                <path
                  d="M156 394 A144 144 0 0 1 444 394"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.35"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M176 394 A124 124 0 0 1 424 394"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeDasharray="3 7"
                />
                <path
                  d="M160 370 C214 272 302 250 376 292 C412 312 432 344 446 380"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.5"
                  strokeWidth="1.4"
                />
                <path
                  d="M160 380 C218 296 304 276 378 312 C414 330 434 356 448 388"
                  fill="none"
                  stroke={palette.bench}
                  strokeOpacity="0.28"
                  strokeWidth="1.2"
                  strokeDasharray="2 4"
                />
                <path
                  d="M300 394l62-68"
                  stroke={palette.bench}
                  strokeOpacity="0.5"
                />
                <circle cx="300" cy="394" r="5" fill={palette.amber} />
                <circle
                  cx="300"
                  cy="394"
                  r="21"
                  fill="none"
                  stroke={palette.amber}
                  strokeOpacity="0.24"
                />
                <text
                  x="98"
                  y="98"
                  fill={palette.bench}
                  fontFamily="var(--font-geist-mono), monospace"
                  fontSize="8"
                  letterSpacing="2"
                >
                  VERIFIED RESULT
                </text>
              </g>

              <path
                d="M98 536h404"
                stroke={palette.bench}
                strokeOpacity="0.22"
              />
              <text
                x="98"
                y="566"
                fill={palette.bench}
                fontFamily="var(--font-geist-mono), monospace"
                fontSize="7"
                letterSpacing="1.8"
              >
                01 MOTION · 02 DATA · 03 SIMULATION · 04 RESULT
              </text>
            </svg>

            <div className="absolute right-4 top-4 flex items-center gap-1.5">
              {vision.visual.stages.map((stage, index) => (
                <span
                  key={stage.index}
                  className={cn(
                    "h-1 rounded-full transition-all duration-500",
                    active === index ? "w-5 bg-amber" : "w-1 bg-bench/25",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-6 lg:pt-14">
        {vision.visual.stages.map((stage, index) => (
          <div
            key={stage.index}
            data-index={index}
            ref={(element) => {
              stageRefs.current[index] = element;
            }}
            className="flex min-h-[48vh] flex-col justify-center border-t border-steel/18 py-10 first:border-t-0 lg:min-h-[56vh]"
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "font-mono text-[9px] tracking-[0.16em] transition-colors duration-500",
                  active === index ? "text-deep" : "text-steel",
                )}
              >
                {stage.index}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "h-px transition-all duration-500",
                  active === index ? "w-8 bg-deep" : "w-3 bg-steel/30",
                )}
              />
            </div>
            <h2 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
              {stage.label}
            </h2>
            <p className="mt-4 max-w-sm text-[15px] leading-[1.7] text-steel">
              {stage.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
