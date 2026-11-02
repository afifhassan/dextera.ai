import Link from "next/link";
import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  theme = "light",
  className,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300",
        theme === "dark"
          ? "text-bench underline decoration-bench/40 underline-offset-4 hover:decoration-bench"
          : "text-deep hover:text-ink",
        className,
      )}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="h-3.5 w-3.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
      >
        <path
          d="M2.5 8h10M8.5 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
