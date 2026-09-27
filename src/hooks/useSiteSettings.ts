import { useContext } from 'react';
import { SiteSettingsContext, type SiteSettingsContextType } from '../contexts/siteSettingsContextValue';

export const useSiteSettings = (): SiteSettingsContextType => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};
