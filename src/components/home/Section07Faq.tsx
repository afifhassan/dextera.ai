import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { FaqAccordion } from "@/components/home/FaqAccordion";
import { home } from "@/lib/data/home";

export function Section07Faq() {
  return (
    <section
      id="section-07"
      className="relative bg-bench py-24 sm:py-32 lg:py-40"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <MicroLabel tone="deep">{home.faq.index}</MicroLabel>
              <span aria-hidden="true" className="h-px w-7 bg-steel/25" />
              <MicroLabel>{home.faq.eyebrow}</MicroLabel>
            </div>
            <h2 className="mt-7 max-w-[12ch] text-balance text-[clamp(2.7rem,5.1vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
              {home.faq.headline}
            </h2>
            <p className="mt-6 max-w-xs text-[15px] leading-[1.75] text-steel">
              {home.faq.intro}
            </p>
            <div className="mt-8">
              <ArrowLink href="/about#contact">Ask us something else</ArrowLink>
            </div>

            <div className="mt-14 hidden border-t border-steel/15 pt-5 lg:block">
              <p className="font-mono text-[9px] uppercase leading-[1.8] tracking-[0.15em] text-steel">
                The answer is always tied to the task.
                <br />
                If yours is unusual, say so.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <FaqAccordion />
          </div>
        </div>
      </Container>
    </section>
  );
}
