import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { Button } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/ui/Reveal";
import { LoopDiagram } from "@/components/services/LoopDiagram";
import { services, servicesOverview as copy } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Our services",
  description:
    "Real-world physical data, a calibrated simulator and independent testing ” three services that reinforce each other for physical AI.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our services ” Daxtera",
    description:
      "Real-world data, calibrated simulation and testing, built niche by niche from the work of real experts.",
    url: "/services",
    images: [
      {
        url: "/og/services.png",
        width: 1200,
        height: 630,
        alt: "Daxtera services",
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="theme-dark relative overflow-hidden bg-ink">
        <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-amber/[0.06] blur-[130px]"
        />
        <Container className="relative">
          <div className="grid min-h-[620px] grid-cols-1 items-center gap-10 py-20 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-7">
              <MicroLabel tone="trace">{copy.eyebrow}</MicroLabel>
              <h1 className="mt-6 max-w-[12ch] text-balance text-[clamp(3rem,6.2vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-bench">
                {copy.headline}
              </h1>
              <p className="mt-7 max-w-xl text-[16px] leading-[1.7] text-bench">
                {copy.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="/about#contact"
                  variant="onDarkSolid"
                  size="lg"
                >
                  {copy.primaryCta}
                </Button>
                <Button href="#service-list" variant="onDark" size="lg">
                  {copy.secondaryCta}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <LoopDiagram />
            </div>
          </div>
        </Container>
      </section>

      <section id="service-list" className="bg-bench py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-5 border-t border-steel/18 pt-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-xl text-3xl font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-4xl">
              {copy.listHeading}
            </h2>
            <p className="max-w-sm text-[13px] leading-[1.7] text-steel">
              {copy.listIntro}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={index * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-1 gap-6 rounded-[12px] border border-steel/15 bg-ink/[0.015] p-6 transition-colors duration-500 hover:border-deep/40 sm:p-8 lg:grid-cols-12 lg:items-center"
                >
                  <div className="lg:col-span-1">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-deep">
                      {service.index}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-2xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-3xl">
                      {service.name}
                    </h3>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="max-w-lg text-[13px] leading-[1.75] text-steel sm:text-sm">
                      {service.short}
                    </p>
                  </div>
                  <div className="lg:col-span-2 lg:text-right">
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-deep">
                      Explore
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="theme-dark relative overflow-hidden bg-ink py-24 sm:py-32">
        <div
          className="bg-grid-dark absolute inset-0 opacity-80"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <MicroLabel tone="trace">{copy.standardEyebrow}</MicroLabel>
              <h2 className="mt-5 max-w-sm text-3xl font-semibold leading-[1.04] tracking-[-0.04em] text-bench sm:text-4xl">
                {copy.standardHeading}
              </h2>
              <p className="mt-5 max-w-sm text-[13px] leading-[1.75] text-bench">
                {copy.standardIntro}
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-bench/12 bg-bench/10 sm:grid-cols-3">
                {copy.standardItems.map((item) => (
                  <div key={item.title} className="bg-ink p-6 sm:p-7">
                    <span
                      aria-hidden="true"
                      className="block h-1 w-1 rounded-full bg-amber"
                    />
                    <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-bench">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-[1.7] text-bench">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 border-t border-bench/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-bench">{copy.closing}</p>
                <ArrowLink href="/vision" theme="dark">
                  {copy.visionLink}
                </ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bench py-20 sm:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-7 border-t border-steel/18 pt-8 sm:flex-row sm:items-center">
            <div>
              <MicroLabel tone="deep">{copy.ctaEyebrow}</MicroLabel>
              <p className="mt-3 max-w-xl text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-ink">
                {copy.ctaHeading}
              </p>
            </div>
            <Button href="/about#contact" size="lg">
              {copy.ctaButton}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
