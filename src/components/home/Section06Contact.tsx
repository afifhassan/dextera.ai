import { Container } from "@/components/ui/Container";
import { MicroLabel } from "@/components/ui/MicroLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDrift } from "@/components/home/ContactDrift";
import { home } from "@/lib/data/home";
import { site } from "@/lib/data/site";

export function Section06Contact() {
  return (
    <section
      id="section-06"
      className="relative overflow-hidden border-y border-steel/12 bg-bench py-24 sm:py-32 lg:py-40"
    >
      <ContactDrift />
      <Container className="relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <MicroLabel tone="deep">{home.contact.index}</MicroLabel>
              <span aria-hidden="true" className="h-px w-7 bg-steel/25" />
              <MicroLabel>{home.contact.eyebrow}</MicroLabel>
            </div>

            <h2 className="mt-7 max-w-[13ch] text-balance text-[clamp(2.7rem,5.2vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-ink">
              {home.contact.headline}
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.75] text-steel">
              {home.contact.body}
            </p>

            <div className="mt-10 max-w-sm border-t border-steel/15 pt-5">
              <div className="flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-deep" />
                <div>
                  <p className="text-[13px] font-medium text-ink">
                    What happens next
                  </p>
                  <p className="mt-1 text-[12px] leading-[1.65] text-steel">
                    A person reads your message and replies with the best place
                    to start. No newsletter. No automated sequence.
                  </p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-steel/40" />
                <div>
                  <p className="text-[13px] font-medium text-ink">
                    Prefer email?
                  </p>
                  <p className="mt-1 break-words text-[12px] leading-[1.65] text-steel">
                    {site.contact.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
