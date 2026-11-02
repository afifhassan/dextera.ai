"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "section-01", index: "01", label: "Meet Daxtera" },
  { id: "section-02", index: "02", label: "The challenge" },
  { id: "section-03", index: "03", label: "The loop" },
  { id: "section-04", index: "04", label: "Signals and actions" },
  { id: "section-05", index: "05", label: "Services" },
  { id: "section-06", index: "06", label: "Contact" },
  { id: "section-07", index: "07", label: "FAQ" },
  { id: "section-08", index: "08", label: "Careers" },
];

export function ProgressRail() {
  const [active, setActive] = useState("section-01");

  useEffect(() => {
    const elements = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Homepage sections"
      className="fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ol className="flex flex-col gap-3">
        {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <li key={section.id} className="group relative flex items-center">
              <Link
                href={`#${section.id}`}
                aria-label={`${section.index} — ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                className="flex items-center gap-2 rounded-full py-1 pr-2"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive
                      ? "w-5 bg-deep"
                      : "w-1.5 bg-steel/30 group-hover:bg-steel/60",
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[9px] tracking-[0.12em] transition-colors duration-300",
                    isActive
                      ? "text-deep"
                      : "text-steel group-hover:text-steel",
                  )}
                >
                  {section.index}
                </span>
              </Link>
              <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-full border border-steel/15 bg-bench/95 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-steel opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                {section.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
