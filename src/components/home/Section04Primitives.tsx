import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { PrimitivesVisual } from "@/components/home/PrimitivesVisual";
import { home } from "@/lib/data/home";

export function Section04Primitives() {
  return (
    <section
      id="section-04"
      className="relative bg-bench py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <div className="flex items-center gap-3">
          <MicroLabel tone="deep">{home.primitives.index}</MicroLabel>
          <span aria-hidden="true" className="h-px w-7 bg-steel/25" />
          <MicroLabel>{home.primitives.eyebrow}</MicroLabel>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <h2 className="max-w-[18ch] text-balance text-[clamp(2.5rem,5.1vw,4.8rem)] font-semibold leading-[0.99] tracking-[-0.055em] text-ink">
              {home.primitives.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-[15px] leading-[1.75] text-steel">
              {home.primitives.body}
            </p>
            <div className="mt-5">
              <ArrowLink href="/services/real-world-data">
                See how data is delivered
              </ArrowLink>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-14 sm:mt-16">
          <PrimitivesVisual />
        </Reveal>
      </Container>
    </section>
  );
}
