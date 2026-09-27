export interface AwardItem {
  id: string;
  year: string;
  badge: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: string;
  image: string;
  alt: string;
  badgeIcon: string;
}

export const awardsData: AwardItem[] = [
  {
    id: "gazette-2009",
    year: "2009",
    badge: "State Record",
    badgeIcon: "gavel",
    title: "Government of Manipur Gazette Notification",
    shortDescription: "Official gazette notification in the context of child care and protection institutions under the Juvenile Justice framework, marking formal institutional recognition.",
    fullDescription: "Recorded in the Government of Manipur Gazette under the Juvenile Justice (Care and Protection of Children) Act provisions, designating Eden Resource Home within the official child protection architecture of Manipur state, underscoring compliance with state child welfare parameters.",
    type: "Gazette Notification",
    image: "/images/11-photographic-scan-of-an-authentic-legal-.jpg",
    alt: "Photographic scan of an authentic legal government gazette notification document from Manipur regarding institutional child welfare provisions"
  },
  {
    id: "national-award-2010",
    year: "2010",
    badge: "National Honor",
    badgeIcon: "military_tech",
    title: "National Award Recognition Archive",
    shortDescription: "Newspaper reports and institutional coverage referencing national level recognition for dedicated humanitarian service, youth shelter, and rural education in Ukhrul.",
    fullDescription: "Documented news reporting covering commemorative recognition accorded to Eden Resource Home leadership for exceptional commitment to disadvantaged children in the hill regions of Manipur.",
    type: "National Recognition",
    image: "/images/12-high-quality-archival-newspaper-clipping.jpg",
    alt: "High quality archival newspaper clipping from a regional and national daily reporting on dedicated child care work in Ukhrul, Manipur"
  },
  {
    id: "distinction-2011",
    year: "2011",
    badge: "Distinction Order",
    badgeIcon: "workspace_premium",
    title: "Distinction Certification Coverage",
    shortDescription: "Historical news reporting and commemorative distinction for child welfare leadership, acknowledging residential educational support standards.",
    fullDescription: "Commemorative distinction awarded in acknowledgement of sustained excellence in institutional caregiving, nurturing vulnerable minors, and ensuring regular academic enrollment across Ukhrul district.",
    type: "Certificate of Distinction",
    image: "/images/13-scan-of-an-official-certificate-of-disti.jpg",
    alt: "Scan of an official Certificate of Distinction for exemplary social service and child welfare with classical filigree borders"
  },
  {
    id: "press-folio-continuous",
    year: "Continuous",
    badge: "Press Folio",
    badgeIcon: "newspaper",
    title: "Local Press & Community Citations",
    shortDescription: "Multi-photo clippings archive showcasing verified press mentions, tribal community council honors, and regional civic partnerships in Ukhrul.",
    fullDescription: "A curated compilation of press clippings from regional Manipur dailies and local community council letters recognizing Eden Resource Home for community safety, cultural integrity, and child education support since 2001.",
    type: "Press & Community Citations",
    image: "/images/14-a-curated-collage-of-authentic-local-new.jpg",
    alt: "Curated collage of authentic local newspaper clippings and community honor citations from Manipur region"
  }
];

export const archivalMilestones = [
  {
    step: "01",
    year: "2001",
    title: "Grassroots Founding",
    description: "Established by Mr. R.M. Sangreingam and Mrs. R.M. Tanmila in Tallui Junction to shelter children orphaned or displaced by regional hardship in Manipur."
  },
  {
    step: "02",
    year: "2009",
    title: "Statutory Gazette Notification",
    description: "Recorded in the Government of Manipur Gazette under the Juvenile Justice (Care and Protection of Children) statutory purview as an authorized care institution."
  },
  {
    step: "03",
    year: "2010",
    title: "National Commendation",
    description: "Received national acknowledgment in prominent media coverage for dedicated grassroots child welfare and community education."
  },
  {
    step: "04",
    year: "2011",
    title: "Distinction Certification",
    description: "Commended with Distinction certification for upholding institutional safety, health regimens, and consistent educational performance."
  }
];
