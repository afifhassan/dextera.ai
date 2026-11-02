import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CareersForm } from "@/components/forms/CareersForm";
import { careers, roles } from "@/lib/data/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Work on the data physical AI depends on. Roles for domain experts, capture specialists, annotators and engineers.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers ” Daxtera",
    description:
      "Work on the data physical AI depends on. Verified experts, capture specialists and the team behind them.",
    url: "/careers",
    images: [
      {
        url: "/og/careers.png",
        width: 1200,
        height: 630,
        alt: "Daxtera careers",
      },
    ],
  },
};

export default function CareersPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-steel/12 bg-bench">
        <div
          className="bg-grid-light pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <MicroLabel tone="deep">{careers.title}</MicroLabel>
              <h1 className="mt-7 max-w-[14ch] text-balance text-[clamp(3rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-ink">
                {careers.headline}
              </h1>
            </div>
            <div className="lg:col-span-4 lg:self-end">
              <p className="max-w-md text-[15px] leading-[1.75] text-steel">
                {careers.intro}
              </p>
              <p className="mt-4 font-mono text-[9px] uppercase leading-[1.7] tracking-[0.13em] text-steel">
                {careers.note}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-bench py-20 sm:py-24">
        <Container>
          <div className="flex flex-col gap-4 border-t border-steel/18 pt-7 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-ink">
              {careers.rolesCopy.heading}
            </h2>
            <p className="max-w-sm text-[12px] leading-[1.7] text-steel">
              {careers.rolesCopy.intro}
            </p>
          </div>

          <div className="mt-8 border-t border-steel/18">
            {roles.map((role, index) => (
              <div
                key={role.slug}
                className="grid grid-cols-1 gap-5 border-b border-steel/18 py-7 lg:grid-cols-12 lg:gap-8"
              >
                <div className="lg:col-span-1">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <MicroLabel>{role.team}</MicroLabel>
                  <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {role.title}
                  </h3>
                </div>
                <div className="lg:col-span-5">
                  <p className="max-w-xl text-[13px] leading-[1.75] text-steel">
                    {role.description}
                  </p>
                </div>
                <div className="lg:col-span-2 lg:text-right">
                  <p className="font-mono text-[8px] uppercase leading-[1.7] tracking-[0.12em] text-steel">
                    {role.status}
                  </p>
                  <Link
                    href="#apply"
                    className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium text-deep"
                  >
                    Apply
                    <span aria-hidden="true">↓</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="theme-dark relative overflow-hidden bg-ink py-20 sm:py-24">
        <div
          className="bg-grid-dark absolute inset-0 opacity-60"
          aria-hidden="true"
        />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <MicroLabel tone="trace">{careers.culture.eyebrow}</MicroLabel>
              <h2 className="mt-5 max-w-[13ch] text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-bench">
                {careers.culture.heading}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {careers.culture.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[12px] border border-bench/12 p-6"
                  >
                    <span
                      aria-hidden="true"
                      className="block h-1 w-1 rounded-full bg-amber"
                    />
                    <h3 className="mt-6 text-base font-semibold text-bench">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[12px] leading-[1.7] text-bench">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="apply" className="bg-bench py-24 sm:py-32">
        <Container size="narrow">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <MicroLabel tone="deep">{careers.application.heading}</MicroLabel>
              <h2 className="mt-5 text-[clamp(2.3rem,4.3vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-ink">
                {careers.applyCopy.heading}
              </h2>
              <p className="mt-5 max-w-sm text-[13px] leading-[1.75] text-steel">
                {careers.application.body}
              </p>
              <div className="mt-8 border-t border-steel/15 pt-5">
                <p className="max-w-sm text-[12px] leading-[1.7] text-steel">
                  {careers.applyCopy.body}
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <CareersForm />
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-steel/18 pt-6 sm:flex-row sm:items-center">
            <p className="max-w-lg text-[12px] leading-[1.7] text-steel">
              {careers.applyCopy.closing}
            </p>
            <ArrowLink href="/about#contact">
              {careers.applyCopy.contact}
            </ArrowLink>
          </div>
        </Container>
      </section>
    </>
  );
}
