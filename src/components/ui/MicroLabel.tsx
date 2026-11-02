import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "steel" | "deep" | "trace" | "bench" | "amber";

const tones: Record<Tone, string> = {
  steel: "text-steel",
  deep: "text-deep",
  trace: "text-bench",
  bench: "text-bench",
  amber: "text-bench",
};

export function MicroLabel({
  children,
  tone = "steel",
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={cn(
        "font-mono text-[10px] uppercase leading-none tracking-[0.2em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
