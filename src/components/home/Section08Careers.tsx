import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { roles } from "@/lib/data/careers";
import { home } from "@/lib/data/home";

export function Section08Careers() {
  return (
    <section
      id="section-08"
      className="theme-dark relative overflow-hidden bg-ink py-24 sm:py-32 lg:py-36"
    >
      <div className="bg-grid-dark absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-[480px] w-[480px] rounded-full bg-amber/[0.05] blur-[120px]"
      />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <MicroLabel tone="trace">{home.careers.index}</MicroLabel>
              <span aria-hidden="true" className="h-px w-7 bg-bench/20" />
              <MicroLabel tone="bench">{home.careers.eyebrow}</MicroLabel>
            </div>
            <h2 className="mt-7 max-w-[17ch] text-balance text-[clamp(2.6rem,5.2vw,4.9rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-bench">
              {home.careers.headline}
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-[1.75] text-bench">
              {home.careers.body}
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Button href="/careers" variant="onDarkSolid" size="lg">
              {home.careers.cta}
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
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[12px] border border-bench/12 bg-bench/10 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((role, index) => (
            <Reveal
              key={role.slug}
              delay={index * 0.07}
              className="group bg-ink p-6 transition-colors duration-500 hover:bg-bench/[0.035]"
            >
              <div className="flex items-center justify-between">
                <MicroLabel tone="trace">{role.team}</MicroLabel>
                <span
                  aria-hidden="true"
                  className="h-1 w-1 rounded-full bg-bench/25 transition-colors duration-500 group-hover:bg-amber"
                />
              </div>
              <h3 className="mt-7 text-lg font-semibold tracking-[-0.02em] text-bench">
                {role.title}
              </h3>
              <p className="mt-2 min-h-[4.8rem] text-[12px] leading-[1.65] text-bench">
                {role.description}
              </p>
              <p className="mt-5 border-t border-bench/10 pt-3 font-mono text-[8px] uppercase leading-relaxed tracking-[0.12em] text-bench">
                {role.status}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
