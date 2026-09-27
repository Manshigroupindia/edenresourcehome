import { createContext } from 'react';
import type { SiteSettings } from '../types/settings';

export interface SiteSettingsContextType {
  settings: SiteSettings;
  loading: boolean;
  error: string | null;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;
  refreshSettings: () => Promise<void>;
}

export const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined);
