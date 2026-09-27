import React, { useEffect } from 'react';
import { Languages } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

let scriptInitiated = false;

export const GoogleTranslateHost: React.FC = () => {
  useEffect(() => {
    // 1. Setup the global initialization callback
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,hi,bn,mni,ta,te,mr,gu,pa,ml,kn,ur',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        );
      }
    };

    // 2. Load the external Google Translate script once
    if (!scriptInitiated && !document.getElementById('google-translate-script')) {
      scriptInitiated = true;
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      // Re-invoke if already present
      const el = document.getElementById('google_translate_element');
      if (el && !el.hasChildNodes()) {
        window.googleTranslateElementInit();
      }
    }
  }, []);

  return (
    <div
      id="google_translate_element"
      translate="no"
      className="notranslate google-translate-element-container inline-flex items-center min-h-[34px]"
      aria-label="Google Translate language selector"
    />
  );
};

export const GoogleTranslateIconBadge: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span translate="no" className={`notranslate inline-flex items-center justify-center text-secondary ${className}`} aria-hidden="true">
    <Languages className="w-3.5 h-3.5 shrink-0" />
  </span>
);
