import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Client-provided field photography, cropped and duotoned to sit inside the
 * Daxtera palette. The photo stays a real photograph; the overlay only unifies
 * the tones.
 */
export function TreatedPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className,
  imageClassName,
  overlay = "dark",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  overlay?: "dark" | "light";
}) {
  return (
    <div className={cn("overflow-hidden bg-ink", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imageClassName)}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 mix-blend-multiply",
          overlay === "dark" ? "bg-ink/30" : "bg-ink/10",
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/5 to-transparent"
      />
    </div>
  );
}
