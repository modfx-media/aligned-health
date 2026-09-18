"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
 useCallback,
 useEffect,
 useId,
 useRef,
 useState,
 type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { CLINIC, EXISTING_PATIENT_SCHEDULER_URL } from "@/lib/site";
import { SERVICE_NAV_ITEMS } from "@/lib/services";
import { BookNowLink } from "@/app/_components/BookNowLink";

/**
 * Site-wide navigation.
 *
 * Structure:
 * 1. Slim utility bar (desktop only), tagline + phone
 * 2. Main nav, logo, primary links, CTA pill
 * 3. Tan hairline at the bottom for visual separation from the hero
 *
 * "Services" is a dropdown parent that reveals every individual service
 * as a direct link. On desktop it opens on hover/focus with a mega-menu
 * panel; on mobile it's a collapsible accordion within the nav sheet.
 *
 * Sticky, dark espresso, off-white text. Below `lg`, links + CTA collapse
 * into an animated drop-down panel.
 */

interface NavItem {
 label: string;
 href: string;
 /** When true, the link has a child dropdown of individual services. */
 hasServicesDropdown?: boolean;
}

const NAV_ITEMS: readonly NavItem[] = [
 { label: "About", href: "/about" },
 { label: "Our Team", href: "/our-team" },
 { label: "Services", href: "/services", hasServicesDropdown: true },
 { label: "Blog", href: "/blog" },
 { label: "Contact Us", href: "/contact-us" },
];

const CTA = {
 label: "Book your New Patient Appointment",
};

/**
 * Returning patients get their own button beside the new-patient CTA rather
 * than a plain nav link, so both booking paths read as actions. It links
 * straight out to the Jane App scheduler rather than the /appointments page.
 */
const EXISTING_PATIENT_CTA = {
 label: "Existing Patient Appointments",
 href: EXISTING_PATIENT_SCHEDULER_URL,
};

const PHONE_TEL = CLINIC.phone.replace(/[^\d+]/g, "");

export function SiteHeader() {
 const pathname = usePathname();
 const [open, setOpen] = useState(false);
 const menuId = useId();

 const close = useCallback(() => setOpen(false), []);

 useEffect(() => {
 setOpen(false);
 }, [pathname]);

 useEffect(() => {
 if (!open) return;

 const onKey = (event: KeyboardEvent) => {
 if (event.key === "Escape") setOpen(false);
 };
 window.addEventListener("keydown", onKey);

 const previousOverflow = document.body.style.overflow;
 document.body.style.overflow = "hidden";

 return () => {
 window.removeEventListener("keydown", onKey);
 document.body.style.overflow = previousOverflow;
 };
 }, [open]);

 return (
 <header className="sticky top-0 z-50 bg-espresso text-linen shadow-[0_10px_30px_-20px_rgba(0,0,0,0.55)]">
 <div className="hidden border-b border-linen/10 md:block">
 <div className="container-shell flex items-center justify-between py-2 text-[0.65rem] uppercase tracking-[0.24em] text-linen/70">
 <span className="inline-flex items-center gap-2">
 <span
 aria-hidden="true"
 className="inline-block h-1.5 w-1.5 rounded-full bg-tan"
 />
 By appointment · Schedule now · Laguna Hills, CA
 </span>
 <a
 href={`tel:${PHONE_TEL}`}
 className="tracking-[0.24em] transition-colors hover:text-linen"
 >
 {CLINIC.phoneDisplay}
 </a>
 </div>
 </div>

 <div className="container-shell flex h-20 items-center justify-between md:h-24">
 <Wordmark onClick={close} />

 {/* Desktop nav */}
 {/* Two booking buttons plus five links need ~1050px, so the
 horizontal row only appears at `xl`; below that the sheet
 (which carries both buttons) takes over. */}
 <nav
 aria-label="Primary"
 className="hidden shrink-0 items-center gap-6 xl:flex"
 >
 {NAV_ITEMS.map((item) =>
 item.hasServicesDropdown ? (
 <ServicesDropdown
 key={item.href}
 item={item}
 active={isActive(pathname, item.href)}
 />
 ) : (
 <DesktopLink
 key={item.href}
 item={item}
 active={isActive(pathname, item.href)}
 />
 )
 )}
 </nav>

 {/* Both pills share `btn-sm` so their type and height match. The
 tan CTA carries a transparent border to offset the outline
 button's 1px border, otherwise the two sit 2px apart. */}
 <div className="hidden shrink-0 items-center gap-3 xl:flex">
 <a
 href={EXISTING_PATIENT_CTA.href}
 target="_blank"
 rel="noopener noreferrer"
 className="btn-outline-invert px-5 py-3 text-[0.8rem]"
 >
 {EXISTING_PATIENT_CTA.label}
 </a>
 <BookNowLink className="btn-cta-onDark border border-transparent px-5 py-3 text-[0.8rem]">
 {CTA.label}
 </BookNowLink>
 </div>

 <button
 type="button"
 className="xl:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-linen transition-colors hover:bg-linen/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
 aria-label={open ? "Close navigation menu" : "Open navigation menu"}
 aria-expanded={open}
 aria-controls={menuId}
 onClick={() => setOpen((prev) => !prev)}
 >
 <Hamburger open={open} />
 </button>
 </div>

 {/* Mobile panel */}
 <div
 id={menuId}
 className={`xl:hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
 open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
 }`}
 aria-hidden={!open}
 >
 <div className="min-h-0">
 <div className="container-shell max-h-[80vh] overflow-y-auto border-t border-linen/10 pb-8 pt-6">
 <nav aria-label="Primary mobile" className="flex flex-col">
 {NAV_ITEMS.map((item) =>
 item.hasServicesDropdown ? (
 <MobileServicesAccordion
 key={item.href}
 item={item}
 active={isActive(pathname, item.href)}
 onNavigate={close}
 tabIndex={open ? 0 : -1}
 />
 ) : (
 <MobileLink
 key={item.href}
 item={item}
 active={isActive(pathname, item.href)}
 onNavigate={close}
 tabIndex={open ? 0 : -1}
 />
 )
 )}
 <BookNowLink
 onNavigate={close}
 tabIndex={open ? 0 : -1}
 className="btn-cta-onDark btn-lg mt-6 w-full"
 >
 {CTA.label}
 </BookNowLink>
 <a
 href={EXISTING_PATIENT_CTA.href}
 target="_blank"
 rel="noopener noreferrer"
 onClick={close}
 tabIndex={open ? 0 : -1}
 className="btn-outline-invert btn-lg mt-3 w-full whitespace-normal text-center leading-snug"
 >
 {EXISTING_PATIENT_CTA.label}
 </a>
 </nav>
 </div>
 </div>
 </div>

 <div
 aria-hidden="true"
 className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-tan/60 to-transparent"
 />
 </header>
 );
}

/* ---------------------------------------------------------------------- */

function isActive(pathname: string | null, href: string): boolean {
 if (!pathname) return false;
 return pathname === href || pathname.startsWith(`${href}/`);
}

function Wordmark({ onClick }: { onClick: () => void }) {
 return (
 <Link
 href="/"
 onClick={onClick}
 aria-label="Aligned Health, home"
 className="group inline-flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-espresso"
 >
 <Image
 src="/logos/aligned-health-light.png"
 alt="Aligned Health"
 width={1129}
 height={355}
 priority
 className="h-10 w-auto md:h-11"
 />
 </Link>
 );
}

function DesktopLink({ item, active }: { item: NavItem; active: boolean }) {
 // Only labels with an explicit line break stack; every other label
 // stays single-line so it can't be squeezed into an awkward wrap.
 const lines = item.label.split("\n");
 const stacked = lines.length > 1;

 return (
 <Link
 href={item.href}
 aria-current={active ? "page" : undefined}
 className={`group relative inline-flex shrink-0 items-center py-2 text-[0.82rem] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-espresso rounded-sm ${
 stacked ? "text-center leading-tight" : "whitespace-nowrap"
 } ${active ? "text-tan" : "text-linen hover:text-tan"}`}
 >
 {stacked ? (
 <span className="flex flex-col">
 {lines.map((line) => (
 <span key={line}>{line}</span>
 ))}
 </span>
 ) : (
 item.label
 )}
 <span
 aria-hidden="true"
 className={`pointer-events-none absolute left-0 right-0 -bottom-[2px] h-px origin-left bg-tan transition-transform duration-300 ease-out ${
 active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
 }`}
 />
 </Link>
 );
}

/**
 * Desktop "Services" dropdown. Opens on pointer hover with a short close
 * delay to avoid flicker, and on keyboard focus. Panel is a two-column
 * grid of every service, each linking to its /services/<slug> page, plus
 * a "View services page" footer link.
 */
function ServicesDropdown({
 item,
 active,
}: {
 item: NavItem;
 active: boolean;
}) {
 const [open, setOpen] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);
 const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
 const panelId = useId();

 const scheduleClose = useCallback(() => {
 if (closeTimer.current) clearTimeout(closeTimer.current);
 closeTimer.current = setTimeout(() => setOpen(false), 120);
 }, []);

 const cancelClose = useCallback(() => {
 if (closeTimer.current) {
 clearTimeout(closeTimer.current);
 closeTimer.current = null;
 }
 }, []);

 const handleOpen = useCallback(() => {
 cancelClose();
 setOpen(true);
 }, [cancelClose]);

 useEffect(() => {
 if (!open) return;

 const onKey = (event: KeyboardEvent) => {
 if (event.key === "Escape") setOpen(false);
 };
 const onDocClick = (event: MouseEvent) => {
 if (
 containerRef.current &&
 !containerRef.current.contains(event.target as Node)
 ) {
 setOpen(false);
 }
 };
 document.addEventListener("keydown", onKey);
 document.addEventListener("mousedown", onDocClick);
 return () => {
 document.removeEventListener("keydown", onKey);
 document.removeEventListener("mousedown", onDocClick);
 };
 }, [open]);

 const onTriggerKeyDown = (event: ReactKeyboardEvent<HTMLAnchorElement>) => {
 if (event.key === "ArrowDown") {
 event.preventDefault();
 handleOpen();
 setTimeout(() => {
 const first = containerRef.current?.querySelector<HTMLElement>(
 "[data-service-link]"
 );
 first?.focus();
 }, 0);
 }
 };

 return (
 <div
 ref={containerRef}
 className="relative"
 onMouseEnter={handleOpen}
 onMouseLeave={scheduleClose}
 onFocus={handleOpen}
 onBlur={(event) => {
 if (
 !containerRef.current?.contains(event.relatedTarget as Node | null)
 ) {
 scheduleClose();
 }
 }}
 >
 <Link
 href={item.href}
 aria-current={active ? "page" : undefined}
 aria-expanded={open}
 aria-haspopup="menu"
 aria-controls={panelId}
 onKeyDown={onTriggerKeyDown}
 className={`group relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap py-2 text-[0.82rem] font-medium uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tan focus-visible:ring-offset-2 focus-visible:ring-offset-espresso rounded-sm ${
 active || open ? "text-tan" : "text-linen hover:text-tan"
 }`}
 >
 {item.label}
 <ChevronDown open={open} />
 <span
 aria-hidden="true"
 className={`pointer-events-none absolute left-0 right-0 -bottom-[2px] h-px origin-left bg-tan transition-transform duration-300 ease-out ${
 active || open ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
 }`}
 />
 </Link>

 {/* Invisible bridge so pointer can travel from trigger to panel. */}
 {open ? (
 <div
 aria-hidden="true"
 className="absolute left-0 right-0 top-full h-3"
 />
 ) : null}

 <div
 id={panelId}
 role="menu"
 aria-label="Services"
 className={`absolute left-1/2 top-full z-50 mt-3 w-[min(720px,90vw)] -translate-x-1/2 origin-top transition-[opacity,transform] duration-200 ease-out ${
 open
 ? "pointer-events-auto opacity-100 scale-100"
 : "pointer-events-none opacity-0 scale-[0.98]"
 }`}
 >
 <div className="overflow-hidden rounded-2xl border border-tan/20 bg-linen text-espresso shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)]">
 <div className="flex items-center justify-between border-b border-tan/20 bg-cream px-6 py-3">
 <p className="text-[0.62rem] uppercase tracking-[0.24em] text-mocha">
 All services
 </p>
 <Link
 href={item.href}
 role="menuitem"
 className="text-[0.62rem] uppercase tracking-[0.22em] text-mocha underline decoration-tan underline-offset-4 hover:text-espresso"
 >
 View services page →
 </Link>
 </div>

 <ul className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 md:grid-cols-2">
 {SERVICE_NAV_ITEMS.map((service) => (
 <li key={service.slug}>
 <Link
 href={`/services/${service.slug}`}
 role="menuitem"
 data-service-link
 className="group/link flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-tan/10 focus-visible:bg-tan/10 focus-visible:outline-none"
 >
 <span
 aria-hidden="true"
 className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-tan"
 />
 <span className="min-w-0 flex-1">
 <span className="block font-serif text-sm leading-snug text-espresso">
 {service.label}
 </span>
 {service.short ? (
 <span className="mt-0.5 block text-[0.7rem] leading-relaxed text-mocha/70">
 {service.short}
 </span>
 ) : null}
 </span>
 <span
 aria-hidden="true"
 className="mt-1 text-tan opacity-0 transition-opacity group-hover/link:opacity-100 group-focus-visible/link:opacity-100"
 >
 →
 </span>
 </Link>
 </li>
 ))}
 </ul>

 {/* Book Appointment footer strip — always one click away from
 every service in the dropdown. */}
 <div className="flex flex-col items-stretch gap-3 border-t border-tan/20 bg-cream px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
 <p className="text-[0.7rem] uppercase tracking-[0.22em] text-mocha">
 Schedule now.
 </p>
 <BookNowLink
 role="menuitem"
 className="btn-primary btn-sm inline-flex items-center justify-center gap-2"
 >
 Book your New Patient Appointment
 <span aria-hidden="true">→</span>
 </BookNowLink>
 </div>
 </div>
 </div>
 </div>
 );
}

function ChevronDown({ open }: { open: boolean }) {
 return (
 <svg
 viewBox="0 0 12 12"
 fill="none"
 stroke="currentColor"
 strokeWidth="1.6"
 strokeLinecap="round"
 strokeLinejoin="round"
 className={`h-2.5 w-2.5 transition-transform duration-300 ease-out ${
 open ? "rotate-180" : "rotate-0"
 }`}
 aria-hidden="true"
 >
 <path d="M3 5l3 3 3-3" />
 </svg>
 );
}

function MobileLink({
 item,
 active,
 onNavigate,
 tabIndex,
}: {
 item: NavItem;
 active: boolean;
 onNavigate: () => void;
 tabIndex: number;
}) {
 return (
 <Link
 href={item.href}
 onClick={onNavigate}
 tabIndex={tabIndex}
 aria-current={active ? "page" : undefined}
 className={`flex items-center justify-between border-b border-linen/10 py-4 text-base uppercase tracking-[0.14em] transition-colors ${
 active ? "text-tan" : "text-linen hover:text-tan"
 }`}
 >
 <span>{item.label}</span>
 <span aria-hidden="true" className="text-tan/70">
 →
 </span>
 </Link>
 );
}

/**
 * Mobile Services accordion. The row is split, the label opens
 * /services, the chevron toggles the submenu of individual services.
 */
function MobileServicesAccordion({
 item,
 active,
 onNavigate,
 tabIndex,
}: {
 item: NavItem;
 active: boolean;
 onNavigate: () => void;
 tabIndex: number;
}) {
 const [expanded, setExpanded] = useState(false);
 const panelId = useId();

 return (
 <div className="border-b border-linen/10">
 <div className="flex items-stretch">
 <Link
 href={item.href}
 onClick={onNavigate}
 tabIndex={tabIndex}
 aria-current={active ? "page" : undefined}
 className={`flex-1 py-4 text-base uppercase tracking-[0.14em] transition-colors ${
 active ? "text-tan" : "text-linen hover:text-tan"
 }`}
 >
 {item.label}
 </Link>
 <button
 type="button"
 onClick={() => setExpanded((prev) => !prev)}
 aria-expanded={expanded}
 aria-controls={panelId}
 aria-label={
 expanded ? "Collapse services list" : "Expand services list"
 }
 tabIndex={tabIndex}
 className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-linen transition-colors hover:bg-linen/10"
 >
 <ChevronDown open={expanded} />
 </button>
 </div>

 <div
 id={panelId}
 className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out ${
 expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
 }`}
 aria-hidden={!expanded}
 >
 <div className="min-h-0">
 <ul className="border-l border-tan/30 pb-2 pl-4">
 {SERVICE_NAV_ITEMS.map((service) => (
 <li key={service.slug}>
 <Link
 href={`/services/${service.slug}`}
 onClick={onNavigate}
 tabIndex={expanded && tabIndex >= 0 ? 0 : -1}
 className="flex items-center justify-between py-2.5 text-sm text-linen/80 transition-colors hover:text-tan"
 >
 <span className="font-serif">{service.label}</span>
 <span aria-hidden="true" className="text-tan/60">
 →
 </span>
 </Link>
 </li>
 ))}
 </ul>
 {/* Book Appointment CTA — always reachable inside the mobile
 Services accordion. */}
 <div className="pb-4 pl-4">
 <BookNowLink
 onNavigate={onNavigate}
 tabIndex={expanded && tabIndex >= 0 ? 0 : -1}
 className="btn-cta-onDark btn-sm mt-2 inline-flex items-center gap-2"
 >
 Book your New Patient Appointment
 <span aria-hidden="true">→</span>
 </BookNowLink>
 </div>
 </div>
 </div>
 </div>
 );
}

function Hamburger({ open }: { open: boolean }) {
 return (
 <span aria-hidden="true" className="relative block h-4 w-6">
 <span
 className={`absolute left-0 h-px w-full bg-linen transition-transform duration-300 ease-out ${
 open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
 }`}
 />
 <span
 className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-linen transition-opacity duration-200 ease-out ${
 open ? "opacity-0" : "opacity-100"
 }`}
 />
 <span
 className={`absolute left-0 h-px w-full bg-linen transition-transform duration-300 ease-out ${
 open ? "bottom-1/2 translate-y-1/2 -rotate-45" : "bottom-0"
 }`}
 />
 </span>
 );
}

export default SiteHeader;
