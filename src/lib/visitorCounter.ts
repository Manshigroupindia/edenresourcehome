import { doc, increment, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';

const SESSION_STORAGE_KEY = 'eden_visitor_counted';
const STATS_DOC_REF = () => doc(db, 'siteStats', 'visitors');

let recordAttempted = false;

/**
 * Records a visitor session once per browser session.
 * Uses sessionStorage and in-memory guard to prevent double-counting
 * during React StrictMode mount or route transitions.
 */
export async function recordVisitorSession(): Promise<void> {
  if (typeof window === 'undefined') return;

  // In-memory guard for React 18 StrictMode double-mount in dev
  if (recordAttempted) return;
  recordAttempted = true;

  try {
    const alreadyCounted = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (alreadyCounted === 'true') {
      return;
    }

    // Set flag in session storage first to prevent race conditions
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');

    // Atomically increment the visitor counter without resetting existing count
    await setDoc(
      STATS_DOC_REF(),
      {
        count: increment(1),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    // Non-critical background metric: fail silently with console warning
    console.warn('Failed to record visitor count:', error);
  }
}

/**
 * Admin action: adjusts the visitor count by delta (+1, -1, +10, etc.)
 */
export async function adjustVisitorCount(delta: number): Promise<void> {
  if (!Number.isFinite(delta)) return;

  await setDoc(
    STATS_DOC_REF(),
    {
      count: increment(delta),
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Admin action: sets the visitor count to an exact integer value
 */
export async function setExactVisitorCount(count: number): Promise<void> {
  const sanitizedCount = Math.max(0, Math.floor(count));

  await setDoc(
    STATS_DOC_REF(),
    {
      count: sanitizedCount,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
