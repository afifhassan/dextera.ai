import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { VisionScroll } from "@/components/vision/VisionScroll";
import { vision } from "@/lib/data/vision";

export const metadata: Metadata = {
  title: "Our vision",
  description:
    "A physical world machines can learn from. Real work, measured simulation and tests that show what a system can do.",
  alternates: { canonical: "/vision" },
  openGraph: {
    title: "Our vision ” Daxtera",
    description:
      "Real before synthetic. Measured, not claimed. Experts first. Consent by default. Niche by niche.",
    url: "/vision",
    images: [
      {
        url: "/og/vision.png",
        width: 1200,
        height: 630,
        alt: "Daxtera vision",
      },
    ],
  },
};

export default function VisionPage() {
  return (
    <>
      <section className="theme-dark relative overflow-hidden bg-ink">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[620px] w-[620px] rounded-full bg-amber/[0.06] blur-[130px]"
        />
        <Container className="relative">
          <div className="min-h-[640px] py-20 lg:py-28">
            <MicroLabel tone="trace">Our vision</MicroLabel>
            <h1 className="mt-7 max-w-[13ch] text-balance text-[clamp(3rem,7vw,6.8rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-bench">
              {vision.headline}
            </h1>
            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-bench/12 pt-7 lg:grid-cols-12">
              <p className="max-w-xl text-[15px] leading-[1.75] text-bench lg:col-span-6">
                {vision.intro}
              </p>
              <div className="lg:col-span-4 lg:col-start-9">
                <MicroLabel tone="trace">{vision.mission.label}</MicroLabel>
                <p className="mt-3 text-[14px] leading-[1.7] text-bench">
                  {vision.mission.statement}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative bg-bench py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mb-12 flex flex-col gap-4 border-b border-steel/18 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <MicroLabel tone="deep">{vision.path.eyebrow}</MicroLabel>
              <p className="mt-3 max-w-xl text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-ink">
                {vision.path.headline}
              </p>
            </div>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-steel">
              {vision.path.hint}
            </p>
          </div>
          <VisionScroll />
        </Container>
      </section>

      <section className="border-y border-steel/12 bg-bench py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <MicroLabel tone="deep">
                {vision.principlesCopy.eyebrow}
              </MicroLabel>
              <h2 className="mt-4 text-3xl font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-4xl">
                {vision.principlesCopy.headline}
              </h2>
            </div>
            <p className="max-w-sm text-[13px] leading-[1.7] text-steel">
              {vision.principlesCopy.intro}
            </p>
          </div>

          <div className="mt-12">
            {vision.principles.map((principle) => (
              <div
                key={principle.index}
                className="grid grid-cols-1 gap-5 border-t border-steel/18 py-10 lg:grid-cols-12 lg:gap-8 lg:py-14"
              >
                <div className="lg:col-span-1">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-deep">
                    {principle.index}
                  </span>
                </div>
                <div className="lg:col-span-5">
                  <h3 className="max-w-[15ch] text-balance text-[clamp(1.9rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
                    {principle.title}
                  </h3>
                </div>
                <div className="lg:col-span-4">
                  <p className="max-w-md text-[14px] leading-[1.75] text-steel">
                    {principle.body}
                  </p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <span className="font-mono text-[8px] uppercase leading-[1.7] tracking-[0.14em] text-steel">
                    {principle.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bench py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-7 border-t border-steel/18 pt-8 sm:flex-row sm:items-center">
            <div>
              <MicroLabel tone="deep">{vision.cta.eyebrow}</MicroLabel>
              <p className="mt-3 max-w-xl text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-ink">
                {vision.cta.heading}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/services" size="lg">
                {vision.cta.primary}
              </Button>
              <ArrowLink href="/about#contact" className="self-center">
                {vision.cta.secondary}
              </ArrowLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
