/**
 * Protection helper to prevent Google Translate (and browser translation tools)
 * from modifying icons, SVGs, logos, and non-text visual elements.
 */

export function setupGoogleTranslateProtection(): () => void {
  const protectElement = (el: Element) => {
    // 1. Set translate="no" attribute if missing
    if (el.getAttribute('translate') !== 'no') {
      el.setAttribute('translate', 'no');
    }
    // 2. Add notranslate class if missing
    if (!el.classList.contains('notranslate')) {
      el.classList.add('notranslate');
    }
  };

  const isIconOrProtected = (el: Element): boolean => {
    const tagName = el.tagName.toLowerCase();
    if (tagName === 'svg' || tagName === 'path' || tagName === 'use') return true;
    if (el.classList.contains('material-symbols-outlined')) return true;
    if (el.classList.contains('lucide') || el.hasAttribute('data-lucide')) return true;
    if (el.hasAttribute('data-brand-logo') || el.classList.contains('eden-logo')) return true;
    return false;
  };

  const scanAndProtect = (root: ParentNode = document) => {
    // Icons & Material Symbols
    root.querySelectorAll?.('.material-symbols-outlined, [class*="material-symbols"]').forEach(protectElement);
    // All SVG elements
    root.querySelectorAll?.('svg').forEach(protectElement);
    // Lucide icons
    root.querySelectorAll?.('.lucide, [data-lucide]').forEach(protectElement);
    // Brand logos and emblem images
    root.querySelectorAll?.('[data-brand-logo], img[alt*="Eden Resource Home"], img[src*="logo"]').forEach(protectElement);
    // Google Translate widget element itself
    const gtEl = document.getElementById('google_translate_element');
    if (gtEl) {
      protectElement(gtEl);
    }
  };

  // Immediate first pass
  if (typeof document !== 'undefined') {
    scanAndProtect(document);
  }

  // MutationObserver to protect dynamically rendered icons
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (isIconOrProtected(el)) {
              protectElement(el);
            }
            scanAndProtect(el);
          }
        });
      }
    }
  });

  if (typeof document !== 'undefined' && document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  return () => {
    observer.disconnect();
  };
}
