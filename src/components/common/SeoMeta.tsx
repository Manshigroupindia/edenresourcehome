import { useEffect } from 'react';

interface SeoMetaProps {
  title: string;
  description?: string;
}

export const SeoMeta: React.FC<SeoMetaProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }
    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description]);

  return null;
};
