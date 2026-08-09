import { useState, useEffect, useCallback } from 'react';
import {
  loadProgress,
  markItemComplete,
  getCompletedCount,
  PROGRESS_UPDATE_EVENT,
} from '../utils/learningProgress';

export function useLearningProgress() {
  const [progress, setProgress] = useState(() => loadProgress());

  const refresh = useCallback(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    window.addEventListener(PROGRESS_UPDATE_EVENT, refresh);
    return () => window.removeEventListener(PROGRESS_UPDATE_EVENT, refresh);
  }, [refresh]);

  const markComplete = useCallback((progressKey, itemValue) => {
    markItemComplete(progressKey, itemValue);
    setProgress(loadProgress());
  }, []);

  const getCount = useCallback(
    (progressKey) => progress[progressKey]?.length || 0,
    [progress]
  );

  return { getCompletedCount: getCount, markComplete, refresh };
}

export { getCompletedCount };
