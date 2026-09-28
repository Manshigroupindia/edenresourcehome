import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import {
  type DonationPaymentSettings,
  DEFAULT_DONATION_SETTINGS
} from '../types/donation';

const DONATION_DOC_PATH = ['settings', 'donation'] as const;

/**
 * Fetch Donation Payment Settings from Firestore `settings/donation`.
 * Returns DEFAULT_DONATION_SETTINGS if document does not exist yet.
 */
export async function getDonationSettings(): Promise<DonationPaymentSettings> {
  try {
    const docRef = doc(db, DONATION_DOC_PATH[0], DONATION_DOC_PATH[1]);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        upi: {
          enabled: data.upi?.enabled === true,
          id: typeof data.upi?.id === 'string' ? data.upi.id.trim() : '',
          name: typeof data.upi?.name === 'string' ? data.upi.name.trim() : ''
        },
        bank: {
          enabled: data.bank?.enabled === true,
          accountName: typeof data.bank?.accountName === 'string' ? data.bank.accountName.trim() : '',
          bankName: typeof data.bank?.bankName === 'string' ? data.bank.bankName.trim() : '',
          branch: typeof data.bank?.branch === 'string' ? data.bank.branch.trim() : '',
          accountNumber: typeof data.bank?.accountNumber === 'string' ? data.bank.accountNumber.trim() : (data.bank?.accountNumber ? String(data.bank.accountNumber) : ''),
          ifsc: typeof data.bank?.ifsc === 'string' ? data.bank.ifsc.trim().toUpperCase() : '',
          accountType: typeof data.bank?.accountType === 'string' ? data.bank.accountType.trim() : 'Savings'
        },
        instructions: typeof data.instructions === 'string' ? data.instructions.trim() : '',
        updatedAt: data.updatedAt
      };
    }

    return DEFAULT_DONATION_SETTINGS;
  } catch (err) {
    console.warn('Failed to load donation payment settings from Firestore:', err);
    return DEFAULT_DONATION_SETTINGS;
  }
}

/**
 * Update Donation Payment Settings in Firestore `settings/donation`.
 * Preserves account numbers as exact strings (retaining any leading zeros).
 */
export async function updateDonationSettings(
  settings: Partial<DonationPaymentSettings>
): Promise<void> {
  const docRef = doc(db, DONATION_DOC_PATH[0], DONATION_DOC_PATH[1]);
  const current = await getDonationSettings();

  const mergedPayload: Record<string, unknown> = {
    upi: {
      enabled: settings.upi?.enabled !== undefined ? settings.upi.enabled : current.upi.enabled,
      id: settings.upi?.id !== undefined ? settings.upi.id.trim() : current.upi.id,
      name: settings.upi?.name !== undefined ? settings.upi.name.trim() : current.upi.name
    },
    bank: {
      enabled: settings.bank?.enabled !== undefined ? settings.bank.enabled : current.bank.enabled,
      accountName: settings.bank?.accountName !== undefined ? settings.bank.accountName.trim() : current.bank.accountName,
      bankName: settings.bank?.bankName !== undefined ? settings.bank.bankName.trim() : current.bank.bankName,
      branch: settings.bank?.branch !== undefined ? settings.bank.branch.trim() : current.bank.branch,
      // Strictly treat account number as string to prevent loss of leading zeros
      accountNumber: settings.bank?.accountNumber !== undefined ? String(settings.bank.accountNumber).trim() : current.bank.accountNumber,
      ifsc: settings.bank?.ifsc !== undefined ? settings.bank.ifsc.trim().toUpperCase() : current.bank.ifsc,
      accountType: settings.bank?.accountType !== undefined ? settings.bank.accountType.trim() : current.bank.accountType
    },
    instructions: settings.instructions !== undefined ? settings.instructions.trim() : current.instructions,
    updatedAt: serverTimestamp()
  };

  await setDoc(docRef, mergedPayload, { merge: true });
}
