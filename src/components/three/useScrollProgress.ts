"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Mutable 0..1 scroll progress for a section, optionally pinned on desktop.
 * The ref avoids a React render for every scroll tick; discrete changes can
 * be mirrored into state where the UI needs them.
 */
export function useScrollProgress<
  T extends HTMLElement = HTMLElement,
>(options?: {
  pin?: boolean;
  start?: string;
  end?: string;
  scrub?: number;
  onProgress?: (progress: number) => void;
}) {
  const progress = useRef(0);
  const triggerRef = useRef<T>(null);
  const [pinnedProgress, setPinnedProgress] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const element = triggerRef.current;
    if (reduce || !element) return;

    gsap.registerPlugin(ScrollTrigger);

    const canPin =
      options?.pin && window.matchMedia("(min-width: 1024px)").matches;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: options?.start ?? "top bottom",
      end: options?.end ?? "bottom top",
      pin: canPin,
      scrub: options?.scrub ?? 1,
      onUpdate: (self) => {
        progress.current = self.progress;
        options?.onProgress?.(self.progress);
      },
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      trigger.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { progress, triggerRef, pinnedProgress, setPinnedProgress };
}
