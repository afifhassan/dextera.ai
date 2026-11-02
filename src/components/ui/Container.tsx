import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const widths = {
  narrow: "max-w-[860px]",
  default: "max-w-[1280px]",
  wide: "max-w-[1440px]",
} as const;

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: keyof typeof widths;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-12",
        widths[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
