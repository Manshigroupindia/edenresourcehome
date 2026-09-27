import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  Trash2,
  RotateCcw,
  Images,
  FolderPlus
} from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { uploadToCloudinary } from '../../lib/cloudinary';
import { GALLERY_CATEGORIES, type GalleryCategory } from '../../types/gallery';

export interface BulkImageItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
  title: string;
  altText: string;
  isValid: boolean;
  validationError?: string;
  status: 'idle' | 'waiting' | 'uploading' | 'success' | 'failed';
  progress: number;
  errorMessage?: string;
}

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => Promise<void> | void;
}

const CONCURRENCY_LIMIT = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTS = ['.jpg', '.jpeg', '.png', '.webp'];
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const formatFileNameToTitle = (fileName: string): string => {
  const base = fileName.replace(/\.[^/.]+$/, '');
  const clean = base.replace(/[-_.]+/g, ' ').trim();
  if (!clean) return 'Eden Resource Home Activity';
  return clean
    .split(' ')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

const validateFile = (file: File): { isValid: boolean; error?: string } => {
  const hasValidType =
    ALLOWED_TYPES.includes(file.type.toLowerCase()) ||
    ALLOWED_EXTS.some((ext) => file.name.toLowerCase().endsWith(ext));

  if (!hasValidType) {
    return { isValid: false, error: 'Unsupported format. Allowed: JPG, PNG, WEBP.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: `File exceeds 10MB limit (${formatFileSize(file.size)}).` };
  }
  if (file.size === 0) {
    return { isValid: false, error: 'File is empty (0 bytes).' };
  }
  return { isValid: true };
};

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadComplete
}) => {
  const [items, setItems] = useState<BulkImageItem[]>([]);
  const [commonCategory, setCommonCategory] = useState<GalleryCategory>(GALLERY_CATEGORIES[0]);
  const [commonDescription, setCommonDescription] = useState<string>('');

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [overallSummary, setOverallSummary] = useState<{
    total: number;
    success: number;
    failed: number;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const appendFileInputRef = useRef<HTMLInputElement>(null);
  const itemsRef = useRef<BulkImageItem[]>([]);

  // Keep itemsRef in sync with state for unmount cleanup
  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  // Cleanup object URLs on unmount or reset
  const cleanupUrls = useCallback((list: BulkImageItem[]) => {
    list.forEach((item) => {
      try {
        URL.revokeObjectURL(item.previewUrl);
      } catch {
        // ignore
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      cleanupUrls(itemsRef.current);
    };
  }, [cleanupUrls]);

  if (!isOpen) return null;

  // Handle incoming files from file picker
  const handleFilesSelected = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newItems: BulkImageItem[] = Array.from(fileList).map((file, idx) => {
      const validation = validateFile(file);
      const title = formatFileNameToTitle(file.name);
      return {
        id: `${file.name}-${file.size}-${Date.now()}-${idx}`,
        file,
        previewUrl: URL.createObjectURL(file),
        name: file.name,
        sizeFormatted: formatFileSize(file.size),
        title,
        altText: `${title} - Eden Resource Home`,
        isValid: validation.isValid,
        validationError: validation.error,
        status: 'idle',
        progress: 0
      };
    });

    setItems((prev) => [...prev, ...newItems]);
    setOverallSummary(null);
  };

  // Remove single item
  const handleRemoveItem = (id: string) => {
    if (isUploading) return;
    setItems((prev) => {
      const target = prev.find((it) => it.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((it) => it.id !== id);
    });
  };

  // Clear all selected items
  const handleClearAll = () => {
    if (isUploading) return;
    cleanupUrls(itemsRef.current);
    setItems([]);
    setOverallSummary(null);
  };

  // Update item field (title, altText)
  const handleUpdateItem = (id: string, updates: Partial<BulkImageItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Upload handler with controlled concurrency
  const handleUploadAll = async () => {
    if (isUploading) return;

    // Pick candidate items to upload: valid and either 'idle' or 'failed'
    const pendingItems = items.filter(
      (it) => it.isValid && (it.status === 'idle' || it.status === 'failed')
    );

    if (pendingItems.length === 0) return;

    setIsUploading(true);
    setOverallSummary(null);

    // Set pending items to 'waiting'
    setItems((prev) =>
      prev.map((it) =>
        it.isValid && (it.status === 'idle' || it.status === 'failed')
          ? { ...it, status: 'waiting', progress: 0, errorMessage: undefined }
          : it
      )
    );

    let completedSuccess = 0;
    let completedFailed = 0;

    // Worker queue
    const queue = [...pendingItems];
    const totalToProcess = queue.length;

    const runWorker = async () => {
      while (queue.length > 0) {
        const item = queue.shift();
        if (!item) break;

        // Mark as uploading
        setItems((prev) =>
          prev.map((it) => (it.id === item.id ? { ...it, status: 'uploading', progress: 0 } : it))
        );

        try {
          // 1. Upload to Cloudinary
          const uploadResult = await uploadToCloudinary(item.file, (percent) => {
            setItems((prev) =>
              prev.map((it) => (it.id === item.id ? { ...it, progress: percent } : it))
            );
          });

          // 2. Add Firestore document
          const colRef = collection(db, 'gallery');
          const title = item.title.trim() || formatFileNameToTitle(item.name);
          const altText = item.altText.trim() || title;
          const description = commonDescription.trim();

          await addDoc(colRef, {
            title,
            description,
            category: commonCategory,
            altText,
            imageUrl: uploadResult.secure_url,
            cloudinaryPublicId: uploadResult.public_id,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          });

          completedSuccess++;

          // Mark as success
          setItems((prev) =>
            prev.map((it) =>
              it.id === item.id
                ? {
                    ...it,
                    status: 'success',
                    progress: 100,
                    errorMessage: undefined
                  }
                : it
            )
          );
        } catch (err: unknown) {
          completedFailed++;
          const errorObj = err as Error;
          const message = errorObj?.message || 'Upload failed.';

          setItems((prev) =>
            prev.map((it) =>
              it.id === item.id
                ? {
                    ...it,
                    status: 'failed',
                    errorMessage: message
                  }
                : it
            )
          );
        }
      }
    };

    // Spawn concurrent workers (up to CONCURRENCY_LIMIT)
    const workerPromises: Promise<void>[] = [];
    const activeWorkers = Math.min(CONCURRENCY_LIMIT, totalToProcess);
    for (let i = 0; i < activeWorkers; i++) {
      workerPromises.push(runWorker());
    }

    await Promise.all(workerPromises);

    setIsUploading(false);
    setOverallSummary({
      total: totalToProcess,
      success: completedSuccess,
      failed: completedFailed
    });

    // Refresh public & admin gallery data immediately
    if (completedSuccess > 0) {
      await onUploadComplete();
    }
  };

  // Safe modal close
  const handleSafeClose = () => {
    if (isUploading) {
      const confirmClose = window.confirm(
        'Uploads are currently in progress. Closing now may cancel remaining pending images. Are you sure?'
      );
      if (!confirmClose) return;
    }
    cleanupUrls(itemsRef.current);
    setItems([]);
    setOverallSummary(null);
    onClose();
  };

  // Statistics
  const validItems = items.filter((it) => it.isValid);
  const invalidItems = items.filter((it) => !it.isValid);
  const successItems = items.filter((it) => it.status === 'success');
  const failedItems = items.filter((it) => it.status === 'failed');
  const uploadingItems = items.filter((it) => it.status === 'uploading' || it.status === 'waiting');
  const pendingCount = validItems.filter((it) => it.status === 'idle' || it.status === 'failed').length;

  const totalValid = validItems.length;
  const overallPercent =
    totalValid > 0 ? Math.round((successItems.length / totalValid) * 100) : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={handleSafeClose}
    >
      <div
        className="bg-surface rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-outline-variant/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-outline-variant/30 flex items-center justify-between shrink-0 bg-surface">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-secondary-fixed text-primary flex items-center justify-center shrink-0">
              <Images className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-headline-sm text-primary text-[20px] sm:text-[22px] font-bold">
                Bulk Image Upload
              </h2>
              <p className="text-body-sm text-on-surface-variant text-[13px]">
                Select and upload multiple photos to Cloudinary and publish them to Firestore.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSafeClose}
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
            title="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* If No Files Selected Yet: Full dropzone */}
          {items.length === 0 ? (
            <div className="py-12 px-6 rounded-3xl border-2 border-dashed border-outline-variant/60 hover:border-secondary bg-surface-container-low text-center flex flex-col items-center justify-center space-y-4 transition-colors">
              <div className="w-16 h-16 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-primary">
                <Upload className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-md">
                <h3 className="font-bold text-primary text-[17px]">
                  Select Multiple Photos to Upload
                </h3>
                <p className="text-[13px] text-on-surface-variant">
                  Choose multiple photos at once. Supported formats include JPG, JPEG, PNG, and WEBP (up to 10MB per image).
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={(e) => {
                  handleFilesSelected(e.target.files);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-[14px] shadow-md hover:bg-secondary active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Browse &amp; Select Files</span>
              </button>
            </div>
          ) : (
            <>
              {/* Common Metadata Configuration Bar */}
              <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/25 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-bold text-primary text-[14px] uppercase tracking-wider">
                    Common Metadata for Selected Images
                  </span>
                  <span className="text-[12px] text-on-surface-variant">
                    Applied to all {items.length} chosen image{items.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12.5px] font-bold text-primary uppercase tracking-wider mb-1.5">
                      Category <span className="text-error">*</span>
                    </label>
                    <select
                      value={commonCategory}
                      disabled={isUploading}
                      onChange={(e) => setCommonCategory(e.target.value as GalleryCategory)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-[14px] font-medium text-primary focus:outline-none focus:border-secondary"
                    >
                      {GALLERY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-bold text-primary uppercase tracking-wider mb-1.5">
                      Shared Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={commonDescription}
                      disabled={isUploading}
                      onChange={(e) => setCommonDescription(e.target.value)}
                      placeholder="e.g. Annual Sports Meet 2026 at Eden Campus"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-[14px] focus:outline-none focus:border-secondary"
                    />
                  </div>
                </div>
              </div>

              {/* Status and Action Ribbon */}
              <div className="flex items-center justify-between flex-wrap gap-3 pb-1">
                <div className="flex items-center gap-2 flex-wrap text-[13px]">
                  <span className="font-bold text-primary">
                    {items.length} Image{items.length > 1 ? 's' : ''} Selected
                  </span>
                  <span className="text-on-surface-variant/40">&bull;</span>
                  <span className="text-secondary font-medium">
                    {validItems.length} Valid
                  </span>
                  {invalidItems.length > 0 && (
                    <>
                      <span className="text-on-surface-variant/40">&bull;</span>
                      <span className="text-error font-medium">
                        {invalidItems.length} Invalid
                      </span>
                    </>
                  )}
                  {successItems.length > 0 && (
                    <>
                      <span className="text-on-surface-variant/40">&bull;</span>
                      <span className="text-primary font-bold">
                        {successItems.length} Uploaded
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    ref={appendFileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      handleFilesSelected(e.target.files);
                      if (appendFileInputRef.current) appendFileInputRef.current.value = '';
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => appendFileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-primary bg-primary/10 hover:bg-primary/20 text-[12.5px] font-semibold transition-colors disabled:opacity-50"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>+ Add More Files</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearAll}
                    disabled={isUploading}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-error hover:bg-error-container/30 text-[12.5px] font-semibold transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>

              {/* Overall Progress Banner */}
              {isUploading && (
                <div className="p-4 rounded-2xl bg-secondary-fixed/50 border border-secondary/40 space-y-2">
                  <div className="flex items-center justify-between text-[13px] font-bold text-primary">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span>
                        Uploading {successItems.length + (uploadingItems.length > 0 ? 1 : 0)} of {totalValid} images...
                      </span>
                    </div>
                    <span>{overallPercent}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${overallPercent}%` }}
                    />
                  </div>
                  <p className="text-[11.5px] text-on-surface-variant">
                    Controlled concurrency: 3 images uploading in parallel to ensure optimal network stability.
                  </p>
                </div>
              )}

              {/* Completion Notification */}
              {overallSummary && (
                <div
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-[13.5px] font-medium ${
                    overallSummary.failed === 0
                      ? 'bg-secondary-fixed text-on-secondary-fixed border-secondary'
                      : 'bg-error-container/40 text-on-error-container border-error/30'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {overallSummary.failed === 0 ? (
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-error shrink-0" />
                    )}
                    <span>
                      {overallSummary.failed === 0
                        ? `${overallSummary.success} image${overallSummary.success > 1 ? 's' : ''} uploaded successfully to Cloudinary & Firestore.`
                        : `${overallSummary.success} image${overallSummary.success > 1 ? 's' : ''} uploaded successfully. ${overallSummary.failed} image${overallSummary.failed > 1 ? 's' : ''} failed.`}
                    </span>
                  </div>
                  {overallSummary.failed > 0 && (
                    <button
                      type="button"
                      onClick={handleUploadAll}
                      className="px-3 py-1 rounded-lg bg-primary text-on-primary text-[12px] font-bold hover:bg-secondary transition-colors"
                    >
                      Retry Failed
                    </button>
                  )}
                </div>
              )}

              {/* Selected Images Preview Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-2xl border bg-surface overflow-hidden flex flex-col justify-between shadow-xs transition-shadow relative ${
                      !item.isValid
                        ? 'border-error/40 bg-error-container/10'
                        : item.status === 'success'
                        ? 'border-secondary/50 bg-secondary-fixed/10'
                        : item.status === 'failed'
                        ? 'border-error/50 bg-error-container/20'
                        : item.status === 'uploading'
                        ? 'border-primary/50 shadow-md ring-2 ring-primary/20'
                        : 'border-outline-variant/30 hover:border-outline-variant/60'
                    }`}
                  >
                    {/* Thumbnail + Remove Button */}
                    <div className="relative h-36 w-full bg-surface-container-high overflow-hidden">
                      <img
                        src={item.previewUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Top Overlay Badges */}
                      <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                        <span className="px-2 py-0.5 rounded-md bg-black/65 text-white text-[10.5px] font-semibold backdrop-blur-xs">
                          {item.sizeFormatted}
                        </span>

                        {!isUploading && item.status !== 'success' && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="pointer-events-auto p-1 rounded-full bg-black/60 text-white hover:bg-error transition-colors shadow-sm"
                            title="Remove from upload queue"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      {/* Status Overlay Badge */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        {!item.isValid ? (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-error text-white shadow-xs truncate max-w-full">
                            ✕ Invalid File
                          </span>
                        ) : item.status === 'success' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-primary text-on-primary shadow-xs">
                            <CheckCircle className="w-3 h-3 text-secondary-fixed" />
                            <span>Uploaded</span>
                          </span>
                        ) : item.status === 'uploading' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-primary text-on-primary shadow-xs">
                            <div className="w-2.5 h-2.5 border border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Uploading {item.progress}%</span>
                          </span>
                        ) : item.status === 'waiting' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-surface text-primary shadow-xs">
                            <Clock className="w-3 h-3 text-secondary" />
                            <span>Waiting...</span>
                          </span>
                        ) : item.status === 'failed' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-error text-white shadow-xs">
                            <AlertCircle className="w-3 h-3" />
                            <span>Failed</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-black/60 text-white">
                            Ready
                          </span>
                        )}
                      </div>

                      {/* Item Upload Progress Bar */}
                      {item.status === 'uploading' && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
                          <div
                            className="h-full bg-secondary transition-all duration-200"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Metadata Editing Fields */}
                    <div className="p-3 space-y-2.5 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        {/* File Name */}
                        <p className="text-[11.5px] text-on-surface-variant font-medium truncate" title={item.name}>
                          {item.name}
                        </p>

                        {/* Validation Error Message */}
                        {item.validationError && (
                          <p className="text-[11px] text-error font-medium leading-tight">
                            {item.validationError}
                          </p>
                        )}

                        {/* Upload Error Message */}
                        {item.errorMessage && (
                          <p className="text-[11px] text-error font-medium leading-tight">
                            {item.errorMessage}
                          </p>
                        )}

                        {/* Title Input */}
                        <div>
                          <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={item.title}
                            disabled={isUploading || item.status === 'success'}
                            onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-[13px] text-primary focus:bg-surface focus:outline-none focus:border-secondary disabled:opacity-60"
                            placeholder="Image title"
                          />
                        </div>

                        {/* Alt Text Input */}
                        <div>
                          <label className="block text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                            Alt Text
                          </label>
                          <input
                            type="text"
                            value={item.altText}
                            disabled={isUploading || item.status === 'success'}
                            onChange={(e) => handleUpdateItem(item.id, { altText: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-[12.5px] text-on-surface focus:bg-surface focus:outline-none focus:border-secondary disabled:opacity-60"
                            placeholder="Screen reader description"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-outline-variant/30 bg-surface flex items-center justify-between flex-wrap gap-3 shrink-0">
          <div>
            {items.length > 0 && (
              <p className="text-[12.5px] text-on-surface-variant">
                {successItems.length === totalValid && totalValid > 0 ? (
                  <span className="text-primary font-bold">
                    All valid images have been uploaded!
                  </span>
                ) : (
                  <span>
                    {pendingCount} of {totalValid} image{totalValid > 1 ? 's' : ''} ready to upload
                  </span>
                )}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSafeClose}
              className="px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container font-semibold text-[13.5px] transition-colors"
            >
              {successItems.length > 0 && pendingCount === 0 ? 'Done & Close' : 'Cancel'}
            </button>

            {failedItems.length > 0 && !isUploading && (
              <button
                type="button"
                onClick={handleUploadAll}
                className="px-4 py-2.5 rounded-xl bg-surface-container text-primary border border-outline-variant/40 font-bold text-[13.5px] hover:bg-surface-container-high transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retry Failed ({failedItems.length})</span>
              </button>
            )}

            {items.length > 0 && pendingCount > 0 && (
              <button
                type="button"
                onClick={handleUploadAll}
                disabled={isUploading || totalValid === 0}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-[13.5px] shadow-md hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Uploading Images...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Upload All Images ({pendingCount})</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
