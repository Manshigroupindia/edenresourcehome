import React, { useEffect } from 'react';
import type { GalleryItem } from '../../data/gallery';

interface GalleryLightboxProps {
  isOpen: boolean;
  item: GalleryItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 bg-primary/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-surface-container-high border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold uppercase tracking-wider">
              {item.category}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant hidden sm:inline-block">
              {item.subtitle}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-body-sm text-on-surface-variant font-medium">
              {currentIndex + 1} of {totalCount}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label="Close Preview"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        {/* Main Image Display */}
        <div className="relative w-full bg-surface flex items-center justify-center p-2 sm:p-6 overflow-hidden max-h-[62vh]">
          <img
            src={item.image}
            alt={item.alt}
            className="max-h-[56vh] w-auto max-w-full rounded-lg object-contain shadow-md"
          />

          {/* Quick Prev / Next overlay arrows on large screens */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-primary hover:bg-surface-container-lowest flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Previous Photo"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-primary hover:bg-surface-container-lowest flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
            aria-label="Next Photo"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </div>

        {/* Caption & Navigation Controls */}
        <div className="p-5 sm:p-6 bg-surface-container-lowest flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-outline-variant/20">
          <div className="space-y-1 max-w-2xl">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {item.title}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            <button
              type="button"
              onClick={onPrev}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              <span>Prev</span>
            </button>
            <button
              type="button"
              onClick={onNext}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-variant transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <span>Next</span>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
