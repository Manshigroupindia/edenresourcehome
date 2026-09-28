import { useState, useEffect, useCallback } from 'react';
import {
  type DonationPaymentSettings,
  DEFAULT_DONATION_SETTINGS
} from '../types/donation';
import {
  getDonationSettings,
  updateDonationSettings
} from '../services/donationSettingsService';

interface UseDonationSettingsResult {
  donationSettings: DonationPaymentSettings;
  loading: boolean;
  error: string | null;
  refreshSettings: () => Promise<void>;
  updateSettings: (newSettings: Partial<DonationPaymentSettings>) => Promise<void>;
}

export function useDonationSettings(): UseDonationSettingsResult {
  const [donationSettings, setDonationSettings] = useState<DonationPaymentSettings>(
    DEFAULT_DONATION_SETTINGS
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDonationSettings();
      setDonationSettings(data);
    } catch (err: unknown) {
      console.warn('Error fetching donation payment settings:', err);
      setError('Could not load donation payment details.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getDonationSettings();
        if (mounted) {
          setDonationSettings(data);
        }
      } catch (err: unknown) {
        if (mounted) {
          console.warn('Error in initial useDonationSettings fetch:', err);
          setError('Could not load donation payment details.');
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

  const handleUpdate = async (
    newSettings: Partial<DonationPaymentSettings>
  ): Promise<void> => {
    await updateDonationSettings(newSettings);
    setDonationSettings((prev) => ({
      ...prev,
      ...newSettings,
      upi: {
        ...prev.upi,
        ...(newSettings.upi || {})
      },
      bank: {
        ...prev.bank,
        ...(newSettings.bank || {})
      }
    }));
  };

  return {
    donationSettings,
    loading,
    error,
    refreshSettings: fetchSettings,
    updateSettings: handleUpdate
  };
}
