import { HOME_FAQ_LIST } from "@/app/home/_sections/HomeFaq";
import { CLINIC } from "@/lib/site";
import { PAGE_TEMPLATE_PATHS } from "@/cms/fields";

export type StaticPageExport = {
  template: keyof typeof PAGE_TEMPLATE_PATHS | string;
  title: string;
  description: string;
  heading?: string;
  lead?: string;
  ogImage?: string;
  ogImageAlt?: string;
  faqs?: Array<{ q: string; a: string }>;
};

export const STATIC_PAGES: StaticPageExport[] = [
  {
    template: "home",
    title: "Chiropractor in Laguna Hills, CA | Aligned Health",
    description:
      "See a Laguna Hills chiropractor for back pain, sports injuries, and spinal decompression. Dr. Dustin Hack and Dr. Tara Hadden. Most PPO plans accepted.",
    heading: "Chiropractor in Laguna Hills, CA",
    ogImage: "/images/contact-us/hero-v2.jpg",
    ogImageAlt: "Aligned Health chiropractic office in Laguna Hills, CA",
    faqs: HOME_FAQ_LIST,
  },
  {
    template: "about",
    title: "About Aligned Health · Chiropractors in Laguna Hills, CA",
    description:
      "Meet Dr. Dustin Hack and Dr. Tara Hadden, the Laguna Hills chiropractors who still treat you one-on-one — not as a number on a 10-minute rotation.",
    heading: "About Aligned Health",
    ogImage: "/images/about/about-hero-office.jpg",
    ogImageAlt: "Aligned Health interior office in Laguna Hills",
  },
  {
    template: "team",
    title: "Our Team · Dr. Dustin Hack & Dr. Tara Hadden",
    description:
      "Meet the Laguna Hills chiropractors behind Aligned Health. Diversified adjusting, sports recovery, and honest answers when chiropractic is not the right next step.",
    heading: "Our Team",
    ogImage: "/images/contact-us/hero-v2.jpg",
    ogImageAlt: "Aligned Health chiropractic office in Laguna Hills, CA",
  },
  {
    template: "servicesIndex",
    title: "Chiropractic Services in Laguna Hills · Aligned Health",
    description:
      "Fourteen on-site services in one Laguna Hills office: adjustments, spinal decompression, percussion, red light, and more. One doctor, one visit.",
    heading: "Services",
    ogImage: "/images/services/chiropractic-adjustments-banner.jpg",
    ogImageAlt: "Chiropractic adjustment being performed at Aligned Health",
  },
  {
    template: "areasIndex",
    title: "Areas We Serve · Chiropractor for Orange County · Aligned Health",
    description:
      "One Laguna Hills office, patients from 30 Orange County cities. Drive times, local FAQs, and every service we offer — from Irvine to San Clemente.",
    heading: "Areas We Serve",
    ogImage: "/images/about/about-hero-office.jpg",
    ogImageAlt: "Aligned Health interior office in Laguna Hills",
  },
  {
    template: "blogIndex",
    title: "The Aligned Health Journal · Chiropractic Insights in Laguna Hills",
    description:
      "Plain-spoken articles on chiropractic care, recovery modalities, and treatment plans from the Aligned Health team in Laguna Hills, CA.",
    heading: "The Aligned Health Journal",
  },
  {
    template: "appointments",
    title: "Existing Patient Appointments · Aligned Health Laguna Hills",
    description:
      "Already a patient? Book your next visit online. New patients start with a 45-minute exam in Laguna Hills — we verify PPO coverage before you come in.",
    heading: "Appointments",
    ogImage: "/images/about/about-hero-office.jpg",
    ogImageAlt: "Aligned Health interior office in Laguna Hills",
  },
  {
    template: "contact",
    title: "Contact Aligned Health · Laguna Hills Chiropractic Office",
    description:
      "Call (949) 557-7208, email, or send a note. We are at 26071 Merit Circle in Laguna Hills and usually reply within one business day.",
    heading: "Contact Us",
    ogImage: "/images/contact-us/hero-v2.jpg",
    ogImageAlt: "Aligned Health chiropractic office in Laguna Hills, CA",
  },
  {
    template: "privacy",
    title: "Privacy Policy · Aligned Health",
    description:
      "How Aligned Health collects, uses, and protects information you share through this website, our contact form, and our online booking portal.",
    heading: "Privacy Policy",
    ogImage: "/images/contact-us/hero-v2.jpg",
    ogImageAlt: "Aligned Health chiropractic office in Laguna Hills, CA",
  },
  {
    template: "sitemap",
    title: "Sitemap · Aligned Health",
    description:
      "Browse every page on the Aligned Health website, including our chiropractic services, blog articles, and all Orange County areas we serve.",
    heading: "Sitemap",
    ogImage: "/images/contact-us/hero-v2.jpg",
    ogImageAlt: "Aligned Health chiropractic office in Laguna Hills, CA",
  },
];

export const SITE_SETTINGS_EXPORT = {
  name: CLINIC.name,
  legalName: CLINIC.legalName,
  description: CLINIC.description,
  phone: CLINIC.phone,
  phoneDisplay: CLINIC.phoneDisplay,
  email: CLINIC.email,
  street: CLINIC.address.street,
  city: CLINIC.address.city,
  region: CLINIC.address.region,
  postalCode: CLINIC.address.postalCode,
  country: CLINIC.address.country,
};

export const HEADER_EXPORT = {
  tagline: "Laguna Hills chiropractic",
  phone: CLINIC.phoneDisplay,
  nav: [
    { label: "About", href: "/about" },
    { label: "Our Team", href: "/our-team" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact Us", href: "/contact-us" },
  ],
  ctaLabel: "New Patients Schedule Here",
  existingCtaLabel: "Existing Patients Schedule Here",
};

export const FOOTER_EXPORT = {
  blurb:
    "Dr. Dustin Hack and Dr. Tara Hadden treat back pain, sports injuries, and post-surgery stiffness in Laguna Hills. One-on-one visits. Most PPO plans accepted.",
  explore: [
    { label: "About", href: "/about" },
    { label: "Our Team", href: "/our-team" },
    { label: "Services", href: "/services" },
    { label: "Areas We Serve", href: "/areas-we-serve" },
    { label: "Blog", href: "/blog" },
    { label: "Appointments", href: "/appointments" },
    { label: "Contact Us", href: "/contact-us" },
  ],
};
