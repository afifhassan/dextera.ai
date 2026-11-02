import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "onDark" | "onDarkSolid" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-bench hover:-translate-y-0.5 hover:bg-ink active:translate-y-0",
  secondary:
    "border border-steel/30 bg-transparent text-ink hover:border-steel/60 hover:bg-ink/[0.03]",
  onDark:
    "border border-bench/25 bg-transparent text-bench hover:border-bench/55 hover:bg-bench/[0.06]",
  onDarkSolid:
    "bg-bench text-ink hover:-translate-y-0.5 hover:bg-bench active:translate-y-0",
  ghost: "text-ink hover:bg-ink/[0.05]",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-5 text-[13px] tracking-[0.01em]",
  lg: "h-12 px-6 text-sm",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  type = "button",
  onClick,
  disabled = false,
  className,
  children,
  ariaLabel,
  target,
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  target?: "_blank";
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        target={target}
        onClick={onClick}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
