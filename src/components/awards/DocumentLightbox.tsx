import React, { useEffect } from 'react';
import type { AwardItem } from '../../data/awards';

interface DocumentLightboxProps {
  isOpen: boolean;
  item: AwardItem | null;
  onClose: () => void;
}

export const DocumentLightbox: React.FC<DocumentLightboxProps> = ({
  isOpen,
  item,
  onClose
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-50 bg-primary/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 lg:p-8 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-surface-container-high border-b border-outline-variant/20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold uppercase tracking-wider">
              {item.badge}
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant">
              Year: {item.year}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label="Close Document Viewer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Scanned Document Image */}
        <div className="relative w-full bg-surface flex items-center justify-center p-3 sm:p-6 overflow-hidden max-h-[60vh]">
          <img
            src={item.image}
            alt={item.alt}
            className="max-h-[55vh] w-auto max-w-full rounded-lg object-contain shadow-lg border border-outline-variant/30"
          />
        </div>

        {/* Information Section */}
        <div className="p-6 bg-surface-container-lowest space-y-3 border-t border-outline-variant/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              {item.title}
            </h3>
            <span className="text-label-md font-semibold text-secondary self-start sm:self-auto">
              {item.type}
            </span>
          </div>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            {item.fullDescription}
          </p>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center gap-2.5 text-body-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
            <span>Archival Record • Preserved from official publication files &amp; press documentation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
