/**
 * Site-wide facts, navigation and footer content.
 *
 * Company facts not supplied in the brief are written as explicit
 * [PLACEHOLDER: ...] strings so they are never mistaken for real copy.
 */

export type NavItem = {
  label: string;
  href: string;
};

export const site = {
  name: "Daxtera",
  wordmark: "Daxtera",
  tagline: "Ground truth for physical AI.",
  description:
    "Daxtera supplies verified real-world data, calibrated simulation and independent testing for physical AI, built niche by niche from the work of real experts.",
  /** [PLACEHOLDER] production URL. Set NEXT_PUBLIC_SITE_URL at deploy time. */
  url: "[PLACEHOLDER: production URL]",
  contact: {
    email: "[PLACEHOLDER: contact email]",
    location: "[PLACEHOLDER: office location]",
    links: "[PLACEHOLDER: social and platform links]",
  },
  legal: {
    privacy: "[PLACEHOLDER: privacy policy URL]",
    terms: "[PLACEHOLDER: terms of service URL]",
  },
} as const;

/** Exactly four pages plus the Contact button. */
export const nav: NavItem[] = [
  { label: "Our services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Our vision", href: "/vision" },
  { label: "About us", href: "/about" },
];

export const serviceLinks = [
  {
    label: "Real-World Physical Data",
    href: "/services/real-world-data",
    description: "Verified, model-ready datasets of real expert work.",
  },
  {
    label: "Calibrated Simulator",
    href: "/services/calibrated-simulator",
    description: "Niche environments tuned to real measurements.",
  },
  {
    label: "Testing and Comparison",
    href: "/services/testing-and-comparison",
    description: "Benchmarks that measure against the real world.",
  },
] as const;

export const buyerCategories = [
  "Robot foundation model labs",
  "Humanoid makers",
  "Industrial robot and automation vendors",
  "Systems integrators",
  "Vertical robotics startups",
  "End-user enterprises",
  "Platform and chip companies",
  "Safety and insurance bodies",
  "Research programs",
  "Channel partners",
] as const;

export const footer = {
  note: "Verified real-world data, calibrated simulation and independent testing, built niche by niche from the work of real experts.",
  companyLinks: [
    { label: "About us", href: "/about" },
    { label: "Our vision", href: "/vision" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
  ],
} as const;
