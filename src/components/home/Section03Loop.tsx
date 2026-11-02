"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { LoopVisual } from "@/components/three/LoopVisual";
import { useScrollProgress } from "@/components/three/useScrollProgress";
import { home } from "@/lib/data/home";
import { cn } from "@/lib/utils";

export function Section03Loop() {
  const [active, setActive] = useState(0);
  const { progress, triggerRef } = useScrollProgress<HTMLElement>({
    pin: true,
    start: "top top",
    end: "+=320%",
    scrub: 1,
    onProgress: (value) => {
      const next = Math.min(
        home.loop.nodes.length - 1,
        Math.max(0, Math.floor(value * home.loop.nodes.length)),
      );
      setActive((current) => (current === next ? current : next));
    },
  });

  return (
    <section
      id="section-03"
      ref={triggerRef}
      className="theme-dark relative overflow-hidden bg-ink"
    >
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber/[0.055] blur-[140px]"
      />

      <Container className="relative flex min-h-[100svh] flex-col justify-center py-20 lg:h-[100svh] lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <MicroLabel tone="trace">{home.loop.index}</MicroLabel>
              <span aria-hidden="true" className="h-px w-7 bg-bench/20" />
              <MicroLabel tone="bench">{home.loop.eyebrow}</MicroLabel>
            </div>

            <h2 className="mt-6 max-w-[15ch] text-balance text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-bench">
              {home.loop.headline}
            </h2>
            <p className="mt-5 max-w-md text-sm leading-[1.7] text-bench">
              {home.loop.intro}
            </p>

            <ol className="mt-8 border-t border-bench/12">
              {home.loop.nodes.map((node, index) => {
                const isActive = index === active;
                return (
                  <li key={node.id} className="border-b border-bench/12">
                    <button
                      type="button"
                      onClick={() => setActive(index)}
                      onMouseEnter={() => setActive(index)}
                      aria-current={isActive ? "step" : undefined}
                      className="group flex w-full items-start gap-4 py-3 text-left sm:gap-5"
                    >
                      <span
                        className={cn(
                          "mt-0.5 font-mono text-[10px] tracking-[0.14em] transition-colors duration-500",
                          isActive ? "text-bench" : "text-bench",
                        )}
                      >
                        0{index + 1}
                      </span>
                      <span className="flex-1">
                        <span
                          className={cn(
                            "block text-[17px] font-medium tracking-[-0.015em] transition-colors duration-500",
                            isActive ? "text-bench" : "text-bench",
                          )}
                        >
                          {node.label}
                        </span>
                        <span
                          className={cn(
                            "block overflow-hidden text-[13px] leading-[1.65] text-bench transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:max-h-0 lg:opacity-0",
                            isActive && "lg:mt-1 lg:max-h-16 lg:opacity-100",
                          )}
                        >
                          {node.body}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-2 h-px w-6 transition-all duration-500",
                          isActive ? "bg-amber" : "bg-bench/15",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-bench">
                <span aria-hidden="true">↺</span>
                {home.loop.returnLabel}
              </span>
              <ArrowLink href="/services" theme="dark">
                {home.loop.closing}
              </ArrowLink>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative h-[330px] w-full sm:h-[420px] lg:h-[620px]">
              <LoopVisual progress={progress} active={active} />
            </div>
            <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between sm:inset-x-5">
              <MicroLabel tone="bench">The loop</MicroLabel>
              <span className="flex items-center gap-1.5">
                {home.loop.nodes.map((node, index) => (
                  <span
                    key={node.id}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      index === active ? "w-5 bg-amber" : "w-1 bg-bench/25",
                    )}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
