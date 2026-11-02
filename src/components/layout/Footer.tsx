import Image from "next/image";
import Link from "next/link";
import { footer, serviceLinks, site } from "@/lib/data/site";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { MicroLabel } from "@/components/ui/MicroLabel";

export function Footer() {
  // Static so the page can be fully prerendered. Update with the brand year.
  const year = 2026;

  return (
    <footer className="theme-dark relative overflow-hidden bg-ink text-bench">
      <div
        className="bg-grid-dark absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[460px] w-[460px] rounded-full bg-amber/[0.07] blur-[120px]"
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-10 pt-20 sm:px-8 lg:px-12 lg:pt-24">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/brand/daxtera-icon.png"
                alt=""
                width={512}
                height={512}
                className="h-9 w-9 rounded-[9px]"
              />
              <span className="text-lg font-semibold tracking-[-0.03em]">
                Daxtera
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-[1.7] text-bench">
              {footer.note}
            </p>
            <div className="mt-7">
              <ArrowLink href="/about#contact" theme="dark">
                Talk to our team
              </ArrowLink>
            </div>
          </div>

          <div className="lg:col-span-3">
            <MicroLabel tone="trace">Services</MicroLabel>
            <ul className="mt-5 space-y-3.5">
              {serviceLinks.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-sm text-bench transition-colors hover:text-bench"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-sm text-bench transition-colors hover:text-bench"
                >
                  All services
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <MicroLabel tone="trace">Company</MicroLabel>
            <ul className="mt-5 space-y-3.5">
              {footer.companyLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-bench transition-colors hover:text-bench"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <MicroLabel tone="trace">Contact</MicroLabel>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="break-words text-bench transition-colors hover:text-bench"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="text-bench">{site.contact.location}</li>
              <li className="break-words text-bench">
                {site.contact.links}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-bench/12 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-bench">
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <a
                href={site.legal.privacy}
                className="text-xs text-bench transition-colors hover:text-bench"
              >
                Privacy policy
              </a>
            </li>
            <li>
              <a
                href={site.legal.terms}
                className="text-xs text-bench transition-colors hover:text-bench"
              >
                Terms of service
              </a>
            </li>
            <li>
              <a
                href="#main"
                className="text-xs text-bench transition-colors hover:text-bench"
              >
                Back to top ↑
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
