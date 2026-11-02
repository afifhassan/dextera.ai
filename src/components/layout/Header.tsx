"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/data/site";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    menuRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-steel/15 bg-bench/92 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="relative flex shrink-0 items-center rounded-sm"
          aria-label="Daxtera — home"
        >
          <Image
            src="/brand/daxtera-wordmark-dark.png"
            alt="Daxtera"
            width={1600}
            height={497}
            priority
            sizes="120px"
            className="h-[30px] w-auto sm:h-[32px]"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-[13px] font-medium tracking-[0.01em] text-steel transition-colors duration-300 hover:text-ink",
                  active && "text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px bg-deep"
                  />
                ) : null}
              </Link>
            );
          })}
          <Button
            href="/about#contact"
            size="md"
            className="ml-2"
            ariaLabel="Contact Daxtera"
          >
            Contact
            <svg
              aria-hidden="true"
              viewBox="0 0 14 14"
              className="h-3 w-3 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
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
        </nav>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-steel/20 text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-4 bg-ink transition-transform duration-300",
                open && "top-1.5 rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-4 bg-ink transition-transform duration-300",
                open && "bottom-1.5 -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="site-menu"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] overflow-y-auto border-t border-steel/15 bg-bench lg:hidden"
          >
            <div className="mx-auto flex min-h-full w-full max-w-[1280px] flex-col px-5 py-8 sm:px-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
                Menu
              </p>
              <nav aria-label="Mobile" className="mt-5 flex flex-col">
                {nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.04 + index * 0.05,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between border-b border-steel/15 py-5 text-[clamp(1.8rem,7vw,2.8rem)] font-semibold leading-none tracking-[-0.04em] text-ink"
                    >
                      {item.label}
                      <span className="font-mono text-[10px] font-normal tracking-[0.18em] text-steel">
                        0{index + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8 grid grid-cols-1 gap-2">
                {["Real-world data", "Calibrated simulator", "Testing"].map(
                  (label, index) => (
                    <Link
                      key={label}
                      href={
                        [
                          "/services/real-world-data",
                          "/services/calibrated-simulator",
                          "/services/testing-and-comparison",
                        ][index]
                      }
                      onClick={() => setOpen(false)}
                      className="rounded-xl border border-steel/15 px-4 py-3 text-sm text-steel"
                    >
                      {label}
                    </Link>
                  ),
                )}
              </div>

              <div className="mt-auto pt-10">
                <Button
                  href="/about#contact"
                  size="lg"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Contact us
                </Button>
                <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
                  {site.tagline}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
