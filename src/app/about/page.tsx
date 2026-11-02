import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDrift } from "@/components/home/ContactDrift";
import { LoopDiagram } from "@/components/services/LoopDiagram";
import { about } from "@/lib/data/about";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Daxtera builds verified real-world data, calibrated simulation and independent testing for physical AI, niche by niche.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Daxtera",
    description:
      "A company built around what can be proved: real work, measured fidelity and documented rights.",
    url: "/about",
    images: [
      { url: "/og/about.png", width: 1200, height: 630, alt: "About Daxtera" },
    ],
  },
};

const trustItems = about.trust.items;

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-steel/12 bg-bench">
        <div
          className="bg-grid-light pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-8">
              <MicroLabel tone="deep">{about.title}</MicroLabel>
              <h1 className="mt-7 max-w-[15ch] text-balance text-[clamp(3rem,6.4vw,6rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-ink">
                {about.headline}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:self-end">
              <p className="max-w-md text-[15px] leading-[1.75] text-steel">
                {about.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="bg-bench py-20 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <MicroLabel tone="deep">{about.story.heading}</MicroLabel>
              <div className="mt-5 rounded-[12px] border border-dashed border-steel/25 p-5">
                <p className="font-mono text-[9px] uppercase leading-[1.8] tracking-[0.13em] text-steel">
                  {about.story.placeholder}
                </p>
              </div>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-balance text-[clamp(1.5rem,2.9vw,2.3rem)] font-medium leading-[1.25] tracking-[-0.035em] text-ink">
                {about.story.lead}
              </p>
              <div className="mt-8 space-y-5 border-t border-steel/18 pt-6">
                {about.story.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="max-w-xl text-[14px] leading-[1.8] text-steel"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="theme-dark relative overflow-hidden bg-ink py-24 sm:py-32">
        <div
          className="bg-grid-dark absolute inset-0 opacity-80"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <MicroLabel tone="trace">{about.howWeWork.heading}</MicroLabel>
              <h2 className="mt-5 max-w-[14ch] text-balance text-[clamp(2.3rem,4.4vw,3.9rem)] font-semibold leading-[1.01] tracking-[-0.05em] text-bench">
                {about.howWeWork.headline}
              </h2>
              <p className="mt-6 max-w-md text-[14px] leading-[1.75] text-bench">
                {about.howWeWork.intro}
              </p>
              <div className="mt-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-bench">
                <span aria-hidden="true">↺</span>
                {about.howWeWork.loop}
              </div>
              <div className="mt-8 [&_figure]:max-w-[430px]">
                <LoopDiagram compact />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-bench/12">
                {about.howWeWork.steps.map((step) => (
                  <Link
                    key={step.index}
                    href={step.href}
                    className="group grid grid-cols-1 gap-4 border-b border-bench/12 py-7 sm:grid-cols-[54px_1fr_28px] sm:items-start"
                  >
                    <span className="font-mono text-[10px] tracking-[0.16em] text-bench">
                      {step.index}
                    </span>
                    <span>
                      <span className="block text-xl font-semibold tracking-[-0.025em] text-bench">
                        {step.title}
                      </span>
                      <span className="mt-2 block max-w-xl text-[13px] leading-[1.7] text-bench">
                        {step.body}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-bench transition-transform duration-500 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-8 rounded-[12px] border border-bench/12 p-6">
                <MicroLabel tone="trace">The loop in practice</MicroLabel>
                <p className="mt-3 max-w-xl text-[13px] leading-[1.75] text-bench">
                  {about.howWeWork.loopBody}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust and safety */}
      <section className="bg-bench py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <MicroLabel tone="deep">{about.trust.heading}</MicroLabel>
              <h2 className="mt-5 max-w-[12ch] text-[clamp(2.2rem,4.2vw,3.7rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink">
                {about.trust.headline}
              </h2>
              <p className="mt-5 max-w-sm text-[13px] leading-[1.75] text-steel">
                {about.trust.intro}
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                {trustItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="border-t border-steel/18 py-5"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-[14px] font-semibold text-ink">
                        {item.title}
                      </h3>
                      <span className="font-mono text-[8px] tracking-[0.12em] text-steel">
                        0{index + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] leading-[1.7] text-steel">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-steel/12 bg-bench py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <MicroLabel tone="deep">{about.team.heading}</MicroLabel>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-ink">
                {about.team.headline}
              </h2>
            </div>
            <p className="max-w-sm text-[12px] leading-[1.7] text-steel">
              {about.team.note}
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {about.team.cards.map((card, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[12px] border border-steel/15 bg-ink/[0.015]"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-steel/12 bg-ink/[0.035]">
                  <div
                    className="bg-grid-fine absolute inset-0 opacity-60"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-steel/20 font-mono text-[10px] tracking-[0.1em] text-steel">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="font-mono text-[9px] uppercase leading-[1.6] tracking-[0.12em] text-steel">
                    {card.label}
                  </p>
                  <p className="mt-2 text-[11px] text-steel">{card.role}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-steel/12 bg-bench py-24 sm:py-32"
      >
        <ContactDrift />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <MicroLabel tone="deep">{about.contact.eyebrow}</MicroLabel>
              <h2 className="mt-5 max-w-[12ch] text-balance text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
                {about.contact.heading}
              </h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-steel">
                {about.contact.body}
              </p>

              <dl className="mt-10 max-w-sm border-t border-steel/15 pt-5 text-[13px]">
                <div className="border-b border-steel/12 py-3">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-steel">
                    Email
                  </dt>
                  <dd className="mt-1.5 break-words text-ink">
                    {site.contact.email}
                  </dd>
                </div>
                <div className="border-b border-steel/12 py-3">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-steel">
                    Location
                  </dt>
                  <dd className="mt-1.5 text-ink">{site.contact.location}</dd>
                </div>
                <div className="py-3">
                  <dt className="font-mono text-[8px] uppercase tracking-[0.14em] text-steel">
                    Links
                  </dt>
                  <dd className="mt-1.5 break-words text-ink">
                    {site.contact.links}
                  </dd>
                </div>
              </dl>

              <div className="mt-7">
                <ArrowLink href="/careers">{about.contact.roleLink}</ArrowLink>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bench pb-20">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 border-t border-steel/18 pt-7 sm:flex-row sm:items-center">
            <p className="max-w-lg text-[13px] leading-[1.7] text-steel">
              {about.contact.closing}
            </p>
            <Button href="/services" variant="secondary" size="md">
              {about.contact.closingCta}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
