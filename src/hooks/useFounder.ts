import { useState, useEffect, useCallback } from 'react';
import { type FounderSettings, DEFAULT_FOUNDER_SETTINGS } from '../types/founder';
import { getFounderSettings, updateFounderSettings } from '../services/founderService';

interface UseFounderResult {
  founder: FounderSettings;
  loading: boolean;
  error: string | null;
  refreshFounder: () => Promise<void>;
  updateFounder: (newSettings: Partial<FounderSettings>) => Promise<void>;
}

export function useFounder(): UseFounderResult {
  const [founder, setFounder] = useState<FounderSettings>(DEFAULT_FOUNDER_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFounder = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFounderSettings();
      setFounder(data);
    } catch (err: unknown) {
      console.warn('Error fetching founder settings:', err);
      setError('Could not load founder settings from server. Displaying default story.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getFounderSettings();
        if (mounted) {
          setFounder(data);
        }
      } catch (err: unknown) {
        if (mounted) {
          console.warn('Error in useFounder initial fetch:', err);
          setError('Could not load founder settings from server.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateFounder = async (newSettings: Partial<FounderSettings>): Promise<void> => {
    await updateFounderSettings(newSettings);
    setFounder((prev) => ({
      ...prev,
      ...newSettings
    }));
  };

  return {
    founder,
    loading,
    error,
    refreshFounder: fetchFounder,
    updateFounder: handleUpdateFounder
  };
}
