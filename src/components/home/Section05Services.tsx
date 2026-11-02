import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceObject } from "@/components/home/ServiceObject";
import { TreatedPhoto } from "@/components/media/TreatedPhoto";
import { home } from "@/lib/data/home";
import { buyerCategories } from "@/lib/data/site";
import type { ServiceVisual } from "@/lib/data/services";

const visualMap: Record<string, ServiceVisual> = {
  "real-world-data": "dataset",
  "calibrated-simulator": "simulator",
  "testing-and-comparison": "benchmark",
};

const photoMap: Record<string, { src: string; alt: string }> = {
  "real-world-data": {
    src: "/photos/precision-work.webp",
    alt: "An expert aligning a cable connector on a precision press.",
  },
  "calibrated-simulator": {
    src: "/photos/expert-work-wide.webp",
    alt: "An expert using a precision tool at a bench of machined components.",
  },
  "testing-and-comparison": {
    src: "/photos/gripper-test.webp",
    alt: "A robotic gripper holding a small object during a controlled test.",
  },
};

export function Section05Services() {
  return (
    <section
      id="section-05"
      className="theme-dark relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-40"
    >
      <div
        className="bg-grid-dark absolute inset-0 opacity-80"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-amber/[0.06] blur-[130px]"
      />

      <Container className="relative">
        <div className="flex items-center gap-3">
          <MicroLabel tone="trace">{home.services.index}</MicroLabel>
          <span aria-hidden="true" className="h-px w-7 bg-bench/20" />
          <MicroLabel tone="bench">{home.services.eyebrow}</MicroLabel>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <h2 className="max-w-[15ch] text-balance text-[clamp(2.6rem,5.4vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-bench">
              {home.services.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.75] text-bench">
              {home.services.intro}
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 80"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -top-10 left-0 hidden h-20 w-full lg:block"
          >
            <path
              d="M150 40 C330 -10 420 80 600 40 S 870 -10 1050 40"
              fill="none"
              stroke="#EEF1F4"
              strokeOpacity="0.28"
              strokeDasharray="3 8"
            />
            <circle cx="150" cy="40" r="3" fill="#EEF1F4" />
            <circle cx="600" cy="40" r="3" fill="#EEF1F4" />
            <circle cx="1050" cy="40" r="3" fill="#EEF1F4" />
          </svg>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {home.services.cards.map((card, index) => (
              <Reveal key={card.slug} delay={index * 0.08}>
                <Link
                  href={`/services/${card.slug}`}
                  className="group flex h-full flex-col rounded-[12px] border border-bench/15 bg-bench/[0.025] p-6 transition-[background-color,border-color,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-bench/35 hover:bg-bench/[0.05] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <MicroLabel tone="trace">{card.index}</MicroLabel>
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-bench/20 text-bench transition-colors duration-500 group-hover:border-amber/60 group-hover:text-bench"
                    >
                      <svg viewBox="0 0 14 14" className="h-3 w-3">
                        <path
                          d="M3 11 11 3M5 3h6v6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="relative mt-5 h-[160px] w-full overflow-hidden rounded-lg border border-bench/12 [perspective:900px] sm:h-[190px]">
                    <TreatedPhoto
                      src={photoMap[card.slug].src}
                      alt={photoMap[card.slug].alt}
                      sizes="(max-width: 1024px) 90vw, 30vw"
                      className="absolute inset-0"
                      imageClassName="object-center"
                    />
                    <div
                      className="bg-grid-dark absolute inset-0 opacity-25"
                      aria-hidden="true"
                    />
                    <div className="relative h-full w-full [transform:rotateX(7deg)_rotateY(-5deg)] [transform-style:preserve-3d]">
                      <ServiceObject variant={visualMap[card.slug]} />
                    </div>
                  </div>

                  <h3 className="mt-4 text-[22px] font-semibold leading-[1.1] tracking-[-0.03em] text-bench">
                    {card.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[13px] leading-[1.7] text-bench">
                    {card.short}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium text-bench transition-colors duration-300 group-hover:text-bench">
                    {card.link}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-bench/12 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <MicroLabel tone="bench">{home.services.builtForLabel}</MicroLabel>
            <div className="flex max-w-[880px] flex-wrap gap-2">
              {buyerCategories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-bench/14 px-3.5 py-1.5 text-[11px] leading-none text-bench"
                >
                  {category}
                </span>
              ))}
            </div>
            <ArrowLink href="/services" theme="dark" className="shrink-0">
              Compare all three
            </ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
