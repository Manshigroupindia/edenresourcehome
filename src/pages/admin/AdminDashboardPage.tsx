import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Globe,
  Image as ImageIcon,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  PlusCircle,
  ExternalLink,
  Sparkles,
  Calendar,
  Users
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import type { GalleryItem } from '../../types/gallery';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { settings, loading: settingsLoading } = useSiteSettings();

  const [galleryCount, setGalleryCount] = useState<number>(0);
  const [recentImages, setRecentImages] = useState<GalleryItem[]>([]);
  const [loadingStats, setLoadingStats] = useState<boolean>(true);

  useEffect(() => {
    const fetchGalleryStats = async () => {
      setLoadingStats(true);
      try {
        const galleryCol = collection(db, 'gallery');
        const q = query(galleryCol, orderBy('createdAt', 'desc'), limit(4));
        const snapshot = await getDocs(q);

        const items: GalleryItem[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...(doc.data() as Omit<GalleryItem, 'id'>) });
        });

        setRecentImages(items);

        // Also get total count
        const allSnapshot = await getDocs(galleryCol);
        setGalleryCount(allSnapshot.size);
      } catch (err) {
        console.warn('Could not fetch gallery collection count:', err);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchGalleryStats();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-secondary-fixed text-[12px] font-semibold tracking-wide backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Eden Resource Home Content Management</span>
          </div>

          <h1 className="font-headline-lg text-white text-[28px] sm:text-[34px] font-bold tracking-tight">
            Welcome back, {user?.email?.split('@')[0]}
          </h1>

          <p className="text-white/85 text-[14px] sm:text-[15px] leading-relaxed">
            Manage your global website identity, contact channels, address details, and public media gallery in real-time. Changes made here immediately sync to your live visitors.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/admin/settings"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-primary font-bold text-[13.5px] hover:bg-surface-bright transition-colors shadow-sm"
            >
              <span>Manage Global Settings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/admin/gallery"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 text-white font-semibold text-[13.5px] hover:bg-white/25 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-secondary-fixed" />
              <span>Upload Gallery Image</span>
            </Link>

            <Link
              to="/admin/team"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/15 text-white font-semibold text-[13.5px] hover:bg-white/25 transition-colors"
            >
              <Users className="w-4 h-4 text-secondary-fixed" />
              <span>Our Team &amp; Founder</span>
            </Link>

            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-white/80 hover:text-white text-[13px] font-medium"
            >
              <span>Visit Public Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Site Name card */}
        <div className="bg-surface rounded-2xl p-5 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Website Name
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-headline-sm text-primary text-[19px] font-bold truncate" title={settings.siteName}>
              {settingsLoading ? 'Loading...' : settings.siteName}
            </div>
            <p className="text-[12px] text-on-surface-variant/80 mt-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-secondary" /> Est. {settings.establishedYear}
            </p>
          </div>
        </div>

        {/* Gallery Images card */}
        <div className="bg-surface rounded-2xl p-5 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Gallery Images
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-stat-display text-primary text-[28px] font-bold">
              {loadingStats ? '...' : galleryCount}
            </div>
            <p className="text-[12px] text-on-surface-variant/80 mt-1">
              Stored in Firestore & Cloudinary
            </p>
          </div>
        </div>

        {/* Contact Emails count */}
        <div className="bg-surface rounded-2xl p-5 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Contact Emails
            </span>
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-stat-display text-primary text-[28px] font-bold">
              {settingsLoading ? '...' : settings.emails.length}
            </div>
            <p className="text-[12px] text-on-surface-variant/80 mt-1 truncate" title={settings.emails[0]}>
              Primary: {settings.emails[0] || 'None'}
            </p>
          </div>
        </div>

        {/* Contact Phones count */}
        <div className="bg-surface rounded-2xl p-5 shadow-xs border border-outline-variant/30 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider">
              Contact Phones
            </span>
            <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-stat-display text-primary text-[28px] font-bold">
              {settingsLoading ? '...' : settings.phones.length}
            </div>
            <p className="text-[12px] text-on-surface-variant/80 mt-1 truncate" title={settings.phones[0]}>
              Primary: {settings.phones[0] || 'None'}
            </p>
          </div>
        </div>
      </div>

      {/* Location Banner Card */}
      <div className="bg-surface rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
              Registered Organization Location
            </div>
            <div className="font-semibold text-primary text-[15px] mt-0.5">
              {settings.locationText}
            </div>
          </div>
        </div>
        <Link
          to="/admin/settings"
          className="text-secondary font-semibold text-[13.5px] hover:underline whitespace-nowrap self-end sm:self-auto"
        >
          Edit Address Details &rarr;
        </Link>
      </div>

      {/* Recent Gallery Activity */}
      <div className="bg-surface rounded-3xl p-6 sm:p-8 shadow-xs border border-outline-variant/30 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-headline-sm text-primary text-[20px] font-bold">
              Recent Gallery Uploads
            </h2>
            <p className="text-body-sm text-on-surface-variant mt-0.5">
              Images published via Cloudinary and available on the public gallery.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/admin/gallery"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary text-on-primary font-semibold text-[13px] hover:bg-secondary transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Image</span>
            </Link>
          </div>
        </div>

        {loadingStats ? (
          <div className="py-12 text-center text-on-surface-variant text-[14px]">
            Loading gallery overview...
          </div>
        ) : recentImages.length === 0 ? (
          <div className="py-12 text-center rounded-2xl bg-surface-container-low border border-dashed border-outline-variant/40 p-8 space-y-3">
            <ImageIcon className="w-10 h-10 text-on-surface-variant/40 mx-auto" />
            <p className="font-semibold text-primary text-[15px]">
              No custom CMS gallery images yet.
            </p>
            <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
              Your public gallery is currently displaying the verified historical project assets. Click below to upload your first CMS image to Cloudinary.
            </p>
            <Link
              to="/admin/gallery"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[13.5px] hover:bg-secondary transition-colors"
            >
              Upload First Image
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentImages.map((img) => (
              <div
                key={img.id}
                className="group relative rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/20 shadow-xs flex flex-col"
              >
                <div className="h-44 w-full overflow-hidden bg-surface-container-high">
                  <ImageWithFallback
                    src={img.imageUrl}
                    alt={img.altText || 'Eden Resource Home Gallery'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-secondary-fixed text-primary">
                      {img.category}
                    </span>
                    {img.altText && (
                      <p className="text-[12px] text-on-surface-variant mt-1.5 line-clamp-1">
                        {img.altText}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
