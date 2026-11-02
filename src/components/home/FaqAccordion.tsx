"use client";

import { useState } from "react";
import { faq } from "@/lib/data/faq";
import { cn } from "@/lib/utils";

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-steel/18">
      {faq.map((item, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className="border-b border-steel/18">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span className="flex gap-4">
                  <span className="mt-1 font-mono text-[9px] tracking-[0.14em] text-steel">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] font-medium leading-[1.5] tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-deep sm:text-base">
                    {item.question}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen
                      ? "rotate-45 border-deep/40"
                      : "border-steel/20 group-hover:border-steel/40",
                  )}
                >
                  <span className="absolute h-px w-2.5 bg-current text-steel" />
                  <span className="absolute h-2.5 w-px bg-current text-steel" />
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pl-8 text-[13px] leading-[1.75] text-steel sm:text-sm">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
