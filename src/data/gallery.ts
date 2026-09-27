export interface GalleryItem {
  id: string;
  category: "Children & Education" | "Activities & Sports" | "Events & Festivals" | "Home & Campus" | "Community & Volunteers";
  categoryKey: "education" | "sports" | "events" | "campus" | "volunteers";
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
    image: "/images/21-joyful-children-of-eden-resource-home-ga.jpg",
    alt: "Joyful children of Eden Resource Home gathered together in an illuminated bright classroom in Manipur"
  },
  {
    id: "gal-2",
    category: "Activities & Sports",
    categoryKey: "sports",
    image: "/images/22-energetic-children-playing-traditional-f.jpg",
    alt: "Energetic children playing traditional football on a lush green outdoor mountain field in Ukhrul Manipur"
  },
  {
    id: "gal-3",
    category: "Home & Campus",
    categoryKey: "campus",
    image: "/images/23-exterior-scenic-architectural-view-of-ed.jpg",
    alt: "Exterior scenic architectural view of Eden Resource Home multi-story residential building nestled in pine trees"
  },
  {
    id: "gal-4",
    category: "Events & Festivals",
    categoryKey: "events",
    image: "/images/24-traditional-manipuri-naga-cultural-festi.jpg",
    alt: "Traditional Manipuri Naga cultural festival celebration at Eden Resource Home, children dressed in authentic attire"
  },
  {
    id: "gal-5",
    category: "Community & Volunteers",
    categoryKey: "volunteers",
    image: "/images/25-volunteer-teachers-collaborating-with-lo.jpg",
    alt: "Volunteer teachers collaborating with local caretakers and students over art craft materials"
  },
  {
    id: "gal-6",
    category: "Children & Education",
    categoryKey: "education",
    image: "/images/26-focused-children-in-neat-school-uniforms.jpg",
    alt: "Focused children in neat school uniforms carrying backpacks walking together along a scenic mountain pathway"
  },
  {
    id: "gal-7",
    category: "Home & Campus",
    categoryKey: "campus",
    image: "/images/27-children-eating-fresh-wholesome-meals-to.jpg",
    alt: "Children eating fresh wholesome meals together in the communal dining hall of Eden Resource Home"
  },
  {
    id: "gal-8",
    category: "Activities & Sports",
    categoryKey: "sports",
    image: "/images/28-young-boys-and-girls-engaged-in-volleyba.jpg",
    alt: "Young boys and girls engaged in volleyball practice at sunset with pine mountains silhouette in background"
  },
  {
    id: "gal-9",
    category: "Events & Festivals",
    categoryKey: "events",
    image: "/images/29-annual-foundation-day-commemoration-at-e.jpg",
    alt: "Annual foundation day commemoration at Eden Resource Home, children choir singing with choral hymn sheets"
  },
  {
    id: "gal-10",
    category: "Children & Education",
    categoryKey: "education",
    image: "/images/30-elder-students-at-eden-resource-home-eng.jpg",
    alt: "Elder students at Eden Resource Home engaged in computer literacy training, looking at monitor screens"
  },
  {
    id: "gal-11",
    category: "Community & Volunteers",
    categoryKey: "volunteers",
    image: "/images/31-medical-camp-and-health-checkup-event-or.jpg",
    alt: "Medical camp and health checkup event organized at Eden Resource Home by visiting doctors and local nurses"
  },
  {
    id: "gal-12",
    category: "Home & Campus",
    categoryKey: "campus",
    image: "/images/32-children-tending-an-organic-kitchen-gard.jpg",
    alt: "Children tending an organic kitchen garden on campus, planting seedlings in black rich soil"
  }
];
