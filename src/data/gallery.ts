export interface GalleryItem {
  id: string;
  category: "Children & Education" | "Activities & Sports" | "Events & Festivals" | "Home & Campus" | "Community & Volunteers";
  categoryKey: "education" | "sports" | "events" | "campus" | "volunteers";
  subtitle: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const galleryCategories = [
  { key: "all", label: "All" },
  { key: "education", label: "Children & Education" },
  { key: "sports", label: "Activities & Sports" },
  { key: "events", label: "Events & Festivals" },
  { key: "campus", label: "Home & Campus" },
  { key: "volunteers", label: "Community & Volunteers" }
] as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    category: "Children & Education",
    categoryKey: "education",
    subtitle: "Morning Study Hour",
    title: "Empowering Young Minds Through Literacy",
    description: "Joyful children gathered in the bright classroom studying open notebooks with pencils under warm daylight.",
    image: "/images/21-joyful-children-of-eden-resource-home-ga.jpg",
    alt: "Joyful children of Eden Resource Home gathered together in an illuminated bright classroom in Manipur"
  },
  {
    id: "gal-2",
    category: "Activities & Sports",
    categoryKey: "sports",
    subtitle: "Hillside Playground",
    title: "Laughter & Camaraderie on the Hill Pitch",
    description: "Children playing traditional football on a lush green mountain field with mist rolling over the hills of Ukhrul.",
    image: "/images/22-energetic-children-playing-traditional-f.jpg",
    alt: "Energetic children playing traditional football on a lush green outdoor mountain field in Ukhrul Manipur"
  },
  {
    id: "gal-3",
    category: "Home & Campus",
    categoryKey: "campus",
    subtitle: "Tallui Junction Facility",
    title: "A Safe Haven Built for Lasting Security",
    description: "Scenic exterior architectural view of Eden Resource Home residential building nestled in pine trees with misty rolling hills.",
    image: "/images/23-exterior-scenic-architectural-view-of-ed.jpg",
    alt: "Exterior scenic architectural view of Eden Resource Home multi-story residential building nestled in pine trees"
  },
  {
    id: "gal-4",
    category: "Events & Festivals",
    categoryKey: "events",
    subtitle: "Cultural Day",
    title: "Celebrating Heritage & Tangkhul Tradition",
    description: "Traditional Manipuri Naga cultural festival celebration at Eden Resource Home with woven attire and authentic folk dance.",
    image: "/images/24-traditional-manipuri-naga-cultural-festi.jpg",
    alt: "Traditional Manipuri Naga cultural festival celebration at Eden Resource Home, children dressed in authentic attire"
  },
  {
    id: "gal-5",
    category: "Community & Volunteers",
    categoryKey: "volunteers",
    subtitle: "Guest Mentorship",
    title: "Hands-on Creative Arts with Visiting Friends",
    description: "Volunteer teachers collaborating with local caretakers and students over art craft materials and watercolor paintings.",
    image: "/images/25-volunteer-teachers-collaborating-with-lo.jpg",
    alt: "Volunteer teachers collaborating with local caretakers and students over art craft materials"
  },
  {
    id: "gal-6",
    category: "Children & Education",
    categoryKey: "education",
    subtitle: "Uniform & Pride",
    title: "The Morning Walk to Knowledge",
    description: "Focused children in neat school uniforms carrying backpacks walking together along a sunny mountain pathway.",
    image: "/images/26-focused-children-in-neat-school-uniforms.jpg",
    alt: "Focused children in neat school uniforms carrying backpacks walking together along a scenic mountain pathway"
  },
  {
    id: "gal-7",
    category: "Home & Campus",
    categoryKey: "campus",
    subtitle: "Communal Dining",
    title: "Nutritious Sustenance & Shared Blessings",
    description: "Children eating fresh wholesome meals together in the communal dining hall with warm family care.",
    image: "/images/27-children-eating-fresh-wholesome-meals-to.jpg",
    alt: "Children eating fresh wholesome meals together in the communal dining hall of Eden Resource Home"
  },
  {
    id: "gal-8",
    category: "Activities & Sports",
    categoryKey: "sports",
    subtitle: "Evening Sports",
    title: "Building Health, Agility & Confidence",
    description: "Young boys and girls engaged in volleyball practice at sunset with pine mountains in background.",
    image: "/images/28-young-boys-and-girls-engaged-in-volleyba.jpg",
    alt: "Young boys and girls engaged in volleyball practice at sunset with pine mountains silhouette in background"
  },
  {
    id: "gal-9",
    category: "Events & Festivals",
    categoryKey: "events",
    subtitle: "Annual Day",
    title: "Songs of Gratitude on Foundation Day",
    description: "Annual foundation day commemoration with children choir singing hymns in festive fellowship.",
    image: "/images/29-annual-foundation-day-commemoration-at-e.jpg",
    alt: "Annual foundation day commemoration at Eden Resource Home, children choir singing with choral hymn sheets"
  },
  {
    id: "gal-10",
    category: "Children & Education",
    categoryKey: "education",
    subtitle: "Digital Literacy",
    title: "Bridging the Technology Divide",
    description: "Elder students engaged in computer literacy training, learning typing and digital skills with instructors.",
    image: "/images/30-elder-students-at-eden-resource-home-eng.jpg",
    alt: "Elder students at Eden Resource Home engaged in computer literacy training, looking at monitor screens"
  },
  {
    id: "gal-11",
    category: "Community & Volunteers",
    categoryKey: "volunteers",
    subtitle: "Health & Wellness",
    title: "Periodic Pediatric Checkups & Care",
    description: "Medical camp and pediatric checkup event organized with visiting doctors and local nurses for wellness screening.",
    image: "/images/31-medical-camp-and-health-checkup-event-or.jpg",
    alt: "Medical camp and health checkup event organized at Eden Resource Home by visiting doctors and local nurses"
  },
  {
    id: "gal-12",
    category: "Home & Campus",
    categoryKey: "campus",
    subtitle: "Organic Homestead",
    title: "Cultivating Food & Environmental Stewardship",
    description: "Children tending an organic kitchen garden on campus, planting seedlings in rich soil and watering crops.",
    image: "/images/32-children-tending-an-organic-kitchen-gard.jpg",
    alt: "Children tending an organic kitchen garden on campus, planting seedlings in black rich soil"
  }
];
