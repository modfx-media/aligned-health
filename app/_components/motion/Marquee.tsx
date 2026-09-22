"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Infinite, seamless horizontal marquee.
 *
 * Duplicates its children once so the two tracks can loop into each other.
 * Animation is CSS so hover / `paused` can actually stop the track
 * (`animation-play-state`). Framer Motion tweens ignore that property.
 */
export interface MarqueeProps {
  children: ReactNode;
  /** Full loop duration in seconds. Higher = slower. Default 32. */
  duration?: number;
  /** Reverse the scroll direction. */
  reverse?: boolean;
  /** Force-pause, e.g. while a review popup is open. */
  paused?: boolean;
  className?: string;
}

export function Marquee({
  children,
  duration = 32,
  reverse = false,
  paused = false,
  className,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const playState = reduce || paused ? "paused" : "running";

  return (
    <div
      className={`group/marquee relative flex w-full overflow-hidden ${className ?? ""}`}
    >
      <div
        className="flex w-max shrink-0 items-center gap-12 pr-12 group-hover/marquee:[animation-play-state:paused]"
        style={{
          animationName: reverse ? "marquee-rtl" : "marquee-ltr",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: playState,
        }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
