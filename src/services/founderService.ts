import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { type FounderSettings, DEFAULT_FOUNDER_SETTINGS } from '../types/founder';

const FOUNDER_DOC_PATH = ['settings', 'founder'] as const;

/**
 * Get Founder settings from Firestore doc `settings/founder`.
 * If it does not exist, returns DEFAULT_FOUNDER_SETTINGS.
 */
export async function getFounderSettings(): Promise<FounderSettings> {
  try {
    const docRef = doc(db, FOUNDER_DOC_PATH[0], FOUNDER_DOC_PATH[1]);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return {
        name: data.name ?? DEFAULT_FOUNDER_SETTINGS.name,
        designation: data.designation ?? DEFAULT_FOUNDER_SETTINGS.designation,
        shortDescription: data.shortDescription ?? DEFAULT_FOUNDER_SETTINGS.shortDescription,
        fullDescription: data.fullDescription ?? DEFAULT_FOUNDER_SETTINGS.fullDescription,
        imageUrl: data.imageUrl ?? DEFAULT_FOUNDER_SETTINGS.imageUrl,
        cloudinaryPublicId: data.cloudinaryPublicId ?? '',
        quote: data.quote ?? DEFAULT_FOUNDER_SETTINGS.quote,
        isActive: data.isActive !== false,
        updatedAt: data.updatedAt
      };
    }

    return DEFAULT_FOUNDER_SETTINGS;
  } catch (err) {
    console.warn('Failed to load founder settings from Firestore, using fallback:', err);
    return DEFAULT_FOUNDER_SETTINGS;
  }
}

/**
 * Update founder settings in Firestore doc `settings/founder`.
 */
export async function updateFounderSettings(settings: Partial<FounderSettings>): Promise<void> {
  const docRef = doc(db, FOUNDER_DOC_PATH[0], FOUNDER_DOC_PATH[1]);
  const current = await getFounderSettings();

  const merged: Record<string, unknown> = {
    ...current,
    ...settings,
    updatedAt: serverTimestamp()
  };

  await setDoc(docRef, merged, { merge: true });
}

/**
 * Seed initial founder settings if document does not exist.
 */
export async function seedInitialFounder(): Promise<void> {
  const docRef = doc(db, FOUNDER_DOC_PATH[0], FOUNDER_DOC_PATH[1]);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    await setDoc(docRef, {
      ...DEFAULT_FOUNDER_SETTINGS,
      updatedAt: serverTimestamp()
    });
  }
}
