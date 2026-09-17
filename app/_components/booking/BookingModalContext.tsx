"use client";

import {
 createContext,
 useCallback,
 useContext,
 useMemo,
 useState,
 type ReactNode,
} from "react";
import { trackEvent } from "@/lib/analytics";

interface BookingModalContextValue {
 isOpen: boolean;
 openBookingModal: () => void;
 closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextValue | null>(
 null
);

/** Site-wide provider, wraps the app once in the root layout. */
export function BookingModalProvider({ children }: { children: ReactNode }) {
 const [isOpen, setIsOpen] = useState(false);

 const openBookingModal = useCallback(() => {
 setIsOpen(true);
 trackEvent("generate_lead", { method: "booking_modal" });
 }, []);
 const closeBookingModal = useCallback(() => setIsOpen(false), []);

 const value = useMemo(
 () => ({ isOpen, openBookingModal, closeBookingModal }),
 [isOpen, openBookingModal, closeBookingModal]
 );

 return (
 <BookingModalContext.Provider value={value}>
 {children}
 </BookingModalContext.Provider>
 );
}

export function useBookingModal() {
 const ctx = useContext(BookingModalContext);
 if (!ctx) {
 throw new Error(
 "useBookingModal must be used within a BookingModalProvider"
 );
 }
 return ctx;
}
