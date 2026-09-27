import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { galleryItems as defaultGalleryItems, galleryCategories, type GalleryItem } from '../data/gallery';
import { GalleryLightbox } from '../components/gallery/GalleryLightbox';
import { SeoMeta } from '../components/common/SeoMeta';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { cleanDisplayTitle, cleanDisplayDescription } from '../lib/galleryUtils';

const normalizeCategoryKey = (cat: string): "education" | "sports" | "events" | "campus" | "volunteers" => {
  const lower = cat.toLowerCase();
  if (lower.includes('educat') || lower.includes('child')) return 'education';
  if (lower.includes('sport') || lower.includes('activit')) return 'sports';
  if (lower.includes('event') || lower.includes('festiv') || lower.includes('award')) return 'events';
  if (lower.includes('campus') || lower.includes('home') || lower.includes('facilit')) return 'campus';
  if (lower.includes('communit') || lower.includes('volunt')) return 'volunteers';
  return 'education';
};

export const GalleryPage: React.FC = () => {
  const { settings } = useSiteSettings();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const [cmsItems, setCmsItems] = useState<GalleryItem[]>([]);
  const [loadingCms, setLoadingCms] = useState<boolean>(true);

  useEffect(() => {
    const fetchCmsGallery = async () => {
      setLoadingCms(true);
      try {
        const colRef = collection(db, 'gallery');
        const q = query(colRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        const loaded: GalleryItem[] = [];
        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.imageUrl) {
            const catKey = normalizeCategoryKey(data.category || '');
            const cleanTitle = cleanDisplayTitle(data.title);
            const cleanDesc = cleanDisplayDescription(data.description);
            loaded.push({
              id: docSnap.id,
              image: data.imageUrl,
              alt: cleanTitle || `${settings.siteName} photograph`,
              title: cleanTitle || undefined,
              description: cleanDesc || undefined,
              category: (data.category || 'Children & Education') as GalleryItem['category'],
              categoryKey: catKey,
              createdAt: data.createdAt
            });
          }
        });

        setCmsItems(loaded);
      } catch (err) {
        console.warn('Could not load Firestore gallery images, displaying local historical assets.', err);
      } finally {
        setLoadingCms(false);
      }
    };

    fetchCmsGallery();
  }, [settings.siteName]);

  // Merge CMS items (newest first) followed by the verified historical local assets
  const combinedItems = useMemo(() => {
    return [...cmsItems, ...defaultGalleryItems];
  }, [cmsItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return combinedItems;
    return combinedItems.filter((item) => item.categoryKey === selectedCategory);
  }, [selectedCategory, combinedItems]);

  const currentLightboxItem: GalleryItem | null =
    lightboxIndex !== null ? filteredItems[lightboxIndex] || null : null;

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length);
  };

  return (
    <>
      <SeoMeta
        title={`Gallery | ${settings.siteName} Manipur`}
        description={`Visual chronicles of life, study, athletics, cultural celebrations, and community joy at ${settings.siteName} in Ukhrul, Manipur.`}
      />

      <div className="flex flex-col w-full">
        {/* SUB-HEADER HERO */}
        <section className="relative w-full -mt-20 pt-32 pb-20 bg-primary overflow-hidden">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 bottom-0 w-80 h-80 rounded-full bg-secondary-fixed/10 blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col items-center text-center">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 mb-6 text-on-primary-container text-body-sm font-body-sm">
              <Link to="/" className="hover:text-on-primary transition-colors flex items-center gap-1">
                <span translate="no" className="notranslate material-symbols-outlined text-[16px]">home</span>
                <span>Home</span>
              </Link>
              <span className="text-secondary/60">/</span>
              <span className="text-on-primary font-semibold">Gallery</span>
            </nav>

            <span className="px-3.5 py-1 rounded-full bg-secondary/30 text-secondary-fixed text-label-md font-label-md uppercase tracking-wider mb-4">
              Visual Chronicles
            </span>

            <h1 className="font-display text-display text-on-primary tracking-tight max-w-3xl mb-4">
              Moments &amp; Memories
            </h1>

            <p className="font-body-lg text-body-lg text-inverse-on-surface/90 max-w-2xl leading-relaxed">
              A glimpse into daily life, learning, and celebrations at {settings.siteName}. Discover stories of hope, brotherhood, and resilience in Ukhrul, Manipur.
            </p>

            {/* Key Snapshot Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 w-full max-w-3xl">
              <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-on-primary border border-white/10">
                <span className="font-stat-display text-stat-display text-secondary-fixed leading-tight">50+</span>
                <span className="font-label-md text-label-md text-on-primary-container">Children Cherished</span>
              </div>
              <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-on-primary border border-white/10">
                <span className="font-stat-display text-stat-display text-secondary-fixed leading-tight">
                  {new Date().getFullYear() - settings.establishedYear}+
                </span>
                <span className="font-label-md text-label-md text-on-primary-container">Years of Care</span>
              </div>
              <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-on-primary border border-white/10">
                <span className="font-stat-display text-stat-display text-secondary-fixed leading-tight">100%</span>
                <span className="font-label-md text-label-md text-on-primary-container">School Attendance</span>
              </div>
              <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-xl p-4 flex flex-col items-center text-on-primary border border-white/10">
                <span className="font-stat-display text-stat-display text-secondary-fixed leading-tight">12+</span>
                <span className="font-label-md text-label-md text-on-primary-container">Annual Festivals</span>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY CONTROLS & CATEGORY BAR */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pt-12 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-outline-variant/30">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-surface-container rounded-xl">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-4 py-2 rounded-lg font-label-lg text-label-lg transition-all duration-200 ${
                    selectedCategory === cat.key
                      ? 'bg-primary text-on-primary shadow-sm font-bold'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Counter Badge */}
            <div className="flex items-center gap-2 text-on-surface-variant text-label-md font-label-md">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span>
                Showing {filteredItems.length} Photos {loadingCms && '(Syncing...)'}
              </span>
            </div>
          </div>
        </section>

        {/* PHOTO GRID */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <article
                key={item.id}
                onClick={() => handleOpenLightbox(idx)}
                className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer border border-outline-variant/20 hover:scale-[1.01]"
              >
                <div className="relative w-full h-80 overflow-hidden bg-surface-container">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title || `${item.category} photograph`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[12px] font-semibold">
                      <span translate="no" className="notranslate material-symbols-outlined text-[16px]">visibility</span>
                      <span>View Photo</span>
                    </span>
                  </div>

                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-md text-label-md font-bold shadow-sm">
                    {item.category}
                  </span>
                </div>

                {/* Optional Title & Description: only displayed if custom title or description exists */}
                {(item.title || item.description) && (
                  <div className="p-4 space-y-1 bg-surface-container-lowest border-t border-outline-variant/15">
                    {item.title && (
                      <h3 className="font-bold text-primary text-[15px] line-clamp-1">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-body-sm text-on-surface-variant text-[13px] line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* CHILD PRIVACY & DIGNITY POLICY NOTE */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 w-full mb-16">
          <div className="bg-surface-container-low rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border border-outline-variant/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                <span translate="no" className="notranslate material-symbols-outlined text-secondary text-[24px]">verified_user</span>
              </div>
              <div className="space-y-1">
                <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
                  Commitment to Child Privacy &amp; Dignity
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl leading-relaxed">
                  All photography displayed is documented in compliance with the Juvenile Justice (Care and Protection of Children) Act and institutional child protection guidelines. We preserve the dignity, safety, and confidentiality of every minor under our custody.
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <Link
                to="/about"
                className="px-5 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors inline-flex items-center gap-2"
              >
                <span>Read Child Policy</span>
                <span translate="no" className="notranslate material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        {/* DONATION & SUPPORT CALL TO ACTION */}
        <section className="w-full bg-primary-container text-on-primary py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <span className="font-label-md text-label-md text-secondary-fixed uppercase tracking-widest font-bold">
                Be a part of these moments
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white">
                Help Us Create More Smiling Futures
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
                Your voluntary contributions fund school supplies, warm clothing, nutritious food, and holistic care for children in Ukhrul.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <Link
                to="/donate"
                className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold shadow-md hover:bg-secondary-fixed transition-all text-center"
              >
                Support Our Children
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-surface-container-lowest/10 text-on-primary font-label-lg text-label-lg hover:bg-surface-container-lowest/20 transition-all text-center"
              >
                Schedule a Campus Visit
              </Link>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        <GalleryLightbox
          isOpen={lightboxIndex !== null}
          item={currentLightboxItem}
          onClose={handleCloseLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={lightboxIndex ?? 0}
          totalCount={filteredItems.length}
        />
      </div>
    </>
  );
};
