import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { ChallengeVisual } from "@/components/home/ChallengeVisual";
import { home } from "@/lib/data/home";

export function Section02Challenge() {
  return (
    <section
      id="section-02"
      className="relative bg-bench py-24 sm:py-32 lg:py-40"
    >
      <div
        className="bg-grid-light pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
      />
      <Container className="relative">
        <div className="flex items-center gap-3">
          <MicroLabel tone="deep">{home.challenge.index}</MicroLabel>
          <span aria-hidden="true" className="h-px w-7 bg-steel/25" />
          <MicroLabel>{home.challenge.eyebrow}</MicroLabel>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-8">
            <h2 className="max-w-[18ch] text-balance text-[clamp(2.6rem,5.6vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
              {home.challenge.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:pt-2">
            <p className="max-w-[34rem] text-[15px] leading-[1.75] text-steel sm:text-base">
              {home.challenge.body}
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 sm:mt-16">
          <ChallengeVisual />
        </Reveal>

        <div className="mt-10 flex justify-start">
          <ArrowLink href="#section-03">See how the gap closes</ArrowLink>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-steel/15 bg-steel/15 sm:mt-20 md:grid-cols-3">
          {home.challenge.cards.map((card, index) => (
            <Reveal
              key={card.title}
              delay={index * 0.08}
              className="group bg-bench p-6 transition-colors duration-500 hover:bg-ink/[0.025] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.16em] text-deep">
                  0{index + 1}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-steel/30 transition-colors duration-500 group-hover:bg-coral"
                />
              </div>
              <h3 className="mt-8 text-xl font-semibold tracking-[-0.02em] text-ink">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.7] text-steel">
                {card.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
