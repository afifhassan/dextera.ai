import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceVisual } from "@/components/services/ServiceVisual";
import { serviceLinks } from "@/lib/data/site";
import { servicePageCopy as copy } from "@/lib/data/services";
import type { Service } from "@/lib/data/services";
import { cn } from "@/lib/utils";

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      className="mt-1 shrink-0 text-deep"
      aria-hidden="true"
    >
      <path
        d="M3 8.5 6.5 12 13 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ServicePage({
  service,
  related,
}: {
  service: Service;
  related: Service[];
}) {
  return (
    <>
      {/* Hero */}
      <section className="theme-dark relative overflow-hidden bg-ink">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-0 h-[560px] w-[560px] rounded-full bg-amber/[0.06] blur-[120px]"
        />
        <Container className="relative">
          <div className="grid min-h-[620px] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-12 lg:gap-8 lg:py-24">
            <div className="lg:col-span-6">
              <nav aria-label="Breadcrumb">
                <ol className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-bench">
                  <li>
                    <Link
                      href="/services"
                      className="transition-colors hover:text-bench"
                    >
                      {copy.breadcrumb}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-bench">{service.shortName}</li>
                </ol>
              </nav>

              <MicroLabel tone="trace" className="mt-10">
                {service.eyebrow}
              </MicroLabel>
              <h1 className="mt-5 max-w-[13ch] text-balance text-[clamp(2.8rem,5.6vw,5.1rem)] font-semibold leading-[0.97] tracking-[-0.055em] text-bench">
                {service.headline}
              </h1>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-bench sm:text-base">
                {service.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="/about#contact"
                  variant="onDarkSolid"
                  size="lg"
                >
                  {copy.talk}
                </Button>
                <Button href="/services" variant="onDark" size="lg">
                  {copy.allServices}
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-[380px] w-full sm:h-[460px] lg:h-[520px]">
                <ServiceVisual
                  type={service.visual}
                  label={service.visualLabel}
                  photo={service.photo}
                  photoAlt={service.photoAlt}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Promise */}
      <section className="bg-bench py-20 sm:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-8 border-t border-steel/18 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <MicroLabel tone="deep">{copy.promiseLabel}</MicroLabel>
            </div>
            <div className="lg:col-span-9">
              <p className="max-w-4xl text-balance text-[clamp(1.6rem,3.1vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.035em] text-ink">
                {service.promise}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefit-led points */}
      <section className="bg-bench pb-24 sm:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-4xl">
                {copy.givesHeading}
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-[1.7] text-steel">
                {copy.givesIntro}
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                {service.points.map((point, index) => (
                  <Reveal
                    key={point.title}
                    delay={index * 0.04}
                    className={cn(
                      "border-t border-steel/18 py-6",
                      index === 0 && "sm:col-span-2",
                    )}
                  >
                    <div className="flex gap-4">
                      <span className="mt-0.5 font-mono text-[9px] tracking-[0.14em] text-deep">
                        0{index + 1}
                      </span>
                      <div>
                        <h3
                          className={cn(
                            "font-semibold tracking-[-0.02em] text-ink",
                            index === 0 ? "text-xl sm:text-2xl" : "text-lg",
                          )}
                        >
                          {point.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-[13px] leading-[1.75] text-steel sm:text-sm">
                          {point.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Engagement steps */}
      <section className="theme-dark relative overflow-hidden bg-ink py-24 sm:py-32">
        <div
          className="bg-grid-dark absolute inset-0 opacity-80"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <MicroLabel tone="trace">{copy.engagementLabel}</MicroLabel>
              <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-[1.03] tracking-[-0.04em] text-bench sm:text-4xl">
                {copy.engagementHeading}
              </h2>
            </div>
            <p className="max-w-xs text-[13px] leading-[1.7] text-bench">
              {copy.engagementIntro}
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-bench/12 bg-bench/10 sm:grid-cols-2 lg:grid-cols-5">
            {service.steps.map((step, index) => (
              <li key={step.title} className="bg-ink p-6 sm:p-7">
                <span className="font-mono text-[9px] tracking-[0.16em] text-bench">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-[16px] font-semibold leading-snug tracking-[-0.015em] text-bench">
                  {step.title}
                </h3>
                <p className="mt-3 text-[12px] leading-[1.7] text-bench">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* What you receive */}
      <section className="bg-bench py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <MicroLabel tone="deep">{copy.receivesLabel}</MicroLabel>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-4xl">
                {copy.receivesHeading}
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-[1.75] text-steel">
                {service.receiveNote}
              </p>
            </div>
            <div className="lg:col-span-8">
              <ul className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                {service.receives.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 border-t border-steel/18 py-4 text-[13px] leading-[1.65] text-ink"
                  >
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Program types (data) */}
      {service.programs ? (
        <section className="bg-bench pb-24 sm:pb-32">
          <Container>
            <div className="border-t border-steel/18 pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
                  {copy.programsHeading}
                </h2>
                <p className="max-w-sm text-[13px] leading-[1.7] text-steel">
                  {copy.programsIntro}
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {service.programs.map((program, index) => (
                  <div
                    key={program.title}
                    className="rounded-[10px] border border-steel/15 bg-ink/[0.018] p-5"
                  >
                    <span className="font-mono text-[8px] tracking-[0.14em] text-steel">
                      0{index + 1}
                    </span>
                    <h3 className="mt-4 text-[14px] font-semibold leading-snug text-ink">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-[11px] leading-[1.65] text-steel">
                      {program.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Honest fidelity (simulator) */}
      {service.fidelity ? (
        <section className="bg-bench pb-24 sm:pb-32">
          <Container>
            <div className="relative overflow-hidden rounded-[12px] border border-ink/10 bg-ink p-7 sm:p-10">
              <div
                className="bg-grid-dark absolute inset-0 opacity-60"
                aria-hidden="true"
              />
              <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <MicroLabel tone="trace">{copy.fidelityLabel}</MicroLabel>
                  <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-bench sm:text-4xl">
                    {service.fidelity.heading}
                  </h2>
                  <p className="mt-6 border-l border-amber/60 pl-4 text-[13px] leading-[1.7] text-bench">
                    {service.fidelity.note}
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-[15px] leading-[1.8] text-bench">
                    {service.fidelity.body}
                  </p>
                  {service.deployment ? (
                    <div className="mt-8 border-t border-bench/12 pt-5">
                      <h3 className="text-sm font-semibold text-bench">
                        {service.deployment.heading}
                      </h3>
                      <p className="mt-2 max-w-xl text-[13px] leading-[1.7] text-bench">
                        {service.deployment.body}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Options (testing) */}
      {service.options ? (
        <section className="bg-bench pb-24 sm:pb-32">
          <Container>
            <div className="border-t border-steel/18 pt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-ink sm:text-3xl">
                  {copy.optionsHeading}
                </h2>
                <p className="max-w-sm text-[13px] leading-[1.7] text-steel">
                  {copy.optionsIntro}
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
                {service.options.map((option) => (
                  <div
                    key={option.title}
                    className="rounded-[12px] border border-steel/15 bg-ink/[0.018] p-6"
                  >
                    <MicroLabel tone="deep">{option.label}</MicroLabel>
                    <h3 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-ink">
                      {option.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.7] text-steel">
                      {option.body}
                    </p>
                  </div>
                ))}
              </div>
              {service.safetyNote ? (
                <p className="mt-6 max-w-2xl border-l border-deep/40 pl-4 text-[12px] leading-[1.7] text-steel">
                  {service.safetyNote}
                </p>
              ) : null}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Quality and trust */}
      <section className="bg-bench pb-24 sm:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-8 border-t border-steel/18 pt-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <MicroLabel tone="deep">{copy.qualityLabel}</MicroLabel>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.05] tracking-[-0.04em] text-ink sm:text-4xl">
                {copy.qualityHeading}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-x-10 gap-y-0 sm:grid-cols-2">
                {service.quality.map((item) => (
                  <div
                    key={item.title}
                    className="border-t border-steel/18 py-5"
                  >
                    <h3 className="text-[14px] font-semibold text-ink">
                      {item.title}
                    </h3>
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

      {/* Related services */}
      <section className="bg-bench pb-24 sm:pb-32">
        <Container>
          <div className="flex items-center justify-between border-t border-steel/18 pt-6">
            <MicroLabel>{copy.relatedLabel}</MicroLabel>
            <ArrowLink href="/services">{copy.allThree}</ArrowLink>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex items-start justify-between gap-4 rounded-[12px] border border-steel/15 bg-ink/[0.015] p-6 transition-colors duration-500 hover:border-deep/40"
              >
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 max-w-md text-[12px] leading-[1.7] text-steel">
                    {item.short}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 text-steel transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-3 rounded-[12px] border border-steel/15 p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-ink">
                  {copy.loopHeading}
                </h3>
                <p className="mt-1 text-[12px] text-steel">{copy.loopBody}</p>
              </div>
              <ArrowLink href="/services">{copy.seeLoop}</ArrowLink>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-steel/20 px-3 py-1.5 text-[11px] text-steel transition-colors hover:border-deep/40 hover:text-deep"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="theme-dark relative overflow-hidden bg-ink py-24 sm:py-28">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <Container className="relative">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <MicroLabel tone="trace">{copy.nextStep}</MicroLabel>
              <h2 className="mt-5 max-w-[17ch] text-balance text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.01] tracking-[-0.05em] text-bench">
                {service.cta.heading}
              </h2>
              <p className="mt-5 max-w-lg text-sm leading-[1.75] text-bench">
                {service.cta.body}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
              <Button
                href="/about#contact"
                variant="onDarkSolid"
                size="lg"
              >
                {copy.talk}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
