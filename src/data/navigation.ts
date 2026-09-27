export interface NavItem {
  label: string;
  path: string;
  isCta?: boolean;
}

export const navigationItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Work", path: "/our-work" },
  { label: "Gallery", path: "/gallery" },
  { label: "Awards & Recognition", path: "/awards" },
  { label: "Donate", path: "/donate", isCta: true },
  { label: "Contact", path: "/contact" }
];

export const footerQuickLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Our Work & Programs", path: "/our-work" },
  { label: "Children & Campus Gallery", path: "/gallery" },
  { label: "Awards & Recognition", path: "/awards" },
  { label: "Support & Donation", path: "/donate" },
  { label: "Contact & Visit Us", path: "/contact" }
];

export const footerLegalLinks = [
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms / Disclaimer", path: "/terms" }
];
