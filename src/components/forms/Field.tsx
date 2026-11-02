import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const inputClass =
  "w-full rounded-[10px] border border-steel/20 bg-bench px-4 py-3 text-[15px] text-ink outline-none transition-colors duration-300 placeholder:text-steel hover:border-steel/35 focus:border-deep";

export const textareaClass = cn(inputClass, "min-h-[130px] resize-y");

export function Field({
  id,
  label,
  optional = false,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label
          htmlFor={id}
          className="font-mono text-[9px] uppercase tracking-[0.16em] text-steel"
        >
          {label}
        </label>
        {optional ? (
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-steel">
            Optional
          </span>
        ) : null}
      </div>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[11px] leading-relaxed text-coral"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
