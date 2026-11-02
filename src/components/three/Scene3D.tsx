"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const R3FCanvas = dynamic(
  () => import("@react-three/fiber").then((module) => module.Canvas),
  { ssr: false },
);

/**
 * Lazy, accessible 3D wrapper.
 * - Renders the static poster first, then fades a canvas over it.
 * - No WebGL or prefers-reduced-motion → poster only.
 * - Below `minWidth` → poster only, so phones never pay for a heavy scene.
 * - Caps DPR at 1.5 on mobile, 2 elsewhere.
 * - Pauses rendering when the scene leaves the viewport or the tab hides.
 */
export function Scene3D({
  children,
  fallback,
  className,
  camera = { position: [0, 0.4, 7], fov: 38 },
  minWidth = 768,
  dpr,
}: {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
  camera?: { position: [number, number, number]; fov: number };
  minWidth?: number;
  dpr?: [number, number];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [dprCap, setDprCap] = useState<[number, number]>(dpr ?? [1, 2]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wideEnough = window.innerWidth >= minWidth;
    const navigatorInfo = navigator as Navigator & { deviceMemory?: number };
    const lowPower =
      (navigator.hardwareConcurrency ?? 8) <= 2 ||
      (navigatorInfo.deviceMemory ?? 8) <= 2;
    let hasWebGL = false;
    try {
      const canvas = document.createElement("canvas");
      hasWebGL = Boolean(
        canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true }) ||
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }),
      );
    } catch {
      hasWebGL = false;
    }

    const frame = requestAnimationFrame(() => {
      setDprCap([1, window.innerWidth < 768 ? 1.5 : 2]);
      if (!reduce && wideEnough && hasWebGL && !lowPower) setEnabled(true);
    });

    return () => cancelAnimationFrame(frame);
  }, [minWidth]);

  useEffect(() => {
    const element = wrapRef.current;
    if (!element || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "160px" },
    );
    observer.observe(element);

    const onVisibility = () =>
      setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  const frameloop = inView && visible ? "always" : "never";

  return (
    <div
      ref={wrapRef}
      className={cn("relative isolate", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        {fallback}
      </div>

      {enabled ? (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            ready ? "opacity-100" : "opacity-0",
          )}
        >
          <R3FCanvas
            dpr={dprCap}
            camera={camera}
            frameloop={frameloop}
            onCreated={() => setReady(true)}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            style={{ background: "transparent" }}
          >
            {children}
          </R3FCanvas>
        </div>
      ) : null}
    </div>
  );
}
