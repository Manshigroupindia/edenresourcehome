export interface SiteAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface SiteSocialLinks {
  facebook: string;
  instagram: string;
  youtube: string;
  twitter: string;
}

export interface SiteSEO {
  title: string;
  description: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  logoUrl: string;
  phones: string[];
  emails: string[];
  address: SiteAddress;
  locationText: string;
  establishedYear: number;
  socialLinks: SiteSocialLinks;
  seo: SiteSEO;
  updatedAt?: unknown;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "Eden Resource Home",
  tagline: "Care, Education & A Brighter Future",
  logoUrl: "",
  phones: [
    "+91 89748 91082"
  ],
  emails: [
    "support@edenresourcehome.org.in"
  ],
  address: {
    line1: "Tallui Junction",
    line2: "",
    city: "Ukhrul",
    state: "Manipur",
    country: "India",
    postalCode: ""
  },
  locationText: "Tallui Junction, Ukhrul District, Manipur, India",
  establishedYear: 2001,
  socialLinks: {
    facebook: "",
    instagram: "",
    youtube: "",
    twitter: ""
  },
  seo: {
    title: "Eden Resource Home | Child Care & Education in Manipur",
    description: "Eden Resource Home is a child welfare and residential care organization based in Ukhrul, Manipur."
  }
};
