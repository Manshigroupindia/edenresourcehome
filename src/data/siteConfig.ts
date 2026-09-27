export interface SiteConfig {
  siteName: string;
  tagline: string;
  shortIdentity: string;
  phone: string;
  phoneRaw: string;
  email: string;
  location: string;
  fullAddress: string;
  pincode: string;
  establishedYear: number;
  yearsOfService: string;
  childrenSupported: string;
  schoolEnrollment: string;
  founders: {
    names: string;
    husband: string;
    wife: string;
    title: string;
    bio: string;
    image: string;
  };
  officeHours: {
    weekdays: string;
    sundays: string;
  };
  trustIndicators: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export const siteConfig: SiteConfig = {
  siteName: "Eden Resource Home",
  tagline: "Care • Education • A Brighter Future",
  shortIdentity: "A child welfare and residential care organization based in Ukhrul, Manipur.",
  phone: "+91 89748 91082",
  phoneRaw: "+918974891082",
  email: "support@edenresourcehome.org.in",
  location: "Tallui Junction, Ukhrul District, Manipur, India",
  fullAddress: "Tallui Junction, Ukhrul District, Manipur, 795142, India",
  pincode: "795142",
  establishedYear: 2001,
  yearsOfService: "24+",
  childrenSupported: "50+",
  schoolEnrollment: "100%",
  founders: {
    names: "Mr. R.M. Sangreingam & Mrs. R.M. Tanmila",
    husband: "Mr. R.M. Sangreingam",
    wife: "Mrs. R.M. Tanmila",
    title: "Founders & Lifetime Trustees",
    bio: "In 2001, moved by the silent struggles of orphaned and underprivileged children in the hill districts of Manipur, Mr. R.M. Sangreingam and Mrs. R.M. Tanmila opened their family doors. Over two decades of selfless dedication transformed this mountain haven into a recognized sanctuary.",
    image: "/images/03-warm-and-respectful-portrait-of-indian-n.jpg"
  },
  officeHours: {
    weekdays: "Monday – Saturday: 9:00 AM – 5:00 PM IST",
    sundays: "Sundays: Dedicated to children’s chapel, rest, and cultural enrichment"
  },
  trustIndicators: [
    {
      icon: "verified_user",
      title: "Govt. Recognized JJ Act",
      description: "Recognized under Juvenile Justice statutory purview"
    },
    {
      icon: "shield",
      title: "Safe 24/7 Haven",
      description: "Protected residential home in Ukhrul hills"
    },
    {
      icon: "school",
      title: "Holistic Schooling",
      description: "Formal education and academic tutoring"
    },
    {
      icon: "favorite",
      title: "Compassionate Care",
      description: "Nurturing family warmth and emotional security"
    }
  ]
};
