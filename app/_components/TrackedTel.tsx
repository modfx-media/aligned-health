"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

export function TrackedTel({
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("click_to_call", { location: "site" });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
