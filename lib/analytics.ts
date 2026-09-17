"use client";

type Gtag = (command: string, eventName: string, params?: Record<string, string>) => void;

function gtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { gtag?: Gtag }).gtag;
}

/** Fire a GA4 event. No-ops when gtag is not loaded. */
export function trackEvent(
  eventName: string,
  params?: Record<string, string>,
): void {
  gtag()?.("event", eventName, params);
}
