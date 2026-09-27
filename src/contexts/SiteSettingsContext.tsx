import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { type SiteSettings, DEFAULT_SITE_SETTINGS } from '../types/settings';
import { SiteSettingsContext } from './siteSettingsContextValue';

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'site');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as Partial<SiteSettings>;
        setSettings({
          ...DEFAULT_SITE_SETTINGS,
          ...data,
          phones: Array.isArray(data.phones) && data.phones.length > 0 ? data.phones : DEFAULT_SITE_SETTINGS.phones,
          emails: Array.isArray(data.emails) && data.emails.length > 0 ? data.emails : DEFAULT_SITE_SETTINGS.emails,
          address: {
            ...DEFAULT_SITE_SETTINGS.address,
            ...(data.address || {})
          },
          socialLinks: {
            ...DEFAULT_SITE_SETTINGS.socialLinks,
            ...(data.socialLinks || {})
          },
          seo: {
            ...DEFAULT_SITE_SETTINGS.seo,
            ...(data.seo || {})
          }
        });
      } else {
        setSettings(DEFAULT_SITE_SETTINGS);
      }
    } catch (err: unknown) {
      console.warn('Unable to load Firestore site settings. Falling back to default settings.', err);
      setError('Failed to fetch remote settings, using local defaults.');
      setSettings(DEFAULT_SITE_SETTINGS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      try {
        const docRef = doc(db, 'settings', 'site');
        const docSnap = await getDoc(docRef);
        if (!isSubscribed) return;

        if (docSnap.exists()) {
          const data = docSnap.data() as Partial<SiteSettings>;
          setSettings({
            ...DEFAULT_SITE_SETTINGS,
            ...data,
            phones: Array.isArray(data.phones) && data.phones.length > 0 ? data.phones : DEFAULT_SITE_SETTINGS.phones,
            emails: Array.isArray(data.emails) && data.emails.length > 0 ? data.emails : DEFAULT_SITE_SETTINGS.emails,
            address: {
              ...DEFAULT_SITE_SETTINGS.address,
              ...(data.address || {})
            },
            socialLinks: {
              ...DEFAULT_SITE_SETTINGS.socialLinks,
              ...(data.socialLinks || {})
            },
            seo: {
              ...DEFAULT_SITE_SETTINGS.seo,
              ...(data.seo || {})
            }
          });
        }
      } catch (err: unknown) {
        if (!isSubscribed) return;
        console.warn('Unable to load Firestore site settings. Falling back to default settings.', err);
        setError('Failed to fetch remote settings, using local defaults.');
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<void> => {
    try {
      const docRef = doc(db, 'settings', 'site');
      const merged: SiteSettings = {
        ...settings,
        ...newSettings,
        updatedAt: serverTimestamp()
      };

      await setDoc(docRef, merged, { merge: true });
      setSettings(merged);
    } catch (err: unknown) {
      console.error('Error updating site settings:', err);
      throw err;
    }
  };

  return (
    <SiteSettingsContext.Provider
      value={{
        settings,
        loading,
        error,
        updateSettings,
        refreshSettings: fetchSettings
      }}
    >
      {children}
    </SiteSettingsContext.Provider>
  );
};
