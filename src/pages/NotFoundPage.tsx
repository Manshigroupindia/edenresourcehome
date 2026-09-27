import React from 'react';
import { Link } from 'react-router-dom';
import { SeoMeta } from '../components/common/SeoMeta';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SeoMeta title="Page Not Found | Eden Resource Home" />

      <div className="min-h-[70vh] flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full text-center space-y-6 bg-surface-container-lowest p-8 sm:p-12 rounded-3xl shadow-sm border border-outline-variant/20">
          <div className="w-20 h-20 rounded-full bg-secondary-fixed text-primary flex items-center justify-center mx-auto shadow-sm">
            <span className="material-symbols-outlined text-[40px]">cottage</span>
          </div>

          <div className="space-y-2">
            <span className="font-stat-display text-stat-display text-secondary block font-bold">
              404
            </span>
            <h1 className="font-headline-md text-headline-md text-primary font-bold">
              Page Not Found
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              We couldn't locate the page you were looking for. It may have moved or the URL may be incorrect.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-secondary transition-colors inline-flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              <span>Back to Home</span>
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-surface-container-high text-primary font-label-lg text-label-lg font-semibold hover:bg-secondary-fixed transition-colors inline-flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
