export interface FounderSettings {
  name: string;
  designation: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  cloudinaryPublicId?: string;
  quote?: string;
  isActive: boolean;
  updatedAt?: unknown;
}

export const DEFAULT_FOUNDER_SETTINGS: FounderSettings = {
  name: "Mr. R.M. Sangreingam & Mrs. R.M. Tanmila",
  designation: "Founders & Lifetime Trustees",
  shortDescription: "Guiding the home with love, humility, and steadfast vision since 2001",
  fullDescription: "In 2001, moved by the silent struggles of orphaned and underprivileged children in the hill districts of Manipur, Mr. R.M. Sangreingam and Mrs. R.M. Tanmila opened their family doors. Over two decades of selfless dedication transformed this mountain haven into a recognized sanctuary.",
  imageUrl: "/images/36-founders-mr-sangreingam-and-mrs-tanmila-.jpg",
  cloudinaryPublicId: "",
  quote: "To see a child smile with renewed self-respect and step boldly into the future is the highest reward of our collective service.",
  isActive: true,
};
