"use client";

import { useCallback, useState, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Email link with a robust fallback.
 *
 * On click:
 *  - The default `mailto:` behavior still fires for users who have a mail
 *    client configured (native or web).
 *  - The address is ALSO copied to the clipboard, so users on devices
 *    without a default mail handler (increasingly common on Chromebooks,
 *    kiosks, and unfamiliar phones) still get a usable email address.
 *  - A brief "Copied" indicator appears next to the link for feedback.
 */
interface EmailLinkProps {
 /** The plain email address (no `mailto:` prefix). */
 email: string;
 /** Anchor classes, keep whatever the surrounding design needs. */
 className?: string;
 /** Optional custom label; defaults to the email address itself. */
 children?: ReactNode;
 /** Tailwind classes for the "Copied" indicator (color per context). */
 copiedClassName?: string;
}

export function EmailLink({
 email,
 className,
 children,
 copiedClassName = "text-tan",
}: EmailLinkProps) {
 const [copied, setCopied] = useState(false);

 const handleClick = useCallback(() => {
 trackEvent("email_click", { location: "site" });
 if (typeof navigator === "undefined" || !navigator.clipboard) return;
 navigator.clipboard
 .writeText(email)
 .then(() => {
 setCopied(true);
 window.setTimeout(() => setCopied(false), 2000);
 })
 .catch(() => {
 /* ignore, mailto: still fires */
 });
 }, [email]);

 return (
 <>
 <a
 href={`mailto:${email}`}
 onClick={handleClick}
 className={className}
 title="Click to open in your email app. The address is also copied to your clipboard."
 >
 {children ?? email}
 </a>
 {copied ? (
 <span
 aria-live="polite"
 className={`ml-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] ${copiedClassName}`}
 >
 Copied
 </span>
 ) : null}
 </>
 );
}
