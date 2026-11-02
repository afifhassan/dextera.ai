import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { HeroVisual } from "@/components/three/HeroVisual";
import { home } from "@/lib/data/home";

export function Section01Hero() {
  return (
    <section
      id="section-01"
      className="theme-dark relative isolate overflow-hidden bg-ink"
    >
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-[-18%] h-[560px] w-[560px] rounded-full bg-amber/[0.06] blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-16%] top-1/4 h-[680px] w-[680px] rounded-full bg-amber/[0.07] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <Container className="relative flex min-h-[calc(100svh-72px)] flex-col">
        <div className="grid flex-1 grid-cols-1 items-center gap-10 pb-10 pt-16 lg:grid-cols-12 lg:gap-6 lg:pb-12 lg:pt-20">
          <div className="relative z-10 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="dax-pulse h-1.5 w-1.5 rounded-full bg-amber"
              />
              <MicroLabel tone="trace">{home.hero.eyebrow}</MicroLabel>
            </div>

            <h1 className="mt-8 max-w-[15ch] text-balance text-[clamp(3.15rem,7.4vw,7rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-bench">
              Ground truth <br />
              for{" "}
              <span className="relative inline-block">
                physical AI.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-[9px] w-full text-trace/55"
                >
                  <path
                    d="M2 8.5C58 4.5 118 3.5 178 5.5C224 7 260 7.5 298 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-9 max-w-[34rem] text-pretty text-[17px] leading-[1.65] text-bench sm:text-lg">
              {home.hero.subhead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button
                href={home.hero.primaryCta.href}
                variant="onDarkSolid"
                size="lg"
              >
                {home.hero.primaryCta.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
                >
                  <path
                    d="M2 7h9M7.5 3.5 11 7l-3.5 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button
                href={home.hero.secondaryCta.href}
                variant="onDark"
                size="lg"
              >
                {home.hero.secondaryCta.label}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0.5"
                >
                  <path
                    d="M7 2v9M3.5 7.5 7 11l3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[460px] lg:ml-auto lg:h-[640px] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-bench/20 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-10 left-0 top-10 w-px bg-gradient-to-b from-transparent via-bench/15 to-transparent"
              />
              <HeroVisual />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-4">
                <MicroLabel tone="bench">Skilled motion</MicroLabel>
                <span aria-hidden="true" className="h-px w-10 bg-bench/20" />
                <MicroLabel tone="bench">Machine motion</MicroLabel>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-6 border-t border-bench/10 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-bench">{home.hero.quietLine}</p>
          <ul className="flex flex-wrap gap-x-7 gap-y-2">
            {home.hero.facts.map((fact) => (
              <li
                key={fact}
                className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bench"
              >
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-amber/80"
                />
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
