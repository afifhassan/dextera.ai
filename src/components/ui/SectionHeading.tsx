import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { MicroLabel } from "@/components/ui/MicroLabel";

export function SectionHeading({
  index,
  eyebrow,
  title,
  intro,
  theme = "light",
  align = "left",
  className,
  titleClassName,
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  const dark = theme === "dark";

  return (
    <div
      className={cn(
        align === "center" &&
          "mx-auto flex max-w-3xl flex-col items-center text-center",
        className,
      )}
    >
      {(index || eyebrow) && (
        <div className="flex items-center gap-3">
          {index ? (
            <MicroLabel tone={dark ? "trace" : "deep"}>{index}</MicroLabel>
          ) : null}
          {index && eyebrow ? (
            <span
              aria-hidden="true"
              className={cn("h-px w-6", dark ? "bg-bench/25" : "bg-steel/25")}
            />
          ) : null}
          {eyebrow ? (
            <MicroLabel tone={dark ? "bench" : "steel"}>{eyebrow}</MicroLabel>
          ) : null}
        </div>
      )}

      <h2
        className={cn(
          "mt-6 text-balance text-[clamp(2.2rem,4.8vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]",
          dark ? "text-bench" : "text-ink",
          titleClassName,
        )}
      >
        {title}
      </h2>

      {intro ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-pretty text-base leading-[1.65] sm:text-lg",
            dark ? "text-bench" : "text-steel",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
