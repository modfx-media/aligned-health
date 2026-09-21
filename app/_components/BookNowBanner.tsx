"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { CLINIC, NEW_PATIENT_CTA_LABEL } from "@/lib/site";
import { BookNowLink } from "@/app/_components/BookNowLink";

/**
 * Persistent bottom "Book Now" bar for the homepage.
 *
 * Behavior:
 *   - Hidden at the very top of the page (first ~500px scroll).
 *   - Slides up from the bottom once the user starts scrolling.
 *   - Hides again when the footer enters the viewport so it doesn't
 *     stack visually with the footer's own booking CTA.
 *   - Respects `prefers-reduced-motion` (no slide animation, just fade).
 *   - Dismissible for the current tab via the close button.
 */

const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");
const SHOW_AFTER_PX = 480;
// sessionStorage key used to remember a user's dismissal for this tab.
const DISMISS_KEY = "aligned-book-banner-dismissed";

export function BookNowBanner() {
  const reduce = useReducedMotion();
  const [scrolledPast, setScrolledPast] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Restore per-session dismissal.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      // Safari private mode etc. — non-fatal, just leave undismissed.
    }
  }, []);

  // Scroll listener with rAF throttling.
  useEffect(() => {
    let raf = 0;
    const handle = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setScrolledPast(window.scrollY > SHOW_AFTER_PX);
      });
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => {
      window.removeEventListener("scroll", handle);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hide the banner while the footer is on screen so it doesn't overlap it.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPast && !nearFooter && !dismissed;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          key="book-banner"
          role="complementary"
          aria-label="Book an appointment"
          initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-tan/40 bg-espresso/95 text-linen shadow-[0_-12px_40px_-10px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="container-shell flex flex-col items-stretch gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-3.5">
            {/* Left: message + phone */}
            <div className="flex min-w-0 items-center gap-3">
              <span
                aria-hidden="true"
                className="relative inline-flex h-2 w-2 shrink-0"
              >
                <motion.span
                  animate={
                    reduce
                      ? undefined
                      : { scale: [1, 2.5, 1], opacity: [0.7, 0, 0.7] }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 rounded-full bg-tan"
                />
                <span className="relative h-2 w-2 rounded-full bg-tan" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-linen sm:text-base">
                  Schedule now.
                </p>
                <p className="hidden text-[0.7rem] uppercase tracking-[0.2em] text-linen/70 sm:block">
                  Most PPO plans accepted ·{" "}
                  <a
                    href={`tel:${PHONE_TEL}`}
                    className="underline decoration-tan underline-offset-4 hover:text-linen"
                  >
                    {CLINIC.phoneDisplay}
                  </a>
                </p>
              </div>
            </div>

            {/* Right: CTAs */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={`tel:${PHONE_TEL}`}
                className="btn-outline-invert btn-sm hidden items-center gap-2 md:inline-flex"
                aria-label={`Call the office at ${CLINIC.phoneDisplay}`}
              >
                <PhoneIcon />
                <span>{CLINIC.phoneDisplay}</span>
              </a>
              <BookNowLink className="btn-cta-onDark inline-flex flex-1 items-center justify-center gap-2 px-6 py-3.5 sm:flex-initial">
                {NEW_PATIENT_CTA_LABEL}
              </BookNowLink>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss book banner"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-linen/60 transition-colors hover:bg-linen/10 hover:text-linen"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6l-6 6-6 6" />
    </svg>
  );
}
