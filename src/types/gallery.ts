export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cloudinaryPublicId: string;
  category: string;
  altText: string;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export const GALLERY_CATEGORIES = [
  'Children & Education',
  'Activities',
  'Events',
  'Community',
  'Home & Facilities',
  'Awards & Recognition',
  'Other'
] as const;

export type GalleryCategory = typeof GALLERY_CATEGORIES[number];
