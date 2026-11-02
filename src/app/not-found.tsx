import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MicroLabel } from "@/components/ui/MicroLabel";

export default function NotFound() {
  return (
    <section className="bg-bench py-28 sm:py-40">
      <Container size="narrow">
        <MicroLabel tone="deep">404</MicroLabel>
        <h1 className="mt-6 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.05em] text-ink">
          This page is not part of the loop.
        </h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-steel">
          The page you were looking for does not exist, or has moved. Start from
          the work itself.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href="/" size="lg">
            Back to Daxtera
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            Explore services
          </Button>
        </div>
        <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
          Or write to us —{" "}
          <Link href="/about#contact" className="text-deep">
            contact
          </Link>
        </p>
      </Container>
    </section>
  );
}
