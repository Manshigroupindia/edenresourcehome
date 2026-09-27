import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface VisitorCountState {
  count: number | null;
  loading: boolean;
  error: Error | null;
}

export function useVisitorCount(): VisitorCountState {
  const [state, setState] = useState<VisitorCountState>({
    count: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const docRef = doc(db, 'siteStats', 'visitors');

    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          const numericCount = typeof data.count === 'number' ? data.count : 0;
          setState({
            count: numericCount,
            loading: false,
            error: null,
          });
        } else {
          // Document does not exist yet
          setState({
            count: 0,
            loading: false,
            error: null,
          });
        }
      },
      (error) => {
        console.warn('Error listening to visitor count:', error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error,
        }));
      }
    );

    return () => unsubscribe();
  }, []);

  return state;
}
