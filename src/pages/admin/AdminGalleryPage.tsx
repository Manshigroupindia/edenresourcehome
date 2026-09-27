import React, { useState, useEffect, useMemo } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy
} from 'firebase/firestore';
import {
  Plus,
  Search,
  Trash2,
  Edit2,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  ExternalLink,
  Filter,
  Images
} from 'lucide-react';
import { db } from '../../lib/firebase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import {
  type GalleryItem,
  GALLERY_CATEGORIES
} from '../../types/gallery';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { BulkUploadModal } from '../../components/admin/BulkUploadModal';

export const AdminGalleryPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // Modal Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState<string>(GALLERY_CATEGORIES[0]);
  const [formAltText, setFormAltText] = useState('');
  const [formFile, setFormFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Upload & Save Progress
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirmation modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch items from Firestore
  const fetchGallery = async () => {
    setLoading(true);
    setError(null);
    try {
      const colRef = collection(db, 'gallery');
      const q = query(colRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const list: GalleryItem[] = [];
      snapshot.forEach((d) => {
        list.push({ id: d.id, ...(d.data() as Omit<GalleryItem, 'id'>) });
      });

      setItems(list);
    } catch (err: unknown) {
      console.error('Failed to fetch gallery items:', err);
      setError('Could not load gallery records from Firestore.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const colRef = collection(db, 'gallery');
        const q = query(colRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);

        if (!active) return;
        const list: GalleryItem[] = [];
        snapshot.forEach((d) => {
          list.push({ id: d.id, ...(d.data() as Omit<GalleryItem, 'id'>) });
        });

        setItems(list);
      } catch (err: unknown) {
        if (!active) return;
        console.error('Failed to fetch gallery items:', err);
        setError('Could not load gallery records from Firestore.');
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  // Filtered gallery items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  // Open modal for new item
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormDescription('');
    setFormCategory(GALLERY_CATEGORIES[0]);
    setFormAltText('');
    setFormFile(null);
    setFilePreview(null);
    setFormError(null);
    setIsModalOpen(true);
  };

  // Open modal for editing existing item
  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormTitle(item.title || '');
    setFormDescription(item.description || '');
    setFormCategory(item.category || GALLERY_CATEGORIES[0]);
    setFormAltText(item.altText || '');
    setFormFile(null);
    setFilePreview(item.imageUrl);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormFile(file);
      const url = URL.createObjectURL(file);
      setFilePreview(url);
    }
  };

  // Submit modal (Add or Edit)
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!editingItem && !formFile) {
      setFormError('Please select an image file to upload.');
      return;
    }

    if (!formCategory) {
      setFormError('Please choose a category.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      let finalImageUrl = editingItem?.imageUrl || '';
      let finalPublicId = editingItem?.cloudinaryPublicId || '';

      // If a new file was selected, upload it to Cloudinary
      if (formFile) {
        const uploadResult = await uploadToCloudinary(formFile, (percent) => {
          setUploadProgress(percent);
        });
        finalImageUrl = uploadResult.secure_url;
        finalPublicId = uploadResult.public_id;
      }

      if (editingItem) {
        // Update existing Firestore doc
        const docRef = doc(db, 'gallery', editingItem.id);
        await updateDoc(docRef, {
          title: formTitle.trim(),
          description: formDescription.trim(),
          category: formCategory,
          altText: formAltText.trim() || formTitle.trim(),
          imageUrl: finalImageUrl,
          cloudinaryPublicId: finalPublicId,
          updatedAt: serverTimestamp()
        });

        setSuccessMessage('Gallery image successfully updated.');
      } else {
        // Create new Firestore doc
        const colRef = collection(db, 'gallery');
        await addDoc(colRef, {
          title: formTitle.trim(),
          description: formDescription.trim(),
          category: formCategory,
          altText: formAltText.trim() || formTitle.trim(),
          imageUrl: finalImageUrl,
          cloudinaryPublicId: finalPublicId,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });

        setSuccessMessage('New image successfully uploaded and published to gallery.');
      }

      setIsModalOpen(false);
      await fetchGallery();
    } catch (err: unknown) {
      const errorObj = err as Error;
      setFormError(errorObj.message || 'Failed to save image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Delete item from Firestore
  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteDoc(doc(db, 'gallery', deletingId));
      setSuccessMessage('Image record removed from gallery.');
      setDeletingId(null);
      await fetchGallery();
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || 'Failed to delete gallery record.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
        <div>
          <h1 className="font-headline-lg text-primary text-[26px] sm:text-[30px] font-bold">
            Gallery CMS Management
          </h1>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Upload new photos via Cloudinary and curate public gallery categories.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap self-start sm:self-auto">
          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[14px] shadow-sm hover:bg-secondary active:scale-[0.98] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Image</span>
          </button>

          <button
            type="button"
            onClick={() => setIsBulkModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary-fixed text-primary border border-secondary/30 font-bold text-[14px] shadow-sm hover:bg-secondary hover:text-white active:scale-[0.98] transition-all"
          >
            <Images className="w-4 h-4" />
            <span>+ Upload Multiple Images</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-secondary-fixed text-on-secondary-fixed border border-secondary flex items-center justify-between gap-3 text-[14px] font-medium shadow-xs">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-primary shrink-0" />
            <span>{successMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-primary hover:opacity-75"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-error-container/40 text-on-error-container border border-error/30 flex items-center justify-between gap-3 text-[14px] font-medium shadow-xs">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-error shrink-0" />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => setError(null)}
            className="text-error hover:opacity-75"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-surface rounded-2xl p-4 sm:p-5 shadow-xs border border-outline-variant/30 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/60">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 focus:border-secondary focus:bg-surface focus:outline-none text-[14px]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <Filter className="w-4 h-4 text-on-surface-variant shrink-0" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] font-medium text-primary focus:outline-none"
          >
            <option value="All">All Categories</option>
            {GALLERY_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Gallery Items Grid */}
      {loading ? (
        <div className="py-20 text-center text-on-surface-variant">
          <div className="w-8 h-8 border-3 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-semibold text-[15px]">Loading gallery records from Firestore...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-surface border border-dashed border-outline-variant/40 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center mx-auto text-on-surface-variant/60">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-headline-sm text-primary text-[18px] font-bold">
              {searchQuery || selectedCategory !== 'All'
                ? 'No matching gallery images found'
                : 'No custom CMS gallery images yet'}
            </h3>
            <p className="text-body-sm text-on-surface-variant max-w-md mx-auto">
              {searchQuery || selectedCategory !== 'All'
                ? 'Try clearing your search query or selecting a different category filter.'
                : 'Your public gallery displays the verified historical assets. Add your first new photo to publish it via Cloudinary.'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[13.5px] hover:bg-secondary transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Image</span>
            </button>

            <button
              type="button"
              onClick={() => setIsBulkModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary-fixed text-primary border border-secondary/30 font-bold text-[13.5px] hover:bg-secondary hover:text-white transition-colors"
            >
              <Images className="w-4 h-4" />
              <span>+ Upload Multiple Images</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-surface rounded-2xl overflow-hidden border border-outline-variant/30 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              {/* Image Preview Container */}
              <div className="relative h-48 w-full bg-surface-container overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.altText || item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-primary/90 text-white shadow-xs backdrop-blur-xs">
                    {item.category}
                  </span>
                </div>
                <a
                  href={item.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-surface/90 text-primary hover:bg-surface transition-colors shadow-xs opacity-0 group-hover:opacity-100"
                  title="View full image in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Content Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3
                    className="font-bold text-primary text-[15px] leading-snug truncate"
                    title={item.title || 'Untitled Image'}
                  >
                    {item.title || 'Untitled Image'}
                  </h3>
                  {item.description && (
                    <p className="text-[12.5px] text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container text-[12.5px] font-semibold transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingId(item.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/30 text-[12.5px] font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => !uploading && setIsModalOpen(false)}
        >
          <div
            className="bg-surface rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-outline-variant/30 space-y-6 my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/20">
              <h2 className="font-headline-sm text-primary text-[20px] font-bold">
                {editingItem ? 'Edit Gallery Image' : 'Upload New Gallery Photo'}
              </h2>
              <button
                type="button"
                onClick={() => !uploading && setIsModalOpen(false)}
                disabled={uploading}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3.5 rounded-xl bg-error-container/40 text-on-error-container border border-error/30 text-[13px] font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-error shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* Image picker & preview */}
              <div>
                <label className="block text-[12.5px] font-bold text-primary uppercase tracking-wider mb-2">
                  Image File {!editingItem && <span className="text-error">*</span>}
                </label>

                {filePreview ? (
                  <div className="relative rounded-2xl overflow-hidden bg-surface-container border border-outline-variant/30 h-44 mb-3">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <label className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-surface/90 hover:bg-surface text-primary text-[12px] font-semibold cursor-pointer shadow-xs">
                      Change File
                      <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/webp"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-outline-variant/50 hover:border-secondary bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
                    <Upload className="w-8 h-8 text-on-surface-variant/60 mb-2" />
                    <span className="text-[13.5px] font-bold text-primary">
                      Click to choose image file
                    </span>
                    <span className="text-[11.5px] text-on-surface-variant mt-1">
                      JPG, PNG, WEBP up to 10MB
                    </span>
                    <input
                      type="file"
                      required={!editingItem}
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      className="hidden"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </label>
                )}

                {formFile && (
                  <p className="text-[12px] text-secondary font-medium mt-1 truncate">
                    Selected: {formFile.name} ({(formFile.size / 1024).toFixed(0)} KB)
                  </p>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-[12.5px] font-bold text-primary uppercase tracking-wider mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Children in Classroom Reading"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] focus:outline-none focus:bg-surface"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-[12.5px] font-bold text-primary uppercase tracking-wider mb-1.5">
                  Category <span className="text-error">*</span>
                </label>
                <select
                  required
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] font-medium text-primary focus:outline-none"
                >
                  {GALLERY_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[12.5px] font-bold text-primary uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Optional brief description of this activity or moment..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] focus:outline-none focus:bg-surface"
                />
              </div>

              {/* Alt Text */}
              <div>
                <label className="block text-[12.5px] font-bold text-primary uppercase tracking-wider mb-1.5">
                  Accessibility Alt Text
                </label>
                <input
                  type="text"
                  value={formAltText}
                  onChange={(e) => setFormAltText(e.target.value)}
                  placeholder="Describe image for screen readers"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-outline-variant/30 text-[14px] focus:outline-none focus:bg-surface"
                />
              </div>

              {/* Upload Progress Indicator */}
              {uploading && (
                <div className="p-3 rounded-xl bg-surface-container-high space-y-1.5">
                  <div className="flex justify-between text-[12px] font-semibold text-primary">
                    <span>Uploading to Cloudinary & Firestore...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all duration-300 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Modal Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={uploading}
                  className="px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-[14px] font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[14px] shadow-sm hover:bg-secondary transition-all disabled:opacity-50"
                >
                  {uploading
                    ? 'Publishing...'
                    : editingItem
                    ? 'Save Changes'
                    : 'Upload & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingId && (
        <div
          className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => !isDeleting && setDeletingId(null)}
        >
          <div
            className="bg-surface rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-outline-variant/30 space-y-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-error-container/40 text-error flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-headline-sm text-primary text-[18px] font-bold">
                Remove Gallery Image?
              </h3>
              <p className="text-body-sm text-on-surface-variant text-[13.5px]">
                Are you sure you want to remove this photo record from the website gallery? This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-[13.5px] font-semibold flex-1"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-error text-white font-bold text-[13.5px] shadow-sm hover:opacity-90 flex-1"
              >
                {isDeleting ? 'Removing...' : 'Yes, Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      <BulkUploadModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onUploadComplete={async () => {
          await fetchGallery();
          setSuccessMessage('Bulk upload completed and gallery refreshed.');
        }}
      />
    </div>
  );
};
